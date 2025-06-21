import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Initialize Supabase client for database and storage
const supabaseUrl = "https://ddpndaofmngjhpgwqkzz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcG5kYW9mbW5namhwZ3dxa3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzM1ODcsImV4cCI6MjA2NTA0OTU4N30.vyG0oX6lP70AM2Ur7nyJ-NSY5F6VIc8rKKDshaPp_Mc";
const supabase = createClient(supabaseUrl, supabaseKey);

const downloadImage = async (url, filepath) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}: ${response.statusText || 'Unknown Error'}`);
  }
  const buffer = await response.buffer();
  fs.writeFileSync(filepath, buffer);
  console.log(`Downloaded ${url} to ${filepath}`);
};

const uploadFileToSupabase = async (filePath, bucketPath) => {
  const fileContent = fs.readFileSync(filePath);
  const { data, error } = await supabase.storage
    .from('media')
    .upload(bucketPath, fileContent, {
      contentType: getContentType(filePath),
      upsert: true
    });

  if (error) {
    throw new Error(`Failed to upload ${bucketPath}: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(bucketPath);
  return publicUrlData.publicUrl;
};

const getContentType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4'
  };
  return contentTypes[ext] || 'application/octet-stream';
};

const migrateVehicleImages = async () => {
  console.log('Starting vehicle image migration...');

  // Ensure 'media' bucket exists
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    throw new Error(`Failed to list buckets: ${bucketError.message}`);
  }
  if (!buckets || !Array.isArray(buckets) || !buckets.find(b => b.name === 'media')) {
    const { error } = await supabase.storage.createBucket('media', {
      public: true
    });
    if (error) {
      throw new Error(`Failed to create bucket: ${error.message}`);
    }
    console.log('Supabase bucket "media" created.');
  } else {
    console.log('Supabase bucket "media" already exists.');
  }

  const { data: vehicles, error: fetchError } = await supabase
    .from('vehicles')
    .select('id, brand, model, images');

  if (fetchError) {
    throw new Error(`Failed to fetch vehicles: ${fetchError.message}`);
  }

  if (!vehicles || vehicles.length === 0) {
    console.log('No vehicles found to migrate.');
    return;
  }

  for (const vehicle of vehicles) {
    console.log(`Processing vehicle: ${vehicle.brand} ${vehicle.model} (ID: ${vehicle.id})`);
    const newImageUrls = [];
    const tempDir = path.join(process.cwd(), 'temp_downloads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    if (vehicle.images && vehicle.images.length > 0) {
      for (const imageUrl of vehicle.images) {
        // Check if the image is already a Supabase URL
        if (imageUrl.startsWith(supabaseUrl) && imageUrl.includes('/storage/v1/object/public/media/')) {
          console.log(`Image ${imageUrl} is already in Supabase. Skipping download/upload.`);
          newImageUrls.push(imageUrl);
          continue;
        }

        try {
          const filename = path.basename(new URL(imageUrl).pathname);
          const tempFilePath = path.join(tempDir, filename);
          const bucketPath = `vehicles/${vehicle.id}/${filename}`;

          await downloadImage(imageUrl, tempFilePath);
          const newPublicUrl = await uploadFileToSupabase(tempFilePath, bucketPath);
          newImageUrls.push(newPublicUrl);
          console.log(`Migrated ${imageUrl} to ${newPublicUrl}`);
        } catch (imageError) {
          console.error(`Error migrating image ${imageUrl} for vehicle ${vehicle.id}:`, imageError.message);
          newImageUrls.push(imageUrl); // Keep original URL if migration fails
        }
      }
    }

    // Update the vehicle in the database with new image URLs
    const { error: updateError } = await supabase
      .from('vehicles')
      .update({ images: newImageUrls })
      .eq('id', vehicle.id);

    if (updateError) {
      console.error(`Failed to update vehicle ${vehicle.id} with new image URLs:`, updateError.message);
    } else {
      console.log(`Successfully updated vehicle ${vehicle.id} with new image URLs.`);
    }

    // Clean up temporary files
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log('Vehicle image migration complete.');
};

migrateVehicleImages().catch(console.error);