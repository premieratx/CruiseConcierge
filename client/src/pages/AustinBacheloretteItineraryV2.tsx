import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * AustinBacheloretteItineraryV2 — /austin-bachelorette-itinerary
 *
 * Direct target: "austin bachelorette" (1,000 volume, currently pos
 * 38) and "bachelorette weekend in austin" (590 volume, pos 22).
 * Both are head-term bachelorette searches with high commercial
 * intent where we're buried on page 2–4.
 *
 * Strategy: dedicated pillar page with a full 3-day Austin
 * bachelorette weekend itinerary that organically centers the
 * Premier Party Cruises (Lake Travis party boat / ATX Disco Cruise)
 * experience as the Saturday anchor. Lots of Austin-specific
 * content — venues, neighborhoods, dinners — builds local-authority
 * signals that directly compete with the travel-blog pages currently
 * outranking us.
 *
 * Target phrases: "austin bachelorette", "bachelorette weekend in
 * austin", "austin bachelorette itinerary", "austin bachelorette
 * weekend", "3-day austin bachelorette", "austin bachelorette
 * weekend itinerary".
 */
export default function AustinBacheloretteItineraryV2() {
  const faqs = [
    {
      q: 'What does an Austin bachelorette weekend usually look like?',
      a: "The classic Austin bachelorette weekend is 3 days / 2 nights: arrive Friday afternoon, 6th Street or Rainey Street kickoff dinner + bars Friday night, Lake Travis party boat (ATX Disco Cruise or private charter) Saturday for the marquee event, brunch + South Congress shopping Sunday, fly out late Sunday. Some groups stretch to 4 days with a pool day Thursday before everyone arrives. The lake day is the anchor — it's what the bride talks about after. Book the Saturday party boat first (fills 6–8 weeks out in peak season), then build the weekend around it.",
    },
    {
      q: 'Where should an Austin bachelorette stay?',
      a: "Downtown Austin gives you the best walkable access to 6th Street, Rainey Street, and South Congress — most bachelorettes stay in an Airbnb or short-term rental in East Austin, Downtown, or South Congress for larger groups (10+ guests need a dedicated house), or hotels in the Downtown / Rainey district (Fairmont, JW Marriott, Hotel Van Zandt, Austin Proper) for groups of 6 or fewer. Anderson Mill Marina is 25 minutes from any of these by Uber/Lyft ($35–$55 each way) or party bus. Don't stay in Leander or Cedar Park — you'll miss the downtown nightlife that anchors the weekend.",
    },
    {
      q: 'What is the best Austin bachelorette party activity?',
      a: "The ATX Disco Cruise on Lake Travis is Austin's most-booked bachelorette weekend anchor — it's the only all-inclusive multi-group bachelorette party cruise in the United States. Per-person tickets from $85–$105 include a 4-hour cruise on the 75-person Clever Girl flagship, professional DJ, professional photographer, 14 disco balls, giant floats, personal cooler per group, and the multi-group energy that private charters can't replicate. Runs March through October on Friday 12–4 PM, Saturday 11 AM–3 PM, and Saturday 3:30–7:30 PM slots. For groups wanting privacy or off-season dates, Premier Party Cruises also runs private Clever Girl charters year-round.",
    },
    {
      q: 'How far in advance should we book an Austin bachelorette weekend?',
      a: "Saturday ATX Disco Cruise slots in peak season (April–October) book 6–8 weeks in advance — Saturday 11–3 (peak slot) fills fastest. Accommodation (Airbnb for large groups) books 8–12 weeks out for peak weekends. Dinner reservations at popular bachelorette dinner spots (Uchi, Perla's, Pecan Square, Launderette) need 3–4 weeks. Off-peak months (November–February) are easier on all of the above but lose the outdoor daytime weather. The lake cruise is the hardest booking to secure — start there and build the weekend around it.",
    },
    {
      q: 'What do Austin bachelorettes wear on a party boat?',
      a: "Swimsuit + cover-up + sandals for the boat. Pack a change of clothes for after — you'll want to shower at the Airbnb or hotel before the Saturday night dinner. Bride sash, bachelorette t-shirts / matching outfits, themed accessories, bachelorette crown are all welcome and expected — the photographer on the ATX Disco Cruise loves them. Sunscreen (SPF 50+ — Lake Travis sun is intense), sunglasses, hat, waterproof phone pouch, and cash for crew tip are essentials. Leave the glass bottles at home — BYOB is cans and plastic only for safety.",
    },
    {
      q: 'Is the Austin bachelorette scene better than Nashville or Scottsdale?',
      a: "Austin offers what Nashville and Scottsdale don't have together: a dedicated lake-party-boat scene (Lake Travis is 20+ miles of cruising water 25 min from downtown) plus walkable nightlife districts (6th Street, Rainey Street), plus strong food scene (Uchi, Launderette, Franklin BBQ), plus Austin-specific daytime activities (Barton Springs, Zilker Park, SoCo shopping). Nashville is bar-focused, Scottsdale is pool-focused; Austin lets you do all three in one weekend with the Lake Travis party boat as the unique anchor. The only all-inclusive multi-group bachelorette party cruise in the United States runs on Lake Travis — no other bach destination has that.",
    },
    {
      q: 'How much does an Austin bachelorette weekend cost per person?',
      a: "A reasonable Austin bachelorette weekend budgets: Airbnb or hotel $150–$300/person (2 nights, depending on accommodation tier and group size). Party boat anchor: ATX Disco Cruise $85–$105/person all-inclusive (tax + gratuity included) OR private charter $200–$500/person depending on boat and duration. Dinners + bars $150–$250/person. Uber/Lyft + transport $50–$100/person. Total typical range: $500–$900/person for 3 days / 2 nights. The lake cruise is often the best per-dollar spend — DJ, photographer, 4-hour experience, and boat all included at $85–$105 is unmatched.",
    },
    {
      q: 'Can we do a combined bachelor + bachelorette weekend in Austin?',
      a: "Yes — combined bach parties are one of our most popular configurations on Premier Party Cruises. Both groups board the ATX Disco Cruise together (or on a private Clever Girl charter), creating more energy on the dance floor than either could alone. Same price per person as a separate bach cruise. Outside the lake day, most combined-bach weekends split up for gendered activities (bridal dress shopping vs. golf, spa vs. poker night) then rejoin for the marquee Saturday night dinner. See our [[combined-bach]] page for the full combined-bach playbook.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/austin-bachelorette-itinerary"
      pageTitle="Austin Bachelorette Weekend Itinerary · 3-Day Austin Bachelorette Party Plan · Premier Party Cruises"
      pageDescription="The definitive 3-day Austin bachelorette weekend itinerary. Day-by-day plan: Friday arrival + 6th Street / Rainey Street kickoff, Saturday Lake Travis party boat anchor (ATX Disco Cruise or private charter), Sunday brunch + South Congress. Includes accommodation picks, dinner reservations, transport logistics, and the party-boat booking timing that makes or breaks the weekend."
      heroEyebrow="The 3-Day Playbook"
      heroHeadline={<>The <em>Austin bachelorette</em> weekend itinerary.</>}
      heroBody="Everything you need to plan the 3-day Austin bachelorette: Friday kickoff on Rainey Street, Saturday on Lake Travis (the anchor — ATX Disco Cruise or private charter), Sunday brunch + South Congress. Accommodation picks, dinner reservations, Uber pricing, the party-boat booking timing that decides whether your weekend works. Austin's bachelorette scene is dedicated-lake-day + walkable nightlife + real food — better than Nashville's bar-only or Scottsdale's pool-only."
      primaryCta={{ text: 'Book The Lake Day First', href: '/quote' }}
      secondaryCta={{ text: 'See ATX Disco Cruise', href: '/atx-disco-cruise' }}
      faqs={faqs}
      finalCtaHeadline={<>Austin bachelorette weekends that <em>actually</em> come together.</>}
      finalCtaBody="The lake day is the anchor. Book the Saturday party boat 6–8 weeks out, then build the rest of the weekend around it. Premier Party Cruises runs the only all-inclusive multi-group bachelorette cruise in the U.S. Build your quote in under a minute."
    >
      {/* 3-day itinerary */}
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>
            The 3-Day Itinerary
          </p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>
            Friday arrival · Saturday lake day · Sunday send-off.
          </h2>
          {[
            {
              day: 'Friday',
              sub: 'Arrival · 6th Street / Rainey Street kickoff',
              blocks: [
                { time: 'Afternoon', title: 'Airbnb check-in', body: 'Downtown, East Austin, or South Congress for groups of 8+. Hotels in the Rainey / Downtown district (Fairmont, JW Marriott, Hotel Van Zandt, Austin Proper) for groups of 6 or fewer. Decompress, matching-outfit photo ops, pre-game cocktails.' },
                { time: '7 PM', title: 'Dinner in Rainey Street or downtown', body: 'Top bachelorette dinner picks: Uchi (sushi, 4-week reservation), Perla\'s (seafood + raw bar), Launderette (South Austin, rotating menu), Pecan Square Cafe (intimate farm-to-table), Red Ash (Italian on Congress).' },
                { time: '9 PM – 1 AM', title: 'Rainey Street bar crawl', body: 'Rainey is the bachelorette-friendly bar district: Container Bar, Banger\'s Sausage House, Half Step (cocktails), Lustre Pearl, Icenhauer\'s. All walkable. Alternatively, 6th Street for a rowdier crawl or the East Cesar Chavez district for cocktail bars.' },
              ],
            },
            {
              day: 'Saturday',
              sub: 'Lake Travis party boat — the anchor',
              blocks: [
                { time: '9 AM', title: 'Slow breakfast + coffee', body: 'Jo\'s Coffee on South Congress, Easy Tiger Linden, or Veracruz All Natural. Hydrate hard — Lake Travis sun is intense.' },
                { time: '10 AM', title: 'Uber / party bus to Anderson Mill Marina', body: 'Party bus most economical for 8+ guests ($600–$1,500 round trip). Uber XL $50–$75 each way for groups of 5–6. Arrive 15–20 min before slot.' },
                { time: '11 AM – 3 PM', title: 'ATX Disco Cruise — peak Saturday slot ($105/person)', body: 'The anchor event. 4-hour cruise on the 75-person Clever Girl flagship. Professional DJ, professional photographer, 14 disco balls, giant floats, personal cooler per group. Multi-group energy — you\'ll celebrate alongside other bach groups, which sounds weird until you experience it. Tax and 20% gratuity included in ticket price.' },
                { time: '3:30 – 5 PM', title: 'Back to downtown Austin', body: 'Uber/Lyft or party bus. Shower, change, rehydrate.' },
                { time: '7:30 PM', title: 'Saturday night dinner', body: 'The marquee dinner. Top picks: Uchi, Franklin Barbecue (opens Friday, reserve far ahead), Terry Black\'s, Emmer & Rye, Dai Due, Kemuri Tatsu-Ya. Book 3–4 weeks out minimum.' },
                { time: '10 PM – close', title: 'Night out', body: '6th Street for the rowdiest nightlife, Rainey for curated cocktails, the Domain district for upscale bachelorette-friendly clubs, or Antone\'s / C-Boy\'s Heart & Soul for live music.' },
              ],
            },
            {
              day: 'Sunday',
              sub: 'Brunch + South Congress · send-off',
              blocks: [
                { time: '10 AM', title: 'Brunch', body: 'Bachelorette brunch classics: Launderette, Easy Tiger, Sour Duck Market, Suerte (for those who can handle Mexican after Saturday), Perla\'s for waterfront brunch, Cafe No Sé at South Congress Hotel.' },
                { time: '12 PM', title: 'South Congress shopping', body: 'SoCo is the definitive Austin bachelorette shopping walk. Allens Boots, By George, Feathers Boutique, Lucy in Disguise with Diamonds, Big Top Candy Shop. Matching-outfit photos at the "Greetings from Austin" mural. 2–3 hour walk.' },
                { time: '3 – 5 PM', title: 'Bride final toast + departures', body: 'Close the weekend with a last cocktail at the Austin Proper rooftop or the JW Marriott\'s rooftop pool bar. Uber to the airport from SoCo is 15 min; from downtown, 20 min. Most late-Sunday flights work.' },
              ],
            },
          ].map((day, i) => (
            <div key={i} style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.75rem', color: 'var(--hp2-gold)', marginBottom: '0.25rem' }}>{day.day}</h3>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--hp2-cream-muted)', fontFamily: 'var(--hp2-font-body)', marginBottom: '1.25rem' }}>{day.sub}</p>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {day.blocks.map((b, j) => (
                  <div key={j} style={{ background: 'var(--hp2-bg-card)', border: '1px solid var(--hp2-border)', padding: '1.5rem 1.75rem', borderRadius: 14, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', alignItems: 'start' }}>
                    <div style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1rem', color: 'var(--hp2-gold)', minWidth: 120, paddingTop: '0.1rem' }}>{b.time}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: '1.15rem', color: 'var(--hp2-cream)', marginBottom: '0.3rem' }}>{b.title}</div>
                      <p style={{ color: 'var(--hp2-cream-muted)', lineHeight: 1.6, margin: 0, fontSize: '0.92rem' }}>{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </V2PageTemplate>
  );
}
