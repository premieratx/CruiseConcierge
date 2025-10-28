#!/usr/bin/env node

// FINAL DEPLOYMENT BUILD - Production Ready
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 FINAL DEPLOYMENT BUILD');
console.log('=========================');

try {
  // Step 1: Build client
  console.log('📦 Building client...');
  execSync('NODE_ENV=production npx vite build --mode production', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Step 2: Fix server file before building
  console.log('📝 Preparing server for production...');
  
  // Read the server file
  let serverCode = fs.readFileSync('server/index.ts', 'utf-8');
  
  // Replace import.meta.url with __dirname equivalent for CommonJS compatibility
  serverCode = serverCode.replace(
    /const currentDir = path\.dirname\(new URL\(import\.meta\.url\)\.pathname\);/g,
    'const currentDir = __dirname;'
  );
  
  // Write fixed server to temp file
  fs.writeFileSync('server/index-prod.ts', serverCode);
  
  // Step 3: Build server as ESM to avoid CJS issues
  console.log('📦 Building server...');
  
  // Node.js built-in modules
  const nodeBuiltins = [
    'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants',
    'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https',
    'module', 'net', 'os', 'path', 'punycode', 'querystring', 'readline',
    'repl', 'stream', 'string_decoder', 'sys', 'timers', 'tls', 'tty',
    'url', 'util', 'vm', 'zlib', 'worker_threads', 'process'
  ];
  
  // Project dependencies - all external modules
  const projectExternals = [
    'express', 'express-session', 'connect-pg-simple', 'passport', 'passport-local',
    '@neondatabase/serverless', 'drizzle-orm', 'drizzle-zod', 
    'multer', 'compression', '@sendgrid/mail', 'stripe',
    'googleapis', '@google-cloud/storage', 'openai', '@google/genai',
    'ws', '@replit/database', 'fast-xml-parser', 'bcrypt',
    'vite', 'tailwindcss', 'autoprefixer', 'postcss', 'esbuild',
    'react', 'react-dom', 'react-helmet-async', 'tslib'
  ];
  
  // Combine all externals
  const allExternals = [...nodeBuiltins, ...projectExternals];
  const externalString = allExternals.map(e => `--external:${e}`).join(' ');
  
  const buildCommand = `npx esbuild server/index-prod.ts \
    --platform=node \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --target=node20 \
    --packages=external \
    ${externalString} \
    --define:__dirname=import.meta.dirname \
    --define:__filename=import.meta.filename`;
  
  execSync(buildCommand, { stdio: 'inherit' });
  
  // Clean up temp file
  fs.unlinkSync('server/index-prod.ts');
  
  // Step 4: Verify the build
  console.log('🔍 Verifying build...');
  const distExists = fs.existsSync('dist/index.js');
  const publicExists = fs.existsSync('dist/public/index.html');
  
  if (!distExists || !publicExists) {
    throw new Error('Build verification failed - missing output files');
  }
  
  console.log('=========================');
  console.log('✅ BUILD SUCCESS!');
  console.log('✅ Server: dist/index.js');
  console.log('✅ Client: dist/public/');
  console.log('✅ Ready for deployment');
  console.log('');
  console.log('📌 In Publishing tab:');
  console.log('   Build command: node deployment-build-final.js');
  console.log('   Run command: npm run start');
  
  process.exit(0);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  if (fs.existsSync('server/index-prod.ts')) {
    fs.unlinkSync('server/index-prod.ts');
  }
  process.exit(1);
}