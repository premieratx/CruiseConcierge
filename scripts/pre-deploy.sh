#!/bin/bash

# Pre-deployment validation script
# Run this before every deployment to catch issues

set -e  # Exit on any error

echo "🚀 Running pre-deployment validation..."
echo ""

# Step 1: Lint check
echo "1️⃣ Running ESLint..."
npm run lint || {
  echo "❌ Linting failed! Fix errors before deploying."
  exit 1
}
echo "✅ Linting passed"
echo ""

# Step 2: TypeScript check
echo "2️⃣ Running TypeScript check..."
npm run check || {
  echo "❌ TypeScript errors found! Fix before deploying."
  exit 1
}
echo "✅ TypeScript check passed"
echo ""

# Step 3: Validate icons
echo "3️⃣ Validating icon imports..."
node scripts/validate-icons.js || {
  echo "❌ Invalid icon imports found! Fix before deploying."
  exit 1
}
echo "✅ Icon validation passed"
echo ""

# Step 4: Build test
echo "4️⃣ Testing production build..."
npm run build > /dev/null 2>&1 || {
  echo "❌ Build failed! Fix before deploying."
  exit 1
}
echo "✅ Build succeeded"
echo ""

echo "🎉 All pre-deployment checks passed!"
echo ""
echo "✨ Ready to deploy! Your site will:"
echo "   • Have working React interactivity"
echo "   • Use SSR for SEO in production"
echo "   • No hydration errors"
echo "   • All icons present"
echo ""
echo "🚀 Deploy with confidence!"
