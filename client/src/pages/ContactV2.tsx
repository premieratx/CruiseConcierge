import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * ContactV2 — Luxury concierge contact page.
 * Route: /contact-v2
 *
 * Surfaces every way guests can reach Premier Party Cruises (phone, text,
 * email, marina address, business hours, response SLAs) in an
 * AI-extractable structure with FAQ schema.
 */
export default function ContactV2() {
  const faqs = [
    {
      q: 'How quickly do you respond?',
      a: 'We respond within 1 hour during business hours (7am–11pm CT, 7 days a week). Most quote requests placed through our chat quote builder get a confirmed reply in 15–30 minutes. After hours, you will have a response first thing the next morning.',
    },
    {
      q: "What's the best way to reach you?",
      a: 'The fastest way to reach Premier Party Cruises is our online chat quote builder at premierpartycruises.com/chat — it routes directly to our booking team. You can also call or text (512) 488-5892, or email info@premierpartycruises.com.',
    },
    {
      q: 'Do you respond on weekends?',
      a: 'Yes, we respond 7 days a week from 7am to 11pm CT. Saturdays and Sundays are our busiest charter days, so our team is fully staffed on weekends — in fact, weekend inquiries usually get the fastest replies.',
    },
    {
      q: 'Can I text rather than call?',
      a: 'Yes, text (512) 488-5892 any time. Most guests prefer texting for quick questions, last-minute timing changes, or sharing photos of your group. We reply to texts inside of an hour during business hours.',
    },
    {
      q: 'Where is the marina?',
      a: 'Our home marina is Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — about 25 minutes from downtown Austin and 20 minutes from the domain. All ATX Disco Cruise and private charters depart from this marina. Parking is free.',
    },
    {
      q: 'Do you take walk-ins?',
      a: 'No, we do not accept walk-ins. Every cruise requires an advance reservation so we can match you with the right boat, captain, and departure window. Book online at premierpartycruises.com/book or call (512) 488-5892 to confirm availability.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/contact-v2"
      pageTitle="Contact Premier Party Cruises | Austin Lake Travis Party Boats"
      pageDescription="Contact Premier Party Cruises — Austin's #1 Lake Travis party boat company. Call (512) 488-5892, text, or chat. 1-hour response, 7am–11pm CT. Anderson Mill Marina."
      heroEyebrow="Get In Touch · Austin · Lake Travis"
      heroHeadline={
        <>
          Let's plan your <em>perfect</em> celebration
        </>
      }
      heroBody="Call us, text us, or use the quote builder. Our team responds within 1 hour during business hours (7am-11pm CT)."
      primaryCta={{ text: 'Get Instant Quote', href: '/chat' }}
      secondaryCta={{ text: 'Call Now', href: 'tel:+15124885892' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Questions? <em>Let's talk</em>.
        </>
      }
      finalCtaBody="Our booking concierges handle every detail — from group size questions to custom package pricing. Reach out and we'll design your Lake Travis day around you."
    >
      {/* ── Contact Methods ───────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">How To Reach Us</div>
        <h2 className="hp2-section__headline">
          Three fast ways to <em>get answers</em>
        </h2>
        <p className="hp2-section__body">
          Whether you're comparing boats, fine-tuning a bachelorette itinerary,
          or locking in a last-minute corporate outing, our Austin-based team is
          ready. Pick the channel that fits your style — we reply fast on all of
          them.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">01</div>
            <h3 className="hp2-feature-card__title">Phone &amp; Text</h3>
            <p className="hp2-feature-card__desc">
              <a
                href="tel:+15124885892"
                style={{ color: 'var(--hp2-gold-light)', textDecoration: 'none' }}
              >
                (512) 488-5892
              </a>
              <br />
              Call or text — same number. Texts typically answered in under 15
              minutes during business hours. Best for quick questions, date
              checks, and group updates.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">02</div>
            <h3 className="hp2-feature-card__title">Email</h3>
            <p className="hp2-feature-card__desc">
              <a
                href="mailto:info@premierpartycruises.com"
                style={{ color: 'var(--hp2-gold-light)', textDecoration: 'none' }}
              >
                info@premierpartycruises.com
              </a>
              <br />
              Best for detailed quotes, corporate W-9 requests, itinerary
              drafts, and attachments. Replies within 1 hour during business
              hours.
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">03</div>
            <h3 className="hp2-feature-card__title">Chat Quote Builder</h3>
            <p className="hp2-feature-card__desc">
              <a
                href="/chat"
                style={{ color: 'var(--hp2-gold-light)', textDecoration: 'none' }}
              >
                premierpartycruises.com/chat
              </a>
              <br />
              The fastest path to a live quote. Guided, 60-second questionnaire
              that routes directly to our on-shift booking lead. Preferred by
              most guests.
            </p>
          </div>
        </div>
      </section>

      {/* ── Marina / Location ─────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Marina Address</div>
          <h2 className="hp2-section__headline">
            Depart from <em>Anderson Mill Marina</em>
          </h2>
          <p className="hp2-section__body">
            All ATX Disco Cruise sailings and private charters board at Anderson
            Mill Marina — a scenic, easy-to-find marina on the north end of
            Lake Travis. Free parking, covered boarding dock, and clean
            restrooms.
          </p>

          <address
            style={{
              fontFamily: 'var(--hp2-font-display)',
              fontSize: '1.6rem',
              color: 'var(--hp2-cream)',
              fontStyle: 'normal',
              lineHeight: 1.6,
              marginTop: '2rem',
            }}
          >
            Anderson Mill Marina
            <br />
            13993 FM 2769
            <br />
            Leander, TX 78641
          </address>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              marginTop: '2rem',
              color: 'var(--hp2-cream-muted)',
              fontSize: '1.05rem',
              lineHeight: 2,
            }}
          >
            <li>· 25 minutes from downtown Austin</li>
            <li>· 20 minutes from The Domain</li>
            <li>· 30 minutes from Austin-Bergstrom (AUS)</li>
            <li>· Free parking for your whole group</li>
            <li>· Check-in 30 minutes before your scheduled departure</li>
          </ul>
        </div>
      </section>

      {/* ── Hours & Response Times ────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Business Hours · Response SLAs</div>
        <h2 className="hp2-section__headline">
          We're on deck <em>7 days a week</em>
        </h2>
        <p className="hp2-section__body">
          Premier Party Cruises operates year-round on Lake Travis, with peak
          charter season running March through November. Our booking team is
          available every day, and our captains run cruises Thursday through
          Sunday with select weekday private charters.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">M–F</div>
            <h3 className="hp2-feature-card__title">Monday – Friday</h3>
            <p className="hp2-feature-card__desc">
              Booking team: 7am – 11pm CT
              <br />
              Private charters: by reservation
              <br />
              Response target: &lt; 1 hour
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Sat</div>
            <h3 className="hp2-feature-card__title">Saturday</h3>
            <p className="hp2-feature-card__desc">
              Booking team: 7am – 11pm CT
              <br />
              ATX Disco Cruise: Morning &amp; Sunset
              <br />
              Private charters: all-day availability
            </p>
          </div>

          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Sun</div>
            <h3 className="hp2-feature-card__title">Sunday</h3>
            <p className="hp2-feature-card__desc">
              Booking team: 7am – 11pm CT
              <br />
              Brunch charters: available
              <br />
              Response target: &lt; 1 hour
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
