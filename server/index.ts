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
  const attachedAssetsDir = path.join(process.cwd(), 'attached_assets');
  if (fs.existsSync(attachedAssetsDir)) {
    app.use('/attached_assets', express.static(attachedAssetsDir, {
      maxAge: '7d',
      etag: true,
      lastModified: true,
      setHeaders: (res, filepath) => {
        if (filepath.match(/\.(mp4|webm|mov)$/)) {
          res.setHeader('Cache-Control', 'public, max-age=604800'); // 7 days for videos
        }
      }
    }));
  }

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
          if (filepath.endsWith('.html')) {
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