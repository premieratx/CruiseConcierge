/**
 * COMPREHENSIVE SEO AUDIT SCRIPT
 * 
 * Verifies ALL URLs in sitemap.xml for complete SEO health.
 * Tests every single URL for critical SEO elements required for Google/AI crawling.
 * 
 * USAGE:
 *   1. Ensure server is running: npm run dev
 *   2. Run audit: npx tsx scripts/seo-audit.ts
 *   3. Review report: scripts/seo-audit-report.txt
 * 
 * CHECKS PERFORMED (8 critical checks per URL):
 *   ✓ HTTP 200 status code
 *   ✓ SSR HTML content (not just client-side app shell)
 *   ✓ <title> tag with non-default content
 *   ✓ Meta description tag
 *   ✓ Open Graph tags (og:title, og:description)
 *   ✓ Canonical URL tag
 *   ✓ JSON-LD structured data
 *   ✓ HTML body has actual content (min 500 chars of text)
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { JSDOM } from 'jsdom';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
const SITEMAP_PATH = join(process.cwd(), 'public', 'sitemap.xml');
const REPORT_PATH = join(process.cwd(), 'scripts', 'seo-audit-report.txt');

interface SEOCheckResult {
  url: string;
  checks: {
    http200: boolean;
    hasSSRContent: boolean;
    hasTitle: boolean;
    titleNotDefault: boolean;
    hasMetaDescription: boolean;
    hasOGTitle: boolean;
    hasOGDescription: boolean;
    hasCanonical: boolean;
    hasJSONLD: boolean;
    hasBodyContent: boolean;
  };
  errors: string[];
  warnings: string[];
  metadata: {
    statusCode?: number;
    title?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonical?: string;
    jsonLDTypes?: string[];
    bodyTextLength?: number;
  };
}

interface AuditSummary {
  totalURLs: number;
  passedAll: number;
  failed: number;
  brokenLinks: string[];
  missingTitle: string[];
  missingMetaDescription: string[];
  missingOGTags: string[];
  missingCanonical: string[];
  missingJSONLD: string[];
  insufficientContent: string[];
  noSSRContent: string[];
  overallScore: number;
}

// Parse sitemap.xml and extract all URLs
function parseSitemap(): string[] {
  console.log(`📄 Reading sitemap from: ${SITEMAP_PATH}\n`);
  
  const xmlContent = readFileSync(SITEMAP_PATH, 'utf-8');
  const parser = new XMLParser();
  const parsed = parser.parse(xmlContent);
  
  if (!parsed.urlset || !parsed.urlset.url) {
    throw new Error('Invalid sitemap structure');
  }
  
  const urls = Array.isArray(parsed.urlset.url) 
    ? parsed.urlset.url 
    : [parsed.urlset.url];
  
  return urls.map((entry: any) => entry.loc);
}

// Extract text content from HTML (excluding script/style tags)
function extractTextContent(html: string): string {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Remove script and style elements
  const scripts = doc.querySelectorAll('script, style, noscript');
  scripts.forEach(el => el.remove());
  
  // Get text content from body
  const bodyText = doc.body?.textContent || '';
  
  // Clean up whitespace
  return bodyText
    .replace(/\s+/g, ' ')
    .trim();
}

// Perform comprehensive SEO checks on a single URL
async function auditURL(url: string): Promise<SEOCheckResult> {
  const result: SEOCheckResult = {
    url,
    checks: {
      http200: false,
      hasSSRContent: false,
      hasTitle: false,
      titleNotDefault: false,
      hasMetaDescription: false,
      hasOGTitle: false,
      hasOGDescription: false,
      hasCanonical: false,
      hasJSONLD: false,
      hasBodyContent: false,
    },
    errors: [],
    warnings: [],
    metadata: {},
  };
  
  try {
    // Convert sitemap URL to localhost URL for testing
    const testUrl = url.replace('https://premierpartycruises.com', SERVER_URL);
    
    console.log(`🔍 Auditing: ${url}`);
    
    // Fetch the page
    const response = await fetch(testUrl, {
      headers: {
        'User-Agent': 'SEO-Audit-Bot/1.0',
      },
    });
    
    result.metadata.statusCode = response.status;
    
    // Check 1: HTTP 200 status
    if (response.status === 200) {
      result.checks.http200 = true;
    } else {
      result.errors.push(`HTTP ${response.status} - Expected 200`);
      return result; // Skip other checks if page doesn't load
    }
    
    const html = await response.text();
    
    // Check 2: SSR Content (page should have content in HTML, not just app shell)
    // We check if the HTML has actual content beyond just the React root div
    const hasContentBeyondAppShell = html.includes('<title>') && 
                                      html.includes('<meta') && 
                                      html.length > 5000; // SSR pages are typically larger
    
    if (hasContentBeyondAppShell) {
      result.checks.hasSSRContent = true;
    } else {
      result.errors.push('No SSR content detected - appears to be client-side only');
    }
    
    // Parse HTML for detailed checks
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Check 3 & 4: Title tag
    const titleEl = doc.querySelector('title');
    if (titleEl) {
      result.checks.hasTitle = true;
      result.metadata.title = titleEl.textContent || '';
      
      // Check if title is not default/generic
      const defaultTitles = ['Premier Party Cruises', 'Untitled', 'Page Title', ''];
      const isNotDefault = !defaultTitles.some(def => 
        result.metadata.title?.trim() === def.trim()
      );
      
      if (isNotDefault && result.metadata.title && result.metadata.title.length > 10) {
        result.checks.titleNotDefault = true;
      } else {
        result.warnings.push(`Title too short or generic: "${result.metadata.title}"`);
      }
    } else {
      result.errors.push('Missing <title> tag');
    }
    
    // Check 5: Meta description
    const metaDesc = doc.querySelector('meta[name="description"]');
    if (metaDesc) {
      result.checks.hasMetaDescription = true;
      result.metadata.metaDescription = metaDesc.getAttribute('content') || '';
      
      if (result.metadata.metaDescription.length < 50) {
        result.warnings.push('Meta description too short (< 50 chars)');
      }
    } else {
      result.errors.push('Missing meta description');
    }
    
    // Check 6 & 7: Open Graph tags
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      result.checks.hasOGTitle = true;
      result.metadata.ogTitle = ogTitle.getAttribute('content') || '';
    } else {
      result.errors.push('Missing og:title');
    }
    
    const ogDesc = doc.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      result.checks.hasOGDescription = true;
      result.metadata.ogDescription = ogDesc.getAttribute('content') || '';
    } else {
      result.errors.push('Missing og:description');
    }
    
    // Check 8: Canonical URL
    const canonical = doc.querySelector('link[rel="canonical"]');
    if (canonical) {
      result.checks.hasCanonical = true;
      result.metadata.canonical = canonical.getAttribute('href') || '';
    } else {
      result.errors.push('Missing canonical URL');
    }
    
    // Check 9: JSON-LD structured data
    const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
    if (jsonLdScripts.length > 0) {
      result.checks.hasJSONLD = true;
      result.metadata.jsonLDTypes = [];
      
      jsonLdScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '{}');
          if (data['@type']) {
            result.metadata.jsonLDTypes?.push(data['@type']);
          }
        } catch (e) {
          result.warnings.push('Invalid JSON-LD syntax');
        }
      });
    } else {
      result.errors.push('Missing JSON-LD structured data');
    }
    
    // Check 10: Body content (minimum 500 chars)
    const bodyText = extractTextContent(html);
    result.metadata.bodyTextLength = bodyText.length;
    
    if (bodyText.length >= 500) {
      result.checks.hasBodyContent = true;
    } else {
      result.errors.push(`Insufficient content: ${bodyText.length} chars (need 500+)`);
    }
    
  } catch (error) {
    result.errors.push(`Fetch error: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  return result;
}

// Generate summary report from all audit results
function generateSummary(results: SEOCheckResult[]): AuditSummary {
  const summary: AuditSummary = {
    totalURLs: results.length,
    passedAll: 0,
    failed: 0,
    brokenLinks: [],
    missingTitle: [],
    missingMetaDescription: [],
    missingOGTags: [],
    missingCanonical: [],
    missingJSONLD: [],
    insufficientContent: [],
    noSSRContent: [],
    overallScore: 0,
  };
  
  results.forEach(result => {
    const allChecksPassed = Object.values(result.checks).every(check => check === true);
    
    if (allChecksPassed) {
      summary.passedAll++;
    } else {
      summary.failed++;
      
      // Categorize failures
      if (!result.checks.http200) {
        summary.brokenLinks.push(result.url);
      }
      if (!result.checks.hasSSRContent) {
        summary.noSSRContent.push(result.url);
      }
      if (!result.checks.hasTitle || !result.checks.titleNotDefault) {
        summary.missingTitle.push(result.url);
      }
      if (!result.checks.hasMetaDescription) {
        summary.missingMetaDescription.push(result.url);
      }
      if (!result.checks.hasOGTitle || !result.checks.hasOGDescription) {
        summary.missingOGTags.push(result.url);
      }
      if (!result.checks.hasCanonical) {
        summary.missingCanonical.push(result.url);
      }
      if (!result.checks.hasJSONLD) {
        summary.missingJSONLD.push(result.url);
      }
      if (!result.checks.hasBodyContent) {
        summary.insufficientContent.push(result.url);
      }
    }
  });
  
  // Calculate overall score (percentage of URLs passing all checks)
  summary.overallScore = Math.round((summary.passedAll / summary.totalURLs) * 100);
  
  return summary;
}

// Generate detailed text report
function generateReport(results: SEOCheckResult[], summary: AuditSummary): string {
  const lines: string[] = [];
  
  lines.push('═══════════════════════════════════════════════════════════════');
  lines.push('          COMPREHENSIVE SEO AUDIT REPORT');
  lines.push('          Premier Party Cruises');
  lines.push(`          ${new Date().toISOString().split('T')[0]}`);
  lines.push('═══════════════════════════════════════════════════════════════');
  lines.push('');
  
  // Executive Summary
  lines.push('EXECUTIVE SUMMARY');
  lines.push('─────────────────────────────────────────────────────────────');
  lines.push(`Total URLs Tested:        ${summary.totalURLs}`);
  lines.push(`✓ Passed All Checks:      ${summary.passedAll}`);
  lines.push(`✗ Failed One or More:     ${summary.failed}`);
  lines.push(`Overall SEO Health Score: ${summary.overallScore}%`);
  lines.push('');
  
  // Status Assessment
  if (summary.overallScore === 100) {
    lines.push('🎉 STATUS: ALL PAGES SEO-READY FOR GOOGLE/AI CRAWLING');
    lines.push('   Every single URL passed all 8 critical SEO checks.');
  } else if (summary.overallScore >= 90) {
    lines.push('✓ STATUS: EXCELLENT - Minor issues to address');
  } else if (summary.overallScore >= 70) {
    lines.push('⚠ STATUS: GOOD - Several issues need attention');
  } else {
    lines.push('✗ STATUS: NEEDS IMPROVEMENT - Critical SEO issues detected');
  }
  lines.push('');
  
  // Issues Breakdown
  if (summary.failed > 0) {
    lines.push('ISSUES BREAKDOWN');
    lines.push('─────────────────────────────────────────────────────────────');
    
    if (summary.brokenLinks.length > 0) {
      lines.push(`\n🔴 BROKEN LINKS (${summary.brokenLinks.length})`);
      lines.push('   Priority: CRITICAL - These pages return non-200 status codes');
      summary.brokenLinks.forEach(url => lines.push(`   - ${url}`));
    }
    
    if (summary.noSSRContent.length > 0) {
      lines.push(`\n🔴 NO SSR CONTENT (${summary.noSSRContent.length})`);
      lines.push('   Priority: CRITICAL - Pages lack server-side rendered content');
      summary.noSSRContent.forEach(url => lines.push(`   - ${url}`));
    }
    
    if (summary.missingTitle.length > 0) {
      lines.push(`\n🟡 MISSING/POOR TITLES (${summary.missingTitle.length})`);
      lines.push('   Priority: HIGH - Title tags missing or non-descriptive');
      summary.missingTitle.forEach(url => lines.push(`   - ${url}`));
    }
    
    if (summary.missingMetaDescription.length > 0) {
      lines.push(`\n🟡 MISSING META DESCRIPTIONS (${summary.missingMetaDescription.length})`);
      lines.push('   Priority: HIGH - Meta descriptions missing');
      summary.missingMetaDescription.forEach(url => lines.push(`   - ${url}`));
    }
    
    if (summary.missingOGTags.length > 0) {
      lines.push(`\n🟡 MISSING OPEN GRAPH TAGS (${summary.missingOGTags.length})`);
      lines.push('   Priority: MEDIUM - og:title or og:description missing');
      summary.missingOGTags.forEach(url => lines.push(`   - ${url}`));
    }
    
    if (summary.missingCanonical.length > 0) {
      lines.push(`\n🟡 MISSING CANONICAL URLs (${summary.missingCanonical.length})`);
      lines.push('   Priority: MEDIUM - Canonical link tags missing');
      summary.missingCanonical.forEach(url => lines.push(`   - ${url}`));
    }
    
    if (summary.missingJSONLD.length > 0) {
      lines.push(`\n🟡 MISSING STRUCTURED DATA (${summary.missingJSONLD.length})`);
      lines.push('   Priority: MEDIUM - JSON-LD structured data missing');
      summary.missingJSONLD.forEach(url => lines.push(`   - ${url}`));
    }
    
    if (summary.insufficientContent.length > 0) {
      lines.push(`\n🟡 INSUFFICIENT CONTENT (${summary.insufficientContent.length})`);
      lines.push('   Priority: MEDIUM - Pages have < 500 chars of text content');
      summary.insufficientContent.forEach(url => lines.push(`   - ${url}`));
    }
    
    lines.push('');
  }
  
  // Detailed Results
  lines.push('DETAILED URL RESULTS');
  lines.push('─────────────────────────────────────────────────────────────');
  
  results.forEach((result, index) => {
    const allPassed = Object.values(result.checks).every(c => c === true);
    const status = allPassed ? '✓ PASS' : '✗ FAIL';
    
    lines.push(`\n[${index + 1}/${results.length}] ${status}: ${result.url}`);
    
    if (!allPassed) {
      lines.push('   Checks:');
      lines.push(`      HTTP 200:           ${result.checks.http200 ? '✓' : '✗'}`);
      lines.push(`      SSR Content:        ${result.checks.hasSSRContent ? '✓' : '✗'}`);
      lines.push(`      Title Tag:          ${result.checks.hasTitle ? '✓' : '✗'}`);
      lines.push(`      Title Descriptive:  ${result.checks.titleNotDefault ? '✓' : '✗'}`);
      lines.push(`      Meta Description:   ${result.checks.hasMetaDescription ? '✓' : '✗'}`);
      lines.push(`      OG Title:           ${result.checks.hasOGTitle ? '✓' : '✗'}`);
      lines.push(`      OG Description:     ${result.checks.hasOGDescription ? '✓' : '✗'}`);
      lines.push(`      Canonical URL:      ${result.checks.hasCanonical ? '✓' : '✗'}`);
      lines.push(`      JSON-LD Schema:     ${result.checks.hasJSONLD ? '✓' : '✗'}`);
      lines.push(`      Body Content:       ${result.checks.hasBodyContent ? '✓' : '✗'} (${result.metadata.bodyTextLength || 0} chars)`);
      
      if (result.errors.length > 0) {
        lines.push('   Errors:');
        result.errors.forEach(err => lines.push(`      - ${err}`));
      }
      
      if (result.warnings.length > 0) {
        lines.push('   Warnings:');
        result.warnings.forEach(warn => lines.push(`      - ${warn}`));
      }
    }
  });
  
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════════');
  lines.push('END OF REPORT');
  lines.push('═══════════════════════════════════════════════════════════════');
  
  return lines.join('\n');
}

// Main audit execution
async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('         COMPREHENSIVE SEO AUDIT - STARTING');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  try {
    // Step 1: Parse sitemap
    const urls = parseSitemap();
    console.log(`✓ Found ${urls.length} URLs in sitemap\n`);
    
    if (urls.length !== 123) {
      console.warn(`⚠ WARNING: Expected 123 URLs, found ${urls.length}\n`);
    }
    
    // Step 2: Audit each URL
    console.log('Starting comprehensive audit of all URLs...\n');
    console.log('Testing against:', SERVER_URL);
    console.log('─────────────────────────────────────────────────────────────\n');
    
    const results: SEOCheckResult[] = [];
    
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      console.log(`[${i + 1}/${urls.length}]`);
      
      const result = await auditURL(url);
      results.push(result);
      
      const allPassed = Object.values(result.checks).every(c => c === true);
      if (allPassed) {
        console.log(`   ✓ ALL CHECKS PASSED\n`);
      } else {
        console.log(`   ✗ ${result.errors.length} errors, ${result.warnings.length} warnings\n`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Step 3: Generate summary
    console.log('─────────────────────────────────────────────────────────────\n');
    console.log('📊 Generating summary report...\n');
    
    const summary = generateSummary(results);
    const report = generateReport(results, summary);
    
    // Step 4: Save report
    writeFileSync(REPORT_PATH, report, 'utf-8');
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('                  AUDIT COMPLETE');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log(`Total URLs Tested:        ${summary.totalURLs}`);
    console.log(`✓ Passed All Checks:      ${summary.passedAll}`);
    console.log(`✗ Failed One or More:     ${summary.failed}`);
    console.log(`Overall SEO Health Score: ${summary.overallScore}%\n`);
    
    if (summary.overallScore === 100) {
      console.log('🎉 SUCCESS: ALL PAGES SEO-READY FOR GOOGLE/AI CRAWLING\n');
    } else {
      console.log('⚠ ATTENTION NEEDED: Some pages have SEO issues\n');
    }
    
    console.log(`📄 Full report saved to: ${REPORT_PATH}\n`);
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    // Exit with error code if audit failed
    if (summary.overallScore < 100) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
