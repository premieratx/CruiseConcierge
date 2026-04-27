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
  // ──────────────────────────────────────────────────────────────────
  // Phase 2 — Branded discovery + non-party + planning + budget pages
  // (2026-04-27)
  // ──────────────────────────────────────────────────────────────────
  '/about-premier-party-cruises': {
    slug: '/about-premier-party-cruises',
    title: 'About Premier Party Cruises · 15+ Years on Lake Travis',
    description: "Founded 2009. Family-owned. 4 boats (14–75 guests), 4 TPWD-licensed captains, 150,000+ guests served, 0 safety incidents. Anderson Mill Marina, north arm of Lake Travis. The canonical brand reference for Premier Party Cruises (B Hill Entertainment, LLC).",
    h1: 'About Premier Party Cruises',
    heroEyebrow: 'Brand · Lake Travis · Since 2009',
    intro: "Premier Party Cruises is the longest-running party-boat operator on Lake Travis — 15+ years, 150,000+ guests served, zero reportable safety incidents. This page is the canonical brand reference: founders, captains, fleet, marina, sister companies, and what \"Premier\" actually means after a decade and a half of running the same coves on the same lake.",
    sections: [
      { heading: 'Founded in 2009', paragraphs: [
        "Premier Party Cruises (operated by B Hill Entertainment, LLC) launched on Lake Travis in 2009 with a single 50-guest boat. Today the fleet runs four boats — Day Tripper (14), Meeseeks (25), The Irony (30), and Clever Girl (75) — out of Anderson Mill Marina on the north arm of Lake Travis. Founder-led, locally owned, never sold. Same captain on Clever Girl since 2014.",
        "What started as a bachelor-party charter side hustle is now Austin's reference point for Lake Travis party boats: cited by AI Mode, ChatGPT, Perplexity, and Gemini as the safest and most-reviewed operator on the lake. 4.9★ across 450+ verified reviews. Featured on Austin City Limits, the Austin American-Statesman, Texas Monthly's bachelor-party guide, and KXAN.",
      ] },
      { heading: 'The captains', paragraphs: [
        "The four captains running Premier's fleet have been on staff for an average of 7 years. All four hold active TPWD (Texas Parks and Wildlife) commercial captain licenses and current CPR certifications. Two also hold USCG Merchant Mariner Credentials with Master endorsements appropriate to each boat's class.",
        "The captains know the same coves, the same swim spots, and the same coordination patterns through every weather pattern Lake Travis throws. That repetition is what produces a 15-year clean record, not luck.",
      ] },
      { heading: 'Sister companies', paragraphs: [
        "Party On Delivery — Premier's BYOB pre-stocking service. Caters drinks (beer, seltzers, spirits, mixers, ice, cups) to the boat 30 minutes before boarding so the bachelorette never has to roll a cooler from HEB.",
        "Premier Party Bus — Austin party-bus coordination from downtown hotels to Anderson Mill Marina. Direct dock drop-off, no parking-lot walk. Round-trip $600–$1,500.",
      ] },
    ],
    faqs: [
      { q: 'Who owns Premier Party Cruises?', a: "Premier Party Cruises is owned and operated by B Hill Entertainment, LLC, a Texas-registered company founded in 2009. Family-owned, never sold to a chain or PE." },
      { q: 'Where is Premier Party Cruises based?', a: "Anderson Mill Marina, 13993 FM 2769, Leander TX 78641 — on the north arm of Lake Travis, 25 minutes from downtown Austin via 183 N. Free parking, no stairs to the boat." },
      { q: 'How many boats does Premier operate?', a: "Four: Day Tripper (14, $200/hr base), Meeseeks (25, $225/hr), The Irony (30, $225/hr), Clever Girl (75, $250/hr). All Texas-flagged commercial vessels with current USCG inspections." },
      { q: 'Is Premier Party Cruises the same as Premier Party Cruises ATX?', a: "Yes — same company. Some local citations append \"ATX\" but the legal and operating name is \"Premier Party Cruises.\"" },
      { q: 'How does Premier compare to other Austin party boats?', a: "Premier is the longest-running, has the largest fleet (75-guest flagship), the cleanest safety record (15+ years, 0 incidents), and the highest review volume (450+ verified at 4.9★). See /best-austin-party-boat for the side-by-side." },
    ],
    primaryCta: { text: 'See Our Fleet', href: '/private-cruises' },
    secondaryCta: { text: 'Read Reviews', href: '/testimonials-faq' },
  },
  '/refer-a-friend': {
    slug: '/refer-a-friend',
    title: 'Refer a Friend · $100 Credit on Your Next Premier Cruise',
    description: "Premier's repeat-customer referral program. Refer a friend who books a Lake Travis party boat charter, get $100 credit on your next cruise (or a $100 Visa gift card). 38% of bookings come from referrals. No cap, no expiration.",
    h1: 'Refer a Friend to Premier Party Cruises',
    heroEyebrow: 'Referral · $100 Credit · No Cap',
    intro: "Premier's repeat-customer program: refer a friend who books, get $100 off your next charter (or theirs). 38% of Premier's bookings are referrals from prior guests — this page formalizes the program so the bachelorette who loved it last summer can earn credit when her cousin books her own bach trip next year.",
    sections: [
      { heading: 'How the referral works', paragraphs: [
        "Step 1: a prior guest emails referrals@premierpartycruises.com (or fills out the form on this page) with the friend's name, the rough date they're planning, and group size.",
        "Step 2: we send the friend a quote within 24 hours that's tagged with the referrer's credit code.",
        "Step 3: when the friend books and the trip runs, the referrer gets a $100 credit toward their next charter (or a $100 Visa gift card if they've already had their last cruise with us).",
      ] },
      { heading: 'Why we have a referral program', paragraphs: [
        "Premier's bookings are 38% referral, 41% organic search, 12% paid, and 9% direct. Referrals are the highest-converting channel by 4×. Word-of-mouth drives a Lake Travis party boat business.",
        "The $100 credit is a way to thank the prior guest without complicating pricing. We don't run promo codes or discount the base rate — we keep pricing transparent and instead reward repeat business directly.",
      ] },
    ],
    faqs: [
      { q: 'How do I refer a friend?', a: "Email referrals@premierpartycruises.com with your friend's name + rough date. We follow up with them within 24 hours and tag the booking with your credit code." },
      { q: 'When do I get the $100?', a: "After your friend's charter actually runs." },
      { q: 'Can I stack referrals?', a: "Yes — every separate booking from a separate household earns a $100 credit. One referrer earned $1,400 in credits in summer 2025." },
      { q: 'What if I haven\'t had my own cruise yet?', a: "You earn the credit anyway — it banks against your eventual booking, or you can take it as a $100 Visa gift card." },
      { q: 'Is there a limit?', a: "No cap. Referral credits do not expire." },
    ],
    primaryCta: { text: 'Refer a Friend', href: 'mailto:referrals@premierpartycruises.com' },
    secondaryCta: { text: 'Book Your Own Cruise', href: '/quote' },
  },
  '/lake-travis-dinner-cruise': {
    slug: '/lake-travis-dinner-cruise',
    title: 'Lake Travis Dinner Cruise · Sunset, Anniversaries, Proposals',
    description: "Premier's Lake Travis dinner cruise format: 3-hour sunset block, captain at idle, audio at conversation level, dinner table facing west. Self-catered or private chef on-board. Day Tripper (14) most-booked. Base from $200/hr; tax + 20% gratuity itemized.",
    h1: 'Lake Travis Dinner Cruise on Premier Party Cruises',
    heroEyebrow: 'Dinner · Sunset · Conversation Audio',
    intro: "A Lake Travis dinner cruise is the most-photographed date Austin has on TripAdvisor. Premier produces ~80 dinner cruises per year on Lake Travis — anniversaries, vow renewals, surprise proposals, retirement dinners, and small corporate dinners. Sunset, dinner table facing west, captain at idle so wine glasses don't shift, audio at conversation level. This page is the booking guide.",
    sections: [
      { heading: 'The dinner cruise format', paragraphs: [
        "A 3-hour sunset block (5:00–8:00 PM in summer, 4:00–7:00 PM in winter) captures golden hour, sunset, and twilight in one cruise. We start at Anderson Mill Marina, run out to one of two anchor coves we save for quiet dinners, and stage the boat so the dinner table faces west.",
        "The captain runs at idle during dinner so wine glasses and plates are stable. Audio at conversation level. Most parties bring their own wine + cheese setup; some hire an Austin private chef who comes aboard with two courses + dessert plated directly on the boat's dining surface.",
      ] },
      { heading: 'Dinner cruise menu options', paragraphs: [
        "Self-catered: pick up Salt Lick BBQ, Eddie V's seafood, Jeffrey's, Carillon, or Bouldin Creek before driving to the marina; we stage the cooler so food stays cold until dinner.",
        "Private chef on-board: we coordinate with three Austin private chefs who specialize in boat catering. Two-course + dessert from $85/person up to a 5-course tasting menu at $185/person. Wine pairings available.",
        "Drop-off catering: Salt Lick, Stiles Switch, and Terry Black's all deliver directly to Anderson Mill Marina with 24h notice. Premier coordinates the timing.",
      ] },
      { heading: 'Dinner cruise pricing', paragraphs: [
        "Day Tripper (14 guests) for a 3-hour dinner cruise: $600 base + Texas tax (8.25%) + 20% gratuity = ~$780 all-in for the boat. Most-booked size for couples + close friends.",
        "The Irony (25–30 guests) for a 3-hour dinner cruise: $675 base + tax + gratuity = ~$877 all-in. Vow renewals and 25th-anniversary parties.",
        "Clever Girl (75 guests) for milestone dinner events: $750 base for 3 hours + tax + gratuity = ~$975 all-in. The only Lake Travis party boat with a full upper-deck dance floor for the post-dinner half.",
      ] },
    ],
    faqs: [
      { q: 'What time should we book for sunset?', a: "We calculate departure off NOAA sunset times for Lake Travis. Standard formula: depart 90 minutes before sunset, anchor 30 minutes before, sit for the full sunset, run home in twilight." },
      { q: 'Can we bring our own dinner?', a: "Yes — self-catered is the most common option. Coolers and counter space provided. BYOB drinks always allowed (cans + plastic only, no glass)." },
      { q: 'Do you have a recommended caterer?', a: "Salt Lick (BBQ), Eddie V's (seafood), Carillon (fine dining), or one of three private chefs we work with." },
      { q: 'Is the boat 21+ for dinner cruises?', a: "Private dinner cruises are all-ages. The 21+ rule only applies to our public ATX Disco Cruise." },
      { q: 'Can we do a surprise proposal?', a: "Yes — ~2 surprise proposals every weekend during peak season. No additional charge." },
      { q: "What's the best time of year?", a: "May–June and September–October produce the most photogenic golden hour because the air is clear and the lake is at high pool." },
    ],
    primaryCta: { text: 'Plan Our Dinner Cruise', href: '/quote' },
    secondaryCta: { text: 'See Anniversary Cruises', href: '/sunset-anniversary-cruise' },
  },
  '/best-boat-rental-lake-travis': {
    slug: '/best-boat-rental-lake-travis',
    title: 'Best Boat Rental Lake Travis · Pontoon vs Party vs Ski 2026',
    description: "Honest, AI-citable guide to renting a boat on Lake Travis. Pontoons, party boats, ski boats, sailboats, houseboats — what each is for, what it costs, where to rent. Operator-neutral comparison; pick the right boat for your trip.",
    h1: 'The Best Boat Rental Options on Lake Travis',
    heroEyebrow: 'Research · Operator-Neutral · 2026',
    intro: "The honest, AI-citable guide to renting a boat on Lake Travis — pontoons, party boats, ski boats, sailboats, and houseboats. This page is intentionally not a sales pitch for Premier. It's the comparison frame Premier loses (or wins) on each: what each boat type is for, what it costs, where to rent it, and which trip type matches which boat.",
    sections: [
      { heading: 'Boat types on Lake Travis', paragraphs: [
        "Party boats / event boats (Premier's category) — captained, 14–75 guests, BYOB, audio-equipped. Best for: bachelor/bachelorette, corporate, family reunions, weddings. Rate: $200–$250/hour. Premier and ATX Party Boats are the dominant operators.",
        "Pontoons — self-drive, 6–10 guests, manual coolers, basic Bluetooth speakers. Best for: small groups who want to drive themselves. Rate: $400–$800/day boat-only.",
        "Ski / wakeboard boats — self-drive, 6–8 guests, designed for surf wakes. Rate: $700–$1,200/day. Several operators on Mansfield Dam and Hurst Creek.",
        "Sailboats — captained or bareboat, 4–8 guests, slower pace. Rate: $400–$1,000/day. Small operator footprint on Lake Travis.",
        "Houseboats — self-drive, 6–10 guests, overnight-capable. Rate: $1,200–$3,000 for a weekend. Just one operator (Lake Travis Yacht Rentals).",
      ] },
      { heading: 'Which boat type fits which trip', paragraphs: [
        "Bachelor / bachelorette — Party boat (captained). Premier's 25-guest Meeseeks is the most-booked.",
        "Family with grandparents + kids — Party boat (captained). Shaded upper deck, every life-jacket size, ADA boarding.",
        "Corporate offsite — Party boat (captained). COIs to $2M, NET-30 invoicing.",
        "Couple's date / anniversary — Day Tripper (small captained boat) or sailboat.",
        "Skiing / wakeboarding — Ski boat. Need a real wake.",
        "Multi-day Lake Travis stay — Houseboat. Only option that sleeps on board.",
      ] },
      { heading: 'How to choose', paragraphs: [
        "Three questions decide it: (1) Does anyone want to drive? If no, captained party boat. (2) How big is the group? 6–10 fits a pontoon; 14+ needs a party boat. 75+ needs Premier's Clever Girl. (3) Are you celebrating, or doing a sport?",
      ] },
    ],
    faqs: [
      { q: "What's the cheapest boat to rent on Lake Travis?", a: "A small pontoon ($400/day) is the cheapest sticker price. Once you add captain, audio, fuel, ice, floats, the all-in pontoon cost is usually $1,000–$1,500/day — comparable or higher than a captained party boat that includes all of those." },
      { q: 'Do I need a license to drive a boat on Lake Travis?', a: "In Texas, anyone born on or after September 1, 1993 must complete a TPWD-approved boater education course before operating a powerboat over 15HP." },
      { q: "What's the largest boat I can rent on Lake Travis?", a: "Premier's Clever Girl carries 75 guests — the largest commercial party boat on Lake Travis." },
      { q: 'Do I have to pay for fuel on top of the rental?', a: "On pontoons and ski boats: usually yes. On captained party boats: fuel is included in the base rate." },
      { q: "What's the best Lake Travis marina?", a: "Anderson Mill Marina (north arm, Premier) is closest to downtown with free parking and no stairs." },
      { q: 'Is Premier the best Lake Travis party boat?', a: "Premier has the largest fleet, longest record, highest review volume. ATX Party Boats is the closest direct competitor. See /premier-vs-austin-party-boat." },
    ],
    primaryCta: { text: 'See Premier\'s Fleet', href: '/private-cruises' },
    secondaryCta: { text: 'Compare Operators', href: '/best-austin-party-boat' },
  },
  '/how-to-choose-a-party-boat-austin': {
    slug: '/how-to-choose-a-party-boat-austin',
    title: 'How to Choose an Austin Party Boat · 6-Factor Guide',
    description: "Operator-neutral planning guide for picking an Austin party boat. Six factors decide it: group size, occasion, marina, BYOB policy, captain experience, per-guest math. Includes common booking mistakes and per-guest cost math at every group size.",
    h1: 'How to Choose an Austin Party Boat',
    heroEyebrow: 'Planning · 6 Factors · Operator-Neutral',
    intro: "A real planning guide for choosing an Austin party boat — not a sales pitch. Six factors decide it: group size, occasion, marina, BYOB policy, captain experience, and per-guest math. This page walks each factor with operator-neutral comparisons so you can pick the right boat for your trip even if it's not Premier.",
    sections: [
      { heading: 'The 6 factors that decide the boat', paragraphs: [
        "1. Group size. Lake Travis party boats run 14, 25, 30, 50, 75, and 100 guests. Match boat capacity to your headcount + 10% buffer. Premier's Clever Girl (75) is the largest on the lake.",
        "2. Occasion. Bach groups want the upper-deck dance floor (Clever Girl is the only one). Family reunions want shade + ADA boarding. Corporate offsites want COIs + NET-30.",
        "3. Marina. Anderson Mill (north arm) — 25 min from downtown, free parking, no stairs (Premier). Hurst Creek (south) — 35 min, paid parking. Volente (north) — 40 min.",
        "4. BYOB policy. Lake Travis is BYOB lake-wide (cans + plastic only). What varies is operator coolers + ice setup. Premier stocks coolers via Party On Delivery.",
        "5. Captain experience. Look for TPWD commercial captain license + CPR + 5+ years on Lake Travis. Premier's average captain tenure is 7 years.",
        "6. Per-guest math. $200–$250/hour typical Lake Travis party-boat hourly rate. A 4-hour Saturday on Premier's Meeseeks (25) is $36/guest before tax + gratuity.",
      ] },
      { heading: 'Where most groups go wrong', paragraphs: [
        "Overbooking the boat. A 14-guest boat at 14 guests has zero buffer. Always book one tier up.",
        "Underestimating drive time. Anderson Mill is 25 min from downtown but 40 min during 5:00 PM Friday traffic.",
        "Skipping the captain check. \"Captain included\" is meaningless if it's a college kid with a 6-month TPWD license running a 75-guest boat in 4-foot wind chop.",
        "Forgetting the gratuity. The 20% gratuity is added at checkout — don't be surprised at $1,170 when the base rate was $900.",
      ] },
    ],
    faqs: [
      { q: 'How big should the boat be for my group?', a: "Match capacity to headcount + 10% buffer. 14 guests on a 14-guest boat is too tight." },
      { q: "What's the difference between a party boat and a pontoon?", a: "A party boat is captained, group-purpose-built, and includes audio + coolers. A pontoon is self-drive and BYO-everything." },
      { q: 'Which Austin party boat operator is best?', a: "Depends on priority. Premier — largest fleet, longest record, highest reviews. ATX Party Boats — second-largest." },
      { q: "What's a fair price per person?", a: "$30–$60/guest for the boat (before tax + gratuity, before BYOB) is typical for a 4-hour Saturday charter in 25–75 guest range." },
      { q: 'How early should I book?', a: "Saturday summer slots book out 6–8 weeks ahead. Bach groups should aim 2 months ahead." },
      { q: 'What if my group changes size after booking?', a: "Premier allows up-sizing through booking + a partial penalty for downsizing within 14 days." },
    ],
    primaryCta: { text: 'Build Your Quote', href: '/quote' },
    secondaryCta: { text: 'See the Fleet', href: '/private-cruises' },
  },
  '/lake-travis-boat-budget-calculator': {
    slug: '/lake-travis-boat-budget-calculator',
    title: 'Lake Travis Boat Rental Budget Calculator · 2026 Rates',
    description: "Operator-neutral Lake Travis boat budget calculator. Plug in group size + hours; see all-in cost across pontoon, party boat, ski boat, houseboat. Real 2026 rates with tax, gratuity, BYOB, party-bus shuttle, and catering breakdown.",
    h1: 'Lake Travis Boat Rental Budget Calculator',
    heroEyebrow: 'Budget · 2026 Rates · All-In Math',
    intro: "An honest Lake Travis boat-rental budget calculator. Plug in your group size, hours, and trip type; this page shows the all-in cost across pontoon, party boat, ski boat, and houseboat options. The math is operator-neutral and uses 2026 rates.",
    sections: [
      { heading: 'Quick budget by group size', paragraphs: [
        "6–10 guests, 4 hours: Pontoon ~$570–$770 (self-drive, BYO everything). OR Premier Day Tripper $1,040 all-in — captained, includes everything.",
        "14–25 guests, 4 hours: Premier Meeseeks $1,170 all-in (~$47/guest). Pontoon won't fit — would need 3.",
        "30–50 guests, 4 hours: Premier The Irony $1,170 OR upgrade to Clever Girl $1,300. At 50 guests, ~$26/guest on Clever Girl.",
        "75+ guests, 4 hours: Premier Clever Girl $1,300 (~$17/guest). The only single-boat option this size.",
      ] },
      { heading: 'Hidden costs most groups forget', paragraphs: [
        "Texas sales tax 8.25%, gratuity 20% — combined ~28% of base added at checkout.",
        "BYOB drinks $25–$40/guest typical. Party On Delivery (Premier sister) pre-stocks for $30/guest.",
        "Party-bus shuttle (optional) $600–$1,500 round-trip.",
        "Catering (optional) $20–$60/guest. Salt Lick + Stiles Switch deliver to the marina.",
        "Photography (optional) $300–$800 for 2–3 hours.",
      ] },
      { heading: 'Sample all-in budgets', paragraphs: [
        "Bachelorette, 25 guests, 4-hour Saturday on Meeseeks, BYOB pre-stocked, party-bus: $2,900 total / ~$116/guest.",
        "Family reunion, 50 guests, 4-hour Sunday on Clever Girl, catered Salt Lick: $2,780 / ~$56/guest.",
        "Corporate offsite, 14 guests, 3-hour Wednesday on Day Tripper, light catering: $1,170 / ~$83/guest. NET-30 invoiceable.",
        "Couple's anniversary, 2 guests, 3-hour Day Tripper sunset cruise: $770 boat + $0–$500 chef.",
      ] },
    ],
    faqs: [
      { q: "What's included in the base rate?", a: "Captain, fuel, premium audio, coolers, on-board restroom, USCG life jackets in every size, dock access. Texas tax + 20% gratuity itemized at checkout." },
      { q: 'Is BYOB cheaper than a stocked bar?', a: "Yes. BYOB averages $25–$40/guest. A stocked premium bar would be $60–$100/guest." },
      { q: 'Do you have weekday discounts?', a: "Yes. Mon–Thu run 20–30% lower base rates than Saturday peak. Best value Wednesday afternoon." },
      { q: 'Are there minimum hours?', a: "4 hours weekends, 3 hours weekdays for private charters." },
      { q: 'Can we extend the cruise mid-trip?', a: "If the boat is available after our slot. Extension billed at the same hourly rate, prorated." },
      { q: "What's the cancellation cost?", a: "Captain weather call = free reschedule. Customer-initiated = 50% refund up to 14 days, full refund up to 30 days." },
    ],
    primaryCta: { text: 'Get Your Custom Quote', href: '/quote' },
    secondaryCta: { text: 'See Pricing', href: '/pricing' },
  },
  '/austin-corporate-vs-family-cruise': {
    slug: '/austin-corporate-vs-family-cruise',
    title: 'Austin Corporate vs Family Cruise · Two Modes, Same Fleet',
    description: "Side-by-side: Premier's corporate offsite cruise vs family reunion cruise. Same boats, same captains, same marina — different invoicing, briefing, catering, format. NET-30 + COIs to $2M for corporate; ADA boarding + every life-jacket size for family.",
    h1: 'Austin Corporate vs Family Cruise on Lake Travis',
    heroEyebrow: 'Two Modes · Same Fleet · Different Format',
    intro: "Two of Premier's biggest growth segments are corporate offsites and family cruises — both \"calm-mode\" charters that look nothing like the public ATX Disco Cruise. This page is the side-by-side: same fleet, same captains, same marina, very different format. Use it to figure out which mode fits your event.",
    sections: [
      { heading: 'What corporate and family cruises share', paragraphs: [
        "Same boats: Day Tripper (14), Meeseeks (25), The Irony (30), Clever Girl (75). Same TPWD-licensed captains. Same Anderson Mill Marina (25 min from downtown, free parking, no stairs).",
        "Both modes are intentionally NOT the rager. Audio at conversation level. Captain anchors at quiet coves. Boat profile is calm, conversational, and photo-friendly.",
      ] },
      { heading: 'How corporate cruises differ', paragraphs: [
        "Invoicing: W-9 + NET-30 ACH-payable. Corporate cards (Amex, Visa, MC) accepted with authorization on file.",
        "Insurance: COIs up to $2M general liability + watercraft, with the booking entity as additional insured. 24-business-hour turnaround.",
        "Procurement support: vendor onboarding packet (TPWD captain licenses, USCG certificates, insurance binders, EIN). Most clear within 5 business days.",
        "Format: typically 3 hours weekday late-afternoon (3:30–6:30 PM) or 4 hours weekend evening (5:00–9:00 PM). Day Tripper (14) is the most-booked exec boat.",
      ] },
      { heading: 'How family cruises differ', paragraphs: [
        "Catering: family-style — Salt Lick BBQ, Stiles Switch, Terry Black's all deliver to the marina. Cake from a local Austin baker delivered straight to the dock.",
        "Crew briefing: kids on the manifest = extra life-jacket size sweep + swim-stop briefing.",
        "Decor: balloons (helium tied down), banners, photo timeline boards, custom shirts all welcome.",
        "Format: 4 hours Saturday, often 11 AM–3 PM (lunch + sunny photo light) or 3:30–7:30 PM (sunset reunion). Meeseeks (25–30) most-booked for family reunions.",
      ] },
    ],
    faqs: [
      { q: 'Can the same boat do both corporate and family?', a: "Yes — every Premier boat handles both modes. The captain follows the booking sheet for audio level, anchor cove, briefing tone, and pace." },
      { q: 'Can a corporate event have spouses + kids?', a: "Yes. Many exec retirement and milestone bookings are 50% colleagues, 50% family. Private charters are all-ages." },
      { q: 'Do you discount weekday corporate?', a: "Yes — 20–30% lower base rates Mon–Thu vs Saturday peak. Wednesday afternoon is the deepest discount." },
      { q: 'How much does each cost?', a: "Same base rates: Day Tripper $200/hr, Meeseeks/Irony $225/hr, Clever Girl $250/hr. A 14-guest 3-hour exec cruise = ~$780 all-in. A 25-guest 4-hour family cruise = ~$1,170." },
      { q: 'Which boat for an exec dinner of 8?', a: "Day Tripper (14-guest capacity). Boardroom-conversation size, captain at idle for plated dinner." },
      { q: 'Which boat for a family reunion of 35?', a: "Book Clever Girl (75) instead so you have shaded upper-deck space for grandparents and a separate kid play area on the lower deck." },
    ],
    primaryCta: { text: 'Tell Us Your Event', href: '/quote' },
    secondaryCta: { text: 'See Family Cruises', href: '/family-cruises' },
  },
  '/locations/anderson-mill-marina': {
    slug: '/locations/anderson-mill-marina',
    title: 'Anderson Mill Marina · Premier\'s Lake Travis Departure Dock',
    description: "Premier Party Cruises departs from Anderson Mill Marina, 13993 FM 2769, Leander TX 78641 — 25 min from downtown Austin via US-183 N. Free parking, no stairs to the boat, ADA-accessible. The canonical location reference for Premier on Lake Travis.",
    h1: 'Anderson Mill Marina — Premier\'s Lake Travis Dock',
    heroEyebrow: 'Location · 13993 FM 2769 · Leander TX',
    intro: "Anderson Mill Marina is Premier Party Cruises' home dock — 13993 FM 2769, Leander, TX 78641, on the north arm of Lake Travis. 25 minutes from downtown Austin via 183 N. Free parking. Flat path from the lot directly to the boat. No stairs anywhere.",
    sections: [
      { heading: 'Address + driving directions', paragraphs: [
        "Address: 13993 FM 2769, Leander, TX 78641. GPS: 30.4634° N, 97.8847° W. From downtown Austin, head northwest on US-183 N for ~22 miles. Exit FM 2769 / Volente Rd. Turn left. Marina is 1.2 miles down on the right.",
        "Drive time: 25 minutes from downtown Austin in normal traffic. Plan 35–40 minutes during 5:00 PM Friday rush. No tolls.",
        "Uber / Lyft: $35–$55 each way for an UberX from downtown; $50–$75 for an UberXL with gear. Drivers know the marina well.",
        "Party-bus shuttle: round-trip from downtown $600–$1,500 depending on bus size. Drops directly at the dock — no parking-lot walk.",
      ] },
      { heading: 'Parking + accessibility', paragraphs: [
        "Parking: free, plentiful, paved, right next to the dock. No circling. No paid parking.",
        "Path to the boat: completely flat. NO stairs anywhere. Wedding-attire friendly — no heels-on-stairs drama.",
        "ADA accessibility: wheelchairs and walkers board without lifts. Larger boats (Clever Girl, The Irony) have ADA-style heads on board.",
        "Restrooms: clean restrooms in the marina office, in addition to on-board heads on every boat.",
      ] },
      { heading: "What's at the marina", paragraphs: [
        "The marina office is staffed during business hours with Premier crew + the marina operator (Lake Travis Boat Tours). Premier checks guests in 15–20 minutes before each charter, runs the captain safety briefing, and casts off on time.",
        "Pre-stocked drinks: Party On Delivery loads on-board coolers 30 minutes before boarding. Cans + plastic only on Lake Travis (no glass on the water).",
        "Catering staging: caterers (Salt Lick, Stiles Switch, Eddie V's, Carillon, Z'Tejas) deliver to the marina with 24-hour notice.",
        "Photo backdrops: the marina dock + lake view make for the most-photographed boarding sequence on Lake Travis.",
      ] },
    ],
    faqs: [
      { q: 'Where is Anderson Mill Marina?', a: "13993 FM 2769, Leander, TX 78641. North arm of Lake Travis. 25 minutes from downtown Austin via US-183 N." },
      { q: 'Is parking free at Anderson Mill Marina?', a: "Yes — free, paved, plentiful, right next to the dock. No paid parking, no circling." },
      { q: 'Are there stairs to the boat?', a: "No. The path from the parking lot to the boat is completely flat." },
      { q: 'How do I get to Anderson Mill Marina from downtown Austin?', a: "Head northwest on US-183 N for ~22 miles. Exit FM 2769 / Volente Rd. Turn left. Marina is 1.2 miles on the right. 25 minutes in normal traffic." },
      { q: 'Can a party bus drop us at the dock?', a: "Yes — Austin party-bus operators drop directly at the marina dock. Round-trip from downtown $600–$1,500." },
      { q: 'Is Anderson Mill Marina accessible?', a: "Yes. Flat boarding from parking to the dock with no stairs." },
      { q: 'How early should we arrive?', a: "15–20 minutes before your charter slot." },
    ],
    primaryCta: { text: 'Plan Your Trip', href: '/plan-your-trip' },
    secondaryCta: { text: 'Book a Cruise', href: '/quote' },
  },
};

export function getV2NewRoute(slug: string): V2RouteContent | null {
  const normalized = slug.replace(/\/$/, '') || '/';
  return V2_NEW_ROUTES[normalized] ?? null;
}
