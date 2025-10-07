import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  pageRoute: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultKeywords?: string[];
  children?: React.ReactNode;
  schemaType?: 'webpage' | 'service' | 'event' | 'organization';
  customSchema?: Record<string, any> | Record<string, any>[];
  image?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  openGraphType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: string;
  canonicalUrl?: string;
  robotsDirective?: string;
  schemaMarkup?: Record<string, any>;
}

export default function SEOHead({
  pageRoute,
  defaultTitle = 'Premier Party Cruises - Austin Lake Travis Boat Rentals',
  defaultDescription = 'Austin\'s premier boat rental and party cruise experience on Lake Travis. Private charters, disco cruises, bachelor parties, and corporate events.',
  defaultKeywords = ['Austin boat rental', 'Lake Travis cruises', 'party boat Austin', 'bachelor party boat', 'private charter'],
  children,
  schemaType = 'webpage',
  customSchema,
  image,
  article
}: SEOHeadProps) {
  const [fallbackSchema, setFallbackSchema] = useState<Record<string, any>>({});

  // Fetch SEO data for this page route
  const { data: seoData, isLoading } = useQuery<SEOData>({
    queryKey: [`/api/seo/meta/${encodeURIComponent(pageRoute)}`],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: !!pageRoute,
  });

  // Helper function to ensure absolute URLs
  const ensureAbsoluteUrl = (url: string): string => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
    return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
  };

  // Prepare the SEO values (SEO data takes precedence over defaults)
  const title = seoData?.metaTitle || defaultTitle;
  const description = seoData?.metaDescription || defaultDescription;
  const keywords = seoData?.metaKeywords || defaultKeywords;
  const ogTitle = seoData?.openGraphTitle || title;
  const ogDescription = seoData?.openGraphDescription || description;
  const ogImage = ensureAbsoluteUrl(seoData?.openGraphImage || image || '/og-default.jpg');
  const ogType = seoData?.openGraphType || (article ? 'article' : 'website');
  const twitterTitle = seoData?.twitterTitle || ogTitle;
  const twitterDescription = seoData?.twitterDescription || ogDescription;
  const twitterImage = ensureAbsoluteUrl(seoData?.twitterImage || image || '/og-default.jpg');
  const twitterCard = seoData?.twitterCard || 'summary_large_image';
  const canonical = seoData?.canonicalUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}${pageRoute}`;
  const robots = seoData?.robotsDirective || 'index, follow';

  // Generate site-wide schemas that appear on every page
  const generateWebSiteSchema = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Premier Party Cruises",
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  };

  const generateEnhancedOrganizationSchema = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Premier Party Cruises",
      "image": ensureAbsoluteUrl("/PPC Logo LARGE_1757881944449.png"),
      "logo": ensureAbsoluteUrl("/PPC Logo LARGE_1757881944449.png"),
      "description": "Austin's premier boat rental and party cruise experience on Lake Travis",
      "url": baseUrl,
      "telephone": "+1-512-488-5892",
      "email": "clientservices@premierpartycruises.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13993 FM2769",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78641",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.3879",
        "longitude": "-97.9723"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "130",
        "bestRating": "5",
        "worstRating": "1"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "30.3879",
          "longitude": "-97.9723"
        },
        "geoRadius": "100"
      },
      "priceRange": "$$-$$$",
      "sameAs": [
        "https://www.instagram.com/premierpartycruises",
        "https://www.facebook.com/premierpartycruises",
        "https://www.tiktok.com/@premierpartycruises"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Boat Rental Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Private Charters",
              "description": "Exclusive boat rental with professional crew, perfect for intimate celebrations to large corporate events"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Disco Cruises",
              "description": "ATX Disco Cruise party boat experience with DJ and professional entertainment on Lake Travis"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bachelorette Packages",
              "description": "Specialized bachelorette party packages including Basic Bach, Disco Queen, and Platinum options with bride cruises free"
            }
          }
        ]
      }
    };
  };

  // Generate default structured data based on page type and content
  useEffect(() => {
    const generateDefaultSchema = () => {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierppartycruises.com';
      
      const defaultSchemas: Record<string, any> = {
        organization: generateEnhancedOrganizationSchema(),
        webpage: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": title,
          "description": description,
          "url": canonical,
          "isPartOf": {
            "@type": "WebSite",
            "name": "Premier Party Cruises",
            "url": baseUrl
          },
          "publisher": {
            "@type": "Organization",
            "name": "Premier Party Cruises",
            "url": baseUrl
          }
        },
        service: {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": title,
          "description": description,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "url": baseUrl
          },
          "serviceType": "Boat Rental",
          "areaServed": {
            "@type": "Place",
            "name": "Lake Travis, Austin, TX"
          }
        },
        event: {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": title,
          "description": description,
          "organizer": {
            "@type": "Organization",
            "name": "Premier Party Cruises",
            "url": baseUrl
          },
          "location": {
            "@type": "Place",
            "name": "Lake Travis",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Austin",
              "addressRegion": "TX",
              "addressCountry": "US"
            }
          }
        }
      };

      // Add article-specific schema
      if (article) {
        const articleSchema: Record<string, any> = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "url": canonical,
          "datePublished": article.publishedTime,
          "dateModified": article.modifiedTime || article.publishedTime,
          "author": {
            "@type": "Person",
            "name": article.author || "Premier Party Cruises"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Premier Party Cruises",
            "url": baseUrl
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical
          }
        };

        if (article.section) {
          articleSchema["articleSection"] = article.section;
        }

        if (article.tags && article.tags.length > 0) {
          articleSchema["keywords"] = article.tags.join(", ");
        }

        setFallbackSchema(articleSchema);
      } else {
        setFallbackSchema(defaultSchemas[schemaType] || defaultSchemas.webpage);
      }
    };

    generateDefaultSchema();
  }, [pageRoute, title, description, canonical, schemaType, article]);

  // Determine page-specific schema (custom > SEO data > fallback)
  const pageSpecificSchema = customSchema || seoData?.schemaMarkup || fallbackSchema;

  // Build comprehensive schema array with site-wide schemas on every page
  const siteWideSchemas = [
    generateWebSiteSchema(),
    generateEnhancedOrganizationSchema()
  ];

  // Convert pageSpecificSchema to array and combine with site-wide schemas
  const pageSchemaArray = Array.isArray(pageSpecificSchema) ? pageSpecificSchema : [pageSpecificSchema];
  const schemaArray = [...siteWideSchemas, ...pageSchemaArray];

  // Generate breadcrumb schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": generateBreadcrumbItems(pageRoute)
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      
      {/* Resource Hints for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${ogTitle} - Premier Party Cruises`} />
      <meta property="og:site_name" content="Premier Party Cruises" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@premierpartycruises" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={`${twitterTitle} - Premier Party Cruises`} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data - Render each schema in separate script tag */}
      {schemaArray.map((schema, index) => (
        schema && (
          <script key={`schema-${index}`} type="application/ld+json">
            {JSON.stringify(schema, null, 2)}
          </script>
        )
      ))}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbSchema.itemListElement.length > 1 && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema, null, 2)}
        </script>
      )}
      
      {/* Additional custom head elements */}
      {children}
    </Helmet>
  );
}

function generateBreadcrumbItems(pageRoute: string) {
  const pathSegments = pageRoute.split('/').filter(Boolean);
  const items = [];
  
  // Always include home
  items.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": typeof window !== 'undefined' ? window.location.origin : 'https://premierppartycruises.com'
  });
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = formatPageName(segment);
    
    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `${typeof window !== 'undefined' ? window.location.origin : 'https://premierppartycruises.com'}${currentPath}`
    });
  });
  
  return items;
}

function formatPageName(segment: string): string {
  const nameMap: Record<string, string> = {
    'bachelor-party': 'Bachelor Party Cruises',
    'bachelorette-party': 'Bachelorette Party Cruises',
    'private-cruises': 'Private Cruises',
    'contact': 'Contact Us',
    'gallery': 'Gallery',
    'blog': 'Blog',
    'about': 'About Us',
    'pricing': 'Pricing',
    'booking': 'Book Now',
    'admin': 'Admin Dashboard'
  };
  
  return nameMap[segment] || segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Export utility function for generating FAQ schema
export function generateFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Export utility function for manual schema generation
export function generateBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "#organization",
    "name": "Premier Party Cruises",
    "alternateName": "PPC Austin",
    "description": "Austin's premier boat rental and party cruise experience on Lake Travis. We specialize in private charters, disco cruises, bachelor parties, and corporate events.",
    "url": "https://premierppartycruises.com",
    "telephone": "+1-512-488-5892",
    "email": "clientservices@premierpartycruises.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "13993 FM2769",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78641",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.3879",
      "longitude": "-97.9723"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "130",
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "30.3879",
        "longitude": "-97.9723"
      },
      "geoRadius": "100"
    },
    "priceRange": "$$-$$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "sameAs": [
      "https://www.facebook.com/premierppartycruises",
      "https://www.instagram.com/premierppartycruises",
      "https://www.twitter.com/ppcaustin"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Boat Rental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Private Charters",
            "description": "Exclusive boat rental with professional crew, perfect for intimate celebrations to large corporate events"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Disco Cruises",
            "description": "ATX Disco Cruise party boat experience with DJ and professional entertainment on Lake Travis"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bachelorette Packages",
            "description": "Specialized bachelorette party packages including Basic Bach, Disco Queen, and Platinum options with bride cruises free"
          }
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "The ATX Disco Cruise was absolutely perfect for my bachelorette party! The DJ was incredible, photographer captured amazing moments, and the Clever Girl boat with those 14 disco balls was unreal!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Mike R."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Booked the Clever Girl for our company event - 50 people, perfect service. The giant Texas flag deck and professional crew made it unforgettable. Party On Delivery made it seamless!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jessica & Chris"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "The Irony was perfect for our celebration! Anderson Mill Marina was convenient, crew was professional, and 4 hours on Lake Travis was magical. Best decision ever!"
      }
    ]
  };
}

// Export utility function for comprehensive LocalBusiness schema with customization options
export function generateComprehensiveLocalBusinessSchema(options?: {
  focusService?: string;
  additionalServices?: Array<{ name: string; description: string }>;
  pageDescription?: string;
}) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://premierpartycruises.com';
  
  const defaultServices = [
    {
      name: "Bachelor Party Boat Rental",
      description: "Ultimate bachelor party experience on Lake Travis with ATX DISCO CRUISE"
    },
    {
      name: "Bachelorette Party Boat Rental",
      description: "Unforgettable bachelorette party cruises on Lake Travis with ATX DISCO CRUISE"
    },
    {
      name: "Corporate Event Boat Rental",
      description: "Professional corporate team building and client entertainment on Lake Travis"
    },
    {
      name: "Private Cruise Rental",
      description: "Customized private cruises for any celebration on Lake Travis"
    }
  ];

  const services = options?.additionalServices || defaultServices;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Premier Party Cruises",
    "image": `${baseUrl}/PPC Logo LARGE_1757881944449.png`,
    "description": options?.pageDescription || "Austin's premier party boat rental service on Lake Travis. Specializing in bachelor parties, bachelorette parties, corporate events, and private cruises. 14+ years experience, 125,000+ customers served.",
    "url": baseUrl,
    "telephone": "(512) 488-5892",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Anderson Mill Marina",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78750",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.4508",
      "longitude": "-97.8567"
    },
    "areaServed": {
      "@type": "City",
      "name": "Austin"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/premierpartycruises",
      "https://www.instagram.com/premierpartycruises"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    },
    "slogan": "Austin's #1 Party Boat Experience",
    "founder": {
      "@type": "Person",
      "name": "Premier Party Cruises Team"
    },
    "foundingDate": "2010",
    "numberOfEmployees": "20",
    "knowsAbout": [
      "Party Boat Rentals",
      "Bachelor Parties",
      "Bachelorette Parties",
      "Corporate Events",
      "Lake Travis Cruises",
      "ATX DISCO CRUISE"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Party Boat Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      }))
    }
  };
}