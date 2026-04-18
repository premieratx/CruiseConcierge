import V2PageTemplate from '@/components/V2PageTemplate';

export default function WelcomePartyV2() {
  const faqs = [
    {
      q: 'What is a wedding welcome party in Austin?',
      a: 'A wedding welcome party is a casual pre-wedding event hosted the night before the ceremony to greet out-of-town guests and introduce them to Austin. Premier Party Cruises hosts wedding welcome parties on Lake Travis private charters where couples welcome 20-75 guests aboard for a sunset cruise with BYOB drinks, swim stop, and a first-look at the Hill Country. It is the signature Austin welcome experience.'
    },
    {
      q: 'How much does a wedding welcome party cost?',
      a: 'Austin wedding welcome parties on Lake Travis start at $200/hour with a 4-hour minimum. The Day Tripper (14 guests) runs From $200/hr, Meeseeks or The Irony (25-30) run From $225/hr, and Clever Girl (50-75) runs From $250/hr. Total cost for a 4-hour Thursday or Friday welcome party with 40 guests typically runs $1,000-$2,000 depending on day and boat choice.'
    },
    {
      q: 'When should we host our Austin welcome party?',
      a: 'Most couples host their Austin wedding welcome party the night before the wedding (Thursday or Friday), typically starting at 5 PM or 6 PM for a 4-hour sunset cruise. This schedule gets guests off the boat by 9 or 10 PM, early enough to stay sharp for the ceremony the next day. Some couples host it two nights before for a more relaxed pre-wedding schedule.'
    },
    {
      q: 'How many guests can attend a welcome party cruise?',
      a: 'Our fleet accommodates 14 to 75 guests. Most wedding welcome parties host 25-50 people — the wedding party, immediate family, and out-of-town guests. Day Tripper fits up to 14, Meeseeks and The Irony each fit 25-30, and Clever Girl our flagship fits 50-75 with 14 disco balls for an upscale welcome party experience.'
    },
    {
      q: 'What is included in a welcome party boat rental?',
      a: 'Every wedding welcome party cruise includes a licensed captain, trained crew, premium Bluetooth sound system, large coolers (bring your own ice, or order pre-iced from Party On Delivery), a swim stop in a scenic cove, and all safety equipment. BYOB is welcome — bring champagne, cocktail ingredients, beer, and any food. Optional Ultimate upgrade ($250-$350 flat) adds premium decor.'
    },
    {
      q: 'Can we do a sunset welcome party cruise?',
      a: 'Yes — sunset wedding welcome parties are our most popular option. Texas Hill Country sunsets over Lake Travis are spectacular, casting golden light on limestone bluffs. Book a 5 PM or 6 PM departure in summer months (peak sunset around 8:15 PM) or a 4 PM departure in fall/winter. Clients rave about the welcome party sunset photos.'
    },
    {
      q: 'Is BYOB allowed for a welcome party?',
      a: 'Yes — all Premier Party Cruises are 100% BYOB including Austin wedding welcome parties. Bring champagne, beer, wine, spirits, mixers, and non-alcoholic drinks in cans or plastic only (no glass for safety). We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company). You can also coordinate food and alcohol delivery via Party On Delivery so everything is waiting on the boat.'
    },
    {
      q: 'Where is the marina for Austin welcome parties?',
      a: 'All welcome party cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — approximately 25 minutes from downtown Austin hotels. Free parking is available. We recommend arriving 15 minutes before departure so guests can board comfortably.'
    },
    {
      q: 'Can we play our own music for the welcome party?',
      a: 'Yes. Every boat has a premium Bluetooth sound system. Connect your phone or have your DJ bring a controller and play a custom welcome party playlist. For larger parties on Clever Girl, we can coordinate a professional DJ through our network for an additional fee.'
    },
    {
      q: 'What is the best boat for a wedding welcome party?',
      a: 'Clever Girl is the signature choice for Austin wedding welcome parties — 50-75 guests, 14 disco balls, LED lighting, massive deck. Meeseeks or The Irony are perfect for 25-30 guest welcome parties. Day Tripper works for intimate welcome dinners with immediate family (up to 14).'
    },
    {
      q: 'Do you coordinate catering for the welcome party?',
      a: 'Yes — we partner with Party On Delivery to coordinate food and alcohol delivery directly to the boat. Popular welcome party catering includes Terry Black\'s BBQ, Torchy\'s Tacos, Veracruz tacos, and charcuterie platters. Tell us what you want and when, and it arrives before you board.'
    },
    {
      q: 'What should welcome party guests wear?',
      a: 'Casual Austin-chic — sundresses, linen shirts, shorts, and sandals. It\'s a boat party, not the ceremony. Bring sunglasses, a light jacket for after sunset, and a swimsuit if the swim stop appeals to your guests. Temperatures on the lake can be 10 degrees cooler after sundown.'
    },
    {
      q: 'How far in advance should we book a welcome party cruise?',
      a: 'We recommend 3-6 months in advance for Thursday and Friday peak season dates (March-October). Off-season (November-February), 6-8 weeks usually works. Many couples book the welcome party, rehearsal dinner cruise, and day-after recovery cruise together — call (512) 488-5892 for a package quote.'
    },
    {
      q: 'Can we decorate the boat for the welcome party?',
      a: 'Yes. Guests are welcome to bring banners, balloons (weighted — no helium releases on the lake), flower arrangements, signage, and custom decor. Our crew helps with setup. The Ultimate package ($250-$350) includes curated premium decor if you want us to handle it.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/welcome-party-v2"
      pageTitle="Wedding Welcome Party Austin | Lake Travis Private Cruise | Premier Party Cruises"
      pageDescription="Host your Austin wedding welcome party on Lake Travis. Private sunset cruises for 14-75 guests, BYOB, licensed captains. The signature Austin welcome experience for out-of-town wedding guests."
      heroEyebrow="Welcome Party · Lake Travis · Since 2009"
      heroHeadline={<>Welcome your wedding guests to <em>Austin</em></>}
      heroBody="Host your Austin wedding welcome party on Lake Travis — a private sunset cruise that greets out-of-town guests with Hill Country views, BYOB drinks, and an Austin introduction they'll never forget. 25 minutes from downtown."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'Explore Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={<>The perfect Austin <em>welcome</em> awaits.</>}
      finalCtaBody="Book your Lake Travis wedding welcome party cruise and give your guests an unforgettable first taste of Austin. Licensed captains, BYOB, sunset views."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">The Welcome Party Cruise</div>
        <h2 className="hp2-section__headline">
          Greet your guests with a <em>Lake Travis</em> sunset.
        </h2>
        <p className="hp2-section__body">
          A wedding welcome party in Austin isn't just dinner at a restaurant — it's an introduction to the city and to each other. Premier Party Cruises hosts welcome parties on Lake Travis where the entire boat is yours for 4+ hours. Your guests board at Anderson Mill Marina (25 minutes from downtown), cruise into a scenic cove for a golden-hour swim stop, and toast the wedding weekend against a Texas Hill Country sunset. It's the Austin welcome everyone talks about the next morning.
        </p>
        <p className="hp2-section__body">
          We've hosted welcome parties for couples getting married at downtown Austin venues, Lake Travis wedding venues like Villa Antonia and Vintage Villas, and Hill Country resorts. The common thread: guests meet each other on the boat, the ice breaks in the first hour, and by the time the wedding ceremony arrives, everyone already knows each other. That's the magic of a Lake Travis welcome party.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Why Choose Lake Travis</div>
          <h2 className="hp2-section__headline">
            The Austin welcome party <em>done right</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Sunset Over the Hill Country</div>
              <div className="hp2-feature-card__desc">Golden light on limestone cliffs, reflected across calm water. The Austin welcome photo backdrop every wedding photographer dreams of.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">25 Minutes from Downtown</div>
              <div className="hp2-feature-card__desc">Anderson Mill Marina is the closest Lake Travis marina to downtown Austin hotels. Easy logistics for out-of-town guests.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">BYOB & Catering Coordination</div>
              <div className="hp2-feature-card__desc">Bring your own champagne and cocktails — or let us coordinate food and drink delivery so it&rsquo;s waiting on the boat.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Welcome party pricing, <em>simplified</em>.
        </h2>
        <p className="hp2-section__body">
          Austin wedding welcome party cruises start at $200/hour with a 4-hour minimum. Typical Thursday or Friday sunset welcome parties run $900-$2,200 total depending on boat choice (Day Tripper through Clever Girl) and guest count (14 to 75). All rates include licensed captain, trained crew, premium sound, coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), swim stop, and safety equipment. Add the Ultimate package ($250-$350 flat) for premium decor.
        </p>
      </section>
    </V2PageTemplate>
  );
}
