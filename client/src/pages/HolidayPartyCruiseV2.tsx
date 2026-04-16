import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * HolidayPartyCruiseV2 — Corporate holiday party cruises on Lake Travis.
 * Route: /holiday-party-cruise-v2
 * Target keyword: "holiday party cruise austin"
 *
 * Aimed at HR, office managers, people ops, and executive assistants who
 * plan annual corporate holiday parties. The message: skip the same hotel
 * ballroom this year. Host the holiday party people actually want to attend.
 */
export default function HolidayPartyCruiseV2() {
  const faqs = [
    {
      q: 'What is the best corporate holiday party venue in Austin?',
      a: 'For companies tired of the same hotel ballroom year after year, a private Lake Travis holiday cruise is Austin\'s most memorable corporate holiday venue. Premier Party Cruises hosts 150+ corporate holiday parties every December for tech companies, law firms, financial services, real estate firms, and F500 offices. Our fleet of 4 heated, covered boats operates year-round — yes, including December. The Texas winter holiday cruise is our most-requested corporate format, and once HR teams run one, they book December of next year before the cruise is even over. 4.9 stars, 150,000+ guests served, trusted since 2009.',
    },
    {
      q: 'How much does a corporate holiday party on a boat cost?',
      a: 'Holiday party charters start at $200/hour with a 4-hour minimum. For a typical 40-person corporate holiday party on Clever Girl with 4 hours of cruising, expect $1,800-$2,500 for the boat. Add catering from premium Austin partners ($40-$85/person for holiday-themed menus), premium beverages (BYOB — you pick the wine and whiskey), and optional enhancements like a DJ or live music. All-in per-person cost typically runs $120-$200 — competitive with premium hotel ballrooms, dramatically more memorable. Corporate invoicing with Net-15/Net-30 available.',
    },
    {
      q: 'Is Lake Travis comfortable for a December holiday party?',
      a: 'Yes. Austin winters are mild — typical December evenings on the lake run 45-60°F, comparable to what most guests experience commuting to a traditional holiday party. All our boats have covered and heated areas, and many guests tell us the cool Hill Country evening air on the lake with heated cabin space is actually more pleasant than a stuffy, over-crowded ballroom. For December events, we recommend afternoon/early-evening cruises (2pm-7pm) to catch daylight and sunset. Patio heaters and blankets can be added for extra warmth.',
    },
    {
      q: 'What group sizes do you accommodate for holiday parties?',
      a: 'Our fleet handles corporate holiday parties from 14 to 75 guests on a single boat. Day Tripper (up to 14) for executive team holiday dinners. Meeseeks or The Irony (25-30) for department or small-firm holiday parties. Clever Girl (50-75) for full-company holiday galas — our most popular December booking. For companies over 75, we coordinate multi-boat December flotillas where the full company cruises together across multiple vessels. Clever Girl specifically is a December favorite for its disco ball ceiling, LED lighting, and full dance floor.',
    },
    {
      q: 'Can we have holiday decorations and a holiday theme?',
      a: 'Absolutely. We encourage holiday decor on private charters — garlands, holiday lights, themed centerpieces, Christmas trees, Hanukkah decorations, and branded holiday signage are all welcome. Many corporate clients add custom touches: branded cocktail napkins, holiday step-and-repeat for photos, ugly sweater contests, Secret Santa gift exchanges, and award ceremonies (Employee of the Year, tenure recognition). We can coordinate with Austin event production partners for full holiday production — lighting, full décor builds, and themed entertainment.',
    },
    {
      q: 'Can we get food catered for the holiday party?',
      a: 'Yes. We coordinate holiday catering through our Austin partner network. Popular holiday menus include upscale plated dinners (prime rib, roasted turkey, winter vegetables), holiday BBQ buffets from top Austin pitmasters, charcuterie and appetizer stations, hot chocolate and specialty coffee bars, and holiday dessert displays. For more casual events, taco bars and Tex-Mex spreads work beautifully. All food is delivered directly to the boat before boarding. We can also coordinate chef-carved stations onboard for premium holiday dinners.',
    },
    {
      q: 'Can we do gift exchanges and award ceremonies on the boat?',
      a: 'Yes. Holiday parties often incorporate employee recognition, gift exchanges, and award ceremonies — and the boat handles all of these beautifully. Every vessel has a premium Bluetooth sound system with wireless microphone support. The captain can anchor in a calm cove for formal programs. We help structure the cruise: arrival cocktails and scenic cruise (30 min), anchor for awards and recognition (30-45 min), dinner service (45-60 min), dance floor/celebration (remaining time). Clever Girl\'s stage area and premium sound make it especially popular for year-end award ceremonies.',
    },
    {
      q: 'Do you offer corporate invoicing and Net-30 terms for holiday parties?',
      a: 'Yes. We provide corporate invoicing with Net-15 and Net-30 payment terms, W-9 documentation, and itemized invoices designed for corporate expense reporting and fiscal year accounting. For December events, many companies prefer to invoice against current-year budget — we can accommodate this. Payment via ACH, wire transfer, corporate card, or check. We also offer Certificates of Insurance (COI) naming your company as additional insured, which is often required by corporate legal for employee events. Call (512) 488-5892 to set up a corporate account.',
    },
    {
      q: 'Are you insured for corporate holiday events?',
      a: 'Yes. Premier Party Cruises carries $2M commercial general liability insurance and $1M marine protection & indemnity coverage. All captains are USCG-licensed, and all vessels meet or exceed USCG safety standards. We provide Certificates of Insurance (COI) naming your company as additional insured within 24 hours of request — essential for most HR/legal approvals. For corporate holiday parties involving employee safety considerations, we can accommodate additional documentation requirements, including serving guidelines and safe-transportation protocols.',
    },
    {
      q: 'How do we handle alcohol responsibly for an employee event?',
      a: 'All boats are fully BYOB, which gives you complete control over what is served. For corporate holiday parties with employee safety concerns, we recommend: designate drink tickets or set quantity limits, coordinate Uber/Lyft vouchers home (many companies pre-load vouchers for guests), include non-alcoholic holiday beverages (specialty mocktails, hot cocoa, sparkling ciders), and time the cruise to end well before night driving. We can also coordinate with licensed bartenders to provide professional serving if your corporate policy requires it.',
    },
    {
      q: 'How far in advance should we book a December holiday party?',
      a: 'Book as early as possible. Prime December dates (first three weekends) fill up 3-5 months in advance. For the best selection of weekend dates and boats, book by August or September. Weekday December holiday parties have much better availability and pricing — many corporate clients actually prefer mid-week dates (Tuesday-Thursday) because employees appreciate the break from the work day. We can hold dates tentatively for 72 hours while you secure internal approvals.',
    },
    {
      q: 'Can we customize the agenda and activities?',
      a: 'Absolutely. Every charter is fully customizable. Popular holiday party formats include: cocktail cruise (2-3 hours, mingling with drinks and appetizers), dinner cruise (4 hours, plated dinner with speeches and awards), and full celebration (4-6 hours, cocktails + dinner + awards + dance floor). We can coordinate DJ/live music, photography, holiday entertainment (carolers, photo booths, etc.), and custom activities like team trivia, white elephant gift exchanges, or year-in-review presentations. Share your vision — we design accordingly.',
    },
    {
      q: 'Can we do a holiday party for remote or hybrid teams?',
      a: 'Yes, and this is increasingly our most common December use case. We host many corporate holiday parties where distributed teams fly in for in-person connection. AUS airport is 30 minutes from our marina. We coordinate with nearby hotels (recommend Austin Proper, Fairmont, JW Marriott for executive stays), provide transportation recommendations, and time the cruise to accommodate flight arrivals. Many companies build their annual in-person holiday gathering around the Lake Travis cruise — it\'s become a tradition for distributed teams.',
    },
    {
      q: 'Where do guests board and how do they get there?',
      a: 'All charters depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX — 25 minutes from downtown Austin, 30 minutes from AUS airport. Free parking is available for guests driving themselves. For corporate holiday parties, we strongly recommend shared transportation: charter bus service from downtown ($600-$1,200 for 40 people round-trip), shuttle vans, or pre-loaded Uber/Lyft vouchers. Corporate transportation also helps with safe ride-home logistics after the party. We provide transportation recommendations as part of your event planning.',
    },
    {
      q: 'What if it rains on our December holiday party?',
      a: 'Safety is always our priority. For any weather that makes cruising unsafe (severe thunderstorms, very high winds), we reschedule at no additional cost. Light rain does not affect most December departures — all boats have covered areas and many guests enjoy the cozy ambiance of a rainy-day holiday cruise with heaters and hot drinks. We monitor weather continuously and communicate proactively. Texas December weather is typically mild and dry. For the rare weather cancellation, we work with you to quickly reschedule to another December date.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/holiday-party-cruise-v2"
      pageTitle="Holiday Party Cruise Austin | Corporate Holiday Parties on Lake Travis"
      pageDescription="Corporate holiday parties on Lake Travis. Skip the hotel ballroom. Private boat charters for 14-75 guests, covered and heated, Net-30 billing, 4.9 stars."
      heroEyebrow="Corporate Holiday Parties · Lake Travis"
      heroHeadline={
        <>
          Holiday parties on <em>Lake Travis</em>
        </>
      }
      heroBody="Skip the hotel ballroom this year. Private Lake Travis holiday cruises for 14 to 75 guests — heated, covered, fully BYOB, and the kind of corporate holiday party your team will actually want to attend."
      primaryCta={{ text: 'Get Corporate Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          The only corporate holiday party your team will <em>actually</em> remember.
        </>
      }
      finalCtaBody="Share your headcount, date range, and holiday vision — our concierge team designs a cruise your HR director will be proud of and your employees will talk about for months. December books fast; prime dates go 3-5 months out."
    >
      {/* ── Why a Boat Beats a Ballroom ────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Skip the Ballroom · The Business Case</div>
        <h2 className="hp2-section__headline">
          The holiday party your team <em>actually wants</em> to attend
        </h2>
        <p className="hp2-section__body">
          Every year, HR directors send out the same holiday party invite to
          the same hotel ballroom. Every year, attendance drops. There's a
          fix: host the holiday party at the only December venue in Austin
          your team will talk about for the rest of Q1.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Higher Attendance</h3>
            <p className="hp2-feature-card__desc">
              Corporate holiday parties on the boat average 85%+ attendance
              vs. 55-65% at traditional venues. Employees make the effort
              because they genuinely want to be there.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Better Engagement Scores</h3>
            <p className="hp2-feature-card__desc">
              Post-event employee survey scores on holiday parties jump 20-40
              points on the boat. That translates into Q1 eNPS lift and
              better retention through the February review cycle.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Memorable Year After Year</h3>
            <p className="hp2-feature-card__desc">
              The boat becomes the company tradition. HR directors who book
              once book every December. Employees plan around it. It
              becomes part of why people stay.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">HR Directors Who Made the Switch</div>
          <h2 className="hp2-section__headline">
            Austin's most-followed companies <em>left the ballroom</em>
          </h2>
          <p className="hp2-section__body">
            From tech giants to law firms, HR teams across Austin have made
            the boat their permanent December tradition. Here's what they say.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">HR Director · 200-Person Tech Co</h3>
              <p className="hp2-feature-card__desc">
                "We did the same downtown ballroom for 8 years. Attendance was
                stagnant. Switched to Premier's multi-boat flotilla in 2022.
                Attendance jumped to 91%, eNPS on the December survey was our
                highest ever. We book next December the week after the event."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">People Ops · Law Firm Partner</h3>
              <p className="hp2-feature-card__desc">
                "40 attorneys, staff, and plus-ones. Net-30 invoicing, COI in
                24 hours, Premier handled every detail. Plated holiday dinner,
                awards, dance floor on Clever Girl. My managing partner told
                me it was the best firm event in 15 years."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">EA to CEO · F500 Office</h3>
              <p className="hp2-feature-card__desc">
                "Our distributed team flies in every December for the holiday
                party. The cruise is why they come. Premier handles everything
                — transportation, catering, the whole evening. I just show up
                and watch it run. Booked next December already."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Sizes ──────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Sizes · Match Your Headcount</div>
        <h2 className="hp2-section__headline">
          From <em>executive dinners</em> to <em>full-company galas</em>
        </h2>
        <p className="hp2-section__body">
          Every corporate holiday party has a different feel. Intimate
          leadership dinners. Mid-size firm celebrations. Full-company
          blowouts on the flagship. Every boat is heated, covered, and ready
          for December.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Executive Holiday Dinners</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · up to 14. Leadership team holiday dinners, board
              appreciation events, executive gift exchanges. Intimate, warm,
              and entirely yours. $200–$350/hr with a 4-hour minimum.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">25–30</div>
            <h3 className="hp2-feature-card__title">Department & Firm Parties</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · 25–30. Department holiday parties,
              law firms, small professional services. Big enough for energy,
              small enough for every team member to feel recognized.
              $225–$425/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">50–75</div>
            <h3 className="hp2-feature-card__title">Full-Company Holiday Galas</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · 50–75. Full-company holiday parties with 14
              disco balls, LED lighting, dance floor, premium sound for
              awards. The December event your team will remember.
              $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
