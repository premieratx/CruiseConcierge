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
- **Database Keepalive System**: An internal service pings the database every 4 minutes to prevent it from going dormant, coupled with increased database connection timeouts to handle cold starts.

### System Design Choices
- **Frontend**: React + TypeScript + Vite.
- **Backend**: Express + Node.js.
- **Database**: PostgreSQL (production), MemStorage (development).
- **Centralized Availability System**: Unified system as the single source of truth for both customer-facing (Quote Builder) and administrative (Admin Calendar) components, ensuring perfect synchronization. This includes static pricing configuration, product definitions in PostgreSQL, a centralized availability API, and seamless linkage between quotes and calendar updates.
- **Lovable Quote Builder Integration**: Quote builder functionality is integrated via an external Lovable application served as standalone HTML at `/chat`. This leverages Lovable's real-time booking system for a 5-step public booking flow.
- **Data Consistency**: Time slots, availability, and pricing synchronized across components.
- **Booking Status Workflow**: Lead -> Quote -> Payment -> Booking Created -> Status Update -> Inventory Update.
- **Architectural Principles**: Emphasis on boat-specific products, database constraints, composite uniqueness, idempotent seeding, and server-side validation.
- **Authentication & Security**: Comprehensive authentication using Passport.js with a PostgreSQL session store, enforced by `requireAdmin` middleware. Scrypt for password hashing, user management includes main admin, invite system, and role-based access.
- **Comprehensive Schema Markup System**: A dynamic system with comprehensive content enrichment for maximum AI and search engine optimization.
    - **Implementation**: Unified Schema Injection (`server/ssr/renderer.ts`) handles schema for all routes. Dynamic Schema Loader (`server/schemaLoader.ts`) loads 28 schema files from `attached_assets/schema_data/`. Route-based loading maps routes to appropriate schemas. Sitewide Organization + WebSite schemas are injected. Schema-only injection for non-SSR pages ensures SEO visibility without JavaScript.
    - **Schema Types Deployed**: Organization + LocalBusiness, WebSite, FAQPage (17 pages), Service (11 pages), Event (ATX Disco Cruise), Article (70+ blog posts), Review (testimonials), Product (homepage), BreadcrumbList.
    - **Content Enrichment**: All schemas are expanded with 200-250+ word descriptions, comprehensive pricing charts, detailed FAQs (10-15 questions per page), fleet information, package breakdowns, and booking details for various event pages.
    - **Critical SEO Requirements**: Schema markup and SEO visibility must remain intact. Protected components include `server/ssr/renderer.ts`, `server/schemaLoader.ts`, `attached_assets/schema_data/`, Sitemap & Robots.txt. All marketing pages must be in `SSR_ROUTES` for full HTML content visibility to search engines.

## Deployment & SEO Safeguards (MANDATORY)

### Critical Production Protection Rules
**⚠️ BEFORE publishing ANY code changes, you MUST run validation checks to prevent production breakage and SEO regression!**

### When to Run Validation Checks

#### ALWAYS Run Pre-Deployment Check Before:
- Publishing/deploying to production
- Making changes to `client/index.html` (template file)
- Modifying Vite configuration (`vite.config.ts`) or build process
- Adding/removing Vite plugins or React dependencies
- Any change affecting the production bundle

#### ALWAYS Run SEO Validation Before:
- Modifying `server/ssr/renderer.ts` (SSR routes configuration)
- Changing `server/schemaLoader.ts` (schema injection logic)
- Editing schema files in `attached_assets/schema_data/`
- Removing pages from SSR_ROUTES array
- Changing meta tag generation or React Helmet usage

### Validation Commands

Use the validation wrapper script for easy access to all checks:

```bash
# Pre-deployment validation (checks React Refresh, schemas, SSR, bundles)
./scripts/validate.sh pre-deploy

# SEO validation on production site (after deployment)
./scripts/validate.sh seo-prod

# SEO validation on local dev server (server must be running)
./scripts/validate.sh seo-local

# Run all validations (comprehensive check)
./scripts/validate.sh all

# Show help
./scripts/validate.sh help
```

Or run scripts directly:
```bash
# Pre-deployment checks
npm run build
node scripts/pre-deploy-check.js

# SEO validation (production)
node scripts/seo-validation.js https://premierpartycruises.com

# SEO validation (local)
node scripts/seo-validation.js http://localhost:5000
```

### What Each Validation Checks

#### Pre-Deployment Validation (`scripts/pre-deploy-check.js`)
- ❌ **React Refresh in Production** - Scans index.html and all JS bundles for development-only code that breaks production
- ✅ **Schema System Integrity** - Verifies schemaLoader.ts, renderer.ts integration, and schema_data directory exist
- ✅ **SSR Configuration** - Confirms critical routes (/, /blogs, /bachelor-party-austin, etc.) are in SSR_ROUTES
- ✅ **Bundle Integrity** - Validates main bundle exists with reasonable size
- ✅ **Critical Files Present** - Ensures dist/index.js, server files exist

**Exit Codes:**
- `0` = All checks passed, safe to deploy
- `1` = Critical errors found, DO NOT deploy

**Example Output:**
```
✓ index.html is clean (no React Refresh)
✓ All JS bundles clean (197 files checked)
✓ Schema system configured
✓ All critical SSR routes present
✅ SAFE TO DEPLOY
```

#### SEO Validation (`scripts/seo-validation.js`)
- 📊 **Word Count Check** - Ensures AI visibility (3000+ words homepage, 2500+ event pages)
- 📋 **Schema Count** - Verifies 5-8 schema blocks per critical page
- 🏷️ **Meta Tags** - Checks description, Open Graph, Twitter Card tags
- 🔍 **Schema Types** - Confirms Organization, LocalBusiness, WebSite schemas present

**Target Metrics:**
- Homepage: 8 schemas, 3000+ words
- Bachelor/Bachelorette/Private Cruises: 5 schemas, 2500+ words
- ATX Disco Cruise: 5 schemas, 1500+ words

### Deployment Checklist

**Before EVERY production deployment:**

1. ✅ Run full production build: `npm run build`
2. ✅ Run pre-deploy validation: `./scripts/validate.sh pre-deploy`
3. ✅ Review all errors and warnings carefully
4. ✅ Fix any critical issues (exit code 1 = blocker)
5. ✅ Only after passing: Click "Publish" button in Replit
6. ✅ After deployment completes: Run `./scripts/validate.sh seo-prod`
7. ✅ Verify production site in incognito browser window

**Never skip validation!** These checks prevent:
- React Refresh errors that crash the entire site
- SEO regression and lost search visibility
- Missing schema markup (breaks Google Rich Results)
- SSR misconfiguration (search engines can't crawl content)

### Protected Files - Validation Required

#### Production Build Files:
- `client/index.html` - HTML template (NEVER add development scripts!)
- `vite.config.ts` - Build configuration (ask user before modifying)
- `package.json` - Dependencies and scripts (ask user before modifying)

#### SEO/Schema Files (run SEO validation after changes):
- `server/ssr/renderer.ts` - SSR route configuration
- `server/schemaLoader.ts` - Schema injection logic  
- `attached_assets/schema_data/*.json` - Schema markup files
- All marketing page components using React Helmet

### Known Issues & Rollback

**Production Site Crash - October 16, 2025:**
- **Issue**: `Jn.injectIntoGlobalHook is not a function` error
- **Cause**: Hardcoded React Refresh script in `client/index.html` (lines 4-10)
- **Fix**: Removed hardcoded script, rebuilt with clean bundle
- **Prevention**: Pre-deploy validation now catches this automatically

**Emergency Rollback Procedure:**

If production breaks despite validation:

1. Check `client/index.html` for any `/@react-refresh` or `RefreshRuntime` imports
2. Review Recent Changes section for similar known issues
3. Compare current bundle hash (`index-*.js`) with last known good version
4. Run `./scripts/validate.sh pre-deploy` to identify the issue
5. Contact user for Replit project rollback if needed

## External Dependencies
- **Stripe**: Payment processing.
- **GoHighLevel**: SMS notifications and lead management.
- **Google Sheets**: Real-time availability management (tracking only).
- **Mailgun**: Email delivery for quotes and confirmations.
- **OpenRouter**: AI-powered customer interactions.
- **Replit DB**: WordPress blog migration and storage.