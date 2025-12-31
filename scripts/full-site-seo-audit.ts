#!/usr/bin/env npx tsx
/**
 * Full Site SEO Audit Script
 * 
 * Scans ALL pages in sitemap.xml for SEO issues that cause soft 404s and ranking drops.
 * Run: npx tsx scripts/full-site-seo-audit.ts
 */

import http from 'http';
import https from 'https';

const PORT = parseInt(process.env.PORT || '5000');
const MIN_CONTENT_LENGTH = 5000;
const MIN_META_DESC_LENGTH = 50;
const MIN_H1_LENGTH = 10;

interface PageResult {
  url: string;
  route: string;
  status: 'pass' | 'fail';
  statusCode: number;
  contentLength: number;
  hasH1: boolean;
  h1Text: string;
  hasMetaDescription: boolean;
  metaDescLength: number;
  hasTitle: boolean;
  titleText: string;
  hasCanonical: boolean;
  hasOgTags: boolean;
  hasJsonLd: boolean;
  issues: string[];
  category: string;
}

function categorizeRoute(route: string): string {
  if (route.includes('/blogs/') && (route.includes('bachelor') || route.includes('bachelorette'))) {
    return 'Bachelor/Bachelorette Blog';
  }
  if (route.includes('/blogs/')) return 'Blog';
  if (route.includes('bachelor')) return 'Bachelor';
  if (route.includes('bachelorette')) return 'Bachelorette';
  if (route.includes('wedding') || route.includes('rehearsal') || route.includes('after-party') || route.includes('welcome-party')) return 'Wedding';
  if (route.includes('corporate') || route.includes('team-building') || route.includes('client-entertainment') || route.includes('company-milestone')) return 'Corporate';
  if (route.includes('birthday') || route.includes('sweet-16') || route.includes('graduation') || route.includes('milestone')) return 'Celebrations';
  if (route === '/' || route === '/atx-disco-cruise' || route === '/private-cruises') return 'Main Pages';
  return 'Other';
}

async function fetchSitemap(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}/sitemap.xml`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const urls = data.match(/<loc>([^<]+)<\/loc>/g)?.map(loc => 
          loc.replace(/<\/?loc>/g, '')
        ) || [];
        resolve(urls);
      });
    }).on('error', reject);
  });
}

async function checkPage(url: string): Promise<PageResult> {
  const route = url.replace('https://premierpartycruises.com', '').replace('http://localhost:5000', '') || '/';
  const issues: string[] = [];
  
  return new Promise((resolve) => {
    const localUrl = `http://localhost:${PORT}${route}`;
    
    const req = http.get(localUrl, { timeout: 15000 }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const statusCode = res.statusCode || 0;
        const contentLength = body.length;
        
        // Extract H1
        const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const hasH1 = !!h1Match;
        const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
        
        // Extract title
        const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const hasTitle = !!titleMatch;
        const titleText = titleMatch ? titleMatch[1].trim() : '';
        
        // Extract meta description
        const metaDescMatch = body.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
        const hasMetaDescription = !!metaDescMatch && metaDescMatch[1].length >= MIN_META_DESC_LENGTH;
        const metaDescLength = metaDescMatch ? metaDescMatch[1].length : 0;
        
        // Check for canonical
        const hasCanonical = /<link[^>]*rel=["']canonical["'][^>]*>/i.test(body);
        
        // Check for OG tags
        const hasOgTags = /<meta[^>]*property=["']og:/i.test(body);
        
        // Check for JSON-LD
        const hasJsonLd = /<script[^>]*type=["']application\/ld\+json["']/i.test(body);
        
        // Check for soft 404 indicators
        const hasSoft404 = /page\s*not\s*found|404\s*error|not\s*found/i.test(body.slice(0, 3000));
        
        // Validate
        if (statusCode !== 200) issues.push(`HTTP ${statusCode}`);
        if (contentLength < MIN_CONTENT_LENGTH) issues.push(`Thin: ${(contentLength/1024).toFixed(1)}KB`);
        if (!hasH1) issues.push('No H1');
        else if (h1Text.length < MIN_H1_LENGTH) issues.push(`H1 too short: "${h1Text.substring(0, 30)}"`);
        if (!hasMetaDescription) issues.push(metaDescLength > 0 ? `Meta desc short: ${metaDescLength} chars` : 'No meta desc');
        if (!hasTitle) issues.push('No title');
        if (!hasCanonical) issues.push('No canonical');
        if (!hasOgTags) issues.push('No OG tags');
        if (!hasJsonLd) issues.push('No JSON-LD');
        if (hasSoft404) issues.push('SOFT 404 DETECTED');
        
        resolve({
          url,
          route,
          status: issues.length === 0 ? 'pass' : 'fail',
          statusCode,
          contentLength,
          hasH1,
          h1Text: h1Text.substring(0, 50),
          hasMetaDescription,
          metaDescLength,
          hasTitle,
          titleText: titleText.substring(0, 50),
          hasCanonical,
          hasOgTags,
          hasJsonLd,
          issues,
          category: categorizeRoute(route),
        });
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url, route, status: 'fail', statusCode: 0, contentLength: 0,
        hasH1: false, h1Text: '', hasMetaDescription: false, metaDescLength: 0,
        hasTitle: false, titleText: '', hasCanonical: false, hasOgTags: false,
        hasJsonLd: false, issues: [`Request failed: ${err.message}`],
        category: categorizeRoute(route),
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url, route, status: 'fail', statusCode: 0, contentLength: 0,
        hasH1: false, h1Text: '', hasMetaDescription: false, metaDescLength: 0,
        hasTitle: false, titleText: '', hasCanonical: false, hasOgTags: false,
        hasJsonLd: false, issues: ['Timeout'],
        category: categorizeRoute(route),
      });
    });
  });
}

async function runAudit() {
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('           FULL SITE SEO AUDIT - ALL SITEMAP PAGES');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('');
  
  // Fetch sitemap
  console.log('Fetching sitemap...');
  const urls = await fetchSitemap();
  console.log(`Found ${urls.length} URLs in sitemap`);
  console.log('');
  
  // Check all pages
  const results: PageResult[] = [];
  const batchSize = 5;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(url => checkPage(url)));
    results.push(...batchResults);
    
    // Progress indicator
    process.stdout.write(`\rChecking pages: ${Math.min(i + batchSize, urls.length)}/${urls.length}`);
  }
  console.log('\n');
  
  // Categorize results
  const passing = results.filter(r => r.status === 'pass');
  const failing = results.filter(r => r.status === 'fail');
  
  // Group failures by category
  const failuresByCategory: { [key: string]: PageResult[] } = {};
  failing.forEach(r => {
    if (!failuresByCategory[r.category]) failuresByCategory[r.category] = [];
    failuresByCategory[r.category].push(r);
  });
  
  // Report summary
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('                              RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log(`Total Pages:  ${results.length}`);
  console.log(`Passing:      ${passing.length} (${(passing.length/results.length*100).toFixed(1)}%)`);
  console.log(`Failing:      ${failing.length} (${(failing.length/results.length*100).toFixed(1)}%)`);
  console.log('');
  
  // Issue breakdown
  const issueCount: { [key: string]: number } = {};
  failing.forEach(r => {
    r.issues.forEach(issue => {
      const key = issue.split(':')[0].split(' ')[0];
      issueCount[key] = (issueCount[key] || 0) + 1;
    });
  });
  
  console.log('Issue Breakdown:');
  Object.entries(issueCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([issue, count]) => {
      console.log(`  ${issue}: ${count} pages`);
    });
  console.log('');
  
  // Failures by category
  if (failing.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════════════════');
    console.log('                          FAILING PAGES BY CATEGORY');
    console.log('═══════════════════════════════════════════════════════════════════════════');
    
    Object.entries(failuresByCategory)
      .sort((a, b) => b[1].length - a[1].length)
      .forEach(([category, pages]) => {
        console.log('');
        console.log(`\x1b[33m${category} (${pages.length} issues)\x1b[0m`);
        pages.forEach(p => {
          console.log(`  \x1b[31m✗\x1b[0m ${p.route}`);
          p.issues.forEach(issue => {
            console.log(`      └─ ${issue}`);
          });
        });
      });
  }
  
  // Critical issues (soft 404s, no H1, very thin content)
  const critical = failing.filter(r => 
    r.issues.some(i => i.includes('SOFT 404') || i.includes('No H1') || i.includes('Thin'))
  );
  
  if (critical.length > 0) {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════════════════');
    console.log('\x1b[31m                    CRITICAL ISSUES (SOFT 404 RISK)\x1b[0m');
    console.log('═══════════════════════════════════════════════════════════════════════════');
    critical.forEach(p => {
      console.log(`\x1b[31m✗ ${p.route}\x1b[0m`);
      console.log(`    H1: ${p.hasH1 ? p.h1Text : 'MISSING'}`);
      console.log(`    Size: ${(p.contentLength/1024).toFixed(1)}KB`);
      console.log(`    Issues: ${p.issues.join(', ')}`);
    });
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  
  if (failing.length === 0) {
    console.log('\x1b[32m✅ ALL PAGES PASS SEO AUDIT - SITE IS FULLY OPTIMIZED\x1b[0m');
  } else {
    console.log(`\x1b[31m❌ ${failing.length} PAGES NEED ATTENTION\x1b[0m`);
    console.log('');
    console.log('Priority fixes:');
    console.log('1. Pages with "No H1" or "SOFT 404" - These hurt rankings immediately');
    console.log('2. Pages with "Thin" content - Google may see as low-quality');
    console.log('3. Missing meta descriptions - Affects click-through rates');
  }
  
  process.exit(failing.length > 0 ? 1 : 0);
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
