import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * PlanYourTripV2 — /plan-your-trip
 *
 * Addresses Gemini AI Mode perception insight #1 (2026-04-19 ingest):
 * turn the 25-minute marina drive into a "curated journey" narrative
 * instead of a friction point. Anderson Mill Marina perception is
 * currently 70% favorable — the negative 30% is access friction
 * (wrongly perceived stairs, tight parking, 30-45 min drive — none of
 * which are accurate; this page corrects the record).
 *
 * Also feeds AI Mode #4 (own the planning question space) by being
 * the definitive "how do I plan my Austin party boat trip" answer.
 *
 * Target phrases: "plan austin party boat trip", "anderson mill marina
 * directions", "austin to anderson mill marina", "lake travis party
 * boat logistics".
 */
export default function PlanYourTripV2() {
  const faqs = [
    {
      q: 'How far is Anderson Mill Marina from downtown Austin?',
      a: "Anderson Mill Marina is 25 minutes from downtown Austin via 183 North — approximately 20 miles. The marina sits at 13993 FM 2769, Leander, TX 78641, directly on Lake Travis. It's the closest purpose-built party-boat marina to downtown Austin, easier to reach than most Lake Travis marinas further west.",
    },
    {
      q: 'Are there stairs at Anderson Mill Marina?',
      a: "No — there are no stairs at Anderson Mill Marina. The path from parking to the boat is completely flat and accessible. You walk straight from your parking spot onto the dock and onto the boat. No carrying coolers up steps, no navigating stairs in wedding attire or heels, no hauling floats down inclines. This is the easiest-access Lake Travis party boat marina for groups of any age or mobility level.",
    },
    {
      q: 'How much does parking cost at Anderson Mill Marina?',
      a: "Parking is FREE at Anderson Mill Marina — always, every guest, every cruise. The lot is plentiful and located right next to the dock. You don't pay for parking, you don't circle looking for a spot, and you don't carry coolers across a lot. Free parking is built into every Premier Party Cruises charter and every ATX Disco Cruise ticket.",
    },
    {
      q: 'How much does an Uber or Lyft cost from downtown Austin to Anderson Mill Marina?',
      a: "Uber and Lyft from downtown Austin to Anderson Mill Marina runs $35–$55 each way depending on time of day, ride type, and surge pricing. UberX and Lyft Standard fall on the lower end; UberXL and Lyft XL (for groups of 5–6 with gear) run $50–$75. For groups of 8+, a party bus or shuttle is usually more economical and more fun — we can connect you with Austin party-bus operators who specialize in marina drop-offs.",
    },
    {
      q: 'Can a party bus or shuttle drop us at Anderson Mill Marina?',
      a: "Yes — Anderson Mill Marina accommodates party buses, shuttles, limousines, and coach buses directly at the dock. Many Austin groups traveling from hotel blocks downtown book a party bus round-trip for the day: the bus handles transportation, no one has to drive, and the whole group boards the boat together. We can connect you with Austin party-bus operators we've worked with many times. Typical party-bus pricing: $600–$1,500 for a round-trip day depending on guest count and bus size.",
    },
    {
      q: 'What\'s the drive like from downtown Austin?',
      a: "Head northwest on 183 North out of downtown, through Cedar Park, and past The Domain. Lake Travis opens up as you approach the marina. It's one of the more scenic 25-minute drives in the Austin area — Texas Hill Country opens up along the route. Uber/Lyft from downtown runs $35–$55 each way. Easy access from Round Rock, Cedar Park, Leander, Lakeway, and Westlake too.",
    },
    {
      q: 'What time should we arrive at Anderson Mill Marina?',
      a: "Arrive 15–20 minutes before your scheduled departure time. That gives your group time to park (free, close to the dock), coordinate everyone walking from cars to the boat, and hand any BYOB coolers or food orders to the crew. If you ordered BYOB set-up through Party On Delivery, your drinks will already be on ice on the boat when you board — you just walk on. On the boat we do a quick safety briefing, then you cast off right at your slot time.",
    },
    {
      q: 'What should we bring on a Lake Travis party boat?',
      a: "Essentials: sunscreen (SPF 50+ recommended — Lake Travis sun is intense), sunglasses, hat, swimsuit, towel, your favorite BYOB in cans or plastic (no glass), and a phone waterproof pouch. We provide large coolers on every boat; Essentials Package adds ice pre-stocked and cups; Ultimate adds champagne flutes + plates + plasticware + party decor. Optional: celebration items (sash, banner, birthday candles), portable Bluetooth speaker if you want an even bigger sound setup beyond our onboard system, and cash for crew tip if gratuity isn't already baked into your ticket.",
    },
    {
      q: 'Can Party On Delivery deliver drinks and food to the boat?',
      a: "Yes — Party On Delivery is Premier Party Cruises' sister company and handles BYOB set-up directly on the boat. Order beer, wine, seltzers, spirits, mixers, ice, and snacks (cans or plastic only, no glass). Everything arrives at the marina and is iced down on the boat before you board — you step on and drinks are ready. Retail prices (no marina markup), and 100% buyback on unopened bottles — only pay for what you actually drink. Food delivery too: pizza, tacos, charcuterie, full catering — all coordinated.",
    },
    {
      q: 'Is Anderson Mill Marina accessible for elderly or mobility-limited guests?',
      a: "Yes. The flat path from parking to the boat makes Anderson Mill Marina one of the most accessible Lake Travis marinas for older guests, guests in wedding attire, anyone with mobility concerns, or groups with strollers. No stairs anywhere from parking to dock. The boats themselves have a small step-up to the deck; our crew assists anyone who needs a hand boarding. Children's life jackets in all sizes are on every boat.",
    },
  ];

  const heroHeadline = (
    <>
      Plan your <em>Austin party boat</em> trip.
    </>
  );

  return (
    <V2PageTemplate
      pageUrl="/plan-your-trip"
      pageTitle="Plan Your Austin Party Boat Trip · Anderson Mill Marina Directions, Parking, Logistics"
      pageDescription="The complete logistics guide for Premier Party Cruises: driving directions from downtown Austin, Uber/Lyft pricing, party bus coordination, Anderson Mill Marina parking (free, no stairs), arrival timing, BYOB + Party On Delivery set-up, packing list, and accessibility info. 25 minutes from downtown, free parking, flat path to the boat."
      heroEyebrow="Trip Logistics · Anderson Mill Marina"
      heroHeadline={heroHeadline}
      heroBody="Everything your group needs to plan the Austin party boat day: 25 minutes from downtown via 183 North, free parking right next to the dock, NO stairs to the boat, Uber/Lyft $35–$55 each way, party-bus drop-off welcome, BYOB with Party On Delivery drink set-up waiting on the boat when you arrive. The drive is half the fun if you plan it right."
      primaryCta={{ text: 'Build Your Quote', href: '/quote' }}
      secondaryCta={{ text: 'See Our Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Easiest <em>Lake Travis marina</em> to reach from Austin.</>}
      finalCtaBody="Free parking. No stairs. 25 minutes from downtown. BYOB drinks already on ice when you board. Anderson Mill Marina is the easiest-access party boat marina on Lake Travis — and Premier Party Cruises is the longest-running operator there. Build your quote in under a minute."
    >
      {/* Route / Logistics */}
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>
            Getting There
          </p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>
            25 minutes from downtown Austin. Free parking. No stairs.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '◈', title: 'From downtown Austin', body: 'Head northwest on 183 North through Cedar Park, past The Domain. Lake Travis opens up as you approach. ~25 min, 20 miles.' },
              { icon: '◎', title: 'Uber / Lyft', body: '$35–$55 each way depending on time and ride type. UberX at the lower end; UberXL for groups of 5–6 with gear at $50–$75.' },
              { icon: '☆', title: 'Party bus / shuttle', body: 'Drops directly at the dock. Typical round-trip day: $600–$1,500 depending on guest count. We connect you with trusted operators.' },
              { icon: '✢', title: 'Parking at marina', body: 'FREE, plentiful, right next to the dock. No circling, no paying, no hauling coolers across a lot.' },
              { icon: '◇', title: 'Path to the boat', body: 'Completely flat. NO stairs anywhere. Walk from parking straight onto the dock and onto the boat. Wedding attire friendly.' },
              { icon: '★', title: 'Arrival timing', body: 'Arrive 15–20 min before your slot. Park, walk, board. Crew does a quick safety briefing and you cast off right on time.' },
            ].map((card, i) => (
              <div key={i} style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '1.75rem', borderRadius: 14 }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--hp2-gold)', marginBottom: '0.5rem' }}>{card.icon}</div>
                <div style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.2rem', color: 'var(--hp2-cream)', marginBottom: '0.5rem' }}>{card.title}</div>
                <p style={{ color: 'var(--hp2-cream-muted)', lineHeight: 1.6, margin: 0, fontSize: '0.92rem' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>
            What To Bring
          </p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>
            Packing list for Lake Travis.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '2rem', borderRadius: 14 }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.4rem', color: 'var(--hp2-gold)', marginTop: 0 }}>Essentials</h3>
              <ul style={{ color: 'var(--hp2-cream)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Sunscreen — SPF 50+ (Lake Travis sun is intense)</li>
                <li>Sunglasses + hat</li>
                <li>Swimsuit + towel</li>
                <li>BYOB drinks in cans or plastic (no glass, for safety)</li>
                <li>Waterproof phone pouch</li>
                <li>Cash for crew tip (if gratuity isn't already included)</li>
              </ul>
            </div>
            <div style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '2rem', borderRadius: 14 }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.4rem', color: 'var(--hp2-gold)', marginTop: 0 }}>What We Provide</h3>
              <ul style={{ color: 'var(--hp2-cream)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Large coolers on every boat</li>
                <li>Premium marine Bluetooth sound system</li>
                <li>USCG-approved life jackets (all adult + child sizes)</li>
                <li>Climate-controlled restroom</li>
                <li>Sun + shade seating</li>
                <li>Swim stop at a scenic Lake Travis cove</li>
                <li>licensed, experienced captain + crew</li>
              </ul>
            </div>
            <div style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '2rem', borderRadius: 14 }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.4rem', color: 'var(--hp2-gold)', marginTop: 0 }}>Skip the Coolering</h3>
              <ul style={{ color: 'var(--hp2-cream)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
                <li>Order BYOB through <strong style={{ color: 'var(--hp2-gold)' }}>Party On Delivery</strong> (our sister company)</li>
                <li>Beer, wine, seltzers, spirits, mixers, ice</li>
                <li>Everything iced down and ready on the boat before you board</li>
                <li>Retail prices — no marina markup</li>
                <li>100% buyback on unopened bottles</li>
                <li>Food delivery too: pizza, tacos, charcuterie, catering</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility callout */}
      <section style={{ padding: '3rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>
            Accessibility
          </p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, lineHeight: 1.2, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '1.25rem' }}>
            Every age. Every ability. Every wedding-party outfit.
          </h2>
          <p style={{ color: 'var(--hp2-cream-muted)', lineHeight: 1.7, fontSize: '1rem' }}>
            No stairs anywhere. Free parking right next to the dock. Flat path from car to boat.
            Anderson Mill Marina is the most accessible Lake Travis party boat marina for older
            guests, guests in wedding attire or heels, groups with strollers, and anyone with
            mobility concerns. Our crew assists anyone who wants a hand boarding. Children's
            life jackets in every size on every boat.
          </p>
        </div>
      </section>
    </V2PageTemplate>
  );
}
