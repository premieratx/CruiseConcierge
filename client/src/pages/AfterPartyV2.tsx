import V2PageTemplate from '@/components/V2PageTemplate';

export default function AfterPartyV2() {
  const faqs = [
    {
      q: 'What is a day after wedding cruise on Lake Travis?',
      a: 'A day after wedding cruise is a private party boat charter booked the day following your wedding, giving the couple and their out-of-town guests a relaxed recovery brunch on Lake Travis. Premier Party Cruises runs these day-after wedding cruises from Anderson Mill Marina, 25 minutes from downtown Austin, with BYOB mimosas, licensed captain, and a swim stop. They typically run 3-4 hours starting late morning or early afternoon.'
    },
    {
      q: 'How much does a day after wedding cruise cost in Austin?',
      a: 'Day after wedding cruises start at $200/hour with a 4-hour minimum on the Day Tripper (14 guests), $225/hour on Meeseeks or The Irony (25-30 guests), and $250/hour on Clever Girl (50-75 guests). Sunday and weekday rates are typically lower than Saturday peak pricing. Total cost for a 4-hour recovery cruise with 25 guests runs approximately $900-$1,700 depending on the boat and day of week.'
    },
    {
      q: 'What is included in a wedding recovery cruise?',
      a: 'Every day-after wedding cruise includes a US Coast Guard licensed captain, trained crew, premium Bluetooth sound system, coolers (bring your own ice, or order pre-iced from Party On Delivery), a swim stop in a scenic cove, and all safety equipment. BYOB is welcome - most couples bring champagne, mimosa supplies, breakfast tacos, and brunch bites. Add the Ultimate package for upgraded decor and extras for $250-$350 flat per cruise.'
    },
    {
      q: 'Can we host a post wedding brunch on the boat?',
      a: 'Yes, a post-wedding brunch cruise on Lake Travis is one of our most popular day-after wedding recovery options. Bring breakfast tacos from Torchy\'s, coffee carafes, champagne, and orange juice for mimosas. The coolers we provide keep everything cold, and the 25-minute drive from downtown Austin makes it easy for out-of-town guests to join before catching afternoon flights.'
    },
    {
      q: 'How many guests can come on a day after wedding cruise?',
      a: 'Our four boats accommodate 14 to 75 guests. The Day Tripper fits up to 14, Meeseeks and The Irony fit 25-30 each, and Clever Girl fits 50-75. Most day-after wedding cruises host the wedding party plus close family and out-of-town friends who are still in Austin - typically 15 to 40 guests.'
    },
    {
      q: 'What time should we book a day after cruise?',
      a: 'Most couples book a 11 AM, noon, or 1 PM Sunday departure for a 3-4 hour recovery cruise. This gives guests time to sleep in, check out of hotels, and still make evening flights. Sunset recovery cruises from 4-8 PM are also popular if guests are staying another night.'
    },
    {
      q: 'Is BYOB allowed on a wedding recovery cruise?',
      a: 'Yes, we are 100% BYOB on every cruise including day-after wedding events. Bring champagne, prosecco, beer, bloody mary mix, spirits, and mixers in cans or plastic containers only (no glass for safety). We provide large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every boat. You can also arrange alcohol delivery through our partner Party On Delivery so everything is waiting when you arrive.'
    },
    {
      q: 'Where do the boats depart from?',
      a: 'All day-after wedding cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 - approximately 25 minutes from downtown Austin. Free parking is available. We recommend arriving 15 minutes before your scheduled departure. This is the closest Lake Travis marina to downtown Austin hotels.'
    },
    {
      q: 'Can we swim during a recovery cruise?',
      a: 'Absolutely. The captain anchors in a scenic Lake Travis cove with crystal-clear water for a swim stop. Guests can swim, float on giant lily pads, and enjoy the cool water - a perfect cure for a post-wedding hangover. We provide a swim ladder and life jackets in all sizes.'
    },
    {
      q: 'How far in advance should we book a day after wedding cruise?',
      a: 'We recommend booking 3-6 months in advance for Saturday and Sunday wedding dates during peak season (March through October). For off-peak months (November through February), 6-8 weeks notice usually secures availability. Call (512) 488-5892 or book online - we often coordinate both the rehearsal dinner cruise and day-after cruise as a package.'
    },
    {
      q: 'Do you offer catering for wedding recovery brunches?',
      a: 'We coordinate food and alcohol delivery through our partner Party On Delivery, so breakfast tacos, bagels, fruit platters, and brunch items arrive on the boat before you do. You\'re also welcome to bring your own catering from Austin favorites like Torchy\'s Tacos, Veracruz, or Snooze. Our crew helps with setup.'
    },
    {
      q: 'Is a Sunday day-after cruise a good idea for out of town guests?',
      a: 'Yes - a Sunday Lake Travis recovery cruise is one of the best ways to thank out-of-town guests before they fly home. Late-morning departures (11 AM or noon) let guests sleep in, join the cruise, then head to AUS for evening flights. The 25-minute drive from downtown Austin makes logistics easy.'
    },
    {
      q: 'What should guests wear to a day after wedding cruise?',
      a: 'Casual beach-ready attire: swimsuits under cover-ups, sundresses, shorts, sandals, and plenty of sunscreen. Bring a towel, sunglasses, and a hat. It\'s the opposite of wedding formalwear - the whole point is relaxation and recovery on Lake Travis after the big night.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/after-party-v2"
      pageTitle="Day After Wedding Cruise Lake Travis | Recovery Brunch | Premier Party Cruises"
      pageDescription="Book a day after wedding cruise on Lake Travis Austin. Private boat charters for wedding recovery brunches, Sunday mimosa cruises, and out-of-town guest send-offs. 25 min from downtown."
      heroEyebrow="Wedding Recovery · Lake Travis · Since 2009"
      heroHeadline={<>Day-after wedding <em>recovery</em> cruise</>}
      heroBody="The perfect day after wedding cruise on Lake Travis — a private boat charter for you and your out-of-town guests to recover with mimosas, breakfast tacos, and a swim stop. Anderson Mill Marina, 25 minutes from downtown Austin."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Ready for a <em>recovery</em> cruise they'll remember?</>}
      finalCtaBody="Thank your out-of-town guests with the ultimate Lake Travis day-after wedding cruise. Our team handles captain, crew, and coolers — you just bring the mimosas."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">Why A Day-After Cruise</div>
        <h2 className="hp2-section__headline">
          The best way to <em>thank</em> your guests.
        </h2>
        <p className="hp2-section__body">
          After months of planning the perfect Austin wedding, the day after should be easy. A private day after wedding cruise on Lake Travis gives your wedding party and out-of-town guests a relaxed recovery brunch on the water — mimosas, breakfast tacos, and a swim in a scenic cove. It's the wedding recovery experience that out-of-town guests talk about for years. No hangover cure beats fresh lake air and a swim stop in a crystal-clear cove surrounded by limestone cliffs.
        </p>
        <p className="hp2-section__body">
          Premier Party Cruises has hosted day-after wedding cruises for couples getting married at The Terrace Club, Vintage Villas, Lake Travis weddings at Villa Antonia, and downtown Austin venues like The Driskill. Our Anderson Mill Marina location is the closest Lake Travis marina to downtown Austin hotels — 25 minutes by car — making it easy for guests to join before afternoon flights.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What's Included</div>
          <h2 className="hp2-section__headline">
            Everything for a <em>flawless</em> recovery brunch.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Licensed Captain & Crew</div>
              <div className="hp2-feature-card__desc">US Coast Guard certified captains with 15+ years on Lake Travis. Trained crew handles docking, anchoring, and service.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">BYOB Mimosas & Brunch</div>
              <div className="hp2-feature-card__desc">Bring your own champagne, OJ, breakfast tacos, and brunch bites. Large coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) provided. No corkage fees.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">Swim Stop in a Cove</div>
              <div className="hp2-feature-card__desc">Captain anchors in a scenic Lake Travis cove. Swim, float on lily pads, and shake off the wedding-night fatigue.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Transparent rates, <em>no</em> hidden fees.
        </h2>
        <p className="hp2-section__body">
          Day after wedding cruise pricing starts at $200/hour with a 4-hour minimum. Sunday morning and weekday recovery cruises are typically from $200/hour on the Day Tripper, from $225/hour on Meeseeks or The Irony, and from $250/hour on Clever Girl. Add the Ultimate package for $250-$350 flat for upgraded decor and extras. All rates include captain, crew, coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), sound system, and safety gear.
        </p>
      </section>
    </V2PageTemplate>
  );
}
