#!/usr/bin/env node

// FINAL FIX - Externalizes ALL Node.js core modules and dependencies
import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 DEPLOYMENT BUILD - FINAL FIX');
console.log('================================');

try {
  // Step 1: Build client
  console.log('📦 Building client...');
  execSync('NODE_ENV=production npx vite build --mode production', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Step 2: Build server with ALL externals
  console.log('📦 Building server (all modules externalized)...');
  
  // Node.js built-in modules that MUST be external
  const nodeBuiltins = [
    'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants',
    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https',
    'module', 'net', 'os', 'path', 'punycode', 'querystring', 'readline',
    'repl', 'stream', 'string_decoder', 'sys', 'timers', 'tls', 'tty',
    'url', 'util', 'vm', 'zlib', 'worker_threads', 'process'
  ];
  
  // Project dependencies
  const projectExternals = [
    'lightningcss',
    '@neondatabase/serverless',
    'drizzle-orm',
    'express',
    'express-session',
    'connect-pg-simple',
    'passport',
    'passport-local',
    'multer',
    'compression',
    '@sendgrid/mail',
    'stripe',
    'googleapis',
    '@google-cloud/storage',
    'openai',
    '@google/genai',
    'ws',
    '@replit/database',
    'fast-xml-parser',
    'vite',
    'tailwindcss',
    'autoprefixer',
    'postcss',
    'esbuild',
    'tslib'
  ];
  
  // Combine all externals
  const allExternals = [...nodeBuiltins, ...projectExternals];
  const externalFlags = allExternals.map(e => `--external:${e}`).join(' ');
  
  const buildCommand = `npx esbuild server/index.ts \
    --platform=node \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --packages=external \
    ${externalFlags}`;
  
  execSync(buildCommand, { stdio: 'inherit' });
  
  console.log('================================');
  console.log('✅ BUILD COMPLETE - Ready for deployment');
  console.log('✅ All Node.js core modules externalized');
  console.log('✅ All dependencies properly handled');
  process.exit(0);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}