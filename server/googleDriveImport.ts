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
    fields: 'files(id, name, mimeType, thumbnailLink, webContentLink)',
    pageSize: 100,
  });

  return response.data.files || [];
}

export async function downloadFile(fileId: string, fileName: string): Promise<string> {
  const drive = await getUncachableGoogleDriveClient();
  
  const destDir = path.join(process.cwd(), 'public', 'gallery-imports');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destPath = path.join(destDir, fileName);
  
  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(destPath);
    (response.data as any)
      .on('end', () => {
        resolve(`/gallery-imports/${fileName}`);
      })
      .on('error', (err: Error) => {
        reject(err);
      })
      .pipe(dest);
  });
}

export async function importPhotosFromDrive(folderId: string): Promise<{ imported: string[], errors: string[] }> {
  const files = await listFilesInFolder(folderId);
  const imported: string[] = [];
  const errors: string[] = [];

  for (const file of files) {
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = await downloadFile(file.id, safeName);
      imported.push(filePath);
      console.log(`Imported: ${file.name} -> ${filePath}`);
    } catch (error: any) {
      console.error(`Failed to import ${file.name}:`, error.message);
      errors.push(`${file.name}: ${error.message}`);
    }
  }

  return { imported, errors };
}
