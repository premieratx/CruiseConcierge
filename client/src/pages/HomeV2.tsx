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
`;

// ─── FAQ Data ───────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    q: 'What is Premier Party Cruises BYOB policy?',
    a: 'We are 100% BYOB (Bring Your Own Booze)! You bring whatever beverages you want — beer, wine, spirits, seltzers, mixers — and we provide the coolers and ice. There is no drink minimum or corkage fee. You can also bring your own food and snacks. We just ask that you clean up after yourself and use the trash bags provided.'
  },
  {
    q: 'Where do the boats depart from?',
    a: 'All cruises depart from Anderson Mill Marina on Lake Travis, located at 15903 Anderson Mill Rd, Austin, TX 78717. It is approximately 25 minutes from downtown Austin. We recommend arriving 15 minutes before your scheduled departure time. Free parking is available at the marina.'
  },
  {
    q: 'What is the difference between the ATX Disco Cruise and a Private Charter?',
    a: 'The ATX Disco Cruise is a shared party experience exclusively for bachelorette and bachelor parties, running March through October on select dates. It includes a DJ, photographer, disco ball lighting, and a party atmosphere with other groups. A Private Charter gives you the entire boat exclusively for your group — any event type, any time of year, with a customizable experience.'
  },
  {
    q: 'How much does it cost?',
    a: 'ATX Disco Cruise tickets start at $85 per person. Private Charters start at approximately $200 per hour depending on the boat and party size. The Day Tripper (up to 14 guests) is our most affordable private option, while the Clever Girl (up to 75 guests) is our flagship. Contact us for an exact quote tailored to your group size and desired duration.'
  },
  {
    q: 'What is included with a Private Charter?',
    a: 'Every Private Charter includes a US Coast Guard licensed captain, crew, a premium Bluetooth sound system, coolers with ice for your BYOB beverages, a swim stop (weather permitting), and all safety equipment. Our boats also feature shaded areas, spacious decks, and onboard restrooms. The Clever Girl features 14 disco balls, LED lighting, and a dedicated dance floor.'
  },
  {
    q: 'What happens if there is bad weather?',
    a: 'Safety is our top priority. If we determine conditions are unsafe for cruising (thunderstorms, high winds, etc.), we will contact you to reschedule at no additional cost. Light rain typically does not affect departures since our boats have covered areas. We monitor weather closely and communicate proactively — you will never be surprised.'
  },
  {
    q: 'What group sizes can you accommodate?',
    a: 'We have four boats covering every group size: Day Tripper (up to 14 guests), Meeseeks (25-30 guests), The Irony (25-30 guests), and Clever Girl (50-75 guests). For groups larger than 75, we can arrange multiple boats departing together. The ATX Disco Cruise accommodates groups from 6 to 20 per booking.'
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 2-4 weeks in advance, especially during peak season (March through October). Weekends in summer fill up quickly — some popular dates book out 6-8 weeks ahead. However, we sometimes have last-minute availability, so it never hurts to call us at (512) 488-5892 to check.'
  },
  {
    q: 'Can I bring decorations for my event?',
    a: 'Absolutely! Many of our guests bring decorations for birthdays, bachelorette parties, corporate events, and more. We just ask that you avoid anything that could damage the boat (no glitter, confetti, or tape on surfaces). Balloons, banners, sashes, and similar items are all welcome. Our crew can help you set up before guests board.'
  },
  {
    q: 'Is swimming included on the cruise?',
    a: 'Yes! Weather and conditions permitting, every cruise includes a swim stop on Lake Travis. We anchor in a beautiful cove and guests can jump in, float, and enjoy the water. We provide a swim ladder for easy re-boarding. Life jackets are available for all guests. Swimming is optional — you are welcome to stay on deck and enjoy the views.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function HomeV2() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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
