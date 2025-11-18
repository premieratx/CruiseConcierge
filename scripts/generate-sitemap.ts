import { writeFileSync } from 'fs';
import { join } from 'path';

// Import blog metadata registry for accurate lastmod dates
import { getBlogMetadata } from '../server/blogMetadataRegistry';

// Production domain
const DOMAIN = 'https://premierpartycruises.com';

// All public-facing routes (excluding admin, auth, redirects)
const PUBLIC_ROUTES = [
  // Main pages
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
  '/gallery',
  '/contact',
  '/testimonials-faq',
  '/ai-endorsement',
  '/partners',
  '/chat',
  '/book-online',
  '/book-now',
  '/golden-ticket',
  '/golden-ticket-private',
  
  // Wedding Experience Pages
  '/rehearsal-dinner',
  '/welcome-party',
  '/after-party',
  
  // Corporate Experience Pages
  '/team-building',
  '/client-entertainment',
  '/company-milestone',
  
  // Birthday Experience Pages
  '/milestone-birthday',
  '/sweet-16',
  
  // Special Event Pages
  '/graduation-party',
  '/faq',
  '/pricing-breakdown',
  
  // Static SSR Blog Pages (top-level paths)
  '/austin-bachelor-party-ideas',
  '/lake-travis-bachelor-party-boats',
  '/wedding-anniversary-celebration-ideas',
  
  // React Blog Pages with /blogs/ prefix
  '/blogs/atx-disco-cruise-experience',
  '/blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination',
  '/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises',
  '/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations',
  '/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend',
  '/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience',
  '/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning',
  
  // React Blog Pages with /blog/ prefix
  '/blog/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy',
  '/blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
  '/blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties',
  
  // React Blog Pages with custom paths
  '/first-time-lake-travis-boat-rental-guide',
  '/ultimate-austin-bachelorette-weekend',
  '/top-10-austin-bachelorette-ideas',
  '/3-day-austin-bachelorette-itinerary',
  '/budget-austin-bachelorette',
  '/luxury-austin-bachelorette',
  '/adventure-austin-bachelorette',
  '/austin-bachelorette-nightlife',
];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

function generateSitemap(urls: SitemapUrl[]): string {
  const urlElements = urls.map(url => {
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

function generateSitemapUrls(): SitemapUrl[] {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  const urls: SitemapUrl[] = PUBLIC_ROUTES.map(path => {
    // Determine priority based on page type
    let priority = 0.5; // Default
    let changefreq: SitemapUrl['changefreq'] = 'weekly';
    let lastmod = currentDate; // Default to current date
    
    // Check if this path is in the blog metadata registry
    const blogMeta = getBlogMetadata(path);
    if (blogMeta) {
      // Use modifiedDate or publishDate from blog registry for accurate lastmod
      const dateToUse = blogMeta.modifiedDate || blogMeta.publishDate;
      lastmod = new Date(dateToUse).toISOString().split('T')[0];
    }
    
    if (path === '/') {
      // Homepage - highest priority
      priority = 1.0;
      changefreq = 'daily';
    } else if (
      path === '/bachelor-party-austin' ||
      path === '/bachelorette-party-austin' ||
      path === '/atx-disco-cruise' ||
      path === '/private-cruises'
    ) {
      // Main service pages
      priority = 0.9;
      changefreq = 'weekly';
    } else if (
      path.startsWith('/blog') ||
      path.includes('bachelor') ||
      path.includes('bachelorette') ||
      path.includes('lake-travis') ||
      path.includes('austin')
    ) {
      // Blog pages and content pages
      priority = 0.7;
      changefreq = 'monthly';
    } else if (
      path === '/contact' ||
      path === '/faq' ||
      path === '/testimonials-faq' ||
      path === '/chat' ||
      path === '/book-online' ||
      path === '/book-now'
    ) {
      // Important pages
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
  
  return urls;
}

function main() {
  console.log('🗺️  Generating sitemap.xml...\n');
  
  const sitemapUrls = generateSitemapUrls();
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

main();
