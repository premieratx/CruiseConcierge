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

// TRAILING SLASH REDIRECT - Prevent duplicate URLs in Google
// Redirect /path/ to /path (except for root /)
app.use((req, res, next) => {
  const path = req.path;
  // Only redirect if path ends with / and is not the root
  if (path.length > 1 && path.endsWith('/')) {
    const newPath = path.slice(0, -1);
    const query = req.originalUrl.includes('?') ? req.originalUrl.substring(req.originalUrl.indexOf('?')) : '';
    const protocol = req.secure || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const host = req.get('host');
    return res.redirect(301, `${protocol}://${host}${newPath}${query}`);
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
  
  // Serve ai.txt for AI crawler optimization (reads from public/ai.txt file)
  app.get('/ai.txt', (req, res) => {
    try {
      const aiTxtPath = path.join(process.cwd(), 'public', 'ai.txt');
      const aiTxt = fs.readFileSync(aiTxtPath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(aiTxt);
    } catch (error) {
      log(`⚠️ Failed to read ai.txt: ${error}`, 'seo');
      res.status(500).send('# Error loading ai.txt');
    }
  });
  log('✅ ai.txt route registered for AI crawler optimization', 'seo');

  // Serve llms.txt for AI crawler guidance (reads from public/llms.txt file)
  app.get('/llms.txt', (req, res) => {
    try {
      const llmsTxtPath = path.join(process.cwd(), 'public', 'llms.txt');
      const llmsTxt = fs.readFileSync(llmsTxtPath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days
      res.send(llmsTxt);
    } catch (error) {
      log(`⚠️ Failed to read llms.txt: ${error}`, 'seo');
      res.status(500).send('# Error loading llms.txt');
    }
  });
  log('✅ LLMs.txt route registered for AI crawlers', 'seo');

  // Serve AI plugin manifest for ChatGPT, Claude, and other AI assistants
  app.get('/.well-known/ai-plugin.json', (req, res) => {
    try {
      const aiPluginPath = path.join(process.cwd(), 'public', '.well-known', 'ai-plugin.json');
      const aiPlugin = fs.readFileSync(aiPluginPath, 'utf-8');
      res.setHeader('Content-Type', 'application/json; charset=UTF-8');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(aiPlugin);
    } catch (error) {
      log(`⚠️ Failed to read ai-plugin.json: ${error}`, 'seo');
      res.status(500).json({ error: 'Error loading ai-plugin.json' });
    }
  });
  log('✅ AI plugin manifest registered for ChatGPT/Claude discovery', 'seo');

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
      
      // AI Freshness Date Scheduler - Updates ai.txt and llms.txt on Mondays and Thursdays
      try {
        const scheduleAIFreshnessUpdates = () => {
          const now = new Date();
          const dayOfWeek = now.getDay(); // 0=Sunday, 1=Monday, 4=Thursday
          const hour = now.getHours();
          
          // Run at 6 AM on Mondays (1) and Thursdays (4)
          if ((dayOfWeek === 1 || dayOfWeek === 4) && hour === 6) {
            import('../scripts/update-ai-freshness-dates').then(({ updateAIFreshnessDates }) => {
              const result = updateAIFreshnessDates();
              log(`🤖 AI freshness dates auto-updated: ${result.message}`, 'scheduler');
            }).catch(err => {
              log(`⚠️ AI freshness auto-update failed: ${err.message}`, 'scheduler');
            });
          }
        };
        
        // Check every hour if it's time to update
        setInterval(scheduleAIFreshnessUpdates, 60 * 60 * 1000); // Every hour
        log('🤖 AI freshness date scheduler started (updates Mon/Thu at 6 AM)', 'scheduler');
      } catch (error) {
        log(`⚠️ AI freshness scheduler failed to start: ${error}`);
      }
    })();
  });
})();

// Export for testing
export default app;