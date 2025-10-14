import { db } from "../server/db";
import { blogPosts } from "../shared/schema";
import { eq } from "drizzle-orm";
import {
  optimizeBlogPostForSEO,
  removeDuplicateH1Tags,
  centerHeaders,
  replaceUnsplashImages,
  addInternalLinks,
  getImageForBlogPost
} from "../server/services/geminiSeoOptimizer";

const REMAINING_SLUGS = [
  'lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials',
  'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations'
];

async function optimizeBlogPost(slug: string) {
  console.log(`\n=== Optimizing: ${slug} ===`);
  
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  
  if (posts.length === 0) {
    console.log(`❌ Blog post not found: ${slug}`);
    return;
  }

  const post = posts[0];
  console.log(`📝 Title: ${post.title}`);

  // Get AI recommendations
  console.log(`🤖 Getting Gemini AI recommendations...`);
  const aiAnalysis = await optimizeBlogPostForSEO(
    post.title,
    post.content || '',
    post.metaDescription || ''
  );

  console.log(`✓ Focus Keywords: ${aiAnalysis.focusKeywords.join(', ')}`);
  console.log(`✓ Internal Links: ${aiAnalysis.internalLinks.length}`);

  // Process content
  let optimizedContent = removeDuplicateH1Tags(post.content || '');
  optimizedContent = centerHeaders(optimizedContent);
  
  const realImage = getImageForBlogPost(slug);
  optimizedContent = replaceUnsplashImages(optimizedContent, { 'unsplash': realImage });
  
  const internalLinks = aiAnalysis.internalLinks.map(link => ({
    text: link.text,
    url: link.url,
    position: link.context || ''
  }));
  optimizedContent = addInternalLinks(optimizedContent, internalLinks);

  // Update database
  await db.update(blogPosts)
    .set({
      content: optimizedContent,
      updatedAt: new Date()
    })
    .where(eq(blogPosts.id, post.id));

  console.log(`✅ Successfully optimized: ${slug}`);
}

async function main() {
  console.log('🚀 Optimizing remaining 2 blog posts...\n');
  
  for (const slug of REMAINING_SLUGS) {
    try {
      await optimizeBlogPost(slug);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Error optimizing ${slug}:`, error);
    }
  }

  console.log('\n✅ All remaining posts optimized!');
  process.exit(0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
