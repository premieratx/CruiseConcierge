import V2PageTemplate from '@/components/V2PageTemplate';

export default function ProposalCruiseV2() {
  const faqs = [
    {
      q: 'What is a proposal cruise in Austin?',
      a: 'A proposal cruise is a private party boat charter on Lake Travis booked specifically for a marriage proposal. The captain anchors at a scenic cove at sunset, the proposer asks the question against a Texas Hill Country backdrop, and the celebration begins immediately with BYOB champagne. Premier Party Cruises hosts proposal cruises from Anderson Mill Marina — 25 minutes from downtown Austin — and helps coordinate discreet details like hidden flowers, photographers, and surprise engagement party guests.'
    },
    {
      q: 'How much does a proposal cruise cost in Austin?',
      a: 'Proposal cruises on Lake Travis start at $200/hour with a 4-hour minimum. Day Tripper (14 guests) at From $200/hr is the most popular for intimate proposals — approximately $800-$1,200 total for a 4-hour sunset proposal cruise. For surprise proposals followed by engagement party, Meeseeks or The Irony (25-30 guests) at From $225/hr work well. Custom proposal packages with flowers, photographer, and champagne setup available.'
    },
    {
      q: 'What is the best proposal location on Lake Travis?',
      a: 'The best Lake Travis proposal location is a private boat anchored at a scenic cove at sunset. Our captains know the most photo-worthy coves with limestone cliff backdrops, crystal-clear water, and privacy from other boats. Popular proposal anchor points include coves near Devil\'s Cove and the canyons near Hippie Hollow. The Texas Hill Country sunset lighting is unmatched.'
    },
    {
      q: 'Can you help plan a surprise proposal?',
      a: 'Absolutely — we have planned hundreds of surprise proposals on Lake Travis. Call us in advance with your vision: hidden flowers pre-set on the boat, champagne chilled before boarding, a photographer aboard (posed as crew or a "friend"), signage hidden below deck, and a signal to the captain for anchor timing at sunset. Discreet coordination is our specialty.'
    },
    {
      q: 'Can we have a photographer on the proposal cruise?',
      a: 'Yes — proposal photographers are one of our most-requested additions. We partner with Austin engagement photographers who ride along, stay discreet until the moment, and capture the entire proposal from the initial question through the champagne toast. Professional proposal photography packages typically cost $400-$800 separate from the cruise.'
    },
    {
      q: 'How long is a proposal cruise?',
      a: 'Proposal cruises run 4 hours minimum. A typical timeline: 5:30 PM boarding (or earlier in winter), 6 PM departure, cruise to scenic cove, 7 PM anchor and sunset proposal, 8 PM champagne celebration and photos, 9 PM-ish return to Anderson Mill Marina. Longer cruises (5-6 hours) work well when combining proposal with surprise engagement party pickup at a second dock.'
    },
    {
      q: 'Is BYOB allowed for a proposal cruise?',
      a: 'Yes, all Premier Party Cruises are 100% BYOB including proposal cruises. Bring the champagne you\'ll use for the toast (many proposers bring a bottle specifically chosen for the moment), wine, signature cocktails, and non-alcoholic options. Cans and plastic containers only (no glass for safety). Coolers with ice provided. Chill the champagne on the boat before boarding for the perfect moment.'
    },
    {
      q: 'Can we combine the proposal with an engagement party?',
      a: 'Yes — surprise proposal followed by engagement party cruises are one of our most magical bookings. One configuration: propose early in the cruise (just the two of you), then pick up surprise engagement party guests at the dock for a celebration cruise. Another: bring everyone aboard as "a friends cruise," propose at the scenic cove, and celebrate immediately. Call us to coordinate.'
    },
    {
      q: 'What is the best boat for a proposal?',
      a: 'Day Tripper (14-guest capacity) is our most popular proposal boat — intimate, private, and romantic for a couple-only proposal. After the proposal, it fits close family and friends for a mini engagement party. Meeseeks (25-30) works for surprise engagement party configurations. Clever Girl (50-75) fits large surprise engagement parties immediately after a private proposal moment.'
    },
    {
      q: 'What time is best for a proposal cruise?',
      a: 'Sunset is the ideal proposal time. Peak season (March-October), sunset falls 7:30-8:30 PM — book a 5:30 or 6 PM departure so you\'re anchored at the cove 45 minutes before sunset for photos and proposal. Winter months (November-February), sunset is closer to 5:45 PM — book a 4 PM departure. Texas Hill Country golden-hour light is unmatched.'
    },
    {
      q: 'Where do proposal cruises depart from?',
      a: 'All proposal cruises depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641 — approximately 25 minutes from downtown Austin. Free parking. Arrive 15-20 minutes before scheduled departure. This is the closest Lake Travis marina to downtown Austin and major hotels, making it easy to coordinate a surprise without raising suspicion.'
    },
    {
      q: 'Can we have flowers and decor for the proposal?',
      a: 'Yes. Many proposers arrange hidden flower setups — rose petals arranged on the deck at the cove, a floral arch at the anchor point, or a pre-set flower arrangement revealed at sunset. Add our Ultimate decor package ($250-$350 flat) for premium styling, or coordinate with your own florist. We keep setups discreet until the proposal moment.'
    },
    {
      q: 'What if she says no or says yes emotionally?',
      a: 'Our crew is trained to read the moment. After a "yes," the crew triggers the champagne toast, turns on a celebration playlist, and heads to the sunset photo cove. The mood celebrates without feeling scripted. The captain maintains discretion regardless of outcome. Your comfort and emotional space are the priority — that\'s why private boats beat restaurants for proposals.'
    },
    {
      q: 'How far in advance should I book a proposal cruise?',
      a: 'We recommend 4-8 weeks in advance for Saturday peak season dates (March-October), 2-4 weeks for weekday proposals and off-season. Last-minute proposals (within 7 days) sometimes work — call (512) 488-5892 to check availability. For milestone dates like Valentine\'s Day or anniversary proposals, book 2-3 months ahead.'
    },
    {
      q: 'Do you provide a ring holder or proposal signage?',
      a: 'On request. We\'ve hidden ring boxes in champagne ice buckets, attached "Will you marry me?" signage to the front of the boat revealed at the cove, and pre-set rose-petal messages on the deck. Every proposal is custom — share your vision and we coordinate discreet setup before boarding.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/proposal-cruise-v2"
      pageTitle="Proposal Cruise Austin | Lake Travis Marriage Proposal | Premier Party Cruises"
      pageDescription="Plan the perfect Lake Travis proposal on a private boat cruise. Sunset at a scenic cove, BYOB champagne, hidden flowers, photographer coordination. 25 minutes from downtown Austin. Make it unforgettable."
      heroEyebrow="Proposal Cruise · Lake Travis · Since 2009"
      heroHeadline={<>The <em>perfect</em> proposal on Lake Travis</>}
      heroBody="The Austin proposal cruise on Lake Travis — a private sunset charter with hidden flowers, chilled champagne, a photographer posing as crew, and an anchor at the most scenic cove. The proposal she\'ll tell the story of forever. 25 minutes from downtown Austin."
      primaryCta={{ text: 'Get Quote', href: '/chat' }}
      secondaryCta={{ text: 'View Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Ask the <em>question</em> on Lake Travis.</>}
      finalCtaBody="Book your private proposal cruise and ask the most important question against a Texas Hill Country sunset. Licensed captains, BYOB champagne, hidden flower coordination, photographer add-ons."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">The Proposal Cruise</div>
        <h2 className="hp2-section__headline">
          The Austin proposal she\'ll tell the story of <em>forever</em>.
        </h2>
        <p className="hp2-section__body">
          A proposal cruise on Lake Travis is the Austin proposal idea that actually works. The captain pilots you to the most scenic cove on the lake, anchors 30 minutes before sunset, and gives you privacy at the bow. You pull out the ring against a Texas Hill Country sunset backdrop, surrounded by limestone cliffs and crystal-clear water. Our partner photographer (pre-coordinated, riding along as crew) captures the entire moment. When she says yes, the champagne is already chilled, the playlist cues, and the real celebration begins.
        </p>
        <p className="hp2-section__body">
          Premier Party Cruises has coordinated hundreds of marriage proposals on Lake Travis since 2009. Our captains know the best anchor points, our crew stays discreet until the moment, and our coordinators handle the details — hidden flowers, champagne placement, photographer timing, and optional surprise engagement party pickup at a second dock. Call (512) 488-5892 to share your vision.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">What We Handle</div>
          <h2 className="hp2-section__headline">
            Every proposal detail, <em>coordinated</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Scenic Cove Anchor</div>
              <div className="hp2-feature-card__desc">Captain knows Lake Travis&rsquo;s most photo-worthy coves with limestone cliffs and crystal-clear water. Perfect sunset positioning.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">Hidden Flowers & Decor</div>
              <div className="hp2-feature-card__desc">Rose petals, flower arches, hidden signage — pre-set before boarding and revealed at the proposal moment. Add the Ultimate package for full styling.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">Photographer & Champagne</div>
              <div className="hp2-feature-card__desc">Austin engagement photographer coordination. BYOB champagne chilled on ice before boarding. Crew triggers celebration playlist after "yes."</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Pricing</div>
        <h2 className="hp2-section__headline">
          Proposal cruise <em>pricing</em>.
        </h2>
        <p className="hp2-section__body">
          Lake Travis proposal cruises start at $200/hour with a 4-hour minimum. Day Tripper (most popular for intimate proposals) From $200/hr — typically $800-$1,200 total for a 4-hour sunset proposal cruise. Add photographer ($400-$800 separate), Ultimate decor package ($250-$350 flat) for premium styling, and optional surprise engagement party boat upgrade. All rates include licensed captain, trained crew, sound system, coolers (BYOB — bring ice or order pre-iced from Party On Delivery), and safety gear.
        </p>
      </section>
    </V2PageTemplate>
  );
}
