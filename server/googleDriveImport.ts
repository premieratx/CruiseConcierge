import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
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

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Drive not connected');
  }
  return accessToken;
}

async function getUncachableGoogleDriveClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

export async function listFilesInFolder(folderId: string): Promise<any[]> {
  const drive = await getUncachableGoogleDriveClient();
  
  const response = await drive.files.list({
    q: `'${folderId}' in parents and (mimeType contains 'image/')`,
    fields: 'files(id, name, mimeType, size)',
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  return response.data.files || [];
}

export async function downloadFileFromDrive(fileId: string, fileName: string): Promise<string> {
  const drive = await getUncachableGoogleDriveClient();
  
  const destDir = path.join(process.cwd(), 'public', 'gallery-imports');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const destPath = path.join(destDir, safeName);
  
  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(destPath);
    (response.data as any)
      .on('end', () => {
        resolve(`/gallery-imports/${safeName}`);
      })
      .on('error', (err: Error) => {
        reject(err);
      })
      .pipe(dest);
  });
}

export async function downloadPublicDriveFile(fileId: string, fileName: string): Promise<string> {
  const destDir = path.join(process.cwd(), 'public', 'gallery-imports');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const destPath = path.join(destDir, safeName);
  
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.status}`);
  }
  
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  
  return `/gallery-imports/${safeName}`;
}

export async function importPhotosFromDrive(folderId: string): Promise<{ imported: string[], errors: string[] }> {
  const files = await listFilesInFolder(folderId);
  const imported: string[] = [];
  const errors: string[] = [];

  for (const file of files) {
    try {
      const filePath = await downloadFileFromDrive(file.id, file.name);
      imported.push(filePath);
      console.log(`Imported: ${file.name} -> ${filePath}`);
    } catch (error: any) {
      console.error(`Failed to import ${file.name}:`, error.message);
      errors.push(`${file.name}: ${error.message}`);
    }
  }

  return { imported, errors };
}
