#!/usr/bin/env npx tsx
/**
 * SEARCH ENGINE PING SCRIPT
 * 
 * Notifies Google and Bing that the sitemap has been updated.
 * Run this after deploying new content to accelerate indexing.
 * 
 * USAGE:
 *   npx tsx scripts/ping-search-engines.ts
 * 
 * This sends ping requests to:
 *   - Google Search Console
 *   - Bing Webmaster Tools
 * 
 * Note: For Google, you should also use the Indexing API for faster results.
 * This script uses the simpler sitemap ping method.
 */

const SITEMAP_URL = 'https://premierpartycruises.com/sitemap.xml';

const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

interface PingResult {
  engine: string;
  success: boolean;
  message: string;
}

async function pingSearchEngine(name: string, url: string): Promise<PingResult> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Premier Party Cruises SEO Bot/1.0'
      }
    });
    
    if (response.ok || response.status === 200) {
      return { engine: name, success: true, message: `Status: ${response.status}` };
    } else {
      return { engine: name, success: false, message: `Status: ${response.status}` };
    }
  } catch (error: any) {
    return { engine: name, success: false, message: error.message };
  }
}

async function main() {
  console.log(`
${BOLD}${BLUE}════════════════════════════════════════════════════════════════${RESET}
${BOLD}           SEARCH ENGINE SITEMAP PING${RESET}
${BOLD}${BLUE}════════════════════════════════════════════════════════════════${RESET}

Sitemap: ${SITEMAP_URL}
Date: ${new Date().toISOString()}
`);

  const engines = [
    {
      name: 'Google',
      url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    },
    {
      name: 'Bing',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    }
  ];

  console.log(`${YELLOW}Pinging search engines...${RESET}\n`);

  const results: PingResult[] = [];
  
  for (const engine of engines) {
    console.log(`  Pinging ${engine.name}...`);
    const result = await pingSearchEngine(engine.name, engine.url);
    results.push(result);
    
    if (result.success) {
      console.log(`  ${GREEN}✓ ${engine.name}: ${result.message}${RESET}`);
    } else {
      console.log(`  ${RED}✗ ${engine.name}: ${result.message}${RESET}`);
    }
  }

  const successful = results.filter(r => r.success).length;
  
  console.log(`
${BOLD}${BLUE}════════════════════════════════════════════════════════════════${RESET}
                    RESULTS
${BOLD}${BLUE}════════════════════════════════════════════════════════════════${RESET}

Engines Pinged: ${engines.length}
Successful: ${successful}
Failed: ${engines.length - successful}

${YELLOW}Note: Search engine pings request re-crawling but don't guarantee
immediate indexing. For faster results:${RESET}

  1. Submit URLs directly via Google Search Console
  2. Use Google Indexing API for important pages
  3. Build quality backlinks to new content
  4. Share content on social media for discovery

${GREEN}Sitemap ping complete.${RESET}
`);
}

main().catch(console.error);
