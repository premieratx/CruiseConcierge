import { Storage } from '@google-cloud/storage';
import { db } from '../server/db';
import { mediaItems } from '../shared/schema';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME || 'replit-objstore-3c0f0bd9-d9fe-473c-9bba-0391045fd9b5';

interface BoatPhoto {
  filename: string;
  boat: string;
  description: string;
  category: string;
}

const boatPhotos: BoatPhoto[] = [
  // THE IRONY - Turquoise/green canopy boat
  { filename: '@capitalcityshots-21_1760080807864.jpg', boat: 'The Irony', description: 'The Irony - Turquoise canopy party boat on Lake Travis', category: 'boat_exterior' },
  { filename: '@capitalcityshots-22_1760080807865.jpg', boat: 'The Irony', description: 'The Irony - Turquoise canopy boat with life jackets', category: 'boat_exterior' },
  { filename: '@capitalcityshots-27_1760080807866.jpg', boat: 'The Irony', description: 'The Irony - Turquoise canopy boat on the water', category: 'boat_exterior' },
  { filename: '@capitalcityshots-28_1760080807867.jpg', boat: 'The Irony', description: 'The Irony - Front view with blue canopy', category: 'boat_exterior' },
  { filename: '@capitalcityshots-29_1760080807867.jpg', boat: 'The Irony', description: 'The Irony - Turquoise canopy boat front view', category: 'boat_exterior' },
  { filename: '@capitalcityshots-30_1760080807867.jpg', boat: 'The Irony', description: 'The Irony - Boat with pink life vests', category: 'boat_exterior' },
  { filename: '@capitalcityshots-31_1760080807867.jpg', boat: 'The Irony', description: 'The Irony - Captain at the helm with turquoise canopy', category: 'captain_crew' },
  { filename: '@capitalcityshots-32_1760080807868.jpg', boat: 'The Irony', description: 'The Irony - Interior seating with blue canopy', category: 'boat_interior' },
  { filename: '@capitalcityshots-33_1760080807868.jpg', boat: 'The Irony', description: 'The Irony - View through seating to water', category: 'boat_interior' },
  { filename: '@capitalcityshots-34_1760080807868.jpg', boat: 'The Irony', description: 'The Irony - Interior view with blue canopy', category: 'boat_interior' },
  { filename: '@capitalcityshots-35_1760080807868.jpg', boat: 'The Irony', description: 'The Irony - Interior deck with cooler', category: 'boat_interior' },
  { filename: '@capitalcityshots-36_1760080807868.jpg', boat: 'The Irony', description: 'The Irony - Interior seating area', category: 'boat_interior' },
  { filename: '@capitalcityshots-37_1760080807869.jpg', boat: 'The Irony', description: 'The Irony - Disco ball detail with blue canopy', category: 'boat_details' },
  
  // MEESEEKS - Mid-sized with blue canopy and chairs on deck
  { filename: '@capitalcityshots-23_1760080807865.jpg', boat: 'Meeseeks', description: 'Meeseeks - Blue canopy boat with colorful decor', category: 'boat_exterior' },
  { filename: '@capitalcityshots-25_1760080807866.jpg', boat: 'Meeseeks', description: 'Meeseeks - Blue canopy boat with disco balls', category: 'boat_exterior' },
  { filename: '@capitalcityshots-26_1760080807866.jpg', boat: 'Meeseeks', description: 'Meeseeks - Side view with blue canopy and disco balls', category: 'boat_exterior' },
  
  // MIXED / FLEET PHOTOS
  { filename: '@capitalcityshots-24_1760080807866.jpg', boat: 'Fleet', description: 'Premier Party Cruises fleet - Multiple boats on Lake Travis', category: 'fleet' },
];

async function uploadBoatPhotos() {
  console.log('🚢 Starting boat photo upload with correct identifications...\n');
  
  for (const photo of boatPhotos) {
    try {
      const filePath = path.join(process.cwd(), 'attached_assets', photo.filename);
      
      if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${photo.filename}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const fileSize = fs.statSync(filePath).size;
      
      const destinationPath = `gallery/${photo.boat.toLowerCase().replace(/\s+/g, '-')}/${photo.filename}`;
      
      const file = storage.bucket(bucketName).file(destinationPath);
      await file.save(fileBuffer, {
        metadata: {
          contentType: 'image/jpeg',
        },
      });
      
      await file.makePublic();
      
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${destinationPath}`;
      
      const tags = [
        'boats',
        'fleet',
        'lake_travis',
        'party_boat',
        photo.boat.toLowerCase().replace(/\s+/g, '_'),
        photo.category
      ];
      
      await db.insert(mediaItems).values({
        id: nanoid(),
        filename: photo.filename,
        originalName: photo.filename,
        fileType: 'photo',
        filePath: publicUrl,
        fileSize: fileSize,
        mimeType: 'image/jpeg',
        manualTags: tags,
        status: 'published',
        aiAnalysis: {
          boat: photo.boat,
          description: photo.description,
          category: photo.category
        }
      });
      
      console.log(`✅ Uploaded: ${photo.boat} - ${photo.filename}`);
      
    } catch (error: any) {
      console.error(`❌ Error uploading ${photo.filename}:`, error.message);
    }
  }
  
  console.log('\n✨ Boat photo upload complete!');
  console.log('\nBoat identification summary:');
  console.log('🟢 The Irony: Turquoise/green canopy (13 photos)');
  console.log('🔵 Meeseeks: Blue canopy with chairs and disco balls (3 photos)');
  console.log('🚢 Fleet: Mixed boat photos (1 photo)');
}

uploadBoatPhotos().catch(console.error);
