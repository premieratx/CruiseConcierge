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
- **Quote Builder**: Lovable app integration for dynamic quotes.
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