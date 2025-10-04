# Premier Party Cruises CRM

## Overview
This project is a custom CRM with an AI chatbot agent designed for Premier Party Cruises. Its purpose is to streamline booking, payment, and customer management for a party boat business. Key capabilities include a 17hats-style CRM dashboard, a progressive AI chatbot booking flow, Stripe payment integration, real-time availability checking, dynamic pricing, quote generation, and comprehensive admin tools. The system ensures robust double-booking prevention and production-ready architecture.

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

### Centralized Availability System
The platform utilizes a unified availability system as the single source of truth for both customer-facing (Quote Builder) and administrative (Admin Calendar) components, ensuring perfect synchronization.

- **Static Pricing Configuration**: All boat pricing is defined statically (`server/config/staticPricing.ts`) and varies by boat type and day type. This data is used for database seeding, not Google Sheets.
- **Products Table**: PostgreSQL database stores 89 products representing boat-specific time slots and add-ons, forming the foundation for availability and booking.
- **Centralized Availability API (`/api/availability/search`)**: A single endpoint provides normalized slot objects with complete pricing and availability data, handling booking conflicts, slot holds, and real-time availability.
- **Quote Builder Flow**: Users select date, group size, duration, then the system returns available time slots with pre-calculated pricing.
- **Admin Calendar Flow**: Fetches availability from the same API, transforming normalized slots for UI display of available, booked, and blocked time slots.
- **Quote-to-Calendar Linkage**: Bookings made via quotes or admin tools update the availability system, preventing double-bookings and immediately reflecting changes in both interfaces.
- **Google Sheets Role**: Used exclusively for tracking availability/bookings, not pricing.

### Lovable Quote Builder Integration
The quote builder functionality is integrated via an external Lovable application served as standalone HTML at `/chat`. This decision leverages Lovable's real-time booking system and simplifies integration without complex migration. The booking flow is a 5-step process accessible publicly without authentication. All site booking and quote buttons link to `/chat`.

### UI/UX Decisions
The system features a progressive booking flow and intuitive admin dashboards. Design uses Tailwind CSS and shadcn/ui. UI improvements include optimized column order for comparisons, display of hourly/per-person rates, and detailed quote emails/SMS.

### Technical Implementations
- **AI Chatbot**: Utilizes OpenRouter API for progressive booking interactions.
- **Booking Flow**: Guides users through event type, date, group size, time slot, and package selection.
- **Admin Dashboard**: Tools for lead management, calendar-based booking, quote generation, and booking records.
- **Dynamic Pricing**: Calculates hourly rates, crew fees, taxes, gratuity, and deposits with transparent breakdowns. Pricing rules dictate duration options and boat capacities. Disco Cruise packages offer tiered pricing.
- **Inventory Management**: Real-time availability from Google Sheets, with a robust boat-specific time slot system and database-level unique constraints to prevent double-bookings.
- **Payment Processing**: Stripe for hosted checkouts, supporting deposit and full payments with server-side pricing validation.
- **Quote Generation**: Automated detailed quotes for private and disco cruises delivered via email.

### System Design Choices
- **Frontend**: React + TypeScript + Vite.
- **Backend**: Express + Node.js.
- **Database**: PostgreSQL (production), MemStorage (development).
- **Data Consistency**: Time slots, availability, and pricing synchronized across components.
- **Booking Status Workflow**: Lead -> Quote -> Payment -> Booking Created -> Status Update -> Inventory Update.
- **Architectural Principles**: Emphasis on boat-specific products, database constraints, composite uniqueness, idempotent seeding, and server-side validation.

### Authentication & Security
A comprehensive authentication system protects all admin features using Passport.js with a PostgreSQL session store. All admin API endpoints require authentication via `requireAdmin` middleware. Password hashing uses Scrypt. User management includes main admin, invite system, and role-based access. Frontend protection is enforced via a `ProtectedRoute` component and a dedicated login page.

### WordPress Migration System
The blog system displays WordPress posts from Replit DB using a modern, responsive grid layout at `/blogs` and `/blog/{slug}`. It includes search, filters, pagination, and a featured carousel. Content is enhanced during import for AI discovery across target event categories (corporate, weddings, bachelor/bachelorette, birthdays, graduations) with natural mentions of Party on Delivery services. Enhancement pipeline includes topic detection, AI enhancement, structured data, and quality controls.

### AI Endorsement Authority Hub
A strategic SEO feature leveraging third-party AI validation to strengthen E-E-A-T signals and search engine authority positioning. The system stores and displays AI assessments of the website, currently featuring Claude AI's 9.8/10 SEO Excellence rating.

- **Endorsements Database**: PostgreSQL table storing AI assessments with fields for source, rating, headline, summary, full analysis, highlight quotes, artifact URLs, and display settings.
- **API Endpoints**: GET /api/endorsements (all active) and GET /api/endorsements/homepage (homepage display) for fetching endorsement data.
- **Authority Page**: Dedicated `/ai-endorsement` page displaying comprehensive assessment with professional design, Review schema.org markup, rating visualization, highlight quotes, full analysis accordion, and downloadable artifacts.
- **Homepage Integration**: Prominent trust badge in hero section displaying 9.8/10 rating with star visualization, AI source badge, and link to full endorsement page.
- **SEO Optimization**: Review schema markup with structured data including rating, author, review body, and publication date for enhanced search engine discovery.
- **Crawler Discoverability**: Footer link to AI endorsement page ensures search engine crawlers can discover the authority signals.
- **Strategic Purpose**: Uses Claude AI's assessment as third-party validation signal, positioning the site as the "gold standard" in Austin party cruise market with 6-10x content advantage over competitors.

## External Dependencies
- **Stripe**: Payment processing (`VITE_STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`).
- **GoHighLevel**: SMS notifications and lead management (`GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN`, `GOHIGHLEVEL_LOCATION_ID`, `FROM_PHONE`).
- **Google Sheets**: Real-time availability management (`GOOGLE_SHEETS_CREDENTIALS`, `SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`).
- **Mailgun**: Email delivery for quotes and confirmations (`MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_FROM`).
- **OpenRouter**: AI-powered customer interactions (`OPENROUTER_API_KEY`).
- **Replit DB**: WordPress blog migration and storage (`@replit/database`, `jsdom`, `slugify`).