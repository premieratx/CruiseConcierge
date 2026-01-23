import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const FOLDER_URL = 'https://drive.google.com/drive/folders/1zECkoIqJDXV86Psq36k2KzO6r10wolK4';

async function extractFileLinks() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Navigating to Google Drive folder...');
  await page.goto(FOLDER_URL, { waitUntil: 'networkidle' });
  
  // Wait for files to load
  await page.waitForTimeout(3000);
  
  console.log('Extracting file information...');
  
  // Get all file rows and extract IDs from data attributes or links
  const files = await page.evaluate(() => {
    const items: {id: string, name: string}[] = [];
    
    // Try to find file items by data attributes
    const fileElements = document.querySelectorAll('[data-id]');
    fileElements.forEach(el => {
      const id = el.getAttribute('data-id');
      const nameEl = el.querySelector('[data-tooltip]');
      const name = nameEl?.getAttribute('data-tooltip') || '';
      if (id && name && (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png'))) {
        items.push({ id, name });
      }
    });
    
    // Also try to find links with file IDs
    const links = document.querySelectorAll('a[href*="/file/d/"]');
    links.forEach(link => {
      const href = (link as HTMLAnchorElement).href;
      const match = href.match(/\/file\/d\/([^/]+)/);
      if (match) {
        const id = match[1];
        const text = link.textContent || '';
        if (!items.find(i => i.id === id)) {
          items.push({ id, name: text.trim() || `file_${id}.jpg` });
        }
      }
    });
    
    return items;
  });
  
  console.log(`Found ${files.length} files`);
  
  await browser.close();
  
  // Save results
  fs.writeFileSync('/tmp/drive_files.json', JSON.stringify(files, null, 2));
  console.log('Saved to /tmp/drive_files.json');
  
  return files;
}

async function main() {
  try {
    const files = await extractFileLinks();
    
    if (files.length === 0) {
      console.log('\nNo files found with Playwright. Google Drive may require authentication.');
      return;
    }
    
    console.log('\nFile IDs extracted:');
    files.forEach(f => console.log(`  ${f.id} -> ${f.name}`));
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

main();
