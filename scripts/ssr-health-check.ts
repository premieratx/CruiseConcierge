#!/usr/bin/env npx tsx
/**
 * SSR Health Check Script
 * 
 * Validates that all critical marketing pages render correctly via SSR
 * to prevent soft 404 errors in Google Search Console.
 * 
 * Run before every deploy: npx tsx scripts/ssr-health-check.ts
 */

import http from 'http';

const CRITICAL_ROUTES = [
  '/',
  '/atx-disco-cruise',
  '/private-cruises',
  '/bachelor-party-austin',
  '/bachelorette-party-austin',
  '/combined-bachelor-bachelorette-austin',
  '/corporate-events',
  '/birthday-parties',
  '/wedding-parties',
  '/rehearsal-dinner',
  '/welcome-party',
  '/after-party',
  '/team-building',
  '/client-entertainment',
  '/company-milestone',
  '/milestone-birthday',
  '/sweet-16',
  '/graduation-party',
  '/party-boat-austin',
  '/party-boat-lake-travis',
  '/pricing-breakdown',
  '/faq',
  '/contact',
  '/gallery',
  '/testimonials-faq',
];

const MIN_CONTENT_LENGTH = 10000; // Minimum bytes for a valid page
const MIN_H1_LENGTH = 10; // Minimum characters for H1

interface CheckResult {
  route: string;
  status: 'pass' | 'fail';
  statusCode: number;
  contentLength: number;
  hasH1: boolean;
  h1Text: string;
  hasMetaDescription: boolean;
  issues: string[];
}

async function checkRoute(route: string, port: number): Promise<CheckResult> {
  return new Promise((resolve) => {
    const issues: string[] = [];
    
    const req = http.get(`http://localhost:${port}${route}`, { timeout: 10000 }, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        const statusCode = res.statusCode || 0;
        const contentLength = body.length;
        
        // Check for H1 tag
        const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const hasH1 = !!h1Match;
        const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
        
        // Check for meta description - simple pattern that matches the actual HTML
        const metaDescMatch = body.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
        const hasMetaDescription = metaDescMatch && metaDescMatch[1].length >= 50;
        
        // Check for soft 404 indicators
        const hasSoft404Indicators = 
          /page\s*not\s*found/i.test(body) ||
          /404\s*error/i.test(body) ||
          /not\s*found/i.test(body.slice(0, 2000)); // Check first 2000 chars
        
        // Validate results
        if (statusCode !== 200) {
          issues.push(`HTTP ${statusCode} (expected 200)`);
        }
        
        if (contentLength < MIN_CONTENT_LENGTH) {
          issues.push(`Content too short: ${contentLength} bytes (min: ${MIN_CONTENT_LENGTH})`);
        }
        
        if (!hasH1) {
          issues.push('Missing H1 tag');
        } else if (h1Text.length < MIN_H1_LENGTH) {
          issues.push(`H1 too short: "${h1Text}"`);
        }
        
        if (!hasMetaDescription) {
          issues.push('Missing or short meta description');
        }
        
        if (hasSoft404Indicators && !route.includes('404')) {
          issues.push('Contains soft 404 indicators ("page not found" text)');
        }
        
        resolve({
          route,
          status: issues.length === 0 ? 'pass' : 'fail',
          statusCode,
          contentLength,
          hasH1,
          h1Text: h1Text.substring(0, 60) + (h1Text.length > 60 ? '...' : ''),
          hasMetaDescription,
          issues,
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        route,
        status: 'fail',
        statusCode: 0,
        contentLength: 0,
        hasH1: false,
        h1Text: '',
        hasMetaDescription: false,
        issues: [`Request failed: ${error.message}`],
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        route,
        status: 'fail',
        statusCode: 0,
        contentLength: 0,
        hasH1: false,
        h1Text: '',
        hasMetaDescription: false,
        issues: ['Request timed out'],
      });
    });
  });
}

async function runHealthCheck() {
  const port = parseInt(process.env.PORT || '5000');
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('            SSR HEALTH CHECK - SOFT 404 PREVENTION');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Testing ${CRITICAL_ROUTES.length} critical routes on port ${port}...`);
  console.log('');
  
  const results: CheckResult[] = [];
  
  for (const route of CRITICAL_ROUTES) {
    const result = await checkRoute(route, port);
    results.push(result);
    
    const icon = result.status === 'pass' ? '✓' : '✗';
    const color = result.status === 'pass' ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    
    console.log(`${color}${icon}${reset} ${route}`);
    if (result.status === 'pass') {
      console.log(`    H1: ${result.h1Text}`);
      console.log(`    Size: ${(result.contentLength / 1024).toFixed(1)}KB`);
    } else {
      result.issues.forEach(issue => {
        console.log(`    ${color}└─ ${issue}${reset}`);
      });
    }
  }
  
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  
  console.log(`Results: ${passed}/${results.length} passed`);
  
  if (failed > 0) {
    console.log('');
    console.log('\x1b[31m❌ FAILED - DO NOT DEPLOY\x1b[0m');
    console.log('');
    console.log('Failed routes will appear as SOFT 404 in Google Search Console!');
    console.log('Fix these issues before deploying.');
    process.exit(1);
  } else {
    console.log('');
    console.log('\x1b[32m✅ ALL ROUTES HEALTHY - SAFE TO DEPLOY\x1b[0m');
    process.exit(0);
  }
}

runHealthCheck().catch(error => {
  console.error('Health check failed:', error);
  process.exit(1);
});
