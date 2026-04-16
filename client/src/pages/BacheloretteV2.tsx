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
    q: 'What is the best bachelorette party activity in Austin?',
    a: 'The ATX Disco Cruise with Premier Party Cruises is consistently rated the #1 bachelorette party activity in Austin. It combines a professional DJ, professional photographer, dance floor, 14 disco balls, crystal-clear Lake Travis swimming, giant lily pad floats, and a full BYOB party atmosphere — all from $85 per person with tax and gratuity included. Over 150,000 guests and a 4.9-star rating make it the most popular and most-reviewed boat experience in the Austin area. Available March through October on Saturdays and Fridays.'
  },
  {
    q: 'How much does a bachelorette boat party cost?',
    a: 'The ATX Disco Cruise ranges from $85 to $105 per person depending on the time slot, with tax and gratuity already included. Saturday 3:30-7:30 PM is $85/person ($111.56 total), Friday 12-4 PM is $95/person ($124.88 total), and Saturday 11 AM-3 PM is $105/person ($137.81 total). Every time slot includes a professional DJ, professional photographer with digital delivery, giant floats, private cooler with ice, and 4 hours on Lake Travis. Private charters start at $200/hour with a 4-hour minimum for groups wanting exclusive use of a boat.'
  },
  {
    q: 'What is the ATX Disco Cruise?',
    a: 'The ATX Disco Cruise is Premier Party Cruises\' signature shared party boat experience exclusively for bachelor and bachelorette groups. It takes place on Clever Girl, our 50-75 person flagship boat equipped with 14 disco balls, LED lighting, a professional sound system, and a full dance floor. Each cruise is 4 hours on Lake Travis and includes a professional DJ, professional photographer with digital delivery, a swim stop in a crystal-clear cove, giant lily pad floats, private cooler with ice, and party supplies. It runs March through October with three time slots available.'
  },
  {
    q: "What's included in a bachelorette boat party?",
    a: 'Every ATX Disco Cruise includes: a professional DJ playing your favorite music, a professional photographer with digital photo delivery within 2-3 weeks, 14 disco balls and LED dance floor lighting, a swim stop in a crystal-clear Lake Travis cove, giant 6x20-foot lily pad floats, a private cooler stocked with ice for your group, party cups and koozies, ice water stations, clean restroom facilities, shaded lounge areas, and a USCG-certified captain and crew. Private charters include a dedicated captain, crew, premium sound system, large coolers with ice, and complete control over your route and schedule.'
  },
  {
    q: "Can we bring alcohol? What's the BYOB policy?",
    a: 'Yes — Premier Party Cruises is 100% BYOB. Bring whatever you want: champagne, wine, beer, seltzers, spirits, mixers, and non-alcoholic beverages. Cans and plastic containers only (no glass for safety). We provide large coolers packed with ice on every cruise. You can also coordinate alcohol and food delivery through our partner Party On Delivery so everything is waiting on the boat when you arrive. Many bachelorette groups bring champagne, mimosa supplies, seltzers, and snacks for the perfect celebration.'
  },
  {
    q: 'What should we wear on the boat?',
    a: 'Most bachelorette groups wear swimsuits with a cute coverup for the cruise and swim stop. Bring a change of clothes if you are heading out in Austin afterward. Flat shoes or sandals are recommended — no heels on the boat for safety. Matching outfits, custom t-shirts, sashes, tiaras, and bride-tribe gear are all welcome and encouraged! Don\'t forget sunscreen (SPF 50+), sunglasses, and a hat. We recommend a waterproof phone case for the swim stop. The boat has shaded areas, but the Texas sun is strong, especially mid-day.'
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
    q: 'What if it rains on our bachelorette weekend?',
    a: 'Safety is our top priority. If conditions are unsafe (thunderstorms, high winds), we contact you to reschedule at no additional cost. Light rain does not typically affect departures — our boats have covered and shaded areas. For the ATX Disco Cruise specifically, severe weather triggers a move to our Lemonade Disco land venue so your party still happens. We monitor weather conditions continuously and communicate proactively so you always know what to expect. Texas weather can change quickly, but most scheduled cruises depart as planned.'
  },
  {
    q: 'How far in advance should we book?',
    a: 'We recommend booking 4-8 weeks in advance for weekend dates during peak season (March through October). Some popular Saturday dates book 6-8 weeks ahead, especially during prime bachelorette season in spring and early fall. Friday time slots typically have more availability. However, we sometimes have last-minute openings — call (512) 488-5892 to check same-week availability. For private charters during peak season, booking 6-8 weeks out is recommended. Weekday dates generally have more flexibility.'
  },
  {
    q: 'Can we combine our bach party with the bachelor group?',
    a: 'Yes! Combined bachelor-bachelorette parties are one of our most popular bookings. On the ATX Disco Cruise, both groups can book the same time slot and party together on Clever Girl — it is a great way to kick off the wedding weekend with everyone together. For a more exclusive experience, book a private charter where the entire boat is yours. Many couples book the Saturday 11 AM-3 PM slot for the combined group, then split up for separate nightlife plans in Austin afterward. Visit our combined bachelor-bachelorette page for more details.'
  },
  {
    q: 'What are the best add-ons for bachelorette parties?',
    a: 'Popular bachelorette add-ons include: mimosa setup with champagne flutes and orange juice, alcohol and food delivery through Party On Delivery (everything waiting on the boat when you arrive), towel service, SPF-50 spray sunscreen stations, custom party decorations, and our Essentials or Ultimate upgrade packages. The Essentials package adds $100-$200 flat per cruise, and the Ultimate package adds $250-$350 flat per cruise. Many groups also bring their own decorations, custom koozies, matching swimsuits, and bride-themed accessories.'
  },
  {
    q: 'Is a private charter or disco cruise better for bachelorettes?',
    a: 'It depends on your group\'s vibe and budget. The ATX Disco Cruise ($85-$105/person) is perfect if you want a high-energy party atmosphere with a professional DJ, photographer, and other bach groups to celebrate with — it\'s our most popular bachelorette option. A private charter (from $200/hour, 4-hour minimum) is better if you want complete privacy, control over the music and route, or have a larger group (up to 75 guests). Private charters are also available year-round, while the Disco Cruise runs March through October. Many groups choose the Disco Cruise for the included DJ and photographer alone — hiring those separately would cost more than the entire cruise.'
  },
  {
    q: 'Can we bring decorations and matching outfits?',
    a: 'Absolutely! We love when bachelorette groups go all out. Banners, balloons, sashes, tiaras, custom koozies, matching swimsuits, bride-tribe shirts — bring it all. Many groups bring a "Bride to Be" banner for the boat, matching coverups, and custom cups. For the ATX Disco Cruise, just note that decorations need to be easily removable since other groups share the boat. On a private charter, you have complete freedom to decorate however you want. We recommend skipping confetti and glitter (hard to clean), but streamers, banners, and inflatable accessories are all welcome.'
  },
  {
    q: 'What is the best Austin bachelorette party itinerary?',
    a: 'Day 1: Arrive in Austin, check into your hotel, dinner on Rainey Street. Day 2: ATX Disco Cruise on Lake Travis (11 AM-3 PM is our most popular slot), then bar hop on 6th Street or Rainey Street in the evening. Day 3: Brunch, spa day, and explore South Congress shops. Many groups add a private sunset charter on Day 1 as a warm-up. See our complete 3-day Austin bachelorette itinerary for the full guide.'
  },
  {
    q: 'Why is Austin the best bachelorette party destination?',
    a: 'Austin combines world-class nightlife (6th Street, Rainey Street, live music), Lake Travis water activities (party boat cruises, swimming, paddleboarding), amazing food, spa and wellness options, and perfect spring/summer weather. It is one of the most affordable bachelorette destinations compared to Nashville, Miami, or Vegas. The ATX Disco Cruise is unique to Austin — no other city has an all-inclusive multi-group bachelorette party cruise. Austin is consistently ranked the #1 bachelorette party destination in the South.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function BacheloretteV2() {
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
            "name": "Austin Bachelorette Party Boat Cruises",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Austin's #1 bachelorette party boat experience on Lake Travis. ATX Disco Cruise from $85/person all-inclusive with DJ, photographer, floats. Private charters from $200/hour for exclusive bachelorette celebrations.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "85", "highPrice": "500", "priceCurrency": "USD" }
          },
          {
            "@type": "Event",
            "name": "ATX Disco Cruise - Bachelorette Party",
            "description": "Austin's only all-inclusive bachelorette party cruise on Lake Travis. 4 hours with DJ, photographer, 14 disco balls, giant floats.",
            "url": "https://premierpartycruises.com/bachelorette-party-austin",
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
            "@type": "Product", "name": "Clever Girl - Bachelorette Party Flagship Boat",
            "description": "75-person flagship party boat with 14 disco balls, LED lighting, dance floor. Home of the ATX Disco Cruise.",
            "brand": { "@type": "Brand", "name": "Premier Party Cruises" },
            "offers": { "@type": "Offer", "price": "250", "priceCurrency": "USD", "availability": "https://schema.org/InStock", "unitText": "per hour" }
          },
          {
            "@type": "VideoObject",
            "name": "ATX Disco Cruise Bachelorette Party Boat Tour",
            "description": "Virtual tour of the Clever Girl, Premier Party Cruises' flagship bachelorette party boat on Lake Travis Austin Texas",
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
          <video
            className="hp2-hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="/attached_assets/atx-disco-cruise-party.webp"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">Bachelorette Parties &middot; Lake Travis Since 2009</p>
          <h1 className="hp2-hero__headline">
            Austin's <em>ultimate</em> bachelorette party on the water
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            DJ. Photographer. Dance floor. Crystal-clear Lake Travis swimming. Giant floats. The ATX Disco Cruise is the #1 Austin bachelorette party activity — from $85/person with everything included. Austin party boat rentals for bachelorette groups start at Anderson Mill Marina, just 25 minutes from downtown Austin. Go all-inclusive on the Disco Cruise, or book a private Austin bachelorette party boat charter.
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
            Two ways to celebrate your <em>last fling</em>.
          </h2>

          <div className="hp2-experiences">
            <div className="hp2-exp-card">
              <div className="hp2-exp-card__img-wrap">
                <img
                  className="hp2-exp-card__img"
                  src="/attached_assets/atx-disco-cruise-party.webp"
                  alt="ATX Disco Cruise bachelorette party on Lake Travis"
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
                  Join other bach groups on Clever Girl for the ultimate high-energy lake party. Professional DJ, 14 disco balls, dance floor, giant floats, professional photographer with digital delivery. 4 hours on Lake Travis.
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
                  alt="Private bachelorette charter on Clever Girl"
                  loading="lazy"
                />
              </div>
              <div className="hp2-exp-card__content">
                <h3 className="hp2-exp-card__title">Private Bachelorette Charter</h3>
                <div className="hp2-exp-card__meta">
                  <span className="hp2-exp-card__tag">Exclusive</span>
                  <span className="hp2-exp-card__tag">Your Boat, Your Rules</span>
                  <span className="hp2-exp-card__tag">Year-Round</span>
                </div>
                <p className="hp2-exp-card__desc">
                  The entire boat exclusively for your bride tribe. Choose from 4 boats (14–75 guests), customize your music, route, and vibe. Perfect for groups who want privacy and complete control.
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
          Three time slots. One <em>epic</em> bachelorette.
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

      {/* ─── What Your Bach Party Gets ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">The Bachelorette Experience</div>
          <h2 className="hp2-section__headline">
            Everything she deserves. <em>Nothing</em> to plan.
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
              <div className="hp2-promise-card__desc">Crystal-clear Lake Travis coves, giant lily pads, unicorn floats. The most Instagrammable swim stop in Austin.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">04</div>
              <div className="hp2-promise-card__title">BYOB Party Setup</div>
              <div className="hp2-promise-card__desc">Private cooler with ice, mimosa supplies, party cups, koozies. Bring your own champagne and celebrate.</div>
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
          Private charters give your bride tribe exclusive use of the entire boat — your music, your route, your vibe. Available year-round for any group size.
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
              <li>Perfect for bach parties</li>
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
          <div className="hp2-section__label">Real Bachelorette Parties</div>
          <h2 className="hp2-section__headline">
            See what your party looks <em>like</em>.
          </h2>
          <div className="hp2-gallery">
            <img src="/attached_assets/disco_fun_1765193453547.jpg" alt="Bachelorette party dancing on ATX Disco Cruise" loading="lazy" />
            <img src="/attached_assets/disco_fun2_1765193453547.jpg" alt="Bachelorette group celebrating on Lake Travis party boat" loading="lazy" />
            <img src="/attached_assets/disco_fun5_1765193453548.jpg" alt="Dance floor party on Clever Girl boat Austin" loading="lazy" />
            <img src="/attached_assets/disco_fun6_1765193453548.jpg" alt="Disco ball party boat Lake Travis bachelorette" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-1_1760080740012.jpg" alt="Austin bachelorette party boat with DJ" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-5_1760080740018.jpg" alt="Bachelorette group photo on Lake Travis cruise" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-21_1760080807864.jpg" alt="Swimming at bachelorette party boat Lake Travis" loading="lazy" />
            <img src="/attached_assets/@capitalcityshots-25_1760080807866.jpg" alt="Sunset bachelorette cruise on Lake Travis Austin" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ─── Expandable Bachelorette Details ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Complete Details</div>
        <h2 className="hp2-section__headline">
          Everything about your <em>bachelorette</em> experience.
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
                <li>Giant 6x20-foot lily pad floats and unicorn floats</li>
                <li>Private cooler stocked with ice for your group</li>
                <li>Mimosa supplies (juice and fruit)</li>
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
              <p>Private charters give your bachelorette party exclusive use of an entire boat with a dedicated captain and crew. Available year-round with a 4-hour minimum.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Standard Package (included):</strong></p>
              <ul>
                <li>Licensed captain and trained crew</li>
                <li>Premium Bluetooth sound system</li>
                <li>Large coolers packed with ice</li>
                <li>Swim stop in a scenic Lake Travis cove</li>
                <li>Swim ladder and life jackets</li>
                <li>BYOB — bring whatever you want</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Essentials Upgrade ($100–$200 flat per cruise):</strong></p>
              <ul>
                <li>Everything in Standard</li>
                <li>Enhanced party setup and decorations</li>
                <li>Mimosa bar supplies</li>
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
              <p>Here is the complete packing list for your bachelorette boat party on Lake Travis. We provide coolers with ice, sound systems, and all safety equipment — you just bring the fun.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Essentials:</strong></p>
              <ul>
                <li>Sunscreen (SPF 50+ recommended, reef-safe preferred)</li>
                <li>Swimsuit and coverup</li>
                <li>Towel (or add towel service upgrade)</li>
                <li>Sunglasses and a hat</li>
                <li>Flat shoes or sandals (no heels on the boat)</li>
                <li>Waterproof phone case (highly recommended for swim stop)</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Drinks and Snacks (BYOB):</strong></p>
              <ul>
                <li>Your favorite beverages in cans or plastic (no glass)</li>
                <li>Champagne, seltzers, beer, wine, spirits, mixers</li>
                <li>Snacks and finger foods if desired</li>
                <li>Or use Party On Delivery for drinks waiting on the boat</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Fun Extras:</strong></p>
              <ul>
                <li>Matching bride-tribe outfits and swimsuits</li>
                <li>Sashes, tiaras, and "Bride to Be" banner</li>
                <li>Custom koozies and party accessories</li>
                <li>Change of clothes for going out afterward</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Planning Tips ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Plan Like a Pro</div>
        <h2 className="hp2-section__headline">
          Your bachelorette weekend, <em>simplified</em>.
        </h2>
        <div className="hp2-tips__body">
          Planning a bachelorette party should be fun, not stressful. Here is everything the maid of honor needs to know to pull off the perfect Lake Travis celebration. We have hosted thousands of bachelorette parties since 2009 and have the process down to a science.
        </div>
        <div className="hp2-tips__body">
          <strong style={{ color: 'var(--hp2-cream)' }}>What to bring:</strong> Swimsuits, sunscreen (SPF 50+), sunglasses, a hat, towels, and your BYOB drinks in cans or plastic (no glass). Many groups bring matching outfits, sashes, tiaras, a "Bride to Be" banner, and custom koozies. A waterproof phone case is highly recommended for the swim stop. Bring a change of clothes if you are heading out in Austin afterward.
        </div>
        <div className="hp2-tips__body">
          <strong style={{ color: 'var(--hp2-cream)' }}>What to wear:</strong> Swimsuit with a coverup is the standard bachelorette look. Flat shoes or sandals only — no heels on the boat. Matching bride-tribe outfits are encouraged and make for incredible photos.
        </div>
        <div className="hp2-tips__body">
          <strong style={{ color: 'var(--hp2-cream)' }}>Getting there:</strong> Anderson Mill Marina is 25 minutes from downtown Austin. Rideshare (Uber/Lyft) works great, or book a party bus for the full VIP experience. Free parking is available at the marina for those driving. Arrive 15 minutes before departure.
        </div>

        <div className="hp2-tips__timeline">
          <div className="hp2-tips__timeline-card">
            <div className="hp2-tips__timeline-label">15 min before departure</div>
            <div className="hp2-tips__timeline-text">Arrive at Anderson Mill Marina. Check in with the crew, load your coolers and drinks onto the boat, and get settled. This is the perfect time for group photos at the dock before the party starts.</div>
          </div>
          <div className="hp2-tips__timeline-card">
            <div className="hp2-tips__timeline-label">First hour — cruise &amp; party</div>
            <div className="hp2-tips__timeline-text">The DJ drops the first beats as the boat pulls away from the marina. Cruise through the stunning Texas Hill Country scenery on Lake Travis while the dance floor heats up. Grab your drinks, hit the dance floor, and soak in the views.</div>
          </div>
          <div className="hp2-tips__timeline-card">
            <div className="hp2-tips__timeline-label">Hours 2 &amp; 3 — swim stop</div>
            <div className="hp2-tips__timeline-text">The captain anchors in a crystal-clear cove surrounded by limestone cliffs. Jump in, float on the giant lily pads, swim, take incredible photos with the cliffs as your backdrop. The DJ keeps the music going and the photographer captures every moment.</div>
          </div>
          <div className="hp2-tips__timeline-card">
            <div className="hp2-tips__timeline-label">Final hour — sunset cruise back</div>
            <div className="hp2-tips__timeline-text">Back on the move for the final stretch. The energy peaks as the sun starts to set over Lake Travis. Last songs, final toasts, and the photographer captures golden-hour shots. You will be back at the marina ready for dinner and nightlife in Austin.</div>
          </div>
        </div>
      </section>

      {/* ─── Why Austin ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Austin</div>
        <h2 className="hp2-section__headline">
          Why Austin is the <em>#1 bachelorette destination</em> in the South
        </h2>
        <p className="hp2-section__body">
          Austin bachelorette parties combine everything — Lake Travis party boats, world-class nightlife on 6th Street and Rainey Street, incredible food, hill country wineries, spa retreats, and perfect weather from March through October. The ATX Disco Cruise is a bachelorette activity you can't find anywhere else in the country.
        </p>
        <div className="hp2-promise-grid">
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">&#9733;</div>
            <div className="hp2-promise-card__title">Lake Travis Party Boats</div>
            <div className="hp2-promise-card__desc">The ATX Disco Cruise and private charters — Austin's signature bachelorette party activity. DJ, photographer, swimming, and floats included.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">&#9833;</div>
            <div className="hp2-promise-card__title">6th Street & Rainey Street</div>
            <div className="hp2-promise-card__desc">Austin's legendary nightlife. Live music, rooftop bars, craft cocktails. The perfect complement to a daytime Lake Travis cruise.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">&#9788;</div>
            <div className="hp2-promise-card__title">Perfect Weather</div>
            <div className="hp2-promise-card__desc">Austin sunshine from March through October means reliable outdoor plans. Plus our Lemonade Disco weather guarantee means your party never cancels.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">&#9830;</div>
            <div className="hp2-promise-card__title">Better Value Than Nashville or Miami</div>
            <div className="hp2-promise-card__desc">Austin bachelorette parties cost 30-40% less than Nashville, Miami, or Vegas. The ATX Disco Cruise at $85/person is unmatched value for an all-inclusive experience.</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/3-day-austin-bachelorette-itinerary"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline', fontSize: '0.95rem' }}>See our complete 3-day Austin bachelorette itinerary →</a></Link>
          <span style={{ color: 'var(--hp2-text-muted)', margin: '0 1rem' }}>|</span>
          <Link href="/top-10-austin-bachelorette-ideas"><a style={{ color: 'var(--hp2-gold)', textDecoration: 'underline', fontSize: '0.95rem' }}>Top 10 Austin bachelorette ideas →</a></Link>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Questions &amp; Answers</div>
          <h2 className="hp2-section__headline">
            Everything the <em>maid of honor</em> needs to know.
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
          Ready to plan the <em>best bachelorette ever</em>?
        </h2>
        <p className="hp2-final-cta__body">
          The ATX Disco Cruise is the most popular Austin bachelorette party boat — it books fast during peak season (March-October). Secure your Lake Travis bachelorette cruise time slot online or call us to check availability and plan every detail of your Austin bachelorette weekend.
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
          <Link href="/bachelor-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelor Parties</a></Link>
          <Link href="/combined-bachelor-bachelorette-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Combined Bach Parties</a></Link>
          <Link href="/private-cruises"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Private Charters</a></Link>
          <Link href="/3-day-austin-bachelorette-itinerary"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>3-Day Itinerary</a></Link>
          <Link href="/ultimate-austin-bachelorette-weekend"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Ultimate Weekend Guide</a></Link>
          <Link href="/top-10-austin-bachelorette-ideas"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Top 10 Ideas</a></Link>
          <Link href="/budget-austin-bachelorette"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Budget Guide</a></Link>
          <Link href="/luxury-austin-bachelorette"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Luxury Guide</a></Link>
          <Link href="/wedding-parties"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Wedding Parties</a></Link>
          <Link href="/birthday-parties"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Birthday Parties</a></Link>
          <Link href="/sweet-16"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Sweet 16</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
          <Link href="/faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Full FAQ</a></Link>
          <Link href="/contact"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Contact Us</a></Link>
          <Link href="/blogs"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Blog</a></Link>
          <Link href="/blogs/how-to-throw-great-bachelorette-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>How to Throw a Great Bach Party</a></Link>
          <Link href="/blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Lake Travis Adventures</a></Link>
          <Link href="/blogs/must-haves-for-the-perfect-austin-bachelorette-weekend"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Weekend Must-Haves</a></Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
