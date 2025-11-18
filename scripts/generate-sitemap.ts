import { writeFileSync } from 'fs';
import { join } from 'path';

// Production domain
const DOMAIN = 'https://premierpartycruises.com';

// Server URL for fetching blog posts (use localhost when server is running)
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

// All public-facing NON-BLOG routes (excluding admin, auth, redirects, blog posts)
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

async function fetchAllPublishedBlogPosts() {
  try {
    // Fetch ALL published blog posts from API
    const response = await fetch(`${SERVER_URL}/api/blog/public/posts?limit=1000&offset=0`);
    
    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch blog posts from API (${response.status})`);
      return [];
    }
    
    const data = await response.json();
    const posts = data.posts || [];
    
    // Map to the format we need
    const mappedPosts = posts.map((post: any) => ({
      slug: post.slug,
      publishedAt: post.publishedAt || post.published_at,
      updatedAt: post.updatedAt || post.updated_at,
    }));
    
    console.log(`📝 Fetched ${mappedPosts.length} published blog posts from API`);
    return mappedPosts;
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    return [];
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
  
  // Fetch and add ALL database blog posts
  const dbBlogPosts = await fetchAllPublishedBlogPosts();
  const blogUrls: SitemapUrl[] = dbBlogPosts.map(post => {
    // Use updated_at if available, otherwise published_at
    const dateToUse = post.updatedAt || post.publishedAt || new Date();
    const lastmod = new Date(dateToUse).toISOString().split('T')[0];
    
    return {
      loc: `${DOMAIN}/blogs/${post.slug}`,
      lastmod,
      changefreq: 'monthly' as const,
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
