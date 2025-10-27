#!/usr/bin/env node

// Build wrapper to handle lightningcss issue during deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting optimized build process...');

try {
  // Step 1: Run Vite build (this works fine)
  console.log('Building client with Vite...');
  execSync('NODE_ENV=production vite build --mode production', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Step 2: Build server with proper external handling
  console.log('Building server with esbuild...');
  
  // Create a temporary entry file that excludes problematic imports
  const serverEntry = `
import express from 'express';
import compression from 'compression';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import multer from 'multer';
import { WebSocketServer } from 'ws';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Import the main server module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import to avoid bundling issues
const startServer = async () => {
  const serverModule = await import('./index.js');
  if (serverModule.default) {
    serverModule.default();
  }
};

startServer().catch(console.error);
`;

  fs.writeFileSync('server/temp-entry.js', serverEntry);
  
  // Build with all necessary externals
  const buildCommand = `esbuild server/index.ts --platform=node --bundle --format=esm --outfile=dist/index.js \
    --external:lightningcss \
    --external:@neondatabase/serverless \
    --external:drizzle-orm \
    --external:express \
    --external:express-session \
    --external:connect-pg-simple \
    --external:passport \
    --external:multer \
    --external:compression \
    --external:@sendgrid/mail \
    --external:stripe \
    --external:googleapis \
    --external:@google-cloud/storage \
    --external:openai \
    --external:@google/genai \
    --external:ws \
    --external:@replit/database \
    --external:fast-xml-parser \
    --external:vite \
    --external:@vitejs/plugin-react \
    --external:@tailwindcss/vite \
    --external:tailwindcss`;
  
  execSync(buildCommand, { stdio: 'inherit' });
  
  // Clean up temp file
  if (fs.existsSync('server/temp-entry.js')) {
    fs.unlinkSync('server/temp-entry.js');
  }
  
  console.log('✅ Build completed successfully!');
  process.exit(0);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}