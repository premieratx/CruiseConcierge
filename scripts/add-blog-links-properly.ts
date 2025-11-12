import { JSDOM } from 'jsdom';
import { db } from '../server/db';
import { blogPosts } from '../shared/schema';
import { eq } from 'drizzle-orm';

const INTERNAL_PAGES = {
  // Core Pages
  'https://premierpartycruises.com/': ['party boat austin', 'premier party cruises', 'lake travis cruises', 'austin boat rental', 'party boat'],
  'https://premierpartycruises.com/private-cruises': ['private cruise', 'private charter', 'private boat rental', 'exclusive cruise', 'private party'],
  'https://premierpartycruises.com/bachelorette-party-austin': ['bachelorette party', 'bachelorette cruise', 'austin bachelorette', 'bachelorette boat', 'bride party'],
  'https://premierpartycruises.com/bachelor-party-austin': ['bachelor party', 'bachelor cruise', 'austin bachelor', 'bachelor boat', 'groom party'],
  'https://premierpartycruises.com/atx-disco-cruise': ['atx disco cruise', 'disco cruise', 'friday night cruise', 'saturday night cruise', 'disco party'],
  'https://premierpartycruises.com/corporate-events': ['corporate event', 'team building', 'corporate party', 'business event'],
  'https://premierpartycruises.com/chat': ['book now', 'get quote', 'reserve', 'booking', 'make reservation'],
  'https://partyondelivery.com': ['alcohol delivery', 'party on delivery', 'liquor delivery', 'drink delivery', 'beverage delivery', 'spirits delivery', 'cocktail delivery', 'wine delivery', 'beer delivery', 'champagne delivery'],
  
  // Service Pages - Birthday & Milestone Events
  'https://premierpartycruises.com/birthday-parties': ['birthday party boat', 'birthday cruise austin', 'lake travis birthday', 'birthday celebration boat', 'milestone birthday'],
  'https://premierpartycruises.com/milestone-birthday': ['milestone birthday party', '30th birthday boat', '40th birthday cruise', '50th birthday celebration', 'special birthday austin'],
  'https://premierpartycruises.com/sweet-16': ['sweet 16 party boat', 'sweet sixteen cruise', 'teen birthday party austin', 'lake travis sweet 16', '16th birthday celebration'],
  'https://premierpartycruises.com/graduation-party': ['graduation party boat', 'graduation cruise', 'austin graduation celebration', 'lake travis graduation', 'grad party cruise'],
  
  // Service Pages - Combined & Joint Parties
  'https://premierpartycruises.com/combined-bachelor-bachelorette-austin': ['combined bachelor bachelorette', 'joint bachelor party', 'co-ed bachelor party austin', 'jack and jill party boat', 'combined wedding party'],
  'https://premierpartycruises.com/joint-bachelor-bachelorette-parties': ['joint bachelor bachelorette party', 'jack and jill cruise', 'co-ed wedding party', 'couples bachelor party', 'combined celebration'],
  
  // Service Pages - Corporate & Business Events
  'https://premierpartycruises.com/team-building': ['team building event', 'corporate team building austin', 'company team building cruise', 'office team building', 'team bonding lake travis'],
  'https://premierpartycruises.com/company-milestone': ['company milestone celebration', 'business anniversary party', 'corporate milestone event', 'company achievement celebration', 'business success party'],
  'https://premierpartycruises.com/client-entertainment': ['client entertainment', 'corporate client event', 'client appreciation cruise', 'business client party', 'entertain clients austin'],
  
  // Service Pages - Wedding Related
  'https://premierpartycruises.com/rehearsal-dinner': ['rehearsal dinner cruise', 'wedding rehearsal boat', 'rehearsal dinner austin', 'lake travis rehearsal dinner', 'pre-wedding dinner boat'],
  'https://premierpartycruises.com/after-party': ['wedding after party', 'reception after party boat', 'post-wedding party', 'after party cruise austin', 'wedding celebration continuation'],
  'https://premierpartycruises.com/welcome-party': ['wedding welcome party', 'welcome party cruise', 'destination wedding welcome', 'pre-wedding welcome party', 'guest welcome event'],
  
  // Resource Pages
  'https://premierpartycruises.com/testimonials-faq': ['customer reviews', 'client testimonials', 'cruise reviews austin', 'party boat testimonials', 'frequently asked questions'],
  'https://premierpartycruises.com/faq': ['faqs', 'common questions', 'party boat questions', 'cruise information', 'booking questions'],
  'https://premierpartycruises.com/gallery': ['photo gallery', 'party boat photos', 'cruise pictures', 'lake travis photos', 'event gallery'],
  'https://premierpartycruises.com/contact': ['contact us', 'reach out', 'get in touch', 'contact information', 'customer service'],
  
  // Booking Pages
  'https://premierpartycruises.com/book-now': ['book your cruise', 'reserve now', 'book party boat', 'make a reservation', 'book lake travis cruise'],
  'https://premierpartycruises.com/book-online': ['book online', 'online booking', 'reserve online', 'instant booking', 'online reservation'],
  
  // Bachelorette-Specific Landing Pages
  'https://premierpartycruises.com/adventure-austin-bachelorette': ['adventure bachelorette austin', 'active bachelorette party', 'adventure bride party', 'outdoor bachelorette austin', 'adventurous bachelorette'],
  'https://premierpartycruises.com/austin-bachelorette-nightlife': ['austin bachelorette nightlife', 'nightlife bachelorette party', 'party scene austin bachelorette', 'nighttime bachelorette activities', 'austin nightlife cruise'],
  'https://premierpartycruises.com/budget-austin-bachelorette': ['budget bachelorette austin', 'affordable bachelorette party', 'budget-friendly bachelorette', 'cheap bachelorette austin', 'affordable bride party'],
  
  // Guide Pages
  'https://premierpartycruises.com/lake-travis-boat-rental-guide': ['lake travis boat rental guide', 'boat rental guide austin', 'renting boats lake travis', 'boat rental tips', 'lake travis rental information'],
  'https://premierpartycruises.com/lake-travis-large-groups-guide': ['large group events lake travis', 'big group boat rental', 'large party boat austin', 'group cruise lake travis', 'accommodating large groups'],
  'https://premierpartycruises.com/lake-travis-weather-guide': ['lake travis weather', 'weather guide austin', 'best time to cruise', 'lake travis climate', 'seasonal cruising'],
  
  // Blog Posts - High Priority SEO
  'https://premierpartycruises.com/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend': ['bachelorette weekend must-haves', 'perfect austin bachelorette', 'bachelorette essentials austin', 'bachelorette planning guide', 'ultimate bachelorette weekend'],
  'https://premierpartycruises.com/blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests': ['large group party boat', 'party boat for 20 guests', 'big group boat rental', 'lake travis group events', 'accommodating large parties'],
  'https://premierpartycruises.com/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning': ['first time boat rental', 'lake travis rental tips', 'boat rental essentials', 'party planning tips austin', 'beginner boat rental guide'],
  'https://premierpartycruises.com/blog/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy': ['birthday alcohol delivery', 'party alcohol delivery austin', 'milestone celebration delivery', 'birthday drink delivery', 'celebration beverage service'],
  
  // Additional Event Pages
  'https://premierpartycruises.com/discounts': ['cruise discounts', 'party boat deals', 'special offers austin', 'discount cruises', 'promotional rates'],
  'https://premierpartycruises.com/affiliates': ['affiliate program', 'partner with us', 'referral program', 'cruise affiliates', 'partnership opportunities']
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
