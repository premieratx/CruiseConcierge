import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * PartyBoatAustinV2 — high-value SEO page for "party boat austin" variants.
 * Route: /party-boat-austin-v2
 *
 * SEO Targets:
 *  - "party boat austin"      (480 vol, current rank #4)
 *  - "austin party boat"      (480 vol, current rank #2)
 *  - "party boat austin tx"   (390 vol, current rank #2)
 *
 * Strategy: Competitive location page — full fleet breakdown, transparent
 * pricing, Anderson Mill Marina location info, BYOB and group-size depth.
 */
export default function PartyBoatAustinV2() {
  const faqs = [
    {
      q: 'What is the best party boat in Austin TX?',
      a: 'Premier Party Cruises operates the highest-rated party boat fleet in Austin TX, with a 4.9-star rating across 420+ reviews and 150,000+ guests served since 2009. Our flagship Austin party boat, Clever Girl, is a 75-guest Lake Travis vessel with 14 disco balls, a dedicated dance floor, LED lighting, and a premium sound system. Our four-boat fleet covers every group size from 14 to 75 guests. All boats depart from Anderson Mill Marina on Lake Travis, 25 minutes from downtown Austin — the closest Lake Travis party boat marina to the city.',
    },
    {
      q: 'How much does a party boat in Austin cost?',
      a: 'Party boat rentals in Austin start at $200 per hour for Day Tripper (up to 14 guests) with a 4-hour minimum, putting the base charter at $800. Meeseeks (25 guests) and The Irony (30 guests) start at $225/hour. Clever Girl (75 guests) starts at $250/hour and goes up to $500/hour during peak Saturdays. For shared tickets on our ATX Disco Cruise, pricing is $85-$105 per person with tax and gratuity included. Every price includes captain, fuel, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), and gratuity — no hidden fees.',
    },
    {
      q: 'Where do Austin party boats launch from?',
      a: 'Premier Party Cruises Austin party boats launch from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — directly on Lake Travis. It is a 25-minute drive from downtown Austin, making Anderson Mill the closest Lake Travis marina to the city center. Free parking, clean pre-departure restrooms, easy check-in. The marina is easy for Ubers and party buses to reach.',
    },
    {
      q: 'How many people fit on an Austin party boat?',
      a: 'Our Austin party boat fleet handles every group size: Day Tripper (up to 14 guests), Meeseeks (up to 25), The Irony (up to 30), and Clever Girl (50-75 guests). For groups over 75, we can combine two boats into a flotilla for up to 100-105 guests. Austin bachelor parties, bachelorettes, corporate events, birthdays, and weddings all use the fleet — we match the boat to your guest count.',
    },
    {
      q: 'Can we bring our own alcohol on an Austin party boat?',
      a: 'Yes — every Premier Party Cruises Austin party boat is 100% BYOB. Bring beer, seltzers, spirits, wine, mixers, non-alcoholic drinks, and snacks. Cans and plastic containers only (no glass for safety). Every boat comes with large coolers (bring your own ice, or order pre-iced from Party On Delivery). You can also use our delivery partner Party On Delivery to have alcohol and food waiting on the boat when you board. No corkage fees, no minimums, no upcharges.',
    },
    {
      q: 'What is included on an Austin party boat rental?',
      a: 'Every Austin party boat private charter includes: a USCG-licensed captain, trained crew, premium Bluetooth sound system, large coolers (bring your own ice, or order pre-iced from Party On Delivery), swim ladder, USCG-approved life jackets in all adult sizes, swim stop in a scenic Lake Travis cove, onboard restroom, covered shaded lounge areas, and gratuity. Clever Girl adds a dance floor, 14 disco balls, and LED lighting. The ATX Disco Cruise shared ticket adds a professional DJ, professional photographer with digital delivery, and giant lily pad floats.',
    },
    {
      q: 'How long are Austin party boat charters?',
      a: 'Austin party boat private charters start at a 4-hour minimum. Most groups book the 4-hour standard; longer 6 or 8-hour charters are available at the same hourly rate. The ATX Disco Cruise public ticket is fixed at 4 hours. Cruise time includes a 1.5-2 hour anchored swim stop in a Lake Travis cove, cruising time between coves, and time on the dance floor or deck.',
    },
    {
      q: 'When do Austin party boats run?',
      a: 'Private Austin party boat charters run year-round on Lake Travis. Peak season is March through October when the weather is warmest for swimming. The shared-ticket ATX Disco Cruise specifically runs March through October with three weekly time slots — Friday 12-4pm, Saturday 11am-3pm, and Saturday 3:30-7:30pm (sunset). Winter charters (November-February) are popular for corporate events, holiday parties, and smaller private bookings where swimming is optional.',
    },
    {
      q: 'What should we bring on an Austin party boat?',
      a: 'Pack: swimsuit, towel (or add towel service upgrade), sunscreen SPF 50+ (reef-safe preferred), sunglasses, hat, flat shoes or sandals (no hard-soled shoes onboard), waterproof phone case for the swim stop, and your drinks/snacks in cans or plastic. A change of clothes is handy if you are heading out after. We supply the coolers, ice, sound system, life jackets, and all safety equipment — you just bring the party.',
    },
    {
      q: 'Do Austin party boats have bathrooms?',
      a: 'Yes. Every boat in our Austin party boat fleet — Day Tripper, Meeseeks, The Irony, and Clever Girl — has a clean onboard restroom. No need to return to the marina mid-cruise. Restrooms are serviced before every charter.',
    },
    {
      q: 'Can kids come on an Austin party boat?',
      a: 'Yes, kids are welcome on family-friendly private charters. We have USCG-approved life jackets in infant, child, and adult sizes. Many families book Austin party boats for birthday parties, graduations, family reunions, and summer hangouts. The public ATX Disco Cruise is age-restricted to 21+ because of the bachelor/bachelorette focus, but private charters have no minimum age.',
    },
    {
      q: 'What is the best Austin party boat for a bachelor or bachelorette party?',
      a: 'For bachelor and bachelorette parties, the two best picks are: (1) tickets on the ATX Disco Cruise on Clever Girl — $85-$105/person, professional DJ and photographer included, shared with other celebrating groups; or (2) a private charter on Clever Girl or The Irony for a group-exclusive experience from $250/hour. Most 20-40 person bachelor/bachelorette groups land on the shared Disco Cruise for the all-inclusive DJ+photographer package. Bigger groups or groups wanting privacy go private.',
    },
    {
      q: 'Can we book an Austin party boat for a corporate event?',
      a: 'Yes. Lake Travis party boats are a top Austin corporate team-building venue. Companies book private charters for team outings, client entertainment, holiday parties, company milestone celebrations, and sales kickoffs. We can add catering through partner vendors, swap the BYOB setup for a hosted bar, coordinate branded decor and name badges, and run a tighter "meeting-on-the-water" schedule if needed. Corporate charters start at $200/hour and scale up to Clever Girl for 75+ employee groups.',
    },
    {
      q: 'How far in advance should we book an Austin party boat?',
      a: 'Book 6-8 weeks ahead for Saturday charters in peak season (March-October). Prime bachelor/bachelorette Saturdays in April, May, September, and October fill first — Clever Girl often sells out 8-10 weeks in advance. Weekday and Friday charters have more availability and can sometimes be booked 1-2 weeks out. Winter charters (November-February) are easier to book last-minute. A 25% deposit holds the date; the balance is due 30 days before.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/party-boat-austin-v2"
      pageTitle="Austin Party Boat · Party Boat Austin TX · Lake Travis Party Boat Rentals from $200/hr"
      pageDescription="The #1 Austin party boat on Lake Travis. 4-boat fleet (14–75 guests), year-round, always BYOB (Party On Delivery sets up drinks on ice). Private charters from $200/hr or the all-inclusive ATX Disco Cruise from $85/person. 15+ years, 150,000+ guests, 0 incidents, 4.9/5. Book online or call (512) 488-5892."
      heroEyebrow="Party Boat Rentals · Austin, TX"
      heroHeadline={
        <>
          Austin party boat <em>rentals</em>.
        </>
      }
      heroBody="The largest party boat fleet on Lake Travis. Four boats, 14 to 75 guests, BYOB-friendly, USCG-certified captains, departing 25 minutes from downtown Austin. Private charters from $200/hour or hop on the shared ATX Disco Cruise from $85/person."
      primaryCta={{ text: 'Book Your Party Boat', href: '/book' }}
      secondaryCta={{ text: 'See Full Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Austin&apos;s most-booked party boat, <em>waiting</em>.
        </>
      }
      finalCtaBody="Whether it's a bachelor weekend, a corporate retreat, or a big birthday, Austin's best party boat rentals depart from Anderson Mill Marina every weekend. Book online in 2 minutes or call us to lock in your date."
    >
      {/* ── Fleet Breakdown ─────────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Austin Party Boat Fleet</div>
        <h2 className="hp2-section__headline">
          Four Austin party boats. Every <em>group</em>.
        </h2>
        <p className="hp2-section__body">
          Premier Party Cruises runs the largest dedicated party boat fleet
          on Lake Travis. Four boats, each built for a different group size
          and vibe, all departing from the same marina with the same
          USCG-certified captain standard. Pick by guest count first, then
          by whether you want a dance floor and disco balls built in.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Day Tripper · up to 14</h3>
            <p className="hp2-feature-card__desc">
              Austin&apos;s best small-group party boat. Premium feel,
              onboard restroom, premium Bluetooth sound, swim ladder, ice
              chests. from $200/hour with a 4-hour minimum.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Meeseeks · up to 25</h3>
            <p className="hp2-feature-card__desc">
              The mid-size Austin party boat sweet spot. Ideal for 18-25
              guests — bachelor parties, milestone birthdays, corporate
              teams. from $225/hour, same 4-hour minimum.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">The Irony · up to 30</h3>
            <p className="hp2-feature-card__desc">
              Slightly larger than Meeseeks. Best pick for 25-30 guests
              who want the full private-boat experience without stepping
              up to the 75-capacity flagship. from $225/hour.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Clever Girl · 50-75</h3>
            <p className="hp2-feature-card__desc">
              Austin&apos;s flagship party boat. 14 disco balls, LED
              lighting, a full dance floor, premium sound. The boat behind
              the ATX Disco Cruise. from $250/hour depending on season.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Two-Boat Flotilla · up to 100+</h3>
            <p className="hp2-feature-card__desc">
              Book Clever Girl + Meeseeks or The Irony together. Boats
              raft up at the swim stop so your 75-100 guest group celebrates
              together. Perfect for company events and large weddings.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">ATX Disco Cruise Ticket</h3>
            <p className="hp2-feature-card__desc">
              Not renting a whole boat? Buy individual tickets on the
              shared ATX Disco Cruise aboard Clever Girl. From $85/person,
              tax and tip included, professional DJ and photographer included.
            </p>
          </div>
        </div>
      </section>

      {/* ── Transparent Pricing ─────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Austin Party Boat Pricing</div>
          <h2 className="hp2-section__headline">
            Transparent party boat pricing, <em>no surprises</em>.
          </h2>
          <p className="hp2-section__body">
            Every Austin party boat rate below includes captain, fuel,
            sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), life jackets, swim ladder,
            and gratuity. The number you see is the number you pay. Rates
            vary by season and day of week — peak Saturdays in April-May
            and September-October sit at the upper end of each range.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$800</div>
              <h3 className="hp2-feature-card__title">Day Tripper Base</h3>
              <p className="hp2-feature-card__desc">
                4 hours at $200/hr. Up to 14 guests = roughly $57 per
                guest for a full private Austin party boat charter. Peak
                Saturdays reach $1,400 total ($100/guest).
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$900</div>
              <h3 className="hp2-feature-card__title">Meeseeks / Irony Base</h3>
              <p className="hp2-feature-card__desc">
                4 hours at $225/hr. Up to 30 guests = as low as $30 per
                guest on the The Irony. Peak Saturdays reach $1,700
                total (still just $57/guest at max capacity).
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$1,000</div>
              <h3 className="hp2-feature-card__title">Clever Girl Base</h3>
              <p className="hp2-feature-card__desc">
                4 hours at $250/hr. Up to 75 guests = as low as $13 per
                guest. Peak Saturdays reach $2,000 ($27/guest). Lowest
                per-head rate in the Austin party boat market at capacity.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$85</div>
              <h3 className="hp2-feature-card__title">Disco Cruise Ticket</h3>
              <p className="hp2-feature-card__desc">
                Per person on the Saturday 3:30-7:30pm sunset cruise. Tax
                and gratuity included in the $111.56 all-in total. DJ,
                photographer, 14 disco balls, and giant floats included.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$95</div>
              <h3 className="hp2-feature-card__title">Friday Disco Cruise</h3>
              <p className="hp2-feature-card__desc">
                Friday 12-4pm ticket on the ATX Disco Cruise. $124.88
                all-in with tax and tip. Identical setup to the Saturday
                slots — great if Saturday is booked or your group wants
                to kick off the weekend early.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$105</div>
              <h3 className="hp2-feature-card__title">Saturday AM Disco</h3>
              <p className="hp2-feature-card__desc">
                Saturday 11am-3pm ticket — the most popular slot. $137.81
                all-in. Peak energy, peak sun, premium boat positioning
                at the swim cove. The most-booked Austin party boat ticket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location ────────────────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Where Austin Party Boats Launch</div>
        <h2 className="hp2-section__headline">
          Anderson Mill Marina — <em>25 minutes</em> from downtown Austin.
        </h2>
        <p className="hp2-section__body">
          Every Premier Party Cruises Austin party boat departs from
          Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 —
          directly on Lake Travis. It is the closest Lake Travis party-boat
          marina to downtown Austin, about a 25-minute drive via RR 620
          and FM 2769. Free on-site parking, clean pre-departure restrooms,
          dockside check-in, and quick boat loading.
        </p>
        <p className="hp2-section__body">
          For groups rolling in from downtown Austin hotels, the easiest
          move is a single large Uber XL or a chartered party bus to the
          marina together — that way nobody has to drive after the cruise
          and the group energy carries onto the boat. Party buses can be
          booked through partner vendors and typically run $400-$800
          round-trip from downtown for a 15-25 person group.
        </p>
        <p className="hp2-section__body">
          Arrive 15 minutes early. The captain does a pre-departure safety
          brief (2 minutes), the crew helps load coolers, and the boat
          pulls away from the slip right on schedule. We do not hold boats
          past the scheduled departure time — the lake coves get busy on
          Saturdays and we want your swim stop to land in a good spot.
        </p>
      </section>

      {/* ── BYOB + What to Bring ────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">BYOB &amp; What to Pack</div>
          <h2 className="hp2-section__headline">
            100% BYOB. Bring <em>your</em> drinks, our boat.
          </h2>
          <p className="hp2-section__body">
            Every Austin party boat in our fleet is BYOB from top to
            bottom. No corkage fees, no minimums, no hidden upcharges. We
            supply the coolers and the ice — you supply whatever the group
            wants to drink. Cans and plastic only (no glass), and if you
            want to skip the grocery run, our delivery partner Party On
            Delivery can have everything waiting at your slip when you board.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">What to Bring</h3>
              <p className="hp2-feature-card__desc">
                Beer, seltzers, canned cocktails, wine in cans or plastic,
                mixers, non-alcoholic drinks, snacks, a playlist, swimsuit,
                sunscreen, sunglasses, hat, and a towel (or add towel service).
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">What We Supply</h3>
              <p className="hp2-feature-card__desc">
                Coolers (BYO ice or order pre-iced from Party On Delivery), premium sound system (Bluetooth
                to any phone), swim ladder, USCG life jackets in all adult
                sizes, onboard restroom, shaded lounge areas, captain + crew.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">What to Skip</h3>
              <p className="hp2-feature-card__desc">
                Glass bottles (safety rule — cans and plastic only), hard
                soled shoes on deck, confetti, glitter, and balloons that
                could blow overboard. Everything else is fair game.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">Party On Delivery</h3>
              <p className="hp2-feature-card__desc">
                Order alcohol and food in advance and have it on the boat
                when you arrive — no grocery run needed. Particularly
                popular for bachelor parties flying in the day before.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">Custom Add-Ons</h3>
              <p className="hp2-feature-card__desc">
                Essentials upgrade ($100-$200 flat): decorations, towels,
                sunscreen station. Ultimate upgrade ($250-$350 flat):
                premium decor, priority boarding, dedicated coordinator.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◇</div>
              <h3 className="hp2-feature-card__title">Catering</h3>
              <p className="hp2-feature-card__desc">
                BBQ, tacos, pizza, catering platters — all coordinated
                through our partner delivery vendors for drop-off at the
                slip or on the boat. Great for corporate and wedding events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Sizes ──────────────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Match Your Group</div>
        <h2 className="hp2-section__headline">
          Austin party boats for every <em>group</em> size.
        </h2>
        <p className="hp2-section__body">
          Our fleet is built to scale. The smallest private charter on
          Lake Travis for 4-8 people sits comfortably on Day Tripper. The
          biggest corporate offsites and mega-bachelors fit on Clever Girl
          or across a two-boat flotilla. Every group from 4 to 100+ has an
          Austin party boat that fits.
        </p>
        <p className="hp2-section__body">
          Not sure which boat to pick? Use guest count as the first filter,
          then decide whether you want the disco-ball atmosphere (Clever
          Girl only) or the cleaner private-boat feel (Day Tripper,
          Meeseeks, Irony). When in doubt, size up — Lake Travis party
          boats always feel smaller on a hot Saturday than they look on paper.
        </p>
      </section>
    </V2PageTemplate>
  );
}
