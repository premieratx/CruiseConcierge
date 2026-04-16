import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * PricingBreakdownV2 — Detailed package comparison (Base / Essentials /
 * Ultimate / Custom).
 * Route: /pricing-breakdown-v2
 *
 * Uses a structured HTML comparison table so an AI can extract exactly
 * what's included in each tier. Four packages, transparent pricing, and
 * a small FAQ clarifying upgrades and which package typical groups pick.
 */

const BREAKDOWN_STYLES = `
.hp2-pkg-table-wrap {
  overflow-x: auto;
  margin-top: 3rem;
  border: 1px solid var(--hp2-border);
  background: var(--hp2-bg-card);
}
.hp2-pkg-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--hp2-font-body);
  min-width: 780px;
}
.hp2-pkg-table thead {
  background: linear-gradient(135deg, rgba(200,169,110,0.14) 0%, rgba(200,169,110,0.04) 100%);
  border-bottom: 1px solid var(--hp2-gold-dim2);
}
.hp2-pkg-table thead th {
  padding: 1.5rem 1.25rem;
  text-align: center;
  color: var(--hp2-cream);
  border-right: 1px solid var(--hp2-border-sub);
}
.hp2-pkg-table thead th:last-child { border-right: none; }
.hp2-pkg-table thead th:first-child { text-align: left; }
.hp2-pkg-table__tier-label {
  display: block;
  font-family: var(--hp2-font-body);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--hp2-gold);
  margin-bottom: 0.6rem;
}
.hp2-pkg-table__tier-name {
  display: block;
  font-family: var(--hp2-font-display);
  font-size: 1.55rem;
  font-weight: 400;
  color: var(--hp2-cream);
  line-height: 1.1;
  margin-bottom: 0.35rem;
}
.hp2-pkg-table__tier-name em {
  font-style: italic;
  color: var(--hp2-gold-light);
}
.hp2-pkg-table__tier-price {
  display: block;
  font-size: 0.88rem;
  color: var(--hp2-cream-muted);
  letter-spacing: 0.04em;
}
.hp2-pkg-table tbody th {
  text-align: left;
  padding: 1rem 1.25rem;
  font-family: var(--hp2-font-body);
  font-weight: 500;
  color: var(--hp2-gold-light);
  font-size: 0.92rem;
  background: rgba(200,169,110,0.03);
  border-right: 1px solid var(--hp2-border-sub);
}
.hp2-pkg-table tbody td {
  padding: 1rem 1.25rem;
  text-align: center;
  color: var(--hp2-cream-muted);
  font-size: 0.95rem;
  border-top: 1px solid var(--hp2-border-sub);
  border-right: 1px solid var(--hp2-border-sub);
}
.hp2-pkg-table tbody td:last-child { border-right: none; }
.hp2-pkg-table__yes {
  color: var(--hp2-gold);
  font-size: 1.1rem;
  font-weight: 500;
}
.hp2-pkg-table__no {
  color: var(--hp2-text-muted);
  font-size: 1.1rem;
}
.hp2-pkg-table__category-row th {
  background: rgba(30,136,229,0.08);
  color: var(--hp2-cream);
  font-family: var(--hp2-font-display);
  font-size: 1rem;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.04em;
  padding: 0.85rem 1.25rem;
}
.hp2-pkg-table__category-row td {
  background: rgba(30,136,229,0.04);
}
@media (max-width: 768px) {
  .hp2-pkg-table thead th,
  .hp2-pkg-table tbody th,
  .hp2-pkg-table tbody td {
    padding: 0.85rem 0.7rem;
    font-size: 0.85rem;
  }
}
`;

export default function PricingBreakdownV2() {
  const faqs = [
    {
      q: "What's the Essentials package?",
      a: 'The Essentials package is our most-popular bachelorette and birthday tier, bundling the Base boat charter with coolers of ice, custom disco-ball lighting, a curated Spotify pairing, and decor like sashes or Mylar balloons. Starting at $1,495 for a 4-hour Day Tripper charter.',
    },
    {
      q: "What's the Ultimate package?",
      a: 'The Ultimate package is our full VIP experience, bundling everything in Essentials plus a pro bartender, a DJ with booth and mic, a 2-hour photographer shoot, custom floral decor, and a floating brunch or charcuterie spread. Starting at $3,495 for a 4-hour Meeseeks or Irony charter.',
    },
    {
      q: "What's custom?",
      a: 'The Custom package is for any request outside the three preset tiers — think multi-boat fleet events, overnight docking, specialty catering (sushi chef, taco bar), live musicians, or branded corporate signage. Quoted individually based on your exact needs.',
    },
    {
      q: 'Can I upgrade later?',
      a: 'Yes, you can upgrade from any tier to a higher tier up until 7 days before your cruise. Upgrades are prorated against your existing package — just call or text (512) 488-5892 with what you want to add.',
    },
    {
      q: 'Can I mix packages?',
      a: 'Yes, we can mix elements across tiers. Start from the package that fits best and swap individual add-ons — for example, Essentials + photographer from Ultimate, or Base + DJ from Ultimate. Your booking concierge will itemize it for you.',
    },
    {
      q: 'Which package do most bachelorette parties choose?',
      a: 'Essentials is chosen by about 55% of bachelorette parties because it hits the sweet spot of decor + music + BYOB without the price jump to Ultimate. Groups of 20+ or those hosting out-of-state guests more often step up to Ultimate for the photographer and bartender.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/pricing-breakdown-v2"
      pageTitle="Package Pricing Breakdown | Premier Party Cruises Austin"
      pageDescription="Compare our four party-boat packages: Base, Essentials, Ultimate, and Custom. Transparent pricing, no hidden fees. Bachelorettes, corporate, weddings."
      heroEyebrow="Pricing Breakdown · Package Comparison"
      heroHeadline={
        <>
          Choose your <em>perfect</em> package
        </>
      }
      heroBody="Four packages, transparent pricing, no hidden fees. From the affordable Essentials to the full VIP Ultimate experience."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'Contact Us', href: '/contact' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          One package away from <em>the best day</em>.
        </>
      }
      finalCtaBody="Not sure which tier fits? Tell us your group size, event type, and budget — we'll recommend the package that delivers the most celebration per dollar."
    >
      <style dangerouslySetInnerHTML={{ __html: BREAKDOWN_STYLES }} />

      {/* ── Package Comparison Table ─────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Four Packages · One Clear Choice</div>
        <h2 className="hp2-section__headline">
          What's included in <em>each tier</em>
        </h2>
        <p className="hp2-section__body">
          Every package starts with a USCG-licensed captain, fuel, ice, coolers,
          Bluetooth audio, and bathroom access — then adds progressive upgrades
          for decor, music, photography, and food &amp; beverage. Pick the tier
          that matches your group, or mix-and-match with the Custom package.
        </p>

        <div className="hp2-pkg-table-wrap">
          <table className="hp2-pkg-table" aria-label="Package comparison table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">
                  <span className="hp2-pkg-table__tier-label">Tier 1</span>
                  <span className="hp2-pkg-table__tier-name">Base</span>
                  <span className="hp2-pkg-table__tier-price">From $995 · 4hr charter</span>
                </th>
                <th scope="col">
                  <span className="hp2-pkg-table__tier-label">Tier 2 · Popular</span>
                  <span className="hp2-pkg-table__tier-name">
                    <em>Essentials</em>
                  </span>
                  <span className="hp2-pkg-table__tier-price">From $1,495 · 4hr charter</span>
                </th>
                <th scope="col">
                  <span className="hp2-pkg-table__tier-label">Tier 3 · VIP</span>
                  <span className="hp2-pkg-table__tier-name">Ultimate</span>
                  <span className="hp2-pkg-table__tier-price">From $3,495 · 4hr charter</span>
                </th>
                <th scope="col">
                  <span className="hp2-pkg-table__tier-label">Tier 4</span>
                  <span className="hp2-pkg-table__tier-name">Custom</span>
                  <span className="hp2-pkg-table__tier-price">Priced to your brief</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Boat & Captain */}
              <tr className="hp2-pkg-table__category-row">
                <th scope="row" colSpan={5}>
                  Boat &amp; Captain
                </th>
              </tr>
              <tr>
                <th scope="row">USCG-licensed captain</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Fuel, ice &amp; coolers</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Bluetooth audio system</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Private enclosed bathroom</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Lily pads / floaties</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>

              {/* Decor */}
              <tr className="hp2-pkg-table__category-row">
                <th scope="row" colSpan={5}>
                  Décor
                </th>
              </tr>
              <tr>
                <th scope="row">Custom disco-ball lighting</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Sashes, banners, Mylar balloons</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Custom floral arrangement</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Branded or event-specific signage</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>

              {/* Music */}
              <tr className="hp2-pkg-table__category-row">
                <th scope="row" colSpan={5}>
                  Music &amp; Entertainment
                </th>
              </tr>
              <tr>
                <th scope="row">Curated Spotify playlist pairing</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Pro DJ (booth + mic, 3 hrs)</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Live musician (acoustic / violinist)</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>

              {/* F & B */}
              <tr className="hp2-pkg-table__category-row">
                <th scope="row" colSpan={5}>
                  Food &amp; Beverage
                </th>
              </tr>
              <tr>
                <th scope="row">BYOB allowed (no glass)</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Pro bartender (3 hrs)</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Charcuterie or brunch spread</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Custom catering (sushi, taco bar, etc.)</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>

              {/* Capture */}
              <tr className="hp2-pkg-table__category-row">
                <th scope="row" colSpan={5}>
                  Photo &amp; Video
                </th>
              </tr>
              <tr>
                <th scope="row">Captain-captured casual photos</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Pro photographer (2 hr shoot + edits)</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Videographer / drone reel</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>

              {/* Logistics */}
              <tr className="hp2-pkg-table__category-row">
                <th scope="row" colSpan={5}>
                  Logistics &amp; Service
                </th>
              </tr>
              <tr>
                <th scope="row">Dedicated booking concierge</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Tax &amp; 20% gratuity included</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">COI / W-9 for corporate clients</th>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
              <tr>
                <th scope="row">Multi-boat fleet coordination</th>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__no">—</td>
                <td className="hp2-pkg-table__yes">✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p
          style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            background: 'rgba(200,169,110,0.06)',
            borderLeft: '2px solid var(--hp2-gold)',
            color: 'var(--hp2-cream-muted)',
            fontSize: '0.92rem',
            lineHeight: 1.6,
          }}
        >
          Starting prices shown are for the Day Tripper (14-guest boat) on a
          4-hour weekday charter. Add-ons to upgrade boat size, day, or hours
          are quoted transparently — no hidden fees.
        </p>
      </section>

      {/* ── Package Quick-Pick ───────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">How Groups Typically Choose</div>
          <h2 className="hp2-section__headline">
            Pick the tier that <em>matches your brief</em>
          </h2>
          <p className="hp2-section__body">
            A quick decision guide based on the 5,000+ charters we have booked
            over the years. Your booking concierge will always confirm your
            choice once they hear your specifics.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Base</div>
              <h3 className="hp2-feature-card__title">Budget-Conscious Groups</h3>
              <p className="hp2-feature-card__desc">
                Best for friends-getaway trips, casual birthdays, or small
                bachelor groups who want the boat and not the frills. BYOB
                drinks and your own playlist.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Ess</div>
              <h3 className="hp2-feature-card__title">Most Bachelorettes</h3>
              <p className="hp2-feature-card__desc">
                Our #1 bachelorette and milestone-birthday pick. Adds disco
                lighting, Mylar banners, sashes, and a curated Spotify pairing
                — the "decor-ready" upgrade.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Ult</div>
              <h3 className="hp2-feature-card__title">VIP &amp; Corporate</h3>
              <p className="hp2-feature-card__desc">
                Bartender, pro DJ, professional photographer, and a floating
                brunch or charcuterie spread. The "turn-key full-production"
                option for weddings and client events.
              </p>
            </div>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
