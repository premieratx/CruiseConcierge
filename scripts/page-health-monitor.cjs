#!/usr/bin/env node
/**
 * Daily Page Health Monitor
 * Checks critical marketing pages for SEO health indicators:
 * - HTTP 200 status
 * - H1 tag presence in SSR content
 * - Schema markup presence (optional for guide pages)
 * 
 * Run: node scripts/page-health-monitor.cjs
 * Add to cron: 0 6 * * * node /path/to/page-health-monitor.cjs
 */

const http = require('http');
const https = require('https');

const BASE_URL = process.env.SITE_URL || 'http://localhost:5000';

const CRITICAL_PAGES = [
  { path: '/', name: 'Home', h1Contains: ['Premier', 'Austin', 'Lake Travis'], schemaRequired: true },
  { path: '/atx-disco-cruise', name: 'ATX Disco Cruise', h1Contains: ['ATX Disco', 'Bachelor', 'Bachelorette'], schemaRequired: true },
  { path: '/private-cruises', name: 'Private Cruises', h1Contains: ['Private', 'Cruise', 'Charter'], schemaRequired: true },
  { path: '/bachelor-party-austin', name: 'Bachelor Party', h1Contains: ['Bachelor'], schemaRequired: true },
  { path: '/bachelorette-party-austin', name: 'Bachelorette Party', h1Contains: ['Bachelorette'], schemaRequired: true },
  { path: '/birthday-parties', name: 'Birthday Parties', h1Contains: ['Birthday'], schemaRequired: false },
  { path: '/wedding-parties', name: 'Wedding Parties', h1Contains: ['Wedding'], schemaRequired: false },
  { path: '/corporate-events', name: 'Corporate Events', h1Contains: ['Corporate'], schemaRequired: false },
  { path: '/contact', name: 'Contact', h1Contains: ['Contact'], schemaRequired: true },
  { path: '/gallery', name: 'Gallery', h1Contains: ['Gallery', 'Photo'], schemaRequired: false },
  { path: '/faq', name: 'FAQ', h1Contains: ['FAQ', 'Frequently', 'Questions'], schemaRequired: true },
  { path: '/testimonials-faq', name: 'Testimonials', h1Contains: ['Testimonials', 'Reviews'], schemaRequired: true },
  { path: '/party-boat-austin', name: 'Party Boat Austin', h1Contains: ['Party Boat', 'Austin'], schemaRequired: true },
  { path: '/party-boat-lake-travis', name: 'Party Boat Lake Travis', h1Contains: ['Party Boat', 'Lake Travis'], schemaRequired: true },
  { path: '/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning', name: 'First Time Guide', h1Contains: ['First', 'Guide', 'Lake Travis', 'Essential', 'Tips'], schemaRequired: false },
  { path: '/austin-bachelorette-nightlife', name: 'Austin Bachelorette Nightlife', h1Contains: ['Bachelorette', 'Nightlife'], schemaRequired: false },
  { path: '/budget-austin-bachelorette', name: 'Budget Bachelorette', h1Contains: ['Budget', 'Bachelorette'], schemaRequired: false },
  { path: '/luxury-austin-bachelorette', name: 'Luxury Bachelorette', h1Contains: ['Luxury', 'Bachelorette'], schemaRequired: false },
  { path: '/sweet-16', name: 'Sweet 16', h1Contains: ['Sweet 16', 'Sixteen'], schemaRequired: true },
  { path: '/graduation-party', name: 'Graduation Party', h1Contains: ['Graduation'], schemaRequired: true },
  { path: '/team-building', name: 'Team Building', h1Contains: ['Team', 'Building', 'Corporate'], schemaRequired: true },
  { path: '/rehearsal-dinner', name: 'Rehearsal Dinner', h1Contains: ['Rehearsal', 'Dinner'], schemaRequired: true },
  { path: '/welcome-party', name: 'Welcome Party', h1Contains: ['Welcome', 'Party'], schemaRequired: true },
  { path: '/after-party', name: 'After Party', h1Contains: ['After', 'Party'], schemaRequired: true },
  { path: '/client-entertainment', name: 'Client Entertainment', h1Contains: ['Client', 'Entertainment'], schemaRequired: true },
  { path: '/company-milestone', name: 'Company Milestone', h1Contains: ['Company', 'Milestone'], schemaRequired: true },
  { path: '/combined-bachelor-bachelorette-austin', name: 'Combined Bachelor Bachelorette', h1Contains: ['Bachelor', 'Bachelorette', 'Combined'], schemaRequired: true },
  { path: '/milestone-birthday', name: 'Milestone Birthday', h1Contains: ['Milestone', 'Birthday'], schemaRequired: true },
  { path: '/partners', name: 'Partners', h1Contains: ['Partner'], schemaRequired: false },
  { path: '/golden-ticket', name: 'Golden Ticket', h1Contains: ['Golden', 'Ticket'], schemaRequired: false },
  { path: '/blogs', name: 'Blogs Index', h1Contains: ['Blog'], schemaRequired: false },
  { path: '/first-time-lake-travis-boat-rental-guide', name: 'Boat Rental Guide', h1Contains: ['Boat', 'Rental', 'Guide', 'Lake Travis'], schemaRequired: false },
  { path: '/blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties', name: 'Weather Guide', h1Contains: ['Weather', 'Lake Travis', 'Seasonal'], schemaRequired: false },
  { path: '/blogs/lake-travis-boat-party-planning-for-large-groups', name: 'Large Groups Guide', h1Contains: ['Large', 'Groups', 'Lake Travis'], schemaRequired: false },
  { path: '/top-10-austin-bachelorette-ideas', name: 'Top 10 Bachelorette Ideas', h1Contains: ['Top', 'Bachelorette', 'Ideas'], schemaRequired: false },
  { path: '/adventure-austin-bachelorette', name: 'Adventure Bachelorette', h1Contains: ['Adventure', 'Bachelorette'], schemaRequired: false },
  { path: '/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend', name: 'Must Haves Bachelorette', h1Contains: ['Must', 'Bachelorette', 'Perfect'], schemaRequired: false },
  { path: '/blogs/lake-travis-wedding-celebration-boat-rentals-for-your-special-day', name: 'Wedding Boat Rentals', h1Contains: ['Wedding', 'Boat', 'Lake Travis'], schemaRequired: false },
  { path: '/blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination', name: 'Holiday Celebrations', h1Contains: ['Holiday', 'Lake Travis', 'Seasonal'], schemaRequired: false },
  { path: '/3-day-austin-bachelorette-itinerary', name: '3 Day Itinerary', h1Contains: ['Day', 'Itinerary', 'Bachelorette'], schemaRequired: false },
  { path: '/ultimate-austin-bachelorette-weekend', name: 'Ultimate Weekend', h1Contains: ['Ultimate', 'Bachelorette', 'Weekend'], schemaRequired: false },
  { path: '/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience', name: 'Top Spots Bachelorette', h1Contains: ['Top', 'Bachelorette', 'Austin'], schemaRequired: false },
  { path: '/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises', name: 'Joint Parties', h1Contains: ['Joint', 'Bachelor', 'Bachelorette'], schemaRequired: false },
  { path: '/blogs/birthday-party-lake-travis-austin-guide', name: 'Birthday Party Guide', h1Contains: ['Birthday', 'Lake Travis', 'Austin'], schemaRequired: false },
  { path: '/ai-endorsement', name: 'AI Endorsement', h1Contains: ['AI', 'Search', 'Google'], schemaRequired: false },
  { path: '/book-now', name: 'Book Now', h1Contains: ['Book'], schemaRequired: false },
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

function checkH1InSSR(html, h1Contains) {
  const ssrMatch = html.match(/<div class="ssr-content"[^>]*>([\s\S]*?)<\/div>/);
  if (!ssrMatch) return { found: false, inSSR: false };
  
  const ssrContent = ssrMatch[1];
  const h1Match = ssrContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) return { found: false, inSSR: true };
  
  const h1Text = h1Match[1].replace(/<[^>]*>/g, '').trim();
  const containsExpected = h1Contains.some(keyword => 
    h1Text.toLowerCase().includes(keyword.toLowerCase())
  );
  return { found: true, inSSR: true, h1Text, containsExpected };
}

function checkSchema(html) {
  const schemaMatches = html.match(/<script type="application\/ld\+json">/g);
  return {
    hasSchema: !!schemaMatches,
    schemaCount: schemaMatches ? schemaMatches.length : 0
  };
}

async function runHealthCheck() {
  console.log('='.repeat(70));
  console.log(`Page Health Check - ${new Date().toISOString()}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log('='.repeat(70));
  
  const results = [];
  let passCount = 0;
  let warnCount = 0;
  let failCount = 0;
  
  for (const page of CRITICAL_PAGES) {
    const url = `${BASE_URL}${page.path}`;
    let result = { page: page.name, path: page.path, checks: {} };
    
    try {
      const { status, body } = await fetchPage(url);
      result.checks.status = status;
      result.checks.statusPass = status === 200;
      
      const h1Check = checkH1InSSR(body, page.h1Contains);
      result.checks.h1InSSR = h1Check.inSSR;
      result.checks.h1Found = h1Check.found;
      result.checks.h1Text = h1Check.h1Text || 'N/A';
      result.checks.h1Pass = h1Check.found && h1Check.containsExpected;
      
      const schemaCheck = checkSchema(body);
      result.checks.hasSchema = schemaCheck.hasSchema;
      result.checks.schemaCount = schemaCheck.schemaCount;
      result.checks.schemaRequired = page.schemaRequired;
      result.checks.schemaPass = page.schemaRequired ? schemaCheck.hasSchema : true;
      
      result.overallPass = result.checks.statusPass && result.checks.h1Pass && result.checks.schemaPass;
      result.isWarning = !page.schemaRequired && !schemaCheck.hasSchema;
      
    } catch (error) {
      result.checks.error = error.message;
      result.overallPass = false;
    }
    
    if (result.overallPass && !result.isWarning) passCount++;
    else if (result.isWarning && result.overallPass) warnCount++;
    else failCount++;
    
    results.push(result);
    
    const statusIcon = result.checks.error ? '💥' : (result.overallPass ? (result.isWarning ? '⚠️' : '✅') : '❌');
    const statusStr = result.checks.status || 'ERR';
    const h1Str = result.checks.h1Pass ? '✓ H1' : '✗ H1';
    const schemaStr = result.checks.hasSchema ? `✓ ${result.checks.schemaCount}s` : (page.schemaRequired ? '✗ sch' : '- sch');
    
    console.log(`${statusIcon} [${statusStr}] ${page.name.padEnd(30)} | ${h1Str.padEnd(5)} | ${schemaStr}`);
  }
  
  console.log('='.repeat(70));
  console.log(`Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed of ${CRITICAL_PAGES.length} pages`);
  
  if (failCount > 0) {
    console.log('\n❌ FAILED PAGES (require attention):');
    results.filter(r => !r.overallPass).forEach(r => {
      console.log(`  - ${r.page} (${r.path})`);
      if (r.checks.error) console.log(`    Error: ${r.checks.error}`);
      if (!r.checks.statusPass) console.log(`    Status: ${r.checks.status}`);
      if (!r.checks.h1Pass) console.log(`    H1: ${r.checks.h1Text || 'not found in SSR'}`);
      if (r.checks.schemaRequired && !r.checks.hasSchema) console.log(`    Schema: missing (required)`);
    });
  }
  
  if (warnCount > 0) {
    console.log('\n⚠️  WARNINGS (optional improvements):');
    results.filter(r => r.isWarning && r.overallPass).forEach(r => {
      console.log(`  - ${r.page}: No schema (optional)`);
    });
  }
  
  if (failCount > 0) {
    console.log('\n💡 Run this after fixing issues: node scripts/page-health-monitor.cjs');
    process.exit(1);
  }
  
  console.log('\n✅ All critical SEO pages passing health checks!');
  process.exit(0);
}

runHealthCheck().catch(err => {
  console.error('Health check failed:', err);
  process.exit(1);
});
