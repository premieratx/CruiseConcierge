import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { setupEmbedRouting, hasEmbedBuild } from "./embedServer";
import { blogRouter } from "./blog-api.js";
import { setupAuth } from "./auth";
import Database from "@replit/database";
import fs from "fs";
import path from "path";

const app = express();

// Configure trust proxy for correct IP detection behind reverse proxy/CDN
app.set('trust proxy', true);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Add iframe embedding headers for embed routes
app.use('/embed', (req, res, next) => {
  // Remove X-Frame-Options to allow iframe embedding
  res.removeHeader('X-Frame-Options');
  
  // Set CSP to allow embedding from any origin for embed routes
  // In production, you should limit this to specific domains
  res.setHeader('Content-Security-Policy', 
    "frame-ancestors 'self' *; " +
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; " +
    "connect-src 'self' https: wss: ws:; " +
    "img-src 'self' data: https:; " +
    "style-src 'self' 'unsafe-inline' https:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;"
  );
  
  // Additional headers for iframe compatibility
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
  
  next();
});

// Add CSP headers for quote pages to allow inline styles
app.use('/q/', (req, res, next) => {
  // Set permissive CSP to allow inline styles for quote pages
  res.setHeader('Content-Security-Policy', 
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; " +
    "connect-src 'self' https: wss: ws:; " +
    "img-src 'self' data: https: blob:; " +
    "style-src 'self' 'unsafe-inline' https:; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
    "frame-ancestors 'self';"
  );
  
  // Additional headers for compatibility
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
  
  next();
});

(async () => {
  // Blog routes - register public blog API routes
  app.use("/api/blog", blogRouter);
  
  // Setup authentication before registering other routes
  // Import storage for authentication
  const { storage } = await import('./storage');
  setupAuth(app, storage);
  
  const server = await registerRoutes(app);

  // Sitemap route - must be registered before Vite to avoid catch-all interference
  const Database = (await import("@replit/database")).default;
  
  // Utility to unwrap Replit DB responses
  const unwrapDbResponse = (response: any): any => {
    if (Array.isArray(response) || response === null || response === undefined) {
      return response;
    }
    if (response && typeof response === 'object' && 'value' in response) {
      return unwrapDbResponse(response.value);
    }
    return response;
  };
  
  app.get('/sitemap.xml', async (req: Request, res: Response) => {
    try {
      const replitDb = new Database();
      const baseUrl = process.env.REPLIT_DEV_DOMAIN 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
        : 'https://premierpartycruises.com';
      
      // Get post slugs from Replit DB and unwrap response
      const postsIndexRaw = await replitDb.get("index:posts");
      const slugs = unwrapDbResponse(postsIndexRaw) || [];
      const now = new Date().toISOString();
      
      const staticPages = [
        { url: '/', lastmod: now, changefreq: 'weekly', priority: 1.0 },
        { url: '/party-boat-lake-travis', lastmod: now, changefreq: 'weekly', priority: 0.9 },
        { url: '/bachelor-party-austin', lastmod: now, changefreq: 'weekly', priority: 0.9 },
        { url: '/bachelorette-party-austin', lastmod: now, changefreq: 'weekly', priority: 0.9 },
        { url: '/gallery', lastmod: now, changefreq: 'monthly', priority: 0.7 },
        { url: '/blogs', lastmod: now, changefreq: 'daily', priority: 0.8 },
        { url: '/chat', lastmod: now, changefreq: 'monthly', priority: 0.6 },
        { url: '/contact', lastmod: now, changefreq: 'monthly', priority: 0.5 }
      ];
      
      // Map slugs to blog pages
      const blogPages = slugs.map((slug: string) => ({
        url: `/blogs/${slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.7
      }));
      
      const urls = [...staticPages, ...blogPages];
      
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod.split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;
      
      res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
      res.send(xml);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  app.get('/robots.txt', async (req: Request, res: Response) => {
    try {
      const baseUrl = process.env.REPLIT_DEV_DOMAIN 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
        : 'https://premierpartycruises.com';
      
      const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /dashboard/

# Crawl-delay for politeness
Crawl-delay: 1`;
      
      res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
      res.send(robotsTxt);
    } catch (error) {
      console.error('Error generating robots.txt:', error);
      res.status(500).send('Error generating robots.txt');
    }
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Setup embed production routing first (if available)
  // This must come before Vite dev middleware to take precedence
  // Add guard to prevent embed routing from intercepting API calls
  const embedConfigured = setupEmbedRouting(app);
  
  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    if (embedConfigured) {
      log("Embed routes configured for production, main app will use development mode", "hybrid");
    } else {
      log("No embed build found, all routes will use development mode", "dev");
    }
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, async () => {
    log(`serving on port ${port}`);
    
    // Verify blog system persistence
    try {
      const { storage } = await import('./storage');
      const blogPostsResult = await storage.getBlogPosts({ limit: 100 });
      const authors = await storage.getBlogAuthors();
      const categories = await storage.getBlogCategories();
      const tags = await storage.getBlogTags();
      
      // Handle different return formats from getBlogPosts
      const postsCount = Array.isArray(blogPostsResult) ? blogPostsResult.length : 
                        (blogPostsResult?.posts ? blogPostsResult.posts.length : 0);
      
      log(`📝 Blog system persistence verified - PostgreSQL storage confirmed`);
      log(`📊 Blog data: ${postsCount} posts, ${authors.length} authors, ${categories.length} categories, ${tags.length} tags`);
    } catch (error) {
      log(`⚠️ Blog system persistence check failed: ${error}`);
    }
  });
})();
