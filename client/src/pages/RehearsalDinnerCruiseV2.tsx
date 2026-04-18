import V2PageTemplate from '@/components/V2PageTemplate';

export default function RehearsalDinnerCruiseV2() {
  const faqs = [
    {
      q: 'What is a rehearsal dinner cruise?',
      a: 'A rehearsal dinner cruise is a private party boat charter hosted the evening before a wedding, combining the traditional rehearsal dinner with a sunset cruise on Lake Travis. Premier Party Cruises runs rehearsal dinner cruises from Anderson Mill Marina with BYOB, catering coordination, licensed captain, toasts on the water, and an optional swim stop. It replaces banquet halls with the Austin outdoors.'
    },
    {
      q: 'How much does a rehearsal dinner cruise cost in Austin?',
      a: 'Rehearsal dinner cruises start at $200/hour with a 4-hour minimum. Day Tripper (14 guests) runs From $200/hr, Meeseeks or The Irony (25-30) From $225/hr, and Clever Girl (50-75) From $250/hr. A typical Friday rehearsal dinner cruise totals $900-$2,200 depending on guest count and boat. Catering is coordinated separately through Party On Delivery or your own vendor.'
    },
    {
      q: 'How long is a rehearsal dinner cruise?',
      a: 'Rehearsal dinner cruises run 4 hours minimum, with 4-5 hours being most popular. A typical timeline: 5:30 PM boarding, 6 PM departure, cocktail hour, 7 PM dinner service, 8 PM toasts and speeches at sunset, 9 PM dancing and dessert, 10 PM return to Anderson Mill Marina. Longer cruises (5-6 hours) work well for larger wedding parties.'
    },
    {
      q: 'Do you provide catering for the cruise?',
      a: 'We coordinate catering through our partner Party On Delivery, delivering Terry Black\'s BBQ, Jack Allen\'s Kitchen, Veracruz tacos, and other Austin favorites directly to the boat. You can also bring your own caterer or preferred vendor — no catering restrictions. Our crew assists with setup. Catering pricing is separate from the boat charter.'
    },
    {
      q: 'How many guests fit on a rehearsal dinner cruise?',
      a: 'Our four boats accommodate 14 to 75 guests. Day Tripper fits up to 14 for intimate wedding parties. Meeseeks and The Irony each fit 25-30 — the most common rehearsal dinner cruise size. Clever Girl, our 75-guest flagship, handles large wedding parties with room for dancing and a dedicated dinner area.'
    },
    {
      q: 'What is included in the rehearsal dinner cruise?',
      a: 'Every rehearsal dinner cruise includes a US Coast Guard licensed captain, trained crew, premium Bluetooth sound system, wireless microphone for toasts, large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), a swim stop in a scenic cove (optional), and all safety equipment. BYOB is 100% welcome. Catering coordination and Ultimate decor package ($250-$350 flat) available as add-ons.'
    },
    {
      q: 'Can we have a sit-down dinner on the boat?',
      a: 'Yes — all our boats have seating and table space for plated dinners. Clever Girl and The Irony have the most dedicated table seating, while Meeseeks and Day Tripper work well for family-style or buffet setups. Most couples opt for heavy appetizers or family-style service rather than multi-course plated to maximize socializing time.'
    },
    {
      q: 'Is BYOB allowed for the rehearsal dinner?',
      a: 'Yes, we are 100% BYOB on every rehearsal dinner cruise. Bring champagne for toasts, wine with dinner, signature cocktails, beer, and non-alcoholic options. Cans and plastic containers only (no glass for safety). We provide large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every boat. Many wedding parties coordinate alcohol delivery so it\'s stocked before boarding.'
    },
    {
      q: 'What time is best for a rehearsal dinner cruise?',
      a: 'Sunset cruises are most popular. Peak season (March-October), departures around 5:30-6 PM place toasts at sunset with a return by 10 PM. Winter cruises (November-February) with sunset around 5:45 PM work best departing at 4 PM or 4:30 PM. Most rehearsal ceremonies wrap by 4 PM, giving the wedding party time to drive to Anderson Mill Marina.'
    },
    {
      q: 'Where do rehearsal dinner cruises depart from?',
      a: 'All rehearsal dinner cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — approximately 25 minutes from downtown Austin. Free parking is available for the entire wedding party. Arrive 15-20 minutes before departure for boarding.'
    },
    {
      q: 'Can we play our own music and give speeches?',
      a: 'Yes. Every boat has a premium Bluetooth sound system with a wireless microphone available on request. Best man, maid of honor, parents, and the couple all give toasts to a captive audience against a Lake Travis sunset. Play your own Spotify playlist, connect a DJ controller, or hire a professional DJ for larger parties.'
    },
    {
      q: 'What is the best boat for a rehearsal dinner cruise?',
      a: 'Clever Girl is the flagship choice for rehearsal dinner cruises — 50-75 guests, 14 disco balls, massive dance floor, LED lighting, dedicated dinner area. The Irony (25-30) works best for mid-size rehearsal dinners with plated dinner service. Day Tripper (14) suits intimate immediate-family rehearsals. Meeseeks (25-30) is popular for party-style rehearsal dinners.'
    },
    {
      q: 'How far in advance should I book a rehearsal dinner cruise?',
      a: 'We recommend 4-8 months in advance for Friday dates in peak season (March-October). Saturday rehearsal dinners (for Sunday weddings) book 6 months out. Off-peak (November-February), 8-12 weeks is usually sufficient. Book the welcome party, rehearsal dinner cruise, and day-after cruise as a package — call (512) 488-5892.'
    },
    {
      q: 'Do you accommodate dietary restrictions?',
      a: 'Yes. Our partner caterers accommodate vegetarian, vegan, gluten-free, kosher, and allergy-sensitive dietary needs. Discuss dietary restrictions with your catering coordinator when booking. For BYOB drinks, you control everything — bring mocktail ingredients for non-drinkers and alcohol-free options.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/rehearsal-dinner-cruise-v2"
      pageTitle="Rehearsal Dinner Cruise Austin | Lake Travis Private Charter | Premier Party Cruises"
      pageDescription="Book a rehearsal dinner cruise on Lake Travis Austin. Private charters for 14-75 guests with BYOB, catering coordination, licensed captain, and sunset toasts. 25 min from downtown Austin."
      heroEyebrow="Rehearsal Dinner Cruise · Lake Travis · Since 2009"
      heroHeadline={<>Rehearsal dinner cruise <em>Austin</em></>}
      heroBody="Toast the wedding from a private yacht on Lake Travis. Premier Party Cruises hosts rehearsal dinner cruises with BYOB, catering coordination, sunset toasts, and a swim stop. The Austin rehearsal dinner your guests will remember forever."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'Explore Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Toast tomorrow on the <em>water</em>.</>}
      finalCtaBody="Book your Austin rehearsal dinner cruise on Lake Travis. Private boat charters, BYOB, catering coordination, licensed captains. The pre-wedding celebration your guests deserve."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">The Rehearsal Dinner Cruise</div>
        <h2 className="hp2-section__headline">
          A rehearsal dinner <em>worth</em> crossing the country for.
        </h2>
        <p className="hp2-section__body">
          The Austin rehearsal dinner cruise is our most-requested pre-wedding experience. Your wedding party boards at Anderson Mill Marina (25 minutes from downtown Austin), sets sail into the Texas Hill Country sunset, and enjoys a 4-hour private cruise with catered dinner, BYOB toasts, and optional swim stop. Guests who traveled from across the country tell us it's the highlight of the wedding weekend — better than the ceremony, better than the reception, because it's where the wedding party first comes together.
        </p>
        <p className="hp2-section__body">
          We coordinate catering through Party On Delivery (Austin's top catering network) or work directly with your chosen caterer. The boat arrives stocked with BYOB drinks, the crew handles service and setup, and the captain navigates to the most scenic coves for sunset photos. Most couples book a 4-5 hour cruise starting at 5:30 or 6 PM.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What Makes It Special</div>
          <h2 className="hp2-section__headline">
            Why rehearsal dinners belong on <em>Lake Travis</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Sunset Toasts on Water</div>
              <div className="hp2-feature-card__desc">Best man, maid of honor, and parent speeches under a golden Hill Country sky. The rehearsal dinner photo everyone prints and frames.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">Austin Catering Coordinated</div>
              <div className="hp2-feature-card__desc">Terry Black&rsquo;s BBQ, Jack Allen&rsquo;s Kitchen, Veracruz, or your own caterer delivered directly to the boat. Crew handles setup.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">BYOB Freedom</div>
              <div className="hp2-feature-card__desc">Bring your own champagne, wine pairings, signature cocktails. No corkage fees. Large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) included.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Transparent cruise <em>pricing</em>.
        </h2>
        <p className="hp2-section__body">
          Austin rehearsal dinner cruises start at $200/hour with a 4-hour minimum. Day Tripper From $200/hr, Meeseeks and The Irony From $225/hr, Clever Girl From $250/hr. A typical Friday 4-hour sunset rehearsal dinner cruise with 30 guests totals approximately $1,400-$2,000 for the boat charter. Catering is billed separately based on your menu choice. The Ultimate decor package adds $250-$350 flat for premium styling.
        </p>
      </section>
    </V2PageTemplate>
  );
}
