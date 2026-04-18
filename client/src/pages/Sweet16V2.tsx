import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * Sweet16V2 — Sweet 16 birthday party boat cruises on Lake Travis.
 * Route: /sweet-16-v2
 *
 * SEO Target: "sweet 16 party austin"
 * Age-appropriate framing: teen-friendly, no alcohol emphasis, parent-led guardianship.
 */
export default function Sweet16V2() {
  const faqs = [
    {
      q: 'Can we host a Sweet 16 party on a boat in Austin?',
      a: 'Yes. Sweet 16 parties are one of the most popular private charters on Lake Travis. We host dozens of Sweet 16 cruises every year with private boats for 14–75 guests, a licensed captain, premium sound system, and a supervised swim stop. Parties typically run 4 hours and start at $200/hour.',
    },
    {
      q: 'Does an adult have to be on board for a Sweet 16 cruise?',
      a: 'Yes. At least one responsible adult (21+) must be on board and sign the charter agreement as the renter of record. Most parents book the charter in their name and either attend as the host or designate another parent/guardian to ride along. Our captain and crew work directly with that adult throughout the cruise.',
    },
    {
      q: 'Is alcohol allowed on a Sweet 16 party boat?',
      a: 'No alcohol is permitted at a Sweet 16 event. Because the guest of honor and the majority of guests are minors, we ask the adult host to keep the cruise alcohol-free. We stock coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) for your sodas, mocktails, sparkling water, and juice so the focus stays on the teens having fun.',
    },
    {
      q: 'How many guests can we invite to a Sweet 16 boat party?',
      a: 'Our fleet handles Sweet 16 groups of any size. Day Tripper hosts up to 14 guests for an intimate friend group, Meeseeks and The Irony each hold 25–30 guests for a classic Sweet 16 crowd, and Clever Girl accommodates 50–75 guests for the biggest Sweet 16 bashes — complete with 14 disco balls and a full dance floor.',
    },
    {
      q: 'What does a Sweet 16 cruise itinerary look like?',
      a: 'A typical 4-hour Sweet 16 runs: arrival and boarding (30 min), cruise out to a scenic cove with music playing (45 min), swim stop with lily pads and floats (60–90 min), cake and photo moment on the upper deck, then a scenic cruise back with the playlist turned all the way up. Our captain customizes the route to the birthday girl\'s or boy\'s preferences.',
    },
    {
      q: 'Can we bring a Sweet 16 cake, decorations, and a playlist?',
      a: 'Absolutely — and we encourage it. Bring your own cake (sheet cakes travel best), balloons, banners, photo props, and sashes. Skip confetti and glitter (hard to clean from a boat). Connect any phone to our premium Bluetooth sound system and play the birthday mix the whole time.',
    },
    {
      q: 'Is swimming safe for teens during a Sweet 16 cruise?',
      a: 'Yes. We stop in calm, protected coves for swimming with a swim ladder, floating lily pads, and USCG-approved life jackets in teen and adult sizes. Our crew is trained in water safety and keeps a headcount before and after every swim stop. Strong swimmers and nervous swimmers both have a great time.',
    },
    {
      q: 'Can we do a surprise Sweet 16 party on a boat?',
      a: 'Yes — we coordinate Sweet 16 surprise parties regularly. The parent host books the cruise, friends board early and set up decorations, and the birthday teen is brought to the marina under a different pretense. When they step on the boat to a deck full of friends screaming "surprise," it is an unforgettable Sweet 16 moment.',
    },
    {
      q: 'What should Sweet 16 guests wear on the boat?',
      a: 'Swimsuits under their outfit, cover-ups, and flat shoes (sandals or boat shoes — no heels that could scuff the deck). Many Sweet 16 groups do a "cute outfit for photos, swimsuit for the swim stop" combo. Bring a towel and SPF 50+ sunscreen. Our crew has extra towels on request.',
    },
    {
      q: 'How much does a Sweet 16 cruise cost in Austin?',
      a: 'Sweet 16 private charters start at $200/hour (Day Tripper, up to 14 guests) with a 4-hour minimum, putting the base around $800. Meeseeks or The Irony (25–30 guests) start at $225/hour and Clever Girl (50–75 guests) starts at $250/hour. Add 8.25% tax and suggested 20% gratuity. Most Sweet 16 groups spend $1,200–$2,800 all-in for a 4-hour charter.',
    },
    {
      q: 'How far in advance should parents book a Sweet 16 boat party?',
      a: 'Book 6–8 weeks in advance for weekend dates, especially April–September. Saturday afternoons in peak season (May–August) fill up first. Weekday and off-peak dates (November–February) have more flexibility and often carry slightly lower rates. A 25% deposit secures the date.',
    },
    {
      q: 'What happens if it rains on our Sweet 16 date?',
      a: 'If the captain calls a weather cancellation for thunderstorms or unsafe wind, we reschedule the Sweet 16 at no charge — typically within the same season. Light rain does not cancel cruises, and our boats have covered and shaded areas. The captain makes the final weather call 2 hours before departure.',
    },
    {
      q: 'Can we add a photographer or DJ to our Sweet 16 cruise?',
      a: 'Yes. Outside photographers, videographers, and DJs are welcome on all private charters. We also partner with preferred Austin-area pros and can coordinate booking on your behalf. A professional Sweet 16 highlight reel on Lake Travis is one of the best memory keepsakes we see.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/sweet-16-v2"
      pageTitle="Sweet 16 Party Austin | Lake Travis Boat Celebrations | Premier Party Cruises"
      pageDescription="Host an unforgettable Sweet 16 party on Lake Travis. Private boat charters for 14–75 teens with adult supervision, sound system, swim stop, and total Sweet 16 magic. From $200/hr."
      heroEyebrow="Sweet 16 Parties · Lake Travis"
      heroHeadline={
        <>
          Sweet 16 on <em>Lake Travis</em>.
        </>
      }
      heroBody="The most unforgettable Sweet 16 in Austin. Private boat charter, premium sound system, swim stop, and a deck full of friends celebrating the birthday teen. Parent-hosted, fully supervised, completely memorable."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to plan the <em>best</em> Sweet 16 in Austin?
        </>
      }
      finalCtaBody="Weekend Sweet 16 dates book 6–8 weeks out during peak season. Lock in your teen's dream birthday now and our concierge team will handle every detail — decorations, cake coordination, photographer, and playlist."
    >
      {/* ── Why a Boat for Sweet 16 ─────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why a Boat for Sweet 16</div>
        <h2 className="hp2-section__headline">
          A birthday the whole grade will <em>talk about</em>.
        </h2>
        <p className="hp2-section__body">
          Restaurant parties are forgettable. Backyard parties are ordinary.
          A Sweet 16 on Lake Travis is the kind of birthday teens post about
          for weeks — a private boat, the birthday playlist playing, swim stops
          with lily pads, a cake moment under golden hour sun, and every friend
          on board wearing matching outfits for the group photo.
        </p>
        <p className="hp2-section__body">
          We've hosted Sweet 16 parties since 2009 and worked with hundreds of
          Austin parents to pull off the perfect teen celebration — safely,
          smoothly, and within budget. Our captains and crew are trained for
          all-ages events, and every boat carries USCG-approved safety
          equipment in teen and adult sizes.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Parent-Hosted & Supervised</h3>
            <p className="hp2-feature-card__desc">
              A responsible adult (21+) signs as the renter of record and rides
              along as host. Our licensed captain and crew work directly with
              that adult throughout the cruise. Alcohol-free, age-appropriate,
              and fully supervised.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Private & Totally Theirs</h3>
            <p className="hp2-feature-card__desc">
              The whole boat belongs to the Sweet 16 crew. Pick the playlist,
              choose the route, decorate the deck, and control the vibe. No
              strangers, no sharing — just the birthday teen's friends and
              a Lake Travis afternoon.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Photo-Ready Every Moment</h3>
            <p className="hp2-feature-card__desc">
              Golden-hour sunsets on the cliffs, swim stops in crystal coves,
              LED disco balls on the Clever Girl — Sweet 16 cruises are built
              for the Instagram highlight reel. Bring a photographer or just
              let the phones do their thing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sweet 16 Group Sizes ─────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Pick Your Boat</div>
          <h2 className="hp2-section__headline">
            14, 30, or 75 of her <em>closest</em> friends.
          </h2>
          <p className="hp2-section__body">
            Sweet 16 groups come in every size. A tight-knit friend group of
            10. A full grade cohort of 60. A multi-family blended celebration
            of 75. We have the right boat for each.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">14</div>
              <h3 className="hp2-feature-card__title">Day Tripper</h3>
              <p className="hp2-feature-card__desc">
                Up to 14 guests. Perfect for an intimate Sweet 16 with her
                closest friends. Starts at $200/hr. 4-hour minimum.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">30</div>
              <h3 className="hp2-feature-card__title">Meeseeks or The Irony</h3>
              <p className="hp2-feature-card__desc">
                25–30 guests each. The classic Sweet 16 size — the whole friend
                group plus a few parents chaperoning. From $225/hr.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">75</div>
              <h3 className="hp2-feature-card__title">Clever Girl</h3>
              <p className="hp2-feature-card__desc">
                50–75 guests. The flagship Sweet 16 bash with 14 disco balls,
                LED lighting, and a full dance floor. From $250/hr.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Makes a Sweet 16 Cruise Special ──────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">What's Included</div>
        <h2 className="hp2-section__headline">
          Everything she needs for the <em>perfect</em> Sweet 16.
        </h2>
        <p className="hp2-section__body">
          Every private Sweet 16 charter includes a USCG-licensed captain,
          trained crew, premium Bluetooth sound system for the birthday
          playlist, coolers (bring your own ice, or order pre-iced from Party On Delivery) for sodas and mocktails, a swim
          stop in a scenic cove, swim ladder, life jackets in all sizes,
          covered and shaded seating, and a clean restroom on board.
        </p>
        <p className="hp2-section__body">
          Upgrade to the Ultimate package ($250–$350 flat) and we add premium
          Sweet 16 decorations, a banner setup, plasticware for cake service,
          a 6-foot food table, and a dedicated event coordinator who handles
          the timeline. All you bring is the cake, the teens, and the energy.
        </p>
      </section>
    </V2PageTemplate>
  );
}
