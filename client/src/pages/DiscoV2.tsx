import { useState, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';

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
    a: 'Yes, the ATX Disco Cruise is 100% BYOB. Bring whatever you want -- beer, wine, spirits, seltzers, hard kombucha, non-alcoholic beverages. Cans and plastic containers only (no glass for safety). We provide a private cooler packed with ice for your group, plus mimosa supplies (juice and fruit), ice water stations, cups, and koozies. You can also coordinate alcohol delivery through our partner Party On Delivery so drinks are waiting on the boat when you arrive.'
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
export default function DiscoV2() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="hp2-page">
      <style dangerouslySetInnerHTML={{ __html: DISCO_STYLES }} />
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
            poster="/attached_assets/atx-disco-cruise-party.webp"
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
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Book Your Tickets &rarr;</a>
            </Link>
            <a href="#timeslots" className="hp2-btn hp2-btn--outline">View Time Slots</a>
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
              <Link href="/book">
                <a className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</a>
              </Link>
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
              <Link href="/book">
                <a className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</a>
              </Link>
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
              <Link href="/book">
                <a className="hp2-btn hp2-btn--primary">Book This Slot &rarr;</a>
              </Link>
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

        <div className="disco-gallery">
          <div className="disco-gallery__img-wrap">
            <img
              className="disco-gallery__img"
              src="/attached_assets/atx-disco-cruise-party.webp"
              alt="ATX Disco Cruise party atmosphere on Lake Travis"
              loading="lazy"
            />
          </div>
          <div className="disco-gallery__img-wrap">
            <img
              className="disco-gallery__img"
              src="/attached_assets/clever-girl-50-person-boat.webp"
              alt="Clever Girl flagship party boat on Lake Travis"
              loading="lazy"
            />
          </div>
          <div className="disco-gallery__img-wrap">
            <img
              className="disco-gallery__img"
              src="/attached_assets/dancing-party-scene.webp"
              alt="Dancing on the ATX Disco Cruise dance floor"
              loading="lazy"
            />
          </div>
          <div className="disco-gallery__img-wrap">
            <img
              className="disco-gallery__img"
              src="/attached_assets/bachelor-party-group-guys-hero-compressed.webp"
              alt="Bachelor party group celebrating on Lake Travis"
              loading="lazy"
            />
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
      <section className="hp2-final-cta">
        <h2 className="hp2-final-cta__headline">
          Ready to join the <em>party</em>?
        </h2>
        <p className="hp2-final-cta__body">
          The ATX Disco Cruise is Austin's most iconic party boat experience. DJ, photographer, dance floor, giant floats, and 4 hours on Lake Travis &mdash; all included. Grab your crew and book your spot.
        </p>
        <div className="hp2-final-cta__actions">
          <Link href="/book">
            <a className="hp2-btn hp2-btn--primary">Book Your Tickets &rarr;</a>
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
