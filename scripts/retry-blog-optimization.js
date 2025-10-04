// scripts/retry-blog-optimization.js
// Retry script for blogs that failed due to API rate limits

import Database from '@replit/database';
import { GoogleGenAI } from '@google/genai';

const db = new Database();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Helper function to unwrap Replit DB responses
function unwrapDbResponse(response) {
  if (!response) return null;
  if (Array.isArray(response)) return response;
  if (response?.value?.value) return response.value.value;
  if (response?.value) return response.value;
  return response;
}

// Extract content as string
function getContentAsString(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.join(' ');
  return '';
}

// Sleep function with random jitter to avoid rate limits
async function sleep(ms) {
  const jitter = Math.random() * 1000; // Add up to 1 second random jitter
  await new Promise(resolve => setTimeout(resolve, ms + jitter));
}

async function optimizeBlogContent(post) {
  const contentStr = getContentAsString(post.content);
  const contentPreview = contentStr.substring(0, 4000);
  
  const prompt = `You are an SEO expert optimizing blog content for Premier Party Cruises, Austin's premier party boat company on Lake Travis.

ORIGINAL BLOG CONTENT:
Title: ${post.title}
Content: ${contentPreview}

TASK: Add 10+ strategic internal links and promotional content.

INTERNAL LINKS TO ADD (use these exact paths - add 10+ total):
- /bachelor-party-austin (bachelor parties, ATX DISCO CRUISE)
- /bachelorette-party-austin (bachelorette parties, ATX DISCO CRUISE)
- /combined-bachelor-bachelorette-austin (combined parties)
- /party-boat-lake-travis (Lake Travis, party boats, boat rentals)
- /private-cruises (private events, custom cruises)
- /client-entertainment (corporate events, business)
- /chat (booking, quotes, pricing)
- / (Premier Party Cruises homepage)

PARTYONDELIVERY.COM LINKS:
Find: "alcohol delivery", "Party on Delivery", "beverage delivery", "drink delivery"
Link to: https://partyondelivery.com

PROMOTIONAL MESSAGES:
- ATX DISCO CRUISE is Austin's #1 bachelor/bachelorette party boat
- Premier Party Cruises = best Lake Travis party boat rentals
- Perfect for bachelor/bachelorette/corporate/wedding events

RULES:
- Add 10-15 contextual internal links
- Use keyword-rich anchor text
- Distribute links naturally
- Add 2-3 promotional sentences
- Return ONLY the complete optimized HTML content

Return the complete optimized blog HTML:`;

  const response = await genAI.models.generateContent({
    model: 'gemini-2.0-flash-lite',
    contents: [{
      role: 'user',
      parts: [{ text: prompt }]
    }]
  });

  return response.text.trim();
}

async function main() {
  console.log('🔄 RETRY: Blog Optimization for Failed Posts\n');
  console.log('='.repeat(70));
  
  try {
    // Get all blog posts
    const indexData = await db.get('index:posts');
    const slugs = unwrapDbResponse(indexData);
    
    // Filter only unoptimized blogs
    const unoptimized = [];
    for (const slug of slugs) {
      const postData = await db.get(`post:${slug}`);
      const post = unwrapDbResponse(postData);
      if (post && !post.optimizedAt) {
        unoptimized.push({ slug, post });
      }
    }
    
    console.log(`📝 Found ${unoptimized.length} blogs that need optimization\n`);
    
    if (unoptimized.length === 0) {
      console.log('✅ All blogs are already optimized!\n');
      return;
    }
    
    let updated = 0;
    let failed = 0;
    
    for (let i = 0; i < unoptimized.length; i++) {
      const { slug, post } = unoptimized[i];
      const progress = `[${i + 1}/${unoptimized.length}]`;
      
      console.log(`${progress} 🔄 Optimizing: "${post.title.substring(0, 50)}..."`);
      
      // Retry logic with exponential backoff
      let retries = 0;
      let maxRetries = 3;
      let success = false;
      
      while (retries < maxRetries && !success) {
        try {
          const optimizedContent = await optimizeBlogContent(post);
          
          // Count links
          const internalLinks = (optimizedContent.match(/href="\/[^"]+"/gi) || []).length;
          const podLinks = (optimizedContent.match(/partyondelivery\.com/gi) || []).length;
          
          // Save
          post.content = optimizedContent;
          post.hasInternalLinks = true;
          post.optimizedAt = new Date().toISOString();
          await db.set(`post:${slug}`, post);
          
          console.log(`${progress} ✅ Success! Links: ${internalLinks} internal, ${podLinks} POD\n`);
          updated++;
          success = true;
          
          // Longer sleep to avoid rate limits (4-5 seconds)
          await sleep(4000);
          
        } catch (error) {
          retries++;
          const errorMsg = error.message || JSON.stringify(error);
          
          if (errorMsg.includes('503') || errorMsg.includes('overloaded')) {
            if (retries < maxRetries) {
              const waitTime = Math.pow(2, retries) * 3000; // Exponential backoff: 6s, 12s, 24s
              console.log(`${progress} ⏳ Rate limited, retry ${retries}/${maxRetries} in ${waitTime/1000}s...`);
              await sleep(waitTime);
            } else {
              console.log(`${progress} ❌ Failed after ${maxRetries} retries: Rate limit\n`);
              failed++;
            }
          } else {
            console.log(`${progress} ❌ Error: ${errorMsg.substring(0, 80)}\n`);
            failed++;
            break;
          }
        }
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ Retry Complete!');
    console.log('='.repeat(70));
    console.log(`✅ Successfully optimized: ${updated}`);
    console.log(`❌ Still failed: ${failed}`);
    
    if (failed > 0) {
      console.log(`\n💡 Run this script again to retry the ${failed} failed blogs`);
    } else {
      console.log(`\n🎉 All blogs are now optimized with 10+ internal links!`);
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
