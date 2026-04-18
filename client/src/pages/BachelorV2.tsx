import { useState, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import { useQuoteLightbox } from '@/components/QuoteLightbox';

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

/* ─── Time Slot Cards ────────────────────────────────────────── */
.hp2-slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.hp2-slot-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.8rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.hp2-slot-card__badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--hp2-gold);
  color: #07070C;
  font-family: var(--hp2-font-body);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0.5rem 1rem;
}

.hp2-slot-card__day {
  font-family: var(--hp2-font-body);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--hp2-gold);
  margin-bottom: 0.5rem;
}

.hp2-slot-card__time {
  font-family: var(--hp2-font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 0.5rem;
}

.hp2-slot-card__tagline {
  font-size: 0.92rem;
  color: var(--hp2-cream-muted);
  margin-bottom: 1.5rem;
  font-style: italic;
}

.hp2-slot-card__price {
  font-family: var(--hp2-font-display);
  font-size: 2.2rem;
  font-weight: 300;
  color: var(--hp2-gold-light);
  margin-bottom: 0.3rem;
}

.hp2-slot-card__price-note {
  font-size: 0.82rem;
  color: var(--hp2-text-muted);
  margin-bottom: 1.8rem;
}

.hp2-slot-card__includes {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;
}

.hp2-slot-card__includes li {
  font-size: 0.9rem;
  color: var(--hp2-text-muted);
  line-height: 1.6;
  padding: 0.35rem 0;
  padding-left: 1.2rem;
  position: relative;
}

.hp2-slot-card__includes li::before {
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}

/* ─── Planning Tips ──────────────────────────────────────────── */
.hp2-tips__body {
  font-size: 1.05rem;
  color: var(--hp2-cream-muted);
  line-height: 1.85;
  max-width: 720px;
  margin-bottom: 2rem;
}

.hp2-tips__timeline {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.hp2-tips__timeline-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2rem 1.8rem;
}

.hp2-tips__timeline-label {
  font-family: var(--hp2-font-body);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--hp2-gold);
  margin-bottom: 0.6rem;
}

.hp2-tips__timeline-text {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  line-height: 1.65;
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
  .hp2-slots-grid {
    grid-template-columns: 1fr;
  }
  .hp2-tips__timeline {
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
  .hp2-slots-grid {
    grid-template-columns: 1fr;
  }
  .hp2-tips__timeline {
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
    q: 'What is the best bachelor party activity in Austin?',
    a: 'The ATX Disco Cruise with Premier Party Cruises is consistently rated the #1 bachelor party activity in Austin. It combines a professional DJ, professional photographer, dance floor, 14 disco balls, crystal-clear Lake Travis swimming, giant lily pad floats, and a full BYOB party atmosphere — all from $85 per person with tax and gratuity included. Over 150,000 guests and a 4.9-star rating make it the most popular and most-reviewed boat experience in the Austin area. Available March through October on Saturdays and Fridays.'
  },
  {
    q: 'How much does a bachelor boat party cost?',
    a: 'The ATX Disco Cruise ranges from $85 to $105 per person depending on the time slot, with tax and gratuity already included. Saturday 3:30-7:30 PM is $85/person ($111.56 total), Friday 12-4 PM is $95/person ($124.88 total), and Saturday 11 AM-3 PM is $105/person ($137.81 total). Every time slot includes a professional DJ, professional photographer with digital delivery, giant floats, private cooler with ice, and 4 hours on Lake Travis. Private charters start at $200/hour with a 4-hour minimum for groups wanting exclusive use of a boat.'
  },
  {
    q: 'What is the ATX Disco Cruise?',
    a: 'The ATX Disco Cruise is Premier Party Cruises\' signature shared party boat experience exclusively for bachelor and bachelorette groups. It takes place on Clever Girl, our 50-75 person flagship boat equipped with 14 disco balls, LED lighting, a professional sound system, and a full dance floor. Each cruise is 4 hours on Lake Travis and includes a professional DJ, professional photographer with digital delivery, a swim stop in a crystal-clear cove, giant lily pad floats, private cooler with ice, and party supplies. It runs March through October with three time slots available.'
  },
  {
    q: "What's included in a bachelor boat party?",
    a: 'Every ATX Disco Cruise includes: a professional DJ playing your favorite music, a professional photographer with digital photo delivery within 2-3 weeks, 14 disco balls and LED dance floor lighting, a swim stop in a crystal-clear Lake Travis cove, giant 6x20-foot lily pad floats, a private cooler stocked with ice for your group, party cups and koozies, ice water stations, clean restroom facilities, shaded lounge areas, and a USCG-certified captain and crew. Private charters include a dedicated captain, crew, premium sound system, large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), and complete control over your route and schedule.'
  },
  {
    q: "Is it BYOB? Can we bring our own alcohol?",
    a: 'Yes — Premier Party Cruises is 100% BYOB. Bring whatever you want: beer, seltzers, spirits, mixers, wine, and non-alcoholic beverages. Cans and plastic containers only (no glass for safety). We provide large coolers (bring your own ice, or order pre-iced from Party On Delivery) on every cruise. You can also coordinate alcohol and food delivery through our partner Party On Delivery so everything is waiting on the boat when you arrive. Many bachelor groups bring beer, seltzers, spirits, mixers, and snacks for the ultimate guys\' day out.'
  },
  {
    q: 'What should we wear on the boat?',
    a: 'Most bachelor groups wear swim trunks, a tank top or t-shirt, and sandals or boat shoes. Bring a change of clothes if you are heading out in Austin afterward. Flat shoes or sandals are recommended — no hard-soled shoes on the boat for safety. Matching groomsmen shirts, custom tanks, and bachelor party gear are all welcome and encouraged. Don\'t forget sunscreen (SPF 50+), sunglasses, and a hat. We recommend a waterproof phone case for the swim stop. The boat has shaded areas, but the Texas sun is strong, especially mid-day.'
  },
  {
    q: 'Where do we meet and how do we get there?',
    a: 'All cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. It is approximately 25 minutes from downtown Austin — the closest Lake Travis marina to the city. Free parking is available at the marina. We recommend arriving 15 minutes before your scheduled departure time. For transportation, many groups use rideshare (Uber/Lyft), rent a party bus, or designate a driver. We can provide transportation recommendations for groups coming from downtown Austin hotels.'
  },
  {
    q: 'Can we swim during the cruise?',
    a: 'Absolutely — swimming is one of the highlights of every cruise! The captain anchors in a scenic Lake Travis cove with crystal-clear water surrounded by limestone cliffs. Guests can swim, float on our giant 6x20-foot lily pad floats, jump off the boat, and enjoy the natural springs that feed Lake Travis. We provide a swim ladder for easy re-boarding and life jackets in all sizes. The typical swim stop lasts 1.5-2 hours during a 4-hour cruise. Water temperatures are perfect for swimming from April through October.'
  },
  {
    q: 'What if it rains on our bachelor party weekend?',
    a: 'Safety is our top priority. If conditions are unsafe (thunderstorms, high winds), we contact you to reschedule at no additional cost. Light rain does not typically affect departures — our boats have covered and shaded areas. For the ATX Disco Cruise specifically, severe weather triggers a move to our Lemonade Disco land venue so your party still happens. We monitor weather conditions continuously and communicate proactively so you always know what to expect. Texas weather can change quickly, but most scheduled cruises depart as planned.'
  },
  {
    q: 'How far in advance should we book?',
    a: 'We recommend booking 4-8 weeks in advance for weekend dates during peak season (March through October). Some popular Saturday dates book 6-8 weeks ahead, especially during prime bachelor party season in spring and early fall. Friday time slots typically have more availability. However, we sometimes have last-minute openings — call (512) 488-5892 to check same-week availability. For private charters during peak season, booking 6-8 weeks out is recommended. Weekday dates generally have more flexibility.'
  },
  {
    q: 'Can we combine with the bachelorette group?',
    a: 'Yes! Combined bachelor-bachelorette parties are one of our most popular bookings. On the ATX Disco Cruise, both groups can book the same time slot and party together on Clever Girl — it is a great way to kick off the wedding weekend with everyone together. For a more exclusive experience, book a private charter where the entire boat is yours. Many couples book the Saturday 11 AM-3 PM slot for the combined group, then split up for separate nightlife plans in Austin afterward. Visit our combined bachelor-bachelorette page for more details.'
  },
  {
    q: 'Disco cruise vs private charter for bachelors?',
    a: 'It depends on your group\'s vibe and budget. The ATX Disco Cruise ($85-$105/person) is perfect if you want a high-energy party atmosphere with a professional DJ, photographer, and other bachelor groups to celebrate with — it\'s our most popular bachelor option. A private charter (from $200/hour, 4-hour minimum) is better if you want complete privacy, control over the music and route, or have a larger group (up to 75 guests). Private charters are also available year-round, while the Disco Cruise runs March through October. Many groups choose the Disco Cruise for the included DJ and photographer alone — hiring those separately would cost more than the entire cruise.'
  },
  {
    q: 'What add-ons are available?',
    a: 'Popular bachelor party add-ons include: alcohol and food delivery through Party On Delivery (everything waiting on the boat when you arrive), towel service, SPF-50 spray sunscreen stations, custom party decorations, and our Essentials or Ultimate upgrade packages. The Essentials package adds $100-$200 flat per cruise, and the Ultimate package adds $250-$350 flat per cruise. Many groups also bring their own coolers of food, custom koozies, matching shirts, and bachelor party accessories. You can also coordinate pizza, tacos, or catering delivery right to the boat.'
  },
  {
    q: "What's the best time slot for bachelor parties?",
    a: 'The Saturday 11 AM-3 PM slot ($105/person) is the most popular for bachelor parties — peak energy, the best party atmosphere, and premium boat positioning. The Saturday 3:30-7:30 PM slot ($85/person) is the best value and includes a sunset cruise over Lake Travis, which is incredible. The Friday 12-4 PM slot ($95/person) is great for groups arriving Thursday night who want to kick off the weekend early with more availability. All three slots include the same professional DJ, photographer, floats, and full 4-hour experience. Choose based on your weekend schedule and group vibe.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function BachelorV2() {
  
  const { openQuote } = useQuoteLightbox();
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
            "priceRange": "$85-$500"
          },
          {
            "@type": "Service",
            "name": "Austin Bachelor Party Boat Cruises",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Austin's #1 bachelor party boat experience on Lake Travis. ATX Disco Cruise from $85/person all-inclusive. Private charters from $200/hour for exclusive bachelor celebrations.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "85", "highPrice": "500", "priceCurrency": "USD" }
          },
          {
            "@type": "Event",
            "name": "ATX Disco Cruise - Bachelor Party",
            "description": "Austin's only all-inclusive bachelor party cruise on Lake Travis. 4 hours with DJ, photographer, 14 disco balls, giant floats.",
            "url": "https://premierpartycruises.com/bachelor-party-austin",
            "location": { "@type": "Place", "name": "Anderson Mill Marina", "address": { "@type": "PostalAddress", "streetAddress": "13993 FM 2769", "addressLocality": "Leander", "addressRegion": "TX", "postalCode": "78641" } },
            "offers": [
              { "@type": "Offer", "name": "Friday Cruise", "price": "95", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Morning", "price": "105", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Sunset", "price": "85", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": FAQ_DATA.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          },
          {
            "@type": "VideoObject",
            "name": "ATX Disco Cruise Bachelor Party Boat Tour",
            "description": "Virtual tour of the Clever Girl, Premier Party Cruises' flagship bachelor party boat on Lake Travis Austin Texas",
            "thumbnailUrl": "https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp",
            "contentUrl": "https://premierpartycruises.com/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4",
            "uploadDate": "2025-01-01",
            "duration": "PT2M30S"
          }
        ]
      }) }} />

      {/* ─── Hero ─── */}
      <section className="hp2-hero">
        <div className="hp2-hero__video-wrap">
          <img
            className="hp2-hero__video"
            src="/attached_assets/bachelor-party-group-guys-hero-compressed.webp"
            alt="Bachelor party group on Lake Travis party boat"
          />
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">Bachelor Parties &middot; Lake Travis Since 2009</p>
          <h1 className="hp2-hero__headline">
            Austin's <em>ultimate</em> bachelor party on the water
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            DJ. Photographer. Dance floor. Crystal-clear swimming. Giant floats. The ATX Disco Cruise is the #1 bachelor activity in Austin — from $85/person with everything included. Or go exclusive with a private charter.
          </p>
          <div className="hp2-hero__ctas">
            <Link href="/atx-disco-cruise">
              <a className="hp2-btn hp2-btn--primary">Book ATX Disco Cruise &rarr;</a>
            </Link>
            <Link href="/private-cruises">
              <a className="hp2-btn hp2-btn--outline">Explore Private Charters</a>
            </Link>
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
            <span className="hp2-trust__label">Everything Included</span>
            <span className="hp2-trust__sub">DJ, photographer, floats</span>
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
            <span className="hp2-trust__label">From $85/person</span>
            <span className="hp2-trust__sub">Tax &amp; gratuity included</span>
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

      {/* ─── Two Ways to Celebrate ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Choose Your Experience</div>
          <h2 className="hp2-section__headline">
            Two ways to send him off in <em>style</em>.
          </h2>

          <div className="hp2-experiences">
            <div className="hp2-exp-card">
              <div className="hp2-exp-card__img-wrap">
                <img
                  className="hp2-exp-card__img"
                  src="/attached_assets/atx-disco-cruise-party.webp"
                  alt="ATX Disco Cruise bachelor party on Lake Travis"
                  loading="lazy"
                />
              </div>
              <div className="hp2-exp-card__content">
                <h3 className="hp2-exp-card__title">ATX Disco Cruise</h3>
                <div className="hp2-exp-card__meta">
                  <span className="hp2-exp-card__tag">Shared Party</span>
                  <span className="hp2-exp-card__tag">DJ + Photographer</span>
                  <span className="hp2-exp-card__tag">March–Oct</span>
                </div>
                <p className="hp2-exp-card__desc">
                  Join other bachelor groups on Clever Girl for the ultimate high-energy lake party. Professional DJ, 14 disco balls, dance floor, giant floats, professional photographer with digital delivery. 4 hours on Lake Travis.
                </p>
                <div className="hp2-exp-card__price">From $85 / person</div>
                <Link href="/atx-disco-cruise">
                  <a className="hp2-btn hp2-btn--primary">View Time Slots &rarr;</a>
                </Link>
              </div>
            </div>

            <div className="hp2-exp-card">
              <div className="hp2-exp-card__img-wrap">
                <img
                  className="hp2-exp-card__img"
                  src="/attached_assets/clever-girl-50-person-boat.webp"
                  alt="Private bachelor charter on Clever Girl"
                  loading="lazy"
                />
              </div>
              <div className="hp2-exp-card__content">
                <h3 className="hp2-exp-card__title">Private Bachelor Charter</h3>
                <div className="hp2-exp-card__meta">
                  <span className="hp2-exp-card__tag">Exclusive</span>
                  <span className="hp2-exp-card__tag">Your Boat, Your Rules</span>
                  <span className="hp2-exp-card__tag">Year-Round</span>
                </div>
                <p className="hp2-exp-card__desc">
                  The entire boat exclusively for your crew. Choose from 4 boats (14–75 guests), customize your music, route, and vibe. Perfect for groups who want privacy and complete control.
                </p>
                <div className="hp2-exp-card__price">From $200 / hour</div>
                <Link href="/private-cruises">
                  <a className="hp2-btn hp2-btn--primary">Get a Quote &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Disco Cruise Time Slots ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">ATX Disco Cruise Pricing</div>
        <h2 className="hp2-section__headline">
          Three time slots. One <em>epic</em> bachelor party.
        </h2>

        <div className="hp2-slots-grid">
          {/* Friday 12-4 PM */}
          <div className="hp2-slot-card">
            <div className="hp2-slot-card__day">Friday</div>
            <div className="hp2-slot-card__time">12:00 – 4:00 PM</div>
            <div className="hp2-slot-card__tagline">Kickstart the weekend</div>
            <div className="hp2-slot-card__price">$95 / person</div>
            <div className="hp2-slot-card__price-note">$124.88 total w/ tax &amp; gratuity</div>
            <ul className="hp2-slot-card__includes">
              <li>Professional DJ for 4 hours</li>
              <li>Professional photographer + digital delivery</li>
              <li>Private cooler with ice</li>
              <li>Giant lily pad floats</li>
              <li>Crystal-clear swim stop</li>
              <li>Party cups &amp; koozies</li>
              <li>BYOB — bring your own drinks</li>
            </ul>
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary" style={{ textAlign: 'center' }}>Book Friday &rarr;</a>
            </Link>
          </div>

          {/* Saturday 11 AM-3 PM */}
          <div className="hp2-slot-card">
            <div className="hp2-slot-card__badge">Most Popular</div>
            <div className="hp2-slot-card__day">Saturday</div>
            <div className="hp2-slot-card__time">11:00 AM – 3:00 PM</div>
            <div className="hp2-slot-card__tagline">Peak energy, peak vibes</div>
            <div className="hp2-slot-card__price">$105 / person</div>
            <div className="hp2-slot-card__price-note">$137.81 total w/ tax &amp; gratuity</div>
            <ul className="hp2-slot-card__includes">
              <li>Professional DJ for 4 hours</li>
              <li>Professional photographer + digital delivery</li>
              <li>Private cooler with ice</li>
              <li>Giant lily pad floats</li>
              <li>Crystal-clear swim stop</li>
              <li>Party cups &amp; koozies</li>
              <li>BYOB — bring your own drinks</li>
              <li>Premium boat positioning</li>
            </ul>
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary" style={{ textAlign: 'center' }}>Book Saturday AM &rarr;</a>
            </Link>
          </div>

          {/* Saturday 3:30-7:30 PM */}
          <div className="hp2-slot-card">
            <div className="hp2-slot-card__badge">Best Value</div>
            <div className="hp2-slot-card__day">Saturday</div>
            <div className="hp2-slot-card__time">3:30 – 7:30 PM</div>
            <div className="hp2-slot-card__tagline">Sunset magic</div>
            <div className="hp2-slot-card__price">$85 / person</div>
            <div className="hp2-slot-card__price-note">$111.56 total w/ tax &amp; gratuity</div>
            <ul className="hp2-slot-card__includes">
              <li>Professional DJ for 4 hours</li>
              <li>Professional photographer + digital delivery</li>
              <li>Private cooler with ice</li>
              <li>Giant lily pad floats</li>
              <li>Crystal-clear swim stop</li>
              <li>Party cups &amp; koozies</li>
              <li>BYOB — bring your own drinks</li>
              <li>Sunset over Lake Travis</li>
            </ul>
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary" style={{ textAlign: 'center' }}>Book Saturday PM &rarr;</a>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── What Your Bachelor Party Gets ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">The Bachelor Experience</div>
          <h2 className="hp2-section__headline">
            Everything he deserves. <em>Nothing</em> to plan.
          </h2>

          <div className="hp2-promise-grid">
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">01</div>
              <div className="hp2-promise-card__title">Professional DJ</div>
              <div className="hp2-promise-card__desc">Your playlist, our sound system. Dance floor on the water with 14 disco balls and LED lighting.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">02</div>
              <div className="hp2-promise-card__title">Professional Photographer</div>
              <div className="hp2-promise-card__desc">Every moment captured. Digital delivery within 2–3 weeks. No selfie sticks needed.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">03</div>
              <div className="hp2-promise-card__title">Swim in Paradise</div>
              <div className="hp2-promise-card__desc">Crystal-clear Lake Travis coves, giant lily pads, cliff views. The best swim stop in Austin with room to spread out.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">04</div>
              <div className="hp2-promise-card__title">BYOB Party Setup</div>
              <div className="hp2-promise-card__desc">Private cooler with ice, party cups, koozies. Bring your own beer, seltzers, spirits — whatever your crew wants.</div>
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
          Private charters give your crew exclusive use of the entire boat — your music, your route, your vibe. Available year-round for any group size.
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
              <li>Perfect for bachelor parties</li>
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
          <div className="hp2-section__label">Real Bachelor Parties</div>
          <h2 className="hp2-section__headline">
            See what your party looks <em>like</em>.
          </h2>
          <div className="hp2-gallery">
            <img src="/attached_assets/disco_fun_1765193453547.jpg" alt="Bachelor party dancing on ATX Disco Cruise" loading="lazy" />
            <img src="/attached_assets/disco_fun2_1765193453547.jpg" alt="Bachelor group celebrating on Lake Travis party boat" loading="lazy" />
            <img src="/attached_assets/disco_fun5_1765193453548.jpg" alt="Dance floor party on Clever Girl boat Austin" loading="lazy" />
            <img src="/attached_assets/disco_fun6_1765193453548.jpg" alt="Disco ball party boat Lake Travis bachelor" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-1_1760080740012.jpg" alt="Austin bachelor party boat with DJ" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-9_1760080740019.jpg" alt="Bachelor group on Lake Travis cruise" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-14_1760080740020.jpg" alt="Swimming at bachelor party boat Lake Travis" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-25_1760080807866.jpg" alt="Sunset bachelor cruise on Lake Travis Austin" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ─── Expandable Bachelor Details ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Complete Details</div>
        <h2 className="hp2-section__headline">
          Everything about your <em>bachelor</em> experience.
        </h2>
        <div className="hp2-details-section">
          <button className="hp2-details-toggle" onClick={() => toggleDetails('disco')}>
            <span>ATX Disco Cruise — Complete Details</span>
            <span>{openDetails === 'disco' ? '−' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'disco' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>The ATX Disco Cruise is a 4-hour shared party boat experience on Lake Travis, running March through October exclusively for bachelor and bachelorette groups. Your group boards Clever Girl, our 50-75 person flagship vessel with 14 disco balls and LED lighting.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Every ticket includes:</strong></p>
              <ul>
                <li>Professional DJ playing for the full 4 hours</li>
                <li>Professional photographer with digital photo delivery in 2-3 weeks</li>
                <li>14 disco balls and LED dance floor lighting</li>
                <li>Dedicated dance floor on the water</li>
                <li>Swim stop in a crystal-clear Lake Travis cove</li>
                <li>Giant 6x20-foot lily pad floats</li>
                <li>Private cooler stocked with ice for your group</li>
                <li>Party cups, koozies, and party supplies</li>
                <li>Ice water stations</li>
                <li>Clean restroom facilities and shaded lounge areas</li>
                <li>USCG-certified captain and experienced crew</li>
                <li>Swim ladder and life jackets in all sizes</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Time slots:</strong> Friday 12-4 PM ($95/person), Saturday 11 AM-3 PM ($105/person, most popular), Saturday 3:30-7:30 PM ($85/person, best value with sunset). All prices include tax and gratuity in the total.</p>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('private')}>
            <span>Private Charter — Package Options</span>
            <span>{openDetails === 'private' ? '−' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'private' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Private charters give your bachelor party exclusive use of an entire boat with a dedicated captain and crew. Available year-round with a 4-hour minimum.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Standard Package (included):</strong></p>
              <ul>
                <li>Licensed captain and trained crew</li>
                <li>Premium Bluetooth sound system</li>
                <li>Large coolers (bring your own ice, or order pre-iced from Party On Delivery)</li>
                <li>Swim stop in a scenic Lake Travis cove</li>
                <li>Swim ladder and life jackets</li>
                <li>BYOB — bring whatever you want</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Essentials Upgrade ($100–$200 flat per cruise):</strong></p>
              <ul>
                <li>Everything in Standard</li>
                <li>Enhanced party setup and decorations</li>
                <li>Towel service</li>
                <li>SPF-50 spray sunscreen station</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Ultimate Package ($250–$350 flat per cruise):</strong></p>
              <ul>
                <li>Everything in Essentials</li>
                <li>Premium decorations and banner setup</li>
                <li>Custom party accessories</li>
                <li>Priority boarding and extended amenities</li>
                <li>Dedicated event coordinator</li>
              </ul>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('checklist')}>
            <span>What to Bring — Complete Checklist</span>
            <span>{openDetails === 'checklist' ? '−' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'checklist' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Here is the complete packing list for your bachelor boat party on Lake Travis. We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), sound systems, and all safety equipment — you just bring the fun.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Essentials:</strong></p>
              <ul>
                <li>Sunscreen (SPF 50+ recommended, reef-safe preferred)</li>
                <li>Swim trunks and a tank or t-shirt</li>
                <li>Towel (or add towel service upgrade)</li>
                <li>Sunglasses and a hat</li>
                <li>Flat shoes or sandals (no hard-soled shoes on the boat)</li>
                <li>Waterproof phone case (highly recommended for swim stop)</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Drinks and Snacks (BYOB):</strong></p>
              <ul>
                <li>Your favorite beverages in cans or plastic (no glass)</li>
                <li>Beer, seltzers, spirits, mixers, wine</li>
                <li>Snacks and finger foods if desired</li>
                <li>Or use Party On Delivery for drinks waiting on the boat</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Fun Extras:</strong></p>
              <ul>
                <li>Matching groomsmen shirts or custom tanks</li>
                <li>Bachelor party accessories and decorations</li>
                <li>Custom koozies and party supplies</li>
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
            Everything the <em>best man</em> needs to know.
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
          Ready to plan the <em>best bachelor party ever</em>?
        </h2>
        <p className="hp2-final-cta__body">
          The ATX Disco Cruise books fast during peak season. Secure your time slot online or call us to check availability and plan every detail.
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

      {/* ─── Quick Links (SEO Internal Linking) ─── */}
      <section style={{ background: 'var(--hp2-bg-1)', padding: '3rem 4rem', borderTop: '1px solid var(--hp2-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', justifyContent: 'center' }}>
          <Link href="/atx-disco-cruise"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>ATX Disco Cruise</a></Link>
          <Link href="/bachelorette-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelorette Parties</a></Link>
          <Link href="/combined-bachelor-bachelorette-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Combined Bach Parties</a></Link>
          <Link href="/private-cruises"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Private Charters</a></Link>
          <Link href="/austin-bachelor-party-ideas"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelor Party Ideas</a></Link>
          <Link href="/lake-travis-bachelor-party-boats"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Lake Travis Bachelor Boats</a></Link>
          <Link href="/blogs/how-to-throw-great-bachelor-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>How to Throw Great Bach Party</a></Link>
          <Link href="/blogs/perfect-bachelor-party-itinerary-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Perfect Itinerary</a></Link>
          <Link href="/blogs/epic-bachelor-party-austin-ultimate-guide"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Ultimate Guide</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
          <Link href="/faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Full FAQ</a></Link>
          <Link href="/contact"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Contact Us</a></Link>
          <Link href="/blogs"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Blog</a></Link>
          <Link href="/"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Home</a></Link>
          <Link href="/pricing"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Pricing</a></Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
