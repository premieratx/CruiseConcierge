import Database from '@replit/database';

function unwrapDbResponse(response) {
  if (!response) return null;
  
  // Handle array responses (index lists)
  if (Array.isArray(response)) {
    return response;
  }
  
  // Handle double-wrapped responses: {ok: true, value: {ok: true, value: data}}
  if (response?.value?.value) {
    return response.value.value;
  }
  
  // Handle single-wrapped responses: {ok: true, value: data}
  if (response?.value) {
    return response.value;
  }
  
  // Return as-is if not wrapped
  return response;
}

async function auditMetaDescriptions() {
  const db = new Database();
  
  console.log('🔍 Starting Meta Description Audit...\n');
  console.log('='.repeat(70));
  
  const indexData = await db.get('index:posts');
  const slugs = unwrapDbResponse(indexData);
  
  if (!slugs || slugs.length === 0) {
    console.log('❌ No blog posts found in Replit DB');
    return;
  }
  
  const issues = [];
  const goodDescriptions = [];
  const duplicates = new Map();
  
  console.log(`📝 Auditing ${slugs.length} blog posts...\n`);
  
  for (const slug of slugs) {
    const postData = await db.get(`post:${slug}`);
    const post = unwrapDbResponse(postData);
    
    if (!post) {
      console.log(`⚠️  Post not found: ${slug}`);
      continue;
    }
    
    const metaDesc = post.metaDescription || post.description || post.excerpt || '';
    const length = metaDesc.length;
    
    const analysis = {
      title: post.title,
      slug: slug,
      metaDescription: metaDesc,
      length: length,
      issues: []
    };
    
    // Check if meta description exists
    if (!metaDesc) {
      analysis.issues.push('MISSING');
    } else {
      // Check length
      if (length < 150) analysis.issues.push('TOO_SHORT');
      if (length > 160) analysis.issues.push('TOO_LONG');
      
      // Check for keywords
      const keywords = ['bachelor', 'bachelorette', 'lake travis', 'party boat', 'austin', 'corporate', 'atx disco'];
      const hasKeyword = keywords.some(kw => metaDesc.toLowerCase().includes(kw));
      if (!hasKeyword) analysis.issues.push('NO_KEYWORDS');
      
      // Check for CTA
      const ctas = ['book', 'call', 'get', 'learn', 'discover', 'contact', 'quote', 'reserve'];
      const hasCTA = ctas.some(cta => metaDesc.toLowerCase().includes(cta));
      if (!hasCTA) analysis.issues.push('NO_CTA');
      
      // Track duplicates
      if (duplicates.has(metaDesc)) {
        duplicates.get(metaDesc).push(slug);
        analysis.issues.push('DUPLICATE');
      } else {
        duplicates.set(metaDesc, [slug]);
      }
    }
    
    if (analysis.issues.length > 0) {
      issues.push(analysis);
    } else {
      goodDescriptions.push(analysis);
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 META DESCRIPTION AUDIT RESULTS');
  console.log('='.repeat(70));
  console.log(`\n📈 SUMMARY:`);
  console.log(`   Total blogs: ${slugs.length}`);
  console.log(`   ✅ Good descriptions: ${goodDescriptions.length}`);
  console.log(`   ⚠️  Needs optimization: ${issues.length}`);
  
  // Breakdown by issue type
  const issueTypes = {
    MISSING: issues.filter(i => i.issues.includes('MISSING')).length,
    TOO_SHORT: issues.filter(i => i.issues.includes('TOO_SHORT')).length,
    TOO_LONG: issues.filter(i => i.issues.includes('TOO_LONG')).length,
    NO_KEYWORDS: issues.filter(i => i.issues.includes('NO_KEYWORDS')).length,
    NO_CTA: issues.filter(i => i.issues.includes('NO_CTA')).length,
    DUPLICATE: issues.filter(i => i.issues.includes('DUPLICATE')).length
  };
  
  console.log(`\n📋 ISSUE BREAKDOWN:`);
  console.log(`   ❌ Missing description: ${issueTypes.MISSING}`);
  console.log(`   📏 Too short (< 150 chars): ${issueTypes.TOO_SHORT}`);
  console.log(`   📏 Too long (> 160 chars): ${issueTypes.TOO_LONG}`);
  console.log(`   🔑 Missing keywords: ${issueTypes.NO_KEYWORDS}`);
  console.log(`   📣 Missing CTA: ${issueTypes.NO_CTA}`);
  console.log(`   🔄 Duplicate: ${issueTypes.DUPLICATE}`);
  
  if (goodDescriptions.length > 0) {
    console.log(`\n✅ BLOGS WITH GOOD META DESCRIPTIONS (${goodDescriptions.length}):\n`);
    goodDescriptions.slice(0, 5).forEach(item => {
      console.log(`   ✓ "${item.title.substring(0, 60)}..."`);
      console.log(`     Length: ${item.length} chars`);
      console.log(`     Description: "${item.metaDescription.substring(0, 80)}..."`);
      console.log('');
    });
    if (goodDescriptions.length > 5) {
      console.log(`   ... and ${goodDescriptions.length - 5} more\n`);
    }
  }
  
  if (issues.length > 0) {
    console.log(`\n⚠️  BLOGS NEEDING OPTIMIZATION (${issues.length}):\n`);
    issues.forEach((item, idx) => {
      console.log(`${idx + 1}. ❌ "${item.title}"`);
      console.log(`   Slug: ${item.slug}`);
      console.log(`   Length: ${item.length} chars`);
      console.log(`   Issues: ${item.issues.join(', ')}`);
      if (item.metaDescription) {
        console.log(`   Current: "${item.metaDescription.substring(0, 100)}${item.metaDescription.length > 100 ? '...' : ''}"`);
      } else {
        console.log(`   Current: [NO META DESCRIPTION]`);
      }
      console.log('');
    });
  }
  
  // Check for duplicates
  const duplicateGroups = Array.from(duplicates.entries()).filter(([_, slugs]) => slugs.length > 1);
  if (duplicateGroups.length > 0) {
    console.log(`\n🔄 DUPLICATE META DESCRIPTIONS FOUND (${duplicateGroups.length} groups):\n`);
    duplicateGroups.forEach(([desc, slugs]) => {
      console.log(`   "${desc.substring(0, 80)}..."`);
      console.log(`   Used by ${slugs.length} blogs: ${slugs.join(', ')}`);
      console.log('');
    });
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('💡 RECOMMENDATIONS:');
  console.log('='.repeat(70));
  
  if (issues.length > slugs.length * 0.5) {
    console.log(`\n⚠️  More than 50% of blogs need optimization (${issues.length}/${slugs.length})`);
    console.log(`\n📝 NEXT STEP: Run optimization script to fix meta descriptions`);
    console.log(`   Command: node scripts/optimize-blog-meta.js`);
    console.log(`\n   This will use Gemini AI to generate optimized meta descriptions:`);
    console.log(`   - 150-160 characters`);
    console.log(`   - Keyword-rich (bachelor, bachelorette, Lake Travis, party boat, etc.)`);
    console.log(`   - Compelling CTAs (Book, Get quote, Call, etc.)`);
    console.log(`   - Unique for each blog`);
  } else {
    console.log(`\n✅ Most blogs have good meta descriptions!`);
    console.log(`   Only ${issues.length} need manual review/optimization`);
  }
  
  console.log('\n');
}

auditMetaDescriptions().catch(error => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
