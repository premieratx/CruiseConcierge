/**
 * SITEMAP GENERATOR
 * 
 * Generates a complete sitemap.xml with all public pages and blog posts.
 * 
 * USAGE:
 *   1. Make sure the server is running: npm run dev
 *   2. Run the generator: npx tsx scripts/generate-sitemap.ts
 *   3. Sitemap will be created at: public/sitemap.xml
 * 
 * WHEN TO REGENERATE:
 *   - After publishing new blog posts
 *   - After adding new pages to the site
 *   - Before deploying to production
 *   - After making significant content updates
 * 
 * SAFETY FEATURES:
 *   - Fails hard if API is unreachable (prevents incomplete sitemaps)
 *   - Validates minimum blog post count (currently 50+)
 *   - Shows clear error messages with troubleshooting steps
 * 
 * AUTOMATIC UPDATES:
 *   - Fetches ALL published blog posts from database dynamically
 *   - Uses accurate lastmod dates from blog metadata
 *   - Properly prioritizes pages (homepage=1.0, service pages=0.9, blogs=0.7)
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Production domain
const DOMAIN = 'https://premierpartycruises.com';

// Server URL for fetching blog posts (use localhost when server is running)
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

// All public-facing NON-BLOG routes (excluding admin, auth, redirects, blog posts)
// IMPORTANT: Do NOT include admin pages like /ai-endorsement, /partners, /chat, /golden-ticket, /quote-builder
const PUBLIC_ROUTES = [
  // Main pages (Priority 1.0)
  '/',
  '/bachelor-party-austin',
  '/bachelorette-party-austin',
  '/combined-bachelor-bachelorette-austin',
  '/atx-disco-cruise',
  '/private-cruises',
  '/corporate-events',
  '/birthday-parties',
  '/wedding-parties',
  '/party-boat-austin',
  '/party-boat-lake-travis',
  
  // Wedding Experience Pages (Priority 1.0)
  '/rehearsal-dinner',
  '/welcome-party',
  '/after-party',
  
  // Corporate Experience Pages (Priority 1.0)
  '/team-building',
  '/client-entertainment',
  '/company-milestone',
  
  // Birthday Experience Pages (Priority 1.0)
  '/milestone-birthday',
  '/sweet-16',
  '/graduation-party',
  
  // Additional Wedding Experience Pages
  '/proposal-cruise',
  '/rehearsal-dinner-cruise',
  '/bridal-shower-cruise',
  '/engagement-party-cruise',
  '/baby-shower-cruise',
  '/gender-reveal-cruise',

  // Marketing Event Pages
  '/celebration-cruises',
  '/prom-cruise',
  '/holiday-party-cruise',
  '/pricing',

  // Celebration Event Pages
  '/birthday-party-boat-rental',
  '/anniversary-cruise',
  '/graduation-cruise',
  '/retirement-party-cruise',
  '/memorial-celebration-cruise',
  '/family-reunion-cruise',

  // Important action pages (Priority 0.9)
  '/gallery',
  '/contact',
  '/testimonials-faq',
  '/faq',
  '/pricing-breakdown',
  '/site-directory',
  
  // Static SSR Blog Pages (React components with top-level paths - NOT in database)
  '/austin-bachelor-party-ideas',
  '/lake-travis-bachelor-party-boats',
  '/wedding-anniversary-celebration-ideas',
  
  // React Blog Pages with custom paths (NOT in database)
  '/first-time-lake-travis-boat-rental-guide',
  '/ultimate-austin-bachelorette-weekend',
  '/top-10-austin-bachelorette-ideas',
  '/3-day-austin-bachelorette-itinerary',
  '/budget-austin-bachelorette',
  '/luxury-austin-bachelorette',
  '/adventure-austin-bachelorette',
  '/austin-bachelorette-nightlife',
  
  // Blog listing pages
  '/blog',
  '/blogs',
  
  // Bachelor/Bachelorette Blog Pages (React components under /blogs/)
  '/blogs/austin-bachelor-party-ideas',
  '/blogs/perfect-austin-bachelor-party-weekend',
  '/blogs/atx-disco-cruise-experience',
  '/blogs/lake-travis-bachelor-party-austin-celebrations',
  '/blogs/epic-bachelor-party-austin-ultimate-guide',
  '/blogs/epic-bachelorette-party-austin-ultimate-guide',
  '/blogs/how-to-throw-great-bachelor-party-austin',
  '/blogs/how-to-throw-great-bachelorette-party-austin',
  '/blogs/lake-travis-bachelor-party-boats-guide',
  '/blogs/atx-disco-cruise-dos-and-donts-bachelor-party',
  '/blogs/the-top-dos-and-dont-for-success-on-the-atx-disco-cruise-with-premier-party-cruises',
  '/blogs/bachelor-party-outfit-ideas-atx-disco-cruise',
  '/blogs/joint-bachelor-bachelorette-party-guide',
  '/blogs/why-choose-austin-bachelor-party',
  '/blogs/why-choose-austin-bachelorette-party',
  '/blogs/austin-bachelor-party-january',
  '/blogs/austin-bachelor-party-march',
  '/blogs/austin-bachelor-party-may',
  '/blogs/austin-bachelor-party-july',
  '/blogs/austin-bachelor-party-september',
  '/blogs/austin-bachelor-party-november',
  '/blogs/austin-bachelorette-party-february',
  '/blogs/austin-bachelorette-party-april',
  '/blogs/austin-bachelorette-party-june',
  '/blogs/austin-bachelorette-party-august',
  '/blogs/austin-bachelorette-party-october',
  '/blogs/austin-bachelorette-party-december',
  '/blogs/perfect-bachelor-party-itinerary-austin',
  '/blogs/disco-cruise-fashion-part-1',
  '/blogs/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties',
  '/blogs/lake-travis-party-boat-vs-downtown-night-out-austin-bachelor',
  '/blogs/austin-bachelorette-party-vs-lake-travis-boat-why-lake-wins',
  '/blogs/private-charter-vs-atx-disco-cruise-which-austin-party-boat',
  '/blogs/why-atx-disco-cruise-austins-most-booked-party-boat-experience',
  '/blogs/private-party-cruise-vs-party-boat-pontoon-lake-travis',
  '/blogs/the-recipe-for-the-chillest-atx-bach-party',
  '/blogs/the-top-five-celebrities-at-our-dream-party-barge',

  // Safety & Boat Guide Blog Pages
  '/blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning',
  '/blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events',
  '/blogs/lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events',
  '/blogs/lake-travis-boat-party-music-sound-systems-and-entertainment-coordination',
  '/blogs/lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water',
  '/blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events',
  '/blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials',
  '/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises',
  '/blogs/why-licensed-captains-matter-lake-travis-party-boats',
  '/blogs/safest-austin-bachelor-party-lake-travis-party-boat',
  '/blogs/top-10-reasons-austin-bachelor-party-lake-travis-boat',
  '/blogs/ultimate-austin-party-boat-experience-any-celebration',
  '/blogs/ultimate-austin-bachelorette-party-boat-guide-lake-travis',
  '/blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations',
  '/blogs/accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests',
  '/blogs/lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion',
  '/blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
  '/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide',
  '/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing',
  '/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide',
  '/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises',

  // Alcohol/Beverage Blog Pages
  '/blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations',
  '/blogs/lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats',
  '/blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions',
  '/blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank',
  '/blogs/the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need',
  '/blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy',
  '/blogs/instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination',
  '/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations',
  '/blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location',
  '/blogs/outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination',
  '/blogs/wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception',
  '/blogs/client-entertainment-alcohol-strategy-impressing-without-overdoing-it',
  '/blogs/corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events',
  '/blogs/executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding',
  '/blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration',
  '/blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning',
  '/blogs/holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations',
  '/blogs/pool-party-alcohol-coordination-summer-event-planning-in-austin-heat',
  '/blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties',
  '/blogs/startup-celebration-alcohol-packages-funding-rounds-launches-and-milestone-events',
  '/blogs/party-alcohol-safety-in-austin-responsible-service-and-guest-well-being',
  '/blogs/austin-party-venue-alcohol-delivery-navigating-policies-and-logistics',
  '/blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy',
  '/blogs/graduation-party-alcohol-planning-ut-and-austin-college-celebrations',

  // Corporate Blog Pages (React components under /blogs/)
  '/blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions',
  '/blogs/corporate-boat-parties-austin-lake-travis-smartest-venue',
  '/blogs/employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party',
  '/blogs/quarterly-outings-lake-travis-make-routine-company-events-easy',
  '/blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart',
  '/blogs/company-holiday-party-lake-travis',
  '/blogs/tech-companies-boat-parties-austin',
  '/blogs/finance-law-firms-boat-parties-austin',
  '/blogs/real-estate-client-entertainment-boat-austin',
  '/blogs/healthcare-wellness-boat-parties-austin',
  '/blogs/marketing-creative-agencies-boat-austin',
  '/blogs/construction-trades-boat-parties-austin',
  '/blogs/small-business-boat-parties-austin',
  '/blogs/large-group-events-lake-travis',
  '/blogs/company-party-10-people-austin',
  '/blogs/company-party-25-people-austin',
  '/blogs/company-party-50-people-austin',
  '/blogs/company-party-75-people-austin',
  '/blogs/austin-best-corporate-events',
  '/blogs/why-austin-companies-choose-premier',
  '/blogs/dallas-to-lake-travis-corporate',
  '/blogs/destination-austin-offsite-retreats',
  '/blogs/austin-suburbs-corporate-events',
  '/blogs/all-inclusive-corporate-packages',
];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

function generateSitemap(urls: SitemapUrl[]): string {
  // CRITICAL: Filter out any invalid URLs to prevent XML corruption
  const validUrls = urls.filter(url => {
    if (!url || !url.loc || typeof url.loc !== 'string' || url.loc.trim() === '') {
      console.warn('⚠️ Skipping invalid URL entry:', url);
      return false;
    }
    return true;
  });
  
  console.log(`📝 Generating sitemap with ${validUrls.length} valid URLs (filtered from ${urls.length})`);
  
  const urlElements = validUrls.map(url => {
    let urlTag = `  <url>\n`;
    urlTag += `    <loc>${url.loc}</loc>\n`;
    if (url.lastmod) {
      urlTag += `    <lastmod>${url.lastmod}</lastmod>\n`;
    }
    if (url.changefreq) {
      urlTag += `    <changefreq>${url.changefreq}</changefreq>\n`;
    }
    if (url.priority !== undefined) {
      urlTag += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
    }
    urlTag += `  </url>`;
    return urlTag;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

async function fetchAllPublishedBlogPosts() {
  try {
    console.log(`🌐 Fetching blog posts from: ${SERVER_URL}/api/blog/public/posts`);
    
    // Fetch ALL published blog posts from API
    const response = await fetch(`${SERVER_URL}/api/blog/public/posts?limit=1000&offset=0`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts from API (HTTP ${response.status}). Make sure the server is running at ${SERVER_URL}`);
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    // CRITICAL: Ensure we got blog posts - fail hard if not
    if (posts.length === 0) {
      throw new Error('No blog posts returned from API - this would create an incomplete sitemap!');
    }
    
    // Map to the format we need
    const mappedPosts = posts.map((post: any) => ({
      slug: post.slug,
      publishedAt: post.publishedAt || post.published_at,
      updatedAt: post.updatedAt || post.updated_at,
    }));
    
    console.log(`📝 Fetched ${mappedPosts.length} published blog posts from API`);
    return mappedPosts;
  } catch (error) {
    console.error('\n❌ FATAL ERROR: Failed to fetch blog posts from API');
    console.error(`   ${error instanceof Error ? error.message : String(error)}`);
    console.error('\n💡 Make sure:');
    console.error(`   1. The server is running (npm run dev)`);
    console.error(`   2. The API is accessible at ${SERVER_URL}`);
    console.error('   3. Blog posts exist in the database\n');
    throw error; // Re-throw to stop sitemap generation
  }
}

async function generateSitemapUrls(): Promise<SitemapUrl[]> {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Generate URLs for static routes
  const staticUrls: SitemapUrl[] = PUBLIC_ROUTES.map(path => {
    let priority = 0.5; // Default
    let changefreq: SitemapUrl['changefreq'] = 'weekly';
    let lastmod = currentDate;
    
    if (path === '/') {
      // Homepage - highest priority, crawl daily
      priority = 1.0;
      changefreq = 'daily';
    } else if (
      // PRIORITY 1.0: All main service pages
      path === '/bachelor-party-austin' ||
      path === '/bachelorette-party-austin' ||
      path === '/combined-bachelor-bachelorette-austin' ||
      path === '/atx-disco-cruise' ||
      path === '/private-cruises' ||
      // Corporate event pages
      path === '/corporate-events' ||
      path === '/team-building' ||
      path === '/client-entertainment' ||
      path === '/company-milestone' ||
      // Wedding event pages
      path === '/wedding-parties' ||
      path === '/rehearsal-dinner' ||
      path === '/welcome-party' ||
      path === '/after-party' ||
      // Birthday/occasion event pages
      path === '/birthday-parties' ||
      path === '/milestone-birthday' ||
      path === '/sweet-16' ||
      path === '/graduation-party'
    ) {
      // Main service/event pages - highest priority, weekly crawl
      priority = 1.0;
      changefreq = 'weekly';
    } else if (
      path === '/contact' ||
      path === '/faq' ||
      path === '/testimonials-faq' ||
      path === '/chat' ||
      path === '/book-online' ||
      path === '/book-now' ||
      path === '/gallery' ||
      path === '/pricing-breakdown'
    ) {
      // Important action pages - high priority, weekly crawl
      priority = 0.9;
      changefreq = 'weekly';
    } else if (
      path.startsWith('/blog') ||
      path.includes('bachelor') ||
      path.includes('bachelorette') ||
      path.includes('lake-travis') ||
      path.includes('austin')
    ) {
      // Blog pages and content pages - weekly crawl (was monthly)
      priority = 0.8;
      changefreq = 'weekly';
    }
    
    return {
      loc: `${DOMAIN}${path}`,
      lastmod,
      changefreq,
      priority
    };
  });
  
  // Fetch and add ALL database blog posts
  const dbBlogPosts = await fetchAllPublishedBlogPosts();
  
  // CRITICAL SAFETY CHECK: Ensure we have a reasonable number of blog posts
  // If we have fewer than 50 posts, something is wrong - fail hard to prevent incomplete sitemap
  const MIN_EXPECTED_BLOG_POSTS = 50;
  if (dbBlogPosts.length < MIN_EXPECTED_BLOG_POSTS) {
    throw new Error(
      `SAFETY CHECK FAILED: Only ${dbBlogPosts.length} blog posts fetched (expected at least ${MIN_EXPECTED_BLOG_POSTS}). ` +
      `This would create an incomplete sitemap and could remove pages from Google's index!`
    );
  }
  
  const blogUrls: SitemapUrl[] = dbBlogPosts.map(post => {
    // Use updated_at if available, otherwise published_at
    const dateToUse = post.updatedAt || post.publishedAt || new Date();
    const lastmod = new Date(dateToUse).toISOString().split('T')[0];
    
    return {
      loc: `${DOMAIN}/blogs/${post.slug}`,
      lastmod,
      changefreq: 'weekly' as const, // Changed from monthly to weekly for faster Google recrawls
      priority: 0.7
    };
  });
  
  // Combine static routes and blog posts
  const allUrls = [...staticUrls, ...blogUrls];
  
  // Sort by priority (highest first), then by path
  allUrls.sort((a, b) => {
    if (b.priority !== a.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return a.loc.localeCompare(b.loc);
  });
  
  return allUrls;
}

async function main() {
  console.log('🗺️  Generating sitemap.xml...\n');
  
  const sitemapUrls = await generateSitemapUrls();
  const sitemap = generateSitemap(sitemapUrls);
  
  const publicDir = join(process.cwd(), 'public');
  const sitemapPath = join(publicDir, 'sitemap.xml');
  
  writeFileSync(sitemapPath, sitemap, 'utf-8');
  
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`📁 Location: ${sitemapPath}`);
  console.log(`🔗 URL: ${DOMAIN}/sitemap.xml`);
  console.log(`📊 Total URLs: ${sitemapUrls.length}\n`);
  
  // Print breakdown by category
  const homepage = sitemapUrls.filter(u => u.loc === `${DOMAIN}/`).length;
  const servicePages = sitemapUrls.filter(u => 
    u.loc.includes('bachelor') || u.loc.includes('atx-disco') || u.loc.includes('private-cruise')
  ).length;
  const blogPages = sitemapUrls.filter(u => 
    u.loc.includes('/blog') || u.loc.includes('ideas') || u.loc.includes('guide')
  ).length;
  const eventPages = sitemapUrls.filter(u => 
    u.loc.includes('corporate') || u.loc.includes('birthday') || u.loc.includes('wedding') ||
    u.loc.includes('graduation') || u.loc.includes('rehearsal') || u.loc.includes('sweet-16')
  ).length;
  const otherPages = sitemapUrls.length - homepage - servicePages - blogPages - eventPages;
  
  console.log('📋 Breakdown:');
  console.log(`   Homepage: ${homepage}`);
  console.log(`   Service pages: ${servicePages}`);
  console.log(`   Blog pages: ${blogPages}`);
  console.log(`   Event pages: ${eventPages}`);
  console.log(`   Other pages: ${otherPages}`);
  console.log('\n🚀 Ready for Google Search Console submission!');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
