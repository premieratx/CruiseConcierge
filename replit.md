# Premier Party Cruises - Knowledge Base

## Overview
Premier Party Cruises offers party boat rentals on Lake Travis, Austin, with two primary experiences: the ATX Disco Cruise (all-inclusive bachelor/bachelorette parties) and Private Cruises (exclusive events). With over 15 years in business and a perfect safety record, the company aims to provide a seamless booking experience and detailed information for its unique offerings. The ATX Disco Cruise is the only multi-group all-inclusive bachelor/bachelorette cruise in the U.S., while Private Cruises offer customizable packages for various capacities.

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

## Photo Gallery Architecture (November 2024)
**CRITICAL FIX:** Files named `party-atmosphere-1/2/3.jpg/webp` were MISLABELED and actually contained FLEET/EMPTY BOAT photos (not party photos).

**AnimatedPhotoGallery Component:**
- Used by: Bachelorette, Bachelor, Combined, and ATX Disco Cruise pages
- Shows 6 verified party photos in rotating sets (3 photos each, 5-second transitions)
- Uses party collage images showing PEOPLE CELEBRATING (no empty boats)

**Verified Party Photos:**
1. `disco photo collage_1759401302941.png`
2. `disco unicorn collage - web_1759401302953.png`
3. `father's day_family party collage_1759401302954.png`
4. `non-bach collage compressed_1759401302954.png`
5. `atx-disco-cruise-party.jpg`
6. `bachelor-party-group-guys.jpg`

**DO NOT USE:** `party-atmosphere-1/2/3.jpg/webp`, `dancing-party-scene.jpg/webp` - These files contain EMPTY BOAT photos despite their names.

## Recent Accuracy Fixes (November 2024)
**Comprehensive Site-Wide Accuracy Audit Completed:**
1. **Life Jacket Policy** (19 files updated):
   - Changed from "life jackets required" to "available for swimming - encouraged for safety"
   - Updated 8 schema files + 11 page components for consistency
2. **Disco Cruise Food Options** (3 schema files):
   - Removed incorrect "lunch delivery" claims
   - Clarified: Alcohol delivery available only (NOT lunch)
3. **Comparison Tables** (2 files):
   - Disco: "Alcohol delivery available"
   - Private: "Bring your own, coordinate catering, or we can help"
4. **DiscoVsPrivateValueCalculator** (complete rebuild):
   - Now uses PRIVATE_CRUISE_PRICING constants for accurate boat hourly rates
   - Correctly differentiates Friday vs Saturday pricing (e.g., 14p boat: Friday $225/hr, Saturday $350/hr)
   - "Build It Yourself" includes all real costs: boat base + DJ/Photo/Bartender ($600) + Party Supplies ($200) + Setup/hosting ($200) + Essentials Package ($100-200) + Ultimate Package ($250-350)
   - Added "PRICELESS" messaging for multi-group party atmosphere experience
   - All pricing calculations verified against authoritative PRIVATE_CRUISE_PRICING constants
5. **ATX Disco Cruise Bouncing Badge** (November 15, 2024):
   - Changed from scarcity messaging ("100 spots per cruise, 73% already booked") to promotional messaging
   - New text: "Book Now for early bird pricing and special deals"
   - Located in pricing section of ATX Disco Cruise page
6. **ATX Disco Cruise Page Reorganization** (November 15, 2024):
   - Moved party type tabs (Bachelor/Bachelorette/Combined) to appear AFTER "Included w/ EVERY ATX Disco Cruise Ticket" section
   - Tabs now positioned directly above add-on packages section
   - Tab selection dynamically updates add-on packages displayed
   - Improved user flow: pricing → included items → select party type → view relevant packages
7. **Blog Navigation Fix** (November 18, 2024):
   - **CRITICAL**: Fixed all blog-related public pages showing admin navigation instead of public navigation
   - Fixed BlogPostLayout.tsx (shared by all React blog components)
   - Fixed BlogCategory.tsx (category archive pages)
   - Fixed BlogTag.tsx (tag archive pages)
   - Fixed BlogAuthor.tsx (author profile pages)
   - All 4 files now use PublicNavigation + Footer instead of admin Layout component
   - Affects all blog routes: React blog components + category/tag/author archive pages
   - Public visitors now see proper public navigation (Home, ATX Disco Cruise, etc.) instead of admin links (Dashboard, Blog, SEO, etc.)
8. **Sitemap.xml Google Search Console Compliance** (November 18, 2024):
   - **CRITICAL FIX**: Resolved "Sitemap is HTML" error from Google Search Console
   - Removed old dynamic sitemap route (114 URLs) from server/routes.ts
   - Added dedicated static file route in server/index.ts with proper XML content-type headers
   - Sitemap now serves: 123 total URLs (45 static pages + 78 blog posts)
   - Content-Type: application/xml; charset=utf-8 (was HTML)
   - Route positioned BEFORE SSR middleware to prevent HTML serving
   - Generator script: `npx tsx scripts/generate-sitemap.ts`
   - Safety checks: fails hard if API unreachable or blog count < 50
   - **DEPLOYMENT**: Run sitemap generator before each production deploy to keep URLs current

## System Architecture
The system utilizes a modern web architecture featuring a **React + TypeScript + Vite** frontend, styled with **Tailwind CSS** and **shadcn/ui** components, and **Wouter** for routing. The backend is powered by **Express + Node.js** with **PostgreSQL** for data persistence.

Key technical implementations include:
- **Xola Integration**: Embedded slide-out checkout - all "Book Now" buttons (desktop header, mobile header, mobile bottom nav, mobile menu) use `<div class="xola-custom xola-checkout" data-button-id="691574bd162501edc00f151a">` wrapper structure. When clicked, the Xola booking widget slides out from the right side showing available cruises at `https://x2-checkout.xola.app/flows/mvp?button=691574bd162501edc00f151a&view=grid` displaying ATX Disco Cruise 2026, 14-Person Private Cruise, 25-Person Private Cruise, and 50-Person Private Cruise options. Xola's checkout.js script (loaded from `https://xola.com/checkout.js` in `client/index.html`) automatically initializes these elements. Initialization handled by `client/src/services/xola.ts` with `Xola.Controls.reload()` and manual fallback via `addEventListener` calling `Xola.onClick(element)`. **CRITICAL FIX (Nov 18, 2024):** Added re-initialization on every page navigation - PublicNavigation component now calls `loadXolaScript().then(initXolaEmbeds)` whenever location changes, ensuring Book Now works consistently across all pages in the SPA. Script loading includes polling mechanism (up to 10 seconds) to wait for window.Xola to become available, preventing race conditions.
- **Quote Builder**: An embedded widget for generating quotes with source tracking and dynamic resizing.
- **Admin Dashboard**: Facilitates lead management, booking, and quote generation.
- **Real-time Availability**: Managed through Google Sheets integration.
- **Pricing Validation**: Server-side enforcement of private cruise package add-on flat fees.
- **Schema Markup**: Extensive SEO support with 41+ schema files loaded via single-source file-based pipeline (`server/schemaLoader.ts` + `attached_assets/schema_data/`).
- **Authentication**: Handled by Passport.js using a PostgreSQL session store.
- **Server-Side Rendering (SSR)**: Implemented to ensure content is visible to crawlers for improved SEO.
- **Static Blog SSR**: React blog pages (`/austin-bachelor-party-ideas`, `/lake-travis-bachelor-party-boats`, `/wedding-anniversary-celebration-ideas`) with server-side Article schemas using `server/staticBlogMetadata.ts` for centralized metadata and environment-aware canonical URLs via `server/utils/domain.ts`.
- **Internal Linking System**: A hybrid contextual and structured system using a master link catalog and token-based replacement for enhanced SEO and navigation.
- **Server-Side Redirects**: 301 permanent redirects for legacy and broken URLs to manage SEO effectively, including static blog redirects (`/blogs/slug` → `/slug`).

UI/UX design prioritizes clear navigation and responsive design, incorporating components like `TableOfContents`, `StickyCTA`, `LazyImage`, and `CollapsibleSection`. Video testimonials and a `TransportationGuide` enhance the user experience. Hero sections incorporate video backgrounds with optimized typography for readability.

### Structured Data Architecture

**Schema Management:**
- Single-source file-based pipeline via `server/schemaLoader.ts` and `attached_assets/schema_data/`
- NO hardcoded schemas in components (except SSR-generated Article schemas)
- All 41+ schema files validated for errors, duplicates, and format issues
- `scripts/validate-schemas.ts` provides automated validation

**Static Blog SSR Implementation:**
- Metadata centralized in `server/staticBlogMetadata.ts` with `isStaticBlogRoute()` and `getStaticBlogMetadata()` helpers
- SSR generates Article schemas server-side in `server/ssr/renderer.ts`
- Client-side `BlogPostLayout` does NOT emit duplicate schemas
- 301 redirects in `server/routes.ts` ensure static blogs are ONLY accessible at top-level paths (`/slug`), not `/blogs/slug`

**Environment-Aware Domain Utilities:**
- `server/utils/domain.ts` provides `getBaseDomain(req)` and `getCanonicalUrl(pathname, req)`
- Prefers request host (works in dev, staging, preview, production)
- Falls back to hardcoded production domain only when no request available
- Used by `generateArticleSchema(blogPost, canonicalUrl, req)` in `server/schemaLoader.ts`

**Adding New Static Blog Pages:**
1. Create React component in `client/src/pages/blog/`
2. Add route to `client/src/App.tsx`
3. Add metadata to `server/staticBlogMetadata.ts`
4. Add route to `SSR_ROUTES` array in `server/ssr/renderer.ts`
5. Use `BlogPostLayout` component (NO BlogArticleSchema needed - SSR handles it)

## External Dependencies
- **Stripe**: Payment processing.
- **GoHighLevel**: SMS notifications and lead management.
- **Google Sheets**: Real-time availability tracking.
- **Mailgun**: Email delivery services.
- **OpenRouter**: AI chatbot interactions.
- **Replit DB**: Stores WordPress blog content.
- **Xola**: Online booking widgets.