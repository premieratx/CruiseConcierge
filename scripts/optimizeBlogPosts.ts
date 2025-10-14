import { db } from "../server/db";
import { blogPosts } from "../shared/schema";
import { eq, inArray } from "drizzle-orm";
import {
  optimizeBlogPostForSEO,
  removeDuplicateH1Tags,
  centerHeaders,
  replaceUnsplashImages,
  addInternalLinks,
  getImageForBlogPost
} from "../server/services/geminiSeoOptimizer";

const BLOG_SLUGS = [
  'must-haves-for-the-perfect-austin-bachelorette-weekend',
  'lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
  'lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion',
  'first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning',
  'lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials',
  'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations'
];

async function optimizeBlogPost(slug: string) {
  console.log(`\n=== Optimizing: ${slug} ===`);
  
  // Fetch blog post
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  
  if (posts.length === 0) {
    console.log(`❌ Blog post not found: ${slug}`);
    return;
  }

  const post = posts[0];
  console.log(`📝 Title: ${post.title}`);
  console.log(`📊 Current content length: ${post.content?.length || 0} chars`);

  // Step 1: Get Gemini AI recommendations
  console.log(`🤖 Getting Gemini AI recommendations...`);
  const aiAnalysis = await optimizeBlogPostForSEO(
    post.title,
    post.content || '',
    post.metaDescription || ''
  );

  console.log(`✓ Focus Keywords: ${aiAnalysis.focusKeywords.join(', ')}`);
  console.log(`✓ SEO Improvements: ${aiAnalysis.seoImprovements.length}`);
  console.log(`✓ Internal Link Suggestions: ${aiAnalysis.internalLinks.length}`);

  // Step 2: Remove duplicate H1 tags
  console.log(`🔧 Removing duplicate H1 tags...`);
  let optimizedContent = removeDuplicateH1Tags(post.content || '');

  // Step 3: Center all headers
  console.log(`🎨 Centering headers...`);
  optimizedContent = centerHeaders(optimizedContent);

  // Step 4: Replace Unsplash images with real photos
  console.log(`📸 Replacing placeholder images with real photos...`);
  const realImage = getImageForBlogPost(slug);
  const imageMapping = {
    'unsplash': realImage
  };
  optimizedContent = replaceUnsplashImages(optimizedContent, imageMapping);

  // Step 5: Add internal links
  console.log(`🔗 Adding internal links...`);
  const internalLinks = aiAnalysis.internalLinks.map(link => ({
    text: link.text,
    url: link.url,
    position: link.context || ''
  }));
  optimizedContent = addInternalLinks(optimizedContent, internalLinks);

  // Step 6: Update database
  console.log(`💾 Updating database...`);
  await db.update(blogPosts)
    .set({
      content: optimizedContent,
      updatedAt: new Date()
    })
    .where(eq(blogPosts.id, post.id));

  console.log(`✅ Successfully optimized: ${slug}`);
  console.log(`   - Removed duplicate H1s: Yes`);
  console.log(`   - Centered headers: Yes`);
  console.log(`   - Replaced images: Yes`);
  console.log(`   - Added internal links: ${internalLinks.length}`);
  console.log(`   - New content length: ${optimizedContent.length} chars`);
}

async function main() {
  console.log('🚀 Starting SEO optimization for 6 blog posts...\n');
  
  for (const slug of BLOG_SLUGS) {
    try {
      await optimizeBlogPost(slug);
      // Add delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Error optimizing ${slug}:`, error);
    }
  }

  console.log('\n✅ All blog posts optimized!');
  process.exit(0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
