#!/bin/bash

echo "🚀 Starting production server with build file fix..."

# First ensure the build files are accessible
if [ -d "dist" ]; then
  echo "✅ Found dist/ directory"
  
  # Copy dist to production-build (non-hidden folder)
  echo "📦 Copying dist/ to production-build/..."
  rm -rf production-build
  cp -r dist production-build
  echo "✅ Copied dist/ to production-build/"
  
  # Create additional copies for redundancy
  rm -rf deploy
  cp -r dist deploy
  echo "✅ Created backup in deploy/"
  
  # Try to start from production-build first
  if [ -f "production-build/index.js" ]; then
    echo "🚀 Starting from production-build/index.js"
    NODE_ENV=production node production-build/index.js
  elif [ -f "dist/index.js" ]; then
    echo "🚀 Starting from dist/index.js (fallback)"
    NODE_ENV=production node dist/index.js
  else
    echo "❌ No server entry point found!"
    exit 1
  fi
else
  echo "❌ dist/ directory not found! Please run: npm run build"
  exit 1
fi