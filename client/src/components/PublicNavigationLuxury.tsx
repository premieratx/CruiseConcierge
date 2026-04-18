import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Menu, ChevronDown, X } from 'lucide-react';

const logoPath = '/attached_assets/PPC-Logo-280x280.webp';

const LUX_NAV_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

:root {
  --lux-bg: #07070C;
  --lux-bg-scrolled: rgba(7,7,12,0.94);
  --lux-gold: #C8A96E;
  --lux-gold-light: #DFC08A;
  --lux-gold-pale: #EDD9AA;
  --lux-cream: #F0E6D0;
  --lux-cream-muted: #C8B898;
  --lux-text-muted: #A89878;
  --lux-border: rgba(200,169,110,0.18);
  --lux-brand-blue: #1E88E5;
  --lux-brand-blue-light: #42A5F5;
  --lux-brand-blue-glow: rgba(30,136,229,0.45);
  --lux-brand-blue-deep: #0D3D66;
  --lux-font-display: 'Cormorant Garamond', Georgia, serif;
  --lux-font-body: 'Jost', system-ui, sans-serif;
}

/* ── Fixed header stack: promo + nav scroll together at top of viewport ── */
.lux-header-stack {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  pointer-events: none;   /* inner elements re-enable */
}
.lux-header-stack > * { pointer-events: auto; }

/* Spacer reserves document flow below the fixed header so nothing collides.
   Heights tuned per breakpoint (promo bar is 2-line on phones). */
.lux-header-spacer {
  height: var(--lux-header-height, 97px);
  flex-shrink: 0;
}
@media (max-width: 1000px) { .lux-header-spacer { height: 88px; } }
@media (max-width: 760px)  { .lux-header-spacer { height: 92px; } }   /* promo stacks */
@media (max-width: 480px)  { .lux-header-spacer { height: 86px; } }

/* ── Promo Banner (refined: black + gold, no yellow) ── */
.lux-promo-banner {
  background: linear-gradient(90deg, #07070C 0%, #0D0D18 50%, #07070C 100%);
  color: var(--lux-gold-light);
  padding: 0.5rem 1.25rem;
  text-align: center;
  font-family: var(--lux-font-body);
  font-size: 0.76rem;
  font-weight: 400;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--lux-border);
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.35rem 0.8rem;
  line-height: 1.4;
}
.lux-promo-line {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
}
.lux-promo-line--primary { color: var(--lux-cream); }
.lux-promo-icon {
  color: var(--lux-gold);
  font-size: 0.9em;
  line-height: 1;
  transform: translateY(-1px);
}
.lux-promo-sep {
  color: rgba(200,169,110,0.35);
  font-weight: 300;
}
.lux-promo-line--cta {
  color: var(--lux-gold-light);
  text-decoration: none;
  border-bottom: 1px dotted rgba(200,169,110,0.55);
  padding-bottom: 1px;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.lux-promo-line--cta:hover {
  color: var(--lux-gold-pale, #EDD9AA);
  border-bottom-color: var(--lux-gold);
}
.lux-promo-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(200,169,110,0.08) 45%,
    rgba(200,169,110,0.12) 50%,
    rgba(200,169,110,0.08) 55%,
    transparent 100%);
  background-size: 200% 100%;
  animation: luxPromoShimmer 8s linear infinite;
  pointer-events: none;
}
@keyframes luxPromoShimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.lux-promo-banner strong {
  color: var(--lux-cream);
  font-weight: 600;
}
.lux-promo-banner em {
  color: var(--lux-gold);
  font-style: normal;
  text-decoration: underline;
  text-decoration-color: rgba(200,169,110,0.45);
  text-underline-offset: 3px;
}

/* ── Nav Container ── */
.lux-nav-container {
  position: relative;     /* now stacked inside .lux-header-stack */
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.lux-nav {
  background: transparent;
  backdrop-filter: blur(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid transparent;
}
.lux-nav.scrolled {
  background:
    radial-gradient(ellipse at center top, rgba(13,61,102,0.25) 0%, transparent 70%),
    var(--lux-bg-scrolled);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--lux-border);
  box-shadow: 0 4px 24px rgba(0,0,0,0.5);
}

/* ── Disco Streak: blue-to-gold animated shimmer under nav ── */
.lux-nav-streak {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(30,136,229,0.7) 20%,
    rgba(200,169,110,0.9) 50%,
    rgba(30,136,229,0.7) 80%,
    transparent 100%);
  background-size: 200% 100%;
  animation: luxStreak 14s linear infinite;
  opacity: 0.85;
}
@keyframes luxStreak {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

/* ── Inner ── */
.lux-nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  gap: 1.5rem;
  height: 5rem;
}

/* ── Logo ── */
.lux-nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.lux-nav-brand:hover {
  transform: translateY(-1px);
}
.lux-nav-logo-wrap {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  padding: 2.5px;
  background: conic-gradient(from 0deg,
    var(--lux-gold),
    var(--lux-brand-blue),
    var(--lux-gold-light),
    var(--lux-brand-blue-light),
    var(--lux-gold));
  animation: luxLogoRing 24s linear infinite;
  box-shadow:
    0 0 28px rgba(30,136,229,0.35),
    0 0 52px rgba(200,169,110,0.2);
}
@keyframes luxLogoRing {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.lux-nav-logo-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--lux-bg);
  padding: 3px;
  position: relative;
  animation: luxLogoCounter 24s linear infinite;
}
@keyframes luxLogoCounter {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
.lux-nav-logo-inner img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  filter: saturate(0.95) contrast(1.05);
}
.lux-nav-brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}
.lux-nav-brand-name {
  font-family: var(--lux-font-display);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--lux-cream);
  letter-spacing: 0.01em;
  line-height: 1.05;
}
.lux-nav-brand-name em {
  color: var(--lux-gold-light);
  font-style: italic;
  font-weight: 400;
}
.lux-nav-brand-sub {
  font-family: var(--lux-font-body);
  font-size: 0.62rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--lux-gold);
  margin-top: 0.35rem;
}

/* ── Links ── */
.lux-nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.lux-nav-link {
  font-family: var(--lux-font-body);
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--lux-cream-muted);
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
  cursor: pointer;
  background: none;
  border: none;
}
.lux-nav-link::after {
  content: '';
  position: absolute;
  bottom: 0.25rem;
  left: 50%;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--lux-gold), transparent);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}
.lux-nav-link:hover {
  color: var(--lux-gold-light);
}
.lux-nav-link:hover::after {
  width: calc(100% - 1.8rem);
}
.lux-nav-link.active {
  color: var(--lux-gold);
}
.lux-nav-link.active::after {
  width: calc(100% - 1.8rem);
  background: var(--lux-gold);
}

/* ── Dropdown ── */
.lux-nav-dropdown-wrap {
  position: relative;
}
.lux-nav-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  min-width: 300px;
  background:
    radial-gradient(ellipse at top left, rgba(13,61,102,0.15) 0%, transparent 60%),
    rgba(15,15,24,0.98);
  backdrop-filter: blur(20px);
  border: 1px solid var(--lux-border);
  padding: 1rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(30,136,229,0.1);
}
.lux-nav-dropdown-wrap:hover .lux-nav-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
.lux-nav-dropdown-item {
  display: block;
  padding: 0.7rem 1rem;
  color: var(--lux-cream-muted);
  text-decoration: none;
  font-family: var(--lux-font-body);
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
}
.lux-nav-dropdown-item:hover {
  color: var(--lux-gold-light);
  background: rgba(200,169,110,0.06);
  border-left-color: var(--lux-gold);
  padding-left: 1.2rem;
}
.lux-nav-dropdown-section {
  font-family: var(--lux-font-body);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--lux-brand-blue-light);
  padding: 0.8rem 1rem 0.3rem;
  border-top: 1px solid rgba(30,136,229,0.18);
  margin-top: 0.3rem;
}
.lux-nav-dropdown-section:first-of-type,
.lux-nav-dropdown-item:first-child + .lux-nav-dropdown-section {
  border-top: none;
  margin-top: 0.2rem;
}

/* ── CTAs ── */
.lux-nav-cta-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}
.lux-nav-quote {
  font-family: var(--lux-font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.75rem 1.3rem;
  color: var(--lux-brand-blue-light);
  background: transparent;
  border: 1px solid var(--lux-brand-blue);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  isolation: isolate;
}
.lux-nav-quote::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--lux-brand-blue-deep) 0%, var(--lux-brand-blue) 100%);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
.lux-nav-quote:hover {
  color: #fff;
  border-color: var(--lux-brand-blue-light);
  box-shadow: 0 0 24px var(--lux-brand-blue-glow);
}
.lux-nav-quote:hover::before {
  transform: translateY(0);
}

.lux-nav-book {
  font-family: var(--lux-font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  color: var(--lux-bg);
  background: linear-gradient(135deg, var(--lux-gold) 0%, var(--lux-gold-light) 100%);
  border: 1px solid var(--lux-gold);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.lux-nav-book::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.6s ease;
}
.lux-nav-book:hover {
  box-shadow: 0 0 30px rgba(200,169,110,0.5);
  transform: translateY(-1px);
}
.lux-nav-book:hover::before {
  left: 150%;
}

/* ── Mobile hamburger ── */
.lux-nav-mobile-toggle {
  background: transparent;
  border: 1px solid var(--lux-gold);
  color: var(--lux-gold);
  width: 44px;
  height: 44px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.lux-nav-mobile-toggle:hover {
  background: var(--lux-gold);
  color: var(--lux-bg);
}

/* ── Mobile menu ── */
.lux-nav-mobile {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background:
    radial-gradient(ellipse at top right, rgba(13,61,102,0.2) 0%, transparent 60%),
    var(--lux-bg);
  border-left: 1px solid var(--lux-border);
  padding: 5rem 1.5rem 2rem;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  z-index: 60;
}
.lux-nav-mobile.open {
  transform: translateX(0);
  box-shadow: -20px 0 60px rgba(0,0,0,0.6);
}
.lux-nav-mobile-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: transparent;
  border: none;
  color: var(--lux-gold);
  cursor: pointer;
  padding: 0.5rem;
}
.lux-nav-mobile-link {
  display: block;
  padding: 1rem 0.5rem;
  color: var(--lux-cream);
  text-decoration: none;
  font-family: var(--lux-font-body);
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--lux-border);
  transition: color 0.2s ease, padding-left 0.2s ease;
}
.lux-nav-mobile-link:hover {
  color: var(--lux-gold);
  padding-left: 1rem;
}
.lux-nav-mobile-ctas {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.lux-nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(7,7,12,0.75);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 55;
}
.lux-nav-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* ── Responsive ─────────────────────────────────────────────────
   Strategy: keep the full desktop menu visible as long as possible
   (down to ~880px) by progressively tightening padding and link
   size. Below ~880px we switch to the hamburger. Phones get extra
   compact treatment below 640px.
   ───────────────────────────────────────────────────────────── */

/* Intermediate: tablet landscape / small laptop — tighten rather than hide */
@media (max-width: 1180px) {
  .lux-nav-inner { padding: 0.85rem 1.75rem; }
  .lux-nav-links { gap: 1.1rem; }
  .lux-nav-link { font-size: 0.78rem; letter-spacing: 0.14em; }
  .lux-nav-brand-text .lux-nav-brand-name { font-size: 1.02rem; }
  .lux-nav-brand-sub { font-size: 0.6rem; letter-spacing: 0.14em; }
  .lux-nav-quote { padding: 0.55rem 0.9rem; font-size: 0.72rem; }
  .lux-nav-book { padding: 0.55rem 1rem; font-size: 0.72rem; }
}

@media (max-width: 1000px) {
  .lux-nav-inner { padding: 0.7rem 1rem; }
  .lux-nav-links { gap: 0.55rem; }
  .lux-nav-link { font-size: 0.68rem; letter-spacing: 0.08em; padding: 0.35rem 0.4rem; }
  .lux-nav-cta-group .lux-nav-quote { display: none; }
  .lux-nav-brand-sub { display: none; }
  .lux-nav-brand-text .lux-nav-brand-name { font-size: 0.88rem; }
  .lux-nav-logo-wrap { width: 42px; height: 42px; }
}
@media (max-width: 820px) {
  .lux-nav-inner { padding: 0.6rem 0.85rem; }
  .lux-nav-links { gap: 0.35rem; }
  .lux-nav-link { font-size: 0.62rem; letter-spacing: 0.06em; padding: 0.3rem 0.3rem; }
  .lux-nav-book { font-size: 0.65rem; padding: 0.45rem 0.7rem; }
  .lux-nav-brand-text { display: none; }   /* keep logo+links+book visible */
}

/* Below tablet portrait (the iPhone/small-tablet threshold) */
@media (max-width: 760px) {
  .lux-nav-links { display: none; }
  .lux-nav-mobile-toggle { display: flex; }
  .lux-nav-inner { padding: 0.65rem 1rem; }
  .lux-nav-brand-text { display: block; }
  .lux-nav-brand-text .lux-nav-brand-name { font-size: 0.95rem; }
}

/* Small tablet + large phone */
@media (max-width: 640px) {
  .lux-nav-inner { padding: 0.6rem 0.85rem; }
  .lux-nav-brand-text { display: block; max-width: 55vw; }
  .lux-nav-brand-text .lux-nav-brand-name { font-size: 0.92rem; }
  .lux-nav-brand-sub { display: none; }
  .lux-nav-logo-wrap { width: 38px; height: 38px; }
  .lux-nav-book {
    padding: 0.55rem 0.85rem;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
  }
  /* Promo stacks to two lines on phones, separator hidden */
  .lux-promo-banner {
    font-size: 0.62rem;
    padding: 0.4rem 0.7rem;
    letter-spacing: 0.06em;
    gap: 0.15rem 0.6rem;
    flex-direction: column;
  }
  .lux-promo-sep { display: none; }
  .lux-promo-line { white-space: normal; }
  /* Mobile drawer: right-size the tap targets + text */
  .lux-nav-mobile-link {
    font-size: 1rem !important;
    padding: 0.85rem 1rem !important;
    letter-spacing: 0.08em !important;
  }
  .lux-nav-mobile-link[data-level="sub"],
  .lux-nav-mobile .sub-link {
    font-size: 0.88rem !important;
    padding: 0.55rem 1rem 0.55rem 1.75rem !important;
  }
  .lux-nav-mobile-ctas a {
    font-size: 0.85rem !important;
    padding: 0.85rem 1rem !important;
  }
}

/* Very small phones (iPhone SE / small Android) */
@media (max-width: 380px) {
  .lux-nav-inner { padding: 0.55rem 0.7rem; }
  .lux-nav-brand-text .lux-nav-brand-name { font-size: 0.85rem; }
  .lux-nav-logo-wrap { width: 34px; height: 34px; }
  .lux-nav-book {
    padding: 0.45rem 0.7rem;
    font-size: 0.62rem;
  }
  .lux-promo-banner { font-size: 0.6rem; padding: 0.38rem 0.5rem; }
}
`;

const navItems = [
  { title: 'Home', href: '/', hasDropdown: false },
  { title: 'ATX Disco', href: '/atx-disco-cruise', hasDropdown: false },
  {
    title: 'Bach Parties',
    href: '/bachelorette-party-austin',
    hasDropdown: true,
    items: [
      { title: 'Austin Bachelorette Party', href: '/bachelorette-party-austin' },
      { title: 'Austin Bachelor Party', href: '/bachelor-party-austin' },
      { title: 'Combined Bach Party', href: '/combined-bachelor-bachelorette-austin' },
    ] as any[]
  },
  {
    title: 'Private Charters',
    href: '/private-cruises',
    hasDropdown: true,
    items: [
      { title: 'All Private Charters', href: '/private-cruises' },
      { section: 'Wedding' },
      { title: 'Rehearsal Dinner', href: '/rehearsal-dinner' },
      { title: 'Welcome Party', href: '/welcome-party' },
      { title: 'After Party', href: '/after-party' },
      { section: 'Corporate' },
      { title: 'Team Building', href: '/team-building' },
      { title: 'Client Entertainment', href: '/client-entertainment' },
      { title: 'Company Milestones', href: '/company-milestone' },
      { section: 'Birthday & Other' },
      { title: 'Milestone Birthdays', href: '/milestone-birthday' },
      { title: 'Sweet 16', href: '/sweet-16' },
      { title: 'Graduation Parties', href: '/graduation-party' },
    ] as any[]
  },
  { title: 'Gallery', href: '/gallery', hasDropdown: false },
  { title: 'Reviews', href: '/testimonials-faq', hasDropdown: false },
  { title: 'Contact', href: '/contact', hasDropdown: false },
];

export default function PublicNavigationLuxury() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LUX_NAV_STYLES }} />

      {/* Fixed header stack: promo + nav never overlap */}
      <div className="lux-header-stack">
        {/* Promo Banner — luxury take on live site's 2-line offer */}
        <div className="lux-promo-banner">
          <span className="lux-promo-line lux-promo-line--primary">
            <span className="lux-promo-icon" aria-hidden="true">✦</span>
            Request a quote to unlock a <strong>$150–$300+</strong> discount on your party cruise
          </span>
          <span className="lux-promo-sep" aria-hidden="true">·</span>
          <a href="/chat" className="lux-promo-line lux-promo-line--cta">
            Book in the <em>next 10 days</em> — <strong>save $150</strong>
          </a>
        </div>

        {/* Navigation */}
        <div className="lux-nav-container">
        <nav className={`lux-nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="lux-nav-inner">
            {/* Logo */}
            <a href="/" className="lux-nav-brand">
              <div className="lux-nav-logo-wrap">
                <div className="lux-nav-logo-inner">
                  <img src={logoPath} alt="Premier Party Cruises" />
                </div>
              </div>
              <div className="lux-nav-brand-text">
                <span className="lux-nav-brand-name">Premier Party <em>Cruises</em></span>
                <span className="lux-nav-brand-sub">Austin · Lake Travis · Since 2009</span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="lux-nav-links">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.href} className="lux-nav-dropdown-wrap">
                    <button className={`lux-nav-link ${location.startsWith(item.href) ? 'active' : ''}`}>
                      {item.title}
                      <ChevronDown style={{ width: 12, height: 12 }} />
                    </button>
                    <div className="lux-nav-dropdown">
                      {item.items?.map((sub, i) => (
                        'section' in sub ? (
                          <div key={`sec-${i}`} className="lux-nav-dropdown-section">{sub.section}</div>
                        ) : (
                          <a key={sub.href} href={sub.href} className="lux-nav-dropdown-item">{sub.title}</a>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <a key={item.href} href={item.href} className={`lux-nav-link ${location === item.href ? 'active' : ''}`}>
                    {item.title}
                  </a>
                )
              ))}
            </div>

            {/* CTAs */}
            <div className="lux-nav-cta-group">
              <a href="/chat" className="lux-nav-quote">Get Quote</a>
              <a href="/book" className="lux-nav-book">Book Now</a>
              <button
                className="lux-nav-mobile-toggle"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
          <div className="lux-nav-streak" />
        </nav>
        </div>
      </div>

      {/* Spacer: reserves document space equal to the fixed header's height
          so page content starts below it and nothing collides. */}
      <div className="lux-header-spacer" aria-hidden="true" />

      {/* Mobile Menu Overlay */}
      <div className={`lux-nav-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />

      {/* Mobile Menu */}
      <aside className={`lux-nav-mobile ${mobileOpen ? 'open' : ''}`}>
        <button className="lux-nav-mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
        <nav style={{ marginTop: '1rem' }}>
          {navItems.map((item) => (
            <div key={item.href}>
              <a href={item.href} className="lux-nav-mobile-link">{item.title}</a>
              {item.hasDropdown && item.items?.filter((s: any) => !('section' in s)).map((sub: any) => (
                <a
                  key={sub.href}
                  href={sub.href}
                  className="lux-nav-mobile-link"
                  style={{ paddingLeft: '1.5rem', fontSize: '0.78rem', color: 'var(--lux-cream-muted)' }}
                >
                  {sub.title}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="lux-nav-mobile-ctas">
          <a href="/chat" className="lux-nav-quote" style={{ textAlign: 'center' }}>Get Quote</a>
          <a href="/book" className="lux-nav-book" style={{ textAlign: 'center' }}>Book Now</a>
        </div>
      </aside>
    </>
  );
}
