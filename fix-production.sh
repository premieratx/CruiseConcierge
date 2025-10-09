#!/bin/bash
# Workaround for hidden dist folder issue
# This script copies the build output to a non-hidden folder

echo "Building application..."
npm run build

echo "Creating production-build folder (not hidden)..."
rm -rf production-build
cp -r dist production-build

echo "Build complete! Starting production server..."
NODE_ENV=production node production-build/index.js