import V2PageTemplate from '@/components/V2PageTemplate';

export default function AustinBacheloretteNightlifeV2() {
  const faqs = [
    {
      q: 'What is the best bachelorette nightlife in Austin?',
      a: 'The best Austin bachelorette nightlife is Rainey Street for cocktails and patios, followed by 6th Street for dancing and dueling pianos. Rainey Street has bungalow-turned-bars (Bangers, Container Bar, Unbarlievable, Lustre Pearl) within a 3-block walk. 6th Street has the legendary bar-crawl vibe with live music venues, pedal pubs, and dueling pianos at Pete\'s. Most bachelorette groups do Rainey Friday, 6th Street Saturday after the ATX Disco Cruise.'
    },
    {
      q: 'Is Rainey Street or 6th Street better for a bachelorette party?',
      a: 'Rainey Street is better for upscale, craft-cocktail-focused bachelorette groups. 6th Street is better for high-energy dance/dive bar bachelorettes. Rainey has historic bungalow bars, outdoor patios, live music, and craft cocktails. 6th Street has dueling pianos at Pete\'s, country dance at The White Horse (East 6th), rooftop Blind Pig, and pedal pubs. Most groups combine both — Friday Rainey, Saturday 6th Street for the full contrast experience.'
    },
    {
      q: 'What are the best Rainey Street bars for a bachelorette?',
      a: 'Top Rainey Street bars for a bachelorette: (1) Bangers Sausage House & Beer Garden — 200 beers, outdoor patio; (2) Container Bar — outdoor lounge with fire pits; (3) Unbarlievable — rooftop with live music; (4) Lustre Pearl — patio dancing, original Rainey bungalow bar; (5) Icenhauer\'s — best cocktails; (6) Half Step — craft cocktails and mezcal; (7) Geraldine\'s at Hotel Van Zandt — fancy, live music. All walkable within 3 blocks.'
    },
    {
      q: 'What are the best 6th Street bars for a bachelorette?',
      a: 'Top 6th Street bars for a bachelorette: (1) Pete\'s Dueling Piano Bar — legendary bachelorette spot, song requests, wild energy; (2) Blind Pig Pub — multi-level, rooftop, always a crowd; (3) Maggie Mae\'s — rooftop with Austin skyline views; (4) Shakespeare\'s Pub — British-style, chill; (5) The Chuggin\' Monkey — classic 6th Street party bar; (6) Barbarella — dance club on East 6th; (7) Coconut Club — tropical vibe, dance floor. 6th Street bars get loud Friday-Saturday after 10 PM.'
    },
    {
      q: 'Can we do a rooftop bar crawl in Austin for a bachelorette?',
      a: 'Yes — Austin has world-class rooftop bars perfect for bachelorette parties. Best rooftop bar crawl: (1) P6 at The LINE Austin — Lady Bird Lake views, Austin\'s best sunset spot; (2) Upstairs at Caroline at The Carpenter Hotel; (3) The Roosevelt Room (mixology-focused); (4) Lutie\'s at The Austin Proper; (5) Geraldine\'s at Hotel Van Zandt; (6) Azul Rooftop at Westin; (7) The Hay Merchant rooftop. Start at P6 for sunset, end at Geraldine\'s for live music.'
    },
    {
      q: 'What is the best bachelorette bar crawl route in Austin?',
      a: 'Classic Austin bachelorette bar crawl route (Friday or Saturday night): 5 PM Rainey Street — start at Bangers for beer, move to Container Bar, then Unbarlievable rooftop for sunset. 7 PM dinner at Laundrette, Geraldine\'s, or Emmer & Rye. 9 PM back to Rainey (Lustre Pearl, Icenhauer\'s) or walk to 6th Street. 11 PM 6th Street — Pete\'s Dueling Pianos, Blind Pig, Maggie Mae\'s rooftop. 1 AM late-night tacos at Home Slice or Veracruz.'
    },
    {
      q: 'What is the best live music venue for an Austin bachelorette?',
      a: 'Top Austin live music venues for bachelorette parties: (1) Pete\'s Dueling Pianos (6th Street, dedicated bachelorette shout-outs); (2) The White Horse (East 6th, country dance, free); (3) Continental Club (SoCo, vintage honky-tonk); (4) Antone\'s (downtown blues); (5) Stubb\'s Bar-B-Q (outdoor venue); (6) Austin City Limits Live at The Moody Theater (if touring acts are in); (7) ACL Live at W Hotel (ticketed shows). Austin is "Live Music Capital" — there\'s always something.'
    },
    {
      q: 'Are there dueling piano bars in Austin for bachelorettes?',
      a: 'Yes — Pete\'s Dueling Piano Bar on 6th Street is the legendary Austin bachelorette dueling piano spot. The piano players take song requests and specifically call out bachelorette parties with custom performances. Get there by 9 PM for a good table or reserve a VIP area ($200-$500 minimum) for bottle service. No cover, but tip the piano players $5-$20 per song. Bride gets dragged on stage — it\'s tradition.'
    },
    {
      q: 'How late are Austin bars open?',
      a: 'Austin bars close at 2 AM (state law). 6th Street streets close to cars from 10:30 PM to 2:30 AM on Friday-Saturday, making it a pedestrian party zone. Most Rainey Street bars stay open until 2 AM. After 2 AM, head to late-night food spots — Home Slice Pizza on SoCo, Veracruz Taco Truck, Taco Flats, or 24-hour diner Magnolia Cafe. Some East Austin venues have after-hours events until 4 AM.'
    },
    {
      q: 'What kind of cover charges should we expect at Austin bars?',
      a: 'Most Austin bars have no cover charge — you pay per drink. Exceptions: 6th Street dive bars sometimes $5-$10 on Fridays/Saturdays; live music venues $10-$30 depending on act (Pete\'s is usually free); nightclubs like Barbarella $10-$20; special event venues $15-$40. Rainey Street is cover-free. This is a huge budget win versus Nashville (covers everywhere) or Miami (club covers $40-$80).'
    },
    {
      q: 'Can we pedal-pub bar crawl in Austin?',
      a: 'Yes — Austin has several pedal-pub options. The Party Pedaler and Austin Pedicab offer BYOB group pedal tours ($300-$600 per 1-2 hour tour, 10-15 people). Routes typically include Rainey Street and East 6th. Less famous than Nashville pedal-taverns but fun for a 1-hour bar crawl. Note: Austin banned open-alcohol pedal pubs in 2022 in some districts — confirm BYOB rules when booking.'
    },
    {
      q: 'Is East Austin good for bachelorette nightlife?',
      a: 'Yes — East Austin nightlife is the alternative to Rainey/6th Street. More hip, younger crowd, cool dive bars and dance spots. Top East Austin bars: (1) The White Horse (country dance, free); (2) Hotel Vegas (dive, live music, dance floor); (3) Weather Up (craft cocktails); (4) Kinda Tropical (tiki); (5) Barbarella (dance club); (6) Coconut Club (tropical, dance); (7) Cheer Up Charlies (LGBTQ-friendly, outdoor). 5-min Uber from downtown.'
    },
    {
      q: 'What are the best Austin bars for craft cocktails?',
      a: 'Austin\'s best craft cocktail bars for a bachelorette: (1) Midnight Cowboy (speakeasy, reservations required, 6th Street); (2) The Roosevelt Room (award-winning mixology); (3) Here Nor There (hidden speakeasy); (4) Garage (underground parking garage turned bar); (5) Small Victory (small downtown cocktail bar); (6) Half Step on Rainey; (7) Nickel City (East Austin); (8) Drink.Well (North Austin). Reserve ahead for Midnight Cowboy and Here Nor There.'
    },
    {
      q: 'Should we combine day drinking and nightlife for the bachelorette?',
      a: 'Yes — the classic Austin bachelorette formula is daytime ATX Disco Cruise on Lake Travis + Saturday night 6th Street/Rainey bar crawl. The 4-hour cruise ends at 3 PM or 7:30 PM depending on your slot, giving you time to shower, change, and hit the bars. Pace yourselves — the cruise has a professional DJ and 4 hours of BYOB dancing, so most groups need a 30-minute nap before going out. Hydrate constantly.'
    },
    {
      q: 'What\'s the Austin nightlife dress code for a bachelorette?',
      a: 'Austin is casual — sundresses, jumpsuits, nice jeans, and comfortable shoes work everywhere. Rainey Street is slightly more polished (patio chic). 6th Street is very casual (jeans and t-shirts fine). Rooftop bars like P6 are upscale casual. Don\'t wear heels to 6th Street (cobblestones + sweaty crowds). Don\'t wear flip-flops to Jeffrey\'s or Uchi. Bachelorette sashes and tiaras are 100% welcome everywhere.'
    },
    {
      q: 'How do we combine Austin nightlife with the ATX Disco Cruise?',
      a: 'Perfect Austin bachelorette flow: Friday night Rainey Street bar crawl (start 6 PM, end 1 AM). Saturday sleep in, brunch at 10 AM, ATX Disco Cruise 11 AM-3 PM (DJ, dance floor on the water, professional photographer). Saturday night dinner at Uchi or Jeffrey\'s 6:30 PM, 6th Street bar crawl 9 PM-2 AM. Sunday brunch + spa for recovery. The boat is the daytime party, the nightlife is the evening party — combine both for the full Austin experience.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/austin-bachelorette-nightlife-v2"
      pageTitle="Austin Bachelorette Nightlife | Rainey Street & 6th Street Guide | Premier Party Cruises"
      pageDescription="The complete Austin bachelorette nightlife guide. Rainey Street bars, 6th Street dueling pianos, rooftop sunsets at P6, East Austin hotspots, and how to combine nightlife with the ATX Disco Cruise on Lake Travis."
      heroEyebrow="Bachelorette Nightlife · Austin · Lake Travis"
      heroHeadline={<>Austin bachelorette <em>nightlife</em> guide</>}
      heroBody="The full playbook for Austin bachelorette nights. Rainey Street bungalow bars, 6th Street dueling pianos, rooftop sunsets at P6, East Austin dive bars, and how to time it all with the ATX Disco Cruise on Lake Travis. Built from 15+ years of local knowledge."
      primaryCta={{ text: 'Book Disco Cruise', href: '/atx-disco-cruise' }}
      secondaryCta={{ text: 'All Bachelorette Options', href: '/bachelorette-party-austin' }}
      faqs={faqs}
      finalCtaHeadline={<>Austin nights and <em>Lake Travis</em> days.</>}
      finalCtaBody="The ATX Disco Cruise is the daytime anchor — 4 hours of DJ, floats, and swim stops on Lake Travis. Pair it with Rainey Street Friday and 6th Street Saturday for the complete Austin bachelorette experience."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">Austin Nightlife for Bachelorette Groups</div>
        <h2 className="hp2-section__headline">
          Two streets. One <em>unforgettable</em> weekend.
        </h2>
        <p className="hp2-section__body">
          Austin bachelorette nightlife centers on two legendary blocks: Rainey Street (bungalow-turned-bars, craft cocktails, live music, patio vibes) and 6th Street (dueling pianos, dance floors, pedestrian-only partying on weekend nights). Most bachelorette groups split their nights between the two — Friday Rainey for a polished kickoff, Saturday 6th Street for the classic bar-crawl energy. Add a rooftop sunset at P6 (The LINE Austin), a live country dance at The White Horse, or a craft cocktail hunt at Midnight Cowboy and you have the full Austin nightlife playbook.
        </p>
        <p className="hp2-section__body">
          The secret move: pair your nights with the daytime <a href="/atx-disco-cruise" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>ATX Disco Cruise</a> on Lake Travis. Saturday 11 AM-3 PM cruise + Saturday night 6th Street bar crawl is the canonical Austin bachelorette formula. 4 hours of dance floor on a boat with a professional DJ, then 4 hours of 6th Street mayhem. Below you'll find the complete guide to every major Austin nightlife district.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Rainey Street</div>
          <h2 className="hp2-section__headline">
            The <em>bungalow bar</em> block.
          </h2>
          <p className="hp2-section__body">
            Rainey Street is a 3-block stretch of early-1900s bungalows converted into bars, all clustered between Davis Street and Lady Bird Lake. The vibe is outdoor-patio-meets-craft-cocktail-bar — walkable, upscale-casual, and perfect for a polished bachelorette kickoff. Start at Bangers for beer, work your way down to Lustre Pearl for dancing. No covers. Most bars stay open until 2 AM.
          </p>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">Bangers Sausage & Beer Garden</div>
              <div className="hp2-feature-card__desc">The Rainey Street starter. 200+ beers, massive outdoor patio, dog-friendly, live music most nights. Best for 4-7 PM happy hour with the bachelorette group.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">Container Bar</div>
              <div className="hp2-feature-card__desc">Built from shipping containers. Outdoor lounge with fire pits, string lights, picnic tables. Chill vibe, great for mid-crawl group photos and cocktails.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">Unbarlievable</div>
              <div className="hp2-feature-card__desc">Rooftop bar with live DJs, Austin skyline views, and dancing. Best 8 PM-midnight for bachelorette energy. Unbelievably fun, as the name suggests.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">04</div>
              <div className="hp2-feature-card__title">Lustre Pearl</div>
              <div className="hp2-feature-card__desc">The original Rainey Street bar. Patio dancing, DJ sets, fire pits, and a covered stage. High-energy from 10 PM to 2 AM. Bachelorette favorite.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">05</div>
              <div className="hp2-feature-card__title">Icenhauer\'s</div>
              <div className="hp2-feature-card__desc">Best cocktails on Rainey Street. Multi-level bungalow with a rooftop deck. Order the specialty cocktail menu — mixologist-level drinks.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">06</div>
              <div className="hp2-feature-card__title">Geraldine\'s</div>
              <div className="hp2-feature-card__desc">Hotel Van Zandt\'s music-focused restaurant + bar. Live music nightly, upscale dinner, craft cocktails. Ideal for 7-9 PM dinner before the bar crawl.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">6th Street</div>
        <h2 className="hp2-section__headline">
          The legendary <em>bar crawl</em> street.
        </h2>
        <p className="hp2-section__body">
          6th Street is Austin\'s most famous nightlife strip — a 6-block stretch of bars, live music venues, and late-night food spots. Friday and Saturday nights from 10:30 PM to 2:30 AM, the streets close to cars and 6th Street becomes a pedestrian party zone. High-energy, loud, occasionally chaotic — the classic bachelorette bar crawl experience. Less polished than Rainey but more iconic.
        </p>
        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Pete\'s Dueling Piano Bar</div>
            <div className="hp2-feature-card__desc">THE bachelorette spot on 6th Street. Dueling pianos take song requests, call out bach parties by name, drag the bride on stage. Get there by 9 PM.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Blind Pig Pub</div>
            <div className="hp2-feature-card__desc">Three-level party bar with a rooftop. Live DJs, dance floor, always packed. Classic 6th Street energy. $5-$10 cover on weekends.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Maggie Mae\'s</div>
            <div className="hp2-feature-card__desc">Rooftop bar with Austin skyline views. Live bands, country vibes, big group-friendly. Best for 10 PM-midnight before the big crawl.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">The Chuggin\' Monkey</div>
            <div className="hp2-feature-card__desc">Classic 6th Street party bar. $5 drinks, dance floor, no pretension. High-energy bachelorette-friendly crowd.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Coyote Ugly Saloon</div>
            <div className="hp2-feature-card__desc">Yes, the one from the movie. Bartenders dance on the bar, country music, rowdy bachelorette energy. Pure fun, no pretension.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Shakespeare\'s Pub</div>
            <div className="hp2-feature-card__desc">British-style pub, more chill than other 6th Street bars. Good for a cocktail break mid-crawl. Older crowd, less hectic.</div>
          </div>
        </div>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Rooftops & Hidden Gems</div>
          <h2 className="hp2-section__headline">
            Beyond Rainey and <em>6th Street</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <div className="hp2-feature-card__title">P6 at The LINE Austin</div>
              <div className="hp2-feature-card__desc">Austin\'s best rooftop sunset bar. Lady Bird Lake views, craft cocktails, modern vibe. Book by 5 PM for prime sunset seating. The bachelorette Instagram spot.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <div className="hp2-feature-card__title">Lutie\'s at The Austin Proper</div>
              <div className="hp2-feature-card__desc">Rooftop garden restaurant with craft cocktails. Elegant, lush, Instagrammable. Perfect 6-8 PM pre-dinner spot.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <div className="hp2-feature-card__title">Midnight Cowboy</div>
              <div className="hp2-feature-card__desc">6th Street speakeasy. Reservations only. Mixology-focused, 8-person tables, theatrical cocktail presentations. Book 2-4 weeks ahead.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <div className="hp2-feature-card__title">The White Horse</div>
              <div className="hp2-feature-card__desc">East 6th honky-tonk. Free country dance lessons at 8 PM, live bands, no cover. Authentic Texas experience. Wear boots.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <div className="hp2-feature-card__title">The Roosevelt Room</div>
              <div className="hp2-feature-card__desc">Award-winning downtown mixology bar. 300+ cocktails, Gatsby-era decor. Upscale but welcoming. Reserve for group tables.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">◈</div>
              <div className="hp2-feature-card__title">Continental Club</div>
              <div className="hp2-feature-card__desc">SoCo vintage honky-tonk. Live music nightly, legendary venue. Austin legacy spot — hit it for the history and the music.</div>
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <p className="hp2-section__body">
              Related: <a href="/bachelorette-party-austin" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Main bachelorette page</a> · <a href="/3-day-austin-bachelorette-itinerary-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>3-day itinerary</a> · <a href="/top-10-austin-bachelorette-ideas-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Top 10 bachelorette ideas</a> · <a href="/after-party" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>After-party options</a>
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
