import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * PartyBoatLakeTravisV2 — high-value SEO page for Lake Travis party boat queries.
 * Route: /party-boat-lake-travis-v2
 *
 * SEO Targets:
 *  - "lake travis party boat"   (390 vol, current rank #10)
 *  - "party boat lake travis"   (260 vol, current rank #11)
 *
 * Strategy: Lake Travis-specific content, marina info, cove details,
 * full fleet breakdown, transparent pricing, BYOB info.
 */
export default function PartyBoatLakeTravisV2() {
  const faqs = [
    {
      q: 'What is the best party boat on Lake Travis?',
      a: 'Clever Girl by Premier Party Cruises is widely considered the best party boat on Lake Travis. It is a 75-guest flagship vessel with 14 disco balls, a dedicated dance floor, LED lighting, and a premium sound system. Our four-boat Lake Travis party boat fleet — Day Tripper (14), Meeseeks (25), The Irony (30), and Clever Girl (75) — holds a 4.9-star rating across 420+ reviews, with 150,000+ guests served since 2009. All four boats depart from Anderson Mill Marina, the closest Lake Travis marina to downtown Austin.',
    },
    {
      q: 'How much does a Lake Travis party boat rental cost?',
      a: 'Lake Travis party boat rentals start at $200 per hour on Day Tripper (up to 14 guests) with a 4-hour minimum ($800 base). Meeseeks and The Irony start at $225/hour. Clever Girl starts at $250/hour and peaks at $500/hour on premium Saturdays. Every rate includes captain, fuel, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), swim ladder, life jackets, and gratuity. For a shared-ticket Lake Travis party boat experience, the ATX Disco Cruise is $85-$105 per person with tax and tip included.',
    },
    {
      q: 'Where do Lake Travis party boats leave from?',
      a: 'Premier Party Cruises Lake Travis party boats depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. It is the closest Lake Travis marina to downtown Austin — about a 25-minute drive via RR 620. Free parking, clean pre-departure restrooms, dockside check-in. The marina is Uber-friendly and easy for party buses to reach.',
    },
    {
      q: 'How many people can a Lake Travis party boat hold?',
      a: 'Our Lake Travis party boat fleet covers every group size. Day Tripper holds up to 14 guests. Meeseeks holds up to 25. The Irony holds up to 30. Clever Girl, our flagship, holds 50-75 depending on configuration. For groups over 75, book Clever Girl plus Meeseeks or The Irony as a two-boat flotilla — boats raft up at the swim stop so the 100+ guest group celebrates together.',
    },
    {
      q: 'Can we swim on a Lake Travis party boat?',
      a: 'Yes — swimming at the anchored cove stop is the highlight of every Lake Travis party boat charter. Our captains know the best Lake Travis swim coves (crystal-clear water, limestone cliffs, away from the main boat traffic) and anchor the boat for 1.5-2 hours of open swim time. Every boat has a swim ladder, USCG life jackets in all adult sizes, and room to jump off the deck. Clever Girl carries giant 6x20-foot lily pad floats.',
    },
    {
      q: 'Is BYOB allowed on Lake Travis party boats?',
      a: 'Yes — every Premier Party Cruises Lake Travis party boat is 100% BYOB. Beer, seltzers, spirits, wine, mixers, soft drinks, snacks. Cans and plastic only, no glass. Every boat comes with large coolers (bring your own ice, or order pre-iced from Party On Delivery). No corkage fees, no minimums. You can also use Party On Delivery to have everything waiting at the slip when you board.',
    },
    {
      q: 'Do Lake Travis party boats have restrooms?',
      a: 'Yes — every boat in our Lake Travis fleet has a clean onboard restroom. No mid-cruise trips back to the marina. Restrooms are serviced before every charter and stocked with supplies.',
    },
    {
      q: 'When do Lake Travis party boats run?',
      a: 'Private Lake Travis party boat charters run year-round. Peak season is March through October with warm swimming weather. The shared-ticket ATX Disco Cruise runs March through October with three time slots weekly: Friday 12-4pm, Saturday 11am-3pm, and Saturday 3:30-7:30pm (sunset). Winter charters (November-February) are common for corporate events, holiday parties, and smaller private bookings.',
    },
    {
      q: 'How long are Lake Travis party boat charters?',
      a: 'Lake Travis party boat private charters have a 4-hour minimum. Most groups book the 4-hour standard; extended 6 or 8-hour charters are available at the same hourly rate. The ATX Disco Cruise shared ticket is fixed at 4 hours. A typical 4-hour cruise includes cruising to the cove (20-30 minutes), a 1.5-2 hour anchored swim stop, and cruising back or to a second cove.',
    },
    {
      q: 'What is the difference between renting a boat and a Lake Travis party boat ticket?',
      a: 'A Lake Travis party boat rental (private charter) gives your group exclusive use of one of our four boats — you control the playlist, route, and departure time, and the boat is yours only. Rates are hourly with a 4-hour minimum, starting at $200/hour. A Lake Travis party boat ticket (ATX Disco Cruise) is per-person on a scheduled departure — you share Clever Girl with other bachelor/bachelorette groups, but a professional DJ and photographer are included. Tickets from $85/person. Most small groups buy tickets; most larger or privacy-focused groups book a private charter.',
    },
    {
      q: 'When should we book a Lake Travis party boat?',
      a: 'Book 6-8 weeks ahead for peak-season Saturday charters (April-May, September-October). Prime Clever Girl Saturdays can sell out 8-10 weeks in advance. Friday and weekday charters usually have more availability and can sometimes book 1-2 weeks out. Winter charters (November-February) are easier last-minute. A 25% deposit holds the date; the balance is due 30 days before.',
    },
    {
      q: 'Are Lake Travis party boats safe?',
      a: 'Yes. Every Premier Party Cruises Lake Travis party boat is USCG-certified with a USCG-licensed captain and trained crew. Every boat carries USCG-approved life jackets in all adult sizes (and infant/child sizes on family charters), a first-aid kit, fire extinguishers, marine radios, and a swim ladder. Our captains monitor weather continuously and will reschedule at no cost if conditions are unsafe. 150,000+ guests served since 2009 with a perfect safety record.',
    },
    {
      q: 'Can we bring our own food on a Lake Travis party boat?',
      a: 'Yes — bring whatever food you want on your Lake Travis party boat. Snacks, sandwiches, charcuterie, pizza, BBQ, taco platters, cupcakes, cookies. Many groups coordinate food drop-offs right to the slip through Party On Delivery or local catering vendors. The boat has counter space for setup. For bigger events (corporate, weddings), we can help coordinate a full catered menu on board.',
    },
    {
      q: 'What should we wear on a Lake Travis party boat?',
      a: 'Swimsuit under a light cover-up or tank. Flat shoes or sandals (no hard-soled shoes on deck — it scuffs the boat). Sunglasses, hat, and SPF 50+ sunscreen. A towel (or add towel service upgrade). A change of clothes is handy if you are heading out after the cruise. For bachelor/bachelorette groups, matching shirts are welcome and encouraged. Lake Travis sun is strong — even with the covered shaded areas on every boat, plan for it.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/party-boat-lake-travis-v2"
      pageTitle="Lake Travis Party Boat Rentals | 4 Boats, 14-75 Guests | From $200/hr"
      pageDescription="The #1 Lake Travis party boat rental fleet. Private charters from $200/hour on 4 boats (14-75 guests). BYOB, USCG-certified captains, departing Anderson Mill Marina. Book online."
      heroEyebrow="Party Boat Rentals · Lake Travis"
      heroHeadline={
        <>
          Lake Travis party <em>boats</em>.
        </>
      }
      heroBody="The biggest, best-rated Lake Travis party boat fleet. Four boats from 14 to 75 guests, BYOB-friendly, USCG-certified. Private charters from $200/hour — or hop on the shared ATX Disco Cruise from $85/person."
      primaryCta={{ text: 'Book a Lake Travis Boat', href: '/book' }}
      secondaryCta={{ text: 'Explore the Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Lake Travis, at its <em>best</em>.
        </>
      }
      finalCtaBody="Every great Lake Travis weekend has a party boat at the center of it. Pick your boat, pick your date, pick your playlist — our team handles the rest. Book online or call (512) 488-5892."
    >
      {/* ── The Fleet ──────────────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Lake Travis Fleet</div>
        <h2 className="hp2-section__headline">
          Four Lake Travis party boats, <em>one marina</em>.
        </h2>
        <p className="hp2-section__body">
          Our four Lake Travis party boats all depart from Anderson Mill
          Marina, all come with USCG-certified captains, all are BYOB, and
          all handle the classic Lake Travis party-boat day — cruise out,
          anchor in a cove, swim, dance, cruise back. The difference is
          guest count and how much dance-floor atmosphere you want built in.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Day Tripper</h3>
            <p className="hp2-feature-card__desc">
              Up to 14 guests · from $200/hour. The premium small-group
              Lake Travis party boat. Onboard restroom, swim ladder,
              Bluetooth sound, ice chests, BYOB. Perfect for intimate crews.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">25</div>
            <h3 className="hp2-feature-card__title">Meeseeks</h3>
            <p className="hp2-feature-card__desc">
              Up to 25 guests · from $225/hour. The mid-size Lake Travis
              sweet spot. Ideal for 18-25 bachelor/bachelorette groups,
              milestone birthdays, and tighter corporate teams.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">30</div>
            <h3 className="hp2-feature-card__title">The Irony</h3>
            <p className="hp2-feature-card__desc">
              Up to 30 guests · from $225/hour. A touch bigger than
              Meeseeks. Best match for 25-30 guest groups who want the
              private-boat feel without stepping up to the flagship.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">75</div>
            <h3 className="hp2-feature-card__title">Clever Girl</h3>
            <p className="hp2-feature-card__desc">
              50-75 guests · from $250/hour. The Lake Travis flagship.
              14 disco balls, dedicated dance floor, LED lighting, premium
              sound. The boat behind the ATX Disco Cruise.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">100+</div>
            <h3 className="hp2-feature-card__title">Two-Boat Flotilla</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl + Meeseeks or The Irony for 75-105 guests. Both
              boats raft up at the swim cove so your big group celebrates
              together. Ideal for weddings and company events.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$85</div>
            <h3 className="hp2-feature-card__title">Shared Disco Ticket</h3>
            <p className="hp2-feature-card__desc">
              Prefer to skip the private rental? Buy individual tickets
              on the ATX Disco Cruise aboard Clever Girl. Professional DJ
              and photographer included. From $85/person all-inclusive.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Transparent Pricing</div>
          <h2 className="hp2-section__headline">
            Lake Travis party boat pricing, <em>all-inclusive</em>.
          </h2>
          <p className="hp2-section__body">
            Every Lake Travis private-charter rate below includes the
            captain, fuel, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), swim ladder,
            life jackets, and gratuity. No hidden fees, no added surcharges
            — the number you see is the number you pay. Rates vary by
            season, with peak Saturdays in April-May and September-October
            at the top of each range.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$200/hr</div>
              <h3 className="hp2-feature-card__title">Day Tripper Starting</h3>
              <p className="hp2-feature-card__desc">
                4-hour minimum = $800 base. Fits up to 14 guests — so a
                full private Lake Travis party boat charter pencils out
                to as low as $57 per guest.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$225/hr</div>
              <h3 className="hp2-feature-card__title">Meeseeks / Irony Starting</h3>
              <p className="hp2-feature-card__desc">
                4-hour minimum = $900 base. With 30 guests on The Irony,
                that is $30 per guest. Best per-head value in the
                mid-size Lake Travis party boat market.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$250/hr</div>
              <h3 className="hp2-feature-card__title">Clever Girl Starting</h3>
              <p className="hp2-feature-card__desc">
                4-hour minimum = $1,000 base. At 75 guests, that is $13
                per guest — the lowest per-head rate on Lake Travis when
                you fill the flagship.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$85</div>
              <h3 className="hp2-feature-card__title">Disco Cruise Ticket</h3>
              <p className="hp2-feature-card__desc">
                Per person on Saturday 3:30-7:30pm sunset cruise. $111.56
                all-in with tax and tip. Includes professional DJ,
                photographer, 14 disco balls, and giant floats.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">+ Ess.</div>
              <h3 className="hp2-feature-card__title">Essentials Upgrade</h3>
              <p className="hp2-feature-card__desc">
                $100-$200 flat. Adds decorations, towel service, and an
                SPF-50 sunscreen station. Popular add-on for bachelor and
                bachelorette groups wanting the extra polish.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">+ Ult.</div>
              <h3 className="hp2-feature-card__title">Ultimate Upgrade</h3>
              <p className="hp2-feature-card__desc">
                $250-$350 flat. Premium decor, custom accessories,
                priority boarding, dedicated event coordinator. The full
                white-glove Lake Travis party boat treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Anderson Mill Marina ───────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Where You Board</div>
        <h2 className="hp2-section__headline">
          Anderson Mill Marina — <em>the</em> Lake Travis party boat launch.
        </h2>
        <p className="hp2-section__body">
          Every Premier Party Cruises Lake Travis party boat launches from
          Anderson Mill Marina, 13993 FM 2769, Leander, TX 78641. It sits
          directly on Lake Travis and is the closest Lake Travis party-boat
          marina to downtown Austin — about 25 minutes via RR 620 and
          FM 2769. Free on-site parking, clean pre-departure restrooms,
          dockside check-in, and quick boat loading.
        </p>
        <p className="hp2-section__body">
          From Anderson Mill, the boats cruise 15-30 minutes to a scenic
          Lake Travis cove for the anchored swim stop. Our captains know
          every cove on the lake and pick the best spot based on weather,
          water level, and wind direction. Most cruises hit Devil&apos;s Cove,
          Starnes Island, or one of the quieter bluff-lined coves on the
          north shore — all with crystal-clear water and limestone-cliff
          backdrops that make for the iconic Lake Travis party boat photo.
        </p>
        <p className="hp2-section__body">
          Arrive 15 minutes early. The captain runs a quick safety brief,
          the crew helps load your coolers, and the boat pulls away from
          the slip on time. We cannot hold departures past the scheduled
          time on busy Saturdays, so budget the drive from downtown Austin
          accordingly — Saturday morning traffic on 360 and 620 can add
          10-15 minutes.
        </p>
      </section>

      {/* ── BYOB + What to Bring ───────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">BYOB &amp; Packing</div>
          <h2 className="hp2-section__headline">
            100% BYOB on every Lake Travis <em>party boat</em>.
          </h2>
          <p className="hp2-section__body">
            Every Lake Travis party boat in our fleet is BYOB, no corkage
            fees, no minimums. Bring whatever the group wants — we provide
            the coolers and the ice, you provide the drinks and snacks.
            Cans and plastic only (no glass, safety rule). If you want to
            skip the grocery run, our delivery partner Party On Delivery
            can have everything waiting at the slip when you board.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">Bring</h3>
              <p className="hp2-feature-card__desc">
                Beer, seltzers, canned cocktails, wine in cans/plastic,
                mixers, sodas, snacks, swimsuit, sunscreen SPF 50+,
                sunglasses, hat, towel, flat shoes, phone case.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">We Supply</h3>
              <p className="hp2-feature-card__desc">
                Coolers with ice, premium Bluetooth sound, swim ladder,
                USCG life jackets, onboard restroom, shaded lounge,
                captain and crew, safety equipment, swim stop.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">Skip</h3>
              <p className="hp2-feature-card__desc">
                Glass bottles, hard-soled shoes on deck, confetti, glitter,
                loose balloons. We protect the Lake Travis environment
                along with every other boat operator on the water.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Size Guide ───────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Match Your Group</div>
        <h2 className="hp2-section__headline">
          Every Lake Travis party boat group size, <em>covered</em>.
        </h2>
        <p className="hp2-section__body">
          Our Lake Travis party boat fleet is built to scale from small
          premium groups to 100+ guest corporate flotillas. Match by
          guest count first, then decide whether you want the full
          disco-ball flagship or a cleaner private-boat setup.
        </p>
        <p className="hp2-section__body">
          <strong style={{ color: 'var(--hp2-cream)' }}>4-14 guests:</strong> Day
          Tripper private charter.{' '}
          <strong style={{ color: 'var(--hp2-cream)' }}>15-25 guests:</strong>{' '}
          Meeseeks private charter.{' '}
          <strong style={{ color: 'var(--hp2-cream)' }}>25-30 guests:</strong> The
          Irony private charter.{' '}
          <strong style={{ color: 'var(--hp2-cream)' }}>30-75 guests:</strong>{' '}
          Clever Girl private charter or ATX Disco Cruise tickets.{' '}
          <strong style={{ color: 'var(--hp2-cream)' }}>75-105 guests:</strong>{' '}
          two-boat flotilla.
        </p>
        <p className="hp2-section__body">
          When in doubt on a Lake Travis party boat, always size up. The
          lake boats always feel a little smaller on a hot Saturday than
          they look on paper, and the per-guest math still works in your
          favor at capacity.
        </p>
      </section>
    </V2PageTemplate>
  );
}
