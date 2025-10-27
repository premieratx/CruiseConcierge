#!/bin/bash
# Build script for deployment that uses our custom wrapper

echo "Starting deployment build..."

# Use our custom build wrapper that handles lightningcss externalization
NODE_ENV=production node server/build-wrapper.js

echo "Build completed successfully!"