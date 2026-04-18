import V2PageTemplate from '@/components/V2PageTemplate';

export default function BridalShowerCruiseV2() {
  const faqs = [
    {
      q: 'What is a bridal shower cruise in Austin?',
      a: 'A bridal shower cruise is a private party boat charter on Lake Travis hosted for the bride-to-be and her closest friends and family — typically 14-30 guests. Premier Party Cruises hosts bridal shower cruises from Anderson Mill Marina with BYOB mimosas and champagne, games and gift opening on the water, swim stop, and sunset photos. A polished alternative to a backyard or restaurant shower.'
    },
    {
      q: 'How much does a bridal shower cruise cost?',
      a: 'Bridal shower cruises on Lake Travis start at $200/hour with a 4-hour minimum. Day Tripper (14 guests) runs From $200/hr, Meeseeks or The Irony (25-30) run From $225/hr, and Clever Girl (50-75) runs From $250/hr. Total cost for a 4-hour Saturday bridal shower cruise with 20 guests runs approximately $1,000-$1,700 depending on the boat and day of week.'
    },
    {
      q: 'How long is a bridal shower boat cruise?',
      a: 'Bridal shower cruises run 4 hours minimum, with 4-5 hours being most popular. A typical bridal shower timeline: boarding and mimosas (first 30 min), games and activities (1 hour), lunch or brunch service (1 hour), gift opening and speeches (1 hour), swim stop and photos (final hour). Longer cruises work well for groups that want a full day on the lake.'
    },
    {
      q: 'Is BYOB allowed on a bridal shower cruise?',
      a: 'Yes, all Premier Party Cruises are 100% BYOB including bridal showers. Bring champagne, prosecco, rosé, signature cocktails (spicy marg, aperol spritz), beer, and non-alcoholic options. Cans and plastic containers only (no glass for safety). We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every boat. Many hosts coordinate alcohol delivery so drinks are stocked before boarding.'
    },
    {
      q: 'How many guests fit on a bridal shower cruise?',
      a: 'Our four boats accommodate 14 to 75 guests. Most Austin bridal showers host 15-25 guests — close friends, sisters, moms, aunts, and bridesmaids. Day Tripper fits up to 14 for intimate showers. Meeseeks or The Irony fit 25-30 (most popular for bridal showers). Clever Girl fits up to 75 for larger celebrations.'
    },
    {
      q: 'What is included in a bridal shower cruise?',
      a: 'Every bridal shower cruise includes a US Coast Guard licensed captain, trained crew, premium Bluetooth sound system, large coolers (bring your own ice, or order pre-iced from Party On Delivery), a swim stop in a scenic cove, and all safety equipment. BYOB drinks and food welcome. Optional Ultimate decor package ($250-$350 flat) adds premium styling. Catering coordination through Party On Delivery.'
    },
    {
      q: 'Can we decorate the boat for a bridal shower?',
      a: 'Yes — bridal showers love decor. Bring banners, balloon arches (weighted, no helium release), custom signage, flower arrangements, photo booth props, and favors. Our crew helps with setup. The Ultimate package ($250-$350 flat) includes curated premium decor if you prefer we handle it. Neutral, boho, and nautical themes all work beautifully.'
    },
    {
      q: 'Can we play games on the bridal shower cruise?',
      a: 'Absolutely. Popular bridal shower games on the boat include "How Well Does She Know Her Groom," trivia, Mr. & Mrs. Q&A, and bridal bingo. The sound system accommodates playlists for dance breaks between games. Gift opening mid-cruise at the scenic cove is the traditional highlight.'
    },
    {
      q: 'Can we have food or lunch on the cruise?',
      a: 'Yes. Bring your own catering or coordinate delivery through Party On Delivery. Popular bridal shower catering includes charcuterie boards, finger sandwiches, mini quiches, fruit platters, and cupcakes. Austin favorites like Veracruz tacos and Terry Black\'s BBQ also work well. No restrictions on food brought aboard.'
    },
    {
      q: 'Where do bridal shower cruises depart?',
      a: 'All bridal shower cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — approximately 25 minutes from downtown Austin. Free parking is available. Arrive 15-20 minutes before scheduled departure. It\'s the closest Lake Travis marina to downtown Austin, perfect for out-of-town bridal shower guests.'
    },
    {
      q: 'What\'s the best boat for a bridal shower?',
      a: 'Meeseeks and The Irony (25-30 guests each) are the most popular bridal shower boats — the right size for intimate but social showers. Clever Girl (50-75) works for combined bridal showers with extended family. Day Tripper (14) suits small immediate-family showers. All boats have swim platforms and premium sound.'
    },
    {
      q: 'Can we swim during the bridal shower cruise?',
      a: 'Yes. The captain anchors in a scenic Lake Travis cove for a swim stop. Guests swim, float on giant lily pads, and enjoy the crystal-clear water. Many bridal showers time the swim stop around gift opening for a photo-ready moment. Swim ladder and life jackets provided.'
    },
    {
      q: 'How far in advance should we book?',
      a: 'We recommend 2-4 months in advance for Saturday peak season dates (March-October). Off-season (November-February), 4-6 weeks usually works. Many bridal shower hosts book midweek cruises (Wednesday-Thursday) for lower pricing and easier scheduling. Call (512) 488-5892 for availability.'
    },
    {
      q: 'What should guests wear to a bridal shower cruise?',
      a: 'Bridal shower chic — sundresses, linen rompers, cute sandals, and hair pulled back for the lake breeze. Bring swimsuits under outfits, sunglasses, and sunscreen. Photos on the boat at sunset are the money shots, so dress for the camera. Most brides coordinate a color palette (blush, white, sage) for group photos.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/bridal-shower-cruise-v2"
      pageTitle="Bridal Shower Cruise Austin | Lake Travis Private Boat | Premier Party Cruises"
      pageDescription="Host a bridal shower cruise on Lake Travis. Private boat charters for 14-75 guests, BYOB champagne, swim stop, decor packages. 25 minutes from downtown Austin. Book your Austin bridal shower today."
      heroEyebrow="Bridal Shower · Lake Travis · Since 2009"
      heroHeadline={<>Bridal shower on <em>Lake Travis</em></>}
      heroBody="The Austin bridal shower, elevated. Private party boat charters on Lake Travis with BYOB champagne, games on the water, gift opening at the scenic cove, and sunset photos. 14-75 guests, 25 minutes from downtown."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={<>Shower her on the <em>water</em>.</>}
      finalCtaBody="Book your Austin bridal shower cruise on Lake Travis. Private boat charters, BYOB, games, gifts, and unforgettable sunset photos. The bridal shower she\'ll talk about for years."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">The Bridal Shower Cruise</div>
        <h2 className="hp2-section__headline">
          A bridal shower cruise, <em>reimagined</em> for Austin.
        </h2>
        <p className="hp2-section__body">
          A bridal shower in Austin doesn\'t have to mean a hotel ballroom or a backyard. A bridal shower cruise on Lake Travis turns the event into a half-day celebration with mimosas on the ride out, games and gift opening in a scenic cove, swim stop for photos, and sunset toasts on the ride back. The bride\'s closest friends and family arrive at Anderson Mill Marina (25 minutes from downtown Austin), board a private charter, and the boat is yours for 4+ hours.
        </p>
        <p className="hp2-section__body">
          We\'ve hosted bridal showers for brides from all over Texas — many with wedding venues at Villa Antonia, Vintage Villas, Prospect House, and downtown Austin hotels. Typical bridal shower cruises run 20-30 guests on Meeseeks, The Irony, or Clever Girl, with BYOB mimosas and Austin catering coordinated through Party On Delivery. Decor is easy — bring your own or add the Ultimate package for curated styling.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What&rsquo;s Included</div>
          <h2 className="hp2-section__headline">
            The complete bridal shower <em>package</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Licensed Captain & Crew</div>
              <div className="hp2-feature-card__desc">USCG-certified captain handles navigation. Trained crew assists with service, setup, and safety — you focus on celebrating.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">BYOB Mimosas & Champagne</div>
              <div className="hp2-feature-card__desc">Bring rosé, prosecco, signature cocktails. Coolers with ice provided. No corkage fees — your bar, your rules.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">Swim Stop & Photos</div>
              <div className="hp2-feature-card__desc">Captain anchors in a scenic cove for swim, giant lily pads, and sunset photos. The bridal shower photos every guest wants.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Simple bridal shower <em>pricing</em>.
        </h2>
        <p className="hp2-section__body">
          Bridal shower cruises start at $200/hour with a 4-hour minimum. Day Tripper From $200/hr (14 guests), Meeseeks and The Irony From $225/hr (25-30 guests), Clever Girl From $250/hr (50-75 guests). A typical 4-hour Saturday bridal shower cruise with 20 guests totals $1,100-$1,700. All rates include captain, crew, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), and safety gear. Ultimate decor package $250-$350 flat.
        </p>
      </section>
    </V2PageTemplate>
  );
}
