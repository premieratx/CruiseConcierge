import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * /what-to-bring-on-a-party-boat — practical pre-cruise content
 * page. Captures "what to bring on a party boat", "austin party
 * boat packing list", "lake travis boat party checklist" long-tails.
 * Also strong internal linking target from blog content.
 */
export default function WhatToBringPartyBoatV2() {
  const faqs = [
    {
      q: 'What should I bring on an Austin party boat?',
      a: "Essentials for every Austin party boat: sunscreen (SPF 50+ — Lake Travis sun is intense and reflects off the water), sunglasses, hat, swimsuit + cover-up, towel, waterproof phone pouch, and your BYOB drinks in CANS or PLASTIC containers only (no glass allowed on any Lake Travis vessel for safety). Wear sandals or boat shoes; skip the heels (the boat has a small step-up at the dock). Bring cash for crew tip if gratuity isn't already included in your booking. Optional: celebration items (bride/groom sash, matching outfits, birthday candles, banner).",
    },
    {
      q: 'What does Premier Party Cruises provide on every boat?',
      a: "Every Premier Party Cruises boat comes with: licensed, experienced captain + professional crew, premium marine-grade Bluetooth sound system (connect your Spotify), large coolers, USCG-approved life jackets in every adult and child size, Type IV throwable flotation, climate-controlled restroom, sun + shade seating zones, swim stop at a scenic Lake Travis cove, and full safety briefing before sailing. Essentials Package adds ice pre-stocked in coolers + 5-gallon water dispenser + cups + 6-foot food table. Ultimate Package adds giant lily pad + honor float + disco cups + bubble guns + champagne flutes + SPF-50 + plates + full party setup.",
    },
    {
      q: 'What\'s the BYOB rule on an Austin party boat?',
      a: "Cans and plastic containers only. No glass anywhere on any Lake Travis party boat (safety rule for the whole lake). Alcohol is 21+ with valid ID, enforced at boarding and throughout the cruise. Underage drinking is never permitted. Our sister company Party On Delivery can deliver your BYOB order directly to the boat so drinks are iced down and ready before you board — retail prices with 100% buyback on unopened bottles. The easiest way to do BYOB on Lake Travis.",
    },
    {
      q: 'Do I need to bring ice?',
      a: "Large coolers are included on every boat, but ice is NOT automatically pre-stocked unless you upgrade to the Essentials Package (+$100/$150/$200 by boat). Without the upgrade, bring ice yourself — or skip the hassle by ordering through Party On Delivery, which delivers iced-down drinks directly to the boat before you board.",
    },
    {
      q: 'Can I bring food on an Austin party boat?',
      a: "Yes — bring whatever your group wants in plastic containers (no glass). Popular Austin party boat food: sandwiches, charcuterie boards, chips + dip, fruit platters, tacos, pizza, BBQ. Avoid anything that requires utensils to carry and serve safely. Our Essentials Package includes a 6-foot folding table for food setup. Party On Delivery also delivers food directly to the boat — pizza, tacos, charcuterie, catering coordination.",
    },
    {
      q: 'What should I NOT bring on a Lake Travis party boat?',
      a: "Don\'t bring: glass bottles or glassware (zero-glass policy on all Lake Travis vessels), illegal substances, weapons, pets (unless a service animal with documentation), anything that could cause a safety hazard. Don\'t plan to bring your own music system — premium marine-grade Bluetooth is built into every boat, so just bring your Spotify playlist on your phone. Don\'t bring valuables you can't afford to lose to water damage (the lake is the lake). Don\'t wear anything that falls apart when wet.",
    },
    {
      q: 'What should the bride, groom, or guest of honor bring?',
      a: "For the celebration anchor — bride / groom / birthday person / retiree: bring the outfit you want photographed (matching with the group if that's the vibe), a celebration accessory (sash, crown, light-up hat, matching t-shirt), a waterproof phone or GoPro case if you want to film, and your hype energy. The ATX Disco Cruise includes a professional photographer who captures the guest of honor — brief them ahead of time if you want specific shots. Our crew also helps coordinate traditions: champagne pop, birthday-cake reveal, bouquet throw, engagement-ring reveal.",
    },
    {
      q: 'Can I bring bachelorette or bachelor party games?',
      a: "Yes — party games and pranks are encouraged. Popular Austin bach-party boat games: bachelor/bachelorette scavenger hunts, drinking games (responsibly — cans only), group photo challenges, question games for the bride/groom. Avoid games that involve open flames (candles, smoke bombs) or projectiles that could go overboard. Decorations are welcome: banners, balloons, bride/groom accessories. Our crew helps set up decor when you arrive.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/what-to-bring-on-a-party-boat"
      pageTitle="What To Bring On An Austin Party Boat · Lake Travis Packing List · Premier Party Cruises"
      pageDescription="The complete Lake Travis party boat packing list: essentials (sunscreen, swimsuit, BYOB in cans/plastic), what we provide (captain, audio, coolers, life jackets), what NOT to bring (glass, outside music systems, valuables), bride/groom specifics, and game suggestions. Everything your group needs to show up prepared."
      heroEyebrow="The Packing List"
      heroHeadline={<>What to bring on an <em>Austin party boat</em>.</>}
      heroBody="Bring: sunscreen SPF 50+, swimsuit, hat, sunglasses, BYOB in CANS or PLASTIC (no glass). We provide: captain, crew, premium Bluetooth audio, coolers, life jackets, restroom, swim stop. Order BYOB via Party On Delivery and it's on ice before you board. Skip the glass, skip the outside music system, skip the DIY coolering — we have you covered."
      primaryCta={{ text: 'Build Your Quote', href: '/quote' }}
      secondaryCta={{ text: 'See Our Fleet', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>Show up <em>prepared</em>, celebrate uninterrupted.</>}
      finalCtaBody="Pack light — we provide a lot. Order BYOB through Party On Delivery and skip the coolering entirely. Build your quote in under a minute."
    >
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {[
              { title: 'Your Group Brings', color: 'var(--hp2-gold)', items: ['Sunscreen SPF 50+ (Lake Travis sun is intense)', 'Sunglasses + hat', 'Swimsuit + cover-up + towel', 'BYOB in CANS or PLASTIC only (no glass)', 'Waterproof phone pouch', 'Sandals or boat shoes (not heels)', 'Cash for crew tip (if not included)', 'Celebration accessories (sash, crown, matching tees)'] },
              { title: 'We Provide Every Boat', color: 'var(--hp2-cream)', items: ['licensed, experienced captain + crew', 'Premium marine Bluetooth audio', 'Large coolers (BYOB)', 'USCG-approved life jackets (every size)', 'Climate-controlled restroom', 'Sun + shade seating', 'Swim stop at scenic Lake Travis cove', 'Safety briefing before sailing'] },
              { title: 'Skip The Coolering', color: 'var(--hp2-gold)', items: ['Order through Party On Delivery (our sister company)', 'Beer, wine, seltzers, spirits, mixers, ice, snacks', 'Delivered and iced on the boat before you board', 'Retail prices — no marina markup', '100% buyback on unopened bottles', 'Food delivery too (pizza, tacos, charcuterie, catering)'] },
              { title: 'Do NOT Bring', color: '#b14848', items: ['Glass bottles or glassware (zero-glass policy on Lake Travis)', 'Illegal substances', 'Weapons', 'Outside music systems (we have premium Bluetooth built in)', 'Valuables you can\'t afford to lose to water', 'Pets (service animals with docs only)', 'Anything flammable'] },
            ].map((col, i) => (
              <div key={i} style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '1.75rem', borderRadius: 14 }}>
                <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.25rem', color: col.color, marginTop: 0, marginBottom: '1rem' }}>{col.title}</h3>
                <ul style={{ color: 'var(--hp2-cream)', lineHeight: 1.7, paddingLeft: '1.25rem', margin: 0, fontSize: '0.92rem' }}>
                  {col.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
