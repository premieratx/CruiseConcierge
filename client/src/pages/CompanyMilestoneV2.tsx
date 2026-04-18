import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * CompanyMilestoneV2 — Celebrate company milestones on Lake Travis.
 * Route: /company-milestone-v2
 * Target keyword: "company milestone celebration austin"
 *
 * Aimed at founders, CEOs, COOs, and chiefs of staff planning IPO
 * celebrations, funding rounds, product launches, anniversary galas, and
 * award ceremonies. The message: the moment deserves a venue that matches.
 */
export default function CompanyMilestoneV2() {
  const faqs = [
    {
      q: 'What is the best venue for a company milestone celebration in Austin?',
      a: 'For meaningful company milestones — Series A closes, IPOs, 10-year anniversaries, $100M ARR, major product launches — Lake Travis on a private charter with Premier Party Cruises is Austin\'s most impactful venue. A hotel ballroom feels like every other corporate event. A boat on Lake Travis feels like the moment deserves. We\'ve hosted funding round celebrations, acquisition announcements, major anniversary galas, and IPO kickoffs for Austin\'s most notable companies. 4.9 stars, 150,000+ guests, trusted since 2009.',
    },
    {
      q: 'How much does a company milestone celebration cost?',
      a: 'Milestone celebrations typically run $2,000-$6,000 for the boat (depending on size and duration) plus premium catering ($75-$200/person) and enhanced beverages. For a 50-person IPO celebration on Clever Girl with a 5-hour sunset cruise, premium catering, champagne, and custom branding, expect $7,500-$15,000 all-in. For a smaller 25-person Series A toast on The Irony, $3,500-$6,000. We offer corporate invoicing with Net-15 and Net-30 terms and provide detailed itemized proposals for internal budget approval.',
    },
    {
      q: 'Can we brand the boat for our company milestone?',
      a: 'Yes. We welcome tasteful branding for milestone celebrations. Options include custom signage, step-and-repeat backdrops for photos, branded napkins and cocktail menus, company logo balloons and banners, custom cake with your logo, and personalized toast menus. For bigger events, we coordinate with local event production partners for lighting, full branded builds, and event photography. We can also arrange professional videography to capture the moment for internal comms, social media, and investor communications.',
    },
    {
      q: 'Can we give speeches, toasts, and present on the boat?',
      a: 'Yes — this is one of the most popular use cases for milestone events. Every boat has a premium Bluetooth sound system with wireless microphone support. The captain can anchor for a stable environment during formal programs. We recommend scheduling speeches during the early portion of the cruise (when guests are fresh) or as the sunset arrives (maximum emotional impact). Clever Girl has multi-zone audio, which works beautifully for award ceremonies, founder speeches, and investor toasts with dozens of guests.',
    },
    {
      q: 'What group sizes do you accommodate for milestone events?',
      a: 'From intimate 10-person leadership team toasts to 75-person full company celebrations on a single boat. Day Tripper (up to 14) works for founder dinners and investor toasts. Meeseeks or The Irony (25-30) for department-level celebrations and early-stage team milestones. Clever Girl (50-75) for full-company events, IPO celebrations, and anniversary galas. For 100-200+ person milestone events, we coordinate multi-boat flotillas where multiple boats cruise together and rotate between activities, or flagship events with overflow boats.',
    },
    {
      q: 'Can we handle investor and board member logistics?',
      a: 'Absolutely. Milestone celebrations often include out-of-town investors, board members, and VIP guests. We coordinate black car pickup from their hotel or AUS airport, have champagne waiting on arrival, and build the experience around their schedule. For investors flying in day-of, we can time the cruise around flight arrivals. We provide COI (Certificates of Insurance) for corporate legal approval and can accommodate security protocols for high-profile guests. Many founders tell us this is where their strongest investor relationships deepened.',
    },
    {
      q: 'Is the setting appropriate for a formal corporate milestone?',
      a: 'Yes. The tone is entirely your call. Many milestone events start formal (arrival cocktails, speeches, plated dinner, award ceremonies) and shift celebratory later. The boat handles both beautifully. For IPO celebrations, the afternoon/sunset cruise with champagne and a founder toast creates an iconic moment. For anniversary galas, the cruise can be a full formal event with plated dinner, live music, and recognition programs. The Hill Country sunset is the kind of natural production value that no hotel ballroom can replicate.',
    },
    {
      q: 'Can we bring custom food and premium champagne?',
      a: 'Yes. All boats are fully BYOB, which means you control the wine and champagne list — critical for milestone celebrations where the bottle matters. Popular milestone choices include Dom Pérignon, Krug, Veuve Clicquot, and high-end Texas wines. Our delivery partner Party On Delivery handles premium beverage procurement and stocking. For catering, we work with Austin\'s top chef-driven caterers to create custom menus — sushi platters, dry-aged beef, premium charcuterie, chef-carved stations. Share your vision and budget; we\'ll curate accordingly.',
    },
    {
      q: 'Do you offer corporate invoicing and Net terms?',
      a: 'Yes. We provide corporate invoicing with Net-15 and Net-30 payment terms, W-9 documentation, and itemized invoices designed for finance team expense reporting. For major milestone events, many corporate clients prefer to pay via wire transfer or ACH. We can invoice in advance for fiscal year budget allocation, and provide Certificates of Insurance (COI) naming your company as additional insured. Call (512) 488-5892 to set up a corporate account.',
    },
    {
      q: 'How far in advance should we book a milestone celebration?',
      a: 'For major milestone events on weekends, book 2-3 months in advance. Q4 and December dates (popular for end-of-year milestones) fill 3-4 months out. For urgent milestone celebrations (post-close celebrations, acquisition announcements), we often accommodate 2-4 week lead times. We can hold dates tentatively for 72 hours while you secure internal approvals. For clients who know their IPO window but not the exact date, we coordinate flexible holds.',
    },
    {
      q: 'Are you insured for corporate milestone events?',
      a: 'Yes. Premier Party Cruises carries $2M commercial general liability insurance and $1M marine protection & indemnity coverage. All captains are USCG-licensed; all vessels meet or exceed USCG safety standards. We provide Certificates of Insurance (COI) naming your company as additional insured within 24 hours of request. For milestone events with VIP guests, media presence, or regulated industries, we can accommodate additional documentation requirements — just let your booking concierge know.',
    },
    {
      q: 'Can we do sunset milestone cruises?',
      a: 'Sunset milestone celebrations are iconic. The Texas Hill Country sunset over Lake Travis — limestone cliffs turning gold, calm water, golden hour photography — is genuinely the best backdrop for toasts, speeches, and milestone moments in Central Texas. Sunset times vary by season. Our concierge team builds the cruise timing so you arrive at the perfect cove right at golden hour. For founder toasts, product launch announcements, and Series A/IPO celebrations, sunset cruises consistently deliver the emotional weight the moment deserves.',
    },
    {
      q: 'Can we incorporate employee recognition or awards?',
      a: 'Yes — this is one of our most requested use cases. We help structure the cruise for award programs: arrival cocktails and scenic cruise (15-30 min), anchor and formal program with awards and recognition (30-60 min), swim stop and informal celebration (30-60 min), return cruise with dinner and closing remarks. Clever Girl has a natural "stage" area with premium sound for award presentations. Many CEOs tell us this is where their company\'s most meaningful recognition moments have happened.',
    },
    {
      q: 'Can we do memorable photography and video for investor comms?',
      a: 'Absolutely. We coordinate with professional event photographers and videographers from our Austin partner network. For milestone events where the visual asset matters (investor decks, company anniversary videos, press releases, social media), we recommend building photography into the program. Golden hour on Lake Travis is universally stunning — the resulting photos and videos work for years of company marketing, investor materials, and employer brand content. Many clients tell us their best company photography ever came from the boat.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/company-milestone-v2"
      pageTitle="Company Milestone Celebration Austin | Lake Travis Private Yacht Charters"
      pageDescription="Celebrate company milestones on Lake Travis. IPO parties, Series A closes, product launches, anniversary galas. F500-trusted, 4.9 stars, Net-30 billing, $200/hr."
      heroEyebrow="Company Milestones · Lake Travis · Austin"
      heroHeadline={
        <>
          Celebrate <em>milestones</em> on the water
        </>
      }
      heroBody="The moment your company just hit deserves a venue that matches. Private Lake Travis cruises for IPO celebrations, funding rounds, product launches, and anniversary galas that will define the company's story for years."
      primaryCta={{ text: 'Get Corporate Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          This moment only happens <em>once</em>. Make it iconic.
        </>
      }
      finalCtaBody="Share the milestone, guest count, and timing — our concierge team designs a celebration that matches the weight of the moment. Custom branding, premium catering, Net-30 invoicing available."
    >
      {/* ── Milestone Types ────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">The Milestones We Help Make Iconic</div>
        <h2 className="hp2-section__headline">
          The moments your company will <em>still reference</em> in ten years
        </h2>
        <p className="hp2-section__body">
          Hotel ballrooms photograph the same as the ones before and after.
          Lake Travis doesn't. For milestones that deserve to define the
          company's story, the venue has to match the weight of the moment.
          Here's how our corporate clients put the boat to work.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Funding Round Celebrations</h3>
            <p className="hp2-feature-card__desc">
              Series A close. Series B. Growth round. The team worked for
              months to get here. A sunset cruise with champagne toasts and
              a founder speech gives the moment the weight it earned.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">IPO & Exit Events</h3>
            <p className="hp2-feature-card__desc">
              Pre-IPO kickoff. Ring-the-bell watch party. Acquisition close
              celebration. The cruise becomes the photograph your company
              will use for the next decade of brand storytelling.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Anniversary Galas</h3>
            <p className="hp2-feature-card__desc">
              10-year anniversary. 20-year anniversary. The milestone that
              recognizes the team, honors tenure, and tells the founding
              story again — all with the Texas Hill Country as backdrop.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Product Launches</h3>
            <p className="hp2-feature-card__desc">
              Internal launch kickoffs, GA announcements, and major feature
              reveals. The team just shipped. Bring them out to the water
              and make sure everyone remembers what shipping feels like.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Award Ceremonies</h3>
            <p className="hp2-feature-card__desc">
              Annual awards, president's club, top performer recognition.
              Clever Girl has a natural stage with premium sound — built for
              the ceremonies your people will talk about all year.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">Revenue Milestones</h3>
            <p className="hp2-feature-card__desc">
              $10M ARR. $100M ARR. First profitable quarter. The number you've
              been chasing finally hit. The team that got you there deserves
              something more than a Slack message.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Founders & CEOs Who've Celebrated Here</div>
          <h2 className="hp2-section__headline">
            The milestone venue Austin's <em>most-watched</em> companies trust
          </h2>
          <p className="hp2-section__body">
            From Series A closes to IPO kickoffs, the leaders of Austin's
            most-watched companies have trusted Premier for the moments that
            define their narrative. Here's what they say.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">Founder & CEO · Series A Close</h3>
              <p className="hp2-feature-card__desc">
                "We'd just closed our Series A. I wanted the team to feel it,
                not just read the funding announcement. The sunset cruise did
                that. Two years later, people still talk about the champagne
                toast on the water. The photo is our About Us page header."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">COO · 10-Year Anniversary</h3>
              <p className="hp2-feature-card__desc">
                "10-year anniversary. 75 people, custom branding, plated
                dinner, founder speech with the sunset behind him. It felt
                like the moment our founding deserved. Premier's concierge
                team ran the entire event. We just showed up and celebrated."
              </p>
            </div>

            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">"</div>
              <h3 className="hp2-feature-card__title">Chief of Staff · IPO Kickoff</h3>
              <p className="hp2-feature-card__desc">
                "Pre-IPO team kickoff. Our exec team needed to align, but
                this was also the last time the founding team would be
                together before public company chaos. The boat gave us the
                space. The photos are in our S-1 prospectus."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Group Sizes ──────────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Group Sizes · Matching the Scale of the Moment</div>
        <h2 className="hp2-section__headline">
          From <em>founder toasts</em> to <em>full-company galas</em>
        </h2>
        <p className="hp2-section__body">
          Every milestone has a different scale. An intimate founders' toast
          lives on Day Tripper. A department-level Series A celebration on
          Meeseeks or The Irony. Full-company milestones and anniversary
          galas on Clever Girl.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Founder & Investor Toasts</h3>
            <p className="hp2-feature-card__desc">
              Day Tripper · up to 14. Intimate leadership toasts, investor
              dinners, board celebrations. The deep-trust, high-meaning
              moments where who is in the room matters as much as the moment
              itself. $200–$350/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">25–30</div>
            <h3 className="hp2-feature-card__title">Team Milestone Celebrations</h3>
            <p className="hp2-feature-card__desc">
              Meeseeks or The Irony · 25–30. Department-level celebrations,
              early-stage team milestones, award dinners. Big enough for
              energy, small enough for every person to feel recognized.
              $225–$425/hr.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">50–75</div>
            <h3 className="hp2-feature-card__title">Full-Company Galas</h3>
            <p className="hp2-feature-card__desc">
              Clever Girl · 50–75. Anniversary galas, IPO kickoffs, $100M
              ARR celebrations. Premium sound for awards, dance floor for
              celebration, the kind of production the moment deserves.
              $250–$500/hr.
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
