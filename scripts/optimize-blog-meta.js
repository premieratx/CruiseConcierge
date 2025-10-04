// scripts/optimize-blog-meta.js
// Optimizes blog post meta descriptions with keyword-rich content for SEO

import Database from "@replit/database";

const db = new Database();

// Target SEO keywords to incorporate
const TARGET_KEYWORDS = [
  "party boat Austin",
  "bachelor party Austin", 
  "bachelorette party Austin",
  "Lake Travis"
];

function generateMetaDescription(post) {
  // Get category info
  const categorySlug = post.categories?.[0]?.slug || post.categorySlug || '';
  const categoryName = post.categories?.[0]?.name || post.categoryName || 'Party Boat';
  
  // Determine relevant keyword based on category
  let keyword = 'party boat Austin';
  if (categorySlug.includes('bachelor') && !categorySlug.includes('bachelorette')) {
    keyword = 'bachelor party Austin';
  } else if (categorySlug.includes('bachelorette')) {
    keyword = 'bachelorette party Austin';
  }
  
  // Extract first sentence or use excerpt
  let description = post.excerpt || '';
  if (!description && post.content) {
    const contentStr = Array.isArray(post.content) ? post.content.join(' ') : post.content;
    const firstSentence = contentStr.split('.')[0];
    description = firstSentence.substring(0, 120);
  }
  
  // Build SEO-optimized description
  let metaDesc = '';
  
  if (description && description.length > 50) {
    // Use existing description and append keyword CTA
    metaDesc = `${description.substring(0, 130)}. ${keyword} on Lake Travis!`;
  } else {
    // Build from scratch
    const title = post.title.substring(0, 80);
    metaDesc = `${title} - Ultimate ${keyword} guide. Book your Lake Travis party boat today!`;
  }
  
  // Ensure within character limits (150-160 is ideal)
  if (metaDesc.length > 160) {
    metaDesc = metaDesc.substring(0, 157) + '...';
  }
  
  return metaDesc;
}

async function optimizeBlogMeta() {
  console.log('🚀 Starting blog meta description optimization...\n');
  
  try {
    // Fetch all blog post slugs from Replit DB index
    const postsIndexRaw = await db.get("index:posts");
    
    // Handle double-wrapped Replit DB response format
    let slugs = [];
    if (Array.isArray(postsIndexRaw)) {
      slugs = postsIndexRaw;
    } else if (postsIndexRaw?.value?.value && Array.isArray(postsIndexRaw.value.value)) {
      // Double-wrapped: {ok: true, value: {ok: true, value: [array]}}
      slugs = postsIndexRaw.value.value;
    } else if (postsIndexRaw?.value && Array.isArray(postsIndexRaw.value)) {
      // Single-wrapped: {ok: true, value: [array]}
      slugs = postsIndexRaw.value;
    }
    
    if (!slugs || slugs.length === 0) {
      console.log('❌ No blog posts found in Replit DB');
      return;
    }
    
    console.log(`📝 Found ${slugs.length} blog posts to optimize\n`);
    
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      const progress = `[${i + 1}/${slugs.length}]`;
      
      // Fetch individual post
      const postRaw = await db.get(`post:${slug}`);
      
      // Handle wrapped response for individual posts
      let post = null;
      if (postRaw?.value?.value) {
        post = postRaw.value.value;
      } else if (postRaw?.value) {
        post = postRaw.value;
      } else {
        post = postRaw;
      }
      
      if (!post) {
        console.log(`${progress} ⚠️  Post not found: ${slug}`);
        continue;
      }
      
      // Skip if already has a good meta description
      if (post.metaDescription && post.metaDescription.length >= 100) {
        console.log(`${progress} ⏭️  Skipping "${post.title}" - already has meta description`);
        skippedCount++;
        continue;
      }
      
      console.log(`${progress} 🔄 Generating for: "${post.title}"`);
      
      // Generate optimized meta description
      const metaDescription = generateMetaDescription(post);
      
      // Update the post
      post.metaDescription = metaDescription;
      
      // Save updated post back to Replit DB
      await db.set(`post:${slug}`, post);
      
      console.log(`${progress} ✅ Generated: "${metaDescription}"`);
      console.log('');
      
      updatedCount++;
      
      // Small delay to be gentle on the DB
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n✨ Optimization complete!');
    console.log(`   📊 Total posts: ${slugs.length}`);
    console.log(`   ✅ Updated: ${updatedCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    console.log('\n💾 All changes saved to Replit DB\n');
    
  } catch (error) {
    console.error('❌ Error optimizing blog meta descriptions:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeBlogMeta();
