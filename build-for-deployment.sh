#!/bin/bash

echo "🔨 Starting deployment build process..."
echo "===================================="

# Step 1: Build the client with Vite
echo "📦 Building client with Vite..."
NODE_ENV=production vite build --mode production

if [ $? -ne 0 ]; then
    echo "❌ Client build failed"
    exit 1
fi

echo "✅ Client build successful"

# Step 2: Build the server with esbuild, externalizing lightningcss
echo "📦 Building server with esbuild..."
esbuild server/index.ts \
    --platform=node \
    --bundle \
    --format=esm \
    --outfile=dist/index.js \
    --external:lightningcss \
    --external:@neondatabase/serverless \
    --external:drizzle-orm \
    --external:express \
    --external:express-session \
    --external:connect-pg-simple \
    --external:passport \
    --external:multer \
    --external:compression \
    --external:@sendgrid/mail \
    --external:stripe \
    --external:googleapis \
    --external:@google-cloud/storage \
    --external:openai \
    --external:@google/genai \
    --external:ws \
    --external:@replit/database \
    --external:fast-xml-parser

if [ $? -ne 0 ]; then
    echo "❌ Server build failed"
    exit 1
fi

echo "✅ Server build successful"
echo "===================================="
echo "✅ BUILD COMPLETE - Ready for deployment!"
echo ""
echo "Lightningcss has been properly externalized to avoid bundling issues."
echo "