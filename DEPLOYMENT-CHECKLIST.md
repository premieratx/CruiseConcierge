# 🚀 Deployment Checklist

## CRITICAL: Run Before Every Deploy

This checklist prevents the "just HTML" breaks and ensures your site works perfectly for customers.

### Quick Commands

```bash
# Run all checks at once
npm run lint && npm run check && node scripts/validate-icons.js && npm run build

# Or use the automated script
bash scripts/pre-deploy.sh
```

---

## Step-by-Step Validation

### 1. ✅ Lint Check (Catches React errors)
```bash
npm run lint
```
**What it catches:**
- Invalid React hook calls
- Nested Link/anchor tags (causes hydration errors)
- Accessibility issues

**If it fails:** Run `npm run lint:fix` to auto-fix, then check remaining errors

---

### 2. ✅ TypeScript Check
```bash
npm run check
```
**What it catches:**
- Type errors
- Missing imports
- Code errors before runtime

**If it fails:** Fix the TypeScript errors shown in output

---

### 3. ✅ Icon Validation (Prevents build failures)
```bash
node scripts/validate-icons.js
```
**What it catches:**
- Missing icons (like 'Champagne' that broke the build)
- Invalid lucide-react imports

**If it fails:** Replace the missing icon with a valid one from https://lucide.dev/icons/

---

### 4. ✅ Build Test
```bash
npm run build
```
**What it checks:**
- Production build completes successfully
- All assets bundle correctly
- No runtime errors during build

**If it fails:** Check the error message and fix the issue

---

## After Deploy

### Verify Production Works
1. Visit your live URL: https://premierpartycruises.com
2. Check that buttons and navigation work (not "just HTML")
3. Open browser console - should see no React errors
4. Test the booking flow

### If Issues Occur
1. Check that `NODE_ENV=production` is set (Replit does this automatically)
2. Verify SSR is working (view page source, should see full HTML)
3. Check browser console for hydration errors

---

## How We Prevent "Just HTML" Issue

### Development Mode
- **No SSR** (prevents hydration conflicts with Vite hot reload)
- **Pure client-side rendering** with `createRoot().render()`
- **Fast development** without hydration errors

### Production Mode
- **SSR enabled** for SEO (search engines see full HTML)
- **React hydration** with `hydrateRoot()` makes it interactive
- **No conflicts** because production build is stable

---

## Required Scripts in package.json

**TO ADD MANUALLY** (since package.json can't be auto-edited):

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "validate:icons": "node scripts/validate-icons.js",
    "pre-deploy": "bash scripts/pre-deploy.sh"
  }
}
```

Add these to your package.json to enable quick validation commands.

---

## Files Created for Stability

1. **`.eslintrc.cjs`** - Catches React errors before deploy
2. **`scripts/validate-icons.js`** - Prevents missing icon build failures
3. **`scripts/pre-deploy.sh`** - Automated validation script
4. **This checklist** - Your deployment guide

---

## The Permanent Fix Explained

### What Was Wrong
- SSR ran in development → hydration conflicts → React failed to load
- Nested Link/anchor tags → invalid hook calls → React crashed
- Missing icons → build failures

### What's Fixed
1. **Smart SSR** - Only runs in production, not development
2. **Environment-aware rendering** - `createRoot()` in dev, `hydrateRoot()` in prod
3. **Validation tools** - Catch errors before they reach production
4. **ESLint rules** - Prevent bad patterns automatically

### This is NOT a band-aid
- ✅ Root cause fixed (SSR/hydration separation)
- ✅ Automated safety nets (linting, validation)
- ✅ Process discipline (deployment checklist)
- ✅ Tested and verified working

---

## Emergency Rollback

If something breaks after deploy:
1. Click "View Checkpoints" in your Replit sidebar
2. Select a checkpoint from before the deploy
3. Restore code/database to working state

**Better:** Always run validation before deploying!
