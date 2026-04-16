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

/* ─── Promise Grid (Why Lake Travis) ─────────────────────────── */
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

/* ─── Wedding Event Options (4-card grid) ────────────────────── */
.hp2-events-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.hp2-event-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease;
}

.hp2-event-card:hover {
  border-color: var(--hp2-gold);
}

.hp2-event-card__icon {
  font-size: 2rem;
  color: var(--hp2-gold);
  margin-bottom: 1.2rem;
}

.hp2-event-card__title {
  font-family: var(--hp2-font-display);
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--hp2-cream);
  margin-bottom: 0.8rem;
}

.hp2-event-card__desc {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  line-height: 1.65;
  flex: 1;
}

/* ─── Fleet Pricing Cards ────────────────────────────────────── */
.hp2-fleet-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid var(--hp2-border);
  margin-top: 2rem;
}

.hp2-fleet-card {
  padding: 2rem 1.5rem;
  border-right: 1px solid var(--hp2-border);
}

.hp2-fleet-card:last-child {
  border-right: none;
}

.hp2-fleet-card__img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border: 1px solid var(--hp2-border);
  margin-bottom: 1.2rem;
}

.hp2-fleet-card__name {
  font-family: var(--hp2-font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--hp2-cream);
  margin-bottom: 0.25rem;
}

.hp2-fleet-card__capacity {
  font-size: 0.85rem;
  color: var(--hp2-gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.hp2-fleet-card__rate {
  font-family: var(--hp2-font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--hp2-gold-light);
  margin-bottom: 0.25rem;
}

.hp2-fleet-card__note {
  font-size: 0.82rem;
  color: var(--hp2-text-muted);
  margin-bottom: 1rem;
}

.hp2-fleet-card__features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hp2-fleet-card__features li {
  padding: 0.35rem 0;
  font-size: 0.88rem;
  color: var(--hp2-cream-muted);
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
  .hp2-events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-fleet-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-fleet-card:nth-child(2) {
    border-right: none;
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
  .hp2-events-grid {
    grid-template-columns: 1fr;
  }
  .hp2-fleet-grid {
    grid-template-columns: 1fr;
  }
  .hp2-fleet-card {
    border-right: none;
    border-bottom: 1px solid var(--hp2-border);
  }
  .hp2-fleet-card:last-child {
    border-bottom: none;
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
    q: 'What is the best wedding venue on Lake Travis?',
    a: 'Premier Party Cruises offers a unique floating wedding venue experience on Lake Travis with stunning Hill Country views, crystal-clear water, and unforgettable sunsets. With 4 boats accommodating 14 to 75 guests, we host rehearsal dinners, welcome parties, wedding day cruises, and after parties. Our 4.9-star rating, 150,000+ guests since 2009, and full BYOB policy make us one of the most popular and distinctive wedding venues in the Austin area. Available year-round with professional crew and complete customization.'
  },
  {
    q: 'Can we have a rehearsal dinner on a boat on Lake Travis?',
    a: 'Absolutely! Rehearsal dinner cruises are one of our most popular wedding events. Gather your wedding party and close family for a 3-4 hour evening cruise timed to catch the stunning Lake Travis sunset. Our boats accommodate 14-75 guests with professional crew, premium sound systems, and complete BYOB service. We coordinate with Austin caterers for plated dinners, BBQ, family-style Italian, or any cuisine you prefer. Most rehearsal dinners run 5pm-9pm the evening before the wedding. Starting at $200/hour with a 4-hour minimum.'
  },
  {
    q: 'How many guests can a Lake Travis wedding boat hold?',
    a: 'We have 4 boats to match any wedding event size. Day Tripper holds up to 14 guests, perfect for intimate rehearsal dinners or elopement celebrations. Meeseeks accommodates 15-25 guests for mid-size wedding parties. The Irony fits 25-30 guests for larger rehearsal dinners. Our flagship Clever Girl holds 31-75 guests for full wedding receptions, welcome parties, and after parties. For weddings exceeding 75 guests, we can coordinate multi-boat events with boats departing together.'
  },
  {
    q: 'How much does a wedding event cruise on Lake Travis cost?',
    a: 'Wedding event cruises start at $200 per hour with a 4-hour minimum. Day Tripper (14 guests) ranges $200-$350/hr, Meeseeks (25 guests) $225-$375/hr, The Irony (30 guests) $250-$400/hr, and Clever Girl (75 guests) $250-$500/hr. A typical 4-hour rehearsal dinner or welcome party ranges from $800 to $2,000+ depending on boat and package selection. Multi-event discounts are available when you book two or more wedding weekend events together. All prices include captain, crew, sound system, coolers with ice, and BYOB service.'
  },
  {
    q: 'Is Lake Travis a good destination wedding location?',
    a: 'Lake Travis is an exceptional destination wedding location. Located just 25 minutes from downtown Austin, it offers stunning natural beauty with limestone cliffs, crystal-clear water, and legendary Texas sunsets. Austin provides world-class dining, live music, and nightlife for your guests to enjoy throughout the wedding weekend. The mild Central Texas climate allows year-round celebrations, and Lake Travis wedding boats offer a completely unique experience your guests will talk about for years. Many couples book a full weekend of events: Friday welcome party, Saturday wedding or reception cruise, and late-night after party.'
  },
  {
    q: 'Can we have a wedding ceremony on a boat?',
    a: 'Yes! We host wedding ceremonies on Lake Travis boats. The captain can anchor in a scenic cove surrounded by limestone cliffs for a breathtaking natural backdrop. Many couples choose a sunset ceremony for golden-hour lighting and dramatic sky colors. Our Clever Girl flagship accommodates up to 75 guests for the ceremony, with a sound system for music and officiant audio. You can also host just the reception on the water after a land-based ceremony. We work with your wedding planner to coordinate timing, decorations, and logistics.'
  },
  {
    q: 'Can we bring our own decorations and wedding cake on the boat?',
    a: 'Yes! Wedding decorations are welcome and encouraged on all private charters. Flowers, banners, garlands, table runners, custom signage, and themed decor are all welcome. Wedding cakes and dessert tables can be set up on board with stable, flat surfaces available. We recommend avoiding loose confetti and glitter (difficult to clean), but everything else is fair game. For larger setups, our crew can assist with boarding decorations and arranging the space. Many couples bring their florist to set up before guests arrive.'
  },
  {
    q: 'What time is sunset on Lake Travis for wedding photos?',
    a: 'Lake Travis sunsets are legendary and vary by season. In summer (June-August), sunset is around 8:15-8:45 PM. In spring and fall (March-May, September-November), sunset ranges from 6:30-7:45 PM. Winter sunsets (December-February) occur around 5:30-6:00 PM. For the best wedding photos, we recommend booking your cruise to be on the water 2 hours before sunset. Golden hour — the 45 minutes before sunset — produces the most stunning photos with warm light reflecting off the water and Hill Country cliffs.'
  },
  {
    q: 'Do you offer multi-event wedding weekend discounts?',
    a: 'Yes! We offer multi-event discounts when you book two or more events for your wedding weekend. Popular combinations include Friday welcome party + Saturday after party, rehearsal dinner + wedding day cruise, or a full three-event weekend package. Discounts range from 10-15% depending on the number of events and total booking value. Contact us at (512) 488-5892 to discuss your wedding weekend plans and receive a custom multi-event quote. Booking early secures your preferred dates and boats across the entire weekend.'
  },
  {
    q: 'What catering options are available for wedding cruises?',
    a: 'We coordinate with Austin\'s finest caterers and restaurants for your wedding event. Popular options include upscale BBQ from Salt Lick or County Line, elegant plated dinners, family-style Italian, taco bars, charcuterie and appetizer spreads, or fully customized menus from local favorites. Our Essentials package includes catering coordination and serving assistance. All cruises are fully BYOB — bring champagne, wine, beer, cocktail supplies, or any beverages. We provide coolers with ice, cups, and openers. Many couples bring their own wedding cake or desserts as well.'
  },
  {
    q: 'What is the alcohol policy for wedding events?',
    a: 'All wedding event cruises are fully BYOB (bring your own beverages). You can bring champagne, wine, beer, spirits, mixers, seltzers, and non-alcoholic beverages. Cans and plastic containers only — no glass for safety. We provide large coolers packed with ice, cups, and bottle openers on every cruise. Many couples bring champagne for toasts, wine for dinner, and a signature cocktail setup. You can also coordinate beverage delivery through our partners so everything is waiting on the boat when you arrive. All guests must be 21+ with valid ID for alcohol.'
  },
  {
    q: 'How far in advance should we book a wedding event cruise?',
    a: 'We recommend booking 3-6 months in advance for wedding events, especially during peak season (April through October) and for Saturday dates. Popular wedding weekends can book out quickly, particularly for Friday evening rehearsal dinners and Saturday night after parties. For multi-event wedding weekends, early booking ensures you secure your preferred boats and time slots across all events. However, we sometimes have last-minute availability — call (512) 488-5892 to check. Winter wedding events (November-February) typically have more flexibility.'
  },
  {
    q: 'Where do wedding event cruises depart from?',
    a: 'All wedding event cruises depart from Anderson Mill Marina on Lake Travis, located at 13993 FM 2769, Leander, TX 78641. The marina is approximately 25 minutes from downtown Austin — the closest Lake Travis marina to the city. Free parking is available. Many couples arrange shuttle service from their hotel block or wedding venue to the marina for their guests. We can provide transportation recommendations and coordinate timing with your wedding planner for seamless transitions between events.'
  },
  {
    q: 'Can we host a late-night wedding after party on the boat?',
    a: 'Yes! After party cruises are incredibly popular for wedding celebrations. Gather your closest 14-75 friends and family after the reception for a late-night cruise on Lake Travis. Most after parties run 10pm-2am with dancing under the stars, midnight champagne toasts, and the perfect finale to your wedding day. Our boats feature premium sound systems and party lighting for the ultimate celebration vibe. BYOB friendly — many couples bring leftover champagne and wine from the reception. Swimming under the stars is available weather permitting.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function WeddingV2() {
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
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "420", "bestRating": "5" },
            "priceRange": "$200-$500"
          },
          {
            "@type": "Service",
            "name": "Austin Wedding Boat Cruises on Lake Travis",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Austin wedding celebrations on Lake Travis. Rehearsal dinners, welcome parties, after parties, bridal showers, proposals. Private charters with stunning Hill Country sunset views.",
            "offers": { "@type": "AggregateOffer", "lowPrice": "200", "highPrice": "500", "priceCurrency": "USD" }
          },
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
            poster="/attached_assets/clever-girl-4-wedding-venue.jpg"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">Wedding Events &middot; Lake Travis Since 2009</p>
          <h1 className="hp2-hero__headline">
            Austin's most <em>unforgettable</em> wedding venue.
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            Rehearsal dinners, welcome parties, wedding day cruises, and after parties on Lake Travis. Four premium boats for 14 to 75 guests with stunning sunsets and BYOB service.
          </p>
          <div className="hp2-hero__ctas">
            <Link href="/contact">
              <a className="hp2-btn hp2-btn--primary">Plan Your Wedding Event &rarr;</a>
            </Link>
            <a href="#fleet" className="hp2-btn hp2-btn--outline">View Our Fleet</a>
          </div>
        </div>

        <div className="hp2-hero__scroll" />
      </section>

      {/* ─── Trust Bar ─── */}
      <div className="hp2-trust">
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#10022;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">150K+ Guests</span>
            <span className="hp2-trust__sub">Austin's #1 since 2009</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9672;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Stunning Sunsets</span>
            <span className="hp2-trust__sub">Hill Country backdrop</span>
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
            <span className="hp2-trust__label">Year-Round</span>
            <span className="hp2-trust__sub">All 12 months available</span>
          </div>
        </div>
      </div>

      {/* ─── Wedding Event Options ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Wedding Event Options</div>
          <h2 className="hp2-section__headline">
            Your entire wedding weekend, <em>on the water</em>.
          </h2>

          <div className="hp2-events-grid">
            <div className="hp2-event-card">
              <div className="hp2-event-card__icon">&#9826;</div>
              <h3 className="hp2-event-card__title">Welcome Party</h3>
              <p className="hp2-event-card__desc">
                Kick off your wedding weekend with a Friday evening cruise for out-of-town guests. The perfect icebreaker as both families mingle on Lake Travis with sunset views and relaxed vibes. Typically 5-9 PM.
              </p>
            </div>

            <div className="hp2-event-card">
              <div className="hp2-event-card__icon">&#9830;</div>
              <h3 className="hp2-event-card__title">Rehearsal Dinner</h3>
              <p className="hp2-event-card__desc">
                An intimate pre-wedding dinner on the water. Gather your wedding party and closest family for toasts, stories, and a catered dinner as the sun sets over the Hill Country. Typically 15-40 guests.
              </p>
            </div>

            <div className="hp2-event-card">
              <div className="hp2-event-card__icon">&#10022;</div>
              <h3 className="hp2-event-card__title">Wedding Day Cruise</h3>
              <p className="hp2-event-card__desc">
                Host your ceremony or reception on the water. Exchange vows anchored in a scenic cove or dance the night away with up to 75 guests on our flagship Clever Girl. Completely customizable.
              </p>
            </div>

            <div className="hp2-event-card">
              <div className="hp2-event-card__icon">&#9734;</div>
              <h3 className="hp2-event-card__title">After Party</h3>
              <p className="hp2-event-card__desc">
                Don't let the night end! Gather your closest friends for a late-night celebration cruise. Dancing under the stars, midnight champagne, and the perfect finale to your wedding day. Typically 10 PM-2 AM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Fleet ─── */}
      <section className="hp2-section" id="fleet">
        <div className="hp2-section__label">Our Fleet</div>
        <h2 className="hp2-section__headline">
          Four boats for every <em>wedding</em> event.
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#C8B898', maxWidth: '700px', lineHeight: 1.7, marginBottom: '2rem' }}>
          From intimate rehearsal dinners to full wedding receptions, our fleet accommodates 14 to 75 guests. All boats include a licensed captain, crew, premium sound system, coolers with ice, and BYOB service. 4-hour minimum.
        </p>

        <div className="hp2-fleet-grid">
          <div className="hp2-fleet-card">
            <img
              className="hp2-fleet-card__img"
              src="/attached_assets/day-tripper-14-person-boat.jpg"
              alt="Day Tripper 14-person wedding boat Lake Travis"
              loading="lazy"
            />
            <div className="hp2-fleet-card__name">Day Tripper</div>
            <div className="hp2-fleet-card__capacity">Up to 14 guests</div>
            <div className="hp2-fleet-card__rate">$200-$350/hr</div>
            <div className="hp2-fleet-card__note">4-hour minimum · Year-round</div>
            <ul className="hp2-fleet-card__features">
              <li>Intimate elopement celebrations</li>
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice · BYOB</li>
            </ul>
          </div>

          <div className="hp2-fleet-card">
            <img
              className="hp2-fleet-card__img"
              src="/attached_assets/meeseeks-25-person-boat.jpg"
              alt="Meeseeks 25-person wedding party boat Lake Travis"
              loading="lazy"
            />
            <div className="hp2-fleet-card__name">Meeseeks</div>
            <div className="hp2-fleet-card__capacity">15-25 guests</div>
            <div className="hp2-fleet-card__rate">$225-$375/hr</div>
            <div className="hp2-fleet-card__note">4-hour minimum · Year-round</div>
            <ul className="hp2-fleet-card__features">
              <li>Perfect rehearsal dinners</li>
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice · BYOB</li>
            </ul>
          </div>

          <div className="hp2-fleet-card">
            <img
              className="hp2-fleet-card__img"
              src="/attached_assets/meeseeks-25-person-boat.jpg"
              alt="The Irony 30-person wedding event boat Lake Travis"
              loading="lazy"
            />
            <div className="hp2-fleet-card__name">The Irony</div>
            <div className="hp2-fleet-card__capacity">25-30 guests</div>
            <div className="hp2-fleet-card__rate">$250-$400/hr</div>
            <div className="hp2-fleet-card__note">4-hour minimum · Year-round</div>
            <ul className="hp2-fleet-card__features">
              <li>Mid-size wedding events</li>
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice · BYOB</li>
            </ul>
          </div>

          <div className="hp2-fleet-card">
            <img
              className="hp2-fleet-card__img"
              src="/attached_assets/clever-girl-4-wedding-venue.jpg"
              alt="Clever Girl 75-person wedding venue boat Lake Travis"
              loading="lazy"
            />
            <div className="hp2-fleet-card__name">Clever Girl</div>
            <div className="hp2-fleet-card__capacity">31-75 guests</div>
            <div className="hp2-fleet-card__rate">$250-$500/hr</div>
            <div className="hp2-fleet-card__note">4-hour minimum · 14 disco balls</div>
            <ul className="hp2-fleet-card__features">
              <li>Full wedding receptions</li>
              <li>Dance floor + LED lighting</li>
              <li>Giant Texas flag · Flagship</li>
              <li>Coolers with ice · BYOB</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Why Lake Travis for Weddings ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Why Lake Travis for Weddings</div>
          <h2 className="hp2-section__headline">
            A wedding venue unlike <em>any other</em>.
          </h2>

          <div className="hp2-promise-grid">
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">01</div>
              <div className="hp2-promise-card__title">Stunning Backdrop</div>
              <div className="hp2-promise-card__desc">Crystal-clear water, limestone cliffs, and legendary Texas sunsets create a natural setting that no ballroom or banquet hall can match. Golden-hour photos on the water are unforgettable.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">02</div>
              <div className="hp2-promise-card__title">Unique &amp; Memorable</div>
              <div className="hp2-promise-card__desc">Your guests will remember a Lake Travis wedding cruise for years. Dancing on the water, toasting at sunset, swimming in hidden coves — it is an experience no traditional venue can offer.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">03</div>
              <div className="hp2-promise-card__title">Professional Service</div>
              <div className="hp2-promise-card__desc">USCG-certified captains, trained crew, premium sound systems, and 15+ years of event experience. We coordinate with your caterer, florist, and wedding planner to handle every detail.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">04</div>
              <div className="hp2-promise-card__title">Weekend Packages</div>
              <div className="hp2-promise-card__desc">Book multiple events across your wedding weekend and save. Welcome party Friday, rehearsal dinner Saturday morning, after party Saturday night — we coordinate the entire weekend on the water.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Gallery</div>
        <h2 className="hp2-section__headline">
          Real wedding celebrations on <em>Lake Travis</em>.
        </h2>
        <div className="hp2-gallery">
          <img src="/attached_assets/clever-girl-4-wedding-venue.jpg" alt="Wedding venue on Clever Girl boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/clever-girl-8-wedding-reception.jpg" alt="Wedding reception cruise on Lake Travis Austin" loading="lazy" />
          <img src="/attached_assets/clever-girl-5-dance-floor.jpg" alt="Dance floor wedding party boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/clever-girl-6-interior-seating.jpg" alt="Interior seating wedding event boat Austin" loading="lazy" />
          <img src="/attached_assets/clever-girl-7-flagship-boat.jpg" alt="Clever Girl flagship wedding boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/clever-girl-1-lake-travis-party-boat.jpg" alt="Lake Travis wedding party boat" loading="lazy" />
          <img src="/attached_assets/lakeside-restaurant-sunset.jpg" alt="Sunset over Lake Travis perfect for wedding photos" loading="lazy" />
          <img src="/attached_assets/clever-girl-2-party-boat-austin.jpg" alt="Austin wedding boat cruise on Lake Travis" loading="lazy" />
        </div>
      </section>

      {/* ─── Expandable Details ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Complete Details</div>
          <h2 className="hp2-section__headline">
            Everything about your <em>wedding</em> on the water.
          </h2>
          <div className="hp2-details-section">
            <button className="hp2-details-toggle" onClick={() => toggleDetails('catering')}>
              <span>Catering Coordination &amp; Food Service</span>
              <span>{openDetails === 'catering' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'catering' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>We coordinate with Austin's best caterers and restaurants to create the perfect dining experience for your wedding event. Our crew assists with food setup, serving logistics, and cleanup so you can focus on celebrating.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Popular catering options:</strong></p>
                <ul>
                  <li>Upscale BBQ from Salt Lick, County Line, or Micklethwait</li>
                  <li>Elegant plated dinners from local fine dining restaurants</li>
                  <li>Family-style Italian, Mexican, or Tex-Mex spreads</li>
                  <li>Taco bars, slider stations, and appetizer platters</li>
                  <li>Charcuterie boards and grazing tables</li>
                  <li>Wedding cake, cupcakes, and dessert displays</li>
                  <li>Late-night bites: tacos, pizza, sliders for after parties</li>
                </ul>
                <p>All cruises are fully BYOB. We provide large coolers packed with ice, cups, and openers. Beverage delivery coordination is available so your drinks are on the boat before you arrive.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('decorations')}>
              <span>Decoration Policies &amp; Setup</span>
              <span>{openDetails === 'decorations' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'decorations' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>We welcome wedding decorations on all private charters. Your florist, planner, or wedding party can board early to set up before guests arrive.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Welcome on board:</strong></p>
                <ul>
                  <li>Fresh flowers, centerpieces, and garlands</li>
                  <li>Banners, signage, and custom monograms</li>
                  <li>Table runners, linens, and place settings</li>
                  <li>String lights and candles (battery-operated recommended)</li>
                  <li>Wedding cake and dessert table setup</li>
                  <li>Photo backdrops and props</li>
                  <li>Balloons, streamers, and themed decor</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Please avoid:</strong> Loose confetti, glitter, rice, or birdseed (difficult to clean and can affect boat equipment). Tape or adhesives that may damage surfaces. Open-flame candles (battery-operated alternatives welcome).</p>
                <p>Our crew assists with loading decorations at the marina and can help with basic setup. For elaborate setups, we recommend arriving 30-45 minutes before your event start time.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('multievent')}>
              <span>Multi-Event Wedding Weekend Discounts</span>
              <span>{openDetails === 'multievent' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'multievent' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Book two or more wedding weekend events together and save 10-15% on your total. We coordinate boat assignments, timing, and crew across your entire celebration weekend.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Popular multi-event packages:</strong></p>
                <ul>
                  <li>Welcome Party (Friday) + After Party (Saturday) — save 10%</li>
                  <li>Rehearsal Dinner (Friday) + After Party (Saturday) — save 10%</li>
                  <li>Welcome Party + Rehearsal Dinner + After Party — save 15%</li>
                  <li>Full Weekend: Welcome Party + Wedding Day Cruise + After Party — save 15%</li>
                </ul>
                <p>Multi-event packages include a dedicated event coordinator who manages logistics across all your wedding weekend cruises. We handle boat scheduling, crew assignments, catering coordination timing, and marina logistics so transitions between events are seamless.</p>
                <p>Call <a href="tel:+15124885892" style={{ color: 'var(--hp2-gold-light)' }}>(512) 488-5892</a> for a custom multi-event quote tailored to your wedding weekend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Questions &amp; Answers</div>
        <h2 className="hp2-section__headline">
          Everything you need to know about <em>wedding events</em>.
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
          Ready to plan your <em>Lake Travis wedding</em>?
        </h2>
        <p className="hp2-final-cta__body">
          From intimate rehearsal dinners to full wedding receptions, our team has hosted thousands of celebrations since 2009. Call us to discuss your vision and receive a custom quote.
        </p>
        <div className="hp2-final-cta__actions">
          <Link href="/contact">
            <a className="hp2-btn hp2-btn--primary">Plan Your Wedding Event &rarr;</a>
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
          <Link href="/private-cruises"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Private Charters</a></Link>
          <Link href="/rehearsal-dinner"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Rehearsal Dinners</a></Link>
          <Link href="/rehearsal-dinner-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Rehearsal Dinner Cruise</a></Link>
          <Link href="/welcome-party"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Welcome Parties</a></Link>
          <Link href="/after-party"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>After Parties</a></Link>
          <Link href="/bridal-shower-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bridal Showers</a></Link>
          <Link href="/engagement-party-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Engagement Parties</a></Link>
          <Link href="/proposal-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Proposal Cruises</a></Link>
          <Link href="/anniversary-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Anniversary Cruises</a></Link>
          <Link href="/bachelorette-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelorette Parties</a></Link>
          <Link href="/bachelor-party-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Bachelor Parties</a></Link>
          <Link href="/blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Wedding Boat Guide</a></Link>
          <Link href="/wedding-anniversary-celebration-ideas"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Anniversary Ideas</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
          <Link href="/contact"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Contact Us</a></Link>
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
