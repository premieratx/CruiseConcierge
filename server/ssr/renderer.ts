import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache template at module level to avoid repeated disk I/O
let cachedTemplate: string | null = null;
const templatePath = path.resolve(__dirname, '../../client/index.html');

// Get template with caching
async function getTemplate(): Promise<string> {
  if (!cachedTemplate) {
    cachedTemplate = await fs.promises.readFile(templatePath, 'utf-8');
  }
  return cachedTemplate;
}

// SSR routes that should be server-rendered
const SSR_ROUTES = [
  '/',
  '/bachelor-party-austin',
  '/bachelorette-party-austin',
  '/atx-disco-cruise',
  '/private-cruises',
  '/team-building',
  '/client-entertainment',
  '/company-milestone',
  '/welcome-party',
  '/after-party',
  '/rehearsal-dinner',
  '/milestone-birthday',
  '/sweet-16',
  '/graduation-party',
  '/testimonials-faq',
  '/contact',
  '/gallery',
  '/party-boat-austin',
  '/party-boat-lake-travis',
  '/corporate-events',
  '/birthday-parties',
  '/wedding-parties',
  '/combined-bachelor-bachelorette-austin',
  '/ai-endorsement',
];

// Page metadata for SEO
const PAGE_METADATA: Record<string, { h1: string; content: string }> = {
  '/': {
    h1: 'Premier Party Cruises - Austin Lake Travis Boat Rentals',
    content: 'Experience the ultimate party cruise on Lake Travis. Private charters, disco cruises, bachelor parties, bachelorette parties, and corporate events. Book your Austin boat rental today!'
  },
  '/bachelor-party-austin': {
    h1: 'Austin Bachelor Party Boat Rentals | Private Lake Travis Cruises',
    content: 'Plan the perfect bachelor party on Lake Travis with our private boat rentals. Custom packages, professional crew, and unforgettable experiences for your celebration.'
  },
  '/bachelorette-party-austin': {
    h1: 'Austin Bachelorette Party Boats | Lake Travis Party Cruises',
    content: 'Create lasting memories with our bachelorette party boat rentals on Lake Travis. Disco cruises, private charters, and customizable packages for the perfect celebration.'
  },
  '/atx-disco-cruise': {
    h1: 'ATX Disco Cruise - The Ultimate Party Boat Experience',
    content: 'Join Austin\'s most popular disco cruise on Lake Travis. Dance, celebrate, and enjoy the ultimate party boat experience with DJ, lights, and incredible views.'
  },
  '/private-cruises': {
    h1: 'Private Boat Cruises on Lake Travis | Custom Charter Packages',
    content: 'Book a private cruise on Lake Travis for your special event. Customizable packages, professional service, and boats ranging from 14 to 75+ passengers.'
  },
  '/team-building': {
    h1: 'Corporate Team Building Events on Lake Travis',
    content: 'Strengthen your team with unique corporate events on Lake Travis. Private boat charters perfect for team building activities and company outings.'
  },
  '/client-entertainment': {
    h1: 'Client Entertainment Cruises | Austin Corporate Events',
    content: 'Impress your clients with exclusive Lake Travis cruises. Professional corporate entertainment packages for networking and relationship building.'
  },
  '/company-milestone': {
    h1: 'Company Milestone Celebrations on Lake Travis',
    content: 'Celebrate company achievements with memorable Lake Travis cruises. Perfect for anniversaries, awards, and corporate milestone events.'
  },
  '/welcome-party': {
    h1: 'Wedding Welcome Party Cruises | Lake Travis Boat Rentals',
    content: 'Start your wedding weekend with a welcome party cruise on Lake Travis. Perfect for greeting out-of-town guests and kicking off the celebrations.'
  },
  '/after-party': {
    h1: 'Wedding After Party Boats | Lake Travis Late Night Cruises',
    content: 'Keep the celebration going with a wedding after party cruise. Private boat rentals for the perfect late-night celebration on Lake Travis.'
  },
  '/rehearsal-dinner': {
    h1: 'Rehearsal Dinner Cruises | Unique Lake Travis Venues',
    content: 'Host an unforgettable rehearsal dinner on Lake Travis. Elegant boat cruises providing a unique and memorable setting for your pre-wedding celebration.'
  },
  '/milestone-birthday': {
    h1: 'Milestone Birthday Party Boats | Lake Travis Celebrations',
    content: 'Celebrate milestone birthdays in style on Lake Travis. Private boat rentals for 30th, 40th, 50th birthdays and beyond.'
  },
  '/sweet-16': {
    h1: 'Sweet 16 Party Cruises | Austin Lake Travis Boat Rentals',
    content: 'Make their Sweet 16 unforgettable with a Lake Travis party cruise. Safe, fun, and memorable celebrations for this special milestone.'
  },
  '/graduation-party': {
    h1: 'Graduation Party Boats | Lake Travis Celebration Cruises',
    content: 'Celebrate graduation success with Lake Travis boat parties. Perfect for high school and college graduation celebrations.'
  },
  '/testimonials-faq': {
    h1: 'Customer Reviews & FAQs | Premier Party Cruises',
    content: 'Read what our customers say about Premier Party Cruises. Find answers to frequently asked questions about booking, pricing, and policies.'
  },
  '/contact': {
    h1: 'Contact Premier Party Cruises | Book Your Lake Travis Event',
    content: 'Contact us to book your Lake Travis cruise. Professional service, quick responses, and expert event planning for your perfect party boat experience.'
  },
  '/gallery': {
    h1: 'Photo Gallery | Premier Party Cruises on Lake Travis',
    content: 'Browse photos from real Premier Party Cruises events. See our boats, parties, and the incredible Lake Travis experience.'
  },
  '/party-boat-austin': {
    h1: 'Austin Party Boats | Premier Lake Travis Cruise Experience',
    content: 'Austin\'s top-rated party boat service on Lake Travis. Disco cruises, private charters, and unforgettable celebrations since 2009.'
  },
  '/party-boat-lake-travis': {
    h1: 'Lake Travis Party Boats | Austin Premier Cruise Rentals',
    content: 'Experience the best party boats on Lake Travis. Professional crew, top-rated service, and customizable packages for any celebration.'
  },
  '/corporate-events': {
    h1: 'Corporate Events on Lake Travis | Austin Team Building Cruises',
    content: 'Host unforgettable corporate events on Lake Travis. Team building, client entertainment, company milestones, and professional networking on private boat charters.'
  },
  '/birthday-parties': {
    h1: 'Birthday Party Boats on Lake Travis | Austin Celebrations',
    content: 'Celebrate birthdays in style on Lake Travis. Private boat rentals for milestone birthdays, Sweet 16, and unforgettable birthday celebrations of all ages.'
  },
  '/wedding-parties': {
    h1: 'Wedding Party Cruises | Lake Travis Rehearsal Dinners & Events',
    content: 'Perfect wedding events on Lake Travis. Rehearsal dinners, welcome parties, after parties, and unique wedding celebrations on private boat charters.'
  },
  '/combined-bachelor-bachelorette-austin': {
    h1: 'Combined Bachelor Bachelorette Parties | Austin Lake Travis Cruises',
    content: 'Celebrate together with combined bachelor and bachelorette party cruises on Lake Travis. Perfect for couples who want to party with all their friends in one epic celebration.'
  },
  '/ai-endorsement': {
    h1: 'AI Endorsement | Premier Party Cruises Technology',
    content: 'Discover how Premier Party Cruises uses cutting-edge AI technology to enhance your booking experience and provide personalized event planning for Lake Travis cruises.'
  }
};

// Check if a route should use SSR
function shouldUseSSR(url: string): boolean {
  const pathname = url.split('?')[0];
  
  // Check exact match
  if (SSR_ROUTES.includes(pathname)) {
    return true;
  }
  
  // Check blog routes
  if (pathname.startsWith('/blog/') && pathname.length > 6) {
    return true;
  }
  
  return false;
}

// Fetch SEO metadata from API
async function fetchSEOMetadata(url: string) {
  try {
    const response = await fetch(`http://localhost:5000/api/seo/meta/${encodeURIComponent(url)}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch SEO metadata:', error);
  }
  return null;
}

// Fetch blog post data
async function fetchBlogPost(slug: string) {
  try {
    const response = await fetch(`http://localhost:5000/api/blog/public/posts/${slug}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
  }
  return null;
}

// Render page to HTML string (Simplified SSR for SEO)
async function renderPage(url: string): Promise<string> {
  try {
    // Get cached template (avoids disk I/O on every request)
    let template = await getTemplate();
    
    const pathname = url.split('?')[0];
    let h1 = '';
    let content = '';
    let metaTitle = '';
    let metaDescription = '';
    
    // Check if it's a blog post
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '');
      const blogData = await fetchBlogPost(slug);
      
      if (blogData && blogData.post) {
        h1 = blogData.post.title;
        content = blogData.post.excerpt || blogData.post.content?.substring(0, 300) || '';
        metaTitle = `${blogData.post.title} | Premier Party Cruises Blog`;
        metaDescription = blogData.post.metaDescription || blogData.post.excerpt || content;
      }
    } else {
      // Use predefined metadata for marketing pages
      const pageData = PAGE_METADATA[pathname];
      if (pageData) {
        h1 = pageData.h1;
        content = pageData.content;
      }
      
      // Fetch SEO metadata from API
      const seoData = await fetchSEOMetadata(pathname);
      if (seoData) {
        metaTitle = seoData.metaTitle || h1;
        metaDescription = seoData.metaDescription || content;
      } else {
        metaTitle = h1;
        metaDescription = content;
      }
    }
    
    // Inject unique title
    if (metaTitle) {
      template = template.replace(
        /<title>.*?<\/title>/,
        `<title>${metaTitle}</title>`
      );
    }
    
    // Inject unique meta description
    if (metaDescription) {
      template = template.replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${metaDescription.replace(/"/g, '&quot;')}" />`
      );
      
      // Also update OG description
      template = template.replace(
        /<meta property="og:description" content="[^"]*" \/>/,
        `<meta property="og:description" content="${metaDescription.replace(/"/g, '&quot;')}" />`
      );
    }
    
    // Update OG title
    if (metaTitle) {
      template = template.replace(
        /<meta property="og:title" content="[^"]*" \/>/,
        `<meta property="og:title" content="${metaTitle.replace(/"/g, '&quot;')}" />`
      );
    }
    
    // Inject H1 and content into the root div for crawlers
    const ssrContent = `
      <div id="root">
        <div style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0);">
          <h1>${h1}</h1>
          <p>${content}</p>
        </div>
        <div id="app"></div>
      </div>`;
    
    template = template.replace(
      '<div id="root"></div>',
      ssrContent
    );
    
    return template;
  } catch (error) {
    console.error('SSR rendering error:', error);
    throw error;
  }
}

// SSR middleware
export function ssrMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip non-GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Skip API routes
    if (req.path.startsWith('/api') || req.path.startsWith('/embed')) {
      return next();
    }
    
    // Skip static files
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      return next();
    }
    
    // Check if this route should use SSR
    if (!shouldUseSSR(req.url)) {
      return next();
    }
    
    try {
      console.log(`[SSR] Rendering: ${req.url}`);
      const html = await renderPage(req.url);
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      console.error(`[SSR] Error rendering ${req.url}:`, error);
      // Fall back to client-side rendering
      next();
    }
  };
}
