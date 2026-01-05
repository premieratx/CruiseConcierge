import * as HelmetAsync from 'react-helmet-async';
const HelmetAsyncDefault = (HelmetAsync as any).default || HelmetAsync;
const { Helmet } = HelmetAsyncDefault;

// Comprehensive Schema Markup Component for all schema types
interface SchemaMarkupProps {
  schemas: Array<Record<string, any>>;
}

// Helper function to remove undefined values from schema objects
function cleanSchema(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(cleanSchema).filter(item => item !== undefined);
  }
  if (obj && typeof obj === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        cleaned[key] = cleanSchema(value);
      }
    }
    return cleaned;
  }
  return obj;
}

export function SchemaMarkup({ schemas }: SchemaMarkupProps) {
  return (
    <Helmet>
      {schemas.map((schema, index) => {
        const cleanedSchema = cleanSchema(schema);
        return (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedSchema) }}
          />
        );
      })}
    </Helmet>
  );
}

// LocalBusiness Schema Generator
export function generateLocalBusinessSchema(options?: {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
  };
  geo?: {
    latitude?: string;
    longitude?: string;
  };
  openingHours?: string;
  priceRange?: string;
  image?: string;
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": options?.name || "Premier Party Cruises",
    "description": options?.description || "Austin's premier party boat rental service on Lake Travis. Specializing in bachelor parties, bachelorette parties, and private cruises.",
    "url": options?.url || baseUrl,
    "telephone": options?.telephone || "(512) 488-5892",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": options?.address?.streetAddress || "Anderson Mill Marina, 13993 FM 2769",
      "addressLocality": options?.address?.addressLocality || "Austin",
      "addressRegion": options?.address?.addressRegion || "TX",
      "postalCode": options?.address?.postalCode || "78750",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": options?.geo?.latitude || "30.4508",
      "longitude": options?.geo?.longitude || "-97.8567"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "priceRange": options?.priceRange || "$$-$$$",
    "image": options?.image || `${baseUrl}/PPC-Logo-LARGE.webp`,
    "aggregateRating": options?.aggregateRating ? {
      "@type": "AggregateRating",
      "ratingValue": options.aggregateRating.ratingValue,
      "reviewCount": options.aggregateRating.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "sameAs": [
      "https://www.facebook.com/premierpartycruises",
      "https://www.instagram.com/premierpartycruises",
      "https://www.twitter.com/ppcaustin"
    ]
  };
}

// Event Schema Generator for ATX Disco Cruise
export function generateEventSchema(options: {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  performer?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability: string;
    url?: string;
    validFrom?: string;
  };
  image?: string;
  eventAttendanceMode?: string;
  eventStatus?: string;
  organizer?: {
    name: string;
    url?: string;
  };
}) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  // Calculate default dates - next Saturday at 12:00 PM to 4:00 PM
  const getNextSaturday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
    const nextSaturday = new Date(now);
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    nextSaturday.setHours(12, 0, 0, 0);
    return nextSaturday;
  };
  
  const defaultStartDate = getNextSaturday();
  const defaultEndDate = new Date(defaultStartDate);
  defaultEndDate.setHours(16, 0, 0, 0);
  
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": options.name,
    "description": options.description,
    "startDate": options.startDate || defaultStartDate.toISOString(),
    "endDate": options.endDate || defaultEndDate.toISOString(),
    "location": {
      "@type": "Place",
      "name": options.location || "Anderson Mill Marina",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13993 FM 2769",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78750",
        "addressCountry": "US"
      }
    },
    "image": options.image || `${baseUrl}/atx-disco-cruise-party.webp`,
    "offers": {
      "@type": "Offer",
      "price": options.offers?.price || 85,
      "priceCurrency": options.offers?.priceCurrency || "USD",
      "availability": options.offers?.availability || "https://schema.org/InStock",
      "url": options.offers?.url || `${baseUrl}/atx-disco-cruise`,
      "validFrom": options.offers?.validFrom || new Date().toISOString(),
      "seller": {
        "@type": "Organization",
        "name": "Premier Party Cruises"
      }
    },
    "performer": options.performer ? {
      "@type": "PerformingGroup",
      "name": options.performer
    } : undefined,
    "eventAttendanceMode": options.eventAttendanceMode || "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": options.eventStatus || "https://schema.org/EventScheduled",
    "organizer": {
      "@type": "Organization",
      "name": options.organizer?.name || "Premier Party Cruises",
      "url": options.organizer?.url || baseUrl
    }
  };
}

// Product Schema Generator for Packages
export function generateProductSchema(options: {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers: {
    price: number;
    priceCurrency: string;
    availability: string;
    seller?: string;
    validFrom?: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
  review?: Array<{
    author: string;
    reviewRating: number;
    reviewBody: string;
    datePublished?: string;
  }>;
}) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": options.name,
    "description": options.description,
    "image": options.image || `${baseUrl}/PPC-Logo-LARGE.webp`,
    "brand": {
      "@type": "Brand",
      "name": options.brand || "Premier Party Cruises"
    },
    "offers": {
      "@type": "Offer",
      "price": options.offers.price,
      "priceCurrency": options.offers.priceCurrency || "USD",
      "availability": options.offers.availability || "https://schema.org/InStock",
      "validFrom": options.offers.validFrom || new Date().toISOString(),
      "seller": {
        "@type": "Organization",
        "name": options.offers.seller || "Premier Party Cruises"
      }
    },
    "aggregateRating": options.aggregateRating ? {
      "@type": "AggregateRating",
      "ratingValue": options.aggregateRating.ratingValue,
      "reviewCount": options.aggregateRating.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": options.review?.map(r => ({
      "@type": "Review",
      "itemReviewed": {
        "@type": "Product",
        "name": options.name
      },
      "author": {
        "@type": "Person",
        "name": r.author || "Verified Customer"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.reviewRating || 5,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": r.reviewBody,
      "datePublished": r.datePublished || new Date().toISOString()
    }))
  };
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Service Schema Generator
export function generateServiceSchema(options: {
  name: string;
  description: string;
  provider?: string;
  serviceType?: string;
  areaServed?: string;
  hasOfferCatalog?: Array<{
    name: string;
    description: string;
    price?: number;
  }>;
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": options.name,
    "description": options.description,
    "provider": {
      "@type": "Organization",
      "name": options.provider || "Premier Party Cruises"
    },
    "serviceType": options.serviceType,
    "areaServed": {
      "@type": "City",
      "name": options.areaServed || "Austin"
    },
    "hasOfferCatalog": options.hasOfferCatalog ? {
      "@type": "OfferCatalog",
      "name": "Service Packages",
      "itemListElement": options.hasOfferCatalog.map(offer => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": offer.name,
          "description": offer.description
        },
        "price": offer.price
      }))
    } : undefined,
    "aggregateRating": options.aggregateRating ? {
      "@type": "AggregateRating",
      "ratingValue": options.aggregateRating.ratingValue,
      "reviewCount": options.aggregateRating.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined
  };
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const isLastItem = index === items.length - 1;
      const fullUrl = item.url ? `${baseUrl}${item.url}` : undefined;
      
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        // Last item shouldn't have item property, others should have proper @id
        ...((!isLastItem && fullUrl) ? {
          "item": {
            "@id": fullUrl,
            "name": item.name
          }
        } : {})
      };
    })
  };
}

// Organization Schema Generator
export function generateOrganizationSchema() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Premier Party Cruises",
    "alternateName": "PPC Austin",
    "url": baseUrl,
    "logo": `${baseUrl}/PPC-Logo-LARGE.webp`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-512-488-5892",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/premierpartycruises",
      "https://www.instagram.com/premierpartycruises",
      "https://www.twitter.com/ppcaustin"
    ]
  };
}

// Review Schema Generator
export function generateReviewSchema(options: {
  itemReviewed: {
    type: string;
    name: string;
    description?: string;
    url?: string;
  };
  author: string;
  reviewRating: number;
  reviewBody: string;
  datePublished?: string;
  publisher?: string;
}) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": options.itemReviewed.type || "Service",
      "name": options.itemReviewed.name || "Premier Party Cruises Lake Travis Boat Rental",
      "description": options.itemReviewed.description || "Party boat rental service on Lake Travis in Austin, Texas",
      "url": options.itemReviewed.url || baseUrl
    },
    "author": {
      "@type": "Person",
      "name": options.author || "Verified Customer"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": options.reviewRating || 5,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": options.reviewBody,
    "datePublished": options.datePublished || new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": options.publisher || "Premier Party Cruises",
      "sameAs": baseUrl
    }
  };
}

// AggregateRating Schema Generator
export function generateAggregateRatingSchema(options: {
  itemReviewed: {
    type: string;
    name: string;
  };
  ratingValue: string;
  reviewCount: string;
  bestRating?: string;
  worstRating?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": options.itemReviewed.type,
      "name": options.itemReviewed.name
    },
    "ratingValue": options.ratingValue,
    "reviewCount": options.reviewCount,
    "bestRating": options.bestRating || "5",
    "worstRating": options.worstRating || "1"
  };
}

// HowTo Schema Generator
export function generateHowToSchema(options: {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: {
    value: number;
    currency: string;
  };
  supply?: string[];
  tool?: string[];
  step: Array<{
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": options.name,
    "description": options.description,
    "totalTime": options.totalTime,
    "estimatedCost": options.estimatedCost ? {
      "@type": "MonetaryAmount",
      "value": options.estimatedCost.value,
      "currency": options.estimatedCost.currency
    } : undefined,
    "supply": options.supply?.map(s => ({ "@type": "HowToSupply", "name": s })),
    "tool": options.tool?.map(t => ({ "@type": "HowToTool", "name": t })),
    "step": options.step.map((s, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": s.name,
      "text": s.text,
      "image": s.image,
      "url": s.url
    })),
    "image": options.image
  };
}

// WebSite Schema Generator with SearchAction
export function generateWebSiteSchema() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Premier Party Cruises",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Review Collection Schema Generator for multiple reviews
export function generateReviewCollectionSchema(options: {
  itemReviewed: {
    type: string;
    name: string;
    description?: string;
    url?: string;
  };
  reviews: Array<{
    author: string;
    rating: number;
    text: string;
    datePublished?: string;
  }>;
}) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  return options.reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": options.itemReviewed.type || "Service",
      "name": options.itemReviewed.name,
      "description": options.itemReviewed.description,
      "url": options.itemReviewed.url || baseUrl
    },
    "author": {
      "@type": "Person",
      "name": review.author || "Verified Customer"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.text,
    "datePublished": review.datePublished || new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Premier Party Cruises"
    }
  }));
}

// Place Schema Generator
export function generatePlaceSchema(options?: {
  name?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
  };
  geo?: {
    latitude?: string;
    longitude?: string;
  };
  telephone?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": options?.name || "Anderson Mill Marina",
    "description": options?.description || "Premier boat launch location on Lake Travis for party cruises",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": options?.address?.streetAddress || "13993 FM 2769",
      "addressLocality": options?.address?.addressLocality || "Austin",
      "addressRegion": options?.address?.addressRegion || "TX",
      "postalCode": options?.address?.postalCode || "78750",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": options?.geo?.latitude || "30.4508",
      "longitude": options?.geo?.longitude || "-97.8567"
    },
    "telephone": options?.telephone || "(512) 488-5892",
    "url": options?.url || "https://premierpartycruises.com"
  };
}