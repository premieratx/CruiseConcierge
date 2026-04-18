import V2PageTemplate from '@/components/V2PageTemplate';

export default function RehearsalDinnerV2() {
  const faqs = [
    {
      q: 'What is a rehearsal dinner on Lake Travis?',
      a: 'A rehearsal dinner on Lake Travis is a private pre-wedding dinner hosted aboard a chartered party boat the evening before the ceremony. Premier Party Cruises hosts rehearsal dinners for wedding parties of 14-75 guests with a licensed captain, BYOB, catering coordination, and a sunset swim stop. It replaces the traditional banquet hall with a scenic Texas Hill Country cruise, 25 minutes from downtown Austin.'
    },
    {
      q: 'How much does a Lake Travis rehearsal dinner cost?',
      a: 'Rehearsal dinners on Lake Travis start at $200/hour with a 4-hour minimum. Day Tripper (14 guests) runs From $200/hr, Meeseeks or The Irony (25-30) run From $225/hr, and Clever Girl (50-75) runs From $250/hr. A typical Friday rehearsal dinner cruise with 25 guests runs $900-$1,700 total. Catering is separate and coordinated through our partner Party On Delivery or your own vendor.'
    },
    {
      q: 'How many guests fit on a rehearsal dinner cruise?',
      a: 'Our four boats accommodate 14 to 75 guests. Most Lake Travis rehearsal dinners host the wedding party, immediate family, and close friends — typically 20 to 40 guests. Day Tripper fits up to 14, Meeseeks and The Irony each fit 25-30, Clever Girl fits 50-75. Larger rehearsal dinners of 40+ guests fit comfortably on Clever Girl with seating and open deck.'
    },
    {
      q: 'What is included in a rehearsal dinner cruise?',
      a: 'Every Lake Travis rehearsal dinner includes a US Coast Guard licensed captain, trained crew, premium Bluetooth sound system for speeches and toasts, large coolers (bring your own ice, or order pre-iced from Party On Delivery), a swim stop in a scenic cove (optional), and all safety equipment. BYOB is welcome — champagne for toasts, wine with dinner, cocktail supplies. Catering is coordinated separately.'
    },
    {
      q: 'Can we have a plated dinner on the boat?',
      a: 'Yes. Our boats accommodate plated catering, family-style dinners, or buffet setups. Popular rehearsal dinner catering includes Terry Black\'s BBQ, Jack Allen\'s Kitchen, and Austin\'s top private chefs. We coordinate delivery and setup through Party On Delivery, or work directly with your caterer. Tables are available on Clever Girl and The Irony.'
    },
    {
      q: 'What time should we schedule the rehearsal dinner?',
      a: 'Most Lake Travis rehearsal dinners run 5 PM to 9 PM or 6 PM to 10 PM on Friday evening. This gives the wedding party time to complete the ceremony rehearsal at the venue, drive 25 minutes to Anderson Mill Marina, and enjoy a 4-hour sunset cruise with dinner. Earlier departures work well in winter months when sunset is closer to 6 PM.'
    },
    {
      q: 'Is BYOB allowed for a rehearsal dinner?',
      a: 'Yes, all Premier Party Cruises are 100% BYOB including rehearsal dinner cruises. Bring champagne for toasts, wine pairings, signature cocktails, beer, and any non-alcoholic drinks. Cans and plastic containers only (no glass for safety). We provide large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company). Many couples coordinate alcohol delivery through Party On Delivery for convenience.'
    },
    {
      q: 'Can we do toasts and speeches on the boat?',
      a: 'Absolutely. Every boat has a premium sound system with wireless microphone capability. Best man, maid of honor, parents, and the couple can give toasts and speeches mid-cruise against the Lake Travis sunset backdrop. It\'s a far more memorable setting than a banquet hall.'
    },
    {
      q: 'Where do rehearsal dinner cruises depart?',
      a: 'All rehearsal dinner cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — approximately 25 minutes from downtown Austin. Free parking is available. We recommend arriving 15-20 minutes before the scheduled departure. This is the closest Lake Travis marina to downtown Austin and most wedding venues.'
    },
    {
      q: 'Can we customize the rehearsal dinner cruise?',
      a: 'Yes — rehearsal dinners are one of our most custom-tailored cruises. Choose your boat (14-75 guests), duration (4-hour minimum), catering style (plated, buffet, family-style), music (own playlist via Bluetooth or add a DJ), and decor. The Ultimate package ($250-$350 flat) adds premium decor, specialty linens, and curated details.'
    },
    {
      q: 'What is the best boat for a rehearsal dinner?',
      a: 'The Irony and Meeseeks (25-30 guests) are the most popular for mid-size rehearsal dinners. Clever Girl (50-75 guests) is the choice for larger rehearsal dinners with full catering setup and 14 disco balls for a memorable reception-style atmosphere. Day Tripper (14 guests) suits intimate wedding parties with immediate family only.'
    },
    {
      q: 'Can we have music and dancing after dinner?',
      a: 'Yes. After the rehearsal dinner toasts and dinner service wrap up, the dance floor opens. Clever Girl has a massive dance floor with 14 disco balls and LED lighting. All boats have premium sound systems that accommodate DJs, live musicians, or Spotify playlists via Bluetooth.'
    },
    {
      q: 'How far in advance should we book a rehearsal dinner cruise?',
      a: 'We recommend 4-8 months in advance for Friday peak season dates (March-October), especially for larger boats like Clever Girl. Off-season (November-February), 2-3 months usually works. Many couples book a welcome party, rehearsal dinner, and day-after recovery cruise together — call (512) 488-5892 for a package quote.'
    },
    {
      q: 'What if it rains on our rehearsal dinner night?',
      a: 'Safety is the top priority. Light rain doesn\'t affect departures — our boats have covered areas. For thunderstorms or high winds, we contact you to reschedule at no additional cost, typically to the welcome party night or day after the wedding. We monitor weather continuously and communicate proactively.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/rehearsal-dinner-v2"
      pageTitle="Rehearsal Dinner Lake Travis | Private Boat Charter | Premier Party Cruises"
      pageDescription="Host your rehearsal dinner on Lake Travis with a private boat charter. 14-75 guests, BYOB, licensed captains, catering coordination. 25 minutes from downtown Austin. Book your unforgettable pre-wedding dinner."
      heroEyebrow="Rehearsal Dinner · Lake Travis · Since 2009"
      heroHeadline={<>Rehearsal dinners on <em>Lake Travis</em></>}
      heroBody="Swap the banquet hall for a Lake Travis sunset. Premier Party Cruises hosts rehearsal dinners aboard private charters with BYOB, catering coordination, and a swim stop. 14-75 guests, 25 minutes from downtown Austin."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>A rehearsal dinner they'll <em>never</em> forget.</>}
      finalCtaBody="Book your Lake Travis rehearsal dinner cruise and give your wedding party a pre-ceremony evening on the water. Licensed captains, BYOB, sunset views, catering coordination."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">Rehearsal Dinner Reimagined</div>
        <h2 className="hp2-section__headline">
          The best rehearsal dinner venue in <em>Austin</em> is on the water.
        </h2>
        <p className="hp2-section__body">
          A rehearsal dinner on Lake Travis replaces the stuffy hotel ballroom with a private sunset cruise. Your wedding party boards at Anderson Mill Marina, cruises into a scenic cove, enjoys a plated or family-style dinner catered by Austin's finest, and toasts tomorrow's ceremony against a Texas Hill Country sunset. Guests describe Lake Travis rehearsal dinners as the most memorable part of the entire wedding weekend — even more than the ceremony itself.
        </p>
        <p className="hp2-section__body">
          We've hosted rehearsal dinners for weddings at Villa Antonia, The Terrace Club, Vintage Villas, Prospect House, and downtown Austin venues like The Driskill and Hotel Ella. Our rehearsal dinner cruises accommodate 14 to 75 guests across four boats, with catering coordination through Party On Delivery or your own preferred vendor. Every charter includes a licensed captain, trained crew, premium sound for speeches, and BYOB freedom.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What's Included</div>
          <h2 className="hp2-section__headline">
            Every rehearsal dinner detail, <em>covered</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Sunset Cruise on Lake Travis</div>
              <div className="hp2-feature-card__desc">Captain anchors in a scenic cove for golden-hour photos and toasts. The Hill Country backdrop every photographer dreams of.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">Catering Coordination</div>
              <div className="hp2-feature-card__desc">Plated dinners, family-style, or buffet — we coordinate delivery from Terry Black&rsquo;s, Jack Allen&rsquo;s Kitchen, or your own caterer.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">Toasts, Speeches, Dancing</div>
              <div className="hp2-feature-card__desc">Wireless mic for speeches. Premium sound system for DJ or playlist. Clever Girl has a massive dance floor and 14 disco balls.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Transparent rehearsal dinner <em>pricing</em>.
        </h2>
        <p className="hp2-section__body">
          Lake Travis rehearsal dinner cruises start at $200/hour with a 4-hour minimum. Day Tripper runs From $200/hr for 14 guests, Meeseeks and The Irony run From $225/hr for 25-30 guests, and Clever Girl runs From $250/hr for 50-75 guests. All charters include licensed captain, trained crew, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), and safety gear. Catering is billed separately through Party On Delivery or your preferred caterer. Ultimate decor package $250-$350 flat.
        </p>
      </section>
    </V2PageTemplate>
  );
}
