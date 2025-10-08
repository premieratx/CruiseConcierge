import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolveAsset } from "../utils/viteManifest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache template at module level to avoid repeated disk I/O
let cachedTemplate: string | null = null;
const templatePath = path.resolve(__dirname, '../../client/index.html');

// Organization + LocalBusiness schema markup (sitewide) - CORRECTED DATA
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://premierpartycruises.com/#organization",
  "name": "Premier Party Cruises",
  "legalName": "B Hill Entertainment LLC",
  "url": "https://premierpartycruises.com/",
  "logo": "https://premierpartycruises.com/media/schema/ppc-logo.png",
  "image": [
    "https://premierpartycruises.com/media/schema/hero-boat-1.jpg",
    "https://premierpartycruises.com/media/schema/hero-boat-2.jpg",
    "https://premierpartycruises.com/media/schema/disco-dance-floor.jpg",
    "https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg"
  ],
  "description": "Austin's original Lake Travis party boat company offering private cruises, the ATX Disco Cruise, and full-service planning for bachelor/bachelorette, corporate, birthday, and family events.",
  "foundingDate": "2009",
  "sameAs": [
    "https://www.instagram.com/premierpartycruises",
    "https://www.tiktok.com/@premierpartycruisesatx",
    "https://www.facebook.com/premierpartycruises",
    "https://share.google/oLFqmN5TGvXpnlX6i"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13993 FM 2769",
    "addressLocality": "Leander",
    "addressRegion": "TX",
    "postalCode": "78641",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.432167,
    "longitude": -97.881167
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "telephone": "+1-512-488-5892",
      "email": "clientservices@premierpartycruises.com",
      "availableLanguage": ["en", "es"]
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    }
  ],
  "areaServed": ["Austin TX", "Texas", "United States"],
  "priceRange": "$$",
  "aggregateRating": [
    {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "ratingCount": 300,
      "name": "Google"
    },
    {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "ratingCount": 120,
      "name": "Yelp"
    }
  ]
};

// Service schema for Private Cruises page
// Note: Using generic price ranges to avoid outdated pricing in search results
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Private Party Boat Charter",
  "provider": { "@id": "https://premierpartycruises.com/#organization" },
  "areaServed": { "@type": "AdministrativeArea", "name": "Austin, TX" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Private Cruise Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Private Cruise – Small Groups (up to 20 guests)",
        "url": "https://premierpartycruises.com/private-cruises#20pax"
      },
      {
        "@type": "Offer",
        "name": "Private Cruise – Medium Groups (up to 50 guests)",
        "url": "https://premierpartycruises.com/private-cruises#50pax"
      },
      {
        "@type": "Offer",
        "name": "Private Cruise – Large Groups (up to 75+ guests)",
        "url": "https://premierpartycruises.com/private-cruises#75pax"
      }
    ]
  }
};

// Event schema for ATX Disco Cruise page - CORRECTED DATA
const EVENT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://premierpartycruises.com/atx-disco-cruise/#event",
  "name": "ATX Disco Cruise",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "maximumAttendeeCapacity": 100,
  "location": {
    "@type": "Place",
    "name": "Anderson Mill Marina",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "13993 FM 2769",
      "addressLocality": "Leander",
      "addressRegion": "TX",
      "postalCode": "78641",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.432167,
      "longitude": -97.881167
    }
  },
  "organizer": {
    "@id": "https://premierpartycruises.com/#organization"
  },
  "image": [
    "https://premierpartycruises.com/media/schema/disco-dance-floor.jpg"
  ],
  "offers": [
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "85.00",
      "category": "Basic Batch",
      "url": "https://premierpartycruises.com/atx-disco-cruise",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "95.00",
      "category": "Disco Queen/King",
      "url": "https://premierpartycruises.com/atx-disco-cruise",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "105.00",
      "category": "Super Sparkle Platinum",
      "url": "https://premierpartycruises.com/atx-disco-cruise",
      "availability": "https://schema.org/InStock"
    }
  ]
};

// FAQPage schema for Testimonials-FAQ page
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What can we bring on the boat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You may bring snacks, non-glass beverages, and decorations. Glass containers are not allowed."
      }
    },
    {
      "@type": "Question",
      "name": "Do you allow DJs or photographers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you may bring your own DJ or photographer, or book ours as an add-on."
      }
    },
    {
      "@type": "Question",
      "name": "What is your cancellation policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer flexible cancellation options. Contact us at least 48 hours in advance for rescheduling or refunds."
      }
    },
    {
      "@type": "Question",
      "name": "How many people can fit on your boats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our boats range from 14 to 75+ passengers depending on the vessel and event type."
      }
    }
  ]
};

// Preconnect URLs for external resources to establish early connections
const PRECONNECT_URLS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com'
];

// Hero images map for LCP optimization via preload tags
// Maps route pathname to hero image path (production fingerprinting handled via manifest)
const HERO_IMAGES: Record<string, string> = {
  '/': '/attached_assets/bachelor-party-group-guys.webp',
  '/bachelor-party-austin': '/attached_assets/bachelor-party-group-guys.webp',
  '/bachelorette-party-austin': '/attached_assets/bachelor-party-group-guys.webp',
  '/atx-disco-cruise': '/attached_assets/atx-disco-cruise-party.webp',
  '/private-cruises': '/attached_assets/bachelor-party-group-guys.webp',
  '/team-building': '/attached_assets/bachelor-party-group-guys.webp',
  '/client-entertainment': '/attached_assets/bachelor-party-group-guys.webp',
  '/company-milestone': '/attached_assets/bachelor-party-group-guys.webp',
  '/welcome-party': '/attached_assets/bachelor-party-group-guys.webp',
  '/after-party': '/attached_assets/bachelor-party-group-guys.webp',
  '/rehearsal-dinner': '/attached_assets/bachelor-party-group-guys.webp',
  '/milestone-birthday': '/attached_assets/bachelor-party-group-guys.webp',
  '/sweet-16': '/attached_assets/bachelor-party-group-guys.webp',
  '/graduation-party': '/attached_assets/bachelor-party-group-guys.webp',
  '/party-boat-austin': '/attached_assets/bachelor-party-group-guys.webp',
  '/party-boat-lake-travis': '/attached_assets/bachelor-party-group-guys.webp',
  '/corporate-events': '/attached_assets/bachelor-party-group-guys.webp',
  '/birthday-parties': '/attached_assets/bachelor-party-group-guys.webp',
  '/wedding-parties': '/attached_assets/bachelor-party-group-guys.webp',
  '/combined-bachelor-bachelorette-austin': '/attached_assets/bachelor-party-group-guys.webp',
};

/**
 * Generate hero image preload tag for production builds
 * Uses Vite manifest to resolve fingerprinted asset paths
 * @param pathname - Route pathname
 * @returns HTML preload link tag or empty string
 */
function generateHeroPreloadTags(pathname: string): string {
  // Only preload in production (manifest only exists in production)
  if (process.env.NODE_ENV !== 'production') {
    return '';
  }
  
  // Get hero image for this route
  const heroImage = HERO_IMAGES[pathname];
  if (!heroImage) {
    return '';
  }
  
  // Resolve to fingerprinted path via manifest
  const hashedPath = resolveAsset(heroImage);
  if (!hashedPath) {
    // Manifest lookup failed - skip preload gracefully
    return '';
  }
  
  // Generate preload tag with high fetch priority for LCP optimization
  return `<link rel="preload" as="image" href="${hashedPath}" fetchpriority="high" />`;
}

/**
 * Generate preconnect and dns-prefetch tags for external domains
 * Establishes early connections to external resources for improved performance
 * @returns HTML preconnect and dns-prefetch link tags
 */
function generatePreconnectTags(): string {
  return PRECONNECT_URLS.map(url => `
    <link rel="dns-prefetch" href="${url}" />
    <link rel="preconnect" href="${url}" crossorigin />`
  ).join('');
}

// Generate BreadcrumbList schema for interior pages
function generateBreadcrumbSchema(pathname: string, h1: string): object | null {
  // Don't generate breadcrumbs for homepage
  if (pathname === '/') {
    return null;
  }
  
  // Extract page name from h1, removing any suffixes like "| Premier Party Cruises"
  let pageName = h1;
  
  // Remove common suffixes
  pageName = pageName.replace(/\s*\|\s*Premier Party Cruises.*$/i, '');
  pageName = pageName.trim();
  
  // Build breadcrumb list
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://premierpartycruises.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": `https://premierpartycruises.com${pathname}`
      }
    ]
  };
  
  return breadcrumbList;
}

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
  
  // IMPORTANT: Do NOT handle /blog routes - they redirect to /blogs with 301
  // Only handle /blogs/ routes (canonical URLs)
  if (pathname.startsWith('/blogs/') && pathname.length > 7) {
    return true;
  }
  
  // Check main blog listing page (only /blogs, not /blog which redirects)
  if (pathname === '/blogs') {
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
async function renderPage(url: string, req: Request): Promise<string> {
  try {
    // Get cached template (avoids disk I/O on every request)
    let template = await getTemplate();
    
    const pathname = url.split('?')[0];
    let h1 = '';
    let content = '';
    let metaTitle = '';
    let metaDescription = '';
    
    // Check if it's a blog post (only /blogs/ - /blog/ redirects to /blogs/)
    if (pathname.startsWith('/blogs/')) {
      const slug = pathname.slice('/blogs/'.length);
      const blogData = await fetchBlogPost(slug);
      
      if (blogData && blogData.post) {
        h1 = blogData.post.title;
        content = blogData.post.excerpt || blogData.post.content?.substring(0, 300) || '';
        metaTitle = `${blogData.post.title} | Premier Party Cruises Blog`;
        metaDescription = blogData.post.metaDescription || blogData.post.excerpt || content;
      }
    } else if (pathname === '/blogs') {
      // Main blog listing page (canonical URL)
      h1 = 'Austin Party Boat Blog | Bachelor & Bachelorette Party Tips | Premier Party Cruises';
      content = 'Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat guides, itineraries, and Austin party planning advice.';
      metaTitle = h1;
      metaDescription = content;
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
    
    // Generate breadcrumb schema for interior pages
    const breadcrumbSchema = generateBreadcrumbSchema(pathname, h1);
    
    // Build schema scripts - Organization schema always present
    let schemaScripts = `  <script type="application/ld+json">
${JSON.stringify(ORGANIZATION_SCHEMA, null, 2)}
  </script>`;
    
    // Add breadcrumb schema if it exists (interior pages only)
    if (breadcrumbSchema) {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>`;
    }
    
    // Add Service schema for Private Cruises page only
    if (pathname === '/private-cruises') {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(SERVICE_SCHEMA, null, 2)}
  </script>`;
    }
    
    // Add Event schema for ATX Disco Cruise page only
    if (pathname === '/atx-disco-cruise') {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(EVENT_SCHEMA, null, 2)}
  </script>`;
    }
    
    // Add FAQPage schema for Testimonials-FAQ page only
    if (pathname === '/testimonials-faq') {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(FAQ_SCHEMA, null, 2)}
  </script>`;
    }
    
    // Inject preconnect tags EARLY in head (right after viewport) for optimal performance
    const preconnectTags = generatePreconnectTags();
    template = template.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0" />${preconnectTags}`
    );
    
    // Inject canonical tag and schemas at end of head
    // Derive canonical URL from request host/protocol instead of hard-coding
    const protocol = req.secure ? 'https' : 'http';
    const host = req.get('host') || 'premierpartycruises.com';
    const canonicalUrl = `${protocol}://${host}${pathname}`;
    
    const headInjection = `  <link rel="canonical" href="${canonicalUrl}" />\n${schemaScripts}\n  </head>`;
    
    template = template.replace('</head>', headInjection);
    
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
      const html = await renderPage(req.url, req);
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      console.error(`[SSR] Error rendering ${req.url}:`, error);
      // Fall back to client-side rendering
      next();
    }
  };
}
