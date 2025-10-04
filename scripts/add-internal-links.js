// scripts/add-internal-links.js
// Adds strategic internal links from blog posts to pillar pages for SEO

import Database from "@replit/database";

const db = new Database();

// Pillar pages and their target keywords
const PILLAR_PAGES = {
  partyBoat: {
    url: '/party-boat-lake-travis',
    keywords: ['party boat', 'lake travis', 'boat rental', 'party cruise', 'boat party'],
    anchorTexts: [
      'party boat Lake Travis',
      'Lake Travis party boat',
      'party boat rental Austin',
      'Premier Party Cruises boats',
      'party boat experience'
    ]
  },
  bachelor: {
    url: '/bachelor-party-austin',
    keywords: ['bachelor', 'bachelor party', 'groom', 'groomsmen'],
    anchorTexts: [
      'bachelor party Austin',
      'Austin bachelor party boat',
      'bachelor party cruises',
      'bachelor party on Lake Travis',
      'bachelor party experience'
    ]
  },
  bachelorette: {
    url: '/bachelorette-party-austin',
    keywords: ['bachelorette', 'bachelorette party', 'bride', 'bridal party'],
    anchorTexts: [
      'bachelorette party Austin',
      'Austin bachelorette party boat',
      'bachelorette party cruises',
      'bachelorette party on Lake Travis',
      'ATX Disco Cruise'
    ]
  },
  quote: {
    url: '/chat',
    keywords: ['price', 'pricing', 'cost', 'book', 'booking', 'quote', 'reservation'],
    anchorTexts: [
      'get a quote',
      'book your cruise',
      'pricing and availability',
      'request a quote',
      'check availability'
    ]
  }
};

function analyzePostCategory(post) {
  // Handle content as array or string
  let contentStr = '';
  if (Array.isArray(post.content)) {
    contentStr = post.content.join(' ');
  } else if (typeof post.content === 'string') {
    contentStr = post.content;
  }
  
  const fullText = (post.title + ' ' + contentStr + ' ' + (post.excerpt || '')).toLowerCase();
  const categorySlug = post.categories?.[0]?.slug || post.categorySlug?.toLowerCase() || '';
  
  const relevantPillars = [];
  
  // Check bachelor party relevance
  if (categorySlug.includes('bachelor') && !categorySlug.includes('bachelorette')) {
    relevantPillars.push('bachelor');
  }
  
  // Check bachelorette party relevance
  if (categorySlug.includes('bachelorette')) {
    relevantPillars.push('bachelorette');
  }
  
  // Check party boat relevance (default for all)
  if (fullText.includes('party boat') || 
      fullText.includes('lake travis') || 
      fullText.includes('boat rental') ||
      relevantPillars.length === 0) {
    relevantPillars.push('partyBoat');
  }
  
  // Check pricing/booking relevance
  if (fullText.includes('price') || 
      fullText.includes('cost') || 
      fullText.includes('book') || 
      fullText.includes('reservation')) {
    relevantPillars.push('quote');
  }
  
  return relevantPillars;
}

function findBestInsertionPoint(contentStr, keywords) {
  // Find sentences in content
  const sentences = contentStr.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  // Look for sentences containing keywords
  for (const keyword of keywords) {
    for (const sentence of sentences) {
      if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
        return sentence.trim() + '.';
      }
    }
  }
  
  // Fallback: return first substantial sentence
  return sentences[0] ? sentences[0].trim() + '.' : null;
}

function getRandomAnchorText(pillarType) {
  const anchorTexts = PILLAR_PAGES[pillarType].anchorTexts;
  return anchorTexts[Math.floor(Math.random() * anchorTexts.length)];
}

function insertLink(content, targetSentence, url, anchorText) {
  // Find keywords in the sentence that match our anchor text
  const keywords = anchorText.toLowerCase().split(' ');
  
  // Try to find the keyword phrase in the sentence
  const sentenceLower = targetSentence.toLowerCase();
  let linkText = null;
  
  // Look for the full anchor text or parts of it in the sentence
  for (const keyword of keywords) {
    if (sentenceLower.includes(keyword)) {
      linkText = keyword;
      break;
    }
  }
  
  // Handle content as array or string
  let contentStr = '';
  let isArray = Array.isArray(content);
  if (isArray) {
    contentStr = content.join(' ');
  } else {
    contentStr = content;
  }
  
  // If we found a keyword, replace it with a link
  if (linkText) {
    const regex = new RegExp(`\\b${linkText}\\b`, 'i');
    const linkedSentence = targetSentence.replace(regex, `<a href="${url}">${linkText}</a>`);
    contentStr = contentStr.replace(targetSentence, linkedSentence);
  } else {
    // Fallback: add link at the end of sentence
    const linkedSentence = targetSentence.replace(/\.$/, ` - <a href="${url}">${anchorText}</a>.`);
    contentStr = contentStr.replace(targetSentence, linkedSentence);
  }
  
  // Return in the same format as input
  return isArray ? [contentStr] : contentStr;
}

async function addInternalLinks(post) {
  // Get content as string for checking
  let contentStr = '';
  if (Array.isArray(post.content)) {
    contentStr = post.content.join(' ');
  } else if (typeof post.content === 'string') {
    contentStr = post.content;
  }
  
  // Skip if post already has internal links
  if (contentStr.includes('href="/bachelor-party') || 
      contentStr.includes('href="/bachelorette-party') ||
      contentStr.includes('href="/party-boat-lake-travis') ||
      post.hasInternalLinks) {
    return { added: false, reason: 'already has links' };
  }
  
  // Analyze which pillar pages are relevant
  const relevantPillars = analyzePostCategory(post);
  
  if (relevantPillars.length === 0) {
    return { added: false, reason: 'no relevant pillars' };
  }
  
  let updatedContent = post.content;
  let linksAdded = 0;
  const maxLinks = Math.min(3, relevantPillars.length);
  
  // Add 2-3 contextual links
  for (let i = 0; i < maxLinks && i < relevantPillars.length; i++) {
    const pillarType = relevantPillars[i];
    const pillar = PILLAR_PAGES[pillarType];
    
    // Get content as string
    let currentContentStr = '';
    if (Array.isArray(updatedContent)) {
      currentContentStr = updatedContent.join(' ');
    } else {
      currentContentStr = updatedContent;
    }
    
    // Find best insertion point
    const targetSentence = findBestInsertionPoint(currentContentStr, pillar.keywords);
    
    if (targetSentence) {
      const anchorText = getRandomAnchorText(pillarType);
      updatedContent = insertLink(updatedContent, targetSentence, pillar.url, anchorText);
      linksAdded++;
    }
  }
  
  if (linksAdded > 0) {
    post.content = updatedContent;
    post.hasInternalLinks = true;
    return { added: true, count: linksAdded, pillars: relevantPillars };
  }
  
  return { added: false, reason: 'no insertion points found' };
}

async function processInternalLinking() {
  console.log('🔗 Starting internal linking optimization...\n');
  
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
    
    console.log(`📝 Found ${slugs.length} blog posts to process\n`);
    
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
      
      console.log(`${progress} 🔄 Processing: "${post.title}"`);
      
      const result = await addInternalLinks(post);
      
      if (result.added) {
        // Save updated post back to Replit DB
        await db.set(`post:${slug}`, post);
        console.log(`${progress} ✅ Added ${result.count} link(s) to: ${result.pillars.join(', ')}`);
        updatedCount++;
      } else {
        console.log(`${progress} ⏭️  Skipped: ${result.reason}`);
        skippedCount++;
      }
      
      console.log('');
    }
    
    console.log('\n✨ Internal linking complete!');
    console.log(`   📊 Total posts: ${slugs.length}`);
    console.log(`   ✅ Updated: ${updatedCount}`);
    console.log(`   ⏭️  Skipped: ${skippedCount}`);
    console.log('\n💾 All changes saved to Replit DB\n');
    
  } catch (error) {
    console.error('❌ Error adding internal links:', error);
    process.exit(1);
  }
}

// Run the internal linking
processInternalLinking();
