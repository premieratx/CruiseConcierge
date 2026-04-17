import { lazy, Suspense, ReactNode } from 'react';
import { Link } from 'wouter';
import PublicNavigationLuxury from '@/components/PublicNavigationLuxury';

const Footer = lazy(() => import('@/components/Footer'));

const BLOG_V2_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

:root {
  --bv2-bg-0: #07070C;
  --bv2-bg-1: #0F0F18;
  --bv2-bg-2: #141420;
  --bv2-bg-card: #1A1A26;
  --bv2-gold: #C8A96E;
  --bv2-gold-light: #DFC08A;
  --bv2-gold-pale: #EDD9AA;
  --bv2-cream: #F0E6D0;
  --bv2-cream-muted: #C8B898;
  --bv2-text-muted: #A89878;
  --bv2-border: rgba(200,169,110,0.18);
  --bv2-brand-blue: #1E88E5;
  --bv2-brand-blue-light: #42A5F5;
  --bv2-font-display: 'Cormorant Garamond', Georgia, serif;
  --bv2-font-body: 'Jost', system-ui, sans-serif;
}

.bv2-page {
  background: var(--bv2-bg-0);
  color: var(--bv2-cream);
  font-family: var(--bv2-font-body);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

/* Apply luxury styling to article content */
.bv2-article-wrap {
  padding-top: 6rem;
  min-height: 100vh;
}

.bv2-article-wrap,
.bv2-article-wrap section,
.bv2-article-wrap article,
.bv2-article-wrap main {
  background: transparent !important;
}

/* Breadcrumbs */
.bv2-breadcrumbs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0.5rem;
  font-family: var(--bv2-font-body);
  font-size: 0.78rem;
  color: var(--bv2-text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.bv2-breadcrumbs a {
  color: var(--bv2-gold);
  text-decoration: none;
  transition: color 0.2s ease;
}
.bv2-breadcrumbs a:hover {
  color: var(--bv2-gold-light);
}
.bv2-breadcrumbs span.sep {
  margin: 0 0.75rem;
  color: var(--bv2-border);
}

/* Tier labels above articles */
.bv2-article-tag {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 2rem 1rem;
  font-family: var(--bv2-font-body);
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: var(--bv2-gold);
  position: relative;
}
.bv2-article-tag::before {
  content: '';
  display: inline-block;
  width: 28px;
  height: 1px;
  background: var(--bv2-gold);
  vertical-align: middle;
  margin-right: 1rem;
}

/* ═══════════════════════════════════════════════════════════
   UNIVERSAL LUXURY OVERRIDES
   Force the luxury black/gold/cream palette on ALL legacy content.
   Only accent colors permitted: gold (primary), brand-blue (accent),
   brand-yellow (rare, for highlight badges only).
   ═══════════════════════════════════════════════════════════ */

/* Force dark base on ALL section-level elements */
.bv2-article-wrap > *,
.bv2-article-wrap section,
.bv2-article-wrap article,
.bv2-article-wrap main,
.bv2-article-wrap aside,
.bv2-article-wrap header,
.bv2-article-wrap footer {
  background: transparent !important;
  background-image: none !important;
  color: var(--bv2-cream-muted) !important;
}

/* Force dark on ANY light background (Tailwind variants) */
.bv2-article-wrap [class*="bg-white"],
.bv2-article-wrap [class*="bg-gray-"],
.bv2-article-wrap [class*="bg-slate-"],
.bv2-article-wrap [class*="bg-zinc-"],
.bv2-article-wrap [class*="bg-stone-"],
.bv2-article-wrap [class*="bg-neutral-"] {
  background: var(--bv2-bg-card) !important;
  background-image: none !important;
  color: var(--bv2-cream-muted) !important;
  border-color: var(--bv2-border) !important;
}

/* Override ALL colorful backgrounds (pink/purple/rose/etc.) to luxury */
.bv2-article-wrap [class*="bg-pink-"],
.bv2-article-wrap [class*="bg-rose-"],
.bv2-article-wrap [class*="bg-fuchsia-"],
.bv2-article-wrap [class*="bg-purple-"],
.bv2-article-wrap [class*="bg-violet-"],
.bv2-article-wrap [class*="bg-indigo-"],
.bv2-article-wrap [class*="bg-red-"],
.bv2-article-wrap [class*="bg-orange-"],
.bv2-article-wrap [class*="bg-amber-"],
.bv2-article-wrap [class*="bg-yellow-"],
.bv2-article-wrap [class*="bg-lime-"],
.bv2-article-wrap [class*="bg-green-"],
.bv2-article-wrap [class*="bg-emerald-"],
.bv2-article-wrap [class*="bg-teal-"],
.bv2-article-wrap [class*="bg-cyan-"],
.bv2-article-wrap [class*="bg-sky-"],
.bv2-article-wrap [class*="bg-blue-"] {
  background: var(--bv2-bg-card) !important;
  background-image: none !important;
  color: var(--bv2-cream-muted) !important;
  border-color: var(--bv2-border) !important;
}

/* Override gradient classes */
.bv2-article-wrap [class*="bg-gradient-"],
.bv2-article-wrap [class*="from-"],
.bv2-article-wrap [class*="via-"],
.bv2-article-wrap [class*="to-"] {
  background-image: linear-gradient(135deg, var(--bv2-bg-card) 0%, var(--bv2-bg-1) 100%) !important;
  background-color: var(--bv2-bg-card) !important;
  color: var(--bv2-cream-muted) !important;
}

/* ACCENT CARDS: preserve semantic meaning using luxury accent colors
   Opacity/subtle variants get blue-tinted treatment */
.bv2-article-wrap [class*="bg-blue-5"],
.bv2-article-wrap [class*="bg-blue-6"],
.bv2-article-wrap [class*="bg-blue-7"],
.bv2-article-wrap [class*="bg-blue-8"],
.bv2-article-wrap [class*="bg-blue-9"],
.bv2-article-wrap [class*="bg-sky-6"],
.bv2-article-wrap [class*="bg-sky-7"],
.bv2-article-wrap [class*="bg-sky-8"],
.bv2-article-wrap [class*="bg-sky-9"] {
  background: linear-gradient(135deg, rgba(30,136,229,0.12) 0%, var(--bv2-bg-card) 100%) !important;
  background-image: linear-gradient(135deg, rgba(30,136,229,0.12) 0%, var(--bv2-bg-card) 100%) !important;
  color: var(--bv2-cream) !important;
  border: 1px solid rgba(30,136,229,0.3) !important;
}

/* TEXT COLOR OVERRIDES — force everything to luxury palette */
.bv2-article-wrap [class*="text-pink-"],
.bv2-article-wrap [class*="text-rose-"],
.bv2-article-wrap [class*="text-fuchsia-"],
.bv2-article-wrap [class*="text-purple-"],
.bv2-article-wrap [class*="text-violet-"],
.bv2-article-wrap [class*="text-indigo-"],
.bv2-article-wrap [class*="text-red-"],
.bv2-article-wrap [class*="text-orange-"],
.bv2-article-wrap [class*="text-amber-"],
.bv2-article-wrap [class*="text-lime-"],
.bv2-article-wrap [class*="text-green-"],
.bv2-article-wrap [class*="text-emerald-"],
.bv2-article-wrap [class*="text-teal-"] {
  color: var(--bv2-gold-light) !important;
}

/* Yellow text → keep as yellow-tinted gold for badges */
.bv2-article-wrap [class*="text-yellow-"] {
  color: var(--bv2-gold-pale) !important;
}

/* Blue text → keep as brand blue for accent text */
.bv2-article-wrap [class*="text-blue-"],
.bv2-article-wrap [class*="text-cyan-"],
.bv2-article-wrap [class*="text-sky-"] {
  color: var(--bv2-brand-blue-light) !important;
}

/* Light text → cream */
.bv2-article-wrap [class*="text-white"],
.bv2-article-wrap [class*="text-gray-50"],
.bv2-article-wrap [class*="text-gray-100"],
.bv2-article-wrap [class*="text-gray-200"],
.bv2-article-wrap [class*="text-slate-50"],
.bv2-article-wrap [class*="text-slate-100"],
.bv2-article-wrap [class*="text-slate-200"] {
  color: var(--bv2-cream) !important;
}

/* Dark text (body) → cream muted */
.bv2-article-wrap [class*="text-gray-6"],
.bv2-article-wrap [class*="text-gray-7"],
.bv2-article-wrap [class*="text-gray-8"],
.bv2-article-wrap [class*="text-gray-9"],
.bv2-article-wrap [class*="text-slate-6"],
.bv2-article-wrap [class*="text-slate-7"],
.bv2-article-wrap [class*="text-slate-8"],
.bv2-article-wrap [class*="text-slate-9"],
.bv2-article-wrap [class*="text-zinc-6"],
.bv2-article-wrap [class*="text-zinc-7"],
.bv2-article-wrap [class*="text-zinc-8"],
.bv2-article-wrap [class*="text-zinc-9"],
.bv2-article-wrap [class*="text-black"] {
  color: var(--bv2-cream-muted) !important;
}

/* Border color overrides */
.bv2-article-wrap [class*="border-pink-"],
.bv2-article-wrap [class*="border-rose-"],
.bv2-article-wrap [class*="border-purple-"],
.bv2-article-wrap [class*="border-fuchsia-"],
.bv2-article-wrap [class*="border-amber-"],
.bv2-article-wrap [class*="border-yellow-"],
.bv2-article-wrap [class*="border-orange-"],
.bv2-article-wrap [class*="border-red-"],
.bv2-article-wrap [class*="border-green-"],
.bv2-article-wrap [class*="border-emerald-"],
.bv2-article-wrap [class*="border-teal-"],
.bv2-article-wrap [class*="border-gray-"],
.bv2-article-wrap [class*="border-slate-"],
.bv2-article-wrap [class*="border-white"],
.bv2-article-wrap [class*="border-zinc-"] {
  border-color: var(--bv2-border) !important;
}
.bv2-article-wrap [class*="border-blue-"],
.bv2-article-wrap [class*="border-cyan-"],
.bv2-article-wrap [class*="border-sky-"],
.bv2-article-wrap [class*="border-indigo-"] {
  border-color: rgba(30,136,229,0.35) !important;
}

/* Typography */
.bv2-article-wrap h1,
.bv2-article-wrap h2 {
  font-family: var(--bv2-font-display) !important;
  color: var(--bv2-cream) !important;
  font-weight: 300 !important;
  letter-spacing: 0 !important;
}
.bv2-article-wrap h1 em,
.bv2-article-wrap h2 em {
  color: var(--bv2-gold-light) !important;
  font-style: italic !important;
}
.bv2-article-wrap h3,
.bv2-article-wrap h4,
.bv2-article-wrap h5 {
  font-family: var(--bv2-font-display) !important;
  color: var(--bv2-cream) !important;
  font-weight: 400 !important;
}
.bv2-article-wrap p,
.bv2-article-wrap li,
.bv2-article-wrap span,
.bv2-article-wrap div {
  line-height: 1.75;
}
.bv2-article-wrap p,
.bv2-article-wrap li {
  color: var(--bv2-cream-muted) !important;
}
.bv2-article-wrap strong,
.bv2-article-wrap b {
  color: var(--bv2-cream) !important;
  font-weight: 600;
}

/* Inline links in article body */
.bv2-article-wrap a:not(.bv2-cta-card):not(.bv2-quick-link):not(.bv2-related-card):not(.bv2-pillar-cta__btn):not(.bv2-mid-cta__primary):not(.bv2-mid-cta__secondary) {
  color: var(--bv2-gold-light) !important;
  text-decoration: underline;
  text-decoration-color: rgba(200,169,110,0.35);
  text-underline-offset: 3px;
  transition: color 0.2s ease;
  background: transparent !important;
}
.bv2-article-wrap a:not(.bv2-cta-card):not(.bv2-quick-link):not(.bv2-related-card):not(.bv2-pillar-cta__btn):not(.bv2-mid-cta__primary):not(.bv2-mid-cta__secondary):hover {
  color: var(--bv2-gold-pale) !important;
}

/* CTA-like colored buttons inside article body → luxury gold button */
.bv2-article-wrap button[class*="bg-"],
.bv2-article-wrap a[class*="bg-pink-5"],
.bv2-article-wrap a[class*="bg-pink-6"],
.bv2-article-wrap a[class*="bg-rose-5"],
.bv2-article-wrap a[class*="bg-rose-6"],
.bv2-article-wrap a[class*="bg-purple-5"],
.bv2-article-wrap a[class*="bg-purple-6"] {
  background: linear-gradient(135deg, var(--bv2-gold) 0%, var(--bv2-gold-light) 100%) !important;
  background-image: linear-gradient(135deg, var(--bv2-gold) 0%, var(--bv2-gold-light) 100%) !important;
  color: var(--bv2-bg-0) !important;
  border: 1px solid var(--bv2-gold) !important;
  text-decoration: none !important;
}
.bv2-article-wrap button[class*="bg-"]:hover,
.bv2-article-wrap a[class*="bg-pink-5"]:hover,
.bv2-article-wrap a[class*="bg-pink-6"]:hover,
.bv2-article-wrap a[class*="bg-rose-5"]:hover,
.bv2-article-wrap a[class*="bg-rose-6"]:hover {
  box-shadow: 0 0 24px rgba(200,169,110,0.5) !important;
  transform: translateY(-1px) !important;
}

/* Images — add subtle gold border */
.bv2-article-wrap img {
  border: 1px solid var(--bv2-border);
}

/* Blockquotes */
.bv2-article-wrap blockquote {
  border-left: 3px solid var(--bv2-gold) !important;
  background: var(--bv2-bg-card) !important;
  color: var(--bv2-cream-muted) !important;
  padding: 1rem 1.5rem;
  font-family: var(--bv2-font-display);
  font-style: italic;
  font-size: 1.15rem;
}

/* Tables */
.bv2-article-wrap table {
  background: var(--bv2-bg-card) !important;
  color: var(--bv2-cream-muted) !important;
  border: 1px solid var(--bv2-border);
}
.bv2-article-wrap th {
  background: var(--bv2-bg-1) !important;
  color: var(--bv2-gold) !important;
  border-color: var(--bv2-border) !important;
}
.bv2-article-wrap td {
  border-color: var(--bv2-border) !important;
}

/* Badge-style pills → gold */
.bv2-article-wrap [class*="rounded-full"][class*="bg-"] {
  background: rgba(200,169,110,0.15) !important;
  background-image: none !important;
  color: var(--bv2-gold-light) !important;
  border: 1px solid var(--bv2-border) !important;
}

/* SVG icons in article → gold */
.bv2-article-wrap svg {
  color: var(--bv2-gold) !important;
}

/* Shadows — remove colorful ones */
.bv2-article-wrap [class*="shadow-pink"],
.bv2-article-wrap [class*="shadow-purple"],
.bv2-article-wrap [class*="shadow-rose"] {
  box-shadow: 0 8px 32px rgba(0,0,0,0.4) !important;
}

/* Ring/outline colors */
.bv2-article-wrap [class*="ring-pink"],
.bv2-article-wrap [class*="ring-rose"],
.bv2-article-wrap [class*="ring-purple"],
.bv2-article-wrap [class*="ring-amber"],
.bv2-article-wrap [class*="ring-yellow"] {
  --tw-ring-color: var(--bv2-gold) !important;
}

/* Pillar CTA — above the fold, sticky linking to pillar page */
.bv2-pillar-cta {
  max-width: 1200px;
  margin: 1rem auto 2rem;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background:
    radial-gradient(ellipse at 0% 50%, rgba(30,136,229,0.1) 0%, transparent 45%),
    var(--bv2-bg-card);
  border: 1px solid var(--bv2-border);
  border-left: 3px solid var(--bv2-gold);
  flex-wrap: wrap;
}
.bv2-pillar-cta__text {
  font-family: var(--bv2-font-body);
  font-size: 0.92rem;
  color: var(--bv2-cream-muted);
  line-height: 1.5;
}
.bv2-pillar-cta__text strong {
  font-family: var(--bv2-font-display);
  font-size: 1.15rem;
  color: var(--bv2-cream);
  font-weight: 500;
}
.bv2-pillar-cta__text em {
  color: var(--bv2-gold-light);
  font-style: italic;
}
.bv2-pillar-cta__btn {
  font-family: var(--bv2-font-body);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--bv2-gold) 0%, var(--bv2-gold-light) 100%);
  color: var(--bv2-bg-0);
  text-decoration: none !important;
  white-space: nowrap;
  transition: all 0.3s ease;
}
.bv2-pillar-cta__btn:hover {
  box-shadow: 0 0 24px rgba(200,169,110,0.5);
  transform: translateY(-1px);
}

/* Mid-article booking nudge */
.bv2-mid-cta {
  max-width: 900px;
  margin: 4rem auto;
  padding: 2.5rem 2rem;
  text-align: center;
  background:
    radial-gradient(ellipse at center, rgba(30,136,229,0.12) 0%, transparent 60%),
    var(--bv2-bg-1);
  border: 1px solid var(--bv2-border);
  border-top: 2px solid var(--bv2-gold);
  border-bottom: 2px solid var(--bv2-gold);
}
.bv2-mid-cta h3 {
  font-family: var(--bv2-font-display);
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--bv2-cream);
  margin: 0 0 0.75rem 0;
}
.bv2-mid-cta h3 em {
  color: var(--bv2-gold-light);
  font-style: italic;
}
.bv2-mid-cta p {
  font-size: 1rem;
  color: var(--bv2-cream-muted);
  margin: 0 0 1.5rem 0;
}
.bv2-mid-cta__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.bv2-mid-cta__primary {
  font-family: var(--bv2-font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.9rem 1.75rem;
  background: linear-gradient(135deg, var(--bv2-gold) 0%, var(--bv2-gold-light) 100%);
  color: var(--bv2-bg-0);
  text-decoration: none !important;
  transition: all 0.3s ease;
}
.bv2-mid-cta__secondary {
  font-family: var(--bv2-font-body);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.9rem 1.75rem;
  background: transparent;
  color: var(--bv2-brand-blue-light);
  border: 1px solid var(--bv2-brand-blue);
  text-decoration: none !important;
  transition: all 0.3s ease;
}
.bv2-mid-cta__primary:hover {
  box-shadow: 0 0 24px rgba(200,169,110,0.5);
}
.bv2-mid-cta__secondary:hover {
  background: rgba(30,136,229,0.1);
  box-shadow: 0 0 20px rgba(30,136,229,0.4);
}

/* Related articles */
.bv2-related {
  max-width: 1200px;
  margin: 4rem auto 2rem;
  padding: 3rem 2rem;
  border-top: 1px solid var(--bv2-border);
}
.bv2-related__label {
  font-family: var(--bv2-font-body);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: var(--bv2-gold);
  margin-bottom: 0.75rem;
}
.bv2-related__headline {
  font-family: var(--bv2-font-display);
  font-size: 2rem;
  font-weight: 300;
  color: var(--bv2-cream);
  margin: 0 0 2rem 0;
}
.bv2-related__headline em {
  color: var(--bv2-gold-light);
  font-style: italic;
}
.bv2-related__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.bv2-related-card {
  display: block;
  padding: 1.5rem;
  background: var(--bv2-bg-card);
  border: 1px solid var(--bv2-border);
  text-decoration: none !important;
  transition: all 0.3s ease;
}
.bv2-related-card:hover {
  border-color: var(--bv2-gold);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}
.bv2-related-card__label {
  font-family: var(--bv2-font-body);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.24em;
  color: var(--bv2-gold);
  margin-bottom: 0.5rem;
}
.bv2-related-card__title {
  font-family: var(--bv2-font-display);
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--bv2-cream);
  line-height: 1.3;
}

/* Author byline */
.bv2-byline {
  max-width: 900px;
  margin: 2rem auto 3rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--bv2-font-body);
  font-size: 0.85rem;
  color: var(--bv2-text-muted);
}
.bv2-byline__circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--bv2-gold) 0%, var(--bv2-gold-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--bv2-font-display);
  font-size: 1.1rem;
  color: var(--bv2-bg-0);
  font-weight: 500;
  flex-shrink: 0;
}
.bv2-byline strong {
  color: var(--bv2-cream);
  font-weight: 500;
}

/* Quick Links footer */
.bv2-quick-links {
  background: var(--bv2-bg-1);
  padding: 3rem 2rem;
  border-top: 1px solid var(--bv2-border);
}
.bv2-quick-links__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2.5rem;
  justify-content: center;
}
.bv2-quick-link {
  color: var(--bv2-cream-muted);
  font-size: 0.82rem;
  font-family: var(--bv2-font-body);
  letter-spacing: 0.04em;
  text-decoration: none !important;
  transition: color 0.2s ease;
}
.bv2-quick-link:hover {
  color: var(--bv2-gold);
}
.bv2-quick-link--primary {
  color: var(--bv2-gold);
}

@media (max-width: 900px) {
  .bv2-related__grid { grid-template-columns: 1fr; gap: 1rem; }
  .bv2-article-wrap { padding-top: 5rem; }
  .bv2-breadcrumbs,
  .bv2-article-tag,
  .bv2-pillar-cta,
  .bv2-related { padding-left: 1rem; padding-right: 1rem; }
  .bv2-pillar-cta { flex-direction: column; align-items: flex-start; }
}
`;

export interface BlogV2LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  slug: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  heroImage?: string;
  category?: string;
  categoryHref?: string;
  pillarTitle?: string;
  pillarHref?: string;
  pillarCtaText?: string;
  faqs?: Array<{ q: string; a: string }>;
  relatedArticles?: Array<{ title: string; href: string; category?: string }>;
  additionalSchema?: object[];
  includeMidCta?: boolean;
  midCtaHeadline?: ReactNode;
  midCtaBody?: string;
}

const DEFAULT_QUICK_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'ATX Disco Cruise', href: '/atx-disco-cruise', primary: true },
  { title: 'Bachelorette Party', href: '/bachelorette-party-austin' },
  { title: 'Bachelor Party', href: '/bachelor-party-austin' },
  { title: 'Combined Bach', href: '/combined-bachelor-bachelorette-austin' },
  { title: 'Private Charters', href: '/private-cruises' },
  { title: 'Corporate Events', href: '/corporate-events' },
  { title: 'Wedding Parties', href: '/wedding-parties' },
  { title: 'Birthday Parties', href: '/birthday-parties' },
  { title: 'Gallery', href: '/gallery' },
  { title: 'Reviews & FAQ', href: '/testimonials-faq' },
  { title: 'Contact', href: '/contact' },
  { title: 'All Blogs', href: '/blogs' },
];

export default function BlogV2Layout({
  children,
  title,
  description,
  slug,
  publishDate = '2024-01-01',
  modifiedDate = '2026-04-15',
  author = 'Premier Party Cruises Team',
  heroImage = 'https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp',
  category = 'Bachelorette Guides',
  categoryHref = '/bachelorette-party-austin',
  pillarTitle = 'Austin Bachelorette Party Guide',
  pillarHref = '/bachelorette-party-austin',
  pillarCtaText = 'View the Complete Guide',
  faqs = [],
  relatedArticles = [],
  additionalSchema = [],
  includeMidCta = true,
  midCtaHeadline,
  midCtaBody,
}: BlogV2LayoutProps) {
  const pageUrl = `https://premierpartycruises.com/blogs/${slug}`;
  const authorInitial = author.charAt(0);

  // Build JSON-LD @graph
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": heroImage,
        "datePublished": publishDate,
        "dateModified": modifiedDate,
        "author": {
          "@type": "Organization",
          "name": "Premier Party Cruises",
          "url": "https://premierpartycruises.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Premier Party Cruises",
          "logo": {
            "@type": "ImageObject",
            "url": "https://premierpartycruises.com/attached_assets/PPC-Logo-LARGE.webp"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://premierpartycruises.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://premierpartycruises.com/blogs" },
          { "@type": "ListItem", "position": 3, "name": category, "item": `https://premierpartycruises.com${categoryHref}` },
          { "@type": "ListItem", "position": 4, "name": title, "item": pageUrl }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Premier Party Cruises",
        "image": "https://premierpartycruises.com/attached_assets/PPC-Logo-LARGE.webp",
        "url": "https://premierpartycruises.com",
        "telephone": "+1-512-488-5892",
        "address": { "@type": "PostalAddress", "streetAddress": "13993 FM 2769", "addressLocality": "Leander", "addressRegion": "TX", "postalCode": "78641", "addressCountry": "US" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "420", "bestRating": "5" }
      },
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }] : []),
      ...additionalSchema
    ]
  };

  return (
    <div className="bv2-page">
      <style dangerouslySetInnerHTML={{ __html: BLOG_V2_STYLES }} />
      <PublicNavigationLuxury />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* Breadcrumbs */}
      <nav className="bv2-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="sep">/</span>
        <Link href="/blogs">Blog</Link>
        <span className="sep">/</span>
        <Link href={categoryHref}>{category}</Link>
        <span className="sep">/</span>
        <span style={{ color: 'var(--bv2-cream-muted)' }}>{title.length > 50 ? title.substring(0, 47) + '...' : title}</span>
      </nav>

      {/* Category label */}
      <div className="bv2-article-tag">{category}</div>

      {/* Above-the-fold pillar CTA */}
      <div className="bv2-pillar-cta">
        <div className="bv2-pillar-cta__text">
          <strong>{pillarTitle}</strong><br />
          Looking for the complete <em>{category.toLowerCase()}</em>? Our pillar guide has everything in one place — pricing, itineraries, real-group tips, and more.
        </div>
        <a href={pillarHref} className="bv2-pillar-cta__btn">
          {pillarCtaText} →
        </a>
      </div>

      {/* Author byline */}
      <div className="bv2-byline">
        <div className="bv2-byline__circle">{authorInitial}</div>
        <div>
          By <strong>{author}</strong> · Updated {new Date(modifiedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} · 15+ years planning Austin celebrations since 2009
        </div>
      </div>

      {/* Original article content (95% preserved) */}
      <div className="bv2-article-wrap">
        {children}
      </div>

      {/* Mid-article CTA (optional) */}
      {includeMidCta && (
        <section className="bv2-mid-cta">
          <h3>
            {midCtaHeadline || <>Ready to book your <em>{category.toLowerCase().replace(' guides', '')}</em>?</>}
          </h3>
          <p>
            {midCtaBody || `Our team handles every detail. Just tell us the date and group size — we'll take care of the rest.`}
          </p>
          <div className="bv2-mid-cta__actions">
            <a href={pillarHref} className="bv2-mid-cta__primary">View Full Guide →</a>
            <a href="/chat" className="bv2-mid-cta__secondary">Get Instant Quote</a>
          </div>
        </section>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="bv2-related">
          <div className="bv2-related__label">Related Reading</div>
          <h2 className="bv2-related__headline">
            Continue your <em>{category.toLowerCase().replace(' guides', '').replace(' blog', '')}</em> research
          </h2>
          <div className="bv2-related__grid">
            {relatedArticles.slice(0, 3).map((art, i) => (
              <a key={i} href={art.href} className="bv2-related-card">
                <div className="bv2-related-card__label">{art.category || category}</div>
                <div className="bv2-related-card__title">{art.title}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="bv2-quick-links">
        <div className="bv2-quick-links__inner">
          {DEFAULT_QUICK_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`bv2-quick-link ${link.primary ? 'bv2-quick-link--primary' : ''}`}
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
