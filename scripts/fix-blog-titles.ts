import { storage } from '../server/storage';

/**
 * Script to fix all blog post titles by removing the "| Premier Party Cruises" suffix
 * This ensures all titles comply with the 60-character SEO limit
 */

async function fixBlogTitles() {
  console.log('🔍 Starting blog title cleanup...\n');
  
  try {
    // Fetch all blog posts (both published and drafts)
    const allPosts = await storage.getBlogPosts({
      status: undefined, // Get all statuses
      limit: 1000,
      offset: 0
    });
    
    if (!allPosts || !allPosts.posts || allPosts.posts.length === 0) {
      console.log('No blog posts found in database.');
      return;
    }
    
    console.log(`Found ${allPosts.posts.length} blog posts to process\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    const updates: Array<{before: string, after: string, slug: string}> = [];
    
    for (const post of allPosts.posts) {
      // Check if metaTitle or title has the suffix
      const metaTitleToCheck = post.metaTitle || post.title;
      const titleToCheck = post.title;
      
      // Pattern to match "| Premier Party Cruises" or "| Premier Party Cruises Blog" at the end
      const suffixPattern = /\s*\|\s*Premier Party Cruises(\s+Blog)?$/i;
      
      let needsUpdate = false;
      let newMetaTitle = metaTitleToCheck;
      let newTitle = titleToCheck;
      
      // Fix metaTitle if it has the suffix
      if (suffixPattern.test(metaTitleToCheck)) {
        newMetaTitle = metaTitleToCheck.replace(suffixPattern, '').trim();
        needsUpdate = true;
      }
      
      // Fix title if it has the suffix (less common but check anyway)
      if (suffixPattern.test(titleToCheck)) {
        newTitle = titleToCheck.replace(suffixPattern, '').trim();
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        try {
          // Update the blog post
          await storage.updateBlogPost(post.id, {
            title: newTitle,
            metaTitle: newMetaTitle,
            updatedAt: new Date()
          });
          
          updates.push({
            before: metaTitleToCheck,
            after: newMetaTitle,
            slug: post.slug || 'unknown'
          });
          
          updatedCount++;
          console.log(`✅ Updated: ${post.slug}`);
          console.log(`   Before: "${metaTitleToCheck}" (${metaTitleToCheck.length} chars)`);
          console.log(`   After:  "${newMetaTitle}" (${newMetaTitle.length} chars)\n`);
        } catch (error) {
          console.error(`❌ Failed to update ${post.slug}:`, error);
        }
      } else {
        skippedCount++;
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 BLOG TITLE CLEANUP SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total posts processed: ${allPosts.posts.length}`);
    console.log(`Posts updated: ${updatedCount}`);
    console.log(`Posts skipped (no changes needed): ${skippedCount}`);
    
    if (updates.length > 0) {
      console.log('\n' + '='.repeat(80));
      console.log('📝 DETAILED UPDATE LOG');
      console.log('='.repeat(80));
      updates.forEach(update => {
        console.log(`\nSlug: ${update.slug}`);
        console.log(`Before: "${update.before}" (${update.before.length} chars)`);
        console.log(`After:  "${update.after}" (${update.after.length} chars)`);
        console.log(`Saved:  ${update.before.length - update.after.length} characters`);
      });
    }
    
    console.log('\n✨ Blog title cleanup complete!\n');
    
  } catch (error) {
    console.error('❌ Error during blog title cleanup:', error);
    throw error;
  }
}

// Run the script
fixBlogTitles()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
