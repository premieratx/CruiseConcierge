import Database from '@replit/database';

const db = new Database();

function unwrapDbResponse(response) {
  if (!response) return null;
  if (Array.isArray(response)) return response;
  if (response?.value?.value) return response.value.value;
  if (response?.value) return response.value;
  return response;
}

// CTA templates with character counts
const CTAs = [
  " Book now!",                              // 10 chars
  " Call (512) 488-5892!",                   // 20 chars  
  " Get your free quote!",                   // 20 chars
  " Reserve today!",                         // 15 chars
  " Book your party!",                       // 17 chars
  " Call today!",                            // 12 chars
  " Learn more!",                            // 12 chars
  " Contact us now!",                        // 16 chars
];

function addCTAToMetaDescription(currentDesc, slug, title) {
  // Determine best CTA based on content
  let cta = " Book now!";
  const lower = currentDesc.toLowerCase();
  
  if (lower.includes('bachelor') || lower.includes('bachelorette')) {
    cta = " Call (512) 488-5892!";
  } else if (lower.includes('corporate') || lower.includes('business')) {
    cta = " Get your free quote!";
  } else if (lower.includes('wedding') || lower.includes('celebration')) {
    cta = " Reserve today!";
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) {
    cta = " Call (512) 488-5892!";
  }
  
  // Target final length: 150-160 chars
  const targetLength = 157; // Sweet spot
  const maxBaseLength = targetLength - cta.length;
  
  // Truncate description intelligently
  let baseDesc = currentDesc;
  
  if (baseDesc.length > maxBaseLength) {
    // Find last complete word before max length
    baseDesc = baseDesc.substring(0, maxBaseLength);
    const lastSpace = baseDesc.lastIndexOf(' ');
    if (lastSpace > maxBaseLength - 20) {
      baseDesc = baseDesc.substring(0, lastSpace);
    }
  }
  
  // Combine and ensure proper ending
  let finalDesc = baseDesc.trim();
  
  // Remove trailing punctuation that would clash with CTA
  finalDesc = finalDesc.replace(/[.,!?;:]$/, '');
  
  // Add period if it doesn't end with one
  if (!/[.!?]$/.test(finalDesc)) {
    finalDesc += '.';
  }
  
  finalDesc += cta;
  
  return finalDesc;
}

async function main() {
  console.log('🚀 Adding CTAs to Blog Meta Descriptions...\n');
  console.log('='.repeat(70));
  
  try {
    // Get all blog posts
    const indexData = await db.get('index:posts');
    const slugs = unwrapDbResponse(indexData);
    
    if (!slugs || slugs.length === 0) {
      console.log('❌ No blog posts found');
      return;
    }
    
    // Filter blogs needing CTAs
    const toUpdate = [];
    const ctas = ['book', 'call', 'get', 'learn', 'discover', 'contact', 'quote', 'reserve'];
    
    for (const slug of slugs) {
      const postData = await db.get(`post:${slug}`);
      const post = unwrapDbResponse(postData);
      
      if (!post) continue;
      
      const metaDesc = post.metaDescription || '';
      const hasCTA = ctas.some(cta => metaDesc.toLowerCase().includes(cta));
      
      // Skip test posts and posts that already have CTAs
      if (slug === 'hello-world' || slug === 'test-post-from-manus-dashboard' || hasCTA) {
        continue;
      }
      
      toUpdate.push({ slug, post });
    }
    
    console.log(`📝 Found ${toUpdate.length} blogs to update with CTAs\n`);
    
    let updated = 0;
    
    for (let i = 0; i < toUpdate.length; i++) {
      const { slug, post } = toUpdate[i];
      const progress = `[${i + 1}/${toUpdate.length}]`;
      
      const oldDesc = post.metaDescription || '';
      const newDesc = addCTAToMetaDescription(oldDesc, slug, post.title);
      
      console.log(`${progress} "${post.title.substring(0, 50)}..."`);
      console.log(`   Old (${oldDesc.length} chars): "${oldDesc.substring(0, 70)}..."`);
      console.log(`   New (${newDesc.length} chars): "${newDesc}"`);
      
      // Validate
      if (newDesc.length >= 150 && newDesc.length <= 160) {
        post.metaDescription = newDesc;
        post.metaOptimizedAt = new Date().toISOString();
        await db.set(`post:${slug}`, post);
        
        console.log(`   ✅ Updated successfully!\n`);
        updated++;
      } else {
        console.log(`   ⚠️  Length issue: ${newDesc.length} chars (skipped)\n`);
      }
    }
    
    console.log('='.repeat(70));
    console.log('✨ CTA Addition Complete!');
    console.log('='.repeat(70));
    console.log(`📊 Total processed: ${toUpdate.length}`);
    console.log(`✅ Successfully updated: ${updated}`);
    console.log(`\n📋 Next: Run audit to verify all meta descriptions`);
    console.log(`   Command: node scripts/audit-blog-meta-descriptions.js\n`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
