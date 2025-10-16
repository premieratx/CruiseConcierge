#!/bin/bash
# Post-build fix: Remove React Refresh code from production bundles
# This is a workaround for Vite React plugin including dev code in production

echo "🔧 Removing React Refresh from production bundles..."

cd dist/public/assets
for file in index-*.js; do
  if grep -q "injectIntoGlobalHook" "$file" 2>/dev/null; then
    echo "  Patching $file..."
    # Replace React Refresh initialization with safe no-op
    sed -i 's/\.injectIntoGlobalHook(window);window\.\$RefreshReg\$=()=>{};window\.\$RefreshSig\$=()=>e=>e/\/\/ React Refresh disabled in production/g' "$file"
    sed -i 's/\.injectIntoGlobalHook([^)]*)/\&\&false/g' "$file"
  fi
done

echo "✅ Production bundles cleaned"
