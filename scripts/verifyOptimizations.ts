import { db } from "../server/db";
import { blogPosts } from "../shared/schema";
import { eq } from "drizzle-orm";

const BLOG_SLUGS = [
  'must-haves-for-the-perfect-austin-bachelorette-weekend',
  'lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
  'lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion',
  'first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning',
  'lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials',
  'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations'
];

async function verifyBlogPost(slug: string) {
  console.log(`\n=== Verifying: ${slug} ===`);
  
  const posts = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
  
  if (posts.length === 0) {
    console.log(`❌ Post not found: ${slug}`);
    return;
  }

  const post = posts[0];
  const content = post.content || '';
  
  // Check 1: Count H1 tags
  const h1Matches = content.match(/<h1[^>]*>/gi) || [];
  const h1Count = h1Matches.length;
  console.log(`📌 H1 Tags: ${h1Count} ${h1Count === 1 ? '✅' : '❌ (should be 1)'}`);
  
  // Check 2: Verify no duplicate class attributes
  const duplicateClassPattern = /class="[^"]*"\s+class="/gi;
  const duplicateClasses = content.match(duplicateClassPattern);
  console.log(`📌 Duplicate class attributes: ${duplicateClasses ? '❌ FOUND: ' + duplicateClasses.length : '✅ None'}`);
  
  // Check 3: Check headers have text-center
  const h2Matches = content.match(/<h2[^>]*>/gi) || [];
  const h3Matches = content.match(/<h3[^>]*>/gi) || [];
  const h4Matches = content.match(/<h4[^>]*>/gi) || [];
  
  const allHeaders = [...h1Matches, ...h2Matches, ...h3Matches, ...h4Matches];
  const headersWithTextCenter = allHeaders.filter(h => h.includes('text-center'));
  console.log(`📌 Headers with text-center: ${headersWithTextCenter.length}/${allHeaders.length} ${headersWithTextCenter.length === allHeaders.length ? '✅' : '❌'}`);
  
  // Check 4: Sample a few headers to show proper class merging
  console.log(`\n📋 Sample Headers:`);
  allHeaders.slice(0, 3).forEach(h => {
    console.log(`   ${h}`);
  });
  
  // Check 5: Real images from attached_assets
  const attachedAssetsImages = content.match(/\/attached_assets\/[^"'\s]+/gi) || [];
  const unsplashImages = content.match(/https:\/\/images\.unsplash\.com\/[^"'\s]+/gi) || [];
  console.log(`\n📸 Images:`);
  console.log(`   - Attached assets: ${attachedAssetsImages.length} ✅`);
  console.log(`   - Unsplash (should be 0): ${unsplashImages.length} ${unsplashImages.length === 0 ? '✅' : '❌'}`);
  
  // Check 6: Internal links
  const internalLinks = content.match(/<a href="\/[^"]*">/gi) || [];
  console.log(`\n🔗 Internal Links: ${internalLinks.length} ${internalLinks.length > 0 ? '✅' : '❌'}`);
  if (internalLinks.length > 0) {
    console.log(`   Sample: ${internalLinks.slice(0, 2).join(', ')}`);
  }
}

async function main() {
  console.log('🔍 Verifying blog post optimizations...\n');
  
  for (const slug of BLOG_SLUGS) {
    await verifyBlogPost(slug);
  }
  
  console.log('\n✅ Verification complete!');
  process.exit(0);
}

main().catch(error => {
  console.error('Verification error:', error);
  process.exit(1);
});
