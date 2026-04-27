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
      {
        heading: 'Meet our captains — the people behind the 15-year clean record',
        paragraphs: [
          "Our four lead captains run Day Tripper, Meeseeks, The Irony, and Clever Girl with an average tenure of 7 years at Premier. They are not seasonal hires. They have run the same coves, the same swim spots, and the same group dynamics through every weather pattern Lake Travis throws — high winds out of the south in March, sudden afternoon thunderheads in July, foggy spring mornings, and the dry chop of August. That repetition is what produces a 15-year clean record across 150,000+ guests. Every captain is TPWD-licensed (Texas Parks and Wildlife Department commercial captain license), CPR-certified through American Red Cross or American Heart Association, and on Clever Girl carries an additional Lifeguard certification.",
          "On the day of your booking, the captain is the person who runs the 4-minute pre-cruise safety briefing, picks the swim cove based on real-time water and weather conditions, manages the swim platform when guests enter and exit, monitors the marine VHF radio (channel 16), watches the sky for incoming weather, and stays sober and focused for the entire sailing. Captains do not drink on the boat. Captains do not skip the safety briefing. Captains have authority — full and final — to anchor, return to dock, or cancel a cruise if conditions warrant. We hire and pay for that authority because guests' safety is the only thing that matters.",
          "Behind the captains is a crew that loads coolers, manages life jacket fit for kids on family charters, handles tie-up at the swim cove, runs the audio system, and assists with guest boarding. Crew are CPR-trained and brief every season on incident response. The captain + crew model is what separates a captained party charter like Premier from a self-drive pontoon rental: someone whose entire job is the safety and rhythm of the day, not someone in your group who has to stay sober and navigate.",
        ],
      },
      {
        heading: 'Premier Safety Code — what we promise every group',
        paragraphs: [
          "1) A TPWD-licensed captain on every sailing, every time. No exceptions, no substitutions.",
          "2) USCG-approved life jackets in every adult, child, and infant size on every boat — regardless of whether kids are listed on the booking.",
          "3) A 4-minute safety briefing before every cruise. Never skipped. Never rushed.",
          "4) Real-time weather monitoring with the authority to anchor, return early, or cancel for safety. Free reschedules on every weather-caused cancellation, always.",
          "5) Captain and crew sober at all times during the sailing. We don't compromise this rule.",
          "6) $2M general liability + $5M aggregate insurance through a marine-specialty carrier; COI shared on request and corporate clients added as additional insured for events that require it.",
          "7) An on-board first-aid kit restocked monthly, fire extinguisher rated for boat fires, marine VHF radio monitored on channel 16, anchor + 200 ft of rode, navigation lights, and a Type IV throwable cushion on every boat.",
          "8) 0 reportable incidents across 150,000+ guests over 15+ years — a record we measure, publish, and protect by hiring captains and crew we trust to enforce all of the above.",
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

  '/premier-vs-pontoon': {
    intro: "An honest cost-comparison of Premier Party Cruises vs a budget Lake Travis pontoon rental. The headline rate looks higher on Premier; the trip-end total usually doesn't. Here's the line-by-line math, the per-guest breakdown, and the narrow profile of group for whom a DIY pontoon actually wins.",
    sections: [
      {
        heading: 'Why the headline price is misleading',
        paragraphs: [
          "A budget Lake Travis pontoon rents for $400–$800/day for the boat alone. That number is what most groups see and compare against Premier's $200/hr starting rate (which sounds higher because it's hourly). What the pontoon sticker price doesn't include: the captain (you drive, or you add $200–$300/day for one), the sound system (you bring your own speaker or rent one for $75–$200), fuel ($60–$120 of it for a 4-hour day), ice ($30–$60 to fill the coolers you also have to bring), floats and lily pads ($50–$200 depending on what you buy or rent), pro audio if you want music that actually fills the boat, life jackets in every size, and the on-board restroom most pontoons don't have.",
          "Premier's $200/hour starting rate already includes all of those. The captain is TPWD-licensed and CPR-certified. The Bluetooth audio is marine-grade. The coolers are large and BYOB-stocked (or pre-iced via Party On Delivery, our sister company). USCG life jackets are stocked in every size including infant + child on every boat regardless of who shows up. There's an on-board restroom. Anderson Mill Marina parking is free. The path from car to boat has no stairs.",
        ],
      },
      {
        heading: 'The all-in math, line by line',
        paragraphs: [
          "Premier 4-hour Day Tripper (14 guests) at $200/hr base rate = $800. Add Texas sales tax (8.25%) = $66. Add 20% gratuity for the crew = $160. All-in total: roughly $1,026 for the boat day.",
          "Budget pontoon DIY for the same 4 hours: $600 boat rental + $250 captain add-on (if you don't drive) + $100 audio rental + $80 fuel + $50 ice + $100 floats = $1,180 base, before tip and food. And the group still does all the planning + safety on the day.",
          "Per-guest math at full boat capacity (Premier base rate, before tax + gratuity): Day Tripper 14 guests at 4 hours = ~$57/guest. Meeseeks or The Irony 25 guests at 4 hours = ~$48/guest. Clever Girl 75 guests at 4 hours = ~$27/guest. The pontoon math typically lands at ~$120–$190/guest because pontoons cap at 8–12 guests. The bigger the group, the worse the pontoon ratio gets.",
        ],
      },
      {
        heading: 'What\'s included in Premier\'s base rate vs what you add to a pontoon',
        paragraphs: [
          "Premier base rate includes: TPWD-licensed captain, fuel, premium Bluetooth sound system, large coolers, USCG life jackets every size, on-board restroom, Anderson Mill Marina access (free parking, no stairs from car to boat). Texas sales tax (8.25%) and a 20% gratuity for the crew are added on top as transparent line items at checkout — never hidden, always shown before you pay.",
          "Budget pontoon DIY: the boat rental, period. Everything else is on you to source, pay for, and coordinate — captain, sound, fuel, ice, floats, life jacket fit-checking, safety briefing, navigation, anchor selection, and weather decisions.",
        ],
      },
      {
        heading: 'Safety: licensed captain vs renter responsibility',
        paragraphs: [
          "Premier carries a TPWD-licensed, CPR-certified captain on every sailing. 15+ years of operation, 150,000+ guests served, zero reportable safety incidents — the longest unblemished record on Lake Travis. $2M general liability + $5M aggregate insurance through a marine-specialty carrier. Pre-cruise 4-minute safety briefing on every boat. Children's life jackets in every size on every boat regardless of booking.",
          "DIY pontoon safety is the renter's responsibility. Someone in your group has to stay sober, navigate the boat, decide the swim spot, fit life jackets, monitor weather, and respond to anything that goes sideways. For experienced-boater small groups, that's manageable. For high-stakes occasions — bachelorette/bachelor parties, weddings, corporate events, family reunions, mixed-age groups — the captained difference is meaningful enough that corporate compliance teams, wedding planners, and family planners specifically pick Premier for it.",
        ],
      },
      {
        heading: 'When the DIY pontoon actually wins',
        paragraphs: [
          "There is one specific profile where a self-drive pontoon is genuinely cheaper end-to-end: 5–8 experienced boaters who want autonomy, are comfortable driving and staying sober, know Lake Travis well, and don't need a hosted experience. That's roughly 5% of Austin party-on-the-water trips. For the other 95% — bach groups, weddings, corporate, mixed-age family events, anyone over 8 guests, anyone who wants the day to feel produced — Premier's all-in number lands at or below the realistic DIY total once you add what gets left out of the pontoon sticker price.",
        ],
      },
      {
        heading: 'Weather policy: Premier vs typical pontoon outfitter',
        paragraphs: [
          "Premier offers FREE weather reschedules on every booking. Every weather-caused cancellation gets rebooked at no charge — no rebooking fee, no deposit forfeit. We monitor National Weather Service marine forecasts for Lake Travis (zone TXZ191) and make the call ourselves; we will never put a group on the water in unsafe conditions to preserve a booking. Pontoon outfitter weather policies vary widely; many require deposit forfeit on weather-day cancellations or charge a rebooking fee, especially during peak season. Always confirm the policy before booking a pontoon.",
        ],
      },
    ],
    faqs: [
      { q: 'Is a Lake Travis pontoon rental cheaper than Premier Party Cruises?', a: 'On sticker price, yes — pontoons start at $400–$800/day for the boat alone. Once you add a captain ($200–$300/day), audio, fuel, ice, floats, and the planning load, the all-in total usually exceeds Premier — and you spend the day working instead of celebrating. Premier base rate includes all of those.' },
      { q: 'What does Premier include that a pontoon doesn\'t?', a: 'TPWD-licensed captain, fuel, premium Bluetooth sound system, large coolers, USCG life jackets every size including infant + child, on-board restroom, marina access (free parking, no stairs), and a 4-minute pre-cruise safety briefing. Texas tax (8.25%) + 20% gratuity added as transparent line items on top of the base rate.' },
      { q: 'What\'s the per-guest cost on Premier vs a pontoon?', a: 'Premier base-rate per-guest at full capacity: Day Tripper ~$57, Meeseeks/Irony ~$48, Clever Girl ~$27. Add tax + gratuity. Pontoons typically run $120–$190/guest because they cap at 8–12 guests. The bigger your group, the better Premier\'s math.' },
      { q: 'When does a pontoon make more sense?', a: '5–8 experienced boaters who want autonomy, are comfortable driving and staying sober, know Lake Travis well, and don\'t need a hosted experience. About 5% of Austin party-on-the-water trips. For the other 95%, Premier wins on the all-in math.' },
      { q: 'Is Premier safer than renting a pontoon?', a: 'Premier has TPWD-licensed captains, CPR-certified crew, USCG life jackets every size on every boat, $2M GL + $5M aggregate insurance, and a 15+ year zero-incident record across 150,000+ guests. Pontoon safety is on the renter — someone has to stay sober, navigate, manage life jackets, and make weather calls. For high-stakes occasions, captained is the call.' },
      { q: 'Does Premier offer free weather rescheduling?', a: 'Yes — every booking. Every weather-caused cancellation gets rebooked at no charge. No rebooking fee, no deposit forfeit. Many pontoon outfitters charge for weather-day rebookings or forfeit deposits.' },
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
  '/sweet-16-party-boat': {
    intro: "A Sweet 16 party boat on Lake Travis turns the most-photographed birthday in a kid's life into a real Austin event the whole family can attend without anyone driving the boat. Premier Party Cruises produces ~30 Sweet 16 charters every year on Lake Travis — private boats from 14 to 75 guests, captain handles the driving, parents on board (or not), and a marina with no stairs so heels are not a hazard.",
    sections: [
      {
        heading: 'Why a private boat beats a venue for Sweet 16',
        paragraphs: [
          'A traditional Sweet 16 venue costs $2,500–$8,000 in Austin once you add room rental, food minimum, valet, decor rental, and a DJ. A private Premier charter starts at $200/hour on Day Tripper (14 guests) up to $250/hour on Clever Girl (75 guests) base rate, and includes the captain, fuel, premium audio for the playlist, coolers, and the venue itself — Lake Travis at sunset.',
          'Logistics that would normally fall on the parents are baked in. The captain handles every safety call. The audio system is loud enough for a real dance floor on the upper deck. Parents who want to be on board ride free as the legal-adult chaperones; parents who want a quiet four hours can drop off at the dock and pick up four hours later.',
        ],
      },
      {
        heading: 'Boats that fit a Sweet 16 group',
        paragraphs: [
          'Day Tripper (14 guests) — the right size for an intimate Sweet 16 dinner cruise with the birthday teen and their closest 12 friends plus two parent chaperones. Base rate $200/hr.',
          'Meeseeks or The Irony (25–30 guests) — the most-booked Sweet 16 size. Room for the friend group, a few cousins, and parents. Base rate $225/hr.',
          'Clever Girl (75 guests) — the flagship for big-class Sweet 16s where the entire grade gets invited. Two decks, full DJ-grade audio, the most photo-worthy boat on Lake Travis. Base rate $250/hr.',
        ],
      },
      {
        heading: 'Sweet 16 add-ons we coordinate',
        paragraphs: [
          'Premier coordinates everything Sweet 16 parents typically piece together themselves: a professional photographer, a real DJ (vs. just a Bluetooth playlist), Lake Travis sunset timing, custom decor (helium balloons cleared by the captain so they don\'t fly off), a personalized cake from a local Austin baker delivered straight to the dock, and a party-bus shuttle from the school or home to Anderson Mill Marina so parents are not also playing chauffeur.',
          'All ages welcome on private charters — no 21+ restrictions. The 21+ rule only applies to our public ATX Disco Cruise.',
        ],
      },
    ],
    faqs: [
      { q: 'Is the Sweet 16 boat alcohol-free?', a: 'On private charters, alcohol is at the parents\' discretion for guests 21+ only. The teens on board do not consume alcohol — Texas law applies on the water exactly like on land, and our captains enforce it.' },
      { q: 'How long is a typical Sweet 16 cruise?', a: 'The most-booked block is 4 hours on a Saturday afternoon (3:30–7:30 PM captures golden-hour sunset photos). Weekday charters can go as short as 3 hours.' },
      { q: 'Can we bring a custom cake?', a: 'Yes. We have an on-board cooler the captain will stage the cake in until cake-cutting time. Local Austin bakers we have worked with for years can deliver straight to Anderson Mill Marina if you prefer.' },
      { q: 'Do parents have to come?', a: 'At least two adult chaperones (21+) are required by our policy for any minor-majority charter, but they do not have to be the birthday teen\'s parents. Aunts, uncles, older cousins, or a paid chaperone all count.' },
      { q: 'How much does a Sweet 16 boat cost?', a: 'Base rate from $200/hr (14 guests) to $250/hr (75). A standard 4-hour Saturday Sweet 16 on Meeseeks (25 guests) runs $900 base + Texas tax (8.25%) + 20% gratuity for the captain — roughly $1,170 all-in for the boat. Add-ons (photographer, DJ, decor) are quoted separately.' },
      { q: 'Is it safe?', a: 'Premier has a 15+ year clean safety record across 150,000+ guests on Lake Travis. Every Premier captain is TPWD-licensed and CPR-certified. Life jackets in every size are on every boat regardless of who is booked.' },
    ],
  },
  '/family-cruises': {
    intro: "Premier Party Cruises is best known for the ATX Disco Cruise and bachelorette weekends — but the larger half of our annual bookings are family cruises on Lake Travis: multi-generation reunions, kid birthdays, anniversaries, retirement parties, memorials, and celebrate-the-grandparents weekends. Different occasion, same fleet, same captains, same marina — and the result is the same: zero stairs, every life-jacket size on board, the calm sunset half of Lake Travis instead of the rager half.",
    sections: [
      {
        heading: 'Family cruises vs. our party-boat side',
        paragraphs: [
          'Two modes, one fleet. The "Disco" side is what Premier is famous for — public 21+ sailings, dance floor, big-group bach weekends. The "Chill" side is the family-cruise mode: the captain points the boat at a quiet cove, the audio drops to background level, the kids swim from the boat\'s built-in ladder, the grandparents stay on the shaded upper deck, and the photographer gets a four-generation portrait at golden hour.',
          'You pick the mode at booking. The captain follows the booking sheet — your group decides whether the day is a dance floor or a floating reunion picnic.',
        ],
      },
      {
        heading: 'Why families pick the boat over a backyard',
        paragraphs: [
          'No host. No cleanup. No who-drives-grandma. The captain handles all the boat work, the dock crew handles the loading, and the marina is 25 minutes from downtown Austin via 183 N. Grandparents who do not enjoy a backyard barbecue in 100° August heat enjoy a moving boat with a full breeze and a covered upper deck.',
          'Anderson Mill Marina has flat parking right next to the dock — no stairs, no gravel, no incline. Walkers, wheelchairs, and strollers all roll straight from the parking lot to the boat ramp. The boats themselves have wide doors and stable platforms (much more stable than a standard pontoon) so multi-generational boarding is a non-event.',
        ],
      },
      {
        heading: 'Boats sized for family events',
        paragraphs: [
          'Day Tripper (14) — immediate family + close cousins. Base $200/hr.',
          'Meeseeks or The Irony (25–30) — the standard size for most family reunions. Three generations, a few in-laws, plus the kids. Base $225/hr.',
          'Clever Girl (75) — full extended-family reunion territory. Base $250/hr. Two decks means the kids can be on one and the grandparents on the other.',
        ],
      },
    ],
    faqs: [
      { q: 'Are kids allowed?', a: 'Yes — all ages welcome on every private charter. The only 21+ event we run is the public ATX Disco Cruise. Private = your group, your rules.' },
      { q: 'Do you have infant life jackets?', a: 'Yes. USCG-approved infant, child, youth, and adult life jackets are on every boat regardless of whether the manifest lists kids.' },
      { q: 'Is the boat shaded?', a: 'Yes. Every Premier boat has a covered upper deck or canopied seating area so older guests, infants, and anyone who burns easily can stay out of direct sun. Lake Travis afternoons routinely hit 95°+ in summer — the shade is not optional, it\'s essential.' },
      { q: 'Can grandparents board easily?', a: 'Yes — Anderson Mill Marina has flat boarding from the parking lot to the boat with no stairs. Walkers and wheelchairs board without lifts. Larger boats (Clever Girl, The Irony) also have ADA-style heads on board.' },
      { q: 'Can we bring food and a cake?', a: 'Absolutely. Family cruises typically include catered food (Salt Lick, Stiles Switch, Terry Black\'s all deliver to the marina) plus a cake. The boat has coolers and a counter for serving. BYOB beverages welcome — we have a sister company, Party On Delivery, that can stage pre-iced drinks if you\'d rather not stop at HEB.' },
      { q: 'How long should we book?', a: 'Most family reunions book 4 hours. That covers boarding, a swim/anchor stop, food + cake, sunset photos, and unhurried unloading.' },
    ],
  },
  '/executive-cruises': {
    intro: "Premier Party Cruises\u2019 executive division produces Lake Travis charters built around small-group business: client dinners on the water, board offsites, partner-firm hosting, sales-incentive trips, and exec retirement sendoffs. These are the bookings where invoicing matters more than the playlist — W-9 + NET-30 invoicing, certificates of insurance, captain briefings on attendee names, and a quiet calm-mode boat profile that produces conversations, not chants.",
    sections: [
      {
        heading: 'The executive-cruise format',
        paragraphs: [
          'A Premier executive cruise is intentionally not a party boat. The captain is briefed on the principal\'s name and the guest list. Audio runs at conversation level (think hotel lobby, not nightclub). The bar is curated by the host — typically wine, premium spirits, and a non-alcoholic option for guests who don\'t drink. Catering is staged off-marina and brought aboard cold. The boat anchors at one of three quiet coves we have used hundreds of times so wake from passing boats does not interrupt remarks or toasts.',
          'Most executive bookings run 3 hours weekday late-afternoon (3:30–6:30 PM) or 4 hours on a weekend evening (5:00–9:00 PM for sunset). The smaller Day Tripper (14 guests) is the most-booked exec boat — board-meeting size, focused conversation, and the captain functions as the silent staff.',
        ],
      },
      {
        heading: 'Invoicing, COIs, and corporate procurement',
        paragraphs: [
          'Premier issues W-9, ACH-payable invoices on NET-30 terms for any registered business or institution. Certificates of insurance up to $2M general liability are produced on request, with the booking entity\'s legal name and the marina (Lake Travis Boat Tours / Anderson Mill Marina) listed as additional insured. Corporate cards (Amex, Visa, MC) are accepted with an authorization form on file.',
          'For Fortune-1000 procurement teams, we provide a vendor-onboarding packet: TPWD captain license copies, USCG inspection certificate, current liability + watercraft insurance binders, sample invoice, sample COI, business registration (B Hill Entertainment, LLC, Texas), and EIN. Most procurement teams clear our packet within 5 business days.',
        ],
      },
      {
        heading: 'Pricing and base-rate transparency',
        paragraphs: [
          'Day Tripper (14) — $200/hr base. Meeseeks / The Irony (25–30) — $225/hr base. Clever Girl (75) — $250/hr base. Base rate includes captain, fuel, premium audio, on-board restroom, life jackets, and dock access.',
          'Texas state sales tax (8.25%) and a 20% captain + crew gratuity are added at checkout as transparent line items — every figure is itemized for accounting. Catering, premium bar, photography, and named centerpieces are quoted separately so the line items match how a corporate AP department needs to receive them.',
        ],
      },
    ],
    faqs: [
      { q: 'Can we get a COI?', a: 'Yes. Up to $2M general liability + watercraft. Standard turnaround is 24 business hours; we can rush for same-day if booked 5+ business days out.' },
      { q: 'Do you accept NET-30?', a: 'Yes for any registered business or institution with a clean credit record. New corporate clients run the first booking on credit card; subsequent bookings can move to NET-30.' },
      { q: 'How quiet is the boat actually?', a: 'For exec bookings, audio is set to 35–45% maximum. Two captains on staff specifically prefer the calm-mode briefings. Toasts and remarks carry without amplification on Day Tripper and Meeseeks; Clever Girl has a wireless mic for larger groups.' },
      { q: 'Can we host an evening client dinner?', a: 'Yes — most executive bookings are exactly that. We coordinate with Austin caterers (Eddie V\'s, Carillon, Z\'Tejas) for staged-on-board service, or pre-order from the catering you already use.' },
      { q: 'Is alcohol provided?', a: 'BYOB on every Premier charter. Our sister company Party On Delivery can pre-stock the boat with the exact bottles you specify (premium spirits, wine, beer, or non-alcoholic) so guests do not see a HEB bag taped to a cooler.' },
      { q: 'Can spouses or partners join?', a: 'Yes. The boat is your venue for the booked block — all-ages on private charters. Many exec retirement and milestone bookings are 50% colleagues, 50% family.' },
    ],
  },
  '/sunset-anniversary-cruise': {
    intro: "A Lake Travis sunset cruise is the highest-rated date Austin has on TripAdvisor, and Premier\u2019s anniversary cruise format is the version couples and families book to mark a real milestone — 10th, 25th, 40th anniversaries, vow renewals, surprise proposals, and quiet \"we made it\" dinners on the water with a few close friends. The boat does the work; the lake does the rest.",
    sections: [
      {
        heading: 'The anniversary cruise format',
        paragraphs: [
          'A 3-hour sunset block (5:00–8:00 PM in summer, 4:00–7:00 PM in winter) is the most-booked anniversary timing because it captures golden hour, sunset, and twilight in one cruise. We start at Anderson Mill Marina, run out to one of two anchor coves we save for quiet dinners, and stage the boat so the dinner table faces west — the sun sets directly over the open water from there.',
          'The captain runs at idle during dinner so wine glasses and plates are stable. The audio runs at conversation level with whatever playlist the couple has built. Most couples bring their own wine + cheese setup; a few hire a private chef who comes aboard with two courses + dessert plated directly on the boat\'s dining surface.',
        ],
      },
      {
        heading: 'Boats sized for anniversaries',
        paragraphs: [
          'Day Tripper (14) is the most-booked anniversary boat — couple-only, parents-of-the-couple, or a small dinner with 6–10 close friends. Quiet, fast to move when the captain wants to chase a particular cove for the photo. Base $200/hr.',
          'The Irony (25–30) — vow renewals or 25th-anniversary parties where the couple invites the wedding party 25 years later. Base $225/hr.',
          'Clever Girl (75) — milestone anniversaries that double as family reunions; the only Lake Travis party boat with a full upper-deck dance floor for the post-dinner half. Base $250/hr.',
        ],
      },
      {
        heading: 'Surprise proposals on Premier',
        paragraphs: [
          'Premier coordinates roughly two surprise proposals every weekend during peak season. The captain is briefed in advance, the marina staff knows to time the boat\'s departure to align with golden hour, and the proposing partner can coordinate a photographer who boards as a "fellow guest" 15 minutes early to set up unobtrusively. The yes-she-said-yes photo is then taken with the sun on the water behind the couple.',
          'We do not charge for proposal coordination. It is part of how the anniversary side of Premier already runs.',
        ],
      },
    ],
    faqs: [
      { q: 'When is the best time of year?', a: 'April through October offers the warmest sunsets. May–June and September–October produce the most photogenic golden hour because the air is clear and the lake is at high pool. July–August have the longest light but also the most boat traffic on weekends.' },
      { q: 'How do we time sunset exactly?', a: 'Tell us the date at booking and we calculate departure off NOAA sunset times for Lake Travis. Standard formula: depart 90 minutes before sunset, anchor 30 minutes before, sit for the full sunset, run home in twilight.' },
      { q: 'Can we bring our own dinner?', a: 'Yes — a catered or self-brought dinner is encouraged. The boat has counter space and coolers for staging. Several couples have hired Austin private chefs (search "private chef Austin Lake Travis") for two-course on-board service.' },
      { q: 'Can we bring decorations?', a: 'Yes — flowers, candles (battery-operated only, real flame is not allowed on the water), photo timeline boards, and a cake all work. The captain stages decor before guests board so the reveal is intact.' },
      { q: 'What if it rains?', a: 'Premier\'s fair-weather policy: any captain-called weather cancellation gets a free reschedule, no fee. Couples typically reschedule to the next weekend.' },
      { q: 'How much does an anniversary cruise cost?', a: 'A 3-hour Day Tripper anniversary cruise base rate is $600 + Texas tax (8.25%) + 20% gratuity = roughly $780 all-in. The Irony 3-hour is $675 base ($877 all-in). Catering, photography, and decor are quoted separately.' },
    ],
  },
  '/lake-bachelor-bachelorette': {
    intro: "A Lake Travis bachelorette or bachelor party is the most-booked single occasion on Premier\u2019s calendar — roughly 60% of summer weekends are bach groups. This page is the operator-direct booking guide for groups that have already decided Lake Travis is the destination and want the boat-day logistics figured out without scrolling 17 Pinterest boards. Private charters from 14 to 75 guests, BYOB, captain handles the driving, marina 25 minutes from downtown Austin.",
    sections: [
      {
        heading: 'Why Lake Travis specifically (vs. Lake Austin or LBJ)',
        paragraphs: [
          'Lake Travis is the largest of the Highland Lakes (~19,000 surface acres) and the only one with the cove geography that supports a real boat-day stop: anchor in 8–12 feet of water, swim ladder down, floats out, music up. Lake Austin is narrower, no-wake speed-restricted in most coves, and dominated by waterfront homes that ban anchoring near them. Lake LBJ is further (90 min from downtown Austin) and has fewer commercial operators.',
          'Anderson Mill Marina is on the north arm of Lake Travis where the swim coves are deepest and the wake is calmest. From the marina, the captain runs about 15 minutes to one of three regular anchor coves we use for bach groups depending on water levels, wind, and how busy the lake is that day.',
        ],
      },
      {
        heading: 'Boats sized for bach groups',
        paragraphs: [
          'Day Tripper (14) — small, intimate bach-side groups; budget-conscious bachelors. Base $200/hr.',
          'Meeseeks (25) or The Irony (30) — the most-booked bach size. The bridal party + close friends + the maid of honor + a couple of moms. Base $225/hr.',
          'Clever Girl (75) — combined bachelor + bachelorette weekends, big sorority groups, friends-of-friends bachelorettes. The only Lake Travis party boat with two decks and a real dance floor. Base $250/hr.',
        ],
      },
      {
        heading: 'BYOB + Party On Delivery',
        paragraphs: [
          'BYOB is the rule on Lake Travis (cans + plastic only, no glass on the water). Premier\'s sister company Party On Delivery pre-ices the boat with whatever the group orders — White Claw, Tito\'s, mixers, La Croix — so the bachelorette doesn\'t spend her own afternoon at HEB rolling a cooler. The boat\'s coolers are loaded at the dock 30 minutes before boarding.',
          'For bachelor parties: same setup, fewer Pinterest boards. Party On Delivery handles cigar requests, premium spirits, sparkling water for the designated drivers among the groomsmen.',
        ],
      },
    ],
    faqs: [
      { q: 'Is the boat 21+ for bach groups?', a: 'Private charters are all-ages — there is no 21+ requirement. The 21+ rule only applies to our public ATX Disco Cruise. Bachelorettes with a sister under 21 or a teen niece are completely fine on a private boat.' },
      { q: 'How many hours do bach groups book?', a: '4 hours on Saturdays is the standard. The most-booked block is 11 AM–3 PM (lunch on the water + sunny photo light) or 3:30–7:30 PM (afternoon to sunset).' },
      { q: 'How much per person?', a: 'Math: 4-hour Saturday on Meeseeks (25 guests) = $900 base + tax (8.25%) + 20% gratuity = ~$1,170 / 25 = $46.80 per person for the boat. Add ~$25–$40 per person for BYOB if you let Party On Delivery stock it. Dance-floor capacity on Clever Girl: $1,000 base ÷ 75 = $13.33/person base.' },
      { q: 'Can we bring decorations?', a: 'Yes — sashes, banners, balloons (helium tied down so they do not fly off), bach-themed cups, custom shirts, the works. Glitter is discouraged because the lake breeze sends it everywhere.' },
      { q: 'Do we need to bring our own playlist?', a: 'No, but most groups do. The boat has Bluetooth + AUX. We have backup playlists if anyone\'s phone battery dies mid-cruise.' },
      { q: 'What if the weather is bad?', a: 'Premier\'s fair-weather policy: free reschedule for any captain-called weather cancellation. We reschedule about one bach group every 3 weeks to the next weekend during summer thunderstorms.' },
      { q: 'Can we shuttle from downtown?', a: 'Yes. Austin party-bus operators we work with run round-trip Anderson Mill Marina shuttles for $600–$1,500 depending on group size. Direct dock drop-off, no parking lot walk.' },
    ],
  },
  '/canada-to-austin-bachelorette': {
    intro: "Austin is the #2 destination for Canadian bachelorettes after Nashville, with Toronto and Montreal accounting for roughly 70% of cross-border bach traffic to Texas. Premier Party Cruises produces about 40 Toronto-origin and Montreal-origin bachelorette weekends per year on Lake Travis, and this page is the cross-border planning guide for the maid-of-honor planning from a Canadian zip code.",
    sections: [
      {
        heading: 'Why Toronto and Montreal pick Austin',
        paragraphs: [
          'Direct flights from YYZ (Toronto Pearson) and YUL (Montreal Trudeau) to AUS (Austin-Bergstrom) run multiple times daily on Air Canada, WestJet, and seasonally on Porter. Flight time is 4 hours from Toronto and 4.5 hours from Montreal. The exchange rate consistently makes a Lake Travis weekend 30–35% cheaper than the equivalent Muskoka or Wasaga lake-house weekend after gas, food, and rental costs in CAD.',
          'Austin\'s weather window for outdoor bachelorette weekends is also longer than Ontario\'s. Lake Travis is boat-warm March through October; Ontario lake season is May to September on a good year, and the bach-celebrating cohort has wedding scheduled across the entire calendar.',
        ],
      },
      {
        heading: 'Cross-border boat-day logistics',
        paragraphs: [
          'Passport required for bachelorette guests crossing from Canada (NEXUS speeds the YYZ pre-clearance). 21+ Texas drinking age applies to alcohol on the boat (Quebec\'s 18+ does not transfer to Texas waters). Canadian credit cards (Visa, Mastercard, Amex) work normally for booking; we accept CAD-billed cards and process in USD.',
          'Anderson Mill Marina is 25 minutes from downtown hotels via Highway 183 N. Most Canadian groups stay around 6th Street or Rainey Street and Uber to the marina ($35–$55 each way for a typical SUV). Larger groups book a party bus from downtown to the dock — round-trip $600–$1,500 depending on bus size.',
        ],
      },
      {
        heading: 'Saturday boat day + Sunday sendoff',
        paragraphs: [
          'The most-booked Toronto/Montreal bachelorette block is a Friday-arrival, Saturday-on-the-water, Sunday-brunch-and-fly-home weekend. Premier handles the Saturday: 11 AM–3 PM on Meeseeks or The Irony for groups of 25–30, or 3:30–7:30 PM for groups that prefer sunset over high noon. Texas BBQ on board (Salt Lick or Stiles Switch) is the most-requested catering — neither of those operators exists in Canada and the bachelorettes order it specifically because they cannot get it at home.',
          'Sunday brunch at Counter Café, Bouldin Creek, or Kerbey Lane sends the group to the airport before noon. Some groups stay through Sunday for an Austin City Limits or 6th Street live-music night.',
        ],
      },
    ],
    faqs: [
      { q: 'Can a Canadian credit card book?', a: 'Yes. Visa, Mastercard, and Amex from any Canadian issuer process normally. We bill in USD; the Canadian card issuer handles the FX conversion at their daily rate.' },
      { q: 'Do you accept CAD?', a: 'No — we bill exclusively in USD. The card issuer applies their FX. Most Canadian travel cards charge no FX fee on USD purchases.' },
      { q: 'What is the Texas drinking age for our 19- and 20-year-old guests?', a: '21+ in Texas, no exceptions on the water. Guests under 21 can absolutely come on the boat — they just cannot consume alcohol while in Texas. Soft drinks, mocktails, and non-alcoholic seltzers are unrestricted.' },
      { q: 'Is the boat cancellation policy good for international travelers?', a: 'Yes. Premier\'s fair-weather policy refunds or reschedules any captain-called weather cancellation at no fee. For non-weather cancellations, our standard policy is a 50% refund up to 14 days out, full refund up to 30 days out, with most international bookings choosing the trip-insurance option that covers any reason.' },
      { q: 'How early should we book from Canada?', a: 'Saturday summer slots (May–Sept) book out 6–8 weeks ahead. Toronto and Montreal groups typically book during the engagement-party window (3–6 months ahead of the wedding) which gives easy access to the preferred dates.' },
      { q: 'Can we get a vendor list with addresses for our group?', a: 'Yes. Email us with the wedding date and number of guests; we send a Google Doc with vetted Austin caterers (with delivery to Anderson Mill Marina), photographers, party-bus operators, downtown hotels, and Sunday brunch reservations.' },
    ],
  },
};

export function getRichContent(slug) {
  const normalized = slug === '/' ? '/' : slug.replace(/\/$/, '');
  return RICH_CONTENT[normalized] || null;
}
