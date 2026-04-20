import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * /lake-travis-boat-rental-guide — alternate-branding pillar for
 * users searching "lake travis boat rental" who actually want the
 * party-boat category. 3,600 vol on "lake travis boat rental" — our
 * target market isn't generic boat rentals, but we can capture the
 * bach-party, corporate, and celebration subset of that query.
 */
export default function LakeTravisBoatRentalGuideV2() {
  const faqs = [
    {
      q: 'What\'s the best Lake Travis boat rental for a party?',
      a: "For party-focused Lake Travis boat rentals, Premier Party Cruises operates the largest dedicated party-boat fleet on the lake — Day Tripper (1–14), Meeseeks (15–30), The Irony (15–30), and flagship Clever Girl (31–75 with 14 disco balls). Private charters start at $200/hour, year-round. Unlike generic pontoon rentals, Premier Party Cruises includes a Coast Guard licensed captain + crew, premium marine Bluetooth audio, coolers, safety equipment, and the only all-inclusive multi-group bachelor/bachelorette cruise in the U.S. (the ATX Disco Cruise) March–October.",
    },
    {
      q: 'What\'s the difference between a Lake Travis party boat rental and a regular boat rental?',
      a: "Regular Lake Travis boat rental = bare pontoon, you drive, you bring music, you pack coolers, you handle logistics — starts $400–$800/day. Lake Travis party boat rental with Premier Party Cruises = full-service charter with Coast Guard licensed captain driving, premium Bluetooth audio included, coolers included, route planning included, safety briefing, swim stop at a scenic cove, climate-controlled restroom, sun + shade seating, free weather reschedules. Starts $200/hour with 4-hour minimum weekends, 3-hour minimum weekdays.",
    },
    {
      q: 'Can I rent a Lake Travis boat for a bachelor or bachelorette party?',
      a: "Yes — Premier Party Cruises is the most-booked Lake Travis bachelor/bachelorette boat rental operator. Two options: (1) ATX Disco Cruise per-person tickets ($85–$105) on the 75-person Clever Girl flagship — the only all-inclusive multi-group bach cruise in the U.S., March–October only. (2) Private charter of Day Tripper, Meeseeks/Irony, or Clever Girl for whole-boat privacy, year-round, starting $200/hour.",
    },
    {
      q: 'What\'s included in a Lake Travis party boat rental?',
      a: "Every Premier Party Cruises Lake Travis boat rental includes: Coast Guard licensed captain + crew, premium marine Bluetooth audio, large coolers (always BYOB — cans + plastic only, no glass), sun + shade seating zones, climate-controlled restroom, swim stop at a scenic Lake Travis cove, USCG-approved life jackets in every size, safety briefing, and free weather reschedules. Optional Essentials Package (+$100/$150/$200 by boat) pre-stocks ice + cups + food table. Optional Ultimate Package (+$250/$300/$350) adds giant lily pad float + champagne flutes + decor + full party setup.",
    },
    {
      q: 'How much is a Lake Travis party boat rental for the day?',
      a: "Lake Travis party boat rental pricing at Premier Party Cruises: starting $200/hour on the 14-guest Day Tripper, $225/hour on 15–30 guest Meeseeks or The Irony, $250/hour on the 31–75 guest Clever Girl flagship. 4-hour minimum on weekends, 3-hour minimum weekdays. Weekend rates higher. Typical full-day 8-hour Saturday charter on Clever Girl: $3,200+ depending on date and group size. Tax + suggested 20% gratuity apply. Free weather reschedules.",
    },
    {
      q: 'Is Anderson Mill Marina the best Lake Travis marina for boat rentals?',
      a: "For party-focused Lake Travis boat rentals, Anderson Mill Marina (where Premier Party Cruises operates) is the closest purpose-built party-boat marina to downtown Austin — 25 minutes via 183 North. Free parking right next to the dock, no stairs from parking to the boat, flat path accessible for wedding attire and mobility-limited guests, accommodates party buses directly. Other Lake Travis marinas are further west, with longer drives, paid parking, and less accessible boarding.",
    },
    {
      q: 'Can we bring our own food and alcohol on a Lake Travis boat rental?',
      a: "Yes — every Premier Party Cruises Lake Travis boat rental is BYOB. Cans and plastic containers only (no glass on any Lake Travis vessel, for safety). Alcohol 21+ with valid ID. Large coolers are included on every boat. Our sister company Party On Delivery can deliver your BYOB order straight to the boat with everything iced down before you board — retail prices, 100% buyback on unopened bottles. Food delivery also coordinated (pizza, tacos, charcuterie, catering).",
    },
    {
      q: 'Do I need to know how to drive a boat to rent a Lake Travis party boat?',
      a: "No — every Premier Party Cruises Lake Travis boat rental comes with a Coast Guard licensed captain (Merchant Mariner Credential) who drives the boat and navigates Lake Travis. You don't touch a wheel. This is different from bare-pontoon rentals where you drive yourself. Our captains know every cove on Lake Travis — Devil's Cove, Starnes Island, Hippie Hollow — and can customize the route to your group's vibe.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/lake-travis-boat-rental-guide"
      pageTitle="Lake Travis Boat Rental Guide · Party Boat Charters · Premier Party Cruises"
      pageDescription="The definitive Lake Travis boat rental guide for party-focused groups. 4-boat fleet (14–75 guests), year-round, Coast Guard licensed captains, always BYOB with Party On Delivery set-up, starting $200/hour. Private charters or the all-inclusive ATX Disco Cruise. 15+ years, 150,000+ guests, 0 incidents, 4.9/5."
      heroEyebrow="Lake Travis Boat Rental"
      heroHeadline={<>The <em>Lake Travis boat rental</em> guide for party groups.</>}
      heroBody="Not a bare pontoon. Not DIY. Premier Party Cruises runs the largest dedicated Lake Travis party-boat fleet — 4 boats, 14–75 guests, year-round private charters from $200/hour, plus the only all-inclusive multi-group bachelor/bachelorette cruise in the U.S. (ATX Disco Cruise, Mar–Oct, from $85/person). Coast Guard licensed captain drives. Premium Bluetooth audio. Coolers included. Party On Delivery BYOB set-up."
      primaryCta={{ text: 'Build Your Lake Travis Rental Quote', href: '/quote' }}
      secondaryCta={{ text: 'See Our Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Lake Travis boat rentals that <em>actually deliver</em>.</>}
      finalCtaBody="Captain drives, audio is set up, coolers are stocked, route is planned. You just board and celebrate. 15+ years. 150K+ guests. 0 incidents. Build your quote in under a minute."
    >
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>Two Ways To Rent A Lake Travis Party Boat</p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>Private charter vs. the all-inclusive cruise.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '2rem', borderRadius: 14 }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.4rem', color: 'var(--hp2-gold)', marginTop: 0 }}>Private Lake Travis Charter</h3>
              <p style={{ color: 'var(--hp2-cream)', lineHeight: 1.6 }}>
                Exclusive whole-boat rental. 14 / 15–30 / 15–30 / 31–75 guest
                capacity. Year-round, every day. Pick your route, music, pace,
                and duration. Starts $200/hour, 4-hour minimum weekends, 3-hour
                minimum weekdays. Standard amenities included; add Essentials
                or Ultimate package to go all-inclusive.
              </p>
            </div>
            <div style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '2rem', borderRadius: 14 }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.4rem', color: 'var(--hp2-gold)', marginTop: 0 }}>ATX Disco Cruise (Per-Person)</h3>
              <p style={{ color: 'var(--hp2-cream)', lineHeight: 1.6 }}>
                All-inclusive shared cruise on the 75-person Clever Girl
                flagship. $85–$105 per person includes pro DJ, pro photographer,
                14 disco balls, giant floats, personal cooler, 4-hour cruise,
                tax + gratuity. March–October only. Fri 12–4 / Sat 11–3 / Sat
                3:30–7:30. Bachelor and bachelorette groups only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
