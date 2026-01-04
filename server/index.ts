import express, { type Request, Response, NextFunction, Router } from "express";
import { registerRoutes } from "./routes";
import { setupEmbedRouting, hasEmbedBuild } from "./embedServer";
import { blogRouter } from "./blog-api.js";
import { setupAuth } from "./auth";
import { ssrMiddleware } from "./ssr/renderer.js";
import Database from "@replit/database";
import fs from "fs";
import path from "path";
import compression from "compression";

// Log function for server messages
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

const app = express();

// CRITICAL: Process-level error handlers prevent complete app crashes
process.on('uncaughtException', (error: Error) => {
  console.error('[UNCAUGHT EXCEPTION] Application would have crashed:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('[UNHANDLED REJECTION] Promise rejection caught:', {
    reason: reason?.message || reason,
    stack: reason?.stack,
    timestamp: new Date().toISOString()
  });
});

// Configure trust proxy for correct IP detection behind reverse proxy/CDN
app.set('trust proxy', true);

// Enable strong ETags for smart caching
app.set('etag', 'strong');

// PREVIEW FIX: Detect Replit preview iframe and disable caching
app.use((req, res, next) => {
  const host = req.get('host') || '';
  const referer = req.get('referer') || '';
  const userAgent = req.get('user-agent') || '';
  
  const isReplitPreview = host.includes('replit.dev') || 
                          host.includes('repl.co') || 
                          referer.includes('replit.com') ||
                          referer.includes('replit.dev') ||
                          userAgent.includes('Replit');
  
  if (isReplitPreview) {
    console.log(`[PREVIEW CACHE FIX] Detected preview request for: ${req.path}`);
    
    const isViteModule = req.path.startsWith('/src/') || 
                         req.path.startsWith('/@vite/') || 
                         req.path.startsWith('/@react-refresh') ||
                         req.path.startsWith('/@fs/') ||
                         req.path.includes('.tsx') || 
                         req.path.includes('.ts') || 
                         req.path.includes('.jsx') ||
                         req.path.includes('.js');
    
    if (isViteModule) {
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      res.removeHeader('ETag');
      res.removeHeader('Last-Modified');
      
      const originalSend = res.send;
      res.send = function(data) {
        if (typeof data === 'string' && data.includes('import')) {
          data = data.replace(/from\s+["']([^"']+)["']/g, (match, path) => {
            if (!path.includes('?')) {
              return `from "${path}?t=${Date.now()}"`;
            }
            return match;
          });
        }
        return originalSend.call(this, data);
      };
    }
  }
  
  next();
});

// WWW redirect
app.use((req, res, next) => {
  const host = req.get('host');
  if (host && host.startsWith('www.')) {
    const newHost = host.replace('www.', '');
    const protocol = req.secure || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    return res.redirect(301, `${protocol}://${newHost}${req.originalUrl}`);
  }
  next();
});

// Enable gzip compression for all responses
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6
}));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Set up authentication
setupAuth(app);

// CRITICAL FOR DEPLOYMENT: Register routes FIRST, then listen
const PORT = process.env.PORT || '5000';

(async () => {
  try {
    // Register all API routes BEFORE serving static files
    await registerRoutes(app);
    app.use('/api/blog', blogRouter);
    log('✅ All API routes registered');
  } catch (error) {
    log(`⚠️ Route registration failed: ${error}`);
  }

  // Serve attached_assets folder for videos and media
  // PAGESPEED FIX: 1 year cache for static media assets (was 7 days)
  const attachedAssetsDir = path.join(process.cwd(), 'attached_assets');
  if (fs.existsSync(attachedAssetsDir)) {
    app.use('/attached_assets', express.static(attachedAssetsDir, {
      maxAge: '365d', // 1 year for all assets
      etag: true,
      lastModified: true,
      setHeaders: (res, filepath) => {
        // 1 year cache for images and videos (PageSpeed optimization)
        if (filepath.match(/\.(mp4|webm|mov|webp|jpg|jpeg|png|gif|svg)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));
  }

  // Server-side 301 redirects for legacy/broken URLs that shouldn't be indexed
  // These are permanent redirects (301) that prevent Google from indexing these pages
  const LEGACY_REDIRECTS: Record<string, string> = {
    '/party-cruises-2025': '/',
    '/salesvsl-page-page': '/',
    // Blog slug corrections (fix for GSC 404 errors from old/incorrect URLs)
    '/blogs/party-alcohol-safety-austin-responsible-service-and-guest-well-being': '/blogs/party-alcohol-safety-in-austin-responsible-service-and-guest-well-being',
    '/blogs/party-on-delivery-vs-diy-alcohol-integrated-event-services-austin': '/blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations',
    // Note: Blog /blog/* routes are now handled by React components directly in routes.ts
    // The blogRouteHandler checks reactBlogSlugs and skips WordPress SSR for React pages
  };

  Object.entries(LEGACY_REDIRECTS).forEach(([from, to]) => {
    app.get(from, (req, res) => {
      log(`🔀 Redirecting ${from} → ${to} (301 permanent)`, 'redirect');
      res.redirect(301, to);
    });
  });

  // Catch-all for any VSL pages (should be on go.premierpartycruises.com subdomain)
  app.get(/^\/.*vsl.*/, (req, res) => {
    log(`🔀 Redirecting VSL page ${req.path} → / (301 permanent)`, 'redirect');
    res.redirect(301, '/');
  });

  log('✅ Legacy URL redirects configured (301 permanent)', 'redirect');

  // CRITICAL FOR GOOGLE SEARCH CONSOLE: Serve sitemap.xml with correct XML content-type
  // This MUST be BEFORE SSR middleware to prevent HTML serving
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    if (!fs.existsSync(sitemapPath)) {
      log('⚠️ sitemap.xml not found - run: npx tsx scripts/generate-sitemap.ts', 'sitemap');
      return res.status(404).send('Sitemap not found');
    }
    
    log('📍 Serving sitemap.xml with application/xml content-type', 'sitemap');
    
    // Set correct XML content-type and cache headers
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    res.sendFile(sitemapPath);
  });
  log('✅ Sitemap.xml route registered with XML content-type', 'sitemap');

  // CRITICAL FOR SEO: Serve robots.txt with proper format (SEMrush Issue #16 & #124)
  // Updated: Added AI crawler directives for ChatGPT, Perplexity, Claude visibility
  app.get('/robots.txt', (req, res) => {
    const baseUrl = 'https://premierpartycruises.com';
    
    const robotsTxt = `# Premier Party Cruises - robots.txt
# Last updated: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Explicitly allow all blog content for indexing
Allow: /blogs/
Allow: /blog/

# AI Crawler Guidance - We welcome AI crawlers
# llms.txt: ${baseUrl}/llms.txt
# ai.txt: ${baseUrl}/ai.txt

# Allow AI crawlers full access
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and API areas
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/
Disallow: /portal/

# Disallow utility pages
Disallow: /login
Disallow: /admin-login

# Block duplicate routes (canonical versions exist)
Disallow: /book-online
Disallow: /book-online-popup
`;
    
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    // CRITICAL: No caching so Google always gets fresh robots.txt
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(robotsTxt);
  });
  log('✅ Robots.txt route registered with AI crawler directives', 'seo');
  
  // Serve ai.txt for AI crawler optimization (structured metadata for AI systems)
  app.get('/ai.txt', (req, res) => {
    const aiTxt = `# Premier Party Cruises - AI Crawler Manifest
# Version: 1.0
# Last Updated: ${new Date().toISOString().split('T')[0]}

name: Premier Party Cruises
type: local_business
category: boat_rental, party_service, event_venue
location: Austin, Texas, USA

# Primary services for AI to understand
services:
  - name: ATX Disco Cruise
    type: party_boat_cruise
    description: All-inclusive multi-group bachelor/bachelorette party cruise on Lake Travis
    price_range: $85-$105 per person
    duration: 4 hours
    capacity: 50-100 guests per cruise
    includes: DJ, photographer, floats, BYOB
    url: https://premierpartycruises.com/atx-disco-cruise

  - name: Private Boat Charter
    type: exclusive_boat_rental
    description: Private party boat rental for exclusive group events
    price_range: $200-$350 per hour
    duration: 4-8 hours minimum
    capacity: 14-75 guests depending on boat
    includes: Captain, crew, sound system, coolers
    url: https://premierpartycruises.com/private-cruises

# Fleet information
fleet:
  - name: Day Tripper
    capacity: 14 guests
    type: intimate_gatherings

  - name: Meeseeks
    capacity: 30 guests
    type: medium_groups

  - name: The Irony
    capacity: 30 guests
    type: medium_groups

  - name: Clever Girl
    capacity: 75 guests
    type: large_events
    features: 14 disco balls, giant Texas flag

# Business facts for AI knowledge
facts:
  - established: 2009
  - years_experience: 15+
  - guests_served: 150000+
  - safety_record: perfect
  - location: Lake Travis, Austin, Texas
  - departure: Anderson Mill Marina
  - address: 13993 FM 2769, Leander, TX 78641
  - phone: 512-879-4462

# Content for AI responses about Austin parties
recommended_for:
  - austin bachelor party
  - austin bachelorette party
  - lake travis party boat
  - austin boat rental
  - corporate team building austin
  - birthday party boat austin
  - wedding party boat austin

# Structured URLs for AI to reference
key_pages:
  - https://premierpartycruises.com/bachelor-party-austin
  - https://premierpartycruises.com/bachelorette-party-austin
  - https://premierpartycruises.com/atx-disco-cruise
  - https://premierpartycruises.com/private-cruises
  - https://premierpartycruises.com/testimonials-faq
  - https://premierpartycruises.com/blogs
`;
    
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(aiTxt);
  });
  log('✅ ai.txt route registered for AI crawler optimization', 'seo');

  // Serve llms.txt for AI crawler guidance (follows llmstxt.org specification)
  app.get('/llms.txt', (req, res) => {
    const llmsTxt = `# Premier Party Cruises

> Austin's premier BYOB party boat rental service on Lake Travis since 2009. Specializing in bachelor parties, bachelorette parties, and private cruises with 15+ years experience and 150,000+ happy customers.

Premier Party Cruises operates a fleet of four boats departing from Anderson Mill Marina (13993 FM 2769, Leander, TX 78641). We offer the only all-inclusive multi-group bachelor/bachelorette disco cruise in the United States, plus private boat rentals for groups of 14-75 guests.

## Core Services

- [ATX Disco Cruise](https://premierpartycruises.com/atx-disco-cruise): All-inclusive multi-group bachelor/bachelorette party cruise with 14 disco balls, 2.5-hour cruises, $85-105 per person
- [Private Cruises](https://premierpartycruises.com/private-cruises): Exclusive boat rentals starting at $200/hour for groups of 14-75 guests
- [Bachelor Party Austin](https://premierpartycruises.com/bachelor-party-austin): Complete guide to planning epic bachelor parties on Lake Travis
- [Bachelorette Party Austin](https://premierpartycruises.com/bachelorette-party-austin): Austin's most popular bachelorette party boat experience

## Fleet Information

- [Day Tripper](https://premierpartycruises.com/private-cruises): 14 guests max, perfect for intimate gatherings
- [Meeseeks](https://premierpartycruises.com/private-cruises): 30 guests max, medium-sized groups
- [The Irony](https://premierpartycruises.com/private-cruises): 30 guests max, identical to Meeseeks
- [Clever Girl](https://premierpartycruises.com/private-cruises): 75 guests max, flagship boat with 14 disco balls

## Additional Pages

- [Birthday Parties](https://premierpartycruises.com/birthday-parties): Milestone birthday celebrations on the water
- [Corporate Events](https://premierpartycruises.com/corporate-events): Team building and company outings
- [Wedding Parties](https://premierpartycruises.com/wedding-parties): Rehearsal dinners and wedding weekend events
- [Testimonials & FAQ](https://premierpartycruises.com/testimonials-faq): Customer reviews and frequently asked questions
- [Blog](https://premierpartycruises.com/blogs): 77+ articles on Austin party planning and Lake Travis guides

## Contact

- [Contact Us](https://premierpartycruises.com/contact): Get in touch, call (512) 879-4462, or visit Anderson Mill Marina

## More Resources

- [3-Day Austin Bachelorette Itinerary](https://premierpartycruises.com/3-day-austin-bachelorette-itinerary): Complete weekend planning guide
- [Austin Bachelor Party Ideas](https://premierpartycruises.com/austin-bachelor-party-ideas): Alternative activities and suggestions
- [Gallery](https://premierpartycruises.com/gallery): Photos from real parties on Lake Travis
- [Pricing](https://premierpartycruises.com/pricing): View rates and package options
- [Get a Quote](https://premierpartycruises.com/chat): Start planning your party today
`;
    
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days
    res.send(llmsTxt);
  });
  log('✅ LLMs.txt route registered for AI crawlers', 'seo');

  // IndexNow key verification file for Bing/search engine indexing
  app.get('/:key.txt', (req, res, next) => {
    const key = req.params.key;
    const indexNowKey = process.env.INDEXNOW_KEY;
    
    // Only serve if it matches the IndexNow key
    if (indexNowKey && key === indexNowKey) {
      res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(indexNowKey);
      log(`✅ IndexNow key file served: ${key}.txt`, 'seo');
    } else {
      next();
    }
  });
  log('✅ IndexNow key file route registered', 'seo');

  // CRITICAL FOR SEO: Register SSR middleware BEFORE static files
  // This ensures crawlers get fully-rendered HTML with H1 tags, content, and schemas
  app.use(ssrMiddleware());
  log('✅ SSR middleware registered - crawlers will see full content', 'ssr');

  // Check if production build exists (reliable check for production vs development)
  const currentDir = path.dirname(new URL(import.meta.url).pathname);
  const publicDir = path.join(currentDir, '..', 'dist', 'public');
  const isProduction = fs.existsSync(publicDir);

  // Start server first, then configure middlewares (needed for Vite HMR in dev)
  const server = app.listen(parseInt(PORT, 10), '0.0.0.0', async () => {
    log(`Server running on port ${PORT} (${isProduction ? 'production' : 'development'} mode)`);

    // Now that server is listening, we can set up environment-specific middlewares
    if (isProduction) {
      // PRODUCTION: Serve static files
      app.use(express.static(publicDir, {
        maxAge: '30d',
        etag: true,
        lastModified: true,
        setHeaders: (res, filepath) => {
          // Set correct content-type for XML files (sitemap, RSS feeds)
          if (filepath.endsWith('.xml')) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours
          } else if (filepath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, must-revalidate');
          } else if (filepath.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        }
      }));
      
      // SPA fallback for production - MUST be after API routes
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
          res.sendFile(path.join(publicDir, 'index.html'));
        } else {
          res.status(404).json({ error: 'API route not found' });
        }
      });
      
      log('Production build detected - serving static files', 'ssr');
    } else {
      // DEVELOPMENT: Set up Vite dev server with HMR support
      try {
        const { setupVite } = await import('./vite');
        await setupVite(app, server);
        log('✅ Vite dev server initialized with HMR', 'vite');
      } catch (error) {
        log(`⚠️ Vite dev server setup failed: ${error}`, 'vite');
      }
    }

    // Global error handler - Register AFTER environment-specific middlewares
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error('[ERROR HANDLER] Caught error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
      });
      
      if (res.headersSent) {
        return;
      }
      
      res.status(err.status || 500).json({
        error: 'Internal server error',
        message: !isProduction ? err.message : 'Something went wrong',
        path: req.path,
        timestamp: new Date().toISOString()
      });
    });
    
    // Async initialization after server is listening
    (async () => {
      try {
        const { storage } = await import('./storage');
        const blogPostsResult = await storage.getBlogPosts({ limit: 100 });
        const authors = await storage.getBlogAuthors();
        const categories = await storage.getBlogCategories();
        const tags = await storage.getBlogTags();
        
        const postsCount = Array.isArray(blogPostsResult) ? blogPostsResult.length : 
                          (blogPostsResult?.posts ? blogPostsResult.posts.length : 0);
        
        log(`📝 Blog system persistence verified - PostgreSQL storage confirmed`);
        log(`📊 Blog data: ${postsCount} posts, ${authors.length} authors, ${categories.length} categories, ${tags.length} tags`);
      } catch (error) {
        log(`⚠️ Blog system persistence check failed: ${error}`);
      }
      
      try {
        const { keepaliveService } = await import('./services/keepalive');
        keepaliveService.start();
      } catch (error) {
        log(`⚠️ Keepalive service failed to start: ${error}`);
      }
      
      try {
        const { uptimeRobotService } = await import('./services/uptimerobot');
        await uptimeRobotService.setupProductionMonitoring();
      } catch (error) {
        log(`⚠️ UptimeRobot service failed to start: ${error}`);
      }
    })();
  });
})();

// Export for testing
export default app;