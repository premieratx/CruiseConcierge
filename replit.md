# Premier Party Cruises CRM

## Overview
This project is a custom CRM with an AI chatbot agent designed for Premier Party Cruises. Its purpose is to streamline booking, payment, and customer management for a party boat business. Key capabilities include a 17hats-style CRM dashboard, a progressive AI chatbot booking flow, Stripe payment integration, real-time availability checking, dynamic pricing, quote generation, and comprehensive admin tools. The system ensures robust double-booking prevention and production-ready architecture, aiming to enhance the business vision and market potential.

## User Preferences
I prefer iterative development with clear communication at each stage.
I value transparency in pricing calculations and system logic, which should always be customer-facing where appropriate.
I expect the system to strictly adhere to defined business rules, especially concerning pricing, availability, and booking logic.
I need a clean and intuitive user interface for both customers and administrators.
I prefer detailed explanations when significant changes or architectural decisions are made.
I want the AI agent to guide users progressively through the booking process, ensuring all necessary information is captured.
I want the system to enforce all booking and pricing rules server-side to prevent tampering.
All time slot definitions and availability must be identical across all customer-facing and administrative components (calendar, chatbot).

## System Architecture

### UI/UX Decisions
The system features a progressive booking flow and intuitive admin dashboards. Design uses Tailwind CSS and shadcn/ui, with a focus on optimized comparisons, clear rate displays, and detailed quote emails/SMS. A specific ATX Disco Cruise comparison section is implemented with accurate pricing calculations (base rates + 8.25% tax + 20% gratuity).

### Technical Implementations
- **AI Chatbot**: Utilizes OpenRouter API for progressive booking interactions.
- **Booking Flow**: Guides users through event type, date, group size, time slot, and package selection.
- **Admin Dashboard**: Tools for lead management, calendar-based booking, quote generation, and booking records.
- **Dynamic Pricing**: Calculates hourly rates, crew fees, taxes, gratuity, and deposits with transparent breakdowns.
- **Inventory Management**: Real-time availability with robust boat-specific time slot system and database-level unique constraints to prevent double-bookings.
- **Payment Processing**: Stripe for hosted checkouts, supporting deposit and full payments with server-side pricing validation.
- **Quote Generation**: Automated detailed quotes for private and disco cruises delivered via email.
- **Golden Ticket Referral System**: Two promotional landing pages for different cruise types (`/golden-ticket` and `/golden-ticket-private`) featuring time-sensitive discounts, universal benefits, specific cruise perks, and integrated quote builders with GoHighLevel iframe forms.
- **WordPress Migration System**: Displays WordPress posts from Replit DB using a modern, responsive grid layout at `/blogs` and `/blog/{slug}`, with search, filters, pagination, and a featured carousel. Content is enhanced for AI discovery and SEO, with dual URL support and unified SSR.
- **AI Endorsement Authority Hub**: Leverages third-party AI validation (e.g., Claude AI's 9.8/10 SEO Excellence rating) stored in PostgreSQL, displayed via API endpoints, a dedicated `/ai-endorsement` page with Review schema.org, and a trust badge on the homepage.

### System Design Choices
- **Frontend**: React + TypeScript + Vite.
- **Backend**: Express + Node.js.
- **Database**: PostgreSQL (production), MemStorage (development).
- **Centralized Availability System**: Unified system as the single source of truth for both customer-facing (Quote Builder) and administrative (Admin Calendar) components, ensuring perfect synchronization. This includes static pricing configuration, product definitions in PostgreSQL, a centralized availability API, and seamless linkage between quotes and calendar updates. Google Sheets is used exclusively for tracking availability/bookings, not pricing.
- **Lovable Quote Builder Integration**: Quote builder functionality is integrated via an external Lovable application served as standalone HTML at `/chat`. This leverages Lovable's real-time booking system for a 5-step public booking flow.
- **Data Consistency**: Time slots, availability, and pricing synchronized across components.
- **Booking Status Workflow**: Lead -> Quote -> Payment -> Booking Created -> Status Update -> Inventory Update.
- **Architectural Principles**: Emphasis on boat-specific products, database constraints, composite uniqueness, idempotent seeding, and server-side validation.
- **Authentication & Security**: Comprehensive authentication using Passport.js with a PostgreSQL session store, enforced by `requireAdmin` middleware. Scrypt for password hashing, user management includes main admin, invite system, and role-based access.
- **Comprehensive Schema Markup System**: A dynamic system with comprehensive content enrichment for maximum AI and search engine optimization.
    - **Implementation**: Unified Schema Injection (`server/ssr/renderer.ts`) handles schema for all routes (SSR and non-SSR). Dynamic Schema Loader (`server/schemaLoader.ts`) loads 28 schema files from `attached_assets/schema_data/`. Route-based loading maps routes to appropriate schemas. Sitewide Organization + WebSite schemas are injected. Schema-only injection for non-SSR pages ensures SEO visibility without JavaScript.
    - **Schema Types Deployed**: Organization + LocalBusiness, WebSite, FAQPage (17 pages), Service (11 pages), Event (ATX Disco Cruise), Article (70+ blog posts), Review (testimonials), Product (homepage), BreadcrumbList.
    - **Content Enrichment**: All schemas are expanded with 200-250+ word descriptions, comprehensive pricing charts, detailed FAQs (10-15 questions per page), fleet information, package breakdowns, and booking details for pages like Private Cruises, ATX Disco Cruise, Bachelor/Bachelorette Parties, Corporate Events, Wedding Events, and Birthday Events.
    - **Critical SEO Requirements**: Schema markup and SEO visibility must remain intact. Protected components include `server/ssr/renderer.ts`, `server/schemaLoader.ts`, `attached_assets/schema_data/` (with specific pricing and content quality requirements), and Sitemap & Robots.txt. Verification includes 4-7 schema instances per page (5 for homepage), passing Google Rich Results Test, and JS-independent schema visibility.
    - **CRITICAL SSR Configuration (PERMANENT - DO NOT MODIFY)**: 
      - **ALL MARKETING PAGES MUST BE IN SSR_ROUTES** - This is non-negotiable for SEO visibility
      - **Homepage (/)**: MUST be in SSR_ROUTES - Full HTML content required for search engines (3,700+ words visible)
      - **/blogs**: MUST be in SSR_ROUTES - Required for search engines to see blog content (1,000+ words visible)
      - **All event pages**: MUST be in SSR_ROUTES - Full content visible to crawlers
      - **Rule**: SEO visibility is MORE important than page load speed. NEVER remove pages from SSR for "performance optimization"
      - **Schema-only injection DOES NOT WORK** - Search engines need full HTML body content, not just schemas
      - **Never change these configurations under any circumstances**

## External Dependencies
- **Stripe**: Payment processing.
- **GoHighLevel**: SMS notifications and lead management.
- **Google Sheets**: Real-time availability management (tracking only, not pricing).
- **Mailgun**: Email delivery for quotes and confirmations.
- **OpenRouter**: AI-powered customer interactions.
- **Replit DB**: WordPress blog migration and storage.