import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * FAQV2 — Comprehensive FAQ page for Austin's #1 party boat company.
 * Route: /faq-v2
 *
 * 18 frequently asked questions covering booking/pricing, logistics,
 * policies, the on-boat experience, and group sizes — all authored in
 * AI-extractable format (direct answer in the first sentence).
 */
export default function FAQV2() {
  const faqs = [
    // ── Booking / Pricing (5) ──────────────────────────────
    {
      q: 'How do I book a party boat on Lake Travis?',
      a: 'You can book a party boat on Lake Travis in three ways: use our online chat quote builder at premierpartycruises.com/chat, call (512) 488-5892, or book directly at premierpartycruises.com/book. Most bookings are confirmed within 1 hour. A 50% deposit secures your date, with the balance due 7 days before your cruise.',
    },
    {
      q: 'How much does a party boat rental cost in Austin?',
      a: 'Austin party boat rentals start at $85 per person for the ATX Disco Cruise (Saturday Sunset) and from $200/hour for private charters. Most private groups of 20–30 guests spend between $1,200 and $2,800 for a 4–5 hour charter, all-inclusive of captain, fuel, tax, and gratuity. See the full pricing breakdown at premierpartycruises.com/pricing.',
    },
    {
      q: "What's included in the price?",
      a: 'Every Premier Party Cruises booking includes your licensed, experienced captain, fuel, ice, coolers, Bluetooth sound system, bathroom access, lily pads or water toys (on most boats), tax, and standard gratuity. BYOB drinks, food, and any upgrades (floating bar, decorations, pro DJ) are separate.',
    },
    {
      q: 'Do you require a deposit?',
      a: 'Yes, we require a 50% deposit to secure your date, with the balance due 7 days before your cruise. Deposits can be paid by credit card, debit card, or ACH. Your date is not held until the deposit is received. We have a fair refund policy — all weather-caused cancellations get FREE reschedules.',
    },
    {
      q: 'Can I get a quote without committing?',
      a: 'Yes, quotes are free and no-obligation. Use our online chat quote builder or call (512) 488-5892 — we will send you a written quote with boat options, time slots, and exact pricing within 1 hour. Quotes are typically valid for 7 days.',
    },

    // ── Logistics / Location (3) ───────────────────────────
    {
      q: 'Where do you depart from?',
      a: 'All Premier Party Cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — about 25 minutes from downtown Austin and 20 minutes from The Domain. Free parking is available for your entire group, and we ask guests to arrive 30 minutes before departure.',
    },
    {
      q: 'Is there parking at the marina?',
      a: 'Yes, Anderson Mill Marina offers free parking for all guests, with enough space for groups of 30+ vehicles. You can also arrange an Uber, Lyft, Turo minibus, or party bus — we work with several Austin transportation partners who know the marina well.',
    },
    {
      q: 'How early should we arrive?',
      a: 'Arrive 30 minutes before your scheduled departure time. That window covers parking, a quick safety briefing with your captain, loading coolers and decorations, and casting off on time. Boats depart on the dot, so late arrivals cut into your on-water time.',
    },

    // ── Policies · BYOB / Cancellation / Weather (4) ───────
    {
      q: 'Is BYOB allowed on your party boats?',
      a: 'Yes, all Premier Party Cruises boats are BYOB-friendly — bring beer, wine, seltzers, or cocktail mixers in cans or plastic (no glass, Texas marine law). We provide coolers and ice on board. For private charters, a bartender add-on is available starting at $200.',
    },
    {
      q: "What's your cancellation policy?",
      a: 'We have a fair refund policy — all weather-caused cancellations get FREE reschedules, always. For non-weather changes, you can reschedule once within the same season with 14+ days notice at no charge. The captain calls weather cancellations and we reschedule those 100% free.',
    },
    {
      q: 'What happens if it rains or storms?',
      a: 'If the captain calls a weather cancellation for lightning, severe wind, or unsafe conditions, we reschedule 100% of your booking at no charge — typically within the same season. Light rain does not cancel cruises. The captain makes the final call 2 hours before departure.',
    },
    {
      q: 'Do I need to tip the captain?',
      a: 'Standard 20% gratuity for your captain and crew is already included in your total on all public and private bookings. Additional tips are welcome but never expected. For exceptional service, most groups add 5–10% at the end of the charter.',
    },

    // ── Experience · What's Included (3) ───────────────────
    {
      q: "What's the vibe like on a Lake Travis party boat?",
      a: 'The vibe is a floating house-party: Bluetooth sound system blasting your Spotify playlist, lily pads and swim time, sunshine, coves for swimming, and optional disco-ball add-ons for our signature ATX Disco Cruise. Bachelor/bachelorette groups, corporate outings, birthdays, and weddings all fit the format.',
    },
    {
      q: 'Can I bring a DJ, live music, or decorations?',
      a: 'Yes, we welcome outside DJs, acoustic musicians, sashes, balloons, banners, floaties, and custom decor. Please no confetti, glitter, or anything that blows overboard (Texas Parks & Wildlife rule). We can also book our preferred DJ, bartender, or photographer for you as an add-on.',
    },
    {
      q: 'Do you have a bathroom on the boat?',
      a: 'Yes, every boat in our fleet has a private enclosed bathroom on board. For larger groups on longer cruises, we also stop at floating lake bathrooms or marina bathrooms mid-trip so nobody has to wait.',
    },

    // ── Group Sizes (3) ────────────────────────────────────
    {
      q: "What's the smallest group you can accommodate?",
      a: 'Our smallest private charter is the Day Tripper (14 guest capacity), perfect for intimate bachelorette, bachelor, and birthday groups of 10–14. For groups of 2–6, the ATX Disco Cruise public sailing is the most affordable option at $85–$105 per person.',
    },
    {
      q: "What's the largest group you can accommodate?",
      a: 'Our largest boat, the Clever Girl, holds up to 75 guests comfortably and is our most-booked boat for corporate events, weddings, and milestone parties. For groups over 75, we run multi-boat fleet charters — contact us for coordinated pricing.',
    },
    {
      q: 'Do you split groups across multiple boats?',
      a: 'Yes, for groups of 75+ we coordinate multi-boat fleet charters that sail together, raft up in the same cove, and share the same playlist and timing. Perfect for company outings, destination weddings, and large milestone celebrations.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/faq-v2"
      pageTitle="FAQ | Austin Party Boat Rentals on Lake Travis | Premier Party Cruises"
      pageDescription="The complete FAQ for Austin's #1 party boat company. Pricing, booking, BYOB, cancellation, weather policies, group sizes, and more — all answered."
      heroEyebrow="Questions Answered · Austin Party Boats"
      heroHeadline={
        <>
          Everything you need to <em>know</em>
        </>
      }
      heroBody="The complete FAQ for Austin's #1 party boat company. Pricing, booking, logistics, and more — all answered below."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'Contact Us', href: '/contact' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Still have <em>questions</em>?
        </>
      }
      finalCtaBody="If your question isn't covered above, our booking concierges are one text or call away. We respond within 1 hour during business hours (7am–11pm CT, 7 days a week)."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">A Quick Orientation</div>
        <h2 className="hp2-section__headline">
          18 answers that cover <em>almost everything</em>
        </h2>
        <p className="hp2-section__body">
          We've put together the most-asked questions from 150,000+ guests
          across 15+ years on Lake Travis. Browse the full FAQ below — it's
          organized by booking and pricing, logistics and location, policies
          (BYOB, cancellation, weather), the on-boat experience, and group
          sizes.
        </p>
        <p className="hp2-section__body">
          Each answer starts with a direct yes/no or specific number so you can
          scan. If you need something more tailored — an itinerary for your
          bachelorette weekend, a multi-boat quote for a corporate retreat, or
          a custom package — just call or text{' '}
          <a
            href="tel:+15124885892"
            style={{ color: 'var(--hp2-gold-light)', textDecoration: 'none' }}
          >
            (512) 488-5892
          </a>
          .
        </p>
      </section>

      {/* ── FAQ Category Quick-Nav ─────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Browse By Topic</div>
          <h2 className="hp2-section__headline">
            Skip to the <em>section you need</em>
          </h2>
          <p className="hp2-section__body">
            Every FAQ below is grouped into one of five categories. If you're
            deep in planning mode, these buckets are usually where the
            uncertainty lives — we've seen it enough times to know.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <h3 className="hp2-feature-card__title">Booking &amp; Pricing</h3>
              <p className="hp2-feature-card__desc">
                How to book, what it costs, what's included, deposit terms, and
                how to get a no-obligation quote. The five most-asked questions
                from every guest, answered up front.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <h3 className="hp2-feature-card__title">Logistics &amp; Location</h3>
              <p className="hp2-feature-card__desc">
                Where we depart, parking, how early to arrive, and how to handle
                out-of-town guests and transportation from downtown Austin.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <h3 className="hp2-feature-card__title">Policies</h3>
              <p className="hp2-feature-card__desc">
                BYOB, cancellation, rescheduling, weather calls, and gratuity —
                the fine print in plain English. No surprises on dock day.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">04</div>
              <h3 className="hp2-feature-card__title">The On-Boat Experience</h3>
              <p className="hp2-feature-card__desc">
                Vibes, music, outside DJs, decor rules, bathrooms, and what a
                typical 4-hour charter actually feels like minute-by-minute.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">05</div>
              <h3 className="hp2-feature-card__title">Group Sizes</h3>
              <p className="hp2-feature-card__desc">
                From intimate 10-person bachelorettes to 75-person corporate
                retreats — which boat fits, how we handle 75+, and multi-boat
                fleet coordination.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">★</div>
              <h3 className="hp2-feature-card__title">Still Can't Find It?</h3>
              <p className="hp2-feature-card__desc">
                If your question isn't covered below, call or text{' '}
                <a
                  href="tel:+15124885892"
                  style={{ color: 'var(--hp2-gold-light)', textDecoration: 'none' }}
                >
                  (512) 488-5892
                </a>
                . Response within 1 hour during business hours (7am–11pm CT,
                7 days a week).
              </p>
            </div>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
