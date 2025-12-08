#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function build() {
  try {
    console.log('Building client with Vite...');
    await execAsync('NODE_ENV=production vite build --mode production');
    
    console.log('Building server with esbuild...');
    // Use --packages=external to externalize all node_modules
    // Also externalize React-related packages to avoid ESM/CommonJS interop issues
    const buildCommand = `esbuild server/index.ts \
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
    
    await execAsync(buildCommand);
    
    console.log('Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();