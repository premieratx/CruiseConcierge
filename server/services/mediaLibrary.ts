import { db } from "../db";
import { mediaItems, photoEdits } from "@shared/schema";
import { eq, and, desc, gte, inArray } from "drizzle-orm";
import { 
  analyzePhotoForContent, 
  editPhotoWithNanoBanana,
  generateImageWithNanoBanana,
  findBestPhotosForSection
} from "./gemini";
import * as fs from "fs";
import * as path from "path";

export class MediaLibraryService {
  
  async uploadMedia(file: Express.Multer.File, userId: string) {
    // Save file to uploads directory
    const uploadDir = path.join(process.cwd(), 'uploads', 'media');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);
    
    // Insert into database
    const [mediaItem] = await db.insert(mediaItems).values({
      filename,
      originalName: file.originalname,
      fileType: file.mimetype.startsWith('image') ? 'photo' : 'video',
      filePath: `/uploads/media/${filename}`,
      fileSize: file.size,
      mimeType: file.mimetype,
      createdBy: userId,
      status: 'draft'
    }).returning();
    
    // Queue for AI analysis if it's a photo
    if (file.mimetype.startsWith('image')) {
      this.analyzePhotoAsync(mediaItem.id, filePath);
    }
    
    return mediaItem;
  }
  
  async analyzePhotoAsync(mediaId: string, filePath: string) {
    try {
      const analysis = await analyzePhotoForContent(filePath);
      
      await db.update(mediaItems)
        .set({
          aiAnalyzed: true,
          aiAnalysis: analysis,
          autoTags: analysis.searchable_keywords || [],
          qualityScore: analysis.quality_score || 5,
          ugcPotential: analysis.ugc_potential || 5
        })
        .where(eq(mediaItems.id, mediaId));
        
      console.log(`✅ Analyzed photo ${mediaId}`);
    } catch (error) {
      console.error(`❌ Failed to analyze photo ${mediaId}:`, error);
    }
  }

  // Photo editing with Nano Banana
  async editPhoto(
    photoId: string, 
    editType: 'enhance' | 'style' | 'background' | 'color' | 'custom',
    editPrompt: string,
    userId: string
  ) {
    const photo = await db.select().from(mediaItems)
      .where(eq(mediaItems.id, photoId))
      .limit(1);
      
    if (!photo[0]) throw new Error('Photo not found');
    
    // Create edit record
    const [editRecord] = await db.insert(photoEdits).values({
      originalPhotoId: photoId,
      editType,
      editPrompt,
      status: 'processing'
    }).returning();
    
    try {
      const fullPath = path.join(process.cwd(), photo[0].filePath.replace('/uploads/', 'uploads/'));
      const result = await editPhotoWithNanoBanana(fullPath, editType, editPrompt);
      
      // Save edited image
      const editedFilename = `edited_${Date.now()}_${photo[0].filename}`;
      const editedPath = path.join(process.cwd(), 'uploads', 'media', editedFilename);
      
      // Convert base64 to file
      const imageBuffer = Buffer.from(result.imageData, 'base64');
      fs.writeFileSync(editedPath, imageBuffer);
      
      // Create new media item for edited photo
      const [editedPhoto] = await db.insert(mediaItems).values({
        filename: editedFilename,
        originalName: `edited_${photo[0].originalName}`,
        fileType: 'edited_photo',
        filePath: `/uploads/media/${editedFilename}`,
        fileSize: imageBuffer.length,
        mimeType: result.mimeType,
        originalPhotoId: photoId,
        editHistory: [{
          editType,
          editPrompt,
          editedAt: new Date().toISOString()
        }],
        createdBy: userId,
        status: 'draft'
      }).returning();
      
      // Update edit record
      await db.update(photoEdits)
        .set({ 
          editedPhotoId: editedPhoto.id,
          status: 'completed' 
        })
        .where(eq(photoEdits.id, editRecord.id));
        
      // Analyze the edited photo
      this.analyzePhotoAsync(editedPhoto.id, editedPath);
      
      return editedPhoto;
    } catch (error) {
      await db.update(photoEdits)
        .set({ status: 'failed' })
        .where(eq(photoEdits.id, editRecord.id));
      throw error;
    }
  }

  // Generate new image with Nano Banana
  async generateImage(prompt: string, userId: string) {
    try {
      const result = await generateImageWithNanoBanana(prompt);
      
      // Save generated image
      const filename = `generated_${Date.now()}.jpg`;
      const filePath = path.join(process.cwd(), 'uploads', 'media', filename);
      
      const imageBuffer = Buffer.from(result.imageData, 'base64');
      fs.writeFileSync(filePath, imageBuffer);
      
      // Create media item
      const [generatedPhoto] = await db.insert(mediaItems).values({
        filename,
        originalName: `generated_${prompt.substring(0, 50)}.jpg`,
        fileType: 'photo',
        filePath: `/uploads/media/${filename}`,
        fileSize: imageBuffer.length,
        mimeType: result.mimeType,
        createdBy: userId,
        status: 'draft'
      }).returning();
      
      // Analyze generated photo
      this.analyzePhotoAsync(generatedPhoto.id, filePath);
      
      return generatedPhoto;
    } catch (error) {
      console.error('Image generation failed:', error);
      throw error;
    }
  }
  
  async publishToWebsite(mediaIds: string[], targetSection: string) {
    const items = await db.select().from(mediaItems)
      .where(inArray(mediaItems.id, mediaIds));
      
    // Update published locations
    for (const item of items) {
      const locations = item.publishedLocations || [];
      locations.push({
        section: targetSection,
        publishedAt: new Date().toISOString()
      });
      
      await db.update(mediaItems)
        .set({ 
          publishedLocations: locations,
          status: 'published'
        })
        .where(eq(mediaItems.id, item.id));
    }
    
    return { success: true, publishedCount: items.length };
  }

  async getMediaLibrary(page = 1, limit = 20, filter?: string) {
    let query = db.select().from(mediaItems);
    
    // Add filters
    if (filter === 'photos') {
      query = query.where(inArray(mediaItems.fileType, ['photo', 'edited_photo']));
    } else if (filter === 'videos') {
      query = query.where(inArray(mediaItems.fileType, ['video', 'generated_video']));
    } else if (filter === 'analyzed') {
      query = query.where(eq(mediaItems.aiAnalyzed, true));
    } else if (filter === 'edited') {
      query = query.where(eq(mediaItems.fileType, 'edited_photo'));
    }
    
    const items = await query
      .orderBy(desc(mediaItems.uploadDate))
      .limit(limit)
      .offset((page - 1) * limit);
    
    return items;
  }

  async getAISuggestions(sectionType: string) {
    const photos = await db.select().from(mediaItems)
      .where(and(
        inArray(mediaItems.fileType, ['photo', 'edited_photo']),
        eq(mediaItems.aiAnalyzed, true),
        gte(mediaItems.qualityScore, 7)
      ));
    
    const suggestions = await findBestPhotosForSection(photos, sectionType);
    return suggestions;
  }
}

export const mediaLibraryService = new MediaLibraryService();