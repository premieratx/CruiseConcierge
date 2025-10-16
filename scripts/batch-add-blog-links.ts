import { JSDOM } from 'jsdom';
import { db } from '../server/db';
import { blogPosts } from '../shared/schema';

const INTERNAL_PAGES = {
  'https://premierpartycruises.com/': ['party boat austin', 'premier party cruises', 'lake travis cruises'],
  'https://premierpartycruises.com/private-cruises': ['private cruise', 'private charter', 'private boat rental'],
  'https://premierpartycruises.com/bachelorette-party-austin': ['bachelorette party', 'bachelorette cruise', 'austin bachelorette'],
  'https://premierpartycruises.com/bachelor-party-austin': ['bachelor party', 'bachelor cruise', 'austin bachelor'],
  'https://premierpartycruises.com/atx-disco-cruise': ['atx disco cruise', 'disco cruise'],
  'https://premierpartycruises.com/corporate-events': ['corporate event', 'team building', 'corporate party'],
  'https://premierpartycruises.com/chat': ['book now', 'get quote', 'booking'],
  'https://partyondelivery.com': ['alcohol delivery', 'party on delivery', 'liquor delivery', 'drink delivery', 'beverage delivery']
};

function addLinksToHTML(htmlContent: string): { content: string, linksAdded: number } {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const body = document.body;
  
  let linksAdded = 0;
  const processedNodes = new WeakSet();
  
  function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function processTextNode(textNode: Text) {
    if (processedNodes.has(textNode)) return;
    processedNodes.add(textNode);
    
    // Skip if parent is already a link or in an attribute
    let parent = textNode.parentElement;
    while (parent) {
      if (parent.tagName === 'A') return;
      parent = parent.parentElement;
    }
    
    let text = textNode.textContent || '';
    const fragments: (string | HTMLElement)[] = [];
    let lastIndex = 0;
    
    // Find all matches
    const matches: Array<{start: number, end: number, url: string, text: string}> = [];
    
    for (const [url, keywords] of Object.entries(INTERNAL_PAGES)) {
      for (const keyword of keywords) {
        const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, 'gi');
        let match;
        
        while ((match = regex.exec(text)) !== null) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            url: url,
            text: match[0]
          });
        }
      }
    }
    
    // Sort and remove overlaps
    matches.sort((a, b) => a.start - b.start);
    const nonOverlapping = [];
    for (const match of matches) {
      const overlaps = nonOverlapping.some(m => 
        (match.start >= m.start && match.start < m.end) ||
        (match.end > m.start && match.end <= m.end)
      );
      if (!overlaps) {
        nonOverlapping.push(match);
      }
    }
    
    // Create fragments
    for (const match of nonOverlapping) {
      if (match.start > lastIndex) {
        fragments.push(text.substring(lastIndex, match.start));
      }
      
      const link = document.createElement('a');
      link.href = match.url;
      link.textContent = match.text;
      fragments.push(link);
      linksAdded++;
      
      lastIndex = match.end;
    }
    
    if (linksAdded > 0) {
      if (lastIndex < text.length) {
        fragments.push(text.substring(lastIndex));
      }
      
      // Replace text node
      const parent = textNode.parentNode!;
      fragments.forEach(frag => {
        if (typeof frag === 'string') {
          parent.insertBefore(document.createTextNode(frag), textNode);
        } else {
          parent.insertBefore(frag, textNode);
        }
      });
      parent.removeChild(textNode);
    }
  }
  
  function walkTextNodes(node: Node) {
    if (node.nodeType === 3) {
      processTextNode(node as Text);
    } else {
      Array.from(node.childNodes).forEach(child => walkTextNodes(child));
    }
  }
  
  walkTextNodes(body);
  
  return {
    content: body.innerHTML,
    linksAdded
  };
}

async function processBlog() {
  const allBlogs = await db.select().from(blogPosts);
  
  console.log(`\n🚀 Processing ${allBlogs.length} blogs...\n`);
  
  let totalLinksAdded = 0;
  
  for (let i = 0; i < allBlogs.length; i++) {
    const blog = allBlogs[i];
    console.log(`[${i + 1}/${allBlogs.length}] ${blog.title}`);
    
    try {
      const { content, linksAdded } = addLinksToHTML(blog.content);
      
      if (linksAdded > 0) {
        await db.update(blogPosts)
          .set({ content })
          .where(eq(blogPosts.id, blog.id));
        
        console.log(`  ✅ Added ${linksAdded} links`);
        totalLinksAdded += linksAdded;
      } else {
        console.log(`  ℹ️  No new links added`);
      }
    } catch (error) {
      console.error(`  ❌ Error: ${error}`);
    }
  }
  
  console.log(`\n✨ Complete! Added ${totalLinksAdded} total links across ${allBlogs.length} blogs`);
  console.log(`   Average: ${Math.round(totalLinksAdded / allBlogs.length)} links per blog\n`);
}

// For use with drizzle
import { eq } from 'drizzle-orm';

processBlog().catch(console.error);
