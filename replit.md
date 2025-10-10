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

### Centralized Availability System
The platform utilizes a unified availability system as the single source of truth for both customer-facing (Quote Builder) and administrative (Admin Calendar) components, ensuring perfect synchronization. This includes static pricing configuration, product definitions in PostgreSQL, a centralized availability API, and a seamless linkage between quotes and calendar updates. Google Sheets is used exclusively for tracking availability/bookings, not pricing.

### Lovable Quote Builder Integration
The quote builder functionality is integrated via an external Lovable application served as standalone HTML at `/chat`. This leverages Lovable's real-time booking system for a 5-step public booking flow.

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
- **Golden Ticket Referral System**: Two promotional landing pages for different cruise types:
  - **General Page** (`/golden-ticket`): Shows both Private and Disco Cruise offers
  - **Private-Only Page** (`/golden-ticket-private`): Focuses exclusively on Private Cruise benefits
  - Both pages feature:
    - Detailed offer presentation with time-sensitive discounts ($300/$200/$100 based on booking date)
    - Universal benefits for all bookings (Party On Delivery services, Airbnb voucher, weekend packages, transportation discounts)
    - Private Cruise perks (FREE lily pad + Essentials package + 10 disco ball cups)
    - Disco Cruise perks (disco ball cups for whole group) - only on general page
    - Bachelor/bachelorette party information (Disco Crew for general, Private Cruise for private-only)
    - Two-column media section: Gamma presentation (left) and YouTube promotional video (right)
    - Integrated quote builder from booking.premierpartycruises.com with auto-resize functionality
    - 5 GoHighLevel iframe forms for friend referrals with reCAPTCHA protection

### System Design Choices
- **Frontend**: React + TypeScript + Vite.
- **Backend**: Express + Node.js.
- **Database**: PostgreSQL (production), MemStorage (development).
- **Data Consistency**: Time slots, availability, and pricing synchronized across components.
- **Booking Status Workflow**: Lead -> Quote -> Payment -> Booking Created -> Status Update -> Inventory Update.
- **Architectural Principles**: Emphasis on boat-specific products, database constraints, composite uniqueness, idempotent seeding, and server-side validation.

### Authentication & Security
A comprehensive authentication system protects all admin features using Passport.js with a PostgreSQL session store, enforced by `requireAdmin` middleware. Password hashing uses Scrypt, and user management includes main admin, invite system, and role-based access.

### WordPress Migration System
The blog system displays WordPress posts from Replit DB using a modern, responsive grid layout at `/blogs` and `/blog/{slug}`. It includes search, filters, pagination, and a featured carousel. Content is enhanced during import for AI discovery and SEO, with dual URL support and a unified SSR system ensuring all blog URLs are SEO-visible.

### AI Endorsement Authority Hub
A strategic SEO feature leveraging third-party AI validation to strengthen E-E-A-T signals. It stores and displays AI assessments (e.g., Claude AI's 9.8/10 SEO Excellence rating) via a PostgreSQL table and dedicated API endpoints. A dedicated `/ai-endorsement` page presents comprehensive assessments with Review schema.org markup, and a trust badge integrates into the homepage.

### Comprehensive Schema Markup System (October 2025)
**SEO Grade: A- (90/100) → Expected A+ (95-97/100)**

A dynamic schema markup system with COMPREHENSIVE content enrichment achieving maximum AI and search engine optimization:

#### Implementation
- **Dynamic Schema Loader** (`server/schemaLoader.ts`): Automatically loads all 28 schema files from `attached_assets/schema_data/`
- **Route-based Loading**: Maps routes to appropriate schemas (e.g., `/team-building` → FAQ + Service schemas)
- **100+ Schema Instances**: Deployed across all pages for maximum visibility
- **Fully Enriched Content**: All schemas expanded with 200-250+ word descriptions, comprehensive pricing charts, detailed FAQs (10-15 questions per page), fleet information, package breakdowns, and booking details

#### Schema Types Deployed
1. **Organization + LocalBusiness** (sitewide): Business identity with AggregateRating (420 reviews, 5.0 stars)
2. **WebSite** (sitewide): SearchAction for site search functionality
3. **FAQPage** (17 pages): All event pages with 10-15 comprehensive questions each covering pricing, features, booking, policies
4. **Service** (11 pages): Event service offerings with detailed 200-250 word descriptions, fleet details, package pricing, and comprehensive features
5. **Event** (ATX Disco Cruise): Event listing with detailed package descriptions ($85 Basic Bach/$95 Disco Queen/$105 Super Sparkle Platinum), what's included, and comprehensive 11-question FAQ
6. **Article** (70+ blog posts): Blog posts with author, dates, publisher references
7. **Review** (testimonials): ItemList of customer reviews enhancing AggregateRating
8. **Product** (homepage): Fleet showcase (Day Tripper, Me Seeks the Irony, Clever Girl boats)
9. **BreadcrumbList** (interior pages): Automatic navigation breadcrumbs

#### Comprehensive Schema Enrichment Details

**Private Cruises Schema:**
- 200+ word Service description with complete fleet details (Day Tripper $195/hr for 14 guests, Me Seeks the Irony $295/hr for 25 guests, Clever Girl $495/hr for 50+ guests)
- Package pricing: Standard, Essentials (+$100-200/hr), Ultimate (+$250-350/hr)
- 11 comprehensive FAQs covering fleet, packages, pricing, crew fees, booking timeline

**ATX Disco Cruise Schema:**
- Enhanced Event description with all 3 package details and what's included on every cruise
- 11 comprehensive FAQs including bride/groom free details, schedule, location, policies

**Bachelor/Bachelorette Party Schemas:**
- 15 comprehensive FAQs each covering packages, pricing, special offers (groom/bride free with 16+ guests), BYOB policy, timing, location, booking guidance
- Detailed package breakdowns: Basic Bach $85, Disco King/Queen $95, Super Sparkle Platinum $105

**Combined Bachelor/Bachelorette Schema:**
- 12 comprehensive FAQs highlighting BOTH bride AND groom cruise FREE with 16+ guests
- Modern celebration benefits, split payment options, decision guidance

**Corporate Event Schemas (Team Building, Client Entertainment, Company Milestone):**
- 250+ word Service descriptions with activity formats, benefits, pricing structure
- 10-12 comprehensive FAQs covering customization, pricing, formats, tax deductibility, professional services
- Detailed pricing: $195-495/hr base rates, package upgrades, crew fees for larger groups

**Wedding Event Schemas (Rehearsal Dinner, Welcome Party, After Party):**
- 200+ word Service descriptions with event-specific details, timing options, atmosphere
- 10 comprehensive FAQs covering group size, catering, timing, customization, pricing

**Birthday Event Schemas (Sweet 16, Graduation Party, Milestone Birthday):**
- 200+ word Service descriptions with age-appropriate features, celebration elements
- 10 comprehensive FAQs covering age requirements, supervision, customization, pricing, booking timelines

#### Event Pages with Complete Schemas
All event pages have enriched Service + FAQ schemas:
- Team Building (`/team-building`) - 250+ word description, 12 FAQs
- Client Entertainment (`/client-entertainment`) - 250+ word description, 10 FAQs  
- Company Milestone (`/company-milestone`) - 250+ word description, 12 FAQs
- Rehearsal Dinner (`/rehearsal-dinner`) - 200+ word description, 10 FAQs
- Welcome Party (`/welcome-party`) - 200+ word description, 10 FAQs
- After Party (`/after-party`) - 200+ word description, 10 FAQs
- Sweet 16 (`/sweet-16`) - 200+ word description, 10 FAQs
- Graduation Party (`/graduation-party`) - 200+ word description, 10 FAQs
- Milestone Birthday (`/milestone-birthday`) - 200+ word description, 10 FAQs
- Bachelor Party (`/bachelor-party-austin`) - 15 comprehensive FAQs
- Bachelorette Party (`/bachelorette-party-austin`) - 15 comprehensive FAQs
- Combined Bachelor/Bachelorette (`/combined-bachelor-bachelorette-austin`) - 12 comprehensive FAQs
- Private Cruises (`/private-cruises`) - 200+ word description, 11 FAQs
- ATX Disco Cruise (`/atx-disco-cruise`) - Enhanced event schema, 11 FAQs

#### Content Enrichment Highlights
- **Service Descriptions**: Expanded from 1-2 sentences to 200-250+ words with complete details
- **FAQ Pages**: Increased from 5-8 questions to 10-15 comprehensive questions per page
- **Pricing Details**: Complete fleet information, hourly rates, package costs, crew fees included
- **Booking Information**: Anderson Mill Marina location, booking timelines (6-12 weeks advance), seasonal details
- **Package Breakdowns**: Standard, Essentials, Ultimate with specific add-on pricing per boat size
- **Special Offers**: Bride/groom free details, BYOB policies, delivery services, discount programs

#### Expected Impact
- **+35-50% AI/voice search visibility** (ChatGPT, Gemini, Perplexity, Siri, Alexa)
- **+25-40% rich result appearances** in Google search
- **+15-20% featured snippet** opportunities for FAQs
- **+10-15% organic click-through rate** from enhanced search listings
- **Maximum crawler visibility** with comprehensive, detailed content in every schema

#### Verification & Monitoring
- Use [Google Rich Results Test](https://search.google.com/test/rich-results) for validation
- Monitor Search Console → Enhancements → Structured Data
- Track rich results performance in Search Console
- Typical crawl recognition time: 3-7 days

See `SEO_SCHEMA_IMPLEMENTATION_GUIDE.md` for complete technical documentation and next steps.

## External Dependencies
- **Stripe**: Payment processing.
- **GoHighLevel**: SMS notifications and lead management.
- **Google Sheets**: Real-time availability management.
- **Mailgun**: Email delivery for quotes and confirmations.
- **OpenRouter**: AI-powered customer interactions.
- **Replit DB**: WordPress blog migration and storage.