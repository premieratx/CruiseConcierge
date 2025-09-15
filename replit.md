# Premier Party Cruises CRM

## Project Overview
Custom CRM with AI chatbot agent for Premier Party Cruises, a party boat business in Austin, Texas.

## Current State (Updated September 2025)
- ✅ 17hats-style CRM dashboard with lead management
- ✅ AI chatbot with progressive booking flow
- ✅ Stripe payment integration with hosted checkout
- ✅ Real-time availability checking via Google Sheets
- ✅ Dynamic pricing with transparent calculations
- ✅ Quote generation and email delivery
- ✅ Private cruise and ATX Disco cruise booking flows
- ✅ Admin dashboard with booking management
- ⚠️  Critical fixes needed: Double-booking prevention

## COMPREHENSIVE BUSINESS RULES & REQUIREMENTS

### 1. PRICING RULES

#### Duration Rules (CRITICAL)
- **Monday-Thursday**: 3-hour cruises only
- **Friday-Sunday**: 4-hour cruises only  
- Duration determines base pricing calculations
- Must be consistently applied across calendar and chatbot

#### Boat Capacity Tiers
- **≤15 people**: 15-person boat (dayTripper)
- **≤25 people**: 25-person boat (medium)
- **≤50 people**: 50-person boat (large)
- **≤75 people**: 75-person boat (maximum capacity)
- Capacity MUST be displayed in cruise headings: "Private Cruise (Fits X People)"

#### Pricing Calculations
- **Hourly Rate Display**: Show price per hour × duration = base cost
- **Extra Crew Fee**: $200 for groups >20 people
- **Tax**: 8.25% on subtotal
- **Gratuity**: 20% on subtotal  
- **Deposit Rules**: 
  - 25% if event >30 days out
  - 100% if event <30 days out
- **Pricing Transparency**: Always show calculation breakdown to customers

#### Disco Cruise Packages (Bachelor/Bachelorette Only)
- **Basic Package**: $85.00 per person
- **Disco Queen Package**: $95.00 per person
- **Platinum Package**: $105.00 per person
- Available Friday/Saturday only with 4-hour duration

### 2. BOOKING & INVENTORY MANAGEMENT

#### Availability Sources
- **Primary**: Google Sheets integration for real-time availability
- **Calendar View**: Fetches from `/api/boats`, `/api/bookings`, `/api/disco/slots`
- **Chatbot**: Uses same API endpoints for consistency
- **Time Slots**: MUST be identical between calendar and chat components

#### Critical Inventory Issues (NEEDS IMMEDIATE FIX)
- **Double-Booking Risk**: Payment processing lacks availability conflict checking
- **Missing Validation**: `createBookingFromPayment()` doesn't verify slot availability
- **Manual Updates**: Google Sheets requires manual inventory management
- **Race Conditions**: Multiple users can book same slot simultaneously

#### Required Fixes
1. Add conflict checking before payment processing
2. Implement automatic Google Sheets updates after booking
3. Add payment rollback for failed bookings
4. Centralize time slot definitions between components

### 3. PAYMENT PROCESSING

#### Stripe Integration
- **Hosted Checkout**: Use `/api/checkout/create-session` endpoint
- **Payment Types**: Deposit (25%/100%) and Full payment options
- **Server Validation**: All pricing calculated server-side to prevent tampering
- **Metadata**: Complete booking details stored in Stripe metadata
- **Success Flow**: Redirects to `/booking-success` with confirmation
- **Cancel Flow**: Returns to `/chat` for rebooking

#### Payment Button Behavior (FIXED)
- **"Pay Deposit"**: Redirects to Stripe checkout with deposit amount
- **"Pay in Full"**: Redirects to Stripe checkout with full amount
- **"Send Quote"**: Goes to contact form for quote generation
- Buttons disabled until all selections made

### 4. QUOTE DISPLAY REQUIREMENTS

#### Private Cruise Quotes
- **Heading**: "Private Cruise (Fits X People)" with boat capacity
- **Duration**: "X hour cruise" prominently displayed
- **Pricing Breakdown**:
  - Hourly rate: "$X/hour"
  - Calculation: "$X/hour × Y hours = $Z"
  - Extra crew fee (if applicable): "$200 (groups >20)"
  - Subtotal, tax, gratuity, total
  - Deposit amount and balance due

#### Disco Cruise Quotes
- **Package Selection**: Basic, Disco Queen, Platinum tiers
- **Per-Person Display**: Show price per person and total
- **Time Slot Selection**: Friday/Saturday slots only
- **Group Size**: Ticket quantity selector

### 5. TECHNICAL ARCHITECTURE

#### Frontend Components
- **Chat.tsx**: Progressive booking flow with pricing calculations
- **CalendarView.tsx**: Admin booking calendar with availability
- **Checkout.tsx**: Stripe payment integration
- **BookingsTable.tsx**: Admin booking management
- **Navigation.tsx**: CRM navigation with back button fixes

#### Backend Services
- **routes.ts**: API endpoints for pricing, booking, payment processing
- **storage.ts**: Data persistence with booking conflict checking
- **googleSheets.ts**: Availability management and updates
- **Stripe Webhooks**: Payment confirmation and booking creation

#### Critical Endpoints
- **`/api/checkout/create-session`**: Server-side payment validation
- **`/api/webhooks/stripe`**: Payment confirmation processing  
- **`/api/create-payment-intent`**: Alternative payment method
- **`/api/boats`**: Real-time boat availability
- **`/api/bookings`**: Booking management and conflicts

### 6. DATA CONSISTENCY RULES

#### Calendar ↔ Chatbot Sync
- **Time Slots**: Identical definitions across components
- **Availability**: Real-time updates from same data source
- **Pricing**: Consistent calculations in all views
- **Duration Logic**: Same 3hr/4hr rules everywhere

#### Booking Status Flow
1. **Lead Created**: From chatbot contact form
2. **Quote Sent**: Email delivery with pricing
3. **Payment Processed**: Stripe webhook confirmation
4. **Booking Created**: Automatic conversion from payment
5. **Status Updated**: Project marked as "CLOSED_WON"
6. **Inventory Updated**: Google Sheets marked as booked

### 7. INTEGRATION SPECIFICATIONS

#### Stripe (Payment Processing)
- **Public Key**: `VITE_STRIPE_PUBLIC_KEY`
- **Secret Key**: `STRIPE_SECRET_KEY`
- **Webhooks**: Payment confirmation handling
- **Hosted Checkout**: Primary payment method

#### GoHighLevel (SMS)
- **API Key**: `GOHIGHLEVEL_API_KEY`
- **Location ID**: `GOHIGHLEVEL_LOCATION_ID`
- **Private Token**: `GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN`
- **Usage**: SMS notifications and lead management

#### Google Sheets (Availability)
- **Credentials**: `GOOGLE_SHEETS_CREDENTIALS`
- **Sheet ID**: `SHEET_ID`
- **Service Account**: `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`
- **Usage**: Real-time availability management

#### Mailgun (Email)
- **API Key**: `MAILGUN_API_KEY`
- **Domain**: `MAILGUN_DOMAIN`
- **From Address**: `MAILGUN_FROM`
- **Usage**: Quote delivery and booking confirmations

#### OpenRouter (AI)
- **API Key**: `OPENROUTER_API_KEY`
- **Usage**: AI-powered customer interactions

### 8. USER EXPERIENCE REQUIREMENTS

#### Progressive Booking Flow
1. **Event Type Selection**: Bachelor/bachelorette vs other events
2. **Date Selection**: With real-time availability checking
3. **Group Size**: Slider with min 8, max 75 people
4. **Time Slot Selection**: Available slots for selected date
5. **Package Selection**: Private cruise options or disco packages
6. **Pricing Display**: Transparent calculation breakdown
7. **Payment Options**: Deposit, full payment, or quote generation
8. **Stripe Checkout**: Hosted payment processing
9. **Confirmation**: Booking success with details

#### Admin Dashboard Features
- **Lead Pipeline**: Track prospects through booking process
- **Calendar View**: Visual booking management
- **Quote Management**: Create and send custom quotes
- **Booking Table**: Comprehensive booking details
- **Analytics**: Conversion rates and revenue metrics

### 9. CRITICAL FIXES NEEDED

#### High Priority (Production Risks)
1. **Double-Booking Prevention**: Add availability conflict checking
2. **Payment Rollback**: Handle failed bookings after payment
3. **Automatic Inventory**: Update Google Sheets after bookings
4. **Real-Time Sync**: Ensure calendar reflects new bookings

#### Medium Priority (User Experience)
1. **Loading States**: Better UX during pricing calculations
2. **Error Handling**: More specific error messages
3. **Mobile Optimization**: Responsive design improvements
4. **Performance**: Optimize availability checking

#### Low Priority (Enhancements)
1. **Multi-Language**: Support for Spanish customers
2. **Advanced Analytics**: Detailed reporting dashboard
3. **Automated Emails**: Follow-up sequences
4. **Custom Packages**: Dynamic pricing rules

### 10. TESTING REQUIREMENTS

#### Payment Flow Testing
- Private cruise deposit payments
- Private cruise full payments  
- Disco cruise deposit payments
- Disco cruise full payments
- Payment failure scenarios
- Webhook processing verification

#### Availability Testing
- Calendar and chatbot consistency
- Double-booking prevention
- Real-time updates
- Peak load scenarios

#### Integration Testing
- Stripe webhook delivery
- Google Sheets updates
- Email delivery (Mailgun)
- SMS notifications (GoHighLevel)

## Recent Changes (September 2025)

### Fixed Issues
- ✅ **Payment Button Routing**: Fixed chatbot payment buttons to redirect to Stripe checkout instead of contact form
- ✅ **Boat Capacity Display**: Corrected capacity logic to properly round up to appropriate boat sizes
- ✅ **Pricing Calculations**: Implemented transparent hourly rate breakdowns with duration-based calculations
- ✅ **Navigation Issues**: Fixed sticky header and back button visibility in admin dashboard
- ✅ **Duration Logic**: Enforced 3-hour (Mon-Thu) vs 4-hour (Fri-Sun) rules consistently
- ✅ **Loading States**: Added proper null guards and loading indicators for pricing

### Architecture Decisions
- Prefer server-side pricing validation over client calculations
- Use Stripe hosted checkout for security and PCI compliance
- Centralize availability checking through Google Sheets integration
- Implement progressive disclosure in booking flow for better UX
- Maintain data consistency between calendar and chatbot components

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express + Node.js
- **Database**: PostgreSQL (production) + MemStorage (development)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Payments**: Stripe with hosted checkout
- **Email**: Mailgun API
- **SMS**: GoHighLevel API
- **Availability**: Google Sheets API
- **AI**: OpenRouter API