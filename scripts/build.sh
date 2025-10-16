#!/bin/bash
set -e
export NODE_ENV=production
echo "🏗️  Building with NODE_ENV=production"
npx vite build --mode production --minify
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
bash scripts/fix-production-bundle.sh
echo "✅ Production build complete"
