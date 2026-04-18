import { useState, lazy, Suspense, ReactNode } from 'react';
import { Link } from 'wouter';
import PublicNavigationLuxury from '@/components/PublicNavigationLuxury';
import { useQuoteLightbox } from '@/components/QuoteLightbox';

/** True when the CTA should open the quote lightbox instead of navigating. */
function isQuoteCta(cta: { text: string; href: string }) {
  return (
    cta.href === '/chat' ||
    cta.href === '/quote' ||
    /quote/i.test(cta.text)
  );
}

const Footer = lazy(() => import('@/components/Footer'));

// ── Shared Luxury Styles (same tokens as HP2) ──
export const V2_STYLES = `
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
  --hp2-brand-blue: #1E88E5;
  --hp2-brand-blue-light: #42A5F5;
  --hp2-brand-blue-deep: #0D3D66;
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

/* ── Hero ── */
.hp2-hero {
  position: relative;
  min-height: 88vh;
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
  background:
    radial-gradient(ellipse at 20% 80%, rgba(30,136,229,0.22) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 20%, rgba(200,169,110,0.15) 0%, transparent 60%),
    linear-gradient(135deg, rgba(7,7,12,0.88) 0%, rgba(7,7,12,0.55) 60%, rgba(7,7,12,0.78) 100%);
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
  font-size: clamp(3rem, 5vw, 4.8rem);
  font-weight: 300;
  line-height: 0.98;
  color: var(--hp2-cream);
  margin: 0 0 2rem 0;
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
  font-size: 1.35rem;
  line-height: 1.55;
  color: var(--hp2-cream-muted);
  font-weight: 300;
  margin-bottom: 2.5rem;
  max-width: 700px;
}
.hp2-hero__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ── Buttons ── */
.hp2-btn {
  display: inline-flex;
  align-items: center;
  font-family: var(--hp2-font-body);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 1rem 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  min-height: 44px;
  cursor: pointer;
  border: 1px solid transparent;
}
.hp2-btn--primary {
  background: linear-gradient(135deg, var(--hp2-gold) 0%, var(--hp2-gold-light) 100%);
  color: var(--hp2-bg-0);
  border-color: var(--hp2-gold);
}
.hp2-btn--primary:hover {
  box-shadow: 0 0 30px rgba(200,169,110,0.5);
  transform: translateY(-1px);
}
.hp2-btn--outline {
  background: transparent;
  color: var(--hp2-gold-light);
  border: 1px solid var(--hp2-gold);
}
.hp2-btn--outline:hover {
  background: rgba(200,169,110,0.1);
  color: var(--hp2-cream);
}

/* ── Trust Bar ── */
.hp2-trust {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem 4rem;
  background: var(--hp2-bg-1);
  border-top: 1px solid var(--hp2-border);
  border-bottom: 1px solid var(--hp2-border);
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
  font-weight: 500;
  color: var(--hp2-cream);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.hp2-trust__sub {
  font-family: var(--hp2-font-body);
  font-size: 0.7rem;
  color: var(--hp2-text-muted);
  letter-spacing: 0.04em;
}

/* ── Sections ── */
.hp2-section {
  padding: 7rem 4rem;
  max-width: 1280px;
  margin: 0 auto;
}
.hp2-section--alt {
  background:
    radial-gradient(ellipse at 0% 50%, rgba(30,136,229,0.08) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 50%, rgba(30,136,229,0.06) 0%, transparent 40%),
    var(--hp2-bg-1);
  max-width: none;
  position: relative;
}
.hp2-section--alt::before,
.hp2-section--alt::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(30,136,229,0.3) 30%,
    rgba(200,169,110,0.5) 50%,
    rgba(30,136,229,0.3) 70%,
    transparent 100%);
}
.hp2-section--alt::before { top: 0; }
.hp2-section--alt::after { bottom: 0; }
.hp2-section--alt > .hp2-section__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 7rem 4rem;
}
.hp2-section__label {
  font-family: var(--hp2-font-body);
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: var(--hp2-gold);
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 44px;
}
.hp2-section__label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 32px;
  height: 1px;
  background: var(--hp2-gold);
}
.hp2-section__headline {
  font-family: var(--hp2-font-display);
  font-size: clamp(2.2rem, 3.5vw, 3.4rem);
  font-weight: 300;
  line-height: 1.05;
  color: var(--hp2-cream);
  margin: 0 0 1.5rem 0;
}
.hp2-section__headline em {
  font-style: italic;
  color: var(--hp2-gold-light);
}
.hp2-section__body {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--hp2-cream-muted);
  max-width: 780px;
  margin-bottom: 2rem;
}

/* ── Feature Grid (3-col) ── */
.hp2-feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
}
.hp2-feature-card {
  background: var(--hp2-bg-card);
  border: 1px solid var(--hp2-border);
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  position: relative;
}
.hp2-feature-card:hover {
  border-color: var(--hp2-gold);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 24px rgba(30,136,229,0.1);
}
.hp2-feature-card__num {
  font-family: var(--hp2-font-display);
  font-size: 3rem;
  font-weight: 300;
  color: var(--hp2-gold-dim2);
  line-height: 1;
  margin-bottom: 1rem;
}
.hp2-feature-card__title {
  font-family: var(--hp2-font-display);
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--hp2-cream);
  margin-bottom: 0.75rem;
}
.hp2-feature-card__desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--hp2-cream-muted);
}

/* ── FAQ ── */
.hp2-faq {
  max-width: 900px;
  margin: 3rem auto 0;
}
.hp2-faq__item {
  border-bottom: 1px solid var(--hp2-border);
}
.hp2-faq__trigger {
  width: 100%;
  padding: 1.8rem 1.5rem 1.8rem 0;
  background: none;
  border: none;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.hp2-faq__trigger:hover {
  padding-left: 1rem;
}
.hp2-faq__question {
  font-family: var(--hp2-font-display);
  font-size: 1.35rem;
  font-weight: 400;
  color: var(--hp2-cream);
}
.hp2-faq__icon {
  font-family: var(--hp2-font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--hp2-gold);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}
.hp2-faq__icon--open {
  transform: rotate(45deg);
}
.hp2-faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.hp2-faq__answer--open {
  max-height: 2000px;
}
.hp2-faq__answer-inner {
  padding: 0 1.5rem 1.8rem 0;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--hp2-cream-muted);
}

/* ── Final CTA ── */
.hp2-final-cta {
  background:
    radial-gradient(ellipse at center, rgba(30,136,229,0.12) 0%, transparent 60%),
    var(--hp2-bg-0);
  padding: 8rem 4rem;
  text-align: center;
  border-top: 1px solid var(--hp2-border);
  position: relative;
}
.hp2-final-cta__headline {
  font-family: var(--hp2-font-display);
  font-size: clamp(2.5rem, 4vw, 3.8rem);
  font-weight: 300;
  line-height: 1.05;
  color: var(--hp2-cream);
  margin: 0 0 1.5rem 0;
}
.hp2-final-cta__headline em {
  font-style: italic;
  color: var(--hp2-gold-light);
}
.hp2-final-cta__body {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--hp2-cream-muted);
  max-width: 680px;
  margin: 0 auto 2.5rem;
}
.hp2-final-cta__actions {
  display: inline-flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
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

/* ── Quick Links Footer ── */
.hp2-quick-links {
  background: var(--hp2-bg-1);
  padding: 3rem 4rem;
  border-top: 1px solid var(--hp2-border);
}
.hp2-quick-links__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 3rem;
  justify-content: center;
}
.hp2-quick-link {
  color: var(--hp2-cream-muted);
  font-size: 0.85rem;
  font-family: var(--hp2-font-body);
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: color 0.2s ease;
}
.hp2-quick-link:hover {
  color: var(--hp2-gold);
}
.hp2-quick-link--primary {
  color: var(--hp2-gold);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .hp2-feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .hp2-hero {
    padding: 0 1.5rem;
  }
  .hp2-section,
  .hp2-section--alt > .hp2-section__inner {
    padding: 5rem 1.5rem;
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
  .hp2-feature-grid {
    grid-template-columns: 1fr;
  }
  .hp2-final-cta {
    padding: 5rem 1.5rem;
  }
  .hp2-quick-links {
    padding: 2rem 1.5rem;
  }
}
`;

export interface V2PageProps {
  // SEO
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
  schema?: object | object[];

  // Hero
  heroEyebrow: string;
  heroHeadline: ReactNode;
  heroBody: string;
  heroVideo?: string;
  heroImage?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };

  // Trust bar (optional override)
  trustItems?: Array<{ icon: string; label: string; sub: string }>;

  // Body content (custom JSX)
  children?: ReactNode;

  // FAQ
  faqs?: Array<{ q: string; a: string }>;

  // Final CTA
  finalCtaHeadline?: ReactNode;
  finalCtaBody?: string;

  // Quick links
  quickLinks?: Array<{ title: string; href: string; primary?: boolean }>;
}

const DEFAULT_TRUST_ITEMS = [
  { icon: '✢', label: '150,000+ Guests', sub: "Austin's trusted since 2009" },
  { icon: '◈', label: 'Perfect Safety', sub: 'USCG certified captains' },
  { icon: '◎', label: '4.9 Star Rating', sub: 'Hundreds of 5-star reviews' },
  { icon: '★', label: '4 Premium Boats', sub: '14 to 75 guest capacity' },
  { icon: '◇', label: 'BYOB Friendly', sub: 'Your drinks, our boat' },
];

const DEFAULT_QUICK_LINKS = [
  { title: 'Home', href: '/', primary: true },
  { title: 'ATX Disco Cruise', href: '/atx-disco-cruise' },
  { title: 'Bachelor Parties', href: '/bachelor-party-austin' },
  { title: 'Bachelorette Parties', href: '/bachelorette-party-austin' },
  { title: 'Private Charters', href: '/private-cruises' },
  { title: 'Corporate Events', href: '/corporate-events' },
  { title: 'Wedding Parties', href: '/wedding-parties' },
  { title: 'Birthday Parties', href: '/birthday-parties' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Reviews & FAQ', href: '/testimonials-faq' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Contact', href: '/contact' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Blog', href: '/blogs' },
];

export default function V2PageTemplate({
  pageUrl,
  pageTitle,
  pageDescription,
  schema,
  heroEyebrow,
  heroHeadline,
  heroBody,
  heroVideo = '/attached_assets/Boat_Video_Walkthrough_Generated_1761209219959.mp4',
  heroImage = '/attached_assets/clever-girl-50-person-boat.webp',
  primaryCta = { text: 'Book Your Cruise', href: '/book' },
  secondaryCta = { text: 'View Fleet', href: '/private-cruises' },
  trustItems = DEFAULT_TRUST_ITEMS,
  children,
  faqs = [],
  finalCtaHeadline,
  finalCtaBody = "Call or book online to secure your date on Lake Travis. Our team handles every detail so you just show up and celebrate.",
  quickLinks = DEFAULT_QUICK_LINKS,
}: V2PageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { openQuote } = useQuoteLightbox();

  // Build schema graph
  const schemaGraph = {
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
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
      }] : []),
      ...(Array.isArray(schema) ? schema : schema ? [schema] : [])
    ]
  };

  return (
    <div className="hp2-page">
      <style dangerouslySetInnerHTML={{ __html: V2_STYLES }} />
      <PublicNavigationLuxury />

      {/* SEO Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />

      {/* Hero */}
      <section className="hp2-hero">
        <div className="hp2-hero__video-wrap">
          {heroVideo && (
            <video
              className="hp2-hero__video"
              autoPlay
              muted
              loop
              playsInline
              poster={heroImage}
              preload="metadata"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          )}
          <div className="hp2-hero__overlay" />
        </div>
        <div className="hp2-hero__content">
          <p className="hp2-hero__eyebrow">{heroEyebrow}</p>
          <h1 className="hp2-hero__headline">{heroHeadline}</h1>
          <hr className="hp2-hero__rule" />
          <p className="hp2-hero__body">{heroBody}</p>
          <div className="hp2-hero__ctas">
            {isQuoteCta(primaryCta) ? (
              <button
                type="button"
                className="hp2-btn hp2-btn--primary"
                onClick={() => openQuote('v2_hero_primary')}
              >
                {primaryCta.text} →
              </button>
            ) : (
              <a href={primaryCta.href} className="hp2-btn hp2-btn--primary">
                {primaryCta.text} →
              </a>
            )}
            {isQuoteCta(secondaryCta) ? (
              <button
                type="button"
                className="hp2-btn hp2-btn--outline"
                onClick={() => openQuote('v2_hero_secondary')}
              >
                {secondaryCta.text}
              </button>
            ) : (
              <a href={secondaryCta.href} className="hp2-btn hp2-btn--outline">
                {secondaryCta.text}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="hp2-trust">
        {trustItems.map((item, i) => (
          <div key={i} className="hp2-trust__item">
            <span className="hp2-trust__icon">{item.icon}</span>
            <div className="hp2-trust__text">
              <span className="hp2-trust__label">{item.label}</span>
              <span className="hp2-trust__sub">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Custom page content */}
      {children}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="hp2-section">
          <div className="hp2-section__label">Frequently Asked Questions</div>
          <h2 className="hp2-section__headline">
            Everything you need to <em>know</em>.
          </h2>
          <div className="hp2-faq">
            {faqs.map((item, index) => (
              <div className="hp2-faq__item" key={index}>
                <button
                  className="hp2-faq__trigger"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
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
      )}

      {/* Final CTA */}
      <section className="hp2-final-cta">
        <h2 className="hp2-final-cta__headline">
          {finalCtaHeadline || <>Ready to make <em>memories</em> on Lake Travis?</>}
        </h2>
        <p className="hp2-final-cta__body">{finalCtaBody}</p>
        <div className="hp2-final-cta__actions">
          {isQuoteCta(primaryCta) ? (
            <button
              type="button"
              className="hp2-btn hp2-btn--primary"
              onClick={() => openQuote('v2_final_cta')}
            >
              {primaryCta.text} →
            </button>
          ) : (
            <a href={primaryCta.href} className="hp2-btn hp2-btn--primary">
              {primaryCta.text} →
            </a>
          )}
          <a href="tel:+15124885892" className="hp2-final-cta__phone">(512) 488-5892</a>
        </div>
        <p className="hp2-final-cta__location">
          Anderson Mill Marina · Lake Travis · 25 min from downtown Austin
        </p>
      </section>

      {/* Quick Links */}
      <section className="hp2-quick-links">
        <div className="hp2-quick-links__inner">
          {quickLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`hp2-quick-link ${link.primary ? 'hp2-quick-link--primary' : ''}`}
            >
              {link.title}
            </a>
          ))}
        </div>
      </section>

      <Suspense fallback={<div style={{ height: '200px', background: '#07070C' }} />}>
        <Footer />
      </Suspense>
    </div>
  );
}
