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

/* ─── Promise Grid (4 cards) ────────────────────────────────── */
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

/* ─── Fleet / Pricing Grid ──────────────────────────────────── */
.hp2-private-pricing {
  margin-top: 4rem;
}
.hp2-private-pricing__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  content: '\\2713';
  position: absolute;
  left: 0;
  color: var(--hp2-gold);
  font-size: 0.8rem;
}

/* ─── Experience Cards (solutions) ──────────────────────────── */
.hp2-solutions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.hp2-solution-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.8rem 2rem;
  display: flex;
  flex-direction: column;
}

.hp2-solution-card__icon {
  font-size: 2rem;
  margin-bottom: 1.2rem;
  color: var(--hp2-gold);
}

.hp2-solution-card__title {
  font-family: var(--hp2-font-display);
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--hp2-cream);
  margin-bottom: 0.8rem;
}

.hp2-solution-card__desc {
  font-size: 0.95rem;
  color: var(--hp2-text-muted);
  line-height: 1.65;
  flex: 1;
}

/* ─── Photo Gallery ─────────────────────────────────────────── */
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

/* ─── Expandable Details ────────────────────────────────────── */
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
  .hp2-solutions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hp2-private-pricing__grid {
    grid-template-columns: repeat(2, 1fr);
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
  .hp2-solutions-grid {
    grid-template-columns: 1fr;
  }
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
    q: 'What is the best corporate event venue in Austin?',
    a: 'Premier Party Cruises on Lake Travis is Austin\'s top-rated corporate event venue with a 4.9-star rating and over 150,000 guests served. Unlike traditional hotel ballrooms or conference centers, a Lake Travis cruise offers a unique, distraction-free environment where your team genuinely connects. Our fleet of 4 boats accommodates 14 to 75 guests with licensed captains, premium sound systems, and full BYOB options. Corporate clients consistently tell us it is the most talked-about event their company has ever hosted.'
  },
  {
    q: 'How much does a corporate boat event cost in Austin?',
    a: 'Corporate charters start at $200 per hour with a 4-hour minimum. Pricing varies by boat size: Day Tripper (up to 14 guests) runs From $200/hr, Meeseeks or The Irony (25-30 guests) runs From $225/hr, and Clever Girl (50-75 guests) runs From $250/hr. All rates include a licensed captain and crew. For a typical 4-hour corporate event for 30 people, expect $900-$1,700 total before catering. We can provide detailed quotes and work within most corporate event budgets.'
  },
  {
    q: 'Is a boat party appropriate for a corporate event?',
    a: 'Absolutely. Our corporate events range from casual team-building outings to formal client dinners and executive retreats. The atmosphere is entirely what you make it. Many Fortune 500 companies, law firms, tech startups, and financial institutions choose Premier Party Cruises for their corporate events. The boat provides a contained, professional environment free from the distractions of a bar or restaurant, and the Lake Travis scenery creates an impressive backdrop that elevates any business gathering.'
  },
  {
    q: 'How do I plan a corporate retreat on Lake Travis?',
    a: 'Start by calling us at (512) 488-5892 or submitting an inquiry through our website. Our team will learn your goals, headcount, budget, and preferred date, then recommend the best boat, time, and package. We handle all logistics including catering coordination, AV setup, and custom itinerary planning. Most corporate clients book 4-6 weeks in advance, though we can accommodate shorter timelines. We will provide a detailed proposal with pricing, timeline, and all inclusions for your internal approval process.'
  },
  {
    q: 'What team building activities can we do on the boat?',
    a: 'Lake Travis cruises naturally encourage connection and collaboration. Popular team-building activities include swimming in crystal-clear coves, relay races on giant lily pad floats, group trivia and icebreakers, collaborative playlist building, team photo challenges, and informal networking during scenic cruising. The swim stop in a secluded cove is often the highlight, with team members bonding in a relaxed, beautiful environment. For structured programs, we can coordinate with third-party facilitators who bring custom activities aboard.'
  },
  {
    q: 'Can we get food catered on the boat?',
    a: 'Yes. While our boats are BYOB for beverages, we coordinate catering for corporate events through our network of trusted Austin caterers. Options range from casual BBQ and taco bars to upscale plated meals. Food can be delivered directly to the boat before departure. Many corporate groups order from local favorites like Salt Lick BBQ, Torchy\'s Tacos, or premium catering services. We also have a food and beverage delivery partner, Party On Delivery, who can handle everything so it is ready when you board.'
  },
  {
    q: 'Can we give presentations or speeches on the boat?',
    a: 'Yes. Every boat in our fleet is equipped with a premium Bluetooth sound system that supports wireless microphone connectivity and audio input from laptops or phones. Clever Girl, our flagship 50-75 person vessel, has the most robust setup and is popular for corporate presentations, awards ceremonies, and executive speeches. The captain can anchor the boat for a calm, stable environment during any formal program. We recommend scheduling speeches during the first or last hour of your cruise when the boat is cruising smoothly.'
  },
  {
    q: 'Do you offer corporate invoicing and group billing?',
    a: 'Yes. We provide corporate invoicing with Net-15 and Net-30 payment terms for qualifying organizations. We can issue W-9 documentation, provide itemized invoices for expense reporting, and work with your accounts payable process. For recurring corporate clients, we offer preferred pricing and priority booking. Contact us at (512) 488-5892 to discuss corporate billing arrangements and request a formal quote for your event.'
  },
  {
    q: 'How many people can you accommodate for a corporate event?',
    a: 'Our fleet accommodates corporate groups from 14 to 75 guests on a single boat. Day Tripper handles intimate executive gatherings of up to 14 people. Meeseeks and The Irony are ideal for mid-size teams of 25-30 people. Clever Girl, our flagship vessel, hosts large corporate events of 50-75 guests with a dance floor, expansive deck space, and premium amenities. For groups larger than 75, we can coordinate multi-boat events where your team cruises together in a flotilla.'
  },
  {
    q: 'Are corporate events available year-round?',
    a: 'Yes. Private corporate charters are available 365 days a year. Lake Travis enjoys a mild Central Texas climate with warm weather from March through November and comfortable conditions even in winter months. Many companies book holiday parties in December, Q1 kickoffs in January, and end-of-fiscal-year celebrations throughout the year. The fall months (September through November) are especially popular for corporate events due to comfortable temperatures and stunning fall foliage along the lake.'
  },
  {
    q: 'What makes a boat event better than a traditional corporate venue?',
    a: 'Three things: engagement, exclusivity, and memorability. On a boat, there are no attendees slipping away to check email in the lobby or leaving early. Your team is fully present in a stunning natural environment. The lake setting creates organic conversation starters and breaks down hierarchical barriers in ways a conference room never can. Our corporate clients report significantly higher attendance rates and employee satisfaction scores compared to traditional offsite events. Plus, at $200/hour starting price, it is often more affordable than renting a premium venue.'
  },
  {
    q: 'What is included with a corporate charter?',
    a: 'Every corporate charter includes a USCG-licensed captain, trained crew, premium Bluetooth sound system, large coolers (bring your own ice, or order pre-iced from Party On Delivery), swim stop in a scenic Lake Travis cove, swim ladder and life jackets, and clean restroom facilities. The entire boat is exclusively yours for the duration. You control the music, schedule, route, and activities. BYOB is included on every charter. Optional add-ons include catering coordination, enhanced party packages, towel service, and dedicated event planning support.'
  },
  {
    q: 'Where do you depart from and how far is it from downtown Austin?',
    a: 'All corporate charters depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. We are the closest Lake Travis marina to downtown Austin, approximately 25 minutes away. Free parking is available at the marina. For corporate groups, we recommend arranging shared transportation such as a charter bus or van service. We can provide transportation recommendations and coordinate timing so your group arrives together and boards efficiently.'
  },
  {
    q: 'Can we bring our own alcohol for a corporate event?',
    a: 'Yes. All Premier Party Cruises are fully BYOB. You can bring beer, wine, spirits, seltzers, mixers, and non-alcoholic beverages in cans or plastic containers (no glass for safety). We provide large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every charter. Many corporate groups use our delivery partner, Party On Delivery, to have beverages and food waiting on the boat when they arrive. For corporate events where alcohol liability is a concern, we recommend designating a drink coordinator within your team and ensuring all guests are 21+ with valid ID.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function CorporateV2() {
  
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
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "420", "bestRating": "5" },
            "priceRange": "$200-$500"
          },
          {
            "@type": "Service",
            "name": "Austin Corporate Events on Lake Travis",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Austin corporate event venue on Lake Travis. Private party boat charters for team building, client entertainment, company milestones, holiday parties. 14-75 guests. Trusted by Fortune 500 companies.",
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
            poster="/attached_assets/clever-girl-50-person-boat.webp"
          >
            <source src="/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4" type="video/mp4" />
          </video>
          <div className="hp2-hero__overlay" />
        </div>

        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">Corporate Events &middot; Lake Travis</p>
          <h1 className="hp2-hero__headline">
            Austin's most <em>memorable</em> corporate venue.
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            Team building, client entertainment, and company milestones on Lake Travis. Four boats, licensed captains, and 15+ years of flawless corporate events from $200/hr.
          </p>
          <div className="hp2-hero__ctas">
            <Link href="/contact">
              <a className="hp2-btn hp2-btn--primary">Plan Your Event &rarr;</a>
            </Link>
            <a href="#fleet" className="hp2-btn hp2-btn--outline">See Our Fleet</a>
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
            <span className="hp2-trust__label">Year-Round</span>
            <span className="hp2-trust__sub">365 days a year availability</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9678;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">4.9 Stars</span>
            <span className="hp2-trust__sub">Highest-rated on Lake Travis</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9733;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Up to 75 Guests</span>
            <span className="hp2-trust__sub">Fleet of 4 boats</span>
          </div>
        </div>
        <div className="hp2-trust__item">
          <span className="hp2-trust__icon">&#9671;</span>
          <div className="hp2-trust__text">
            <span className="hp2-trust__label">Professional Crew</span>
            <span className="hp2-trust__sub">Licensed captains &amp; trained staff</span>
          </div>
        </div>
      </div>

      {/* ─── Corporate Event Solutions ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Corporate Event Solutions</div>
          <h2 className="hp2-section__headline">
            Four ways to bring your <em>team</em> together.
          </h2>

          <div className="hp2-solutions-grid">
            <div className="hp2-solution-card">
              <div className="hp2-solution-card__icon">&#9881;</div>
              <div className="hp2-solution-card__title">Team Building</div>
              <div className="hp2-solution-card__desc">
                Break down silos and build real connections. Swimming in crystal-clear coves, group activities on deck, and a shared experience your team will talk about for months. No trust falls required.
              </div>
            </div>
            <div className="hp2-solution-card">
              <div className="hp2-solution-card__icon">&#9830;</div>
              <div className="hp2-solution-card__title">Client Entertainment</div>
              <div className="hp2-solution-card__desc">
                Impress prospects and deepen client relationships on a private Lake Travis cruise. The stunning scenery and exclusive atmosphere create the perfect backdrop for building business over drinks and conversation.
              </div>
            </div>
            <div className="hp2-solution-card">
              <div className="hp2-solution-card__icon">&#9733;</div>
              <div className="hp2-solution-card__title">Company Milestones</div>
              <div className="hp2-solution-card__desc">
                Celebrate product launches, funding rounds, IPOs, anniversaries, and quarterly wins in style. Award ceremonies, toasts, and speeches with the Texas Hill Country as your backdrop.
              </div>
            </div>
            <div className="hp2-solution-card">
              <div className="hp2-solution-card__icon">&#10084;</div>
              <div className="hp2-solution-card__title">Employee Appreciation</div>
              <div className="hp2-solution-card__desc">
                Show your team they matter. BYOB sunset cruises, holiday parties, summer outings, and end-of-year celebrations. The kind of perk that actually boosts morale and retention.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Fleet ─── */}
      <section className="hp2-section" id="fleet">
        <div className="hp2-section__label">Our Fleet</div>
        <h2 className="hp2-section__headline">
          Four boats for every <em>size</em> event.
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#C8B898', maxWidth: '700px', lineHeight: 1.7, marginBottom: '2rem' }}>
          From intimate executive dinners to full-company outings, our fleet covers groups of 14 to 75 guests. Every boat includes a licensed captain, trained crew, premium sound, and all the amenities.
        </p>
        <div className="hp2-private-pricing__grid">
          <div className="hp2-private-pricing__card">
            <div className="hp2-private-pricing__name">Day Tripper</div>
            <div className="hp2-private-pricing__capacity">Up to 14 guests</div>
            <div className="hp2-private-pricing__rate">From $200/hr</div>
            <div className="hp2-private-pricing__note">4-hour minimum &middot; Year-round</div>
            <ul className="hp2-private-pricing__features">
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice</li>
              <li>BYOB friendly</li>
              <li>Ideal for executive outings</li>
            </ul>
          </div>
          <div className="hp2-private-pricing__card">
            <div className="hp2-private-pricing__name">Meeseeks</div>
            <div className="hp2-private-pricing__capacity">25-30 guests</div>
            <div className="hp2-private-pricing__rate">From $225/hr</div>
            <div className="hp2-private-pricing__note">4-hour minimum &middot; Year-round</div>
            <ul className="hp2-private-pricing__features">
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice</li>
              <li>BYOB friendly</li>
              <li>Perfect for department teams</li>
            </ul>
          </div>
          <div className="hp2-private-pricing__card">
            <div className="hp2-private-pricing__name">The Irony</div>
            <div className="hp2-private-pricing__capacity">25-30 guests</div>
            <div className="hp2-private-pricing__rate">From $225/hr</div>
            <div className="hp2-private-pricing__note">4-hour minimum &middot; Year-round</div>
            <ul className="hp2-private-pricing__features">
              <li>Licensed captain &amp; crew</li>
              <li>Premium sound system</li>
              <li>Coolers with ice</li>
              <li>BYOB friendly</li>
              <li>Great for mid-size groups</li>
            </ul>
          </div>
          <div className="hp2-private-pricing__card">
            <div className="hp2-private-pricing__name">Clever Girl</div>
            <div className="hp2-private-pricing__capacity">50-75 guests</div>
            <div className="hp2-private-pricing__rate">From $250/hr</div>
            <div className="hp2-private-pricing__note">4-hour minimum &middot; Flagship vessel</div>
            <ul className="hp2-private-pricing__features">
              <li>Licensed captain &amp; crew</li>
              <li>14 disco balls + LED lighting</li>
              <li>Full dance floor</li>
              <li>BYOB friendly</li>
              <li>Austin's premier event boat</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── The Corporate Experience ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">The Corporate Experience</div>
          <h2 className="hp2-section__headline">
            From first call to <em>flawless</em> execution.
          </h2>

          <div className="hp2-promise-grid">
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">01</div>
              <div className="hp2-promise-card__title">Tell Us Your Goals</div>
              <div className="hp2-promise-card__desc">Share your headcount, budget, objectives, and preferred date. Team building? Client dinner? Holiday party? We have done it all.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">02</div>
              <div className="hp2-promise-card__title">We Build Your Plan</div>
              <div className="hp2-promise-card__desc">We recommend the ideal boat, itinerary, catering partners, and any add-ons. You receive a detailed proposal with transparent pricing.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">03</div>
              <div className="hp2-promise-card__title">Everything Is Handled</div>
              <div className="hp2-promise-card__desc">Catering coordination, AV setup, beverage delivery, boarding logistics. Show up and your event is ready to go. Zero stress.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">04</div>
              <div className="hp2-promise-card__title">Your Team Connects</div>
              <div className="hp2-promise-card__desc">Crystal-clear swimming, sunset views, great food and drinks, and real conversation. The kind of event people actually want to attend.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">On the Water</div>
        <h2 className="hp2-section__headline">
          See what your event looks <em>like</em>.
        </h2>
        <div className="hp2-gallery">
          <img src="/attached_assets/clever-girl-1-lake-travis-party-boat.jpg" alt="Corporate event on Clever Girl party boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/clever-girl-2-party-boat-austin.jpg" alt="Corporate group on Lake Travis party boat Austin" loading="lazy" />
          <img src="/attached_assets/clever-girl-4-wedding-venue.jpg" alt="Deck setup for corporate event on Lake Travis boat" loading="lazy" />
          <img src="/attached_assets/clever-girl-5-dance-floor.jpg" alt="Dance floor on Clever Girl for corporate celebrations" loading="lazy" />
          <img src="/attached_assets/clever-girl-6-interior-seating.jpg" alt="Interior seating area for corporate meetings on boat" loading="lazy" />
          <img src="/attached_assets/clever-girl-7-flagship-boat.jpg" alt="Clever Girl flagship corporate event boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/clever-girl-8-wedding-reception.jpg" alt="Corporate reception setup on Lake Travis party boat" loading="lazy" />
          <img src="/attached_assets/clever-girl-3-bachelorette-boat.jpg" alt="Group celebrating on Premier Party Cruises boat" loading="lazy" />
        </div>
      </section>

      {/* ─── Expandable Details ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Complete Details</div>
          <h2 className="hp2-section__headline">
            Everything about your <em>corporate</em> event.
          </h2>
          <div className="hp2-details-section">
            <button className="hp2-details-toggle" onClick={() => toggleDetails('catering')}>
              <span>Catering Options &amp; Food Service</span>
              <span>{openDetails === 'catering' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'catering' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>While our boats are BYOB for beverages, we coordinate full catering for corporate events through our network of trusted Austin restaurants and caterers. Food is delivered directly to the boat before departure.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Popular corporate catering options:</strong></p>
                <ul>
                  <li>BBQ platters from top Austin pitmasters</li>
                  <li>Taco bars and Tex-Mex spreads</li>
                  <li>Upscale charcuterie and appetizer boards</li>
                  <li>Plated dinners for formal events</li>
                  <li>Breakfast and brunch for morning cruises</li>
                  <li>Dessert and celebration cakes</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Beverage coordination:</strong></p>
                <ul>
                  <li>BYOB — bring your own beer, wine, spirits, seltzers (no glass)</li>
                  <li>Party On Delivery partner can have everything on the boat when you arrive</li>
                  <li>We provide large coolers (bring your own ice, or order pre-iced from Party On Delivery) on every charter</li>
                  <li>Non-alcoholic options always welcome</li>
                </ul>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('av')}>
              <span>AV &amp; Sound Capabilities</span>
              <span>{openDetails === 'av' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'av' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Every boat in our fleet is equipped with premium audio systems suitable for corporate presentations, speeches, background music, and celebrations.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Audio &amp; presentation features:</strong></p>
                <ul>
                  <li>Premium Bluetooth sound system on all boats</li>
                  <li>Wireless microphone connectivity for speeches and toasts</li>
                  <li>Audio input from laptops, phones, and tablets</li>
                  <li>Volume control for background music during networking</li>
                  <li>Captain can anchor for stable, calm presentation environment</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Clever Girl (50-75 guests) additional features:</strong></p>
                <ul>
                  <li>Full professional sound system with multiple speaker zones</li>
                  <li>14 disco balls and LED lighting (adjustable or off for formal events)</li>
                  <li>Dedicated dance floor area doubles as presentation space</li>
                  <li>Expansive deck space for standing presentations or awards</li>
                </ul>
                <p>For presentations requiring a projector or screen, we recommend scheduling your presentation segment during the first or last hour of the cruise when ambient light is lower (especially sunset cruises).</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('pricing')}>
              <span>Pricing Breakdown &amp; Corporate Billing</span>
              <span>{openDetails === 'pricing' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'pricing' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>All corporate charters have a 4-hour minimum with transparent, straightforward pricing. Captain and crew fees are included in the hourly rates.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Fleet pricing:</strong></p>
                <ul>
                  <li>Day Tripper (up to 14 guests): From $200/hr</li>
                  <li>Meeseeks (25-30 guests): From $225/hr</li>
                  <li>The Irony (25-30 guests): From $225/hr</li>
                  <li>Clever Girl (50-75 guests): From $250/hr</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>What is included:</strong></p>
                <ul>
                  <li>USCG-licensed captain and trained crew</li>
                  <li>Premium Bluetooth sound system</li>
                  <li>Large coolers (bring your own ice, or order pre-iced from Party On Delivery)</li>
                  <li>Swim stop in scenic Lake Travis cove</li>
                  <li>Swim ladder and life jackets</li>
                  <li>Clean restroom facilities</li>
                  <li>Full BYOB privileges</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Corporate billing options:</strong></p>
                <ul>
                  <li>Corporate invoicing with Net-15 and Net-30 terms</li>
                  <li>W-9 documentation available</li>
                  <li>Itemized invoices for expense reporting</li>
                  <li>Credit card, ACH, and wire transfer accepted</li>
                  <li>Preferred pricing for recurring corporate clients</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Questions &amp; Answers</div>
        <h2 className="hp2-section__headline">
          Everything your <em>events team</em> needs to know.
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
          Ready to <em>elevate</em> your next corporate event?
        </h2>
        <p className="hp2-final-cta__body">
          From team building to client entertainment, we handle every detail so you can focus on your people. Call us to start planning or request a custom quote.
        </p>
        <div className="hp2-final-cta__actions">
          <Link href="/contact">
            <a className="hp2-btn hp2-btn--primary">Plan Your Event &rarr;</a>
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
          <Link href="/team-building"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Team Building</a></Link>
          <Link href="/client-entertainment"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Client Entertainment</a></Link>
          <Link href="/company-milestone"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Company Milestones</a></Link>
          <Link href="/holiday-party-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Holiday Parties</a></Link>
          <Link href="/blogs/austin-best-corporate-events"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Best Corporate Events</a></Link>
          <Link href="/blogs/corporate-boat-parties-austin-lake-travis-smartest-venue"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Why Lake Travis is Smartest Venue</a></Link>
          <Link href="/blogs/tech-companies-boat-parties-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Tech Company Parties</a></Link>
          <Link href="/blogs/finance-law-firms-boat-parties-austin"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Finance/Law Firm Parties</a></Link>
          <Link href="/blogs/employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Employee Appreciation</a></Link>
          <Link href="/pricing"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Pricing</a></Link>
          <Link href="/gallery"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Photo Gallery</a></Link>
          <Link href="/testimonials-faq"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Reviews & FAQ</a></Link>
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
