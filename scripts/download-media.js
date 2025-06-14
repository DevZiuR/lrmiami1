import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadFile = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`Redirecting to: ${redirectUrl}`);
        
        // Skip if the image has been removed
        if (redirectUrl.includes('removed.png')) {
          console.log(`Skipping deleted image: ${url}`);
          resolve(null);
          return;
        }
        
        downloadFile(redirectUrl, filepath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });

    // Set a timeout
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
};

const mediaFiles = [
  // Hero & Logo
  { url: 'https://i.imgur.com/vRAWMPW.jpeg', path: 'hero/background.jpg' },
  { url: 'https://i.imgur.com/WPDYIq5.jpeg', path: 'brand/logo.jpg' },
  
  // Pipeline
  { url: 'https://i.imgur.com/OE8gV4H.mp4', path: 'pipeline/video.mp4' },
  
  // Yacht
  { url: 'https://i.imgur.com/4OtWjfn.mp4', path: 'yacht/video.mp4' },
  { url: 'https://i.imgur.com/wQGqDVk.jpeg', path: 'yacht/image1.jpg' },
  { url: 'https://i.imgur.com/8k7x9Lm.jpeg', path: 'yacht/image2.jpg' },
  { url: 'https://i.imgur.com/5nF2pQs.jpeg', path: 'yacht/image3.jpg' },
  { url: 'https://i.imgur.com/7mR4tNp.jpeg', path: 'yacht/image4.jpg' },
  
  // Brand logos
  { url: 'https://i.imgur.com/0XNbP5i.png', path: 'brands/mercedes.png' },
  { url: 'https://i.imgur.com/CiqkYvj.png', path: 'brands/lamborghini.png' },
];

const downloadAll = async () => {
  const mediaDir = path.join(__dirname, 'media');
  
  // Create media directory if it doesn't exist
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  // Create subdirectories
  ['hero', 'pipeline', 'yacht', 'brand', 'brands'].forEach(dir => {
    const dirPath = path.join(mediaDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  // Download all files
  const successfulDownloads = [];
  for (const file of mediaFiles) {
    const filepath = path.join(mediaDir, file.path);
    console.log(`Downloading ${file.url} to ${filepath}...`);
    try {
      const result = await downloadFile(file.url, filepath);
      if (result) {
        console.log(`Successfully downloaded ${file.path}`);
        successfulDownloads.push(file);
      }
    } catch (error) {
      console.error(`Failed to download ${file.url}:`, error);
    }
  }

  // Log summary
  console.log('\nDownload Summary:');
  console.log(`Total files attempted: ${mediaFiles.length}`);
  console.log(`Successfully downloaded: ${successfulDownloads.length}`);
  console.log(`Failed or skipped: ${mediaFiles.length - successfulDownloads.length}`);
  
  if (successfulDownloads.length > 0) {
    console.log('\nSuccessfully downloaded files:');
    successfulDownloads.forEach(file => console.log(`- ${file.path}`));
  }
};

downloadAll().catch(console.error); 