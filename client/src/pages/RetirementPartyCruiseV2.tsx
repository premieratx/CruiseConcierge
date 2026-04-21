import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * RetirementPartyCruiseV2 — Retirement party cruises on Lake Travis.
 * Route: /retirement-party-cruise-v2
 *
 * SEO Target: "retirement party cruise austin"
 * Sophisticated, legacy-focused framing for a refined adult celebration.
 */
export default function RetirementPartyCruiseV2() {
  const faqs = [
    {
      q: 'Is a boat cruise a good venue for a retirement party in Austin?',
      a: 'Yes. A private Lake Travis yacht charter is one of Austin\'s most refined retirement party venues. The scenic Hill Country backdrop, sunset cruise timing, and private-yacht feel match the significance of a retirement milestone. Charters for 14–75 guests start at $200/hour and are popular for both corporate send-offs and personal family celebrations.',
    },
    {
      q: 'How much does a retirement cruise cost?',
      a: 'Retirement cruises start at $200/hour on Day Tripper (up to 14 guests) with a 4-hour minimum — about $800 base. Meeseeks or The Irony (25–30 guests) start at $225/hour, and Clever Girl (50–75 guests) starts at $250/hour. Most retirement parties land between $1,500 and $3,500 all-in for a 4-hour charter including tax, gratuity, catering, and a basic decoration package.',
    },
    {
      q: 'Can a retirement cruise be a corporate send-off?',
      a: 'Absolutely. Corporate retirement cruises are one of our most requested charter types — Austin companies book Lake Travis cruises to honor retiring executives, long-tenured staff, and founders. Billed as a business expense, the charter can include a catered dinner, a speaking program on the upper deck, a toast, and a gift presentation. We handle invoicing and W-9 paperwork.',
    },
    {
      q: 'Can a retirement cruise be a family-hosted event?',
      a: 'Yes — family-hosted retirement parties are beautiful on the water. Adult kids and grandkids often coordinate a surprise retirement cruise for a parent or grandparent who is stepping down from decades of work. Multi-generational guest lists work perfectly on our boats: comfortable seating, shaded areas, clean restrooms, and calm cove anchorages.',
    },
    {
      q: 'What is the best boat for a retirement party?',
      a: 'For intimate family retirement dinners (10–14 guests), Day Tripper is perfect. For mid-size office or family+close-friends celebrations (25–30), Meeseeks or The Irony work beautifully — The Irony\'s covered deck is ideal for shaded cocktail-hour vibes. For large corporate retirement send-offs (50–75 guests), Clever Girl accommodates full teams, extended family, and a proper speaking program.',
    },
    {
      q: 'Can we have catering and a full bar on a retirement cruise?',
      a: 'Yes. All private charters are BYOB and BYOF. We coordinate with Austin\'s top caterers for everything from passed appetizers and charcuterie to seated plated dinners. Full bar? Bring wine, champagne, spirits, and mixers (cans or plastic, no glass). A dedicated bartender add-on starts at $200. The Ultimate package includes a 6-foot food table, champagne flutes, and plates.',
    },
    {
      q: 'Can we give speeches and a retirement toast on the boat?',
      a: 'Yes — the upper deck of Clever Girl, Meeseeks, or The Irony is a natural stage for retirement speeches and a group toast. We lower the music, our crew helps with any portable sound if needed, and the group gathers around. Sunset timing makes the toast photos spectacular. Most retirement cruises build in 15–30 minutes for speeches during the cruise.',
    },
    {
      q: 'Can we do a slideshow or video presentation on the retirement cruise?',
      a: 'Yes. Many retirement parties include a photo slideshow or video tribute. A portable LED screen or battery-powered projector on the upper deck works great for a 10–15 minute retirement video presentation. Our event coordinator helps set up A/V so the retiree and guests are both comfortable viewing during the slideshow.',
    },
    {
      q: 'Is a sunset retirement cruise a good idea?',
      a: 'Sunset cruises are the #1 pick for retirement parties. Texas Hill Country sunsets over Lake Travis are spectacular, with golden light on the limestone bluffs and the water going glassy — an ideal backdrop for the retirement toast and the group photo. Our concierge team picks the departure time based on your date so you hit peak golden hour.',
    },
    {
      q: 'How many guests can a retirement party cruise accommodate?',
      a: 'Our fleet handles retirement parties from 1–75 guests on a single boat. Beyond 75 guests, we coordinate multi-boat flotilla cruises for large corporate send-offs where entire departments celebrate together. All boats raft up in the same cove for a unified retirement moment, then cruise together back to Anderson Mill Marina.',
    },
    {
      q: 'Can we do a surprise retirement cruise?',
      a: 'Absolutely — surprise retirement parties on the water are one of our most heartwarming events. A spouse, adult child, or colleague coordinates the charter, guests board early and wait, and the retiree is brought to Anderson Mill Marina under a pretense (a casual dinner, a family gathering). The reveal on the dock is unforgettable, and our crew is experienced at keeping the secret.',
    },
    {
      q: 'Is the boat accessible for older or mobility-limited guests?',
      a: 'Our boats accommodate most guests with mobility considerations. Comfortable seating, shaded areas, stable footing on the deck, and clean restrooms on board. Our crew assists with boarding at the dock for guests who need support. For guests with specific accessibility needs, please share details when booking and we will match you with the most accessible boat in our fleet.',
    },
    {
      q: 'How far in advance should we book a retirement cruise?',
      a: 'Book 6–8 weeks in advance for weekend dates, especially during peak season (April–September). Corporate retirement send-offs tied to a specific date often book 2–3 months out. Weekday cruises and off-peak months (November–February) have more flexibility and often carry lower rates. A 25% deposit secures the date; balance is due 30 days prior.',
    },
    {
      q: 'What makes a retirement cruise different from a standard charter?',
      a: 'Retirement cruises get the full concierge treatment: event-coordinator timeline for speeches and toasts, elevated catering coordination, A/V setup for slideshows, sunset departure timing, dedicated space for the retirement gift presentation, and coordination with photographers for portraits. The Ultimate package ($250–$350 flat) wraps all these elements into one refined experience.',
    },
    {
      q: 'Can the company invoice a retirement cruise as a business expense?',
      a: 'Yes. Corporate retirement cruises are commonly billed to the company as a business expense. We accept corporate credit cards, ACH, and provide W-9s and professional invoices with clean line items for accounting. Payment terms can be extended on approval for large corporate bookings. Contact us directly for invoicing and expense-policy coordination.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/retirement-party-cruise-v2"
      pageTitle="Retirement Party Cruise Austin | Lake Travis Send-Off Charters | Premier Party Cruises"
      pageDescription="Host a refined retirement party on Lake Travis. Private sunset cruises for corporate send-offs and family celebrations — 14–75 guests, catered dinners, speeches, and golden-hour toasts. From $200/hr."
      heroEyebrow="Retirement Cruises · Lake Travis · Austin"
      heroHeadline={
        <>
          Retirement parties on <em>the water</em>.
        </>
      }
      heroBody="A retirement celebration the whole team — or the whole family — will remember. Private Lake Travis cruise, catered dinner, sunset toast, and the scenic backdrop a 30-year career deserves."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'Call Us', href: 'tel:+15124885892' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to honor a <em>legacy</em>?
        </>
      }
      finalCtaBody="Retirement cruises book 6–8 weeks ahead for weekend sunsets. Lock in your Lake Travis charter and our concierge handles catering, speeches, A/V for the slideshow, and the sunset timing — so the retiree and the guests can just be present for the moment."
    >
      {/* ── Corporate vs. Family Retirement Cruises ───────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Every Retirement, a Signature Send-Off</div>
        <h2 className="hp2-section__headline">
          A cruise that matches the <em>career</em>.
        </h2>
        <p className="hp2-section__body">
          Retirement is a milestone that deserves more than a conference-room
          cake. A private yacht charter on Lake Travis gives the moment the
          gravitas it warrants — scenic Hill Country backdrop, sunset toast
          on the upper deck, catered dinner, and a group photo that ends up
          framed on the retiree's wall.
        </p>
        <p className="hp2-section__body">
          We've hosted retirement cruises for Austin executives, military
          officers, university faculty, medical professionals, tradespeople,
          and entrepreneurs. Each one is customized — the retiree's favorite
          music, a catering menu they love, a speaking program the family or
          team has been quietly preparing for weeks.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Corporate Send-Off</h3>
            <p className="hp2-feature-card__desc">
              A company-hosted cruise for a retiring executive, long-tenured
              employee, or founder. Billable as a business expense. Clean
              W-9, professional invoicing, catered dinner, and a gift
              presentation on the upper deck.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Family-Hosted Celebration</h3>
            <p className="hp2-feature-card__desc">
              Adult kids and grandkids coordinate a retirement party for a
              parent stepping down from a long career. Multi-generational
              guest list, sentimental toast, and family portraits on the
              upper deck at golden hour.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Surprise Retirement Cruise</h3>
            <p className="hp2-feature-card__desc">
              The retiree thinks it's a casual family dinner. Guests board
              early, decorations go up, the boat waits at the dock. The
              reveal as they step aboard is one of our most heartwarming
              moments to coordinate.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">04</div>
            <h3 className="hp2-feature-card__title">Legacy Speech Cruise</h3>
            <p className="hp2-feature-card__desc">
              Built around a 30–45 minute speaking program. Colleagues,
              family members, and longtime friends take turns on the upper
              deck sharing stories. Our crew times music and routing to
              hold attention during the speeches.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">05</div>
            <h3 className="hp2-feature-card__title">Slideshow & Video Tribute</h3>
            <p className="hp2-feature-card__desc">
              A portable LED screen on the upper deck plays the retirement
              slideshow — decades of photos and career highlights — during
              the cruise. Our event coordinator handles A/V setup.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">06</div>
            <h3 className="hp2-feature-card__title">Multi-Boat Send-Off</h3>
            <p className="hp2-feature-card__desc">
              For 75+ guest corporate retirement events, we coordinate
              multi-boat flotilla cruises that sail together, raft up in a
              scenic cove for the toast, and return as a unified fleet.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Retirement Cruise Experience ──────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">The Retirement Experience</div>
          <h2 className="hp2-section__headline">
            Refined from the first <em>champagne</em> pour.
          </h2>
          <p className="hp2-section__body">
            Retirement cruises get the full concierge treatment. Here is what
            sets them apart from a standard private charter.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Event-Coordinator Timeline</h3>
              <p className="hp2-feature-card__desc">
                A dedicated coordinator runs the sequence of the cruise —
                welcome, appetizer service, cruise to cove, speeches, dinner,
                slideshow, sunset toast, return. Hosts just show up.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Elevated Catering</h3>
              <p className="hp2-feature-card__desc">
                Passed appetizers, charcuterie boards, taco bars, BBQ, seated
                plated dinners — coordinated with Austin's top caterers and
                delivered directly to the marina or boat.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">A/V for Speeches & Video</h3>
              <p className="hp2-feature-card__desc">
                Portable LED screen, battery-powered projector, and handheld
                mic support for the retirement slideshow, speaking program,
                or tribute video. Event coordinator sets up and tests before
                guests board.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corporate Invoicing & Details ─────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Corporate Send-Off Details</div>
        <h2 className="hp2-section__headline">
          Business-friendly <em>from first call</em>.
        </h2>
        <p className="hp2-section__body">
          Corporate retirement cruises are common bookings for Austin
          companies. We accept corporate cards, ACH, and provide clean W-9s
          and professional invoices with detailed line items for accounting.
          Payment terms can be extended on approval for large corporate
          bookings. A dedicated account manager coordinates with HR or the
          retirement-planning committee from booking to cast-off.
        </p>
        <p className="hp2-section__body">
          All boats are insured, all captains are licensed, and our
          vendor-compliance documentation is on file with dozens of Austin-area
          Fortune 500 offices, healthcare systems, and universities. Insurance
          COIs available on request. Call (512) 488-5892 to connect directly
          with a corporate event coordinator.
        </p>
      </section>
    </V2PageTemplate>
  );
}
