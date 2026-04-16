import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * FamilyReunionCruiseV2 — Family reunion cruises on Lake Travis.
 * Route: /family-reunion-cruise-v2
 * Target keyword: "family reunion cruise austin"
 *
 * Luxury family-first landing page for multi-generational reunions,
 * out-of-town cousins, grandparent-to-grandkid gatherings, and the
 * once-a-year "everyone's in town" celebration.
 */
export default function FamilyReunionCruiseV2() {
  const faqs = [
    {
      q: 'Is a Lake Travis cruise appropriate for all ages?',
      a: 'Yes. Our family reunion charters regularly host guests from 6 months to 96 years old on the same boat. Toddlers love the water slide, tweens love the tube, teens love the music and photos, parents love the open bar and shaded seating, and grandparents love the cushioned lounges and flat, easy boarding ramp. The captain chooses calm coves for families with little ones, and we offer kid life vests in sizes infant through youth-XL at no extra charge.',
    },
    {
      q: 'What age ranges work best on the boat?',
      a: 'All of them. We see four common configurations: (1) young-kid reunions with children ages 2-10 — we recommend morning departures and a shorter 3-hour cruise; (2) mixed-age reunions spanning grandparents to babies — our flagship 50-guest Clever Girl handles this beautifully with both shaded seating and swim access; (3) adult-only sibling-and-cousin reunions — pick whatever boat fits the headcount and we lean into the party; (4) milestone reunions (grandparent 80th, anniversary, etc.) where we customize the experience around the honoree.',
    },
    {
      q: 'Can grandparents board comfortably?',
      a: 'Absolutely. All four boats have a flat, wide boarding ramp from the dock — no stairs to climb, no big step-down. Interior seating is cushioned with armrests and backs, there are handrails throughout, and restrooms are ADA-accessible on our larger vessels. Captains can anchor in calm water for the entire cruise if mobility is a concern. If you let our booking team know in advance, we brief the crew so Grandma gets seated, shaded, and hydrated from the moment she boards.',
    },
    {
      q: 'What about kids who can\'t swim?',
      a: 'No problem. We carry USCG-approved kid life vests in infant, child, and youth sizes at no extra charge, and the captain can anchor in a shallow cove where non-swimmers can stand in the water. Many families let little ones play on the swim platform or ride in the shaded cabin while older cousins jump off the slide. No one is pressured to swim — the boat works just as well as a floating picnic deck.',
    },
    {
      q: 'How many people can we fit on one boat?',
      a: 'Our fleet covers family reunions from 14 guests (Day Tripper) up to 75 guests (Clever Girl). Most reunions land between 25 and 50 guests — perfect for a multi-generational gathering with grandparents, their kids, and all the grandchildren. For family reunions larger than 75, we coordinate a two-boat flotilla so extended cousins can cruise together and raft up at the same cove for the main event.',
    },
    {
      q: 'Can we bring food and drinks on board?',
      a: 'Yes — every boat is BYOB and BYO-food. Families typically bring breakfast tacos for morning cruises, deli trays and sides for lunch, or a full BBQ spread for afternoon reunions. Coolers, ice, water, juice boxes, and beer/wine for the adults are all welcome. We also coordinate delivery through Party On Delivery so everything is stocked on the boat before your family arrives — one less thing to manage.',
    },
    {
      q: 'How long should our family reunion cruise be?',
      a: 'Four hours is the sweet spot and our standard minimum. That gives you about 30 minutes of boarding and mingling, 90 minutes of cruising and sightseeing, a 60-90 minute swim stop for the kids, and a final cruise back to dock. Families with all-adult crowds often upgrade to 5 or 6 hours for a longer swim stop. Families with very young kids sometimes run a tighter 3-hour morning cruise to sync with nap schedules — just ask.',
    },
    {
      q: 'Can out-of-town family meet us at the marina easily?',
      a: 'Yes. Anderson Mill Marina is 25 minutes from downtown Austin, 20 minutes from The Domain, and 30 minutes from Austin-Bergstrom International (AUS). Most out-of-town families stay in downtown Austin or near The Domain and rideshare or convoy out to the marina. Free parking is available for everyone. We send a detailed arrival packet a week out with directions, parking instructions, and a check-in map so no one gets lost.',
    },
    {
      q: 'What does a family reunion cruise cost?',
      a: 'Pricing runs $200-$500 per hour depending on boat and date, with a 4-hour minimum. For a 30-person family on our Meeseeks or Irony boat, that typically works out to $1,000-$1,800 total — roughly $35-$60 per person. Kids under 12 are free on all private charters. You bring your own food and drinks, so the boat cost is all-in. Many families split the cost across households, which comes out to very reasonable per-family pricing for a once-a-year reunion everyone will remember.',
    },
    {
      q: 'Can we do a memorial moment or toast during the cruise?',
      a: 'Of course — family reunions often include a toast to absent loved ones, a grandparent\'s birthday surprise, or a moment of remembrance. The captain can anchor in a quiet cove, lower the music, and give you the space to say what you came to say. We\'ve hosted ash-scattering ceremonies, 60th wedding anniversary toasts, first-birthday songs, and announcements of every kind. Just tell your booking concierge and we\'ll build the moment into the timeline.',
    },
    {
      q: 'Do you offer shade for hot summer days?',
      a: 'Yes. Every boat has substantial shaded seating — bimini tops over the main deck, covered cabins on the larger vessels, and shaded lounges so grandparents and babies stay cool. Summer cruises in Central Texas can hit 100°F on the deck but feel 10-15 degrees cooler on the water with the breeze and shade. We recommend sunscreen, hats, and plenty of water (all BYO). Morning and sunset departures are our most popular summer slots because the heat is manageable.',
    },
    {
      q: 'How far in advance should we book a family reunion?',
      a: 'For peak summer weekends (June-August), book 2-3 months in advance. For spring and fall weekend reunions, 4-6 weeks is usually enough. Holiday weekends (Memorial Day, July 4, Labor Day) fill up 3+ months out. Weekdays have much better availability and are often discounted — many families with flexible out-of-town cousins pick a Tuesday or Wednesday and save meaningfully on rate.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/family-reunion-cruise-v2"
      pageTitle="Family Reunion Cruise Austin | Lake Travis Multi-Generational Charter"
      pageDescription="Austin family reunions on Lake Travis. Multi-generational boat charters for 14-75 guests. Kids free, ADA-friendly boarding, BYOB. 4.9 stars, 150,000+ guests served."
      heroEyebrow="Family Reunions · Lake Travis · Austin"
      heroHeadline={
        <>
          Family reunions on <em>Lake Travis</em>
        </>
      }
      heroBody="Multi-generational reunions where grandparents, parents, and grandkids all have the time of their lives. Private charters for 14 to 75 guests, kids free, easy boarding, BYOB."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          A day your family will <em>talk about for years</em>.
        </>
      }
      finalCtaBody="Tell us your headcount, age range, and ideal date. Our booking concierges handle every detail — food delivery, arrival logistics, grandparent accommodations — so your family just shows up and reconnects."
    >
      {/* ── Why a Cruise for Family Reunions ─────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Lake Travis · The Reunion Case</div>
        <h2 className="hp2-section__headline">
          One boat, every <em>generation</em>
        </h2>
        <p className="hp2-section__body">
          The problem with most family reunions: the kids want a pool, the
          teens want their phones, Aunt Susan wants a chair in the shade, and
          Grandpa wants to actually hear the conversation. A private Lake
          Travis charter solves every one of those problems on a single deck.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Everyone In One Place</h3>
            <p className="hp2-feature-card__desc">
              No splitting up between the pool, the rental house, and the
              restaurant. Four hours on the boat means 100% of your family is
              together, talking, eating, and making the same memory.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Easy On Every Age</h3>
            <p className="hp2-feature-card__desc">
              Flat boarding ramp, shaded cushioned seating, ADA-accessible
              restrooms, kid life vests in every size, and a captain who
              anchors in calm water. Built for grandparents and grandkids alike.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Zero Prep For The Host</h3>
            <p className="hp2-feature-card__desc">
              No house to clean, no grill to tend, no restaurant reservation
              to wrangle. You show up at the marina, we handle everything.
              The "host cousin" finally gets to enjoy the reunion too.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Multi-Generational Experience ────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What Each Generation Gets</div>
          <h2 className="hp2-section__headline">
            Something for <em>every age</em> on board
          </h2>
          <p className="hp2-section__body">
            Our captains have hosted more than 2,000 family reunions on Lake
            Travis. They know exactly how to design a cruise that keeps the
            six-year-old happy at the same time it keeps the eighty-six-year-old
            comfortable. Here's what each generation typically loves most.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">2–12</div>
              <h3 className="hp2-feature-card__title">Little Ones</h3>
              <p className="hp2-feature-card__desc">
                Water slide off the back deck, floating lily pad at the swim
                stop, kid life vests in every size, and shallow-cove anchoring
                so non-swimmers can stand. Parents can actually relax.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">13–25</div>
              <h3 className="hp2-feature-card__title">Teens &amp; Cousins</h3>
              <p className="hp2-feature-card__desc">
                Bluetooth sound system, jumping off the top deck, tubing
                behind the boat, and a phone-photo setup against Lake Travis
                cliffs that gets 10x the likes of their usual feed.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">26–65</div>
              <h3 className="hp2-feature-card__title">Parents &amp; Aunties</h3>
              <p className="hp2-feature-card__desc">
                BYOB bar, shaded lounge seating, captain-narrated scenic
                cruise past Mansfield Dam and the luxury homes, and a swim
                stop where you can actually hear each other talk.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">65+</div>
              <h3 className="hp2-feature-card__title">Grandparents</h3>
              <p className="hp2-feature-card__desc">
                Flat boarding ramp, cushioned seats with backs and armrests,
                handrails throughout, ADA restrooms on our larger boats, and
                a captain trained to keep the ride smooth and calm.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">80+</div>
              <h3 className="hp2-feature-card__title">Great-Grandparents</h3>
              <p className="hp2-feature-card__desc">
                Let us know in advance and we'll have shaded seating reserved,
                water and snacks ready, and crew briefed to help them board
                first. They'll be comfortable from minute one to minute 240.
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">∞</div>
              <h3 className="hp2-feature-card__title">The Whole Family</h3>
              <p className="hp2-feature-card__desc">
                One shared sunset, one shared meal, one shared photo of
                everyone at the swim stop. The reunion finally feels like a
                reunion instead of five side-conversations at a restaurant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Boat Sizing for Family Reunions ──────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Size · Fleet Planning</div>
        <h2 className="hp2-section__headline">
          The right boat for <em>your headcount</em>
        </h2>
        <p className="hp2-section__body">
          Four vessels covering every family reunion size, from a tight
          immediate-family gathering to the full extended-cousin reunion.
          All include a USCG-licensed captain, crew, premium sound, water
          slide, and BYOB.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Immediate Family</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · up to 14 guests. Parents, siblings, and a handful
              of grandkids. Intimate, budget-friendly, and perfect for a
              first-time family cruise. $200–$350/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">25–30</div>
            <h3 className="hp2-feature-card__title">Extended Family</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · 25–30 guests. Grandparents, their
              kids, all the grandkids, and a few in-laws. The classic
              family reunion headcount. $225–$425/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">50–75</div>
            <h3 className="hp2-feature-card__title">Full Family Reunion</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · 50–75 guests. Every cousin, every in-law, every
              child. Dance floor, premium sound, multiple shade zones,
              dedicated kid area. $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
