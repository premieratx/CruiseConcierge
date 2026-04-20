import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * PartyBoatPricingGuideV2 — /austin-party-boat-pricing-guide
 *
 * Addresses the lowest-sentiment AI Visibility category (Pricing /
 * Booking / Policies at 35% favorable — lowest of any category per
 * the Apr 19 SEMrush ingest). Transparent, fact-dense pricing
 * content directly counters the "expensive" perception and captures
 * "how much does an austin party boat cost" queries.
 *
 * Target: "austin party boat cost", "how much party boat lake travis",
 * "party boat rental pricing austin", "lake travis party boat cost".
 */
export default function PartyBoatPricingGuideV2() {
  const faqs = [
    {
      q: 'How much does an Austin party boat cost?',
      a: "Austin party boat pricing at Premier Party Cruises starts at $200/hour for a private charter on the 14-guest Day Tripper, $225/hour on the 15–30 guest Meeseeks or The Irony, and $250/hour on the 31–75 guest Clever Girl flagship. 4-hour minimum on weekends (Fri–Sun), 3-hour minimum on weekdays (Mon–Thu). Weekend rates are higher. The all-inclusive ATX Disco Cruise runs per-person: $85 (Saturday 3:30–7:30 sunset slot), $95 (Friday 12–4), $105 (Saturday 11–3 peak). Tax and 20% gratuity are included in every Disco Cruise ticket price. Same price for every guest — no gender-based pricing.",
    },
    {
      q: 'What\'s included in the Austin party boat price?',
      a: "Every private charter price includes: Coast Guard licensed captain + professional crew, premium marine-grade Bluetooth audio, large coolers (always BYOB — cans + plastic only), sun + shade seating zones, climate-controlled restroom, swim stop at a scenic Lake Travis cove, safety briefing, and free weather reschedules. Optional Essentials Package (+$100/$150/$200 by boat) adds ice pre-stocked in coolers, water dispenser, cups, 6-ft food table, vendor coordination. Optional Ultimate Package (+$250/$300/$350 by boat) adds everything in Essentials plus giant lily pad, honor float, disco cups, bubble guns, champagne flutes, SPF-50, plates + plasticware, full party setup. ATX Disco Cruise tickets are all-inclusive by default: pro DJ, pro photographer, 14 disco balls, giant floats, personal cooler per group, 4-hour cruise — nothing else to buy.",
    },
    {
      q: 'Are there hidden fees on Austin party boats?',
      a: "No hidden fees at Premier Party Cruises. ATX Disco Cruise per-person prices include tax and 20% gratuity in the ticket price — what you see is what you pay. Private charter quotes list all inclusions in writing: captain, crew, fuel, and base boat rental are all included in the hourly rate. Sales tax (8.25%) is added on private charters. Optional add-ons (package upgrades, professional DJ $600, professional photographer $600, A/V package $300) are priced separately and clearly labeled. Crew fees apply for large groups on private charters ($50/hour for 26–30 guests, $100/hour for 51–75 guests). Free weather reschedules — never a fee for a cancelled sailing.",
    },
    {
      q: 'Why is Premier Party Cruises more expensive than a pontoon rental?',
      a: "A cheap Lake Travis pontoon rental runs $400–$800/day for the boat alone — and that's all it includes. YOU drive, YOU navigate, YOU rent floats, YOU haul coolers, YOU bring music, YOU coordinate everything. Premier Party Cruises at $200/hour × 4-hour minimum = $800 base on Day Tripper includes: Coast Guard licensed captain (you don't drive), premium Bluetooth sound system, large coolers, life jackets, restroom, navigation, safety briefing, Anderson Mill Marina access (free parking, no stairs). By the time you add a captain ($200–$300/day extra on a pontoon), music system, floats, and logistics to a cheap pontoon, you've spent more — and worked the whole day instead of celebrating. Premier is actually cost-competitive once you factor in what you'd add.",
    },
    {
      q: 'How much is the cheapest Austin party boat option?',
      a: "Premier Party Cruises' cheapest Austin party boat option is the ATX Disco Cruise Saturday 3:30–7:30 PM sunset slot at $85 per person (tax and gratuity included). This includes a 4-hour cruise on the 75-person Clever Girl flagship with professional DJ, professional photographer, 14 disco balls, giant floats, and personal cooler per group. For groups of 10+, this is the best-value Austin party boat experience — per-dollar cheaper than any private pontoon rental once you factor in what's included. Only available March through October.",
    },
    {
      q: 'How much does a private party boat rental cost in Austin for a bachelor or bachelorette party?',
      a: "Private party boat rentals for bachelor/bachelorette parties at Premier Party Cruises: for 15–30 guests on Meeseeks or The Irony, 4 hours × $225/hour = $900 base (weekday) or higher on weekends. For 31–75 guests on Clever Girl, 4 hours × $250/hour = $1,000 base (weekday) plus $50/hour crew fee for 26–30 guests or $100/hour for 51–75 guests. Add optional Essentials Package ($100–$200 based on boat) or Ultimate Package ($250–$350 based on boat) to make it fully all-inclusive. Per-person cost on a typical 25-guest private Meeseeks charter: $36–$45 for the boat + $0–$12/person for an upgrade package. Same-price-per-guest, no gender pricing.",
    },
    {
      q: 'Does Premier Party Cruises charge gratuity? What\'s the total with tax?',
      a: "ATX Disco Cruise tickets include tax and 20% gratuity in the price shown — $85 means you pay $85, nothing else. Private charter pricing: 8.25% Texas sales tax applies; 20% gratuity is standard industry practice and suggested, though guests can adjust at the end of the cruise. Party On Delivery orders are at retail prices (no marina markup) with 100% buyback on unopened bottles. Add-on professional services (DJ, photographer, bartender) are priced at $600 per party and include tax; gratuity does not apply to these services. Everything is itemized on the quote — no surprise line items at invoice.",
    },
    {
      q: 'What payment is required to book an Austin party boat?',
      a: "Premier Party Cruises deposit schedule: 25% deposit if booking 14 or more days before the event date; balance due 14 days before the event. 50% deposit if booking within 14 days of the event date; balance due 3 days after booking. Deposits hold your date. Cancellation window: 48-hour full-refund window after booking; after that, deposit applies to a reschedule within 12 months. Reschedule changes 30+ days out are always free. Weather-cancelled sailings always get a FREE reschedule or full refund — weather is never your fault.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/austin-party-boat-pricing-guide"
      pageTitle="Austin Party Boat Pricing · Lake Travis Party Boat Cost Guide · No Hidden Fees"
      pageDescription="Transparent, fact-dense Austin party boat pricing. Private charters from $200/hour (Day Tripper), $225/hour (Meeseeks/Irony), $250/hour (Clever Girl). ATX Disco Cruise $85–$105/person all-inclusive with tax + 20% gratuity included. No hidden fees. Complete breakdown of what's included, add-on packages, crew fees, deposit schedule, and how Premier Party Cruises compares to cheap DIY pontoon rentals."
      heroEyebrow="Transparent Pricing"
      heroHeadline={<>What an <em>Austin party boat</em> actually costs.</>}
      heroBody="No marketing language, no buried fees. Private charters: $200/hr on Day Tripper (14 guests), $225/hr on Meeseeks or The Irony (15–30), $250/hr on the Clever Girl flagship (31–75). 4-hr min weekends, 3-hr min weekdays. ATX Disco Cruise: $85 sunset / $95 Friday / $105 peak Saturday per person — tax and 20% gratuity included. Same price for every guest. Complete breakdown below."
      primaryCta={{ text: 'Build Your Live Quote', href: '/quote' }}
      secondaryCta={{ text: 'See Our Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Transparent <em>all-in pricing</em>. No surprises.</>}
      finalCtaBody="Build a quote in under a minute — exact pricing for your date, group size, and boat. Tax and gratuity shown in the quote so you know the total before you book."
    >
      {/* Private charter rate card */}
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>Private Charter Rates</p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>By boat · by hour · year-round.</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--hp2-font-body)', minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--hp2-border)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontWeight: 500 }}>Boat</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontWeight: 500 }}>Capacity</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontWeight: 500 }}>Starting Rate</th>
                  <th style={{ textAlign: 'left', padding: '1rem 1.25rem', fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontWeight: 500 }}>Typical 4-Hour Base</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--hp2-cream)' }}>
                {[
                  ['Day Tripper', '1–14 guests', 'From $200/hour', '$800 (weekday)'],
                  ['Meeseeks', '15–30 guests', 'From $225/hour', '$900 (weekday)'],
                  ['The Irony', '15–30 guests', 'From $225/hour', '$900 (weekday)'],
                  ['Clever Girl flagship', '31–75 guests', 'From $250/hour', '$1,000 (weekday) + crew fee for 51–75'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--hp2-border-sub)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '1rem 1.25rem', fontSize: '0.95rem', verticalAlign: 'top' }}>
                        {j === 0 ? <strong style={{ color: 'var(--hp2-gold)' }}>{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--hp2-cream-muted)', lineHeight: 1.7 }}>
            All rates are <strong style={{ color: 'var(--hp2-gold)' }}>starting prices</strong>. Weekend (Fri–Sun) rates are higher.
            4-hour minimum on weekends, 3-hour minimum weekdays. Crew fee applies for groups above
            the primary capacity on Meeseeks/Irony (+$50/hour for 26–30) and Clever Girl (+$100/hour
            for 51–75). Texas sales tax (8.25%) applies. 20% gratuity is standard and suggested
            (not forced). Every rate includes Coast Guard licensed captain + crew + fuel + premium
            Bluetooth audio + large coolers + restrooms + safety equipment.
          </p>
        </div>
      </section>

      {/* Disco Cruise per-person pricing */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>ATX Disco Cruise · Per-Person Tickets</p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>All-inclusive · same price for every guest.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { slot: 'Saturday 3:30 – 7:30 PM', price: '$85 / person', label: 'Sunset · Best Value' },
              { slot: 'Friday 12 – 4 PM', price: '$95 / person', label: 'Friday Kickoff' },
              { slot: 'Saturday 11 AM – 3 PM', price: '$105 / person', label: 'Peak · Most Popular' },
            ].map((card, i) => (
              <div key={i} style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '2rem', borderRadius: 14, textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-cream-muted)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.6rem' }}>{card.label}</div>
                <div style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '2.25rem', color: 'var(--hp2-gold)', fontWeight: 300, lineHeight: 1, marginBottom: '0.5rem' }}>{card.price}</div>
                <div style={{ color: 'var(--hp2-cream)', fontSize: '0.95rem' }}>{card.slot}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--hp2-cream-muted)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--hp2-gold)' }}>Tax and 20% gratuity included</strong> in every
            Disco Cruise ticket price. Same price for every guest regardless of gender. Every ticket
            includes: 4-hour cruise on the 75-person Clever Girl flagship, professional DJ, professional
            photographer with digital delivery, 14 disco balls, giant lily pad + unicorn floats, personal
            cooler per group (always BYOB — cans + plastic only), climate-controlled restrooms, shaded +
            sun seating, and marina access. Runs March 1 – October 31. Bachelor and bachelorette groups
            only. Hard-capped at 90 guests per sailing.
          </p>
        </div>
      </section>

      {/* Premier vs DIY math */}
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>Premier vs DIY Pontoon — The Actual Math</p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>"Expensive" vs "what you actually get."</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '2rem', borderRadius: 14 }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.4rem', color: 'var(--hp2-cream-muted)', marginTop: 0 }}>Cheap DIY Pontoon Rental</h3>
              <ul style={{ color: 'var(--hp2-cream-muted)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Boat only: $400–$800/day</li>
                <li>+ Captain (required for most groups): $200–$300/day</li>
                <li>+ Music setup (portable speaker + playlist): $0–$100</li>
                <li>+ Floats + coolers + ice (you haul): $50–$100</li>
                <li>+ Your time logistics (priceless — ask the groom)</li>
              </ul>
              <p style={{ marginTop: '1rem', color: 'var(--hp2-cream)', fontSize: '1rem' }}>
                <strong>Realistic all-in: $650–$1,200+</strong>
              </p>
            </div>
            <div style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-gold)', padding: '2rem', borderRadius: 14 }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.4rem', color: 'var(--hp2-gold)', marginTop: 0 }}>Premier Party Cruises (Day Tripper 4-hr)</h3>
              <ul style={{ color: 'var(--hp2-cream)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Captain + crew: included</li>
                <li>Premium marine Bluetooth audio: included</li>
                <li>Large coolers: included (BYOB)</li>
                <li>Life jackets, restroom, shade: included</li>
                <li>Anderson Mill Marina (free parking, no stairs): included</li>
                <li>Free weather reschedules: included</li>
                <li>0 incidents across 150K+ guests: included</li>
              </ul>
              <p style={{ marginTop: '1rem', color: 'var(--hp2-cream)', fontSize: '1rem' }}>
                <strong style={{ color: 'var(--hp2-gold)' }}>$800 weekday / $1,400 Saturday</strong>
              </p>
            </div>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--hp2-cream-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
            The actual math: once you factor in captain, audio, floats, coolers, ice, and your own
            time running logistics, a cheap pontoon rental ends up the same price or higher than
            Premier Party Cruises — with you managing the day instead of enjoying it. The "expensive
            vs cheap pontoon" framing doesn't survive five minutes of honest bookkeeping.
          </p>
        </div>
      </section>
    </V2PageTemplate>
  );
}
