import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { XOLA_BUTTON_ID } from "@/components/XolaBookNow";
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import { useQuoteLightbox } from '@/components/QuoteLightbox';
import CtaPair, { CtaBanner } from '@/components/CtaPair';

const Footer = lazy(() => import('@/components/Footer'));

// ─── Inline Styles (shared HP2 design system + disco-specific additions) ─────
const DISCO_STYLES = `
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

/* ─── Disco-specific: Pricing Cards (3 cols) ─────────────────── */
.disco-pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.disco-pricing-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.8rem 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.disco-pricing-card__badge {
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

.disco-pricing-card__slot {
  font-family: var(--hp2-font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 0.4rem;
}

.disco-pricing-card__tagline {
  font-size: 0.9rem;
  color: var(--hp2-gold);
  font-weight: 500;
  margin-bottom: 1.4rem;
}

.disco-pricing-card__price {
  font-family: var(--hp2-font-display);
  font-size: 2.4rem;
  font-weight: 300;
  color: var(--hp2-gold-light);
  margin-bottom: 0.3rem;
}

.disco-pricing-card__total {
  font-size: 0.82rem;
  color: var(--hp2-text-muted);
  margin-bottom: 2rem;
}

.disco-pricing-card__includes {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;
}

.disco-pricing-card__includes li {
  font-size: 0.9rem;
  color: var(--hp2-cream-muted);
  line-height: 1.6;
  padding: 0.35rem 0;
  padding-left: 1.4rem;
  position: relative;
}

.disco-pricing-card__includes li::before {
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}

/* ─── Disco-specific: Included Two-Column Grid ───────────────── */
.disco-included-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 4rem;
}

.disco-included-col__title {
  font-family: var(--hp2-font-body);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--hp2-gold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.5rem;
}

.disco-included-col__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.disco-included-col__list li {
  font-size: 0.95rem;
  color: var(--hp2-cream-muted);
  line-height: 1.6;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--hp2-border-sub);
  padding-left: 1.4rem;
  position: relative;
}

.disco-included-col__list li::before {
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}

/* ─── Disco-specific: Who It's For (3 cols) ──────────────────── */
.disco-who-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.disco-who-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.4rem 2rem;
}

.disco-who-card__title {
  font-family: var(--hp2-font-display);
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--hp2-cream);
  margin-bottom: 0.8rem;
}

.disco-who-card__desc {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  line-height: 1.65;
}

/* ─── Disco-specific: Photo Gallery ──────────────────────────── */
.disco-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 4rem;
}

.disco-gallery__img-wrap {
  aspect-ratio: 16/10;
  overflow: hidden;
  border: 1px solid var(--hp2-border);
}

.disco-gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.disco-gallery__img-wrap:hover .disco-gallery__img {
  transform: scale(1.03);
}

/* ─── Responsive ──────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hp2-promise-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .disco-pricing-grid {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
  .disco-who-grid {
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
  .disco-pricing-grid {
    grid-template-columns: 1fr;
    max-width: none;
  }
  .disco-included-grid {
    grid-template-columns: 1fr;
  }
  .disco-gallery {
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
/* Video Gallery — vertical TikTok embeds */
.hp2-video-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2.5rem;
}
.hp2-video-gallery__item {
  position: relative;
  border: 1px solid var(--hp2-border);
  border-radius: 0;
  overflow: hidden;
  background: var(--hp2-bg-card);
  aspect-ratio: 9/16;
}
.hp2-video-gallery__item iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.hp2-video-gallery__label {
  text-align: center;
  font-size: 0.78rem;
  color: var(--hp2-text-muted);
  padding: 0.6rem 0.5rem;
  letter-spacing: 0.04em;
}
.hp2-photo-mosaic {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 220px 220px;
  gap: 0.5rem;
  margin-top: 2rem;
}
.hp2-photo-mosaic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--hp2-border);
  transition: transform 0.3s ease;
}
.hp2-photo-mosaic img:hover {
  transform: scale(1.03);
}
.hp2-photo-mosaic img:first-child {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
@media (max-width: 768px) {
  .hp2-video-gallery {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-photo-mosaic {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 180px 180px 180px;
  }
  .hp2-photo-mosaic img:first-child {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
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
const DISCO_FAQ_DATA = [
  {
    q: 'What is the ATX Disco Cruise?',
    a: 'The ATX Disco Cruise is Austin\'s premier shared party boat experience on Lake Travis, exclusively for bachelor and bachelorette groups. Multiple groups celebrate together on our flagship Clever Girl -- a 50-75 person vessel with 14 disco balls, LED lighting, a professional DJ, a professional photographer, a dedicated dance floor, giant floats, and a swim stop in a stunning cove. It runs March through October. Everything is included in the ticket price.'
  },
  {
    q: 'How much are tickets for the ATX Disco Cruise?',
    a: 'Ticket prices depend on the time slot. Friday 12-4 PM: $95/person ($124.88 with tax and gratuity). Saturday 11 AM-3 PM: $105/person ($137.81 with tax and gratuity). Saturday 3:30-7:30 PM: $85/person ($111.56 with tax and gratuity). All prices include DJ, photographer, giant floats, party supplies, cooler with ice, and mimosa supplies. Tax and gratuity are included in the total -- no hidden fees.'
  },
  {
    q: 'What time slots are available for the ATX Disco Cruise?',
    a: 'Three time slots are available each weekend: Friday 12-4 PM ($95/person), Saturday 11 AM-3 PM ($105/person, most popular), and Saturday 3:30-7:30 PM ($85/person, best value and catches the sunset). All cruises are 4 hours long. Saturday morning fills up fastest -- book 4-6 weeks ahead for peak weekends.'
  },
  {
    q: 'Is the ATX Disco Cruise BYOB? What can I bring?',
    a: 'Yes, the ATX Disco Cruise is 100% BYOB. Bring whatever you want -- beer, wine, spirits, seltzers, hard kombucha, non-alcoholic beverages. Cans and plastic containers only (no glass for safety). We provide a private cooler for your group (bring your own ice, or order pre-iced from our sister company Party On Delivery), plus mimosa supplies (juice and fruit), ice water stations, cups, and koozies. You can also coordinate alcohol delivery through our partner Party On Delivery so drinks are waiting on the boat when you arrive.'
  },
  {
    q: 'Where do we meet for the ATX Disco Cruise? How do I get there?',
    a: 'All cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. It\'s approximately 25 minutes from downtown Austin -- the closest Lake Travis marina to the city. Free parking is available. We recommend arriving 15 minutes before your scheduled departure time. Rideshare (Uber/Lyft) is also an option.'
  },
  {
    q: 'Can you swim during the ATX Disco Cruise?',
    a: 'Yes -- swimming is one of the highlights. During every cruise, the captain anchors in a stunning Lake Travis cove with crystal-clear water. Guests swim, float on giant lily pads and unicorn floats, and enjoy the natural springs that feed the lake. We provide a swim ladder for easy re-boarding and life jackets in all sizes. The swim stop typically lasts 1.5-2 hours of the 4-hour cruise.'
  },
  {
    q: 'When does the ATX Disco Cruise run?',
    a: 'The ATX Disco Cruise season runs from March through October each year. Cruises operate on Fridays (12-4 PM) and Saturdays (11 AM-3 PM and 3:30-7:30 PM). The season starts when water temperatures warm up in spring and continues through late fall. Peak months are May through September. Outside of the season, you can still book a private charter on any of our four boats year-round.'
  },
  {
    q: 'What should I wear on the ATX Disco Cruise?',
    a: 'Wear whatever makes you feel like celebrating! Most guests wear swimsuits, coverups, or casual summer clothes. For bachelorette parties, matching outfits, sashes, and themed accessories are popular and encouraged. Bring a change of clothes if you want to be dry for photos. We recommend reef-safe sunscreen (SPF 50+), sunglasses, and a hat. Footwear: flip-flops or boat shoes work best. Leave valuables at home or bring a waterproof phone case.'
  },
  {
    q: 'What happens if it rains on our cruise day?',
    a: 'Safety is our top priority. If conditions are unsafe (thunderstorms, high winds), we\'ll contact you to reschedule at no additional cost. Light rain does not affect departures -- our boats have covered shaded areas. For severe weather, the ATX Disco Cruise moves to our Lemonade Disco land venue so the party continues regardless. We monitor conditions continuously and communicate proactively.'
  },
  {
    q: 'Is the ATX Disco Cruise the best party boat in Austin?',
    a: 'The ATX Disco Cruise is Austin\'s longest-running and highest-rated party boat experience. Since 2009, we\'ve hosted over 150,000 guests with a 4.9/5 star rating across hundreds of reviews. No other boat on Lake Travis has 14 disco balls, a dedicated dance floor, a professional DJ, and a professional photographer all included in the ticket price. Most competitors offer bare-bones pontoon rentals without music, lighting, or photography. The Disco Cruise is a fully produced party experience.'
  },
  {
    q: 'How is the ATX Disco Cruise different from a private charter?',
    a: 'The ATX Disco Cruise is a shared party experience -- multiple bachelor and bachelorette groups celebrate together on one large boat, which creates high energy and an incredible atmosphere. The DJ, photographer, floats, and party supplies are all included. A private charter gives you exclusive use of the entire boat for any event type (not just bach parties), with your own captain and crew, and you choose your own schedule. Private charters start at $200/hour with a 4-hour minimum.'
  },
  {
    q: 'When do we get our photos from the cruise?',
    a: 'Your professional photographer captures moments throughout the entire 4-hour cruise -- boarding, dancing, swimming, group shots, and candid moments. Digital photos are delivered within 2-3 weeks after your cruise via a shared gallery link. The photos are included in your ticket price at no extra charge.'
  },
  {
    q: 'Can we combine bachelor and bachelorette groups on the same cruise?',
    a: 'Absolutely! Combined bachelor and bachelorette parties are welcome and common on the ATX Disco Cruise. Many couples book the same time slot so both groups can celebrate together on the water. It\'s one of the most popular ways to kick off a wedding weekend. Just make sure both groups book the same date and time slot.'
  },
  {
    q: 'What add-ons are available for the ATX Disco Cruise?',
    a: 'Popular add-ons include: alcohol and food delivery through our partner Party On Delivery (drinks and snacks waiting on the boat), custom decorations and banners, extra cooler service, and upgrades to our Essentials or Ultimate packages. The Essentials upgrade adds $100-$200 flat per cruise and the Ultimate package adds $250-$350 flat per cruise. Contact us for details on specific add-ons for your group.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
// TikTok embed — autoplay first video on scroll, others play on click
function LazyTikTok({ videoId, title, label, autoplay = false }: { videoId: string; title: string; label: string; autoplay?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (autoplay) setPlaying(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [autoplay]);

  const shouldLoad = autoplay ? visible : playing;

  return (
    <div className="hp2-video-gallery__item" ref={ref} onClick={() => !playing && setPlaying(true)} style={{ cursor: playing ? 'default' : 'pointer' }}>
      {shouldLoad ? (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=1`}
          allowFullScreen
          allow="encrypted-media; autoplay"
          title={title}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%', background: '#1A1A26',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.5rem', transition: 'background 0.2s'
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#252535'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#1A1A26'; }}
        >
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(200,169,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#C8A96E', fontSize: '1.5rem', marginLeft: '3px' }}>▶</span>
          </div>
          <span style={{ color: '#A89878', fontSize: '0.75rem', letterSpacing: '0.05em' }}>TAP TO PLAY</span>
        </div>
      )}
      <div className="hp2-video-gallery__label">{label}</div>
    </div>
  );
}

export default function DiscoV2() {
  
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
      <style dangerouslySetInnerHTML={{ __html: DISCO_STYLES }} />
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
            "priceRange": "$85-$105"
          },
          {
            "@type": "Event",
            "name": "ATX Disco Cruise",
            "description": "Austin's only all-inclusive bachelor and bachelorette party cruise on Lake Travis. 4 hours with DJ, photographer, 14 disco balls, giant floats. From $85/person.",
            "url": "https://premierpartycruises.com/atx-disco-cruise",
            "location": { "@type": "Place", "name": "Anderson Mill Marina", "address": { "@type": "PostalAddress", "streetAddress": "13993 FM 2769", "addressLocality": "Leander", "addressRegion": "TX", "postalCode": "78641" } },
            "offers": [
              { "@type": "Offer", "name": "Friday Cruise (12-4pm)", "price": "95", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Morning (11am-3pm)", "price": "105", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              { "@type": "Offer", "name": "Saturday Sunset (3:30-7:30pm)", "price": "85", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            ]
          },
          {
            "@type": "FAQPage",
            "mainEntity": DISCO_FAQ_DATA.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          },
          {
            "@type": "VideoObject",
            "name": "ATX Disco Cruise - Austin's #1 Bachelor Bachelorette Party Boat",
            "description": "Virtual tour of the ATX Disco Cruise on Lake Travis",
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
            poster="/attached_assets/hero-fallback.jpg"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">ATX Disco Cruise &middot; March&ndash;October</p>
          <h1 className="hp2-hero__headline">
            Austin's most <em>iconic</em> party boat experience
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            DJ. Photographer. Dance floor. Giant floats. 4 hours on Lake Travis with the best bachelor and bachelorette groups in Austin. From $85/person &mdash; everything included.
          </p>
          <div className="hp2-hero__ctas">
            <CtaPair source="discov2_hero" />
            <a href="#timeslots" className="hp2-btn hp2-btn--outline" style={{ marginLeft: '0.5rem' }}>View Time Slots</a>
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
            <span className="hp2-trust__sub">Hundreds of 5-star reviews</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9733;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">BYOB Friendly</span>
            <span className="hp2-trust__sub">Your drinks, our boat</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9671;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">From $85/person</span>
            <span className="hp2-trust__sub">Tax &amp; gratuity included</span>
          </div>
        </div>
      </div>

      {/* ─── Video & Photo Gallery ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">See It In Action</div>
        <h2 className="hp2-section__headline">
          This is what <em>unforgettable</em> looks like.
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#C8B898', maxWidth: '700px', lineHeight: 1.7, marginBottom: '1rem' }}>
          Real moments from the ATX Disco Cruise — dance floors, lake swims, sunset views, and pure celebration.
        </p>

        {/* TikTok Video Embeds — lazy-loaded on scroll into view */}
        <div className="hp2-video-gallery">
          <LazyTikTok videoId="7098140161766198574" title="BachBabes: Premier Party Cruises is a MUST" label="100K+ Views — @bachbabes" autoplay />
          <LazyTikTok videoId="7186412125869362474" title="ATX Disco Cruise walkthrough" label="The Disco Cruise Experience" />
          <LazyTikTok videoId="7192009833111964974" title="Austin bachelorette party planning" label="Bachelorette Planning Tips" />
          <LazyTikTok videoId="7098140161766198574" title="Premier Party Cruises Austin must-do" label="The Viral Bach Video" />
        </div>

        {/* Photo Mosaic */}
        <div style={{ marginTop: '3rem' }}>
          <div className="hp2-section__label">Photos From The Cruise</div>
        </div>
        <div className="hp2-gallery" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem' }}>
          <img src="/attached_assets/disco_fun_first_1765193453547.jpg" alt="ATX Disco Cruise party dancing on Lake Travis" loading="lazy" />
          <img src="/attached_assets/disco_fun_1765193453547.jpg" alt="Bachelorette group dancing on ATX Disco Cruise" loading="lazy" />
          <img src="/attached_assets/disco_fun2_1765193453547.jpg" alt="Party vibes on Clever Girl disco boat Austin" loading="lazy" />
          <img src="/attached_assets/disco_fun3_1765193453547.jpg" alt="Groups having fun on Lake Travis disco cruise" loading="lazy" />
          <img src="/attached_assets/disco_fun5_1765193453548.jpg" alt="Friends celebrating on ATX Disco Cruise boat" loading="lazy" />
          <img src="/attached_assets/disco_fun6_1765193453548.jpg" alt="DJ and dance floor on Lake Travis party boat" loading="lazy" />
          <img src="/attached_assets/disco_fun7_1765193453548.jpg" alt="Swimming and floats at ATX Disco Cruise" loading="lazy" />
          <img src="/attached_assets/disco_fun9_1765193453548.jpg" alt="Sunset party on Clever Girl boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/disco_fun_best2_1765193453547.jpg" alt="Best moments from ATX Disco Cruise Austin" loading="lazy" />
          <img src="/attached_assets/disco_fun_28_1765193453540.jpg" alt="Disco ball party on Lake Travis boat cruise" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-1_1760080740012.jpg" alt="Bachelor group on party boat with DJ" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-2_1760080740017.jpg" alt="Party atmosphere on Lake Travis cruise" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-3_1760080740017.jpg" alt="Friends swimming off party boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-4_1760080740017.jpg" alt="Bachelorette group on ATX Disco Cruise" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-5_1760080740018.jpg" alt="Giant float and swimming at disco cruise" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-9_1760080740019.jpg" alt="Lake Travis cove swimming stop party boat" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-10_1760080740019.jpg" alt="Dancing on deck ATX Disco Cruise sunset" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-14_1760080740020.jpg" alt="Groups celebrating together Lake Travis" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-21_1760080807864.jpg" alt="Sunset cruise view from Clever Girl boat" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-25_1760080807866.jpg" alt="Fun times on ATX Disco Cruise Austin TX" loading="lazy" />
        </div>
      </section>

      {/* ─── The Experience ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The ATX Disco Experience</div>
        <h2 className="hp2-section__headline">
          Four hours of pure <em>celebration</em>.
        </h2>

        <div className="hp2-promise-grid">
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">01</div>
            <div className="hp2-promise-card__title">Board &amp; Set Sail</div>
            <div className="hp2-promise-card__desc">Meet at Anderson Mill Marina, board Clever Girl, your group gets a private cooler with ice.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">02</div>
            <div className="hp2-promise-card__title">DJ &amp; Dance Floor</div>
            <div className="hp2-promise-card__desc">Professional DJ plays all day, 14 disco balls light up, dance floor rocks on the water.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">03</div>
            <div className="hp2-promise-card__title">Swim in Paradise</div>
            <div className="hp2-promise-card__desc">Anchor in a stunning Lake Travis cove, swim in crystal-clear water, float on giant lily pads and unicorn floats.</div>
          </div>
          <div className="hp2-promise-card">
            <div className="hp2-promise-card__num">04</div>
            <div className="hp2-promise-card__title">Photos Delivered</div>
            <div className="hp2-promise-card__desc">Professional photographer captures every moment, digital delivery within 2-3 weeks.</div>
          </div>
        </div>
      </section>

      {/* ─── Time Slots & Pricing ─── */}
      <section className="hp2-section--alt" id="timeslots">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Time Slots &amp; Pricing</div>
          <h2 className="hp2-section__headline">
            Three options. One <em>incredible</em> cruise.
          </h2>

          <div className="disco-pricing-grid">
            {/* Friday */}
            <div className="disco-pricing-card">
              <div className="disco-pricing-card__slot">Friday 12&ndash;4 PM</div>
              <div className="disco-pricing-card__tagline">Kickstart your weekend</div>
              <div className="disco-pricing-card__price">$95/person</div>
              <div className="disco-pricing-card__total">$124.88 with tax + gratuity</div>
              <ul className="disco-pricing-card__includes">
                <li>Private cooler with ice</li>
                <li>Professional DJ</li>
                <li>Professional photographer</li>
                <li>Giant floats &amp; lily pads</li>
                <li>Party supplies &amp; mixers</li>
                <li>BYOB friendly</li>
              </ul>
              <div className="xola-custom xola-checkout" data-button-id={XOLA_BUTTON_ID} data-xola-button="true" style={{ display: "inline-block" }}><button type="button" className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</button></div>
            </div>

            {/* Saturday AM */}
            <div className="disco-pricing-card">
              <div className="disco-pricing-card__badge">Most Popular</div>
              <div className="disco-pricing-card__slot">Saturday 11 AM&ndash;3 PM</div>
              <div className="disco-pricing-card__tagline">Peak energy, peak vibes</div>
              <div className="disco-pricing-card__price">$105/person</div>
              <div className="disco-pricing-card__total">$137.81 with tax + gratuity</div>
              <ul className="disco-pricing-card__includes">
                <li>Private cooler with ice</li>
                <li>Professional DJ</li>
                <li>Professional photographer</li>
                <li>Giant floats &amp; lily pads</li>
                <li>Party supplies &amp; mixers</li>
                <li>BYOB friendly</li>
              </ul>
              <div className="xola-custom xola-checkout" data-button-id={XOLA_BUTTON_ID} data-xola-button="true" style={{ display: "inline-block" }}><button type="button" className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</button></div>
            </div>

            {/* Saturday PM */}
            <div className="disco-pricing-card">
              <div className="disco-pricing-card__badge">Best Value</div>
              <div className="disco-pricing-card__slot">Saturday 3:30&ndash;7:30 PM</div>
              <div className="disco-pricing-card__tagline">Catch the sunset</div>
              <div className="disco-pricing-card__price">$85/person</div>
              <div className="disco-pricing-card__total">$111.56 with tax + gratuity</div>
              <ul className="disco-pricing-card__includes">
                <li>Private cooler with ice</li>
                <li>Professional DJ</li>
                <li>Professional photographer</li>
                <li>Giant floats &amp; lily pads</li>
                <li>Party supplies &amp; mixers</li>
                <li>BYOB friendly</li>
              </ul>
              <div className="xola-custom xola-checkout" data-button-id={XOLA_BUTTON_ID} data-xola-button="true" style={{ display: "inline-block" }}><button type="button" className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</button></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What's Included ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">What's Included</div>
        <h2 className="hp2-section__headline">
          Everything you need. <em>Nothing</em> you don't.
        </h2>

        <div className="disco-included-grid">
          <div className="disco-included-col">
            <div className="disco-included-col__title">Entertainment &amp; Atmosphere</div>
            <ul className="disco-included-col__list">
              <li>Professional DJ</li>
              <li>14 disco balls + LED lighting</li>
              <li>Dedicated dance floor</li>
              <li>Professional photographer</li>
              <li>Digital photo delivery</li>
              <li>Giant unicorn &amp; lily pad floats</li>
              <li>Party supplies + cups + koozies</li>
            </ul>
          </div>
          <div className="disco-included-col">
            <div className="disco-included-col__title">Comfort &amp; Essentials</div>
            <ul className="disco-included-col__list">
              <li>Private cooler with ice per group</li>
              <li>Mimosa supplies (juice + fruit)</li>
              <li>Ice water stations</li>
              <li>Clean restroom facilities</li>
              <li>Shaded deck areas</li>
              <li>Swim ladder + life jackets</li>
              <li>Experienced crew + licensed captain</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Who It's For ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Perfect For</div>
          <h2 className="hp2-section__headline">
            Built for bach parties. Loved by <em>everyone</em>.
          </h2>
          <p className="hp2-section__body">
            The ATX Disco Cruise is exclusively for bachelor and bachelorette groups &mdash; including combined parties. Multiple groups celebrate together on one boat for maximum energy.
          </p>

          <div className="disco-who-grid">
            <div className="disco-who-card">
              <h3 className="disco-who-card__title">Bachelorette Parties</h3>
              <p className="disco-who-card__desc">
                The ultimate send-off. Matching outfits, sashes, champagne, and a professional photographer to capture it all. Dance with your girls on a boat full of disco balls.
              </p>
            </div>
            <div className="disco-who-card">
              <h3 className="disco-who-card__title">Bachelor Parties</h3>
              <p className="disco-who-card__desc">
                Skip the predictable bar crawl. Get your crew on the water with a DJ, a swim stop, cold drinks, and the best party boat on Lake Travis.
              </p>
            </div>
            <div className="disco-who-card">
              <h3 className="disco-who-card__title">Combined Bach Parties</h3>
              <p className="disco-who-card__desc">
                Bride and groom celebrating together? Book the same time slot for both groups. It's one of the most popular ways to kick off a wedding weekend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">On The Water</div>
        <h2 className="hp2-section__headline">
          See it for <em>yourself</em>.
        </h2>

        <div className="hp2-gallery">
          <img src="/attached_assets/disco_fun_1765193453547.jpg" alt="ATX Disco Cruise party atmosphere on Lake Travis" loading="lazy" />
          <img src="/attached_assets/disco_fun2_1765193453547.jpg" alt="Disco dance party on Clever Girl boat" loading="lazy" />
          <img src="/attached_assets/disco_fun3_1765193453547.jpg" alt="Group celebrating on ATX Disco Cruise Lake Travis" loading="lazy" />
          <img src="/attached_assets/disco_fun5_1765193453548.jpg" alt="Dance floor party on Lake Travis party boat" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-1_1760080740012.jpg" alt="Professional DJ on ATX Disco Cruise" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-9_1760080740019.jpg" alt="Swimming at disco cruise Lake Travis cove" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-14_1760080740020.jpg" alt="Party group on Clever Girl flagship boat" loading="lazy" />
          <img src="/attached_assets/@capitalcityshots-25_1760080807866.jpg" alt="Sunset cruise on Lake Travis Austin" loading="lazy" />
        </div>
      </section>

      {/* ─── Private Charter Alternative ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Private Charters</div>
          <h2 className="hp2-section__headline">
            Want the boat all to <em>yourselves</em>?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#C8B898', maxWidth: '700px', lineHeight: 1.7, marginBottom: '2rem' }}>
            Love the Disco Cruise vibe but want a private experience? Charter Clever Girl or any of our boats exclusively for your group — your music, your route, your schedule. Available year-round. A <strong style={{ color: 'var(--hp2-gold)' }}>Private Disco Cruise</strong> is also available by special request for any event type (weddings, birthdays, corporate).
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
              <p style={{ fontSize: '0.75rem', color: '#A89878', marginTop: '0.75rem', lineHeight: 1.5 }}>Hard cap of 14 guests. Larger groups must upgrade.</p>
            </div>
            <div className="hp2-private-pricing__card">
              <div className="hp2-private-pricing__name">Meeseeks / The Irony</div>
              <div className="hp2-private-pricing__capacity">25–30 guests*</div>
              <div className="hp2-private-pricing__rate">$225–$425/hr</div>
              <div className="hp2-private-pricing__note">4-hour minimum · Year-round</div>
              <ul className="hp2-private-pricing__features">
                <li>Licensed captain &amp; crew</li>
                <li>Premium sound system</li>
                <li>Coolers with ice</li>
                <li>BYOB friendly</li>
                <li>Perfect for bach parties</li>
              </ul>
              <p style={{ fontSize: '0.75rem', color: '#A89878', marginTop: '0.75rem', lineHeight: 1.5 }}>*26–30 guests adds +$50/hr for a legally-required extra crew member, or upgrade to Clever Girl for more space.</p>
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
              <p style={{ fontSize: '0.75rem', color: '#A89878', marginTop: '0.75rem', lineHeight: 1.5 }}>No minimum, but best suited to groups of 30+.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Expandable Details ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Complete Details</div>
        <h2 className="hp2-section__headline">
          Everything about the <em>ATX Disco Cruise</em>.
        </h2>
        <div className="hp2-details-section">
          <button className="hp2-details-toggle" onClick={() => toggleDetails('included')}>
            <span>Complete Included Items</span>
            <span>{openDetails === 'included' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'included' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Every ATX Disco Cruise ticket includes a full 4-hour party experience on Lake Travis with no hidden fees. Tax and gratuity are included in the total price.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Entertainment and atmosphere:</strong></p>
              <ul>
                <li>Professional DJ playing for the full 4 hours</li>
                <li>Professional photographer with digital delivery in 2-3 weeks</li>
                <li>14 disco balls and LED dance floor lighting</li>
                <li>Dedicated dance floor on the water</li>
                <li>Giant 6x20-foot lily pad floats and unicorn floats</li>
                <li>Party cups, koozies, and party supplies</li>
              </ul>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Comfort and essentials:</strong></p>
              <ul>
                <li>Private cooler stocked with ice for your group</li>
                <li>Mimosa supplies (juice and fruit)</li>
                <li>Ice water stations</li>
                <li>Clean restroom facilities</li>
                <li>Shaded deck and lounge areas</li>
                <li>Swim ladder and life jackets in all sizes</li>
                <li>licensed, experienced captain and experienced crew</li>
              </ul>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('private')}>
            <span>Private Charter — Package Options</span>
            <span>{openDetails === 'private' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'private' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>Private charters give you exclusive use of any boat in our fleet with a dedicated captain and crew. Available year-round with a 4-hour minimum. Choose from Day Tripper (14 guests), Meeseeks (25-30), The Irony (25-30), or Clever Girl (50-75).</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Standard Package (included):</strong> Licensed captain, trained crew, premium Bluetooth sound system, large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), swim stop, BYOB.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Essentials Upgrade ($100–$200 flat):</strong> Enhanced party setup, mimosa supplies, towel service, SPF-50 sunscreen station.</p>
              <p><strong style={{ color: 'var(--hp2-cream)' }}>Ultimate Package ($250–$350 flat):</strong> Everything in Essentials plus premium decorations, custom accessories, priority boarding, and a dedicated event coordinator.</p>
            </div>
          </div>

          <button className="hp2-details-toggle" onClick={() => toggleDetails('checklist')}>
            <span>What to Bring — Complete Checklist</span>
            <span>{openDetails === 'checklist' ? '\u2212' : '+'}</span>
          </button>
          <div className={`hp2-details-content ${openDetails === 'checklist' ? 'hp2-details-content--open' : ''}`}>
            <div className="hp2-details-inner">
              <p>We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), sound systems, and all safety equipment. Here is what to bring for the best experience on Lake Travis.</p>
              <ul>
                <li>Sunscreen (SPF 50+ recommended, reef-safe preferred)</li>
                <li>Swimsuit and coverup</li>
                <li>Towel</li>
                <li>Sunglasses and a hat</li>
                <li>Flat shoes or sandals (no heels)</li>
                <li>Waterproof phone case (recommended for swim stop)</li>
                <li>BYOB drinks in cans or plastic (no glass)</li>
                <li>Snacks if desired, or use Party On Delivery</li>
                <li>Matching outfits and party accessories (encouraged)</li>
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
            {DISCO_FAQ_DATA.map((item, index) => (
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
      <CtaBanner source="discov2_mid" />

      <section className="hp2-final-cta">
        <h2 className="hp2-final-cta__headline">
          Ready to join the <em>party</em>?
        </h2>
        <p className="hp2-final-cta__body">
          The ATX Disco Cruise is Austin's most iconic party boat experience. DJ, photographer, dance floor, giant floats, and 4 hours on Lake Travis &mdash; all included. Grab your crew and book your spot.
        </p>
        <div className="hp2-final-cta__actions">
          <CtaPair source="discov2_final" />
          <a href="tel:+15124885892" className="hp2-final-cta__phone">(512) 488-5892</a>
        </div>
        <p className="hp2-final-cta__location">
          Anderson Mill Marina &middot; Lake Travis &middot; 25 min from downtown Austin
        </p>
      </section>

      {/* ─── Quick Links (SEO Internal Linking) ─── */}
      <section style={{ background: 'var(--hp2-bg-1)', padding: '3rem 4rem', borderTop: '1px solid var(--hp2-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', justifyContent: 'center' }}>
          <Link href="/"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Home</a></Link>
          <Link href="/bachelor-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelor Parties</a></Link>
          <Link href="/bachelorette-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelorette Parties</a></Link>
          <Link href="/combined-bachelor-bachelorette-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Combined Bach Parties</a></Link>
          <Link href="/private-cruises"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Private Charters</a></Link>
          <Link href="/pricing"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Pricing</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
          <Link href="/faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Full FAQ</a></Link>
          <Link href="/contact"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Contact Us</a></Link>
          <Link href="/blogs"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Blog</a></Link>
          <Link href="/blogs/atx-disco-cruise-experience"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Disco Cruise Experience</a></Link>
          <Link href="/blogs/the-top-dos-and-dont-for-success-on-the-atx-disco-cruise-with-premier-party-cruises"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Disco Cruise Dos & Don'ts</a></Link>
          <Link href="/wedding-parties"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Wedding Parties</a></Link>
          <Link href="/corporate-events"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Corporate Events</a></Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
