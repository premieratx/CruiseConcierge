import { db } from '../server/db';
import { blogPosts } from '../shared/schema';
import { eq } from 'drizzle-orm';

/**
 * Fix malformed blog links with escaped quotes in href attributes
 * Pattern: href=\"" becomes href="
 * This fixes double-encoded URLs like %2522https://example.com/%2522
 */

async function fixMalformedLinks() {
  console.log('🔍 Finding blog posts with malformed links...');
  
  const posts = await db.select().from(blogPosts);
  let fixedCount = 0;
  let totalReplacements = 0;

  for (const post of posts) {
    let content = post.content;
    const originalContent = content;

    // Fix href=\"" pattern (escaped quotes in href)
    // Pattern: href=\""https://example.com\"" 
    // Fix to: href="https://example.com"
    content = content.replace(/href=\\"([^\\]*?)\\"/g, 'href="$1"');
    
    // Fix src=\"" pattern (same issue for images)
    content = content.replace(/src=\\"([^\\]*?)\\"/g, 'src="$1"');
    
    // Fix alt=\"" pattern
    content = content.replace(/alt=\\"([^\\]*?)\\"/g, 'alt="$1"');
    
    // Count replacements for this post
    if (content !== originalContent) {
      const beforeMatches = (originalContent.match(/\\"/g) || []).length;
      const afterMatches = (content.match(/\\"/g) || []).length;
      const replacements = beforeMatches - afterMatches;
      
      await db.update(blogPosts)
        .set({ content })
        .where(eq(blogPosts.id, post.id));
      
      fixedCount++;
      totalReplacements += replacements;
      console.log(`✅ Fixed ${post.slug} (${replacements} replacements)`);
    }
  }

  console.log(`\n🎉 Done! Fixed ${fixedCount} blog posts with ${totalReplacements} total replacements`);
}

fixMalformedLinks().catch(console.error);
