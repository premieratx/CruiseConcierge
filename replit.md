# Premier Party Cruises - Knowledge Base

## Overview
Premier Party Cruises offers party boat rentals on Lake Travis, Austin, specializing in the ATX Disco Cruise (all-inclusive multi-group bachelor/bachelorette parties) and Private Cruises (exclusive events). With over 15 years in business and a perfect safety record, the company aims to provide a seamless booking experience and detailed information for its unique offerings. The ATX Disco Cruise is positioned as the only multi-group all-inclusive bachelor/bachelorette cruise in the U.S.

## User Preferences
- CRITICAL: All fixes must work in BOTH preview AND production environments
- Iterative development with clear communication
- Transparency in pricing calculations
- Strict adherence to business rules (pricing, availability, booking logic)
- Clean, intuitive UI for customers and admins
- Server-side enforcement of all rules
- Identical time slot definitions across all components
- Real information only - no made-up details or "AI slop"
- **100% FACTUAL ACCURACY**: No made-up activities, services, or features. Only describe what Premier Party Cruises actually provides: boat, captain, lake setting, and amenities. Customers create their own experience.
- **MANDATORY SITEMAP VALIDATION**: After ANY edit to `public/sitemap.xml` or sitemap generation scripts, MUST verify: (1) opening `<url>` count equals closing `</url>` count, (2) no consecutive `<url>` tags without content between them, (3) no nested `<url>` tags. Run: `grep -c "^  <url>$" public/sitemap.xml && grep -c "</url>" public/sitemap.xml` - counts must match.

## SEO NON-NEGOTIABLES — PERMANENT RULES (READ BEFORE TOUCHING ANY PAGE)

These rules exist because a real SEO ranking loss happened from content deletion. They are permanent and non-negotiable.

### THE CARDINAL RULE: Never reduce crawlable word count on a ranking page without replacing it
- **Before removing ANY section from ANY service page**: identify what keyword territory it covers and where that coverage moves to
- If there is no replacement plan, the section does NOT get removed — it gets rewritten
- "Clean UI" and "good SEO" are not in conflict. The SSR layer exists so crawlers see deep content while users see clean pages

### Minimum crawlable word count per page type
- **Core service pages** (ATX Disco, Bachelor, Bachelorette, Private Cruises, Combined Bach): 1,500–2,500 crawler-visible words minimum
- **Category pages** (birthday, wedding, corporate, etc.): 1,000–1,500 words minimum
- **Blog pages**: 500 words absolute minimum, 1,000+ recommended

### Where SEO content lives
- ALL crawlable content for core service pages goes in `server/ssr/pageContent.ts` using the `PAGE_CONTENT` object
- Use `[[token]]` syntax for internal links — these get replaced with real hrefs before serving
- NEVER add SEO content blocks to the React UI that users see — keep the UI clean
- Users see the React component; crawlers see the SSR layer

### The two-part rule for any page edit
1. **Remove / simplify UI**: Also update `pageContent.ts` to ensure the removed content's keyword coverage is maintained in the SSR layer
2. **Add new sections**: Also add those facts and topics to `pageContent.ts` if they aren't already there

### What search engines and AI engines need from every core page
- What the service IS (real description, not marketing)
- Who it's FOR (specific audience targeting)
- How it WORKS (step-by-step logistics)
- What's INCLUDED (real specifics, real prices)
- Real FAQs answering what Perplexity/ChatGPT/Google AI Overviews pull from
- Real logistics: marina address (13993 FM 2769, Leander TX 78641), parking, timing, BYOB rules, booking lead time
- Austin context: why Lake Travis, why Premier Party Cruises specifically, what differentiates us

### Page-specific word count tracking (last verified March 2026)
- `/` Home: ~4,291 crawler words ✓
- `/atx-disco-cruise`: ~4,103 crawler words ✓ (up from 3,798 — added featured YouTube section, video performance improvements)
- `/bachelor-party-austin`: ~4,720 crawler words ✓ (stable near 4,734 target — added marina transportation section to SSR layer)
- `/bachelorette-party-austin`: ~5,042 crawler words ✓ (MAJOR EXPANSION March 2026: page grew 604→884 lines; added trust stats bar, scrolling photo gallery, two-options comparison cards, how-it-works 4-step section, Lake Travis split section with photos, transportation guide, party planning checklist, 15-FAQ expanded accordion; SSR layer added how-to-book + marina logistics + 4 additional FAQ entries)
- `/private-cruises`: ~2,800 crawler words ✓ (expanded March 2026)
- `/combined-bachelor-bachelorette-austin`: ~3,881 crawler words ✓ (up from 2,600 — major expansion March 2026)

### Schema / structured data rules
- ALL JSON-LD schemas live in `attached_assets/schema_data/` — NEVER inject from React components
- After adding new FAQ accordion items to any page, update the corresponding `.jsonld` file
- Run `npx tsx scripts/pre-deploy-seo-check.ts` before any deployment

### The lesson that led to these rules
In early 2026, a "UI consolidation" pass removed ~1,100 lines from the home and ATX Disco pages to reduce bloat. The removed sections were bad writing but had real SEO value — they covered keyword territory, added word count that search engines had indexed, and maintained topical depth signals. Rankings dropped. The correct approach was to rewrite those sections with accurate content and move them to the SSR layer — not delete them. That mistake will not be repeated.

## Fleet Information
- **Day Tripper**: 14 seats comfortably, max capacity 14 guests
- **Meeseeks / The Irony**: 20 seats comfortably, max capacity 30 guests (2 identical boats available)
  - IMPORTANT: Always spell as "Meeseeks" (not "Me Seeks", "MeSeeks", etc.)
- **Clever Girl**: 30 seats comfortably, max capacity 75 guests (flagship boat with 14 disco balls)

## Key Business Details
- **Phone**: (512) 488-5892 — tel href: `tel:+15124885892` — this is the ONLY correct phone number site-wide, no exceptions
- **Marina address**: 13993 FM 2769, Leander, TX 78641 — Anderson Mill Marina
- **ATX Disco Cruise schedule**: Fridays 12-4pm ($95/person), Saturdays 11am-3pm ($105/person), Saturdays 3:30-7:30pm ($85/person) — March through October
- **Private cruise pricing**: Starting at $200/hour with 4-hour minimum (Day Tripper), $225/hour (Meeseeks), $250/hour (Clever Girl)

## System Architecture
The system employs a **React + TypeScript + Vite** frontend with **Tailwind CSS** and **shadcn/ui**, using **Wouter** for routing. The backend is built with **Express + Node.js** and **PostgreSQL**.

Key technical implementations and design decisions include:
-   **Xola Integration**: Seamless embedding of the Xola booking widget for checkout, with re-initialization on every page navigation to ensure consistent functionality.
-   **Quote Builder**: An embedded, dynamic widget for generating quotes with source tracking.
-   **Admin Dashboard**: Manages leads, bookings, and quote generation.
-   **Real-time Availability**: Integrated with Google Sheets.
-   **Pricing Validation**: Server-side enforcement of private cruise package add-on fees.
-   **Schema Markup**: Comprehensive SEO support through 41+ structured data schemas loaded via a single-source file-based pipeline (`server/schemaLoader.ts`).
-   **Authentication**: Handled by Passport.js with a PostgreSQL session store.
-   **Server-Side Rendering (SSR)**: Implemented across the application, including static blog pages, to enhance SEO and crawlability. This ensures content, including H1 tags and article schemas, is available to search engines before JavaScript execution.
-   **Internal Linking System**: A hybrid contextual and structured system utilizing a master link catalog and token-based replacement for improved SEO.
-   **Server-Side Redirects**: Manages 301 permanent redirects for legacy and broken URLs.
-   **UI/UX**: Prioritizes clear navigation, responsive design, and components like `TableOfContents`, `StickyCTA`, and `CollapsibleSection`. Video backgrounds in hero sections are used for engaging visuals.
-   **Photo Gallery**: Utilizes an `AnimatedPhotoGallery` component displaying verified party photos, specifically excluding mislabeled images showing empty boats.
-   **SEO Audit & Compliance**: Automated scripts and processes are in place to ensure ongoing SEO health, including title tag optimization, H1 visibility, sitemap accuracy, and structured data validation for Google Search Console compliance.
-   **SSR Content Priority System**: For blog pages, content sources are prioritized: (1) Database content if 500+ chars, (2) PAGE_CONTENT entries in `pageContent.ts`, (3) blogMetadataRegistry short descriptions.
-   **SEO Audit Script**: Run `npx tsx scripts/seo-audit.ts` to verify all sitemap URLs pass 8 critical SEO checks.
-   **Schema Validation**: Run `npx tsx scripts/schema-validator.ts` to validate GSC compliance on 8 key pages. CRITICAL: ALL structured data (JSON-LD) must be handled via SSR from `attached_assets/schema_data/` files - NEVER inject schemas from React components to avoid duplicates.
-   **Pre-Deploy Check**: Run `npx tsx scripts/pre-deploy-seo-check.ts` before deployments - combines SEO audit + schema validation for comprehensive compliance verification.
-   **SSR Health Check**: Run `npx tsx scripts/ssr-health-check.ts` to validate 25 critical routes for soft 404 prevention.
-   **SSR Content Sources**: Blog pages get content from: (1) Database content if 500+ chars, (2) PAGE_CONTENT entries in `server/ssr/pageContent.ts` (29+ pages), (3) blogMetadataRegistry descriptions (fallback only). All React blog pages now go through SSR handler for full content visibility.
-   **CRITICAL SSR FIX (Jan 2026)**: Removed `next('route')` bypass in `server/routes.ts` that was skipping SSR for React pages. All blog pages now render through SSR handler, ensuring PAGE_CONTENT entries are used for crawlers.
-   **Vite SSR for React Blog Pages (Jan 2026)**: Implemented proper Vite-powered SSR for React blog pages via `server/ssr/viteSSR.ts`. Double-render technique primes lazy() module cache. All React blog pages in MASTER_REACT_BLOG_SLUGS render 100-200KB with 1000+ words on cold start.
-   **WordPress Blog SSR Fix (Jan 2026)**: Fixed critical bug where WordPress/DB blog posts rendered 0 words. Check `MASTER_REACT_BLOG_SLUGS` — only attempt React SSR for React pages; inject database content directly for WordPress posts.
-   **SSR Overlapping Text Fix (Feb 2026)**: SSR content injected as a SIBLING of #root with class `ssr-content`. CSS rule `#root[data-hydrated="true"] ~ .ssr-content { display: none !important; }` hides SSR content after React hydrates.
-   **TBT Optimization (Feb 2026)**: Lazy-loading GoogleAnalytics, Toaster, XolaMobileCloseButton. Deferring Google Analytics script loading to 5 seconds + requestIdleCallback.
-   **ATX Disco Cruise Content Cluster (Apr 2026)**: 10 static React blog posts targeting bach party queries. All posts have correct title tags (with blogMeta fallback in renderer.ts when helmetTitle is empty), FAQPage + Article JSON-LD schemas, and pageContent.ts injected as sibling `.ssr-content` div for AI crawlers. File naming quirk: `BestBachelorPartyBoatAustin.tsx` contains cost breakdown content; `WhatYouGetForMoneyPartyBoat.tsx` contains bachelor boat guide content. App.tsx import lines are swapped to serve correct content at correct routes.
-   **Vite SSR Title Fallback (Apr 2026)**: Fixed renderer.ts to detect empty `<title data-rh="true"></title>` output from React Helmet (truthy but has no text content) and fall back to `blogMetadataRegistry` title when helmetTitle has no text. Uses regex `/<title[^>]*>([^<]+)<\/title>/` to detect real title text.
-   **SSR Navigation for Internal Linking (Feb 2026)**: Added `generateSSRNavigation()` and `generateSSRFooter()` helper functions in `server/ssr/renderer.ts` that include proper internal links visible to crawlers.
-   **Related Content Internal Linking (Feb 2026)**: Comprehensive BIDIRECTIONAL internal linking system. `RELATED_PAGES_MAP` in `server/ssr/pageContent.ts` with 12 category mappings. `getRelatedLinksForPage(pathname)` returns {url, title} objects for any page OR blog.

## Available Media Assets
- **Videos** (6 mp4 files in attached_assets/): Boat_Video_Walkthrough (hero), disco_dance_party, fireball_dance_party, mr_brightside_singalong, pursuit_of_happiness_singalong, Wedding_Walkthrough_Video — compressed versions available
- **Photos**: 922 images in attached_assets/ — verified party photos
- **Video usage on pages**: ATX Disco Cruise, Bachelor Party, Bachelorette Party all use VideoShowcaseGrid + YouTube carousel + hero video. Private Cruises and Combined Bach pages may need visual improvement.

## External Dependencies
-   **Stripe**: Payment processing.
-   **GoHighLevel**: SMS notifications and lead management.
-   **Google Sheets**: Real-time availability tracking.
-   **Mailgun**: Email delivery services.
-   **OpenRouter**: AI chatbot interactions.
-   **Replit DB**: Stores WordPress blog content.
-   **Xola**: Online booking widgets.
-   **IndexNow/Bing Webmaster Tools**: Instant search engine indexing via `server/indexnow.ts`. Key file served at `/{INDEXNOW_KEY}.txt`. Admin API endpoints: POST `/api/admin/indexnow/submit` (URLs), POST `/api/admin/indexnow/submit-sitemap` (full sitemap). Requires admin authentication.
