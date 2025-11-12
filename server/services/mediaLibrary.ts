import { db } from "../db";
import { mediaItems, photoEdits } from "@shared/schema";
import { eq, and, desc, gte, inArray } from "drizzle-orm";
import { 
  analyzePhotoForContent, 
  editPhotoWithNanoBanana,
  generateImageWithNanoBanana,
  findBestPhotosForSection
} from "./gemini";
import * as crypto from "crypto";
import { ObjectStorageService, ObjectNotFoundError } from "../objectStorage";
import { ObjectPermission } from "../objectAcl";
import path from "path";
import fs from "fs";

export class MediaLibraryService {
  private objectStorageService: ObjectStorageService;
  
  constructor() {
    this.objectStorageService = new ObjectStorageService();
  }
  
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
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm', '.mov'];
    const maxSize = 100 * 1024 * 1024; // 100MB for videos, 50MB for images
    
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return { valid: false, error: `Invalid MIME type: ${file.mimetype}` };
    }
    
    if (!allowedExtensions.includes(ext)) {
      return { valid: false, error: `Invalid file extension: ${ext}` };
    }
    
    // Different size limits for different file types
    const isVideo = file.mimetype.startsWith('video/');
    const maxFileSize = isVideo ? 100 * 1024 * 1024 : 50 * 1024 * 1024; // 100MB for videos, 50MB for images
    
    if (file.size > maxFileSize) {
      return { valid: false, error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max ${maxFileSize / 1024 / 1024}MB)` };
    }
    
    // Verify MIME type matches extension
    const mimeExtMap: Record<string, string[]> = {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif'],
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'video/quicktime': ['.mov']
    };
    
    const expectedExts = mimeExtMap[file.mimetype];
    if (!expectedExts || !expectedExts.includes(ext)) {
      return { valid: false, error: 'File extension does not match MIME type' };
    }
    
    return { valid: true };
  }
  
  async uploadMedia(file: Express.Multer.File, userId: string) {
    // Validate file first
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(`File validation failed: ${validation.error}`);
    }

    // SECURITY: For image files, validate actual file content using Sharp metadata
    // This prevents MIME spoofing attacks by verifying the file is actually an image
    if (file.mimetype.startsWith('image')) {
      try {
        const sharp = (await import('sharp')).default;
        const metadata = await sharp(file.buffer).metadata();
        
        // Verify it's actually an image format we support
        const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'heif', 'heic', 'gif'];
        if (!metadata.format || !validFormats.includes(metadata.format)) {
          throw new Error(`Invalid image format detected: ${metadata.format || 'unknown'}`);
        }
      } catch (metadataError: any) {
        throw new Error(`File is not a valid image: ${metadataError.message}`);
      }
    }

    try {
      // Get upload URL from object storage
      const uploadURL = await this.objectStorageService.getObjectEntityUploadURL();
      
      // Upload file directly to object storage
      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: file.buffer,
        headers: {
          'Content-Type': file.mimetype,
          'Content-Length': file.size.toString(),
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload to object storage: ${uploadResponse.statusText}`);
      }

      // Extract object path from upload URL
      const objectPath = this.objectStorageService.normalizeObjectEntityPath(uploadURL);
      
      // Determine file type
      const isVideo = file.mimetype.startsWith('video/');
      const fileType = isVideo ? 'video' : 'photo';
      
      // Insert into database with object storage path
      const [mediaItem] = await db.insert(mediaItems).values({
        filename: this.sanitizeFilename(file.originalname),
        originalName: file.originalname,
        fileType,
        filePath: objectPath, // Object storage path
        fileSize: file.size,
        mimeType: file.mimetype,
        createdBy: userId,
        status: 'draft'
      }).returning();
      
      // Set ACL policy for the uploaded file (make it accessible to admins)
      await this.objectStorageService.trySetObjectEntityAclPolicy(uploadURL, {
        owner: userId,
        visibility: 'private', // Private by default for admin uploads
        aclRules: []
      });
      
      console.log(`✅ Media uploaded to object storage: ${mediaItem.id} - ${mediaItem.filename} by user ${userId}`);
      
      // Queue for AI analysis if it's a photo
      if (file.mimetype.startsWith('image')) {
        this.analyzePhotoAsync(mediaItem.id, objectPath);
      }
      
      return mediaItem;
    } catch (error) {
      console.error('Upload to object storage failed:', error);
      throw new Error(`Failed to upload media: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  async analyzePhotoAsync(mediaId: string, objectPath: string) {
    try {
      // Get the object file from object storage for analysis
      const objectFile = await this.objectStorageService.getObjectEntityFile(objectPath);
      
      // Download image data for AI analysis
      const [exists] = await objectFile.exists();
      if (!exists) {
        throw new Error('Object file not found in storage');
      }
      
      // Create a temporary buffer for AI analysis
      const chunks: Buffer[] = [];
      const stream = objectFile.createReadStream();
      
      await new Promise<void>((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve());
        stream.on('error', (error) => reject(error));
      });
      
      const imageBuffer = Buffer.concat(chunks);
      
      // Create temporary file for analysis
      const tempFilePath = `/tmp/temp_${mediaId}.jpg`;
      fs.writeFileSync(tempFilePath, imageBuffer);
      
      const analysis = await analyzePhotoForContent(tempFilePath);
      
      // Clean up temporary file
      fs.unlinkSync(tempFilePath);
      
      await db.update(mediaItems)
        .set({
          aiAnalyzed: true,
          aiAnalysis: analysis,
          autoTags: analysis.searchable_keywords || [],
          qualityScore: analysis.quality_score || 5,
          ugcPotential: analysis.ugc_potential || 5
        })
        .where(eq(mediaItems.id, mediaId));
        
      console.log(`✅ Analyzed photo ${mediaId} from object storage`);
    } catch (error) {
      console.error(`❌ Failed to analyze photo ${mediaId}:`, error);
    }
  }

  // Get object file from database media item
  private async getObjectFileFromMediaItem(mediaId: string) {
    const [media] = await db.select().from(mediaItems)
      .where(eq(mediaItems.id, mediaId))
      .limit(1);
      
    if (!media) {
      throw new Error('Media not found');
    }

    const objectFile = await this.objectStorageService.getObjectEntityFile(media.filePath);
    return { media, objectFile };
  }

  // Photo editing with Nano Banana - using Object Storage
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

    const { media: photo, objectFile } = await this.getObjectFileFromMediaItem(photoId);
    
    // Create edit record
    const [editRecord] = await db.insert(photoEdits).values({
      originalPhotoId: photoId,
      editType,
      editPrompt: editPrompt.substring(0, 500), // Limit prompt length
      status: 'processing'
    }).returning();
    
    try {
      // Download original image from object storage
      const chunks: Buffer[] = [];
      const stream = objectFile.createReadStream();
      
      await new Promise<void>((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve());
        stream.on('error', (error) => reject(error));
      });
      
      const originalImageBuffer = Buffer.concat(chunks);
      
      // Create temporary file for editing
      const tempOriginalPath = `/tmp/original_${photoId}.jpg`;
      fs.writeFileSync(tempOriginalPath, originalImageBuffer);
      
      const result = await editPhotoWithNanoBanana(tempOriginalPath, editType, editPrompt);
      
      // Clean up temporary file
      fs.unlinkSync(tempOriginalPath);
      
      // Convert base64 to buffer
      const editedImageBuffer = Buffer.from(result.imageData, 'base64');
      
      // Validate buffer size
      if (editedImageBuffer.length > 50 * 1024 * 1024) {
        throw new Error('Generated image too large');
      }
      
      // Upload edited image to object storage
      const uploadURL = await this.objectStorageService.getObjectEntityUploadURL();
      
      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: editedImageBuffer,
        headers: {
          'Content-Type': result.mimeType,
          'Content-Length': editedImageBuffer.length.toString(),
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload edited image: ${uploadResponse.statusText}`);
      }

      // Get object path
      const editedObjectPath = this.objectStorageService.normalizeObjectEntityPath(uploadURL);
      
      // Create new media item for edited photo
      const [editedPhoto] = await db.insert(mediaItems).values({
        filename: this.sanitizeFilename(`edited_${photo.filename}`),
        originalName: `edited_${photo.originalName}`,
        fileType: 'edited_photo',
        filePath: editedObjectPath,
        fileSize: editedImageBuffer.length,
        mimeType: result.mimeType,
        originalPhotoId: photoId,
        editHistory: [{
          editType,
          editPrompt: editPrompt.substring(0, 500),
          editedAt: new Date().toISOString()
        }],
        createdBy: userId,
        status: 'draft'
      }).returning();
      
      // Set ACL policy for edited photo
      await this.objectStorageService.trySetObjectEntityAclPolicy(uploadURL, {
        owner: userId,
        visibility: 'private',
        aclRules: []
      });
      
      console.log(`✅ Photo edited with object storage: ${editedPhoto.id} from ${photoId} by user ${userId}`);
      
      // Update edit record
      await db.update(photoEdits)
        .set({ 
          editedPhotoId: editedPhoto.id,
          status: 'completed' 
        })
        .where(eq(photoEdits.id, editRecord.id));
        
      // Analyze the edited photo
      this.analyzePhotoAsync(editedPhoto.id, editedObjectPath);
      
      return editedPhoto;
    } catch (error) {
      await db.update(photoEdits)
        .set({ status: 'failed' })
        .where(eq(photoEdits.id, editRecord.id));
      throw error;
    }
  }

  // Generate new image with Nano Banana - using Object Storage
  async generateImage(prompt: string, userId: string) {
    try {
      // Sanitize and validate prompt
      if (!prompt || prompt.length < 5 || prompt.length > 500) {
        throw new Error('Invalid prompt length');
      }
      
      const sanitizedPrompt = prompt.replace(/[<>]/g, ''); // Remove potential HTML
      const result = await generateImageWithNanoBanana(sanitizedPrompt);
      
      const imageBuffer = Buffer.from(result.imageData, 'base64');
      
      // Validate generated image size
      if (imageBuffer.length > 50 * 1024 * 1024) {
        throw new Error('Generated image too large');
      }
      
      // Upload generated image to object storage
      const uploadURL = await this.objectStorageService.getObjectEntityUploadURL();
      
      const uploadResponse = await fetch(uploadURL, {
        method: 'PUT',
        body: imageBuffer,
        headers: {
          'Content-Type': result.mimeType,
          'Content-Length': imageBuffer.length.toString(),
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload generated image: ${uploadResponse.statusText}`);
      }

      // Get object path
      const objectPath = this.objectStorageService.normalizeObjectEntityPath(uploadURL);
      
      // Create media item
      const [generatedPhoto] = await db.insert(mediaItems).values({
        filename: this.sanitizeFilename(`generated_${Date.now()}.jpg`),
        originalName: `generated_${prompt.substring(0, 30)}.jpg`,
        fileType: 'photo',
        filePath: objectPath,
        fileSize: imageBuffer.length,
        mimeType: result.mimeType,
        createdBy: userId,
        status: 'draft'
      }).returning();
      
      // Set ACL policy
      await this.objectStorageService.trySetObjectEntityAclPolicy(uploadURL, {
        owner: userId,
        visibility: 'private',
        aclRules: []
      });
      
      console.log(`✅ Image generated with object storage: ${generatedPhoto.id} by user ${userId}`);
      
      // Analyze generated photo
      this.analyzePhotoAsync(generatedPhoto.id, objectPath);
      
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

  // Delete media item from object storage
  async deleteMedia(mediaId: string, userId: string) {
    // Validate mediaId format
    if (!mediaId || typeof mediaId !== 'string') {
      throw new Error('Invalid media ID');
    }

    try {
      const { media, objectFile } = await this.getObjectFileFromMediaItem(mediaId);
      
      // Delete from object storage
      try {
        await objectFile.delete();
        console.log(`✅ Deleted object from storage: ${media.filePath}`);
      } catch (storageError) {
        console.warn(`⚠️ Failed to delete from object storage: ${storageError}. Continuing with database cleanup.`);
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