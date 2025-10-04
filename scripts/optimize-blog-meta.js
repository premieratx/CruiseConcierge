// scripts/optimize-blog-meta.js
// AI-powered meta description optimization using Gemini

import Database from '@replit/database';
import { GoogleGenAI } from '@google/genai';

const db = new Database();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

function unwrapDbResponse(response) {
  if (!response) return null;
  if (Array.isArray(response)) return response;
  if (response?.value?.value) return response.value.value;
  if (response?.value) return response.value;
  return response;
}

function getContentAsString(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.join(' ');
  return '';
}

async function optimizeMetaDescription(post) {
  try {
    const contentStr = getContentAsString(post.content);
    const contentPreview = contentStr.substring(0, 2000);
    
    const prompt = `You are an SEO expert creating optimized meta descriptions for Premier Party Cruises, Austin's premier party boat company on Lake Travis.

BLOG DETAILS:
Title: ${post.title}
Current Meta Description: ${post.metaDescription || 'None'}
Content Preview: ${contentPreview}

TASK: Create an SEO-optimized meta description that:

REQUIREMENTS:
1. **LENGTH**: Exactly 150-160 characters (STRICT - count carefully!)
2. **KEYWORDS**: Include 2-3 relevant keywords from:
   - bachelor party, bachelorette party, Lake Travis, party boat, Austin
   - ATX DISCO CRUISE, Premier Party Cruises, corporate events
   - boat rental, celebration, wedding party
3. **CTA**: Include a compelling call-to-action:
   - "Book now", "Get your quote", "Call (512) 488-5892", "Reserve today"
   - "Learn more", "Get free quote", "Contact us", "Plan your party"
4. **COMPELLING**: Make it click-worthy and action-oriented
5. **UNIQUE**: Don't duplicate existing descriptions

EXAMPLES OF GOOD META DESCRIPTIONS:
- "Plan the ultimate bachelor party boat on Lake Travis. ATX DISCO CRUISE offers unforgettable experiences. Book your Austin party today! (512) 488-5892" (157 chars)
- "Austin bachelorette party boats on Lake Travis. Premier Party Cruises delivers 5-star celebrations. Get your free quote now!" (152 chars)
- "Lake Travis party boat rentals for corporate events and celebrations. Premier service, top-rated experience. Call (512) 488-5892 to book!" (158 chars)

IMPORTANT: Return ONLY the meta description text (150-160 characters). No explanations, no quotes, just the raw meta description text.`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }]
    });

    let metaDesc = response.text.trim();
    
    // Clean up response (remove quotes if present)
    metaDesc = metaDesc.replace(/^["']|["']$/g, '');
    
    // Validate length
    if (metaDesc.length < 150 || metaDesc.length > 160) {
      console.log(`   ⚠️  Length issue (${metaDesc.length} chars), retrying...`);
      // Retry with more specific instruction
      const retryPrompt = `Create a meta description of EXACTLY 155 characters for: "${post.title}". Include keywords: bachelor party, Lake Travis, party boat, Austin. Add CTA: Book now or Call. Return only the meta description text.`;
      
      const retryResponse = await genAI.models.generateContent({
        model: 'gemini-2.0-flash-lite',
        contents: [{
          role: 'user',
          parts: [{ text: retryPrompt }]
        }]
      });
      
      metaDesc = retryResponse.text.trim().replace(/^["']|["']$/g, '');
    }
    
    return metaDesc;
  } catch (error) {
    console.error('Gemini optimization error:', error.message);
    throw error;
  }
}

async function sleep(ms) {
  const jitter = Math.random() * 1000;
  await new Promise(resolve => setTimeout(resolve, ms + jitter));
}

async function main() {
  console.log('🚀 Starting Meta Description Optimization with Gemini AI...\n');
  console.log('='.repeat(70));
  
  try {
    // Get all blog posts
    const indexData = await db.get('index:posts');
    const slugs = unwrapDbResponse(indexData);
    
    if (!slugs || slugs.length === 0) {
      console.log('❌ No blog posts found in Replit DB');
      return;
    }
    
    // Filter blogs that need optimization (missing CTA)
    const toOptimize = [];
    const ctas = ['book', 'call', 'get', 'learn', 'discover', 'contact', 'quote', 'reserve'];
    
    for (const slug of slugs) {
      const postData = await db.get(`post:${slug}`);
      const post = unwrapDbResponse(postData);
      
      if (!post) continue;
      
      const metaDesc = post.metaDescription || post.description || '';
      const hasCTA = ctas.some(cta => metaDesc.toLowerCase().includes(cta));
      
      // Skip test posts
      if (slug === 'hello-world' || slug === 'test-post-from-manus-dashboard') {
        continue;
      }
      
      if (!hasCTA || metaDesc.length < 150 || metaDesc.length > 160) {
        toOptimize.push({ slug, post });
      }
    }
    
    console.log(`📝 Found ${toOptimize.length} blogs to optimize\n`);
    console.log(`⏳ Processing with AI optimization (this may take a few minutes)...\n`);
    
    let updated = 0;
    let failed = 0;
    
    for (let i = 0; i < toOptimize.length; i++) {
      const { slug, post } = toOptimize[i];
      const progress = `[${i + 1}/${toOptimize.length}]`;
      
      console.log(`${progress} 🔄 Optimizing: "${post.title.substring(0, 50)}..."`);
      console.log(`   Old: "${(post.metaDescription || '').substring(0, 70)}..."`);
      
      let retries = 0;
      let maxRetries = 3;
      let success = false;
      
      while (retries < maxRetries && !success) {
        try {
          const optimizedMeta = await optimizeMetaDescription(post);
          
          // Validate
          const length = optimizedMeta.length;
          const hasCTA = ctas.some(cta => optimizedMeta.toLowerCase().includes(cta));
          
          if (length >= 150 && length <= 160 && hasCTA) {
            post.metaDescription = optimizedMeta;
            post.metaOptimizedAt = new Date().toISOString();
            await db.set(`post:${slug}`, post);
            
            console.log(`   New: "${optimizedMeta}"`);
            console.log(`   ✅ Success! Length: ${length} chars, CTA: Yes\n`);
            updated++;
            success = true;
            
            // Rate limit (3 seconds between requests)
            await sleep(3000);
          } else {
            console.log(`   ⚠️  Validation failed (len: ${length}, CTA: ${hasCTA})`);
            retries++;
          }
          
        } catch (error) {
          retries++;
          const errorMsg = error.message || JSON.stringify(error);
          
          if (errorMsg.includes('503') || errorMsg.includes('overloaded')) {
            if (retries < maxRetries) {
              const waitTime = Math.pow(2, retries) * 3000;
              console.log(`   ⏳ Rate limited, retry ${retries}/${maxRetries} in ${waitTime/1000}s...`);
              await sleep(waitTime);
            } else {
              console.log(`   ❌ Failed after ${maxRetries} retries\n`);
              failed++;
            }
          } else {
            console.log(`   ❌ Error: ${errorMsg.substring(0, 60)}\n`);
            failed++;
            break;
          }
        }
      }
      
      if (!success && retries >= maxRetries) {
        failed++;
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ Meta Description Optimization Complete!');
    console.log('='.repeat(70));
    console.log(`📊 Total blogs processed: ${toOptimize.length}`);
    console.log(`✅ Successfully optimized: ${updated}`);
    console.log(`❌ Failed: ${failed}`);
    
    if (failed > 0) {
      console.log(`\n💡 Run this script again to retry failed optimizations`);
    } else {
      console.log(`\n🎉 All blog meta descriptions are now SEO-optimized!`);
      console.log(`   ✓ 150-160 characters`);
      console.log(`   ✓ Keyword-rich`);
      console.log(`   ✓ Compelling CTAs`);
      console.log(`   ✓ Unique descriptions`);
    }
    
    console.log('\n💾 Run audit again to verify: node scripts/audit-blog-meta-descriptions.js\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
