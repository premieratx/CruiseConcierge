#!/usr/bin/env node
/**
 * Build-time generator for sitemap.xml, robots.txt, AND per-route
 * pre-rendered HTML stubs (so SEO crawlers see real title +
 * description + canonical + schema + h1 + internal links instead of
 * the empty SPA shell).
 *
 * How the prerender works:
 *  1. Parse the sitemap to get every public URL
 *  2. For each URL, fetch the equivalent rendered HTML from the live
 *     Replit app at premierpartycruises.com (it renders server-side,
 *     so the response includes real content + schema + canonicals).
 *  3. Rewrite hostnames to the Netlify host, swap <script src="..."> to
 *     the Vite bundle from this build, and write the result to
 *     dist/public/{slug}/index.html.
 *
 * The SPA fallback in netlify.toml hits /index.html — so if a crawler
 * requests /bachelorette-party-austin it now lands on the
 * pre-rendered /bachelorette-party-austin/index.html with real
 * content, then React hydrates on top of it.
 *
 * Writes:
 *   dist/public/sitemap.xml
 *   dist/public/robots.txt
 *   dist/public/{slug}/index.html  (per-route prerendered)
 *
 * Env vars:
 *   CANONICAL_HOST    host URLs should use in the output
 *   SKIP_PRERENDER    set to "1" to skip the per-route prerender step
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const LIVE_SITEMAP_URL = 'https://premierpartycruises.com/sitemap.xml';
const OUT_DIR = 'dist/public';

// TWO separate hosts:
//
// SITE_HOST — the host the site is actually being SERVED from (Netlify deploy
//   URL). Used for the sitemap.xml URLs and robots.txt Sitemap: line so that
//   crawlers / audit tools (Semrush, Ahrefs, Screaming Frog, AI LLM crawlers)
//   pointed at the V2 Netlify domain find a sitemap full of same-domain URLs
//   they can actually fetch. Previously this was conflated with CANONICAL_HOST,
//   which caused V2 Netlify's sitemap to list premierpartycruises.com URLs —
//   which Semrush correctly treated as off-domain and skipped, so V2 audits
//   saw only the homepage + whatever was reachable via internal links.
//
// CANONICAL_HOST — the host that should appear in <link rel="canonical">,
//   <meta property="og:url">, JSON-LD @id, etc. inside each prerendered page.
//   Stays on the production domain so Google doesn't treat V2 Netlify and the
//   Replit production origin as duplicate content.
//
// If the deploy IS the production canonical (DNS flipped, Netlify is apex),
// set CANONICAL_HOST env var equal to SITE_HOST. Otherwise leave it pointed at
// the production apex and V2 will be audit-crawlable without polluting SERPs.
// Prefer Netlify's `URL` (the primary site URL — stable across production
// deploys) over `DEPLOY_PRIME_URL` (branch-deploy URL prefixed with the
// branch name, e.g. https://seo-fixes-only--site.netlify.app). Otherwise
// the sitemap lists URLs on the branch-deploy host while the user points
// Semrush at the primary host, and every sitemap entry looks off-domain.
const SITE_HOST =
  process.env.SITE_HOST ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  'https://premier-party-cruises-v2.netlify.app';
const CANONICAL_HOST =
  process.env.CANONICAL_HOST ||
  SITE_HOST;

function ensureDir(path) {
  mkdirSync(dirname(path), { recursive: true });
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return await res.text();
}

async function main() {
  console.log(`Generating SEO files — site=${SITE_HOST} canonical=${CANONICAL_HOST}...`);

  let sitemap;
  try {
    sitemap = await fetchText(LIVE_SITEMAP_URL);
  } catch (e) {
    console.error(`Could not fetch live sitemap: ${e.message}`);
    console.error('Writing minimal fallback sitemap.');
    sitemap =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      `  <url><loc>${SITE_HOST}/</loc></url>\n` +
      `</urlset>\n`;
  }

  // Rewrite every URL in the sitemap to the ACTUAL SERVING HOST (SITE_HOST),
  // not the canonical production host. This way Semrush / AI LLM audit bots
  // pointed at V2 Netlify find same-domain URLs in the sitemap and crawl them.
  // Canonical link tags inside each page still point to CANONICAL_HOST —
  // see prerenderOne() below.
  sitemap = sitemap.replace(
    /https?:\/\/(?:www\.)?premierpartycruises\.com/g,
    SITE_HOST.replace(/\/$/, ''),
  );

  // V2-only routes that don't exist on the Replit main site yet.
  // Append these so Google can discover them via sitemap.xml on V2.
  const V2_ONLY_ROUTES = [
    '/premier-vs-float-on',
    '/premier-vs-austin-party-boat',
    '/plan-your-trip',
    '/safety',
    '/best-austin-party-boat',
    '/austin-bachelorette-itinerary',
    '/austin-bachelor-itinerary',
    '/austin-party-boat-pricing-guide',
    '/lake-travis-boat-rental-guide',
    '/what-to-bring-on-a-party-boat',
    '/austin-party-bus-shuttle',
    '/combined-bach-itinerary',
    '/austin-corporate-event-guide',
  ];
  const host = SITE_HOST.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  const alreadyPresent = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const v2Urls = V2_ONLY_ROUTES
    .map((p) => `${host}${p}`)
    .filter((u) => !alreadyPresent.has(u))
    .map(
      (u) =>
        `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
    )
    .join('\n');
  if (v2Urls) {
    sitemap = sitemap.replace('</urlset>', `${v2Urls}\n</urlset>`);
  }

  const sitemapOut = `${OUT_DIR}/sitemap.xml`;
  ensureDir(sitemapOut);
  writeFileSync(sitemapOut, sitemap);
  const urlCount = (sitemap.match(/<loc>/g) || []).length;
  console.log(`  ✓ sitemap.xml (${urlCount} URLs)`);

  // robots.txt targets the SERVING host (SITE_HOST) — crawlers auditing V2
  // Netlify need the Sitemap: line to point to the sitemap on the same host
  // they're auditing, not the production canonical.
  const robots =
    `# robots.txt for ${SITE_HOST}\n` +
    `# (canonical production host: ${CANONICAL_HOST})\n` +
    `User-agent: *\n` +
    `Allow: /\n\n` +
    `# Prevent crawling of admin + API routes\n` +
    `Disallow: /admin/\n` +
    `Disallow: /api/admin/\n\n` +
    `# Explicit allowances for major audit / AI LLM crawlers so the V2\n` +
    `# Netlify deploy can be fully analyzed (Semrush, Ahrefs, ChatGPT,\n` +
    `# Perplexity, Google-Extended, Google AI Mode, Bing, etc).\n` +
    `User-agent: SemrushBot\nAllow: /\n\n` +
    `User-agent: SiteAuditBot\nAllow: /\n\n` +
    `User-agent: AhrefsBot\nAllow: /\n\n` +
    `User-agent: AhrefsSiteAudit\nAllow: /\n\n` +
    `User-agent: Screaming Frog SEO Spider\nAllow: /\n\n` +
    `User-agent: GPTBot\nAllow: /\n\n` +
    `User-agent: ChatGPT-User\nAllow: /\n\n` +
    `User-agent: OAI-SearchBot\nAllow: /\n\n` +
    `User-agent: PerplexityBot\nAllow: /\n\n` +
    `User-agent: Perplexity-User\nAllow: /\n\n` +
    `User-agent: Google-Extended\nAllow: /\n\n` +
    `User-agent: Googlebot\nAllow: /\n\n` +
    `User-agent: Bingbot\nAllow: /\n\n` +
    `User-agent: Applebot\nAllow: /\n\n` +
    `User-agent: Applebot-Extended\nAllow: /\n\n` +
    `User-agent: ClaudeBot\nAllow: /\n\n` +
    `User-agent: Claude-Web\nAllow: /\n\n` +
    `User-agent: anthropic-ai\nAllow: /\n\n` +
    `User-agent: cohere-ai\nAllow: /\n\n` +
    `User-agent: CCBot\nAllow: /\n\n` +
    `User-agent: FacebookBot\nAllow: /\n\n` +
    `User-agent: Amazonbot\nAllow: /\n\n` +
    `Sitemap: ${SITE_HOST.replace(/\/$/, '')}/sitemap.xml\n`;

  const robotsOut = `${OUT_DIR}/robots.txt`;
  writeFileSync(robotsOut, robots);
  console.log(`  ✓ robots.txt`);
}

// ────────────────────────────────────────────────────────────────────
// Per-route prerender
// ────────────────────────────────────────────────────────────────────
const LIVE_HOST = 'https://premierpartycruises.com';
const SPA_INDEX_PATH = `${OUT_DIR}/index.html`;

/** Extract the Vite-built bundle + stylesheet tags from the SPA shell
 * so we can inject them into pre-rendered pages (keeps React hydrating
 * on top of the server-rendered content). */
function readSpaHead() {
  if (!existsSync(SPA_INDEX_PATH)) return null;
  const html = readFileSync(SPA_INDEX_PATH, 'utf8');
  // Grab every <link rel="stylesheet"> + <script type="module"> from the
  // built index.html. Those hashes change every deploy.
  const links = [...html.matchAll(/<link[^>]+rel="(?:stylesheet|modulepreload)"[^>]*>/g)].map((m) => m[0]).join('\n    ');
  const scripts = [...html.matchAll(/<script[^>]+type="module"[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]).join('\n    ');
  return { links, scripts };
}

/** Slug list from the sitemap we just wrote (+ a few routes that are
 * client-only but important for SEO). */
function extractSlugs(sitemapXml) {
  const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const slugs = new Set();
  for (const url of locs) {
    try {
      const u = new URL(url);
      const path = u.pathname.replace(/\/$/, '') || '/';
      // Skip /admin* + /lead-dashboard + /customer-dashboard + /quote*
      if (/^\/(?:admin|lead-dashboard|customer-dashboard|quote)/.test(path)) continue;
      slugs.add(path);
    } catch { /* ignore */ }
  }
  return Array.from(slugs);
}

/** Fetch a page's live server-rendered HTML, rewrite hostnames, and
 * swap in the fresh Vite bundle. Returns null if the fetch fails. */
async function prerenderOne(slug, canonicalHost, spaHead) {
  const url = `${LIVE_HOST}${slug === '/' ? '/' : slug}`;
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PPC-SEO-Prerender)' },
    });
    if (!res.ok) return null;
    let html = await res.text();

    // Rewrite live host → canonical host for <link rel="canonical">,
    // Open Graph URL, Twitter URL, JSON-LD, etc.
    html = html.replace(/https?:\/\/(?:www\.)?premierpartycruises\.com/g, canonicalHost.replace(/\/$/, ''));

    // Defense-in-depth: strip any Replit development hosts that the live
    // origin might accidentally leak into <head> (favicon, OG image, dev
    // banner). Rewrite to canonical so paths still resolve.
    html = html.replace(/https?:\/\/[a-z0-9-]+\.(?:replit\.dev|repl\.co|replit\.app)/gi, canonicalHost.replace(/\/$/, ''));

    // Strip the live app's own <script> bundle references (Replit/Vite
    // on the production domain has different hashes from our Netlify
    // build). Replace with our Netlify build's bundle.
    if (spaHead) {
      // Remove every existing <script type="module"> block and Vite
      // stylesheet reference.
      html = html.replace(/<script[^>]+type="module"[^>]*>[\s\S]*?<\/script>/g, '');
      html = html.replace(/<link[^>]+rel="(?:stylesheet|modulepreload)"[^>]*>/g, '');
      // Inject fresh ones right before </head>.
      html = html.replace(/<\/head>/i, `    ${spaHead.links}\n    ${spaHead.scripts}\n  </head>`);
    }

    return html;
  } catch {
    return null;
  }
}

async function prerenderRoutes(sitemapXml, canonicalHost) {
  if (process.env.SKIP_PRERENDER === '1') {
    console.log('Per-route prerender skipped (SKIP_PRERENDER=1).');
    return;
  }
  const spaHead = readSpaHead();
  if (!spaHead) {
    console.warn('No dist/public/index.html — skipping prerender.');
    return;
  }

  const slugs = extractSlugs(sitemapXml);
  console.log(`Prerendering ${slugs.length} routes from ${LIVE_HOST}...`);

  // Small concurrency to stay polite on the live origin.
  const CONCURRENCY = 6;
  let done = 0;
  let ok = 0;
  let fail = 0;

  async function worker(queue) {
    while (queue.length) {
      const slug = queue.shift();
      if (!slug) continue;
      const html = await prerenderOne(slug, canonicalHost, spaHead);
      done++;
      if (html) {
        const outPath = slug === '/' ? `${OUT_DIR}/index.html` : `${OUT_DIR}${slug}/index.html`;
        try {
          mkdirSync(dirname(outPath), { recursive: true });
          writeFileSync(outPath, html);
          ok++;
        } catch (e) {
          console.warn(`  ✗ write ${outPath}: ${e.message}`);
          fail++;
        }
      } else {
        fail++;
      }
      if (done % 20 === 0) {
        console.log(`  …${done}/${slugs.length} (${ok} ok, ${fail} fail)`);
      }
    }
  }

  const queue = [...slugs];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker(queue)),
  );
  console.log(`Prerender complete: ${ok} ok, ${fail} fail.`);
}

main()
  .then(async () => {
    try {
      const sitemapXml = readFileSync(`${OUT_DIR}/sitemap.xml`, 'utf8');
      await prerenderRoutes(sitemapXml, CANONICAL_HOST);
    } catch (e) {
      console.warn('Skipping prerender:', e.message);
    }
  })
  .catch((e) => {
    console.error('SEO file generation failed:', e);
    process.exit(0);
  });
