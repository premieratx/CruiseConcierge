import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolveAsset } from "../utils/viteManifest";
import { PAGE_CONTENT, PageContent, PageSection, LINK_CATALOG } from './pageContent';
import { getSchemaForRoute, generateArticleSchema, isBlogPostRoute } from '../schemaLoader';
import { isStaticBlogRoute, getStaticBlogMetadata } from '../staticBlogMetadata';
import { getBlogMetadata } from '../blogMetadataRegistry';
import { storage } from '../storage';
import { getCanonicalUrl } from '../utils/domain';
import { renderReactSSR, initViteSSR } from './viteSSR';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache template at module level to avoid repeated disk I/O
let cachedTemplate: string | null = null;
// CRITICAL FIX: Use same production detection as server/index.ts
// Check if production build exists - this works in both dev preview and production deployment
const productionBuildExists = fs.existsSync(path.resolve(process.cwd(), 'dist/public/index.html'));
const isDevelopment = !productionBuildExists;
const templatePath = isDevelopment 
  ? path.resolve(__dirname, '../../client/index.html')
  : path.resolve(process.cwd(), 'dist/public/index.html');

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
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "ratingCount": 420
  }
};

// WebSite schema with SearchAction for site-wide search functionality
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://premierpartycruises.com/#website",
  "url": "https://premierpartycruises.com/",
  "name": "Premier Party Cruises",
  "description": "Austin's premier party boat cruises and private charters on Lake Travis",
  "publisher": {
    "@id": "https://premierpartycruises.com/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://premierpartycruises.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Individual Review schemas for Testimonials page (proper Google Rich Results format)
const TESTIMONIALS_REVIEW_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Sarah Thompson"
    },
    "reviewBody": "Premier Party Cruises made our bachelorette party absolutely perfect! The captain and crew were professional, the boat was immaculate, and the Lake Travis views were breathtaking.",
    "datePublished": "2024-08-15",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "@id": "https://premierpartycruises.com/#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Michael Rodriguez"
    },
    "reviewBody": "Best bachelor party decision we made! The crew went above and beyond to make sure we had an epic time. Great music, perfect weather, and memories that will last a lifetime.",
    "datePublished": "2024-07-22",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "@id": "https://premierpartycruises.com/#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Jennifer Martinez"
    },
    "reviewBody": "Corporate team building event was a huge success! The crew was professional, the boat was perfect for our group of 40, and everyone had an amazing experience on Lake Travis.",
    "datePublished": "2024-06-10",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "@id": "https://premierpartycruises.com/#organization"
    }
  }
];

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
  "description": "Join the BEST party on Lake Travis! Austin's exclusive ATX Disco Cruise features professional DJ entertainment, photographer, dance floor, giant floats, and incredible party atmosphere. Perfect for bachelor and bachelorette parties celebrating together. 4-hour cruise experience with multiple groups, BYOB friendly. Three time slots available.",
  "startDate": "2025-03-01T12:00:00-06:00",
  "endDate": "2025-10-31T19:30:00-06:00",
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
      "price": "111.56",
      "name": "Saturday 3:30-7:30pm Time Slot",
      "description": "$85 per person base price, $111.56 total with tax and gratuity included",
      "url": "https://premierpartycruises.com/atx-disco-cruise",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01T00:00:00-06:00"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "124.88",
      "name": "Friday 12-4pm Time Slot",
      "description": "$95 per person base price, $124.88 total with tax and gratuity included",
      "url": "https://premierpartycruises.com/atx-disco-cruise",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01T00:00:00-06:00"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "137.81",
      "name": "Saturday 11am-3pm Time Slot",
      "description": "$105 per person base price, $137.81 total with tax and gratuity included - Most Popular!",
      "url": "https://premierpartycruises.com/atx-disco-cruise",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01T00:00:00-06:00"
    }
  ]
};

// Bachelor Party Service Schema
const BACHELOR_PARTY_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://premierpartycruises.com/bachelor-party-austin/#service",
  "name": "Bachelor Party Boat Cruises on Lake Travis",
  "provider": { "@id": "https://premierpartycruises.com/#organization" },
  "areaServed": ["Austin TX", "Texas", "United States"],
  "description": "Exclusive bachelor party cruises on Lake Travis with BYOB, professional DJ, photographer, and time-slot pricing. Join the best party boat experience for bachelor groups.",
  "offers": [
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "111.56",
      "name": "Saturday 3:30-7:30pm Time Slot",
      "description": "$85 base price, $111.56 with tax and gratuity",
      "url": "https://premierpartycruises.com/bachelor-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "124.88",
      "name": "Friday 12-4pm Time Slot",
      "description": "$95 base price, $124.88 with tax and gratuity",
      "url": "https://premierpartycruises.com/bachelor-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "137.81",
      "name": "Saturday 11am-3pm Time Slot",
      "description": "$105 base price, $137.81 with tax and gratuity - Most Popular!",
      "url": "https://premierpartycruises.com/bachelor-party-austin",
      "availability": "https://schema.org/InStock"
    }
  ]
};

// Bachelorette Party Service Schema
const BACHELORETTE_PARTY_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://premierpartycruises.com/bachelorette-party-austin/#service",
  "name": "Bachelorette Party Boat Cruises on Lake Travis",
  "provider": { "@id": "https://premierpartycruises.com/#organization" },
  "areaServed": ["Austin TX", "Texas", "United States"],
  "description": "Exclusive bachelorette party cruises on Lake Travis with BYOB, professional DJ, photographer, and time-slot pricing.",
  "offers": [
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "111.56",
      "name": "Saturday 3:30-7:30pm Time Slot",
      "description": "$85 base price, $111.56 with tax and gratuity",
      "url": "https://premierpartycruises.com/bachelorette-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "124.88",
      "name": "Friday 12-4pm Time Slot",
      "description": "$95 base price, $124.88 with tax and gratuity",
      "url": "https://premierpartycruises.com/bachelorette-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "137.81",
      "name": "Saturday 11am-3pm Time Slot",
      "description": "$105 base price, $137.81 with tax and gratuity - Most Popular!",
      "url": "https://premierpartycruises.com/bachelorette-party-austin",
      "availability": "https://schema.org/InStock"
    }
  ]
};

// Combined Bachelor/Bachelorette Service Schema
const COMBINED_BACH_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin/#service",
  "name": "Combined Bachelorette/Bachelor Party Boat Cruises on Lake Travis",
  "provider": { "@id": "https://premierpartycruises.com/#organization" },
  "areaServed": ["Austin TX", "Texas", "United States"],
  "description": "Joint bachelor/bachelorette party celebrations on Lake Travis. Flexible group options for couples who want to celebrate together with all their friends.",
  "offers": [
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "111.56",
      "name": "Saturday 3:30-7:30pm Time Slot",
      "description": "$85 base price, $111.56 with tax and gratuity",
      "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "124.88",
      "name": "Friday 12-4pm Time Slot",
      "description": "$95 base price, $124.88 with tax and gratuity",
      "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "137.81",
      "name": "Saturday 11am-3pm Time Slot",
      "description": "$105 base price, $137.81 with tax and gratuity - Most Popular!",
      "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
      "availability": "https://schema.org/InStock"
    }
  ]
};

// NOTE: FAQPage schemas are loaded from attached_assets/schema_data/ via schemaLoader.ts
// Removed hardcoded FAQ schemas to prevent Google Search Console "Duplicate field 'FAQPage'" errors

// BlogCollectionPage schema generator - creates schema dynamically with actual blog posts
function generateBlogCollectionPageSchema(blogPosts: any[]): object {
  const itemListElements = blogPosts.map((post, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "url": `https://premierpartycruises.com/blogs/${post.slug}`,
    "name": post.title,
    "description": post.excerpt || post.title
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://premierpartycruises.com/blog/#collection",
    "name": "Austin Party Boat Blog | Bachelor & Bachelorette Party Tips",
    "description": "Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat guides, itineraries, and Austin party planning advice.",
    "url": "https://premierpartycruises.com/blog",
    "publisher": {
      "@id": "https://premierpartycruises.com/#organization"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": itemListElements,
      "numberOfItems": blogPosts.length
    },
    "breadcrumb": {
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
          "name": "Blog",
          "item": "https://premierpartycruises.com/blog"
        }
      ]
    }
  };
}

// Boat Product Schemas for Fleet
const DAY_TRIPPER_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Day Tripper - 14 Person Party Boat",
  "description": "Intimate 14-person party boat perfect for small celebrations and private groups on Lake Travis. Features professional captain, premium sound system, coolers with ice, and comfortable seating.",
  "image": "https://premierpartycruises.com/media/schema/day-tripper-boat.jpg",
  "url": "https://premierpartycruises.com/",
  "brand": {
    "@type": "Brand",
    "name": "Premier Party Cruises"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "195",
    "highPrice": "395",
    "offerCount": "2",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "ratingCount": 145
  }
};

const ME_SEEKS_THE_IRONY_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Meeseeks the Irony - 25 Person Party Boat",
  "description": "Popular 25-person (18-25 seating) party boat ideal for medium-sized celebrations on Lake Travis. Premium amenities, professional crew, and excellent entertainment capabilities.",
  "image": "https://premierpartycruises.com/media/schema/me-seeks-irony-boat.jpg",
  "url": "https://premierpartycruises.com/",
  "brand": {
    "@type": "Brand",
    "name": "Premier Party Cruises"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "295",
    "highPrice": "695",
    "offerCount": "2",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "ratingCount": 187
  }
};

const CLEVER_GIRL_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Clever Girl - 50 Person Flagship Party Boat",
  "description": "Flagship 50-person party boat featuring 14 disco balls, giant Texas flag, and premium entertainment setup. Perfect for large celebrations, corporate events, and unforgettable Lake Travis parties.",
  "image": "https://premierpartycruises.com/media/schema/clever-girl-boat.jpg",
  "url": "https://premierpartycruises.com/",
  "brand": {
    "@type": "Brand",
    "name": "Premier Party Cruises"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "495",
    "highPrice": "1195",
    "offerCount": "2",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "ratingCount": 234
  }
};

// Critical CSS for above-the-fold rendering (< 5KB for optimal mobile FCP)
// Only essential styles for hero and navigation
const CRITICAL_CSS = `
:root{--primary:hsl(208 100% 50%);--secondary:hsl(51 100% 50%);--background:#fff;--foreground:#000}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:"DM Sans",system-ui,sans-serif;-webkit-font-smoothing:antialiased;background:#fff;color:#000;line-height:1.5}
h1,h2,h3{font-family:"Bebas Neue",system-ui,sans-serif;font-weight:700;letter-spacing:0.1em}
h1{font-size:clamp(1.5rem,4vw,3.5rem);line-height:1.2}
.relative{position:relative}
.absolute{position:absolute}
.inset-0{top:0;right:0;bottom:0;left:0}
.z-0{z-index:0}
.z-10{z-index:10}
.w-full{width:100%}
.h-full{height:100%}
.min-h-screen{min-height:100vh}
.object-cover{object-fit:cover}
.text-white{color:#fff}
.text-center{text-align:center}
.mx-auto{margin-left:auto;margin-right:auto}
.container{width:100%;max-width:1280px;margin:0 auto;padding:0 1rem}
.flex{display:flex}
.items-center{align-items:center}
.justify-center{justify-content:center}
.overflow-hidden{overflow:hidden}
.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}
@media(min-width:768px){
  h1{font-size:clamp(2.5rem,5vw,3.5rem)}
  .md\\:text-2xl{font-size:1.5rem}
  .md\\:text-4xl{font-size:2.25rem}
  .md\\:h-24{height:6rem}
}
@media(min-width:1024px){
  .lg\\:text-6xl{font-size:3.75rem}
}
`.trim();

/**
 * Process [[token]] placeholders in text and replace them with actual links
 * @param text - Text containing [[token]] placeholders
 * @param catalog - Link catalog mapping tokens to URLs and text
 * @returns Text with tokens replaced by HTML anchor tags
 */
function processTokens(text: string, catalog: Record<string, {url: string; text: string}>): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, (match, token) => {
    const link = catalog[token];
    return link ? `<a href="${link.url}" style="color: #1e40af; text-decoration: underline;">${link.text}</a>` : match;
  });
}

/**
 * Render "Related Pages" footer section with internal links
 * @param relatedKeys - Array of link catalog keys for related pages
 * @param catalog - Link catalog mapping tokens to URLs and text
 * @returns HTML string for related pages section or empty string
 */
function renderRelatedPages(relatedKeys: string[] | undefined, catalog: Record<string, {url: string; text: string}>): string {
  if (!relatedKeys || relatedKeys.length === 0) return '';
  
  const links = relatedKeys
    .map(key => catalog[key])
    .filter(Boolean)
    .map(link => `<li style="margin-bottom: 0.5rem;"><a href="${link.url}" style="color: #1e40af; text-decoration: underline;">${link.text}</a></li>`)
    .join('\n');
  
  return `
    <div style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e5e7eb;">
      <h2 style="font-size: 1.75rem; font-weight: 600; margin-bottom: 1rem; color: #000;">Related Cruises & Services</h2>
      <ul style="list-style: none; padding: 0; columns: 2; column-gap: 2rem;">
        ${links}
      </ul>
    </div>
  `;
}

/**
 * Generate complete HTML from PageContent structure
 * Renders all headings, paragraphs, and lists in semantic HTML
 */
function renderPageContent(content: PageContent): string {
  // Process introduction text for [[token]] replacements
  const processedIntroduction = processTokens(content.introduction, LINK_CATALOG);
  
  let html = `
    <div class="ssr-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: system-ui, sans-serif;">
      <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #000; line-height: 1.2;">${content.h1}</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${processedIntroduction}</p>
  `;
  
  // Render each section
  content.sections.forEach(section => {
    html += `
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem; color: #000;">${section.heading}</h2>
    `;
    
    // Render paragraphs with [[token]] processing
    section.paragraphs.forEach(para => {
      const processedPara = processTokens(para, LINK_CATALOG);
      html += `<p style="font-size: 1rem; line-height: 1.75; color: #4B5563; margin-bottom: 1rem;">${processedPara}</p>\n`;
    });
    
    // Render lists if present
    if (section.lists) {
      section.lists.forEach(list => {
        if (list.title) {
          html += `<h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #111827;">${list.title}</h3>\n`;
        }
        html += '<ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem;">\n';
        list.items.forEach(item => {
          html += `  <li style="font-size: 1rem; line-height: 1.75; color: #4B5563; margin-bottom: 0.5rem;">${item}</li>\n`;
        });
        html += '</ul>\n';
      });
    }
    
    html += '</section>\n';
  });
  
  // Add "Related Pages" footer section if relatedPages are defined
  html += renderRelatedPages(content.relatedPages, LINK_CATALOG);
  
  html += `
      <noscript>
        <p style="background: #FEF2F2; border: 2px solid #DC2626; padding: 1rem; margin-top: 2rem; border-radius: 0.5rem; color: #991B1B; font-weight: 600;">
          Please enable JavaScript to view the full interactive experience and booking options.
        </p>
      </noscript>
    </div>
  `;
  
  return html;
}

// MOBILE PAGESPEED: Preconnects now handled by index.html at the very top of <head>
// Removed duplicate SSR preconnects to prevent interference with browser's early connection logic
// See client/index.html for the consolidated preconnect setup
const PRECONNECT_URLS: string[] = [];

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

/**
 * Generate inline critical CSS for above-the-fold rendering
 * Inlines essential styles to eliminate render-blocking CSS for FCP optimization
 * @returns HTML style tag with critical CSS
 */
function generateCriticalCSSTag(): string {
  return `<style id="critical-css">${CRITICAL_CSS}</style>`;
}

/**
 * Generate async CSS preload tags for non-critical styles
 * Uses preload with onload trick to load CSS asynchronously without blocking FCP
 * @returns HTML link tags for async CSS loading
 */
function generateAsyncCSSTag(cssPath: string): string {
  return `<link rel="preload" as="style" href="${cssPath}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${cssPath}"></noscript>`;
}

/**
 * Generate font preload tags for primary fonts
 * Preloads critical font files to reduce FOIT/FOUT
 * @returns HTML link tags for font preloading
 */
function generateFontPreloadTags(): string {
  // In production, these would be the actual font file URLs
  // For now, we rely on Google Fonts with font-display: swap in critical CSS
  return '';
}

// Generate BreadcrumbList schema for interior pages
// Uses item as object with @type, @id, and name for maximum compatibility with SEO tools
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
  
  // Fallback if pageName is empty
  if (!pageName) {
    // Generate a readable name from the pathname
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1] || 'Page';
    pageName = lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  const fullUrl = `https://premierpartycruises.com${pathname}`;
  
  // Build breadcrumb list with item as object containing @type, @id, and name
  // This format ensures both name and item.name are present for SEO tool compatibility
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": {
          "@type": "WebPage",
          "@id": "https://premierpartycruises.com/",
          "name": "Home"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": {
          "@type": "WebPage",
          "@id": fullUrl,
          "name": pageName
        }
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

// CONVERTED_TO_REACT_SLUGS: Blog pages that have been converted to React components
// These pages should skip the WordPress database lookup and let the React component render
// This prevents SSR from showing old WordPress content instead of the new React content
const CONVERTED_TO_REACT_SLUGS = new Set([
  'accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests',
  'all-inclusive-corporate-packages-austin',
  'atx-disco-cruise-dos-and-donts-bachelor-party',
  'atx-disco-cruise-experience',
  'austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery',
  'austin-bachelorette-party-april',
  'austin-bachelorette-party-august',
  'austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations',
  'austin-bachelorette-party-december',
  'austin-bachelorette-party-february',
  'austin-bachelorette-party-june',
  'austin-bachelorette-party-october',
  'austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations',
  'austin-bachelor-party-ideas',
  'austin-bachelor-party-january',
  'austin-bachelor-party-july',
  'austin-bachelor-party-march',
  'austin-bachelor-party-may',
  'austin-bachelor-party-november',
  'austin-bachelor-party-september',
  'austin-best-corporate-events',
  'austin-party-venue-alcohol-delivery-navigating-policies-and-logistics',
  'austin-suburbs-corporate-events',
  'austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location',
  'bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions',
  'bachelor-party-outfit-ideas-atx-disco-cruise',
  'birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy',
  'birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view',
  'budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank',
  'client-entertainment-alcohol-strategy-impressing-without-overdoing-it',
  'cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy',
  'company-holiday-party-lake-travis',
  'company-party-10-people-austin',
  'company-party-25-people-austin',
  'company-party-50-people-austin',
  'company-party-75-people-austin',
  'conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration',
  'construction-trades-boat-parties-austin',
  'corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events',
  'corporate-team-building-on-lake-travis-professional-boat-rental-solutions',
  'creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations',
  'dallas-to-lake-travis-corporate',
  'destination-austin-offsite-retreats',
  'disco-cruise-fashion-part-1',
  'employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party',
  'epic-bachelorette-party-austin-ultimate-guide',
  'epic-bachelor-party-austin-ultimate-guide',
  'executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding',
  'finance-law-firms-boat-parties-austin',
  'first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning',
  'graduation-party-alcohol-planning-ut-and-austin-college-celebrations',
  'healthcare-wellness-boat-parties-austin',
  'holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination',
  'holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning',
  'holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations',
  'how-to-throw-great-bachelorette-party-austin',
  'how-to-throw-great-bachelor-party-austin',
  'instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination',
  'integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations',
  'joint-bachelor-bachelorette-parties-with-premier-party-cruises',
  'joint-bachelor-bachelorette-party-guide',
  'lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats',
  'lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties',
  'lake-travis-bachelor-party-austin-celebrations',
  'lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations',
  'lake-travis-bachelor-party-boats-guide',
  'lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events',
  'lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning',
  'lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events',
  'lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events',
  'lake-travis-boat-party-logistics-complete-planning-and-coordination-guide',
  'lake-travis-boat-party-music-sound-systems-and-entertainment-coordination',
  'lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing',
  'lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water',
  'lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide',
  'lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials',
  'lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises',
  'lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises',
  'lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
  'lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion',
  'lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties',
  'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations',
  'large-group-events-lake-travis',
  'marketing-creative-agencies-boat-austin',
  'must-haves-for-the-perfect-austin-bachelorette-weekend',
  'outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination',
  'party-alcohol-safety-in-austin-responsible-service-and-guest-well-being',
  'perfect-austin-bachelor-party-weekend',
  'perfect-bachelor-party-itinerary-austin',
  'pool-party-alcohol-coordination-summer-event-planning-in-austin-heat',
  'quarterly-outings-lake-travis-make-routine-company-events-easy',
  'real-estate-client-entertainment-boat-austin',
  'safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart',
  'small-business-boat-parties-austin',
  'tech-companies-boat-parties-austin',
  'top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience',
  'why-austin-companies-choose-premier',
  'why-choose-austin-bachelorette-party',
  'why-choose-austin-bachelor-party',
  'why-choose-integrated-event-services-comparing-austin-party-planning-options',
]);

// Check if a blog slug has been converted to React (should skip WordPress DB)
function isConvertedToReact(slug: string): boolean {
  return CONVERTED_TO_REACT_SLUGS.has(slug);
}

// SSR routes that should be server-rendered
// CRITICAL: ALL marketing pages MUST be in SSR for SEO visibility
// DO NOT REMOVE PAGES FROM THIS LIST - SEO visibility is the top priority
const SSR_ROUTES = [
  '/', // REQUIRED FOR SEO - Homepage MUST be server-rendered for search engine visibility
  '/blog', // REQUIRED FOR SEO - Blog listing page MUST be server-rendered for search engine visibility
  '/blogs', // REQUIRED FOR SEO - Must have SSR for search engines to see blog listing content
  '/bachelor-party-austin',
  '/bachelorette-party-austin',
  '/atx-disco-cruise',
  '/private-cruises', // Added back for SEO - full HTML content visible to crawlers
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
  '/gallery', // Re-enabled for SEO - search engines need to see gallery content
  '/party-boat-austin',
  '/party-boat-lake-travis',
  '/corporate-events',
  '/birthday-parties',
  '/wedding-parties',
  '/combined-bachelor-bachelorette-austin',
  '/ai-endorsement',
  '/pricing-breakdown',
  '/faq',
  '/austin-bachelorette-nightlife',
  '/budget-austin-bachelorette',
  '/book-now',
  '/chat',
  '/golden-ticket',
  '/golden-ticket-private',
  '/partners',
  '/wedding-anniversary-celebration-ideas',
  '/blogs/austin-bachelor-party-ideas',
  '/blogs/lake-travis-bachelor-party-boats-guide',
  '/blogs/perfect-austin-bachelor-party-weekend',
  '/blogs/atx-disco-cruise-dos-and-donts-bachelor-party',
  '/blogs/bachelor-party-outfit-ideas-atx-disco-cruise',
  '/blogs/joint-bachelor-bachelorette-party-guide',
  '/austin-bachelor-party-ideas',  // Added: SEO-critical static page
  '/lake-travis-bachelor-party-boats',
  '/luxury-austin-bachelorette',
  '/ultimate-austin-bachelorette-weekend',
  '/top-10-austin-bachelorette-ideas',
  '/3-day-austin-bachelorette-itinerary',
  '/first-time-lake-travis-boat-rental-guide',
  '/adventure-austin-bachelorette',
  // New static blog pages (React components with BlogPostLayout) - SEO-critical
  '/blogs/austin-bachelor-party-ideas',
  '/blogs/lake-travis-bachelor-party-boats-guide',
  '/blogs/perfect-austin-bachelor-party-weekend',
  '/blogs/atx-disco-cruise-dos-and-donts-bachelor-party',
  '/blogs/bachelor-party-outfit-ideas-atx-disco-cruise',
  '/blogs/joint-bachelor-bachelorette-party-guide',
  '/lake-travis-bachelor-party-boats',
  '/wedding-anniversary-celebration-ideas',
  '/rehearsal-dinner-boat-alcohol-delivery',  // Full React page for wedding weekend experiences
  // Booking and conversion pages - SEO-critical for showing H1s to crawlers
  '/book-now',
  '/book-online',
  '/chat',
  '/golden-ticket',
  '/golden-ticket-private',
  '/partners',
  '/site-directory',  // Added for SEO - site directory must be crawlable
];

// Page metadata for SEO
const PAGE_METADATA: Record<string, { h1: string; content: string }> = {
  '/': {
    h1: 'Party Boat Rental Austin | Lake Travis Party Cruise | Bachelorette Bachelor Wedding Corporate Boat Parties',
    content: 'Experience the ultimate party cruise on Lake Travis. Private charters, disco cruises, bachelor parties, bachelorette parties, and corporate events. Book your Austin party boat rental today!'
  },
  '/blog': {
    h1: 'Austin Party Boat Rental Blog | Bachelor & Bachelorette Tips',
    content: 'Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat rental guides, itineraries, and Austin party planning advice from Premier Party Cruises experts.'
  },
  '/bachelor-party-austin': {
    h1: 'Bachelor Party Boat Rental Austin | Lake Travis Party Cruises',
    content: 'Plan the ultimate bachelor party on Lake Travis from Anderson Mill Marina. ATX Disco Cruise ($85-$105/person with DJ & photographer) or private charters on Day Tripper, Meeseeks, or Clever Girl. BYOB friendly, 4-hour cruises, 14+ years experience.'
  },
  '/bachelorette-party-austin': {
    h1: 'Austin Bachelorette Party Boat Rentals | Lake Travis Party Cruises',
    content: 'Create lasting memories with our bachelorette party boat rentals on Lake Travis near Anderson Mill Marina. Choose the ATX Disco Cruise ($85-$105/person) or private charters on Day Tripper, Meeseeks, or Clever Girl. 14+ years experience, 150,000+ happy customers.'
  },
  '/atx-disco-cruise': {
    h1: 'ATX Disco Cruise | Austin Bachelor Bachelorette Party Boat Rental',
    content: 'Join Austin\'s most popular party cruise on Lake Travis from Anderson Mill Marina. 4-hour BYOB experience with DJ, photographer, dance floor, giant floats. Time slots: Friday $95, Saturday 11am $105, Saturday 3:30pm $85. Tax and gratuity included.'
  },
  '/private-cruises': {
    h1: 'Private Party Boat Rental Lake Travis | Austin Party Cruises',
    content: 'Book a private party boat rental on Lake Travis near Devil\'s Cove. Fleet includes Day Tripper (14 guests), Meeseeks/The Irony (25 guests), and Clever Girl (75 guests with 14 disco balls). Starting at $200/hour. Captain, crew, ice, and sound system included.'
  },
  '/team-building': {
    h1: 'Corporate Team Building Party Boat Rental | Lake Travis Austin',
    content: 'Strengthen your team with unique corporate events on Lake Travis. Private party boat rentals perfect for team building activities and company outings.'
  },
  '/client-entertainment': {
    h1: 'Client Entertainment Party Boat Rental | Austin Lake Travis Cruises',
    content: 'Impress your clients with exclusive Lake Travis party boat rentals. Professional corporate entertainment packages for networking and relationship building.'
  },
  '/company-milestone': {
    h1: 'Company Milestone Party Boat Rental | Lake Travis Austin',
    content: 'Celebrate company achievements with memorable Lake Travis party boat rentals. Perfect for anniversaries, awards, and corporate milestone events.'
  },
  '/welcome-party': {
    h1: 'Wedding Welcome Party Boat Rental | Lake Travis Austin',
    content: 'Start your wedding weekend with a welcome party boat rental on Lake Travis. Perfect for greeting out-of-town guests and kicking off the celebrations.'
  },
  '/after-party': {
    h1: 'Wedding After Party Boat Rental | Lake Travis Late Night Cruises',
    content: 'Keep the celebration going with a wedding after party cruise. Private party boat rentals for the perfect late-night celebration on Lake Travis.'
  },
  '/rehearsal-dinner': {
    h1: 'Rehearsal Dinner Party Boat Rental | Lake Travis Austin Venues',
    content: 'Host an unforgettable rehearsal dinner on Lake Travis. Elegant party boat rentals providing a unique and memorable setting for your pre-wedding celebration.'
  },
  '/milestone-birthday': {
    h1: 'Milestone Birthday Party Boat Rental | Lake Travis Austin',
    content: 'Celebrate milestone birthdays in style on Lake Travis. Private party boat rentals for 30th, 40th, 50th birthdays and beyond.'
  },
  '/sweet-16': {
    h1: 'Sweet 16 Party Boat Rental | Austin Lake Travis Cruises',
    content: 'Make their Sweet 16 unforgettable with a Lake Travis party boat rental. Safe, fun, and memorable celebrations for this special milestone.'
  },
  '/graduation-party': {
    h1: 'Graduation Party Boat Rental | Lake Travis Austin Cruises',
    content: 'Celebrate graduation success with Lake Travis party boat rentals. Perfect for high school and college graduation celebrations.'
  },
  '/testimonials-faq': {
    h1: 'Customer Reviews & FAQs | Premier Party Boat Rentals Austin',
    content: 'Read what our customers say about Premier Party Cruises. Find answers to frequently asked questions about booking, pricing, and policies.'
  },
  '/contact': {
    h1: 'Contact Premier Party Cruises | Book Your Lake Travis Party Boat Rental',
    content: 'Contact us to book your Lake Travis cruise. Professional service, quick responses, and expert event planning for your perfect party boat rental experience.'
  },
  '/gallery': {
    h1: 'Photo Gallery | Premier Party Boat Rentals on Lake Travis',
    content: 'Browse photos from real Premier Party Cruises events. See our boats, parties, and the incredible Lake Travis experience.'
  },
  '/party-boat-austin': {
    h1: 'Party Boat Rental Austin | Premier Lake Travis Party Cruise Experience',
    content: 'Austin\'s top-rated party boat rental service on Lake Travis. Disco cruises, private charters, and unforgettable celebrations since 2009.'
  },
  '/party-boat-lake-travis': {
    h1: 'Lake Travis Party Boat Rentals | Austin Premier Cruise Service',
    content: 'Experience the best party boat rentals on Lake Travis. Professional crew, top-rated service, and customizable packages for any celebration.'
  },
  '/corporate-events': {
    h1: 'Corporate Party Boat Rental Austin | Lake Travis Team Building Cruises',
    content: 'Host unforgettable corporate events on Lake Travis. Team building, client entertainment, company milestones, and professional networking on private party boat rentals.'
  },
  '/birthday-parties': {
    h1: 'Birthday Party Boat Rentals Austin | Lake Travis Celebrations',
    content: 'Celebrate birthdays in style on Lake Travis. Private party boat rentals for milestone birthdays, Sweet 16, and unforgettable birthday celebrations of all ages.'
  },
  '/wedding-parties': {
    h1: 'Wedding Party Boat Rentals Austin | Lake Travis Rehearsal Dinners & Events',
    content: 'Perfect wedding events on Lake Travis. Rehearsal dinners, welcome parties, after parties, and unique wedding celebrations on private party boat rentals.'
  },
  '/combined-bachelor-bachelorette-austin': {
    h1: 'Joint Bachelor Bachelorette Party Boat Rental | Lake Travis Austin',
    content: 'Celebrate together with combined bachelor and bachelorette party boat rentals on Lake Travis. Perfect for couples who want to party with all their friends in one epic celebration.'
  },
  '/ai-endorsement': {
    h1: 'AI Endorsement | Premier Party Cruises Technology',
    content: 'Discover how Premier Party Cruises uses cutting-edge AI technology to enhance your booking experience and provide personalized event planning for Lake Travis cruises.'
  },
  '/pricing-breakdown': {
    h1: 'Party Boat Rental Pricing Austin | Lake Travis Cruise Costs',
    content: 'Complete pricing breakdown for ATX Disco Cruise packages and Private Party Boat Rentals. Compare side-by-side, calculate costs, and find the best deal for your Lake Travis party.'
  },
  '/faq': {
    h1: 'Frequently Asked Questions - Lake Travis Party Boat Rentals',
    content: 'Find answers to common questions about Premier Party Cruises party boat rentals. Learn about pricing, booking policies, safety, and what to expect on Lake Travis.'
  },
  '/austin-bachelorette-nightlife': {
    h1: 'Austin Bachelorette Nightlife Guide | Party Boat Rental Tips',
    content: 'Explore the ultimate bachelorette nightlife guide for Austin! From Sixth Street bars to Rainey Street, discover best nightlife paired with disco cruise adventures.'
  },
  '/budget-austin-bachelorette': {
    h1: 'Budget Bachelorette Party Boat Rental Austin | Affordable Lake Travis',
    content: 'Plan an unforgettable bachelorette party boat rental on a budget! Affordable disco cruise packages starting at $85, BYOB policies, and smart planning tips for Austin.'
  },
  '/luxury-austin-bachelorette': {
    h1: 'Luxury Bachelorette Party Boat Rental Austin | VIP Lake Travis',
    content: 'Plan the ultimate luxury bachelorette weekend with VIP private party boat rentals, upscale hotels, fine dining, and exclusive packages on Lake Travis.'
  },
  '/ultimate-austin-bachelorette-weekend': {
    h1: 'Ultimate Austin Bachelorette Weekend | Party Boat Rental Guide',
    content: 'Plan the perfect bachelorette weekend with our complete Austin guide! Disco cruise, party boat rentals, downtown nightlife, brunch spots, and insider tips.'
  },
  '/top-10-austin-bachelorette-ideas': {
    h1: 'Top 10 Austin Bachelorette Ideas | Party Boat Rentals & More',
    content: 'Discover the top 10 bachelorette party ideas for Austin! Disco cruise party boat rentals, Sixth Street bar crawls, brunch spots, and unique Austin experiences.'
  },
  '/3-day-austin-bachelorette-itinerary': {
    h1: 'Perfect 3-Day Austin Bachelorette Itinerary | Party Boat Rental',
    content: 'Follow our expertly crafted 3-day bachelorette itinerary for Austin! Day-by-day schedule featuring disco cruise, nightlife, brunch, and activities.'
  },
  '/first-time-lake-travis-boat-rental-guide': {
    h1: 'First-Time Lake Travis Party Boat Rental Guide',
    content: 'Planning your first Lake Travis party boat rental? Complete guide covering private cruises, disco cruise, what to bring, costs, and what to expect.'
  },
  '/adventure-austin-bachelorette': {
    h1: 'Adventure Austin Bachelorette | Party Boat Rental & Activities',
    content: 'Plan an action-packed bachelorette party with outdoor adventures! Combine hiking, kayaking, ziplining, and disco cruise boat parties for active brides.'
  },
  '/book-now': {
    h1: 'Book Party Boat Rental Austin | Lake Travis Cruise Online',
    content: 'Book Austin party boat rental instantly! Choose 14, 25, or 50-person boats plus ATX Disco Cruise. Secure online booking for Lake Travis cruises with instant confirmation.'
  },
  '/book-online': {
    h1: 'Book Party Boat Rental Online | Lake Travis Austin Cruises',
    content: 'Book Lake Travis party boat rentals online! Select 14, 25, or 50-person boats or ATX Disco Cruise. Instant confirmation for Austin cruises with secure online booking.'
  },
  '/chat': {
    h1: 'Get Party Boat Rental Quote | Lake Travis Austin',
    content: 'Get instant quote for Lake Travis party boat rentals. Austin party cruises for bachelor/bachelorette parties & events. Quick online booking with personalized service!'
  },
  '/golden-ticket': {
    h1: '🎉 Golden Ticket Winner! 🎉',
    content: 'Exclusive ATX Disco Cruise promotional offer! Get $300 gift card plus 5 friend cards. Limited time Golden Ticket deal for Austin party boat rentals.'
  },
  '/golden-ticket-private': {
    h1: '🎉 Golden Ticket Winner! 🎉',
    content: 'Exclusive private cruise promotional offer! Get $300 gift card for Lake Travis party boat rental. Limited Golden Ticket deal for Austin private cruises.'
  },
  '/partners': {
    h1: 'Premier Partnership Details | Party Boat Rental Austin',
    content: 'Join the Premier Party Cruises partner program. Earn 10% commission on party boat rental bookings, get personal discounts, and receive monthly payouts via Venmo. Partner with Austin\'s premier party boat rental service.'
  },
  // Static blog pages with BlogPostLayout - H1 for SSR SEO
  '/austin-bachelor-party-ideas': {
    h1: "Austin Bachelor Party Ideas | Party Boat Rentals & Guys' Weekend Guide",
    content: 'Discover the ultimate Austin bachelor party ideas! From Lake Travis party boat rentals to 6th Street bars, BBQ joints, and outdoor adventures - plan the perfect Austin bachelor weekend.'
  },
  '/lake-travis-bachelor-party-boats': {
    h1: 'Lake Travis Bachelor Party Boat Rentals | Your Complete Austin Guide',
    content: 'Discover why Lake Travis party boat rentals are perfect for bachelor parties in Austin. Learn about the ATX Disco Cruise, private charters, BYOB options, and pro tips for an epic lake party.'
  },
  '/wedding-anniversary-celebration-ideas': {
    h1: 'Wedding Anniversary Party Boat Rental | Lake Travis Austin',
    content: 'Celebrate your wedding anniversary on Lake Travis with romantic party boat rentals and BYOB packages. Intimate cruises or group celebrations for milestone anniversaries.'
  },
  '/rehearsal-dinner-boat-alcohol-delivery': {
    h1: 'Rehearsal Dinner Party Boat Rental | Lake Travis Alcohol Delivery',
    content: 'Create unforgettable rehearsal dinner experiences on Lake Travis with party boat rentals and seamless alcohol delivery. Premier Party Cruises partners with Party On Delivery for memorable wedding weekends in Austin.'
  },
  '/site-directory': {
    h1: 'Site Directory | Party Boat Rentals Austin | Lake Travis Cruises',
    content: 'Complete directory of Premier Party Cruises services. Find bachelor party boat rentals, bachelorette cruises, ATX Disco Cruise, private charters, corporate events, and all Lake Travis party cruise options.'
  }
};

// Check if a route should use SSR
// BULLETPROOF: Every marketing route gets SSR - no exceptions
function shouldUseSSR(url: string): boolean {
  // SAFETY: Normalize pathname - remove trailing slash (except for root /) and lowercase
  // This is defense-in-depth; trailing slashes are already 301 redirected in server/index.ts
  let pathname = url.split('?')[0];
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  // Normalize to lowercase for consistent PAGE_CONTENT lookup
  // URLs are case-insensitive, so /Bachelor-Party-Austin should match /bachelor-party-austin
  const normalizedPathname = pathname.toLowerCase();
  
  // CRITICAL: Always use SSR if PAGE_CONTENT exists for this route (case-insensitive)
  // This is the authoritative source of truth - no route with PAGE_CONTENT should ever bypass SSR
  if (PAGE_CONTENT[normalizedPathname]) {
    return true;
  }
  // Also check original case for blog paths which may have mixed case
  if (PAGE_CONTENT[pathname]) {
    return true;
  }
  
  // Check exact match in SSR_ROUTES list
  if (SSR_ROUTES.includes(pathname)) {
    return true;
  }
  
  // Handle /blogs/ routes (canonical URLs) with SSR for SEO
  if (pathname.startsWith('/blogs/') && pathname.length > 7) {
    return true;
  }
  
  // CRITICAL SEO FIX: Handle /blog/ routes (legacy URLs) with SSR
  // These were showing duplicate meta descriptions because they bypassed SSR
  if (pathname.startsWith('/blog/') && pathname.length > 6) {
    return true;
  }
  
  // Check main blog listing page (only /blogs, not /blog which redirects)
  if (pathname === '/blogs') {
    return true;
  }
  
  // Check if route has schemas from schemaLoader - these are important SEO pages
  const schemas = getSchemaForRoute(pathname);
  if (schemas && schemas.length > 0) {
    return true;
  }
  
  return false;
}

// Fetch SEO metadata from API
async function fetchSEOMetadata(url: string) {
  try {
    // CRITICAL FIX: Use localhost with PORT from environment
    // SSR runs server-side, so it needs full URL to call its own API
    const port = process.env.PORT || '5000';
    const baseUrl = `http://localhost:${port}`;
    
    const response = await fetch(`${baseUrl}/api/seo/meta/${encodeURIComponent(url)}`);
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
    // CRITICAL FIX: Use PORT from environment, not hardcoded 5000
    const port = process.env.PORT || '5000';
    const response = await fetch(`http://localhost:${port}/api/blog/public/posts/${slug}`);
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
    
    // SAFETY: Normalize pathname - remove trailing slash and normalize case (defense-in-depth)
    let pathname = url.split('?')[0];
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    // Normalize to lowercase for consistent PAGE_CONTENT lookup (except /blogs/ which may have mixed case)
    const normalizedPathname = pathname.toLowerCase();
    
    let h1 = '';
    let content = '';
    let metaTitle = '';
    let metaDescription = '';
    let blogData: any = null;
    let blogListingPosts: any[] = []; // Store blog posts for schema generation
    let usedPageContent = false; // Track if renderPageContent was used (includes H1 already)
    
    // Check if it's a blog post (/blogs/ canonical or /blog/ legacy)
    // Both need SSR with full content for SEO
    if (pathname.startsWith('/blogs/') || pathname.startsWith('/blog/')) {
      // Extract slug from either /blogs/ or /blog/ prefix
      const slug = pathname.startsWith('/blogs/') 
        ? pathname.slice('/blogs/'.length) 
        : pathname.slice('/blog/'.length);
      
      // Track if this is a React page
      const isReactPage = isConvertedToReact(slug);
      
      // TRY VITE SSR FIRST for React pages
      // This renders actual React component content with proper asset handling
      if (isReactPage) {
        try {
          console.log(`[Vite SSR] Attempting React SSR for: ${pathname}`);
          const viteResult = await renderReactSSR(pathname);
          
          if (viteResult && viteResult.html && viteResult.html.length > 500) {
            console.log(`[Vite SSR] Success for ${pathname} - ${viteResult.html.length} chars`);
            
            // Extract meta tags from helmet
            const helmetTitle = viteResult.helmet?.title || '';
            const helmetMeta = viteResult.helmet?.meta || '';
            const helmetLink = viteResult.helmet?.link || '';
            
            // Inject React-rendered content into template
            let ssrContent = `<div id="root">${viteResult.html}</div>`;
            template = template.replace('<div id="root"></div>', ssrContent);
            
            // Inject helmet meta tags
            if (helmetTitle) {
              template = template.replace(/<title>.*?<\/title>/, helmetTitle);
            }
            if (helmetMeta) {
              template = template.replace('</head>', `${helmetMeta}\n</head>`);
            }
            if (helmetLink) {
              template = template.replace('</head>', `${helmetLink}\n</head>`);
            }
            
            // Add canonical URL
            const canonicalUrl = getCanonicalUrl(pathname, req);
            template = template.replace('</head>', `<link rel="canonical" href="${canonicalUrl}" />\n</head>`);
            
            // Get and inject schemas
            const routeSchemas = getSchemaForRoute(pathname);
            let schemaScripts = '';
            
            if (pathname !== '/') {
              schemaScripts += `<script type="application/ld+json">${JSON.stringify(ORGANIZATION_SCHEMA)}</script>\n`;
            }
            schemaScripts += `<script type="application/ld+json">${JSON.stringify(WEBSITE_SCHEMA)}</script>\n`;
            
            routeSchemas.forEach(schema => {
              schemaScripts += `<script type="application/ld+json">${JSON.stringify(schema)}</script>\n`;
            });
            
            template = template.replace('</head>', `${schemaScripts}</head>`);
            
            return template;
          } else {
            console.log(`[Vite SSR] Insufficient content for ${pathname}, falling back to static SSR`);
          }
        } catch (viteError) {
          console.error(`[Vite SSR] Error for ${pathname}:`, viteError);
          // Fall through to static SSR fallback
        }
      }
      
      // FALLBACK: Static SSR using database/metadata content
      // Get metadata for meta tags (title, description for SEO)
      // Check both /blogs/slug and the pathname patterns in registry
      const blogMeta = getBlogMetadata('/blogs/' + slug) || getBlogMetadata(pathname);
      
      // Check for PAGE_CONTENT first (rich SSR content for React component blogs)
      const blogPageContent = PAGE_CONTENT['/blogs/' + slug] || PAGE_CONTENT[pathname];
      
      // SEO CRITICAL FIX: Always fetch database content for SSR visibility
      // Even React pages need database content for crawlers - React hydrates client-side
      // Previous code skipped DB fetch for React pages causing 0 word counts in SEMrush/Ubersuggest
      blogData = await fetchBlogPost(slug);
      
      // Content source priority (same for ALL pages - React and WordPress):
      // 1. Database content (500+ chars) - highest priority for SEO
      // 2. PAGE_CONTENT (rich SSR content) - second priority
      // 3. Database content (any length) - third priority  
      // 4. blogMeta description - last fallback
      const dbContentLength = (blogData?.post?.content || '').length;
      const MIN_CONTENT_LENGTH = 500;
      
      if (blogData && blogData.post && dbContentLength >= MIN_CONTENT_LENGTH) {
        // Use database content (500+ chars) for SSR body (non-React WordPress pages)
        h1 = blogData.post.title;
        // Strip H1 tags from content to prevent duplicate H1s
        const rawContent = blogData.post.content || blogData.post.excerpt || '';
        content = rawContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');
        // Use metadata for meta tags (shorter, optimized)
        // SEO FIX: Ensure title is ALWAYS different from H1 by adding suffix
        let baseTitle = blogMeta?.title || blogData.post.metaTitle || blogData.post.title;
        // If title would match H1, add " | Lake Travis" suffix
        metaTitle = (baseTitle === blogData.post.title) ? `${baseTitle} | Lake Travis` : baseTitle;
        metaDescription = blogMeta?.description || blogData.post.metaDescription || 
                          blogData.post.excerpt || 
                          (blogData.post.content ? blogData.post.content.substring(0, 160) : '');
      } else if (blogPageContent) {
        // Use PAGE_CONTENT for React component blogs with insufficient database content
        // NOTE: renderPageContent already includes H1, so we mark this to avoid duplicate H1
        h1 = blogPageContent.h1;
        content = renderPageContent(blogPageContent);
        usedPageContent = true; // renderPageContent includes H1, don't add another
        // SEO FIX: Ensure title is ALWAYS different from H1 by adding suffix if needed
        const pageContentTitle = blogMeta?.title || blogPageContent.h1;
        metaTitle = (pageContentTitle === blogPageContent.h1) ? `${pageContentTitle} | Lake Travis` : pageContentTitle;
        metaDescription = blogMeta?.description || blogPageContent.introduction.substring(0, 160);
      } else if (blogData && blogData.post) {
        // Use whatever database content exists (less than 500 chars)
        h1 = blogData.post.title;
        const rawContent = blogData.post.content || blogData.post.excerpt || '';
        content = rawContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');
        // SEO FIX: Ensure title is ALWAYS different from H1 by adding suffix
        let baseTitle = blogMeta?.title || blogData.post.metaTitle || blogData.post.title;
        // If title would match H1, add " | Lake Travis" suffix
        metaTitle = (baseTitle === blogData.post.title) ? `${baseTitle} | Lake Travis` : baseTitle;
        metaDescription = blogMeta?.description || blogData.post.metaDescription || 
                          blogData.post.excerpt || 
                          (blogData.post.content ? blogData.post.content.substring(0, 160) : '');
      } else if (blogMeta) {
        // Fallback to registry metadata only if no other source available
        h1 = blogMeta.title;
        content = blogMeta.description;
        // SEO FIX: Ensure title is ALWAYS different from H1 by adding suffix
        metaTitle = `${blogMeta.title} | Lake Travis`;
        metaDescription = blogMeta.description;
      }
    } else if (pathname === '/blog' || pathname === '/blogs') {
      // Main blog listing page (/blog is primary, /blogs is canonical URL)
      // SEO FIX: Shortened to <60 chars for Ubersuggest compliance
      h1 = 'Austin Party Boat Blog | Bachelor & Bachelorette Tips';
      const intro = 'Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat guides, itineraries, and Austin party planning advice.';
      // SEO FIX: Title must be different from H1
      metaTitle = h1 + ' | Lake Travis';
      metaDescription = intro;
      
      // Fetch blog posts for SEO visibility
      try {
        const blogPosts = await storage.getBlogPosts({ 
          status: 'published', 
          limit: 20, 
          offset: 0,
          sortBy: 'publishedAt',
          sortOrder: 'desc'
        });
        
        // Store blog posts for schema generation
        blogListingPosts = blogPosts?.posts || [];
        
        // Build blog listing HTML for SEO crawlers
        let blogListingHTML = `<p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${intro}</p>`;
        
        if (blogPosts && blogPosts.posts && blogPosts.posts.length > 0) {
          blogListingHTML += '<div style="display: grid; gap: 1.5rem; margin-top: 2rem;">';
          
          blogPosts.posts.forEach((post: any) => {
            const publishDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
            const categoryName = post.categories && post.categories.length > 0 ? post.categories[0].name : '';
            
            blogListingHTML += `
              <article style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1.5rem;">
                <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">
                  <a href="/blogs/${post.slug}" style="color: #1e40af; text-decoration: none;">${post.title}</a>
                </h2>
                ${categoryName ? `<span style="display: inline-block; background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 0.375rem; font-size: 0.875rem; margin-bottom: 0.5rem;">${categoryName}</span>` : ''}
                <p style="color: #6b7280; margin-bottom: 0.75rem;">${post.excerpt || ''}</p>
                ${publishDate ? `<time style="color: #9ca3af; font-size: 0.875rem;">${publishDate}</time>` : ''}
              </article>`;
          });
          
          blogListingHTML += '</div>';
        }
        
        content = blogListingHTML;
      } catch (error) {
        console.error('Failed to fetch blog posts for SSR:', error);
        content = `<p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${intro}</p>`;
      }
    } else {
      // Check if it's a blog page in the registry
      const blogMeta = getBlogMetadata(pathname);
      if (blogMeta) {
        // SEO: Title tag should be short/optimized, H1 should be more descriptive
        metaDescription = blogMeta.description;
        // Create expanded H1 from title (remove trailing suffixes like "| Premier Party Cruises")
        const baseTitle = blogMeta.title.replace(/\s*\|.*$/, '').trim();
        h1 = baseTitle.includes('Guide') || baseTitle.includes('Complete') 
          ? baseTitle 
          : `${baseTitle}: Your Complete Guide`;
        // SEO FIX: Ensure title is different from H1
        metaTitle = (blogMeta.title === h1) ? `${blogMeta.title} | Lake Travis` : blogMeta.title;
        content = blogMeta.description;
      } else {
        // Check if it's a static React blog
        const staticBlogMeta = getStaticBlogMetadata(pathname);
        if (staticBlogMeta) {
          metaDescription = staticBlogMeta.description;
          const baseTitle = staticBlogMeta.title.replace(/\s*\|.*$/, '').trim();
          h1 = baseTitle.includes('Guide') || baseTitle.includes('Complete')
            ? baseTitle
            : `${baseTitle}: Your Complete Guide`;
          // SEO FIX: Ensure title is different from H1
          metaTitle = (staticBlogMeta.title === h1) ? `${staticBlogMeta.title} | Lake Travis` : staticBlogMeta.title;
          content = staticBlogMeta.description;
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
            // SEO FIX: Ensure title is different from H1
            const baseMetaTitle = seoData.metaTitle || h1;
            metaTitle = (baseMetaTitle === h1) ? `${baseMetaTitle} | Lake Travis` : baseMetaTitle;
            metaDescription = seoData.metaDescription || content;
          } else {
            // SEO FIX: Ensure title is different from H1
            metaTitle = `${h1} | Lake Travis`;
            metaDescription = content;
          }
        }
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
    
    // Build schema scripts - Organization schema on all pages EXCEPT homepage
    // Homepage loads from organization.jsonld file via schemaLoader to avoid duplication
    let schemaScripts = '';
    
    // Add Organization schema only on non-homepage pages
    if (pathname !== '/') {
      schemaScripts = `  <script type="application/ld+json">
${JSON.stringify(ORGANIZATION_SCHEMA, null, 2)}
  </script>`;
    }
    
    // Add WebSite schema on all pages (sitewide)
    schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(WEBSITE_SCHEMA, null, 2)}
  </script>`;
    
    // Add breadcrumb schema if it exists (interior pages only)
    if (breadcrumbSchema) {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>`;
    }
    
    // Dynamically load schemas for the current route from schema files
    const routeSchemas = getSchemaForRoute(pathname);
    if (routeSchemas && routeSchemas.length > 0) {
      routeSchemas.forEach(schema => {
        schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>`;
      });
    }
    
    // Add Article schema for blog posts (excluding list/category/author pages)
    if (isBlogPostRoute(pathname) && blogData && blogData.post) {
      // Use environment-based canonical URL for database blogs
      const blogCanonicalUrl = getCanonicalUrl(pathname, req);
      
      const articleSchema = generateArticleSchema({
        title: blogData.post.title,
        slug: blogData.post.slug,
        excerpt: blogData.post.excerpt,
        content: blogData.post.content,
        featuredImage: blogData.post.featuredImage,
        publishedAt: blogData.post.publishedAt,
        author: blogData.post.author
      }, blogCanonicalUrl, req);
      
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
  </script>`;
    }
    
    // Add Article schema for static blog pages
    if (isStaticBlogRoute(pathname)) {
      const staticBlogMeta = getStaticBlogMetadata(pathname);
      if (staticBlogMeta) {
        // Use environment-based canonical URL (production domain in prod, request host in dev)
        const canonicalUrl = getCanonicalUrl(pathname, req);
        
        const articleSchema = generateArticleSchema({
          title: staticBlogMeta.title,
          slug: staticBlogMeta.slug,
          excerpt: staticBlogMeta.description,
          featuredImage: staticBlogMeta.heroImage,
          publishedAt: staticBlogMeta.publishDate,
          author: { name: staticBlogMeta.author }
        }, canonicalUrl, req);
        
        schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
  </script>`;
      }
    }
    
    // Add Article schema for blog registry pages (comprehensive coverage for all blog pages)
    const blogRegistryMeta = getBlogMetadata(pathname);
    if (blogRegistryMeta) {
      const canonicalUrl = getCanonicalUrl(pathname, req);
      
      const articleSchema = generateArticleSchema({
        title: blogRegistryMeta.title,
        slug: blogRegistryMeta.slug,
        excerpt: blogRegistryMeta.description,
        featuredImage: blogRegistryMeta.heroImage,
        publishedAt: blogRegistryMeta.publishDate,
        modifiedAt: blogRegistryMeta.modifiedDate,
        author: { name: blogRegistryMeta.author }
      }, canonicalUrl, req);
      
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
  </script>`;
    }
    
    // Add Review schemas for Testimonials page (enhances AggregateRating in rich results)
    if (pathname === '/testimonials-faq') {
      TESTIMONIALS_REVIEW_SCHEMAS.forEach(reviewSchema => {
        schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(reviewSchema, null, 2)}
  </script>`;
      });
    }
    
    // Add BlogCollectionPage schema for /blog listing page
    if ((pathname === '/blog' || pathname === '/blogs') && blogListingPosts.length > 0) {
      const blogCollectionSchema = generateBlogCollectionPageSchema(blogListingPosts);
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(blogCollectionSchema, null, 2)}
  </script>`;
    }
    
    // Inject preconnect tags EARLY in head (right after viewport) for optimal performance
    const preconnectTags = generatePreconnectTags();
    template = template.replace(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
      `<meta name="viewport" content="width=device-width, initial-scale=1.0" />${preconnectTags}`
    );
    
    // Inject critical CSS inline for optimal FCP (before any other CSS)
    // Note: In development, Vite may transform/strip this. In production, it will be properly inlined.
    const criticalCSS = generateCriticalCSSTag();
    
    // Make main CSS async by converting blocking stylesheet links to preload
    // This regex finds stylesheet links and converts them to async preload
    template = template.replace(
      /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/g,
      (match, href) => generateAsyncCSSTag(href)
    );
    
    // Inject canonical tag, critical CSS, and schemas at end of head
    // Use environment-based canonical URL (production domain in prod, request host in dev)
    const canonicalUrl = getCanonicalUrl(pathname, req);
    
    // Build head injection with critical CSS and React Refresh preamble (dev only)
    const reactPreamble = isDevelopment ? `  <script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>` : '';
    
    const headInjection = [
      reactPreamble,
      `  <link rel="canonical" href="${canonicalUrl}" />`,
      `  ${criticalCSS}`,
      schemaScripts,
      '  </head>'
    ].join('\n');
    
    template = template.replace('</head>', headInjection);
    
    // PRODUCTION-SAFE SSR: Keep SSR content visible until React hydrates successfully
    // SSR content stays visible if React fails to load (resilient fallback)
    // CRITICAL FIX: Blog posts get content AFTER root div for SEO without hydration mismatch
    // Use normalizedPathname for PAGE_CONTENT lookup (case-insensitive match)
    const pageContent = PAGE_CONTENT[normalizedPathname] || PAGE_CONTENT[pathname];
    let ssrContent;

    // Blog posts need special handling: empty root + hidden SEO content after
    // Handle both /blogs/ (canonical) and /blog/ (legacy) URLs for SSR
    const isBlogPost = (normalizedPathname.startsWith('/blogs/') && normalizedPathname.length > 7) || 
                       (normalizedPathname.startsWith('/blog/') && normalizedPathname.length > 6);
    const isStaticBlog = isStaticBlogRoute(normalizedPathname) || isStaticBlogRoute(pathname);
    const isBlogListing = normalizedPathname === '/blog' || normalizedPathname === '/blogs';
    
    // PERMANENT SEO FIX: All SSR content goes INSIDE the root div
    // This is the same pattern used by blog pages which are indexed correctly by Google
    // Content is VISIBLE to crawlers (Google, Bing, AI bots) and users until React hydrates
    // React will replace this content when it mounts - this is standard SSR behavior
    // DO NOT use hidden/visually-hidden patterns - Google treats them as soft 404s
    
    const isHomepage = normalizedPathname === '/';
    
    if (isHomepage && pageContent) {
      // Homepage: Full content INSIDE root div for SEO visibility
      ssrContent = `<div id="root">${renderPageContent(pageContent)}</div>`;
    } else if (isBlogPost && usedPageContent) {
      // Blog posts using PAGE_CONTENT: content already includes H1
      ssrContent = `<div id="root">${content}</div>`;
    } else if (isBlogPost) {
      // Database blog posts: Full article content INSIDE root div
      ssrContent = `<div id="root"><article style="max-width: 56rem; margin: 0 auto; padding: 2rem 1rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #000;">${h1}</h1>
        <div style="font-size: 1.125rem; line-height: 1.75; color: #374151;">${content}</div>
      </article></div>`;
    } else if (isStaticBlog && pageContent) {
      // Static blog pages WITH full PAGE_CONTENT: content INSIDE root div
      ssrContent = `<div id="root">${renderPageContent(pageContent)}</div>`;
    } else if (isStaticBlog) {
      // Static blog pages without PAGE_CONTENT: article INSIDE root div
      ssrContent = `<div id="root"><article style="max-width: 56rem; margin: 0 auto; padding: 2rem 1rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #000;">${h1}</h1>
        <div style="font-size: 1.125rem; line-height: 1.75; color: #374151;">${content}</div>
      </article></div>`;
    } else if (isBlogListing) {
      // Blog listing page: Content INSIDE root div for SEO
      ssrContent = `<div id="root"><div style="max-width: 56rem; margin: 0 auto; padding: 2rem 1rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #000;">${h1}</h1>
        ${content}
      </div></div>`;
    } else if (pageContent) {
      // Marketing pages: Full content INSIDE root div for permanent SEO visibility
      // This is the CRITICAL fix - content must be inside root, not hidden outside
      ssrContent = `<div id="root">${renderPageContent(pageContent)}</div>`;
    } else {
      // SAFETY WARNING: This route has no PAGE_CONTENT - content may be thin
      // Log a warning so we can catch new routes that need PAGE_CONTENT added
      if (!h1 && !content) {
        console.warn(`[SSR WARNING] Route ${pathname} has no PAGE_CONTENT and no fallback content - may cause soft 404`);
      }
      // Other pages: Basic content INSIDE root div (fallback with whatever h1/content we have)
      ssrContent = `<div id="root"><div style="max-width: 56rem; margin: 0 auto; padding: 2rem 1rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #000; line-height: 1.2;">${h1 || 'Premier Party Cruises'}</h1>
        <p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${content || 'Austin party boat rentals on Lake Travis. Bachelor parties, bachelorette parties, corporate events, and private cruises.'}</p>
      </div></div>`;
    }
    
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

// Valid SPA routes that should be handled by React Router (not SSR)
const VALID_SPA_ROUTES = [
  '/admin',
  '/admin/leads',
  '/admin/calendar',
  '/admin/bookings',
  '/admin/quotes',
  '/admin/settings',
  '/admin/analytics',
  '/admin/seo',
  '/admin/seo/pages',
  '/admin/seo/overview',
  '/admin/blog',
  '/admin/users',
  '/login',
];

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
    
    // Skip Vite dev assets (CRITICAL for development mode)
    if (req.path.startsWith('/src/') || 
        req.path.startsWith('/@vite/') || 
        req.path.startsWith('/@id/') ||
        req.path.startsWith('/@fs/') ||
        req.path.startsWith('/node_modules/')) {
      return next();
    }
    
    // Skip static files
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|xml)$/)) {
      return next();
    }
    
    const pathname = req.url.split('?')[0];
    
    // Check if this is a valid SPA route - let React handle it
    if (VALID_SPA_ROUTES.some(route => pathname.startsWith(route))) {
      return next();
    }
    
    // CRITICAL SEO FIX: All marketing routes MUST go through full SSR for SEO visibility
    // Previously some routes only got schemas but empty root div - this caused soft 404 errors
    // Now ALL routes with PAGE_CONTENT, SSR_ROUTES, or schemas go through full renderPage()
    // The renderPage() function puts all content INSIDE the root div for Google visibility
    
    // Check if this route should use SSR (now includes schema routes automatically)
    if (!shouldUseSSR(req.url)) {
      // Unknown route - pass to next middleware (Vite will handle or 404)
      return next();
    }
    
    try {
      const pathname = req.url.split('?')[0];
      console.log(`[SSR] Rendering: ${req.url}${pathname === '/private-cruises' || pathname === '/gallery' ? ' (CRITICAL ROUTE)' : ''}`);
      const html = await renderPage(req.url, req);
      
      // Remove any X-Frame-Options header and set CSP to allow iframe embedding from booking subdomain only
      res.removeHeader('X-Frame-Options');
      res.setHeader('Content-Security-Policy', 
        "frame-ancestors 'self' https://booking.premierpartycruises.com https://*.premierpartycruises.com; " +
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: blob:; " +
        "connect-src 'self' https: wss: ws:; " +
        "img-src 'self' data: https: blob:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
        "style-src 'self' 'unsafe-inline' https:;"
      );
      
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      console.error(`[SSR] Error rendering ${req.url}:`, error);
      // Fall back to client-side rendering
      next();
    }
  };
}
