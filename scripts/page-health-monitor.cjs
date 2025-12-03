#!/usr/bin/env node
/**
 * Daily Page Health Monitor
 * Checks critical marketing pages for SEO health indicators:
 * - HTTP 200 status
 * - H1 tag presence in SSR content
 * - Schema markup presence
 * - data-page-ready attribute coverage
 * 
 * Run: node scripts/page-health-monitor.js
 * Add to cron: 0 6 * * * node /path/to/page-health-monitor.js
 */

const http = require('http');
const https = require('https');

const BASE_URL = process.env.SITE_URL || 'http://localhost:5000';

const CRITICAL_PAGES = [
  { path: '/', name: 'Home', expectedH1: 'Premier Party Cruises' },
  { path: '/atx-disco-cruise', name: 'ATX Disco Cruise', expectedH1: 'ATX Disco Cruise' },
  { path: '/private-cruises', name: 'Private Cruises', expectedH1: 'Private' },
  { path: '/bachelor-party-austin', name: 'Bachelor Party', expectedH1: 'Bachelor' },
  { path: '/bachelorette-party-austin', name: 'Bachelorette Party', expectedH1: 'Bachelorette' },
  { path: '/birthday-parties', name: 'Birthday Parties', expectedH1: 'Birthday' },
  { path: '/wedding-parties', name: 'Wedding Parties', expectedH1: 'Wedding' },
  { path: '/corporate-events', name: 'Corporate Events', expectedH1: 'Corporate' },
  { path: '/contact', name: 'Contact', expectedH1: 'Contact' },
  { path: '/gallery', name: 'Gallery', expectedH1: 'Gallery' },
  { path: '/faq', name: 'FAQ', expectedH1: 'FAQ' },
  { path: '/testimonials-faq', name: 'Testimonials', expectedH1: 'Reviews' },
  { path: '/party-boat-austin', name: 'Party Boat Austin', expectedH1: 'Party Boat' },
  { path: '/party-boat-lake-travis', name: 'Party Boat Lake Travis', expectedH1: 'Lake Travis' },
  { path: '/first-time-lake-travis', name: 'First Time Guide', expectedH1: 'First Time' },
  { path: '/austin-bachelorette-nightlife', name: 'Austin Bachelorette Nightlife', expectedH1: 'Bachelorette' },
  { path: '/budget-austin-bachelorette', name: 'Budget Bachelorette', expectedH1: 'Budget' },
  { path: '/luxury-austin-bachelorette', name: 'Luxury Bachelorette', expectedH1: 'Luxury' },
  { path: '/sweet-16', name: 'Sweet 16', expectedH1: 'Sweet 16' },
  { path: '/graduation-party', name: 'Graduation Party', expectedH1: 'Graduation' },
];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function checkH1InSSR(html, expectedH1) {
  const ssrMatch = html.match(/<div class="ssr-content"[^>]*>([\s\S]*?)<\/div>/);
  if (!ssrMatch) return { found: false, inSSR: false };
  
  const ssrContent = ssrMatch[1];
  const h1Match = ssrContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) return { found: false, inSSR: true };
  
  const h1Text = h1Match[1].replace(/<[^>]*>/g, '').trim();
  const containsExpected = h1Text.toLowerCase().includes(expectedH1.toLowerCase());
  return { found: true, inSSR: true, h1Text, containsExpected };
}

function checkSchema(html) {
  const schemaMatches = html.match(/<script type="application\/ld\+json">/g);
  return {
    hasSchema: !!schemaMatches,
    schemaCount: schemaMatches ? schemaMatches.length : 0
  };
}

function checkDataPageReady(html) {
  return /data-page-ready=/.test(html);
}

async function runHealthCheck() {
  console.log('='.repeat(60));
  console.log(`Page Health Check - ${new Date().toISOString()}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log('='.repeat(60));
  
  const results = [];
  let passCount = 0;
  let failCount = 0;
  
  for (const page of CRITICAL_PAGES) {
    const url = `${BASE_URL}${page.path}`;
    let result = { page: page.name, path: page.path, checks: {} };
    
    try {
      const { status, body } = await fetchPage(url);
      result.checks.status = status;
      result.checks.statusPass = status === 200;
      
      const h1Check = checkH1InSSR(body, page.expectedH1);
      result.checks.h1InSSR = h1Check.inSSR;
      result.checks.h1Found = h1Check.found;
      result.checks.h1Text = h1Check.h1Text || 'N/A';
      result.checks.h1Pass = h1Check.found && h1Check.containsExpected;
      
      const schemaCheck = checkSchema(body);
      result.checks.hasSchema = schemaCheck.hasSchema;
      result.checks.schemaCount = schemaCheck.schemaCount;
      
      result.checks.hasDataPageReady = checkDataPageReady(body);
      
      result.overallPass = result.checks.statusPass && result.checks.h1Pass && result.checks.hasSchema;
      
    } catch (error) {
      result.checks.error = error.message;
      result.overallPass = false;
    }
    
    if (result.overallPass) passCount++;
    else failCount++;
    
    results.push(result);
    
    const statusIcon = result.overallPass ? '✅' : '❌';
    const statusStr = result.checks.status || 'ERR';
    const h1Str = result.checks.h1Pass ? '✓ H1' : '✗ H1';
    const schemaStr = result.checks.hasSchema ? `✓ ${result.checks.schemaCount} schemas` : '✗ schema';
    const readyStr = result.checks.hasDataPageReady ? '✓ ready' : '✗ ready';
    
    console.log(`${statusIcon} [${statusStr}] ${page.name.padEnd(25)} | ${h1Str} | ${schemaStr} | ${readyStr}`);
  }
  
  console.log('='.repeat(60));
  console.log(`Summary: ${passCount} passed, ${failCount} failed out of ${CRITICAL_PAGES.length} pages`);
  
  if (failCount > 0) {
    console.log('\n⚠️  FAILED PAGES:');
    results.filter(r => !r.overallPass).forEach(r => {
      console.log(`  - ${r.page} (${r.path})`);
      if (r.checks.error) console.log(`    Error: ${r.checks.error}`);
      if (!r.checks.statusPass) console.log(`    Status: ${r.checks.status}`);
      if (!r.checks.h1Pass) console.log(`    H1: ${r.checks.h1Text || 'not found in SSR'}`);
      if (!r.checks.hasSchema) console.log(`    Schema: missing`);
    });
    process.exit(1);
  }
  
  console.log('\n✅ All critical pages passing health checks!');
  process.exit(0);
}

runHealthCheck().catch(err => {
  console.error('Health check failed:', err);
  process.exit(1);
});
