import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * FirstTimeLakeTravisBoatRentalGuideV2 — the comprehensive guide for
 * first-time Lake Travis boat renters.
 * Route: /first-time-lake-travis-boat-rental-guide-v2
 *
 * SEO Target: "lake travis boat rental" (1,300 vol, current rank #20)
 * BIGGEST opportunity — this is the flagship guide content piece.
 *
 * Strategy: Comprehensive first-timer resource. Step-by-step booking
 * flow, what to expect day-of, common questions, mistakes to avoid,
 * price expectations, crew info, timeline.
 */
export default function FirstTimeLakeTravisBoatRentalGuideV2() {
  const faqs = [
    {
      q: 'How do I rent a boat on Lake Travis as a first-timer?',
      a: 'First-time Lake Travis boat rental is straightforward. Step 1: count your group and pick a boat size (14, 25, 30, or 75 guests). Step 2: pick a date and time slot (4-hour minimum, year-round availability). Step 3: book online at premierpartycruises.com/book or call (512) 488-5892 for a quote. Step 4: pay a 25% deposit to hold the date; balance due 30 days before. Step 5: show up at Anderson Mill Marina 15 minutes before departure with your drinks, snacks, and swimsuit. The captain handles the rest. Most first-timers are surprised by how simple the actual day-of experience is.',
    },
    {
      q: 'How much does a Lake Travis boat rental cost for a first-timer?',
      a: 'First-time Lake Travis boat rentals start at $200 per hour with a 4-hour minimum, so $800 base for Day Tripper (up to 14 guests). Larger boats go up: Meeseeks (25 guests) starts at $225/hour, The Irony (30 guests) at $225/hour, Clever Travis (75 guests) at $250/hour. Peak Saturday rates can reach $500/hour on the flagship. Every rate includes captain, fuel, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), life jackets, swim ladder, and gratuity — no hidden fees. Most first-time groups spend $800-$2,000 total for a 4-hour Lake Travis boat rental, which comes out to $30-$100 per guest depending on boat and group size.',
    },
    {
      q: 'What should I expect on my first Lake Travis boat rental day?',
      a: 'Your first Lake Travis boat rental day runs on a predictable rhythm. Arrive at Anderson Mill Marina 15 minutes before departure. The crew greets you at the slip and helps load coolers. The captain runs a 2-3 minute safety brief covering life jacket locations, the swim ladder, and "rules of the deck." The boat pulls away on time and cruises 15-30 minutes to a Lake Travis swim cove. The captain drops anchor, deploys the swim ladder, and the group swims, floats, and hangs for 1.5-2 hours. Then a short cruise back (or to a second cove) before the captain docks at the scheduled return time. Total: 4 hours door-to-door on a standard charter.',
    },
    {
      q: 'What is the biggest mistake first-time Lake Travis boat renters make?',
      a: 'Under-sizing the boat. First-timers consistently pick a boat that fits their exact guest count instead of sizing up one tier. A 20-person group on Meeseeks (25 cap) feels tight by noon — people need deck space, cooler space, and shade. The same 20-person group on The Irony (30 cap) feels spacious, costs $25-50 more total, and ends with zero complaints. Second-biggest mistake: not arriving 15 minutes early. Saturday traffic on 620 and 360 regularly adds 10-15 minutes, and we cannot hold boats past scheduled departure on busy days. Third: forgetting sunscreen. Lake Travis sun is strong even with shaded deck areas.',
    },
    {
      q: 'Is a captain included with a Lake Travis boat rental?',
      a: 'Yes — every Premier Party Cruises Lake Travis boat rental includes a USCG-licensed captain and trained crew. You do not pilot the boat yourself. This is by design: our captains know every cove on Lake Travis, handle weather judgment calls, manage the anchor and swim ladder, and free your group to actually party instead of worrying about boating. The captain and crew tips are already built into the quoted rate — no separate gratuity needed unless you want to add extra.',
    },
    {
      q: 'When should a first-timer book a Lake Travis boat rental?',
      a: 'Book 6-8 weeks ahead for Saturday charters in peak season (March-October). Prime Clever Girl Saturdays in April, May, September, and October sell out 8-10 weeks in advance. Friday and weekday charters have more availability and can book 1-2 weeks out. Winter charters (November-February) are much easier to book last-minute. A 25% deposit holds the date; the balance is due 30 days before. For first-timers, book as early as possible — it gives you time to coordinate the group, send payment reminders, and not stress if someone drops out.',
    },
    {
      q: 'What is included in a Lake Travis boat rental?',
      a: 'Every Premier Party Cruises Lake Travis boat rental includes: USCG-licensed captain, trained crew, fuel for the full charter, premium Bluetooth sound system, coolers (bring your own ice, or order pre-iced from Party On Delivery), swim ladder, USCG life jackets in all adult sizes, onboard restroom, shaded lounge areas, swim stop at a scenic cove, and gratuity (20% already baked into the rate). The number you see on the quote is the number you pay. Clever Girl additionally has a full dance floor, 14 disco balls, and LED lighting — no extra charge.',
    },
    {
      q: 'What do I need to bring for a Lake Travis boat rental?',
      a: 'You bring: drinks and snacks (BYOB, cans and plastic only, no glass), swimsuit, towel (or add towel service upgrade), sunscreen SPF 50+, sunglasses, hat, flat shoes or sandals (no hard-soled shoes on deck), a phone for the Bluetooth playlist, and a waterproof phone case for the swim stop. We supply the coolers, ice, sound system, life jackets, swim ladder, captain, and crew. That is it.',
    },
    {
      q: 'Can I rent a Lake Travis boat without a license?',
      a: 'Yes — Premier Party Cruises Lake Travis rentals are all captained rentals, meaning a USCG-licensed captain pilots the boat for you. No boating license required on your end. You are the renter of record (you signed the agreement and paid the deposit), but the captain runs the boat. This is different from jet-ski or small bowrider rentals on Lake Travis, which may require a boater education card — we are a captained charter service specifically so first-timers and party groups do not have to worry about any of that.',
    },
    {
      q: 'Can we drink alcohol on a Lake Travis boat rental?',
      a: 'Yes — every Lake Travis boat rental in our fleet is 100% BYOB. Beer, seltzers, canned cocktails, wine in cans or plastic, mixers, non-alcoholic drinks. Cans and plastic only (no glass, safety rule). Guests must be 21+ to drink; the captain does not serve alcohol. Life-jacket rules, swim-stop rules, and "stay off the bow while underway" rules all still apply regardless of alcohol. Our captains are experienced at running bachelor/bachelorette cruises and know how to keep things fun and safe.',
    },
    {
      q: 'What happens if it rains or the weather is bad on my Lake Travis boat rental day?',
      a: 'Safety calls from the captain trigger a free reschedule. If conditions are unsafe for the cruise (thunderstorms, lightning, sustained winds over 25mph), we contact the group 2 hours before departure to move the date at no charge — usually within the same season. Light rain does not cancel; every boat has covered and shaded areas. Texas weather can change quickly, but the captain makes the final call based on the latest forecast and on-the-water conditions. First-timers sometimes worry about this; in practice, the vast majority of scheduled cruises depart as planned.',
    },
    {
      q: 'How long does a Lake Travis boat rental last?',
      a: 'Standard Lake Travis boat rentals are 4 hours (our minimum). Extended 6 or 8-hour charters are available at the same hourly rate and are popular with corporate groups, weddings, and sunset-to-night cruises. A 4-hour charter breaks down roughly as: 15 minutes check-in and boarding, 20-30 minutes cruising to the cove, 1.5-2 hours anchored swim stop, 20-30 minutes cruising back, 15 minutes dock and disembark. First-timers are often surprised at how perfectly 4 hours feels — long enough to really enjoy the swim stop, short enough to keep energy high all the way through.',
    },
    {
      q: 'How far is Anderson Mill Marina from downtown Austin?',
      a: 'Anderson Mill Marina (13993 FM 2769, Leander, TX 78641) is about 25 minutes from downtown Austin via RR 620 and FM 2769. It is the closest Lake Travis boat rental marina to the city center. Saturday morning traffic on 360 and 620 can add 10-15 minutes, so budget 35-45 minutes for Saturday boarding. The marina has free parking, clean restrooms, and a short walk from the lot to the slip. First-timers often underestimate the drive on busy Saturdays — build in extra buffer.',
    },
    {
      q: 'How many people can we fit on a Lake Travis boat rental?',
      a: 'Our Lake Travis boat rental fleet covers 4-75 guests on a single boat: Day Tripper (up to 14), Meeseeks (up to 25), The Irony (up to 30), and Clever Girl (50-75). For 75-105 guest groups, we combine Clever Girl with Meeseeks or The Irony into a two-boat flotilla that rafts up at the swim cove. First-timers with unclear guest counts should size up one tier — a 20-person group is much happier on the 30-person boat than packed onto a 25-person one.',
    },
    {
      q: 'Can I bring food on a Lake Travis boat rental?',
      a: 'Yes. Bring whatever food you want — snacks, sandwiches, charcuterie, pizza, tacos, BBQ, sushi platters, cupcakes, anything. We have counter space for setup. Many groups coordinate food delivery to the marina slip through Party On Delivery or local catering vendors. For weddings, corporate events, and larger milestones, we can help arrange a fully catered on-board menu. No corkage or food fees — it is all included in the quoted rate.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/first-time-lake-travis-boat-rental-guide-v2"
      pageTitle="First-Time Lake Travis Boat Rental Guide | Everything a First-Timer Needs to Know"
      pageDescription="The complete first-timer's guide to Lake Travis boat rental. Step-by-step booking, day-of timeline, pricing, what to bring, captain info, common mistakes. From $200/hour."
      heroEyebrow="Lake Travis Boat Rental · First-Time Guide"
      heroHeadline={
        <>
          First-time Lake Travis boat rental <em>guide</em>.
        </>
      }
      heroBody="Everything a first-time Lake Travis boat renter needs: how to book, what to expect, what it costs, what to bring, what to skip, and the day-of timeline from arrival to dock-back. Written for the person who has never done this before."
      primaryCta={{ text: 'Start Your Booking', href: '/book' }}
      secondaryCta={{ text: 'Talk to a Human', href: '/contact' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready for your <em>first</em> Lake Travis boat rental?
        </>
      }
      finalCtaBody="The easiest way to book a first-time Lake Travis boat rental is to grab the date online and let us handle the rest. Our team walks every first-timer through the details — no dumb questions, we promise."
    >
      {/* ── Step by Step Booking Guide ──────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Step-by-Step Booking</div>
        <h2 className="hp2-section__headline">
          How to book your first Lake Travis <em>boat rental</em>.
        </h2>
        <p className="hp2-section__body">
          Booking a Lake Travis boat rental for the first time looks more
          complicated than it is. Here is the full sequence — from "I
          should probably rent a boat" to "we are pulling away from the
          slip" — broken down into the five steps every first-timer goes
          through.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Count Your Group</h3>
            <p className="hp2-feature-card__desc">
              Get an honest guest count. Include everyone who has said
              "yes" and everyone who is 80%+ likely. That number dictates
              which of our four Lake Travis boats is the right rental.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Pick a Boat</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper (up to 14), Meeseeks (up to 25), The Irony
              (up to 30), Clever Girl (50-75). When in doubt, size up one
              tier — boats always feel smaller on a hot Saturday.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Pick a Date &amp; Time</h3>
            <p className="hp2-feature-card__desc">
              4-hour minimum charter, year-round. Peak-season Saturdays
              book 6-8 weeks out; Fridays and weekdays have more flex.
              Pick morning, afternoon, or sunset based on group vibe.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Book Online or Call</h3>
            <p className="hp2-feature-card__desc">
              Book online at premierpartycruises.com/book in about 5
              minutes, or call (512) 488-5892 for a custom quote. A 25%
              deposit locks in the boat and the date immediately.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Show Up &amp; Enjoy</h3>
            <p className="hp2-feature-card__desc">
              Balance due 30 days before. Arrive at Anderson Mill Marina
              15 minutes early with your drinks, snacks, and swimsuits.
              The captain and crew handle everything else.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">Pro Tip: Pre-Pay the Group</h3>
            <p className="hp2-feature-card__desc">
              Collect Venmo from the group before paying the balance.
              First-timers always under-estimate how long it takes to
              wrangle payments — give yourself 2 weeks of buffer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Day-Of Timeline ─────────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Day-of Timeline</div>
          <h2 className="hp2-section__headline">
            Your first Lake Travis boat rental, <em>hour by hour</em>.
          </h2>
          <p className="hp2-section__body">
            The 4-hour Lake Travis boat rental day follows a predictable
            rhythm. Here is what actually happens from the moment you pull
            into the marina parking lot to the moment the boat ties back
            up at the slip. Use this timeline to plan your group&apos;s
            pre-boat brunch, post-boat dinner, and Uber coordination.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T-15</div>
              <h3 className="hp2-feature-card__title">Arrival</h3>
              <p className="hp2-feature-card__desc">
                Pull into Anderson Mill Marina 15 minutes before
                scheduled departure. Park, hit the bathroom, walk down
                to the slip. Crew greets you and helps load coolers.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T-5</div>
              <h3 className="hp2-feature-card__title">Safety Brief</h3>
              <p className="hp2-feature-card__desc">
                Captain runs a 2-3 minute intro: life jacket locations,
                swim ladder position, "no hard shoes on deck," emergency
                procedures, and how to connect to Bluetooth.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T+0</div>
              <h3 className="hp2-feature-card__title">Depart the Slip</h3>
              <p className="hp2-feature-card__desc">
                Boat pulls away from the dock on time. Playlist starts.
                Drinks crack open. First group photo happens naturally in
                the first 10 minutes — nobody has to force it.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T+30</div>
              <h3 className="hp2-feature-card__title">Arrive at Cove</h3>
              <p className="hp2-feature-card__desc">
                Captain drops anchor in a scenic Lake Travis cove with
                clear water and limestone cliffs. Swim ladder goes down.
                Floats come out. The swim stop begins.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T+2h</div>
              <h3 className="hp2-feature-card__title">Peak Hang Time</h3>
              <p className="hp2-feature-card__desc">
                Somewhere around the 2-hour mark, everyone has swum,
                floated, eaten, and started the second round of drinks.
                This is the moment the phone cameras come out the most.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T+3h</div>
              <h3 className="hp2-feature-card__title">Anchor Up</h3>
              <p className="hp2-feature-card__desc">
                Captain pulls anchor and cruises back (or to a second
                cove) for the last hour. Music stays on. Some groups
                keep swimming off the swim platform. Sun starts setting
                on sunset cruises.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T+4h</div>
              <h3 className="hp2-feature-card__title">Dock Back</h3>
              <p className="hp2-feature-card__desc">
                Boat ties back at Anderson Mill Marina. Crew helps
                unload coolers. Group rolls out to the cars or the
                waiting Uber XL. Total door-to-door: 4 hours 15 minutes.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">T+5h</div>
              <h3 className="hp2-feature-card__title">Dinner (Optional)</h3>
              <p className="hp2-feature-card__desc">
                Most groups book a 7pm dinner back in Austin after an
                afternoon cruise, or a late dinner on a sunset cruise.
                Plan 45 minutes of drive + shower time between dock and
                dinner reservation.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">—</div>
              <h3 className="hp2-feature-card__title">The Real Takeaway</h3>
              <p className="hp2-feature-card__desc">
                First-timers always comment on how smoothly the day runs.
                Captains handle 100% of the decisions. Your only job is
                to show up and enjoy it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Common Mistakes ─────────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Avoid These Mistakes</div>
        <h2 className="hp2-section__headline">
          7 mistakes first-timers make on Lake Travis boat <em>rentals</em>.
        </h2>
        <p className="hp2-section__body">
          After thousands of first-time Lake Travis boat rentals, a
          predictable pattern of rookie mistakes shows up. Skim this list
          before booking — avoiding even two of these makes your first
          rental significantly better.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">!</div>
            <h3 className="hp2-feature-card__title">1. Under-Sizing the Boat</h3>
            <p className="hp2-feature-card__desc">
              Picking a boat that fits the exact guest count with zero
              buffer. A 20-person group on a 25-cap boat feels cramped by
              noon. Size up one tier — it&apos;s $100-200 more total and
              dramatically changes the experience.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">!</div>
            <h3 className="hp2-feature-card__title">2. Arriving Late</h3>
            <p className="hp2-feature-card__desc">
              Saturday traffic on 360 and 620 adds 10-15 minutes. We
              can&apos;t hold boats past scheduled departure on busy
              weekends. Plan to leave Austin 45-50 minutes before cruise
              time, not 25.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">!</div>
            <h3 className="hp2-feature-card__title">3. Forgetting Sunscreen</h3>
            <p className="hp2-feature-card__desc">
              Texas sun at noon on Lake Travis is brutal, even with
              shaded deck areas. SPF 50+ minimum. Reef-safe preferred.
              One bottle per 4 people. Reapply every 90 minutes.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">!</div>
            <h3 className="hp2-feature-card__title">4. Bringing Glass</h3>
            <p className="hp2-feature-card__desc">
              Glass breaks. Broken glass on a boat is a safety
              emergency. Decant wine into plastic or cans. Transfer
              spirits into squeeze bottles or plastic flasks. No glass,
              ever.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">!</div>
            <h3 className="hp2-feature-card__title">5. Wearing Hard Shoes</h3>
            <p className="hp2-feature-card__desc">
              Hard-soled shoes scuff the boat and are a slip hazard
              when wet. Sandals, flip-flops, boat shoes, or barefoot
              on deck. Pack a change for after the cruise if needed.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">!</div>
            <h3 className="hp2-feature-card__title">6. No Group Payment Plan</h3>
            <p className="hp2-feature-card__desc">
              "I&apos;ll pay and get everyone back" is how one person
              ends up out $1,200. Set up a Venmo or Splitwise on day one
              of planning and collect deposits before you commit.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">!</div>
            <h3 className="hp2-feature-card__title">7. Skipping Transportation</h3>
            <p className="hp2-feature-card__desc">
              Don&apos;t have people driving to and from the marina
              after BYOB drinking. Uber XL, party bus, or a designated
              sober driver. The cost is tiny compared to the
              alternative.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">✓</div>
            <h3 className="hp2-feature-card__title">Bonus: The Easy Fix</h3>
            <p className="hp2-feature-card__desc">
              Book, size up, pack sunscreen, skip glass, coordinate one
              Uber XL from a downtown meet-up spot to the marina. That
              one fix solves 5 of the 7 common mistakes automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ── Captain &amp; Crew ──────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Your Captain &amp; Crew</div>
          <h2 className="hp2-section__headline">
            A licensed captain runs your <em>entire day</em>.
          </h2>
          <p className="hp2-section__body">
            Every Premier Party Cruises Lake Travis boat rental includes a
            USCG-licensed captain and trained crew. You do not drive the
            boat. You do not need a boating license. You do not have to
            think about anchoring, navigating, weather, or safety
            equipment. That is the whole point of a captained Lake Travis
            rental, and the difference between this and the sketchy
            self-drive rentals that make first-timers nervous.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <h3 className="hp2-feature-card__title">USCG Licensed</h3>
              <p className="hp2-feature-card__desc">
                Every captain holds a current USCG license and undergoes
                annual drug testing, medical checks, and continuing
                education. No hobbyists, no side-gig drivers.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <h3 className="hp2-feature-card__title">Lake Travis Specialists</h3>
              <p className="hp2-feature-card__desc">
                Our captains know every cove, every bluff, every shallow
                spot on Lake Travis. They pick the best swim stop based
                on weather, water level, and wind direction that day.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <h3 className="hp2-feature-card__title">Trained Crew</h3>
              <p className="hp2-feature-card__desc">
                Every boat sails with trained crew who handle coolers,
                swim ladder deployment, safety equipment, headcounts,
                and any guest who needs extra attention.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <h3 className="hp2-feature-card__title">Tip Included</h3>
              <p className="hp2-feature-card__desc">
                Standard 20% gratuity for captain and crew is baked into
                every quoted rate. First-timers never have to calculate
                tips — it&apos;s handled. Extra tips are welcome.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <h3 className="hp2-feature-card__title">Weather Judgment</h3>
              <p className="hp2-feature-card__desc">
                The captain makes the final weather call 2 hours before
                departure. Unsafe conditions trigger a free reschedule.
                Light rain does not cancel cruises.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <h3 className="hp2-feature-card__title">Party-Experienced</h3>
              <p className="hp2-feature-card__desc">
                Our captains run hundreds of bachelor, bachelorette,
                birthday, and corporate cruises every year. They know
                how to let the group have fun while keeping the day safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Price Expectations ─────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Realistic Price Expectations</div>
        <h2 className="hp2-section__headline">
          What your first Lake Travis boat rental <em>actually costs</em>.
        </h2>
        <p className="hp2-section__body">
          First-timers see "$200/hour" and assume a 4-hour Lake Travis
          boat rental costs $800 flat. For Day Tripper (up to 14 guests)
          on an off-peak weekday, that is exactly right. For a peak-season
          Saturday on Clever Girl, the all-in number is closer to $2,000.
          Here&apos;s a realistic price breakdown by boat and scenario so
          you can budget without surprises.
        </p>
        <p className="hp2-section__body">
          <strong style={{ color: 'var(--hp2-cream)' }}>Day Tripper (14
          guests):</strong> $800-$1,400 total. Per guest: $57-$100.{' '}
          <strong style={{ color: 'var(--hp2-cream)' }}>Meeseeks (25 guests):</strong>{' '}
          $900-$1,700. Per guest: $36-$68.{' '}
          <strong style={{ color: 'var(--hp2-cream)' }}>The Irony (30 guests):</strong>{' '}
          $900-$1,700. Per guest: $30-$57.{' '}
          <strong style={{ color: 'var(--hp2-cream)' }}>Clever Girl (75
          guests):</strong> $1,000-$2,000. Per guest: $13-$27. The
          flagship has the lowest per-head cost at capacity — it&apos;s
          why big groups love it.
        </p>
        <p className="hp2-section__body">
          Budget another $150-$400 on BYOB drinks for the group, $50-$150
          on snacks or a food platter, and $60-$150 on the round-trip
          Uber XL from Austin. Total "real" cost for a 15-person first-time
          Lake Travis boat rental lands at $1,200-$2,200 — roughly
          $80-$150 per guest, all-in. That&apos;s the honest number to
          share with your group.
        </p>
      </section>

      {/* ── What to Expect vs. Reality ──────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">First-Timer Reality Check</div>
          <h2 className="hp2-section__headline">
            What a first Lake Travis boat rental is <em>actually like</em>.
          </h2>
          <p className="hp2-section__body">
            First-timers consistently comment on a few things that surprised
            them. If you have never rented a Lake Travis boat before, these
            are the honest takes that the marketing usually skips.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">It&apos;s Simpler Than You Think</h3>
              <p className="hp2-feature-card__desc">
                The captain and crew handle everything operational. You
                show up, hand over coolers, and the rest is automatic.
                First-timers often feel over-prepared.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">The Swim Stop is the Magic</h3>
              <p className="hp2-feature-card__desc">
                Cruising is fun. The anchored swim stop in a Lake Travis
                cove is what people actually remember. Budget 1.5-2 hours
                for it — it&apos;s the best part.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">4 Hours is Exactly Right</h3>
              <p className="hp2-feature-card__desc">
                First-timers think 4 hours sounds short. It doesn&apos;t
                feel short. It feels perfect. You can always add hours
                day-of if the captain has availability.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">Photos Take Themselves</h3>
              <p className="hp2-feature-card__desc">
                Lake Travis + limestone cliffs + clear water + your crew
                on a boat = the phone camera never stops. You do not need
                to hire a photographer (unless you want to).
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">You&apos;ll Re-Book</h3>
              <p className="hp2-feature-card__desc">
                The #1 line we hear from first-timers on the dock at the
                end of the cruise is "we have to do this again." Plan
                accordingly — annual Lake Travis boat rentals become a
                thing for a lot of groups.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◎</div>
              <h3 className="hp2-feature-card__title">The Captain Makes It</h3>
              <p className="hp2-feature-card__desc">
                A great captain is the difference between a fine day and
                a great one. Our captains know how to read the group,
                adjust the playlist vibe, and pick the perfect cove for
                your specific crew.
              </p>
            </div>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
