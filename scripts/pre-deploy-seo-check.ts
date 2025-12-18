#!/usr/bin/env npx tsx
/**
 * PRE-DEPLOY SEO CHECK SCRIPT
 * 
 * Run this before every deployment to ensure SEO compliance.
 * This script runs the full SEO audit and fails if any pages don't pass.
 * 
 * USAGE:
 *   npx tsx scripts/pre-deploy-seo-check.ts
 * 
 * Add to package.json:
 *   "test:seo": "tsx scripts/pre-deploy-seo-check.ts"
 *   "predeploy": "npm run test:seo"
 * 
 * EXIT CODES:
 *   0 - All pages pass SEO checks
 *   1 - One or more pages fail SEO checks
 */

import { execSync } from 'child_process';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

console.log(`
${BOLD}${BLUE}════════════════════════════════════════════════════════════════${RESET}
${BOLD}              PRE-DEPLOY SEO COMPLIANCE CHECK${RESET}
${BOLD}${BLUE}════════════════════════════════════════════════════════════════${RESET}
`);

console.log(`${YELLOW}Running comprehensive SEO audit...${RESET}\n`);

try {
  // Run the SEO audit script and capture output
  const result = execSync('npx tsx scripts/seo-audit.ts', {
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
    timeout: 300000 // 5 minute timeout
  });

  // Check for success indicators
  const passedAll = result.includes('SUCCESS: ALL PAGES SEO-READY');
  const scoreMatch = result.match(/Overall SEO Health Score:\s*(\d+)%/);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
  const passedMatch = result.match(/Passed All Checks:\s*(\d+)/);
  const failedMatch = result.match(/Failed One or More:\s*(\d+)/);
  const passed = passedMatch ? parseInt(passedMatch[1]) : 0;
  const failed = failedMatch ? parseInt(failedMatch[1]) : 0;

  console.log(result);

  if (passedAll && score === 100) {
    console.log(`
${GREEN}${BOLD}════════════════════════════════════════════════════════════════${RESET}
${GREEN}${BOLD}✓ SEO CHECK PASSED - READY FOR DEPLOYMENT${RESET}
${GREEN}${BOLD}════════════════════════════════════════════════════════════════${RESET}

${GREEN}Score: ${score}%${RESET}
${GREEN}Pages Passed: ${passed}/${passed + failed}${RESET}

All pages meet SEO requirements:
  ✓ H1 tags present and visible
  ✓ Meta titles < 60 characters
  ✓ Meta descriptions present
  ✓ Content >= 500 characters
  ✓ Canonical URLs set
  ✓ Open Graph tags present
  ✓ Structured data valid
  ✓ Mobile viewport configured

${BOLD}You may proceed with deployment.${RESET}
`);
    process.exit(0);
  } else {
    console.log(`
${RED}${BOLD}════════════════════════════════════════════════════════════════${RESET}
${RED}${BOLD}✗ SEO CHECK FAILED - DO NOT DEPLOY${RESET}
${RED}${BOLD}════════════════════════════════════════════════════════════════${RESET}

${RED}Score: ${score}%${RESET}
${RED}Pages Failed: ${failed}${RESET}

${YELLOW}Fix the following issues before deploying:${RESET}
  1. Check scripts/seo-audit-report.txt for detailed failures
  2. Add PAGE_CONTENT entries for pages with < 500 chars
  3. Ensure all blog posts have database content or PAGE_CONTENT fallback
  4. Verify meta tags and H1 visibility

${BOLD}Run 'npx tsx scripts/seo-audit.ts' for full report.${RESET}
`);
    process.exit(1);
  }
} catch (error: any) {
  console.error(`
${RED}${BOLD}════════════════════════════════════════════════════════════════${RESET}
${RED}${BOLD}✗ SEO AUDIT FAILED TO RUN${RESET}
${RED}${BOLD}════════════════════════════════════════════════════════════════${RESET}

Error: ${error.message}

${YELLOW}Troubleshooting:${RESET}
  1. Ensure the development server is running (npm run dev)
  2. Wait for server to be ready before running audit
  3. Check for TypeScript errors in scripts/seo-audit.ts

${BOLD}Do not deploy until SEO audit passes.${RESET}
`);
  
  if (error.stdout) console.log('Output:', error.stdout);
  if (error.stderr) console.error('Errors:', error.stderr);
  
  process.exit(1);
}
