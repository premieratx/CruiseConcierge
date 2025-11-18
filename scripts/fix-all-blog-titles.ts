import { storage } from '../server/storage';

async function fixAllBlogTitles() {
  try {
    console.log('Fetching all published blog posts...\n');
    
    // Get all published posts
    const result = await storage.getBlogPosts({
      status: 'published',
      limit: 1000,
      offset: 0,
      sortBy: 'publishedAt',
      sortOrder: 'desc'
    });
    
    const posts = result.posts || [];
    console.log(`Found ${posts.length} published posts\n`);
    
    let updatedCount = 0;
    let alreadyGoodCount = 0;
    
    for (const post of posts) {
      const currentTitle = post.metaTitle || post.title;
      const titleLength = currentTitle.length;
      
      // Check if title has the suffix we want to remove
      const suffixes = [
        ' | Premier Party Cruises',
        ' | Premier Party Cruises Blog',
        '| Premier Party Cruises',
        '| Premier Party Cruises Blog'
      ];
      
      let newTitle = currentTitle;
      let needsUpdate = false;
      
      for (const suffix of suffixes) {
        if (currentTitle.endsWith(suffix)) {
          newTitle = currentTitle.slice(0, -suffix.length).trim();
          needsUpdate = true;
          break;
        }
      }
      
      // If title is still >60 chars, we may need manual intervention
      if (newTitle.length > 60) {
        console.log(`⚠️  Still long after removing suffix (${newTitle.length} chars):`);
        console.log(`   ${post.slug}`);
        console.log(`   "${newTitle}"\n`);
      }
      
      if (needsUpdate) {
        // Update the blog post with new metaTitle
        await storage.updateBlogPost(post.id, {
          metaTitle: newTitle
        });
        
        updatedCount++;
        console.log(`✅ Updated: ${post.slug}`);
        console.log(`   Before (${titleLength} chars): "${currentTitle}"`);
        console.log(`   After (${newTitle.length} chars): "${newTitle}"\n`);
      } else if (titleLength <= 60) {
        alreadyGoodCount++;
      } else {
        console.log(`⚠️  No suffix found but title is long (${titleLength} chars):`);
        console.log(`   ${post.slug}`);
        console.log(`   "${currentTitle}"\n`);
      }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total posts processed: ${posts.length}`);
    console.log(`✅ Updated with suffix removed: ${updatedCount}`);
    console.log(`✅ Already under 60 chars: ${alreadyGoodCount}`);
    console.log(`⚠️  May need manual attention: ${posts.length - updatedCount - alreadyGoodCount}`);
    console.log('='.repeat(80));
    
  } catch (error) {
    console.error('Error fixing blog titles:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

fixAllBlogTitles();
