/**
 * Comprehensive Link Audit Script
 * Checks all 132+ sitemap pages for:
 * - HTTP response status
 * - Page title
 * - H1 presence
 * - Broken internal links
 * - React component loading errors
 * - WordPress content fallback
 */

import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

interface PageAuditResult {
  url: string;
  status: 'pass' | 'fail' | 'warning';
  httpStatus: number;
  title: string;
  h1: string;
  issues: string[];
  internalLinks: number;
  brokenLinks: string[];
}

interface LinkAuditReport {
  totalPages: number;
  passed: number;
  failed: number;
  warnings: number;
  brokenLinksTotal: number;
  results: PageAuditResult[];
}

async function getSitemapUrls(): Promise<string[]> {
  try {
    const response = await axios.get(`${BASE_URL}/sitemap.xml`);
    const $ = cheerio.load(response.data, { xmlMode: true });
    const urls: string[] = [];
    
    $('url > loc').each((_, el) => {
      const url = $(el).text();
      // Convert absolute URLs to relative paths
      const path = url.replace(/https?:\/\/[^\/]+/, '');
      urls.push(path);
    });
    
    return urls;
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}

async function auditPage(path: string): Promise<PageAuditResult> {
  const url = `${BASE_URL}${path}`;
  const issues: string[] = [];
  const brokenLinks: string[] = [];
  let httpStatus = 0;
  let title = '';
  let h1 = '';
  let internalLinks = 0;

  try {
    const response = await axios.get(url, {
      timeout: 30000,
      validateStatus: () => true, // Accept all status codes
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'LinkAuditBot/1.0'
      }
    });
    
    httpStatus = response.status;
    
    if (httpStatus >= 400) {
      issues.push(`HTTP ${httpStatus} error`);
    }
    
    const $ = cheerio.load(response.data);
    
    // Check title
    title = $('title').text().trim();
    if (!title) {
      issues.push('Missing title tag');
    } else if (title.length < 10) {
      issues.push('Title too short');
    }
    
    // Check H1
    h1 = $('h1').first().text().trim();
    if (!h1) {
      issues.push('Missing H1 tag');
    }
    
    // Check for React errors in content
    const bodyText = $('body').text();
    if (bodyText.includes('Something went wrong') || 
        bodyText.includes('Failed to fetch dynamically imported module')) {
      issues.push('React dynamic import error detected');
    }
    
    // Check for WordPress fallback indicators
    if (bodyText.includes('wp-content') || 
        response.data.includes('class="wp-')) {
      issues.push('WordPress content fallback detected');
    }
    
    // Check for minimal SSR fallback (just title and description)
    const rootContent = $('#root').html() || '';
    if (rootContent.length < 500 && path.includes('/blogs/')) {
      issues.push('Minimal SSR fallback content (possible React render failure)');
    }
    
    // Collect internal links
    const internalLinkSet = new Set<string>();
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && (href.startsWith('/') || href.startsWith(BASE_URL))) {
        const linkPath = href.replace(BASE_URL, '').split('?')[0].split('#')[0];
        if (linkPath && linkPath !== path && !linkPath.startsWith('/api/')) {
          internalLinkSet.add(linkPath);
        }
      }
    });
    internalLinks = internalLinkSet.size;
    
    // Check for specific broken link patterns
    $('a[href*="undefined"], a[href*="null"], a[href=""], a[href="#"]').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim().substring(0, 50);
      if (href && href !== '#') {
        brokenLinks.push(`"${text}" -> ${href}`);
      }
    });
    
  } catch (error: any) {
    httpStatus = 0;
    issues.push(`Request failed: ${error.message}`);
  }

  let status: 'pass' | 'fail' | 'warning' = 'pass';
  if (issues.some(i => 
    i.includes('HTTP 4') || 
    i.includes('HTTP 5') || 
    i.includes('Request failed') ||
    i.includes('React dynamic import error'))) {
    status = 'fail';
  } else if (issues.length > 0) {
    status = 'warning';
  }

  return {
    url: path,
    status,
    httpStatus,
    title: title.substring(0, 60),
    h1: h1.substring(0, 60),
    issues,
    internalLinks,
    brokenLinks
  };
}

async function runAudit(): Promise<LinkAuditReport> {
  console.log('🔍 Fetching sitemap URLs...');
  const urls = await getSitemapUrls();
  console.log(`📄 Found ${urls.length} URLs in sitemap`);
  
  const results: PageAuditResult[] = [];
  const batchSize = 10;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    console.log(`\n📊 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(urls.length/batchSize)}...`);
    
    const batchResults = await Promise.all(batch.map(url => auditPage(url)));
    results.push(...batchResults);
    
    // Progress indicator
    for (const result of batchResults) {
      const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
      if (result.status !== 'pass') {
        console.log(`${icon} ${result.url}: ${result.issues.join(', ')}`);
      }
    }
  }
  
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const warnings = results.filter(r => r.status === 'warning').length;
  const brokenLinksTotal = results.reduce((sum, r) => sum + r.brokenLinks.length, 0);
  
  return {
    totalPages: results.length,
    passed,
    failed,
    warnings,
    brokenLinksTotal,
    results
  };
}

async function main() {
  console.log('🚀 Starting Comprehensive Link Audit\n');
  console.log(`Base URL: ${BASE_URL}\n`);
  
  const report = await runAudit();
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 AUDIT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Pages: ${report.totalPages}`);
  console.log(`✅ Passed: ${report.passed}`);
  console.log(`⚠️ Warnings: ${report.warnings}`);
  console.log(`❌ Failed: ${report.failed}`);
  console.log(`🔗 Broken Links Found: ${report.brokenLinksTotal}`);
  
  if (report.failed > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('❌ FAILED PAGES:');
    console.log('='.repeat(60));
    for (const result of report.results.filter(r => r.status === 'fail')) {
      console.log(`\n${result.url}`);
      console.log(`  HTTP: ${result.httpStatus}`);
      console.log(`  Issues: ${result.issues.join(', ')}`);
    }
  }
  
  if (report.warnings > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('⚠️ PAGES WITH WARNINGS:');
    console.log('='.repeat(60));
    for (const result of report.results.filter(r => r.status === 'warning')) {
      console.log(`\n${result.url}`);
      console.log(`  Issues: ${result.issues.join(', ')}`);
    }
  }
  
  if (report.brokenLinksTotal > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('🔗 BROKEN LINKS:');
    console.log('='.repeat(60));
    for (const result of report.results.filter(r => r.brokenLinks.length > 0)) {
      console.log(`\n${result.url}`);
      for (const link of result.brokenLinks) {
        console.log(`  - ${link}`);
      }
    }
  }
  
  // Return exit code based on failures
  const passRate = (report.passed / report.totalPages * 100).toFixed(1);
  console.log(`\n🎯 Pass Rate: ${passRate}%`);
  
  if (report.failed > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
