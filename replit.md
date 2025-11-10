# Premier Party Cruises - Knowledge Base

## Overview
Premier Party Cruises is Austin's premier party boat rental service on Lake Travis, specializing in two main experiences: the ATX Disco Cruise for all-inclusive bachelor/bachelorette parties, and Private Cruises for various exclusive events. The company boasts over 15 years of operation, serving 150K+ customers with a perfect safety record. The ATX Disco Cruise is uniquely positioned as the only multi-group all-inclusive bachelor/bachelorette cruise in the U.S., offering a "just show up & get down" experience with DJ, photographer, and large floats. Private cruises provide exclusive boat rentals with various capacities and customizable packages. The project aims to provide a seamless booking experience and detailed information for both offerings.

## User Preferences
- **CRITICAL**: All fixes must work in BOTH preview AND production environments
- Iterative development with clear communication
- Transparency in pricing calculations
- Strict adherence to business rules (pricing, availability, booking logic)
- Clean, intuitive UI for customers and admins
- Server-side enforcement of all rules
- Identical time slot definitions across all components
- Real information only - no made-up details or "AI slop"

## System Architecture
The system employs a modern web architecture with a **React + TypeScript + Vite** frontend utilizing **Tailwind CSS** and **shadcn/ui** components for a consistent UI/UX, and **Wouter** for routing. The backend is built with **Express + Node.js** and uses **PostgreSQL** for data persistence.

Key technical features include:
- **Xola Integration**: Embedded booking widgets for 6 products.
- **Quote Builder**: New quote widget from booking.premierpartycruises.com with source tracking and auto-resize functionality (embedded on /chat page).
- **Admin Dashboard**: For lead management, booking, and quote generation.
- **Real-time Availability**: Managed via Google Sheets integration.
- **Pricing Validation**: Critical server-side validation ensures private cruise package add-ons are flat fees, preventing tampering.
- **Schema Markup**: Comprehensive SEO with 28 schema files.
- **Authentication**: Handled by Passport.js with a PostgreSQL session store.

UI/UX decisions focus on clear navigation with components like `TableOfContents`, `StickyCTA`, lazy loading with `LazyImage`, and responsive accordions using `CollapsibleSection`. Video testimonials are integrated via `VideoTestimonials`, and `TransportationGuide` provides useful guest information.

## External Dependencies
- **Stripe**: For secure payment processing.
- **GoHighLevel**: Used for SMS notifications and lead management.
- **Google Sheets**: Integrates for real-time availability tracking.
- **Mailgun**: Utilized for email delivery services.
- **OpenRouter**: Powers AI chatbot interactions.
- **Replit DB**: Stores WordPress blog content.
- **Xola**: Provides online booking widgets.

## Deposit Policy
**Current Policy (Updated October 29, 2025):**
- **Bookings made 14+ days before cruise:** 25% deposit required at booking, remaining balance due 14 days before cruise date
- **Bookings made less than 14 days before cruise:** 50% deposit required at booking, remaining balance due within 48 hours of booking

This policy is enforced consistently across all pages, components, and pricing calculations throughout the website.

## Recent Fixes & Updates (October-November 2025)
- **Ice/Cooler Messaging Updated (Oct 28)**: Fixed 100+ instances across entire website to clarify standard packages provide EMPTY coolers (BYO ice OR Party On Delivery option) while Essentials/Ultimate packages include ice. Removed all "coolers with ice" references from standard package descriptions.
- **Captain Messaging Standardized (Oct 28)**: Updated 40+ files across website to use exact phrase "Licensed, fun, experienced captains to take your group safely around the lake in style" everywhere, replacing all variations of "Coast Guard certified captains", "USCG captains", and other captain descriptions. Verified in both preview AND production.
- **Contact Information Corrected (Oct 29)**: Fixed all phone numbers and email addresses across entire site. Updated 5 files to use correct phone (512) 488-5892 and email clientservices@premierpartycruises.com, replacing incorrect numbers ((512) 900-1821, (512) 123-4567) and emails (bookings@, policies@, emergency@, admin@, hello@). All contact info now pulls from shared/contact.ts constants.
- **Deposit Policy Updated (Oct 29)**: Comprehensive update of deposit terms from 30-day to 14-day threshold across 28 files. Changed both TEXT (all FAQs, pricing charts, event pages) and CALCULATIONS (server/serverPricing.ts, shared/pricing.ts, PricingTable components) to match new policy: 25% deposit if booking 14+ days out, 50% if less than 14 days. Balance due changed from "30 days before cruise" to "14 days before cruise" for regular bookings and "within 48 hours of booking" for urgent bookings. Verified all pricing calculations match displayed policy text.
- **Sticky Navigation Fixed (Nov 5)**: Removed incorrect `mt-[50px]` margin from logo in PublicNavigation.tsx that was breaking header layout. Navigation now properly sticks to top on scroll with correct alignment on both desktop and mobile.
- **Quote Widget Updated (Nov 5)**: Replaced quote builder on /chat page with new embed code from booking.premierpartycruises.com/new-quote. Added source tracking parameters (sourceUrl, sourceType) and updated auto-resize message handler to listen for 'new-quote-resize' events from new domain. Fixed iframe height issue by changing from 1400px to 600px initial height with dynamic resizing (min 400px).
- **Video Backgrounds Added (Nov 5)**: Integrated YouTube drone video (ID: FABtEDZZBA0) as background across 14 event landing pages with 75% white overlay for optimal text contrast. Removed standalone video sections; video now plays as autoplay/muted/loop background in hero sections.
- **Hero Section Typography Enhanced (Nov 5)**: Increased heading sizes (text-7xl), made subtitles bolder (text-3xl font-bold), added drop shadows for depth. Wrapped descriptive paragraphs in white background bubbles (bg-white/90 with backdrop blur) for maximum readability against video background.
- **Hero Section Layout Fixed (Nov 5, Updated Nov 6)**: Removed gray space above hero sections by removing pt-20 padding that was creating unwanted gap between navigation and video background. All 14 event pages (Welcome Party, After Party, Wedding Parties, Corporate Events, Team Building, etc.) now display video backgrounds edge-to-edge with no gray gap.
- **Quote Widget Updated (Nov 5, Fixed Nov 6)**: Replaced all embedded quote sections with new direct-embed widget from booking.premierpartycruises.com/new-quote. Widget now has FIXED 1400px height (does NOT auto-expand) - only expands when user clicks elements inside the iframe. Removed all auto-resize listeners that were causing unwanted expansion. Updated both QuoteBuilderSection.tsx and Chat.tsx components. Big bold yellow header "Build My Quote Now" displayed prominently above widget.
- **Advanced Inline Editing System (Nov 5)**: Implemented site-wide inline editing for ALL text and hyperlinks using Ctrl+E toggle. New useAdvancedInlineEdit hook automatically makes all text elements and links editable (yellow highlight for text, blue for links). Click links to edit both text and URL via modal. Changes saved to localStorage, works only in Replit Editor (disabled in production).
- **Fleet Pricing Corrected (Nov 5)**: Fixed incorrect pricing across entire site. Correct pricing: Day Tripper (1-14 guests) $200-350/hr, Meeseeks (15-30 guests) $225-425/hr including crew fees, Clever Girl (31-75 guests) $250-500/hr including crew fees. Updated PrivateCruises.tsx, Home.tsx, pageContent.ts, and 7+ component files. Removed all instances of "$195 starting", "200-275/hr", "225-375/hr", "300-475/hr" incorrect ranges.
- **Contact Page Updated (Nov 6)**: Replaced non-functional contact form with "Build My Quote" embedded quote builder widget. Removed old form fields (name, email, phone, event type, group size, date, message) and submit handler that redirected to /chat. Contact page now displays contact info cards (phone, email, location, hours) and full quote builder widget for direct booking, matching functionality across all other pages.
- **High-Traffic Blog Post Migrated (Nov 8)**: Created LakeTravisBoatRentalGuide.tsx as new React page for "First-Time Lake Travis Boat Rental" blog content. Original blog at /blogs/* URLs serves static HTML without navigation/animations/formatting. New page at /first-time-lake-travis-boat-rental-guide includes full PublicNavigation, SectionReveal animations, Footer, Breadcrumbs, shadcn/ui components, and all main site infrastructure. Content covers boat rental options, safety, Party On Delivery integration, pricing, and comprehensive FAQ. Route added to App.tsx at /blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning to replace old static version with new React page.
- **Broken Indexed URLs Fixed (Nov 8)**: Added redirects for broken URLs that were being indexed by search engines: /blogs/atx-disco-cruise-experience now redirects to /atx-disco-cruise (the actual ATX Disco Cruise page), and /party-cruises-2025 redirects to homepage. These URLs were showing empty/broken pages but being indexed, causing SEO issues.
- **Party Cove References Removed (Nov 8)**: Removed ALL 9+ "party cove" references across entire website and replaced with accurate cruise description. Updated 5 files (Faq.tsx, BacheloretteParty.tsx, BachelorParty.tsx, PrivateCruises.tsx, server/ssr/pageContent.ts) to accurately describe the actual cruise experience: cruise 30-45 minutes, then tie up along cliffs of a beautiful Lake Travis nature preserve with crystal clear water for swimming (typically 1.5-2 hours), then cruise back. Emphasized flexible timing - guests can customize any combination of cruising and swimming. Zero party cove references remaining. All descriptions factually accurate with no promotional "SEO slop".
- **CRITICAL SEO Fix - SSR Middleware Registered (Nov 9)**: Fixed catastrophic SEO issue where Ubersuggest found "ZERO words" and "NO H1" on homepage. Root cause: SSR middleware existed in server/ssr/renderer.ts but was NEVER registered in server/index.ts, causing all crawlers to see empty HTML shell instead of full content. Solution: Imported and registered ssrMiddleware() BEFORE static files (line 161 in server/index.ts). NOW VERIFIED: All pages render full H1 tags, paragraph content, and schema.org markup to crawlers. Tested and confirmed working on /, /bachelor-party-austin, /bachelorette-party-austin, /private-cruises, and /atx-disco-cruise. Each page now shows 11-12 schema instances including Organization schema with aggregate ratings (5.0 stars, 420 reviews). This fix works in BOTH preview (Vite dev) AND production (static build) environments as SSR middleware runs before static file handlers in both modes.
- **Comprehensive Internal Linking System (Nov 10)**: Implemented hybrid contextual + structured internal linking system to fix "terrible internal linking" SEO audit failures. Created master LINK_CATALOG with 35+ site pages in server/ssr/pageContent.ts using token-based replacement system (e.g., [[bachelor-party]] → actual links). Added token placeholders to paragraphs for contextual inline links AND relatedPages arrays (10-13 links) to all 23 major routes for auto-generated "Related Cruises & Services" footer navigation. Updated server/ssr/renderer.ts with processTokens() function to replace [[token]] with HTML anchor tags and renderRelatedPages() function to generate footer. VERIFIED: All pages now have 14-15 internal links visible to crawlers (exceeding 10 minimum requirement): Homepage (15 links), Bachelor Party (14 links), Bachelorette Party (14 links), ATX Disco Cruise (15 links), Private Cruises (15 links), Wedding Parties (15 links), Corporate Events (15 links), Birthday Parties (15 links), Graduation Party (15 links), Sweet 16 (15 links), Party Boat Austin (15 links), Team Building (15 links), and all other routes. Links are contextually relevant and render in both preview AND production environments. ATX Disco Cruise page confirmed rendering 3,361 words with full internal linking structure.