import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolveAsset } from "../utils/viteManifest";
import { PAGE_CONTENT, PageContent, PageSection } from './pageContent';
import { getSchemaForRoute, generateArticleSchema, isBlogPostRoute } from '../schemaLoader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache template at module level to avoid repeated disk I/O
let cachedTemplate: string | null = null;
// CRITICAL FIX: Use correct path for production vs development
// In production, use process.cwd() because __dirname is different in bundled code
const isDevelopment = process.env.NODE_ENV === 'development';
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

// Review Collection schema for Testimonials page (enhances AggregateRating visibility)
const TESTIMONIALS_REVIEW_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
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
        "@id": "https://premierpartycruises.com/#organization"
      }
    },
    {
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
        "@id": "https://premierpartycruises.com/#organization"
      }
    },
    {
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
        "@id": "https://premierpartycruises.com/#organization"
      }
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

// Bachelor Party Service Schema
const BACHELOR_PARTY_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://premierpartycruises.com/bachelor-party-austin/#service",
  "name": "Bachelor Party Boat Cruises on Lake Travis",
  "provider": { "@id": "https://premierpartycruises.com/#organization" },
  "areaServed": ["Austin TX", "Texas", "United States"],
  "description": "Exclusive bachelor party cruises on Lake Travis with BYOB, professional DJ, photographer, and all-inclusive packages. Join the best party boat experience for bachelor groups.",
  "offers": [
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "85.00",
      "name": "Basic Bach Package",
      "url": "https://premierpartycruises.com/bachelor-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "95.00",
      "name": "Disco King Package",
      "url": "https://premierpartycruises.com/bachelor-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "105.00",
      "name": "Super Sparkle Platinum Disco",
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
  "description": "Exclusive bachelorette party cruises on Lake Travis with BYOB, professional DJ, photographer, and VIP packages. Bride cruises free on select packages.",
  "offers": [
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "85.00",
      "name": "Basic Bach Package",
      "url": "https://premierpartycruises.com/bachelorette-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "95.00",
      "name": "Disco Queen Package",
      "url": "https://premierpartycruises.com/bachelorette-party-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "105.00",
      "name": "Super Sparkle Platinum Disco",
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
      "price": "85.00",
      "name": "Basic Bach",
      "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "95.00",
      "name": "Disco Queen",
      "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "105.00",
      "name": "Super Sparkle Platinum",
      "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
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

// FAQPage schema for Bachelor Party page
const BACHELOR_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a bachelor party boat cost in Austin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bachelor party boat rentals start at $85 per person for our ATX Disco Cruise packages, or from $195/hour for private charters with a 4-hour minimum. Packages include DJ, photographer, floats, and all amenities."
      }
    },
    {
      "@type": "Question",
      "name": "What's included in bachelor party boat packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Packages include professional DJ, photographer, giant floats, lily pads, disco dance floor, party supplies, mixers, ice water, restroom facilities, BYOB friendly setup with coolers and ice, and professional crew."
      }
    },
    {
      "@type": "Question",
      "name": "Can we bring alcohol on the bachelor party boat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We are BYOB friendly. Bring your own alcohol, and we provide coolers with ice. We also offer alcohol delivery services directly to the boat for your convenience. All guests must be 21+ with valid ID."
      }
    }
  ]
};

// FAQPage schema for Bachelorette Party page
const BACHELORETTE_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does the bride cruise free on bachelorette party boats?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! The bride cruises FREE on our Disco Queen and Super Sparkle Platinum packages with 16+ paying guests. This is our special thank you for choosing Premier Party Cruises for your bachelorette celebration."
      }
    },
    {
      "@type": "Question",
      "name": "What bachelorette party packages do you offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer three bachelorette packages: Basic Bach ($85/person), Disco Queen ($95/person with bride free for 16+), and Super Sparkle Platinum ($105/person with bride free for 16+). All include DJ, photographer, floats, and full amenities."
      }
    }
  ]
};

// FAQPage schema for Private Cruises page
const PRIVATE_CRUISES_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a private boat rental cost on Lake Travis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Private boat rentals start at $195 per hour with a 4-hour minimum. Pricing varies by boat size (14-50 guests), day of week, and duration. Contact us for custom quotes for your specific event needs."
      }
    },
    {
      "@type": "Question",
      "name": "What boats are available for private charters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Choose from Day Tripper (14 guests), Me Seeks the Irony (18-25 guests), or flagship Clever Girl (30-50 guests with 14 disco balls and giant Texas flag). All include licensed captains, premium sound, and coolers with ice."
      }
    }
  ]
};

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
  "name": "Me Seeks the Irony - 25 Person Party Boat",
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
 * Generate complete HTML from PageContent structure
 * Renders all headings, paragraphs, and lists in semantic HTML
 */
function renderPageContent(content: PageContent): string {
  let html = `
    <div class="ssr-content" style="padding: 2rem; max-width: 1200px; margin: 0 auto; font-family: system-ui, sans-serif;">
      <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #000; line-height: 1.2;">${content.h1}</h1>
      <p style="font-size: 1.125rem; line-height: 1.75; color: #374151; margin-bottom: 2rem;">${content.introduction}</p>
  `;
  
  // Render each section
  content.sections.forEach(section => {
    html += `
      <section style="margin-bottom: 2.5rem;">
        <h2 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem; color: #000;">${section.heading}</h2>
    `;
    
    // Render paragraphs
    section.paragraphs.forEach(para => {
      html += `<p style="font-size: 1rem; line-height: 1.75; color: #4B5563; margin-bottom: 1rem;">${para}</p>\n`;
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
    
    // Check if it's a blog post (only /blogs/ - /blog/ redirects to /blogs/)
    if (pathname.startsWith('/blogs/')) {
      const slug = pathname.slice('/blogs/'.length);
      blogData = await fetchBlogPost(slug);
      
      if (blogData && blogData.post) {
        h1 = blogData.post.title;
        // CRITICAL FIX: Inject FULL blog content for SEO (not just excerpt)
        content = blogData.post.content || blogData.post.excerpt || '';
        metaTitle = `${blogData.post.title} | Premier Party Cruises Blog`;
        // Generate unique meta description from content if not set
        const uniqueDescription = blogData.post.metaDescription || 
                                  blogData.post.excerpt || 
                                  (blogData.post.content ? blogData.post.content.substring(0, 160) : '');
        metaDescription = uniqueDescription;
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
    
    // Build schema scripts - Organization schema always present (sitewide)
    let schemaScripts = `  <script type="application/ld+json">
${JSON.stringify(ORGANIZATION_SCHEMA, null, 2)}
  </script>`;
    
    // Add WebSite schema on all pages (sitewide)
    schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(WEBSITE_SCHEMA, null, 2)}
  </script>`;
    
    // Add boat Product schemas for Homepage only (fleet showcase)
    if (pathname === '/') {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(DAY_TRIPPER_PRODUCT_SCHEMA, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(ME_SEEKS_THE_IRONY_PRODUCT_SCHEMA, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(CLEVER_GIRL_PRODUCT_SCHEMA, null, 2)}
  </script>`;
    }
    
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
      const articleSchema = generateArticleSchema({
        title: blogData.post.title,
        slug: blogData.post.slug,
        excerpt: blogData.post.excerpt,
        content: blogData.post.content,
        featuredImage: blogData.post.featuredImage,
        publishedAt: blogData.post.publishedAt,
        author: blogData.post.author
      });
      
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
  </script>`;
    }
    
    // Add Review schema for Testimonials page (enhances AggregateRating in rich results)
    if (pathname === '/testimonials-faq') {
      schemaScripts += `
  <script type="application/ld+json">
${JSON.stringify(TESTIMONIALS_REVIEW_SCHEMA, null, 2)}
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
    // Derive canonical URL from request host/protocol instead of hard-coding
    const protocol = req.secure ? 'https' : 'http';
    const host = req.get('host') || 'premierpartycruises.com';
    const canonicalUrl = `${protocol}://${host}${pathname}`;
    
    // Build head injection with critical CSS
    const headInjection = [
      `  <link rel="canonical" href="${canonicalUrl}" />`,
      `  ${criticalCSS}`,
      schemaScripts,
      '  </head>'
    ].join('\n');
    
    template = template.replace('</head>', headInjection);
    
    // PRODUCTION-SAFE SSR: Keep SSR content visible until React hydrates successfully
    // SSR content stays visible if React fails to load (resilient fallback)
    const pageContent = PAGE_CONTENT[pathname];
    let ssrContent;

    if (pageContent) {
      // Inject both root div and SSR content (SSR visible until React sets data-hydrated)
      ssrContent = `
      <div id="root"></div>
      ${renderPageContent(pageContent)}`;
    } else {
      // Simple fallback with SSR content
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
  '/chat',
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
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      return next();
    }
    
    const pathname = req.url.split('?')[0];
    
    // Check if this is a valid SPA route - let React handle it
    if (VALID_SPA_ROUTES.some(route => pathname.startsWith(route))) {
      return next();
    }
    
    // Check if this route should use SSR
    if (!shouldUseSSR(req.url)) {
      // Unknown route - pass to next middleware (Vite will handle or 404)
      return next();
    }
    
    try {
      console.log(`[SSR] Rendering: ${req.url}`);
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
