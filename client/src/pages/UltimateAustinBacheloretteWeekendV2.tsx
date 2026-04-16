import V2PageTemplate from '@/components/V2PageTemplate';

export default function UltimateAustinBacheloretteWeekendV2() {
  const faqs = [
    {
      q: 'What makes the ultimate Austin bachelorette weekend?',
      a: 'The ultimate Austin bachelorette weekend combines the ATX Disco Cruise on Lake Travis (Austin\'s #1 bachelorette activity — DJ, photographer, floats, $85-$105/person), Rainey Street nightlife, Uchi or Jeffrey\'s dinner, Milk + Honey spa day, and Sunday brunch at Launderette. 3 days, 4-5 anchor activities, mix of daytime water fun and evening bar crawls. This is the formula refined from 15 years of Austin bachelorette weekends and 150,000+ guests.'
    },
    {
      q: 'How long should the ultimate Austin bachelorette weekend be?',
      a: '3 days (Friday-Sunday) is the sweet spot for the ultimate Austin bachelorette weekend. 2 days feels rushed, 4+ days is expensive and hard to coordinate. A 3-day weekend gives you: Friday arrival + Rainey Street nightlife, Saturday ATX Disco Cruise + 6th Street, Sunday brunch + spa + flights home. Some destination groups add a Thursday arrival or Monday departure for travel buffer.'
    },
    {
      q: 'What is included in the ultimate Austin bachelorette weekend package?',
      a: 'The ultimate Austin bachelorette weekend includes: 2 nights lodging at Hotel Van Zandt or The LINE ($300-$500/person), ATX Disco Cruise Saturday 11 AM-3 PM ($105/person), private Friday sunset charter on Lake Travis ($200-$500/hr), fine dining at Uchi + Jeffrey\'s ($150-$250/person across both), Milk + Honey spa day ($150-$250/person), party bus to the marina ($60-$100/person split), professional photographer ($75-$150/person split), and rideshare for the rest. Total: $1,000-$1,800/person.'
    },
    {
      q: 'When is the best time of year for an Austin bachelorette weekend?',
      a: 'The best months for an ultimate Austin bachelorette weekend are April, May, September, and October — perfect 70-85°F weather, the ATX Disco Cruise is running, and Texas Hill Country is beautiful. March is great but can be busy with SXSW and spring break. June-August is hot (100°F+) but the water feels incredible. November-February is off-season — cheaper, less crowded, but the ATX Disco Cruise doesn\'t run (private charters available year-round).'
    },
    {
      q: 'How far in advance should we book the ultimate Austin bachelorette weekend?',
      a: 'Book the ultimate Austin bachelorette 3-4 months in advance: (1) ATX Disco Cruise 6-8 weeks ahead for Saturdays; (2) Hotel (Hotel Van Zandt, The LINE, Four Seasons) 3-4 months for peak season; (3) Uchi reservation 6+ weeks ahead; (4) Milk + Honey spa 4-6 weeks; (5) Hamilton Pool permit 90 days; (6) Private Lake Travis charter 2-3 months; (7) Flights 3-4 months for best prices; (8) Jeffrey\'s or Comedor 4-6 weeks. Call us 4-6 months out for major holiday weekends.'
    },
    {
      q: 'Can we combine the ATX Disco Cruise with a private charter for the ultimate weekend?',
      a: 'Yes — the ultimate Austin bachelorette formula combines both. Friday: book a private Lake Travis sunset charter 5-9 PM on Clever Girl ($250-$500/hr, 4-hour minimum) with Ultimate decor package ($250-$350 flat). Saturday: book the ATX Disco Cruise 11 AM-3 PM ($105/person) for the peak energy shared party experience with professional DJ and photographer. Two completely different lake experiences in one weekend. Some groups even do Friday AND Sunday private charters plus Saturday Disco Cruise.'
    },
    {
      q: 'What restaurants are essential for the ultimate Austin bachelorette?',
      a: 'Essential Austin bachelorette restaurants: (1) Uchi (omakase sushi, private dining, 6+ weeks advance — the signature Austin fine dining experience); (2) Jeffrey\'s (classic upscale American, garden patio, private dining); (3) Comedor (modern Mexican, downtown, chef-driven); (4) Laundrette (East Austin cool, brunch and dinner); (5) June\'s All Day (SoCo brunch with bloody marys); (6) Launderette (Sunday brunch, East Austin hip); (7) Geraldine\'s (Hotel Van Zandt, live music dinner); (8) Red Ash (Italian, chef\'s counter).'
    },
    {
      q: 'What hotels are best for the ultimate Austin bachelorette weekend?',
      a: 'Best hotels for the ultimate Austin bachelorette: (1) Hotel Van Zandt on Rainey Street — rooftop pool, Geraldine\'s restaurant, walkable to Rainey nightlife ($300-$500/night); (2) The LINE Austin — lakefront, P6 rooftop, modern luxury ($350-$550/night); (3) Four Seasons Austin — waterfront, full spa, classic luxury ($500-$800/night); (4) W Austin — 2nd Street, pool, party-friendly ($300-$500/night); (5) Fairmont Austin — rooftop pool, downtown ($300-$450/night). Book connecting rooms or a suite for the bride tribe.'
    },
    {
      q: 'What activities are must-dos for the ultimate Austin bachelorette weekend?',
      a: 'Must-do activities for the ultimate Austin bachelorette: (1) ATX Disco Cruise on Lake Travis — the anchor; (2) Rainey Street bar crawl on Friday night; (3) 6th Street after Saturday\'s cruise (Pete\'s Dueling Pianos especially); (4) P6 rooftop sunset at The LINE; (5) Milk + Honey spa day on Sunday; (6) South Congress mural photo walk; (7) Brunch at June\'s All Day or Launderette; (8) Fine dining night at Uchi or Jeffrey\'s. Hit 5-6 of these 8 and the weekend is legendary.'
    },
    {
      q: 'How much does the ultimate Austin bachelorette weekend cost?',
      a: 'The ultimate Austin bachelorette weekend costs $800-$1,800 per person depending on the tier: (1) Mid-tier ultimate ($800-$1,000/person) — Hotel Magdalena, ATX Disco Cruise Saturday, Uchi dinner, 1 spa massage, rideshare; (2) Full ultimate ($1,000-$1,500/person) — Hotel Van Zandt, Disco Cruise + private Friday sunset charter, Uchi + Jeffrey\'s, full spa day, party bus; (3) VIP ultimate ($1,500-$2,500/person) — Four Seasons or Austin Proper, private chef, professional photographer, multiple charters, custom decor, limo. Most groups land at $1,000-$1,300.'
    },
    {
      q: 'What does the Saturday of the ultimate Austin bachelorette look like?',
      a: 'Ultimate Austin bachelorette Saturday schedule: 9 AM breakfast at Counter Cafe or hotel. 10 AM party bus to Anderson Mill Marina (25 min). 10:45 AM arrive + board Clever Girl. 11 AM-3 PM ATX Disco Cruise — DJ, 14 disco balls, photographer, swim stop in crystal cove, giant lily pad floats. 3:30 PM back to hotel for shower + nap. 5:30 PM sunset drinks at P6. 6:30 PM Uchi dinner with sake pairings. 9 PM 6th Street + Pete\'s Dueling Pianos. 12:30 AM late-night tacos at Home Slice. The peak day.'
    },
    {
      q: 'What is the ultimate Austin bachelorette Friday itinerary?',
      a: 'Ultimate Austin bachelorette Friday: 2 PM arrive, check into Hotel Van Zandt. 3:30 PM welcome cocktails at the rooftop pool. 5 PM private Lake Travis sunset charter on Clever Girl or Day Tripper (if luxury tier) OR start Rainey Street bar crawl (if classic tier). 7 PM dinner at Jeffrey\'s or Laundrette. 9 PM Rainey Street — Bangers, Container Bar, Unbarlievable, Lustre Pearl. 1 AM late-night food. Don\'t go too hard — Saturday\'s the big day.'
    },
    {
      q: 'What is the ultimate Austin bachelorette Sunday itinerary?',
      a: 'Ultimate Austin bachelorette Sunday: 9 AM recovery. 10:30 AM brunch at Launderette, June\'s All Day, or Elizabeth Street Cafe. 12:30 PM Milk + Honey spa day (60-min massages, $150-$250/person, book 4-6 weeks ahead). 3 PM South Congress stroll — Allens Boots, Hotel San Jose courtyard photos, Big Top Candy Shop. 4 PM Barton Springs float (optional, hangover-friendly). 6 PM light dinner + bride toast at the hotel. Early bed. Flights Monday morning. Relaxed close to the weekend.'
    },
    {
      q: 'What add-ons elevate the ultimate Austin bachelorette weekend?',
      a: 'Ultimate Austin bachelorette upgrades: (1) Professional photographer for the full weekend ($1,500-$3,000); (2) Party bus for boat day ($600-$1,200); (3) Ultimate decor package on the private charter ($250-$350 flat); (4) Private chef dinner at the Airbnb Friday night ($125-$175/person); (5) Matching custom swimsuits and robes ($75-$150/person); (6) Welcome bags with local gifts ($25-$50/person); (7) Milk + Honey bridal bachelorette package (group room, champagne, $200-$350/person); (8) Video recap ($500-$1,500 one-time).'
    },
    {
      q: 'Is Austin better than Nashville for the ultimate bachelorette weekend?',
      a: 'Austin beats Nashville for the ultimate bachelorette weekend on several metrics: (1) Lake Travis boat parties (Nashville doesn\'t have anything like the ATX Disco Cruise); (2) 25-40% cheaper overall ($1,000-$1,500/person in Austin vs $1,400-$2,200 in Nashville); (3) Better food scene (Uchi, Jeffrey\'s, Comedor vs Nashville\'s hot chicken focus); (4) Cheaper flights (major hub); (5) More outdoor activities (hill country, Hamilton Pool). Nashville wins on country music and pedal-pubs. Both are great — Austin is the better value for ultimate experiences.'
    },
    {
      q: 'How do we book the ultimate Austin bachelorette weekend?',
      a: 'Book the ultimate Austin bachelorette in this order: (1) ATX Disco Cruise first at /atx-disco-cruise (books 6-8 weeks out for Saturdays); (2) Hotel Van Zandt or The LINE (3-4 months out); (3) Flights (3-4 months out); (4) Private charter for Friday sunset if going luxury (2-3 months out); (5) Uchi and Jeffrey\'s (6+ weeks); (6) Milk + Honey spa (4-6 weeks); (7) Hamilton Pool permits (90 days); (8) Party bus (2-3 weeks). Call (512) 488-5892 for full weekend planning — we handle the boat days and recommend Austin vendors.'
    }
  ];

  return (
    <V2PageTemplate
      pageUrl="/ultimate-austin-bachelorette-weekend-v2"
      pageTitle="Ultimate Austin Bachelorette Weekend | Complete Guide | Premier Party Cruises"
      pageDescription="The ultimate Austin bachelorette weekend guide. ATX Disco Cruise, private Lake Travis charters, Rainey Street, 6th Street, Uchi dinners, Milk + Honey spa — the complete 3-day playbook from 15 years of Austin bachelorette experience."
      heroEyebrow="Ultimate Weekend · Austin · Lake Travis"
      heroHeadline={<>The ultimate Austin bachelorette <em>weekend</em></>}
      heroBody="The complete 3-day playbook. ATX Disco Cruise on Lake Travis, Friday Rainey Street, Uchi dinner, Milk + Honey spa, 6th Street after the boat, P6 rooftop sunsets. Built from 150,000+ guests and 15 years of Austin bachelorette experience. Everything you need, nothing you don't."
      primaryCta={{ text: 'Book Disco Cruise', href: '/atx-disco-cruise' }}
      secondaryCta={{ text: 'Private Charter Quote', href: '/private-cruises' }}
      faqs={faqs}
      finalCtaHeadline={<>The ultimate Austin bachelorette <em>starts now</em>.</>}
      finalCtaBody="The ATX Disco Cruise is the anchor. Book Saturday 11 AM-3 PM at $105/person all-inclusive — DJ, photographer, 14 disco balls, swim stop, everything included. Then build the ultimate weekend around it."
    >
      <section className="hp2-section">
        <div className="hp2-section__label">The Complete Weekend Formula</div>
        <h2 className="hp2-section__headline">
          15 years. 150,000 guests. <em>One</em> formula.
        </h2>
        <p className="hp2-section__body">
          The ultimate Austin bachelorette weekend isn\'t a mystery — it\'s a formula refined from thousands of bachelorette groups over 15 years. Three days, five anchor activities, mix of daytime water fun and evening nightlife, pair fine dining with casual brunch, and always center the weekend on the <a href="/atx-disco-cruise" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>ATX Disco Cruise</a> on Lake Travis.
        </p>
        <p className="hp2-section__body">
          This page is the complete playbook. Hour-by-hour itinerary for Friday, Saturday, and Sunday. Which hotel to book. Which restaurants to reserve. Which time slot of the ATX Disco Cruise to pick (spoiler: Saturday 11 AM-3 PM for maximum day/night integration). How to split costs. What to wear. What to skip. The full system, bookable today.
        </p>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Friday — Day 1</div>
          <h2 className="hp2-section__headline">
            Arrival, Rainey, and the <em>warm-up</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">2 PM</div>
              <div className="hp2-feature-card__title">Arrive & Check In</div>
              <div className="hp2-feature-card__desc">Hotel Van Zandt (Rainey Street) or The LINE Austin (downtown lakefront). Drop bags, group photos in the lobby, distribute welcome bags with hangover kits.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">4 PM</div>
              <div className="hp2-feature-card__title">Rooftop Welcome Cocktails</div>
              <div className="hp2-feature-card__desc">P6 at The LINE or Hotel Van Zandt rooftop pool. First official toast. Golden-hour group photos with the bride in her "Bride" sash.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">5 PM</div>
              <div className="hp2-feature-card__title">Optional: Private Sunset Charter</div>
              <div className="hp2-feature-card__desc">Luxury tier add-on. Private Clever Girl or Day Tripper charter 5-9 PM ($200-$500/hr). Intimate sunset on Lake Travis with Ultimate decor package.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">7 PM</div>
              <div className="hp2-feature-card__title">Dinner on Rainey Street</div>
              <div className="hp2-feature-card__desc">Geraldine\'s (Hotel Van Zandt, live music) or walk to Laundrette/Comedor downtown. 2-course dinner with wine. Private dining for 10+ guests.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">9 PM</div>
              <div className="hp2-feature-card__title">Rainey Street Bar Crawl</div>
              <div className="hp2-feature-card__desc">Bangers → Container Bar → Unbarlievable rooftop → Lustre Pearl. 3-block walkable crawl, no covers, craft cocktails, live music.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">1 AM</div>
              <div className="hp2-feature-card__title">Late Tacos, Early Bed</div>
              <div className="hp2-feature-card__desc">Don Japanese or Veracruz. Hydrate aggressively. Back to the hotel. Saturday\'s ATX Disco Cruise is a 4-hour cardio session — rest up.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Saturday — Day 2 (The Peak)</div>
        <h2 className="hp2-section__headline">
          The <em>ATX Disco Cruise</em> day.
        </h2>
        <p className="hp2-section__body">
          Saturday is the gravitational center of the ultimate Austin bachelorette weekend. Everything builds to the 11 AM-3 PM ATX Disco Cruise on Clever Girl — 4 hours of professional DJ, 14 disco balls, dance floor, giant lily pad floats, a crystal-clear cove swim stop, and a professional photographer capturing every moment. $105/person, tax and gratuity included. The most photographed bachelorette activity in Austin.
        </p>
        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">9 AM</div>
            <div className="hp2-feature-card__title">Hearty Breakfast</div>
            <div className="hp2-feature-card__desc">Counter Cafe (best breakfast in Austin), hotel buffet, or breakfast tacos from Veracruz. Eat big. You\'re about to dance for 4 hours on a boat.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">10 AM</div>
            <div className="hp2-feature-card__title">Depart for Marina</div>
            <div className="hp2-feature-card__desc">Party bus or rideshare to Anderson Mill Marina (13993 FM 2769, Leander). 25 minutes. Load BYOB coolers on the way. Arrive by 10:45 AM.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">11 AM–3 PM</div>
            <div className="hp2-feature-card__title">ATX Disco Cruise</div>
            <div className="hp2-feature-card__desc">4 hours on Clever Girl. DJ, 14 disco balls, dance floor, swim stop, giant floats, photographer. $105/person all-inclusive. The peak moment of the weekend.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">3:30 PM</div>
            <div className="hp2-feature-card__title">Hotel Recovery</div>
            <div className="hp2-feature-card__desc">Shower, aloe, 45-minute power nap. Pedialyte. Hotel pool if you have energy. Touch up hair and makeup for the nice dinner.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">6:30 PM</div>
            <div className="hp2-feature-card__title">Uchi or Jeffrey\'s Dinner</div>
            <div className="hp2-feature-card__desc">The signature fine dining moment. Omakase at Uchi or a private dining room at Jeffrey\'s. Book 6+ weeks ahead. This is the weekend\'s memorable meal.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">9 PM</div>
            <div className="hp2-feature-card__title">6th Street + Pete\'s</div>
            <div className="hp2-feature-card__desc">Pete\'s Dueling Pianos (bride gets dragged on stage, it\'s tradition). Then Blind Pig or Maggie Mae\'s rooftop. Home Slice pizza at 1 AM. Weekend peak.</div>
          </div>
        </div>
      </section>

      <section className="hp2-section--alt">
        <div className="hp2-section__inner">
          <div className="hp2-section__label">Sunday — Day 3</div>
          <h2 className="hp2-section__headline">
            Brunch, spa, and the <em>goodbye</em>.
          </h2>
          <div className="hp2-feature-grid">
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">10:30 AM</div>
              <div className="hp2-feature-card__title">Recovery Brunch</div>
              <div className="hp2-feature-card__desc">Launderette (East Austin cool), June\'s All Day (SoCo, legendary bloody marys), or Elizabeth Street Cafe (French-Vietnamese). Bottomless mimosas.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">12:30 PM</div>
              <div className="hp2-feature-card__title">South Congress Stroll</div>
              <div className="hp2-feature-card__desc">Photo walk: "I love you so much" mural, Allens Boots for Texas boots, Big Top Candy Shop, Hotel San Jose courtyard. Easy recovery activity.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">2 PM</div>
              <div className="hp2-feature-card__title">Milk + Honey Spa</div>
              <div className="hp2-feature-card__desc">60-min massages, group room, champagne service. Bridal bachelorette package $200-$350/person. Book 4-6 weeks ahead. The recovery peak.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">4 PM</div>
              <div className="hp2-feature-card__title">Barton Springs Float</div>
              <div className="hp2-feature-card__desc">68°F natural spring pool, $9 entry. The classic Austin recovery move. Float, float, float. Or hotel pool if the group is truly wiped.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">6 PM</div>
              <div className="hp2-feature-card__title">Farewell Dinner</div>
              <div className="hp2-feature-card__desc">Suerte, Este, or easy pizza at Home Slice. The final bride toast. Everyone shares their favorite memory from the weekend. Tears happen.</div>
            </div>
            <div className="hp2-feature-card">
              <div className="hp2-feature-card__num">Mon AM</div>
              <div className="hp2-feature-card__title">Flights Home</div>
              <div className="hp2-feature-card__desc">Breakfast tacos at Veracruz. Final group photo in the lobby. 20-min Uber to ABIA. Most flights by noon. Weekend wraps.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hp2-section">
        <div className="hp2-section__label">Cost & Logistics</div>
        <h2 className="hp2-section__headline">
          Budget, booking, and <em>getting it right</em>.
        </h2>
        <p className="hp2-section__body">
          The ultimate Austin bachelorette weekend typically costs $1,000-$1,500 per person for the "full" experience — mid-luxury hotel, ATX Disco Cruise, one fine dining night, spa day, and nightlife. Below is the breakdown and the booking order. Book in this sequence for the smoothest planning process.
        </p>
        <div className="hp2-feature-grid">
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Step 1</div>
            <div className="hp2-feature-card__title">Book the Cruise First</div>
            <div className="hp2-feature-card__desc">ATX Disco Cruise at /atx-disco-cruise. 6-8 weeks ahead for Saturday slots. $85-$105/person. The anchor of the weekend — book this first.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Step 2</div>
            <div className="hp2-feature-card__title">Hotel & Flights</div>
            <div className="hp2-feature-card__desc">3-4 months ahead. Hotel Van Zandt ($300-$500/night) or The LINE ($350-$550/night). Flights to ABIA via Southwest, American, United.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Step 3</div>
            <div className="hp2-feature-card__title">Fine Dining & Spa</div>
            <div className="hp2-feature-card__desc">Uchi 6+ weeks, Jeffrey\'s 4-6 weeks, Milk + Honey 4-6 weeks. Lock these in right after the cruise and hotel.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Step 4</div>
            <div className="hp2-feature-card__title">Add-Ons & Transport</div>
            <div className="hp2-feature-card__desc">Private Friday charter 2-3 months out. Party bus 2-3 weeks. Photographer 4-6 weeks. Custom matching items 3-4 weeks.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Step 5</div>
            <div className="hp2-feature-card__title">Final Details</div>
            <div className="hp2-feature-card__desc">Day-of reservations (Rainey Street patio tables), welcome bags assembly, BYOB Costco run, group text with schedule. Final week stuff.</div>
          </div>
          <div className="hp2-feature-card">
            <div className="hp2-feature-card__num">Total</div>
            <div className="hp2-feature-card__title">$1,000–$1,500/Person</div>
            <div className="hp2-feature-card__desc">All-in for the ultimate 3-day Austin bachelorette. Budget tier $500-$700, luxury tier $1,500-$2,500. Most groups land in the middle.</div>
          </div>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <p className="hp2-section__body">
            Related: <a href="/bachelorette-party-austin" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Main bachelorette page</a> · <a href="/3-day-austin-bachelorette-itinerary-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>3-day itinerary</a> · <a href="/top-10-austin-bachelorette-ideas-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Top 10 bachelorette ideas</a> · <a href="/luxury-austin-bachelorette-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Luxury guide</a> · <a href="/budget-austin-bachelorette-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Budget guide</a> · <a href="/austin-bachelorette-nightlife-v2" style={{ color: 'var(--hp2-gold)', textDecoration: 'underline' }}>Nightlife guide</a>
          </p>
        </div>
      </section>
    </V2PageTemplate>
  );
}
