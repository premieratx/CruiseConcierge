#!/bin/bash
set -e
export NODE_ENV=production
echo "🏗️  Building for production with clean config (no React Refresh)"
npx vite build --config vite.config.production.ts --mode production
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
echo "✅ Production build complete (React Refresh excluded)"
