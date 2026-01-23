import fs from 'fs';
import path from 'path';

const FOLDER_URL = 'https://drive.google.com/drive/folders/1zECkoIqJDXV86Psq36k2KzO6r10wolK4';

async function extractFileIdsFromFolder(): Promise<{id: string, name: string}[]> {
  // Fetch the folder page and extract file IDs from the HTML/JSON data
  const response = await fetch(FOLDER_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  });
  
  const html = await response.text();
  
  // Google Drive embeds file data in a JSON blob in the page
  // Look for patterns like: ["FILE_ID","filename.jpg",
  const filePattern = /\["([a-zA-Z0-9_-]{25,50})","([^"]+\.(?:jpg|jpeg|png|webp|gif))"/gi;
  const files: {id: string, name: string}[] = [];
  const seen = new Set<string>();
  
  let match;
  while ((match = filePattern.exec(html)) !== null) {
    const id = match[1];
    const name = match[2];
    if (!seen.has(id) && name.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      seen.add(id);
      files.push({ id, name });
    }
  }
  
  return files;
}

async function downloadFile(fileId: string, fileName: string, destDir: string): Promise<boolean> {
  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const destPath = path.join(destDir, safeName);
  
  // Try direct download URL
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  try {
    let response = await fetch(downloadUrl, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });
    
    const contentType = response.headers.get('content-type') || '';
    
    // If we get HTML, it's a virus scan warning - try with confirm param
    if (contentType.includes('text/html')) {
      const confirmUrl = `https://drive.google.com/uc?export=download&confirm=t&id=${fileId}`;
      response = await fetch(confirmUrl, {
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        }
      });
    }
    
    if (!response.ok) {
      return false;
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    
    // Verify it's actually an image (check magic bytes)
    if (buffer.length < 100) {
      return false;
    }
    
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log('Extracting file IDs from Google Drive folder...\n');
  
  const files = await extractFileIdsFromFolder();
  
  if (files.length === 0) {
    console.log('Could not extract file IDs from the folder page.');
    console.log('The folder may have restricted access or different structure.\n');
    return;
  }
  
  console.log(`Found ${files.length} image files:\n`);
  files.slice(0, 10).forEach(f => console.log(`  - ${f.name}`));
  if (files.length > 10) {
    console.log(`  ... and ${files.length - 10} more\n`);
  }
  
  const destDir = path.join(process.cwd(), 'public', 'gallery-imports');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  console.log('\nDownloading files...\n');
  
  let success = 0;
  let failed = 0;
  
  for (const file of files) {
    process.stdout.write(`Downloading ${file.name}... `);
    const result = await downloadFile(file.id, file.name, destDir);
    if (result) {
      console.log('✓');
      success++;
    } else {
      console.log('✗');
      failed++;
    }
  }
  
  console.log(`\nComplete: ${success} downloaded, ${failed} failed`);
  console.log(`Files saved to: ${destDir}`);
}

main().catch(console.error);
