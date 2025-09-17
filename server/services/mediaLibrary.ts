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
import * as crypto from "crypto";

export class MediaLibraryService {
  
  // Secure filename sanitization
  private sanitizeFilename(originalName: string): string {
    const ext = path.extname(originalName).toLowerCase();
    const basename = path.basename(originalName, ext);
    
    // Remove dangerous characters and limit length
    const safeName = basename
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 50); // Limit basename length
    
    const timestamp = Date.now();
    const random = crypto.randomBytes(4).toString('hex');
    
    // Ensure unique, safe filename
    return `${safeName}_${timestamp}_${random}${ext}`;
  }

  // Validate file type and size
  private validateFile(file: Express.Multer.File): { valid: boolean; error?: string } {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return { valid: false, error: `Invalid MIME type: ${file.mimetype}` };
    }
    
    if (!allowedExtensions.includes(ext)) {
      return { valid: false, error: `Invalid file extension: ${ext}` };
    }
    
    if (file.size > maxSize) {
      return { valid: false, error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB` };
    }
    
    // Verify MIME type matches extension
    const mimeExtMap: Record<string, string[]> = {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    };
    
    const expectedExts = mimeExtMap[file.mimetype];
    if (!expectedExts || !expectedExts.includes(ext)) {
      return { valid: false, error: 'File extension does not match MIME type' };
    }
    
    return { valid: true };
  }

  // Ensure secure upload directory
  private ensureSecureUploadDir(): string {
    const uploadDir = path.resolve(process.cwd(), 'uploads', 'media');
    
    // Prevent directory traversal
    if (!uploadDir.startsWith(path.resolve(process.cwd()))) {
      throw new Error('Invalid upload directory path');
    }
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });
    }
    
    return uploadDir;
  }
  
  async uploadMedia(file: Express.Multer.File, userId: string) {
    // Validate file first
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(`File validation failed: ${validation.error}`);
    }

    // Save file to secure uploads directory
    const uploadDir = this.ensureSecureUploadDir();
    
    // Use sanitized filename
    const filename = this.sanitizeFilename(file.originalname);
    const filePath = path.join(uploadDir, filename);
    
    // Additional security: check file doesn't already exist
    if (fs.existsSync(filePath)) {
      throw new Error('File conflict detected - please retry');
    }

    try {
      fs.writeFileSync(filePath, file.buffer, { mode: 0o644 });
    } catch (error) {
      throw new Error(`Failed to save file: ${error}`);
    }
    
    // Insert into database with sanitized data
    const [mediaItem] = await db.insert(mediaItems).values({
      filename,
      originalName: this.sanitizeFilename(file.originalname), // Use sanitized name
      fileType: 'photo', // Only photos allowed now
      filePath: `/uploads/media/${filename}`,
      fileSize: file.size,
      mimeType: file.mimetype,
      createdBy: userId,
      status: 'draft'
    }).returning();
    
    console.log(`✅ Secure media upload: ${mediaItem.id} - ${filename} by user ${userId}`);
    
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

  // Secure file path resolution
  private resolveSecureFilePath(filePath: string): string {
    // Remove leading slash and normalize path
    const normalizedPath = filePath.replace(/^\/+/, '');
    const fullPath = path.resolve(process.cwd(), normalizedPath);
    
    // Security: ensure path is within uploads directory
    const uploadsDir = path.resolve(process.cwd(), 'uploads');
    if (!fullPath.startsWith(uploadsDir)) {
      throw new Error('Invalid file path - security violation');
    }
    
    // Verify file exists
    if (!fs.existsSync(fullPath)) {
      throw new Error('File not found');
    }
    
    return fullPath;
  }

  // Photo editing with Nano Banana - SECURED
  async editPhoto(
    photoId: string, 
    editType: 'enhance' | 'style' | 'background' | 'color' | 'custom',
    editPrompt: string,
    userId: string
  ) {
    // Validate photoId format
    if (!photoId || typeof photoId !== 'string') {
      throw new Error('Invalid photo ID');
    }

    const photo = await db.select().from(mediaItems)
      .where(eq(mediaItems.id, photoId))
      .limit(1);
      
    if (!photo[0]) {
      throw new Error('Photo not found');
    }
    
    // Security: validate file belongs to system
    if (!photo[0].filePath || !photo[0].filePath.startsWith('/uploads/media/')) {
      throw new Error('Invalid photo file path');
    }
    
    // Create edit record
    const [editRecord] = await db.insert(photoEdits).values({
      originalPhotoId: photoId,
      editType,
      editPrompt: editPrompt.substring(0, 500), // Limit prompt length
      status: 'processing'
    }).returning();
    
    try {
      // Use secure path resolution
      const fullPath = this.resolveSecureFilePath(photo[0].filePath);
      const result = await editPhotoWithNanoBanana(fullPath, editType, editPrompt);
      
      // Generate secure filename for edited image
      const editedFilename = this.sanitizeFilename(`edited_${photo[0].filename}`);
      const editedPath = path.join(this.ensureSecureUploadDir(), editedFilename);
      
      // Convert base64 to file with security
      const imageBuffer = Buffer.from(result.imageData, 'base64');
      
      // Validate buffer size
      if (imageBuffer.length > 50 * 1024 * 1024) {
        throw new Error('Generated image too large');
      }
      
      fs.writeFileSync(editedPath, imageBuffer, { mode: 0o644 });
      
      // Create new media item for edited photo with secure data
      const [editedPhoto] = await db.insert(mediaItems).values({
        filename: editedFilename,
        originalName: this.sanitizeFilename(`edited_${photo[0].originalName}`),
        fileType: 'edited_photo',
        filePath: `/uploads/media/${editedFilename}`,
        fileSize: imageBuffer.length,
        mimeType: result.mimeType,
        originalPhotoId: photoId,
        editHistory: [{
          editType,
          editPrompt: editPrompt.substring(0, 500), // Limit prompt length
          editedAt: new Date().toISOString()
        }],
        createdBy: userId,
        status: 'draft'
      }).returning();
      
      console.log(`✅ Photo edited securely: ${editedPhoto.id} from ${photoId} by user ${userId}`);
      
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

  // Generate new image with Nano Banana - SECURED
  async generateImage(prompt: string, userId: string) {
    try {
      // Sanitize and validate prompt
      if (!prompt || prompt.length < 5 || prompt.length > 500) {
        throw new Error('Invalid prompt length');
      }
      
      const sanitizedPrompt = prompt.replace(/[<>]/g, ''); // Remove potential HTML
      const result = await generateImageWithNanoBanana(sanitizedPrompt);
      
      // Generate secure filename
      const filename = this.sanitizeFilename(`generated_${Date.now()}.jpg`);
      const filePath = path.join(this.ensureSecureUploadDir(), filename);
      
      const imageBuffer = Buffer.from(result.imageData, 'base64');
      
      // Validate generated image size
      if (imageBuffer.length > 50 * 1024 * 1024) {
        throw new Error('Generated image too large');
      }
      
      fs.writeFileSync(filePath, imageBuffer, { mode: 0o644 });
      
      // Create media item with secure data
      const [generatedPhoto] = await db.insert(mediaItems).values({
        filename,
        originalName: this.sanitizeFilename(`generated_${prompt.substring(0, 30)}.jpg`),
        fileType: 'photo',
        filePath: `/uploads/media/${filename}`,
        fileSize: imageBuffer.length,
        mimeType: result.mimeType,
        createdBy: userId,
        status: 'draft'
      }).returning();
      
      console.log(`✅ Image generated securely: ${generatedPhoto.id} by user ${userId}`);
      
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

  // Delete media item with security validation
  async deleteMedia(mediaId: string, userId: string) {
    // Validate mediaId format
    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Invalid media ID');
    }

    const [media] = await db.select().from(mediaItems)
      .where(eq(mediaItems.id, mediaId))
      .limit(1);
      
    if (!media) {
      throw new Error('Media not found');
    }
    
    try {
      // Delete physical file securely
      if (media.filePath) {
        const fullPath = this.resolveSecureFilePath(media.filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log(`✅ Deleted file: ${fullPath}`);
        }
      }
      
      // Delete from database
      await db.delete(mediaItems).where(eq(mediaItems.id, mediaId));
      
      // Also delete any related photo edits
      await db.delete(photoEdits).where(eq(photoEdits.originalPhotoId, mediaId));
      
      console.log(`✅ Media deleted: ${mediaId} by user ${userId}`);
      return { success: true, deletedId: mediaId };
      
    } catch (error) {
      console.error(`❌ Failed to delete media ${mediaId}:`, error);
      throw new Error('Failed to delete media item');
    }
  }

  // Bulk delete media items
  async bulkDeleteMedia(mediaIds: string[], userId: string) {
    if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
      throw new Error('Invalid media IDs array');
    }

    if (mediaIds.length > 50) {
      throw new Error('Too many items to delete at once (max 50)');
    }

    const results = {
      deleted: [] as string[],
      failed: [] as { id: string; error: string }[]
    };

    for (const mediaId of mediaIds) {
      try {
        await this.deleteMedia(mediaId, userId);
        results.deleted.push(mediaId);
      } catch (error) {
        results.failed.push({ 
          id: mediaId, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    console.log(`✅ Bulk delete completed: ${results.deleted.length} successful, ${results.failed.length} failed`);
    return results;
  }

  // Update media metadata
  async updateMediaMetadata(mediaId: string, updates: {
    manualTags?: string[];
    status?: 'draft' | 'published';
    publishedLocations?: string[];
  }, userId: string) {
    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Invalid media ID');
    }

    const [existingMedia] = await db.select().from(mediaItems)
      .where(eq(mediaItems.id, mediaId))
      .limit(1);
      
    if (!existingMedia) {
      throw new Error('Media not found');
    }

    const [updatedMedia] = await db.update(mediaItems)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(mediaItems.id, mediaId))
      .returning();

    console.log(`✅ Media metadata updated: ${mediaId} by user ${userId}`);
    return updatedMedia;
  }
}

export const mediaLibraryService = new MediaLibraryService();