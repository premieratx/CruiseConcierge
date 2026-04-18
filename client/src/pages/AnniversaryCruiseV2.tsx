import V2PageTemplate from '@/components/V2PageTemplate';

export default function AnniversaryCruiseV2() {
  const faqs = [
    {
      q: 'What is an anniversary cruise on Lake Travis?',
      a: 'An anniversary cruise is a private party boat charter on Lake Travis booked to celebrate a wedding anniversary — from intimate 2-person couple cruises on Day Tripper to 50+ guest milestone anniversary parties on Clever Girl. Premier Party Cruises hosts anniversary cruises from Anderson Mill Marina with BYOB champagne, sunset toasts, catering coordination, and a scenic swim stop. 25 minutes from downtown Austin.'
    },
    {
      q: 'How much does an anniversary cruise cost in Austin?',
      a: 'Anniversary cruises on Lake Travis start at $200/hour with a 4-hour minimum. Day Tripper (14 guests) runs From $200/hr — perfect for intimate couple or small family anniversary cruises. Meeseeks or The Irony (25-30) run From $225/hr. Clever Girl (50-75) runs From $250/hr for milestone anniversary parties. Total for a 4-hour couple anniversary cruise runs approximately $800-$1,200.'
    },
    {
      q: 'What anniversaries are most popular for a Lake Travis cruise?',
      a: 'The most popular anniversary cruises are 10th, 25th, 40th, and 50th wedding anniversaries — milestone years worth celebrating with extended family and friends. 1st anniversary couple cruises are also common as a romantic weekend getaway. Any anniversary year works — we see couples celebrating everything from 5th to 60th anniversaries on Lake Travis.'
    },
    {
      q: 'Can we book a private anniversary cruise for just two?',
      a: 'Yes. Day Tripper (our 14-guest boat) is often booked by couples for intimate anniversary cruises. The 4-hour minimum at from $200/hour gives you the entire boat, licensed captain, BYOB champagne, sunset swim stop, and privacy for a romantic anniversary evening. Popular for 1st, 5th, and romantic-retreat anniversaries.'
    },
    {
      q: 'Is BYOB allowed on an anniversary cruise?',
      a: 'Yes, all Premier Party Cruises are 100% BYOB including anniversary cruises. Bring the champagne from your wedding (many couples save a bottle), wine you shared on past anniversaries, or new favorites. Cans and plastic containers only (no glass for safety). We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) on every boat. No corkage fees.'
    },
    {
      q: 'How many guests fit on an anniversary cruise?',
      a: 'Our four boats accommodate 2 to 75 guests. For couple cruises, Day Tripper (14 capacity) gives intimate space. Meeseeks and The Irony (25-30) fit immediate family anniversary parties. Clever Girl (50-75) is ideal for milestone 25th/50th anniversary parties with children, grandchildren, siblings, and lifelong friends.'
    },
    {
      q: 'What is included in an anniversary cruise?',
      a: 'Every anniversary cruise includes a US Coast Guard licensed captain, trained crew, premium Bluetooth sound system, large coolers (bring your own ice, or order pre-iced from Party On Delivery), a swim stop in a scenic cove, and all safety equipment. BYOB drinks and food welcome. Optional Ultimate decor package ($250-$350 flat) adds premium anniversary-themed styling, linens, and custom signage.'
    },
    {
      q: 'Can we have a sunset anniversary cruise?',
      a: 'Yes — sunset anniversary cruises are our most romantic option. Peak season (March-October), book a 5:30 or 6 PM departure for sunset toasts at the scenic cove. Winter anniversary cruises (November-February), book a 4 PM departure. The Texas Hill Country sunset over Lake Travis is unforgettable for anniversary photos.'
    },
    {
      q: 'Can we have catered dinner for the anniversary?',
      a: 'Yes. We coordinate catering through Party On Delivery (Terry Black\'s BBQ, Jack Allen\'s Kitchen, private chefs) or work directly with your caterer. Plated anniversary dinners, family-style, or buffet all work. Bring your own favorite foods from anniversary traditions. Our crew helps with setup. Catering is separate from boat charter pricing.'
    },
    {
      q: 'Where do anniversary cruises depart?',
      a: 'All anniversary cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — approximately 25 minutes from downtown Austin. Free parking. Arrive 15-20 minutes before scheduled departure. Closest Lake Travis marina to downtown Austin hotels, perfect for out-of-town anniversary guests.'
    },
    {
      q: 'Can we decorate the boat for the anniversary?',
      a: 'Yes. Bring photos from the wedding, anniversary signs, banners, flower arrangements, and custom decor. Popular anniversary themes: "Then and Now" photo displays, "Cheers to [X] Years" banners, original wedding colors. Add the Ultimate package ($250-$350 flat) for curated premium decor if you prefer we handle it.'
    },
    {
      q: 'What\'s the best boat for a milestone anniversary party?',
      a: 'Clever Girl (50-75 guests) is the flagship choice for 25th, 40th, and 50th anniversary parties — 14 disco balls, dance floor, premium sound, dedicated dining space. Meeseeks or The Irony (25-30) work for mid-size anniversary parties with extended family. Day Tripper (14) suits 1st or 5th anniversary immediate-family cruises.'
    },
    {
      q: 'How far in advance should I book?',
      a: 'We recommend 2-4 months for weekday or Sunday dates, 4-6 months for Saturday peak season (March-October). For milestone 25th/50th anniversary parties, 6 months ensures boat preference. Off-season (November-February), 4-6 weeks typically works. Call (512) 488-5892 or book online for availability.'
    },
    {
      q: 'Can we recreate our wedding on the anniversary cruise?',
      a: 'Absolutely — many milestone anniversaries include vow renewals on the water. The captain conducts brief vow renewal ceremonies at the scenic cove against a Hill Country sunset backdrop. Bring wedding photos, original music, and wedding party members for a meaningful recreation. A beautiful alternative to a traditional anniversary dinner.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/anniversary-cruise-v2"
      pageTitle="Anniversary Cruise Austin | Lake Travis Private Charter | Premier Party Cruises"
      pageDescription="Celebrate your wedding anniversary on Lake Travis. Private anniversary cruises from intimate couple charters to 50+ guest milestone parties. BYOB, sunset toasts, vow renewals. 25 min from downtown Austin."
      heroEyebrow="Anniversary · Lake Travis · Since 2009"
      heroHeadline={<>Anniversary cruises on <em>Lake Travis</em></>}
      heroBody="Celebrate your wedding anniversary on Lake Travis — from intimate couple cruises on our 14-guest Day Tripper to 50+ guest milestone anniversary parties on Clever Girl. Sunset toasts, vow renewals, and BYOB champagne. 25 minutes from downtown Austin."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Celebrate another <em>year</em> together.</>}
      finalCtaBody="Book your Austin anniversary cruise on Lake Travis — from intimate couple getaways to milestone 25th and 50th celebrations. Private charters, BYOB, sunset toasts, optional vow renewals."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">The Anniversary Cruise</div>
        <h2 className="hp2-section__headline">
          An anniversary Lake Travis <em>never</em> forgets.
        </h2>
        <p className="hp2-section__body">
          Anniversary cruises on Lake Travis range from intimate 1st anniversary couple getaways to milestone 50th anniversary parties with three generations aboard. Premier Party Cruises hosts private anniversary charters from Anderson Mill Marina (25 minutes from downtown Austin) with BYOB champagne, sunset swim stops, catered dinner coordination, and optional vow renewals at the scenic cove. The entire boat is yours for 4+ hours — no sharing, no schedule conflicts, just your anniversary.
        </p>
        <p className="hp2-section__body">
          Many couples celebrate their original wedding anniversary on the same lake they honeymooned at decades ago. Others use Clever Girl (our 75-guest flagship with 14 disco balls) for surprise milestone anniversary parties with children, grandchildren, siblings, and lifelong friends. Smaller anniversaries fit beautifully on Day Tripper (14 guests) or Meeseeks (25-30). Whatever the year, we build the cruise around your story.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What Makes It Memorable</div>
          <h2 className="hp2-section__headline">
            Anniversary details, <em>curated</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Sunset Toasts on Water</div>
              <div className="hp2-feature-card__desc">Captain anchors at a scenic Lake Travis cove. Champagne toast at golden hour against Hill Country sunset. Anniversary photos that actually get printed.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">Optional Vow Renewal</div>
              <div className="hp2-feature-card__desc">Captain conducts brief vow renewal ceremonies at the scenic cove. Bring original wedding music, photos, and wedding party for a meaningful recreation.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">BYOB Champagne & Catering</div>
              <div className="hp2-feature-card__desc">Bring saved wedding champagne, favorite wines, signature cocktails. Catering coordinated through Party On Delivery or your own vendor.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Anniversary cruise <em>rates</em>.
        </h2>
        <p className="hp2-section__body">
          Lake Travis anniversary cruises start at $200/hour with a 4-hour minimum. Day Tripper (intimate couple or family) From $200/hr, Meeseeks and The Irony (extended family) From $225/hr, Clever Girl (milestone parties) From $250/hr. A typical 4-hour couple anniversary cruise totals $800-$1,200. A 4-hour milestone 50th anniversary party with 45 guests on Clever Girl totals approximately $1,600-$2,200. Catering billed separately.
        </p>
      </section>
    </V2PageTemplate>
  );
}
