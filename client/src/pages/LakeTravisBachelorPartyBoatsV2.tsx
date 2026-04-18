import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * LakeTravisBachelorPartyBoatsV2 — content hub comparing Lake Travis
 * bachelor party boats.
 * Route: /lake-travis-bachelor-party-boats-v2
 *
 * SEO Target: "lake travis bachelor party boats"
 * Strategy: Break down the 4 boats in our fleet, sizes, price tiers, and
 * match each to the bachelor group that should book it.
 */
export default function LakeTravisBachelorPartyBoatsV2() {
  const faqs = [
    {
      q: 'What are the best Lake Travis bachelor party boats?',
      a: 'Premier Party Cruises operates the four most-booked bachelor party boats on Lake Travis: Day Tripper (up to 14 guests), Meeseeks (up to 25 guests), The Irony (up to 30 guests), and Clever Girl (50-75 guests). Clever Girl is the flagship bachelor boat with 14 disco balls, a dance floor, and a full DJ setup. The Irony and Meeseeks hit the classic mid-size bachelor sweet spot. Day Tripper is the go-to for smaller premium groups. All four depart from Anderson Mill Marina, about 25 minutes from downtown Austin.',
    },
    {
      q: 'How many people fit on a Lake Travis bachelor party boat?',
      a: 'Our Lake Travis bachelor party boats range from 14 to 75 guests. Day Tripper holds up to 14. Meeseeks holds up to 25. The Irony holds up to 30. Clever Girl, our flagship party boat, holds 50-75 guests depending on configuration. Groups over 75 can split across two boats or combine Clever Girl with Meeseeks for a 100+ guest two-boat bachelor flotilla.',
    },
    {
      q: 'How much does a Lake Travis bachelor party boat rental cost?',
      a: 'Private Lake Travis bachelor party boat rentals start at $200/hour on Day Tripper with a 4-hour minimum ($800 base). Meeseeks starts at $225/hour, The Irony at $225/hour, and Clever Girl at $250/hour with premium peak-season pricing up to $500/hour. For a shared ticket, the ATX Disco Cruise on Clever Girl is $85-$105 per person depending on time slot, with tax and gratuity included. Private rates include captain, fuel, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), and gratuity.',
    },
    {
      q: 'Which Lake Travis bachelor boat is best for a group of 20?',
      a: 'For a 20-person bachelor group, The Irony (up to 30 guests) is the tightest fit with a little room to breathe. Meeseeks works too if the group is 25 or under. If you expect the guest list to grow, or you want a dance floor and disco balls for the vibe, jump to Clever Girl (50-75) — you are paying for more boat than you need but you get the flagship party setup. Most 20-person bachelor groups pick The Irony for the balance of space, price, and atmosphere.',
    },
    {
      q: 'Which Lake Travis bachelor boat is best for a group of 40?',
      a: 'For a 40-person bachelor group, Clever Girl is the only answer. It is configured for exactly this size — 50-75 capacity with a dance floor, 14 disco balls, LED lighting, premium sound system, and Lake Travis\' largest dedicated bachelor/bachelorette party boat. A 40-guest group fills it comfortably without feeling cramped.',
    },
    {
      q: 'Which Lake Travis bachelor boat has a DJ?',
      a: 'Every Lake Travis bachelor party boat in our fleet comes with a premium Bluetooth sound system so you can DJ your own playlist. For a hired professional DJ, book a ticket on the ATX Disco Cruise (on Clever Girl) — a professional DJ is included in every cruise ticket from $85/person. For a private charter with a professional DJ, we can add DJ booking as an upgrade on any of the four boats.',
    },
    {
      q: 'Can we bring our own alcohol on a Lake Travis bachelor boat?',
      a: 'Yes — every Premier Party Cruises boat is 100% BYOB. Beer, seltzers, spirits, mixers, wine, non-alcoholic drinks. Cans and plastic only, no glass. Every boat comes with large coolers (bring your own ice, or order pre-iced from Party On Delivery). You can also pre-order alcohol through Party On Delivery and have it waiting on the boat when you board. No corkage fees, no minimums, no upcharges.',
    },
    {
      q: 'Where do Lake Travis bachelor party boats depart from?',
      a: 'All of our Lake Travis bachelor party boats depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. It is about a 25-minute drive from downtown Austin, making it the closest Lake Travis marina to the city center. Free parking at the marina. We recommend arriving 15 minutes before your scheduled departure to get through check-in and load coolers.',
    },
    {
      q: 'Do Lake Travis bachelor boats have bathrooms?',
      a: 'Yes. Every boat in our bachelor fleet — Day Tripper, Meeseeks, The Irony, and Clever Girl — has a clean onboard restroom. No need to return to the marina mid-cruise. The restrooms are serviced before every charter and stocked with supplies.',
    },
    {
      q: 'Can we swim from a Lake Travis bachelor party boat?',
      a: 'Absolutely — the anchored swim stop is one of the best parts of every Lake Travis bachelor cruise. The captain anchors in a scenic Lake Travis cove with clear water. Every boat has a swim ladder, USCG-approved life jackets in all adult sizes, and room to jump off the deck. Swim stops typically last 1.5-2 hours on a 4-hour charter. Clever Girl carries our giant 6x20-foot lily pad floats; Day Tripper, Meeseeks, and The Irony have smaller floats.',
    },
    {
      q: 'How long are Lake Travis bachelor party boat charters?',
      a: 'Standard Lake Travis bachelor party boat charters run 4 hours — our minimum — and extend to 6 or 8 hours at the same hourly rate. The ATX Disco Cruise public ticket option is a fixed 4 hours. Most bachelor groups book the 4-hour standard; a few groups splurge on a 6-hour charter if they want a longer swim stop, extended sunset, or a slower pace.',
    },
    {
      q: 'When should we book a Lake Travis bachelor party boat?',
      a: 'Book 6-8 weeks in advance for a Saturday charter during peak season (March-October). Prime Saturdays in April, May, September, and October book first — Clever Girl Saturdays often sell out 2-3 months ahead. Fridays are typically available closer to the date. A 25% deposit holds the boat; the balance is due 30 days before. Shorter-notice openings happen, so call even if your date is only 2-3 weeks away.',
    },
    {
      q: 'Do bachelor boats on Lake Travis have a dance floor?',
      a: 'Clever Girl has a full dedicated dance floor with 14 disco balls and LED lighting — it is the only Lake Travis bachelor party boat with a built-in club-style dance floor. Meeseeks, The Irony, and Day Tripper have open deck space that bachelor groups regularly turn into dance areas once the sound system is running, but they do not have the permanent disco-ball setup that Clever Girl does.',
    },
    {
      q: 'What happens if the weather is bad on our Lake Travis bachelor boat day?',
      a: 'Safety calls from the captain trigger a free reschedule. If conditions are unsafe for the cruise — thunderstorms, lightning, high sustained winds — we contact the group 2 hours before departure to move the date at no charge. Light rain does not cancel cruises; every boat has covered and shaded areas. ATX Disco Cruise tickets specifically fall back to our Lemonade Disco land venue so the party still happens if the lake is blown out.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/lake-travis-bachelor-party-boats-v2"
      pageTitle="Lake Travis Bachelor Party Boats | 4 Boats, 14-75 Guests | Premier Party Cruises"
      pageDescription="The 4 best bachelor party boats on Lake Travis. Day Tripper, Meeseeks, The Irony, and Clever Girl — 14 to 75 guests. Private charters from $200/hr, BYOB, all-inclusive."
      heroEyebrow="Bachelor Party Boats · Lake Travis"
      heroHeadline={
        <>
          Lake Travis bachelor party <em>boats</em>.
        </>
      }
      heroBody="Four bachelor party boats on Lake Travis, 14 to 75 guests, all departing from Anderson Mill Marina. Compare the fleet, pick the right boat for your crew, lock in your Saturday — all in one page."
      primaryCta={{ text: 'Book Your Boat', href: '/book' }}
      secondaryCta={{ text: 'View Full Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Pick a <em>boat</em>. Pick a date. Pick a playlist.
        </>
      }
      finalCtaBody="Every Lake Travis bachelor party boat in our fleet is USCG-certified, BYOB-friendly, and captained by a pro. Call or book online — we'll match the right boat to your group size and send a quote within the hour."
    >
      {/* ── Meet the Fleet ──────────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Bachelor Fleet</div>
        <h2 className="hp2-section__headline">
          4 boats. Every bachelor group <em>size</em>.
        </h2>
        <p className="hp2-section__body">
          Lake Travis bachelor party boats are not one-size-fits-all. A
          10-man groomsmen trip wants a different boat than a 50-guest
          flotilla. The four boats below cover the full capacity range and
          sit at different price tiers — pick by guest count first, then by
          how much party setup (disco balls, dance floor) you want built in.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Day Tripper</h3>
            <p className="hp2-feature-card__desc">
              Up to 14 guests. from $200/hour. The bachelor-group Swiss
              Army knife — small premium crew, tight pricing, full BYOB
              setup, onboard restroom, swim ladder, floats.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">25</div>
            <h3 className="hp2-feature-card__title">Meeseeks</h3>
            <p className="hp2-feature-card__desc">
              Up to 25 guests. from $225/hour. Mid-size bachelor sweet
              spot. Plenty of deck space, generous cooler capacity, strong
              Bluetooth sound, onboard restroom. Popular for 18-25 groomsmen.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">30</div>
            <h3 className="hp2-feature-card__title">The Irony</h3>
            <p className="hp2-feature-card__desc">
              Up to 30 guests. from $225/hour. The bigger-Meeseeks option
              for 25-30 guys. Same setup, more room, matches the largest
              non-disco-ball bachelor groups.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">75</div>
            <h3 className="hp2-feature-card__title">Clever Girl</h3>
            <p className="hp2-feature-card__desc">
              50-75 guests. from $250/hour. The flagship Lake Travis party
              boat. 14 disco balls, LED lighting, full dance floor, premium
              sound. The boat behind the ATX Disco Cruise.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">100</div>
            <h3 className="hp2-feature-card__title">Two-Boat Flotilla</h3>
            <p className="hp2-feature-card__desc">
              75+ guests? Combine Clever Girl + Meeseeks for a 75-100 guest
              dual-boat bachelor. Boats stay together, anchor together, and
              raft up at the swim stop for one mega-party.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">–</div>
            <h3 className="hp2-feature-card__title">Shared Disco Ticket</h3>
            <p className="hp2-feature-card__desc">
              Skip the private rental and buy tickets on the ATX Disco
              Cruise. Same Clever Girl boat, shared with other bachelor
              and bachelorette groups. From $85/person, all-inclusive.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing Breakdown ──────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Bachelor Boat Pricing</div>
          <h2 className="hp2-section__headline">
            What each Lake Travis bachelor boat <em>costs</em>.
          </h2>
          <p className="hp2-section__body">
            Private bachelor-boat pricing on Lake Travis is hourly, with a
            4-hour minimum across the fleet. Rates vary by boat size and by
            peak vs. off-peak weekends. Every private charter rate includes
            captain, fuel, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), swim ladder,
            life jackets, and gratuity — the number you see is the number
            you pay.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$</div>
              <h3 className="hp2-feature-card__title">Day Tripper (up to 14)</h3>
              <p className="hp2-feature-card__desc">
                $200-$350 per hour. 4-hour minimum = $800-$1,400. That is
                $57-$100 per guest for a full private Lake Travis bachelor
                boat charter. The clear value leader for smaller crews.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$$</div>
              <h3 className="hp2-feature-card__title">Meeseeks / The Irony</h3>
              <p className="hp2-feature-card__desc">
                $225-$425 per hour. 4-hour minimum = $900-$1,700. For a
                25-person bachelor group, that pencils out to $36-$68 per
                guest — the best per-person value in the fleet.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">$$$</div>
              <h3 className="hp2-feature-card__title">Clever Girl (50-75)</h3>
              <p className="hp2-feature-card__desc">
                $250-$500 per hour. 4-hour minimum = $1,000-$2,000. With
                60 guests, that is $16-$33 per guest — incredibly cheap
                per head, plus the full disco-ball flagship experience.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">Shared Disco Ticket</h3>
              <p className="hp2-feature-card__desc">
                $85-$105 per person, tax and gratuity included. No minimum
                group size — bring 4 guys or 25. Best for crews that want
                the DJ and photographer built in without booking the full boat.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">+</div>
              <h3 className="hp2-feature-card__title">Essentials Upgrade</h3>
              <p className="hp2-feature-card__desc">
                $100-$200 flat. Adds decorations, towel service, and an
                SPF-50 sunscreen station to any private charter. Optional
                but popular for the extra polish on a bachelor day.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">+</div>
              <h3 className="hp2-feature-card__title">Ultimate Upgrade</h3>
              <p className="hp2-feature-card__desc">
                $250-$350 flat. Premium decor, custom bachelor accessories,
                priority boarding, dedicated event coordinator. The full
                white-glove treatment for the wedding party of honor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Anderson Mill Marina ───────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Where You Board</div>
        <h2 className="hp2-section__headline">
          Every boat departs from <em>Anderson Mill Marina</em>.
        </h2>
        <p className="hp2-section__body">
          All four Lake Travis bachelor party boats in our fleet dock at
          Anderson Mill Marina, 13993 FM 2769, Leander, TX — about 25
          minutes from downtown Austin, making it the closest Lake Travis
          marina to the city. Free on-site parking, a short walk from lot
          to slip, and clean pre-departure restrooms.
        </p>
        <p className="hp2-section__body">
          Pro tip for bachelor groups: have the group meet at an Uber-friendly
          starting point in Austin (a brewery, a brunch spot, or the rental
          house), then one large rideshare or a party bus to the marina
          together. That way nobody is driving home after the cruise, and
          the pre-boat energy carries straight onto the boat.
        </p>
      </section>

      {/* ── Match Your Group to a Boat ─────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Which Boat to Book</div>
          <h2 className="hp2-section__headline">
            Match your bachelor crew to the <em>right</em> boat.
          </h2>
          <p className="hp2-section__body">
            Quick decision tree. Count the guys, read the line that matches,
            book the boat. If you are between two tiers, always size up —
            Lake Travis boats feel smaller on a hot Saturday than they do
            on paper.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">8-14</div>
              <h3 className="hp2-feature-card__title">Book Day Tripper</h3>
              <p className="hp2-feature-card__desc">
                Small premium crew. Private feel, low per-person cost,
                easy to manage. The default bachelor pick under 15 guys.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">15-25</div>
              <h3 className="hp2-feature-card__title">Book Meeseeks</h3>
              <p className="hp2-feature-card__desc">
                Classic bachelor-group size. Best balance of room, price,
                and energy. Pairs perfectly with a 25-person dinner
                reservation after.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">25-30</div>
              <h3 className="hp2-feature-card__title">Book The Irony</h3>
              <p className="hp2-feature-card__desc">
                Slightly larger than Meeseeks for 25-30 guys. Same
                features, more deck room. If the guest list is over 28,
                consider jumping to Clever Girl for the disco-ball setup.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">30-75</div>
              <h3 className="hp2-feature-card__title">Book Clever Girl</h3>
              <p className="hp2-feature-card__desc">
                The flagship. Only pick for big bachelor groups. Dance
                floor, 14 disco balls, LED lighting, premium sound. The
                "this is our whole wedding party" bachelor pick.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">75+</div>
              <h3 className="hp2-feature-card__title">Two-Boat Flotilla</h3>
              <p className="hp2-feature-card__desc">
                Split across Clever Girl + Meeseeks or The Irony. Boats
                raft up at the swim stop so the group celebrates together.
                Requires 6-8 weeks lead time minimum.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Any</div>
              <h3 className="hp2-feature-card__title">Buy Disco Tickets</h3>
              <p className="hp2-feature-card__desc">
                Any size group can buy individual tickets on the ATX Disco
                Cruise for a shared-Clever-Girl bachelor day. DJ and
                photographer included. From $85/person.
              </p>
            </div>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
