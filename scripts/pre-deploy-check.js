#!/usr/bin/env node

/**
 * PRE-DEPLOYMENT VALIDATION SCRIPT
 * 
 * Prevents production breakage by validating:
 * 1. No React Refresh code in production builds
 * 2. Schema markup presence in built files
 * 3. SSR functionality intact
 * 4. Bundle integrity and size checks
 * 
 * Usage: npm run pre-deploy-check
 * Returns: exit code 0 (pass) or 1 (fail)
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// Color codes for output
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let errors = [];
let warnings = [];

console.log('\n🔍 PRE-DEPLOYMENT VALIDATION STARTING...\n');

// ============================================================================
// CHECK 1: React Refresh in Production Build
// ============================================================================
console.log('1️⃣  Checking for React Refresh in production build...');

try {
  const distPublic = join(ROOT, 'dist/public');
  
  if (!existsSync(distPublic)) {
    errors.push('dist/public directory not found - run `npm run build` first');
  } else {
    // Check index.html
    const indexPath = join(distPublic, 'index.html');
    if (existsSync(indexPath)) {
      const indexContent = readFileSync(indexPath, 'utf-8');
      
      if (indexContent.includes('/@react-refresh') || 
          indexContent.includes('RefreshRuntime') || 
          indexContent.includes('injectIntoGlobalHook')) {
        errors.push('❌ CRITICAL: React Refresh code found in dist/public/index.html - this will break production!');
      } else {
        console.log(`   ${GREEN}✓${RESET} index.html is clean (no React Refresh)`);
      }
    }
    
    // Check all JS bundles
    const assetsDir = join(distPublic, 'assets');
    if (existsSync(assetsDir)) {
      const jsFiles = readdirSync(assetsDir).filter(f => f.endsWith('.js'));
      let foundReactRefresh = false;
      
      for (const file of jsFiles) {
        const content = readFileSync(join(assetsDir, file), 'utf-8');
        if (content.includes('injectIntoGlobalHook') || content.includes('$RefreshReg$')) {
          errors.push(`❌ CRITICAL: React Refresh code found in ${file} - this will break production!`);
          foundReactRefresh = true;
        }
      }
      
      if (!foundReactRefresh) {
        console.log(`   ${GREEN}✓${RESET} All JS bundles clean (${jsFiles.length} files checked)`);
      }
    }
  }
} catch (err) {
  errors.push(`React Refresh check failed: ${err.message}`);
}

// ============================================================================
// CHECK 2: Schema Markup Presence (SSR-aware)
// ============================================================================
console.log('\n2️⃣  Checking schema markup system...');

try {
  // NOTE: Schemas are injected by SSR at runtime, not in static build
  // We check that the schema loader system is configured correctly
  
  const schemaLoaderPath = join(ROOT, 'server/schemaLoader.ts');
  const rendererPath = join(ROOT, 'server/ssr/renderer.ts');
  
  if (!existsSync(schemaLoaderPath)) {
    errors.push('❌ server/schemaLoader.ts not found - schema system broken!');
  } else {
    console.log(`   ${GREEN}✓${RESET} Schema loader system exists`);
  }
  
  if (!existsSync(rendererPath)) {
    errors.push('❌ server/ssr/renderer.ts not found - SSR system broken!');
  } else {
    // Check that schema loader is imported in renderer
    const rendererContent = readFileSync(rendererPath, 'utf-8');
    if (!rendererContent.includes('schemaLoader')) {
      errors.push('❌ schemaLoader not imported in renderer.ts - schemas will not inject!');
    } else {
      console.log(`   ${GREEN}✓${RESET} Schema injection configured in SSR`);
    }
  }
  
  // Check schema data directory exists
  const schemaDataDir = join(ROOT, 'attached_assets/schema_data');
  if (!existsSync(schemaDataDir)) {
    errors.push('❌ attached_assets/schema_data/ not found - no schema files!');
  } else {
    console.log(`   ${GREEN}✓${RESET} Schema data directory exists`);
  }
} catch (err) {
  errors.push(`Schema system check failed: ${err.message}`);
}

// ============================================================================
// CHECK 3: SSR Configuration Intact
// ============================================================================
console.log('\n3️⃣  Checking SSR configuration...');

try {
  const rendererPath = join(ROOT, 'server/ssr/renderer.ts');
  
  if (existsSync(rendererPath)) {
    const content = readFileSync(rendererPath, 'utf-8');
    
    // Critical SSR routes that must be present
    const criticalRoutes = ['/', '/blogs', '/bachelor-party-austin', '/bachelorette-party-austin'];
    let missingRoutes = [];
    
    for (const route of criticalRoutes) {
      if (!content.includes(`'${route}'`)) {
        missingRoutes.push(route);
      }
    }
    
    if (missingRoutes.length > 0) {
      errors.push(`❌ CRITICAL: Missing SSR routes: ${missingRoutes.join(', ')} - SEO will be broken!`);
    } else {
      console.log(`   ${GREEN}✓${RESET} All critical SSR routes configured`);
    }
    
    // Check schema loader is imported
    if (!content.includes('schemaLoader')) {
      warnings.push('schemaLoader not found in renderer.ts');
    }
  } else {
    warnings.push('server/ssr/renderer.ts not found');
  }
} catch (err) {
  warnings.push(`SSR check failed: ${err.message}`);
}

// ============================================================================
// CHECK 4: Bundle Integrity
// ============================================================================
console.log('\n4️⃣  Checking bundle integrity...');

try {
  const assetsDir = join(ROOT, 'dist/public/assets');
  
  if (existsSync(assetsDir)) {
    const jsFiles = readdirSync(assetsDir).filter(f => f.endsWith('.js') && f.startsWith('index-'));
    
    if (jsFiles.length === 0) {
      errors.push('❌ No main bundle (index-*.js) found in dist/public/assets');
    } else if (jsFiles.length > 1) {
      warnings.push(`Multiple main bundles found: ${jsFiles.join(', ')}`);
    } else {
      const bundlePath = join(assetsDir, jsFiles[0]);
      const stats = statSync(bundlePath);
      const sizeKB = Math.round(stats.size / 1024);
      
      if (sizeKB < 100) {
        warnings.push(`Bundle suspiciously small: ${sizeKB}KB`);
      } else if (sizeKB > 2000) {
        warnings.push(`Bundle very large: ${sizeKB}KB - consider code splitting`);
      } else {
        console.log(`   ${GREEN}✓${RESET} Bundle integrity OK (${jsFiles[0]}, ${sizeKB}KB)`);
      }
    }
  }
} catch (err) {
  warnings.push(`Bundle check failed: ${err.message}`);
}

// ============================================================================
// CHECK 5: Critical Files Present
// ============================================================================
console.log('\n5️⃣  Checking critical files...');

const criticalFiles = [
  'dist/index.js',
  'dist/public/index.html',
  'server/ssr/renderer.ts',
  'server/schemaLoader.ts'
];

let missingFiles = [];
for (const file of criticalFiles) {
  if (!existsSync(join(ROOT, file))) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  errors.push(`❌ Missing critical files: ${missingFiles.join(', ')}`);
} else {
  console.log(`   ${GREEN}✓${RESET} All critical files present`);
}

// ============================================================================
// RESULTS
// ============================================================================
console.log('\n' + '='.repeat(70));

if (errors.length > 0) {
  console.log(`\n${RED}❌ VALIDATION FAILED - ${errors.length} ERROR(S)${RESET}\n`);
  errors.forEach(err => console.log(`   ${RED}•${RESET} ${err}`));
  
  if (warnings.length > 0) {
    console.log(`\n${YELLOW}⚠️  ${warnings.length} WARNING(S)${RESET}\n`);
    warnings.forEach(warn => console.log(`   ${YELLOW}•${RESET} ${warn}`));
  }
  
  console.log(`\n${RED}🚫 DO NOT DEPLOY - Fix errors above first!${RESET}\n`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.log(`\n${YELLOW}⚠️  VALIDATION PASSED WITH ${warnings.length} WARNING(S)${RESET}\n`);
  warnings.forEach(warn => console.log(`   ${YELLOW}•${RESET} ${warn}`));
  console.log(`\n${GREEN}✅ Safe to deploy, but review warnings above${RESET}\n`);
} else {
  console.log(`\n${GREEN}✅ ALL CHECKS PASSED - SAFE TO DEPLOY!${RESET}\n`);
}

process.exit(0);
