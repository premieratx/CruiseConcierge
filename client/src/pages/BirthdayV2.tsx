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

/* ─── Promise Grid (4-step / age cards) ──────────────────────── */
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
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid var(--hp2-border);
  margin-top: 2rem;
}

.hp2-fleet-card {
  padding: 0;
  border-right: 1px solid var(--hp2-border);
  display: flex;
  flex-direction: column;
}

.hp2-fleet-card:last-child {
  border-right: none;
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

.hp2-fleet-card__content {
  padding: 1.8rem 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
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
  flex: 1;
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
  .hp2-fleet-grid {
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
    q: 'What is the best birthday party venue in Austin?',
    a: 'A Lake Travis party boat cruise with Premier Party Cruises is one of Austin\'s most unique and memorable birthday venues. Unlike restaurants, event halls, or backyard parties, a birthday cruise combines stunning natural scenery, crystal-clear swimming, music, and a completely private experience for your group. We have hosted over 150,000 guests since 2009 across our fleet of 4 boats accommodating 14 to 75 guests, with a 4.9-star rating. Birthday parties are available year-round starting from $200 per hour with a 4-hour minimum.'
  },
  {
    q: 'How much does a birthday boat party cost in Austin?',
    a: 'Birthday cruises start at $200 per hour on Day Tripper (up to 14 guests) with a 4-hour minimum, making the base cost approximately $800 for a private charter. Meeseeks or The Irony (25-30 guests) starts at $225 per hour, and Clever Girl (50-75 guests) starts at $250 per hour. Package upgrades add $100 to $350 flat per cruise. All cruises are fully BYOB, which significantly reduces costs compared to restaurant or bar birthday parties where drinks alone can cost thousands. Plus 8.25% tax and suggested 20% gratuity.'
  },
  {
    q: 'Are birthday boat parties safe for kids?',
    a: 'Absolutely. Safety is our top priority for all ages. Every boat carries USCG-required life jackets in children\'s sizes, and our experienced captains and crew are trained in water safety protocols. All boats have swim ladders for easy water access, shaded seating areas, and clean restroom facilities. We have hosted thousands of kids\' birthday parties since 2009, including Sweet 16 celebrations and multi-generational family events where grandparents and young children celebrate together on the same boat.'
  },
  {
    q: 'What ages can have birthday parties on your boats?',
    a: 'All ages are welcome on our boats. We host birthday parties for kids, teens (including Sweet 16 parties), 21st birthdays, milestone celebrations (30th, 40th, 50th, 60th and beyond), and multi-generational family gatherings. Each age group gets a tailored experience — kids\' parties emphasize supervised fun and safety, teen celebrations include age-appropriate activities, and adult birthdays can include BYOB and a full party atmosphere. There is no minimum age requirement.'
  },
  {
    q: 'Can we bring our own birthday cake on the boat?',
    a: 'Yes! You are welcome to bring your own birthday cake, cupcakes, or any desserts. We recommend a sturdy cake (sheet cakes travel better than tiered cakes) and bringing a cooler if your cake needs to stay cold. We can also coordinate with local Austin bakeries and caterers to have your cake and food delivered directly to the marina or the boat. Our crew will help you set up a designated area for cake cutting and the birthday moment. No glass containers, please — use plastic or disposable serving ware.'
  },
  {
    q: 'Are decorations allowed on the party boats?',
    a: 'Yes, decorations are welcome and encouraged on all private charters. Balloons, banners, streamers, table decorations, and custom signage are all allowed. We recommend skipping confetti and glitter (difficult to clean from a boat). Many birthday groups bring a "Happy Birthday" banner, themed table settings, and customized party favors. Our crew can help you set up decorations before guests arrive if you request early boarding. For our Ultimate Package, premium decorations and birthday setup are included.'
  },
  {
    q: 'How do surprise birthday parties work on a boat?',
    a: 'We love coordinating surprise birthday parties and have done hundreds of them. Here is how it works: the organizer books the cruise and coordinates with our team. On the day of the party, the guest of honor is brought to Anderson Mill Marina under a different pretense (a casual lake outing, for example). Meanwhile, the rest of the group boards early and sets up decorations. When the birthday person arrives, the surprise is revealed on the dock or as they step aboard. Our crew is experienced at keeping the secret and helping with the logistics.'
  },
  {
    q: 'What is included in a birthday party cruise?',
    a: 'Every private birthday charter includes a USCG-licensed captain and trained crew, a premium Bluetooth sound system for your playlist, large coolers packed with ice, a swim stop in a scenic Lake Travis cove with crystal-clear water, swim ladder and life jackets in all sizes, comfortable seating with both sun and shaded areas, and clean restroom facilities. The Essentials Package ($100-$200 flat) adds enhanced party setup, towel service, mimosa bar supplies, and SPF-50 sunscreen stations. The Ultimate Package ($250-$350 flat) adds premium decorations, champagne flutes, plates, a 6-foot food table, and a dedicated event coordinator.'
  },
  {
    q: 'Is the BYOB policy available for 21st birthday parties?',
    a: 'Yes! All private charters are 100% BYOB friendly. For 21st birthday celebrations, guests who are 21 and older with a valid ID can bring any alcoholic beverages they want — beer, wine, champagne, seltzers, spirits, and mixers. Cans and plastic containers only (no glass for safety). Guests under 21 are welcome on the boat but cannot consume alcohol. We provide large coolers with ice on every cruise. You can also coordinate alcohol delivery through our partners so drinks are waiting on the boat when you arrive.'
  },
  {
    q: 'Can we do a sunset birthday cruise on Lake Travis?',
    a: 'Sunset cruises are among our most popular birthday options, especially for milestone celebrations like 30th, 40th, and 50th birthdays. The Texas Hill Country sunset over Lake Travis is spectacular, with golden light reflecting off the limestone bluffs and calm water. Since private charters can be booked at any time, you can schedule your birthday cruise to catch the perfect sunset. Evening cruises typically depart 3 to 4 hours before sundown. Sunset times vary by season — our team will help you pick the ideal departure time for a golden-hour celebration.'
  },
  {
    q: 'How far in advance should we book a birthday cruise?',
    a: 'We recommend booking 4 to 6 weeks in advance for weekend dates, especially during peak season (April through September). For milestone birthdays and larger groups on Clever Girl (50-75 guests), booking 6 to 8 weeks ahead is ideal. Weekday dates and off-peak months (November through February) typically have more availability. Last-minute openings do happen — call (512) 488-5892 to check same-week availability. A 25% deposit secures your date if booking more than 30 days out.'
  },
  {
    q: 'How many guests can you accommodate for a birthday party?',
    a: 'Our fleet accommodates birthday parties from 1 to 75 guests across four boats. Day Tripper holds up to 14 guests, perfect for intimate birthday dinners or small family celebrations. Meeseeks and The Irony each hold 25 to 30 guests, ideal for friend group celebrations. Clever Girl, our flagship, accommodates 50 to 75 guests for the biggest birthday bashes — complete with 14 disco balls, LED lighting, and a full dance floor. For groups larger than 75, we can coordinate a multi-boat flotilla celebration.'
  },
  {
    q: 'What happens if it rains on the birthday party date?',
    a: 'Safety is always our top priority. If conditions are unsafe due to thunderstorms or high winds, we will contact you to reschedule at no additional cost. Light rain does not typically affect departures — our boats have covered and shaded areas that provide shelter. We monitor weather conditions continuously and communicate proactively so you always know what to expect. Texas weather can change quickly, but the vast majority of scheduled cruises depart as planned. Our flexible rescheduling policy ensures your birthday celebration happens rain or shine.'
  },
  {
    q: 'Can we bring food and catering on the birthday cruise?',
    a: 'Yes! You can bring your own food, snacks, and meals aboard any private charter. Many birthday groups bring pizza, sandwiches, charcuterie boards, or full catered meals. We can also coordinate with local Austin caterers to have food delivered directly to the boat. The Ultimate Package includes a 6-foot food table, plates, and plasticware for a proper dining setup. For kids\' parties, finger foods and individual snack boxes work great. Just remember — no glass containers on the boat for safety.'
  }
];

// ─── Component ──────────────────────────────────────────────────────────────
export default function BirthdayV2() {
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
            "name": "Austin Birthday Party Boat Cruises",
            "provider": { "@type": "Organization", "name": "Premier Party Cruises" },
            "areaServed": { "@type": "City", "name": "Austin" },
            "description": "Austin birthday party boat rentals on Lake Travis. Sweet 16s, 21st, 30th, 40th, 50th milestone birthdays. Private charters for 14-75 guests. BYOB welcome, licensed captains.",
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
          <p className="hp2-hero__eyebrow">Birthday Parties &middot; Lake Travis Since 2009</p>
          <h1 className="hp2-hero__headline">
            Austin's most <em>unforgettable</em> birthday celebration.
          </h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">
            From Sweet 16 to milestone 50th — celebrate any age on Lake Travis with a private party boat cruise. 4 boats, 14 to 75 guests, fully BYOB, year-round from $200/hr.
          </p>
          <div className="hp2-hero__ctas">
            <Link href="/book">
              <a className="hp2-btn hp2-btn--primary">Plan Your Birthday Cruise &rarr;</a>
            </Link>
            <Link href="/private-cruises">
              <a className="hp2-btn hp2-btn--outline">See Our Fleet</a>
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
            <span className="hp2-trust__label">All Ages Welcome</span>
            <span className="hp2-trust__sub">Kids to grandparents</span>
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
            <span className="hp2-trust__sub">BYOB from $200/hr</span>
          </div>
        </div>
      </div>

      {/* ─── Birthday Options by Age ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Birthday Options by Age</div>
          <h2 className="hp2-section__headline">
            A celebration for <em>every</em> milestone.
          </h2>

          <div className="hp2-promise-grid">
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">01</div>
              <div className="hp2-promise-card__title">Kids &amp; Teens</div>
              <div className="hp2-promise-card__desc">Sweet 16 celebrations, tween parties, and family-friendly fun. Supervised activities, life jackets in all sizes, and experienced crew trained in safety. Multi-generational groups welcome.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">02</div>
              <div className="hp2-promise-card__title">21st Birthday</div>
              <div className="hp2-promise-card__desc">Your first legal BYOB cruise on the lake. Bring champagne, seltzers, and spirits (21+ with valid ID). Premium sound system, swim stop, and party vibes for the birthday crew.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">03</div>
              <div className="hp2-promise-card__title">Milestone Birthdays</div>
              <div className="hp2-promise-card__desc">30th, 40th, 50th, and beyond deserve something extraordinary. Sunset cruises, catered dinners, premium decorations, and golden-hour photos on the water. VIP treatment included.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">04</div>
              <div className="hp2-promise-card__title">Surprise Parties</div>
              <div className="hp2-promise-card__desc">We help coordinate the big reveal. Your group boards early, sets up decorations, and waits. The birthday person arrives to a boat full of friends, music, and Lake Travis magic.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Fleet ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Our Fleet</div>
        <h2 className="hp2-section__headline">
          Four boats. One <em>perfect</em> birthday.
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#C8B898', maxWidth: '700px', lineHeight: 1.7, marginBottom: '2rem' }}>
          Choose the right boat for your group size and celebration style. Every vessel includes a licensed captain, trained crew, premium sound system, coolers with ice, and BYOB privileges. All with a 4-hour minimum.
        </p>

        <div className="hp2-fleet-grid">
          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/day-tripper-14-person-boat.webp"
                alt="Day Tripper party boat for small birthday parties on Lake Travis"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <div className="hp2-fleet-card__name">Day Tripper</div>
              <div className="hp2-fleet-card__capacity">Up to 14 guests</div>
              <div className="hp2-fleet-card__rate">$200-$350/hr</div>
              <div className="hp2-fleet-card__note">4-hour minimum</div>
              <ul className="hp2-fleet-card__features">
                <li>Intimate birthday celebrations</li>
                <li>Comfortable seating with shade</li>
                <li>Premium Bluetooth sound</li>
                <li>Coolers with ice, BYOB</li>
                <li>Perfect for kids &amp; small groups</li>
              </ul>
            </div>
          </div>

          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/meeseeks-25-person-boat.webp"
                alt="Meeseeks party boat for birthday celebrations Lake Travis"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <div className="hp2-fleet-card__name">Meeseeks</div>
              <div className="hp2-fleet-card__capacity">25-30 guests</div>
              <div className="hp2-fleet-card__rate">$225-$425/hr</div>
              <div className="hp2-fleet-card__note">4-hour minimum</div>
              <ul className="hp2-fleet-card__features">
                <li>Mid-size birthday parties</li>
                <li>Spacious deck &amp; seating</li>
                <li>Premium Bluetooth sound</li>
                <li>Coolers with ice, BYOB</li>
                <li>Great for friend groups</li>
              </ul>
            </div>
          </div>

          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg"
                alt="The Irony party boat for birthday cruises Austin"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <div className="hp2-fleet-card__name">The Irony</div>
              <div className="hp2-fleet-card__capacity">25-30 guests</div>
              <div className="hp2-fleet-card__rate">$225-$425/hr</div>
              <div className="hp2-fleet-card__note">4-hour minimum</div>
              <ul className="hp2-fleet-card__features">
                <li>Mid-size birthday parties</li>
                <li>Covered &amp; open deck areas</li>
                <li>Premium Bluetooth sound</li>
                <li>Coolers with ice, BYOB</li>
                <li>Ideal for milestone birthdays</li>
              </ul>
            </div>
          </div>

          <div className="hp2-fleet-card">
            <div className="hp2-fleet-card__img-wrap">
              <img
                className="hp2-fleet-card__img"
                src="/attached_assets/clever-girl-50-person-boat.webp"
                alt="Clever Girl flagship party boat for large birthday parties Lake Travis"
                loading="lazy"
              />
            </div>
            <div className="hp2-fleet-card__content">
              <div className="hp2-fleet-card__name">Clever Girl</div>
              <div className="hp2-fleet-card__capacity">50-75 guests</div>
              <div className="hp2-fleet-card__rate">$250-$500/hr</div>
              <div className="hp2-fleet-card__note">4-hour minimum &middot; 14 disco balls</div>
              <ul className="hp2-fleet-card__features">
                <li>Austin's flagship party boat</li>
                <li>14 disco balls &amp; LED lighting</li>
                <li>Full dance floor</li>
                <li>Giant Texas flag</li>
                <li>The ultimate birthday bash</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Birthday Experience ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">The Birthday Experience</div>
          <h2 className="hp2-section__headline">
            From booking to <em>birthday magic</em> in four steps.
          </h2>

          <div className="hp2-promise-grid">
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">01</div>
              <div className="hp2-promise-card__title">Choose Your Boat</div>
              <div className="hp2-promise-card__desc">Pick the perfect vessel based on your guest count and celebration style. From intimate gatherings of 14 to full-blown parties of 75.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">02</div>
              <div className="hp2-promise-card__title">Pick Your Package</div>
              <div className="hp2-promise-card__desc">Standard, Essentials, or Ultimate — choose the level of service that fits your birthday vision and budget. Customize every detail.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">03</div>
              <div className="hp2-promise-card__title">We Set Everything Up</div>
              <div className="hp2-promise-card__desc">Our crew handles the boat, the ice, the sound system, and the route. Coordinate catering, decorations, and surprises with our event team.</div>
            </div>
            <div className="hp2-promise-card">
              <div className="hp2-promise-card__num">04</div>
              <div className="hp2-promise-card__title">Birthday Magic Happens</div>
              <div className="hp2-promise-card__desc">Cruise Lake Travis, swim in crystal-clear coves, blast your playlist, cut the cake, and make memories that last a lifetime. We handle the rest.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Photo Gallery ─── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Birthday Celebrations</div>
        <h2 className="hp2-section__headline">
          See what your birthday looks <em>like</em>.
        </h2>
        <div className="hp2-gallery">
          <img src="/attached_assets/clever girl-1 lake travis party boat rental_1763966476656.jpg" alt="Birthday party celebration on Lake Travis party boat" loading="lazy" />
          <img src="/attached_assets/party-atmosphere-1.webp" alt="Birthday group celebrating on party boat Austin" loading="lazy" />
          <img src="/attached_assets/clever girl-4 party boat rental austin_1763966476657.jpg" alt="Birthday cruise on Clever Girl Lake Travis" loading="lazy" />
          <img src="/attached_assets/dancing-party-scene.webp" alt="Dance floor birthday party on Lake Travis boat" loading="lazy" />
          <img src="/attached_assets/day tripper - party boat rental austin_1763968078448.jpg" alt="Small birthday party on Day Tripper boat Austin" loading="lazy" />
          <img src="/attached_assets/meeseeks-25-person-boat.webp" alt="Meeseeks birthday party boat Lake Travis" loading="lazy" />
          <img src="/attached_assets/clever girl-6 party boat lake travis_1763966476657.jpg" alt="Birthday celebration on Lake Travis scenic cruise" loading="lazy" />
          <img src="/attached_assets/party-atmosphere-2.webp" alt="Birthday party atmosphere on Austin party boat" loading="lazy" />
        </div>
      </section>

      {/* ─── Expandable Details ─── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner" style={{ padding: '9rem 4rem' }}>
          <div className="hp2-section__label">Complete Details</div>
          <h2 className="hp2-section__headline">
            Everything about your <em>birthday</em> cruise.
          </h2>
          <div className="hp2-details-section">
            <button className="hp2-details-toggle" onClick={() => toggleDetails('packages')}>
              <span>Package Tiers &amp; Pricing</span>
              <span>{openDetails === 'packages' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'packages' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Every private birthday charter starts with our Standard Package, included in the hourly rate. Upgrade to Essentials or Ultimate for an enhanced celebration experience.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Standard Package (included with every charter):</strong></p>
                <ul>
                  <li>USCG-licensed captain and trained crew</li>
                  <li>Premium Bluetooth sound system</li>
                  <li>Large coolers packed with ice</li>
                  <li>Swim stop in a scenic Lake Travis cove</li>
                  <li>Swim ladder and life jackets in all sizes</li>
                  <li>BYOB — bring whatever you want (21+ with valid ID)</li>
                  <li>Comfortable seating with sun and shade areas</li>
                  <li>Clean restroom facilities</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Essentials Upgrade ($100-$200 flat per cruise):</strong></p>
                <ul>
                  <li>Everything in Standard</li>
                  <li>Enhanced party setup</li>
                  <li>Mimosa bar supplies (juice and fruit)</li>
                  <li>Towel service</li>
                  <li>SPF-50 spray sunscreen station</li>
                  <li>Coolers pre-stocked with ice</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Ultimate Package ($250-$350 flat per cruise):</strong></p>
                <ul>
                  <li>Everything in Essentials</li>
                  <li>Premium birthday decorations and banner setup</li>
                  <li>Champagne flutes, plates, and plasticware</li>
                  <li>6-foot table for food and cake setup</li>
                  <li>Dedicated event coordinator</li>
                  <li>Priority boarding and extended amenities</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Additional fees:</strong> $50/hour for 26-30 guests, $100/hour for 51-75 guests. Plus 8.25% tax and suggested 20% gratuity. 25% deposit to book; balance due 30 days prior.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('catering')}>
              <span>Cake &amp; Catering Coordination</span>
              <span>{openDetails === 'catering' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'catering' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>We make it easy to have amazing food and a beautiful birthday cake on the water. Bring your own or let us coordinate delivery for you.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Cake options:</strong></p>
                <ul>
                  <li>Bring your own cake or cupcakes (sheet cakes travel best)</li>
                  <li>We can coordinate with local Austin bakeries for delivery to the marina</li>
                  <li>Crew assists with setup and the birthday moment</li>
                  <li>No glass platters — bring disposable or plastic serving ware</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Food and catering:</strong></p>
                <ul>
                  <li>BYOF — bring your own food, snacks, and meals</li>
                  <li>Popular choices: pizza, charcuterie boards, sandwich platters, BBQ</li>
                  <li>Catering delivery coordination to the boat or marina available</li>
                  <li>Ultimate Package includes a 6-foot table, plates, and plasticware</li>
                  <li>Kids' parties: finger foods and individual snack boxes work great</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Drinks (BYOB):</strong></p>
                <ul>
                  <li>Bring any beverages in cans or plastic containers (no glass)</li>
                  <li>We provide large coolers and ice on every cruise</li>
                  <li>Alcohol delivery coordination available — drinks waiting on the boat</li>
                  <li>Non-alcoholic options encouraged for all-ages celebrations</li>
                </ul>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('decorations')}>
              <span>Decoration Policies</span>
              <span>{openDetails === 'decorations' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'decorations' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>Private charters give you full freedom to decorate for your birthday celebration. Make it as festive as you want.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Welcome on all private charters:</strong></p>
                <ul>
                  <li>Balloons (regular and mylar)</li>
                  <li>"Happy Birthday" banners and custom signage</li>
                  <li>Streamers and ribbon</li>
                  <li>Table decorations and centerpieces</li>
                  <li>Themed tableware and cups</li>
                  <li>Photo props and custom party favors</li>
                  <li>Inflatable accessories and pool floats</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Please skip:</strong></p>
                <ul>
                  <li>Confetti and glitter (very difficult to clean from a boat)</li>
                  <li>Anything that permanently adheres to surfaces</li>
                  <li>Open flame candles (LED candles are fine)</li>
                </ul>
                <p>Early boarding is available upon request so your team can set up decorations before guests arrive. Our crew is happy to help with setup and takedown.</p>
              </div>
            </div>

            <button className="hp2-details-toggle" onClick={() => toggleDetails('safety')}>
              <span>Kid-Friendly Safety Features</span>
              <span>{openDetails === 'safety' ? '\u2212' : '+'}</span>
            </button>
            <div className={`hp2-details-content ${openDetails === 'safety' ? 'hp2-details-content--open' : ''}`}>
              <div className="hp2-details-inner">
                <p>We take safety seriously for every guest, especially children. All boats meet or exceed USCG safety requirements, and our crew is trained for all-ages events.</p>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Safety equipment on every boat:</strong></p>
                <ul>
                  <li>USCG-approved life jackets in children's and adult sizes</li>
                  <li>Swim ladders for easy water access and reboarding</li>
                  <li>First aid kit and safety equipment</li>
                  <li>Fire extinguishers and emergency signaling devices</li>
                  <li>Railing and non-slip deck surfaces</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Crew training and procedures:</strong></p>
                <ul>
                  <li>USCG-licensed captains on every cruise</li>
                  <li>Crew trained in water safety and first aid</li>
                  <li>Headcount protocols before and after swim stops</li>
                  <li>Designated swim areas in calm, protected coves</li>
                  <li>Weather monitoring and proactive communication</li>
                </ul>
                <p><strong style={{ color: 'var(--hp2-cream)' }}>Kid-friendly amenities:</strong></p>
                <ul>
                  <li>Shaded seating areas to escape the Texas sun</li>
                  <li>Clean restroom facilities on all boats</li>
                  <li>Calm water swim stops in protected coves</li>
                  <li>Ice water stations to keep everyone hydrated</li>
                  <li>Flexible cruise itineraries to match the group's energy</li>
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
          Everything the <em>birthday planner</em> needs to know.
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
          Ready to plan the birthday of a <em>lifetime</em>?
        </h2>
        <p className="hp2-final-cta__body">
          Weekend dates fill fast, especially during peak season. Book your private birthday cruise online or call us to check availability and start planning every detail.
        </p>
        <div className="hp2-final-cta__actions">
          <Link href="/book">
            <a className="hp2-btn hp2-btn--primary">Book Your Birthday Cruise &rarr;</a>
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
          <Link href="/milestone-birthday"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Milestone Birthdays</a></Link>
          <Link href="/sweet-16"><a style={{ color: 'var(--hp2-gold)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Sweet 16</a></Link>
          <Link href="/birthday-party-boat-rental"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Birthday Boat Rental</a></Link>
          <Link href="/graduation-party"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Graduation Parties</a></Link>
          <Link href="/graduation-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Graduation Cruise</a></Link>
          <Link href="/prom-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Prom Cruise</a></Link>
          <Link href="/family-reunion-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Family Reunions</a></Link>
          <Link href="/retirement-party-cruise"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Retirement Parties</a></Link>
          <Link href="/celebration-cruises"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>All Celebrations</a></Link>
          <Link href="/blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Milestone Celebrations Guide</a></Link>
          <Link href="/blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Birthday Alcohol Delivery</a></Link>
          <Link href="/pricing"><a style={{ color: 'var(--hp2-cream-muted)', fontSize: '0.85rem', fontFamily: 'var(--hp2-font-body)', letterSpacing: '0.04em' }}>Pricing</a></Link>
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
