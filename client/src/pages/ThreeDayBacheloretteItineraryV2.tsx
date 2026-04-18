import V2PageTemplate from '@/components/V2PageTemplate';

export default function ThreeDayBacheloretteItineraryV2() {
  const faqs = [
    {
      q: 'What is the best 3-day Austin bachelorette itinerary?',
      a: 'The best 3-day Austin bachelorette itinerary combines Rainey Street nightlife on Friday, an ATX Disco Cruise on Lake Travis Saturday (11 AM-3 PM slot is most popular), and a Sunday brunch + spa day. Day 1: arrive, hotel check-in, dinner on South Congress, Rainey Street cocktails. Day 2: Disco Cruise 11 AM-3 PM, dinner downtown, 6th Street bar crawl. Day 3: brunch at June\'s All Day, spa recovery, SoCo shopping, flights home. Most groups book this flow 6-8 weeks in advance.'
    },
    {
      q: 'How much does a 3-day Austin bachelorette weekend cost per person?',
      a: 'A typical 3-day Austin bachelorette weekend costs $500-$900 per person for the bachelorettes (not counting flights). This includes ~$200-$350 for a shared hotel or Airbnb for 2 nights, $85-$105 for the ATX Disco Cruise, $150-$250 for food and drinks across 3 days, $50-$100 for rideshare, and $50-$150 for activities (nightlife cover charges, brunch, spa). The bride\'s portion is typically covered by the group.'
    },
    {
      q: 'What is the best day for the ATX Disco Cruise in a 3-day bachelorette weekend?',
      a: 'Saturday 11 AM-3 PM is the most popular ATX Disco Cruise slot for a 3-day bachelorette itinerary — it\'s peak energy, peak sun, and leaves the rest of the day for recovery, dinner, and nightlife. Saturday 3:30-7:30 PM works well if you want sunset vibes and plan to go straight from the boat to dinner. Friday 12-4 PM is ideal for groups that arrive Friday morning and want to kick off the weekend immediately.'
    },
    {
      q: 'Where should we stay for a 3-day Austin bachelorette weekend?',
      a: 'The best neighborhoods for a 3-day Austin bachelorette stay are Rainey Street (walkable to bars), Downtown/2nd Street (central, walkable), and South Congress (SoCo). Popular hotels include Hotel Van Zandt (Rainey Street), The LINE Austin (downtown, lakefront), Hotel Magdalena (SoCo), Kimpton Hotel Van Zandt, and W Austin. For larger groups, Airbnbs in East Austin or on Lake Austin offer more space and pool access — some even come with private boat docks.'
    },
    {
      q: 'How far in advance should we book a 3-day Austin bachelorette weekend?',
      a: 'Book 2-4 months ahead for peak bachelorette season (March-October, especially April-June and September-October). Book the ATX Disco Cruise first (6-8 weeks out for Saturdays), then hotels, then dinner reservations for Saturday night (4-6 weeks out for popular spots like Uchi, Comedor, or Jeffrey\'s). Rideshare and Ubers are easy day-of, but book any party bus transportation 2-3 weeks ahead.'
    },
    {
      q: 'What should Day 1 of an Austin bachelorette weekend look like?',
      a: 'Day 1 (Friday): Arrive afternoon, check into hotel, group photos, 4 PM happy hour at a rooftop (P6 at Fairmont or VRBO rooftop), 6:30 PM dinner reservation (Jeffrey\'s, Uchi, or Comedor), 9 PM Rainey Street bar crawl (Banger\'s, Container Bar, Unbarlievable), cap the night at Lustre Pearl. Keep Day 1 chill-ish since Saturday\'s cruise requires energy. Stay hydrated and pace yourselves.'
    },
    {
      q: 'What should Day 2 (boat day) of an Austin bachelorette weekend look like?',
      a: 'Day 2 (Saturday): 8:30 AM group breakfast at hotel or Counter Cafe, 10 AM rideshare to Anderson Mill Marina (25 min from downtown), 10:45 AM arrival and boarding, 11 AM-3 PM ATX Disco Cruise (DJ, swim stop, photos), 3:30 PM back at hotel for shower + touch-up, 6 PM dinner downtown, 9 PM 6th Street bar crawl or Rainey Street round two, late-night tacos at Taco Flats. This is the big day.'
    },
    {
      q: 'What should Day 3 of an Austin bachelorette weekend look like?',
      a: 'Day 3 (Sunday): 10:30 AM brunch at June\'s All Day, Elizabeth Street Cafe, or Launderette, 12:30 PM stroll South Congress (Allens Boots, Big Top Candy Shop), 2 PM spa day at Milk + Honey or Viva Day Spa (book massages in advance), 4 PM poolside drinks or Barton Springs float, 6 PM light dinner, flights home or one more night. Sunday is about recovery and gentle fun before heading home Monday.'
    },
    {
      q: 'Should we use a party bus or rideshare for a 3-day Austin bachelorette?',
      a: 'Rideshare (Uber/Lyft) is the most popular choice for Austin bachelorette weekends — it\'s affordable ($15-$40 per trip), flexible, and removes driver designation. Party buses ($600-$1,200 for a day) make sense for the Saturday Disco Cruise (Austin to Lake Travis round-trip with bachelorette playlist and BYOB). Many groups book a party bus just for boat day and rideshare the rest of the weekend.'
    },
    {
      q: 'Can we combine the ATX Disco Cruise with a private sunset charter?',
      a: 'Yes — some groups book the Saturday 11 AM-3 PM ATX Disco Cruise (for the DJ, photographer, and all-inclusive party atmosphere) then add a Sunday sunset private charter (6 PM-9 PM, From $200/hr, 4-hour minimum) for a chilled end to the weekend. Others do the opposite: Friday sunset private charter as a warm-up, then Saturday Disco Cruise as the main event. Both options work beautifully.'
    },
    {
      q: 'What are the best restaurants for an Austin bachelorette dinner?',
      a: 'Best bachelorette dinners in Austin: Jeffrey\'s (classic upscale, garden patio), Uchi (sushi, reserve 6+ weeks ahead), Comedor (modern Mexican, downtown), Este (coastal Mexican, East Austin), Laundrette (cool SoCo spot), June\'s All Day (SoCo, good for brunch), Kemuri Tatsu-ya (Japanese BBQ, fun vibe), and Suerte (innovative Mexican). For the bride\'s dinner, book the private dining room at Jeffrey\'s or Uchi.'
    },
    {
      q: 'Is Rainey Street or 6th Street better for bachelorette nightlife?',
      a: 'Rainey Street is better for bachelorette groups — historic bungalow-turned-bars, outdoor patios, craft cocktails, and a more polished crowd. Bangers, Container Bar, Unbarlievable, Lustre Pearl, and Icenhauer\'s are all walkable. 6th Street is louder, younger, and heavier on dive bars and college crowds — fun for one night but can feel intense. Most bachelorette groups do Rainey Friday and 6th Street Saturday.'
    },
    {
      q: 'What if our bachelorette weekend gets rained out?',
      a: 'The ATX Disco Cruise has a Lemonade Disco weather guarantee — if conditions are unsafe, we move the party to our land venue so your celebration still happens. For the rest of your weekend, Austin has plenty of rainy-day options: spa days at Milk + Honey, bowling at Punch Bowl Social, comedy at Esther\'s Follies, Alamo Drafthouse movies, and rooftop bars with covered patios. Austin weather is mostly great March-October.'
    },
    {
      q: 'Is a 2-day or 3-day Austin bachelorette weekend better?',
      a: 'A 3-day weekend (Friday-Sunday) is the gold standard for Austin bachelorette parties — it gives you an arrival day to settle in, a full boat day, and a recovery Sunday with brunch and spa. A 2-day weekend (Friday night-Saturday) can work for close groups with tight budgets but feels rushed. A 4-day weekend (Thursday-Sunday) works for destination groups flying in from far away. Most groups find 3 days hits the sweet spot.'
    },
    {
      q: 'What add-ons make a 3-day Austin bachelorette more memorable?',
      a: 'Top Austin bachelorette add-ons: professional photographer for the full weekend ($500-$1,500), matching custom swimsuits or shirts ($30-$60/person), a party bus for boat day ($600-$1,200), a private chef for one night ($75-$150/person), a hill country winery tour at Driftwood or Fredericksburg ($100/person), custom welcome bags with hangover kits, a tarot card reader or mixologist for an at-home night, and sunset photos with the Austin skyline.'
    },
    {
      q: 'How do we book the ATX Disco Cruise as part of our 3-day itinerary?',
      a: 'Book the ATX Disco Cruise online at /atx-disco-cruise or call (512) 488-5892. Pick your time slot (Saturday 11 AM-3 PM is most popular for 3-day itineraries). Pay a deposit to secure the date, then finalize final guest count 2 weeks before. We recommend booking the cruise first, then building the rest of your 3-day itinerary around it. Most groups book 6-8 weeks in advance during peak season.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/3-day-austin-bachelorette-itinerary-v2"
      pageTitle="3-Day Austin Bachelorette Itinerary | Weekend Guide | Premier Party Cruises"
      pageDescription="The complete 3-day Austin bachelorette itinerary. Friday Rainey Street, Saturday ATX Disco Cruise on Lake Travis, Sunday brunch + spa. Schedule, hotels, restaurants, and booking tips for the perfect Austin bachelorette weekend."
      heroEyebrow="3-Day Itinerary · Austin · Lake Travis"
      heroHeadline={<>The perfect <em>3-day</em> Austin bachelorette</>}
      heroBody="The only 3-day Austin bachelorette itinerary you need. Friday Rainey Street, Saturday ATX Disco Cruise on Lake Travis, Sunday brunch and spa. Full schedule with restaurants, hotels, and timing — built from 150,000+ guests and 15+ years of Austin bachelorette weekends."
      primaryCta={{ text: 'Book Disco Cruise', href: '/atx-disco-cruise' }}
      secondaryCta={{ text: 'All Bachelorette Options', href: '/bachelorette-party-austin' }}
      faqs={faqs}
      finalCtaHeadline={<>Your 3-day Austin bachelorette <em>starts here</em>.</>}
      finalCtaBody="The ATX Disco Cruise anchors every great Austin bachelorette itinerary. Book Saturday 11 AM-3 PM for the classic 3-day weekend flow, or call us to plan your entire 3 days. From $85/person all-inclusive."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">Overview</div>
        <h2 className="hp2-section__headline">
          A <em>3-day</em> Austin bachelorette, hour by hour.
        </h2>
        <p className="hp2-section__body">
          The classic 3-day Austin bachelorette weekend runs Friday afternoon through Sunday evening. Day 1 is arrival, dinner, and Rainey Street cocktails. Day 2 is the big day — the ATX Disco Cruise on Lake Travis followed by dinner downtown and 6th Street nightlife. Day 3 is brunch, spa, South Congress, and flights home. This itinerary is built from 15+ years of hosting Austin bachelorette weekends and represents the flow most groups love.
        </p>
        <p className="hp2-section__body">
          The centerpiece of the weekend is the <a href="/atx-disco-cruise" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>ATX Disco Cruise</a> on Saturday — Austin's #1 bachelorette activity with a professional DJ, photographer, 14 disco balls, giant lily pad floats, and a 4-hour Lake Travis party for $85-$105/person all-inclusive. Build the rest of your itinerary around this cornerstone and you can't go wrong. Below you'll find the full schedule, restaurant picks, hotel recommendations, and cost breakdowns.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Day 1 — Friday</div>
          <h2 className="hp2-section__headline">
            Arrival, dinner, and <em>Rainey Street</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">3 PM</div>
              <div className="hp2-feature-card__title">Check-in & Welcome Hour</div>
              <div className="hp2-feature-card__desc">Arrive at hotel (Hotel Van Zandt, The LINE, or W Austin). Welcome cocktails at the pool or rooftop. Distribute welcome bags with hangover kits, koozies, and itineraries. Group photos in matching outfits.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">6:30 PM</div>
              <div className="hp2-feature-card__title">Dinner Reservation</div>
              <div className="hp2-feature-card__desc">Book Jeffrey\'s (classic upscale), Uchi (sushi), Comedor (modern Mexican), or Laundrette (SoCo cool). Private dining room if the group is 10+. Reserve 4-6 weeks ahead for Saturday night availability.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">9 PM</div>
              <div className="hp2-feature-card__title">Rainey Street Bar Crawl</div>
              <div className="hp2-feature-card__desc">Walk Rainey Street: start at Bangers (beer garden), move to Container Bar (outdoor lounge), Unbarlievable (rooftop), Lustre Pearl (patio dancing), end at Half Step for craft cocktails. All walkable within 3 blocks.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Midnight</div>
              <div className="hp2-feature-card__title">Late-Night Tacos</div>
              <div className="hp2-feature-card__desc">Don Japanese on Rainey or Taco Flats downtown. Hydrate, grab water bottles for the morning, Uber back to the hotel by 1 AM. Saturday\'s boat day starts early — don\'t push too hard.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Pro Tip</div>
              <div className="hp2-feature-card__title">Pace Yourselves</div>
              <div className="hp2-feature-card__desc">Saturday\'s ATX Disco Cruise is 4 hours of high-energy lake partying. Keep Friday fun but controlled. Alternate water and drinks. The bachelorette\'s sister and the MOH should be the designated "hydration enforcers."</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Optional</div>
              <div className="hp2-feature-card__title">Friday Sunset Charter</div>
              <div className="hp2-feature-card__desc">Add a Friday 5-9 PM private sunset charter (From $200/hr) as a warm-up. Smaller group, BYOB, golden hour photos. Some groups do this Friday instead of Rainey Street if they want a quieter start.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Day 2 — Saturday (The Main Event)</div>
        <h2 className="hp2-section__headline">
          The <em>ATX Disco Cruise</em> day.
        </h2>
        <p className="hp2-section__body">
          Saturday is the big day. The ATX Disco Cruise on Lake Travis is the centerpiece of every great Austin bachelorette weekend. Here's the full schedule, hour by hour, built from hundreds of bachelorette groups who've run this exact flow.
        </p>
        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">8:30 AM</div>
            <div className="hp2-feature-card__title">Group Breakfast</div>
            <div className="hp2-feature-card__desc">Counter Cafe, Kerbey Lane, or hotel breakfast. Big meal — eggs, bacon, pancakes, coffee. You\'re about to party for 4 hours on a boat. Hydrate aggressively. Take electrolytes.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">10:00 AM</div>
            <div className="hp2-feature-card__title">Depart for Marina</div>
            <div className="hp2-feature-card__desc">Rideshare or party bus to Anderson Mill Marina (13993 FM 2769, Leander). 25 minutes from downtown Austin. Arrive by 10:45 AM for 11 AM boarding. Free marina parking if driving.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">11 AM–3 PM</div>
            <div className="hp2-feature-card__title">ATX Disco Cruise</div>
            <div className="hp2-feature-card__desc">4 hours on Clever Girl: DJ, 14 disco balls, dance floor, swim stop in crystal-clear cove, giant lily pad floats, professional photographer. $105/person all-inclusive. The core of your weekend.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">3:30 PM</div>
            <div className="hp2-feature-card__title">Back to Hotel</div>
            <div className="hp2-feature-card__desc">Rideshare back downtown. Shower, nap, hydrate. Apply aloe. Change into dinner outfits. Golden hour group photos on hotel rooftop at 5:30 PM.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">6:30 PM</div>
            <div className="hp2-feature-card__title">Saturday Dinner</div>
            <div className="hp2-feature-card__desc">Uchi, Este, Suerte, or Kemuri Tatsu-ya. This is the "nice dinner" of the weekend — dress up, order the tasting menu, toast the bride. Book private dining for groups of 10+.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">9 PM–2 AM</div>
            <div className="hp2-feature-card__title">6th Street / Rainey Round 2</div>
            <div className="hp2-feature-card__desc">6th Street for loud fun (Blind Pig, Pete\'s Dueling Pianos, Maggie Mae\'s). Or back to Rainey for cocktails. End at a rooftop like P6 or Azul. Late-night pizza at Home Slice.</div>
          </div>
        </div>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Day 3 — Sunday</div>
          <h2 className="hp2-section__headline">
            Brunch, spa, and <em>recovery</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">10:30 AM</div>
              <div className="hp2-feature-card__title">Recovery Brunch</div>
              <div className="hp2-feature-card__desc">June\'s All Day (SoCo, famous bloody marys), Elizabeth Street Cafe (French-Vietnamese), Launderette (East Austin cool), or Jacoby\'s (rustic). Bottomless mimosas available. Book a big table.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">12:30 PM</div>
              <div className="hp2-feature-card__title">South Congress Stroll</div>
              <div className="hp2-feature-card__desc">Walk SoCo: Allens Boots (Texas boots), Big Top Candy Shop, Uncommon Objects, Tesoros Trading Co. Stop at Hotel Magdalena patio for one more cocktail. Great photo walls everywhere.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">2 PM</div>
              <div className="hp2-feature-card__title">Spa Day</div>
              <div className="hp2-feature-card__desc">Book 60-min massages at Milk + Honey (SoCo or downtown), Viva Day Spa, or The Spa at the LINE. $150-$250/person. Book 3-4 weeks ahead for Sunday availability. Optional bride\'s bachelorette gift.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">4 PM</div>
              <div className="hp2-feature-card__title">Barton Springs Float</div>
              <div className="hp2-feature-card__desc">Natural spring pool at 68°F year-round. Perfect hangover cure. $9 entry. Bring towels and a float. Or poolside drinks at the hotel if the group is too wiped out.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">6 PM</div>
              <div className="hp2-feature-card__title">Light Dinner & Toast</div>
              <div className="hp2-feature-card__desc">Suerte, Este, or just pizza at Home Slice. Final bride toast. Exchange favorite memories from the weekend. Early bed — most flights leave Monday morning.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Monday</div>
              <div className="hp2-feature-card__title">Goodbyes & Flights</div>
              <div className="hp2-feature-card__desc">Coffee + breakfast tacos at Veracruz or Juan in a Million. Rideshare to ABIA (Austin-Bergstrom) — 20 min from downtown. Most flights leave before noon. Photo group shoot in hotel lobby for the final memory.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Budget & Logistics</div>
        <h2 className="hp2-section__headline">
          Cost breakdown for a 3-day Austin <em>bachelorette</em>.
        </h2>
        <p className="hp2-section__body">
          Here\'s what a 3-day Austin bachelorette weekend typically costs per person (not including flights). This assumes 10 bachelorettes sharing a 4-bedroom Airbnb or 2-3 hotel rooms, and covers the bride\'s portion split among the group.
        </p>
        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$200–$350</div>
            <div className="hp2-feature-card__title">Lodging (2 nights)</div>
            <div className="hp2-feature-card__desc">Shared hotel rooms at Hotel Van Zandt, The LINE, or Kimpton ($150-$200/person for 2 nights). Airbnbs run $100-$250/person for 4-bedroom SoCo or East Austin homes.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$85–$105</div>
            <div className="hp2-feature-card__title">ATX Disco Cruise</div>
            <div className="hp2-feature-card__desc">Saturday 11 AM-3 PM is $105/person. Saturday 3:30-7:30 PM is $85/person. Friday 12-4 PM is $95/person. All-inclusive with DJ, photographer, floats.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$150–$250</div>
            <div className="hp2-feature-card__title">Food & Drinks</div>
            <div className="hp2-feature-card__desc">3 dinners ($60-$100 each), 2 brunches ($40 each), bar cover charges, drinks. Austin dinner costs run $40-$80/person before drinks.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$50–$100</div>
            <div className="hp2-feature-card__title">Transportation</div>
            <div className="hp2-feature-card__desc">Rideshare ~$15-$40 per trip. Party bus for boat day ~$100-$150/person split. Flights separate ($200-$500 depending on origin).</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$50–$150</div>
            <div className="hp2-feature-card__title">Activities & Extras</div>
            <div className="hp2-feature-card__desc">Optional spa massage ($150-$250), matching outfits ($30-$60), welcome bags ($15-$25), photographer share ($50-$100 per person).</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">$500–$900</div>
            <div className="hp2-feature-card__title">Total Per Person</div>
            <div className="hp2-feature-card__desc">All-in for 3 days in Austin including the ATX Disco Cruise. Bride\'s portion typically split among the group (adds $50-$80/person). Still 30-40% cheaper than Nashville or Miami.</div>
          </div>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <p className="hp2-section__body">
            See also: <a href="/budget-austin-bachelorette" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Budget Austin bachelorette guide</a> · <a href="/luxury-austin-bachelorette" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Luxury Austin bachelorette guide</a> · <a href="/ultimate-austin-bachelorette-weekend" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Ultimate Austin bachelorette weekend</a> · <a href="/top-10-austin-bachelorette-ideas" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Top 10 bachelorette ideas</a>
          </p>
        </div>
      </section>
    </V2PageTemplate>
  );
}
