#!/bin/bash
# Force production mode for Vite build
export NODE_ENV=production
npx vite build --mode production
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
