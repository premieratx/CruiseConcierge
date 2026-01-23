import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const FOLDER_ID = '1zECkoIqJDXV86Psq36k2KzO6r10wolK4';

let connectionSettings: any;

async function getAccessToken() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-drive',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Drive not connected');
  }
  return accessToken;
}

async function main() {
  console.log('Connecting to Google Drive...');
  
  try {
    const accessToken = await getAccessToken();
    console.log('Got access token, listing files...');
    
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    // Try without specifying spaces - just use standard query
    const response = await drive.files.list({
      q: `'${FOLDER_ID}' in parents`,
      fields: 'files(id, name, mimeType, size)',
      pageSize: 100,
    });
    
    const files = response.data.files || [];
    console.log(`Found ${files.length} files`);
    
    if (files.length === 0) {
      console.log('No files found.');
      return;
    }

    // Create output directory
    const destDir = path.join(process.cwd(), 'public', 'gallery-imports');
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Download each file
    for (const file of files) {
      if (!file.mimeType?.startsWith('image/')) {
        console.log(`Skipping non-image: ${file.name}`);
        continue;
      }
      
      console.log(`Downloading: ${file.name}...`);
      
      try {
        const fileResponse = await drive.files.get(
          { fileId: file.id!, alt: 'media' },
          { responseType: 'arraybuffer' }
        );
        
        const safeName = file.name!.replace(/[^a-zA-Z0-9.-]/g, '_');
        const destPath = path.join(destDir, safeName);
        
        fs.writeFileSync(destPath, Buffer.from(fileResponse.data as ArrayBuffer));
        console.log(`  Saved: ${safeName}`);
      } catch (err: any) {
        console.error(`  Failed: ${err.message}`);
      }
    }
    
    console.log('\nImport complete!');
  } catch (error: any) {
    console.error('Error:', error.message);
    
    // If scope error, try direct public download approach
    if (error.message.includes('scope')) {
      console.log('\nTrying public download approach...');
      await downloadPublicFolder();
    }
  }
}

async function downloadPublicFolder() {
  // For publicly shared folders, we can try accessing via the embed URL
  // This is a fallback if the API approach doesn't work
  console.log('The Drive API scope is limited. Please try these alternatives:');
  console.log('1. Download files from: https://drive.google.com/drive/folders/' + FOLDER_ID);
  console.log('2. Upload them to this chat or the project files');
}

main();
