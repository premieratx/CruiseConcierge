import V2PageTemplate from '@/components/V2PageTemplate';

export default function WeddingAnniversaryIdeasV2() {
  const faqs = [
    {
      q: 'What are the best wedding anniversary celebration ideas in Austin?',
      a: 'The best Austin wedding anniversary ideas include: a private Lake Travis sunset cruise (romantic and unforgettable), dinner at Uchi or Hestia with a surprise, a Texas Hill Country wine tour, Zilker Park picnic with Austin skyline views, and a couples spa day at Lake Austin Spa Resort. Among these, a private Lake Travis anniversary cruise is the most memorable — it combines sunset, privacy, BYOB champagne, and a Hill Country backdrop.'
    },
    {
      q: 'What is a unique anniversary celebration idea?',
      a: 'A private Lake Travis sunset cruise is the most unique Austin anniversary idea. Unlike a restaurant dinner, you get 4+ hours of private time on the water with your own licensed captain, BYOB champagne, optional vow renewal, and a swim stop in a scenic cove. Premier Party Cruises has hosted hundreds of anniversary celebrations — from 1st to 60th — on Lake Travis since 2009.'
    },
    {
      q: 'What should we do for a 1st wedding anniversary?',
      a: 'A 1st wedding anniversary Austin idea: book an intimate 4-hour sunset cruise on Day Tripper (our 14-guest boat). Bring the top tier of your wedding cake from the freezer (tradition!), saved wedding champagne, and a curated playlist of songs from your wedding. BYOB allows total personalization. Costs approximately $800-$1,200 for a 4-hour couple cruise.'
    },
    {
      q: 'What should we do for a 10th wedding anniversary?',
      a: 'A 10th wedding anniversary Austin idea: host a dinner cruise on Meeseeks or The Irony (25-30 guests) with the original wedding party. Recreate a toast, view wedding photos on the premium sound system screen, and enjoy catered dinner at a scenic cove sunset. Popular add-ons: professional photographer, vow renewal at the anchor point, and a playlist of songs from the past decade.'
    },
    {
      q: 'What should we do for a 25th wedding anniversary?',
      a: 'A 25th wedding anniversary Austin idea: book Clever Girl (50-75 guests) for a silver anniversary party with children, extended family, and lifelong friends. Include a vow renewal at the scenic cove, catered dinner, speeches from children and siblings, and dancing under 14 disco balls. Typical 4-hour cruise runs $1,500-$2,200. Add the Ultimate decor package ($250-$350 flat) for premium styling.'
    },
    {
      q: 'What should we do for a 50th wedding anniversary?',
      a: 'A 50th wedding anniversary Austin idea: golden anniversary cruise on Clever Girl with 40-75 guests — three generations, original wedding party members, and lifelong friends. Sunset vow renewal at the scenic cove, plated dinner catered by Terry Black\'s BBQ or Jack Allen\'s Kitchen, and a slideshow of 50 years of photos. Many couples bring the original wedding music and bouquet style.'
    },
    {
      q: 'What is a romantic anniversary idea for just two?',
      a: 'Book a private 4-hour sunset cruise on Day Tripper for just the two of you. You get the entire 14-guest boat with a licensed captain and crew who gives you privacy. BYOB your favorite champagne and a catered dinner from your favorite Austin restaurant. Anchor at a scenic cove, toast at sunset, and swim under the stars. The Austin romantic anniversary experience.'
    },
    {
      q: 'Can we renew our vows during an anniversary cruise?',
      a: 'Yes. Our captains can conduct a brief vow renewal ceremony at the scenic cove anchor point during any anniversary cruise. Bring vows you\'ve written, original wedding music, and any wedding party members you\'d like present. A beautiful Austin vow renewal alternative to a formal venue. Popular for 10th, 25th, and 50th anniversaries.'
    },
    {
      q: 'What do people give as anniversary gifts in Austin?',
      a: 'Traditional wedding anniversary gifts: 1st paper, 5th wood, 10th tin/aluminum, 25th silver, 50th gold. Modern alternatives: experiences like a private Lake Travis anniversary cruise, Austin spa getaways, Hill Country wine tours, and custom Austin skyline artwork. The experience of a private sunset cruise creates memories that outlast most physical gifts.'
    },
    {
      q: 'What is the best anniversary dinner in Austin?',
      a: 'Top Austin anniversary dinner restaurants: Uchi (omakase), Hestia (fine dining), Jeffrey\'s (classic Austin), Olamaie (modern Southern), and Barley Swine (tasting menu). For a unique anniversary dinner, a private Lake Travis cruise with catered dinner from these same restaurants delivered to the boat gives you sunset views, privacy, and the same caliber food. Party On Delivery coordinates the logistics.'
    },
    {
      q: 'How much does an Austin anniversary celebration cost?',
      a: 'Anniversary celebration ideas Austin: a fine dining dinner for two costs $250-$500. A private Lake Travis anniversary cruise (couple only, 4 hours on Day Tripper) costs $800-$1,200 total. A milestone anniversary party (25th or 50th) with 30-50 guests on Clever Girl costs $1,500-$2,500 for the boat charter plus catering. Private cruises offer more memorable value per dollar.'
    },
    {
      q: 'When is the best time for an Austin anniversary celebration?',
      a: 'The best months for an Austin anniversary celebration on Lake Travis: March-October for peak sunset cruising (sunsets 7:30-8:30 PM). Fall anniversaries (October-November) have the most comfortable lake weather. December/January offer lowest pricing and cozy private cruises. Sunday brunch cruises are popular for low-key anniversary days. Book 2-6 months ahead.'
    },
    {
      q: 'What activities can we do on an anniversary cruise?',
      a: 'Anniversary cruise activities on Lake Travis: sunset toasts at a scenic cove, vow renewal ceremony, swimming in crystal-clear water, floating on giant lily pads, catered dinner on the water, dancing under 14 disco balls (Clever Girl), professional photography, speeches from children and friends, and stargazing on the ride back to the marina.'
    },
    {
      q: 'Where is the best place to celebrate an anniversary in Austin?',
      a: 'The best place for an Austin anniversary celebration is Lake Travis — specifically a private boat charter from Anderson Mill Marina (25 minutes from downtown). It combines Texas Hill Country scenery, sunset views, privacy, BYOB flexibility, and optional vow renewal into one 4-hour experience. Unlike restaurants or hotels, the entire venue is yours alone for the cruise.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/wedding-anniversary-ideas-v2"
      pageTitle="Wedding Anniversary Ideas Austin | Celebration Planning | Premier Party Cruises"
      pageDescription="The best wedding anniversary celebration ideas in Austin — private Lake Travis cruises, sunset toasts, vow renewals, milestone parties. Ideas for 1st through 50th anniversaries. 25 min from downtown."
      heroEyebrow="Anniversary Ideas · Lake Travis · Since 2009"
      heroHeadline={<>Wedding anniversary <em>ideas</em> Austin</>}
      heroBody="The best wedding anniversary celebration ideas in Austin — from intimate 1st anniversary sunset cruises to 50th anniversary vow renewals on Lake Travis. Private boat charters, BYOB, Hill Country sunsets. 25 minutes from downtown."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '#fleet' }}
      faqs={faqs}
      finalCtaHeadline={<>The Austin anniversary <em>idea</em> worth booking.</>}
      finalCtaBody="Book your Lake Travis anniversary cruise — the Austin anniversary celebration idea that beats every restaurant, every hotel, every predictable anniversary dinner."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">Best Anniversary Ideas</div>
        <h2 className="hp2-section__headline">
          The anniversary idea Austin couples <em>actually</em> remember.
        </h2>
        <p className="hp2-section__body">
          Every year you\'re asked: what should we do for our anniversary? The restaurants blur together after a decade. Hotel stays feel generic. A private Lake Travis anniversary cruise is the Austin anniversary celebration idea that actually sticks — sunset on the water, BYOB champagne, optional vow renewal at a scenic cove, and a private boat for 4+ hours with just the two of you or 75 of your closest people. Premier Party Cruises has hosted anniversary celebrations for Austin couples from 1st to 60th anniversaries since 2009.
        </p>
        <p className="hp2-section__body">
          The best Austin anniversary ideas combine three things: a memorable setting, meaningful privacy, and flexibility to personalize. A Lake Travis cruise delivers all three. You choose the boat (14 to 75 guests), the duration (4-hour minimum), the catering (Austin\'s top restaurants via Party On Delivery), and the music (your wedding playlist). We handle captain, crew, coolers, and logistics. You just show up with your person (or people) and celebrate.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Ideas By Milestone</div>
          <h2 className="hp2-section__headline">
            Every anniversary, <em>reimagined</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">1st–10th: Couple Sunset Cruise</div>
              <div className="hp2-feature-card__desc">Intimate 4-hour Day Tripper charter. Wedding cake top tier, saved champagne, wedding playlist. Just the two of you.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">25th: Silver Anniversary Party</div>
              <div className="hp2-feature-card__desc">Clever Girl with children, extended family, wedding party. Sunset vow renewal, catered dinner, dancing under 14 disco balls.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">50th: Golden Anniversary</div>
              <div className="hp2-feature-card__desc">Three generations aboard. Slideshow of 50 years, original wedding music, vow renewal. The anniversary they&rsquo;ll never forget.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Anniversary idea <em>budgets</em>.
        </h2>
        <p className="hp2-section__body">
          Austin anniversary celebration cost ranges: fine-dining dinner for two ($250-$500), private couple Lake Travis cruise 4 hours ($800-$1,200), milestone 25th anniversary party on Clever Girl ($1,500-$2,500 for boat charter, plus catering). Anniversary cruises start at $200/hour with a 4-hour minimum. Day Tripper From $200/hr, Meeseeks and The Irony From $225/hr, Clever Girl From $250/hr. Add Ultimate decor package $250-$350 flat.
        </p>
      </section>
    </V2PageTemplate>
  );
}
