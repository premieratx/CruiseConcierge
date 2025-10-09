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

### Schema & FAQ Comprehensive Update
A complete overhaul of all structured data markup and FAQ content across the website using corrected JSONLD source files. This includes updated business information, Organization, Event, Service, and FAQ Schema markups across 28 files, ensuring accurate SEO and enhanced search engine visibility. SSR schema integration is updated in `server/ssr/renderer.ts` and React components for immediate crawler visibility.

## External Dependencies
- **Stripe**: Payment processing.
- **GoHighLevel**: SMS notifications and lead management.
- **Google Sheets**: Real-time availability management.
- **Mailgun**: Email delivery for quotes and confirmations.
- **OpenRouter**: AI-powered customer interactions.
- **Replit DB**: WordPress blog migration and storage.