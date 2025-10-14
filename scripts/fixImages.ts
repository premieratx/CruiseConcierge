import { db } from "../server/db";
import { blogPosts } from "../shared/schema";
import { eq, inArray } from "drizzle-orm";

const IMAGE_FIXES: Record<string, string> = {
  'must-haves-for-the-perfect-austin-bachelorette-weekend': '/attached_assets/bachelor-party-group-guys.webp',
  'lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests': '/attached_assets/clever-girl-50-person-boat.webp',
  'lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion': '/attached_assets/party-atmosphere-1.webp',
  'first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning': '/attached_assets/day-tripper-14-person-boat.webp',
  'lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials': '/attached_assets/dancing-party-scene.webp',
  'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations': '/attached_assets/party-atmosphere-2.webp'
};

async function fixImages() {
  console.log('🖼️  Fixing images in all blog posts...\n');
  
  for (const [slug, imagePath] of Object.entries(IMAGE_FIXES)) {
    const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    
    if (posts.length === 0) {
      console.log(`❌ Post not found: ${slug}`);
      continue;
    }

    const post = posts[0];
    let content = post.content || '';
    
    // Replace any Unsplash images
    content = content.replace(
      /https:\/\/images\.unsplash\.com\/[^"'\s]+/gi,
      imagePath
    );
    
    // Replace WordPress image URLs
    content = content.replace(
      /https:\/\/premierpartycruises\.com\/wp-content\/uploads\/[^"'\s]+/gi,
      imagePath
    );
    
    // Update the post
    await db.update(blogPosts)
      .set({ content, updatedAt: new Date() })
      .where(eq(blogPosts.id, post.id));
    
    console.log(`✅ Fixed images for: ${slug}`);
  }
  
  console.log('\n✨ All images fixed!');
  process.exit(0);
}

fixImages().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
