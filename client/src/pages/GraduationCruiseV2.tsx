import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * GraduationCruiseV2 — Sunset graduation cruises on Lake Travis.
 * Route: /graduation-cruise-v2
 *
 * SEO Target: "graduation cruise austin"
 * Cruise-forward framing: sunset, toast, scenic, memorable.
 */
export default function GraduationCruiseV2() {
  const faqs = [
    {
      q: 'What is a graduation cruise in Austin?',
      a: 'A graduation cruise is a private boat charter on Lake Travis specifically designed to celebrate a graduate — high school or college — with friends and family. Typical graduation cruises run 4 hours: a scenic cruise out, a swim stop in a cove, a catered dinner or appetizer service, a golden-hour toast to the graduate, and a sunset cruise back to the marina.',
    },
    {
      q: 'How much does a graduation cruise cost on Lake Travis?',
      a: 'Graduation cruises start at $200/hour on Day Tripper (up to 14 guests) with a 4-hour minimum — around $800 base. Meeseeks or The Irony (25–30 guests) start at $225/hour, and Clever Girl (50–75 guests) starts at $250/hour. Most graduation cruises land between $1,200 and $3,200 all-in for a 4-hour charter including tax, gratuity, and light decorations.',
    },
    {
      q: 'Is a sunset graduation cruise a good idea?',
      a: 'Yes — sunset graduation cruises are our most requested graduation format. Texas Hill Country sunsets over Lake Travis are spectacular, with golden light on the limestone bluffs. Our team picks the departure time based on your date so you hit peak golden hour for the toast, the photo, and the cruise back to Anderson Mill Marina.',
    },
    {
      q: 'Do parents need to be on board a high school graduation cruise?',
      a: 'Yes. For high school graduation cruises where most guests are under 21, a responsible adult (21+) signs the charter agreement and rides along as host. Most high school graduation cruises are parent-hosted — the graduate\'s parents coordinate logistics, chaperone the cruise, and work alongside our licensed captain and trained crew.',
    },
    {
      q: 'Is alcohol allowed on a graduation cruise?',
      a: 'For high school graduation cruises with minor guests, no alcohol is permitted — we stock coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) for sodas, sparkling water, and mocktails. For 21+ college graduation cruises, full BYOB applies: beer, wine, champagne, and spirits in cans or plastic (no glass). A 21+ adult sign-off is required in both cases.',
    },
    {
      q: 'How many guests can a graduation cruise hold?',
      a: 'Our fleet handles graduation cruises from 1–75 guests. Day Tripper (up to 14) is perfect for a family graduation cruise. Meeseeks and The Irony (25–30 each) handle a close friend group. Clever Girl (50–75) accommodates the full class, multi-family class celebrations, or extended family events. Over 75 guests? We coordinate multi-boat flotilla cruises.',
    },
    {
      q: 'Can we time a graduation cruise around the commencement ceremony?',
      a: 'Yes — we regularly build graduation cruise timing around commencement ceremonies. Share your ceremony time when you book and we set the departure for 2–3 hours later (enough buffer for photos, changing clothes, and marina arrival). If the ceremony runs long, just call (512) 488-5892 and we can shift the departure 30–60 minutes without penalty.',
    },
    {
      q: 'What do graduates wear on a cruise?',
      a: 'Most graduates bring two outfits: cap and gown for initial photos on the upper deck, then a comfortable change (swimsuit for the swim stop, casual attire for dinner). Bring flat shoes (sandals or boat shoes — no heels on the deck). A light layer is smart for the sunset portion since it cools off on the water.',
    },
    {
      q: 'Can we do a graduation photo shoot on the cruise?',
      a: 'Absolutely — the upper deck at golden hour is one of Austin\'s best portrait backdrops. Many graduation cruises include 15–30 minutes for cap-and-gown portraits with the Hill Country bluffs behind. Bring a family photographer or use our preferred Austin graduation-portrait pros. We\'ll slow the boat or anchor briefly for the shots.',
    },
    {
      q: 'Can we have a catered dinner on a graduation cruise?',
      a: 'Yes — many graduation cruises are dinner cruises. We partner with Austin caterers for everything from taco bars and BBQ to seated plated dinners. Food is delivered to the marina or the boat and set up before guests arrive. The Ultimate package includes a 6-foot food table, plates, champagne flutes, and plasticware for elevated service.',
    },
    {
      q: 'When should we book a graduation cruise?',
      a: 'Graduation season (mid-May to early June) is our busiest time of year. Book 8–12 weeks in advance for weekend dates. Saturday afternoons and sunsets in late May sell out first. Weekday evenings after commencement ceremonies have more availability. A 25% deposit secures the date; balance is due 30 days prior.',
    },
    {
      q: 'Can we do a graduation cruise for a college graduate?',
      a: 'Yes — college graduation cruises are a big part of our late-May/early-June calendar. UT Austin, Texas State, ACC, St. Edward\'s, and Huston-Tillotson graduates all celebrate on our boats. College grad cruises typically have a more adult BYOB vibe and often combine graduation with a birthday or moving-away send-off in one charter.',
    },
    {
      q: 'What happens if it rains on the graduation cruise date?',
      a: 'If the captain calls a weather cancellation for thunderstorms, lightning, or unsafe wind, your graduation cruise is rescheduled at no charge — typically within the same season. Light rain does not cancel cruises, and every boat has covered and shaded areas. The captain makes the final call 2 hours before departure, so you have time to notify guests.',
    },
    {
      q: 'Is a graduation cruise safe for younger siblings and grandparents?',
      a: 'Yes. Our boats are family-friendly and graduation cruises frequently include multi-generational guests — younger siblings, grandparents, extended family. USCG-approved life jackets in every size, swim ladders, covered seating, shaded areas, and clean restrooms on board. Our crew is experienced with all-ages events.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/graduation-cruise-v2"
      pageTitle="Graduation Cruise Austin | Lake Travis Sunset Celebrations | Premier Party Cruises"
      pageDescription="A private Lake Travis graduation cruise in Austin. Sunset charters for high school and college grads, 14–75 guests, with catering, photos, and a toast to the graduate. From $200/hour."
      heroEyebrow="Graduation Cruises · Lake Travis · Austin"
      heroHeadline={
        <>
          Graduation <em>cruise</em> Austin.
        </>
      }
      heroBody="A private sunset cruise for the graduate. Catered dinner on the water, golden-hour portraits on the upper deck, a toast to the class of 202X, and a scenic ride back to the marina. Four boats, 14 to 75 guests, fully supervised."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to cruise the <em>graduate</em> into their next chapter?
        </>
      }
      finalCtaBody="Graduation season books 8–12 weeks ahead. Lock in your Lake Travis sunset cruise — our concierge coordinates catering, photography, ceremony-to-boat timing, and the toast so the family can just be present for the moment."
    >
      {/* ── Graduation Cruise Flow ─────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Graduation Cruise</div>
        <h2 className="hp2-section__headline">
          A celebration from <em>ceremony</em> to sunset.
        </h2>
        <p className="hp2-section__body">
          Graduation day is packed — ceremony, photos, family lunch, guests
          arriving from out of town. A Lake Travis sunset cruise gives the day
          a clean finale. The ceremony ends, everyone freshens up, and the
          graduation crew boards the boat for a 4-hour cruise that is all about
          the graduate.
        </p>
        <p className="hp2-section__body">
          Most graduation cruises follow a simple flow: scenic cruise out,
          cap-and-gown photos on the upper deck at golden hour, catered
          appetizers or dinner on the way to a cove, swim stop with music,
          sunset toast to the graduate, and a moonlit cruise back to the
          marina. Zero logistics stress for the family. Maximum memory.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Ceremony to Boat</h3>
            <p className="hp2-feature-card__desc">
              We build in 2–3 hours of buffer from commencement to departure.
              Anderson Mill Marina is 25 minutes from downtown Austin and
              30 minutes from most Austin-area high schools and universities.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Cap-and-Gown Portraits</h3>
            <p className="hp2-feature-card__desc">
              15–30 minutes on the upper deck for graduate portraits, family
              group shots, and friend photos with Lake Travis limestone
              bluffs as the backdrop. Bring a photographer or use our partners.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Dinner & Swim Stop</h3>
            <p className="hp2-feature-card__desc">
              Catered appetizers or full dinner on the cruise out. Then a
              calm-cove swim stop with lily pads, floats, and music — the
              graduate's playlist on our premium Bluetooth system.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Sunset Toast</h3>
            <p className="hp2-feature-card__desc">
              Champagne or sparkling cider (for all-ages groups) for the
              toast. Parents, friends, or siblings take the upper deck to
              honor the graduate as the sun goes down over the Hill Country.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Moonlit Return</h3>
            <p className="hp2-feature-card__desc">
              A scenic cruise back to Anderson Mill Marina with music playing.
              The last 45 minutes are often the most memorable — quiet
              reflection, dancing, or a final friend group photo.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">Fully Supervised</h3>
            <p className="hp2-feature-card__desc">
              Parent host + licensed, experienced captain + trained crew. Life
              jackets in all sizes. Weather monitoring. Headcount protocols
              for swim stops. Every cruise fully supervised.
            </p>
          </div>
        </div>
      </section>

      {/* ── What Sets a Sunset Grad Cruise Apart ──────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Why a Sunset Cruise</div>
          <h2 className="hp2-section__headline">
            Golden hour on Lake Travis is <em>the</em> graduation backdrop.
          </h2>
          <p className="hp2-section__body">
            Anyone can rent a backyard tent or book a restaurant banquet room.
            A private sunset cruise on Lake Travis is the once-in-a-lifetime
            setting that matches a once-in-a-lifetime moment. The light, the
            view, the water, the toast — graduation photos taken at golden
            hour on the upper deck become the ones your family frames.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Texas Hill Country Light</h3>
              <p className="hp2-feature-card__desc">
                Golden hour over Lake Travis is legendary. Limestone bluffs
                glow, the water goes glassy, and every photo looks like it
                was taken at a destination venue.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Private & Intimate</h3>
              <p className="hp2-feature-card__desc">
                The whole boat belongs to the graduate and their crew. No
                other groups, no shared spaces, no noise competition. Just
                the class, the family, and the Texas sunset.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Stress-Free for Parents</h3>
              <p className="hp2-feature-card__desc">
                No setup, no cleanup, no logistics calls during the ceremony.
                Our concierge handles catering deliveries, decoration setup,
                and the timeline. Parents get to actually be present.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing & Boats ─────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Boats & Pricing</div>
        <h2 className="hp2-section__headline">
          The right boat for <em>every</em> graduation.
        </h2>
        <p className="hp2-section__body">
          Day Tripper (up to 14 guests, $200/hr) is ideal for a family-only
          graduation dinner cruise. Meeseeks and The Irony (25–30 guests each,
          $225/hr) fit the close friend group. Clever Girl (50–75 guests,
          $250/hr) handles the full class celebration or extended family event.
          All boats have a 4-hour minimum and include captain, fuel, coolers,
          ice, sound system, and swim stop.
        </p>
        <p className="hp2-section__body">
          Add the Ultimate package ($250–$350 flat) for graduation-specific
          decorations, a 6-foot food table, plasticware, champagne flutes,
          and a dedicated event coordinator who runs the ceremony-to-boat
          timing so the family can be in the ceremony instead of on the phone.
        </p>
      </section>
    </V2PageTemplate>
  );
}
