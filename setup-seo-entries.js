#!/usr/bin/env node

/**
 * Critical SEO Setup for Production Launch
 * Creates SEO entries for all public routes essential for business launch
 */

const seoEntries = [
  {
    pageRoute: "/private-cruises",
    pageName: "Private Cruise Charters",
    metaTitle: "Private Cruise Charters Lake Travis Austin | Premier Party Cruises",
    metaDescription: "Exclusive private boat charters on Lake Travis with 14-75 person capacity boats. Professional crews, premium amenities. Perfect for corporate events, weddings, birthdays & celebrations in Austin, Texas.",
    metaKeywords: [
      "private cruise austin",
      "boat rental lake travis",
      "private party boat austin",
      "lake travis charter boat",
      "austin boat rental private",
      "corporate boat rental austin",
      "wedding boat charter lake travis",
      "private yacht rental austin",
      "austin private boat charter",
      "lake travis private cruise"
    ],
    focusKeyword: "private cruise austin",
    targetKeywords: [
      "private boat charter lake travis",
      "austin private yacht rental",
      "lake travis boat rental private",
      "corporate boat charter austin",
      "wedding boat rental lake travis"
    ],
    openGraphTitle: "Private Cruise Charters Lake Travis Austin | Premier Party Cruises",
    openGraphDescription: "Book exclusive private boat charters on Lake Travis. 14-75 person boats with professional crews. Perfect for corporate events, weddings & special celebrations.",
    openGraphImage: "https://premierpartycruises.com/images/private-cruise-hero.jpg",
    openGraphType: "service",
    twitterTitle: "Private Cruise Charters Lake Travis Austin",
    twitterDescription: "Exclusive private boat charters on Lake Travis with professional crews and premium amenities. Book your private cruise today!",
    twitterImage: "https://premierpartycruises.com/images/private-cruise-twitter.jpg",
    twitterCard: "summary_large_image",
    canonicalUrl: "https://premierpartycruises.com/private-cruises",
    robotsDirective: "index, follow",
    priority: 90,
    changeFrequency: "weekly",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Private Cruise Charters",
      "description": "Exclusive private boat charters on Lake Travis with professional crews and premium amenities",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Premier Party Cruises",
        "url": "https://premierpartycruises.com",
        "telephone": "+1-512-123-4567",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "addressCountry": "US"
        }
      },
      "areaServed": "Lake Travis, Austin, Texas",
      "serviceType": "Private Boat Charter",
      "offers": {
        "@type": "Offer",
        "category": "Private Cruise Charter",
        "availableAtOrFrom": "Lake Travis, Austin, TX"
      }
    }
  },
  {
    pageRoute: "/bachelor-party",
    pageName: "Bachelor Party Cruises",
    metaTitle: "Austin Bachelor Party Cruises Lake Travis | Premier Party Cruises",
    metaDescription: "Epic bachelor party cruises on Lake Travis! Private boats and disco cruises perfect for the groom's last celebration. Professional crews, premium sound systems, unforgettable Austin bachelor parties.",
    metaKeywords: [
      "bachelor party austin",
      "bachelor party cruise lake travis",
      "austin bachelor party boat",
      "lake travis bachelor party",
      "groom party boat austin",
      "austin bachelor party ideas",
      "bachelor party boat rental austin",
      "lake travis party cruise",
      "austin bachelor cruise",
      "bachelor party activities austin"
    ],
    focusKeyword: "bachelor party austin",
    targetKeywords: [
      "bachelor party cruise lake travis",
      "austin bachelor party boat",
      "lake travis bachelor party ideas",
      "groom party cruise austin",
      "bachelor party boat rental lake travis"
    ],
    openGraphTitle: "Epic Austin Bachelor Party Cruises on Lake Travis",
    openGraphDescription: "Celebrate the groom's last sail! Private boats and disco cruises on Lake Travis with professional crews, premium sound, and unforgettable bachelor party experiences.",
    openGraphImage: "https://premierpartycruises.com/images/bachelor-party-hero.jpg",
    openGraphType: "service",
    twitterTitle: "Austin Bachelor Party Cruises Lake Travis",
    twitterDescription: "Epic bachelor party cruises on Lake Travis! Private boats, disco cruises, professional crews. The ultimate groom celebration!",
    twitterImage: "https://premierpartycruises.com/images/bachelor-party-twitter.jpg",
    twitterCard: "summary_large_image",
    canonicalUrl: "https://premierpartycruises.com/bachelor-party",
    robotsDirective: "index, follow",
    priority: 85,
    changeFrequency: "weekly",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Bachelor Party Cruises",
      "description": "Epic bachelor party cruises on Lake Travis with private boats and disco options",
      "location": {
        "@type": "Place",
        "name": "Lake Travis",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "addressCountry": "US"
        }
      },
      "organizer": {
        "@type": "LocalBusiness",
        "name": "Premier Party Cruises"
      },
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    }
  },
  {
    pageRoute: "/bachelorette-party",
    pageName: "Bachelorette Party Cruises",
    metaTitle: "Austin Bachelorette Party Cruises Lake Travis | Premier Party Cruises",
    metaDescription: "Unforgettable bachelorette party cruises on Lake Travis! Private luxury boats and ATX disco cruises perfect for the bride's celebration. Professional crews, Instagram-worthy moments in Austin.",
    metaKeywords: [
      "bachelorette party austin",
      "bachelorette party cruise lake travis",
      "austin bachelorette party boat",
      "lake travis bachelorette party",
      "bride party boat austin",
      "austin bachelorette party ideas",
      "bachelorette party boat rental austin",
      "lake travis girls trip",
      "austin bachelorette cruise",
      "bachelorette party activities austin"
    ],
    focusKeyword: "bachelorette party austin",
    targetKeywords: [
      "bachelorette party cruise lake travis",
      "austin bachelorette party boat",
      "lake travis bachelorette party ideas",
      "bride party cruise austin",
      "bachelorette party boat rental lake travis"
    ],
    openGraphTitle: "Unforgettable Austin Bachelorette Party Cruises on Lake Travis",
    openGraphDescription: "Celebrate the bride-to-be in style! Luxury private boats and disco cruises on Lake Travis. Professional crews, premium amenities, Instagram-worthy bachelorette party experiences.",
    openGraphImage: "https://premierpartycruises.com/images/bachelorette-party-hero.jpg",
    openGraphType: "service",
    twitterTitle: "Austin Bachelorette Party Cruises Lake Travis",
    twitterDescription: "Unforgettable bachelorette party cruises on Lake Travis! Luxury boats, disco cruises, professional crews. Perfect bride celebration!",
    twitterImage: "https://premierpartycruises.com/images/bachelorette-party-twitter.jpg",
    twitterCard: "summary_large_image",
    canonicalUrl: "https://premierpartycruises.com/bachelorette-party",
    robotsDirective: "index, follow",
    priority: 85,
    changeFrequency: "weekly",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "Bachelorette Party Cruises",
      "description": "Unforgettable bachelorette party cruises on Lake Travis with luxury boats and disco options",
      "location": {
        "@type": "Place",
        "name": "Lake Travis",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Austin",
          "addressRegion": "TX",
          "addressCountry": "US"
        }
      },
      "organizer": {
        "@type": "LocalBusiness",
        "name": "Premier Party Cruises"
      },
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    }
  }
];

async function createSEOEntries() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
  
  console.log('🚀 Creating critical SEO entries for production launch...\n');
  
  for (const entry of seoEntries) {
    try {
      console.log(`📄 Creating SEO entry for ${entry.pageRoute}...`);
      
      const response = await fetch(`${baseUrl}/api/seo/pages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Successfully created SEO entry for ${entry.pageRoute}`);
        console.log(`   - Title: ${entry.metaTitle}`);
        console.log(`   - Focus: ${entry.focusKeyword}`);
        console.log(`   - Priority: ${entry.priority}\n`);
      } else {
        const error = await response.text();
        console.log(`❌ Failed to create SEO entry for ${entry.pageRoute}: ${error}\n`);
      }
    } catch (error) {
      console.log(`❌ Error creating SEO entry for ${entry.pageRoute}:`, error.message, '\n');
    }
  }
  
  console.log('🎉 SEO setup complete! Website ready for production launch.');
  console.log('\n📊 Created entries for:');
  seoEntries.forEach(entry => {
    console.log(`   - ${entry.pageRoute} (Priority: ${entry.priority})`);
  });
}

// For browser execution
if (typeof window !== 'undefined') {
  window.createSEOEntries = createSEOEntries;
}

// For Node.js execution
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSEOEntries, seoEntries };
}

// Auto-run if called directly
if (typeof require !== 'undefined' && require.main === module) {
  createSEOEntries().catch(console.error);
}