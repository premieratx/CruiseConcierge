import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * BirthdayPartyBoatRentalV2 — Direct rental-focused birthday landing page.
 * Route: /birthday-party-boat-rental-v2
 *
 * SEO Target: "birthday party boat rental austin"
 * Transactional framing: pricing, booking, fleet comparison.
 */
export default function BirthdayPartyBoatRentalV2() {
  const faqs = [
    {
      q: 'How do I rent a party boat for a birthday in Austin?',
      a: 'Book a birthday party boat rental in three ways: use our online chat quote builder at premierpartycruises.com/chat, call (512) 488-5892, or book directly at premierpartycruises.com/book. We confirm most bookings within 1 hour during business hours. A 25% deposit locks in your date; the balance is due 30 days before the cruise.',
    },
    {
      q: 'How much does it cost to rent a party boat for a birthday?',
      a: 'Birthday party boat rentals start at $200/hour on Day Tripper (up to 14 guests) with a 4-hour minimum — about $800 base. Meeseeks or The Irony (25–30 guests) start at $225/hour, and Clever Girl (50–75 guests) starts at $250/hour. Most groups spend $1,500–$3,200 all-in for a 4-hour charter including captain, fuel, coolers, tax, and gratuity.',
    },
    {
      q: 'What is included with a birthday boat rental?',
      a: 'Every birthday boat rental includes your USCG-licensed captain, fuel, trained crew, premium Bluetooth sound system, large coolers (bring your own ice, or order pre-iced from Party On Delivery), a swim stop in a scenic cove, swim ladder, life jackets in all sizes, lily pads or water toys on most boats, comfortable seating with sun and shade, a clean restroom on board, tax, and standard 20% gratuity.',
    },
    {
      q: 'How many guests can I invite to a birthday boat party?',
      a: 'Our fleet rents for birthday groups of 1–75. Day Tripper holds up to 14 guests, Meeseeks and The Irony each hold 25–30, and Clever Girl is our flagship at 50–75 guests. For birthday groups over 75, we coordinate multi-boat flotilla charters that sail together and raft up in the same cove.',
    },
    {
      q: 'Is BYOB allowed on birthday party boat rentals?',
      a: 'Yes — all private charters are fully BYOB for adult birthday parties. Bring beer, wine, champagne, seltzers, spirits, and mixers in cans or plastic (no glass, Texas marine law). We provide coolers and ice. Guests 21+ with valid ID can consume alcohol. For 21st birthdays, we recommend coordinating liquor delivery to the marina so drinks are waiting.',
    },
    {
      q: 'Do you require a deposit to book a birthday boat?',
      a: 'Yes. A 25% non-refundable deposit secures your birthday boat rental date. The balance is due 30 days before the cruise. Deposits can be paid by credit card, debit card, or ACH. Your date is not held until the deposit clears. Weather cancellations (called by the captain) are rescheduled at no charge.',
    },
    {
      q: 'What boats can I rent for a birthday party?',
      a: 'Four boats are available: Day Tripper (14 guests, $200/hr, intimate birthdays), Meeseeks (25–30 guests, $225/hr, mid-size parties), The Irony (25–30 guests, $225/hr, covered deck), and Clever Girl (50–75 guests, $250/hr, 14 disco balls and full dance floor for the biggest celebrations).',
    },
    {
      q: 'Where do birthday boat rentals depart from?',
      a: 'All Premier Party Cruises birthday rentals depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — about 25 minutes from downtown Austin and 20 minutes from The Domain. Free parking is available for your entire group, and we ask guests to arrive 30 minutes before departure.',
    },
    {
      q: 'How long are birthday boat charters?',
      a: 'Birthday charters have a 4-hour minimum with options to extend to 5, 6, or 8 hours at the same hourly rate. Most birthday parties run 4–5 hours: 30 min arrival and boarding, 45 min cruise to a scenic cove, 90 min swim stop with music and cake, and a scenic cruise back. Longer charters are popular for milestone and sunset celebrations.',
    },
    {
      q: 'Can I bring a birthday cake, decorations, and food on the boat?',
      a: 'Yes — cakes, decorations, and catering are all welcome on private birthday rentals. Balloons, banners, sashes, themed tableware are allowed (skip confetti and glitter). Bring your own food or coordinate delivery with local Austin caterers. No glass containers on the boat. The Ultimate package adds a 6-foot food table, plates, and coordinated setup.',
    },
    {
      q: 'Is there a bathroom on the birthday party boat?',
      a: 'Yes, every boat in our rental fleet has a private enclosed bathroom on board. For larger groups on longer cruises, we can also stop at floating lake bathrooms or marina bathrooms mid-trip so nobody has to wait. Clean, private, and always in working order — we check every boat before departure.',
    },
    {
      q: 'What happens if it rains on my birthday boat rental?',
      a: 'If the captain calls a weather cancellation for thunderstorms, lightning, or unsafe wind, your birthday rental is rescheduled at no charge — typically within the same season. Light rain does not cancel cruises, and every boat has covered and shaded areas. The captain makes the final weather call 2 hours before departure.',
    },
    {
      q: 'Can kids ride on a birthday party boat rental?',
      a: 'Absolutely. Our birthday boats are family-friendly and host all-ages celebrations regularly — kids\' birthday parties, Sweet 16s, multi-generational birthdays with grandparents. USCG-approved life jackets are available in children\'s and adult sizes. A parent or guardian must be present for any guest under 21. No minimum age.',
    },
    {
      q: 'How far in advance should I rent a birthday party boat?',
      a: 'Rent 4–6 weeks in advance for weekend dates, especially in peak season (April–September). Milestone birthdays and large groups on Clever Girl book 6–8 weeks out. Weekday and off-peak dates (November–February) have more availability and often slightly lower rates. Call (512) 488-5892 to check last-minute openings.',
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/birthday-party-boat-rental-v2"
      pageTitle="Birthday Party Boat Rental Austin | Lake Travis Private Charters | Premier Party Cruises"
      pageDescription="Rent a birthday party boat on Lake Travis. 4 boats, 14–75 guests, BYOB, licensed captains. Starting at $200/hr. Book online or call (512) 488-5892."
      heroEyebrow="Birthday Boat Rentals · Lake Travis"
      heroHeadline={
        <>
          Birthday party boat rental <em>Austin</em>.
        </>
      }
      heroBody="Rent a private boat for your birthday celebration on Lake Travis. Four boats, 14 to 75 guests, fully BYOB, licensed captain included. Starting at $200/hour with a 4-hour minimum."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={
        <>
          Ready to rent the <em>perfect</em> birthday boat?
        </>
      }
      finalCtaBody="Weekend dates fill fastest in peak season. Lock in your birthday boat rental online or call (512) 488-5892 for a no-obligation quote in under an hour."
    >
      {/* ── Fleet & Pricing Snapshot ─────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Fleet & Pricing</div>
        <h2 className="hp2-section__headline">
          Four boats. Every birthday <em>size</em>.
        </h2>
        <p className="hp2-section__body">
          Choose the right boat for your group. Every rental includes a
          USCG-licensed captain, fuel, coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), premium Bluetooth
          sound system, swim stop, restroom, and BYOB privileges. All boats
          require a 4-hour minimum charter.
        </p>

        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">14</div>
            <h3 className="hp2-feature-card__title">Day Tripper</h3>
            <p className="hp2-feature-card__desc">
              Up to 14 guests · from $200/hr · 4-hour minimum. Perfect for
              intimate birthday dinners, small friend groups, and Sweet 16
              celebrations. Comfortable seating with shade.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">30</div>
            <h3 className="hp2-feature-card__title">Meeseeks</h3>
            <p className="hp2-feature-card__desc">
              25–30 guests · from $225/hr · 4-hour minimum. Mid-size birthday
              celebrations with spacious deck, premium sound, and perfect
              vibes for 30th and 40th birthday parties.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">30</div>
            <h3 className="hp2-feature-card__title">The Irony</h3>
            <p className="hp2-feature-card__desc">
              25–30 guests · from $225/hr · 4-hour minimum. Covered and open
              deck areas make it ideal for hot summer afternoons and sunset
              milestone birthday cruises.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">75</div>
            <h3 className="hp2-feature-card__title">Clever Girl</h3>
            <p className="hp2-feature-card__desc">
              50–75 guests · from $250/hr · 4-hour minimum. Our flagship with
              14 disco balls, LED lighting, full dance floor, and a giant
              Texas flag. The ultimate big birthday rental.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">+</div>
            <h3 className="hp2-feature-card__title">Multi-Boat Charters</h3>
            <p className="hp2-feature-card__desc">
              Groups over 75 guests? We coordinate multi-boat flotilla
              celebrations that sail together and raft up in the same cove.
              Contact us for custom multi-boat pricing.
            </p>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$</div>
            <h3 className="hp2-feature-card__title">What's Not Included</h3>
            <p className="hp2-feature-card__desc">
              BYOB drinks, outside food, and upgrades (decorations, DJ,
              photographer, bartender) are separate. 8.25% tax and 20%
              gratuity are added to all rentals.
            </p>
          </div>
        </div>
      </section>

      {/* ── How Rental Works ─────────────────────────────────── */}
      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">How It Works</div>
          <h2 className="hp2-section__headline">
            From quote to <em>cast-off</em> in four steps.
          </h2>
          <p className="hp2-section__body">
            Renting a birthday boat should be simple. Here is the exact process
            our concierge team walks every host through.
          </p>

          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <h3 className="hp2-feature-card__title">Request a Quote</h3>
              <p className="hp2-feature-card__desc">
                Use the online chat, call, or email. Share your guest count,
                date, and birthday vibe. We send a written quote with boat
                options and exact pricing within 1 hour.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <h3 className="hp2-feature-card__title">Pay the Deposit</h3>
              <p className="hp2-feature-card__desc">
                A 25% non-refundable deposit secures your date. Pay by card or
                ACH. You receive a confirmation email with itinerary, marina
                directions, and the planning checklist.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <h3 className="hp2-feature-card__title">Plan the Details</h3>
              <p className="hp2-feature-card__desc">
                Our concierge helps coordinate cake delivery, catering,
                decorations, alcohol delivery, photographer, and playlist.
                Final balance is due 30 days before the cruise.
              </p>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">04</div>
              <h3 className="hp2-feature-card__title">Cast Off & Celebrate</h3>
              <p className="hp2-feature-card__desc">
                Arrive 30 minutes early for boarding. Captain gives a quick
                safety briefing. Your 4-hour Lake Travis birthday rental
                begins — and we handle everything from there.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Rent With Premier ─────────────────────────────── */}
      <section className="hp2-section">
        <div className="hp2-section__label">Why Premier</div>
        <h2 className="hp2-section__headline">
          Austin's <em>most-booked</em> birthday boat rental company.
        </h2>
        <p className="hp2-section__body">
          Since 2009, we've hosted 150,000+ guests across Lake Travis. Our
          fleet of four premium boats, licensed captains, and trained event
          crew handle everything from kids' birthdays to 75-guest milestone
          celebrations. 4.9 stars across hundreds of reviews. Year-round
          availability. Full BYOB. Transparent pricing with no surprise fees.
        </p>
        <p className="hp2-section__body">
          Every rental comes with our concierge team on standby — cake coordination,
          catering deliveries, decoration setup, alcohol delivery partnerships,
          and surprise party logistics. We've seen every birthday scenario and
          have a playbook for each.
        </p>
      </section>
    </V2PageTemplate>
  );
}
