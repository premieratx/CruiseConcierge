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
import { getOverlay, shouldOverrideLive } from './v2-seo-overlay.mjs';
import { getRichContent } from './v2-rich-content.mjs';

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
//
// Audit Round 5 surfaced "195 incorrect pages found in sitemap.xml" — that
// was Semrush flagging URLs in <loc> that didn't match the page's <link
// rel="canonical">. The V2 Netlify sitemap listed V2 URLs but every page's
// canonical pointed at premierpartycruises.com, so Semrush treated all 195
// as canonical-mismatched.
//
// Resolution: CANONICAL_HOST defaults to SITE_HOST (V2 Netlify is its own
// SEO canonical → sitemap and canonical agree → audit clean). To run V2 as
// a non-canonical staging deploy whose canonical points at the production
// apex, set CANONICAL_HOST=https://premierpartycruises.com explicitly in
// Netlify env vars. Default is V2-canonical for clean audits.
//
// SITE_HOST prefers Netlify's `URL` (primary site URL) over `DEPLOY_PRIME_URL`
// (branch-deploy URL prefixed with the branch name, e.g.
// https://seo-fixes-only--site.netlify.app) so the sitemap host matches the
// host audit tools point at.
const SITE_HOST =
  process.env.SITE_HOST ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  'https://premier-party-cruises-v2.netlify.app';
// We deliberately IGNORE process.env.CANONICAL_HOST here unless the build
// is explicitly opted into staging mode (STAGING_CANONICAL=1). Otherwise a
// stale CANONICAL_HOST=https://premierpartycruises.com env var (left over
// from when V2 was a non-canonical staging deploy) would cause every
// canonical link to mismatch the sitemap and trigger Semrush's "195
// incorrect pages" audit error.
const CANONICAL_HOST =
  (process.env.STAGING_CANONICAL === '1' && process.env.CANONICAL_HOST) ||
  SITE_HOST;
if (process.env.CANONICAL_HOST && process.env.STAGING_CANONICAL !== '1') {
  console.warn(`Note: CANONICAL_HOST="${process.env.CANONICAL_HOST}" env var is being IGNORED.`);
  console.warn('To use it, also set STAGING_CANONICAL=1 in Netlify env vars.');
  console.warn(`Canonical defaulting to SITE_HOST="${SITE_HOST}" so sitemap + canonical agree.`);
}

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

  // Netlify with pretty URLs ON serves /pricing as 200 (from /pricing.html
  // or /pricing/index.html), and 301-redirects /pricing/ → /pricing. So the
  // canonical serving form on Netlify is NO trailing slash. Strip trailing
  // slashes in <loc> entries so the sitemap matches what's actually served
  // and Semrush doesn't flag every entry as a 301-redirected URL.
  sitemap = sitemap.replace(/<loc>([^<]+)<\/loc>/g, (m, url) => {
    try {
      const u = new URL(url);
      if (u.pathname === '/' || /\.[a-z0-9]+$/i.test(u.pathname)) return m;
      u.pathname = u.pathname.replace(/\/+$/, '');
      return `<loc>${u.toString()}</loc>`;
    } catch {
      return m;
    }
  });

  // ────────────────────────────────────────────────────────────────────
  // Sitemap drop list — known non-canonical URLs that Replit's sitemap
  // accidentally lists. The actual blog post lives at the -austin
  // suffixed slug, but the sitemap also has the un-suffixed variant which
  // 404s / canonicalizes to the suffixed version. Semrush flags it as
  // "incorrect page found in sitemap.xml" because the URL in <loc> does
  // not match the canonical of any served page.
  //
  // Add new entries here as we discover them; each entry strips the
  // matching <url>...</url> block from the sitemap so the URL never
  // reaches the audit tool.
  // ────────────────────────────────────────────────────────────────────
  const SITEMAP_DROP_PATHS = [
    '/blogs/all-inclusive-corporate-packages',  // canonical is /blogs/all-inclusive-corporate-packages-austin
  ];
  for (const dropPath of SITEMAP_DROP_PATHS) {
    const dropRe = new RegExp(
      `\\s*<url>[^<]*<loc>[^<]*${dropPath.replace(/[-/]/g, (c) => '\\' + c)}<\\/loc>[\\s\\S]*?<\\/url>`,
      'g',
    );
    sitemap = sitemap.replace(dropRe, '');
  }

  // V2-only routes that don't exist on the Replit main site yet.
  // Append these so Google can discover them via sitemap.xml on V2.
  const V2_ONLY_ROUTES = [
    '/premier-vs-float-on',
    '/premier-vs-austin-party-boat',
    '/premier-vs-pontoon',
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
    // Two-Mode Vibe expansion (Command Center AI Strategy #3 + others)
    '/sweet-16-party-boat',
    '/family-cruises',
    '/executive-cruises',
    '/sunset-anniversary-cruise',
    '/lake-bachelor-bachelorette',
    '/canada-to-austin-bachelorette',
  ];
  const host = SITE_HOST.replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  const alreadyPresent = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

  // ────────────────────────────────────────────────────────────────────
  // PILLAR / BRANCH SITE STRUCTURE
  // ────────────────────────────────────────────────────────────────────
  // Information architecture for SEO + AI visibility crawlers. Each tier
  // gets a specific <priority> + <changefreq> in the sitemap so search
  // engines can spend crawl budget on the most important pages first.
  // The same hierarchy is mirrored in BreadcrumbList JSON-LD per page
  // (see prerenderOne) so AI LLMs understand the canonical site graph.
  //
  //   TIER 1 (1.0): / — canonical entry point
  //   TIER 2 (0.9): top-level service pillars (private, disco, pricing,
  //                  safety, plan, faq, contact)
  //   TIER 3 (0.8): occasion branches (bachelor, bachelorette, corporate,
  //                  wedding, birthday, family, sweet-16, anniversary,
  //                  lake-bach, executive, family-cruises, etc.)
  //   TIER 4 (0.7): comparison + guide content (premier-vs-*, *-guide,
  //                  itineraries, what-to-bring, party-bus, canada)
  //   TIER 5 (0.5): /blogs/* leaves
  //
  // Branch pages also link UP to their pillar via the "Related Premier
  // guides" aside injected by prerenderOne.
  const TIER_1 = new Set(['/']);
  const TIER_2 = new Set([
    '/private-cruises', '/atx-disco-cruise', '/pricing', '/pricing-breakdown',
    '/safety', '/plan-your-trip', '/faq', '/contact', '/gallery', '/testimonials-faq',
  ]);
  const TIER_3 = new Set([
    '/bachelor-party-austin', '/bachelorette-party-austin',
    '/combined-bachelor-bachelorette-austin', '/corporate-events',
    '/wedding-parties', '/birthday-parties', '/family-reunion-cruise',
    '/party-boat-austin', '/party-boat-lake-travis',
    // Two-Mode Vibe + niche occasion branches (shipped 2026-04-26)
    '/sweet-16-party-boat', '/family-cruises', '/executive-cruises',
    '/sunset-anniversary-cruise', '/lake-bachelor-bachelorette',
  ]);
  const TIER_4 = new Set([
    '/premier-vs-pontoon', '/premier-vs-float-on', '/premier-vs-austin-party-boat',
    '/best-austin-party-boat', '/lake-travis-boat-rental-guide',
    '/austin-party-boat-pricing-guide', '/austin-corporate-event-guide',
    '/austin-bachelorette-itinerary', '/austin-bachelor-itinerary',
    '/combined-bach-itinerary', '/what-to-bring-on-a-party-boat',
    '/austin-party-bus-shuttle', '/canada-to-austin-bachelorette',
  ]);

  function tierFor(path) {
    const p = path === '/' ? '/' : path.replace(/\/$/, '');
    if (TIER_1.has(p)) return { priority: '1.0', changefreq: 'daily' };
    if (TIER_2.has(p)) return { priority: '0.9', changefreq: 'weekly' };
    if (TIER_3.has(p)) return { priority: '0.8', changefreq: 'weekly' };
    if (TIER_4.has(p)) return { priority: '0.7', changefreq: 'monthly' };
    if (p.startsWith('/blogs')) return { priority: '0.5', changefreq: 'monthly' };
    return { priority: '0.6', changefreq: 'monthly' };
  }

  // Append V2-only routes that aren't already in the rewritten sitemap.
  const v2Urls = V2_ONLY_ROUTES
    .map((p) => ({ url: `${host}${p}`, path: p }))
    .filter(({ url }) => !alreadyPresent.has(url))
    .map(({ url, path }) => {
      const t = tierFor(path);
      return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${t.changefreq}</changefreq>\n    <priority>${t.priority}</priority>\n  </url>`;
    })
    .join('\n');
  if (v2Urls) {
    sitemap = sitemap.replace('</urlset>', `${v2Urls}\n</urlset>`);
  }

  // Rewrite ALL existing <priority> + <changefreq> tags in the sitemap
  // to match our pillar/branch tiers. This overrides whatever Replit's
  // sitemap generator picked, so V2's IA matches its actual structure.
  sitemap = sitemap.replace(
    /<url>([\s\S]*?)<\/url>/g,
    (block, inner) => {
      const locM = inner.match(/<loc>([^<]+)<\/loc>/);
      if (!locM) return block;
      let path;
      try { path = new URL(locM[1]).pathname || '/'; } catch { return block; }
      const t = tierFor(path);
      let next = inner;
      if (/<priority>/.test(next)) {
        next = next.replace(/<priority>[^<]+<\/priority>/, `<priority>${t.priority}</priority>`);
      } else {
        next += `\n    <priority>${t.priority}</priority>`;
      }
      if (/<changefreq>/.test(next)) {
        next = next.replace(/<changefreq>[^<]+<\/changefreq>/, `<changefreq>${t.changefreq}</changefreq>`);
      } else {
        next += `\n    <changefreq>${t.changefreq}</changefreq>`;
      }
      return `<url>${next}</url>`;
    },
  );

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

  // llms.txt — per https://llmstxt.org/, a Markdown document that tells
  // LLM crawlers how to navigate the site. Without this, Netlify's SPA
  // catch-all serves the React shell for /llms.txt and audit tools flag
  // "Llms.txt file has formatting issues".
  const siteBase = SITE_HOST.replace(/\/$/, '');
  const canonical = CANONICAL_HOST.replace(/\/$/, '');
  const llmsTxt = `# Premier Party Cruises

> Austin's longest-running Lake Travis party boat fleet. Private charters
> for 14–75 guests, the public ATX Disco Cruise from $85/person, and
> event production for bachelor/bachelorette parties, corporate outings,
> weddings, family reunions, and milestone birthdays. 15+ years, 150,000+
> guests, zero safety incidents. Departs Anderson Mill Marina, 25 minutes
> from downtown Austin. BYOB with Party On Delivery drink set-up.

## Book

- [Home](${canonical}/): Overview + instant quote.
- [Pricing](${canonical}/pricing): ATX Disco Cruise from $85/person. Private charters from $200/hour. All-in pricing includes captain, fuel, tax, 20% gratuity.
- [Plan Your Trip](${canonical}/plan-your-trip): Driving directions, Uber/Lyft estimates, party-bus coordination, Anderson Mill Marina parking (free, no stairs), arrival timing, BYOB + Party On Delivery, packing list, accessibility.
- [Safety](${canonical}/safety): TPWD-licensed captains, CPR-certified crew, 15+ year perfect record, child + infant life jackets on every boat.
- [Contact](${canonical}/contact): Direct booking contact.

## Experiences

- [ATX Disco Cruise](${canonical}/atx-disco-cruise): Public shared sailing on Clever Girl. 21+. All-inclusive per-ticket pricing. March–October weekends.
- [Private Cruises](${canonical}/private-cruises): Book the whole boat. Day Tripper (14), Meeseeks or The Irony (25–30), Clever Girl (75). All ages welcome on private charters.
- [Bachelor Parties](${canonical}/bachelor-party-austin): Austin bachelor party boat rentals on Lake Travis.
- [Bachelorette Parties](${canonical}/bachelorette-party-austin): Austin bachelorette party boat rentals on Lake Travis.
- [Corporate Events](${canonical}/corporate-events): Team building, client entertainment, holiday parties, company milestones.
- [Weddings](${canonical}/wedding-parties): Welcome parties, rehearsal dinners, bridal-party day cruises, after-parties, day-after send-offs.
- [Birthday Parties](${canonical}/birthday-parties): Milestone birthdays, Sweet 16, graduation cruises.
- [Family Reunions](${canonical}/family-reunion-cruise): All ages, shaded seating, ADA-accessible larger boats.

## Comparisons

- [Premier vs Float On](${canonical}/premier-vs-float-on): Comparison with river tubing.
- [Premier vs ATX Party Boats](${canonical}/premier-vs-austin-party-boat): Comparison with the closest direct competitor.
- [Best Austin Party Boat](${canonical}/best-austin-party-boat): Ranked overview of Lake Travis party boat operators.
- [Lake Travis Boat Rental Guide](${canonical}/lake-travis-boat-rental-guide): Complete guide to party boat rentals on Lake Travis.

## Pricing reference

- All listed prices are STARTING BASE RATES. Texas sales tax (8.25%) and a 20% gratuity for the captain + crew are added on top as transparent line items at checkout.
- Private charter base rates: $200/hour on Day Tripper (14-guest barge), $225/hour on Meeseeks and The Irony (25–30 guests), $250/hour on Clever Girl (75-guest flagship). 4-hour minimum on weekends, 3-hour minimum on weekdays.
- ATX Disco Cruise base prices per person: $85 (Friday 12–4 PM), $95 (Saturday 11 AM–3 PM), $105 (Saturday 3:30–7:30 PM).
- The base rate includes captain, fuel, premium audio, coolers, life jackets, on-board restroom, and Anderson Mill Marina access.
- Fair refund policy: all weather-caused cancellations get FREE reschedules.

## Key facts

- Operator: Premier Party Cruises (B Hill Entertainment, LLC)
- Years operating: 15+
- Total guests served: 150,000+
- Safety incidents: 0
- Departure marina: Anderson Mill Marina, 13993 FM 2769, Leander TX 78641
- Drive time from downtown Austin: 25 minutes via 183 North
- Parking: free, right next to dock, no stairs to the boat
- Beverage policy: BYOB (cans + plastic only, no glass). Party On Delivery sister company handles pre-iced drink set-up on request.
- Alcohol: 21+ required to consume. Private charters welcome all ages; the public ATX Disco Cruise is 21+ only.

## Sitemap

${siteBase}/sitemap.xml
`;
  writeFileSync(`${OUT_DIR}/llms.txt`, llmsTxt);
  console.log(`  ✓ llms.txt`);
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
/**
 * Build a slug-derived minimal HTML when the live-origin fetch fails.
 * This is a LAST RESORT fallback: it produces a unique per-route title +
 * description + H1 + canonical so the route is never indistinguishable from
 * the SPA shell. Real content is still delivered client-side by React on
 * hydrate; this only exists so crawlers (Semrush, Google, AI LLMs) see a
 * distinct document per URL.
 */
function synthesizeFallbackHtml(slug, canonicalHost, spaHead) {
  // Prefer the V2 SEO overlay (curated + template) for title/description/H1
  // so the fallback HTML is still V2-optimized, not a generic slug title.
  const overlay = getOverlay(slug);
  const rich = getRichContent(slug);
  const fullTitle = overlay?.title || 'Austin Party Boat Rentals on Lake Travis | Premier Party Cruises';
  const description = overlay?.description || "Austin's longest-running Lake Travis party boat fleet. Private charters 14–75 guests, ATX Disco Cruise from $85/person, weddings, corporate, bach parties. BYOB + Party On Delivery.";
  const heading = overlay?.h1 || 'Austin Party Boat Rentals on Lake Travis';
  const canonical = `${canonicalHost.replace(/\/$/, '')}${slug === '/' ? '/' : slug}`;

  const linksAndScripts = spaHead ? `${spaHead.links}\n    ${spaHead.scripts}\n  ` : '';

  // Build rich body content if we have it for this route. This is what fixes
  // "low word count" / "low text-HTML ratio" findings on V2-only routes that
  // the live origin can't produce.
  let richHtml = '';
  let faqSchema = '';
  if (rich) {
    const intro = rich.intro ? `<p>${rich.intro}</p>` : '';
    const sections = (rich.sections || [])
      .map((s) => {
        const ps = (s.paragraphs || []).map((p) => `<p>${p}</p>`).join('\n        ');
        return `<section>\n        <h2>${s.heading}</h2>\n        ${ps}\n      </section>`;
      })
      .join('\n      ');
    const faqs = rich.faqs || [];
    const faqsHtml = faqs.length
      ? `<section>\n        <h2>Frequently asked questions</h2>\n        ${faqs
          .map((f) => `<div>\n          <h3>${f.q}</h3>\n          <p>${f.a}</p>\n        </div>`)
          .join('\n        ')}\n      </section>`
      : '';
    richHtml = `${intro}\n      ${sections}\n      ${faqsHtml}`;
    if (faqs.length) {
      const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      };
      faqSchema = `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`;
    }
  } else {
    richHtml = `<p>Premier Party Cruises has operated on Lake Travis for 15+ years with 150,000+ guests and zero safety incidents. Fleet: Day Tripper (14 guests), Meeseeks and The Irony (25–30), Clever Girl (75). Departs Anderson Mill Marina, 25 minutes from downtown Austin, free parking, no stairs to the boat. BYOB + Party On Delivery drink set-up. Fair refund policy with FREE weather reschedules.</p>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${fullTitle}</title>
    <meta name="description" content="${description}" />${
      Array.isArray(overlay?.keywords) && overlay.keywords.length
        ? `\n    <meta name="keywords" content="${escapeAttr(overlay.keywords.slice(0, 8).join(', '))}" />`
        : ''
    }
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${description}" />
    ${faqSchema}
    <script type="application/ld+json" data-breadcrumb="auto">${JSON.stringify(buildBreadcrumb(slug, canonicalHost, overlay))}</script>
    ${linksAndScripts}
  </head>
  <body>
    <div id="root">
      <main>
        <h1>${heading}</h1>
        <p><em>${description}</em></p>
        ${richHtml}
        <nav aria-label="Key pages">
          <a href="/">Home</a>
          <a href="/pricing">Pricing</a>
          <a href="/private-cruises">Private charters</a>
          <a href="/atx-disco-cruise">ATX Disco Cruise</a>
          <a href="/plan-your-trip">Plan your trip</a>
          <a href="/safety">Safety</a>
          <a href="/bachelor-party-austin">Bachelor</a>
          <a href="/bachelorette-party-austin">Bachelorette</a>
          <a href="/corporate-events">Corporate</a>
          <a href="/wedding-parties">Weddings</a>
          <a href="/family-reunion-cruise">Family reunions</a>
          <a href="/gallery">Gallery</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
        </nav>
        <aside aria-label="Related Premier guides">
          <h2>Related Premier guides</h2>
          <ul>
            <li><a href="/blogs/all-inclusive-corporate-packages-austin">All-Inclusive Corporate Packages — Austin</a></li>
            <li><a href="/blogs/austin-bachelor-party-january">Austin Bachelor Party in January</a></li>
            <li><a href="/blogs/austin-bachelorette-party-february">Austin Bachelorette in February</a></li>
            <li><a href="/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide">Lake Travis Boat Party Regulations</a></li>
            <li><a href="/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises">Lake Travis Boat Safety + Maintenance</a></li>
          </ul>
        </aside>
        ${pillarUpLinkBlock(slug)}
      </main>
    </div>
  </body>
</html>`;
}

/**
 * Title-length safety pass — Semrush flags titles over ~60 chars as "too
 * much text within the title tags". Many of Replit's blog titles end with
 * a redundant " | Lake Travis" suffix that pushes them just over the line.
 * If a title is too long:
 *   1) Strip the trailing redundant " | Lake Travis" suffix
 *   2) If still too long, strip the trailing " | <anything>" segment until
 *      under the limit
 *   3) As a last resort, hard-truncate at a word boundary with an ellipsis
 *
 * Returns { title, changed } so we can also update og:title / twitter:title
 * to match.
 */
const TITLE_MAX = 60;
function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
function shortenTitle(title) {
  if (!title) return { title, changed: false };
  // Decode any pre-existing HTML entities so length math is char-accurate
  // and we don't double-encode on write.
  const original = decodeEntities(title.trim());
  let t = original;
  if (t.length <= TITLE_MAX) return { title: t, changed: t !== title.trim() };

  // 1) Strip redundant trailing " | Lake Travis" / " - Lake Travis" suffix
  const redundant = /\s*[|·\-—]\s*Lake Travis\s*$/i;
  if (redundant.test(t)) {
    t = t.replace(redundant, '');
    if (t.length <= TITLE_MAX) return { title: t, changed: true };
  }

  // 2) Strip trailing " | / · / — / – / - <segment>" segments until under
  // the limit (preserve at least the head so we don't chop too aggressively)
  while (t.length > TITLE_MAX) {
    const cuts = ['|', '·', '—', '–'].map((c) => t.lastIndexOf(c));
    const cut = Math.max(...cuts);
    if (cut <= 0) break;
    const head = t.slice(0, cut).trim();
    if (head.length < 20) break;
    t = head;
  }
  if (t.length <= TITLE_MAX) return { title: t, changed: true };

  // 3) Hard truncate at a word boundary with ellipsis
  const words = t.split(/\s+/);
  let acc = '';
  for (const w of words) {
    if ((acc + ' ' + w).trim().length > TITLE_MAX - 1) break;
    acc = (acc ? acc + ' ' : '') + w;
  }
  return { title: acc + '…', changed: true };
}

/**
 * PILLAR / BRANCH MAP for BreadcrumbList JSON-LD + cross-linking.
 *
 * Mirrors the TIER classification used in main()'s sitemap generator.
 * Each branch maps to a parent pillar slug. Top-level pillars and the
 * home route map to themselves and emit a 1-step breadcrumb.
 *
 * AI LLMs (ChatGPT, Perplexity, Gemini, Google AI Mode) explicitly read
 * BreadcrumbList JSON-LD to understand site IA. Each prerendered page
 * gets its own breadcrumb chain so the model knows
 * "Lake bachelor party → private cruises → home."
 */
const PILLAR_OF = {
  // Branches under /private-cruises pillar
  '/bachelor-party-austin': '/private-cruises',
  '/bachelorette-party-austin': '/private-cruises',
  '/combined-bachelor-bachelorette-austin': '/private-cruises',
  '/corporate-events': '/private-cruises',
  '/wedding-parties': '/private-cruises',
  '/birthday-parties': '/private-cruises',
  '/family-reunion-cruise': '/private-cruises',
  '/sweet-16-party-boat': '/private-cruises',
  '/family-cruises': '/private-cruises',
  '/executive-cruises': '/private-cruises',
  '/sunset-anniversary-cruise': '/private-cruises',
  '/lake-bachelor-bachelorette': '/private-cruises',
  '/party-boat-austin': '/private-cruises',
  '/party-boat-lake-travis': '/private-cruises',
  // Branches under /pricing pillar
  '/pricing-breakdown': '/pricing',
  '/austin-party-boat-pricing-guide': '/pricing',
  '/premier-vs-pontoon': '/pricing',
  // Branches under /plan-your-trip pillar
  '/austin-party-bus-shuttle': '/plan-your-trip',
  '/what-to-bring-on-a-party-boat': '/plan-your-trip',
  '/lake-travis-boat-rental-guide': '/plan-your-trip',
  // Branches under /faq pillar
  '/testimonials-faq': '/faq',
  // Comparison + research pages — pillar = best-austin-party-boat
  '/best-austin-party-boat': '/',
  '/premier-vs-float-on': '/best-austin-party-boat',
  '/premier-vs-austin-party-boat': '/best-austin-party-boat',
  // Itineraries — pillar = bachelor / bachelorette
  '/austin-bachelor-itinerary': '/bachelor-party-austin',
  '/austin-bachelorette-itinerary': '/bachelorette-party-austin',
  '/combined-bach-itinerary': '/combined-bachelor-bachelorette-austin',
  '/canada-to-austin-bachelorette': '/bachelorette-party-austin',
  // Pillars themselves
  '/private-cruises': '/',
  '/atx-disco-cruise': '/',
  '/pricing': '/',
  '/safety': '/',
  '/plan-your-trip': '/',
  '/faq': '/',
  '/contact': '/',
  '/gallery': '/',
  '/austin-corporate-event-guide': '/corporate-events',
};

const PILLAR_LABELS = {
  '/': 'Home',
  '/private-cruises': 'Private Charters',
  '/atx-disco-cruise': 'ATX Disco Cruise',
  '/pricing': 'Pricing',
  '/safety': 'Safety',
  '/plan-your-trip': 'Plan Your Trip',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/gallery': 'Gallery',
  '/best-austin-party-boat': 'Comparisons',
  '/bachelor-party-austin': 'Bachelor Party',
  '/bachelorette-party-austin': 'Bachelorette Party',
  '/combined-bachelor-bachelorette-austin': 'Combined Bach',
  '/corporate-events': 'Corporate Events',
};

function buildBreadcrumb(slug, canonicalHost, overlay) {
  const norm = slug === '/' ? '/' : slug.replace(/\/$/, '');
  const pillar = PILLAR_OF[norm] || '/';
  const chain = [];
  // Walk up: leaf → pillar → home
  if (norm !== '/') {
    chain.push({ slug: norm, name: overlay?.h1 || PILLAR_LABELS[norm] || norm.replace(/^\//, '').replace(/-/g, ' ') });
    if (pillar !== '/' && pillar !== norm) {
      chain.push({ slug: pillar, name: PILLAR_LABELS[pillar] || pillar.replace(/^\//, '').replace(/-/g, ' ') });
    }
  }
  chain.push({ slug: '/', name: 'Premier Party Cruises' });
  // BreadcrumbList wants ROOT-FIRST order
  const items = chain.reverse().map((step, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: step.name,
    item: `${canonicalHost.replace(/\/$/, '')}${step.slug === '/' ? '/' : step.slug}`,
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function pillarUpLinkBlock(slug) {
  const norm = slug === '/' ? '/' : slug.replace(/\/$/, '');
  const pillar = PILLAR_OF[norm];
  if (!pillar || pillar === norm) return '';
  const label = PILLAR_LABELS[pillar] || pillar.replace(/^\//, '').replace(/-/g, ' ');
  return `<aside aria-label="Part of" data-pillar-link="up"><p>Part of <a href="${pillar}">${escapeHtml(label)}</a> on Premier Party Cruises.</p></aside>`;
}

/** Apply the V2 SEO overlay to a fetched HTML document. OVERWRITES the
 * <title>, <meta name=description>, og/twitter variants, and injects/rewrites
 * the first <h1> so every V2 route ships with V2-optimized metadata — not
 * a straight copy of the live site. */
function applyOverlay(html, overlay) {
  if (!overlay) return html;
  const { title, description, h1, keywords } = overlay;

  // <meta name="keywords"> — Semrush, Ahrefs, and most AI crawlers DO read
  // the keywords meta tag (Google ignores it for ranking but uses it as a
  // topical hint, and AI Mode + Perplexity surface it as one signal among
  // many). We inject the curated overlay's keyword cluster on every route.
  if (Array.isArray(keywords) && keywords.length) {
    const kw = keywords.slice(0, 8).join(', ');
    if (/<meta\s+name=["']keywords["'][^>]*>/i.test(html)) {
      html = html.replace(/<meta\s+name=["']keywords["'][^>]*>/i, `<meta name="keywords" content="${escapeAttr(kw)}" />`);
    } else {
      html = html.replace(/<\/head>/i, `  <meta name="keywords" content="${escapeAttr(kw)}" />\n  </head>`);
    }
  }

  // <title>
  if (title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  }
  // meta description (name=description)
  if (description) {
    if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
      html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeAttr(description)}" />`);
    } else {
      html = html.replace(/<\/head>/i, `  <meta name="description" content="${escapeAttr(description)}" />\n  </head>`);
    }
    // og:description
    html = html.replace(/<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeAttr(description)}" />`);
    if (!/<meta\s+property=["']og:description["']/i.test(html)) {
      html = html.replace(/<\/head>/i, `  <meta property="og:description" content="${escapeAttr(description)}" />\n  </head>`);
    }
    // twitter:description
    html = html.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeAttr(description)}" />`);
  }
  // og:title + twitter:title
  if (title) {
    html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeAttr(title)}" />`);
    html = html.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeAttr(title)}" />`);
  }
  // H1 — rewrite the first on-page <h1>, or inject at top of <body> if missing.
  if (h1) {
    if (/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) {
      html = html.replace(/<h1\b([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${escapeHtml(h1)}</h1>`);
    } else {
      html = html.replace(/<body\b([^>]*)>/i, `<body$1>\n    <h1 data-seo-injected="true" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">${escapeHtml(h1)}</h1>`);
    }
  }
  return html;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function prerenderOne(slug, canonicalHost, spaHead) {
  const url = `${LIVE_HOST}${slug === '/' ? '/' : slug}`;
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PPC-SEO-Prerender)' },
      // Build runners sometimes have a very short default timeout against
      // an origin that takes 1-3s to render — override explicitly.
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.warn(`  ✗ ${slug} → ${res.status} ${res.statusText}`);
      return null;
    }
    let html = await res.text();
    if (html.length < 500) {
      console.warn(`  ✗ ${slug} → only ${html.length} bytes, likely stub`);
      return null;
    }

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

    // V2 SEO overlay — OVERWRITE the inherited title/description/H1 with
    // V2-optimized metadata.
    //
    // Curated routes ALWAYS get overwritten (we hand-wrote those titles).
    //
    // For non-curated (long-tail / blog) routes, we only override if the
    // live origin returned the SPA-shell fallback — i.e. its title is the
    // generic "Austin Party Boat Rentals | Lake Travis Cruises" or similar
    // brand fallback that's identical across many routes. If we leave
    // those alone, Semrush flags 40+ pages as sharing one title+H1 pair.
    const overlay = getOverlay(slug);
    if (overlay) {
      const liveTitleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
      const liveTitle = liveTitleMatch ? decodeEntities(liveTitleMatch[1]).trim() : '';
      const isSpaShellFallback =
        !liveTitle ||
        /Austin Party Boat Rentals\s*\|\s*Lake Travis Cruises/i.test(liveTitle) ||
        /Premier Party Cruises\s*-\s*Austin Lake Travis Party Boats/i.test(liveTitle) ||
        liveTitle.toLowerCase() === 'premier party cruises';
      if (shouldOverrideLive(slug) || isSpaShellFallback) {
        html = applyOverlay(html, overlay);
      }
    }

    // ────────────────────────────────────────────────────────────────
    // BREADCRUMBLIST JSON-LD + PILLAR UP-LINK
    // ────────────────────────────────────────────────────────────────
    // Every prerendered page emits a BreadcrumbList showing its position
    // in the pillar/branch hierarchy (root → pillar → leaf). AI LLMs
    // explicitly read this to understand site IA. Branch pages also get
    // a visible "Part of <pillar>" up-link so crawlers see the upward
    // edge in the link graph (boosts pillar PageRank).
    {
      const overlayForBreadcrumb = getOverlay(slug);
      const breadcrumb = buildBreadcrumb(slug, canonicalHost, overlayForBreadcrumb);
      const breadcrumbJsonLd = `<script type="application/ld+json" data-breadcrumb="auto">${JSON.stringify(breadcrumb)}</script>`;
      // Insert right before </head> so it's discoverable by every parser.
      if (/<\/head>/i.test(html)) {
        html = html.replace(/<\/head>/i, `${breadcrumbJsonLd}\n  </head>`);
      }
      const upBlock = pillarUpLinkBlock(slug);
      if (upBlock && /<\/body>/i.test(html)) {
        html = html.replace(/<\/body>/i, `${upBlock}\n</body>`);
      }
    }

    // ────────────────────────────────────────────────────────────────
    // INTERNAL LINK INJECTION
    // ────────────────────────────────────────────────────────────────
    // Boost orphan blog posts (Semrush "5 pages with only 1 incoming
    // internal link" notice) by injecting a "Related guides" footer on
    // every prerendered blog page. Each orphan slug here picks up an
    // extra inbound link from every blog post in the prerender pass.
    // After this lands, every orphan has ~50 inbound links instead of 1.
    if (slug.startsWith('/blogs')) {
      const ORPHAN_LINKS = [
        { href: '/blogs/all-inclusive-corporate-packages-austin', label: 'All-Inclusive Corporate Packages — Austin' },
        { href: '/blogs/austin-bachelor-party-january', label: 'Austin Bachelor Party in January — Winter Lake Travis Guide' },
        { href: '/blogs/austin-bachelorette-party-february', label: 'Austin Bachelorette in February — Valentine\'s Season' },
        { href: '/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide', label: 'Lake Travis Boat Party Regulations: Legal Compliance' },
        { href: '/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises', label: 'Lake Travis Boat Safety + Maintenance Standards' },
      ];
      // Don't link a page to itself.
      const links = ORPHAN_LINKS
        .filter((l) => l.href !== slug)
        .map((l) => `<li><a href="${l.href}">${escapeHtml(l.label)}</a></li>`)
        .join('');
      if (links) {
        const block = `\n<aside aria-label="Related Premier guides" data-internal-link-block="orphan-boost"><h2>Related Premier guides</h2><ul>${links}</ul></aside>\n`;
        // Inject right before </body> so it doesn't disturb the live
        // page's own layout. Crawlers + AI scrapers still see the links.
        if (/<\/body>/i.test(html)) {
          html = html.replace(/<\/body>/i, `${block}</body>`);
        } else {
          html += block;
        }
      }
    }

    // Title-length safety pass — Semrush flags > ~60 char titles. Strip
    // redundant trailing " | Lake Travis" and similar suffixes, hard-truncate
    // as a fallback. Applies to every prerendered route, regardless of
    // overlay, so blog titles + curated titles all stay under the limit.
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
      const original = titleMatch[1];
      const { title: shortened, changed } = shortenTitle(original);
      if (changed) {
        const safe = escapeHtml(shortened);
        html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safe}</title>`);
        html = html.replace(/<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeAttr(shortened)}" />`);
        html = html.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeAttr(shortened)}" />`);
      }
    }

    // ────────────────────────────────────────────────────────────────
    // H1 / TITLE DUPLICATE-PAIR FIX  (runs LAST, after title shortener)
    // ────────────────────────────────────────────────────────────────
    // Replit's blog posts ship with <title>="X | Lake Travis" (60 chars)
    // and <h1>="X" (no Lake-Travis suffix). When the title shortener
    // strips " | Lake Travis", the title collapses to "X" — which then
    // matches the H1 verbatim. Semrush flags ALL such pages as
    // "duplicate H1 and title tags" (43 pages on the previous audit).
    //
    // Fix: AFTER the title shortener runs, re-check title vs h1. If
    // they're now equal, replace ONLY the <h1> with the templateOverlay's
    // structurally-different version ("X — Premier's Austin Party Boat
    // Blog"). The unique title stays intact.
    if (!shouldOverrideLive(slug)) {
      const titleM2 = html.match(/<title>([\s\S]*?)<\/title>/i);
      const h1M2 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
      if (titleM2 && h1M2) {
        const tText = decodeEntities(titleM2[1]).replace(/\s+/g, ' ').replace(/…$/, '').trim();
        const hText = decodeEntities(h1M2[1].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
        // Compare case-insensitively + ignoring trailing punctuation so
        // we catch near-matches the shortener produced too.
        const norm = (s) => s.toLowerCase().replace(/[.…|·\-—–\s]+$/, '').trim();
        if (tText && hText && norm(tText) === norm(hText)) {
          const tpl = getOverlay(slug);
          if (tpl?.h1 && norm(tpl.h1) !== norm(tText)) {
            html = html.replace(/<h1\b([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${escapeHtml(tpl.h1)}</h1>`);
          }
        }
      }
    }

    return html;
  } catch (e) {
    console.warn(`  ✗ ${slug} → fetch error: ${e.message || e}`);
    return null;
  }
}

async function prerenderRoutes(sitemapXml, canonicalHost) {
  // ════════════════════════════════════════════════════════════════════
  // PRERENDER STEP — produces per-route /slug/index.html with real title,
  // description, h1, canonical, and schema inside the static HTML response.
  // If this step fails, every route ends up serving the SPA shell → 198
  // duplicate titles, 198 pages with no H1, and a useless Semrush audit.
  // The failures are VERY loud on purpose so Netlify build logs surface them.
  //
  // NOTE: The old SKIP_PRERENDER env-var bailout was removed. Every Netlify
  // deploy MUST prerender. The fallback path (slug-derived metadata) handles
  // the case where the live origin is unreachable, so there is no legitimate
  // reason to skip — skipping just ships 198 duplicate-title pages.
  // ════════════════════════════════════════════════════════════════════
  if (process.env.SKIP_PRERENDER === '1') {
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.warn('SKIP_PRERENDER=1 is IGNORED — running prerender anyway.');
    console.warn('Reason: skipping ships 198 duplicate-title pages.');
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
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

  let fallback = 0;

  async function worker(queue) {
    while (queue.length) {
      const slug = queue.shift();
      if (!slug) continue;
      let html;
      let usedFallback = false;
      // V2-only routes (the ones Replit's origin doesn't have a real React
      // page for — /safety, /plan-your-trip, /premier-vs-*, etc) hit Replit's
      // SPA shell which returns 200 + a generic title and no H1. Detect that
      // case by preferring our hand-written rich content if we have it for
      // the slug. This is what fixes "low word count" / "low text-HTML
      // ratio" findings on those V2-only pages.
      if (getRichContent(slug)) {
        html = synthesizeFallbackHtml(slug, canonicalHost, spaHead);
        usedFallback = true;
      } else {
        html = await prerenderOne(slug, canonicalHost, spaHead);
        if (!html) {
          html = synthesizeFallbackHtml(slug, canonicalHost, spaHead);
          usedFallback = true;
        }
      }
      done++;
      if (html) {
        const outPath = slug === '/' ? `${OUT_DIR}/index.html` : `${OUT_DIR}${slug}/index.html`;
        // Also write a sibling .html file (e.g. /pricing.html) so Netlify
        // serves both /pricing AND /pricing/ as 200 — no 301 redirects in
        // the sitemap path. Pretty-URL on Netlify will serve .html files at
        // the bare slug; the index.html under /slug/ serves the trailing-
        // slash form. With both on disk, neither URL form 301s.
        const siblingPath =
          slug === '/' ? null : `${OUT_DIR}${slug}.html`;
        try {
          mkdirSync(dirname(outPath), { recursive: true });
          writeFileSync(outPath, html);
          if (siblingPath) writeFileSync(siblingPath, html);
          if (usedFallback) fallback++; else ok++;
        } catch (e) {
          console.warn(`  ✗ write ${outPath}: ${e.message}`);
          fail++;
        }
      } else {
        fail++;
      }
      if (done % 20 === 0) {
        console.log(`  …${done}/${slugs.length} (${ok} live, ${fallback} fallback, ${fail} fail)`);
      }
    }
  }

  const queue = [...slugs];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker(queue)),
  );
  const total = ok + fallback + fail;
  console.log(`Prerender complete: ${ok} live / ${fallback} fallback / ${fail} fail (of ${total}).`);

  if (fallback > 0) {
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.warn(`⚠️  ${fallback} route(s) could not fetch from ${LIVE_HOST}.`);
    console.warn('⚠️  Those got a slug-derived fallback HTML — unique title +');
    console.warn('⚠️  description + H1 per route, but NOT the rich SSR content.');
    console.warn('⚠️  Crawlers will still index distinct pages; users hydrate React.');
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
  if (ok === 0 && fallback === 0) {
    console.error('❌ No prerendered files written at all. Build is broken.');
    process.exit(1);
  }
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
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('❌ SEO file generation failed:', e);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // Exit 1 so Netlify fails the build loudly instead of shipping a broken
    // static site where every route serves the SPA shell.
    process.exit(1);
  });
