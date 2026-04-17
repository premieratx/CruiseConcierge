#!/usr/bin/env node
/**
 * Build-time generator for sitemap.xml and robots.txt.
 *
 * Pulls the canonical URL list from the live site's sitemap (source of
 * truth for what's indexed), then rewrites it to match the V2 Netlify
 * deploy's canonical host.
 *
 * Writes:
 *   dist/public/sitemap.xml
 *   dist/public/robots.txt
 *
 * Env vars:
 *   CANONICAL_HOST  the host URLs should use in the output (default:
 *                   reads from netlify context or defaults to the V2
 *                   preview URL).
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const LIVE_SITEMAP_URL = 'https://premierpartycruises.com/sitemap.xml';
const OUT_DIR = 'dist/public';

// If deploying for a custom domain, set CANONICAL_HOST=https://premierpartycruises.com
// in Netlify env vars. Otherwise we use the Netlify preview URL.
const CANONICAL_HOST =
  process.env.CANONICAL_HOST ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.URL ||
  'https://premier-party-cruises-v2.netlify.app';

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true });
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return await res.text();
}

async function main() {
  console.log(`Generating SEO files for ${CANONICAL_HOST}...`);

  let sitemap;
  try {
    sitemap = await fetchText(LIVE_SITEMAP_URL);
  } catch (e) {
    console.error(`Could not fetch live sitemap: ${e.message}`);
    console.error('Writing minimal fallback sitemap.');
    sitemap =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      `  <url><loc>${CANONICAL_HOST}/</loc></url>\n` +
      `</urlset>\n`;
  }

  // Rewrite every URL to match the target canonical host. This turns
  // https://premierpartycruises.com/... into $CANONICAL_HOST/... so the
  // sitemap always reflects the host the site is being served from.
  sitemap = sitemap.replace(
    /https?:\/\/(?:www\.)?premierpartycruises\.com/g,
    CANONICAL_HOST.replace(/\/$/, ''),
  );

  const sitemapOut = `${OUT_DIR}/sitemap.xml`;
  ensureDir(sitemapOut);
  writeFileSync(sitemapOut, sitemap);
  const urlCount = (sitemap.match(/<loc>/g) || []).length;
  console.log(`  ✓ sitemap.xml (${urlCount} URLs)`);

  const robots =
    `# robots.txt for ${CANONICAL_HOST}\n` +
    `User-agent: *\n` +
    `Allow: /\n\n` +
    `# Prevent crawling of admin routes\n` +
    `Disallow: /admin/\n` +
    `Disallow: /api/admin/\n\n` +
    `Sitemap: ${CANONICAL_HOST.replace(/\/$/, '')}/sitemap.xml\n`;

  const robotsOut = `${OUT_DIR}/robots.txt`;
  writeFileSync(robotsOut, robots);
  console.log(`  ✓ robots.txt`);
}

main().catch((e) => {
  console.error('SEO file generation failed:', e);
  process.exit(0); // non-fatal — don't block the deploy
});
