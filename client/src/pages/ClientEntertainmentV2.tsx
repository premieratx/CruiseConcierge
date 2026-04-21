import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * ClientEntertainmentV2 — Luxury client entertainment on Lake Travis.
 * Route: /client-entertainment-v2
 * Target keyword: "client entertainment austin"
 *
 * Aimed at BD, sales leaders, partner teams, and executives who entertain
 * prospects, close enterprise deals, and deepen strategic accounts. The
 * message: impress clients in a way a steakhouse never could.
 */
export default function ClientEntertainmentV2() {
  const faqs = [
    {
      q: 'What is the best place to entertain clients in Austin?',
      a: 'For high-value clients, a private Lake Travis charter outperforms steakhouses, golf, and private rooms every time. Premier Party Cruises hosts enterprise sales teams, private equity firms, and F500 BD organizations who need a venue that signals how seriously they take the relationship. Four hours on a private boat with crystal-clear swimming, a licensed, experienced captain, and the Texas Hill Country as backdrop creates the kind of relationship depth that one more dinner never will. 4.9 stars, 150,000+ guests served, trusted since 2009.',
    },
    {
      q: 'How does a client cruise compare to a steakhouse dinner?',
      a: 'Three meaningful differences. First, time: you get 4 hours of undivided attention vs. 90 minutes at a restaurant. Second, environment: no adjacent tables, no kitchen noise, no check signaling the end. Third, memorability: your client will remember the boat cruise a year later. They will not remember the ribeye. The investment difference is minimal ($80-$150/person all-in vs. $200-$300 at a top Austin steakhouse) and the relationship depth achieved is dramatically greater.',
    },
    {
      q: 'How much does client entertainment on a boat cost?',
      a: 'Client entertainment charters start at $200/hour with a 4-hour minimum. For an intimate 8-12 person executive client dinner on Day Tripper, total boat cost runs $800-$1,400. For a 25-person mid-size prospect group on Meeseeks or The Irony, expect $900-$1,700. Add catering from premium Austin partners ($50-$125/person for elevated menus) and premium beverages (BYOB — you pick the bottle). Most enterprise BD teams find the all-in cost comparable to a private room at a top Austin steakhouse, with exponentially better outcomes.',
    },
    {
      q: 'Can we invoice this to corporate entertainment budgets?',
      a: 'Yes. We provide corporate invoicing with Net-15 and Net-30 terms, W-9 documentation, and itemized receipts designed for T&E and client entertainment expense reports. Payment options include ACH, wire transfer, corporate card, or check. Many enterprise sales teams have pre-approved us as a standard vendor for client entertainment. We can also invoice in advance of the event for budget allocation purposes. Call (512) 488-5892 to set up a corporate account.',
    },
    {
      q: 'What group sizes are ideal for client entertainment?',
      a: 'It depends on your objective. For executive-level deal closers (C-suite to C-suite), Day Tripper (up to 14) creates the intimate setting that builds deep trust. For mid-market prospect events or partner appreciation (20-30 people), Meeseeks or The Irony works perfectly. For customer advisory boards, user groups, or partner summits (50-75), Clever Girl hosts full programs with presentation capability. We have also coordinated multi-boat events for 100+ person client summits.',
    },
    {
      q: 'Can we run a business conversation or present on the boat?',
      a: 'Absolutely, and many enterprise deals are closed this way. Every boat has a premium Bluetooth sound system with wireless microphone support for presentations, pitches, or product demos. The captain can anchor in a calm cove for a stable environment during any formal program. Many BD teams structure the cruise in phases: scenic departure with networking drinks, anchor for a 20-30 minute product demo or pitch, swim stop for informal deepening conversations, then return cruise with dinner and close.',
    },
    {
      q: 'Is it appropriate for professional client relationships?',
      a: 'Yes, when done right. Our most successful corporate clients treat these cruises as high-touch professional experiences, not parties. The atmosphere is entirely what you make it. Crew is trained to read the room — professional attire appropriate, music volume moderate, focus on the relationship. Your client walks away impressed by your thoughtfulness, not concerned about the optics. For clients from industries with strict entertainment policies (healthcare, government, finance), we can adapt the experience accordingly.',
    },
    {
      q: 'Can you handle special dietary requests and high-end catering?',
      a: 'Yes. We coordinate catering through a vetted Austin partner network that handles dietary restrictions, religious requirements, and high-end service. Popular options for client entertainment include chef-driven tasting menus, premium charcuterie and raw bars, sushi-grade platters, and custom plated dinners. We can also coordinate private chef service onboard for executive-level events. Tell us your guest count, dietary needs, and budget — we\'ll curate options from Austin\'s top caterers.',
    },
    {
      q: 'Do you have insurance coverage for corporate events?',
      a: 'Yes. Premier Party Cruises carries $2M commercial general liability and $1M marine protection & indemnity insurance. All captains are licensed and all vessels meet Licensed safety standards. We provide Certificates of Insurance (COI) naming your company as additional insured within 24 hours of request — essential for many corporate legal and risk management approvals. For client entertainment involving government or regulated industries, we can accommodate additional documentation requirements.',
    },
    {
      q: 'Can we customize the route or itinerary for a specific client?',
      a: 'Yes. Route customization is included. For clients visiting from out of town, we can time the cruise for the iconic Lake Travis sunset (our most requested for client entertainment). For clients flying in the same day, we can adjust departure to match arrival timing. For extended relationship-building, we can run longer cruises (6-8 hours) that include a lunch stop, waterfront dinner, and return sunset cruise. Tell us the client\'s interests and profile — we\'ll design accordingly.',
    },
    {
      q: 'How do we handle clients with drinking restrictions?',
      a: 'Easily. All boats are BYOB, which means you have full control over what is served. For clients who don\'t drink or have religious restrictions, many BD teams simply focus the experience on premium non-alcoholic offerings (craft mocktails, specialty coffee, high-end sparkling waters). For clients in regulated industries with gift/entertainment limits, we can provide itemized receipts and stay within per-person caps. The experience never centers on alcohol — the lake, the conversation, and the food are the draw.',
    },
    {
      q: 'How far in advance should we book client entertainment?',
      a: 'For high-priority client events, book 3-6 weeks in advance to secure preferred dates. Last-minute availability is often possible for weekday cruises — call (512) 488-5892 to check. For clients flying in for multi-day visits, we recommend building the cruise into the itinerary at the planning stage so we can coordinate timing. Priority corporate clients get first access to premium weekend and sunset slots.',
    },
    {
      q: 'What makes this better for closing deals than a golf day?',
      a: 'Golf excludes. Boats include. On a golf course, you are siloed into pairs and limited to your handicap-neighbors. On a boat, everyone is together for four hours — deal champions, technical evaluators, procurement, legal, and sponsors all in one conversation. The informal swim-stop setting also collapses title hierarchy in ways golf never will. Our BD clients consistently report higher meeting attendance (you can\'t easily skip a boat), better prospect engagement, and higher conversion from late-stage opportunity to closed-won.',
    },
    {
      q: 'Where do clients board and how do we handle logistics?',
      a: 'All charters depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX — 25 minutes from downtown Austin and 30 minutes from AUS airport. For client entertainment, we strongly recommend coordinated black car service from the client\'s hotel or airport. Free parking is available if clients prefer to drive. We can provide transportation recommendations and coordinate arrival timing so the first impression is seamless. Many executives arrange rideshares back to downtown after the cruise so clients don\'t worry about driving.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/client-entertainment-v2"
      pageTitle="Client Entertainment Austin | Lake Travis Private Boat Charters"
      pageDescription="Impress clients on Lake Travis. Private boat charters for prospect dinners, deal closers, and VIP accounts. F500-trusted, Net-30 invoicing, $200/hr, 4.9 stars."
      heroEyebrow="Client Entertainment · Austin · Lake Travis"
      heroHeadline={
        <>
          Impress clients on <em>Lake Travis</em>
        </>
      }
      heroBody="The client entertainment venue that outperforms every steakhouse in town. Private boat charters for prospect dinners, deal closers, and strategic account deepening — F500-trusted, concierge-managed."
      primaryCta={{ text: 'Get Corporate Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Your client won't remember the <em>steakhouse</em>. They'll remember this.
        </>
      }
      finalCtaBody="Share your client profile, guest count, and objective — our concierge team designs the experience and sends a full proposal, typically within the hour. Net-30 invoicing available."
    >
      {/* ── The Business Case ───────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Business Case · Why It Works</div>
        <h2 className="hp2-section__headline">
          The deal-closing venue hiding <em>25 minutes</em> from downtown
        </h2>
        <p className="hp2-section__body">
          Enterprise BD teams have figured out what most of Austin still hasn't:
          the best venue in the city for client entertainment doesn't have a
          chef's table or a wine cellar. It has a captain, a swim ladder, and
          four uninterrupted hours with your prospect. Here's why it closes.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">4 Hours vs. 90 Minutes</h3>
            <p className="hp2-feature-card__desc">
              A dinner is 90 minutes of clock-watching. A cruise is 4 hours of
              undivided attention from every stakeholder — champion, evaluator,
              procurement, legal — all in one conversation.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">No Competing Attention</h3>
            <p className="hp2-feature-card__desc">
              Spotty cell service means no Slack, no email, no "quick calls."
              The conversation you flew in for actually happens — not the
              conversation that got interrupted.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Memorable by Design</h3>
            <p className="hp2-feature-card__desc">
              Your client will remember the cruise. They won't remember the
              ribeye. Memorability is the mechanism — the deal you close six
              months later traces back to this moment.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What BD Leaders Say</div>
          <h2 className="hp2-section__headline">
            The client entertainment tool <em>Austin's best</em> sales teams rely on
          </h2>
          <p className="hp2-section__body">
            From enterprise SaaS deal teams to private equity partners meeting
            portfolio company executives, our corporate clients come back
            because it works. Here's what they tell us.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">Enterprise AE · SaaS</h3>
              <p className="hp2-feature-card__desc">
                "Brought in a 7-figure prospect flying down for the day. Four
                hours on the boat did what six months of calls couldn't. Closed
                the deal 11 days later. We book Premier for every late-stage
                enterprise opp now."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">PE Partner · Growth Equity</h3>
              <p className="hp2-feature-card__desc">
                "Annual portfolio CEO gathering. We used to do a downtown dinner
                — forgettable. Switched to the boat three years ago. Our CEOs
                now plan their Austin trips around it. The relationships built
                here are what drive follow-on investments."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">VP BD · F500 Tech Office</h3>
              <p className="hp2-feature-card__desc">
                "Invoicing is clean, COI is fast, and the concierge team makes
                us look good in front of our most important accounts. This is
                our default client entertainment venue for anything above
                $500K ARR."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Sizes ──────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Size Playbook · Match Objective to Boat</div>
        <h2 className="hp2-section__headline">
          The right <em>boat</em> for the right <em>objective</em>
        </h2>
        <p className="hp2-section__body">
          Match your fleet to your goal. Intimate deal-closers live on Day
          Tripper. Mid-market prospect events and customer appreciation thrive
          on Meeseeks or The Irony. Partner summits and user groups belong on
          Clever Girl.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Executive Deal-Closers</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · up to 14. C-suite to C-suite, late-stage enterprise
              deal teams, strategic account deepeners. Intimate, high-trust
              conversations in a setting that signals how much the relationship
              matters. $200–$350/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">25–30</div>
            <h3 className="hp2-feature-card__title">Prospect & Partner Events</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · 25–30 guests. Mid-market prospect dinners,
              partner appreciation, channel events, customer advisory sessions.
              Enough room to create small-group dynamics. $225–$425/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">50–75</div>
            <h3 className="hp2-feature-card__title">Summits & User Groups</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · 50–75 guests. Customer summits, user groups,
              partner conferences, portfolio events. Premium sound for
              presentations, dance floor for celebration, full flagship
              experience. $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
