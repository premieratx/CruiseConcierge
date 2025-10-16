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
The system features a progressive booking flow and intuitive admin dashboards. Design uses Tailwind CSS and shadcn/ui, with a focus on optimized comparisons, clear rate displays, and detailed quote emails/SMS. A specific ATX Disco Cruise comparison section is implemented with accurate pricing calculations.

### Technical Implementations
- **AI Chatbot**: Utilizes OpenRouter API for progressive booking interactions.
- **Booking Flow**: Guides users through event type, date, group size, time slot, and package selection.
- **Admin Dashboard**: Tools for lead management, calendar-based booking, quote generation, and booking records.
- **Dynamic Pricing**: Calculates hourly rates, crew fees, taxes, gratuity, and deposits with transparent breakdowns. **CRITICAL**: Private cruise package add-ons (Essentials and Ultimate) are FLAT FEES per cruise, not hourly rates:
  - 14-person boats: Essentials +$100, Ultimate +$250
  - 25-person boats: Essentials +$150, Ultimate +$300
  - 50-person boats: Essentials +$200, Ultimate +$350
- **Inventory Management**: Real-time availability with robust boat-specific time slot system and database-level unique constraints to prevent double-bookings.
- **Payment Processing**: Stripe for hosted checkouts, supporting deposit and full payments with server-side pricing validation.
- **Quote Generation**: Automated detailed quotes for private and disco cruises delivered via email.
- **Golden Ticket Referral System**: Promotional landing pages with time-sensitive discounts and integrated quote builders.
- **WordPress Migration System**: Displays WordPress posts from Replit DB using a modern, responsive grid layout, with search, filters, pagination, and a featured carousel.
- **AI Endorsement Authority Hub**: Leverages third-party AI validation stored in PostgreSQL, displayed via API endpoints, a dedicated `/ai-endorsement` page with Review schema.org, and a trust badge on the homepage.
- **Database Keepalive System**: An internal service pings the database every 4 minutes to prevent it from going dormant, coupled with increased database connection timeouts to handle cold starts.
- **Bulletproof Crash Prevention & Monitoring Architecture**: 4-layer protection ensures 99.9% uptime:
  - **Layer 1 - Process Protection**: Handlers catch uncaught exceptions and unhandled promise rejections (prevents Node.js crashes)
  - **Layer 2 - Express Error Handling**: Global middleware prevents route errors from crashing the server
  - **Layer 3 - Health Monitoring**: UptimeRobot pings `/api/health` every 5 minutes (keeps site alive + alerts on downtime)
  - **Layer 4 - Build Validation**: TypeScript checking via esbuild prevents broken code from reaching production

### System Design Choices
- **Frontend**: React + TypeScript + Vite.
- **Backend**: Express + Node.js.
- **Database**: PostgreSQL (production), MemStorage (development).
- **Centralized Availability System**: Unified system as the single source of truth for both customer-facing (Quote Builder) and administrative (Admin Calendar) components, ensuring perfect synchronization.
- **Lovable Quote Builder Integration**: Quote builder functionality is integrated via an external Lovable application served as standalone HTML at `/chat` for a 5-step public booking flow.
- **Data Consistency**: Time slots, availability, and pricing synchronized across components.
- **Booking Status Workflow**: Lead -> Quote -> Payment -> Booking Created -> Status Update -> Inventory Update.
- **Architectural Principles**: Emphasis on boat-specific products, database constraints, composite uniqueness, idempotent seeding, and server-side validation.
- **Authentication & Security**: Comprehensive authentication using Passport.js with a PostgreSQL session store, enforced by `requireAdmin` middleware. Scrypt for password hashing, user management includes main admin, invite system, and role-based access.
- **Comprehensive Schema Markup System**: A dynamic system with comprehensive content enrichment for maximum AI and search engine optimization. Implementation includes unified Schema Injection, Dynamic Schema Loader for 28 schema files, route-based loading, sitewide Organization + WebSite schemas, and schema-only injection for non-SSR pages. Deployed schema types include Organization + LocalBusiness, WebSite, FAQPage, Service, Event, Article, Review, Product, and BreadcrumbList. All schemas are expanded with detailed descriptions, pricing charts, FAQs, and booking details. Critical SEO requirements ensure schema markup and visibility remain intact through specific protected components and SSR for marketing pages.

## External Dependencies
- **Stripe**: Payment processing.
- **GoHighLevel**: SMS notifications and lead management.
- **Google Sheets**: Real-time availability management (tracking only).
- **Mailgun**: Email delivery for quotes and confirmations.
- **OpenRouter**: AI-powered customer interactions.
- **Replit DB**: WordPress blog migration and storage.