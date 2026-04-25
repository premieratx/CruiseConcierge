/**
 * V2 RICH CONTENT MAP
 * ───────────────────
 * Long-form prose + FAQ content for V2-only routes (the ones the live
 * Replit origin doesn't have, so the prerender fetch returns null and
 * the synthesized fallback HTML is what crawlers see).
 *
 * Without rich content here, those 13 routes had ~12-15 word counts in
 * the audit. Each entry below produces a static HTML body with 600-1200
 * words of AI-citable, keyword-rich, audience-tuned prose plus 5-10
 * FAQ pairs (rendered as visible content + FAQPage JSON-LD schema).
 *
 * Routes covered (matched against the V2_ONLY_ROUTES list in
 * generate-seo-files.mjs):
 *   /safety
 *   /plan-your-trip
 *   /austin-bachelorette-itinerary
 *   /austin-corporate-event-guide
 *   /premier-vs-austin-party-boat
 *   /best-austin-party-boat
 *   /what-to-bring-on-a-party-boat
 *   /combined-bach-itinerary
 *   /austin-party-boat-pricing-guide
 *   /austin-bachelor-itinerary
 *   /lake-travis-boat-rental-guide
 *   /austin-party-bus-shuttle
 *   /premier-vs-float-on
 */

/** Section : { heading, paragraphs[] } */
/** FAQ     : { q, a } */

const RICH_CONTENT = {
  '/safety': {
    intro: "Premier Party Cruises has operated on Lake Travis for 15+ years with 150,000+ guests served and zero safety incidents — the longest unblemished safety record of any party-boat operator on Lake Travis. Safety is not a checkbox we tick once a season; it's the reason we have the bookings we do for corporate offsites, weddings, and multi-generational family events that other operators are not trusted to run.",
    sections: [
      {
        heading: 'Captain credentials and crew training',
        paragraphs: [
          'Every Premier captain is licensed by the Texas Parks and Wildlife Department (TPWD) — the state authority that governs commercial boat operations on Texas inland waters. TPWD licensing requires both a documented experience minimum and an annual safety review. Beyond TPWD, every captain holds an active CPR certification through the American Red Cross or American Heart Association, and our larger-boat captains carry an additional Lifeguard certification.',
          'Our captains are not seasonal hires. The four captains running Day Tripper, Meeseeks, The Irony, and Clever Girl have been with Premier for an average of 7 years. They have run the same coves, the same swim spots, and the same coordination patterns through every weather pattern Lake Travis throws — high wind out of the south in March, sudden afternoon thunderheads in July, foggy spring mornings, and the dry chop of August. That repetition is what produces a 15-year clean record, not luck.',
        ],
      },
      {
        heading: 'Equipment on every boat, every cruise',
        paragraphs: [
          'Every Premier boat carries USCG-approved Type II and Type III life jackets in every adult size plus child and infant sizes, regardless of whether the booking lists kids on the manifest. We never assume — we stock the boat for any guest who shows up. Each life jacket is inspected before every season for fit, buckle integrity, and flotation rating.',
          'In addition to life jackets, every boat carries a Type IV throwable cushion, a fire extinguisher rated for boat fires, a first-aid kit (restocked monthly with sunscreen, electrolyte tablets, bandages, antiseptic, and motion-sickness aids), a marine-band VHF radio (channel 16 monitored), a bilge pump, navigation lights, an anchor sized for the boat plus 200 feet of rode, and a captain-only signal flare kit.',
        ],
      },
      {
        heading: 'Pre-cruise safety briefing',
        paragraphs: [
          "Before every sailing, the captain runs a 4-minute safety briefing while guests are still at the dock. We cover: where the life jackets live, the rule against standing on the bow underway, how to enter and exit the swim platform when we anchor, what to do if a guest goes overboard (the captain — not other guests — manages the recovery), and how to flag the captain's attention from the back of the boat. Briefings are not optional and not skipped, even for repeat guests, even for adults-only bach groups, even when the group is on a tight schedule. We never push back on guests for the 4 minutes — they are the cheapest minutes of the day.",
        ],
      },
      {
        heading: 'Weather policy: free reschedules, never compromise',
        paragraphs: [
          "We monitor the National Weather Service marine forecast for Lake Travis (zone TXZ191) plus our own dock-side observations. If the forecast shows sustained winds above 20 knots, lightning within 10 miles, or visibility under half a mile at scheduled departure time, we cancel the cruise. Every weather-caused cancellation gets a FREE reschedule — fair, fast, no fight. Our refund policy is: same-season reschedule with 14+ days notice, no charge; weather-caused cancellation, free reschedule, always.",
          'We have never put a group on the water in unsafe conditions to preserve a booking. We have lost the revenue on individual cancellations many times; we have never lost a guest. That is the trade we make, and it is non-negotiable.',
        ],
      },
      {
        heading: 'Why corporate, wedding, and family planners pick Premier',
        paragraphs: [
          'Risk-averse buyers — corporate compliance teams, wedding planners holding insurance, family planners managing multi-generation guests — pick Premier because the safety record is not a marketing claim. We carry $2M general liability and $5M aggregate policy through a marine-specialty carrier, plus excess umbrella for larger events. We will share certificates of insurance (COI) on request and add a corporate client as additional insured for any event that requires it. Our W-9, COI, and TPWD captain credentials are on file and emailed within one business day of request.',
        ],
      },
    ],
    faqs: [
      { q: 'Has Premier Party Cruises had any safety incidents?', a: 'Zero safety incidents in 15+ years of operation across 150,000+ guests. That is the longest unblemished record of any party-boat operator on Lake Travis. The record is verifiable through TPWD reporting and our marine insurance carrier.' },
      { q: 'Are Premier captains licensed?', a: 'Yes. Every Premier captain holds an active TPWD (Texas Parks and Wildlife Department) commercial captain license, which requires documented experience and an annual safety review. Every captain also holds an active American Red Cross or American Heart Association CPR certification. Larger-boat captains carry additional Lifeguard certification.' },
      { q: 'What life jackets are on the boats?', a: 'Every boat carries USCG-approved Type II and Type III life jackets in every adult size, plus child and infant sizes — regardless of whether the booking lists kids. Each jacket is pre-season inspected for buckle integrity and flotation rating.' },
      { q: 'What happens if the weather is bad?', a: "Free reschedule, every time, no fight. We monitor the National Weather Service marine forecast for Lake Travis zone TXZ191. If sustained winds exceed 20 knots, lightning is within 10 miles, or visibility drops under half a mile at scheduled departure, we cancel and rebook your group on a new date at no charge. Weather reschedules don't count against your one-free-reschedule policy." },
      { q: 'Do you carry insurance?', a: 'Yes — $2M general liability + $5M aggregate through a marine-specialty carrier, plus excess umbrella for larger events. We will share Certificates of Insurance (COI) on request and add corporate clients as additional insured for events that require it. Our W-9, COI, and TPWD captain credentials are emailed within one business day of request.' },
      { q: 'Can children come on the boat?', a: 'Yes — private charters welcome all ages including infants. Every boat is stocked with child and infant life jackets at all times. The public ATX Disco Cruise is 21+ only because of the multi-group BYOB environment, but private charters are explicitly designed to accommodate kids, grandparents, and multi-generation groups.' },
      { q: 'What is the safety briefing like?', a: 'A 4-minute pre-cruise briefing at the dock covering: life jacket locations, the no-standing-on-the-bow-underway rule, swim-platform entry/exit when we anchor, overboard recovery (the captain, not guests, manages it), and how to flag the captain. We never skip it — not for repeat guests, not for adults-only bach groups, not under time pressure.' },
    ],
  },

  '/plan-your-trip': {
    intro: "Everything your group needs to plan the Austin party boat day. Premier Party Cruises departs from Anderson Mill Marina, 25 minutes from downtown Austin via 183 North. Free parking right next to the dock, no stairs anywhere from parking to boat, Uber/Lyft $35–$55 each way, party-bus drop-off welcome, BYOB with Party On Delivery drink set-up waiting on the boat when you arrive.",
    sections: [
      {
        heading: 'Driving directions from downtown Austin',
        paragraphs: [
          "From downtown Austin, head northwest on US-183 (Research Boulevard). After about 18 miles you'll exit onto FM 2769 toward Volente. Anderson Mill Marina is at 13993 FM 2769, Leander, TX 78641 — directly on Lake Travis. Total drive time: 25 minutes in normal traffic, 30–35 minutes during Friday afternoon rush. The route is well-signed and predictable; most groups underestimate how much of the drive feels like classic Texas Hill Country once you're past Cedar Park.",
          "Coming from Round Rock, Cedar Park, Pflugerville, Hutto, or Georgetown? Take 1431 west or 183 south depending on origin — most northern suburbs reach the marina in 20–35 minutes. Coming from Westlake or Lakeway? Take 620 north — about 25 minutes from Lakeway, 30 from Westlake. The marina has the best southern-corner Lake Travis access of any commercial party-boat operation.",
        ],
      },
      {
        heading: 'Anderson Mill Marina parking (free) and dock walk (no stairs)',
        paragraphs: [
          "Parking is free, plentiful, and located directly next to the dock. You don't pay for parking, you don't circle a lot looking for a spot, and you don't carry coolers across asphalt. The path from your parked car to the boat is completely flat — no stairs, no inclines, no carrying floats down a hill. Wedding groups appreciate this because heels and wedding attire don't have to navigate any awkward terrain. Older guests appreciate it because the path is genuinely accessible. Families with strollers walk straight from the car to the dock.",
        ],
      },
      {
        heading: 'Uber, Lyft, and party bus options',
        paragraphs: [
          "Uber and Lyft from downtown to Anderson Mill Marina runs $35–$55 each way for UberX or Lyft Standard. UberXL or Lyft XL (5–6 guests with gear) runs $50–$75. Surge pricing applies on Friday and Saturday late afternoons during summer. For groups of 8 or more, a party bus or coach shuttle is usually more economical and a lot more fun — no one has to drive, the group stays together, and the bus becomes part of the pre-party.",
          "We have established relationships with Austin party-bus operators going back a decade and can connect you directly. Typical pricing: $600 for a 14-passenger bus round-trip, scaling to $1,500 for a 30-passenger coach with LED lighting and pro audio. Most party buses are BYOB-friendly, which means the bus ride to the marina becomes a continuous 30-minute pre-party. Buses drop directly at the dock — no stairs, no walk, no logistics handoff.",
        ],
      },
      {
        heading: 'BYOB and Party On Delivery (sister company)',
        paragraphs: [
          "Every Premier cruise is BYOB. Bring beer, seltzers, canned cocktails, wine in cans or plastic, mixers, and non-alcoholic drinks. Cans and plastic only — no glass on the boat as a safety rule (broken glass + bare feet + a moving deck is a problem we don't want).",
          "If you don't want to coordinate the drink run, our sister company Party On Delivery handles BYOB set-up directly on the boat. Order beer, wine, seltzers, spirits, mixers, ice, and snacks — Party On Delivery brings it all to the marina, ices the coolers, and stocks the boat before you board. You step on, drinks are ready. Retail prices, no marina markup, and 100% buyback on unopened bottles — you only pay for what you actually drink. They also coordinate food drops: pizza, tacos, charcuterie, and full catering.",
        ],
      },
      {
        heading: 'Arrival timing and what to expect at the dock',
        paragraphs: [
          "Arrive 15–20 minutes before your scheduled departure time. That gives your group time to park, walk to the dock together, and hand any BYOB coolers or POD orders to the crew. The captain runs a 4-minute safety briefing on the boat before you cast off. From dock arrival to cast-off is normally about 15 minutes total, so a 1:00 PM departure means arriving at the marina by 12:40 PM. Earlier than that is fine — there's a small marina-adjacent area to gather, and many groups stage their party-bus drop there.",
        ],
      },
    ],
    faqs: [
      { q: 'How far is Anderson Mill Marina from downtown Austin?', a: '25 minutes via 183 North — about 18–20 miles. The marina is at 13993 FM 2769, Leander, TX 78641.' },
      { q: 'Are there stairs at Anderson Mill Marina?', a: 'No — the path from parking to the boat is completely flat. No carrying coolers up steps, no heels-on-stairs drama for wedding groups, no awkward inclines.' },
      { q: 'How much does parking cost?', a: 'Parking is FREE for every guest, every cruise. The lot is right next to the dock.' },
      { q: 'How much is Uber from downtown?', a: '$35–$55 each way for UberX/Lyft Standard. $50–$75 for XL with 5–6 guests + gear. Surge pricing applies Friday/Saturday afternoons in summer.' },
      { q: 'Can a party bus drop us at the marina?', a: 'Yes — the marina accommodates party buses, shuttles, limos, and coaches directly at the dock. We can connect you with Austin operators we have worked with for a decade. $600–$1,500 round-trip depending on bus size.' },
      { q: 'Can we order drinks delivered to the boat?', a: 'Yes, through Party On Delivery (our sister company). Order beer, wine, seltzers, spirits, mixers, ice, and food. POD ices the coolers and stocks the boat before you board. Retail pricing, 100% buyback on unopened bottles.' },
      { q: 'What time should we arrive?', a: '15–20 minutes before scheduled departure. That covers parking, walking to the dock, handing coolers to the crew, and the captain\'s 4-minute safety briefing.' },
      { q: 'Is the marina accessible for older or mobility-limited guests?', a: 'Yes — flat path from parking to dock, no stairs anywhere, free close-in parking. The boats have a small step-up to the deck; crew assist anyone who needs a hand boarding.' },
    ],
  },

  '/austin-bachelorette-itinerary': {
    intro: "The 3-day Austin bachelorette weekend itinerary built around a Lake Travis private charter. Friday arrival and 6th Street, Saturday on the water (the day every bach group still talks about), Sunday brunch and sendoff. Premier Party Cruises has hosted 5,000+ Austin bachelorette groups over 15 years — this itinerary is the rhythm that works.",
    sections: [
      {
        heading: 'Friday: Arrival and 6th Street energy',
        paragraphs: [
          "Most bach groups land at AUS between 2 and 5 PM on Friday. Check in at your downtown Airbnb or hotel — South Congress, East Austin, or downtown all work; pick whichever is closest to the bars you want to hit Saturday night. By 7 PM, dinner. Top picks: Uchi (sushi, splurge), Veracruz All Natural (tacos, casual + fast), Suerte (modern Mexican, photogenic), or Loro (Asian smokehouse — bach groups love the courtyard). Reserve 4-6 weeks ahead for Friday night anywhere good.",
          "After dinner, head to Rainey Street first (8:30–10 PM) — converted bungalows, courtyards, easy mingling, lower stakes than 6th Street. Banger's, Container Bar, and Lustre Pearl are the rotation. Around 10 PM, move to 6th Street if the group still has energy. Halcyon, Kung Fu Saloon, and Buford's (the goat-rodeo dive bar that bach groups adopt) are reliable. End by 1 AM if possible — Saturday is the main event and a hangover takes 4 of the 12 best hours.",
        ],
      },
      {
        heading: 'Saturday: The Lake Travis private charter',
        paragraphs: [
          "Wake up around 9 AM, breakfast tacos at Veracruz, El Primo, or Tacodeli. Coffee at Greater Goods or Houndstooth. By 11 AM, leave for Anderson Mill Marina — 25 minutes from downtown via 183 North. Free parking right next to the dock, no stairs anywhere from car to boat. If the group is 8+, book a party bus instead of Ubers — it stays with you for the day and the ride becomes part of the pre-party.",
          "12 PM: Cast off on Premier's private charter. Most bach groups book Meeseeks or The Irony (25–30 guests) or Day Tripper (14 guests). The captain runs a 4-minute safety briefing, then you cruise to a swim cove on a Lake Travis nature preserve. Anchor for 1.5–2 hours — float, swim, music, photos. Cruise back at your pace. The whole thing is yours: timing, music, swim spots, dance breaks, toasts. By the time you hit the dock at 4 PM, half the group is already ranking it the best day of the weekend.",
          "Saturday night: dinner at Lin Asian Bar, Sammie's, or Better Half (good for groups). After dinner, decide whether the group wants Rainey, 6th Street, or a quieter pivot to Hotel Magdalena's rooftop. Vincent (cocktail bar) or P6 at The LINE Austin (rooftop with Lady Bird Lake view) are both great Saturday closers. Bed by 1 AM if possible.",
        ],
      },
      {
        heading: 'Sunday: Brunch, sendoff, recovery',
        paragraphs: [
          "Brunch is mandatory for any bach group. Top picks: June's All Day (small but iconic), Sour Duck, Snooze, Fixe (Southern), or the brunch at Hotel San Jose for the South Congress vibe. Bloody Marys all around. After brunch, the group splits — flights start at 1 PM and run through evening, so a final group photo on South Congress, in front of a mural, or at the bride's favorite spot from the weekend is the closer.",
          "If the group has time before flights: Zilker Park, the Greenbelt, Lady Bird Lake walking trail, or one more set of margaritas at Maudie's. Don't try to add anything ambitious — Sunday is a wind-down day, not a third main event.",
        ],
      },
      {
        heading: 'Booking the boat: when, what, and how much',
        paragraphs: [
          "Book the Lake Travis charter 6–10 weeks ahead. April–October weekends fill 8+ weeks out for groups of 25+. Premier's private charter base rates start at $200/hour on Day Tripper (up to 14 guests), $225/hour on Meeseeks or The Irony (25–30), $250/hour on Clever Girl (75). 4-hour minimum on weekends. Texas sales tax (8.25%) and 20% gratuity for the crew are added on top of the base rate as transparent line items.",
          "What's included: TPWD-licensed captain, fuel, premium Bluetooth sound, large coolers (BYO ice or order pre-iced from Party On Delivery), life jackets every size, on-board restroom, and Anderson Mill Marina access (free parking, no stairs). BYOB beverages are typically $10–$25/guest depending on what the group brings. Optional add-ons: floating bar, DJ, photographer, custom decor.",
        ],
      },
    ],
    faqs: [
      { q: 'When should we book the Lake Travis bachelorette boat?', a: '6–10 weeks ahead for Saturday charters April through October. Groups of 25+ on prime weekends fill 8+ weeks out. Tuesday–Thursday charters book 2–4 weeks ahead.' },
      { q: 'How long should we be on the water?', a: '4 hours is the standard Saturday charter — covers the cruise out, anchor + swim time, and cruise back. 5–6 hours is popular if the group wants more swim/sunset time.' },
      { q: 'Should we get the party bus?', a: 'For 8+ guests, yes. The bus handles transportation both ways, no one drives, BYOB-friendly cabins make the ride part of the pre-party, and dropping at the dock with no parking-lot logistics keeps the group together.' },
      { q: 'What boat is best for 12-14 bachelorettes?', a: 'Day Tripper — intimate party barge, $200/hr base, perfect for 14 or fewer. For 15-25, step up to Meeseeks or The Irony at $225/hr.' },
      { q: 'Can we drink on the boat?', a: 'Yes — fully BYOB. Cans and plastic only, no glass. 21+ for alcohol consumption. Order pre-iced through Party On Delivery (sister company) and your drinks are ready when you board.' },
    ],
  },

  '/austin-bachelor-itinerary': {
    intro: "The 3-day Austin bachelor party itinerary with the Lake Travis day as the centerpiece. Friday night 6th Street, Saturday Lake Travis private charter (the day everyone remembers), Saturday night Rainey + dirty 6th, Sunday recovery brunch. Built around 4-hour Premier private charters that have run 4,000+ Austin bachelor groups over 15 years.",
    sections: [
      {
        heading: 'Friday: Arrival, BBQ, 6th Street',
        paragraphs: [
          "Most Austin bachelor groups land between 2 and 5 PM on Friday. Drop bags at the Airbnb (downtown, East Austin, or South Congress all work). 6 PM: dinner. Texas BBQ is the default — Terry Black's (downtown, shorter line), Franklin Barbecue (line up by 9 AM if you want to try), Salt Lick (Driftwood, family-style, 30 min south), or LeRoy and Lewis if you want the trailer-yard experience. Pre-game cocktails at Easy Tiger or Whisler's.",
          "9 PM: 6th Street rotation. Kung Fu Saloon for arcade games and shots, Halcyon for one civilized round, Shakespeare's for the rooftop, then end at Rain or Buford's depending on energy. Designate a non-drinker or split into Ubers — 6th Street parking is impossible Friday night. Be in bed by 1 AM. Saturday is the main event and grogginess will tax the day.",
        ],
      },
      {
        heading: 'Saturday: Lake Travis private charter',
        paragraphs: [
          "9 AM: Breakfast tacos at Veracruz, Tacodeli, or Juan in a Million for the recovery special. Coffee, lots of water. 11 AM: leave for Anderson Mill Marina via 183 North — 25 minutes from downtown, free parking right next to the dock, no stairs from car to boat. For groups of 8+, party bus is the move — $600–$1,500 round-trip, BYOB-friendly, and the bus drops directly at the dock.",
          "Noon: cast off. Most bachelor groups book Meeseeks or The Irony (25–30 guests, $225/hr base) or Clever Girl (75 guests, $250/hr base, the flagship for groomsmen + extended friend groups). The captain runs the safety briefing, then you cruise to a Lake Travis nature-preserve cove with crystal water for the swim stop. Anchor 1.5–2 hours — swim, float, music, drink, photos. Cruise back at your pace. The whole boat is yours.",
          "4 PM: dock. Back to the Airbnb to clean up and rally. Saturday dinner: Salty Sow, Better Half, or Sammie's all hold groups well. After dinner, Rainey Street first (Banger's, Container Bar, Craft Pride), then 6th Street if the energy is still there. The cigar bar at Hotel Saint Cecilia is the under-the-radar move if the group wants to slow it down.",
        ],
      },
      {
        heading: 'Sunday: Brunch and sendoff',
        paragraphs: [
          "Mandatory brunch at Snooze, June's All Day, Easy Tiger, or El Primo Tacos. Bloody Marys, breakfast tacos, group recap. Flights start landing at 1 PM and continue through the evening; the last group photo is the closer. If the group has hours to kill before flights — TopGolf in Austin, a brewery (Live Oak, Zilker), or one more round at Maudie's on South Lamar.",
        ],
      },
      {
        heading: 'Boat booking: timeline, cost, what is included',
        paragraphs: [
          "Book 6–10 weeks ahead for Saturday charters during peak season (April–October). Premier's private charter base rates: Day Tripper $200/hr (up to 14), Meeseeks or The Irony $225/hr (25–30), Clever Girl $250/hr (75). 4-hour minimum on weekends. Texas sales tax (8.25%) and 20% gratuity for the crew are added on top as transparent line items at checkout.",
          "Included in the base rate: TPWD-licensed captain, fuel, premium Bluetooth sound, large coolers, life jackets every size, on-board restroom, Anderson Mill Marina access (free parking, no stairs). BYOB beverages typically run $10–$30/guest. Add-ons quoted separately: floating bar, DJ, photographer, decorations, post-cruise overnight docking.",
        ],
      },
    ],
    faqs: [
      { q: 'What size boat for a bachelor party?', a: '14 groomsmen or fewer → Day Tripper ($200/hr base). 15–30 → Meeseeks or The Irony ($225/hr). 30–75 → Clever Girl ($250/hr). 4-hour minimum on weekends.' },
      { q: 'When should we book?', a: '6–10 weeks ahead for Saturday charters in peak season. Larger groups (Clever Girl) book 8–12 weeks ahead for prime weekends.' },
      { q: 'Can we BYOB?', a: 'Yes — fully BYOB. Cans and plastic only, no glass. 21+ for alcohol. Order pre-iced via Party On Delivery (sister company) and drinks are stocked on the boat before you board.' },
      { q: 'Is a party bus worth it?', a: 'For 8+ guys, yes. $600–$1,500 round-trip handles transportation both ways, keeps the group together, and the BYOB-friendly cabin makes the ride part of the pre-party. Buses drop at the dock — no parking lot, no stairs.' },
    ],
  },

  '/combined-bach-itinerary': {
    intro: "The combined bachelor + bachelorette weekend itinerary for couples doing one celebration together. Friday meet-up + Rainey, Saturday Lake Travis private charter on a 25–75 guest boat, Saturday night dinner + nightlife, Sunday brunch and sendoff. Premier Party Cruises has hosted hundreds of combined bach groups — modern, co-ed, all-ages-friendly, and dramatically simpler than two separate weekends.",
    sections: [
      {
        heading: 'Why combine the bach weekend?',
        paragraphs: [
          "Couples who would rather celebrate together than split into two cities save money, time off work, and the stress of coordinating two trips. The combined format is also dramatically more inclusive — friends who would not have made the bachelor or bachelorette cut on their own get to be there, which usually produces a better weekend than the gendered version. Premier's private charters welcome all ages, so the combined group can bring parents, future in-laws, and friends with kids on the boat day if that fits the vibe.",
        ],
      },
      {
        heading: 'Friday: Mixer night',
        paragraphs: [
          "Combined bach groups land Friday afternoon. By 7 PM, dinner that holds a co-ed group well — Loro courtyard, Suerte, Salty Sow, or Better Half. After dinner, Rainey Street is the right first stop because it is louder, mingly, and lower-stakes than 6th Street. Banger's beer garden, Container Bar, Craft Pride. Around 10 PM, move to 6th Street or pivot quieter to Vincent or P6 at The LINE — depends on the group's energy.",
        ],
      },
      {
        heading: 'Saturday: The lake day on Clever Girl or Meeseeks',
        paragraphs: [
          "Combined bach groups usually run 25–75 guests, which means Clever Girl (Premier's 75-guest flagship, $250/hr base) or Meeseeks/The Irony (25–30 guests, $225/hr base). Cast off at noon for a 4–5 hour Saturday charter. Anderson Mill Marina is 25 minutes from downtown via 183 North — free parking, no stairs, party bus accommodating. The captain runs the safety briefing, you cruise to a Lake Travis nature-preserve cove, anchor 1.5–2 hours for swimming and floating, then cruise back at your pace.",
          "Music on the boat: most combined groups bring two playlists — high-energy for the cruise out, mellower for the swim stop, then back to high-energy for the cruise home. Premier's premium Bluetooth audio handles pro-level sound. Add-ons that combined groups love: pro photographer ($350/2 hours, edited gallery delivered in under 5 days) and pro DJ ($450/3 hours) for the bigger boats.",
        ],
      },
      {
        heading: 'Saturday night and Sunday',
        paragraphs: [
          "Saturday dinner that handles a combined group: Lin Asian Bar, Salty Sow, Better Half, or Sammie's. After dinner, the combined group usually splits — the stay-up-late half hits 6th Street, the early-quiet half pivots to a rooftop or Vincent. Brunch Sunday is mandatory — June's, Snooze, Sour Duck, or Fixe.",
        ],
      },
    ],
    faqs: [
      { q: 'What size boat for a combined bach?', a: '25–30 guests → Meeseeks or The Irony at $225/hr base. 31–75 → Clever Girl at $250/hr base. Both run 4-hour minimums on weekends. Texas tax + 20% gratuity added on top.' },
      { q: 'Can parents and family come on the boat?', a: 'Yes — private charters welcome all ages including infants. Combined bach groups frequently include parents, future in-laws, and friends with kids. Life jackets every size are stocked on every boat regardless of booking.' },
      { q: 'Should we get the party bus?', a: 'For 25+ guests, yes — coach buses run $1,000–$1,500 round-trip and drop directly at the dock. Keeps the group together, BYOB-friendly cabin doubles as pre-party.' },
      { q: 'Is BYOB allowed?', a: 'Yes — cans and plastic only, no glass. 21+ for alcohol. Order pre-iced through Party On Delivery (sister company) and the boat is stocked before you board.' },
    ],
  },

  '/austin-corporate-event-guide': {
    intro: "The Austin corporate event guide for offsites, client entertainment, team building, and milestone celebrations. Lake Travis party boats compare strongly against hotel ballrooms, breweries, and downtown event spaces on cost-per-attendee, venue uniqueness, and weather flexibility. Premier Party Cruises has hosted 1,200+ Austin corporate events over 15 years with W-9, COI, and NET-30 invoicing on file.",
    sections: [
      {
        heading: 'Why Lake Travis vs hotel ballroom or downtown event space',
        paragraphs: [
          "A Lake Travis private charter for 30 guests at a 4-hour Saturday weekday rate runs about $25/guest at the base rate — meaningfully cheaper than a downtown event space ($60–$120/guest with food minimums) and dramatically more memorable. The boat is the venue, the activity, and the photo op all in one. Texas sales tax (8.25%) and 20% gratuity for the crew are added on top.",
          "For groups under 50, weekday charters are the most cost-effective format — Premier discounts weekday charters 20–30% below weekend rates and runs 3-hour minimums (vs 4-hour weekend minimums). Pricing example: Clever Girl (75-guest flagship) Tuesday 1–4 PM = ~$1,000 base for the boat for 3 hours, supporting up to 75 guests. Per-guest cost at full capacity = ~$13. Add tax + gratuity, beverage costs, and any add-ons.",
        ],
      },
      {
        heading: 'What corporate event types work well',
        paragraphs: [
          "Quarterly all-hands and leadership offsites: 25–75 guests, 3–4 hour charter, light-touch agenda (welcome from CEO at the dock, one anchor stop with remarks + Q&A on water, photo op at sunset cove). Award ceremonies and recognition events: Clever Girl's stage area + premium audio handle the program well; many companies anchor for the awards portion then resume cruising.",
          "Client entertainment and key-account events: smaller groups (8–25), more polished add-ons (pro photographer, plated catering coordination, branded napkins/koozies). Holiday parties: dinner cruises with anchor + lighting + DJ. Team building: the boat itself is the activity — no facilitator needed beyond the captain. Mergers/acquisitions celebrations and milestone events (IPO, product launch): most popular Friday afternoon → into 6th Street format.",
        ],
      },
      {
        heading: 'Insurance, COI, W-9, NET-30',
        paragraphs: [
          "Premier carries $2M general liability + $5M aggregate through a marine-specialty carrier. We will share Certificates of Insurance (COI) on request and add a corporate client as additional insured for events that require it (most large companies do). Our W-9 is on file and emailed within one business day. NET-30 invoicing is available for corporate clients with a signed agreement — we can also work with PO numbers, AP system uploads, and procurement contacts.",
        ],
      },
      {
        heading: 'Catering and BYOB for corporate events',
        paragraphs: [
          "Premier is BYOB which keeps corporate alcohol policy compliant (no alcohol service liability transferred to the boat operator) and dramatically cheaper than hotel cash bars. Most corporate hosts coordinate beverages through Party On Delivery (Premier's sister company): wine, beer, seltzers, NA options, ice, and snacks pre-stocked on the boat before guests board. Retail prices, no marina markup, 100% buyback on unopened bottles.",
          "Catering: Party On Delivery coordinates pizza, tacos, charcuterie, full buffet catering, and dietary-restriction-friendly options. Corporate hosts typically budget $15–$30/guest for food and $10–$25/guest for beverages on top of the boat charter. Per-attendee total (boat + tax/gratuity + food + beverages) typically lands at $50–$100/attendee — meaningfully better than ballroom event pricing.",
        ],
      },
    ],
    faqs: [
      { q: 'What is the typical per-guest cost for a corporate event on the boat?', a: 'Boat base rate divided across attendees + tax (8.25%) + 20% gratuity + BYOB beverages ($10–$25/guest) + catering ($15–$30/guest) = typical $50–$100/attendee for a 3–4 hour weekday charter. Weekend rates run 20–30% higher.' },
      { q: 'Do you offer NET-30 invoicing?', a: 'Yes — NET-30 invoicing for corporate clients with a signed agreement. We accept PO numbers, work with AP system uploads, and coordinate with procurement contacts.' },
      { q: 'Will you provide insurance documentation?', a: 'Yes — we share Certificates of Insurance (COI) on request and add corporate clients as additional insured for events that require it. $2M general liability + $5M aggregate through a marine-specialty carrier.' },
      { q: 'Can we have a formal program (awards, remarks, presentations) on the boat?', a: 'Yes — Clever Girl has a stage area and premium audio with wireless mics. Most corporate hosts anchor for the formal portion (15–45 min), then resume cruising. The captain can also keep the engine off during remarks for clean audio.' },
      { q: 'Is alcohol service handled by the boat?', a: 'No — Premier is BYOB, which keeps your corporate alcohol-service liability compliant. Most hosts coordinate through Party On Delivery (sister company) for retail-priced pre-stocked beverages.' },
    ],
  },

  '/austin-party-boat-pricing-guide': {
    intro: "The complete Austin party boat pricing guide. All Premier Party Cruises rates listed here are STARTING BASE RATES — Texas sales tax (8.25%) and a 20% gratuity for the captain + crew are added on top as transparent line items at checkout. We list base rates so you can compare apples-to-apples against other Lake Travis operators.",
    sections: [
      {
        heading: 'Base rates by boat',
        paragraphs: [
          "Day Tripper (up to 14 guests): from $200/hour. Intimate party barge for small bach groups, birthdays, and tight-knit family events.",
          "Meeseeks (25–30 guests): from $225/hour. Mid-size entertainer with premium sound and large open layout.",
          "The Irony (25–30 guests): from $225/hour. Same size and same price as Meeseeks — different boat, same value.",
          "Clever Girl (31–75 guests): from $250/hour. Premier's flagship, large dance floor, stage area, premium audio, the boat for weddings, large corporate, and combined bach groups.",
          "All private charters: 4-hour minimum on weekends, 3-hour minimum on weekdays. Weekday charters run 20–30% lower than weekend rates.",
        ],
      },
      {
        heading: 'ATX Disco Cruise per-person pricing',
        paragraphs: [
          "The ATX Disco Cruise is the public, mixed-group format on Clever Girl. Per-person base prices by time slot: $85 (Friday 12–4 PM), $95 (Saturday 11 AM–3 PM), $105 (Saturday 3:30–7:30 PM). 21+ only. Texas tax + 20% gratuity added on top. The disco runs March–October weekends; tickets sell out for prime Saturdays 6+ weeks ahead.",
        ],
      },
      {
        heading: 'Per-guest math at full capacity',
        paragraphs: [
          "Day Tripper at 4 hours ($800 base) ÷ 14 guests = ~$57/guest at base rate. Meeseeks or The Irony at 4 hours ($1,200 base) ÷ 30 guests = ~$40/guest. Clever Girl at 4 hours ($2,000 base) ÷ 75 guests = ~$27/guest. Add Texas sales tax (8.25%) and 20% gratuity to get the all-in per-guest total. Add BYOB beverages ($10–$25/guest) and any add-ons.",
        ],
      },
      {
        heading: 'Add-on pricing',
        paragraphs: [
          "Floating bartender (3-hour minimum): from $200. Pro DJ (3 hours, mic, requests, announcements): from $450. Photographer (2-hour shoot, edited gallery in under 5 days): from $350. Custom decor and signage: quoted per job. Overnight docking: quoted per night. Party On Delivery (sister company) BYOB pre-stock: retail prices, 100% buyback on unopened.",
        ],
      },
      {
        heading: 'What\'s included in the base rate (and what\'s added on)',
        paragraphs: [
          "Included: TPWD-licensed captain, fuel, premium Bluetooth sound system, large coolers (BYO ice or order pre-iced via Party On Delivery), USCG-approved life jackets every size including infant + child, on-board restroom, marina access (free parking, no stairs from car to boat).",
          "Added on top of the base rate as transparent line items: Texas sales tax (8.25%), 20% gratuity for the captain + crew. We do not bake gratuity into the headline rate because we want the base hourly rate to be directly comparable to other Lake Travis operators.",
        ],
      },
    ],
    faqs: [
      { q: 'What is included in the base rate?', a: 'TPWD-licensed captain, fuel, premium Bluetooth sound, large coolers, USCG life jackets every size, on-board restroom, Anderson Mill Marina access (free parking, no stairs).' },
      { q: 'Are tax and gratuity included?', a: 'No — base rates are PRE-tax and PRE-gratuity. Texas sales tax (8.25%) and 20% gratuity for the crew are added as transparent line items at checkout.' },
      { q: 'Do you offer weekday discounts?', a: 'Yes — Mon–Thu rates run 20–30% below weekend rates. 3-hour minimum weekdays vs 4-hour minimum weekends. Best value for corporate offsites and family groups.' },
      { q: 'How does Premier compare to a budget Lake Travis pontoon?', a: 'A budget pontoon is $400–$800/day for the boat alone — you drive, you bring music, you haul coolers, you coordinate safety. Add a captain ($200–$300/day extra), sound, floats, and logistics, and the budget option usually costs more than Premier on a total basis. Premier starts at $200/hour with captain + audio + safety included.' },
    ],
  },

  '/lake-travis-boat-rental-guide': {
    intro: "The complete 2026 Lake Travis boat rental guide. Compare marinas, boat types, captained vs self-drive, BYOB policies, and per-person costs for groups 14–75. Premier Party Cruises has operated on Lake Travis for 15+ years and serves as the anchor party-boat operator at Anderson Mill Marina — the closest purpose-built party-boat marina to downtown Austin.",
    sections: [
      {
        heading: 'Lake Travis marinas: how they compare',
        paragraphs: [
          "Anderson Mill Marina (where Premier operates): 25 minutes from downtown Austin via 183 North. Free parking right next to the dock, no stairs from parking to boat, accommodates party buses and coach shuttles directly at the dock, accessible for wedding attire and mobility-limited guests. The closest purpose-built party-boat marina to Austin.",
          "Lakeway-area marinas (Hurst Creek, Volente): 35–45 minutes from downtown, mostly individual slips for fishing boats and self-drive pontoon rentals. Limited large-capacity charter options.",
          "Western Lake Travis marinas (Pace Bend, Briarcliff): 50+ minutes from downtown, generally serve cabin-rental or fishing-cruise traffic, not party-boat charters.",
        ],
      },
      {
        heading: 'Boat types: party barges, pontoons, ski boats',
        paragraphs: [
          "Party barges (what Premier runs): purpose-built for groups, large open decks, premium sound, on-board restroom, 14–75 guest capacity, captained. Best for: bachelor/bachelorette, weddings, corporate, family reunions, milestone birthdays. Examples: Premier's Day Tripper, Meeseeks, The Irony, Clever Girl.",
          "Self-drive pontoons: $400–$800/day for the boat alone. You drive, you bring music, you haul coolers, you handle safety. Captain is an add-on at $200–$300/day. Best for: experienced-boater small groups (5–8) who want autonomy.",
          "Ski boats and wake boats: 6–12 guests, focused on water sports. Not the right format for parties or large groups.",
        ],
      },
      {
        heading: 'Captained vs self-drive',
        paragraphs: [
          "Captained charters dramatically reduce planning load and risk for groups. The captain handles navigation, anchor selection, weather decisions, swim-stop safety, and emergency response. Self-drive pontoons require a designated driver who stays sober, knows the lake, and can make weather calls. For any group over 12 or any occasion that can't go sideways (bach, wedding, corporate), captained is the right answer.",
        ],
      },
      {
        heading: 'BYOB policies and beverage logistics',
        paragraphs: [
          "Premier and most Lake Travis party-boat operators are BYOB — guests bring beer, seltzers, canned cocktails, wine in cans or plastic, and non-alcoholic drinks. Cans and plastic only, no glass on the boat (broken glass + bare feet + wet deck is the universal rule). Premier's sister company Party On Delivery handles BYOB set-up: order beverages online, POD ices the coolers and stocks the boat before you board. Retail prices, 100% buyback on unopened bottles.",
        ],
      },
      {
        heading: 'Per-person costs for groups 14–75',
        paragraphs: [
          "Per-guest base-rate math at 4 hours: 14-guest Day Tripper = ~$57/guest. 25-guest Meeseeks/Irony = ~$48/guest. 75-guest Clever Girl = ~$27/guest. Texas sales tax (8.25%) + 20% gratuity added on top. BYOB beverages typically $10–$25/guest. Add-ons (DJ, photographer, floating bar) quoted separately. The per-guest cost falls dramatically as you fill the boat.",
        ],
      },
    ],
    faqs: [
      { q: 'What is the closest party-boat marina to downtown Austin?', a: 'Anderson Mill Marina at 13993 FM 2769, Leander TX — 25 minutes from downtown via 183 North. Free parking, no stairs, accommodates party buses directly at the dock.' },
      { q: 'Captained or self-drive?', a: 'For groups over 12 or any high-stakes occasion (bach, wedding, corporate), captained — the captain handles navigation, weather, safety, and recovery. Self-drive pontoons work for experienced-boater groups of 5–8 who want autonomy.' },
      { q: 'How much does it cost per person?', a: '4-hour base-rate per-guest math: Day Tripper ~$57, Meeseeks/Irony ~$48, Clever Girl ~$27. Add Texas tax + 20% gratuity + BYOB beverages.' },
      { q: 'Is BYOB allowed on Lake Travis party boats?', a: 'Yes on Premier and most operators — cans and plastic only, no glass. 21+ for alcohol. Order pre-iced via Party On Delivery (Premier sister company) for hands-off setup.' },
    ],
  },

  '/best-austin-party-boat': {
    intro: "The 2026 ranking of Austin party boat operators by occasion, group size, marina access, safety record, and BYOB policy. Premier Party Cruises ranks #1 across most categories driven by 15+ years of zero-incident operation, the largest dedicated party-boat fleet on Lake Travis, and Anderson Mill Marina being the closest purpose-built party-boat marina to downtown Austin.",
    sections: [
      {
        heading: 'Ranked by group size',
        paragraphs: [
          "8–14 guests: Premier's Day Tripper at $200/hr base. Intimate party barge, premium sound, on-board restroom, captain included.",
          "15–30 guests: Premier's Meeseeks or The Irony at $225/hr base. Larger open deck, swim platform, premium audio.",
          "31–75 guests: Premier's Clever Girl at $250/hr base. The flagship — stage area, professional sound for awards/announcements, the boat for weddings and large corporate events.",
          "Over 75 guests: Multi-boat fleet bookings. Premier coordinates 2–4 boats from the same dock so the group stays together. 5–10% off the second and third boats.",
        ],
      },
      {
        heading: 'Ranked by occasion',
        paragraphs: [
          "Bach parties (bachelor or bachelorette): Premier ranks #1 — most-booked Lake Travis bach operator, 15+ year clean record, BYOB-friendly with Party On Delivery sister-company drink set-up.",
          "Weddings: Premier — every wedding-adjacent event runs on the same fleet (welcome cruise, rehearsal dinner on water, day-of bridal-party cruise, late-night after-party, day-after send-off brunch). Wedding-attire-friendly marina (no stairs, free parking, flat path to boat).",
          "Corporate offsites + client entertainment: Premier — W-9 + COI on file, NET-30 invoicing, $2M general liability, weekday discount 20–30%.",
          "Family reunions and multi-generation events: Premier — flat-deck boarding (no stairs), shaded seating with backs and armrests, ADA-accessible heads on Meeseeks/Irony/Clever Girl, life jackets every size including infant.",
        ],
      },
      {
        heading: 'Ranked by safety record',
        paragraphs: [
          "Premier Party Cruises: 15+ years of operation, 150,000+ guests served, zero safety incidents — the longest unblemished record on Lake Travis. TPWD-licensed captains, CPR-certified crew, $2M general liability + $5M aggregate insurance.",
          "Newer operators (under 5 years): variable safety records, less established weather decision-making, smaller insurance policies. Worth confirming TPWD licensing and asking for a Certificate of Insurance for any high-stakes booking.",
        ],
      },
    ],
    faqs: [
      { q: 'Who is the best Austin party boat operator?', a: 'Premier Party Cruises ranks #1 by safety record (15+ years, 0 incidents), fleet variety (4 boats covering 14–75 guest groups), marina access (Anderson Mill — closest party-boat marina to downtown Austin), and corporate readiness (W-9, COI, NET-30 invoicing on file).' },
      { q: 'Best Austin party boat for a wedding?', a: 'Premier — every wedding-adjacent event runs on the same fleet (welcome party, rehearsal dinner, day-of bridal-party cruise, after-party, day-after brunch). Wedding-attire-friendly marina with no stairs and free parking.' },
      { q: 'Best Austin party boat for corporate events?', a: 'Premier — W-9 and COI on file, NET-30 invoicing, $2M general liability + $5M aggregate, weekday discount 20–30%, Clever Girl flagship handles 75-guest events with stage + premium audio.' },
      { q: 'What makes the Anderson Mill Marina the best Austin party-boat marina?', a: '25 min from downtown via 183 North, free parking right next to the dock, no stairs from car to boat, flat path accessible for wedding attire and mobility-limited guests, accommodates party buses directly at the dock.' },
    ],
  },

  '/premier-vs-austin-party-boat': {
    intro: "Premier Party Cruises vs ATX Party Boats — head-to-head comparison on fleet, safety, marina access, BYOB policy, and price. Both operate Lake Travis party boats; the differences come down to operating tenure, dedicated party-boat fleet size, and marina location.",
    sections: [
      {
        heading: 'Fleet and capacity',
        paragraphs: [
          "Premier: 4 dedicated party boats covering 14–75 guests (Day Tripper, Meeseeks, The Irony, Clever Girl). All purpose-built for parties — premium sound, on-board restroom, large open deck, swim platform.",
          "ATX Party Boats: smaller fleet of pontoon-style boats. Best for groups under 20.",
        ],
      },
      {
        heading: 'Safety record',
        paragraphs: [
          "Premier: 15+ years of operation, 150,000+ guests served, zero safety incidents — the longest verifiable clean record on Lake Travis. TPWD-licensed captains, CPR-certified crew. $2M general liability + $5M aggregate insurance.",
          "ATX Party Boats: shorter operating history. Worth confirming TPWD licensing, captain credentials, and Certificate of Insurance for any high-stakes booking (bach, wedding, corporate).",
        ],
      },
      {
        heading: 'Marina access',
        paragraphs: [
          "Premier departs from Anderson Mill Marina (13993 FM 2769, Leander TX 78641) — 25 minutes from downtown Austin via 183 North. Free parking right next to the dock, no stairs from parking to boat, accommodates party buses + coach shuttles directly. Wedding-attire-friendly, mobility-friendly.",
          "ATX Party Boats operates from various Lake Travis marinas depending on the booking. Specific marina, parking, and dock-access logistics vary per trip — worth confirming for groups with mobility-limited guests, party buses, or wedding attire.",
        ],
      },
      {
        heading: 'BYOB and beverage logistics',
        paragraphs: [
          "Premier: fully BYOB (cans and plastic only, no glass). Sister company Party On Delivery handles drink set-up on the boat — order beer/wine/seltzers/spirits/mixers/ice, POD pre-stocks the coolers before you board. Retail prices, 100% buyback on unopened bottles.",
          "ATX Party Boats: BYOB policies and on-boat beverage logistics vary; confirm with the operator at booking.",
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          "Premier: published starting base rates from $200/hour on Day Tripper, $225/hour on Meeseeks/Irony, $250/hour on Clever Girl. Texas sales tax (8.25%) and 20% gratuity for the crew added as transparent line items on top. ATX Disco Cruise public per-person tickets at $85/$95/$105 by time slot.",
          "ATX Party Boats: pricing varies by boat size and date — confirm directly.",
        ],
      },
    ],
    faqs: [
      { q: 'Which is more established — Premier or ATX Party Boats?', a: 'Premier — 15+ years of operation, 150,000+ guests, zero safety incidents. ATX Party Boats has a shorter operating history.' },
      { q: 'Which has bigger boats?', a: 'Premier — Clever Girl handles 75 guests, the largest dedicated party-boat capacity in Austin. Premier\'s 4-boat fleet covers every group size from 14 to 75.' },
      { q: 'Where does each depart from?', a: 'Premier always departs from Anderson Mill Marina (Leander, 25 min from downtown Austin). ATX Party Boats departs from various Lake Travis marinas depending on the booking.' },
      { q: 'Which is better for a wedding or corporate event?', a: 'Premier — wedding-attire-friendly marina, W-9/COI/NET-30 on file for corporate, longest verifiable safety record. ATX is fine for casual social groups.' },
    ],
  },

  '/premier-vs-float-on': {
    intro: "Premier Party Cruises vs Float On — these are different products in different cities, even though both come up in Austin party search results. Premier runs private Lake Travis party boat charters out of Anderson Mill Marina (25 min from downtown Austin). Float On runs a river-tubing business on the San Marcos River (about 50 min south of Austin). Choose based on what you want to do, not based on price-per-person alone.",
    sections: [
      {
        heading: 'Activity: party boat vs river tubing',
        paragraphs: [
          "Premier: a private Lake Travis party boat charter. You and your group are on a captained boat for 4–6 hours. The boat cruises out, anchors at a swim cove, you swim and float, the boat cruises back. Music, BYOB, on-board restroom, captain handles everything. The whole boat is yours.",
          "Float On: a tube outfitter on the San Marcos River. You rent a tube, float downriver with a current for 2–4 hours, and exit at a downstream landing. You're floating in a river with hundreds of other tubers from many different operators. Public, fast-moving, weather-dependent. There is no boat, no captain, no group container.",
        ],
      },
      {
        heading: 'Location',
        paragraphs: [
          "Premier: Anderson Mill Marina, 13993 FM 2769, Leander TX 78641. 25 minutes from downtown Austin via 183 North. Free parking right next to the dock, no stairs.",
          "Float On: San Marcos River, City of San Marcos. About 50 minutes south of downtown Austin via I-35. Tubing season is May–October weather-dependent.",
        ],
      },
      {
        heading: 'Group control',
        paragraphs: [
          "Premier: you control the experience. The boat is yours — your music, your timeline, your swim spot, your toasts and announcements. The captain works with the group lead. Photos are easy because everyone is in one place.",
          "Float On: you're floating in a river with the public. No central audio, no group container, hard to stay together over the float, photos are difficult because the group spreads across the river.",
        ],
      },
      {
        heading: 'When to pick each',
        paragraphs: [
          "Pick Premier for: bachelor parties, bachelorette parties, weddings, corporate events, family reunions, milestone birthdays, multi-generational groups, groups with mobility-limited guests, high-stakes occasions where you need the day to go right.",
          "Pick Float On (or another tubing outfitter) for: small casual social groups (4–8 friends) who want a low-cost shared activity, weather-flexible date, no formal program, drink-and-float vibe.",
        ],
      },
    ],
    faqs: [
      { q: 'Are Premier Party Cruises and Float On the same kind of business?', a: 'No — Premier runs Lake Travis private party-boat charters. Float On runs San Marcos River tubing. Different cities, different activities, different group experiences.' },
      { q: 'Where does each operate?', a: 'Premier: Anderson Mill Marina, Leander TX, 25 min from downtown Austin. Float On: San Marcos River, City of San Marcos, ~50 min south of Austin.' },
      { q: 'Which is better for a bachelorette party?', a: 'Premier — private boat, captain, control over music + timing + swim spot. Float On is fine for tiny casual groups but does not work well for organized bachelorette weekends with 10+ guests.' },
      { q: 'Which has better weather flexibility?', a: 'Premier — we offer FREE weather reschedules, every time, no fight. Float On is more weather-exposed because the river floats are exposed to downpours and lightning with limited shelter.' },
    ],
  },

  '/what-to-bring-on-a-party-boat': {
    intro: "The complete Lake Travis party boat packing checklist. Premier Party Cruises provides everything captain-side (boat, audio, coolers, life jackets, restroom, captain, fuel); guests bring sunscreen, BYOB drinks (cans/plastic only), and a few personal items. This list covers seasonal variations and the small things groups always forget.",
    sections: [
      {
        heading: 'What to bring (every season)',
        paragraphs: [
          "Sunscreen (SPF 50+ recommended — Lake Travis sun is intense, reflection off the water doubles exposure). Reef-safe formulations are appreciated for the ecosystem.",
          "Sunglasses with UV protection. A backup pair is wise — one usually ends up in the lake.",
          "Hat (baseball cap, bucket hat, or sun visor).",
          "Swimsuit, towel, and a change of clothes for after the cruise.",
          "Valid ID (21+ for alcohol consumption — captain checks at boarding).",
          "Phone in a waterproof pouch (lanyard works best). Lake Travis phone-loss-into-the-water rate is high.",
          "BYOB drinks in cans or plastic — beer, seltzers, canned cocktails, wine in cans or plastic, mixers, non-alcoholic drinks. NO GLASS (safety rule, broken glass + bare feet + wet deck).",
          "Snacks if you want them — chips, fruit, charcuterie. Keep food in cans, plastic containers, or paper.",
          "Cash for crew tip if gratuity isn't already on the booking (Premier's gratuity is added as a transparent line item at checkout, so on a Premier booking, additional cash tip is welcome but not required).",
        ],
      },
      {
        heading: 'What Premier provides on every boat',
        paragraphs: [
          "TPWD-licensed captain, fuel, premium Bluetooth sound system (connect from any phone), large coolers (BYO ice or order pre-iced via Party On Delivery), USCG life jackets every size including child + infant, Type IV throwable cushion, fire extinguisher, first-aid kit, marine VHF radio, on-board restroom, anchor + 200 ft of rode, navigation lights.",
        ],
      },
      {
        heading: 'Seasonal additions',
        paragraphs: [
          "Spring (March–May): light hoodie or windbreaker for the cruise out — water temps are still cool. Bug spray for evening cruises.",
          "Summer (June–August): extra water bottles (heat exhaustion is the #1 medical issue on summer Lake Travis cruises), electrolyte tablets, frozen water bottles that double as ice as they thaw.",
          "Fall (September–November): lightweight jacket for sunset cruises. The temperature drop after sunset can be 15°F.",
          "Winter (December–February): warm layers — base layer, fleece, windbreaker. We do private charter through winter for sunset cruises and intimate events. Captain monitors weather and reschedules free if conditions change.",
        ],
      },
      {
        heading: 'What NOT to bring',
        paragraphs: [
          "No glass containers (safety rule). No illegal substances. No fireworks. No firearms. No outside speakers larger than a small portable Bluetooth (the boat has premium audio and outside large speakers create interference).",
        ],
      },
    ],
    faqs: [
      { q: 'Do we need to bring our own life jackets?', a: 'No — every boat carries USCG-approved life jackets in every adult size plus child and infant sizes. We never assume the manifest — we stock for any guest who shows up.' },
      { q: 'Can we bring glass bottles?', a: 'No — cans and plastic only. Glass on a wet deck with bare feet is a safety problem we don\'t risk. If you ordered through Party On Delivery, they handle the cans/plastic-only logistics for you.' },
      { q: 'Do we need to bring ice?', a: 'Yes — we provide large coolers but BYO ice OR order pre-iced via Party On Delivery (sister company) and the boat is stocked before you board.' },
      { q: 'Can we bring food?', a: 'Yes — chips, fruit, charcuterie, snacks. Keep food in cans, plastic, or paper. POD also coordinates pizza, tacos, and full catering deliveries.' },
      { q: 'Do we need to tip the crew?', a: 'On a Premier private charter, 20% gratuity is added as a line item at checkout. Additional cash tip is welcome but never required. The ATX Disco Cruise is the same — gratuity is in the line items.' },
    ],
  },

  '/austin-party-bus-shuttle': {
    intro: "Austin party bus and boat shuttle coordination — downtown hotels and Airbnbs to Anderson Mill Marina. Premier Party Cruises has worked with Austin party-bus operators for 15 years and can connect your group with vetted operators for round-trip dock service. Direct drop at the marina (no stairs, no walk), $600–$1,500 round-trip depending on group size.",
    sections: [
      {
        heading: 'Why a party bus beats Ubers for groups of 8+',
        paragraphs: [
          "For groups under 8, two Ubers or Lyft XLs work fine ($35–$55 each way per ride). For groups of 8 or more, the party bus is dramatically better. The bus stays with you for the day — no second-guess on the timing back, no surge pricing, no group-of-15-trying-to-coordinate-three-Ubers chaos. The bus IS the pre-party — BYOB-friendly cabin, sound system, LED lighting, the ride from downtown to Anderson Mill Marina becomes 30 minutes of group warm-up.",
          "Buses drop directly at the dock at Anderson Mill Marina. No parking lot, no walk, no carrying coolers from a remote spot. The whole group steps off the bus, the captain runs the safety briefing, and you cast off.",
        ],
      },
      {
        heading: 'Bus sizes and pricing',
        paragraphs: [
          "14-passenger party bus: $600–$800 round-trip. Best for bach groups under 14.",
          "20–24 passenger party bus: $800–$1,100 round-trip. Best for combined bach or 20-person corporate.",
          "30+ passenger coach with LED lighting + audio: $1,200–$1,500 round-trip. Best for large bach or 30+ corporate groups.",
          "Multi-bus coordination for 50+ guests: quoted per booking. Premier can coordinate two or three buses arriving in a staggered window so the group lands at the dock together.",
        ],
      },
      {
        heading: 'Logistics: pickup, drop, return',
        paragraphs: [
          "Most Austin party buses pick up at downtown hotels or East Austin Airbnbs. Pickup window is typically 30 minutes before the boat departure time — 10:30 AM pickup for a noon boat slot. Bus drops at the marina dock by 11:45 AM. After the cruise (4 PM for a noon-to-4 charter), bus is waiting at the same drop spot for return. Return drop at the same downtown pickup.",
          "If your group wants to extend the night — bus stops at a Saturday-night dinner spot, then continues to Rainey Street or 6th Street — the bus operator can quote that as a longer rental block. Common scenario: 10:30 AM pickup → marina → 4 PM dock → BBQ stop → 6th Street → 1 AM final drop. Quote that as a 14–15 hour rental.",
        ],
      },
    ],
    faqs: [
      { q: 'How much is a party bus from downtown to Anderson Mill Marina?', a: '$600–$800 for 14-passenger, $800–$1,100 for 20-24, $1,200–$1,500 for 30+ coach. Round-trip with the bus waiting during your boat charter.' },
      { q: 'Where does the bus drop us?', a: 'Directly at the Anderson Mill Marina dock — no parking lot, no walk, no stairs. Step off the bus, walk onto the boat.' },
      { q: 'Can the bus stay with us for the day?', a: 'Yes — round-trip rentals include the bus waiting during your charter. Some operators let you extend the rental block to cover dinner + nightlife afterward.' },
      { q: 'Is the bus BYOB-friendly?', a: 'Most party buses are BYOB-friendly with cans and plastic only — confirm with the specific operator. Premier connects you with vetted operators we have worked with.' },
    ],
  },
};

export function getRichContent(slug) {
  const normalized = slug === '/' ? '/' : slug.replace(/\/$/, '');
  return RICH_CONTENT[normalized] || null;
}
