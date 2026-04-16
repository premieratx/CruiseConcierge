import { useState, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';

const Footer = lazy(() => import('@/components/Footer'));

// ─── Inline Styles (shared HP2 design system + combined-bach-specific additions) ─
const COMBINED_BACH_STYLES = `
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

/* ─── Pricing Cards (3 cols for time slots) ────────────────────── */
.hp2-pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.hp2-pricing-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.8rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.hp2-pricing-card__badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--hp2-gold);
  color: #07070C;
  font-family: var(--hp2-font-body);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 0.45rem 1rem;
}

.hp2-pricing-card__slot {
  font-family: var(--hp2-font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 0.4rem;
}

.hp2-pricing-card__tagline {
  font-size: 0.9rem;
  color: var(--hp2-gold);
  font-weight: 500;
  margin-bottom: 1.4rem;
}

.hp2-pricing-card__price {
  font-family: var(--hp2-font-display);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--hp2-gold-light);
  margin-bottom: 0.3rem;
}

.hp2-pricing-card__total {
  font-size: 0.82rem;
  color: var(--hp2-text-muted);
  margin-bottom: 2rem;
}

.hp2-pricing-card__includes {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;
}

.hp2-pricing-card__includes li {
  font-size: 0.9rem;
  color: var(--hp2-cream-muted);
  line-height: 1.6;
  padding: 0.35rem 0;
  padding-left: 1.4rem;
  position: relative;
}

.hp2-pricing-card__includes li::before {
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}

/* ─── How It Works Steps ───────────────────────────────────────── */
.hp2-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-top: 4rem;
}

.hp2-step {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.8rem 2rem;
  position: relative;
}

.hp2-step__num {
  font-family: var(--hp2-font-display);
  font-size: 3rem;
  font-weight: 300;
  color: var(--hp2-gold-dim2);
  margin-bottom: 1rem;
  line-height: 1;
}

.hp2-step__title {
  font-family: var(--hp2-font-body);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--hp2-cream);
  margin-bottom: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.hp2-step__desc {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  line-height: 1.6;
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
  .hp2-promise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-pricing-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
  .hp2-steps {
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
  .hp2-promise-grid {
    grid-template-columns: 1fr;
  }
  .hp2-experiences {
    grid-template-columns: 1fr;
  }
  .hp2-pricing-grid {
    grid-template-columns: 1fr;
    max-width: none;
  }
  .hp2-steps {
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

// ─── FAQ Data (AI-optimized: direct answer first, then supporting detail) ─────
const COMBINED_BACH_FAQ_DATA = [
  {
    q: 'What is a combined bachelor and bachelorette party?',
    a: 'A combined bachelor and bachelorette party is when both the bride\'s and groom\'s groups celebrate together instead of separately. It\'s become one of the most popular pre-wedding traditions in Austin. On the ATX Disco Cruise, multiple groups share the same boat, so both sides of the wedding party dance, swim, and celebrate together on Lake Travis. It\'s one party with twice the energy.'
  },
  {
    q: 'Is the ATX Disco Cruise good for combined parties?',
    a: 'The ATX Disco Cruise is the most popular option for combined bachelor and bachelorette parties in Austin. Multiple groups celebrate together on our flagship Clever Girl (50-75 guests) with a professional DJ, 14 disco balls, a photographer, giant floats, and a swim stop in a stunning cove. The shared atmosphere creates incredible energy. Both groups book tickets for the same time slot and celebrate together for 4 hours on Lake Travis. From $85/person with everything included.'
  },
  {
    q: 'How much does a combined bach party cost?',
    a: 'ATX Disco Cruise: $85-$105 per person depending on the time slot (tax and gratuity included in total). Friday 12-4 PM is $95/person, Saturday 11 AM-3 PM is $105/person, and Saturday 3:30-7:30 PM is $85/person. Everything is included: DJ, photographer, floats, cooler with ice, mimosa supplies, and party supplies. For a private combined charter on Clever Girl (50-75 guests), rates start at $250/hour with a 4-hour minimum.'
  },
  {
    q: 'Can both groups book separately for the same cruise?',
    a: 'Yes -- each group can book their own tickets independently. The bachelor group and bachelorette group simply need to choose the same date and time slot when booking. You can also have one person book for the entire combined party if that\'s easier to coordinate. Either way, everyone boards the same boat and celebrates together.'
  },
  {
    q: 'What\'s included in a combined party cruise?',
    a: 'The ATX Disco Cruise includes everything: professional DJ, professional photographer with digital delivery, 14 disco balls and LED lighting, a dedicated dance floor, giant unicorn and lily pad floats, a swim stop in a Lake Travis cove, private cooler with ice per group, mimosa supplies (juice and fruit), ice water stations, cups and koozies, party supplies, swim ladder, life jackets, and an experienced crew with a licensed captain. BYOB -- bring whatever you want (cans and plastic only).'
  },
  {
    q: 'How many people can a combined party accommodate?',
    a: 'The ATX Disco Cruise on Clever Girl accommodates 50-75 guests total, which is perfect for combined parties since multiple groups share the boat. For a private combined charter, choose the boat that fits your total headcount: Day Tripper (up to 14), Meeseeks (25-30), The Irony (25-30), or Clever Girl (50-75). Most combined bach parties have 20-50 people total across both groups.'
  },
  {
    q: 'What if the bachelor group wants to be separate from the bachelorette group?',
    a: 'On the ATX Disco Cruise, both groups are on the same boat but you\'re free to mingle or stay with your own crew. The boat is large enough that groups can have their own space during the swim stop and come together on the dance floor. Many combined groups start separate and merge as the party picks up. If you want completely separate experiences, each group can book different time slots or book separate private charters.'
  },
  {
    q: 'Can we do a private charter for our combined party?',
    a: 'Absolutely. A private charter gives your combined party exclusive use of the entire boat. Clever Girl (50-75 guests) is the most popular choice for large combined groups, starting at $250/hour with a 4-hour minimum. You get your own captain and crew, choose your own music, and set your own schedule. Private charters are available year-round, while the Disco Cruise runs March through October. You can also bring your own DJ or use our sound system with your own playlist.'
  },
  {
    q: 'What should we wear to a combined bach party cruise?',
    a: 'Wear whatever makes you feel like celebrating! Most guests wear swimsuits, coverups, or casual summer clothes. Combined parties often do matching themes -- bride\'s crew in white, groom\'s crew in black, or coordinated colors. Sashes, banners, and themed accessories are popular and encouraged. Bring a change of clothes if you want to be dry for photos. Recommended: reef-safe sunscreen (SPF 50+), sunglasses, hat, flip-flops or boat shoes. Leave valuables at home or use a waterproof phone case.'
  },
  {
    q: 'Where do we meet for the cruise?',
    a: 'All cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. It\'s approximately 25 minutes from downtown Austin -- the closest Lake Travis marina to the city. Free parking is available. We recommend arriving 15 minutes before your scheduled departure time. Rideshare (Uber/Lyft) is also an option. Both groups can arrive together or meet at the marina.'
  },
  {
    q: 'How far in advance should we book a combined party?',
    a: 'We recommend booking 4-6 weeks ahead for weekend dates during peak season (March-October). Saturday morning slots fill up fastest. For large combined parties (30+ people), booking 6-8 weeks out is ideal. However, we sometimes have last-minute availability -- call (512) 488-5892 to check. If you\'re booking a private charter for a combined party, 4-8 weeks ahead is recommended, especially for Clever Girl on weekends.'
  },
  {
    q: 'What makes Premier Party Cruises the best for combined parties?',
    a: 'Premier Party Cruises is Austin\'s longest-running party boat company (since 2009) with the highest rating (4.9/5 stars, 150,000+ guests). The ATX Disco Cruise is purpose-built for bachelor and bachelorette groups, including combined parties. No other Lake Travis company offers 14 disco balls, a professional DJ and photographer, and a dedicated dance floor all included in the ticket price. We\'re 25 minutes from downtown Austin at the closest marina, and we\'re 100% BYOB. Combined parties are one of our most common bookings.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function CombinedBachV2() {
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
      <style dangerouslySetInnerHTML={{ __html: COMBINED_BACH_STYLES }} />
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
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "420", "bestRating": "5" },
            "priceRange": "$85-$500"
          },
          {
            "@type": "Service",
            "name": "Combined Bachelor Bachelorette Party Cruises",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Combined bachelor and bachelorette party boat cruises on Lake Travis. The only multi-group bach cruise in America — bachelor and bachelorette groups celebrate together. $85-$105/person all-inclusive.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "85", "highPrice": "500", "priceCurrency": "USD" }
          },
          {
            "@type": "Event",
            "name": "ATX Disco Cruise - Combined Bach Party",
            "description": "Combined bachelor bachelorette party cruise on Lake Travis. Both groups celebrate together with DJ, photographer, disco balls, and floats.",
            "url": "https://premierpartycruises.com/combined-bachelor-bachelorette-austin",
            "location": { "@type": "Place", "name": "Anderson Mill Marina" },
            "offers": [
              { "@type": "Offer", "name": "Friday Cruise", "price": "95", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Morning", "price": "105", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Sunset", "price": "85", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": COMBINED_BACH_FAQ_DATA.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
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
            poster="/attached_assets/bachelor-party-group-guys-hero-compressed.webp"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">Combined Bach Parties &middot; Lake Travis Since 2009</p>
          <h1 className="hp2-hero__headline">
            The <em>ultimate</em> combined bachelor &amp; bachelorette party
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            Why celebrate apart when you can party together? The ATX Disco Cruise brings bachelor and bachelorette groups together on Lake Travis for the most epic pre-wedding celebration in Austin. From $85/person.
          </p>
          <div className="hp2-hero__ctas">
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Book Combined Party &rarr;</a>
            </Link>
            <a href="#how-it-works" className="hp2-btn hp2-btn--outline">See How It Works</a>
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
            <span className="hp2-trust__sub">Austin's most trusted</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9672;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Both Groups Together</span>
            <span className="hp2-trust__sub">One boat, one party</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9678;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">4.9 Stars</span>
            <span className="hp2-trust__sub">Hundreds of reviews</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9733;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">From $85/person</span>
            <span className="hp2-trust__sub">Everything included</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9671;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">DJ + Photographer</span>
            <span className="hp2-trust__sub">Included in every cruise</span>
          </div>
        </div>
      </div>

      {/* ─── Why Combine? ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Celebrate Together</div>
        <h2 className="hp2-section__headline">
          One party. <em>Twice</em> the fun.
        </h2>

        <div className="hp2-promise-grid">
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">01</div>
            <div className="hp2-promise-card__title">Everyone Celebrates Together</div>
            <div className="hp2-promise-card__desc">No more splitting the wedding party. Bachelor and bachelorette groups share the dance floor, the floats, and the memories.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">02</div>
            <div className="hp2-promise-card__title">Way More Energy</div>
            <div className="hp2-promise-card__desc">Multiple groups on the ATX Disco Cruise create an electric atmosphere. DJ, dance floor, 14 disco balls &mdash; the energy is unmatched.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">03</div>
            <div className="hp2-promise-card__title">Easier to Plan</div>
            <div className="hp2-promise-card__desc">One booking, one location, one weekend activity. The maid of honor and best man coordinate once instead of separately.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">04</div>
            <div className="hp2-promise-card__title">Save Money Together</div>
            <div className="hp2-promise-card__desc">Split the cost across both groups. At $85&ndash;$105/person, the Disco Cruise is more affordable than separate private charters.</div>
          </div>
        </div>
      </section>

      {/* ─── Two Options ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Choose Your Experience</div>
          <h2 className="hp2-section__headline">
            Two ways to <em>combine</em> your crews.
          </h2>

          <div className="hp2-experiences">
            {/* ATX Disco Cruise */}
            <div className="hp2-exp-card">
              <div className="hp2-exp-card__img-wrap">
                <img
                  className="hp2-exp-card__img"
                  src="/attached_assets/atx-disco-cruise-party.webp"
                  alt="ATX Disco Cruise combined bachelor bachelorette party on Lake Travis"
                  loading="lazy"
                />
              </div>
              <div className="hp2-exp-card__content">
                <h3 className="hp2-exp-card__title">ATX Disco Cruise</h3>
                <div className="hp2-exp-card__meta">
                  <span className="hp2-exp-card__tag">Most Popular</span>
                  <span className="hp2-exp-card__tag">Both Groups Welcome</span>
                  <span className="hp2-exp-card__tag">March&ndash;Oct</span>
                </div>
                <p className="hp2-exp-card__desc">
                  The most popular option for combined bach parties. Multiple bachelor and bachelorette groups share our flagship Clever Girl for 4 hours of DJ, dancing, swimming, and celebrating on Lake Travis. Professional photographer included. Both groups book tickets for the same time slot and the party takes care of itself.
                </p>
                <div className="hp2-exp-card__price">From $85/person</div>
                <Link href="/book">
                  <a className="hp2-btn hp2-btn--primary">Book Disco Cruise &rarr;</a>
                </Link>
              </div>
            </div>

            {/* Private Combined Charter */}
            <div className="hp2-exp-card">
              <div className="hp2-exp-card__img-wrap">
                <img
                  className="hp2-exp-card__img"
                  src="/attached_assets/clever-girl-50-person-boat.webp"
                  alt="Clever Girl private charter for combined bachelor bachelorette party"
                  loading="lazy"
                />
              </div>
              <div className="hp2-exp-card__content">
                <h3 className="hp2-exp-card__title">Private Combined Charter</h3>
                <div className="hp2-exp-card__meta">
                  <span className="hp2-exp-card__tag">Exclusive</span>
                  <span className="hp2-exp-card__tag">Your Own Boat</span>
                  <span className="hp2-exp-card__tag">Year-Round</span>
                </div>
                <p className="hp2-exp-card__desc">
                  Charter Clever Girl exclusively for your entire wedding party. 50&ndash;75 guests, your own captain and crew, your own music, your own schedule. Perfect for large combined groups who want a private celebration with full control over the experience. Available year-round with a 4-hour minimum.
                </p>
                <div className="hp2-exp-card__price">From $250/hour (Clever Girl, 50&ndash;75 guests)</div>
                <Link href="/book">
                  <a className="hp2-btn hp2-btn--outline">Inquire About Charter &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Time Slots & Pricing ─── */}
      <section className="hp2-section" id="timeslots">
        <div className="hp2-section__label">Time Slots &amp; Pricing</div>
        <h2 className="hp2-section__headline">
          Three options. One <em>incredible</em> cruise.
        </h2>

        <div className="hp2-pricing-grid">
          {/* Friday */}
          <div className="hp2-pricing-card">
            <div className="hp2-pricing-card__slot">Friday 12&ndash;4 PM</div>
            <div className="hp2-pricing-card__tagline">Kickstart your weekend</div>
            <div className="hp2-pricing-card__price">$95/person</div>
            <div className="hp2-pricing-card__total">$124.88 with tax + gratuity</div>
            <ul className="hp2-pricing-card__includes">
              <li>Private cooler with ice</li>
              <li>Professional DJ</li>
              <li>Professional photographer</li>
              <li>Giant floats &amp; lily pads</li>
              <li>Party supplies &amp; mixers</li>
              <li>BYOB friendly</li>
            </ul>
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</a>
            </Link>
          </div>

          {/* Saturday AM */}
          <div className="hp2-pricing-card">
            <div className="hp2-pricing-card__badge">Most Popular</div>
            <div className="hp2-pricing-card__slot">Saturday 11 AM&ndash;3 PM</div>
            <div className="hp2-pricing-card__tagline">Peak energy, peak vibes</div>
            <div className="hp2-pricing-card__price">$105/person</div>
            <div className="hp2-pricing-card__total">$137.81 with tax + gratuity</div>
            <ul className="hp2-pricing-card__includes">
              <li>Private cooler with ice</li>
              <li>Professional DJ</li>
              <li>Professional photographer</li>
              <li>Giant floats &amp; lily pads</li>
              <li>Party supplies &amp; mixers</li>
              <li>BYOB friendly</li>
            </ul>
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</a>
            </Link>
          </div>

          {/* Saturday PM */}
          <div className="hp2-pricing-card">
            <div className="hp2-pricing-card__badge">Best Value</div>
            <div className="hp2-pricing-card__slot">Saturday 3:30&ndash;7:30 PM</div>
            <div className="hp2-pricing-card__tagline">Catch the sunset</div>
            <div className="hp2-pricing-card__price">$85/person</div>
            <div className="hp2-pricing-card__total">$111.56 with tax + gratuity</div>
            <ul className="hp2-pricing-card__includes">
              <li>Private cooler with ice</li>
              <li>Professional DJ</li>
              <li>Professional photographer</li>
              <li>Giant floats &amp; lily pads</li>
              <li>Party supplies &amp; mixers</li>
              <li>BYOB friendly</li>
            </ul>
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</a>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="hp2-section--alt" id="how-it-works">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">The Process</div>
          <h2 className="hp2-section__headline">
            Simple from start to <em>celebration</em>.
          </h2>

          <div className="hp2-steps">
            <div className="hp2-step">
              <div className="hp2-step__num">01</div>
              <div className="hp2-step__title">Coordinate Both Groups</div>
              <div className="hp2-step__desc">Best man and maid of honor pick a date and time slot. Friday 12&ndash;4 PM, Saturday 11 AM&ndash;3 PM, or Saturday 3:30&ndash;7:30 PM. Share the link with both groups.</div>
            </div>
            <div className="hp2-step">
              <div className="hp2-step__num">02</div>
              <div className="hp2-step__title">Book Together or Separately</div>
              <div className="hp2-step__desc">Each group can book their own tickets independently, or one person can book for everyone. Just make sure both groups select the same date and time slot.</div>
            </div>
            <div className="hp2-step">
              <div className="hp2-step__num">03</div>
              <div className="hp2-step__title">Meet at the Marina</div>
              <div className="hp2-step__desc">Both groups arrive at Anderson Mill Marina (25 min from downtown Austin), board together, and the party begins. DJ, photographer, floats &mdash; everything is ready.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Private Charter Alternative ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Private Charters</div>
        <h2 className="hp2-section__headline">
          Want the boat all to <em>yourselves</em>?
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#C8B898', maxWidth: '700px', lineHeight: 1.7, marginBottom: '2rem' }}>
          Private charters give your combined bachelor and bachelorette party exclusive use of the entire boat — your music, your route, your vibe. Available year-round for any group size.
        </p>
        <div className="hp2-private-pricing__grid">
          <div className="hp2-private-pricing__card">
            <div className="hp2-private-pricing__name">Day Tripper</div>
            <div className="hp2-private-pricing__capacity">Up to 14 guests</div>
            <div className="hp2-private-pricing__rate">$200–$350/hr</div>
            <div className="hp2-private-pricing__note">4-hour minimum · Year-round</div>
            <ul className="hp2-private-pricing__features">
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice</li>
              <li>BYOB friendly</li>
              <li>Swim stop included</li>
            </ul>
          </div>
          <div className="hp2-private-pricing__card">
            <div className="hp2-private-pricing__name">Meeseeks / The Irony</div>
            <div className="hp2-private-pricing__capacity">25–30 guests</div>
            <div className="hp2-private-pricing__rate">$225–$425/hr</div>
            <div className="hp2-private-pricing__note">4-hour minimum · Year-round</div>
            <ul className="hp2-private-pricing__features">
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice</li>
              <li>BYOB friendly</li>
              <li>Perfect for combined parties</li>
            </ul>
          </div>
          <div className="hp2-private-pricing__card">
            <div className="hp2-private-pricing__name">Clever Girl</div>
            <div className="hp2-private-pricing__capacity">50–75 guests</div>
            <div className="hp2-private-pricing__rate">$250–$500/hr</div>
            <div className="hp2-private-pricing__note">4-hour minimum · 14 disco balls</div>
            <ul className="hp2-private-pricing__features">
              <li>Licensed captain &amp; crew</li>
              <li>14 disco balls + LED lighting</li>
              <li>Dance floor</li>
              <li>BYOB friendly</li>
              <li>Austin's flagship party boat</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Real Combined Parties</div>
          <h2 className="hp2-section__headline">
            See what your party looks <em>like</em>.
          </h2>
          <div className="hp2-gallery">
            <img src="/attached_assets/disco_fun_1765193453547.jpg" alt="Combined bach party dancing on ATX Disco Cruise" loading="lazy" />
            <img src="/attached_assets/disco_fun2_1765193453547.jpg" alt="Bachelor bachelorette group celebrating on Lake Travis" loading="lazy" />
            <img src="/attached_assets/disco_fun5_1765193453548.jpg" alt="Dance floor party on Clever Girl boat Austin" loading="lazy" />
            <img src="/attached_assets/disco_fun6_1765193453548.jpg" alt="Disco ball party boat Lake Travis combined bach" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-1_1760080740012.jpg" alt="Austin party boat with DJ combined celebration" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-5_1760080740018.jpg" alt="Group photo on Lake Travis party cruise" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-21_1760080807864.jpg" alt="Swimming at combined party boat Lake Travis" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-25_1760080807866.jpg" alt="Sunset combined bach cruise on Lake Travis Austin" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ─── Expandable Combined Bach Details ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Complete Details</div>
        <h2 className="hp2-section__headline">
          Everything about your <em>combined</em> celebration.
        </h2>
        <div className="hp2-details-section">
          <button className="hp2-details-toggle" onClick={() => toggleDetails('disco')}>
            <span>ATX Disco Cruise — Complete Details</span>
            <span>{openDetails === 'disco' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'disco' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>The ATX Disco Cruise is a 4-hour shared party boat experience on Lake Travis, running March through October exclusively for bachelor and bachelorette groups. Both groups book tickets for the same time slot and celebrate together on Clever Girl, our 50-75 person flagship vessel.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Every ticket includes:</strong></p>
              <ul>
                <li>Professional DJ playing for the full 4 hours</li>
                <li>Professional photographer with digital delivery in 2-3 weeks</li>
                <li>14 disco balls and LED dance floor lighting</li>
                <li>Dedicated dance floor on the water</li>
                <li>Swim stop in a crystal-clear Lake Travis cove</li>
                <li>Giant lily pad floats and unicorn floats</li>
                <li>Private cooler with ice per group</li>
                <li>Mimosa supplies (juice and fruit)</li>
                <li>Party cups, koozies, and supplies</li>
                <li>USCG-certified captain and experienced crew</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Time slots:</strong> Friday 12-4 PM ($95/person), Saturday 11 AM-3 PM ($105/person), Saturday 3:30-7:30 PM ($85/person). Tax and gratuity included in total.</p>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('private')}>
            <span>Private Charter — Package Options</span>
            <span>{openDetails === 'private' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'private' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Private charters give your combined party exclusive use of an entire boat. Clever Girl (50-75 guests) is the most popular choice for large combined groups. Available year-round with a 4-hour minimum.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Standard Package (included):</strong></p>
              <ul>
                <li>Licensed captain and trained crew</li>
                <li>Premium Bluetooth sound system</li>
                <li>Large coolers packed with ice</li>
                <li>Swim stop in a scenic Lake Travis cove</li>
                <li>BYOB — bring whatever you want</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Essentials Upgrade ($100–$200 flat):</strong> Enhanced party setup, mimosa supplies, towel service, and SPF-50 sunscreen station.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Ultimate Package ($250–$350 flat):</strong> Everything in Essentials plus premium decorations, custom accessories, priority boarding, and a dedicated event coordinator.</p>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('checklist')}>
            <span>What to Bring — Complete Checklist</span>
            <span>{openDetails === 'checklist' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'checklist' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Here is the complete packing list for your combined bach party on Lake Travis. We provide coolers with ice, sound systems, and all safety equipment.</p>
              <ul>
                <li>Sunscreen (SPF 50+ recommended)</li>
                <li>Swimsuit and coverup</li>
                <li>Towel</li>
                <li>Sunglasses and a hat</li>
                <li>Flat shoes or sandals (no heels)</li>
                <li>Waterproof phone case</li>
                <li>BYOB drinks in cans or plastic (no glass)</li>
                <li>Snacks and finger foods if desired</li>
                <li>Matching outfits, sashes, and party accessories</li>
                <li>Change of clothes for going out afterward</li>
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
            {COMBINED_BACH_FAQ_DATA.map((item, index) => (
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
          Ready to bring both crews <em>together</em>?
        </h2>
        <p className="hp2-final-cta__body">
          The ATX Disco Cruise is the easiest way to combine your bachelor and bachelorette parties. DJ, photographer, dance floor, giant floats, and 4 hours on Lake Travis &mdash; all included. Coordinate with both groups and book your spot.
        </p>
        <div className="hp2-final-cta__actions">
          <Link href="/book">
            <a className="hp2-btn hp2-btn--primary">Book Combined Party &rarr;</a>
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
          <Link href="/atx-disco-cruise"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>ATX Disco Cruise</a></Link>
          <Link href="/bachelor-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelor Parties</a></Link>
          <Link href="/bachelorette-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelorette Parties</a></Link>
          <Link href="/private-cruises"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Private Charters</a></Link>
          <Link href="/blogs/joint-bachelor-bachelorette-party-guide"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Joint Bach Party Guide</a></Link>
          <Link href="/blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Joint Parties</a></Link>
          <Link href="/blogs/why-combined-bachelor-bachelorette-parties-love-the-atx-disco-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Why Combined Bach Parties Love Disco</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
          <Link href="/faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Full FAQ</a></Link>
          <Link href="/contact"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Contact Us</a></Link>
          <Link href="/blogs"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Blog</a></Link>
          <Link href="/"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Home</a></Link>
          <Link href="/pricing"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Pricing</a></Link>
          <Link href="/wedding-parties"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Wedding Parties</a></Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
