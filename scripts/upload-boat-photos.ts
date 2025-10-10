import { Storage } from '@google-cloud/storage';
import { db } from '../server/db';
import { mediaItems } from '../shared/schema';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const BUCKET_NAME = 'repl-default-bucket-032d6776-110a-4bb3-ab79-37f53a22c472';

// Map of photos to boats based on visual inspection
const photoBoatMapping: Record<string, { boat: string; description: string }> = {
  '@capitalcityshots-1_1760080740012.jpg': { boat: 'day_tripper', description: 'Day Tripper - Front seating area with turquoise canopy' },
  '@capitalcityshots-2_1760080740017.jpg': { boat: 'day_tripper', description: 'Day Tripper - Curved seating with lake view' },
  '@capitalcityshots-3_1760080740017.jpg': { boat: 'day_tripper', description: 'Day Tripper - Main deck seating area' },
  '@capitalcityshots-4_1760080740017.jpg': { boat: 'day_tripper', description: 'Day Tripper - Center console and bench seating' },
  '@capitalcityshots-5_1760080740018.jpg': { boat: 'day_tripper', description: 'Day Tripper - Front deck view' },
  '@capitalcityshots-6_1760080740018.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Disco deck with Texas star pattern' },
  '@capitalcityshots-7_1760080740018.jpg': { boat: 'fleet', description: 'Fleet - Two boats together on Lake Travis' },
  '@capitalcityshots-8_1760080740018.jpg': { boat: 'fleet', description: 'Fleet - Boats cruising on the lake' },
  '@capitalcityshots-9_1760080740019.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Disco boat with purple canopy and disco balls' },
  '@capitalcityshots-10_1760080740019.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Texas star deck pattern detail' },
  '@capitalcityshots-11_1760080740019.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Colorful deck patterns' },
  '@capitalcityshots-12_1760080740019.jpg': { boat: 'fleet', description: 'Fleet - Boat exterior on Lake Travis' },
  '@capitalcityshots-13_1760080740020.jpg': { boat: 'day_tripper', description: 'Day Tripper - Back view with green canopy' },
  '@capitalcityshots-14_1760080740020.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Disco balls and purple canopy' },
  '@capitalcityshots-15_1760080740020.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Side seating area' },
  '@capitalcityshots-16_1760080740020.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Full deck view' },
  '@capitalcityshots-17_1760080740020.jpg': { boat: 'me_seeks', description: 'Me Seeks the Irony - Seating with coolers' },
  '@capitalcityshots-18_1760080740021.jpg': { boat: 'day_tripper', description: 'Day Tripper - Bench seating detail' },
  '@capitalcityshots-19_1760080740021.jpg': { boat: 'day_tripper', description: 'Day Tripper - Center console area' },
  '@capitalcityshots-20_1760080740021.jpg': { boat: 'fleet', description: 'Fleet - Aerial view on Lake Travis' },
  '@capitalcityshots-21_1760080740021.jpg': { boat: 'fleet', description: 'Fleet - Wide shot on the lake' },
};

async function uploadBoatPhotos() {
  console.log('🚀 Starting boat photo upload...');
  
  // Initialize Google Cloud Storage
  const storage = new Storage();
  const bucket = storage.bucket(BUCKET_NAME);
  
  const attachedAssetsDir = path.join(process.cwd(), 'attached_assets');
  const uploadedPhotos: any[] = [];
  
  for (const [filename, { boat, description }] of Object.entries(photoBoatMapping)) {
    try {
      const filePath = path.join(attachedAssetsDir, filename);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filename}`);
        continue;
      }
      
      // Generate unique ID for object storage
      const objectId = nanoid();
      const objectPath = `public/boats/${objectId}.jpg`;
      
      // Upload to Google Cloud Storage
      console.log(`📤 Uploading ${filename}...`);
      await bucket.upload(filePath, {
        destination: objectPath,
        metadata: {
          contentType: 'image/jpeg',
          metadata: {
            originalName: filename,
            boat: boat,
          }
        }
      });
      
      // Get public URL
      const publicUrl = `/objects/${objectPath}`;
      
      // Get file size
      const stats = fs.statSync(filePath);
      
      // Determine tags
      const tags = ['boats', 'fleet', 'gallery', boat];
      if (boat === 'fleet') {
        tags.push('fleet_photo');
      }
      
      // Insert into database
      const [media] = await db.insert(mediaItems).values({
        id: nanoid(),
        filename: `boat-${boat}-${objectId}.jpg`,
        originalName: filename,
        fileType: 'photo',
        filePath: publicUrl,
        fileSize: stats.size,
        mimeType: 'image/jpeg',
        uploadDate: new Date(),
        status: 'published',
        publishedLocations: ['gallery'],
        manualTags: tags,
        createdBy: 'admin',
        lastModified: new Date(),
      }).returning();
      
      uploadedPhotos.push(media);
      console.log(`✅ Uploaded: ${filename} → ${boat}`);
      
    } catch (error) {
      console.error(`❌ Error uploading ${filename}:`, error);
    }
  }
  
  console.log(`\n🎉 Successfully uploaded ${uploadedPhotos.length} photos to gallery!`);
  console.log('\nPhotos by boat:');
  console.log('- Day Tripper:', uploadedPhotos.filter(p => p.manualTags?.includes('day_tripper')).length);
  console.log('- Me Seeks the Irony:', uploadedPhotos.filter(p => p.manualTags?.includes('me_seeks')).length);
  console.log('- Fleet/Mixed:', uploadedPhotos.filter(p => p.manualTags?.includes('fleet')).length);
}

uploadBoatPhotos().catch(console.error);
