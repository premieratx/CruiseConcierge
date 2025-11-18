#!/usr/bin/env node
/**
 * COMPREHENSIVE SEO & SCHEMA AUDIT SCRIPT
 * 
 * This script audits all pages for:
 * 1. SEO metadata (title, description, keywords, H1 tags)
 * 2. Schema markup integration
 * 3. Indexability settings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'client/src/pages');
const SCHEMA_DIR = path.resolve(__dirname, 'attached_assets/schema_data');
const SCHEMA_LOADER = path.resolve(__dirname, 'server/schemaLoader.ts');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  log(`\n${'='.repeat(80)}`, 'bright');
  log(message, 'cyan');
  log('='.repeat(80), 'bright');
}

// Get all .tsx files from pages directory
function getAllPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllPageFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') && !file.includes('.BROKEN') && !file.includes('.ARCHIVED')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Check if file uses SEOHead component
function checkSEOHead(content, filePath) {
  const hasSEOHeadImport = content.includes("import SEOHead from '@/components/SEOHead'") || 
                           content.includes('import { SEOHead }') ||
                           content.includes('from "@/components/SEOHead"');
  const hasSEOHeadUsage = content.includes('<SEOHead');
  
  return {
    hasImport: hasSEOHeadImport,
    hasUsage: hasSEOHeadUsage,
    isValid: hasSEOHeadImport && hasSEOHeadUsage
  };
}

// Extract SEOHead props
function extractSEOHeadProps(content) {
  const seoHeadMatch = content.match(/<SEOHead[\s\S]*?\/>/);
  if (!seoHeadMatch) return null;
  
  const seoHeadContent = seoHeadMatch[0];
  
  // Extract title
  const titleMatch = seoHeadContent.match(/defaultTitle=["']([^"']+)["']/);
  const title = titleMatch ? titleMatch[1] : null;
  
  // Extract description
  const descMatch = seoHeadContent.match(/defaultDescription=["']([^"']+)["']/);
  const description = descMatch ? descMatch[1] : null;
  
  // Extract pageRoute
  const routeMatch = seoHeadContent.match(/pageRoute=["']([^"']+)["']/);
  const pageRoute = routeMatch ? routeMatch[1] : null;
  
  return { title, description, pageRoute };
}

// Check for H1 tags
function checkH1Tags(content) {
  // Look for h1 elements or heading level 1
  const h1Matches = content.match(/<h1[\s\S]*?>[\s\S]*?<\/h1>/gi) || [];
  const headingMatches = content.match(/className="[^"]*text-[345]xl[^"]*"/g) || [];
  
  return {
    count: h1Matches.length,
    hasH1: h1Matches.length > 0,
    examples: h1Matches.slice(0, 2).map(h1 => {
      const textMatch = h1.match(/>([^<]+)</);
      return textMatch ? textMatch[1].substring(0, 50) : 'Unknown';
    })
  };
}

// Check for robots directive
function checkRobotsDirective(content) {
  const noindexMatch = content.match(/robots=["']noindex/);
  const nofollowMatch = content.match(/robots=["']nofollow/);
  
  return {
    hasNoindex: !!noindexMatch,
    hasNofollow: !!nofollowMatch,
    isIndexable: !noindexMatch
  };
}

// Load schema mapping from schemaLoader.ts
function loadSchemaMapping() {
  const loaderContent = fs.readFileSync(SCHEMA_LOADER, 'utf-8');
  const mappingMatch = loaderContent.match(/const ROUTE_TO_SCHEMA_MAPPING[\s\S]*?};/);
  
  if (!mappingMatch) return {};
  
  // Parse the mapping (simplified - real implementation would need proper parsing)
  const mapping = {};
  const routeMatches = loaderContent.matchAll(/"([^"]+)":\s*\[([\s\S]*?)\]/g);
  
  for (const match of routeMatches) {
    const route = match[1];
    const schemaFiles = match[2].match(/"([^"]+\.jsonld)"/g);
    if (schemaFiles) {
      mapping[route] = schemaFiles.map(s => s.replace(/"/g, ''));
    }
  }
  
  return mapping;
}

// Validate schema file exists and is valid JSON
function validateSchemaFile(schemaPath) {
  const fullPath = path.join(SCHEMA_DIR, schemaPath);
  
  if (!fs.existsSync(fullPath)) {
    return { exists: false, valid: false, error: 'File not found' };
  }
  
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    const json = JSON.parse(content);
    
    // Check for required fields
    const hasContext = json['@context'] === 'https://schema.org';
    const hasType = !!json['@type'];
    
    return {
      exists: true,
      valid: hasContext && hasType,
      type: json['@type'],
      context: json['@context']
    };
  } catch (error) {
    return { exists: true, valid: false, error: error.message };
  }
}

// Main audit function
async function runAudit() {
  header('COMPREHENSIVE SEO & SCHEMA AUDIT');
  
  const pages = getAllPageFiles(PAGES_DIR);
  const schemaMapping = loadSchemaMapping();
  
  log(`\nFound ${pages.length} page files to audit\n`, 'cyan');
  
  const results = {
    total: pages.length,
    passedSEO: 0,
    failedSEO: 0,
    missingSEOHead: [],
    invalidTitles: [],
    invalidDescriptions: [],
    missingH1: [],
    noindexPages: [],
    schemaIssues: [],
    warnings: []
  };
  
  // Audit each page
  for (const pagePath of pages) {
    const relativePath = path.relative(PAGES_DIR, pagePath);
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    // Check SEOHead
    const seoHead = checkSEOHead(content, pagePath);
    if (!seoHead.isValid) {
      results.missingSEOHead.push({
        file: relativePath,
        hasImport: seoHead.hasImport,
        hasUsage: seoHead.hasUsage
      });
      results.failedSEO++;
      continue;
    }
    
    // Extract SEO props
    const props = extractSEOHeadProps(content);
    
    // Check title length
    if (props.title) {
      const titleLength = props.title.length;
      if (titleLength < 30 || titleLength > 60) {
        results.invalidTitles.push({
          file: relativePath,
          title: props.title,
          length: titleLength,
          issue: titleLength < 30 ? 'Too short' : 'Too long'
        });
      }
    }
    
    // Check description length
    if (props.description) {
      const descLength = props.description.length;
      if (descLength < 120 || descLength > 160) {
        results.invalidDescriptions.push({
          file: relativePath,
          description: props.description.substring(0, 50) + '...',
          length: descLength,
          issue: descLength < 120 ? 'Too short' : 'Too long'
        });
      }
    }
    
    // Check H1 tags
    const h1Check = checkH1Tags(content);
    if (!h1Check.hasH1) {
      results.missingH1.push({
        file: relativePath,
        note: 'No H1 tags found in component'
      });
    }
    
    // Check robots directive
    const robots = checkRobotsDirective(content);
    if (robots.hasNoindex) {
      results.noindexPages.push({
        file: relativePath,
        route: props.pageRoute
      });
    }
    
    // Check schema mapping if pageRoute is available
    if (props.pageRoute && schemaMapping[props.pageRoute]) {
      const schemas = schemaMapping[props.pageRoute];
      for (const schemaFile of schemas) {
        const validation = validateSchemaFile(schemaFile);
        if (!validation.exists || !validation.valid) {
          results.schemaIssues.push({
            route: props.pageRoute,
            file: schemaFile,
            issue: validation.error || 'Invalid schema format',
            exists: validation.exists
          });
        }
      }
    }
    
    results.passedSEO++;
  }
  
  // Print results
  header('AUDIT RESULTS');
  
  log(`\n📊 Overall Statistics:`, 'bright');
  log(`   Total Pages: ${results.total}`, 'cyan');
  log(`   Passed SEO Checks: ${results.passedSEO}`, 'green');
  log(`   Failed SEO Checks: ${results.failedSEO}`, 'red');
  
  // Missing SEOHead
  if (results.missingSEOHead.length > 0) {
    log(`\n❌ Pages Missing Proper SEOHead Component (${results.missingSEOHead.length}):`, 'red');
    results.missingSEOHead.forEach(issue => {
      log(`   - ${issue.file}`, 'yellow');
      log(`     Import: ${issue.hasImport ? '✓' : '✗'} | Usage: ${issue.hasUsage ? '✓' : '✗'}`, 'yellow');
    });
  } else {
    log(`\n✅ All pages use SEOHead component properly`, 'green');
  }
  
  // Invalid titles
  if (results.invalidTitles.length > 0) {
    log(`\n⚠️  Pages with Invalid Title Length (${results.invalidTitles.length}):`, 'yellow');
    results.invalidTitles.forEach(issue => {
      log(`   - ${issue.file}`, 'yellow');
      log(`     Title: "${issue.title}"`, 'yellow');
      log(`     Length: ${issue.length} characters (${issue.issue})`, 'yellow');
    });
  } else {
    log(`\n✅ All page titles are within recommended length (30-60 characters)`, 'green');
  }
  
  // Invalid descriptions
  if (results.invalidDescriptions.length > 0) {
    log(`\n⚠️  Pages with Invalid Description Length (${results.invalidDescriptions.length}):`, 'yellow');
    results.invalidDescriptions.forEach(issue => {
      log(`   - ${issue.file}`, 'yellow');
      log(`     Description: "${issue.description}"`, 'yellow');
      log(`     Length: ${issue.length} characters (${issue.issue})`, 'yellow');
    });
  } else {
    log(`\n✅ All page descriptions are within recommended length (120-160 characters)`, 'green');
  }
  
  // Missing H1
  if (results.missingH1.length > 0) {
    log(`\n⚠️  Pages Possibly Missing H1 Tags (${results.missingH1.length}):`, 'yellow');
    results.missingH1.forEach(issue => {
      log(`   - ${issue.file}`, 'yellow');
    });
  } else {
    log(`\n✅ All pages have H1 tags`, 'green');
  }
  
  // Noindex pages
  if (results.noindexPages.length > 0) {
    log(`\n🚫 Pages with robots="noindex" (${results.noindexPages.length}):`, 'red');
    results.noindexPages.forEach(issue => {
      log(`   - ${issue.file} (Route: ${issue.route})`, 'yellow');
    });
  } else {
    log(`\n✅ No pages have robots="noindex" directive`, 'green');
  }
  
  // Schema issues
  if (results.schemaIssues.length > 0) {
    log(`\n❌ Schema Markup Issues (${results.schemaIssues.length}):`, 'red');
    results.schemaIssues.forEach(issue => {
      log(`   - Route: ${issue.route}`, 'yellow');
      log(`     File: ${issue.file}`, 'yellow');
      log(`     Issue: ${issue.issue}`, 'yellow');
      log(`     Exists: ${issue.exists ? 'Yes' : 'No'}`, 'yellow');
    });
  } else {
    log(`\n✅ All schema files are valid and properly formatted`, 'green');
  }
  
  // Schema mapping summary
  header('SCHEMA MAPPING SUMMARY');
  const mappingEntries = Object.entries(schemaMapping);
  log(`\nTotal Routes with Schema Mapping: ${mappingEntries.length}`, 'cyan');
  
  mappingEntries.forEach(([route, schemas]) => {
    log(`\n  Route: ${route}`, 'bright');
    schemas.forEach(schema => {
      const validation = validateSchemaFile(schema);
      const status = validation.valid ? '✓' : '✗';
      const color = validation.valid ? 'green' : 'red';
      log(`    ${status} ${schema} (${validation.type || 'Unknown'})`, color);
    });
  });
  
  // Final summary
  header('FINAL SUMMARY');
  
  const seoScore = Math.round((results.passedSEO / results.total) * 100);
  const schemaScore = results.schemaIssues.length === 0 ? 100 : 
                      Math.max(0, 100 - (results.schemaIssues.length * 10));
  
  log(`\n📈 SEO Compliance Score: ${seoScore}%`, seoScore >= 90 ? 'green' : 'yellow');
  log(`📈 Schema Markup Score: ${schemaScore}%`, schemaScore >= 90 ? 'green' : 'yellow');
  log(`📈 Overall Score: ${Math.round((seoScore + schemaScore) / 2)}%\n`, 'cyan');
  
  if (results.failedSEO === 0 && results.schemaIssues.length === 0 && 
      results.invalidTitles.length === 0 && results.invalidDescriptions.length === 0 &&
      results.noindexPages.length === 0) {
    log('🎉 PERFECT! All pages pass SEO and schema validation!\n', 'green');
  } else {
    log('⚠️  Some issues found. Please review the details above.\n', 'yellow');
  }
  
  // Save report to file
  const report = JSON.stringify(results, null, 2);
  fs.writeFileSync('seo-schema-audit-report.json', report);
  log('📝 Detailed report saved to: seo-schema-audit-report.json\n', 'cyan');
}

// Run the audit
runAudit().catch(error => {
  log(`\n❌ Audit failed with error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
