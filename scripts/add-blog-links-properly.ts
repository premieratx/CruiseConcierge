import { JSDOM } from 'jsdom';
import { db } from '../server/db';
import { blogPosts } from '../shared/schema';
import { eq } from 'drizzle-orm';

const INTERNAL_PAGES = {
  'https://premierpartycruises.com/': ['party boat austin', 'premier party cruises', 'lake travis cruises', 'austin boat rental', 'party boat'],
  'https://premierpartycruises.com/private-cruises': ['private cruise', 'private charter', 'private boat rental', 'exclusive cruise', 'private party'],
  'https://premierpartycruises.com/bachelorette-party-austin': ['bachelorette party', 'bachelorette cruise', 'austin bachelorette', 'bachelorette boat', 'bride party'],
  'https://premierpartycruises.com/bachelor-party-austin': ['bachelor party', 'bachelor cruise', 'austin bachelor', 'bachelor boat', 'groom party'],
  'https://premierpartycruises.com/atx-disco-cruise': ['atx disco cruise', 'disco cruise', 'friday night cruise', 'saturday night cruise', 'disco party'],
  'https://premierpartycruises.com/corporate-events': ['corporate event', 'team building', 'corporate party', 'business event'],
  'https://premierpartycruises.com/chat': ['book now', 'get quote', 'reserve', 'booking', 'make reservation'],
  'https://partyondelivery.com': ['alcohol delivery', 'party on delivery', 'liquor delivery', 'drink delivery', 'beverage delivery', 'spirits delivery', 'cocktail delivery', 'wine delivery', 'beer delivery', 'champagne delivery']
};

function addLinksToTextNodes(dom: JSDOM, linkMap: Map<string, string>) {
  const document = dom.window.document;
  const body = document.body;
  
  // Track already processed nodes
  const processedNodes = new WeakSet();
  
  function processTextNode(textNode: Text) {
    if (processedNodes.has(textNode)) return;
    processedNodes.add(textNode);
    
    // Skip if parent is already a link
    let parent = textNode.parentElement;
    while (parent) {
      if (parent.tagName === 'A') return;
      parent = parent.parentElement;
    }
    
    let text = textNode.textContent || '';
    let modified = false;
    const fragments: (string | HTMLElement)[] = [];
    let lastIndex = 0;
    
    // Find all matches and their positions
    const matches: Array<{start: number, end: number, url: string, text: string}> = [];
    
    for (const [url, keywords] of linkMap.entries()) {
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
    
    // Sort by position and remove overlaps
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
    
    // Create fragments with links
    for (const match of nonOverlapping) {
      if (match.start > lastIndex) {
        fragments.push(text.substring(lastIndex, match.start));
      }
      
      const link = document.createElement('a');
      link.href = match.url;
      link.textContent = match.text;
      fragments.push(link);
      modified = true;
      
      lastIndex = match.end;
    }
    
    if (modified) {
      if (lastIndex < text.length) {
        fragments.push(text.substring(lastIndex));
      }
      
      // Replace text node with fragments
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
    if (node.nodeType === 3) { // Text node
      processTextNode(node as Text);
    } else {
      const children = Array.from(node.childNodes);
      children.forEach(child => walkTextNodes(child));
    }
  }
  
  walkTextNodes(body);
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function fixBlogLinks(blogSlug: string) {
  // Get the blog post
  const [blog] = await db.select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, blogSlug));
  
  if (!blog) {
    console.error(`Blog not found: ${blogSlug}`);
    return;
  }
  
  console.log(`\n🔧 Processing: ${blog.title}\n`);
  
  // Parse HTML
  const dom = new JSDOM(blog.content);
  
  // Create link map from internal pages
  const linkMap = new Map<string, string[]>();
  for (const [url, keywords] of Object.entries(INTERNAL_PAGES)) {
    linkMap.set(url, keywords);
  }
  
  // Add links to text nodes only
  addLinksToTextNodes(dom, linkMap);
  
  // Get updated HTML
  const updatedContent = dom.window.document.body.innerHTML;
  
  // Count links added
  const originalLinks = (blog.content.match(/<a /g) || []).length;
  const newLinks = (updatedContent.match(/<a /g) || []).length;
  const linksAdded = newLinks - originalLinks;
  
  console.log(`✅ Added ${linksAdded} internal links`);
  console.log(`📊 Total links now: ${newLinks}\n`);
  
  // Update database
  await db.update(blogPosts)
    .set({ content: updatedContent })
    .where(eq(blogPosts.id, blog.id));
  
  console.log(`✨ Complete! Updated "${blog.title}"`);
}

// Run on specified blog
const blogSlug = process.argv[2] || 'instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination';
fixBlogLinks(blogSlug).catch(console.error);
