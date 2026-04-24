import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import { useQuoteLightbox } from '@/components/QuoteLightbox';
import CtaPair, { CtaBanner } from '@/components/CtaPair';
import EmbeddedQuoteFlow from '@/components/EmbeddedQuoteFlow';
import WhyPremierBlock from '@/components/WhyPremierBlock';
import TripHighlightTestimonials from '@/components/TripHighlightTestimonials';
import { ScrollingBackground } from '@/lead-app/components/ScrollingBackground';

const Footer = lazy(() => import('@/components/Footer'));

// ─── Inline Styles ──────────────────────────────────────────────────────────
const HP2_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

:root {
  --hp2-bg-0: #07070C;
  --hp2-bg-1: #0F0F18;
  --hp2-bg-2: #141420;
  --hp2-bg-card: #1A1A26;
  --hp2-gold: #C8A96E;
  --hp2-gold-light: #DFC08A;
  --hp2-gold-pale: #EDD9AA;
  --hp2-gold-dim: rgba(200,169,110,0.12);
  --hp2-gold-dim2: rgba(200,169,110,0.22);
  --hp2-cream: #F0E6D0;
  --hp2-cream-muted: #C8B898;
  --hp2-ltext: #EDE3D0;
  --hp2-text-muted: #A89878;
  --hp2-border: rgba(200,169,110,0.16);
  --hp2-border-sub: rgba(255,255,255,0.06);
  --hp2-font-display: 'Cormorant Garamond', Georgia, serif;
  --hp2-font-body: 'Jost', system-ui, sans-serif;
}

.hp2-page {
  background: var(--hp2-bg-0);
  color: var(--hp2-ltext);
  font-family: var(--hp2-font-body);
  font-weight: 400;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  transition: background-color 240ms ease, color 240ms ease;
}

/* ──────────────────────────────────────────────────────────────
   LIGHT FESTIVE THEME (.hp2-light on .hp2-page root)
   Bright logo blue as the primary color, yellow+gold as accent
   pops, white/cream body. Daytime-boat-party energy. High contrast.
   ────────────────────────────────────────────────────────────── */
.hp2-page.hp2-light {
  /* Surfaces */
  --hp2-bg-0: #FFFFFF;
  --hp2-bg-1: #F7FAFE;         /* faint blue-tinted cream band */
  --hp2-bg-2: #EAF2FB;         /* stronger blue-tinted band */
  --hp2-bg-card: #FFFFFF;
  /* Primary = logo bright blue */
  --hp2-logo-blue: #1E6EC5;    /* bright, saturated — festive */
  --hp2-logo-blue-deep: #0E4B8F;  /* used for text-on-yellow */
  --hp2-logo-blue-soft: #D9E8F8;
  --hp2-logo-blue-band: #0E4B8F;  /* hero / cta band bg */
  /* Accent = logo yellow + classic gold */
  --hp2-logo-yellow: #F7C948;    /* sunlit yellow */
  --hp2-logo-yellow-soft: #FFE8A3;
  --hp2-gold: #B8914E;           /* kept continuity */
  --hp2-gold-light: #D7B275;
  --hp2-gold-pale: #EFDDB5;
  --hp2-gold-dim: rgba(184,145,78,0.14);
  --hp2-gold-dim2: rgba(247,201,72,0.28);  /* yellow-tinted divider */
  /* Text — near-black for maximum contrast */
  --hp2-cream: #0A0A12;
  --hp2-cream-muted: #3E3E52;
  --hp2-ltext: #0A0A12;
  --hp2-text-muted: #54546A;
  --hp2-border: rgba(30, 110, 197, 0.18);
  --hp2-border-sub: rgba(10, 10, 18, 0.08);
}

/* Hero video overlay — VERY LIGHT so drone footage shows through.
 * Readability comes from a frosted panel behind the text, not from
 * darkening the video. Matches the actual markup class .hp2-hero__overlay. */
.hp2-page.hp2-light .hp2-hero__video-overlay,
.hp2-page.hp2-light .hp2-hero__overlay {
  background: linear-gradient(180deg,
    rgba(255,255,255,0.08) 0%,
    rgba(30, 110, 197, 0.06) 50%,
    rgba(14, 75, 143, 0.12) 100%) !important;
}
.hp2-page.hp2-light .hp2-hero__overlay::after {
  display: none !important;
}
.hp2-page.hp2-light .hp2-hero__video {
  opacity: 1 !important;
}

/* ─── Hero in light mode — clean, simple, no drama ───
 * Single opaque white card, zero nested panels, zero dark blob,
 * zero backdrop-filter. Video plays behind with full opacity so
 * the drone footage is visible on either side of the card. */
.hp2-page.hp2-light .hp2-hero .hp2-hero__content {
  background: #ffffff !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 2.5rem 3rem !important;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(14, 75, 143, 0.18),
    0 0 0 1px rgba(14, 75, 143, 0.08) inset !important;
  max-width: 720px;
}

/* KILL the ::before dark radial blob in light mode — it was
 * rendering a dark halo left of the content card. */
.hp2-page.hp2-light .hp2-hero .hp2-hero__content::before {
  display: none !important;
  content: none !important;
  background: none !important;
  filter: none !important;
}

/* Every hero text element: clear dark-theme text-shadow, reset any
 * background leftover, render dark on the opaque card. */
.hp2-page.hp2-light .hp2-hero__eyebrow,
.hp2-page.hp2-light .hp2-hero__headline,
.hp2-page.hp2-light .hp2-hero__body,
.hp2-page.hp2-light .hp2-hero h1,
.hp2-page.hp2-light .hp2-hero p {
  text-shadow: none !important;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  color: var(--hp2-ltext) !important;
}
.hp2-page.hp2-light .hp2-hero__headline em,
.hp2-page.hp2-light .hp2-hero h1 em {
  color: var(--hp2-logo-blue) !important;
  background: transparent !important;
  text-shadow: none !important;
}
.hp2-page.hp2-light .hp2-hero__eyebrow {
  color: var(--hp2-logo-blue-deep) !important;
  font-weight: 700 !important;
  letter-spacing: 0.2em !important;
  margin-bottom: 1.25rem !important;
}
.hp2-page.hp2-light .hp2-hero__rule {
  border-color: var(--hp2-logo-yellow) !important;
  margin: 1.25rem 0 !important;
}

/* Headings: near-black for max contrast on white */
.hp2-page.hp2-light h1,
.hp2-page.hp2-light h2,
.hp2-page.hp2-light h3,
.hp2-page.hp2-light h4,
.hp2-page.hp2-light h5 {
  color: var(--hp2-ltext) !important;
}

/* Italicized em inside headings gets the logo BLUE (primary) —
 * not gold — so the brand color leads. */
.hp2-page.hp2-light h1 em,
.hp2-page.hp2-light h2 em,
.hp2-page.hp2-light h3 em {
  color: var(--hp2-logo-blue) !important;
  font-style: italic;
}

/* Primary CTA = bright blue filled with white text (high contrast).
 * Secondary CTA = yellow filled with deep-blue text (festive accent). */
.hp2-page.hp2-light a[class*="btn-primary"],
.hp2-page.hp2-light button[class*="btn-primary"],
.hp2-page.hp2-light .hp2-cta-primary,
.hp2-page.hp2-light .hp2-btn-filled {
  background: var(--hp2-logo-blue) !important;
  color: #ffffff !important;
  border: 1px solid var(--hp2-logo-blue) !important;
  font-weight: 700 !important;
  box-shadow: 0 6px 18px rgba(30, 110, 197, 0.32) !important;
}
.hp2-page.hp2-light a[class*="btn-primary"]:hover,
.hp2-page.hp2-light button[class*="btn-primary"]:hover,
.hp2-page.hp2-light .hp2-cta-primary:hover,
.hp2-page.hp2-light .hp2-btn-filled:hover {
  background: var(--hp2-logo-blue-deep) !important;
  transform: translateY(-1px);
}

/* Yellow accent pill — used for "Book in next 10 days" style callouts */
.hp2-page.hp2-light a[class*="btn-accent"],
.hp2-page.hp2-light button[class*="btn-accent"],
.hp2-page.hp2-light .hp2-cta-accent {
  background: var(--hp2-logo-yellow) !important;
  color: var(--hp2-logo-blue-deep) !important;
  border: 1px solid #E8B52E !important;
  font-weight: 700 !important;
  box-shadow: 0 6px 18px rgba(247, 201, 72, 0.38) !important;
}

/* Body text: dark on light */
.hp2-page.hp2-light p,
.hp2-page.hp2-light li,
.hp2-page.hp2-light span {
  color: var(--hp2-ltext);
}

/* "Cream muted" wherever it was used on dark theme → slate-muted on light */
.hp2-page.hp2-light [style*="var(--hp2-cream-muted)"],
.hp2-page.hp2-light [style*="--hp2-cream-muted"] {
  color: var(--hp2-text-muted) !important;
}

/* Nav / top chrome: crisp white with thin blue hairline */
.hp2-page.hp2-light nav,
.hp2-page.hp2-light header {
  background-color: rgba(255, 255, 255, 0.96) !important;
  border-bottom: 1px solid var(--hp2-border) !important;
  backdrop-filter: blur(14px);
}

/* ─── Nav links (lux-nav-link): bigger, black, blue + underline when active ─── */
.hp2-page.hp2-light .lux-nav-link {
  font-size: 0.98rem !important;
  font-weight: 600 !important;
  color: var(--hp2-ltext) !important;
  letter-spacing: 0.04em !important;
  text-transform: uppercase;
}

.hp2-page.hp2-light .lux-nav-link:hover {
  color: var(--hp2-logo-blue) !important;
}

.hp2-page.hp2-light .lux-nav-link.active {
  color: var(--hp2-logo-blue) !important;
  text-decoration: underline;
  text-decoration-color: var(--hp2-logo-blue);
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}

.hp2-page.hp2-light .lux-nav-link.active::after {
  background: var(--hp2-logo-blue) !important;
  width: calc(100% - 1.8rem) !important;
  height: 2px !important;
}

.hp2-page.hp2-light .lux-nav-link:hover::after {
  background: var(--hp2-logo-blue) !important;
}

/* Brand word mark: near-black with blue italic em */
.hp2-page.hp2-light .lux-nav-brand-name {
  color: var(--hp2-ltext) !important;
}
.hp2-page.hp2-light .lux-nav-brand-name em {
  color: var(--hp2-logo-blue) !important;
}
.hp2-page.hp2-light .lux-nav-brand-sub {
  color: var(--hp2-text-muted) !important;
}

/* Promo banner at very top: sunlit yellow bg with deep-blue text. Force
 * every descendant (spans, links, icons, separators) to the dark-blue
 * color so nothing inherits the muted gold from the dark theme. */
.hp2-page.hp2-light .lux-promo-banner,
body.ppc-light .lux-promo-banner {
  background: var(--hp2-logo-yellow, #F7C948) !important;
  color: #0E4B8F !important;
  border-bottom: 1px solid rgba(14, 75, 143, 0.25) !important;
}
.hp2-page.hp2-light .lux-promo-banner *,
body.ppc-light .lux-promo-banner * {
  color: #0E4B8F !important;
  font-weight: 600 !important;
}
.hp2-page.hp2-light .lux-promo-line--cta,
body.ppc-light .lux-promo-line--cta {
  text-decoration: underline !important;
  text-decoration-thickness: 2px !important;
  text-underline-offset: 3px !important;
  font-weight: 700 !important;
}
.hp2-page.hp2-light .lux-promo-line--cta:hover,
body.ppc-light .lux-promo-line--cta:hover {
  color: #0A2D54 !important;
}

/* ────────────────────────────────────────────────
   UNIFIED BUTTON SYSTEM (light theme)
   Primary  = bright logo blue fill + white text
   Secondary = gold fill + deep-blue text
   Outline  = white bg, blue border, blue text
   ──────────────────────────────────────────────── */
.hp2-page.hp2-light .hp2-btn-primary,
.hp2-page.hp2-light [data-btn="primary"],
.hp2-page.hp2-light a.btn-primary,
.hp2-page.hp2-light button.btn-primary {
  background: var(--hp2-logo-blue) !important;
  color: #ffffff !important;
  border: 1px solid var(--hp2-logo-blue) !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em;
  padding: 0.85rem 1.8rem !important;
  border-radius: 8px !important;
  box-shadow: 0 6px 18px rgba(30, 110, 197, 0.32) !important;
  transition: all 180ms ease;
}
.hp2-page.hp2-light .hp2-btn-primary:hover {
  background: var(--hp2-logo-blue-deep) !important;
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(14, 75, 143, 0.4) !important;
}

.hp2-page.hp2-light .hp2-btn-secondary,
.hp2-page.hp2-light [data-btn="secondary"] {
  background: var(--hp2-logo-yellow) !important;
  color: var(--hp2-logo-blue-deep) !important;
  border: 1px solid #E8B52E !important;
  font-weight: 700 !important;
  padding: 0.85rem 1.8rem !important;
  border-radius: 8px !important;
  box-shadow: 0 6px 18px rgba(247, 201, 72, 0.4) !important;
}
.hp2-page.hp2-light .hp2-btn-secondary:hover {
  background: #F0BC2E !important;
  transform: translateY(-1px);
}

.hp2-page.hp2-light .hp2-btn-outline {
  background: #ffffff !important;
  color: var(--hp2-logo-blue) !important;
  border: 2px solid var(--hp2-logo-blue) !important;
  font-weight: 700 !important;
}
.hp2-page.hp2-light .hp2-btn-outline:hover {
  background: var(--hp2-logo-blue) !important;
  color: #ffffff !important;
}

/* Catch-all: any existing "Get a Quote" / "Book Now" / "Learn More" /
 * "Explore Charters" anchor styled via hp2-cta-* gets the same blue+gold
 * treatment so every CTA on the page is visually consistent. */
.hp2-page.hp2-light [class*="hp2-cta"],
.hp2-page.hp2-light .lux-btn-primary,
.hp2-page.hp2-light a[href="/quote"]:not(.lux-nav-link):not(.lux-promo-line),
.hp2-page.hp2-light button[class*="BookNow"],
.hp2-page.hp2-light a[href*="book"] {
  background: var(--hp2-logo-blue) !important;
  color: #ffffff !important;
  border: 1px solid var(--hp2-logo-blue) !important;
  font-weight: 700 !important;
  box-shadow: 0 6px 18px rgba(30, 110, 197, 0.32) !important;
}
.hp2-page.hp2-light [class*="hp2-cta"]:hover,
.hp2-page.hp2-light .lux-btn-primary:hover {
  background: var(--hp2-logo-blue-deep) !important;
}

/* Gold button variant — used for "Learn More" / "Explore Charters" on
 * the "Two ways to celebrate" cards. Apply gold fill with deep-blue text
 * to maintain high contrast. */
.hp2-page.hp2-light .hp2-card-outer a[class*="learn"],
.hp2-page.hp2-light .hp2-card-outer a[class*="explore"],
.hp2-page.hp2-light [data-slot="card"] a[href*="atx-disco"],
.hp2-page.hp2-light [data-slot="card"] a[href*="private"] {
  background: var(--hp2-logo-yellow) !important;
  color: var(--hp2-logo-blue-deep) !important;
  border: 1px solid #E8B52E !important;
}

/* ────────────────────────────────────────────────
   01 – 04 promise card numbers → bright blue, high
   contrast (user flagged these as unreadable in gold).
   ──────────────────────────────────────────────── */
.hp2-page.hp2-light .hp2-promise-card__num {
  color: var(--hp2-logo-blue) !important;
  font-weight: 600 !important;
  opacity: 1 !important;
  text-shadow: none !important;
  font-size: 3.4rem;
  letter-spacing: -0.02em;
}
.hp2-page.hp2-light .hp2-promise-card__title {
  color: var(--hp2-ltext) !important;
}
.hp2-page.hp2-light .hp2-promise-card__desc {
  color: var(--hp2-text-muted) !important;
}

/* Experience card tags (SHARED PARTY / BACH ONLY / MARCH-OCT /
 * EXCLUSIVE / ANY EVENT / YEAR-ROUND) — keep all 3 pills on a single
 * row even on mobile. Shrink padding + gap, force nowrap, shrink
 * the font a notch if the row would overflow. */
.hp2-page.hp2-light .hp2-exp-card__meta,
body.ppc-light .hp2-exp-card__meta {
  flex-wrap: nowrap !important;
  gap: 0.35rem !important;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  justify-content: flex-start;
}
.hp2-page.hp2-light .hp2-exp-card__meta::-webkit-scrollbar,
body.ppc-light .hp2-exp-card__meta::-webkit-scrollbar { display: none; }

.hp2-page.hp2-light .hp2-exp-card__tag,
body.ppc-light .hp2-exp-card__tag {
  background: var(--hp2-logo-yellow) !important;
  color: var(--hp2-logo-blue-deep) !important;
  border: 1px solid #E8B52E !important;
  font-weight: 700 !important;
  font-size: 0.7rem !important;
  padding: 0.3rem 0.55rem !important;
  border-radius: 999px;
  white-space: nowrap;
  letter-spacing: 0.06em !important;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .hp2-page.hp2-light .hp2-exp-card__tag,
  body.ppc-light .hp2-exp-card__tag {
    font-size: 0.62rem !important;
    padding: 0.25rem 0.45rem !important;
    letter-spacing: 0.04em !important;
  }
  .hp2-page.hp2-light .hp2-exp-card__meta,
  body.ppc-light .hp2-exp-card__meta {
    gap: 0.28rem !important;
  }
}

/* ────────────────────────────────────────────────
   Unify the native .hp2-btn classes with the light
   blue/gold system. Primary (Book Now etc) = gold fill
   on deep-blue text (matches "Book in next 10 days"
   accent bar). Outline (Get a Quote) = white bg, blue
   border, blue text.
   ──────────────────────────────────────────────── */
.hp2-page.hp2-light .hp2-btn--primary,
body.ppc-light .hp2-btn--primary {
  background: var(--hp2-logo-yellow, #F7C948) !important;
  color: #0E4B8F !important;
  border: 1px solid #E8B52E !important;
  box-shadow: 0 6px 18px rgba(247, 201, 72, 0.45) !important;
}
.hp2-page.hp2-light .hp2-btn--primary:hover,
body.ppc-light .hp2-btn--primary:hover {
  background: #F0BC2E !important;
  box-shadow: 0 10px 26px rgba(14, 75, 143, 0.3) !important;
}

.hp2-page.hp2-light .hp2-btn--outline,
body.ppc-light .hp2-btn--outline {
  background: #ffffff !important;
  color: #1E6EC5 !important;
  border: 2px solid #1E6EC5 !important;
  font-weight: 700 !important;
}
.hp2-page.hp2-light .hp2-btn--outline:hover,
body.ppc-light .hp2-btn--outline:hover {
  background: #1E6EC5 !important;
  color: #ffffff !important;
}

/* CtaPair (used in hero + many sections): outline = blue, filled = gold */
.hp2-page.hp2-light .cta-pair__btn--quote,
body.ppc-light .cta-pair__btn--quote {
  background: #ffffff !important;
  color: #1E6EC5 !important;
  border: 2px solid #1E6EC5 !important;
  font-weight: 700 !important;
  text-shadow: none !important;
}
.hp2-page.hp2-light .cta-pair__btn--quote:hover,
body.ppc-light .cta-pair__btn--quote:hover {
  background: #1E6EC5 !important;
  color: #ffffff !important;
}

.hp2-page.hp2-light .cta-pair__btn--book,
body.ppc-light .cta-pair__btn--book {
  background: #F7C948 !important;
  color: #0E4B8F !important;
  border: 2px solid #E8B52E !important;
  font-weight: 700 !important;
  text-shadow: none !important;
  box-shadow: 0 6px 18px rgba(247, 201, 72, 0.4) !important;
}
.hp2-page.hp2-light .cta-pair__btn--book:hover,
body.ppc-light .cta-pair__btn--book:hover {
  background: #F0BC2E !important;
  color: #0E4B8F !important;
}

/* Top "Request a Quote" marquee bar: flip from dark → yellow */
.hp2-page.hp2-light .hp2-marquee,
.hp2-page.hp2-light [class*="marquee"],
.hp2-page.hp2-light [class*="announcement-bar"] {
  background: var(--hp2-logo-yellow) !important;
  color: var(--hp2-logo-blue-deep) !important;
  border-bottom: 1px solid rgba(14, 75, 143, 0.2) !important;
}

/* Sectioned bands — alternate white / pale-blue for visual rhythm */
.hp2-page.hp2-light section {
  background-color: var(--hp2-bg-0) !important;
}
.hp2-page.hp2-light section:nth-of-type(even) {
  background-color: var(--hp2-bg-1) !important;
}

/* Any existing bg-1 / bg-2 inline style wins — preserve intent */
.hp2-page.hp2-light [style*="--hp2-bg-1"],
.hp2-page.hp2-light [style*="--hp2-bg-2"] {
  background-color: transparent !important;
}

/* "Hero CTA band" — the section with primary blue background */
.hp2-page.hp2-light .hp2-cta-band,
.hp2-page.hp2-light [class*="cta-band"] {
  background: linear-gradient(135deg, var(--hp2-logo-blue) 0%, var(--hp2-logo-blue-deep) 100%) !important;
  color: #ffffff !important;
}
.hp2-page.hp2-light .hp2-cta-band h2,
.hp2-page.hp2-light [class*="cta-band"] h2,
.hp2-page.hp2-light .hp2-cta-band h3,
.hp2-page.hp2-light .hp2-cta-band p {
  color: #ffffff !important;
}
.hp2-page.hp2-light .hp2-cta-band em {
  color: var(--hp2-logo-yellow) !important;
}

/* Smooth scroll for anchor jumps */
html { scroll-behavior: smooth; }

/* ─── Reset stray borders inside light theme ───
 * My first pass matched every element with "card" or "border" in its
 * class, which painted outlines around every paragraph inside a
 * <CardContent>. Kill inner borders; re-apply only on the outer
 * container. */
.hp2-page.hp2-light *:not(.hp2-card-outer):not([data-slot="card"]):not(section):not(article):not(input):not(textarea):not(select):not(button):not([role="button"]) {
  border: 0;
}

/* Stat chips — tight target (shadcn Badge uses data-slot or .badge)
 * Only primary-variant badges get the yellow pill treatment. */
.hp2-page.hp2-light .hp2-stat-chip,
.hp2-page.hp2-light [data-slot="badge"],
.hp2-page.hp2-light [class~="badge"],
.hp2-page.hp2-light .inline-flex.items-center.rounded-full.border {
  background: var(--hp2-logo-yellow);
  color: var(--hp2-logo-blue-deep);
  border: 1px solid #E8B52E;
  font-weight: 700;
}

/* Cards — apply border ONLY on the actual card container, not every
 * descendant. Target explicit card containers via semantic or known
 * shadcn hooks. */
.hp2-page.hp2-light [data-slot="card"],
.hp2-page.hp2-light .hp2-card-outer,
.hp2-page.hp2-light article.card,
.hp2-page.hp2-light section > article {
  background-color: #ffffff;
  border: 1px solid var(--hp2-border);
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(14, 75, 143, 0.06);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.hp2-page.hp2-light [data-slot="card"] *,
.hp2-page.hp2-light .hp2-card-outer * {
  border-color: transparent;
}

/* Hover lift on cards */
.hp2-page.hp2-light [data-slot="card"]:hover,
.hp2-page.hp2-light .hp2-card-outer:hover {
  border-color: var(--hp2-logo-blue);
  box-shadow: 0 14px 30px rgba(30, 110, 197, 0.15);
  transform: translateY(-2px);
}

/* Tables/HR/FAQ separators should stay subtle if the page explicitly
 * requests one — use a single class .hp2-hairline */
.hp2-page.hp2-light .hp2-hairline {
  border-top: 1px solid var(--hp2-border);
}

/* Links — bright blue with yellow underline on hover */
.hp2-page.hp2-light a:not([class]):not([class*="btn"]) {
  color: var(--hp2-logo-blue);
  text-decoration: underline;
  text-decoration-color: var(--hp2-logo-yellow);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

/* Eyebrow / small caps labels — yellow on deep-blue for festive pop */
.hp2-page.hp2-light [class*="eyebrow"],
.hp2-page.hp2-light [style*="letter-spacing: 0.25em"] {
  color: var(--hp2-logo-blue-deep) !important;
}

/* Dividers: yellow hairline for accent pops */
.hp2-page.hp2-light hr,
.hp2-page.hp2-light [class*="divider"] {
  border-color: var(--hp2-logo-yellow) !important;
  border-top-width: 2px;
}

/* Icon accents within cards — swap gold icons to bright blue */
.hp2-page.hp2-light svg[class*="text-gold"],
.hp2-page.hp2-light [style*="color: var(--hp2-gold)"] svg {
  color: var(--hp2-logo-blue) !important;
}

/* Footer — keep high-contrast but with brand blue backdrop */
.hp2-page.hp2-light footer {
  background-color: var(--hp2-logo-blue-deep) !important;
  color: #ffffff !important;
  border-top: 4px solid var(--hp2-logo-yellow);
}
.hp2-page.hp2-light footer * {
  color: #ffffff !important;
}
.hp2-page.hp2-light footer a:hover {
  color: var(--hp2-logo-yellow) !important;
}

/* ──────────────────────────────────────────────────────────────
   THEME TOGGLE — floating pill, top-right. Dark ↔ Light.
   ────────────────────────────────────────────────────────────── */
.hp2-theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  background: rgba(26, 26, 40, 0.85);
  border: 1px solid var(--hp2-gold);
  border-radius: 999px;
  color: var(--hp2-gold);
  font-family: var(--hp2-font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 200ms ease;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
}

.hp2-theme-toggle:hover {
  background: rgba(200, 169, 110, 0.95);
  color: #1A1A26;
  transform: translateY(-1px);
}

.hp2-page.hp2-light .hp2-theme-toggle {
  background: var(--hp2-logo-blue);
  color: #ffffff;
  border-color: var(--hp2-logo-blue-deep);
  box-shadow: 0 6px 18px rgba(30, 110, 197, 0.35);
}

.hp2-page.hp2-light .hp2-theme-toggle:hover {
  background: var(--hp2-logo-yellow);
  color: var(--hp2-logo-blue-deep);
  border-color: #E8B52E;
}

.hp2-theme-toggle__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
}

/* ─── Hero ─────────────────────────────────────────────────────── */
.hp2-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 4rem;
  overflow: hidden;
}

.hp2-hero__video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hp2-hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.30;
}

.hp2-hero__overlay {
  position: absolute;
  inset: 0;
  /* Smooth monotonic gradient — earlier version had stops reversing
     direction (0.88 → 0.55 → 0.78) which created a visible seam
     across the middle of the hero. Now it just fades cleanly from
     deep black top-left to mid-dark bottom-right. */
  background:
    radial-gradient(ellipse at 20% 85%, rgba(30,136,229,0.20) 0%, transparent 58%),
    radial-gradient(ellipse at 82% 18%, rgba(200,169,110,0.14) 0%, transparent 62%),
    linear-gradient(135deg, rgba(7,7,12,0.82) 0%, rgba(7,7,12,0.68) 45%, rgba(7,7,12,0.74) 100%);
  z-index: 1;
}

.hp2-hero__overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 100%, rgba(30,136,229,0.12) 0%, transparent 45%);
  pointer-events: none;
}

/* Blue accent streak — appears between major sections */
.hp2-section-divider {
  position: relative;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(30,136,229,0.4) 25%,
    rgba(200,169,110,0.6) 50%,
    rgba(30,136,229,0.4) 75%,
    transparent 100%);
  margin: 0;
  overflow: hidden;
}
.hp2-section-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--hp2-gold);
  box-shadow:
    0 0 12px rgba(200,169,110,0.6),
    0 0 24px rgba(30,136,229,0.4);
}

.hp2-hero__content {
  position: relative;
  z-index: 2;
  max-width: 820px;
  padding: 6rem 0;
}

/* Translucent scrim behind hero text for readability when video is busy.
   Subtle radial vignette blurred into the background video; keeps the
   copy crisp on any frame without looking like a solid panel. */
.hp2-hero__content::before {
  content: "";
  position: absolute;
  inset: 2rem -3rem;
  z-index: -1;
  background: radial-gradient(
    ellipse at 30% 50%,
    rgba(7, 7, 12, 0.72) 0%,
    rgba(7, 7, 12, 0.55) 38%,
    rgba(7, 7, 12, 0.20) 65%,
    transparent 85%
  );
  filter: blur(6px);
  pointer-events: none;
}
.hp2-hero__eyebrow,
.hp2-hero__headline,
.hp2-hero__body {
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.55);
}

.hp2-hero__eyebrow {
  font-family: var(--hp2-font-body);
  font-size: 0.82rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: var(--hp2-gold);
  margin-bottom: 2rem;
}

.hp2-hero__headline {
  font-family: var(--hp2-font-display);
  font-size: clamp(3.75rem, 4vw, 5.47rem);
  font-weight: 300;
  line-height: 0.96;
  color: var(--hp2-cream);
  margin: 0 0 2.2rem 0;
}

.hp2-hero__headline em {
  font-style: italic;
  color: var(--hp2-gold-light);
}

.hp2-hero__rule {
  width: 60px;
  height: 1px;
  background: var(--hp2-gold);
  border: none;
  margin: 0 0 2rem 0;
}

.hp2-hero__body {
  font-size: 1.64rem;
  color: var(--hp2-cream-muted);
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 640px;
  font-weight: 300;
}

.hp2-hero__ctas {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.hp2-hero__scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 4rem;
  z-index: 2;
  width: 1px;
  height: 48px;
  background: var(--hp2-gold);
  opacity: 0.6;
  animation: hp2-scroll-pulse 2.4s ease-in-out infinite;
}

@keyframes hp2-scroll-pulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 0.8; transform: scaleY(1.3); transform-origin: top; }
}

/* ─── Buttons ─────────────────────────────────────────────────── */
.hp2-btn {
  display: inline-block;
  font-family: var(--hp2-font-body);
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  padding: 1.1rem 2.8rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: none;
  min-height: 44px;
  min-width: 44px;
}

.hp2-btn:hover {
  transform: translateY(-1px);
}

.hp2-btn--primary {
  background: var(--hp2-gold);
  color: #07070C;
}

.hp2-btn--primary:hover {
  box-shadow: 0 6px 24px rgba(200,169,110,0.25);
}

.hp2-btn--outline {
  background: transparent;
  border: 1px solid rgba(200,169,110,0.45);
  color: var(--hp2-cream-muted);
}

.hp2-btn--outline:hover {
  border-color: var(--hp2-gold);
  color: var(--hp2-cream);
}

/* ─── Embedded Quote Builder ─────────────────────────────────── */
.hp2-quote-embed {
  padding: 5rem 4rem 4rem;
  background:
    radial-gradient(ellipse at 20% 0%, rgba(30,136,229,0.10) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 100%, rgba(200,169,110,0.08) 0%, transparent 60%),
    var(--hp2-bg-1);
  position: relative;
  border-top: 1px solid var(--hp2-border);
  border-bottom: 1px solid var(--hp2-border);
  overflow: hidden;
}
.hp2-quote-embed__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.28;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 78%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 78%);
}
.hp2-quote-embed__intro,
.hp2-quote-embed__frame-wrap { position: relative; z-index: 1; }
.hp2-quote-embed__intro {
  max-width: 820px;
  margin: 0 auto 2.5rem;
  text-align: center;
}
.hp2-quote-embed__headline {
  font-family: var(--hp2-font-display);
  font-weight: 300;
  font-size: clamp(2rem, 3.4vw, 3rem);
  line-height: 1.1;
  color: var(--hp2-cream);
  margin: 0 0 1rem;
}
.hp2-quote-embed__headline em {
  font-style: italic;
  color: var(--hp2-gold-light);
}
.hp2-quote-embed__sub {
  color: var(--hp2-cream-muted);
  font-size: 1.08rem;
  line-height: 1.65;
  margin: 0 auto 1.75rem;
  max-width: 620px;
}
.hp2-quote-embed__cta-row {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.hp2-quote-embed__frame-wrap {
  max-width: 860px;
  margin: 0 auto;
  border: 1.5px solid rgba(30, 136, 229, 0.55);
  border-radius: 14px;
  overflow: hidden;
  background: transparent;
  box-shadow:
    0 30px 80px rgba(0,0,0,0.55),
    0 0 0 1px rgba(30, 136, 229, 0.18),
    0 0 42px rgba(30, 136, 229, 0.14);
}
.hp2-quote-embed__frame-wrap .eqf-root {
  margin: 0 !important;
  max-width: none !important;
  border-radius: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
}
.hp2-quote-embed__frame {
  width: 100%;
  height: 720px;
  border: 0;
  display: block;
  background: #FFFFFF;
}
@media (max-width: 768px) {
  .hp2-quote-embed { padding: 3rem 1.1rem 2.5rem; }
  .hp2-quote-embed__intro { margin-bottom: 1.75rem; }
  .hp2-quote-embed__headline { font-size: clamp(1.6rem, 6vw, 2.1rem); }
  .hp2-quote-embed__sub { font-size: 0.98rem; }
  .hp2-quote-embed__frame-wrap { border-radius: 10px; }
  .hp2-quote-embed__frame { height: 820px; min-height: 640px; }
  .hp2-quote-embed__cta-row .hp2-btn { width: 100%; justify-content: center; }
}

/* ─── Trust Bar ───────────────────────────────────────────────── */
.hp2-trust {
  background: var(--hp2-bg-card);
  border-top: 1px solid var(--hp2-border);
  border-bottom: 1px solid var(--hp2-border);
  padding: 2.4rem 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}

.hp2-trust__item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 2rem;
  white-space: nowrap;
}

.hp2-trust__item:not(:last-child) {
  border-right: 1px solid var(--hp2-border);
}

.hp2-trust__icon {
  font-size: 1.2rem;
  color: var(--hp2-gold);
}

.hp2-trust__text {
  display: flex;
  flex-direction: column;
}

.hp2-trust__label {
  font-family: var(--hp2-font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--hp2-cream);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hp2-trust__sub {
  font-size: 0.78rem;
  color: var(--hp2-text-muted);
}

/* ─── Sections ────────────────────────────────────────────────── */
.hp2-section {
  padding: 9rem 4rem;
  max-width: 1280px;
  margin: 0 auto;
}

.hp2-section--alt {
  background:
    radial-gradient(ellipse at 0% 50%, rgba(30,136,229,0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 50%, rgba(30,136,229,0.06) 0%, transparent 40%),
    var(--hp2-bg-1);
  max-width: none;
  position: relative;
}

.hp2-section--alt::before,
.hp2-section--alt::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(30,136,229,0.3) 30%,
    rgba(200,169,110,0.5) 50%,
    rgba(30,136,229,0.3) 70%,
    transparent 100%);
}
.hp2-section--alt::before { top: 0; }
.hp2-section--alt::after { bottom: 0; }

.hp2-section--alt > .hp2-section__inner {
  max-width: 1280px;
  margin: 0 auto;
}

.hp2-section__label {
  font-family: var(--hp2-font-body);
  font-size: 0.74rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: var(--hp2-gold);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hp2-section__label::after {
  content: '';
  display: block;
  width: 32px;
  height: 1px;
  background: var(--hp2-gold);
}

.hp2-section__headline {
  font-family: var(--hp2-font-display);
  font-size: clamp(2.8rem, 3.5vw, 4.2rem);
  font-weight: 300;
  line-height: 1.08;
  color: var(--hp2-cream);
  margin: 0 0 2rem 0;
}

.hp2-section__headline em {
  font-style: italic;
  color: var(--hp2-gold-light);
}

.hp2-section__body {
  font-size: 1.56rem;
  color: var(--hp2-cream-muted);
  line-height: 1.85;
  max-width: 640px;
  font-weight: 300;
}

/* ─── Promise Grid ────────────────────────────────────────────── */
.hp2-promise-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 4rem;
}

.hp2-promise-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.8rem 2rem;
  position: relative;
}

.hp2-promise-card__num {
  font-family: var(--hp2-font-display);
  font-size: 3rem;
  font-weight: 300;
  color: var(--hp2-gold-dim2);
  margin-bottom: 1rem;
  line-height: 1;
}

.hp2-promise-card__title {
  font-family: var(--hp2-font-body);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--hp2-cream);
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.hp2-promise-card__desc {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  line-height: 1.6;
}

/* ─── Two Experiences ─────────────────────────────────────────── */
.hp2-experiences {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.hp2-exp-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hp2-exp-card__img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.hp2-exp-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.hp2-exp-card:hover .hp2-exp-card__img {
  transform: scale(1.03);
}

.hp2-exp-card__content {
  padding: 2.4rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.hp2-exp-card__title {
  font-family: var(--hp2-font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 1rem;
}

.hp2-exp-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-bottom: 1.2rem;
}

.hp2-exp-card__tag {
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--hp2-gold);
  background: var(--hp2-gold-dim);
  padding: 0.3rem 0.7rem;
}

.hp2-exp-card__desc {
  font-size: 1rem;
  color: var(--hp2-text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  flex: 1;
}

.hp2-exp-card__price {
  font-family: var(--hp2-font-display);
  font-size: 1.4rem;
  color: var(--hp2-gold-light);
  margin-bottom: 1.5rem;
}

/* ─── Quick reviews strip (above-the-fold social proof) ─── */
.hp2-quick-reviews {
  padding: 3rem 4rem;
  background: var(--hp2-bg-1);
  border-top: 1px solid var(--hp2-border-sub);
  border-bottom: 1px solid var(--hp2-border-sub);
}
.hp2-quick-reviews__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}
@media (max-width: 900px) {
  .hp2-quick-reviews { padding: 2.5rem 1.5rem; }
  .hp2-quick-reviews__inner { grid-template-columns: 1fr; gap: 1.75rem; }
}
.hp2-quick-review {
  text-align: left;
}
.hp2-quick-review__stars {
  color: var(--hp2-gold);
  letter-spacing: 0.18em;
  font-size: 0.95rem;
  margin-bottom: 0.65rem;
}
.hp2-quick-review__quote {
  font-family: var(--hp2-font-display);
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1.55;
  color: var(--hp2-cream);
  margin: 0 0 0.7rem 0;
}
.hp2-quick-review__author {
  font-family: var(--hp2-font-body);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--hp2-gold-light);
  font-weight: 500;
}

/* ─── Three Differentiation Pillars ─── */
.hp2-pillars {
  padding: 5rem 4rem;
  background: var(--hp2-bg-2, #0d1117);
  border-top: 1px solid var(--hp2-border-sub);
  border-bottom: 1px solid var(--hp2-border-sub);
}
.hp2-pillars__inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
.hp2-pillar {
  text-align: left;
  padding: 0 0.5rem;
}
.hp2-pillar__icon {
  font-size: 2rem;
  color: var(--hp2-gold);
  margin-bottom: 1rem;
  line-height: 1;
}
.hp2-pillar__title {
  font-family: var(--hp2-font-display);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  color: var(--hp2-cream);
  margin: 0 0 0.85rem;
  letter-spacing: -0.005em;
}
.hp2-pillar__title em {
  font-style: italic;
  color: var(--hp2-gold);
}
.hp2-pillar__body {
  font-family: var(--hp2-font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--hp2-cream);
  opacity: 0.78;
  margin: 0 0 1rem;
}
.hp2-pillar__link {
  font-family: var(--hp2-font-body);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hp2-gold);
  text-decoration: none;
  border-bottom: 1px solid rgba(200, 169, 110, 0.35);
  padding-bottom: 2px;
  transition: all 0.15s ease;
  display: inline-block;
}
.hp2-pillar__link:hover {
  color: var(--hp2-cream);
  border-bottom-color: var(--hp2-cream);
}
@media (max-width: 900px) {
  .hp2-pillars { padding: 3.5rem 1.5rem; }
  .hp2-pillars__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

/* ─── Problem statement band ─── */
.hp2-problem {
  padding: 4.5rem 4rem;
  background: var(--hp2-bg-2, #0d1117);
  border-top: 1px solid var(--hp2-border-sub);
  border-bottom: 1px solid var(--hp2-border-sub);
  text-align: center;
}
.hp2-problem__inner {
  max-width: 860px;
  margin: 0 auto;
}
.hp2-problem__label {
  font-family: var(--hp2-font-body);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--hp2-gold);
  margin-bottom: 1.25rem;
}
.hp2-problem__headline {
  font-family: var(--hp2-font-display);
  font-size: clamp(1.85rem, 4vw, 2.6rem);
  font-weight: 300;
  line-height: 1.2;
  color: var(--hp2-cream);
  margin: 0 0 1.25rem;
  letter-spacing: -0.01em;
}
.hp2-problem__headline em {
  font-style: italic;
  color: var(--hp2-gold);
}
.hp2-problem__body {
  font-family: var(--hp2-font-body);
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--hp2-cream);
  opacity: 0.82;
  margin: 0;
}
@media (max-width: 768px) {
  .hp2-problem { padding: 3.5rem 1.5rem; }
  .hp2-problem__body { font-size: 1rem; }
}

/* ─── Hero CTA hierarchy: demote "Get a Quote" to text link ─── */
.hp2-hero__ctas .cta-pair__btn--quote {
  background: transparent !important;
  border: none !important;
  padding: 0.75rem 0.5rem !important;
  text-decoration: underline;
  text-underline-offset: 6px;
  text-decoration-thickness: 1px;
  color: var(--hp2-cream) !important;
  letter-spacing: 0.12em;
  box-shadow: none !important;
}
.hp2-hero__ctas .cta-pair__btn--quote:hover {
  color: var(--hp2-gold) !important;
  text-decoration-thickness: 2px;
  background: transparent !important;
}
body.ppc-light .hp2-hero__ctas .cta-pair__btn--quote,
.hp2-page.hp2-light .hp2-hero__ctas .cta-pair__btn--quote {
  color: #1a1a1a !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  text-decoration: underline !important;
  text-underline-offset: 6px;
}
body.ppc-light .hp2-hero__ctas .cta-pair__btn--quote:hover,
.hp2-page.hp2-light .hp2-hero__ctas .cta-pair__btn--quote:hover {
  color: var(--hp2-gold, #b8860b) !important;
  background: transparent !important;
}

/* ─── Fleet: horizontal scroll carousel on mobile/tablet ─── */
@media (max-width: 1024px) {
  .hp2-fleet-grid {
    display: flex !important;
    grid-template-columns: none !important;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    gap: 1rem;
    padding: 0 1.5rem 1.5rem;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }
  .hp2-fleet-card {
    flex: 0 0 78%;
    max-width: 320px;
    scroll-snap-align: start;
  }
}
@media (max-width: 768px) {
  .hp2-fleet-grid {
    grid-template-columns: none !important;
  }
  .hp2-fleet-card {
    flex: 0 0 82%;
  }
}

/* ─── Tabbed pricing (Private | Disco) ─── */
.hp2-pricing-tabs {
  display: flex;
  gap: 0.5rem;
  margin: 2rem 0 2.5rem;
  border-bottom: 1px solid var(--hp2-border);
  flex-wrap: wrap;
}
.hp2-pricing-tab {
  flex: 1;
  min-width: 220px;
  background: transparent;
  border: none;
  padding: 1.25rem 1.5rem;
  text-align: left;
  cursor: pointer;
  font-family: var(--hp2-font-display);
  font-size: 1.3rem;
  color: var(--hp2-cream-muted);
  border-bottom: 3px solid transparent;
  transition: all 180ms ease;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.hp2-pricing-tab:hover {
  color: var(--hp2-cream);
}
.hp2-pricing-tab.active {
  color: var(--hp2-cream);
  border-bottom-color: var(--hp2-gold);
  font-weight: 500;
}
.hp2-pricing-tab__sub {
  font-family: var(--hp2-font-body);
  font-size: 0.78rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hp2-text-muted);
}
.hp2-pricing-tab.active .hp2-pricing-tab__sub {
  color: var(--hp2-gold);
}

.hp2-pricing-panel {
  margin-top: 2rem;
  animation: hp2-panel-in 280ms ease;
}
@keyframes hp2-panel-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Private: 4-boat grid */
.hp2-pricing-boats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}
@media (max-width: 1100px) {
  .hp2-pricing-boats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .hp2-pricing-boats { grid-template-columns: 1fr; }
}
.hp2-pricing-boat {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  border-radius: 10px;
  padding: 1.75rem 1.5rem;
  position: relative;
  transition: all 220ms ease;
}
.hp2-pricing-boat:hover {
  border-color: var(--hp2-gold);
  transform: translateY(-2px);
}
.hp2-pricing-boat--featured {
  border-color: var(--hp2-gold);
  box-shadow: 0 0 0 1px var(--hp2-gold) inset;
}
.hp2-pricing-boat__badge {
  display: inline-block;
  background: var(--hp2-gold);
  color: var(--hp2-bg-0);
  padding: 0.2rem 0.55rem;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 3px;
  margin-bottom: 0.5rem;
}
.hp2-pricing-boat__name {
  font-family: var(--hp2-font-display);
  font-size: 1.55rem;
  color: var(--hp2-cream);
  margin: 0 0 0.3rem 0;
  font-weight: 400;
}
.hp2-pricing-boat__cap {
  font-family: var(--hp2-font-body);
  font-size: 0.85rem;
  color: var(--hp2-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 0.85rem;
}
.hp2-pricing-boat__price {
  font-family: var(--hp2-font-display);
  font-size: 1.1rem;
  color: var(--hp2-gold-light);
  margin-bottom: 0.75rem;
}
.hp2-pricing-boat__price strong {
  font-size: 1.85rem;
  color: var(--hp2-gold);
  font-weight: 500;
}
.hp2-pricing-boat__desc {
  font-size: 0.92rem;
  color: var(--hp2-text-muted);
  line-height: 1.55;
  margin: 0;
}

/* Disco: 3-slot grid */
.hp2-pricing-slots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}
@media (max-width: 900px) {
  .hp2-pricing-slots { grid-template-columns: 1fr; }
}
.hp2-pricing-slot {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  border-radius: 10px;
  padding: 2rem 1.75rem;
  position: relative;
  transition: all 220ms ease;
}
.hp2-pricing-slot:hover {
  border-color: var(--hp2-gold);
  transform: translateY(-2px);
}
.hp2-pricing-slot--featured {
  border-color: var(--hp2-gold);
  box-shadow: 0 0 0 1px var(--hp2-gold) inset,
    0 12px 32px rgba(200, 169, 110, 0.18);
}
.hp2-pricing-slot__badge {
  position: absolute;
  top: -0.6rem;
  left: 1.5rem;
  background: var(--hp2-gold);
  color: var(--hp2-bg-0);
  padding: 0.25rem 0.7rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border-radius: 3px;
}
.hp2-pricing-slot__badge--value {
  background: var(--hp2-cream);
  color: var(--hp2-bg-0);
}
.hp2-pricing-slot__day {
  font-family: var(--hp2-font-body);
  font-size: 0.85rem;
  color: var(--hp2-text-muted);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
}
.hp2-pricing-slot__time {
  font-family: var(--hp2-font-display);
  font-size: 1.5rem;
  color: var(--hp2-cream);
  margin-bottom: 1rem;
}
.hp2-pricing-slot__price {
  font-family: var(--hp2-font-display);
  font-size: 1.1rem;
  color: var(--hp2-gold-light);
  margin-bottom: 0.75rem;
}
.hp2-pricing-slot__price strong {
  font-size: 2.6rem;
  color: var(--hp2-gold);
  font-weight: 500;
}
.hp2-pricing-slot__price span {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  margin-left: 0.25rem;
}
.hp2-pricing-slot__desc {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  margin: 0;
  line-height: 1.55;
}

.hp2-pricing-panel__meta {
  font-size: 0.88rem;
  color: var(--hp2-text-muted);
  line-height: 1.65;
  max-width: 820px;
  margin: 0 0 2rem 0;
}
.hp2-pricing-panel__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ─── Fleet Grid ──────────────────────────────────────────────── */
.hp2-fleet-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 4rem;
}

.hp2-fleet-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  overflow: hidden;
}

.hp2-fleet-card__img-wrap {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.hp2-fleet-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.hp2-fleet-card:hover .hp2-fleet-card__img {
  transform: scale(1.03);
}

.hp2-fleet-card__content {
  padding: 1.8rem 1.4rem;
}

.hp2-fleet-card__name {
  font-family: var(--hp2-font-display);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 0.4rem;
}

.hp2-fleet-card__capacity {
  font-size: 0.82rem;
  color: var(--hp2-gold);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.hp2-fleet-card__desc {
  font-size: 0.9rem;
  color: var(--hp2-text-muted);
  line-height: 1.5;
}

/* ─── Testimonials ────────────────────────────────────────────── */
.hp2-testimonials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.hp2-testimonial-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.4rem 2rem;
}

.hp2-testimonial-card__stars {
  color: var(--hp2-gold);
  font-size: 1rem;
  margin-bottom: 1.2rem;
  letter-spacing: 0.1em;
}

.hp2-testimonial-card__text {
  font-size: 1.05rem;
  color: var(--hp2-cream-muted);
  line-height: 1.75;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.hp2-testimonial-card__author {
  font-size: 0.85rem;
  color: var(--hp2-text-muted);
  font-weight: 500;
}

/* ─── FAQ ─────────────────────────────────────────────────────── */
.hp2-faq {
  margin-top: 4rem;
}

.hp2-faq__item {
  border-bottom: 1px solid var(--hp2-border);
}

.hp2-faq__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  min-height: 44px;
}

.hp2-faq__question {
  font-family: var(--hp2-font-body);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--hp2-cream);
}

.hp2-faq__icon {
  font-size: 1.4rem;
  color: var(--hp2-gold);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.hp2-faq__icon--open {
  transform: rotate(45deg);
}

.hp2-faq__answer {
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.3s ease;
  max-height: 0;
  opacity: 0;
}

.hp2-faq__answer--open {
  max-height: 400px;
  opacity: 1;
}

.hp2-faq__answer-inner {
  padding: 0 0 1.6rem 0;
  font-size: 1rem;
  color: var(--hp2-text-muted);
  line-height: 1.75;
}

/* ─── Final CTA ───────────────────────────────────────────────── */
.hp2-final-cta {
  text-align: center;
  padding: 9rem 4rem;
  background: var(--hp2-bg-1);
}

.hp2-final-cta__headline {
  font-family: var(--hp2-font-display);
  font-size: clamp(2.8rem, 3.5vw, 4.2rem);
  font-weight: 300;
  line-height: 1.08;
  color: var(--hp2-cream);
  margin: 0 0 1.5rem 0;
}

.hp2-final-cta__headline em {
  font-style: italic;
  color: var(--hp2-gold-light);
}

.hp2-final-cta__body {
  font-size: 1.3rem;
  color: var(--hp2-cream-muted);
  line-height: 1.7;
  max-width: 580px;
  margin: 0 auto 2.5rem auto;
  font-weight: 300;
}

.hp2-final-cta__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hp2-final-cta__phone {
  font-family: var(--hp2-font-display);
  font-size: 1.6rem;
  color: var(--hp2-gold-light);
  text-decoration: none;
}

.hp2-final-cta__phone:hover {
  color: var(--hp2-gold-pale);
}

.hp2-final-cta__location {
  font-size: 0.85rem;
  color: var(--hp2-text-muted);
  letter-spacing: 0.08em;
}

/* ─── Responsive ──────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hp2-promise-grid,
  .hp2-fleet-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-testimonials {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hp2-hero {
    padding: 0 1.5rem;
  }
  .hp2-hero__headline {
    font-size: clamp(2.6rem, 8vw, 3.5rem);
  }
  .hp2-hero__body {
    font-size: 1.2rem;
  }
  .hp2-hero__scroll {
    left: 1.5rem;
  }
  .hp2-trust {
    padding: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
  .hp2-trust__item {
    padding: 0.6rem 0;
    border-right: none !important;
    border-bottom: 1px solid var(--hp2-border);
    width: 100%;
  }
  .hp2-trust__item:last-child {
    border-bottom: none;
  }
  .hp2-section {
    padding: 5rem 1.5rem;
  }
  .hp2-section--alt {
    padding: 5rem 1.5rem;
  }
  .hp2-section__headline {
    font-size: clamp(2rem, 6vw, 2.8rem);
  }
  .hp2-section__body {
    font-size: 1.15rem;
  }
  .hp2-promise-grid,
  .hp2-fleet-grid {
    grid-template-columns: 1fr;
  }
  .hp2-experiences {
    grid-template-columns: 1fr;
  }
  .hp2-final-cta {
    padding: 5rem 1.5rem;
  }
  .hp2-final-cta__headline {
    font-size: clamp(2rem, 6vw, 2.8rem);
  }
}

/* Expandable Details Section */
.hp2-details-section {
  margin-top: 2rem;
}
.hp2-details-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.2rem 1.5rem;
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  color: var(--hp2-cream);
  font-family: var(--hp2-font-body);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s;
}
.hp2-details-toggle:hover {
  background: rgba(200,169,110,0.08);
}
.hp2-details-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.3s ease;
  opacity: 0;
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  border-top: none;
}
.hp2-details-content--open {
  max-height: 3000px;
  opacity: 1;
}
.hp2-details-inner {
  padding: 1.5rem;
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  line-height: 1.75;
}
.hp2-details-inner ul {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0;
}
.hp2-details-inner li {
  padding: 0.3rem 0;
  padding-left: 1.2rem;
  position: relative;
}
.hp2-details-inner li::before {
  content: '\u2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
}
/* Private Pricing Table */
.hp2-private-pricing {
  margin-top: 4rem;
}
.hp2-private-pricing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--hp2-border);
  margin-top: 2rem;
}
.hp2-private-pricing__card {
  padding: 2rem 1.5rem;
  border-right: 1px solid var(--hp2-border);
}
.hp2-private-pricing__card:last-child {
  border-right: none;
}
.hp2-private-pricing__name {
  font-family: var(--hp2-font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--hp2-cream);
  margin-bottom: 0.25rem;
}
.hp2-private-pricing__capacity {
  font-size: 0.85rem;
  color: var(--hp2-gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.hp2-private-pricing__rate {
  font-family: var(--hp2-font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--hp2-gold-light);
  margin-bottom: 0.25rem;
}
.hp2-private-pricing__note {
  font-size: 0.82rem;
  color: var(--hp2-text-muted);
  margin-bottom: 1rem;
}
.hp2-private-pricing__features {
  list-style: none;
  padding: 0;
  margin: 0;
}
.hp2-private-pricing__features li {
  padding: 0.35rem 0;
  font-size: 0.88rem;
  color: var(--hp2-cream-muted);
  padding-left: 1.2rem;
  position: relative;
}
.hp2-private-pricing__features li::before {
  content: '\u2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}
@media (max-width: 768px) {
  .hp2-private-pricing__grid {
    grid-template-columns: 1fr;
  }
  .hp2-private-pricing__card {
    border-right: none;
    border-bottom: 1px solid var(--hp2-border);
  }
  .hp2-private-pricing__card:last-child {
    border-bottom: none;
  }
}
/* Photo Gallery */
.hp2-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 2rem;
}
.hp2-gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 1px solid var(--hp2-border);
  transition: transform 0.3s ease;
}
.hp2-gallery img:hover {
  transform: scale(1.03);
}
@media (max-width: 768px) {
  .hp2-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;

// ─── FAQ Data (AI-optimized: direct answer first, then supporting detail) ───
const FAQ_DATA = [
  {
    q: 'What types of party boat rentals do you offer?',
    a: 'We offer two experiences: the ATX Disco Cruise (a shared party with DJ, photographer, and disco lighting from $85/person, March–October, bachelor/bachelorette groups only) and Private Charters (exclusive use of the entire boat, any event type, year-round, from $200/hour). Private charters are available on all four boats in our fleet: Day Tripper (14 guests), Meeseeks (25-30), The Irony (25-30), and Clever Girl (50-75 with 14 disco balls).'
  },
  {
    q: 'How much does it cost to rent a party boat on Lake Travis?',
    a: 'ATX Disco Cruise: $85–$105 per person (tax and gratuity included). Private Charters: Day Tripper $200–$350/hr, Meeseeks or The Irony $225–$425/hr, Clever Girl $250–$500/hr. All private charters have a 4-hour minimum. Rates vary by day of week and group size. The Essentials upgrade adds $100–$200 flat, and the Ultimate package adds $250–$350 flat — both per cruise, not per hour.'
  },
  {
    q: 'What is Premier Party Cruises\' BYOB policy?',
    a: 'We are 100% BYOB — bring whatever you want. Beer, wine, spirits, seltzers, mixers, and non-alcoholic beverages are all welcome. Cans and plastic containers only (no glass for safety). We provide large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every cruise. You can also bring your own food, or we coordinate alcohol and food delivery through our partner Party On Delivery so everything is waiting on the boat when you arrive.'
  },
  {
    q: 'Where do the boats depart from?',
    a: 'All cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — 25 minutes from downtown Austin, the closest Lake Travis marina to the city. Rideshare and shuttle-ready. Worth the trip for the only DJ-led shared party boat in the US plus private charters for 14–75 guests. Free parking available. Arrive 15 minutes before your scheduled departure.'
  },
  {
    q: 'Can you swim during a Lake Travis cruise?',
    a: 'Yes — swimming is one of the highlights. During every cruise, the captain anchors in a scenic cove with crystal-clear water surrounded by limestone cliffs. Guests can swim, float on lily pads, jump off the boat, and enjoy the natural springs that feed Lake Travis. We provide a swim ladder for easy re-boarding and life jackets in all sizes. The typical swim stop lasts 1.5–2 hours during a 4-hour cruise.'
  },
  {
    q: 'Are there sunset cruises on Lake Travis?',
    a: 'Yes. Sunset cruises are among our most popular options. The Texas Hill Country sunset over Lake Travis is spectacular — golden light on limestone bluffs reflected across calm water. The Saturday 3:30–7:30 PM ATX Disco Cruise is timed for sunset, or book any private charter for your preferred time. Sunset cruises are especially popular for proposals, anniversaries, rehearsal dinners, and romantic celebrations.'
  },
  {
    q: 'Is it safe for families with children?',
    a: 'Absolutely. We maintain a perfect safety record spanning 15+ years and 150,000+ guests. All boats are operated by US licensed, experienced, licensed captains. Life jackets are available in all sizes including children\'s. Many families choose us for birthday parties, family reunions, graduations, and holiday gatherings. Children of all ages are welcome on private charters.'
  },
  {
    q: 'What are the best things to do on Lake Travis?',
    a: 'Lake Travis is Austin\'s premier outdoor destination. Top activities include party boat cruises (our specialty), swimming in coves near Devil\'s Cove, floating on lily pads, paddle boarding, kayaking, and fishing. The surrounding Texas Hill Country offers wineries, hiking at Pace Bend Park, and waterfront dining. Premier Party Cruises departs just 25 minutes from downtown, making it easy to combine a lake day with Austin nightlife on 6th Street or Rainey Street.'
  },
  {
    q: 'How does Premier compare to other Austin boat rentals?',
    a: 'Premier Party Cruises is Austin\'s longest-running party boat company (since 2009) with the highest customer rating (4.9/5 stars, 150,000+ guests). Unlike bare-bones pontoon rentals, we provide licensed captains, trained crew, premium sound, coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), and the only ATX Disco Cruise on the lake. Our fleet of 4 purpose-built party boats accommodates 14–75 guests. We are the only Lake Travis company with 14 disco balls.'
  },
  {
    q: 'What should I bring on a Lake Travis boat party?',
    a: 'Bring sunscreen (SPF 50+), sunglasses, a hat, swimsuit, towel, and your favorite beverages (BYOB — cans or plastic only, no glass). We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), premium sound systems, and all safety equipment. Optional: snacks, a waterproof phone case, and celebration items like sashes or banners. We can also coordinate alcohol delivery through Party On Delivery so drinks are waiting on the boat.'
  },
  {
    q: 'What happens if there is bad weather?',
    a: 'Safety is our top priority. If conditions are unsafe (thunderstorms, high winds), we contact you to reschedule at no additional cost. Light rain does not affect departures — our boats have covered areas. For the ATX Disco Cruise, severe weather triggers a move to our Lemonade Disco land venue. We monitor conditions continuously and communicate proactively.'
  },
  {
    q: 'Can you host corporate events and team building?',
    a: 'Yes — we are one of Austin\'s top corporate event venues. Our fleet accommodates 14–75 guests with professional service. Many Austin tech companies, law firms, and agencies use us for quarterly team outings, client entertainment, company milestones, and employee appreciation. Catering coordination, sound system for presentations, and flexible payment/invoicing available. Book 4–6 weeks ahead for weekends.'
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend 2–4 weeks for weekday dates and 4–8 weeks for weekend dates during peak season (March–October). Some popular Saturday dates book 6–8 weeks ahead. However, we sometimes have last-minute availability — call (512) 488-5892 to check. For weddings and large corporate events, booking 3–6 months out is recommended.'
  },
  // AI Visibility: seeded from SEMRush Questions extract (top unanswered / under-covered queries)
  {
    q: 'How much does it cost to rent a party boat in Austin for four hours?',
    a: 'Private charters on Lake Travis start at $200/hour on Day Tripper (14 guests, Monday–Thursday weekday rate) with a 3-hour minimum on weekdays and 4-hour minimum on weekends. Four hours on our Meeseeks or The Irony (25–30 guests) runs from $900 weekday base, or $1,000 on Clever Girl (our 75-guest flagship). Weekends are higher. A captain, crew, premium sound system, coolers, floats, and setup/cleanup are always included in the base rate. The ATX Disco Cruise is a per-person shared cruise: $85 (Saturday sunset slot), $95 (Friday), or $105 (Saturday peak) per person — all tax and 20% gratuity included. Every guest pays the same per-ticket price; the only thing that changes the price is the day and time slot.'
  },
  {
    q: 'What is the difference between the Standard, Essentials, and Ultimate packages with Premier Party Cruises?',
    a: 'Every private charter starts with the same base: licensed captain, CPR-certified crew (as required), premium marine-grade sound system, bluetooth connectivity, large coolers for BYOB, floats and lily pads, cups and koozies, setup before you arrive, and cleanup after you leave. You then optionally add: Professional DJ (our house DJ runs club-level mixes), Professional photographer (digital gallery delivered 2–3 weeks after your cruise), Mimosa Cooler Package ($100 flat — champagne flutes, juices, fruit), Sparkle Package ($100 flat — extra party supplies and VIP floats for the guest of honor), catering coordination, and Party On Delivery (our sister company that pre-ices your BYOB and delivers to the dock before you board, with 100% buyback on unopened bottles). One contract, one invoice, one point of contact — everything is bundled as a single booking.'
  },
  {
    q: 'What should I look for when choosing a party boat rental on Lake Travis?',
    a: 'Five things matter most: (1) Is there a licensed captain included, or do you drive it yourself? A TPWD-credentialed captain dramatically reduces your liability and lets everyone in the group actually celebrate. (2) What is bundled in the base price? Professional DJ, photographer, coolers, ice, mixers, floats, and setup/cleanup are often separate add-ons on budget rentals, making the all-in cost much higher than the sticker price. (3) What is the safety record? Years operating, number of guests served, incident history. We operate since 2009 with 150,000+ guests and zero reportable incidents — that is documented, not marketing. (4) What is the capacity range? A 14-guest pontoon and a 75-guest flagship are very different products for very different occasions. (5) How transparent is the pricing? Look for operators who quote one flat per-person or per-hour rate with tax, gratuity, and inclusions clearly stated — no "starting at" bait-and-switch.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function HomeNew() {
  const { openQuote } = useQuoteLightbox();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDetails, setOpenDetails] = useState<string | null>(null);
  // Tabbed pricing: Private default (home is for everyone; Disco is a
  // specific bach-group product and lives as tab 2).
  const [pricingTab, setPricingTab] = useState<'private' | 'disco'>('private');
  // Theme toggle — dark (default) vs. light festive daytime theme.
  // Persists across page reloads via localStorage.
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem('ppc-home-theme');
    return saved === 'light' ? 'light' : 'dark';
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('ppc-home-theme', theme);
    // Also toggle body-level class so the theme applies to pages
    // outside the hp2-page scope (nav/footer/overlays).
    document.body.classList.toggle('ppc-light', theme === 'light');
    document.body.classList.toggle('ppc-dark', theme === 'dark');
  }, [theme]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleDetails = (key: string) => {
    setOpenDetails(openDetails === key ? null : key);
  };

  return (
    <div className={`hp2-page ${theme === 'light' ? 'hp2-light' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: HP2_STYLES }} />
      {/* ThemeToggle is mounted by PublicNavigation so it appears on
          every page site-wide, not just here. */}
      <PublicNavigation />

      {/* ─── SEO: JSON-LD Structured Data ─── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "name": "Premier Party Cruises",
            "image": "https://premierpartycruises.com/attached_assets/PPC-Logo-LARGE.webp",
            "url": "https://premierpartycruises.com",
            "telephone": "+1-512-488-5892",
            "address": { "@type": "PostalAddress", "streetAddress": "13993 FM 2769", "addressLocality": "Leander", "addressRegion": "TX", "postalCode": "78641", "addressCountry": "US" },
            "geo": { "@type": "GeoCoordinates", "latitude": 30.4685, "longitude": -97.8537 },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "420", "bestRating": "5" },
            "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday", "Saturday"], "opens": "11:00", "closes": "19:30" },
            "priceRange": "$85-$500",
            "description": "Austin's longest-running party boat company on Lake Travis since 2009. Private charters for 5-75 guests and the ATX Disco Cruise — the only all-inclusive bachelor/bachelorette party cruise in America."
          },
          {
            "@type": "Event",
            "name": "ATX Disco Cruise",
            "description": "Austin's only all-inclusive bachelor and bachelorette party cruise on Lake Travis. 4 hours with DJ, photographer, giant floats, 14 disco balls.",
            "url": "https://premierpartycruises.com/atx-disco-cruise",
            "location": { "@type": "Place", "name": "Anderson Mill Marina", "address": { "@type": "PostalAddress", "streetAddress": "13993 FM 2769", "addressLocality": "Leander", "addressRegion": "TX", "postalCode": "78641" } },
            "offers": [
              { "@type": "Offer", "name": "Friday Cruise (12-4pm)", "price": "95", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Morning (11am-3pm)", "price": "105", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Sunset (3:30-7:30pm)", "price": "85", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            ]
          },
          {
            "@type": "Service",
            "name": "Private Party Boat Charters",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Private party boat rentals on Lake Travis for 5-75 guests. Bachelor parties, bachelorette parties, corporate events, weddings, birthdays.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "200", "highPrice": "500", "priceCurrency": "USD", "offerCount": "4" }
          },
          {
            "@type": "VideoObject",
            "name": "Clever Girl Party Boat Walkthrough",
            "description": "Virtual tour of the Clever Girl, Premier Party Cruises' flagship 75-person party boat on Lake Travis Austin Texas",
            "thumbnailUrl": "https://premierpartycruises.com/attached_assets/clever-girl-50-person-boat.webp",
            "contentUrl": "https://premierpartycruises.com/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4",
            "uploadDate": "2025-01-01",
            "duration": "PT2M30S"
          },
          {
            "@type": "Product",
            "name": "Day Tripper - 14 Person Party Boat",
            "description": "Intimate party boat for groups up to 14 on Lake Travis. Licensed captain, Bluetooth sound, coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) included.",
            "brand": {"@type": "Brand", "name": "Premier Party Cruises"},
            "offers": {"@type": "Offer", "price": "200", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour"}
          },
          {
            "@type": "Product",
            "name": "Meeseeks - 25 Person Party Boat",
            "description": "Mid-size party boat for groups of 15-25 on Lake Travis. Premium sound, spacious deck, perfect for bachelor and bachelorette parties.",
            "brand": {"@type": "Brand", "name": "Premier Party Cruises"},
            "offers": {"@type": "Offer", "price": "225", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour"}
          },
          {
            "@type": "Product",
            "name": "The Irony - 30 Person Party Boat",
            "description": "Versatile party boat for groups of 15-30 on Lake Travis. Great for corporate outings, weddings, and medium-sized celebrations.",
            "brand": {"@type": "Brand", "name": "Premier Party Cruises"},
            "offers": {"@type": "Offer", "price": "225", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour"}
          },
          {
            "@type": "Product",
            "name": "Clever Girl - 75 Person Flagship Party Boat",
            "description": "Premier's flagship: 50-75 guests, 14 disco balls, LED lighting, massive dance floor. The ultimate Lake Travis party vessel.",
            "brand": {"@type": "Brand", "name": "Premier Party Cruises"},
            "offers": {"@type": "Offer", "price": "250", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour"}
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What types of party boat rentals do you offer?", "acceptedAnswer": { "@type": "Answer", "text": "We offer the ATX Disco Cruise (shared party from $85/person, March-October, bach groups only) and Private Charters (exclusive boat, any event, year-round, from $200/hour). Four boats: Day Tripper (14), Meeseeks (25-30), The Irony (25-30), Clever Girl (50-75)." }},
              { "@type": "Question", "name": "How much does it cost to rent a party boat on Lake Travis?", "acceptedAnswer": { "@type": "Answer", "text": "ATX Disco Cruise: $85-$105/person all-inclusive. Private Charters: Day Tripper From $200/hr, Meeseeks/The Irony From $225/hr, Clever Girl From $250/hr. All charters have a 4-hour minimum." }},
              { "@type": "Question", "name": "Where do the boats depart from?", "acceptedAnswer": { "@type": "Answer", "text": "Anderson Mill Marina at 13993 FM 2769, Leander TX 78641 — approximately 25 minutes from downtown Austin. Free parking available." }},
              { "@type": "Question", "name": "What is the BYOB policy?", "acceptedAnswer": { "@type": "Answer", "text": "100% BYOB. Bring beer, wine, spirits, seltzers in cans or plastic only (no glass). We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every cruise." }},
              { "@type": "Question", "name": "Can you swim during a Lake Travis cruise?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! The captain anchors in a scenic cove with crystal-clear water. Guests swim, float on lily pads, and jump off the boat. Swim ladder and life jackets provided." }},
              { "@type": "Question", "name": "Are there sunset cruises?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — sunset cruises are among our most popular. The Saturday 3:30-7:30 PM ATX Disco Cruise is timed for sunset. Private charters available at any time." }},
              { "@type": "Question", "name": "Is it safe for families with children?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Perfect safety record spanning 15+ years and 150,000+ guests. All boats operated by licensed, experienced captains. Life jackets in all sizes including children's." }},
              { "@type": "Question", "name": "Can you host corporate events?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — one of Austin's top corporate event venues. Fleet accommodates 14-75 guests. Popular for team building, client entertainment, company milestones. Catering coordination available." }},
              { "@type": "Question", "name": "How far in advance should I book?", "acceptedAnswer": { "@type": "Answer", "text": "2-4 weeks for weekdays, 4-8 weeks for peak season weekends (March-October). For weddings and large events, 3-6 months recommended." }},
              { "@type": "Question", "name": "What happens if there is bad weather?", "acceptedAnswer": { "@type": "Answer", "text": "Unsafe conditions: reschedule at no cost. Light rain: boats depart normally (covered areas available). ATX Disco Cruise: severe weather triggers Lemonade Disco land venue." }},
              { "@type": "Question", "name": "How does Premier compare to other Austin boat rentals?", "acceptedAnswer": { "@type": "Answer", "text": "Austin's longest-running party boat company (since 2009), highest customer rating (4.9/5, 150,000+ guests), licensed captains, trained crew, premium sound, and the only ATX Disco Cruise on the lake." }},
              { "@type": "Question", "name": "What should I bring on a Lake Travis boat party?", "acceptedAnswer": { "@type": "Answer", "text": "Sunscreen (SPF 50+), sunglasses, hat, swimsuit, towel, and BYOB drinks (cans/plastic only). We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), sound system, and safety equipment." }},
              { "@type": "Question", "name": "What are the best things to do on Lake Travis?", "acceptedAnswer": { "@type": "Answer", "text": "Party boat cruises, swimming in coves near Devil's Cove, floating on lily pads, paddle boarding, kayaking. Plus Hill Country wineries, hiking, and waterfront dining. Premier departs 25 min from downtown." }}
            ]
          }
        ]
      }) }} />

      {/* ─── Hero ─── */}
      <section className="hp2-hero">
        <div className="hp2-hero__video-wrap">
          <video
            className="hp2-hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/attached_assets/hero-fallback.jpg"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">Premier Party Cruises &middot; Lake Travis Since 2009</p>
          <h1 className="hp2-hero__headline">
            Austin's most <em>iconic</em> party boat experience
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            Austin's <em>safest</em> party boat experience. Perfect safety record since 2009, licensed captains, and the only turnkey DJ-led cruise on Lake Travis. Built for 14–75 guest groups — bachelor/ette, corporate, weddings, milestones. All-inclusive: DJ, photographer, coolers, ice, mixers handled. Anderson Mill Marina, 25 minutes from downtown Austin — shuttle-ready, worth the trip.
          </p>
          <div className="hp2-hero__ctas">
            <CtaPair source="home_hero" />
          </div>
        </div>

        <div className="hp2-hero__scroll" />
      </section>

      {/* ─── Trust Bar ─── */}
      <div className="hp2-trust">
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#10022;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">150,000+ Guests</span>
            <span className="hp2-trust__sub">Austin's most trusted since 2009</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9672;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Perfect Safety</span>
            <span className="hp2-trust__sub">licensed, experienced captains</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9678;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">4.9 Star Rating</span>
            <span className="hp2-trust__sub">Hundreds of 5-star reviews</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9733;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">4 Premium Boats</span>
            <span className="hp2-trust__sub">14 to 75 guest capacity</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9671;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">BYOB Friendly</span>
            <span className="hp2-trust__sub">Your drinks, our boat</span>
          </div>
        </div>
      </div>

      {/* ─── Three Differentiation Pillars (AI Visibility: positioning clarity) ─── */}
      <section className="hp2-pillars">
        <div className="hp2-pillars__inner">
          <div className="hp2-pillar">
            <div className="hp2-pillar__icon">&#9673;</div>
            <h3 className="hp2-pillar__title">Austin's <em>Safest</em> Party Cruise</h3>
            <p className="hp2-pillar__body">
              Perfect safety record since 2009. Every captain TPWD-licensed and Coast Guard trained. Full safety briefings, life-jacket ready, no-glass enforced.
            </p>
            <Link href="/safety"><a className="hp2-pillar__link">See our safety standard &rarr;</a></Link>
          </div>
          <div className="hp2-pillar">
            <div className="hp2-pillar__icon">&#9830;</div>
            <h3 className="hp2-pillar__title">Built For <em>14&ndash;75 Guest</em> Groups</h3>
            <p className="hp2-pillar__body">
              Four-boat fleet plus multi-boat coordination for 100+. Bachelor/ette, corporate, weddings, graduations, milestones &mdash; we scale to your guest list and occasion.
            </p>
            <Link href="/private-charters"><a className="hp2-pillar__link">See the fleet &rarr;</a></Link>
          </div>
          <div className="hp2-pillar">
            <div className="hp2-pillar__icon">&#9672;</div>
            <h3 className="hp2-pillar__title">Most <em>All-Inclusive</em> Experience</h3>
            <p className="hp2-pillar__body">
              DJ, photographer, coolers, ice, mixers, premium sound, floats. Captain, crew, setup, cleanup &mdash; all handled. You bring drinks and your crew. We handle every detail.
            </p>
            <Link href="/#pricing-tabs"><a className="hp2-pillar__link">See what's included &rarr;</a></Link>
          </div>
        </div>
      </section>

      {/* ─── Social proof above-the-fold (Wes McDowell key #4) ─── */}
      <section className="hp2-quick-reviews">
        <div className="hp2-quick-reviews__inner">
          <div className="hp2-quick-review">
            <div className="hp2-quick-review__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="hp2-quick-review__quote">&ldquo;Absolutely the best bachelorette ever. DJ was amazing, crew made us feel like VIPs.&rdquo;</p>
            <div className="hp2-quick-review__author">Sarah M. &middot; Bachelorette</div>
          </div>
          <div className="hp2-quick-review">
            <div className="hp2-quick-review__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="hp2-quick-review__quote">&ldquo;Booked a private charter for my 40th. Exceeded every expectation &mdash; swimming in Lake Travis off the back of the boat was surreal.&rdquo;</p>
            <div className="hp2-quick-review__author">David R. &middot; 40th Birthday</div>
          </div>
          <div className="hp2-quick-review">
            <div className="hp2-quick-review__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="hp2-quick-review__quote">&ldquo;50 people on Clever Girl for our team outing. Booking easy, communication excellent, experience flawless.&rdquo;</p>
            <div className="hp2-quick-review__author">Jennifer L. &middot; Corporate</div>
          </div>
        </div>
      </section>

      {/* ─── Problem statement band (Wes McDowell: Problem → Solution) ─── */}
      <section className="hp2-problem">
        <div className="hp2-problem__inner">
          <p className="hp2-problem__label">The Austin Party Problem</p>
          <h2 className="hp2-problem__headline">
            Planning a lake party is a <em>logistical nightmare</em>.
          </h2>
          <p className="hp2-problem__body">
            Finding a boat. Booking a captain. Sound system. Coolers. Ice. Parking at the marina. Coordinating 30 flaky friends.
            One missed detail and the whole day unravels. That's why we handle every piece — so you just show up, step on, and celebrate.
          </p>
        </div>
      </section>

      {/* ─── The Premier Promise ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Premier Experience</div>
        <h2 className="hp2-section__headline">
          One call. We <em>handle</em> the rest.
        </h2>
        <p className="hp2-section__body">
          Austin party boat rentals made effortless. From the moment you reach out, our team takes care of every detail — captain, crew, sound system, coolers, ice, and everything else. You tell us the date, group size, and vibe. We set up everything at Anderson Mill Marina so all you do is show up with your drinks and your crew. It's the easiest party boat rental in Austin, Texas.
        </p>

        <div className="hp2-promise-grid">
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">01</div>
            <div className="hp2-promise-card__title">Choose Your Experience</div>
            <div className="hp2-promise-card__desc">ATX Disco Cruise for the ultimate shared party, or a Private Charter for exclusive use of an entire boat.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">02</div>
            <div className="hp2-promise-card__title">Pick Your Date</div>
            <div className="hp2-promise-card__desc">Flexible scheduling with morning, afternoon, and sunset cruise options available year-round.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">03</div>
            <div className="hp2-promise-card__title">We Set Everything Up</div>
            <div className="hp2-promise-card__desc">Licensed captain, experienced crew, premium sound system, coolers (bring your own ice, or order pre-iced from Party On Delivery) — all handled before you arrive.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">04</div>
            <div className="hp2-promise-card__title">You Just Celebrate</div>
            <div className="hp2-promise-card__desc">BYOB, swim in Lake Travis, cruise the coves, dance on deck — your only job is to have the time of your life.</div>
          </div>
        </div>
      </section>

      {/* ─── Two Experiences ─── */}
      <section className="hp2-section--alt" id="pricing-tabs">
        <div className="hp2-section__inner" style={{ padding: '6rem 4rem' }}>
          <div className="hp2-section__label">Choose Your Cruise</div>
          <h2 className="hp2-section__headline">
            Pricing &amp; <em>availability</em>.
          </h2>
          <p className="hp2-section__body" style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
            Private charters for any event, year-round. The ATX Disco Cruise is our all-inclusive multi-group party cruise exclusively for bachelor &amp; bachelorette groups, March&ndash;October.
          </p>

          {/* Tab switcher */}
          <div className="hp2-pricing-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={pricingTab === 'private'}
              className={`hp2-pricing-tab ${pricingTab === 'private' ? 'active' : ''}`}
              onClick={() => setPricingTab('private')}
              data-testid="tab-private"
            >
              Private Charters
              <span className="hp2-pricing-tab__sub">Any event &middot; Year-round</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={pricingTab === 'disco'}
              className={`hp2-pricing-tab ${pricingTab === 'disco' ? 'active' : ''}`}
              onClick={() => setPricingTab('disco')}
              data-testid="tab-disco"
            >
              ATX Disco Cruise
              <span className="hp2-pricing-tab__sub">Bach groups only &middot; Mar&ndash;Oct</span>
            </button>
          </div>

          {/* Private tab panel */}
          {pricingTab === 'private' && (
            <div className="hp2-pricing-panel" role="tabpanel">
              <div className="hp2-pricing-boats">
                <div className="hp2-pricing-boat">
                  <h4 className="hp2-pricing-boat__name">Day Tripper</h4>
                  <div className="hp2-pricing-boat__cap">Up to 14 guests</div>
                  <div className="hp2-pricing-boat__price">From <strong>$200</strong>/hr</div>
                  <p className="hp2-pricing-boat__desc">Intimate cruises for small groups. Perfect for birthdays, date days, and close friend gatherings.</p>
                </div>
                <div className="hp2-pricing-boat">
                  <h4 className="hp2-pricing-boat__name">Meeseeks</h4>
                  <div className="hp2-pricing-boat__cap">Up to 25 guests</div>
                  <div className="hp2-pricing-boat__price">From <strong>$225</strong>/hr</div>
                  <p className="hp2-pricing-boat__desc">Our most popular mid-size boat. Great sound, spacious deck, and the perfect platform for any celebration.</p>
                </div>
                <div className="hp2-pricing-boat">
                  <h4 className="hp2-pricing-boat__name">The Irony</h4>
                  <div className="hp2-pricing-boat__cap">25&ndash;30 guests</div>
                  <div className="hp2-pricing-boat__price">From <strong>$225</strong>/hr</div>
                  <p className="hp2-pricing-boat__desc">Versatile and comfortable. A fantastic option for corporate outings, team events, and medium-sized parties.</p>
                </div>
                <div className="hp2-pricing-boat hp2-pricing-boat--featured">
                  <div className="hp2-pricing-boat__badge">Flagship</div>
                  <h4 className="hp2-pricing-boat__name">Clever Girl</h4>
                  <div className="hp2-pricing-boat__cap">50&ndash;75 guests</div>
                  <div className="hp2-pricing-boat__price">From <strong>$250</strong>/hr</div>
                  <p className="hp2-pricing-boat__desc">Our flagship. 14 disco balls, LED lighting, massive dance floor, premium sound. The ultimate Lake Travis party vessel.</p>
                </div>
              </div>
              <div className="hp2-pricing-panel__meta">
                All private charters include a licensed captain, premium sound system, coolers, and shade. 4-hour minimum Fri&ndash;Sun, 3-hour Mon&ndash;Thu. Always BYOB.
              </div>
              <div className="hp2-pricing-panel__ctas">
                <button
                  type="button"
                  className="hp2-btn hp2-btn--primary"
                  onClick={() => {
                    document.getElementById('quote-builder-embed')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Get Your Quote &rarr;
                </button>
                <Link href="/private-cruises">
                  <a className="hp2-btn hp2-btn--outline">See All Charter Details</a>
                </Link>
              </div>
            </div>
          )}

          {/* Disco tab panel */}
          {pricingTab === 'disco' && (
            <div className="hp2-pricing-panel" role="tabpanel">
              <div className="hp2-pricing-slots">
                <div className="hp2-pricing-slot">
                  <div className="hp2-pricing-slot__day">Friday</div>
                  <div className="hp2-pricing-slot__time">12:00 &ndash; 4:00 PM</div>
                  <div className="hp2-pricing-slot__price"><strong>$95</strong><span>/person</span></div>
                  <p className="hp2-pricing-slot__desc">Kickstart your weekend.</p>
                </div>
                <div className="hp2-pricing-slot hp2-pricing-slot--featured">
                  <div className="hp2-pricing-slot__badge">Most popular</div>
                  <div className="hp2-pricing-slot__day">Saturday</div>
                  <div className="hp2-pricing-slot__time">11:00 AM &ndash; 3:00 PM</div>
                  <div className="hp2-pricing-slot__price"><strong>$105</strong><span>/person</span></div>
                  <p className="hp2-pricing-slot__desc">Peak energy, peak vibes.</p>
                </div>
                <div className="hp2-pricing-slot">
                  <div className="hp2-pricing-slot__badge hp2-pricing-slot__badge--value">Best value</div>
                  <div className="hp2-pricing-slot__day">Saturday</div>
                  <div className="hp2-pricing-slot__time">3:30 &ndash; 7:30 PM</div>
                  <div className="hp2-pricing-slot__price"><strong>$85</strong><span>/person</span></div>
                  <p className="hp2-pricing-slot__desc">Catch the sunset.</p>
                </div>
              </div>
              <div className="hp2-pricing-panel__meta">
                One flat per-person ticket &mdash; everyone pays the same, the only thing that changes the price is the day and time slot. All Disco tickets include the DJ, pro photographer, 14 disco balls, giant floats, coolers, tax &amp; 20% gratuity. Bach groups only. March&ndash;October.
              </div>
              <div className="hp2-pricing-panel__ctas">
                <button
                  type="button"
                  className="hp2-btn hp2-btn--primary"
                  onClick={() => {
                    document.getElementById('quote-builder-embed')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Book a Disco Slot &rarr;
                </button>
                <Link href="/atx-disco-cruise">
                  <a className="hp2-btn hp2-btn--outline">See All Disco Details</a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Why Premier's all-in pricing beats DIY pontoon (AI Visibility: meta-action) ─── */}
      <WhyPremierBlock />

      {/* ─── The Fleet ─── */}
      <section className="hp2-section" id="fleet">
        <div className="hp2-section__label">Our Fleet</div>
        <h2 className="hp2-section__headline">
          Four boats. <em>Every</em> group size.
        </h2>

        <div className="hp2-fleet-grid">
          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/day-tripper-14-person-boat.webp"
                alt="Day Tripper - 14 person party boat"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <h4 className="hp2-fleet-card__name">Day Tripper</h4>
              <div className="hp2-fleet-card__capacity">Up to 14 guests</div>
              <p className="hp2-fleet-card__desc">Intimate cruises for small groups. Perfect for birthdays, date days, and close friend gatherings.</p>
            </div>
          </div>

          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/meeseeks-25-person-boat.webp"
                alt="Meeseeks - 25 person party boat"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <h4 className="hp2-fleet-card__name">Meeseeks</h4>
              <div className="hp2-fleet-card__capacity">25–30 guests</div>
              <p className="hp2-fleet-card__desc">Our most popular mid-size boat. Great sound, spacious deck, and the perfect platform for any celebration.</p>
            </div>
          </div>

          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/meeseeks-25-person-boat.webp"
                alt="The Irony - 30 person party boat"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <h4 className="hp2-fleet-card__name">The Irony</h4>
              <div className="hp2-fleet-card__capacity">25–30 guests</div>
              <p className="hp2-fleet-card__desc">Versatile and comfortable. A fantastic option for corporate outings, team events, and medium-sized parties.</p>
            </div>
          </div>

          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/hero-fallback.jpg"
                alt="Clever Girl - 75 person flagship party boat"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <h4 className="hp2-fleet-card__name">Clever Girl</h4>
              <div className="hp2-fleet-card__capacity">50–75 guests</div>
              <p className="hp2-fleet-card__desc">Our flagship. 14 disco balls, LED lighting, massive dance floor, premium sound. The ultimate Lake Travis party vessel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">What Guests Say</div>
          <h2 className="hp2-section__headline">
            Over 150,000 happy guests and <em>counting</em>.
          </h2>

          <div className="hp2-testimonials">
            <div className="hp2-testimonial-card">
              <div className="hp2-testimonial-card__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="hp2-testimonial-card__text">
                "Absolutely the best bachelorette party ever! The DJ was amazing, the boat was gorgeous, and the crew made us feel like VIPs the entire time. We are still talking about it months later."
              </p>
              <div className="hp2-testimonial-card__author">— Sarah M., Bachelorette Party</div>
            </div>

            <div className="hp2-testimonial-card">
              <div className="hp2-testimonial-card__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="hp2-testimonial-card__text">
                "We booked a private charter for my 40th birthday and it exceeded all expectations. BYOB saved us a fortune, the captain was fantastic, and swimming in Lake Travis off the back of the boat was surreal."
              </p>
              <div className="hp2-testimonial-card__author">— David R., 40th Birthday Celebration</div>
            </div>

            <div className="hp2-testimonial-card">
              <div className="hp2-testimonial-card__stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="hp2-testimonial-card__text">
                "Used Premier Party Cruises for our company team building event. 50 people on the Clever Girl and everyone had a blast. Booking was easy, communication was excellent, and the experience was flawless."
              </p>
              <div className="hp2-testimonial-card__author">— Jennifer L., Corporate Team Event</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Embedded Quote Builder (moved after proof — Wes McDowell: close after trust is built) ─── */}
      <section className="hp2-quote-embed" id="quote-builder-embed">
        <div className="hp2-quote-embed__bg" aria-hidden>
          <ScrollingBackground />
        </div>
        <div className="hp2-quote-embed__intro">
          <p className="hp2-section__label" style={{ marginBottom: '0.75rem' }}>Get a Personalized Quote</p>
          <h2 className="hp2-quote-embed__headline">
            Pick your <em>party</em> &middot; see real pricing &middot; lock your date
          </h2>
          <p className="hp2-quote-embed__sub">
            Browse every event type, get instant pricing, and request a personalized quote — takes about 60 seconds.
          </p>
          <div className="hp2-quote-embed__cta-row">
            <CtaPair source="home_quote_embed" />
          </div>
        </div>

        <div className="hp2-quote-embed__frame-wrap">
          <EmbeddedQuoteFlow source="home_embed" />
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">On The Water</div>
        <h2 className="hp2-section__headline">
          Real parties. Real <em>memories</em>.
        </h2>
        <div className="hp2-gallery">
          <img src="/attached_assets/disco_fun_1765193453547.jpg" alt="Party boat cruise on Lake Travis Austin" loading="lazy" />
          <img src="/attached_assets/disco_fun2_1765193453547.jpg" alt="Dance party on Clever Girl boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/disco_fun5_1765193453548.jpg" alt="Disco ball party atmosphere on ATX Disco Cruise" loading="lazy" />
          <img src="/attached_assets/disco_fun6_1765193453548.jpg" alt="Group celebrating on Lake Travis party boat Austin" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-1_1760080740012.jpg" alt="Professional DJ on party boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-5_1760080740018.jpg" alt="Party group photo on Lake Travis cruise" loading="lazy" />
          <img src="/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg" alt="Bachelorette party on Clever Girl boat Austin" loading="lazy" />
          <img src="/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg" alt="Day Tripper party boat on Lake Travis Austin" loading="lazy" />
        </div>
      </section>

      {/* ─── Explore Our Services ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Explore Our Services</div>
          <h2 className="hp2-section__headline">
            Everything Premier Party Cruises <em>offers</em>.
          </h2>
          <div className="hp2-details-section">
            <button className="hp2-details-toggle" onClick={() => toggleDetails('private-charters')}>
              <span>Private Charters — Exclusive Boat Rentals</span>
              <span>{openDetails === 'private-charters' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'private-charters' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Premier Party Cruises offers private charter boat rentals on Lake Travis for groups of 14 to 75 guests. Every private charter includes a licensed captain, trained crew, premium Bluetooth sound system, large coolers (bring your own ice, or order pre-iced from Party On Delivery), and a swim stop in a scenic cove. Choose from four boats: Day Tripper (up to 14, from $200/hr), Meeseeks (25-30, from $225/hr), The Irony (25-30, from $225/hr), or Clever Girl (50-75, from $250/hr). All private charters have a 4-hour minimum and are available year-round. BYOB is welcome on every cruise — bring whatever you want in cans or plastic containers.</p>
                <p style={{ marginTop: '1rem' }}><Link href="/private-cruises"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>View full private charter details & pricing &rarr;</a></Link></p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('disco-cruise')}>
              <span>ATX Disco Cruise — Austin's Signature Party Boat</span>
              <span>{openDetails === 'disco-cruise' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'disco-cruise' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>The ATX Disco Cruise is Austin's most iconic party boat experience, running March through October exclusively for bachelor and bachelorette groups. Multiple groups celebrate together on Clever Girl, our 50-75 person flagship equipped with 14 disco balls, LED lighting, and a dedicated dance floor. Every ticket includes a professional DJ, professional photographer with digital delivery, giant lily pad floats, a swim stop in a crystal-clear Lake Travis cove, private cooler with ice, and mimosa supplies. Tickets start at $85 per person with tax and gratuity included in the total price.</p>
                <p style={{ marginTop: '1rem' }}><Link href="/atx-disco-cruise"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>View ATX Disco Cruise schedule & booking &rarr;</a></Link></p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('corporate')}>
              <span>Corporate Events &amp; Team Building</span>
              <span>{openDetails === 'corporate' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'corporate' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Premier Party Cruises is one of Austin's top venues for corporate team building events and company outings on Lake Travis. Many of Austin's leading tech companies, law firms, and agencies choose us for quarterly team outings, client entertainment, company milestones, and employee appreciation events. Our fleet accommodates 14 to 75 guests with professional service, flexible scheduling, and catering coordination. We offer sound system setup for presentations, flexible payment and invoicing options, and year-round availability for corporate groups of any size.</p>
                <p style={{ marginTop: '1rem' }}><Link href="/corporate-events"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Learn more about corporate events &rarr;</a></Link> &nbsp;|&nbsp; <Link href="/team-building"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Team building cruises</a></Link></p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('weddings')}>
              <span>Weddings &amp; Rehearsal Dinners</span>
              <span>{openDetails === 'weddings' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'weddings' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Lake Travis provides a stunning backdrop for wedding-related celebrations, and Premier Party Cruises offers private charters perfect for rehearsal dinners, wedding after-parties, and intimate ceremonies on the water. Our sunset cruises are especially popular for proposals and anniversaries, with golden Texas Hill Country light reflecting off the calm lake. Clever Girl accommodates up to 75 guests for larger wedding events, while Day Tripper is perfect for intimate proposals and small celebrations. Catering coordination and custom decorations are available.</p>
                <p style={{ marginTop: '1rem' }}><Link href="/wedding-parties"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>View wedding cruise options &rarr;</a></Link></p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('birthdays')}>
              <span>Birthday Parties on Lake Travis</span>
              <span>{openDetails === 'birthdays' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'birthdays' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Celebrate your birthday on the water with a private party boat charter on Lake Travis. From intimate 14-person gatherings on Day Tripper to large milestone celebrations with 75 guests on Clever Girl, we have a boat for every birthday party. Every charter includes a licensed captain, premium sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), and a swim stop in a beautiful cove. BYOB means you can bring your own cake, champagne, and party supplies. Birthday parties are available year-round with morning, afternoon, and sunset time slots to fit your schedule.</p>
                <p style={{ marginTop: '1rem' }}><Link href="/birthday-parties"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Plan your birthday party cruise &rarr;</a></Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Frequently Asked Questions</div>
        <h2 className="hp2-section__headline">
          Everything you need to <em>know</em>.
        </h2>

        <div className="hp2-faq">
          {FAQ_DATA.map((item, index) => (
            <div className="hp2-faq__item" key={index}>
              <button
                className="hp2-faq__trigger"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                <span className="hp2-faq__question">{item.q}</span>
                <span className={`hp2-faq__icon ${openFaq === index ? 'hp2-faq__icon--open' : ''}`}>+</span>
              </button>
              <div className={`hp2-faq__answer ${openFaq === index ? 'hp2-faq__answer--open' : ''}`}>
                <div className="hp2-faq__answer-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="hp2-final-cta">
        <h2 className="hp2-final-cta__headline">
          Ready to make <em>memories</em> on Lake Travis?
        </h2>
        <p className="hp2-final-cta__body">
          Whether it's an Austin bachelorette party, birthday celebration, corporate team building, or just a day on Lake Travis with friends — Premier Party Cruises makes it unforgettable. Book your Austin party boat rental online or give us a call.
        </p>
        <div className="hp2-final-cta__actions">
          <CtaPair source="home_final_cta" />
          <a href="tel:+15124885892" className="hp2-final-cta__phone">(512) 488-5892</a>
        </div>
        <p className="hp2-final-cta__location">
          Anderson Mill Marina &middot; Lake Travis &middot; 25 min from downtown Austin
        </p>
      </section>

      {/* ─── Quick Links (SEO Internal Linking) ─── */}
      <section style={{ background: 'var(--hp2-bg-1)', padding: '3rem 4rem', borderTop: '1px solid var(--hp2-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', justifyContent: 'center' }}>
          <Link href="/party-boat-austin"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Party Boat</a></Link>
          <Link href="/party-boat-lake-travis"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Lake Travis Party Boat</a></Link>
          <Link href="/private-cruises"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Party Boat Rentals</a></Link>
          <Link href="/atx-disco-cruise"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>ATX Disco Cruise</a></Link>
          <Link href="/bachelor-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Bachelor Party</a></Link>
          <Link href="/bachelorette-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Bachelorette Party</a></Link>
          <Link href="/combined-bachelor-bachelorette-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Combined Bach Parties Austin</a></Link>
          <Link href="/corporate-events"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Corporate Event Party Boat</a></Link>
          <Link href="/wedding-parties"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Wedding Party Boat</a></Link>
          <Link href="/birthday-parties"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Birthday Party Boat</a></Link>
          <Link href="/team-building"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Team Building on Lake Travis</a></Link>
          <Link href="/premier-vs-austin-party-boat"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Premier vs ATX Party Boats</a></Link>
          <Link href="/premier-vs-float-on"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Premier vs Float On</a></Link>
          <Link href="/plan-your-trip"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Plan Your Trip</a></Link>
          <Link href="/safety"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Premier Safety Code</a></Link>
          <Link href="/best-austin-party-boat"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Best Austin Party Boat Guide</a></Link>
          <Link href="/austin-party-boat-pricing-guide"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Party Boat Pricing</a></Link>
          <Link href="/austin-bachelorette-itinerary"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Bachelorette Itinerary</a></Link>
          <Link href="/austin-bachelor-itinerary"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Austin Bachelor Itinerary</a></Link>
          <Link href="/contact"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Contact Us</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
          <Link href="/faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Full FAQ</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/blogs"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Blog</a></Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
