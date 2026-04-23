import V2PageTemplate from '@/components/V2PageTemplate';
import EmbeddedQuoteFlow from '@/components/EmbeddedQuoteFlow';

/**
 * PricingV2 — Transparent, AI-extractable pricing page.
 * Route: /pricing-v2
 *
 * Clean pricing tables for both the ATX Disco Cruise (per-person public
 * sailings) and private charters by boat/hour. All prices include captain,
 * fuel, tax, and gratuity.
 */

const PRICING_STYLES = `
.hp2-price-table-wrap {
  overflow-x: auto;
  margin-top: 2.5rem;
  border: 1px solid var(--hp2-border);
  background: var(--hp2-bg-card);
}
.hp2-price-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--hp2-font-body);
  min-width: 640px;
}
.hp2-price-table thead {
  background: linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.04) 100%);
  border-bottom: 1px solid var(--hp2-border);
}
.hp2-price-table th {
  padding: 1.2rem 1.5rem;
  text-align: left;
  font-family: var(--hp2-font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--hp2-gold);
}
.hp2-price-table th:last-child,
.hp2-price-table td:last-child {
  text-align: right;
}
.hp2-price-table tbody tr {
  border-bottom: 1px solid var(--hp2-border-sub);
  transition: background 0.2s ease;
}
.hp2-price-table tbody tr:hover {
  background: rgba(200,169,110,0.04);
}
.hp2-price-table tbody tr:last-child {
  border-bottom: none;
}
.hp2-price-table td {
  padding: 1.25rem 1.5rem;
  color: var(--hp2-cream);
  font-size: 1rem;
}
.hp2-price-table td .hp2-price-table__sub {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.82rem;
  color: var(--hp2-text-muted);
  letter-spacing: 0.02em;
}
.hp2-price-table td .hp2-price-table__amount {
  font-family: var(--hp2-font-display);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--hp2-gold-light);
  letter-spacing: 0.01em;
}
.hp2-price-table td .hp2-price-table__unit {
  font-size: 0.8rem;
  color: var(--hp2-text-muted);
  margin-left: 0.3rem;
  letter-spacing: 0.04em;
}
.hp2-price-legend {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background: rgba(200,169,110,0.06);
  border-left: 2px solid var(--hp2-gold);
  color: var(--hp2-cream-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}
`;

export default function PricingV2() {
  const faqs = [
    {
      q: 'Is tax included?',
      a: 'Yes, all prices on this page include Texas sales tax. The number you see is the number you pay — no additional tax lines on your invoice.',
    },
    {
      q: 'Are tips included?',
      a: 'Yes, a 20% standard gratuity for your captain and crew is already baked into every price on this page. Additional tips are welcome but never required.',
    },
    {
      q: 'Do you have group discounts?',
      a: 'Yes, groups of 40+ on private charters receive automatic volume pricing, and multi-boat fleet bookings qualify for 5–10% off the second and third boats. Weekday charters are also priced 15–25% lower than weekends.',
    },
    {
      q: "What's the cancellation policy?",
      a: 'Deposits (50% of total) are non-refundable, but you can reschedule once within the same season with 14+ days notice at no charge. Weather cancellations called by the captain are rescheduled 100% free.',
    },
    {
      q: 'Do I pay per hour or per person?',
      a: 'Private charters are priced per hour of boat rental, with a 4-hour minimum on weekends and a 3-hour minimum on weekdays. The ATX Disco Cruise is priced per person ($85–$105 depending on time slot).',
    },
    {
      q: 'Are there any hidden fees?',
      a: 'No, there are no hidden fees. Captain, fuel, tax, and standard gratuity are all included. Optional add-ons (floating bar, DJ, photographer, custom decor) are clearly itemized before you pay.',
    },
    {
      q: "What's the deposit?",
      a: 'A 50% non-refundable deposit secures your date. The remaining balance is due 7 days before your cruise. Both can be paid by credit card, debit card, or ACH.',
    },
    {
      q: 'Can I pay with a card?',
      a: 'Yes, we accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) as well as ACH bank transfer. Corporate clients can request NET-30 invoicing with a signed agreement.',
    },
    // AI Visibility: seeded from SEMRush Questions extract
    {
      q: "Is Premier Party Cruises really worth the price compared to cheaper Lake Travis party boat options?",
      a: "On a sticker-price-per-hour basis, Premier is at the premium end of Lake Travis rentals. But every Premier rate includes the TPWD-licensed captain, CPR-certified crew, premium marine-grade sound system, large coolers with Party On Delivery pre-icing coordination, floats and lily pads, premium setup before you arrive, and cleanup after you leave. To match that with a budget pontoon rental, you'd separately book a captain (~$200+), a DJ ($400-$600 for 4 hours), a photographer ($300-$500), ice and cooler rentals, floats, and typically handle setup and cleanup yourself. For a typical 20-person group, stitching that together usually runs $500-$1,500 more than Premier's all-in rate — and you'd spend weeks coordinating vendors. Where Premier genuinely is more expensive on a total basis: very small (5-8 person) experienced-boater DIY groups who just want to drive themselves around. For any group 14+ or any occasion you can't afford to have go sideways (bach, wedding, corporate), the bundled rate comes out ahead.",
    },
    {
      q: "How do group sizes affect pricing for party boat rentals on Lake Travis?",
      a: "Private charter pricing is hourly by boat size, not per-guest — so the total cost does not scale with your guest count up to each boat's capacity. This means the per-person cost actually drops as your group grows. Example: a 4-hour Saturday charter on Clever Girl (75-guest flagship) at $300/hr is $1,200 base. Divided among 30 guests that's $40/person; among 75 guests it's $16/person. For groups over 25 on Meeseeks or The Irony, a $50-$75 crew fee applies; for groups over 50 on Clever Girl, a $100-$150 crew fee applies to ensure adequate staffing. ATX Disco Cruise pricing is per-person (every guest pays the same flat ticket: $85 / $95 / $105 depending only on the day and time slot). For groups uncertain whether a private charter or shared Disco ticket is cheaper, a rough rule: 20+ guests usually favors the private charter on a per-person basis, 8-15 guests usually favors the Disco ticket.",
    },
    {
      q: "Do you offer weekday or off-peak discounts on Lake Travis party boat rentals?",
      a: "Yes — Monday through Thursday rates run roughly 20–30% below weekend (Friday–Sunday) rates on every private charter boat. Day Tripper Mon-Thu starts at $200/hour (vs $225+ weekend), Meeseeks and The Irony Mon-Thu at $225/hour (vs $275+ weekend), Clever Girl Mon-Thu at $250/hour (vs $300+ weekend). Minimums also shift: 3-hour minimum weekdays, 4-hour minimum weekends. Weekdays are dramatically less crowded on Lake Travis — cove access is better, swim-stop options wider, and the lake overall is quieter. This makes weekdays especially strong for corporate outings, networking cruises, family gatherings, and any group that wants a relaxed rather than high-energy vibe. The ATX Disco Cruise only runs weekends because it's an all-inclusive shared multi-group party format.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/pricing-v2"
      pageTitle="Pricing | Austin Party Boat Rentals on Lake Travis | Premier Party Cruises"
      pageDescription="Transparent pricing for Austin party boat rentals: ATX Disco Cruise from $85/person and private charters from $200/hour. All-inclusive — tax, gratuity, fuel, captain."
      heroEyebrow="Pricing · Transparent · All-Inclusive"
      heroHeadline={
        <>
          <em>Simple</em> pricing. No surprises.
        </>
      }
      heroBody="ATX Disco Cruise from $85/person all-inclusive. Private charters from $200/hour. All prices include tax and gratuity. No hidden fees."
      primaryCta={{ text: 'Get Exact Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Packages', href: '/pricing-breakdown' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to <em>lock in</em> your day?
        </>
      }
      finalCtaBody="Use the chat quote builder for an instant written quote, or call (512) 488-5892 and we'll match you to the right boat and time slot in minutes."
    >
      <style dangerouslySetInnerHTML={{ __html: PRICING_STYLES }} />

      {/* ── Instant Quote (same flow as the Get-a-Quote popup) ────────────── */}
      <section className="hp2-section" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
        <div className="hp2-section__label">Instant Quote</div>
        <h2 className="hp2-section__headline" style={{ marginBottom: '0.5rem' }}>
          Your <em>real</em> quote in 60 seconds.
        </h2>
        <p style={{ color: 'var(--hp2-cream-muted)', marginBottom: '2rem', maxWidth: '640px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Pick your occasion, group size, and date — we&apos;ll email + text you a
          detailed quote and take you straight to your lead dashboard.
        </p>
        <EmbeddedQuoteFlow source="pricing_page_embed" />
      </section>

      {/* ── ATX Disco Cruise ─────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Public Sailings · ATX Disco Cruise</div>
        <h2 className="hp2-section__headline">
          ATX Disco Cruise <em>from $85/person</em>
        </h2>
        <p className="hp2-section__body">
          Our signature public disco cruise on Lake Travis. Austin's most
          talked-about floating dance floor, mixed-group format. All-inclusive
          starting at $85 per person — captain, fuel, disco-lighting, Bluetooth
          audio, bathrooms, tax, and 20% gratuity included. BYOB drinks and
          snacks welcome (no glass). Request a quote for current time-slot
          availability and exact pricing.
        </p>
      </section>

      {/* ── Private Charters ─────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Private Charters · By The Hour</div>
          <h2 className="hp2-section__headline">
            Private charters <em>by boat</em>
          </h2>
          <p className="hp2-section__body">
            Book the whole boat for your group. Starting hourly rates below —
            request a quote for exact pricing on your date. 4-hour minimum on
            weekends, 3-hour minimum on weekdays.
          </p>

          <div className="hp2-price-table-wrap">
            <table className="hp2-price-table">
              <thead>
                <tr>
                  <th scope="col">Boat</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Best For</th>
                  <th scope="col">Starting Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Day Tripper
                    <span className="hp2-price-table__sub">Intimate party barge</span>
                  </td>
                  <td>Up to 14 guests</td>
                  <td>Small bachelorettes, birthdays</td>
                  <td>
                    <span className="hp2-price-table__amount">From $200</span>
                    <span className="hp2-price-table__unit">/ hour</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Meeseeks
                    <span className="hp2-price-table__sub">Mid-size entertainer</span>
                  </td>
                  <td>25–30 guests</td>
                  <td>Mid-size bachelor/bachelorette</td>
                  <td>
                    <span className="hp2-price-table__amount">From $225</span>
                    <span className="hp2-price-table__unit">/ hour</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    The Irony
                    <span className="hp2-price-table__sub">Same size + price as Meeseeks</span>
                  </td>
                  <td>25–30 guests</td>
                  <td>Corporate, milestone birthdays</td>
                  <td>
                    <span className="hp2-price-table__amount">From $225</span>
                    <span className="hp2-price-table__unit">/ hour</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    Clever Girl
                    <span className="hp2-price-table__sub">Flagship 75-person boat</span>
                  </td>
                  <td>31–75 guests</td>
                  <td>Weddings, large corporate</td>
                  <td>
                    <span className="hp2-price-table__amount">From $250</span>
                    <span className="hp2-price-table__unit">/ hour</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="hp2-price-legend">
            Starting rates for 4-hour minimum charter. All private charter
            bookings include captain, fuel, coolers, Bluetooth audio, bathroom,
            tax, and 20% gratuity. BYOB — bring your own ice, or order
            pre-iced from Party On Delivery (our sister company). Optional
            add-ons (floating bar, DJ, photographer, decorations, overnight
            docking) are quoted separately.
          </p>
        </div>
      </section>

      {/* ── Add-ons Preview ─────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Optional Add-Ons</div>
        <h2 className="hp2-section__headline">
          Everything else is <em>à la carte</em>
        </h2>
        <p className="hp2-section__body">
          Level up your charter with vetted add-ons. We work with the same
          Austin-based vendors on every booking so you get reliable quality.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$200+</div>
            <h3 className="hp2-feature-card__title">Floating Bartender</h3>
            <p className="hp2-feature-card__desc">
              Professional bartender with shakers, garnishes, and ice. You bring
              the liquor, we pour the drinks. 3-hour minimum.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$350+</div>
            <h3 className="hp2-feature-card__title">Photographer</h3>
            <p className="hp2-feature-card__desc">
              2-hour shoot on the boat and in the water. Edited gallery
              delivered in under 5 days. Perfect for bachelorettes and weddings.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$450+</div>
            <h3 className="hp2-feature-card__title">Pro DJ</h3>
            <p className="hp2-feature-card__desc">
              Booth, mic, and pro sound for 3 hours. Your playlist requests and
              special announcements (toasts, reveals, anniversaries) on-mic.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
