import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { log } from "./vite";

export function setupEmbedRouting(app: Express) {
  const embedDistPath = path.resolve(import.meta.dirname, "..", "dist", "embed");

  // Check if embed build exists
  const hasEmbedBuild = fs.existsSync(embedDistPath);
  
  if (!hasEmbedBuild) {
    log(`Embed build not found at ${embedDistPath}. Embed routes will fall back to development mode.`, "embed");
    return false;
  }

  // CRITICAL: Add middleware to prevent embed routing from intercepting API calls
  app.use((req, res, next) => {
    // Never let embed routing handle API paths
    if (req.path.startsWith('/api/')) {
      return next();
    }
    // Skip embed routing for non-GET requests to prevent interference with API endpoints
    if (req.method !== 'GET' && !req.path.startsWith('/embed/')) {
      return next();
    }
    next();
  });

  // Handle the specific problematic image asset with exact path matching
  app.get('/embed-PPC*', (req, res) => {
    const imagePath = path.resolve(embedDistPath, 'embed-PPC Logo LARGE_1757881944449.png');
    if (fs.existsSync(imagePath)) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(imagePath);
    } else {
      res.status(404).send('Image not found');
    }
  });
  
  // Also handle URL-encoded version
  app.get('/embed-PPC%20Logo*', (req, res) => {
    const imagePath = path.resolve(embedDistPath, 'embed-PPC Logo LARGE_1757881944449.png');
    if (fs.existsSync(imagePath)) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.sendFile(imagePath);
    } else {
      res.status(404).send('Image not found');
    }
  });

  // Serve specific embed assets with direct file serving to bypass Vite completely
  // Handle both the actual file paths and the HTML-referenced paths
  app.get('/embed/embed.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.resolve(embedDistPath, 'embed.js'));
  });
  
  // Handle specific embed.js variations (avoid broad wildcards that could catch API routes)
  app.get(['/embed.js', '/embed.js*'], (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.resolve(embedDistPath, 'embed.js'));
  });

  app.get('/embed/embed-style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.resolve(embedDistPath, 'embed-style.css'));
  });
  
  // Handle specific embed-style.css variations (avoid broad wildcards that could catch API routes)
  app.get(['/embed-style.css', '/embed-style.css*'], (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.resolve(embedDistPath, 'embed-style.css'));
  });

  // Catch any Vite proxy attempts that sneak through with query params
  // ONLY for specific asset-related routes to avoid intercepting API calls
  app.get('/embed-*', (req, res, next) => {
    const url = req.originalUrl;
    if (url.includes('embed-style.css') && url.includes('html-proxy')) {
      // This is Vite trying to process our CSS - redirect to direct file
      res.redirect(301, '/embed-style.css');
      return;
    }
    if (url.includes('embed.js') && url.includes('html-proxy')) {
      // This is Vite trying to process our JS - redirect to direct file
      res.redirect(301, '/embed.js');
      return;
    }
    if (url.includes('embed-PPC') && url.includes('html-proxy')) {
      // This is Vite trying to process our image - try to serve directly
      const imageName = url.match(/embed-PPC[^?]*/)?.[0];
      if (imageName) {
        const imagePath = path.resolve(embedDistPath, imageName);
        if (fs.existsSync(imagePath)) {
          res.setHeader('Content-Type', 'image/png');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          res.sendFile(imagePath);
          return;
        }
      }
      res.status(404).send('Image asset not found');
      return;
    }
    next();
  });

  // Serve embed HTML for embed routes (with iframe-friendly headers) - MUST come before asset route
  app.get('/embed/booking', (_req, res) => {
    const embedHtmlPath = path.resolve(embedDistPath, "embed.html");
    if (fs.existsSync(embedHtmlPath)) {
      // Set iframe-friendly headers
      res.removeHeader('X-Frame-Options');
      res.setHeader('Content-Security-Policy', 
        "frame-ancestors 'self' *; " +
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; " +
        "connect-src 'self' https: wss: ws:; " +
        "img-src 'self' data: https:; " +
        "style-src 'self' 'unsafe-inline' https:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;"
      );
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
      
      res.sendFile(embedHtmlPath);
    } else {
      res.status(404).send('Embed widget not found');
    }
  });

  app.get('/embed/chatbot', (_req, res) => {
    const embedHtmlPath = path.resolve(embedDistPath, "embed.html");
    if (fs.existsSync(embedHtmlPath)) {
      // Set iframe-friendly headers
      res.removeHeader('X-Frame-Options');
      res.setHeader('Content-Security-Policy', 
        "frame-ancestors 'self' *; " +
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; " +
        "connect-src 'self' https: wss: ws:; " +
        "img-src 'self' data: https:; " +
        "style-src 'self' 'unsafe-inline' https:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;"
      );
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
      
      res.sendFile(embedHtmlPath);
    } else {
      res.status(404).send('Embed widget not found');
    }
  });

  // Handle image assets
  app.get('/embed/:assetName', (req, res) => {
    const assetName = req.params.assetName;
    // Only serve files that exist and have image extensions
    if (assetName.match(/\.(png|jpg|jpeg|svg|ico|webp)$/i)) {
      const assetPath = path.resolve(embedDistPath, assetName);
      if (fs.existsSync(assetPath)) {
        // Set appropriate content type based on extension
        if (assetName.endsWith('.png')) res.setHeader('Content-Type', 'image/png');
        else if (assetName.endsWith('.jpg') || assetName.endsWith('.jpeg')) res.setHeader('Content-Type', 'image/jpeg');
        else if (assetName.endsWith('.svg')) res.setHeader('Content-Type', 'image/svg+xml');
        else if (assetName.endsWith('.ico')) res.setHeader('Content-Type', 'image/x-icon');
        else if (assetName.endsWith('.webp')) res.setHeader('Content-Type', 'image/webp');
        
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.sendFile(assetPath);
        return;
      }
    }
    res.status(404).send('Asset not found');
  });

  // Catch-all for any other embed routes
  app.get('/embed/*', (_req, res) => {
    const embedHtmlPath = path.resolve(embedDistPath, "embed.html");
    if (fs.existsSync(embedHtmlPath)) {
      // Set iframe-friendly headers
      res.removeHeader('X-Frame-Options');
      res.setHeader('Content-Security-Policy', 
        "frame-ancestors 'self' *; " +
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:; " +
        "connect-src 'self' https: wss: ws:; " +
        "img-src 'self' data: https:; " +
        "style-src 'self' 'unsafe-inline' https:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;"
      );
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'origin-when-cross-origin');
      
      res.sendFile(embedHtmlPath);
    } else {
      res.status(404).send('Embed widget not found');
    }
  });

  log("Production embed routing configured", "embed");
  return true;
}

export function hasEmbedBuild(): boolean {
  const embedDistPath = path.resolve(import.meta.dirname, "..", "dist", "embed");
  return fs.existsSync(embedDistPath) && fs.existsSync(path.join(embedDistPath, "embed.html"));
}