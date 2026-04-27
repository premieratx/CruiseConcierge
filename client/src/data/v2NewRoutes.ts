/**
 * V2 NEW ROUTES — runtime mirror of scripts/v2-rich-content.mjs entries
 * for the 6 Two-Mode-Vibe / Sweet 16 / Canada-bachelorette / etc. pages
 * we shipped 2026-04-26.
 *
 * The build-time prerender uses scripts/v2-rich-content.mjs to produce
 * the static HTML crawlers see. This TS mirror is what the React SPA
 * uses to hydrate over the prerendered HTML so users navigating to
 * /sweet-16-party-boat etc. see the same content (not a wouter 404).
 *
 * Edits made here must be mirrored in scripts/v2-rich-content.mjs and
 * scripts/v2-seo-overlay.mjs.
 */

export interface V2RouteContent {
  slug: string;
  title: string;
  description: string;
  h1: string;
  heroEyebrow: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faqs: Array<{ q: string; a: string }>;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export const V2_NEW_ROUTES: Record<string, V2RouteContent> = {
  '/sweet-16-party-boat': {
    slug: '/sweet-16-party-boat',
    title: 'Austin Sweet 16 Party Boat · Lake Travis from $200/Hour',
    description:
      "Austin Sweet 16 party boat rentals on Lake Travis. Private charters 14–75 guests, captain handles the driving, parents on board (or not), DJ-grade audio, custom decor + cake delivery. Anderson Mill Marina, no stairs. Base from $200/hr; tax + 20% gratuity itemized.",
    h1: 'Austin Sweet 16 Party Boat Rentals on Lake Travis',
    heroEyebrow: 'Sweet 16 · Lake Travis · All-Ages Private',
    intro:
      "A Sweet 16 party boat on Lake Travis turns the most-photographed birthday in a kid's life into a real Austin event the whole family can attend without anyone driving the boat. Premier Party Cruises produces ~30 Sweet 16 charters every year on Lake Travis — private boats from 14 to 75 guests, captain handles the driving, parents on board (or not), and a marina with no stairs so heels are not a hazard.",
    sections: [
      {
        heading: 'Why a private boat beats a venue for Sweet 16',
        paragraphs: [
          "A traditional Sweet 16 venue costs $2,500–$8,000 in Austin once you add room rental, food minimum, valet, decor rental, and a DJ. A private Premier charter starts at $200/hour on Day Tripper (14 guests) up to $250/hour on Clever Girl (75 guests) base rate, and includes the captain, fuel, premium audio for the playlist, coolers, and the venue itself — Lake Travis at sunset.",
          "Logistics that would normally fall on the parents are baked in. The captain handles every safety call. The audio system is loud enough for a real dance floor on the upper deck. Parents who want to be on board ride free as the legal-adult chaperones; parents who want a quiet four hours can drop off at the dock and pick up four hours later.",
        ],
      },
      {
        heading: 'Boats that fit a Sweet 16 group',
        paragraphs: [
          "Day Tripper (14 guests) — the right size for an intimate Sweet 16 dinner cruise with the birthday teen and their closest 12 friends plus two parent chaperones. Base rate $200/hr.",
          "Meeseeks or The Irony (25–30 guests) — the most-booked Sweet 16 size. Room for the friend group, a few cousins, and parents. Base rate $225/hr.",
          "Clever Girl (75 guests) — the flagship for big-class Sweet 16s where the entire grade gets invited. Two decks, full DJ-grade audio, the most photo-worthy boat on Lake Travis. Base rate $250/hr.",
        ],
      },
      {
        heading: 'Sweet 16 add-ons we coordinate',
        paragraphs: [
          "Premier coordinates everything Sweet 16 parents typically piece together themselves: a professional photographer, a real DJ (vs. just a Bluetooth playlist), Lake Travis sunset timing, custom decor (helium balloons cleared by the captain so they don't fly off), a personalized cake from a local Austin baker delivered straight to the dock, and a party-bus shuttle from the school or home to Anderson Mill Marina so parents are not also playing chauffeur.",
          "All ages welcome on private charters — no 21+ restrictions. The 21+ rule only applies to our public ATX Disco Cruise.",
        ],
      },
    ],
    faqs: [
      { q: 'Is the Sweet 16 boat alcohol-free?', a: "On private charters, alcohol is at the parents' discretion for guests 21+ only. The teens on board do not consume alcohol — Texas law applies on the water exactly like on land, and our captains enforce it." },
      { q: 'How long is a typical Sweet 16 cruise?', a: "The most-booked block is 4 hours on a Saturday afternoon (3:30–7:30 PM captures golden-hour sunset photos). Weekday charters can go as short as 3 hours." },
      { q: 'Can we bring a custom cake?', a: "Yes. We have an on-board cooler the captain will stage the cake in until cake-cutting time. Local Austin bakers we have worked with for years can deliver straight to Anderson Mill Marina if you prefer." },
      { q: 'Do parents have to come?', a: "At least two adult chaperones (21+) are required by our policy for any minor-majority charter, but they do not have to be the birthday teen's parents. Aunts, uncles, older cousins, or a paid chaperone all count." },
      { q: 'How much does a Sweet 16 boat cost?', a: "Base rate from $200/hr (14 guests) to $250/hr (75). A standard 4-hour Saturday Sweet 16 on Meeseeks (25 guests) runs $900 base + Texas tax (8.25%) + 20% gratuity for the captain — roughly $1,170 all-in for the boat. Add-ons (photographer, DJ, decor) are quoted separately." },
      { q: 'Is it safe?', a: "Premier has a 15+ year clean safety record across 150,000+ guests on Lake Travis. Every Premier captain is TPWD-licensed and CPR-certified. Life jackets in every size are on every boat regardless of who is booked." },
    ],
    primaryCta: { text: 'Get a Sweet 16 Quote', href: '/quote' },
    secondaryCta: { text: 'See the Fleet', href: '/private-cruises' },
  },
  '/family-cruises': {
    slug: '/family-cruises',
    title: 'Lake Travis Family Cruises · Calm Mode, All Ages, No Stairs',
    description:
      "Family-mode private cruises on Lake Travis: multi-generation reunions, kid birthdays, anniversaries, retirement parties. Calm playlist, shaded upper deck, every life-jacket size, ADA boarding, captain handles the driving. Boats 14–75 guests; base from $200/hr.",
    h1: 'Lake Travis Family Cruises with Premier',
    heroEyebrow: 'Family Mode · All Ages · Calm',
    intro:
      "Premier Party Cruises is best known for the ATX Disco Cruise and bachelorette weekends — but the larger half of our annual bookings are family cruises on Lake Travis: multi-generation reunions, kid birthdays, anniversaries, retirement parties, memorials, and celebrate-the-grandparents weekends. Different occasion, same fleet, same captains, same marina — and the result is the same: zero stairs, every life-jacket size on board, the calm sunset half of Lake Travis instead of the rager half.",
    sections: [
      {
        heading: 'Family cruises vs. our party-boat side',
        paragraphs: [
          "Two modes, one fleet. The \"Disco\" side is what Premier is famous for — public 21+ sailings, dance floor, big-group bach weekends. The \"Chill\" side is the family-cruise mode: the captain points the boat at a quiet cove, the audio drops to background level, the kids swim from the boat's built-in ladder, the grandparents stay on the shaded upper deck, and the photographer gets a four-generation portrait at golden hour.",
          "You pick the mode at booking. The captain follows the booking sheet — your group decides whether the day is a dance floor or a floating reunion picnic.",
        ],
      },
      {
        heading: 'Why families pick the boat over a backyard',
        paragraphs: [
          "No host. No cleanup. No who-drives-grandma. The captain handles all the boat work, the dock crew handles the loading, and the marina is 25 minutes from downtown Austin via 183 N. Grandparents who do not enjoy a backyard barbecue in 100° August heat enjoy a moving boat with a full breeze and a covered upper deck.",
          "Anderson Mill Marina has flat parking right next to the dock — no stairs, no gravel, no incline. Walkers, wheelchairs, and strollers all roll straight from the parking lot to the boat ramp. The boats themselves have wide doors and stable platforms (much more stable than a standard pontoon) so multi-generational boarding is a non-event.",
        ],
      },
      {
        heading: 'Boats sized for family events',
        paragraphs: [
          "Day Tripper (14) — immediate family + close cousins. Base $200/hr.",
          "Meeseeks or The Irony (25–30) — the standard size for most family reunions. Three generations, a few in-laws, plus the kids. Base $225/hr.",
          "Clever Girl (75) — full extended-family reunion territory. Base $250/hr. Two decks means the kids can be on one and the grandparents on the other.",
        ],
      },
    ],
    faqs: [
      { q: 'Are kids allowed?', a: "Yes — all ages welcome on every private charter. The only 21+ event we run is the public ATX Disco Cruise. Private = your group, your rules." },
      { q: 'Do you have infant life jackets?', a: "Yes. USCG-approved infant, child, youth, and adult life jackets are on every boat regardless of whether the manifest lists kids." },
      { q: 'Is the boat shaded?', a: "Yes. Every Premier boat has a covered upper deck or canopied seating area so older guests, infants, and anyone who burns easily can stay out of direct sun. Lake Travis afternoons routinely hit 95°+ in summer — the shade is not optional, it's essential." },
      { q: 'Can grandparents board easily?', a: "Yes — Anderson Mill Marina has flat boarding from the parking lot to the boat with no stairs. Walkers and wheelchairs board without lifts. Larger boats (Clever Girl, The Irony) also have ADA-style heads on board." },
      { q: 'Can we bring food and a cake?', a: "Absolutely. Family cruises typically include catered food (Salt Lick, Stiles Switch, Terry Black's all deliver to the marina) plus a cake. The boat has coolers and a counter for serving. BYOB beverages welcome — we have a sister company, Party On Delivery, that can stage pre-iced drinks if you'd rather not stop at HEB." },
      { q: 'How long should we book?', a: "Most family reunions book 4 hours. That covers boarding, a swim/anchor stop, food + cake, sunset photos, and unhurried unloading." },
    ],
    primaryCta: { text: 'Get a Family Cruise Quote', href: '/quote' },
    secondaryCta: { text: 'See the Fleet', href: '/private-cruises' },
  },
  '/executive-cruises': {
    slug: '/executive-cruises',
    title: 'Austin Executive Cruises · Lake Travis Client + Board Boats',
    description:
      "Executive division of Premier Party Cruises: Lake Travis client dinners, board offsites, partner hosting, sales-incentive trips. W-9 + NET-30 invoicing, COIs to $2M, conversation-level audio, vetted caterers. Day Tripper from $200/hr base; tax + gratuity itemized.",
    h1: 'Austin Executive Cruises on Lake Travis',
    heroEyebrow: 'Executive · NET-30 · COI to $2M',
    intro:
      "Premier Party Cruises\u2019 executive division produces Lake Travis charters built around small-group business: client dinners on the water, board offsites, partner-firm hosting, sales-incentive trips, and exec retirement sendoffs. These are the bookings where invoicing matters more than the playlist — W-9 + NET-30 invoicing, certificates of insurance, captain briefings on attendee names, and a quiet calm-mode boat profile that produces conversations, not chants.",
    sections: [
      {
        heading: 'The executive-cruise format',
        paragraphs: [
          "A Premier executive cruise is intentionally not a party boat. The captain is briefed on the principal's name and the guest list. Audio runs at conversation level (think hotel lobby, not nightclub). The bar is curated by the host — typically wine, premium spirits, and a non-alcoholic option for guests who don't drink. Catering is staged off-marina and brought aboard cold. The boat anchors at one of three quiet coves we have used hundreds of times so wake from passing boats does not interrupt remarks or toasts.",
          "Most executive bookings run 3 hours weekday late-afternoon (3:30–6:30 PM) or 4 hours on a weekend evening (5:00–9:00 PM for sunset). The smaller Day Tripper (14 guests) is the most-booked exec boat — board-meeting size, focused conversation, and the captain functions as the silent staff.",
        ],
      },
      {
        heading: 'Invoicing, COIs, and corporate procurement',
        paragraphs: [
          "Premier issues W-9, ACH-payable invoices on NET-30 terms for any registered business or institution. Certificates of insurance up to $2M general liability are produced on request, with the booking entity's legal name and the marina (Lake Travis Boat Tours / Anderson Mill Marina) listed as additional insured. Corporate cards (Amex, Visa, MC) are accepted with an authorization form on file.",
          "For Fortune-1000 procurement teams, we provide a vendor-onboarding packet: TPWD captain license copies, USCG inspection certificate, current liability + watercraft insurance binders, sample invoice, sample COI, business registration (B Hill Entertainment, LLC, Texas), and EIN. Most procurement teams clear our packet within 5 business days.",
        ],
      },
      {
        heading: 'Pricing and base-rate transparency',
        paragraphs: [
          "Day Tripper (14) — $200/hr base. Meeseeks / The Irony (25–30) — $225/hr base. Clever Girl (75) — $250/hr base. Base rate includes captain, fuel, premium audio, on-board restroom, life jackets, and dock access.",
          "Texas state sales tax (8.25%) and a 20% captain + crew gratuity are added at checkout as transparent line items — every figure is itemized for accounting. Catering, premium bar, photography, and named centerpieces are quoted separately so the line items match how a corporate AP department needs to receive them.",
        ],
      },
    ],
    faqs: [
      { q: 'Can we get a COI?', a: "Yes. Up to $2M general liability + watercraft. Standard turnaround is 24 business hours; we can rush for same-day if booked 5+ business days out." },
      { q: 'Do you accept NET-30?', a: "Yes for any registered business or institution with a clean credit record. New corporate clients run the first booking on credit card; subsequent bookings can move to NET-30." },
      { q: 'How quiet is the boat actually?', a: "For exec bookings, audio is set to 35–45% maximum. Two captains on staff specifically prefer the calm-mode briefings. Toasts and remarks carry without amplification on Day Tripper and Meeseeks; Clever Girl has a wireless mic for larger groups." },
      { q: 'Can we host an evening client dinner?', a: "Yes — most executive bookings are exactly that. We coordinate with Austin caterers (Eddie V's, Carillon, Z'Tejas) for staged-on-board service, or pre-order from the catering you already use." },
      { q: 'Is alcohol provided?', a: "BYOB on every Premier charter. Our sister company Party On Delivery can pre-stock the boat with the exact bottles you specify (premium spirits, wine, beer, or non-alcoholic) so guests do not see a HEB bag taped to a cooler." },
      { q: 'Can spouses or partners join?', a: "Yes. The boat is your venue for the booked block — all-ages on private charters. Many exec retirement and milestone bookings are 50% colleagues, 50% family." },
    ],
    primaryCta: { text: 'Request Executive Quote', href: '/quote' },
    secondaryCta: { text: 'Corporate Page', href: '/corporate-events' },
  },
  '/sunset-anniversary-cruise': {
    slug: '/sunset-anniversary-cruise',
    title: 'Lake Travis Sunset Anniversary Cruise · Vow Renewals + 25th',
    description:
      "Lake Travis sunset cruises for anniversaries, vow renewals, and surprise proposals. 3-hour golden-hour blocks on Day Tripper (14) or The Irony (25–30), captain runs at idle for dinner, photographer + private chef coordinated. Base from $200/hr; tax + gratuity itemized.",
    h1: 'Lake Travis Sunset Anniversary Cruise',
    heroEyebrow: 'Sunset · Anniversaries · Vow Renewals',
    intro:
      "A Lake Travis sunset cruise is the highest-rated date Austin has on TripAdvisor, and Premier\u2019s anniversary cruise format is the version couples and families book to mark a real milestone — 10th, 25th, 40th anniversaries, vow renewals, surprise proposals, and quiet \"we made it\" dinners on the water with a few close friends. The boat does the work; the lake does the rest.",
    sections: [
      {
        heading: 'The anniversary cruise format',
        paragraphs: [
          "A 3-hour sunset block (5:00–8:00 PM in summer, 4:00–7:00 PM in winter) is the most-booked anniversary timing because it captures golden hour, sunset, and twilight in one cruise. We start at Anderson Mill Marina, run out to one of two anchor coves we save for quiet dinners, and stage the boat so the dinner table faces west — the sun sets directly over the open water from there.",
          "The captain runs at idle during dinner so wine glasses and plates are stable. The audio runs at conversation level with whatever playlist the couple has built. Most couples bring their own wine + cheese setup; a few hire a private chef who comes aboard with two courses + dessert plated directly on the boat's dining surface.",
        ],
      },
      {
        heading: 'Boats sized for anniversaries',
        paragraphs: [
          "Day Tripper (14) is the most-booked anniversary boat — couple-only, parents-of-the-couple, or a small dinner with 6–10 close friends. Quiet, fast to move when the captain wants to chase a particular cove for the photo. Base $200/hr.",
          "The Irony (25–30) — vow renewals or 25th-anniversary parties where the couple invites the wedding party 25 years later. Base $225/hr.",
          "Clever Girl (75) — milestone anniversaries that double as family reunions; the only Lake Travis party boat with a full upper-deck dance floor for the post-dinner half. Base $250/hr.",
        ],
      },
      {
        heading: 'Surprise proposals on Premier',
        paragraphs: [
          "Premier coordinates roughly two surprise proposals every weekend during peak season. The captain is briefed in advance, the marina staff knows to time the boat's departure to align with golden hour, and the proposing partner can coordinate a photographer who boards as a \"fellow guest\" 15 minutes early to set up unobtrusively. The yes-she-said-yes photo is then taken with the sun on the water behind the couple.",
          "We do not charge for proposal coordination. It is part of how the anniversary side of Premier already runs.",
        ],
      },
    ],
    faqs: [
      { q: 'When is the best time of year?', a: "April through October offers the warmest sunsets. May–June and September–October produce the most photogenic golden hour because the air is clear and the lake is at high pool. July–August have the longest light but also the most boat traffic on weekends." },
      { q: 'How do we time sunset exactly?', a: "Tell us the date at booking and we calculate departure off NOAA sunset times for Lake Travis. Standard formula: depart 90 minutes before sunset, anchor 30 minutes before, sit for the full sunset, run home in twilight." },
      { q: 'Can we bring our own dinner?', a: "Yes — a catered or self-brought dinner is encouraged. The boat has counter space and coolers for staging. Several couples have hired Austin private chefs (search \"private chef Austin Lake Travis\") for two-course on-board service." },
      { q: 'Can we bring decorations?', a: "Yes — flowers, candles (battery-operated only, real flame is not allowed on the water), photo timeline boards, and a cake all work. The captain stages decor before guests board so the reveal is intact." },
      { q: 'What if it rains?', a: "Premier's fair-weather policy: any captain-called weather cancellation gets a free reschedule, no fee. Couples typically reschedule to the next weekend." },
      { q: 'How much does an anniversary cruise cost?', a: "A 3-hour Day Tripper anniversary cruise base rate is $600 + Texas tax (8.25%) + 20% gratuity = roughly $780 all-in. The Irony 3-hour is $675 base ($877 all-in). Catering, photography, and decor are quoted separately." },
    ],
    primaryCta: { text: 'Plan Our Anniversary', href: '/quote' },
    secondaryCta: { text: 'See the Fleet', href: '/private-cruises' },
  },
  '/lake-bachelor-bachelorette': {
    slug: '/lake-bachelor-bachelorette',
    title: 'Lake Bachelor + Bachelorette · Lake Travis Private Charters',
    description:
      "Operator-direct booking guide for Lake Travis bachelor + bachelorette parties. Private charters 14–75 guests, BYOB + Party On Delivery, captain handles the driving, Anderson Mill Marina (25 min from downtown Austin). Base from $200/hr; tax + 20% gratuity itemized.",
    h1: 'Lake Bachelor + Bachelorette Parties on Lake Travis',
    heroEyebrow: 'Lake · Bach · BYOB · Captain Drives',
    intro:
      "A Lake Travis bachelorette or bachelor party is the most-booked single occasion on Premier\u2019s calendar — roughly 60% of summer weekends are bach groups. This page is the operator-direct booking guide for groups that have already decided Lake Travis is the destination and want the boat-day logistics figured out without scrolling 17 Pinterest boards. Private charters from 14 to 75 guests, BYOB, captain handles the driving, marina 25 minutes from downtown Austin.",
    sections: [
      {
        heading: 'Why Lake Travis specifically (vs. Lake Austin or LBJ)',
        paragraphs: [
          "Lake Travis is the largest of the Highland Lakes (~19,000 surface acres) and the only one with the cove geography that supports a real boat-day stop: anchor in 8–12 feet of water, swim ladder down, floats out, music up. Lake Austin is narrower, no-wake speed-restricted in most coves, and dominated by waterfront homes that ban anchoring near them. Lake LBJ is further (90 min from downtown Austin) and has fewer commercial operators.",
          "Anderson Mill Marina is on the north arm of Lake Travis where the swim coves are deepest and the wake is calmest. From the marina, the captain runs about 15 minutes to one of three regular anchor coves we use for bach groups depending on water levels, wind, and how busy the lake is that day.",
        ],
      },
      {
        heading: 'Boats sized for bach groups',
        paragraphs: [
          "Day Tripper (14) — small, intimate bach-side groups; budget-conscious bachelors. Base $200/hr.",
          "Meeseeks (25) or The Irony (30) — the most-booked bach size. The bridal party + close friends + the maid of honor + a couple of moms. Base $225/hr.",
          "Clever Girl (75) — combined bachelor + bachelorette weekends, big sorority groups, friends-of-friends bachelorettes. The only Lake Travis party boat with two decks and a real dance floor. Base $250/hr.",
        ],
      },
      {
        heading: 'BYOB + Party On Delivery',
        paragraphs: [
          "BYOB is the rule on Lake Travis (cans + plastic only, no glass on the water). Premier's sister company Party On Delivery pre-ices the boat with whatever the group orders — White Claw, Tito's, mixers, La Croix — so the bachelorette doesn't spend her own afternoon at HEB rolling a cooler. The boat's coolers are loaded at the dock 30 minutes before boarding.",
          "For bachelor parties: same setup, fewer Pinterest boards. Party On Delivery handles cigar requests, premium spirits, sparkling water for the designated drivers among the groomsmen.",
        ],
      },
    ],
    faqs: [
      { q: 'Is the boat 21+ for bach groups?', a: "Private charters are all-ages — there is no 21+ requirement. The 21+ rule only applies to our public ATX Disco Cruise. Bachelorettes with a sister under 21 or a teen niece are completely fine on a private boat." },
      { q: 'How many hours do bach groups book?', a: "4 hours on Saturdays is the standard. The most-booked block is 11 AM–3 PM (lunch on the water + sunny photo light) or 3:30–7:30 PM (afternoon to sunset)." },
      { q: 'How much per person?', a: "Math: 4-hour Saturday on Meeseeks (25 guests) = $900 base + tax (8.25%) + 20% gratuity = ~$1,170 / 25 = $46.80 per person for the boat. Add ~$25–$40 per person for BYOB if you let Party On Delivery stock it. Dance-floor capacity on Clever Girl: $1,000 base ÷ 75 = $13.33/person base." },
      { q: 'Can we bring decorations?', a: "Yes — sashes, banners, balloons (helium tied down so they do not fly off), bach-themed cups, custom shirts, the works. Glitter is discouraged because the lake breeze sends it everywhere." },
      { q: 'Do we need to bring our own playlist?', a: "No, but most groups do. The boat has Bluetooth + AUX. We have backup playlists if anyone's phone battery dies mid-cruise." },
      { q: 'What if the weather is bad?', a: "Premier's fair-weather policy: free reschedule for any captain-called weather cancellation. We reschedule about one bach group every 3 weeks to the next weekend during summer thunderstorms." },
      { q: 'Can we shuttle from downtown?', a: "Yes. Austin party-bus operators we work with run round-trip Anderson Mill Marina shuttles for $600–$1,500 depending on group size. Direct dock drop-off, no parking lot walk." },
    ],
    primaryCta: { text: 'Book the Lake Bach Day', href: '/quote' },
    secondaryCta: { text: 'See the Fleet', href: '/private-cruises' },
  },
  '/canada-to-austin-bachelorette': {
    slug: '/canada-to-austin-bachelorette',
    title: 'Toronto + Montreal to Austin Bachelorette · Lake Travis',
    description:
      "Cross-border bachelorette planning guide for Toronto, Montreal, and other Canadian groups flying to Austin. Direct YYZ/YUL→AUS flights, USD billing on Canadian cards, 21+ Texas alcohol law on the water, Lake Travis Saturday charter + Sunday brunch + sendoff format.",
    h1: 'Toronto + Montreal to Austin Bachelorette Weekend',
    heroEyebrow: 'YYZ / YUL → AUS · 4 hours · USD billing',
    intro:
      "Austin is the #2 destination for Canadian bachelorettes after Nashville, with Toronto and Montreal accounting for roughly 70% of cross-border bach traffic to Texas. Premier Party Cruises produces about 40 Toronto-origin and Montreal-origin bachelorette weekends per year on Lake Travis, and this page is the cross-border planning guide for the maid-of-honor planning from a Canadian zip code.",
    sections: [
      {
        heading: 'Why Toronto and Montreal pick Austin',
        paragraphs: [
          "Direct flights from YYZ (Toronto Pearson) and YUL (Montreal Trudeau) to AUS (Austin-Bergstrom) run multiple times daily on Air Canada, WestJet, and seasonally on Porter. Flight time is 4 hours from Toronto and 4.5 hours from Montreal. The exchange rate consistently makes a Lake Travis weekend 30–35% cheaper than the equivalent Muskoka or Wasaga lake-house weekend after gas, food, and rental costs in CAD.",
          "Austin's weather window for outdoor bachelorette weekends is also longer than Ontario's. Lake Travis is boat-warm March through October; Ontario lake season is May to September on a good year, and the bach-celebrating cohort has wedding scheduled across the entire calendar.",
        ],
      },
      {
        heading: 'Cross-border boat-day logistics',
        paragraphs: [
          "Passport required for bachelorette guests crossing from Canada (NEXUS speeds the YYZ pre-clearance). 21+ Texas drinking age applies to alcohol on the boat (Quebec's 18+ does not transfer to Texas waters). Canadian credit cards (Visa, Mastercard, Amex) work normally for booking; we accept CAD-billed cards and process in USD.",
          "Anderson Mill Marina is 25 minutes from downtown hotels via Highway 183 N. Most Canadian groups stay around 6th Street or Rainey Street and Uber to the marina ($35–$55 each way for a typical SUV). Larger groups book a party bus from downtown to the dock — round-trip $600–$1,500 depending on bus size.",
        ],
      },
      {
        heading: 'Saturday boat day + Sunday sendoff',
        paragraphs: [
          "The most-booked Toronto/Montreal bachelorette block is a Friday-arrival, Saturday-on-the-water, Sunday-brunch-and-fly-home weekend. Premier handles the Saturday: 11 AM–3 PM on Meeseeks or The Irony for groups of 25–30, or 3:30–7:30 PM for groups that prefer sunset over high noon. Texas BBQ on board (Salt Lick or Stiles Switch) is the most-requested catering — neither of those operators exists in Canada and the bachelorettes order it specifically because they cannot get it at home.",
          "Sunday brunch at Counter Café, Bouldin Creek, or Kerbey Lane sends the group to the airport before noon. Some groups stay through Sunday for an Austin City Limits or 6th Street live-music night.",
        ],
      },
    ],
    faqs: [
      { q: 'Can a Canadian credit card book?', a: "Yes. Visa, Mastercard, and Amex from any Canadian issuer process normally. We bill in USD; the Canadian card issuer handles the FX conversion at their daily rate." },
      { q: 'Do you accept CAD?', a: "No — we bill exclusively in USD. The card issuer applies their FX. Most Canadian travel cards charge no FX fee on USD purchases." },
      { q: 'What is the Texas drinking age for our 19- and 20-year-old guests?', a: "21+ in Texas, no exceptions on the water. Guests under 21 can absolutely come on the boat — they just cannot consume alcohol while in Texas. Soft drinks, mocktails, and non-alcoholic seltzers are unrestricted." },
      { q: 'Is the boat cancellation policy good for international travelers?', a: "Yes. Premier's fair-weather policy refunds or reschedules any captain-called weather cancellation at no fee. For non-weather cancellations, our standard policy is a 50% refund up to 14 days out, full refund up to 30 days out, with most international bookings choosing the trip-insurance option that covers any reason." },
      { q: 'How early should we book from Canada?', a: "Saturday summer slots (May–Sept) book out 6–8 weeks ahead. Toronto and Montreal groups typically book during the engagement-party window (3–6 months ahead of the wedding) which gives easy access to the preferred dates." },
      { q: 'Can we get a vendor list with addresses for our group?', a: "Yes. Email us with the wedding date and number of guests; we send a Google Doc with vetted Austin caterers (with delivery to Anderson Mill Marina), photographers, party-bus operators, downtown hotels, and Sunday brunch reservations." },
    ],
    primaryCta: { text: 'Get Cross-Border Quote', href: '/quote' },
    secondaryCta: { text: 'Bachelorette Page', href: '/bachelorette-party-austin' },
  },
};

export function getV2NewRoute(slug: string): V2RouteContent | null {
  const normalized = slug.replace(/\/$/, '') || '/';
  return V2_NEW_ROUTES[normalized] ?? null;
}
