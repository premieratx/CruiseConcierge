#!/bin/bash

echo "🔨 Starting production build..."

# Run the original build command
npm run build:original

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "✅ Build completed successfully"
  
  # Run post-build script to copy files
  node scripts/post-build.js
  
  echo "🚀 Build and deployment preparation complete!"
else
  echo "❌ Build failed"
  exit 1
fi