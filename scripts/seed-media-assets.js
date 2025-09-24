#!/usr/bin/env node

/**
 * Media Assets Seeding Script
 * 
 * This script uploads existing photos from live_website_photos to the media library
 * using the same process as the MediaLibraryService to ensure consistency.
 */

import { db } from '../server/db';
import { mediaItems } from '../shared/schema';
import { ObjectStorageService } from '../server/objectStorage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File metadata for each live website photo
const photoMetadata = {
  'atx-disco-cruise-party.jpg': {
    title: 'ATX Disco Cruise Party',
    altText: 'Party atmosphere on Austin disco cruise with dancing guests',
    description: 'Energetic party scene aboard our disco cruise featuring dancing guests and vibrant atmosphere',
    category: 'party_atmosphere'
  },
  'bachelor-party-group-guys.jpg': {
    title: 'Bachelor Party Group',
    altText: 'Bachelor party group enjoying cruise experience',
    description: 'Group of friends celebrating bachelor party on Lake Travis party cruise',
    category: 'events'
  },
  'clever-girl-50-person-boat.jpg': {
    title: 'Clever Girl - 50 Person Boat',
    altText: 'Clever Girl party boat accommodating up to 50 people',
    description: 'Our largest party boat Clever Girl, perfect for big groups and corporate events',
    category: 'boats'
  },
  'dancing-party-scene.jpg': {
    title: 'Dancing Party Scene',
    altText: 'Guests dancing and celebrating on party cruise',
    description: 'Guests enjoying the dance floor and party atmosphere on Lake Travis',
    category: 'party_atmosphere'
  },
  'day-tripper-14-person-boat.jpg': {
    title: 'Day Tripper - 14 Person Boat',
    altText: 'Day Tripper intimate party boat for smaller groups',
    description: 'Our intimate Day Tripper boat, perfect for smaller private parties and celebrations',
    category: 'boats'
  },
  'giant-unicorn-float.jpg': {
    title: 'Giant Unicorn Float',
    altText: 'Giant inflatable unicorn float for party cruise fun',
    description: 'One of our popular inflatable toys - giant unicorn float for added party fun',
    category: 'amenities'
  },
  'meeseeks-25-person-boat.jpg': {
    title: 'Me Seeks The Irony - 25 Person Boat',
    altText: 'Me Seeks The Irony party boat for medium-sized groups',
    description: 'Our mid-size party boat perfect for medium groups and special celebrations',
    category: 'boats'
  },
  'party-atmosphere-1.jpg': {
    title: 'Party Atmosphere Scene 1',
    altText: 'Vibrant party atmosphere with guests celebrating on cruise',
    description: 'Guests enjoying the party atmosphere and celebration on Lake Travis cruise',
    category: 'party_atmosphere'
  },
  'party-atmosphere-2.jpg': {
    title: 'Party Atmosphere Scene 2',
    altText: 'Party guests enjoying music and dancing on boat cruise',
    description: 'More party scenes showing the energy and fun of our Lake Travis cruises',
    category: 'party_atmosphere'
  },
  'party-atmosphere-3.jpg': {
    title: 'Party Atmosphere Scene 3',
    altText: 'Guests celebrating and having fun during party cruise',
    description: 'Another view of the amazing party atmosphere guests experience on our cruises',
    category: 'party_atmosphere'
  }
};

class MediaSeeder {
  constructor() {
    this.objectStorageService = new ObjectStorageService();
    this.successCount = 0;
    this.errorCount = 0;
  }

  // Create safe filename like MediaLibraryService does
  sanitizeFilename(originalName) {
    const ext = path.extname(originalName).toLowerCase();
    const basename = path.basename(originalName, ext);
    
    const safeName = basename
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 50);
    
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex');
    
    return `${safeName}_${timestamp}_${random}${ext}`;
  }

  async uploadSinglePhoto(filePath, metadata) {
    try {
      console.log(`📸 Processing: ${path.basename(filePath)}`);
      
      // Read file
      const fileBuffer = fs.readFileSync(filePath);
      const stats = fs.statSync(filePath);
      const originalName = path.basename(filePath);
      const mimeType = this.getMimeType(path.extname(filePath).toLowerCase());
      
      // Get upload URL from object storage
      const uploadURL = await this.objectStorageService.getObjectEntityUploadURL();
      
      // Upload file to object storage
      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: fileBuffer,
        headers: {
          'Content-Type': mimeType,
          'Content-Length': stats.size.toString(),
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload to object storage: ${uploadResponse.statusText}`);
      }

      // Extract object path
      const objectPath = this.objectStorageService.normalizeObjectEntityPath(uploadURL);
      
      // Insert into database
      const [mediaItem] = await db.insert(mediaItems).values({
        filename: this.sanitizeFilename(originalName),
        originalName,
        fileType: 'photo',
        filePath: objectPath,
        fileSize: stats.size,
        mimeType,
        createdBy: 'seeder',
        status: 'published', // Mark as published since these are live website photos
        aiAnalyzed: false, // Will be analyzed later
        title: metadata.title,
        description: metadata.description,
        manualTags: [metadata.category, 'live_website', 'party_cruise', 'lake_travis']
      }).returning();

      // Set ACL policy to make it public (since these are for the website)
      await this.objectStorageService.trySetObjectEntityAclPolicy(uploadURL, {
        owner: 'seeder',
        visibility: 'public',
        aclRules: []
      });

      console.log(`✅ Uploaded: ${mediaItem.filename} (${(stats.size / 1024).toFixed(1)}KB)`);
      this.successCount++;
      
      return mediaItem;
    } catch (error) {
      console.error(`❌ Failed to upload ${path.basename(filePath)}:`, error.message);
      this.errorCount++;
      return null;
    }
  }

  getMimeType(extension) {
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
      '.gif': 'image/gif'
    };
    return mimeTypes[extension] || 'image/jpeg';
  }

  async seedAllPhotos() {
    console.log('🌱 Starting media library seeding...');
    console.log('📁 Source directory: live_website_photos/');
    
    const photosDir = path.join(__dirname, '../live_website_photos');
    
    if (!fs.existsSync(photosDir)) {
      console.error('❌ live_website_photos directory not found!');
      return;
    }

    const files = fs.readdirSync(photosDir).filter(file => 
      ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(path.extname(file).toLowerCase())
    );

    console.log(`📊 Found ${files.length} image files to process`);
    
    for (const filename of files) {
      const filePath = path.join(photosDir, filename);
      const metadata = photoMetadata[filename] || {
        title: path.basename(filename, path.extname(filename)),
        altText: `Party cruise photo - ${filename}`,
        description: 'Photo from Premier Party Cruises on Lake Travis',
        category: 'general'
      };
      
      await this.uploadSinglePhoto(filePath, metadata);
      
      // Small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n📈 Seeding Summary:');
    console.log(`✅ Successfully uploaded: ${this.successCount} files`);
    console.log(`❌ Failed uploads: ${this.errorCount} files`);
    console.log(`🎯 Total processed: ${this.successCount + this.errorCount} files`);
    
    if (this.successCount > 0) {
      console.log('\n🎉 Media library seeded successfully!');
      console.log('🔗 Visit /admin/media-library to view the uploaded assets');
    }
  }
}

// Run the seeder
async function main() {
  try {
    const seeder = new MediaSeeder();
    await seeder.seedAllPhotos();
    process.exit(0);
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }
}

main();