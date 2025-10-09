#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('📦 Post-build: Ensuring production files are accessible...');

// Function to copy directory recursively
function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
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

// 1. Copy dist to production-build (non-hidden folder)
const distPath = path.join(rootDir, 'dist');
const productionBuildPath = path.join(rootDir, 'production-build');

if (fs.existsSync(distPath)) {
  console.log('✅ Copying dist/ to production-build/...');
  
  // Remove old production-build if it exists
  if (fs.existsSync(productionBuildPath)) {
    fs.rmSync(productionBuildPath, { recursive: true, force: true });
  }
  
  // Copy entire dist to production-build
  copyDir(distPath, productionBuildPath);
  
  console.log('✅ Successfully copied dist/ to production-build/');
} else {
  console.error('❌ dist/ directory not found!');
  process.exit(1);
}

// 2. Create additional symlinks for redundancy
const publicDistPath = path.join(rootDir, 'public-dist');
const buildOutputPath = path.join(rootDir, 'build-output');

// Remove old symlinks if they exist
[publicDistPath, buildOutputPath].forEach(linkPath => {
  if (fs.existsSync(linkPath)) {
    fs.unlinkSync(linkPath);
  }
});

// Create new symlinks pointing to dist
try {
  fs.symlinkSync(distPath, publicDistPath, 'dir');
  console.log('✅ Created symlink: public-dist -> dist');
} catch (err) {
  console.log('⚠️ Could not create public-dist symlink:', err.message);
}

try {
  fs.symlinkSync(distPath, buildOutputPath, 'dir');
  console.log('✅ Created symlink: build-output -> dist');
} catch (err) {
  console.log('⚠️ Could not create build-output symlink:', err.message);
}

// 3. Also copy to a 'deploy' folder for extra redundancy
const deployPath = path.join(rootDir, 'deploy');
if (fs.existsSync(deployPath)) {
  fs.rmSync(deployPath, { recursive: true, force: true });
}
copyDir(distPath, deployPath);
console.log('✅ Created backup copy in deploy/');

console.log('🎉 Post-build complete! Production files are now accessible in:');
console.log('   - production-build/ (primary)');
console.log('   - deploy/ (backup)');
console.log('   - public-dist/ (symlink)');
console.log('   - build-output/ (symlink)');