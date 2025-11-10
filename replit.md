# Premier Party Cruises - Knowledge Base

## Overview
Premier Party Cruises offers party boat rentals on Lake Travis, Austin, with two primary experiences: the ATX Disco Cruise (all-inclusive bachelor/bachelorette parties) and Private Cruises (exclusive events). With over 15 years in business and a perfect safety record, the company aims to provide a seamless booking experience and detailed information for its unique offerings. The ATX Disco Cruise is the only multi-group all-inclusive bachelor/bachelorette cruise in the U.S., while Private Cruises offer customizable packages for various capacities.

## User Preferences
- CRITICAL: All fixes must work in BOTH preview AND production environments
- Iterative development with clear communication
- Transparency in pricing calculations
- Strict adherence to business rules (pricing, availability, booking logic)
- Clean, intuitive UI for customers and admins
- Server-side enforcement of all rules
- Identical time slot definitions across all components
- Real information only - no made-up details or "AI slop"

## System Architecture
The system utilizes a modern web architecture featuring a **React + TypeScript + Vite** frontend, styled with **Tailwind CSS** and **shadcn/ui** components, and **Wouter** for routing. The backend is powered by **Express + Node.js** with **PostgreSQL** for data persistence.

Key technical implementations include:
- **Xola Integration**: Embedded booking widgets for various products.
- **Quote Builder**: An embedded widget for generating quotes with source tracking and dynamic resizing.
- **Admin Dashboard**: Facilitates lead management, booking, and quote generation.
- **Real-time Availability**: Managed through Google Sheets integration.
- **Pricing Validation**: Server-side enforcement of private cruise package add-on flat fees.
- **Schema Markup**: Extensive SEO support with 28 schema files.
- **Authentication**: Handled by Passport.js using a PostgreSQL session store.
- **Server-Side Rendering (SSR)**: Implemented to ensure content is visible to crawlers for improved SEO.
- **Internal Linking System**: A hybrid contextual and structured system using a master link catalog and token-based replacement for enhanced SEO and navigation.
- **Server-Side Redirects**: 301 permanent redirects for legacy and broken URLs to manage SEO effectively.

UI/UX design prioritizes clear navigation and responsive design, incorporating components like `TableOfContents`, `StickyCTA`, `LazyImage`, and `CollapsibleSection`. Video testimonials and a `TransportationGuide` enhance the user experience. Hero sections incorporate video backgrounds with optimized typography for readability.

## External Dependencies
- **Stripe**: Payment processing.
- **GoHighLevel**: SMS notifications and lead management.
- **Google Sheets**: Real-time availability tracking.
- **Mailgun**: Email delivery services.
- **OpenRouter**: AI chatbot interactions.
- **Replit DB**: Stores WordPress blog content.
- **Xola**: Online booking widgets.