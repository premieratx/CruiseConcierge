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
// IMPORTANT: Per Google guidelines, the LAST breadcrumb item should NOT have an "item" property
// because it represents the current page. Only non-terminal items need the "item" URL.
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
  
  // Build breadcrumb list - LAST item has NO "item" property (Google requirement)
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
        "name": pageName
        // NOTE: No "item" property on last breadcrumb per Google's guidelines
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
  '/luxury-austin-bachelorette',
  '/ultimate-austin-bachelorette-weekend',
  '/top-10-austin-bachelorette-ideas',
  '/3-day-austin-bachelorette-itinerary',
  '/first-time-lake-travis-boat-rental-guide',
  '/adventure-austin-bachelorette',
  // New static blog pages (React components with BlogPostLayout) - SEO-critical
  '/austin-bachelor-party-ideas',
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
];

// Page metadata for SEO
const PAGE_METADATA: Record<string, { h1: string; content: string }> = {
  '/': {
    h1: 'Premier Party Cruises - Austin Lake Travis Boat Rentals',
    content: 'Experience the ultimate party cruise on Lake Travis. Private charters, disco cruises, bachelor parties, bachelorette parties, and corporate events. Book your Austin boat rental today!'
  },
  '/blog': {
    h1: 'Austin Party Boat Blog | Bachelor & Bachelorette Tips',
    content: 'Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat guides, itineraries, and Austin party planning advice from Premier Party Cruises experts.'
  },
  '/bachelor-party-austin': {
    h1: 'Austin Bachelor Party Boats | Lake Travis | Premier Party Cruises',
    content: 'Plan the ultimate bachelor party on Lake Travis from Anderson Mill Marina. ATX Disco Cruise ($85-$105/person with DJ & photographer) or private charters on Day Tripper, Meeseeks, or Clever Girl. BYOB friendly, 4-hour cruises, 14+ years experience.'
  },
  '/bachelorette-party-austin': {
    h1: 'Austin Bachelorette Party Boats | Lake Travis | Premier Party Cruises',
    content: 'Create lasting memories with our bachelorette party boat rentals on Lake Travis near Anderson Mill Marina. Choose the ATX Disco Cruise ($85-$105/person) or private charters on Day Tripper, Meeseeks, or Clever Girl. 14+ years experience, countless happy customers.'
  },
  '/atx-disco-cruise': {
    h1: 'ATX Disco Cruise | Austin Bachelor & Bachelorette Party Boat | Premier Party Cruises',
    content: 'Join Austin\'s most popular party cruise on Lake Travis from Anderson Mill Marina. 4-hour BYOB experience with DJ, photographer, dance floor, giant floats. Time slots: Friday $95, Saturday 11am $105, Saturday 3:30pm $85. Tax and gratuity included.'
  },
  '/private-cruises': {
    h1: 'Private Boat Charters Lake Travis | Day Tripper, Meeseeks & Clever Girl | Premier Party Cruises',
    content: 'Book a private boat cruise on Lake Travis near Devil\'s Cove. Fleet includes Day Tripper (14 guests), Meeseeks/The Irony (25 guests), and Clever Girl (75 guests with 14 disco balls). Starting at $200/hour. Captain, crew, ice, and sound system included.'
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
    h1: 'Joint Bachelor/Bachelorette Parties | Lake Travis Austin',
    content: 'Celebrate together with combined bachelor and bachelorette party cruises on Lake Travis. Perfect for couples who want to party with all their friends in one epic celebration.'
  },
  '/ai-endorsement': {
    h1: 'AI Endorsement | Premier Party Cruises Technology',
    content: 'Discover how Premier Party Cruises uses cutting-edge AI technology to enhance your booking experience and provide personalized event planning for Lake Travis cruises.'
  },
  '/pricing-breakdown': {
    h1: 'Pricing Breakdown | Premier Party Cruises Austin',
    content: 'Complete pricing breakdown for ATX Disco Cruise packages and Private Boat Rentals. Compare side-by-side, calculate costs, and find the best deal for your Lake Travis party.'
  },
  '/faq': {
    h1: 'Frequently Asked Questions - Lake Travis Boat Rentals',
    content: 'Find answers to common questions about Premier Party Cruises boat rentals. Learn about pricing, booking policies, safety, and what to expect on Lake Travis.'
  },
  '/austin-bachelorette-nightlife': {
    h1: 'Austin Bachelorette Nightlife Guide - Best Bars & Clubs',
    content: 'Explore the ultimate bachelorette nightlife guide for Austin! From Sixth Street bars to Rainey Street, discover best nightlife paired with disco cruise adventures.'
  },
  '/budget-austin-bachelorette': {
    h1: 'Budget-Friendly Austin Bachelorette Party Planning',
    content: 'Plan an unforgettable bachelorette party on a budget! Affordable disco cruise packages starting at $85, BYOB policies, and smart planning tips for Austin.'
  },
  '/luxury-austin-bachelorette': {
    h1: 'Luxury Austin Bachelorette Weekend - VIP Experiences',
    content: 'Plan the ultimate luxury bachelorette weekend with VIP private cruises, upscale hotels, fine dining, and exclusive packages on Lake Travis.'
  },
  '/ultimate-austin-bachelorette-weekend': {
    h1: 'Ultimate Austin Bachelorette Weekend Complete Guide',
    content: 'Plan the perfect bachelorette weekend with our complete Austin guide! Disco cruise, boat parties, downtown nightlife, brunch spots, and insider tips.'
  },
  '/top-10-austin-bachelorette-ideas': {
    h1: 'Top 10 Austin Bachelorette Party Ideas & Activities',
    content: 'Discover the top 10 bachelorette party ideas for Austin! Disco cruise boat parties, Sixth Street bar crawls, brunch spots, and unique Austin experiences.'
  },
  '/3-day-austin-bachelorette-itinerary': {
    h1: 'Perfect 3-Day Austin Bachelorette Party Itinerary',
    content: 'Follow our expertly crafted 3-day bachelorette itinerary for Austin! Day-by-day schedule featuring disco cruise, nightlife, brunch, and activities.'
  },
  '/first-time-lake-travis-boat-rental-guide': {
    h1: 'First-Time Lake Travis Boat Rental Guide',
    content: 'Planning your first Lake Travis boat rental? Complete guide covering private cruises, disco cruise, what to bring, costs, and what to expect.'
  },
  '/adventure-austin-bachelorette': {
    h1: 'Adventurous Austin Bachelorette Party Activities',
    content: 'Plan an action-packed bachelorette party with outdoor adventures! Combine hiking, kayaking, ziplining, and disco cruise boat parties for active brides.'
  },
  '/book-now': {
    h1: 'Book Your Cruise Online',
    content: 'Book Austin party boat instantly! Choose 14, 25, or 50-person boats plus ATX Disco Cruise. Secure online booking for Lake Travis cruises with instant confirmation.'
  },
  '/book-online': {
    h1: 'Book Your Cruise Online',
    content: 'Book Lake Travis party boats online! Select 14, 25, or 50-person boats or ATX Disco Cruise. Instant confirmation for Austin cruises with secure online booking.'
  },
  '/chat': {
    h1: 'Welcome Aboard!',
    content: 'Get instant quote for Lake Travis boat rentals. Austin party cruises for bachelor/bachelorette parties & events. Quick online booking with personalized service!'
  },
  '/golden-ticket': {
    h1: '🎉 Golden Ticket Winner! 🎉',
    content: 'Exclusive ATX Disco Cruise promotional offer! Get $300 gift card plus 5 friend cards. Limited time Golden Ticket deal for Austin party cruises.'
  },
  '/golden-ticket-private': {
    h1: '🎉 Golden Ticket Winner! 🎉',
    content: 'Exclusive private cruise promotional offer! Get $300 gift card for Lake Travis boat rental. Limited Golden Ticket deal for Austin private cruises.'
  },
  '/partners': {
    h1: 'Premier Partnership Details',
    content: 'Join the Premier Party Cruises partner program. Earn 10% commission on boat bookings, get personal discounts, and receive monthly payouts via Venmo. Partner with Austin\'s premier party boat rental service.'
  },
  // Static blog pages with BlogPostLayout - H1 for SSR SEO
  '/austin-bachelor-party-ideas': {
    h1: "Austin Bachelor Party Ideas: Top Things to Do for an Epic Guys' Weekend",
    content: 'Discover the ultimate Austin bachelor party ideas! From Lake Travis party boats to 6th Street bars, BBQ joints, and outdoor adventures - plan the perfect Austin bachelor weekend.'
  },
  '/lake-travis-bachelor-party-boats': {
    h1: 'Lake Travis Bachelor Party Boats: The Ultimate Austin Party Cruise Experience',
    content: 'Discover why Lake Travis party boats are perfect for bachelor parties in Austin. Learn about the ATX Disco Cruise, private charters, BYOB options, and pro tips for an epic lake party.'
  },
  '/wedding-anniversary-celebration-ideas': {
    h1: 'Wedding Anniversary Celebration Ideas: Recreating Your Special Day with Boat and Alcohol Packages',
    content: 'Celebrate your wedding anniversary on Lake Travis with romantic boat rentals and BYOB packages. Intimate cruises or group celebrations for milestone anniversaries.'
  },
  '/rehearsal-dinner-boat-alcohol-delivery': {
    h1: 'Rehearsal Dinner Boat & Alcohol Delivery | Unique Wedding Weekend Experiences',
    content: 'Create unforgettable rehearsal dinner experiences on Lake Travis with boat parties and seamless alcohol delivery. Premier Party Cruises partners with Party On Delivery for memorable wedding weekends in Austin.'
  }
};

// Check if a route should use SSR
function shouldUseSSR(url: string): boolean {
  const pathname = url.split('?')[0];
  
  // Check exact match
  if (SSR_ROUTES.includes(pathname)) {
    return true;
  }
  
  // Handle /blogs/ routes (canonical URLs) with SSR for SEO
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
    
    const pathname = url.split('?')[0];
    let h1 = '';
    let content = '';
    let metaTitle = '';
    let metaDescription = '';
    let blogData: any = null;
    let blogListingPosts: any[] = []; // Store blog posts for schema generation
    
    // Check if it's a blog post (only /blogs/ - /blog/ redirects to /blogs/)
    if (pathname.startsWith('/blogs/')) {
      // First check blog registry for React component blogs
      const blogMeta = getBlogMetadata(pathname);
      if (blogMeta) {
        h1 = blogMeta.title;
        content = blogMeta.description;
        metaTitle = blogMeta.title;
        metaDescription = blogMeta.description;
      } else {
        // Fallback to database for CMS blogs
        const slug = pathname.slice('/blogs/'.length);
        blogData = await fetchBlogPost(slug);
        
        if (blogData && blogData.post) {
          h1 = blogData.post.title;
          // CRITICAL FIX: Inject FULL blog content for SEO (not just excerpt)
          // SEO FIX: Strip H1 tags from content to prevent duplicate H1s
          const rawContent = blogData.post.content || blogData.post.excerpt || '';
          content = rawContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');
          // SEO FIX: Remove suffix to keep titles under 60 chars - Google adds site name automatically
          metaTitle = blogData.post.metaTitle || blogData.post.title;
          // Generate unique meta description from content if not set
          const uniqueDescription = blogData.post.metaDescription || 
                                    blogData.post.excerpt || 
                                    (blogData.post.content ? blogData.post.content.substring(0, 160) : '');
          metaDescription = uniqueDescription;
        }
      }
    } else if (pathname === '/blog' || pathname === '/blogs') {
      // Main blog listing page (/blog is primary, /blogs is canonical URL)
      // SEO FIX: Shortened to <60 chars for Ubersuggest compliance
      h1 = 'Austin Party Boat Blog | Bachelor & Bachelorette Tips';
      const intro = 'Expert tips for planning bachelor and bachelorette parties in Austin. Lake Travis party boat guides, itineraries, and Austin party planning advice.';
      metaTitle = h1;
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
        h1 = blogMeta.title;
        content = blogMeta.description;
        metaTitle = blogMeta.title;
        metaDescription = blogMeta.description;
      } else {
        // Check if it's a static React blog
        const staticBlogMeta = getStaticBlogMetadata(pathname);
        if (staticBlogMeta) {
          h1 = staticBlogMeta.title;
          content = staticBlogMeta.description;
          metaTitle = staticBlogMeta.title;
          metaDescription = staticBlogMeta.description;
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
    const pageContent = PAGE_CONTENT[pathname];
    let ssrContent;

    // Blog posts need special handling: empty root + hidden SEO content after
    const isBlogPost = pathname.startsWith('/blogs/') && pathname.length > 7;
    const isStaticBlog = isStaticBlogRoute(pathname);
    const isBlogListing = pathname === '/blog' || pathname === '/blogs';
    
    if (isBlogPost || isStaticBlog) {
      // Blog posts (WordPress + static React): empty root div + hidden SEO content for crawlers
      // noscript ensures content is visible to bots but hidden from React hydration
      ssrContent = `<div id="root"></div>
      <noscript>
        <article style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
          <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #000;">${h1}</h1>
          <div style="font-size: 1.125rem; line-height: 1.75; color: #374151;">${content}</div>
        </article>
      </noscript>`;
    } else if (isBlogListing) {
      // Blog listing page: Inject full blog listing HTML directly (contains <article> tags)
      ssrContent = `
      <div id="root"></div>
      <div class="ssr-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #000;">${h1}</h1>
        ${content}
      </div>`;
    } else if (pageContent) {
      // Marketing pages: Inject both root div and SSR content (SSR visible until React sets data-hydrated)
      ssrContent = `
      <div id="root"></div>
      ${renderPageContent(pageContent)}`;
    } else {
      // Other pages: Simple fallback with SSR content
      ssrContent = `
      <div id="root"></div>
      <div class="ssr-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #000;">${h1}</h1>
        <p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${content}</p>
      </div>`;
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
    
    // CRITICAL SEO FIX: Blog posts MUST go through SSR for unique meta tags
    // Previously this skipped blog posts, causing all 43+ pages to have duplicate titles/descriptions
    // Now blog posts use full SSR rendering with metadata from blogMetadataRegistry
    // The renderPage() function handles /blogs/* routes with proper H1, content, and meta injection
    
    // Check if we have schemas for this route (even if not SSR)
    const schemas = getSchemaForRoute(pathname);
    
    // Check if this route should use SSR
    if (!shouldUseSSR(req.url)) {
      // If we have schemas but no SSR, inject schemas AND canonical tag
      if (schemas.length > 0) {
        try {
          console.log(`[Schema-Only] Injecting ${schemas.length} schemas + canonical for: ${pathname}`);
          let template = await getTemplate();
          
          // CRITICAL: Generate canonical URL (strips query params, uses production domain)
          const canonicalUrl = getCanonicalUrl(pathname, req);
          
          // Add sitewide schemas (Organization on non-homepage pages + WebSite)
          let headInjection = `  <link rel="canonical" href="${canonicalUrl}" />\n`;
          
          if (pathname !== '/') {
            headInjection += `  <script type="application/ld+json">
${JSON.stringify(ORGANIZATION_SCHEMA, null, 2)}
  </script>`;
          }
          
          headInjection += `  <script type="application/ld+json">
${JSON.stringify(WEBSITE_SCHEMA, null, 2)}
  </script>`;
          
          // Add route-specific schemas
          schemas.forEach(schema => {
            headInjection += `
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>`;
          });
          
          // Inject canonical + schemas before </head>
          template = template.replace('</head>', `\n${headInjection}\n  </head>`);
          
          return res.status(200).set({ 'Content-Type': 'text/html' }).send(template);
        } catch (error) {
          console.error(`[Schema-Only] Error injecting for ${pathname}:`, error);
        }
      }
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
