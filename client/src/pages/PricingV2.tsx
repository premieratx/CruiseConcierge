import V2PageTemplate from '@/components/V2PageTemplate';
import PricingCalculator from '@/components/PricingCalculator';

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

      {/* ── Interactive Pricing Calculator ────────────────── */}
      <section className="hp2-section" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
        <div className="hp2-section__label">Instant Calculator</div>
        <h2 className="hp2-section__headline" style={{ marginBottom: '0.5rem' }}>
          Estimate your <em>total</em> in 30 seconds.
        </h2>
        <p style={{ color: 'var(--hp2-cream-muted)', marginBottom: '2rem', maxWidth: '640px', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Pick your group size, hours, and day — the calculator shows the all-in price with
          gratuity, tax, and booking fee already added. No surprises at the quote stage.
        </p>
        <PricingCalculator />
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
