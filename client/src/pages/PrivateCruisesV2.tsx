import { useState, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigationLuxury';

const Footer = lazy(() => import('@/components/Footer'));

// ─── Inline Styles (HP2 Design System) ──────────────────────────────────────
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
  opacity: 0.35;
}

.hp2-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(7,7,12,0.88) 0%, rgba(7,7,12,0.55) 60%, rgba(7,7,12,0.75) 100%);
  z-index: 1;
}

.hp2-hero__content {
  position: relative;
  z-index: 2;
  max-width: 820px;
  padding: 6rem 0;
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
  background: var(--hp2-bg-1);
  max-width: none;
}

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

/* ─── Promise Grid (The Experience 4-step) ───────────────────── */
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

/* ─── Fleet Cards ────────────────────────────────────────────── */
.hp2-fleet-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.hp2-fleet-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hp2-fleet-card__img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
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

.hp2-fleet-card__badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--hp2-gold);
  color: #07070C;
  font-family: var(--hp2-font-body);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0.5rem 1rem;
  z-index: 1;
}

.hp2-fleet-card__content {
  padding: 2.4rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.hp2-fleet-card__title {
  font-family: var(--hp2-font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 0.5rem;
}

.hp2-fleet-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-bottom: 1.2rem;
}

.hp2-fleet-card__tag {
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--hp2-gold);
  background: var(--hp2-gold-dim);
  padding: 0.3rem 0.7rem;
}

.hp2-fleet-card__desc {
  font-size: 1rem;
  color: var(--hp2-text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.hp2-fleet-card__price {
  font-family: var(--hp2-font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--hp2-gold-light);
  margin-bottom: 0.3rem;
}

.hp2-fleet-card__price-note {
  font-size: 0.82rem;
  color: var(--hp2-text-muted);
  margin-bottom: 1.5rem;
}

.hp2-fleet-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;
}

.hp2-fleet-card__features li {
  font-size: 0.9rem;
  color: var(--hp2-text-muted);
  line-height: 1.6;
  padding: 0.35rem 0;
  padding-left: 1.2rem;
  position: relative;
}

.hp2-fleet-card__features li::before {
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}

/* ─── Package Tiers ──────────────────────────────────────────── */
.hp2-packages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--hp2-border);
  margin-top: 4rem;
}

.hp2-package-card {
  padding: 2.8rem 2rem;
  border-right: 1px solid var(--hp2-border);
  display: flex;
  flex-direction: column;
}

.hp2-package-card:last-child {
  border-right: none;
}

.hp2-package-card__tier {
  font-family: var(--hp2-font-body);
  font-size: 0.74rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--hp2-gold);
  margin-bottom: 0.5rem;
}

.hp2-package-card__name {
  font-family: var(--hp2-font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 0.5rem;
}

.hp2-package-card__price {
  font-family: var(--hp2-font-display);
  font-size: 1.4rem;
  font-weight: 300;
  color: var(--hp2-gold-light);
  margin-bottom: 1.5rem;
}

.hp2-package-card__features {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.hp2-package-card__features li {
  font-size: 0.9rem;
  color: var(--hp2-cream-muted);
  line-height: 1.6;
  padding: 0.35rem 0;
  padding-left: 1.2rem;
  position: relative;
}

.hp2-package-card__features li::before {
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}

/* ─── Event Types Grid ───────────────────────────────────────── */
.hp2-events-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  margin-top: 4rem;
}

.hp2-event-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.4rem 1.5rem;
  text-align: center;
  transition: background 0.2s ease;
}

.hp2-event-card:hover {
  background: rgba(200,169,110,0.06);
}

.hp2-event-card__icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
  display: block;
}

.hp2-event-card__name {
  font-family: var(--hp2-font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--hp2-cream);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.4;
}

.hp2-event-card__sub {
  font-size: 0.78rem;
  color: var(--hp2-text-muted);
  margin-top: 0.3rem;
}

/* ─── Photo Gallery ──────────────────────────────────────────── */
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

/* ─── Expandable Details ─────────────────────────────────────── */
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
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
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
  max-height: 600px;
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
  .hp2-promise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-fleet-grid {
    grid-template-columns: 1fr;
  }
  .hp2-packages-grid {
    grid-template-columns: 1fr;
  }
  .hp2-package-card {
    border-right: none;
    border-bottom: 1px solid var(--hp2-border);
  }
  .hp2-package-card:last-child {
    border-bottom: none;
  }
  .hp2-events-grid {
    grid-template-columns: repeat(3, 1fr);
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
  .hp2-promise-grid {
    grid-template-columns: 1fr;
  }
  .hp2-fleet-grid {
    grid-template-columns: 1fr;
  }
  .hp2-packages-grid {
    grid-template-columns: 1fr;
  }
  .hp2-package-card {
    border-right: none;
    border-bottom: 1px solid var(--hp2-border);
  }
  .hp2-package-card:last-child {
    border-bottom: none;
  }
  .hp2-events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-final-cta {
    padding: 5rem 1.5rem;
  }
  .hp2-final-cta__headline {
    font-size: clamp(2rem, 6vw, 2.8rem);
  }
}
`;

// ─── FAQ Data (AI-optimized: direct answer first, then supporting detail) ───
const FAQ_DATA = [
  {
    q: 'How much does a private boat charter cost on Lake Travis?',
    a: 'Private boat charters on Lake Travis start at $200 per hour for our smallest vessel (Day Tripper, up to 14 guests) and range up to $500 per hour for our flagship Clever Girl (50-75 guests). All boats have a 4-hour minimum. Here is the full breakdown: Day Tripper (up to 14 guests) is $200-$350/hour, Meeseeks (25-30 guests) is $225-$425/hour, The Irony (25-30 guests) is $225-$425/hour, and Clever Girl (50-75 guests) is $250-$500/hour. Pricing varies by day of week, season, and time of day. Additional costs include crew fees for groups of 26-30 ($50-$75) and 51-75 ($100-$150), 8.25% Texas sales tax, and a suggested 20% gratuity. Package upgrades are available: Essentials adds $100-$200 flat, and Ultimate adds $250-$350 flat per cruise.'
  },
  {
    q: 'Are private cruises available year-round?',
    a: 'Yes — private charters with Premier Party Cruises are available all 12 months of the year, unlike our seasonal ATX Disco Cruise which runs March through October. Lake Travis is beautiful in every season. Spring and fall offer the most comfortable temperatures and fewer crowds. Summer is peak season with the warmest water for swimming. Winter cruises are perfect for holiday parties, proposals, and intimate celebrations — the lake is peaceful and stunning with cooler air and often spectacular sunsets. Off-peak months (November through February) may offer more flexible scheduling and availability.'
  },
  {
    q: 'What boats are available for private charters?',
    a: 'Premier Party Cruises operates a fleet of four premium boats on Lake Travis. Day Tripper accommodates up to 14 guests and is ideal for intimate gatherings, proposals, and small celebrations ($200-$350/hour). Meeseeks holds 25-30 guests and is our most popular charter — perfect for bachelorette parties, birthdays, and corporate outings ($225-$425/hour). The Irony also holds 25-30 guests with similar amenities, offering a versatile option for mid-size groups ($225-$425/hour). Clever Girl is our flagship vessel accommodating 50-75 guests, featuring 14 disco balls, LED lighting, a full dance floor, and a giant Texas flag — ideal for large events, weddings, and corporate celebrations ($250-$500/hour). All boats include a licensed captain, trained crew, premium Bluetooth sound system, large coolers, and restroom facilities.'
  },
  {
    q: "What's included in each package tier?",
    a: 'We offer three package tiers. The Standard package is included with every charter and features a licensed captain and trained crew, premium Bluetooth sound system, large coolers (bring your own ice), restroom facilities, comfortable seating and shaded areas, swim stop in a scenic Lake Travis cove, swim ladder and life jackets, and BYOB — bring whatever you want. The Essentials upgrade ($100-$200 flat per cruise) adds everything in Standard plus pre-stocked ice in all coolers, a water dispenser with cups, a 6-foot table for food and drinks, and catering coordination assistance. The Ultimate package ($250-$350 flat per cruise) includes everything in Essentials plus a giant lily pad float, a guest of honor float, disco ball party cups, bubble guns, champagne flutes, SPF-50 sunscreen, plates and napkins, and full party setup and breakdown by our crew.'
  },
  {
    q: 'Can we bring food and drinks?',
    a: 'Absolutely — Premier Party Cruises is 100% BYOB (Bring Your Own Beverage and food). Bring whatever you want: champagne, wine, beer, seltzers, spirits, mixers, soft drinks, water, and any food or snacks. The only restriction is no glass containers for safety — please use cans, plastic bottles, and plastic containers. We provide large coolers on every cruise, and our Essentials and Ultimate packages include pre-stocked ice so you do not have to bring your own. You can also coordinate alcohol and food delivery through our partner Party On Delivery, who will have everything waiting on the boat when you arrive. Many groups bring full catering setups — our Essentials package includes a 6-foot table and catering coordination to make this seamless.'
  },
  {
    q: 'Can we customize the route?',
    a: 'Yes — that is one of the biggest advantages of a private charter over a shared cruise. You and your captain can customize your route on Lake Travis based on your preferences. Popular options include cruising through scenic limestone cliffs and Hill Country views, anchoring in a crystal-clear cove for swimming and floating (such as near Devil\'s Cove), sunset cruises timed for golden hour, scenic tours of celebrity lakefront homes and mansions, and a combination of cruising, swimming, and anchoring. Your captain knows every corner of Lake Travis and will work with you to plan the perfect route for your group and occasion. Just communicate your priorities when you book, and we will make it happen.'
  },
  {
    q: 'How far in advance should we book?',
    a: 'For peak season weekends (March through October, especially Saturdays), we recommend booking 4-8 weeks in advance. Prime dates can sell out 6-8 weeks ahead, particularly during spring and early fall. For off-peak season (November through February), 2-4 weeks of advance booking is usually sufficient. Weekday charters generally have more availability. However, we do sometimes have last-minute openings — call (512) 488-5892 to check availability for this week or next. For large events (corporate retreats, weddings, holiday parties with 50+ guests on Clever Girl), booking 8-12 weeks out is recommended to ensure availability. A deposit is required to secure your date.'
  },
  {
    q: 'What happens if there is bad weather?',
    a: 'Safety is our absolute top priority. If conditions are unsafe — thunderstorms, lightning, sustained high winds, or dangerous wave conditions — we will contact you in advance to reschedule at no additional cost. Light rain and mild wind typically do not affect departures, and our boats have covered and shaded areas for guest comfort. We monitor weather conditions continuously using professional marine forecasting tools and communicate proactively so you always know what to expect. Texas weather can change quickly, but the vast majority of scheduled cruises depart as planned. If we need to reschedule, we work with you to find the next best available date. We never risk guest safety for a departure.'
  },
  {
    q: 'Can we swim during the cruise?',
    a: 'Yes — swimming is one of the highlights of a Lake Travis cruise! Your captain will anchor in a scenic cove with crystal-clear water, often surrounded by dramatic limestone cliffs. Guests can swim, float on our giant lily pad floats (included with the Ultimate package or available as an add-on), jump off the boat, and enjoy the natural beauty of Lake Travis. We provide a swim ladder for easy re-boarding and life jackets in all sizes. The typical swim stop lasts 1-2 hours during a 4-hour cruise, but you can customize the duration. Water temperatures are ideal for swimming from April through October, though adventurous groups enjoy winter swims too. The water in Lake Travis is some of the clearest in Texas, fed by natural springs.'
  },
  {
    q: 'Is it safe for children and families?',
    a: 'Absolutely. Premier Party Cruises has over 15 years of experience and a perfect safety record with more than 150,000 guests served. Every cruise includes a USCG-licensed captain and trained crew. We carry life jackets in all sizes including children\'s sizes. Our boats are USCG-inspected and fully equipped with all required safety gear. Many families choose us for birthday parties, family reunions, graduations, and multi-generational celebrations. Day Tripper is particularly popular for family events due to its intimate size. Just let us know the ages in your group when you book, and we will make sure everything is set up for a safe, fun experience for guests of all ages.'
  },
  {
    q: "What's the difference between a private charter and ATX Disco Cruise?",
    a: 'The ATX Disco Cruise is a shared party boat experience that runs March through October — multiple bachelor and bachelorette groups join together on Clever Girl for a DJ-led, photographer-included party atmosphere ($85-$105 per person, tax and gratuity included). A private charter means the entire boat is exclusively yours — your group, your music, your schedule, your route. Private charters are available year-round on any of our four boats (14-75 guests), starting at $200/hour with a 4-hour minimum. Choose a private charter if you want complete privacy and control, have a non-bach event (corporate, birthday, wedding, family), want to cruise during off-season (November-February), or have a specific group size or itinerary in mind. Choose the Disco Cruise if you want a high-energy party atmosphere with a professional DJ and photographer included in the price.'
  },
  {
    q: 'Do you offer sunset cruises?',
    a: 'Yes — sunset cruises are one of our most requested private charter experiences. Lake Travis sunsets over the Texas Hill Country are spectacular, with golden light reflecting off limestone cliffs and open water. We time your departure so you are on the water as the sun goes down, and your captain knows the best vantage points on the lake for sunset views. Sunset cruises are perfect for proposals, anniversaries, romantic evenings, corporate entertaining, and any celebration where you want that magical golden-hour atmosphere. Simply tell us you want a sunset cruise when you book, and we will schedule your departure to align perfectly with sunset timing for your date.'
  },
  {
    q: 'Can we have a DJ on a private charter?',
    a: 'Private charters do not include a DJ by default — instead, every boat comes with a premium Bluetooth sound system so you can play your own music from any phone or device. You have complete control over the playlist, volume, and vibe. If you want a professional DJ for your private charter, you are welcome to bring your own DJ aboard. Many groups also create collaborative playlists on Spotify or Apple Music and connect to our speakers. The sound systems on all four boats are high-quality and loud enough for dancing and partying. If you want the DJ-included experience, our ATX Disco Cruise (March-October) features a professional DJ for the full 4-hour cruise.'
  },
  {
    q: 'How does pricing work for larger groups?',
    a: 'For groups of 26-30 guests on Meeseeks or The Irony, there is an additional crew fee of $50-$75 to ensure adequate staffing for a larger group. For groups of 51-75 guests on Clever Girl, the additional crew fee is $100-$150. The hourly boat rate remains the same regardless of how many guests board (up to the boat\'s maximum capacity). This means the per-person cost actually decreases as your group size increases — a 4-hour Clever Girl charter at $300/hour is $16/person with 75 guests versus $24/person with 50 guests. Additional costs to factor in: 8.25% Texas sales tax on the charter total, a suggested 20% gratuity for the captain and crew, and optional package upgrades (Essentials at $100-$200 flat, Ultimate at $250-$350 flat). A deposit is required at booking to secure your date.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function PrivateCruisesV2() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openDetails, setOpenDetails] = useState<string | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleDetails = (key: string) => {
    setOpenDetails(openDetails === key ? null : key);
  };

  return (
    <div className="hp2-page">
      <style dangerouslySetInnerHTML={{ __html: HP2_STYLES }} />
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
            "priceRange": "$200-$500"
          },
          {
            "@type": "Service",
            "name": "Private Party Boat Charters Lake Travis",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Private party boat rentals on Lake Travis for 5-75 guests. Exclusive use of entire boat. Year-round availability. Corporate events, weddings, birthdays, bachelor/bachelorette parties.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "200", "highPrice": "500", "priceCurrency": "USD", "offerCount": "4" }
          },
          { "@type": "Product", "name": "Day Tripper - 14 Person Private Charter", "description": "Intimate private party boat for groups up to 14 on Lake Travis. Licensed captain, premium sound system, coolers with ice. BYOB welcome.", "brand": { "@type": "Brand", "name": "Premier Party Cruises" }, "offers": { "@type": "Offer", "price": "200", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour" } },
          { "@type": "Product", "name": "Meeseeks - 25 Person Private Charter", "description": "Mid-size private party boat for groups of 15-25 on Lake Travis. Premium sound, spacious deck.", "brand": { "@type": "Brand", "name": "Premier Party Cruises" }, "offers": { "@type": "Offer", "price": "225", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour" } },
          { "@type": "Product", "name": "The Irony - 30 Person Private Charter", "description": "Versatile private party boat for groups of 15-30 on Lake Travis. Great for corporate outings and weddings.", "brand": { "@type": "Brand", "name": "Premier Party Cruises" }, "offers": { "@type": "Offer", "price": "225", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour" } },
          { "@type": "Product", "name": "Clever Girl - 75 Person Flagship Charter", "description": "Premier's flagship: 50-75 guests, 14 disco balls, LED lighting, massive dance floor. The ultimate Lake Travis party vessel.", "brand": { "@type": "Brand", "name": "Premier Party Cruises" }, "offers": { "@type": "Offer", "price": "250", "priceCurrency": "USD", "priceValidUntil": "2026-12-31", "availability": "https://schema.org/InStock", "unitText": "per hour" } },
          {
            "@type": "FAQPage",
            "mainEntity": FAQ_DATA.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
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
            poster="/attached_assets/clever-girl-50-person-boat.webp"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">Private Charters &middot; Year-Round on Lake Travis</p>
          <h1 className="hp2-hero__headline">
            Your boat. Your crew. <em>Your rules.</em>
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            Exclusive private charters on Lake Travis for any occasion — birthdays, corporate events, weddings, family reunions, and more. Four premium boats, licensed captains, and 15+ years of experience. BYOB, fully customizable, available all year.
          </p>
          <div className="hp2-hero__ctas">
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Get a Quote &rarr;</a>
            </Link>
            <a href="#fleet" className="hp2-btn hp2-btn--outline">Explore Our Fleet</a>
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
            <span className="hp2-trust__sub">Austin's #1 since 2009</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9672;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Year-Round Availability</span>
            <span className="hp2-trust__sub">All 12 months on Lake Travis</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9678;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">4.9 Stars</span>
            <span className="hp2-trust__sub">The most-reviewed boat company</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9733;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">4 Premium Boats</span>
            <span className="hp2-trust__sub">14 to 75 guests</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9671;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Perfect Safety Record</span>
            <span className="hp2-trust__sub">USCG-licensed captains</span>
          </div>
        </div>
      </div>

      {/* ─── The Fleet ─── */}
      <section className="hp2-section--alt" id="fleet">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">The Fleet</div>
          <h2 className="hp2-section__headline">
            Four boats. One <em>perfect</em> match.
          </h2>

          <div className="hp2-fleet-grid">
            {/* Day Tripper */}
            <div className="hp2-fleet-card">
              <div className="hp2-fleet-card__img-wrap">
                <img
                  className="hp2-fleet-card__img"
                  src="/attached_assets/day-tripper-14-person-boat.webp"
                  alt="Day Tripper 14-person private charter boat on Lake Travis"
                  loading="lazy"
                />
              </div>
              <div className="hp2-fleet-card__content">
                <h3 className="hp2-fleet-card__title">Day Tripper</h3>
                <div className="hp2-fleet-card__meta">
                  <span className="hp2-fleet-card__tag">Up to 14 Guests</span>
                  <span className="hp2-fleet-card__tag">$200–$350/hr</span>
                </div>
                <p className="hp2-fleet-card__desc">
                  Our most intimate vessel — perfect for proposals, anniversary cruises, small birthday parties, and close-knit gatherings. Cozy yet spacious, with everything you need for a memorable day on the water.
                </p>
                <ul className="hp2-fleet-card__features">
                  <li>Licensed captain &amp; trained crew</li>
                  <li>Premium Bluetooth sound system</li>
                  <li>Large coolers with ice</li>
                  <li>Restroom facilities</li>
                  <li>Swim stop with ladder &amp; life jackets</li>
                  <li>BYOB — bring whatever you want</li>
                  <li>Ideal for intimate gatherings</li>
                </ul>
                <Link href="/book">
                  <a className="hp2-btn hp2-btn--primary" style={{ textAlign: 'center' }}>Book Day Tripper &rarr;</a>
                </Link>
              </div>
            </div>

            {/* Meeseeks */}
            <div className="hp2-fleet-card">
              <div className="hp2-fleet-card__img-wrap">
                <div className="hp2-fleet-card__badge">Most Popular</div>
                <img
                  className="hp2-fleet-card__img"
                  src="/attached_assets/meeseeks-25-person-boat.webp"
                  alt="Meeseeks 25-person private charter boat on Lake Travis"
                  loading="lazy"
                />
              </div>
              <div className="hp2-fleet-card__content">
                <h3 className="hp2-fleet-card__title">Meeseeks</h3>
                <div className="hp2-fleet-card__meta">
                  <span className="hp2-fleet-card__tag">25–30 Guests</span>
                  <span className="hp2-fleet-card__tag">$225–$425/hr</span>
                </div>
                <p className="hp2-fleet-card__desc">
                  Our most popular charter — the sweet spot for bachelor/bachelorette parties, corporate team outings, milestone birthdays, and mid-size celebrations. Spacious deck, premium sound, and room to move.
                </p>
                <ul className="hp2-fleet-card__features">
                  <li>Licensed captain &amp; trained crew</li>
                  <li>Premium Bluetooth sound system</li>
                  <li>Large coolers with ice</li>
                  <li>Restroom facilities</li>
                  <li>Swim stop with ladder &amp; life jackets</li>
                  <li>BYOB — bring whatever you want</li>
                  <li>Perfect for bach parties &amp; corporate events</li>
                </ul>
                <Link href="/book">
                  <a className="hp2-btn hp2-btn--primary" style={{ textAlign: 'center' }}>Book Meeseeks &rarr;</a>
                </Link>
              </div>
            </div>

            {/* The Irony */}
            <div className="hp2-fleet-card">
              <div className="hp2-fleet-card__img-wrap">
                <img
                  className="hp2-fleet-card__img"
                  src="/attached_assets/meeseeks-25-person-boat.webp"
                  alt="The Irony 25-person private charter boat on Lake Travis"
                  loading="lazy"
                />
              </div>
              <div className="hp2-fleet-card__content">
                <h3 className="hp2-fleet-card__title">The Irony</h3>
                <div className="hp2-fleet-card__meta">
                  <span className="hp2-fleet-card__tag">25–30 Guests</span>
                  <span className="hp2-fleet-card__tag">$225–$425/hr</span>
                </div>
                <p className="hp2-fleet-card__desc">
                  Versatile and comfortable — a great option when Meeseeks is booked or when you need two mid-size boats for a large event. Same premium experience, same Lake Travis adventure.
                </p>
                <ul className="hp2-fleet-card__features">
                  <li>Licensed captain &amp; trained crew</li>
                  <li>Premium Bluetooth sound system</li>
                  <li>Large coolers with ice</li>
                  <li>Restroom facilities</li>
                  <li>Swim stop with ladder &amp; life jackets</li>
                  <li>BYOB — bring whatever you want</li>
                  <li>Great for multi-boat events</li>
                </ul>
                <Link href="/book">
                  <a className="hp2-btn hp2-btn--primary" style={{ textAlign: 'center' }}>Book The Irony &rarr;</a>
                </Link>
              </div>
            </div>

            {/* Clever Girl */}
            <div className="hp2-fleet-card">
              <div className="hp2-fleet-card__img-wrap">
                <div className="hp2-fleet-card__badge">Flagship</div>
                <img
                  className="hp2-fleet-card__img"
                  src="/attached_assets/clever-girl-50-person-boat.webp"
                  alt="Clever Girl 50-75 person flagship party boat on Lake Travis"
                  loading="lazy"
                />
              </div>
              <div className="hp2-fleet-card__content">
                <h3 className="hp2-fleet-card__title">Clever Girl</h3>
                <div className="hp2-fleet-card__meta">
                  <span className="hp2-fleet-card__tag">50–75 Guests</span>
                  <span className="hp2-fleet-card__tag">$250–$500/hr</span>
                </div>
                <p className="hp2-fleet-card__desc">
                  Austin's flagship party boat — 14 disco balls, LED lighting, a full dance floor, and a giant Texas flag. The ultimate venue for weddings, corporate events, large birthdays, and any celebration that deserves the best.
                </p>
                <ul className="hp2-fleet-card__features">
                  <li>Licensed captain &amp; trained crew</li>
                  <li>14 disco balls &amp; LED dance floor lighting</li>
                  <li>Premium sound system &amp; dance floor</li>
                  <li>Large coolers with ice</li>
                  <li>Restroom facilities &amp; shaded lounge areas</li>
                  <li>Swim stop with ladder &amp; life jackets</li>
                  <li>BYOB — bring whatever you want</li>
                  <li>Giant Texas flag — iconic photo backdrop</li>
                </ul>
                <Link href="/book">
                  <a className="hp2-btn hp2-btn--primary" style={{ textAlign: 'center' }}>Book Clever Girl &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Three Package Tiers ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Customize Your Cruise</div>
        <h2 className="hp2-section__headline">
          Three package <em>tiers</em>.
        </h2>
        <p className="hp2-section__body">
          Every private charter includes our Standard package. Upgrade to Essentials or Ultimate for a fully elevated experience.
        </p>

        <div className="hp2-packages-grid">
          {/* Standard */}
          <div className="hp2-package-card">
            <div className="hp2-package-card__tier">Tier 1</div>
            <div className="hp2-package-card__name">Standard</div>
            <div className="hp2-package-card__price">Included with every charter</div>
            <ul className="hp2-package-card__features">
              <li>Licensed captain &amp; trained crew</li>
              <li>Premium Bluetooth sound system</li>
              <li>Large coolers (bring your own ice)</li>
              <li>Clean restroom facilities</li>
              <li>Comfortable seating &amp; shaded areas</li>
              <li>Swim stop in a Lake Travis cove</li>
              <li>Swim ladder &amp; life jackets in all sizes</li>
              <li>BYOB — bring whatever you want</li>
            </ul>
          </div>

          {/* Essentials */}
          <div className="hp2-package-card">
            <div className="hp2-package-card__tier">Tier 2</div>
            <div className="hp2-package-card__name">Essentials</div>
            <div className="hp2-package-card__price">+ $100–$200 flat per cruise</div>
            <ul className="hp2-package-card__features">
              <li>Everything in Standard</li>
              <li>Pre-stocked ice in all coolers</li>
              <li>Water dispenser with cups</li>
              <li>6-foot table for food &amp; drinks</li>
              <li>Catering coordination assistance</li>
            </ul>
          </div>

          {/* Ultimate */}
          <div className="hp2-package-card">
            <div className="hp2-package-card__tier">Tier 3</div>
            <div className="hp2-package-card__name">Ultimate</div>
            <div className="hp2-package-card__price">+ $250–$350 flat per cruise</div>
            <ul className="hp2-package-card__features">
              <li>Everything in Essentials</li>
              <li>Giant lily pad float</li>
              <li>Guest of honor float</li>
              <li>Disco ball party cups</li>
              <li>Bubble guns</li>
              <li>Champagne flutes</li>
              <li>SPF-50 sunscreen</li>
              <li>Plates &amp; napkins</li>
              <li>Full party setup &amp; breakdown by crew</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Perfect for Any Event ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Perfect for Any Event</div>
          <h2 className="hp2-section__headline">
            Whatever the occasion, we have a <em>boat</em> for it.
          </h2>

          <div className="hp2-events-grid">
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#127870;</span>
              <div className="hp2-event-card__name">Bachelor / Bachelorette</div>
              <div className="hp2-event-card__sub">The ultimate pre-wedding party</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#128188;</span>
              <div className="hp2-event-card__name">Corporate / Team Building</div>
              <div className="hp2-event-card__sub">Offsites, retreats, client events</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#127874;</span>
              <div className="hp2-event-card__name">Birthdays</div>
              <div className="hp2-event-card__sub">All ages — kids to milestone</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#128141;</span>
              <div className="hp2-event-card__name">Weddings</div>
              <div className="hp2-event-card__sub">Rehearsal, welcome, after-party</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#10084;</span>
              <div className="hp2-event-card__name">Anniversaries</div>
              <div className="hp2-event-card__sub">Romantic sunset cruises</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#127968;</span>
              <div className="hp2-event-card__name">Family Reunions</div>
              <div className="hp2-event-card__sub">Multi-generational fun</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#127891;</span>
              <div className="hp2-event-card__name">Graduations</div>
              <div className="hp2-event-card__sub">Celebrate the accomplishment</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#128141;</span>
              <div className="hp2-event-card__name">Proposals</div>
              <div className="hp2-event-card__sub">Pop the question on the water</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#127876;</span>
              <div className="hp2-event-card__name">Holiday Parties</div>
              <div className="hp2-event-card__sub">Year-round availability</div>
            </div>
            <div className="hp2-event-card">
              <span className="hp2-event-card__icon">&#129309;</span>
              <div className="hp2-event-card__name">Client Entertainment</div>
              <div className="hp2-event-card__sub">Impress on the lake</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Experience (4-step) ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Experience</div>
        <h2 className="hp2-section__headline">
          From booking to <em>unforgettable</em>.
        </h2>

        <div className="hp2-promise-grid">
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">01</div>
            <div className="hp2-promise-card__title">Choose Your Boat</div>
            <div className="hp2-promise-card__desc">We match the perfect vessel to your group size and event type — from 14-guest intimate cruises to 75-guest celebrations.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">02</div>
            <div className="hp2-promise-card__title">Customize Everything</div>
            <div className="hp2-promise-card__desc">Your music, your route, your timing. Choose your package tier, coordinate catering, and design the cruise around your vision.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">03</div>
            <div className="hp2-promise-card__title">We Handle the Rest</div>
            <div className="hp2-promise-card__desc">Licensed captain, trained crew, boat setup, safety equipment, coolers, and all the logistics. You just show up with your crew.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">04</div>
            <div className="hp2-promise-card__title">Cruise &amp; Celebrate</div>
            <div className="hp2-promise-card__desc">Swim in crystal-clear coves, dance on deck, float on lily pads, toast to the occasion, and create memories that last a lifetime.</div>
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">On the Water</div>
          <h2 className="hp2-section__headline">
            See what a private charter <em>looks like</em>.
          </h2>
          <div className="hp2-gallery">
            <img src="/attached_assets/clever-girl-50-person-boat.webp" alt="Clever Girl flagship 50-75 person party boat on Lake Travis" loading="lazy" />
            <img src="/attached_assets/day-tripper-14-person-boat.webp" alt="Day Tripper intimate 14-person charter boat Lake Travis" loading="lazy" />
            <img src="/attached_assets/meeseeks-25-person-boat.webp" alt="Meeseeks 25-person private charter on Lake Travis" loading="lazy" />
            <img src="/attached_assets/dancing-party-scene.webp" alt="Dancing and party scene on private Lake Travis cruise" loading="lazy" />
            <img src="/attached_assets/disco_fun_1765193453547.jpg" alt="Disco party fun on Clever Girl boat Austin" loading="lazy" />
            <img src="/attached_assets/disco_fun5_1765193453548.jpg" alt="Guests celebrating on Lake Travis private charter" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-1_1760080740012.jpg" alt="Private party boat with guests on Lake Travis" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-25_1760080807866.jpg" alt="Sunset private cruise on Lake Travis Austin" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ─── Expandable Details ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Complete Details</div>
        <h2 className="hp2-section__headline">
          Everything about <em>private charters</em>.
        </h2>
        <div className="hp2-details-section">
          <button className="hp2-details-toggle" onClick={() => toggleDetails('pricing')}>
            <span>Transparent Pricing Explained</span>
            <span>{openDetails === 'pricing' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'pricing' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Private charter pricing is straightforward: hourly boat rate multiplied by your cruise duration (4-hour minimum on all boats). Here is the complete breakdown:</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Hourly Rates by Boat:</strong></p>
              <ul>
                <li>Day Tripper (up to 14 guests): $200–$350 per hour</li>
                <li>Meeseeks (25–30 guests): $225–$425 per hour</li>
                <li>The Irony (25–30 guests): $225–$425 per hour</li>
                <li>Clever Girl (50–75 guests): $250–$500 per hour</li>
              </ul>
              <p>Rates vary by day of week, season, and time of day. Weekend and peak-season dates are at the higher end of the range; weekday and off-peak dates are at the lower end.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Additional Costs:</strong></p>
              <ul>
                <li>Crew fee for groups of 26–30 guests: $50–$75</li>
                <li>Crew fee for groups of 51–75 guests: $100–$150</li>
                <li>8.25% Texas sales tax on the charter total</li>
                <li>20% suggested gratuity for captain and crew</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Optional Upgrades:</strong></p>
              <ul>
                <li>Essentials Package: +$100–$200 flat per cruise</li>
                <li>Ultimate Package: +$250–$350 flat per cruise</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Deposit Policy:</strong> A deposit is required at the time of booking to secure your date. The remaining balance is due prior to your cruise. Contact us at (512) 488-5892 for exact pricing for your specific date and boat.</p>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('included')}>
            <span>What's Included in Every Cruise</span>
            <span>{openDetails === 'included' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'included' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Every private charter with Premier Party Cruises includes the following at no additional cost (Standard package):</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Captain &amp; Crew:</strong></p>
              <ul>
                <li>USCG-licensed captain with 15+ years of Lake Travis experience</li>
                <li>Trained crew members for guest service and safety</li>
                <li>Professional, friendly, and attentive staff</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Boat Amenities:</strong></p>
              <ul>
                <li>Premium Bluetooth sound system — play your music from any device</li>
                <li>Large coolers for your drinks (bring your own ice on Standard)</li>
                <li>Clean restroom facilities</li>
                <li>Comfortable seating and shaded lounge areas</li>
                <li>On Clever Girl: 14 disco balls, LED lighting, and a dance floor</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>On-Water Experience:</strong></p>
              <ul>
                <li>Customizable cruise route on Lake Travis</li>
                <li>Swim stop in a scenic crystal-clear cove</li>
                <li>Swim ladder for easy re-boarding</li>
                <li>Life jackets in all sizes (including children's)</li>
                <li>4-hour minimum cruise duration</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>BYOB Policy:</strong></p>
              <ul>
                <li>Bring your own beer, wine, champagne, spirits, mixers, and food</li>
                <li>Cans and plastic containers only (no glass for safety)</li>
                <li>Alcohol delivery available through our partner Party On Delivery</li>
              </ul>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('yearround')}>
            <span>Year-Round Availability</span>
            <span>{openDetails === 'yearround' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'yearround' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Unlike our seasonal ATX Disco Cruise (March–October), private charters are available all 12 months of the year. Lake Travis is stunning in every season:</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Peak Season (March–October):</strong></p>
              <ul>
                <li>Warmest water temperatures — ideal for swimming and floating</li>
                <li>Longest daylight hours for extended sunset cruises</li>
                <li>Highest demand — book 4–8 weeks in advance for weekends</li>
                <li>Best for: bach parties, birthdays, corporate outings, family reunions</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Off-Peak Season (November–February):</strong></p>
              <ul>
                <li>Cooler temperatures with stunning fall and winter scenery</li>
                <li>Fewer boats on the lake — peaceful, private atmosphere</li>
                <li>More flexible scheduling and potentially better availability</li>
                <li>Spectacular sunsets over the Texas Hill Country</li>
                <li>Best for: holiday parties, proposals, anniversaries, corporate client entertainment</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Weather Policy:</strong></p>
              <ul>
                <li>Safety is our top priority — we never depart in unsafe conditions</li>
                <li>Thunderstorms, lightning, or sustained high winds trigger a free reschedule</li>
                <li>Light rain and mild wind typically do not affect departures</li>
                <li>We monitor conditions continuously and communicate proactively</li>
                <li>The vast majority of scheduled cruises depart as planned</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Questions &amp; Answers</div>
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
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="hp2-final-cta">
        <h2 className="hp2-final-cta__headline">
          Ready to book your <em>private cruise</em>?
        </h2>
        <p className="hp2-final-cta__body">
          Tell us about your event and we will match you with the perfect boat, date, and package. Available year-round on Lake Travis.
        </p>
        <div className="hp2-final-cta__actions">
          <Link href="/book">
            <a className="hp2-btn hp2-btn--primary">Get a Quote &rarr;</a>
          </Link>
          <a href="tel:+15124885892" className="hp2-final-cta__phone">(512) 488-5892</a>
        </div>
        <p className="hp2-final-cta__location">
          Anderson Mill Marina &middot; Lake Travis &middot; 25 min from downtown Austin
        </p>
      </section>

      {/* ─── Quick Links (SEO Internal Linking) ─── */}
      <section style={{ background: 'var(--hp2-bg-1)', padding: '3rem 4rem', borderTop: '1px solid var(--hp2-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', justifyContent: 'center' }}>
          <Link href="/atx-disco-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>ATX Disco Cruise</a></Link>
          <Link href="/bachelor-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelor Parties</a></Link>
          <Link href="/bachelorette-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelorette Parties</a></Link>
          <Link href="/corporate-events"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Corporate Events</a></Link>
          <Link href="/wedding-parties"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Wedding Parties</a></Link>
          <Link href="/birthday-parties"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Birthday Parties</a></Link>
          <Link href="/team-building"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Team Building</a></Link>
          <Link href="/family-reunion-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Family Reunions</a></Link>
          <Link href="/proposal-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Proposal Cruises</a></Link>
          <Link href="/anniversary-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Anniversary Cruises</a></Link>
          <Link href="/pricing"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Pricing</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
          <Link href="/faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Full FAQ</a></Link>
          <Link href="/contact"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Contact Us</a></Link>
          <Link href="/blogs"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Blog</a></Link>
          <Link href="/"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Home</a></Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
