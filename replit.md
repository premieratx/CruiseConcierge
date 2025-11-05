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
- **Hero Section Layout Fixed (Nov 5)**: Removed gray space above hero sections by standardizing to min-h-[80vh] with pt-20 padding. All 14 pages now have consistent hero structure with proper vertical centering.
- **Quote Widget Updated (Nov 5)**: Replaced all embedded quote sections with new direct-embed widget from booking.premierpartycruises.com/new-quote. Widget now shows with 1400px starting height, auto-resizes based on content (min 1400px), and displays date selector immediately without requiring clicks. Updated both QuoteBuilderSection.tsx and Chat.tsx components. Big bold yellow header "Build My Quote Now" displayed prominently above widget.
- **Advanced Inline Editing System (Nov 5)**: Implemented site-wide inline editing for ALL text and hyperlinks using Ctrl+E toggle. New useAdvancedInlineEdit hook automatically makes all text elements and links editable (yellow highlight for text, blue for links). Click links to edit both text and URL via modal. Changes saved to localStorage, works only in Replit Editor (disabled in production).
- **Fleet Pricing Corrected (Nov 5)**: Fixed incorrect pricing across entire site. Correct pricing: Day Tripper (1-14 guests) $200-350/hr, Meeseeks (15-30 guests) $225-425/hr including crew fees, Clever Girl (31-75 guests) $250-500/hr including crew fees. Updated PrivateCruises.tsx, Home.tsx, pageContent.ts, and 7+ component files. Removed all instances of "$195 starting", "200-275/hr", "225-375/hr", "300-475/hr" incorrect ranges.