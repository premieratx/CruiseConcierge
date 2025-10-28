#!/usr/bin/env node

// DEPLOYMENT BUILD - Handles CommonJS/ESM compatibility
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 DEPLOYMENT BUILD - PRODUCTION READY');
console.log('=======================================');

try {
  // Step 1: Build client
  console.log('📦 Building client...');
  execSync('NODE_ENV=production npx vite build --mode production', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Step 2: Build server with proper externals and compatibility
  console.log('📦 Building server...');
  
  // Build the server bundle
  const buildCommand = `npx esbuild server/index.ts \
    --platform=node \
    --bundle \
    --format=cjs \
    --outfile=dist/index.cjs \
    --packages=external \
    --target=node20 \
    --minify`;
  
  execSync(buildCommand, { stdio: 'inherit' });
  
  // Create an ESM wrapper for the CJS bundle
  const esmWrapper = `
// ESM wrapper for CommonJS server bundle
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the CommonJS bundle
const server = require('./index.cjs');

// Export default if it exists
export default server.default || server;
`;
  
  fs.writeFileSync('dist/index.js', esmWrapper);
  
  console.log('=======================================');
  console.log('✅ BUILD COMPLETE - Production Ready');
  console.log('✅ CommonJS/ESM compatibility handled');
  console.log('✅ Server bundle optimized');
  process.exit(0);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}