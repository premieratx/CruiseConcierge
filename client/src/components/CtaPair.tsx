/*
 * CtaPair — the standard "Get Quote" (outline) + "Book Now" (filled)
 * button pair, styled to match the nav header so the same visual
 * vocabulary repeats through the page.
 *
 * Clicking Get Quote → opens the QuoteLightbox popup.
 * Clicking Book Now → opens the Xola slide-out booking widget.
 *
 * Variants:
 *   - "inline"  — inline-flex pair, drops next to other content
 *   - "banner"  — full-width mid-page CTA strip with optional headline
 *
 * Use on every main V2 page. 3 placements:
 *   1. In-hero
 *   2. Mid-page banner (between sections)
 *   3. Final CTA
 */

import { useQuoteLightbox } from "./QuoteLightbox";
import { XOLA_BUTTON_ID } from "./XolaBookNow";

const STYLES = `
.cta-pair {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.cta-pair__btn {
  appearance: none;
  cursor: pointer;
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 0.85rem 1.5rem;
  border-radius: 4px;
  transition: box-shadow 0.2s, transform 0.15s, color 0.2s, background 0.2s, border-color 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  line-height: 1;
}
.cta-pair__btn--quote {
  background: transparent;
  color: #DFC08A;
  border: 1px solid rgba(200,169,110,0.45);
}
.cta-pair__btn--quote:hover {
  color: #F0E6D0;
  border-color: #C8A96E;
  background: rgba(200,169,110,0.06);
}
.cta-pair__btn--book {
  background: linear-gradient(135deg, #C8A96E 0%, #DFC08A 100%);
  color: #07070C;
  border: 1px solid #C8A96E;
}
.cta-pair__btn--book:hover {
  box-shadow: 0 0 24px rgba(200,169,110,0.5);
  transform: translateY(-1px);
}

.cta-pair__xola-wrap { display: inline-block; }

/* Banner variant — mid-page full-width CTA strip */
.cta-banner {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(30,136,229,0.08) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 50%, rgba(200,169,110,0.07) 0%, transparent 60%),
    linear-gradient(135deg, #0A0A12 0%, #141420 100%);
  border-top: 1px solid rgba(200,169,110,0.18);
  border-bottom: 1px solid rgba(200,169,110,0.18);
  padding: 2.75rem 2rem;
  text-align: center;
  color: #F0E6D0;
}
.cta-banner__eyebrow {
  font-family: 'Jost', system-ui, sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #C8A96E;
  margin: 0 0 0.75rem;
}
.cta-banner__headline {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 300;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  line-height: 1.15;
  color: #F0E6D0;
  margin: 0 0 1.25rem;
}
.cta-banner__headline em { font-style: italic; color: #DFC08A; }
.cta-banner__sub {
  color: #C8B898;
  font-size: 0.98rem;
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto 1.5rem;
}

@media (max-width: 560px) {
  .cta-pair { width: 100%; flex-direction: column; gap: 0.6rem; }
  .cta-pair__btn,
  .cta-pair__xola-wrap { width: 100%; }
  .cta-pair__btn { padding: 0.95rem 1.25rem; font-size: 0.76rem; }
  .cta-banner { padding: 2rem 1.25rem; }
}
`;

type CtaPairProps = {
  /** Source attribution sent to the quote iframe for analytics. */
  source?: string;
  /** Optional custom button labels (rare — defaults match nav). */
  quoteLabel?: string;
  bookLabel?: string;
  /** Tailwind/className pass-through for the outer flex container. */
  className?: string;
};

export default function CtaPair({
  source = "cta_pair",
  quoteLabel = "Get a Quote",
  bookLabel = "Book Now",
  className = "",
}: CtaPairProps) {
  const { openQuote } = useQuoteLightbox();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className={`cta-pair ${className}`}>
        <button
          type="button"
          className="cta-pair__btn cta-pair__btn--quote"
          onClick={() => openQuote(source)}
        >
          {quoteLabel}
        </button>
        <div
          className="cta-pair__xola-wrap xola-custom xola-checkout"
          data-button-id={XOLA_BUTTON_ID}
          data-xola-button="true"
        >
          <button type="button" className="cta-pair__btn cta-pair__btn--book">
            {bookLabel}
          </button>
        </div>
      </div>
    </>
  );
}

/**
 * Full-width mid-page banner with optional headline + body + the
 * CtaPair centered below. Drop between content sections.
 */
export function CtaBanner({
  eyebrow = "Ready When You Are",
  headline,
  body,
  source = "cta_banner",
}: {
  eyebrow?: string;
  headline?: React.ReactNode;
  body?: string;
  source?: string;
}) {
  return (
    <section className="cta-banner">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {eyebrow && <p className="cta-banner__eyebrow">{eyebrow}</p>}
      <h3 className="cta-banner__headline">
        {headline ?? (
          <>
            Get a quote or <em>book your date</em>.
          </>
        )}
      </h3>
      {body && <p className="cta-banner__sub">{body}</p>}
      <CtaPair source={source} />
    </section>
  );
}
