import V2PageTemplate from '@/components/V2PageTemplate';

/**
 * AustinBachelorItineraryV2 — /austin-bachelor-itinerary
 *
 * Parallel to the bachelorette itinerary pillar. Targets "austin
 * bachelor party", "austin bachelor weekend", "austin bachelor
 * party ideas" (170 vol, pos 16), "bachelor party austin ideas".
 */
export default function AustinBachelorItineraryV2() {
  const faqs = [
    {
      q: 'What does an Austin bachelor weekend usually look like?',
      a: "Classic Austin bachelor weekend: 3 days / 2 nights — Friday arrival + 6th Street / Rainey kickoff + steakhouse dinner + bars, Saturday Lake Travis party boat (ATX Disco Cruise or private charter) for the marquee event, Sunday brunch + BBQ pilgrimage + golf (Grey Rock, Barton Creek Resort, Spanish Oaks) or a second lake day. Some groups stretch to 4 days with a Thursday poker night or a golf round before the full crew arrives. The lake day is the anchor — it's what the groom talks about after.",
    },
    {
      q: 'What is the best Austin bachelor party activity?',
      a: "The ATX Disco Cruise on Lake Travis is Austin's most-booked bachelor party anchor — it's the only all-inclusive multi-group bachelor party cruise in the United States. Per-person tickets $85–$105 include a 4-hour cruise on the 75-person Clever Girl flagship, professional DJ, professional photographer, 14 disco balls, giant floats, personal cooler per group, and the multi-group energy that private charters can't replicate. For groups wanting privacy or larger than 75, Premier Party Cruises also runs private Clever Girl charters year-round.",
    },
    {
      q: 'Where should an Austin bachelor party stay?',
      a: "Downtown Austin or East Austin Airbnb for groups of 8+ (larger groups need a dedicated house — avoid downtown hotels trying to fit 10+ guys into one room). Rainey / Downtown hotels for smaller groups: JW Marriott, Hotel Van Zandt, Austin Proper. Don't stay in Leander or Cedar Park — you lose the downtown walkability. Anderson Mill Marina is 25 min from any downtown location by Uber/Lyft ($35–$55 each way) or party bus.",
    },
    {
      q: 'What\'s the best Austin bachelor party dinner?',
      a: "Austin steakhouse and BBQ are the bachelor marquee dinners: Terry Black's BBQ (Friday or Sunday lunch pilgrimage — expect 1-hour line, worth it), Franklin Barbecue (reserve weeks ahead or go at 10 AM for the line), Uchi (sushi omakase), Red Ash (Italian on Congress), Jeffrey's (classic steakhouse), Vince Young Steakhouse (Austin-famous), Hestia (open-fire modern) or Nickel City (high-end cocktail bar + food). Book 3–4 weeks out for Saturday dinners.",
    },
    {
      q: 'Can we do golf + lake day in one Austin bachelor weekend?',
      a: "Yes — Austin bachelor weekends often book golf Friday AM before everyone arrives, or Sunday morning before flights. Top Austin bachelor golf: Grey Rock Golf Club (public, 15 min from downtown), Barton Creek Resort (4 championship courses, high-end), Spanish Oaks (private, need invite), Roy Kizer. Morning tee times let you pair golf with Saturday's lake day and Sunday BBQ without killing the weekend energy.",
    },
    {
      q: 'How much does an Austin bachelor weekend cost per person?',
      a: "Typical Austin bachelor weekend budget per person: Airbnb/hotel $150–$300 (2 nights), party boat anchor $85–$105 (ATX Disco Cruise) or $200–$500 (private charter), steakhouse/BBQ dinners $150–$300, bars $100–$200, optional golf $150–$250 per round, Uber/transport $50–$100. Total range: $600–$1,100 per person for 3 days / 2 nights. The lake cruise is the highest per-dollar ROI — DJ, photographer, 4-hour boat all included at $85–$105.",
    },
    {
      q: 'Is Austin better than Nashville or Las Vegas for a bachelor party?',
      a: "Austin offers what Nashville and Vegas don't have together: a dedicated Lake Travis party boat scene (25 min from downtown, the only all-inclusive multi-group bachelor cruise in the U.S.), plus walkable nightlife on 6th Street / Rainey, plus world-class BBQ, plus golf (Grey Rock, Barton Creek), plus strong steakhouse scene. Nashville is bar-district-only, Vegas is pool + casino-only. Austin is the choose-your-own-adventure bachelor destination with the lake day as the unique hook.",
    },
    {
      q: 'Can we do a combined bachelor + bachelorette weekend?',
      a: "Yes — combined bach parties are one of Premier Party Cruises' most-booked configurations. Both groups board the same ATX Disco Cruise or private Clever Girl charter, creating more energy than either could alone. Same per-person price. Most combined weekends split the Friday and Sunday for gendered activities (golf / BBQ vs. spa / SoCo shopping) and reunite for Saturday lake day + Saturday night dinner.",
    },
  ];

  return (
    <V2PageTemplate
      pageUrl="/austin-bachelor-itinerary"
      pageTitle="Austin Bachelor Weekend Itinerary · 3-Day Austin Bachelor Party Plan · Premier Party Cruises"
      pageDescription="The 3-day Austin bachelor weekend playbook. Day-by-day plan: Friday arrival + 6th Street / Rainey kickoff + steakhouse dinner, Saturday Lake Travis party boat anchor (ATX Disco Cruise or private charter), Sunday brunch + BBQ pilgrimage + golf. Accommodation picks, dinner reservations, golf options, and the party-boat booking timing that makes or breaks the weekend."
      heroEyebrow="The 3-Day Playbook"
      heroHeadline={<>The <em>Austin bachelor</em> weekend itinerary.</>}
      heroBody="Austin's bachelor scene = lake-day + walkable nightlife + BBQ pilgrimage + golf. Friday kickoff on Rainey / 6th with a steakhouse or sushi dinner, Saturday on Lake Travis (the anchor — ATX Disco Cruise or private charter), Sunday Franklin BBQ + golf round before flights. Better than Nashville's bar-only and Vegas's pool-only — Austin lets you do all of it in one weekend with the Lake Travis party boat as the unique hook."
      primaryCta={{ text: 'Book The Lake Day First', href: '/quote' }}
      secondaryCta={{ text: 'See ATX Disco Cruise', href: '/atx-disco-cruise' }}
      faqs={faqs}
      finalCtaHeadline={<>Austin bachelor weekends that <em>actually</em> come together.</>}
      finalCtaBody="The lake day is the anchor. Book Saturday 6–8 weeks out, then stack golf + BBQ + bars + steakhouse around it. The only all-inclusive multi-group bachelor cruise in the U.S. runs at Premier Party Cruises."
    >
      <section style={{ padding: '4rem 2rem', background: 'var(--hp2-bg-1)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--hp2-gold)', fontFamily: 'var(--hp2-font-body)', marginBottom: '0.75rem' }}>The 3-Day Itinerary</p>
          <h2 style={{ fontFamily: 'var(--hp2-font-heading)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, lineHeight: 1.1, color: 'var(--hp2-cream)', marginTop: 0, marginBottom: '2rem' }}>Friday arrival · Saturday lake day · Sunday BBQ + golf.</h2>
          {[
            {
              day: 'Friday',
              sub: 'Arrival · 6th / Rainey kickoff · steakhouse dinner',
              blocks: [
                { time: 'Afternoon', title: 'Airbnb check-in', body: 'Downtown or East Austin Airbnb for groups of 8+ (one big house). Rainey / Downtown hotels (JW Marriott, Hotel Van Zandt, Austin Proper) for 4–6 guys. Pre-game, shot-check the groom.' },
                { time: '7 PM', title: 'Steakhouse or sushi dinner', body: 'Top Austin bachelor picks: Jeffrey\'s (classic steakhouse), Vince Young Steakhouse (Austin-famous), Uchi (sushi omakase), Hestia (open-fire modern), Red Ash (Italian), Nickel City (cocktail bar + food). Book 3–4 weeks out.' },
                { time: '9 PM – 2 AM', title: '6th Street / Rainey / East Cesar Chavez bar crawl', body: '6th Street for the rowdy traditional crawl, Rainey for curated cocktail bars (Container Bar, Banger\'s, Half Step, Lustre Pearl, Icenhauer\'s), East Cesar Chavez for craft cocktails, the Domain for upscale clubs.' },
              ],
            },
            {
              day: 'Saturday',
              sub: 'Lake Travis party boat — the anchor',
              blocks: [
                { time: '9 AM', title: 'Breakfast + hydrate', body: 'Easy Tiger Linden, Jo\'s Coffee, Veracruz All Natural. Water + electrolytes. Lake Travis sun is intense.' },
                { time: '10 AM', title: 'Uber XL or party bus to Anderson Mill Marina', body: 'Party bus most economical for 8+ guys ($600–$1,500 round trip). Uber XL $50–$75 each way for 5–6. Arrive 15–20 min before slot. BYOB order via Party On Delivery already on the boat if you pre-ordered.' },
                { time: '11 AM – 3 PM', title: 'ATX Disco Cruise peak Saturday slot ($105/person)', body: '4-hour cruise on 75-person Clever Girl flagship. Pro DJ, pro photographer, 14 disco balls, giant floats, personal cooler per group. Multi-group energy — you celebrate alongside other bach groups, which is the feature. Tax + 20% gratuity included.' },
                { time: '3:30 – 5 PM', title: 'Back to downtown', body: 'Shower, change, absolutely rehydrate. Hydrate again. Pre-game with beers at the Airbnb or rooftop bar.' },
                { time: '7:30 PM', title: 'Marquee Saturday dinner', body: 'Franklin Barbecue (pre-order catering delivery to Airbnb), Terry Black\'s, Uchi, Red Ash, Jeffrey\'s, or Dai Due. Book far ahead.' },
                { time: '10 PM – close', title: 'Closing night out', body: '6th Street late-night, Rainey craft cocktails, Antone\'s / C-Boy\'s for live music, Empire Control Room for EDM, or private Airbnb party with poker + cigars on the rooftop.' },
              ],
            },
            {
              day: 'Sunday',
              sub: 'BBQ + golf + send-off',
              blocks: [
                { time: '9 AM', title: 'Early tee time (optional)', body: 'Grey Rock Golf Club (public, 15 min from downtown, bachelor-friendly), Barton Creek Resort (4 championship courses), Roy Kizer (public, river views), Spanish Oaks (private, need invite). Morning tee times keep the weekend energy.' },
                { time: '12 PM', title: 'BBQ pilgrimage', body: 'Franklin Barbecue (arrive 10 AM for the line or pre-order large catering pickup), Terry Black\'s (less line, still excellent), la Barbecue, Kemuri Tatsu-Ya (BBQ + Japanese fusion), Valentina\'s Tex Mex BBQ.' },
                { time: '3 – 5 PM', title: 'Last beer + airport', body: 'Grab a last beer at Easy Tiger, Hops & Grain Brewing, or any Rainey Street rooftop. Uber to airport: 15 min from SoCo, 20 min from downtown. Most late-Sunday flights work.' },
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
