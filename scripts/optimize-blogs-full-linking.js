// scripts/optimize-blogs-full-linking.js
// Comprehensive blog optimization with 10+ internal links per blog using Gemini AI

import Database from '@replit/database';
import { GoogleGenAI } from '@google/genai';

const db = new Database();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Helper function to unwrap Replit DB responses
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

// Extract content as string from various formats
function getContentAsString(content) {
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content.join(' ');
  }
  return '';
}

async function optimizeBlogContent(post) {
  try {
    const contentStr = getContentAsString(post.content);
    const contentPreview = contentStr.substring(0, 4000); // Send first 4000 chars to Gemini
    
    const prompt = `You are an SEO expert optimizing blog content for Premier Party Cruises, Austin's premier party boat company on Lake Travis.

ORIGINAL BLOG CONTENT:
Title: ${post.title}
Content: ${contentPreview}

TASK: Add 10+ strategic internal links and promotional content to this blog post.

INTERNAL LINKS TO ADD (use these exact paths - add 10+ total):
- /bachelor-party-austin (for bachelor parties, ATX DISCO CRUISE mentions)
- /bachelorette-party-austin (for bachelorette parties, ATX DISCO CRUISE mentions)
- /combined-bachelor-bachelorette-austin (for combined parties)
- /party-boat-lake-travis (for Lake Travis, party boats, boat rentals)
- /private-cruises (for private events, custom cruises)
- /client-entertainment (for corporate events, business entertainment)
- /chat (for booking, quotes, pricing inquiries)
- / (for Premier Party Cruises homepage mentions)

PARTYONDELIVERY.COM LINKS:
- Find ANY mentions of: "alcohol delivery", "Party on Delivery", "Party On Delivery", "beverage delivery", "alcohol setup", "drink delivery"
- Replace or add links to: https://partyondelivery.com
- Use anchor text like: "Party on Delivery", "alcohol delivery service", "beverage delivery"

KEY PROMOTIONAL MESSAGES TO NATURALLY INTEGRATE:
1. ATX DISCO CRUISE is Austin's #1 bachelor party and bachelorette party boat experience
2. Premier Party Cruises offers the best Lake Travis party boat rentals
3. Perfect for bachelor parties, bachelorette parties, corporate events, and wedding celebrations
4. Lake Travis provides the ultimate party boat venue

LINKING STRATEGY:
1. Add 10-15 contextual internal links throughout the content
2. Use keyword-rich anchor text (e.g., "bachelor party boat Austin", "Lake Travis bachelorette cruise", "ATX DISCO CRUISE", "party boat rental")
3. Distribute links naturally - don't cluster them
4. Add 2-3 promotional sentences that feel organic to the content
5. Link alcohol/beverage mentions to https://partyondelivery.com
6. Ensure all links feel natural and valuable to readers

EXAMPLE LINK PATTERNS TO USE:
- "Looking for the ultimate <a href="/bachelor-party-austin">bachelor party in Austin</a>?"
- "The <a href="/bachelor-party-austin">ATX DISCO CRUISE</a> is Austin's premier party boat experience"
- "Perfect for <a href="/client-entertainment">corporate events</a> on Lake Travis"
- "Don't forget to arrange <a href="https://partyondelivery.com">alcohol delivery with Party on Delivery</a>"
- "<a href="/">Premier Party Cruises</a> offers the best <a href="/party-boat-lake-travis">Lake Travis party boat rentals</a>"
- "<a href="/chat">Get a free quote</a> for your celebration"

IMPORTANT RULES:
- Return ONLY the complete optimized HTML content (full blog post)
- Keep the original content structure and quality
- Add links naturally within existing sentences or add new contextual sentences
- Do NOT over-optimize or make it spammy
- Preserve all existing formatting, images, and structure
- Add promotional content that enhances value for readers

Return the complete optimized HTML blog content below:`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: [{
        role: 'user',
        parts: [{
          text: prompt
        }]
      }]
    });

    const result = response.text;
    return result.trim();
  } catch (error) {
    console.error('Gemini optimization error:', error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting comprehensive blog optimization with Gemini AI...\n');
  console.log('   📋 Task: Add 10+ internal links per blog');
  console.log('   🎯 Promote: ATX DISCO CRUISE, Premier Party Cruises services');
  console.log('   🔗 Link: PartyonDelivery.com for alcohol mentions\n');
  
  try {
    // Get all blog posts from Replit DB
    const indexData = await db.get('index:posts');
    const slugs = unwrapDbResponse(indexData);
    
    if (!slugs || slugs.length === 0) {
      console.log('❌ No blog posts found in Replit DB');
      return;
    }
    
    console.log(`📝 Found ${slugs.length} blog posts to optimize\n`);
    console.log('⏳ This will take some time due to AI processing and rate limits...\n');
    
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    
    for (let i = 0; i < slugs.length; i++) {
      const slug = slugs[i];
      const progress = `[${i + 1}/${slugs.length}]`;
      
      // Fetch individual post
      const postData = await db.get(`post:${slug}`);
      const post = unwrapDbResponse(postData);
      
      if (!post || !post.content) {
        console.log(`${progress} ⚠️  Post not found or empty: ${slug}`);
        skipped++;
        continue;
      }
      
      console.log(`${progress} 🔄 Optimizing: "${post.title}"`);
      
      try {
        // Optimize content with AI
        const optimizedContent = await optimizeBlogContent(post);
        
        // Count links added
        const originalContent = getContentAsString(post.content);
        const originalLinks = (originalContent.match(/<a href/gi) || []).length;
        const newLinks = (optimizedContent.match(/<a href/gi) || []).length;
        const linksAdded = newLinks - originalLinks;
        
        const partyOnDeliveryLinks = (optimizedContent.match(/partyondelivery\.com/gi) || []).length;
        const internalLinks = (optimizedContent.match(/href="\/[^"]+"/gi) || []).length;
        
        // Save optimized content
        post.content = optimizedContent;
        post.hasInternalLinks = true;
        post.optimizedAt = new Date().toISOString();
        
        await db.set(`post:${slug}`, post);
        
        console.log(`${progress} ✅ Success!`);
        console.log(`          📊 Internal links: ${internalLinks}`);
        console.log(`          🔗 PartyonDelivery links: ${partyOnDeliveryLinks}`);
        console.log(`          ➕ New links added: ${linksAdded}`);
        console.log('');
        
        updated++;
        
        // Rate limit to avoid API throttling (2 seconds between requests)
        if (i < slugs.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        console.log(`${progress} ❌ Error: ${error.message}`);
        console.log('');
        errors++;
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✨ Blog Optimization Complete!');
    console.log('='.repeat(60));
    console.log(`📊 Total posts processed: ${slugs.length}`);
    console.log(`✅ Successfully optimized: ${updated}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log(`❌ Errors: ${errors}`);
    console.log('\n💾 All changes saved to Replit DB');
    console.log('🎯 Blogs now have 10+ internal links promoting Premier Party Cruises!');
    console.log('🔗 PartyonDelivery.com linked for alcohol delivery mentions');
    console.log('🚀 ATX DISCO CRUISE promoted for bachelor/bachelorette parties\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the optimization
main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
