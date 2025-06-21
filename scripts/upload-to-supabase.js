import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabaseUrl = 'https://lrmiami.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzbWlhbWkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczOTk5NjQ5MCwiZXhwIjoyMDU1NTcyNDkwfQ.3t3rb91pi-DevZiurs';
const supabase = createClient(supabaseUrl, supabaseKey);

const uploadFile = async (filePath, bucketPath) => {
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

  return data;
};

const getContentType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.mp4': 'video/mp4',
    '.svg': 'image/svg+xml'
  };
  return contentTypes[ext] || 'application/octet-stream';
};

const uploadAll = async () => {
  const mediaDir = path.join(__dirname, 'media');

  // Create bucket if it doesn't exist
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
  }

  // Upload all files
  const processFile = async (filePath) => {
    const relativePath = path.relative(mediaDir, filePath);
    console.log(`Uploading ${relativePath}...`);
    try {
      await uploadFile(filePath, relativePath);
      console.log(`Successfully uploaded ${relativePath}`);
    } catch (error) {
      console.error(`Failed to upload ${relativePath}:`, error);
    }
  };

  const processDirectory = async (dirPath) => {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else {
        await processFile(fullPath);
      }
    }
  };

  await processDirectory(mediaDir);
};

const run = async () => {
  const args = process.argv.slice(2);
  if (args.length === 2) {
    const [filePath, bucketPath] = args;
    console.log(`Attempting to upload ${filePath} to ${bucketPath}...`);
    try {
      await uploadFile(filePath, bucketPath);
      console.log(`Successfully uploaded ${filePath} to ${bucketPath}`);
    } catch (error) {
      console.error(`Failed to upload ${filePath}:`, error);
    }
  } else {
    console.log('No specific file and bucket path provided. Running full media upload...');
    await uploadAll();
  }
};

run().catch(console.error);