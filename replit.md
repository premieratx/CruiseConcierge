# Premier Party Cruises CRM

## Project Overview
Custom CRM with AI chatbot agent for Premier Party Cruises, a party boat business in Austin, Texas.

## Current State
- Basic dashboard structure built
- Backend infrastructure in place
- Chat widget component created but not functional
- Quote template system backend ready

## Requirements
1. **17hats-style CRM Interface**
   - Lead management with pipeline tracking
   - Quote creation and editing
   - Project management
   - Contact management

2. **AI Chatbot System**
   - Full-screen embeddable interface (OpenAI-style UI)
   - Button-driven flows for event types
   - Automated contact/project creation
   - Real-time availability checking

3. **Quote Management**
   - Template-based quotes with customization
   - Dynamic pricing with tax/gratuity
   - Smart deposit rules (25% if >30 days, 100% if <30 days)
   - Email/SMS delivery

## Integrations
- Mailgun for email (replacing SendGrid)
- OpenRouter for AI (replacing OpenAI)
- GoHighLevel for SMS (replacing Twilio)
- Google Sheets for availability
- Stripe for payments

## Tech Stack
- Full-stack JavaScript/TypeScript
- React + Vite frontend
- Express backend
- PostgreSQL database (when needed)
- Tailwind CSS + shadcn/ui