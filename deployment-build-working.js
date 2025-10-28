#!/usr/bin/env node

// WORKING DEPLOYMENT BUILD - Properly separates client and server
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 DEPLOYMENT BUILD - WORKING VERSION');
console.log('=====================================');

try {
  // Step 1: Build client FIRST (production mode)
  console.log('📦 Building client for production...');
  execSync('NODE_ENV=production npx vite build --mode production', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Step 2: Build ONLY the server code (no client imports)
  console.log('📦 Building server (excluding client code)...');
  
  // Use esbuild to bundle ONLY server code with all dependencies external
  const buildCommand = `npx esbuild server/index.ts \
    --platform=node \
    --format=esm \
    --bundle \
    --outfile=dist/index.js \
    --target=node20 \
    --packages=external \
    --external:react \
    --external:react-dom \
    --external:react-helmet-async \
    --external:@tanstack/react-query \
    --external:wouter \
    --external:*.tsx \
    --external:*.jsx \
    --loader:.ts=ts \
    --loader:.js=js \
    --conditions=node`;
  
  execSync(buildCommand, { stdio: 'inherit' });
  
  // Step 3: Verify build outputs
  console.log('🔍 Verifying build outputs...');
  
  if (!fs.existsSync('dist/index.js')) {
    throw new Error('Server bundle missing at dist/index.js');
  }
  
  if (!fs.existsSync('dist/public/index.html')) {
    throw new Error('Client build missing at dist/public/index.html');
  }
  
  // Get file sizes for confirmation
  const serverSize = (fs.statSync('dist/index.js').size / 1024 / 1024).toFixed(2);
  const clientFiles = fs.readdirSync('dist/public/assets').length;
  
  console.log('=====================================');
  console.log('✅ BUILD COMPLETE!');
  console.log(`✅ Server: dist/index.js (${serverSize} MB)`);
  console.log(`✅ Client: dist/public/ (${clientFiles} asset files)`);
  console.log('✅ Ready for deployment');
  console.log('');
  console.log('📌 DEPLOYMENT SETTINGS:');
  console.log('   Build command: node deployment-build-working.js');
  console.log('   Run command: npm run start');
  
  process.exit(0);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('❌ Full error:', error);
  process.exit(1);
}