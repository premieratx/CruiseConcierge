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

## Fleet Information
- **Day Tripper**: 14 seats comfortably, max capacity 14 guests
- **Meeseeks / The Irony**: 20 seats comfortably, max capacity 30 guests (2 identical boats available)
  - IMPORTANT: Always spell as "Meeseeks" (not "Me Seeks", "MeSeeks", etc.)
- **Clever Girl**: 30 seats comfortably, max capacity 75 guests (flagship boat with 14 disco balls)

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
-   **SSR Content Priority System**: For blog pages, content sources are prioritized: (1) Database content if 500+ chars, (2) PAGE_CONTENT entries in `pageContent.ts`, (3) blogMetadataRegistry short descriptions. This ensures all pages have sufficient crawlable content.
-   **SEO Audit Script**: Run `npx tsx scripts/seo-audit.ts` to verify all sitemap URLs pass 8 critical SEO checks (H1, meta title/description, content length 500+, canonical URL, Open Graph, structured data, mobile viewport). Current score: 100% (141/141 pages passing).
-   **Schema Validation**: Run `npx tsx scripts/schema-validator.ts` to validate GSC compliance on 8 key pages. Checks for duplicate schemas (except allowed Service type), missing required fields (price/priceSpecification, availability, priceCurrency for Offers), and conflicting microdata. CRITICAL: ALL structured data (JSON-LD) must be handled via SSR from `attached_assets/schema_data/` files - NEVER inject schemas from React components to avoid duplicates.
-   **Pre-Deploy Check**: Run `npx tsx scripts/pre-deploy-seo-check.ts` before deployments - combines SEO audit + schema validation for comprehensive compliance verification.
-   **SSR Health Check**: Run `npx tsx scripts/ssr-health-check.ts` to validate 25 critical routes for soft 404 prevention. Checks H1 tags, meta descriptions (50+ chars), content length (10KB+), and soft 404 indicators. MUST pass before any deploy to prevent Google Search Console soft 404 errors.

## External Dependencies
-   **Stripe**: Payment processing.
-   **GoHighLevel**: SMS notifications and lead management.
-   **Google Sheets**: Real-time availability tracking.
-   **Mailgun**: Email delivery services.
-   **OpenRouter**: AI chatbot interactions.
-   **Replit DB**: Stores WordPress blog content.
-   **Xola**: Online booking widgets.
-   **IndexNow/Bing Webmaster Tools**: Instant search engine indexing via `server/indexnow.ts`. Key file served at `/{INDEXNOW_KEY}.txt`. Admin API endpoints: POST `/api/admin/indexnow/submit` (URLs), POST `/api/admin/indexnow/submit-sitemap` (full sitemap).