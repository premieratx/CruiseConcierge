#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Pre-start: Ensuring production build is accessible...');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Check if dist exists and copy to production-build
const distPath = path.join(rootDir, 'dist');
const productionBuildPath = path.join(rootDir, 'production-build');

if (fs.existsSync(distPath)) {
  console.log('✅ Found dist/, copying to production-build/...');
  
  // Remove old production-build if exists
  if (fs.existsSync(productionBuildPath)) {
    fs.rmSync(productionBuildPath, { recursive: true, force: true });
  }
  
  // Copy dist to production-build
  copyDir(distPath, productionBuildPath);
  console.log('✅ Successfully copied dist/ to production-build/');
  
  // Now start the actual server
  // Try to use production-build/index.js first, fallback to dist/index.js
  const serverPaths = [
    path.join(productionBuildPath, 'index.js'),
    path.join(distPath, 'index.js')
  ];
  
  let serverPath = null;
  for (const tryPath of serverPaths) {
    if (fs.existsSync(tryPath)) {
      serverPath = tryPath;
      break;
    }
  }
  
  if (serverPath) {
    console.log(`✅ Starting server from: ${serverPath}`);
    
    // Start the production server
    const server = spawn('node', [serverPath], {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    server.on('error', (err) => {
      console.error('❌ Failed to start server:', err);
      process.exit(1);
    });
    
    server.on('exit', (code) => {
      process.exit(code);
    });
  } else {
    console.error('❌ Server entry point not found!');
    process.exit(1);
  }
} else {
  console.error('❌ dist/ directory not found! Please run: npm run build');
  process.exit(1);
}