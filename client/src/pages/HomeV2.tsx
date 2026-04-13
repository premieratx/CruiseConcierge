import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';

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
    a: 'We are 100% BYOB — bring whatever you want. Beer, wine, spirits, seltzers, mixers, and non-alcoholic beverages are all welcome. Cans and plastic containers only (no glass for safety). We provide large coolers with ice on every cruise. You can also bring your own food, or we coordinate alcohol and food delivery through our partner Party On Delivery so everything is waiting on the boat when you arrive.'
  },
  {
    q: 'Where do the boats depart from?',
    a: 'All cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. It is approximately 25 minutes from downtown Austin — the closest Lake Travis marina to the city. Free parking is available. We recommend arriving 15 minutes before your scheduled departure time.'
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
    a: 'Absolutely. We maintain a perfect safety record spanning 15+ years and 150,000+ guests. All boats are operated by US Coast Guard certified, licensed captains. Life jackets are available in all sizes including children\'s. Many families choose us for birthday parties, family reunions, graduations, and holiday gatherings. Children of all ages are welcome on private charters.'
  },
  {
    q: 'What are the best things to do on Lake Travis?',
    a: 'Lake Travis is Austin\'s premier outdoor destination. Top activities include party boat cruises (our specialty), swimming in coves near Devil\'s Cove, floating on lily pads, paddle boarding, kayaking, and fishing. The surrounding Texas Hill Country offers wineries, hiking at Pace Bend Park, and waterfront dining. Premier Party Cruises departs just 25 minutes from downtown, making it easy to combine a lake day with Austin nightlife on 6th Street or Rainey Street.'
  },
  {
    q: 'How does Premier compare to other Austin boat rentals?',
    a: 'Premier Party Cruises is Austin\'s longest-running party boat company (since 2009) with the highest customer rating (4.9/5 stars, 150,000+ guests). Unlike bare-bones pontoon rentals, we provide licensed captains, trained crew, premium sound, coolers with ice, and the only ATX Disco Cruise on the lake. Our fleet of 4 purpose-built party boats accommodates 14–75 guests. We are the only Lake Travis company with 14 disco balls.'
  },
  {
    q: 'What should I bring on a Lake Travis boat party?',
    a: 'Bring sunscreen (SPF 50+), sunglasses, a hat, swimsuit, towel, and your favorite beverages (BYOB — cans or plastic only, no glass). We provide coolers with ice, premium sound systems, and all safety equipment. Optional: snacks, a waterproof phone case, and celebration items like sashes or banners. We can also coordinate alcohol delivery through Party On Delivery so drinks are waiting on the boat.'
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
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function HomeV2() {
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
          <p className="hp2-hero__eyebrow">Premier Party Cruises &middot; Lake Travis Since 2009</p>
          <h1 className="hp2-hero__headline">
            Austin's most <em>iconic</em> party boat experience
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            Private charters, the ATX Disco Cruise, BYOB party boats with licensed captains — just 25 minutes from downtown Austin.
          </p>
          <div className="hp2-hero__ctas">
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Book Your Cruise &rarr;</a>
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
            <span className="hp2-trust__sub">Austin's most trusted since 2009</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9672;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Perfect Safety</span>
            <span className="hp2-trust__sub">Coast Guard certified captains</span>
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

      {/* ─── The Premier Promise ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Premier Experience</div>
        <h2 className="hp2-section__headline">
          One call. We <em>handle</em> the rest.
        </h2>
        <p className="hp2-section__body">
          From the moment you reach out, our team takes care of every detail. You tell us when, how many, and what kind of vibe you want — we handle the captain, crew, sound system, coolers, ice, and everything else. All you need to do is show up with your drinks and your crew.
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
            <div className="hp2-promise-card__desc">Licensed captain, experienced crew, premium sound system, coolers packed with ice — all handled before you arrive.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">04</div>
            <div className="hp2-promise-card__title">You Just Celebrate</div>
            <div className="hp2-promise-card__desc">BYOB, swim in Lake Travis, cruise the coves, dance on deck — your only job is to have the time of your life.</div>
          </div>
        </div>
      </section>

      {/* ─── Two Experiences ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Choose Your Cruise</div>
          <h2 className="hp2-section__headline">
            Two ways to <em>celebrate</em> on Lake Travis.
          </h2>

          <div className="hp2-experiences">
            <div className="hp2-exp-card">
              <div className="hp2-exp-card__img-wrap">
                <img
                  className="hp2-exp-card__img"
                  src="/attached_assets/atx-disco-cruise-party.webp"
                  alt="ATX Disco Cruise party on Lake Travis"
                  loading="lazy"
                />
              </div>
              <div className="hp2-exp-card__content">
                <h3 className="hp2-exp-card__title">ATX Disco Cruise</h3>
                <div className="hp2-exp-card__meta">
                  <span className="hp2-exp-card__tag">Shared Party</span>
                  <span className="hp2-exp-card__tag">Bach Only</span>
                  <span className="hp2-exp-card__tag">March–Oct</span>
                </div>
                <p className="hp2-exp-card__desc">
                  The ultimate bachelorette and bachelor party experience on Lake Travis. Join other groups on our flagship Clever Girl for a DJ-powered dance party with a professional photographer, 14 disco balls, LED lighting, and an unforgettable swim stop.
                </p>
                <div className="hp2-exp-card__price">From $85 / person</div>
                <Link href="/atx-disco-cruise">
                  <a className="hp2-btn hp2-btn--primary">Learn More &rarr;</a>
                </Link>
              </div>
            </div>

            <div className="hp2-exp-card">
              <div className="hp2-exp-card__img-wrap">
                <img
                  className="hp2-exp-card__img"
                  src="/attached_assets/clever-girl-50-person-boat.webp"
                  alt="Private Charter on Clever Girl boat"
                  loading="lazy"
                />
              </div>
              <div className="hp2-exp-card__content">
                <h3 className="hp2-exp-card__title">Private Charters</h3>
                <div className="hp2-exp-card__meta">
                  <span className="hp2-exp-card__tag">Exclusive</span>
                  <span className="hp2-exp-card__tag">Any Event</span>
                  <span className="hp2-exp-card__tag">Year-Round</span>
                </div>
                <p className="hp2-exp-card__desc">
                  The entire boat is yours. Birthdays, corporate events, proposals, family reunions, or just a day on the lake with friends. Choose from 4 boats accommodating 14 to 75 guests with a dedicated captain and crew.
                </p>
                <div className="hp2-exp-card__price">From $200 / hour &middot; 4 boats</div>
                <Link href="/private-charters">
                  <a className="hp2-btn hp2-btn--primary">Explore Charters &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                src="/attached_assets/clever-girl-50-person-boat.webp"
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
                <p>Premier Party Cruises offers private charter boat rentals on Lake Travis for groups of 14 to 75 guests. Every private charter includes a licensed captain, trained crew, premium Bluetooth sound system, large coolers packed with ice, and a swim stop in a scenic cove. Choose from four boats: Day Tripper (up to 14, from $200/hr), Meeseeks (25-30, from $225/hr), The Irony (25-30, from $225/hr), or Clever Girl (50-75, from $250/hr). All private charters have a 4-hour minimum and are available year-round. BYOB is welcome on every cruise — bring whatever you want in cans or plastic containers.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('disco-cruise')}>
              <span>ATX Disco Cruise — Austin's Signature Party Boat</span>
              <span>{openDetails === 'disco-cruise' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'disco-cruise' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>The ATX Disco Cruise is Austin's most iconic party boat experience, running March through October exclusively for bachelor and bachelorette groups. Multiple groups celebrate together on Clever Girl, our 50-75 person flagship equipped with 14 disco balls, LED lighting, and a dedicated dance floor. Every ticket includes a professional DJ, professional photographer with digital delivery, giant lily pad floats, a swim stop in a crystal-clear Lake Travis cove, private cooler with ice, and mimosa supplies. Tickets start at $85 per person with tax and gratuity included in the total price.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('corporate')}>
              <span>Corporate Events &amp; Team Building</span>
              <span>{openDetails === 'corporate' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'corporate' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Premier Party Cruises is one of Austin's top venues for corporate team building events and company outings on Lake Travis. Many of Austin's leading tech companies, law firms, and agencies choose us for quarterly team outings, client entertainment, company milestones, and employee appreciation events. Our fleet accommodates 14 to 75 guests with professional service, flexible scheduling, and catering coordination. We offer sound system setup for presentations, flexible payment and invoicing options, and year-round availability for corporate groups of any size.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('weddings')}>
              <span>Weddings &amp; Rehearsal Dinners</span>
              <span>{openDetails === 'weddings' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'weddings' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Lake Travis provides a stunning backdrop for wedding-related celebrations, and Premier Party Cruises offers private charters perfect for rehearsal dinners, wedding after-parties, and intimate ceremonies on the water. Our sunset cruises are especially popular for proposals and anniversaries, with golden Texas Hill Country light reflecting off the calm lake. Clever Girl accommodates up to 75 guests for larger wedding events, while Day Tripper is perfect for intimate proposals and small celebrations. Catering coordination and custom decorations are available.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('birthdays')}>
              <span>Birthday Parties on Lake Travis</span>
              <span>{openDetails === 'birthdays' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'birthdays' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Celebrate your birthday on the water with a private party boat charter on Lake Travis. From intimate 14-person gatherings on Day Tripper to large milestone celebrations with 75 guests on Clever Girl, we have a boat for every birthday party. Every charter includes a licensed captain, premium sound system, coolers with ice, and a swim stop in a beautiful cove. BYOB means you can bring your own cake, champagne, and party supplies. Birthday parties are available year-round with morning, afternoon, and sunset time slots to fit your schedule.</p>
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
          Whether it's a bachelorette party, birthday, corporate outing, or just a day on the water with friends — we'll make it unforgettable. Book online or give us a call.
        </p>
        <div className="hp2-final-cta__actions">
          <Link href="/book">
            <a className="hp2-btn hp2-btn--primary">Book Your Cruise &rarr;</a>
          </Link>
          <a href="tel:+15124885892" className="hp2-final-cta__phone">(512) 488-5892</a>
        </div>
        <p className="hp2-final-cta__location">
          Anderson Mill Marina &middot; Lake Travis &middot; 25 min from downtown Austin
        </p>
      </section>

      {/* ─── Footer ─── */}
      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
