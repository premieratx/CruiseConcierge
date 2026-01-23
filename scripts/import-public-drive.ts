import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FOLDER_ID = '1zECkoIqJDXV86Psq36k2KzO6r10wolK4';

async function getFilesFromPublicFolder(folderId: string): Promise<{id: string, name: string}[]> {
  // Use Google Drive's API key-less endpoint for public folders
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=AIzaSyC1qbk75-v2LCzxqTfNDYIbXNLpOTl9bR8&fields=files(id,name,mimeType)`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Try alternative approach - scrape folder page
      console.log('API approach failed, will try file IDs directly...');
      return [];
    }
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.log('Could not list files via API');
    return [];
  }
}

async function downloadPublicFile(fileId: string, fileName: string, destDir: string): Promise<string | null> {
  // For publicly shared Google Drive files, use the export URL
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  try {
    const response = await fetch(downloadUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      console.log(`  Failed to download: ${response.status}`);
      return null;
    }
    
    const contentType = response.headers.get('content-type') || '';
    
    // Check if we got HTML (virus scan warning) instead of the file
    if (contentType.includes('text/html')) {
      // Try the confirm download URL for larger files
      const confirmUrl = `https://drive.google.com/uc?export=download&confirm=t&id=${fileId}`;
      const confirmResponse = await fetch(confirmUrl, {
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!confirmResponse.ok || confirmResponse.headers.get('content-type')?.includes('text/html')) {
        console.log(`  File requires manual download (virus scan warning)`);
        return null;
      }
      
      const buffer = Buffer.from(await confirmResponse.arrayBuffer());
      const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      const destPath = path.join(destDir, safeName);
      fs.writeFileSync(destPath, buffer);
      return `/gallery-imports/${safeName}`;
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const destPath = path.join(destDir, safeName);
    fs.writeFileSync(destPath, buffer);
    return `/gallery-imports/${safeName}`;
    
  } catch (error: any) {
    console.log(`  Error: ${error.message}`);
    return null;
  }
}

async function optimizeImage(inputPath: string, outputPath: string): Promise<void> {
  const buffer = fs.readFileSync(inputPath);
  
  // Resize to max 1200px width and convert to WebP for optimal loading
  const optimized = await sharp(buffer)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  
  fs.writeFileSync(outputPath, optimized);
}

async function main() {
  console.log('Fetching files from public Google Drive folder...\n');
  
  const destDir = path.join(process.cwd(), 'public', 'gallery-imports');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Try to list files
  const files = await getFilesFromPublicFolder(FOLDER_ID);
  
  if (files.length > 0) {
    console.log(`Found ${files.length} files\n`);
    
    const imported: string[] = [];
    
    for (const file of files) {
      if (!file.name) continue;
      
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic'].includes(ext || '')) {
        console.log(`Skipping non-image: ${file.name}`);
        continue;
      }
      
      console.log(`Downloading: ${file.name}...`);
      const result = await downloadPublicFile(file.id, file.name, destDir);
      
      if (result) {
        imported.push(result);
        console.log(`  ✓ Saved`);
        
        // Optimize the image
        const fullPath = path.join(process.cwd(), 'public', result);
        const webpName = file.name.replace(/\.[^.]+$/, '.webp').replace(/[^a-zA-Z0-9.-]/g, '_');
        const webpPath = path.join(destDir, webpName);
        
        try {
          await optimizeImage(fullPath, webpPath);
          console.log(`  ✓ Optimized to WebP`);
        } catch (err: any) {
          console.log(`  ! Could not optimize: ${err.message}`);
        }
      }
    }
    
    console.log(`\n✓ Imported ${imported.length} files to /public/gallery-imports/`);
  } else {
    console.log('Could not automatically list files from the folder.');
    console.log('\nThe folder needs specific sharing settings. Please check:');
    console.log('1. Open folder: https://drive.google.com/drive/folders/' + FOLDER_ID);
    console.log('2. Click Share > General Access > "Anyone with the link"');
    console.log('3. Make sure it says "Viewer" access\n');
  }
}

main().catch(console.error);
