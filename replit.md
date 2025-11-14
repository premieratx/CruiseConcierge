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

## System Architecture
The system utilizes a modern web architecture featuring a **React + TypeScript + Vite** frontend, styled with **Tailwind CSS** and **shadcn/ui** components, and **Wouter** for routing. The backend is powered by **Express + Node.js** with **PostgreSQL** for data persistence.

Key technical implementations include:
- **Xola Integration**: Direct popup link approach - all "Book Now" buttons (desktop header, mobile header, mobile bottom nav, mobile menu) open Xola booking flow in popup window via `window.open()` to: https://x2-checkout.xola.app/flows/mvp?button=691574bd162501edc00f151a&view=grid
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