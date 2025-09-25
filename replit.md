# Premier Party Cruises CRM

## Overview
This project is a custom CRM with an AI chatbot agent designed for Premier Party Cruises, an Austin, Texas-based party boat business. It aims to streamline booking, payment, and customer management processes. Key capabilities include a 17hats-style CRM dashboard, a progressive AI chatbot booking flow, Stripe payment integration, real-time availability checking via Google Sheets, dynamic pricing, quote generation, and comprehensive admin tools for booking management. The system prevents double-bookings with a robust boat-specific time slot system and ensures production-ready architecture with verified database constraints.

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
The system features a progressive booking flow designed for an intuitive user experience. Admin dashboards include a calendar view for visual booking management, a leads pipeline, and a comprehensive booking table. The UI prioritizes transparent pricing breakdowns and clear display of boat capacities. Design uses Tailwind CSS and shadcn/ui components for a modern and consistent look.

### Technical Implementations
- **AI Chatbot**: Utilizes OpenRouter API for progressive booking interactions.
- **Booking Flow**: Guides users through event type, date, group size, time slot, and package selection, culminating in pricing display and payment options.
- **Admin Dashboard**: Provides tools for lead management, calendar-based booking oversight, quote generation, and detailed booking records.
- **Dynamic Pricing**: Calculates hourly rates, extra crew fees, taxes, gratuity, and deposits (25% or 100% based on event proximity) with transparent breakdowns.
- **Inventory Management**: Real-time availability fetched from Google Sheets, with a robust boat-specific time slot system.
- **Payment Processing**: Integrates Stripe for hosted checkouts, supporting deposit and full payments. All pricing validation occurs server-side.
- **Quote Generation**: Automatically generates detailed quotes for private and disco cruises, delivered via email.

### Feature Specifications
- **Pricing Rules**:
    - **Duration**: Monday-Thursday offers 3 and 4-hour options; Friday-Sunday offer 4-hour blocks.
    - **Boat Fleet**: Day Tripper (14-person), Me Seek (25-30 person with crew fee), The Irony (25-30 person with crew fee), Clever Girl (50-75 person with crew fee), ATX Disco (100-person for disco cruises). Capacity prominently displayed.
    - **Disco Cruise Packages**: Basic, Disco Queen, Platinum tiers ($85-$105/person) for specific Friday and Saturday slots.
- **Booking & Inventory**:
    - **Availability**: Sourced from Google Sheets, accessible via `/api/boats`, `/api/bookings`, `/api/disco/slots`.
    - **Double-Booking Prevention**: Implemented with database-level unique constraints on `(boat_id, start_time, end_time)`.
    - **Boat-Specific Products**: 47 products covering 42 unique time slots ensure granular inventory control.
- **Payment Processing**: Stripe hosted checkout via `/api/checkout/create-session`. Server-side pricing validation and booking details stored in Stripe metadata.
- **Quote Display**: Detailed breakdowns for private cruises (hourly rate, crew fee, tax, gratuity, deposit) and disco cruises (per-person package cost, total, time slot, group size).

### System Design Choices
- **Frontend**: React + TypeScript + Vite.
- **Backend**: Express + Node.js.
- **Database**: PostgreSQL for production, MemStorage for development.
- **Data Consistency**: Time slots, availability, and pricing are synchronized between calendar and chatbot components.
- **Booking Status Workflow**: Lead -> Quote -> Payment -> Booking Created -> Status Update -> Inventory Update.
- **Architectural Principles**: Emphasis on boat-specific products, database constraints for double-booking prevention, composite uniqueness, idempotent seeding for data stability, and server-side validation.

## WordPress Migration System
### AI-Optimized Content Enhancement
The WordPress migration system includes intelligent content enhancement to optimize for AI discovery across key event categories. During import, blog posts are automatically enhanced with:

**Target Event Categories:** Corporate events, wedding parties, bachelor/bachelorette parties, birthdays, graduations
**Service Integration:** Natural mentions of Party on Delivery alcohol delivery services
**Enhancement Pipeline:** Content → Topic Detection → AI Enhancement → Structured Data → Replit DB Storage
**Quality Controls:** Maximum 1 brand mention per 300 words, natural reading level maintained, randomized template variants
**Indexing:** Event-specific indexes (`index:event:<category>:posts`) for targeted content discovery

### Migration Features
- **Replit DB Storage**: Uses key-value structure (`post:<slug>`, `index:posts`, `tag:<slug>:posts`)
- **SEO Optimization**: Auto-generates meta titles, descriptions, and focus keywords
- **Brand Integration**: Premier Party Cruises and Party on Delivery branded content
- **CSV Export**: Verification report of imported content with keywords and categories

## External Dependencies
- **Stripe**: For payment processing (`VITE_STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`).
- **GoHighLevel**: For SMS notifications and lead management (`GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN`, `GOHIGHLEVEL_LOCATION_ID`, `FROM_PHONE`). **CRITICAL**: We use GoHighLevel for ALL SMS notifications, NOT Twilio. FROM_PHONE is set to `5124885892` for GoHighLevel SMS sending.
- **Google Sheets**: For real-time availability management (`GOOGLE_SHEETS_CREDENTIALS`, `SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`).
- **Mailgun**: For email delivery of quotes and confirmations (`MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_FROM`).
- **OpenRouter**: For AI-powered customer interactions (`OPENROUTER_API_KEY`).
- **Replit DB**: For WordPress blog migration and storage (`@replit/database`, `jsdom`, `slugify`).