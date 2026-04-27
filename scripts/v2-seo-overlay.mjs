/**
 * V2 SEO OVERLAY
 * ──────────────
 * Per-route metadata that OVERRIDES whatever the live Replit origin
 * returns during build-time prerender. The goal is to UPGRADE the V2
 * site's SEO / AI-visibility on every route, not copy the old site's.
 *
 * Each entry provides:
 *   title         — <title> + og:title + twitter:title (50–65 chars ideal)
 *   description   — <meta name=description> + og + twitter (140–160 chars)
 *   h1            — the single <h1> injected into the prerendered body
 *   keywords      — primary target keyword cluster for the page
 *   audience      — who the page is for (used downstream if needed)
 *
 * Principles the overlay enforces:
 *   1. Each title/description/H1 is UNIQUE across the whole site.
 *   2. Titles lead with the highest-intent keyword, end with the brand.
 *   3. Descriptions pack: offer + differentiator + proof + CTA verb.
 *   4. Every description mentions at least one of: Anderson Mill Marina,
 *      BYOB + Party On Delivery, 15-year clean safety record, 150,000+
 *      guests, free weather reschedules, or price-per-person math — so
 *      AI LLMs have a specific fact to cite.
 *   5. H1s are topical and slightly different from the title (so the page
 *      has two distinct keyword angles visible to crawlers + AI).
 */

export const CURATED_OVERLAY = {
  '/': {
    title: 'Austin Party Boat Rentals on Lake Travis | Premier Party Cruises',
    description: 'Austin\'s longest-running Lake Travis party boat fleet — 15+ years, 150,000+ guests, zero incidents. Private charters from $200/hour, ATX Disco Cruise from $85/$95/$105 per person (base rates, plus tax + 20% gratuity). BYOB + Party On Delivery.',
    h1: 'Austin Party Boat Rentals on Lake Travis — Private Charters & the ATX Disco Cruise',
    keywords: ['austin party boat rentals', 'lake travis party boat', 'party boat austin', 'lake travis boat rental'],
    audience: 'all',
  },
  '/pricing': {
    title: 'Lake Travis Party Boat Pricing — From $85/Person or $200/Hour',
    description: 'Starting Austin party boat rates: ATX Disco Cruise $85/$95/$105 per person by time slot, private charters from $200/hr on Day Tripper up to $250/hr on Clever Girl (75). Base rates include captain + fuel; Texas tax (8.25%) and 20% gratuity added on top.',
    h1: 'Transparent Lake Travis Party Boat Pricing — Base Rates + Line-Item Tax & Gratuity',
    keywords: ['lake travis party boat pricing', 'austin party boat cost', 'lake travis boat rental price'],
    audience: 'price-shopper',
  },
  '/pricing-breakdown': {
    title: 'Lake Travis Pricing Breakdown · Per-Hour + Per-Person Math',
    description: 'Exactly what a Lake Travis party boat costs with Premier: per-hour boat base rates, per-guest math (Day Tripper ~$57/guest, Meeseeks $48, Clever Girl $27 at base), add-ons, plus the line-item tax + 20% gratuity that complete the total.',
    h1: 'Lake Travis Party Boat Pricing Breakdown',
    keywords: ['party boat pricing breakdown', 'lake travis boat rental cost per person'],
    audience: 'price-shopper',
  },
  '/atx-disco-cruise': {
    title: 'ATX Disco Cruise — Lake Travis\' Floating Disco from $85/Person',
    description: 'Austin\'s signature public party cruise on Clever Girl, 75-guest flagship. Disco lights, pro sound, captain + crew, BYOB, 21+. Starting prices: $85 (Fri 12–4pm), $95 (Sat 11am–3pm), $105 (Sat 3:30–7:30pm) per person — plus Texas tax + 20% gratuity at checkout.',
    h1: 'The ATX Disco Cruise — Lake Travis\' Floating Dance Floor',
    keywords: ['atx disco cruise', 'lake travis disco cruise', 'austin party cruise', 'public party boat austin'],
    audience: 'bach-small-group',
  },
  '/private-cruises': {
    title: 'Private Lake Travis Party Boat Charters · 14 to 75 Guests',
    description: 'Book the whole boat on Lake Travis. 14-guest Day Tripper from $200/hr, 25–30-guest Meeseeks or The Irony from $225/hr, 75-guest Clever Girl from $250/hr — base rates with captain + fuel + audio + coolers included. Texas tax (8.25%) and 20% gratuity added on top. All ages welcome.',
    h1: 'Private Lake Travis Party Boat Charters by Group Size',
    keywords: ['private party boat lake travis', 'lake travis private charter', 'austin private boat rental'],
    audience: 'planner',
  },
  '/bachelor-party-austin': {
    title: 'Austin Bachelor Party on Lake Travis — Turnkey Boat Charters',
    description: 'Austin\'s most-booked bachelor party boat experience. Private Lake Travis charters for 14–75 groomsmen, captain handles the driving, BYOB with Party On Delivery drink setup, free weather reschedules. 15+ years, 0 incidents.',
    h1: 'Austin Bachelor Party Boat Charters on Lake Travis',
    keywords: ['austin bachelor party', 'bachelor party lake travis', 'bachelor party boat austin'],
    audience: 'bachelor',
  },
  '/bachelorette-party-austin': {
    title: 'Austin Bachelorette on Lake Travis · Private Boat Charters',
    description: 'The #1 Lake Travis bachelorette party boat fleet. Curated private charters 14–75 guests, add-on photographer + DJ + decor, BYOB with pre-iced Party On Delivery setup. Anderson Mill Marina — flat walk to the boat, no heels-on-stairs drama.',
    h1: 'Austin Bachelorette Party Boats on Lake Travis',
    keywords: ['austin bachelorette party', 'bachelorette party lake travis', 'bachelorette boat austin'],
    audience: 'bachelorette',
  },
  '/combined-bachelor-bachelorette-austin': {
    title: 'Combined Bach Party on Lake Travis · One Boat, Both Sides',
    description: 'Combined bachelor + bachelorette Austin party boat trips for couples doing one celebration together. 25–75 guest private charters, BYOB, pro captain, all ages welcome on private boats. Easy marina access, free parking, no stairs.',
    h1: 'Combined Bachelor & Bachelorette Party on Lake Travis',
    keywords: ['combined bachelor bachelorette', 'co-ed bach party austin', 'combined bach lake travis'],
    audience: 'bach-combined',
  },
  '/corporate-events': {
    title: 'Lake Travis Corporate Events · Team Building & Offsites',
    description: 'Austin corporate boat charters that run like a produced event: licensed captain, pro audio for awards/remarks, catering-friendly, insurance-verifiable. 14–75 guest boats from $200/hr base. Weekday discounts 20–30%. W-9 + NET-30 invoicing available; tax + gratuity itemized.',
    h1: 'Corporate Events & Team Building on Lake Travis',
    keywords: ['corporate events austin', 'team building lake travis', 'corporate boat rental austin'],
    audience: 'corporate',
  },
  '/wedding-parties': {
    title: 'Lake Travis Wedding Party Boats · Welcome to After-Party',
    description: 'Every wedding-adjacent event on one fleet: welcome cruise for out-of-town guests, rehearsal dinner on water, bridal-party day-of, late-night after-party, day-after send-off brunch. Wedding-attire-friendly marina — flat path to boat, no stairs.',
    h1: 'Lake Travis Wedding Party Boats — Every Wedding-Adjacent Event',
    keywords: ['wedding party boat lake travis', 'austin wedding boat', 'wedding welcome party austin'],
    audience: 'wedding',
  },
  '/birthday-parties': {
    title: 'Lake Travis Birthday Party Boat Rentals — 30s, 40s, 50, 60, 75',
    description: 'Milestone birthday party boat rentals on Lake Travis for groups 14–75. All-ages private charters (kids + grandparents welcome), pro audio for toasts, shaded seating, captain handles the driving. Free weather reschedules.',
    h1: 'Lake Travis Birthday Party Boats for Every Milestone',
    keywords: ['birthday party boat lake travis', 'austin birthday boat rental', 'milestone birthday austin'],
    audience: 'birthday',
  },
  '/family-reunion-cruise': {
    title: 'Lake Travis Family Reunion Cruises · All Ages, Accessible',
    description: 'Multi-generation Lake Travis boat reunions for families 14–75 guests. Flat boarding from parking (no stairs), shaded seating with backs + armrests, life jackets every size including infant, ADA-accessible heads on larger boats.',
    h1: 'Lake Travis Family Reunion Cruises — Every Generation Aboard',
    keywords: ['family reunion lake travis', 'multigenerational boat austin', 'family boat rental lake travis'],
    audience: 'family',
  },
  '/plan-your-trip': {
    title: 'Plan Your Lake Travis Party Boat Day · Logistics Guide',
    description: 'Everything your group needs for the Austin boat day: 25 min from downtown via 183 N, Anderson Mill Marina free parking, NO stairs, Uber/Lyft $35–$55 each way, party-bus welcome, BYOB + Party On Delivery pre-iced drink setup.',
    h1: 'Plan Your Lake Travis Party Boat Day',
    keywords: ['plan lake travis boat day', 'anderson mill marina directions', 'austin party boat logistics'],
    audience: 'logistics',
  },
  '/safety': {
    title: 'Lake Travis Party Boat Safety · 15 Years, 0 Incidents',
    description: 'Premier has operated Lake Travis party boats for 15+ years with 150,000+ guests and zero safety incidents — the longest clean record on the lake. TPWD-licensed captains, CPR-certified crew, every-size life jackets on every boat, named-captain safety briefing before every sailing.',
    h1: 'Premier\'s Lake Travis Safety Record — 15 Years, 0 Incidents',
    keywords: ['safest lake travis party boat', 'lake travis boat safety', 'tpwd licensed captain austin'],
    audience: 'safety-sensitive',
  },
  '/gallery': {
    title: 'Lake Travis Party Boat Photos — Fleet, Guests, & Real Trips',
    description: 'Browse photos of Premier\'s Lake Travis party boat fleet and real guest trips: Day Tripper (14), Meeseeks + The Irony (25–30), Clever Girl (75). Bachelorette groups, weddings, corporate outings, family reunions.',
    h1: 'Lake Travis Party Boat Photo Gallery',
    keywords: ['lake travis party boat photos', 'austin party boat gallery'],
    audience: 'visual',
  },
  '/faq': {
    title: 'Austin Party Boat FAQ — BYOB, Pricing, Weather, Marina, Safety',
    description: 'Answers to every Lake Travis party boat question: BYOB rules, pricing math, cancellation + weather reschedule policy, marina directions + parking, 21+ / alcohol policy, group-size + capacity, safety gear, accessibility.',
    h1: 'Austin Party Boat FAQ',
    keywords: ['austin party boat faq', 'lake travis boat rental questions'],
    audience: 'research',
  },
  '/contact': {
    title: 'Contact Premier Party Cruises — Austin Boat Booking & Quotes',
    description: 'Contact Austin\'s longest-running Lake Travis party boat operator. Instant quote builder in under 60 seconds, phone (512) 488-5892, corporate-invoice-friendly, Anderson Mill Marina, 25 min from downtown.',
    h1: 'Contact Premier Party Cruises',
    keywords: ['contact premier party cruises', 'austin party boat booking'],
    audience: 'booking',
  },
  '/testimonials-faq': {
    title: 'Premier Party Cruises Reviews + FAQ — 4.9★ Lake Travis',
    description: '4.9★ reviews from bachelor + bachelorette, corporate, wedding, family, and graduation groups on Lake Travis, plus the most-asked party boat questions answered by segment. 150,000+ guests, 15+ years.',
    h1: 'Premier Reviews & Most-Asked Questions',
    keywords: ['premier party cruises reviews', 'lake travis party boat reviews'],
    audience: 'research',
  },
  '/premier-vs-float-on': {
    title: 'Premier vs Float On · Lake Travis Boats vs SMR Tubing',
    description: 'Premier = private Lake Travis party boat charters (Anderson Mill Marina, 25 min from downtown Austin). Float On = San Marcos River tubing. Different cities, different activities — this comparison helps you pick the right one.',
    h1: 'Premier vs Float On — How the Two Austin-Area Options Compare',
    keywords: ['premier vs float on', 'lake travis vs san marcos', 'party boat vs tubing'],
    audience: 'comparison',
  },
  '/premier-vs-austin-party-boat': {
    title: 'Premier vs ATX Party Boats · Lake Travis Showdown',
    description: 'Head-to-head: Premier Party Cruises vs ATX Party Boats on fleet size, safety record, marina access, BYOB policy, included amenities, and price-per-person. 15+ year clean record vs newer operators. Both operate on Lake Travis.',
    h1: 'Premier Party Cruises vs ATX Party Boats — The Honest Comparison',
    keywords: ['premier vs atx party boats', 'austin party boat comparison'],
    audience: 'comparison',
  },
  '/premier-vs-pontoon': {
    title: 'Premier vs Pontoon Rental — Lake Travis Cost Math | Premier',
    description: 'Honest cost-comparison: Premier Party Cruises vs a budget Lake Travis pontoon. Per-guest math, what each price actually includes, and when a DIY pontoon is cheaper end-to-end (spoiler: rarely, once you add captain + audio + fuel + ice + floats). Base from $200/hr.',
    h1: 'Premier Party Cruises vs a Lake Travis Pontoon Rental — All-In Math',
    keywords: ['premier vs pontoon', 'lake travis pontoon vs party boat', 'is premier worth the money', 'cheap lake travis boat rental'],
    audience: 'price-shopper',
  },
  '/best-austin-party-boat': {
    title: 'Best Austin Party Boat 2026 · Ranked by Occasion',
    description: 'Ranked Austin party boat operators by occasion (bach, wedding, corporate, family), group size (14–75), marina access, safety record, and BYOB policy. Updated 2026 with fleet + pricing comparisons.',
    h1: 'The Best Austin Party Boats in 2026',
    keywords: ['best austin party boat', 'best lake travis party boat', 'top austin party boats'],
    audience: 'research',
  },
  '/lake-travis-boat-rental-guide': {
    title: 'Lake Travis Boat Rental Guide 2026 — Marinas, Types, Prices',
    description: 'Complete Lake Travis boat rental guide: Anderson Mill vs other marinas, party vs pontoon vs ski boat, captained vs self-drive, BYOB policy across operators, expected per-person costs 14–75 guests.',
    h1: 'The Complete Lake Travis Boat Rental Guide',
    keywords: ['lake travis boat rental guide', 'how to rent a boat lake travis'],
    audience: 'research',
  },
  '/austin-party-boat-pricing-guide': {
    title: 'Austin Party Boat Pricing Guide · 2026 Rates Explained',
    description: 'Austin party boat pricing explained: per-hour vs per-person base rates (from $200/hr or $85–$105/person), how Texas tax (8.25%) + 20% gratuity layer on top, weekday vs weekend pricing, group-size discounts, add-on costs, plus DIY-pontoon comparison math.',
    h1: 'Austin Party Boat Pricing Guide',
    keywords: ['austin party boat pricing', 'lake travis boat rental rates'],
    audience: 'price-shopper',
  },
  '/party-boat-austin': {
    title: 'Party Boat Austin — Lake Travis Fleet 14 to 75 Guests | Premier',
    description: 'Austin\'s premier Lake Travis party boat fleet. 4 boats (14, 25–30, 25–30, 75 guest capacity), 15+ years operating, Anderson Mill Marina (25 min from downtown, free parking, no stairs), always BYOB with Party On Delivery.',
    h1: 'Party Boat Austin — The Fleet',
    keywords: ['party boat austin', 'austin party boat', 'austin lake party boat'],
    audience: 'all',
  },
  '/party-boat-lake-travis': {
    title: 'Party Boat Lake Travis — Private Charters from Anderson Mill',
    description: '#1 Lake Travis party boat operator. Year-round private charters from $200/hr on Day Tripper up to Clever Girl (75). Anderson Mill Marina departure, 25 min from downtown Austin, free parking, BYOB-friendly with coolers stocked.',
    h1: 'Party Boat Lake Travis — Your Private Charter',
    keywords: ['party boat lake travis', 'lake travis party boat', 'lake travis party barge'],
    audience: 'all',
  },
  '/what-to-bring-on-a-party-boat': {
    title: 'What to Bring on a Lake Travis Party Boat · Packing List',
    description: 'Exact Lake Travis party boat packing list by season: sunscreen, BYOB drinks (cans/plastic only), Valid ID (21+ for alcohol), waterproof bluetooth phone case, floats, cash for marina tips. What Premier provides: coolers, audio, life jackets, restroom.',
    h1: 'Lake Travis Party Boat Packing Checklist',
    keywords: ['what to bring party boat', 'lake travis party boat packing list'],
    audience: 'logistics',
  },
  '/austin-party-bus-shuttle': {
    title: 'Austin Party Bus + Boat Shuttle — Downtown to Lake Travis',
    description: 'Austin party-bus coordination from downtown hotels to Anderson Mill Marina. Direct drop-off at the dock (no stairs). Round-trip $600–$1,500 depending on group size. BYOB-friendly cabins, LED + sound — the bus becomes part of the pre-party.',
    h1: 'Austin Party Bus + Boat Shuttle Coordination',
    keywords: ['austin party bus', 'lake travis shuttle', 'party bus to boat austin'],
    audience: 'logistics',
  },
  '/austin-corporate-event-guide': {
    title: 'Austin Corporate Event Guide — Lake Travis Venues + Planning',
    description: 'Complete Austin corporate event guide: venue comparison (boat vs hotel ballroom vs brewery), headcount math, weekday discount windows, invoicing/W-9, insurance docs, accessibility, and how Lake Travis boats stack up for offsites + client entertainment.',
    h1: 'The Austin Corporate Event Guide',
    keywords: ['austin corporate event', 'corporate event guide austin', 'austin offsite planning'],
    audience: 'corporate',
  },
  '/austin-bachelorette-itinerary': {
    title: '3-Day Austin Bachelorette Itinerary · Lake Travis',
    description: 'Hour-by-hour Austin bachelorette weekend: Friday arrival + 6th Street, Saturday Lake Travis boat day (the trip highlight every group talks about), Rainey Street night, Sunday brunch + sendoff. Built around Premier\'s 4-hour Saturday charter.',
    h1: 'The 3-Day Austin Bachelorette Itinerary',
    keywords: ['austin bachelorette itinerary', 'austin bachelorette weekend', '3 day bachelorette austin'],
    audience: 'bachelorette',
  },
  '/austin-bachelor-itinerary': {
    title: '3-Day Austin Bachelor Party Itinerary · Lake Travis',
    description: 'Austin bachelor party weekend plan: Friday night 6th Street, Saturday Lake Travis private charter (the day everyone remembers), Rainey Street + Rainey Street vs Dirty 6th, BBQ, Sunday recovery. Built around a Premier private charter.',
    h1: 'The 3-Day Austin Bachelor Party Itinerary',
    keywords: ['austin bachelor itinerary', 'austin bachelor party weekend', '3 day bachelor austin'],
    audience: 'bachelor',
  },
  '/combined-bach-itinerary': {
    title: 'Combined Bach Weekend Itinerary · One Couple, Both Sides',
    description: 'Combined bach weekend plan for couples doing one celebration together: Friday mixer, Saturday Lake Travis private charter on Clever Girl or Meeseeks, Saturday night Rainey Street, Sunday brunch. BYOB + Party On Delivery pre-iced drink setup.',
    h1: 'Combined Bach Weekend Itinerary',
    keywords: ['combined bach itinerary', 'couples bach party austin', 'combined bach weekend'],
    audience: 'bach-combined',
  },
};

/**
 * Template-based overlay for long-tail / content pages not in CURATED.
 * Derives audience + target keyword from the slug, emits a unique but
 * formulaic title/description/H1 so no two pages share metadata.
 */
export function templateOverlay(slug) {
  const cleanSlug = slug.replace(/^\//, '').replace(/\/$/, '');
  if (!cleanSlug) return null;

  const parts = cleanSlug.split('/');
  const leaf = parts[parts.length - 1];
  const isBlog = parts[0] === 'blogs';

  // Turn "austin-bachelor-party-ideas" → "Austin Bachelor Party Ideas"
  const pretty = leaf
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Classify by leaf tokens for tailored descriptions.
  const tokens = leaf.toLowerCase();
  let audienceHint = '';
  let keywordHint = '';

  if (tokens.includes('bachelorette')) {
    audienceHint = 'bachelorette groups';
    keywordHint = 'bachelorette party';
  } else if (tokens.includes('bachelor')) {
    audienceHint = 'bachelor groups';
    keywordHint = 'bachelor party';
  } else if (tokens.includes('wedding') || tokens.includes('rehearsal') || tokens.includes('bridal') || tokens.includes('anniversary') || tokens.includes('engagement') || tokens.includes('proposal')) {
    audienceHint = 'wedding planners and couples';
    keywordHint = 'Lake Travis wedding boat';
  } else if (tokens.includes('corporate') || tokens.includes('team-building') || tokens.includes('company') || tokens.includes('client') || tokens.includes('executive') || tokens.includes('offsite')) {
    audienceHint = 'corporate event planners';
    keywordHint = 'corporate event';
  } else if (tokens.includes('family') || tokens.includes('memorial') || tokens.includes('baby-shower') || tokens.includes('gender-reveal')) {
    audienceHint = 'families and multi-generation groups';
    keywordHint = 'family boat trip';
  } else if (tokens.includes('birthday') || tokens.includes('milestone') || tokens.includes('sweet-16') || tokens.includes('sweet16')) {
    audienceHint = 'birthday + milestone groups';
    keywordHint = 'birthday boat rental';
  } else if (tokens.includes('graduation') || tokens.includes('prom') || tokens.includes('retirement')) {
    audienceHint = 'graduation, prom, and retirement groups';
    keywordHint = 'graduation boat';
  } else if (tokens.includes('disco')) {
    audienceHint = 'small bach groups and first-time Austin visitors';
    keywordHint = 'ATX Disco Cruise';
  } else if (tokens.includes('pontoon') || tokens.includes('pricing') || tokens.includes('cost')) {
    audienceHint = 'price-comparing planners';
    keywordHint = 'Lake Travis boat rental pricing';
  } else if (tokens.includes('safety') || tokens.includes('accessible') || tokens.includes('ada')) {
    audienceHint = 'safety + accessibility-sensitive planners';
    keywordHint = 'safe Lake Travis boat';
  } else {
    audienceHint = 'Austin visitors planning Lake Travis trips';
    keywordHint = pretty.toLowerCase();
  }

  const title = isBlog
    ? `${pretty} — Austin Party Boat Guide | Premier`
    : `${pretty} — Lake Travis Party Boat | Premier`;

  const description = `${pretty} on Lake Travis with Premier Party Cruises. Designed for ${audienceHint} — private charters starting at $200/hr (base rate, captain + fuel included; Texas tax + 20% gratuity added on top). BYOB with Party On Delivery drink setup, Anderson Mill Marina (25 min from downtown Austin, free parking, no stairs).`;

  const h1 = pretty;

  return { title, description, h1, keywords: [keywordHint], audience: audienceHint };
}

/** Look up overlay for a slug: curated first, template fallback. */
export function getOverlay(slug) {
  const normalized = slug === '/' ? '/' : slug.replace(/\/$/, '');
  return CURATED_OVERLAY[normalized] || templateOverlay(normalized);
}

/**
 * Whether to apply the overlay over a successfully-fetched live origin
 * response. Only TRUE for curated routes — for everything else, the live
 * origin's existing title/description/H1 are usually shorter and better
 * than my slug-derived templateOverlay (e.g. blog post titles from Replit
 * are 50-60 chars, my template would push them to 100+ chars and trigger
 * "too much text within title tags" audit warnings).
 *
 * For fallback HTML (when live fetch fails or for V2-only routes), the
 * overlay still applies — there's no live title to defer to.
 */
export function shouldOverrideLive(slug) {
  const normalized = slug === '/' ? '/' : slug.replace(/\/$/, '');
  return Boolean(CURATED_OVERLAY[normalized]);
}
