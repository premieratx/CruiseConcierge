import V2PageTemplate from '@/components/V2PageTemplate';

export default function EngagementPartyCruiseV2() {
  const faqs = [
    {
      q: 'What is an engagement party cruise in Austin?',
      a: 'An engagement party cruise is a private party boat charter on Lake Travis hosted to celebrate a newly engaged couple with their closest friends and family — typically 20-50 guests. Premier Party Cruises hosts engagement party cruises from Anderson Mill Marina with BYOB champagne, sunset toasts, catered dinner or appetizers, and a swim stop. A memorable upgrade from a restaurant or backyard engagement celebration.'
    },
    {
      q: 'How much does an engagement party cruise cost?',
      a: 'Engagement party cruises on Lake Travis start at $200/hour with a 4-hour minimum. Day Tripper (14 guests) runs From $200/hr, Meeseeks or The Irony (25-30) run From $225/hr, and Clever Girl (50-75) runs From $250/hr. Total cost for a 4-hour engagement party cruise with 30 guests runs approximately $1,200-$2,000 depending on boat and day of week.'
    },
    {
      q: 'How long is an engagement party boat cruise?',
      a: 'Engagement party cruises run 4 hours minimum, with 4-5 hours most popular. A typical timeline: 5:30 PM boarding and champagne welcome, 6 PM departure, cocktail hour and appetizers, 7 PM speeches and sunset toasts at the scenic cove, 8 PM dinner and dancing, 10 PM return to Anderson Mill Marina. Perfect for announcing the wedding date to friends.'
    },
    {
      q: 'Is BYOB allowed for an engagement party?',
      a: 'Yes, all Premier Party Cruises are 100% BYOB including engagement parties. Bring champagne for the toast, wine, craft beer, signature cocktails (the couple\'s favorites), and non-alcoholic options. Cans and plastic containers only (no glass for safety). We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every boat. Coordinate alcohol delivery via Party On Delivery.'
    },
    {
      q: 'How many guests fit on an engagement party cruise?',
      a: 'Our fleet accommodates 14 to 75 guests. Most Austin engagement parties host 25-50 guests — the couple\'s closest friends, both families, and wedding party members. Day Tripper fits up to 14 for intimate parties. Meeseeks and The Irony fit 25-30. Clever Girl (50-75) is popular for larger engagement celebrations with both families present.'
    },
    {
      q: 'What is included in an engagement party cruise?',
      a: 'Every engagement party cruise includes a licensed, experienced captain, trained crew, premium Bluetooth sound system with wireless mic for toasts, large coolers (bring your own ice, or order pre-iced from Party On Delivery), a swim stop in a scenic cove, and all safety equipment. BYOB welcome. Optional Ultimate decor package ($250-$350 flat) adds premium engagement-themed styling.'
    },
    {
      q: 'Can we do sunset toasts on the engagement cruise?',
      a: 'Absolutely — sunset toasts are the highlight of most engagement party cruises. The captain anchors in a scenic cove just before sunset, and the wireless microphone gets passed around for best man, maid of honor, parents, and both members of the couple to give speeches. Texas Hill Country sunset backdrop makes every photo frame-worthy.'
    },
    {
      q: 'Can we have catered food on the engagement party?',
      a: 'Yes. Bring your own caterer or coordinate delivery through Party On Delivery. Popular engagement party catering: Terry Black\'s BBQ, Jack Allen\'s Kitchen, Veracruz, mezze platters, charcuterie boards, sushi platters. Plated dinners, family-style, and buffet setups all work. Our crew assists with setup. Catering separate from boat charter.'
    },
    {
      q: 'Can we decorate the boat for an engagement party?',
      a: 'Yes. Bring your own decor (banners, balloons — weighted, no helium release; signage, photo walls, flower arrangements) or add the Ultimate package for curated premium decor. Popular engagement themes: "Cheers to Forever," "Future Mrs.," gold-and-white, garden party florals. Our crew helps with setup on boarding.'
    },
    {
      q: 'Where do engagement party cruises depart?',
      a: 'All engagement party cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — approximately 25 minutes from downtown Austin. Free parking for the whole party. Arrive 15-20 minutes before scheduled departure. Closest Lake Travis marina to downtown Austin hotels.'
    },
    {
      q: 'What\'s the best boat for an engagement party?',
      a: 'Clever Girl (50-75 guests) is our flagship for larger engagement parties — 14 disco balls, dance floor, LED lighting, dedicated dinner area. Meeseeks and The Irony (25-30) are popular for mid-size engagement parties. Day Tripper (14) suits intimate engagement celebrations with immediate family. All boats include premium sound and swim platforms.'
    },
    {
      q: 'Can we have music and dancing after dinner?',
      a: 'Yes. After the dinner and speeches, the dance floor opens. Clever Girl has a massive dance floor with 14 disco balls and LED lighting. All boats have premium Bluetooth sound systems that accommodate DJs, playlists, or live musicians. Many engagement parties end in a full dance party on the ride back to the marina.'
    },
    {
      q: 'How far in advance should I book an engagement cruise?',
      a: 'We recommend 2-4 months for weekday or Sunday dates, 4-6 months for Saturday peak season (March-October). Off-peak (November-February), 6-8 weeks usually works. Many couples book the engagement party cruise immediately after the proposal — it\'s the perfect first celebration. Call (512) 488-5892.'
    },
    {
      q: 'Can we do a proposal and engagement party on the same cruise?',
      a: 'Yes — surprise proposals followed by engagement party cruises are one of our most magical bookings. The couple boards believing it\'s a friends cruise. The captain anchors in a scenic cove, the question gets asked, and the "she said yes" celebration begins immediately. Call us to coordinate the details — we handle discreet setup.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/engagement-party-cruise-v2"
      pageTitle="Engagement Party Cruise Austin | Lake Travis Private Charter | Premier Party Cruises"
      pageDescription="Celebrate your engagement on Lake Travis. Private engagement party cruises for 14-75 guests with BYOB champagne, sunset toasts, catering, and decor. 25 minutes from downtown Austin."
      heroEyebrow="Engagement Party · Lake Travis · Since 2009"
      heroHeadline={<>Celebrate the <em>engagement</em> on the water</>}
      heroBody="The Austin engagement party cruise on Lake Travis — private charters for 14-75 guests with BYOB champagne, sunset toasts at a scenic cove, catered dinner, and dancing under 14 disco balls. 25 minutes from downtown Austin."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={<>Toast <em>forever</em> on Lake Travis.</>}
      finalCtaBody="Book your Austin engagement party cruise and celebrate your next chapter on the water. Private boat charters, BYOB, sunset toasts, catering coordination."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">The Engagement Party Cruise</div>
        <h2 className="hp2-section__headline">
          An Austin engagement party <em>on the water</em>.
        </h2>
        <p className="hp2-section__body">
          An engagement party cruise is the most memorable way to announce your wedding to the people who matter most. Premier Party Cruises hosts private engagement parties on Lake Travis where the entire boat is yours for 4+ hours. Guests board at Anderson Mill Marina (25 minutes from downtown Austin), cruise into a scenic cove for sunset toasts and speeches, enjoy catered dinner and champagne, and dance under 14 disco balls on the ride back. It\'s a first celebration that sets the tone for the entire wedding year.
        </p>
        <p className="hp2-section__body">
          We coordinate with couples all over Texas — some planning weddings at Villa Antonia and Vintage Villas, others at downtown Austin venues. Engagement party cruises are particularly popular for couples with family coming in from out of state, giving everyone a chance to meet on Lake Travis before the wedding itself. BYOB champagne keeps costs reasonable; Party On Delivery handles catering; our crew handles everything else.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Why Lake Travis</div>
          <h2 className="hp2-section__headline">
            The engagement party venue with <em>built-in</em> magic.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Sunset Toasts at the Cove</div>
              <div className="hp2-feature-card__desc">Captain anchors in a scenic Lake Travis cove. Wireless mic for speeches. Texas Hill Country sunset backdrop every photographer loves.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">BYOB Champagne Toasts</div>
              <div className="hp2-feature-card__desc">Bring your own champagne, signature cocktails, wine pairings. No corkage fees. Coolers with ice stocked before boarding.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">Dinner, Dancing, Disco</div>
              <div className="hp2-feature-card__desc">Catered dinner on the water. Premium sound system, 14 disco balls on Clever Girl, dance floor for the after-dinner celebration.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Simple engagement party <em>pricing</em>.
        </h2>
        <p className="hp2-section__body">
          Austin engagement party cruises start at $200/hour with a 4-hour minimum. Day Tripper From $200/hr (14 guests), Meeseeks and The Irony From $225/hr (25-30 guests), Clever Girl From $250/hr (50-75 guests). A typical 4-hour Saturday engagement party cruise with 35 guests on Clever Girl totals $1,500-$2,200. Catering billed separately. Ultimate decor package adds $250-$350 flat.
        </p>
      </section>
    </V2PageTemplate>
  );
}
