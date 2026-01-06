import { db } from '../server/db';
import { pageMetadata } from '../shared/schema';
import { blogMetadataRegistry } from '../server/blogMetadataRegistry';
import { sql } from 'drizzle-orm';

const ADDITIONAL_PAGES = [
  { route: '/site-directory', title: 'Site Directory | Premier Party Cruises', description: 'Complete site map and directory for Premier Party Cruises. Find all pages for bachelor parties, bachelorette parties, corporate events, and Lake Travis boat rentals.', keywords: ['site directory', 'sitemap', 'Premier Party Cruises'] },
  { route: '/blogs', title: 'Blog | Lake Travis Party Boat Guides & Tips', description: 'Expert guides, tips, and insights for Lake Travis boat parties, Austin bachelor/bachelorette parties, corporate events. 15+ years experience.', keywords: ['Lake Travis blog', 'party boat guides', 'Austin party tips'] },
  { route: '/austin-bachelor-party-ideas', title: 'Austin Bachelor Party Ideas | Lake Travis Guide', description: 'Top Austin bachelor party ideas from Lake Travis boat parties to downtown nightlife. Expert planning tips from 15+ years of epic celebrations.', keywords: ['Austin bachelor party', 'bachelor party ideas', 'Lake Travis'] },
  { route: '/lake-travis-bachelor-party-boats', title: 'Lake Travis Bachelor Party Boats | Austin Rentals', description: 'Lake Travis bachelor party boat rentals in Austin. Private charters, party barges, all-inclusive packages. 15+ years, 150,000+ guests served.', keywords: ['Lake Travis bachelor party', 'party boats', 'boat rentals Austin'] },
  { route: '/first-time-lake-travis-boat-rental-guide', title: 'First Time Lake Travis Boat Rental Guide', description: 'First-time Lake Travis boat rental guide! Everything you need to know about renting party boats in Austin. Tips from 15+ years of experience.', keywords: ['Lake Travis boat rental', 'first time guide', 'Austin boat rental'] },
  { route: '/3-day-austin-bachelorette-itinerary', title: '3-Day Austin Bachelorette Itinerary | Weekend Guide', description: 'Plan the perfect 3-day Austin bachelorette party! Expert itinerary from Lake Travis boat parties to 6th Street nightlife. 150,000+ celebrations.', keywords: ['Austin bachelorette itinerary', '3-day bachelorette', 'weekend guide'] },
  { route: '/ultimate-austin-bachelorette-weekend', title: 'Ultimate Austin Bachelorette Weekend | Premier Guide', description: 'Create the ultimate Austin bachelorette weekend with our premier guide. Lake Travis boat parties, top nightlife, activities. 15+ years experience.', keywords: ['Austin bachelorette weekend', 'ultimate guide', 'Lake Travis'] },
  { route: '/top-10-austin-bachelorette-ideas', title: 'Top 10 Austin Bachelorette Ideas | Party Guide 2025', description: 'Discover the top 10 Austin bachelorette party ideas! From Lake Travis boat cruises to 6th Street nightlife. 15+ years, 150,000+ celebrations.', keywords: ['Austin bachelorette ideas', 'top 10', 'party guide'] },
  { route: '/budget-austin-bachelorette', title: 'Budget Austin Bachelorette | Affordable Lake Travis', description: 'Plan an unforgettable budget Austin bachelorette party! Affordable Lake Travis boat rentals, BYOB options, free activities.', keywords: ['budget bachelorette', 'affordable Austin', 'Lake Travis'] },
  { route: '/luxury-austin-bachelorette', title: 'Luxury Austin Bachelorette | Lake Travis VIP', description: 'Indulge in a luxury Austin bachelorette party with premium Lake Travis boat rentals, VIP service, and upscale experiences.', keywords: ['luxury bachelorette', 'VIP Austin', 'Lake Travis'] },
  { route: '/adventure-austin-bachelorette', title: 'Adventure Austin Bachelorette | Lake Travis Fun', description: 'Plan an adventure-filled Austin bachelorette party! Lake Travis water sports, outdoor activities, hiking. 15+ years experience.', keywords: ['adventure bachelorette', 'outdoor Austin', 'Lake Travis activities'] },
  { route: '/austin-bachelorette-nightlife', title: 'Austin Bachelorette Nightlife | 6th & Rainey St', description: 'Your complete Austin bachelorette nightlife guide! Best bars on 6th Street, Rainey Street, live music venues. 15+ years local expertise.', keywords: ['Austin nightlife', 'bachelorette bars', '6th Street'] },
  { route: '/wedding-anniversary-celebration-ideas', title: 'Wedding Anniversary Ideas | Lake Travis Cruises', description: 'Celebrate your wedding anniversary on Lake Travis! Romantic sunset cruises, private boat rentals, special packages. 15+ years experience.', keywords: ['wedding anniversary', 'Lake Travis cruise', 'romantic celebration'] },
];

async function populatePageMetadata() {
  console.log('Starting page metadata population...');
  
  // Get existing routes
  const existingPages = await db.select({ route: pageMetadata.route }).from(pageMetadata);
  const existingRoutes = new Set(existingPages.map(p => p.route));
  console.log(`Found ${existingRoutes.size} existing pages in database`);
  
  let inserted = 0;
  let skipped = 0;
  
  // Insert additional static pages
  for (const page of ADDITIONAL_PAGES) {
    if (existingRoutes.has(page.route)) {
      console.log(`Skipping existing: ${page.route}`);
      skipped++;
      continue;
    }
    
    try {
      await db.insert(pageMetadata).values({
        route: page.route,
        title: page.title,
        description: page.description,
        keywords: page.keywords,
        keywordFocus: page.keywords[0] || null,
      });
      console.log(`Inserted: ${page.route}`);
      inserted++;
    } catch (error) {
      console.error(`Failed to insert ${page.route}:`, error);
    }
  }
  
  // Insert blog pages from registry
  for (const [slug, meta] of Object.entries(blogMetadataRegistry)) {
    // Determine the route - some slugs already have 'blogs/' prefix
    let route: string;
    if (slug.startsWith('blogs/') || slug.startsWith('blog/')) {
      route = `/${slug}`;
    } else {
      // Check if this is a top-level page or should be under /blogs/
      const topLevelPages = [
        '3-day-austin-bachelorette-itinerary',
        'ultimate-austin-bachelorette-weekend', 
        'top-10-austin-bachelorette-ideas',
        'budget-austin-bachelorette',
        'luxury-austin-bachelorette',
        'adventure-austin-bachelorette',
        'austin-bachelorette-nightlife',
        'first-time-lake-travis-boat-rental-guide',
      ];
      
      if (topLevelPages.includes(slug)) {
        route = `/${slug}`;
      } else {
        route = `/blogs/${slug}`;
      }
    }
    
    if (existingRoutes.has(route)) {
      console.log(`Skipping existing: ${route}`);
      skipped++;
      continue;
    }
    
    try {
      await db.insert(pageMetadata).values({
        route: route,
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        keywordFocus: meta.keywords[0] || null,
      });
      console.log(`Inserted: ${route}`);
      inserted++;
    } catch (error) {
      console.error(`Failed to insert ${route}:`, error);
    }
  }
  
  console.log(`\nCompleted! Inserted: ${inserted}, Skipped: ${skipped}`);
  console.log(`Total pages now: ${existingRoutes.size + inserted}`);
}

populatePageMetadata()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
