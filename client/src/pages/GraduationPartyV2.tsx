import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * GraduationPartyV2 — High school & college graduation parties on Lake Travis.
 * Route: /graduation-party-v2
 *
 * SEO Target: "graduation party austin"
 * School-appropriate framing: parent-hosted, class celebration, family mix.
 */
export default function GraduationPartyV2() {
  const faqs = [
    {
      q: 'Is a boat a good venue for a graduation party in Austin?',
      a: 'Yes. Lake Travis private boat charters are one of Austin\'s most memorable graduation party venues. The whole class or family group gets the boat for 4–6 hours — cruise, swim stop, dinner, and a sunset toast — without the setup, cleanup, or crowd control of a backyard party. Private charters for 14–75 guests start at $200/hour.',
    },
    {
      q: 'Do parents need to supervise a high school graduation boat party?',
      a: 'Yes. For any graduation party where a significant portion of guests are under 21, a responsible adult (21+) signs the charter agreement as the renter of record and rides along as host. Most high school grad parties are parent-hosted celebrations where the graduate\'s parents coordinate logistics and chaperone the cruise alongside our licensed captain and crew.',
    },
    {
      q: 'Is alcohol allowed at a high school graduation boat party?',
      a: 'No alcohol at high school graduation parties where the majority of guests are minors. Our coolers are stocked with ice for sodas, sparkling water, mocktails, and juice. For college graduation parties where guests are 21+ with valid ID, standard BYOB rules apply — beer, wine, seltzers, and spirits are welcome in cans or plastic containers.',
    },
    {
      q: 'How many graduates can you fit on a boat?',
      a: 'Our fleet accommodates graduation parties of every size. Day Tripper hosts up to 14 guests for an intimate family grad dinner, Meeseeks and The Irony each hold 25–30 guests for a close friend group, and Clever Girl accommodates 50–75 guests for the big multi-family or whole-team celebration. For groups over 75, we coordinate multi-boat flotillas.',
    },
    {
      q: 'When is the best time to book a graduation boat party?',
      a: 'Graduation season (mid-May through early June) is our busiest time of year for graduation charters. Book 8–12 weeks in advance to lock in your preferred date and boat, especially for weekend afternoons in late May. A 25% deposit secures the date. Weekday celebrations after commencement ceremonies often have more availability.',
    },
    {
      q: 'Can we coordinate a high school class graduation party on a boat?',
      a: 'Absolutely — multi-family class graduation parties are some of our most popular bookings. A group of parents pools resources to rent Clever Girl (50–75 guests), and the graduating class celebrates together on Lake Travis. Each family contributes to catering, decorations, and the playlist. Our event coordinator helps manage logistics across the group.',
    },
    {
      q: 'What is included in a graduation party charter?',
      a: 'Every graduation charter includes a USCG-licensed captain, trained crew, premium Bluetooth sound system, large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), a swim stop in a scenic cove, swim ladder, life jackets in all sizes, covered and shaded seating, clean restroom facilities, tax, and standard 20% gratuity. Upgrade packages add decorations, plasticware, a 6-foot food table, and event coordination.',
    },
    {
      q: 'Can we do a graduation photo shoot on the boat?',
      a: 'Yes — graduation photo shoots on the upper deck with Lake Travis in the background are one of the most requested add-ons. Many families bring a photographer to capture cap-and-gown shots, group portraits with friends, and casual candid moments. We also partner with Austin photographers who specialize in on-water graduation portraits.',
    },
    {
      q: 'How much does a graduation boat party cost?',
      a: 'Graduation party charters start at $200/hour on Day Tripper (up to 14 guests) with a 4-hour minimum — roughly $800 base. Meeseeks or The Irony (25–30 guests) start at $225/hour, and Clever Girl (50–75 guests) starts at $250/hour. Most graduation groups spend $1,200–$3,200 all-in including tax, gratuity, and a basic decoration package.',
    },
    {
      q: 'Can we bring a DJ and decorations to a graduation party boat?',
      a: 'Yes — outside DJs, live acoustic musicians, and all school-themed decorations (balloons, banners with school colors, cap-and-gown banners, class of 202X signage) are welcome on private charters. Skip confetti and glitter. Our premium Bluetooth sound system works for any phone-based playlist if you do not want to bring a DJ.',
    },
    {
      q: 'What safety protocols are in place for student graduation parties?',
      a: 'Safety is our top priority for all youth-heavy charters. Every boat has USCG-approved life jackets in every size, a swim ladder, and a first-aid kit. Our licensed captain and crew are trained in water safety, run headcounts before and after every swim stop, monitor weather continuously, and maintain constant communication with the adult host.',
    },
    {
      q: 'Can we bring food and catering to a graduation boat party?',
      a: 'Yes. Bring your own food, coordinate with local Austin caterers, or do a potluck across families. Popular graduation catering: taco bars, BBQ, pizza, sandwich platters, and cake. We partner with area caterers for delivery directly to the marina or boat. No glass containers on the boat. The Ultimate package includes a 6-foot food table setup.',
    },
    {
      q: 'Does a graduation cruise work for college graduation parties?',
      a: 'Yes — college graduation cruises are a major part of our May/June calendar. UT Austin, Texas State, ACC, and St. Edward\'s graduates book Lake Travis charters as the class celebration. College grad parties typically go BYOB, have a more relaxed adult vibe, and often combine graduation with a birthday or moving-away celebration in one cruise.',
    },
    {
      q: 'What happens if the graduation commencement runs long and we are late?',
      a: 'We build buffer into graduation weekend bookings because commencement ceremonies often run long. Let our concierge team know your ceremony start and end time when you book. We can shift your departure window 30–60 minutes without penalty. Just call (512) 488-5892 from the ceremony if you need to adjust — we will work with you.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/graduation-party-v2"
      pageTitle="Graduation Party Austin | Lake Travis Boat Celebrations | Premier Party Cruises"
      pageDescription="Celebrate graduation on Lake Travis. Private boat charters for high school and college graduation parties. Parent-hosted, 14–75 guests, from $200/hour."
      heroEyebrow="Graduation Parties · Lake Travis"
      heroHeadline={
        <>
          Graduation parties on <em>Lake Travis</em>.
        </>
      }
      heroBody="The class, the family, the caps in the air. Celebrate graduation with a private Lake Travis charter — cruise, swim stop, and sunset photos worthy of the milestone."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to celebrate the <em>graduate</em>?
        </>
      }
      finalCtaBody="Graduation season books 8–12 weeks ahead. Lock in your Lake Travis charter now — our concierge handles decorations, catering, photography, and the timeline so the graduate and the family can just enjoy the moment."
    >
      {/* ── Graduation Cruise Types ─────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Every Graduation, a Signature Celebration</div>
        <h2 className="hp2-section__headline">
          From cap-and-gown to <em>class afloat</em>.
        </h2>
        <p className="hp2-section__body">
          Graduation is a once-in-a-lifetime moment. A private boat on Lake
          Travis gives the graduate, the family, and the class a venue that
          matches the occasion — without the setup headaches of a backyard
          party or the cramped feel of a restaurant banquet room.
        </p>
        <p className="hp2-section__body">
          We host high school grad parties, college graduation celebrations,
          family-only milestone dinners, and multi-family class celebrations
          every May and June. Each is tailored to the graduate — their
          playlist, their school colors, their closest crew.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">High School Graduation</h3>
            <p className="hp2-feature-card__desc">
              Parent-hosted class celebration. Alcohol-free, fully supervised
              by the charter host and our crew. Popular for Westlake, Lake
              Travis, Round Rock, Leander, and Austin ISD graduates.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">College Graduation</h3>
            <p className="hp2-feature-card__desc">
              UT Austin, Texas State, ACC, St. Edward's, and more. Adult BYOB
              celebrations with the class crew — a relaxed, social send-off
              before everyone scatters to new cities.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Family Milestone Dinner</h3>
            <p className="hp2-feature-card__desc">
              Just the graduate, parents, siblings, and grandparents. A
              sunset cruise with a catered dinner and a heartfelt toast on
              the upper deck — the graduation moment your family frames.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Multi-Family Class Party</h3>
            <p className="hp2-feature-card__desc">
              Parents pool resources to rent Clever Girl (50–75 guests) so
              the whole graduating class celebrates together. Each family
              contributes to catering, decor, and the playlist.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Graduate Photo Cruise</h3>
            <p className="hp2-feature-card__desc">
              Bring a photographer for cap-and-gown portraits on the upper
              deck with Hill Country bluffs in the background. We time the
              departure to hit golden hour for the best shots.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">Graduate + Birthday Combo</h3>
            <p className="hp2-feature-card__desc">
              Many grads have late-May/early-June birthdays. Combine the
              graduation party and birthday celebration into one charter —
              dual toast, dual cake, dual memory.
            </p>
          </div>
        </div>
      </section>

      {/* ── What Makes a Graduation Cruise Work ──────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What's Included</div>
          <h2 className="hp2-section__headline">
            Everything the class <em>needs</em> to celebrate.
          </h2>
          <p className="hp2-section__body">
            Every graduation charter includes the licensed captain, trained
            crew, premium Bluetooth sound system for the class playlist, coolers
            with ice, a swim stop in a scenic cove, swim ladder, life jackets
            in all sizes, covered and shaded seating, and a clean restroom.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Full Supervision</h3>
              <p className="hp2-feature-card__desc">
                Parent host + USCG-licensed captain + trained crew. Headcounts
                before and after every swim stop. Weather monitoring. First-aid
                equipment. Every graduation charter is fully supervised.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">School-Color Decor</h3>
              <p className="hp2-feature-card__desc">
                Balloons, banners, and signage in school colors. "Class of
                2026" banners. Cap-and-gown photo backdrops. Custom decor
                setup included in the Ultimate package.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Catering Partners</h3>
              <p className="hp2-feature-card__desc">
                Austin's best graduation caterers — taco bars, BBQ, pizza,
                charcuterie, dessert towers. Delivered to the marina or boat
                and set up before guests arrive. No-glass policy enforced.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Graduation Season Logistics ───────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Graduation Season Logistics</div>
        <h2 className="hp2-section__headline">
          Book early. <em>Plan</em> with our concierge.
        </h2>
        <p className="hp2-section__body">
          Graduation season (mid-May through early June) is our busiest time
          of year. Weekend afternoons in late May sell out 8–12 weeks ahead.
          If the graduation ceremony timing isn't finalized yet, book the date
          with a flexible departure window — we build in buffer for ceremonies
          that run long and can shift your start time 30–60 minutes on the day.
        </p>
        <p className="hp2-section__body">
          Our event concierge handles the coordination across parents, caterers,
          photographers, and the boat schedule so the hosting family can actually
          attend the commencement and not spend the morning on logistics calls.
          Weekday celebrations after evening commencements often have more
          availability and slightly lower rates.
        </p>
      </section>
    </V2PageTemplate>
  );
}
