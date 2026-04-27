import { useLocation } from 'wouter';
import V2PageTemplate from '@/components/V2PageTemplate';
import { getV2NewRoute } from '@/data/v2NewRoutes';

/**
 * V2RichContentRoute — generic SPA hydration target for the 6 V2-only
 * pages added 2026-04-26 (Sweet 16, family cruises, executive cruises,
 * sunset/anniversary, Lake bach, Canada→Austin bach).
 *
 * The build-time prerender produces the static HTML each crawler sees
 * (rich body, FAQs, FAQPage JSON-LD, curated <title>/<description>/<h1>).
 * This component re-renders the same content client-side so users
 * landing on /sweet-16-party-boat (etc.) hydrate over the prerendered
 * HTML without flashing a wouter 404.
 *
 * Source of truth: client/src/data/v2NewRoutes.ts (mirrored from
 * scripts/v2-rich-content.mjs at the time of authorship).
 */
export default function V2RichContentRoute() {
  const [location] = useLocation();
  const data = getV2NewRoute(location);

  if (!data) {
    return (
      <main style={{ padding: '6rem 2rem', textAlign: 'center', color: '#fff', background: '#07070C', minHeight: '100vh' }}>
        <h1>Page not found</h1>
        <p style={{ color: '#C8B898' }}>This route is not registered. Please check the URL.</p>
      </main>
    );
  }

  return (
    <V2PageTemplate
      pageUrl={data.slug}
      pageTitle={data.title}
      pageDescription={data.description}
      heroEyebrow={data.heroEyebrow}
      heroHeadline={data.h1}
      heroBody={data.intro}
      primaryCta={data.primaryCta}
      secondaryCta={data.secondaryCta}
      faqs={data.faqs}
      finalCtaHeadline={`Get a quote for your ${data.heroEyebrow.toLowerCase().split('·')[0].trim()} cruise.`}
      finalCtaBody="Build your Lake Travis quote in under a minute. Premier Party Cruises has operated Anderson Mill Marina for 15+ years with 150,000+ guests and zero safety incidents. Captain handles the driving; your group handles the celebration."
    >
      {data.sections.map((section, idx) => (
        <section
          key={idx}
          style={{
            padding: '4rem 2rem',
            background: idx % 2 === 0 ? 'var(--hp2-bg-1)' : 'var(--hp2-bg-2)',
          }}
        >
          <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--hp2-font-heading)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--hp2-cream)',
                marginTop: 0,
                marginBottom: '1.5rem',
              }}
            >
              {section.heading}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--hp2-font-body)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--hp2-cream-muted)',
                  marginBottom: '1.25rem',
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </V2PageTemplate>
  );
}
