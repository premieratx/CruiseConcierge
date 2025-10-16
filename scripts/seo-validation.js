#!/usr/bin/env node

/**
 * SEO & SCHEMA VALIDATION SCRIPT
 * 
 * Validates SEO integrity before schema/SSR changes:
 * 1. Schema markup count and types
 * 2. Word count for AI visibility (3000+ for key pages)
 * 3. Meta tags presence
 * 4. SSR route configuration
 * 
 * Usage: npm run seo-check [url]
 * Example: npm run seo-check https://premierpartycruises.com
 */

import https from 'https';
import http from 'http';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

const BASE_URL = process.argv[2] || 'http://localhost:5000';

const CRITICAL_PAGES = [
  { path: '/', minWords: 3000, minSchemas: 5, name: 'Homepage' },
  { path: '/bachelor-party-austin', minWords: 2500, minSchemas: 5, name: 'Bachelor Party' },
  { path: '/bachelorette-party-austin', minWords: 2500, minSchemas: 5, name: 'Bachelorette Party' },
  { path: '/private-cruises', minWords: 2500, minSchemas: 5, name: 'Private Cruises' },
  { path: '/atx-disco-cruise', minWords: 1500, minSchemas: 5, name: 'ATX Disco Cruise' }
];

const REQUIRED_SCHEMA_TYPES = [
  'Organization',
  'LocalBusiness',
  'WebSite'
];

let errors = [];
let warnings = [];

console.log(`\n🔍 SEO & SCHEMA VALIDATION`);
console.log(`📍 Target: ${BASE_URL}\n`);

async function fetchPage(url) {
  const client = url.startsWith('https') ? https : http;
  
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function countWords(html) {
  // Remove all HTML tags and count words
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

function countSchemas(html) {
  const matches = html.match(/<script type="application\/ld\+json">/g);
  return matches ? matches.length : 0;
}

function checkMetaTags(html) {
  const hasDescription = html.includes('<meta name="description"');
  const hasOGTitle = html.includes('property="og:title"');
  const hasTwitterCard = html.includes('name="twitter:card"');
  
  return { hasDescription, hasOGTitle, hasTwitterCard };
}

function findSchemaTypes(html) {
  const types = new Set();
  const matches = html.matchAll(/"@type"\s*:\s*"([^"]+)"/g);
  for (const match of matches) {
    types.add(match[1]);
  }
  return Array.from(types);
}

async function validatePage(page) {
  try {
    const url = `${BASE_URL}${page.path}`;
    console.log(`\n📄 ${page.name} (${page.path})`);
    
    const html = await fetchPage(url);
    
    // Word count check
    const wordCount = countWords(html);
    if (wordCount < page.minWords) {
      warnings.push(`${page.name}: Only ${wordCount} words (expected ${page.minWords}+)`);
      console.log(`   ${YELLOW}⚠${RESET}  Words: ${wordCount} (below ${page.minWords})`);
    } else {
      console.log(`   ${GREEN}✓${RESET} Words: ${wordCount}`);
    }
    
    // Schema count check
    const schemaCount = countSchemas(html);
    if (schemaCount < page.minSchemas) {
      errors.push(`${page.name}: Only ${schemaCount} schemas (expected ${page.minSchemas}+)`);
      console.log(`   ${RED}✗${RESET} Schemas: ${schemaCount} (below ${page.minSchemas})`);
    } else {
      console.log(`   ${GREEN}✓${RESET} Schemas: ${schemaCount}`);
    }
    
    // Meta tags check (homepage only)
    if (page.path === '/') {
      const meta = checkMetaTags(html);
      if (!meta.hasDescription || !meta.hasOGTitle || !meta.hasTwitterCard) {
        warnings.push(`${page.name}: Missing meta tags`);
        console.log(`   ${YELLOW}⚠${RESET}  Meta tags incomplete`);
      } else {
        console.log(`   ${GREEN}✓${RESET} Meta tags complete`);
      }
      
      // Schema types check
      const schemaTypes = findSchemaTypes(html);
      const missingTypes = REQUIRED_SCHEMA_TYPES.filter(type => !schemaTypes.includes(type));
      if (missingTypes.length > 0) {
        errors.push(`${page.name}: Missing schema types: ${missingTypes.join(', ')}`);
        console.log(`   ${RED}✗${RESET} Missing schemas: ${missingTypes.join(', ')}`);
      } else {
        console.log(`   ${GREEN}✓${RESET} Required schemas present`);
      }
    }
    
  } catch (err) {
    errors.push(`${page.name}: Failed to fetch - ${err.message}`);
    console.log(`   ${RED}✗${RESET} Error: ${err.message}`);
  }
}

async function run() {
  for (const page of CRITICAL_PAGES) {
    await validatePage(page);
  }
  
  console.log('\n' + '='.repeat(70));
  
  if (errors.length > 0) {
    console.log(`\n${RED}❌ SEO VALIDATION FAILED - ${errors.length} ERROR(S)${RESET}\n`);
    errors.forEach(err => console.log(`   ${RED}•${RESET} ${err}`));
    
    if (warnings.length > 0) {
      console.log(`\n${YELLOW}⚠️  ${warnings.length} WARNING(S)${RESET}\n`);
      warnings.forEach(warn => console.log(`   ${YELLOW}•${RESET} ${warn}`));
    }
    
    console.log(`\n${RED}🚫 SEO regression detected - do not deploy!${RESET}\n`);
    process.exit(1);
  }
  
  if (warnings.length > 0) {
    console.log(`\n${YELLOW}⚠️  SEO CHECK PASSED WITH ${warnings.length} WARNING(S)${RESET}\n`);
    warnings.forEach(warn => console.log(`   ${YELLOW}•${RESET} ${warn}`));
    console.log(`\n${GREEN}✅ Safe to proceed, but review warnings${RESET}\n`);
  } else {
    console.log(`\n${GREEN}✅ ALL SEO CHECKS PASSED!${RESET}\n`);
  }
  
  process.exit(0);
}

run().catch(err => {
  console.error(`\n${RED}Fatal error: ${err.message}${RESET}\n`);
  process.exit(1);
});
