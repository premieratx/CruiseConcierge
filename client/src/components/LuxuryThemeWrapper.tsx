/* Wraps a page in the V2 luxury theme (gold/black/cream) by injecting an
 * overriding <style> block. Use when you want to apply the luxury palette
 * to a custom page without rewriting all its Tailwind classes.
 *
 * Usage:
 *   <LuxuryThemeWrapper>
 *     <PublicNavigationLuxury />
 *     <main>{content}</main>
 *     <Footer />
 *   </LuxuryThemeWrapper>
 *
 * Or just add <LuxuryThemeOverrideStyles /> once per page to apply the
 * overrides via the `lux-theme-scope` class on the page's root element.
 */
import { ReactNode } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');

.lux-theme-scope {
  background: #07070C !important;
  color: #EDE3D0 !important;
  font-family: 'Jost', system-ui, sans-serif !important;
}
.lux-theme-scope [class*="bg-white"],
.lux-theme-scope [class*="bg-gray-5"],
.lux-theme-scope [class*="bg-gray-1"],
.lux-theme-scope [class*="bg-slate-5"],
.lux-theme-scope [class*="bg-slate-1"],
.lux-theme-scope [class*="bg-purple-5"],
.lux-theme-scope [class*="bg-purple-1"],
.lux-theme-scope [class*="bg-pink-5"],
.lux-theme-scope [class*="bg-pink-1"],
.lux-theme-scope [class*="bg-blue-5"],
.lux-theme-scope [class*="bg-blue-1"],
.lux-theme-scope [class*="bg-cyan-5"],
.lux-theme-scope [class*="bg-cyan-1"],
.lux-theme-scope [class*="from-purple"],
.lux-theme-scope [class*="from-pink"],
.lux-theme-scope [class*="from-blue"],
.lux-theme-scope [class*="from-cyan"],
.lux-theme-scope [class*="to-purple"],
.lux-theme-scope [class*="to-pink"],
.lux-theme-scope [class*="to-blue"],
.lux-theme-scope [class*="to-cyan"],
.lux-theme-scope [class*="via-white"],
.lux-theme-scope [class*="bg-gradient"] {
  background: #0F0F18 !important;
  background-image: none !important;
  color: #C8B898 !important;
}

.lux-theme-scope h1,
.lux-theme-scope h2,
.lux-theme-scope h3,
.lux-theme-scope h4 {
  font-family: 'Cormorant Garamond', Georgia, serif !important;
  color: #F0E6D0 !important;
  font-weight: 300 !important;
  letter-spacing: -0.005em !important;
}
.lux-theme-scope h3, .lux-theme-scope h4 { font-weight: 400 !important; }
.lux-theme-scope em {
  color: #DFC08A !important;
  font-style: italic;
}

.lux-theme-scope [class*="text-gray-9"],
.lux-theme-scope [class*="text-gray-8"],
.lux-theme-scope [class*="text-slate-9"],
.lux-theme-scope [class*="text-slate-8"],
.lux-theme-scope [class*="text-black"] { color: #F0E6D0 !important; }
.lux-theme-scope [class*="text-gray-7"],
.lux-theme-scope [class*="text-gray-6"],
.lux-theme-scope [class*="text-gray-5"],
.lux-theme-scope [class*="text-slate-7"],
.lux-theme-scope [class*="text-slate-6"],
.lux-theme-scope [class*="text-slate-5"] { color: #C8B898 !important; }
.lux-theme-scope [class*="text-purple"],
.lux-theme-scope [class*="text-pink"],
.lux-theme-scope [class*="text-rose"],
.lux-theme-scope [class*="text-cyan"] { color: #DFC08A !important; }
.lux-theme-scope [class*="text-blue"] { color: #42A5F5 !important; }
.lux-theme-scope [class*="text-yellow"],
.lux-theme-scope [class*="text-amber"] { color: #C8A96E !important; }

.lux-theme-scope p,
.lux-theme-scope li { color: #C8B898 !important; line-height: 1.7; }
.lux-theme-scope strong,
.lux-theme-scope b { color: #F0E6D0 !important; }

.lux-theme-scope a:not(.lux-nav-link):not(.lux-nav-quote):not(.lux-nav-book):not(.lux-promo-line--cta):not(.lux-nav-brand) {
  color: #DFC08A !important;
  text-decoration: underline;
  text-decoration-color: rgba(200,169,110,0.35);
  text-underline-offset: 3px;
}
.lux-theme-scope a:not(.lux-nav-link):hover { color: #EDD9AA !important; }

.lux-theme-scope button[class*="bg-gradient"],
.lux-theme-scope button[class*="bg-purple-6"],
.lux-theme-scope button[class*="bg-pink-6"],
.lux-theme-scope a[class*="bg-purple-6"],
.lux-theme-scope a[class*="bg-pink-6"] {
  background: linear-gradient(135deg, #C8A96E 0%, #DFC08A 100%) !important;
  color: #07070C !important;
  border: 1px solid #C8A96E !important;
}

.lux-theme-scope [class*="border-gray"],
.lux-theme-scope [class*="border-slate"],
.lux-theme-scope [class*="border-purple"],
.lux-theme-scope [class*="border-pink"] {
  border-color: rgba(200,169,110,0.2) !important;
}

.lux-theme-scope img {
  border: 1px solid rgba(200,169,110,0.18);
  border-radius: 6px;
  max-height: 560px;
  object-fit: cover;
}
`;

export function LuxuryThemeOverrideStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

export default function LuxuryThemeWrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`lux-theme-scope ${className}`}>
      <LuxuryThemeOverrideStyles />
      {children}
    </div>
  );
}
