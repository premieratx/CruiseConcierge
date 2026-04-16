import V2PageTemplate from '@/components/V2PageTemplate';

export default function AdventureAustinBacheloretteV2() {
  const faqs = [
    {
      q: 'What is the best adventure bachelorette activity in Austin?',
      a: 'The best adventure bachelorette activity in Austin is the ATX Disco Cruise on Lake Travis combined with swimming, cliff views, and lily-pad float time — it\'s adventure + party in one. Beyond the boat, top Austin bachelorette adventures include paddleboarding at Lady Bird Lake, ziplining at Lake Travis Zipline Adventures (the longest zipline in Texas), kayaking through Devil\'s Cove, hiking Hamilton Pool Preserve, and wine-tasting in the Texas Hill Country.'
    },
    {
      q: 'Can we combine the ATX Disco Cruise with adventure activities?',
      a: 'Yes — the ATX Disco Cruise pairs perfectly with adventure bachelorette weekends. Popular combos: Saturday Disco Cruise 11 AM-3 PM + Sunday paddleboarding on Lady Bird Lake, or Saturday Disco Cruise + Friday ziplining at Lake Travis Zipline Adventures. The Disco Cruise itself includes a swim stop with giant lily pad floats, cliff jumping (if bold), and plenty of water adventure — all with a DJ and photographer.'
    },
    {
      q: 'What outdoor activities are best for an Austin bachelorette party?',
      a: 'Top Austin outdoor bachelorette activities: (1) ATX Disco Cruise on Lake Travis — swim, float, dance; (2) Paddleboarding on Lady Bird Lake (downtown views); (3) Zipline Adventures at Lake Travis (longest in Texas); (4) Kayak tours through Devil\'s Cove or Commons Ford Park; (5) Hiking Hamilton Pool Preserve (reservations required); (6) Tubing the San Marcos River (summer only); (7) Hill country wine tours in Dripping Springs or Fredericksburg.'
    },
    {
      q: 'Is Lake Travis or Lady Bird Lake better for a bachelorette party?',
      a: 'Lake Travis is better for a bachelorette party — it\'s a 65-mile reservoir with crystal-clear coves, cliff jumping, big party boats, and the ATX Disco Cruise. Lady Bird Lake (formerly Town Lake) is downtown Austin, has a no-wake rule (no motorboats), and is ideal for paddleboarding and kayaking. Most bachelorette groups do the ATX Disco Cruise on Lake Travis for the main party and add Lady Bird paddleboarding for a chill Sunday morning.'
    },
    {
      q: 'How much do adventure activities cost for a bachelorette in Austin?',
      a: 'Austin bachelorette adventure costs per person: ATX Disco Cruise $85-$105; Lake Travis Zipline Adventures $115-$140; Paddleboard rental $25-$40/hour; Kayak rental $20-$35/hour; Hamilton Pool entry $12 (plus $11 reservation fee); San Marcos River tubing $25-$35; Hill country wine tour $80-$150 (includes transportation and 3-4 wineries). Budget $150-$400/person for 2-3 adventure activities across a weekend.'
    },
    {
      q: 'Can we go cliff jumping on the ATX Disco Cruise?',
      a: 'Lake Travis has several cliff-jumping spots like Pace Bend Park and Devil\'s Cove, but the ATX Disco Cruise swim stop is in a specific cove selected for safe swimming — cliff jumping happens off the boat swim platform (about 6 feet) rather than actual limestone cliffs. For serious cliff jumping, book a private Lake Travis charter and have the captain take you to known cliff-jumping coves (weather and water levels permitting).'
    },
    {
      q: 'Is paddleboarding a good bachelorette activity in Austin?',
      a: 'Yes — paddleboarding on Lady Bird Lake is a fantastic low-key bachelorette activity. Rent SUPs from Rowing Dock, The Expedition School, or Live Love Paddle ($25-$40/hour). Paddle past the Austin skyline, under the Congress Bridge (bats at dusk), and to the turtle ponds. Ideal for Sunday morning with mimosas, or as a calm counterpoint to the high-energy ATX Disco Cruise. Beginner-friendly — most bachelorettes stand up within 10 minutes.'
    },
    {
      q: 'What is the longest zipline in Texas and can we book it for a bachelorette?',
      a: 'Lake Travis Zipline Adventures has the longest zipline in Texas — 2,800 feet, 200 feet above the water, with 5 ziplines total in a 3-hour tour ($115-$140/person). Groups up to 12 can book private tours. Perfect for an adventure bachelorette Friday morning before the ATX Disco Cruise on Saturday. Book 2-3 weeks ahead. Located in Volente, 30 minutes from downtown Austin.'
    },
    {
      q: 'What hikes are good for a bachelorette party near Austin?',
      a: 'Top Austin bachelorette hikes: (1) Hamilton Pool Preserve (45 min from downtown, reservations required, stunning grotto swim); (2) McKinney Falls State Park (15 min from downtown, waterfalls and swim spots); (3) Pedernales Falls (1 hour, cascades and natural pools); (4) Enchanted Rock (1.5 hours, pink granite dome hike); (5) Greenbelt Trail (in Austin, hidden swim spots). All ideal for morning hikes before afternoon boat time.'
    },
    {
      q: 'Can we tube the San Marcos River as part of a bachelorette weekend?',
      a: 'Yes — San Marcos River tubing is a classic Texas bachelorette activity. Rent tubes at Lion\'s Club Tube Rental or the Texas State Tube Rental ($25-$35/person, 2-3 hour float). Water is 72°F year-round, crystal clear, and spring-fed. The river is shallow and slow — beer-friendly floating. 30 minutes from Austin. Pair with the ATX Disco Cruise for a two-lake adventure weekend.'
    },
    {
      q: 'Are there hill country wine tours for bachelorette parties?',
      a: 'Yes — Texas Hill Country is one of the top wine regions in the US with 50+ wineries in Driftwood, Johnson City, and Fredericksburg. Book a private tour ($80-$150/person) that includes transportation and 3-4 winery stops. Top bachelorette wineries: Duchman Family Winery, Bell Springs, Grape Creek Vineyards, Becker Vineyards. Great for a Friday afternoon before a Saturday ATX Disco Cruise.'
    },
    {
      q: 'What should we pack for an adventure bachelorette in Austin?',
      a: 'Packing list for an Austin adventure bachelorette: swimsuits (2-3), quick-dry cover-ups, reef-safe sunscreen (SPF 50+), hats, sunglasses, flat shoes or Chacos (no heels on boats), waterproof phone case, reusable water bottles, electrolyte packets, aloe, a towel, and a light jacket for evening hill country wine tastings. Bring matching bachelorette swimsuits for group photos on the ATX Disco Cruise.'
    },
    {
      q: 'What is the best adventure bachelorette itinerary for Austin?',
      a: 'The ultimate Austin adventure bachelorette itinerary: Friday — arrive, hill country wine tour (or ziplining), dinner on Rainey Street. Saturday — ATX Disco Cruise 11 AM-3 PM on Lake Travis, dinner downtown, 6th Street nightlife. Sunday — paddleboarding Lady Bird Lake OR Hamilton Pool hike, Barton Springs float, brunch, flights home. Mixes high-energy water time with natural Texas beauty.'
    },
    {
      q: 'Can we kayak on Lake Travis or Lady Bird Lake?',
      a: 'Both — Lady Bird Lake is the easier kayak option (no motorboats, flat water, downtown views). Lake Travis has more dramatic scenery (limestone cliffs, coves) but can get busy with powerboats. Rent kayaks at Rowing Dock or Austin Rowing Club on Lady Bird. For Lake Travis, try Emerald Cove or Commons Ford Park ($25-$45/hour). Kayaking pairs beautifully with the ATX Disco Cruise for a full adventure weekend.'
    },
    {
      q: 'How do we book adventure activities for a bachelorette weekend in Austin?',
      a: 'Book the ATX Disco Cruise first at /atx-disco-cruise — it\'s the centerpiece and books 6-8 weeks ahead. Then layer in adventure activities: Lake Travis Zipline Adventures (book 2-3 weeks ahead), Hamilton Pool Preserve reservations (open 90 days in advance, grab immediately), paddleboard rentals (day-of is fine), tubing (day-of weekends), and hill country wine tours (1-2 weeks ahead). Our team can help coordinate the full itinerary.'
    },
    {
      q: 'Is the Austin adventure bachelorette weather-dependent?',
      a: 'Mostly yes. Austin adventure bachelorette weekends work best March-October when water temperatures are swimmable and hikes aren\'t dangerous in the heat. April-June and September-October are ideal. July-August is hot (100°F+) but the water feels amazing. Winter (November-February) limits water activities but zipline and hill country wine tours still work. The ATX Disco Cruise runs March-October; private charters run year-round.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/adventure-austin-bachelorette-v2"
      pageTitle="Adventure Austin Bachelorette | Outdoor Weekend Guide | Premier Party Cruises"
      pageDescription="The adventure Austin bachelorette guide. ATX Disco Cruise, ziplining, paddleboarding, hiking, hill country wine tours, and cliff jumping. The outdoor bachelorette weekend for adventurous brides who love Lake Travis and Texas Hill Country."
      heroEyebrow="Adventure Bachelorette · Lake Travis · Hill Country"
      heroHeadline={<>Adventure-focused <em>bachelorette</em> weekend</>}
      heroBody="For brides who'd rather be outside. ATX Disco Cruise, zipline over Lake Travis, paddleboard past the Austin skyline, hike Hamilton Pool, wine-tour the hill country. Texas adventure bachelorette built for groups who want more than a hotel ballroom."
      primaryCta={{ text: 'Book Disco Cruise', href: '/atx-disco-cruise' }}
      secondaryCta={{ text: 'All Bachelorette Options', href: '/bachelorette-party-austin' }}
      faqs={faqs}
      finalCtaHeadline={<>Your Austin adventure bachelorette <em>awaits</em>.</>}
      finalCtaBody="The ATX Disco Cruise is the perfect anchor for an adventure bachelorette weekend. Swim, float, dance — then zipline, paddle, and hike around it. Call us to plan the full adventure itinerary."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">Why Austin for Adventure Bachelorette</div>
        <h2 className="hp2-section__headline">
          Texas adventure, <em>bachelorette-style</em>.
        </h2>
        <p className="hp2-section__body">
          Austin is the rare bachelorette destination where adventure and party live side-by-side. A 65-mile lake with limestone cliffs and crystal-clear coves. The longest zipline in Texas. Natural spring pools at 72°F year-round. Hill country wineries 40 minutes from downtown. Paddleboarding past the Austin skyline. And the ATX Disco Cruise — a party boat with a professional DJ, giant floats, and a swim stop that doubles as the most Instagrammable cove in Central Texas.
        </p>
        <p className="hp2-section__body">
          Adventure-focused bachelorette weekends in Austin work because the outdoor activities are genuinely great, not afterthoughts. Your group can zipline Friday, party on the <a href="/atx-disco-cruise" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>ATX Disco Cruise</a> Saturday, and paddleboard Sunday — and every activity is 15-45 minutes from downtown. Below you\'ll find the full playbook: water sports, hill country wine, hiking, and how to weave the ATX Disco Cruise through it all.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Water Adventures</div>
          <h2 className="hp2-section__headline">
            Lake Travis and <em>beyond</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">01</div>
              <div className="hp2-feature-card__title">ATX Disco Cruise</div>
              <div className="hp2-feature-card__desc">4-hour Lake Travis party with DJ, 14 disco balls, swim stop, giant lily pad floats. The adventurous bachelorette\'s all-in-one — party, swim, jump, float. $85-$105/person.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">02</div>
              <div className="hp2-feature-card__title">Paddleboarding Lady Bird</div>
              <div className="hp2-feature-card__desc">SUP the downtown lake at sunrise or sunset. Austin skyline views, turtle ponds, the Congress Bridge bats. $25-$40/hour. Rent at Rowing Dock or Live Love Paddle.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">03</div>
              <div className="hp2-feature-card__title">Zipline Adventures</div>
              <div className="hp2-feature-card__desc">Lake Travis Zipline — the longest zipline in Texas (2,800 ft, 200 ft above water). 5-line course, 3-hour tour, $115-$140/person. Book 2-3 weeks ahead.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">04</div>
              <div className="hp2-feature-card__title">Kayaking Devil\'s Cove</div>
              <div className="hp2-feature-card__desc">Kayak the famous Devil\'s Cove on Lake Travis — limestone cliffs, clear water, and the most scenic paddle in Central Texas. $25-$45/hour rentals.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">05</div>
              <div className="hp2-feature-card__title">San Marcos Tubing</div>
              <div className="hp2-feature-card__desc">Float the San Marcos River (72°F year-round, spring-fed, crystal clear). 2-3 hour float, $25-$35/person. Classic Texas bachelorette. 30 min from Austin.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">06</div>
              <div className="hp2-feature-card__title">Barton Springs Float</div>
              <div className="hp2-feature-card__desc">Natural spring pool downtown — 68°F year-round, 3-acre swim area. $9 entry. Perfect Sunday recovery after the ATX Disco Cruise. Bring a float and a book.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Hill Country Adventures</div>
        <h2 className="hp2-section__headline">
          Hike, wine, and <em>explore</em>.
        </h2>
        <p className="hp2-section__body">
          Texas Hill Country starts 30 minutes west of downtown Austin and runs for 100+ miles of limestone hills, spring-fed rivers, vineyards, and state parks. Adventure bachelorette groups regularly add a hill country day to their Austin weekend — wine tours, hikes, and natural swimming holes.
        </p>
        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Hamilton Pool Preserve</div>
            <div className="hp2-feature-card__desc">Emerald grotto with a 50-foot waterfall. Reservations required (open 90 days ahead). 45 min from downtown. $12 entry + $11 reservation. Swim-friendly when water levels allow.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Hill Country Wine Tour</div>
            <div className="hp2-feature-card__desc">Driftwood or Fredericksburg vineyards. Duchman, Bell Springs, Grape Creek, Becker. Private tour with transportation $80-$150/person. 3-4 winery stops.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Pedernales Falls</div>
            <div className="hp2-feature-card__desc">Cascading falls and natural pools 1 hour west of Austin. Hike the easy 1.5-mile loop, swim in the pools (when open). $6 entry. Great photo spot.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Enchanted Rock</div>
            <div className="hp2-feature-card__desc">Pink granite dome hike — 425 feet up, panoramic hill country views. 1.5 hours from Austin. $8 entry. Best hike if your group is fit and wants a challenge.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">Jacob\'s Well</div>
            <div className="hp2-feature-card__desc">A natural spring and karst window with 12-foot cliff jumping. Reservations required. Near Wimberley, 45 min from Austin. Secret gem for adventure groups.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">★</div>
            <div className="hp2-feature-card__title">McKinney Falls</div>
            <div className="hp2-feature-card__desc">State park inside Austin city limits. Waterfalls, swim holes, short hikes. $6 entry. Ideal for a morning adventure before the afternoon ATX Disco Cruise.</div>
          </div>
        </div>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">3-Day Adventure Itinerary</div>
          <h2 className="hp2-section__headline">
            The full adventure <em>weekend</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Fri AM</div>
              <div className="hp2-feature-card__title">Zipline Adventures</div>
              <div className="hp2-feature-card__desc">Lake Travis Zipline 10 AM-1 PM. 5 ziplines, 200 feet above the water. Lunch at the on-site grill. 30 min back to Austin.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Fri PM</div>
              <div className="hp2-feature-card__title">Rainey Street Happy Hour</div>
              <div className="hp2-feature-card__desc">Rest, shower, hit Rainey Street patios. Bangers for beer, Container Bar for cocktails. Dinner at Laundrette or Comedor.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Sat 11-3</div>
              <div className="hp2-feature-card__title">ATX Disco Cruise</div>
              <div className="hp2-feature-card__desc">The main event. 4 hours on Lake Travis with DJ, floats, swim stop. $105/person. The perfect midpoint of the adventure weekend.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Sat PM</div>
              <div className="hp2-feature-card__title">6th Street / Rainey Round 2</div>
              <div className="hp2-feature-card__desc">Dinner at Uchi or Este. 6th Street or back to Rainey. Late-night pizza at Home Slice. Early-ish bed for Sunday adventure.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Sun AM</div>
              <div className="hp2-feature-card__title">Paddleboard Lady Bird</div>
              <div className="hp2-feature-card__desc">8 AM SUP rental at Rowing Dock. 1-2 hour paddle past the skyline. Recovery-friendly — most groups nap on the boards.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Sun PM</div>
              <div className="hp2-feature-card__title">Barton Springs + Brunch</div>
              <div className="hp2-feature-card__desc">Float Barton Springs 11 AM. Brunch at Launderette or June\'s All Day. Flights home. The adventure weekend wraps with a swim.</div>
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <p className="hp2-section__body">
              Related: <a href="/3-day-austin-bachelorette-itinerary-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>3-day Austin bachelorette itinerary</a> · <a href="/ultimate-austin-bachelorette-weekend-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Ultimate weekend guide</a> · <a href="/top-10-austin-bachelorette-ideas-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Top 10 bachelorette ideas</a> · <a href="/bachelorette-party-austin" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Austin bachelorette main page</a>
            </p>
          </div>
        </div>
      </section>
    </V2PageTemplate>
  );
}
