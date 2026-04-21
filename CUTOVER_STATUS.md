# V2 Cutover Status — Replit-Independence

Tracks which Replit `/api` dependencies the V2 Netlify site still has.
Updated 2026-04-20.

## ✅ Done — runs without Replit

| Feature | Old source | New source |
|---|---|---|
| Blog posts, categories, tags, authors (read) | `/api/blog/public/*` | `/blog-data/*.json` (static export, shimmed via `static-blog-fetch-shim.ts`) |
| Homepage AI endorsement strip | `/api/endorsements/homepage` | `/static-data/endorsements-homepage.json` (shimmed) |
| Lead creation (quote builder, embedded flow, lead modal) | `/api/leads/quote-builder` or Supabase | Supabase `create-lead` edge function (uniform across all entry points) |
| Legacy contact form (`ContactInfoModal`) | `/api/leads/quote-builder` (Replit) | Supabase `create-lead` edge function |
| Chat widget on /quote | `/api/chat/message` (Replit Claude) | **Killed** — mount removed in `QuoteApp.tsx` |
| `/admin` route | Replit admin UI | 302 → `https://seo-command-center.netlify.app/login` |

## ⏳ Phase 2 — still on Replit `/api`, needs porting before apex DNS flip

These endpoints are **public-facing** and will break when `/api/*` self-loops.

### 1. Availability + Disco slot grid (CRITICAL)
- **Endpoints:** `/api/availability/*`, `/api/disco/slots`, `/api/disco/availability/public`, plus SSE invalidation
- **Consumers:** `StreamlinedBookingWidget`, `UniversalCalendar`, `AvailabilityGrid`, `CorporateBookingDialog`, `BookingFlow`, `hooks/use-availability.ts`, `hooks/use-slot-hold.ts`
- **Impact if broken:** Booking calendars go blank, Disco slot grid empty, booking impossible on multiple conversion pages.
- **Port path:** Supabase edge functions `availability-read`, `availability-hold`, `availability-release`. Supabase Realtime channel replaces SSE. Phase 1: read-only snapshot (1 edge fn, ~2 hrs). Phase 2: transactional holds (~3–4 hrs).

### 2. Pricing calculator (MEDIUM)
- **Endpoints:** `/api/pricing-settings`, `/api/pricing/calendar`, `/api/pricing/preview`
- **Consumers:** `pages/QuoteBuilder.tsx`, `components/QuoteBuilder.tsx`
- **Impact if broken:** Live pricing preview fails on quote builder; no calendar pricing.
- **Port path:** Either static JSON (starting prices only — aligns with stated pricing policy) OR a `pricing-preview` Supabase edge fn. Start with static; add edge fn only if full dynamic pricing is required.

### 3. Chat widget (NICE-TO-HAVE — killed)
- Killed on V2. If you want conversational entry back: port `chatbotService.ts` to a Supabase edge fn with `ANTHROPIC_API_KEY` secret. ~2–4 hrs.

### 4. Admin endpoints (DEFERRED — admin stays on seo-command-center)
- ~120 `/api/admin/*`, `/api/quotes`, `/api/projects`, `/api/bookings`, `/api/content-blocks`, `/api/media`, etc.
- The V2 `/admin` route now points at the separate Next.js command-center app (`seo-command-center.netlify.app`).
- Admin-only pages that still live inside this repo (e.g. `pages/Products.tsx`, `pages/Settings.tsx`, `pages/admin/*`) keep calling `/api/admin/*` — **do not ship those routes on V2**. The command-center replaces them.

## Cutover prerequisites (what you control)

1. **Availability edge functions deployed** (Phase 1 blocker — must complete before DNS flip or Disco + booking calendars go dark)
2. **Netlify custom domain added + SSL provisioned** for `premierpartycruises.com` on the V2 Netlify site (prep BEFORE DNS flip)
3. **`CANONICAL_HOST=https://premierpartycruises.com` env var** set on Netlify (sitemap + schema canonicals)
4. **Supabase env vars** verified: `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in Netlify matching `tgambsdjfwgoohkqopns`
5. **`api.premierpartycruises.com` subdomain deleted after cutover** — we're NOT using it; V2 is self-sufficient once Phase 2 is done
