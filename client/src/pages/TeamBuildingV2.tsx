import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * TeamBuildingV2 — Corporate team building cruises on Lake Travis.
 * Route: /team-building-v2
 * Target keyword: "team building austin"
 *
 * Luxury corporate landing page aimed at HR leaders, people ops, and
 * event planners sourcing high-impact team building experiences that
 * actually move the needle on bonding, retention, and morale.
 */
export default function TeamBuildingV2() {
  const faqs = [
    {
      q: 'What is the best team building activity in Austin?',
      a: 'A private Lake Travis cruise with Premier Party Cruises is consistently rated Austin\'s most impactful team building activity. Unlike escape rooms or bowling nights, a boat charter takes your team fully off the grid for 4+ hours in a stunning natural setting — the perfect environment for authentic connection. We host 300+ corporate team building events per year for companies like Google, Indeed, Tesla, and dozens of Austin-based startups and F500 offices. Our 4.9-star rating, 150,000+ guests served, and 15+ years of experience mean your team building will be flawless.',
    },
    {
      q: 'How does a team building cruise actually build team cohesion?',
      a: 'Three psychological drivers: shared novelty, forced presence, and informal setting. The lake creates a genuinely novel shared experience that becomes a lasting reference point ("remember that time on the boat..."). Cell service is spotty, which means no Slack, no email — just your team, together. And the informal setting collapses hierarchy in ways a conference room never can, with VPs and interns swimming in the same cove. Clients report measurable increases in cross-functional communication and employee Net Promoter Scores in the weeks following a cruise.',
    },
    {
      q: 'How much does corporate team building on a boat cost?',
      a: 'Team building charters start at $200/hour with a 4-hour minimum. For a 30-person team, total cost typically runs $1,800-$2,400 for the boat, plus optional catering ($25-$50/person) and transportation. That works out to roughly $80-$120 per person all-in — less than most indoor team building venues and dramatically more memorable. We issue corporate invoices with Net-15 or Net-30 terms and provide itemized receipts for expense reporting and budget approval.',
    },
    {
      q: 'Can you accommodate corporate invoicing and Net terms?',
      a: 'Yes. We offer corporate invoicing with Net-15 and Net-30 payment terms for qualifying organizations, and we can invoice in advance for fiscal year planning. We provide W-9 documentation, itemized invoices for expense reporting, and accept ACH, wire transfer, check, and corporate credit card. For recurring corporate clients (quarterly team outings, for example), we offer preferred pricing and priority booking windows. Call (512) 488-5892 to set up a corporate account.',
    },
    {
      q: 'What group sizes do you accommodate for team building?',
      a: 'Our fleet covers teams from 14 to 75 guests on a single boat. Day Tripper handles executive leadership retreats of up to 14. Meeseeks and The Irony each host 25-30, perfect for department or functional team outings. Clever Girl, our 50-75 guest flagship, hosts full engineering teams, sales kickoffs, and all-hands team building events. For groups of 75-300, we coordinate multi-boat flotilla events where multiple teams cruise together and rotate between activities.',
    },
    {
      q: 'Can we customize the agenda and activities?',
      a: 'Absolutely. Every charter is fully customizable. Popular structured activities include facilitated icebreakers during the scenic cruise portion, team relay races on giant floating lily pads at the swim stop, collaborative playlist building, group trivia with company-themed questions, team photo challenges, and informal networking over food and drinks. We can also coordinate third-party facilitators for leadership workshops, StrengthsFinder debriefs, or all-hands presentations. Your captain and crew work to your schedule — we flex to your agenda.',
    },
    {
      q: 'Are you insured for corporate events?',
      a: 'Yes. Premier Party Cruises carries $2M in commercial general liability insurance and $1M in marine protection & indemnity coverage. All captains are licensed, and all vessels meet or exceed Licensed safety standards. We can provide Certificates of Insurance (COI) naming your company as additional insured — just ask your booking concierge. Most corporate clients forward the COI to their legal or risk management team during the approval process.',
    },
    {
      q: 'How far in advance should we book a team building event?',
      a: 'For corporate team building on weekends, book 6-8 weeks in advance. For weekday events (which we strongly recommend for team building — weekdays offer better pricing and quieter water), 3-4 weeks is usually enough. Q4 and December holiday dates fill up 2-3 months out. We can hold dates tentatively for 72 hours while you confirm internal approvals. Last-minute availability is often possible — call (512) 488-5892 to check.',
    },
    {
      q: 'Can remote or hybrid teams fly in for the event?',
      a: 'Yes, and this is one of our most common use cases. Austin-Bergstrom International Airport (AUS) is 30 minutes from our marina. We work with companies flying in distributed teams 2-4 times per year for in-person connection. We can coordinate shared ground transportation from downtown hotels, recommend team-friendly hotel blocks, and time the cruise around flight arrivals. Many tech companies build their quarterly in-person weeks around a Premier Party Cruises team building event.',
    },
    {
      q: 'Is the boat appropriate for a professional corporate setting?',
      a: 'Yes. While our boats can host high-energy parties, they work equally well for professional corporate team building. You control the music, volume, and tone. Many corporate clients run structured morning sessions (light music, catered breakfast, team activities) then shift to a more celebratory afternoon. The captain can anchor for calm during presentations. Our crew is trained to read the room — they know when to turn up the vibe and when to keep it tasteful. It\'s your event.',
    },
    {
      q: 'Can we do team building year-round?',
      a: 'Yes. Private corporate charters run 365 days a year. Central Texas weather is remarkably mild — March through November offers warm-weather cruises with swimming, and December through February works beautifully for covered, heated team experiences focused on connection over swimming. Q1 is actually our most popular corporate quarter due to sales kickoffs and new-year team resets. The fall months (September-November) are peak season due to comfortable temperatures and stunning lake views.',
    },
    {
      q: 'What food and beverage options work for team building?',
      a: 'We coordinate catering through our Austin partner network. Popular corporate team building menus include breakfast tacos and coffee for morning events, BBQ buffets from top Austin pitmasters for lunch cruises, and charcuterie with passed appetizers for afternoon/evening sessions. All boats are fully BYOB for beverages — many teams keep it light with seltzers, beer, and non-alcoholic options during the work portion, then celebrate after. Our delivery partner Party On Delivery can have everything stocked on the boat before boarding.',
    },
    {
      q: 'How do we measure ROI on corporate team building?',
      a: 'Our corporate clients track a mix of leading indicators (employee eNPS in the 30/60/90 days post-event, cross-functional collaboration metrics, retention of key employees) and lagging indicators (annual attrition rate reduction, engagement survey scores). Teams consistently report 15-30 point eNPS bumps in the month following a cruise and measurable improvements in cross-team communication. Several F500 clients now have quarterly boat cruises in their standing people-ops budget because the ROI on retention alone justifies the cost multiple times over.',
    },
    {
      q: 'Where do you depart and how do we get our team there?',
      a: 'All charters depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX — approximately 25 minutes from downtown Austin and 30 minutes from AUS airport. Free parking is available for personal vehicles. For corporate groups, we strongly recommend shared transportation: charter bus ($600-$1,200 for 30 people from downtown), shuttle van service, or company-sponsored rideshares. We provide transportation recommendations and coordinate arrival timing so your team boards together efficiently.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/team-building-v2"
      pageTitle="Team Building Austin | Lake Travis Corporate Boat Cruises"
      pageDescription="Austin team building on Lake Travis. Private boat charters for corporate teams of 14-75. Trusted by Fortune 500 and top Austin startups. $200/hr, Net-30 billing, 4.9 stars."
      heroEyebrow="Corporate Team Building · Lake Travis"
      heroHeadline={
        <>
          Austin team building on <em>Lake Travis</em>
        </>
      }
      heroBody="The team building activity your people actually want to attend. Private boat charters for corporate teams of 14 to 75 — trusted by F500 offices, Austin tech, and high-performance cultures."
      primaryCta={{ text: 'Get Corporate Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to build a team that <em>actually</em> wants to be there?
        </>
      }
      finalCtaBody="Tell us your headcount, goals, and timing — we'll send a tailored proposal with transparent pricing and flexible corporate billing. Most quotes land in your inbox within the hour."
    >
      {/* ── Why Team Building on the Water ───────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Lake Travis · The Business Case</div>
        <h2 className="hp2-section__headline">
          Team building that <em>moves the needle</em>
        </h2>
        <p className="hp2-section__body">
          Conference rooms build consensus. Escape rooms build anxiety. A
          private Lake Travis charter builds the one thing that actually
          drives retention, collaboration, and discretionary effort: real
          human connection. Here's what your people ops team gets.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Measurable eNPS Lift</h3>
            <p className="hp2-feature-card__desc">
              Corporate clients report 15–30 point eNPS increases in the 30
              days following a cruise. One offsite. Real impact on your next
              engagement survey — and your retention numbers.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Forced Presence</h3>
            <p className="hp2-feature-card__desc">
              No Slack. No email. No "just one more meeting." Four hours of
              your team fully present with each other in a setting that
              dissolves hierarchy and sparks real conversation.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">One Shared Memory</h3>
            <p className="hp2-feature-card__desc">
              A year from now, your team will still be quoting the cruise.
              That shared reference point is the actual mechanism behind
              cross-functional trust and collaborative work.
            </p>
          </div>
        </div>
      </section>

      {/* ── Who Trusts Us ────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Trusted By · Austin's Best</div>
          <h2 className="hp2-section__headline">
            F500 offices, Austin tech, and <em>everyone in between</em>
          </h2>
          <p className="hp2-section__body">
            We run 300+ corporate team building events every year. From
            quarterly engineering off-sites at Austin's biggest tech employers
            to VC-backed startup all-hands, our captains and concierge team
            have seen (and executed) nearly every corporate use case there is.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">Tech Team Lead · 45 Engineers</h3>
              <p className="hp2-feature-card__desc">
                "We've done escape rooms, TopGolf, and a brewery tour. The boat
                was a different league. Six months later people are still
                referencing inside jokes from the cruise. Booked the next one
                before we docked."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">People Ops Director · F500 Office</h3>
              <p className="hp2-feature-card__desc">
                "Net-30 invoicing, COI within 24 hours, and a proposal that my
                finance team could actually approve. Premier handled the
                paperwork so I could focus on the agenda. Flawless execution."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">VP Sales · SaaS Startup</h3>
              <p className="hp2-feature-card__desc">
                "We fly our sales team in from 12 cities quarterly. The Premier
                cruise is now a standing line item in our Q-kickoff budget.
                Best retention tool we have, period."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Sizes & Fleet ──────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Sizes · Capacity Planning</div>
        <h2 className="hp2-section__headline">
          From <em>leadership retreats</em> to <em>company all-hands</em>
        </h2>
        <p className="hp2-section__body">
          Four boats covering every team size from executive off-sites to
          150+ person all-hands flotillas. Every vessel includes a
          licensed, experienced captain, trained crew, premium sound, and BYOB.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Executive Leadership</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · up to 14 guests. Ideal for C-suite retreats,
              board off-sites, and high-trust leadership team sessions.
              $200–$350/hr, 4-hour minimum.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">25–30</div>
            <h3 className="hp2-feature-card__title">Department Teams</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · 25–30 guests. Perfect for engineering
              pods, sales teams, or functional department outings.
              $225–$425/hr, 4-hour minimum.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">50–75</div>
            <h3 className="hp2-feature-card__title">Company All-Hands</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · 50–75 guests. Full company outings, sales
              kickoffs, and Series A/B celebration cruises. Dance floor,
              premium sound, $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
