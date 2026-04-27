# V2 → premierpartycruises.com cutover playbook

V2 currently lives at `https://premier-party-cruises-v2.netlify.app`.
This doc lists the **exact** steps to flip the apex DNS so V2 becomes
the canonical `premierpartycruises.com` site. **Nothing in this repo
needs to change pre-cutover** — the SITE_HOST / CANONICAL_HOST
infrastructure already auto-flips when Netlify's primary domain
changes.

## Pre-flight (before flipping DNS)

1. **Move the Replit backend to a stable subdomain.**
   The Express app (chat, /api/*, lead forms, bookings) currently runs
   at `premierpartycruises.com`. Once apex DNS flips to Netlify, that
   host stops resolving to Replit. Create:
   ```
   CNAME api.premierpartycruises.com → <replit-host>.replit.app
   ```
   Verify: `curl https://api.premierpartycruises.com/api/health` returns
   200.

2. **Flip the `/api/*` proxy in `netlify.toml`** to the new subdomain:
   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://api.premierpartycruises.com/api/:splat"   # ← from premierpartycruises.com
     status = 200
     force = true
   ```

3. **Flip `LIVE_HOST` in `scripts/generate-seo-files.mjs`** to the new
   subdomain:
   ```js
   const LIVE_HOST = 'https://api.premierpartycruises.com';
   ```
   (This is the host the prerender fetches Replit-rendered pages from.
   Without this flip the prerender self-loops once DNS flips.)

4. **Commit + push these two changes** to `seo-fixes-only` BEFORE
   flipping DNS. Build + deploy. Verify the V2 deploy still works.

## DNS flip (the actual cutover)

5. **In Netlify → Site settings → Domains:** add
   `premierpartycruises.com` as the primary custom domain. Netlify
   provisions Let's Encrypt for `apex` + `www`. Wait for green checks.

6. **In your DNS host:** point `premierpartycruises.com` apex (and
   `www.premierpartycruises.com`) at Netlify per their on-screen
   instructions. Either:
   - ALIAS / ANAME apex → `apex-loadbalancer.netlify.com`, or
   - 4 A records pointing at Netlify's load balancer IPs

7. **Wait for DNS propagation** (usually 5–60 min, sometimes longer).
   Verify: `dig premierpartycruises.com` returns Netlify IPs.

## Post-cutover verification

8. **Hit the site:** `curl -I https://premierpartycruises.com/` returns
   200 from Netlify (`x-nf-request-id` header present).

9. **Sitemap + canonical agreement:** check that
   `https://premierpartycruises.com/sitemap.xml` lists URLs at
   `premierpartycruises.com/...` and that each prerendered page's
   `<link rel="canonical">` matches.

10. **Backend smoke test:** book a test charter, post a chat message,
    submit a lead form. All `/api/*` calls should hit the api.* subdomain
    and return 200.

11. **Re-run the Semrush audit** pointing at
    `https://premierpartycruises.com` (not the V2 subdomain). The 3
    infra-only audit errors (4XX on www, cert mismatch, SNI) should
    clear automatically because `premierpartycruises.com` now has a
    proper Let's Encrypt cert covering both apex and `www`.

## Rollback

If anything breaks: revert the DNS records to point at Replit. The
Netlify deploy stays running at the netlify.app subdomain unchanged —
DNS revert restores everything within minutes.

## What does NOT need to change

- `SITE_HOST` / `CANONICAL_HOST` in `generate-seo-files.mjs`: both
  default to `process.env.URL`, which Netlify auto-sets to the primary
  custom domain. So once `premierpartycruises.com` is the primary,
  these auto-flip without code changes.
- All `<a href="/...">` internal links: already root-relative. No domain
  changes needed.
- All sitemap entries: regenerated from `process.env.URL` on every
  build. Auto-flips.
- All canonical link tags + og:url + twitter:url: rewritten in
  `prerenderOne()` from `canonicalHost`, which is `process.env.URL`.
  Auto-flips.

## Slug alignment audit

Every V2-only route added (Phase 1 + 2) is a NEW slug not present on
Replit. After cutover, those slugs stay at the same path on
`premierpartycruises.com`, so any external link or AI citation built
against the V2 deploy survives the cutover. The list:

  /sweet-16-party-boat, /family-cruises, /executive-cruises,
  /sunset-anniversary-cruise, /lake-bachelor-bachelorette,
  /canada-to-austin-bachelorette, /about-premier-party-cruises,
  /refer-a-friend, /lake-travis-dinner-cruise,
  /best-boat-rental-lake-travis, /how-to-choose-a-party-boat-austin,
  /lake-travis-boat-budget-calculator,
  /austin-corporate-vs-family-cruise,
  /locations/anderson-mill-marina,
  /premier-vs-pontoon, /premier-vs-float-on,
  /premier-vs-austin-party-boat, /best-austin-party-boat,
  /plan-your-trip, /safety, /austin-bachelorette-itinerary,
  /austin-bachelor-itinerary, /combined-bach-itinerary,
  /austin-corporate-event-guide, /austin-party-boat-pricing-guide,
  /lake-travis-boat-rental-guide, /what-to-bring-on-a-party-boat,
  /austin-party-bus-shuttle

All other V2 slugs match the live Replit site 1:1 (the prerender fetches
each Replit URL at the same path).
