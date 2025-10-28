#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function build() {
  try {
    console.log('Building client with Vite...');
    await execAsync('NODE_ENV=production vite build --mode production');
    
    console.log('Building server with esbuild...');
    const externals = [
      'lightningcss',
      '@neondatabase/serverless',
      'drizzle-orm', 
      'express',
      'express-session',
      'connect-pg-simple',
      'passport',
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
      'fast-xml-parser'
    ];
    
    const externalFlags = externals.map(e => `--external:${e}`).join(' ');
    
    await execAsync(`esbuild server/index.ts --platform=node --bundle --format=esm --outfile=dist/index.js ${externalFlags}`);
    
    console.log('Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();