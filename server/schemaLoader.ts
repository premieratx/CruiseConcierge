import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request } from 'express';
import { isStaticBlogRoute } from './staticBlogMetadata';
import { getBaseDomain } from './utils/domain';

const __filename = fileURLToPath(import.meta.url);

// CRITICAL: Strip HTML tags from strings to prevent JSON-LD parsing errors
// WordPress content often contains HTML in author names, descriptions, etc.
function stripHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp;
    .replace(/&amp;/g, '&')  // Replace &amp;
    .replace(/&lt;/g, '<')   // Replace &lt;
    .replace(/&gt;/g, '>')   // Replace &gt;
    .replace(/&quot;/g, '"') // Replace &quot;
    .replace(/&#39;/g, "'")  // Replace &#39;
    .replace(/\s+/g, ' ')    // Collapse whitespace
    .trim();
}
const __dirname = path.dirname(__filename);

const SCHEMA_DIR = path.resolve(process.cwd(), 'attached_assets/schema_data');

interface RouteSchemaMapping {
  [route: string]: string[];
}

const ROUTE_TO_SCHEMA_MAPPING: RouteSchemaMapping = {
  '/': [
    'homepage/organization.jsonld',
    'homepage/faq.jsonld',
    'homepage/video.jsonld',
    'homepage/service-private.jsonld',
    'homepage/service-disco.jsonld',
    'homepage/service-daytripper.jsonld',
    'homepage/service-meeseeks.jsonld',
    'homepage/service-clevergirl.jsonld'
  ],
  '/faq': ['faq/faq.jsonld'],
  '/team-building': ['team-building/faq.jsonld', 'team-building/service.jsonld'],
  '/client-entertainment': ['client-entertainment/faq.jsonld', 'client-entertainment/service.jsonld'],
  '/company-milestone': ['company-milestone/faq.jsonld', 'company-milestone/service.jsonld'],
  '/rehearsal-dinner': ['rehearsal-dinner/faq.jsonld', 'rehearsal-dinner/service.jsonld'],
  '/welcome-party': ['welcome-party/faq.jsonld', 'welcome-party/service.jsonld'],
  '/after-party': ['after-party/faq.jsonld', 'after-party/service.jsonld'],
  '/sweet-16': ['sweet-16/faq.jsonld', 'sweet-16/service.jsonld'],
  '/graduation-party': ['graduation-party/faq.jsonld', 'graduation-party/service.jsonld'],
  '/milestone-birthday': ['milestone-birthday/faq.jsonld', 'milestone-birthday/service.jsonld'],
  '/atx-disco-cruise': ['atx-disco-cruise/event.jsonld', 'atx-disco-cruise/faq.jsonld', 'atx-disco-cruise/videos.jsonld'],
  '/private-cruises': ['private-cruises/faq.jsonld', 'private-cruises/service.jsonld', 'private-cruises/products.jsonld'],
  '/bachelor-party-austin': ['bachelor-party-austin/faq.jsonld', 'bachelor-party-austin/service.jsonld', 'bachelor-party-austin/videos.jsonld'],
  '/bachelorette-party-austin': ['bachelorette-party-austin/faq.jsonld', 'bachelorette-party-austin/service.jsonld', 'bachelorette-party-austin/videos.jsonld'],
  '/combined-bachelor-bachelorette-austin': ['combined-bachelor-bachelorette-austin/faq.jsonld', 'combined-bachelor-bachelorette-austin/videos.jsonld'],
  '/party-boat-austin': ['party-boat-austin/faq.jsonld', 'party-boat-austin/video.jsonld'],
  '/party-boat-lake-travis': ['party-boat-lake-travis/faq.jsonld', 'party-boat-lake-travis/video.jsonld'],
  '/testimonials-faq': ['testimonials-faq/faq.jsonld'],
  '/contact': ['contact/faq.jsonld', 'contact/service.jsonld'],
};

// Blog FAQ schema data for top blog posts (SEO: enables FAQ rich snippets on blog pages)
const BLOG_FAQ_SCHEMAS: Record<string, Array<{ question: string; answer: string }>> = {
  '/blogs/epic-bachelor-party-austin-ultimate-guide': [
    { question: "What's the best bachelor party activity in Austin?", answer: "The ATX Disco Cruise hosted by Premier Party Cruises. It's a four-hour, all-inclusive lake party with DJ, photographer, floats, and incredible multi-group energy." },
    { question: "Do we need a private boat?", answer: "If your group is under 12, the Disco Cruise is usually cheaper AND more fun due to the multi-group energy. For larger groups, Premier also offers private charters." },
    { question: "How do we get alcohol without running errands?", answer: "Our boats are BYOB. Use Party On Delivery for alcohol delivery to your Airbnb or directly to your boat." },
    { question: "Do bachelor parties really mingle on the ATX Disco Cruise?", answer: "Yes! That's half the fun. You're surrounded by 50-100 people all celebrating something epic. The multi-group energy is what makes it the best bachelor party experience in Austin." }
  ],
  '/blogs/epic-bachelorette-party-austin-ultimate-guide': [
    { question: "What's the best bachelorette party activity in Austin?", answer: "The ATX Disco Cruise hosted by Premier Party Cruises. It's a four-hour, all-inclusive lake party with DJ, photographer, floats, and incredible multi-group energy." },
    { question: "Do we need a private boat?", answer: "If your group is under 12, the Disco Cruise is usually cheaper AND more fun due to the multi-group energy. For larger groups, Premier also offers private charters." },
    { question: "How do we get drinks without running errands?", answer: "Our boats are BYOB. Use Party On Delivery for alcohol delivery to your Airbnb or directly to your boat." },
    { question: "What should I budget for an Austin bachelorette party?", answer: "The ATX Disco Cruise starts at $85/person all-inclusive with DJ, photographer, and floats. Private charters start at $200/hour for smaller groups." },
    { question: "Can we combine with a bachelor party?", answer: "Absolutely! Many couples book joint bachelor/bachelorette parties on the same boat or coordinate to meet at the party cove." }
  ],
  '/blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning': [
    { question: "What are typical Lake Travis boat party costs for different group sizes?", answer: "Lake Travis boat party costs start at $800 for our Day Tripper (14 guests, Monday-Thursday) and range up to $2,200+ for our flagship Clever Girl (50-75 guests). Per-person pricing breaks down to $35-75 depending on boat size and day of week." },
    { question: "What factors affect party boat pricing Austin the most?", answer: "The biggest factors are: day of week (weekends cost more), time slot (sunset cruises are premium), season (April-October is peak), and boat size. Planning around weekday afternoon slots can save 20-30%." },
    { question: "What is included in the base boat rental costs Lake Travis?", answer: "All boat rental costs include: private charter, professional captain, premium sound system, coolers with ice, giant lily pad float, and swimming stops." },
    { question: "How can I minimize my Austin boat party budget?", answer: "Book weekdays (save 15-20%), choose morning/afternoon over sunset slots, right-size your boat to actual guest count, bring your own beverages (BYOB), and book 2-4 weeks ahead. These strategies can reduce costs by 20-40%." },
    { question: "Are there hidden fees in party boat pricing Austin?", answer: "No hidden fees! Pricing is transparent. Base costs include captain, fuel, equipment, and standard amenities. Optional add-ons are clearly priced. Gratuity for your captain (15-20%) is customary but not required." },
    { question: "How does party boat pricing Austin compare to other venues?", answer: "Party boat pricing often provides better value than traditional venues. When you factor in the unique experience, included captain, sound system, floats, and stunning Lake Travis setting, costs compete favorably with restaurant buyouts or event spaces." }
  ],
  '/blogs/how-to-throw-great-bachelor-party-austin': [
    { question: "How far in advance should we book for a bachelor party?", answer: "Peak season (March-October) fills up fast, especially Saturdays. We recommend booking 2-4 weeks in advance for the best availability." },
    { question: "What should we bring on the party boat?", answer: "Bring sunscreen, sunglasses, swimsuits, towels, and your beverages (BYOB - no glass containers). We provide coolers with ice, floats, and all the party equipment." },
    { question: "Is the ATX Disco Cruise or a private charter better for bachelor parties?", answer: "The ATX Disco Cruise is perfect for groups of 6-20 who want high energy, a DJ, photographer, and the chance to party with other groups. Private charters are ideal for larger groups (20-75) who want exclusive access." },
    { question: "What happens if the weather is bad?", answer: "Our licensed captains monitor weather conditions constantly. If severe weather is predicted, we work with groups to reschedule. Light rain usually doesn't stop the party." },
    { question: "Can we combine our bachelor party with a bachelorette group?", answer: "Absolutely! Combined bachelor/bachelorette cruises are very popular on the ATX Disco Cruise." },
    { question: "How does transportation to the marina work?", answer: "Lake Travis marinas are about 30 minutes from downtown Austin. Many bachelor groups rent a party bus or van so everyone can ride together." }
  ],
  '/blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning': [
    { question: "What types of boats can I rent on Lake Travis?", answer: "Lake Travis offers pontoons, party barges, and yacht charters. Premier Party Cruises specializes in custom-built, high-end single-deck party boats in 14, 25, and 50-person capacities." },
    { question: "Is alcohol allowed on Lake Travis boat rentals?", answer: "Yes! Lake Travis is BYOB-friendly. ALL cruises are BYOB - bring your own beer, wine, seltzers in cans or plastic (no glass)." },
    { question: "Do I need a license to drive a boat on Lake Travis?", answer: "No! All Premier Party Cruises rentals include a professional, licensed captain. You just relax and enjoy." },
    { question: "How far in advance should I book my Lake Travis boat rental?", answer: "For peak season (March-October) and weekends, book 4-6 weeks in advance. For weekdays or off-season, 2-3 weeks is usually sufficient." },
    { question: "What's the difference between ATX Disco Cruise and Private Cruise?", answer: "ATX Disco Cruise is a 4-hour all-inclusive multi-group party experience with professional DJ, photographer, and giant floats. Private Cruise gives you exclusive use of a boat for your group only." }
  ],
  '/blogs/private-charter-vs-atx-disco-cruise-which-austin-party-boat': [
    { question: "Can we switch options later if our group size changes?", answer: "Often yes, depending on availability. Our team works with you to find the best fit as your plans evolve." },
    { question: "Is one option better than the other?", answer: "They're fundamentally different experiences. The ATX Disco Cruise delivers instant party energy with everything included, while private charters offer complete customization and privacy." },
    { question: "Do both options visit party coves on Lake Travis?", answer: "Yes, both options include stops at party coves where guests can swim, float, and enjoy the water." },
    { question: "Which option is recommended for bachelor/bachelorette parties?", answer: "For groups under 15, the ATX Disco Cruise provides best per-person value with DJ, photographer, and high-energy atmosphere included. For larger groups wanting privacy, private charters are the way to go." },
    { question: "How does BYOB work for both options?", answer: "Both private charters and the ATX Disco Cruise are BYOB. No glass containers allowed. We provide coolers and ice." }
  ],
  '/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises': [
    { question: "What Lake Travis boat safety equipment is on board?", answer: "All boats are equipped with USCG-approved life jackets, fire extinguishers, first aid kits, VHF marine radios, navigation lights, throwable flotation devices, and emergency signals." },
    { question: "Are your captains trained in safety procedures?", answer: "Yes! All captains hold valid USCG licenses, are CPR and first aid certified, and have years of Lake Travis experience with a 100% safety record." },
    { question: "What are the main party boat safety rules for guests?", answer: "Listen to captain instructions, no glass containers, supervise children, move carefully when boat is in motion, swim responsibly during stops, and stay hydrated." },
    { question: "How do you handle bad weather for Lake Travis boating safety?", answer: "We monitor weather conditions constantly. If conditions pose any risk, we offer full rescheduling or refunds. Your captain makes the final call - safety always comes first." },
    { question: "Is swimming during the cruise safe?", answer: "Swimming is a highlight! We follow strict safety guidelines: designated swim areas, buddy system encouraged, proper use of floats, and captain supervision." }
  ],
  '/blogs/top-10-reasons-austin-bachelor-party-lake-travis-boat': [
    { question: "How far in advance should we book for a bachelor party?", answer: "Peak season (March-October) fills up fast, especially Saturdays. We recommend booking 2-4 weeks in advance." },
    { question: "What should we bring on the party boat?", answer: "Bring sunscreen, sunglasses, swimsuits, towels, and your beverages (BYOB - no glass). We provide coolers with ice, floats, and party equipment." },
    { question: "Is the ATX Disco Cruise or a private charter better for bachelor parties?", answer: "The ATX Disco Cruise is perfect for groups of 6-20 wanting high energy with DJ and photographer. Private charters are ideal for larger groups (20-75) wanting exclusive access." },
    { question: "What happens if the weather is bad?", answer: "Our captains monitor weather constantly. We reschedule for severe weather. Light rain usually doesn't stop the party." },
    { question: "Can we combine our bachelor party with a bachelorette group?", answer: "Absolutely! Combined bachelor/bachelorette cruises are very popular on the ATX Disco Cruise." }
  ],
  '/blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests': [
    { question: "What is the maximum group size for Lake Travis party boats?", answer: "Our largest boat holds 75 guests. For bigger groups, we can arrange multiple boats that cruise together on the lake." },
    { question: "How much does it cost to rent a party boat for 20+ people?", answer: "A 25-person boat starts at $900 for 3 hours. Larger boats for 50-75 guests range from $1,600 to $3,400. Per-person costs drop as your group grows." },
    { question: "Can we bring our own alcohol on the boat?", answer: "Yes! Private charters are BYOB with no corkage fees. Just no glass containers. Party On Delivery can drop drinks at the marina." },
    { question: "How far in advance should large groups book?", answer: "Book 4-6 weeks ahead for weekend dates. Summer and holidays need even more lead time. We recommend 2 months for groups over 40." },
    { question: "Can we decorate the boat for our event?", answer: "Absolutely! Bring banners, balloons, and props. No confetti or glitter (lake pollution rules). Tape and removable hooks work best." }
  ],
  '/blogs/why-choose-austin-bachelor-party': [
    { question: "How much does an Austin bachelor party cost?", answer: "Budget $200-400 per person for a weekend. This covers accommodations, food, drinks, and activities. The ATX Disco Cruise runs $85-$105 per person all-inclusive, while private boat charters start at $800 for a 4-hour cruise. Austin is significantly cheaper than Vegas or Miami." },
    { question: "What's the best area to stay for a bachelor party?", answer: "Downtown Austin puts you walking distance to 6th Street, Rainey Street, and great restaurants. For a more upscale vibe, try the Domain. If you're focused on lake activities, consider Lake Travis vacation rentals in Lakeway or Volente." },
    { question: "Can we bring our own alcohol on Lake Travis boats?", answer: "Yes! Premier Party Cruises is BYOB. Bring coolers full of beer, wine, and spirits. We recommend Party On Delivery service—they bring everything to the marina. Just no glass containers allowed." },
    { question: "Is Austin good for bachelor parties in winter?", answer: "Austin winters are mild (45-65°F). While boat season typically ends in October, you still have incredible BBQ, nightlife, TopGolf, brewery tours, and sporting events. Plus, prices are much lower." },
    { question: "How do I book a Lake Travis party boat?", answer: "Start with Premier Party Cruises. Choose from private boats (14-75 guests) or the ATX Disco Cruise (public party). Book 2-4 weeks ahead for regular weekends, 4-6 weeks for holidays." },
    { question: "What makes Austin better than Vegas for bachelor parties?", answer: "Authenticity. Vegas is manufactured fun with inflated prices. Austin offers real Texas experiences—world-class BBQ, genuine live music, beautiful lake scenery, and friendly locals. Your dollar goes 2x further here." },
    { question: "How many days should we plan for?", answer: "Most groups do 2-3 nights. A typical itinerary: Day 1 (arrival + 6th Street), Day 2 (Lake Travis boat + BBQ + Rainey Street), Day 3 (brunch + departure). Add a fourth day for golf or more activities." },
    { question: "What should we wear on the boat?", answer: "Swim trunks, boat shoes or sandals, sunglasses, and sunscreen. Bring a change of clothes for afterward. We provide towels and floats. Don't forget a waterproof phone case!" }
  ],
  '/blogs/why-choose-austin-bachelorette-party': [
    { question: "How much does an Austin bachelorette party cost?", answer: "Budget $250-400 per person for a weekend. The ATX Disco Cruise runs $85-$105 per person all-inclusive, while private boat charters start at $800 for a 4-hour cruise. Austin is more affordable than Miami or Vegas while delivering premium experiences." },
    { question: "What's the best area to stay for a bachelorette party?", answer: "Downtown Austin is ideal for nightlife access to 6th Street and Rainey Street. The Domain offers upscale shopping and dining. For lake-focused trips, Lake Travis vacation rentals in Lakeway provide stunning views and proximity to marinas." },
    { question: "Can we bring our own alcohol on Lake Travis boats?", answer: "Yes! Premier Party Cruises is BYOB. Bring coolers with wine, champagne, seltzers—whatever you want. We recommend Party On Delivery service. Just no glass containers allowed." },
    { question: "What makes Austin better than Nashville for bachelorettes?", answer: "Austin offers something Nashville can't: Lake Travis party boats. Plus, Austin is less overdone, the nightlife is more diverse, food scene is stronger, and the vibe is more relaxed." },
    { question: "How many days should we plan for?", answer: "Most groups do 2-3 nights. Typical itinerary: Day 1 (arrival + Rainey Street), Day 2 (Lake Travis boat + spa + 6th Street), Day 3 (brunch + shopping + departure)." },
    { question: "What should we wear on the boat?", answer: "Cute swimsuits, cover-ups, and sandals. Bring a change of clothes for afterward. We provide towels and floats. Don't forget sunglasses, sunscreen, and a waterproof phone case!" }
  ],
  '/blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide': [
    { question: "How far in advance should I book?", answer: "Book 4-6 weeks ahead for the best selection. Peak season (May-September) fills up fast. Weekends go quickly, so plan early!" },
    { question: "What size boat do I need?", answer: "We offer boats for 14-75 guests. Tell us your group size, and we'll help you pick the right fit. It's better to have a little extra space." },
    { question: "Can we bring our own food and drinks?", answer: "Yes! All our cruises are BYOB. Bring coolers with ice. The only rule is no glass bottles for safety reasons." },
    { question: "What happens if the weather is bad?", answer: "We watch the forecast closely. If conditions are unsafe, we'll work with you to reschedule. Your safety comes first." },
    { question: "Where do we meet the boat?", answer: "We depart from marinas on Lake Travis. You'll get exact directions and parking info when you book." },
    { question: "Is a captain included?", answer: "Yes! Every cruise includes a licensed captain. You just relax and enjoy the party. No boating experience needed." }
  ],
  '/blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events': [
    { question: "What entertainment is included with Lake Travis boat parties?", answer: "All cruises include premium Bluetooth sound system, giant lily pad float, swimming stops in scenic coves, and comfortable shaded seating. Party boat entertainment packages are designed for maximum fun without extra charges for basic amenities." },
    { question: "Can we bring our own music?", answer: "Absolutely! Every boat has Bluetooth speakers. Connect your phone and play your custom playlist. Our premium sound systems ensure great sound quality whether you're dancing or relaxing." },
    { question: "What water activities are available?", answer: "Activities include swimming in Lake Travis's scenic coves, floating on our giant lily pad, and water lounging. All cruises make stops for swimming - just bring swimwear and towels." },
    { question: "Can we decorate the boat?", answer: "Yes, tasteful decorations are welcome! Balloons, banners, and themed items are fine. Just avoid anything that could damage the vessel or fly into the water." },
    { question: "What makes Clever Girl special?", answer: "Clever Girl is our flagship featuring 14 disco balls for ultimate party vibes! This 50-75 guest vessel offers maximum dance space, premium sound, and the best party atmosphere. Additional crew fee applies for groups of 51-75." }
  ],
  '/blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions': [
    { question: "How many people can your boats hold for corporate events?", answer: "We have boats for groups of all sizes. Our fleet ranges from 14-person vessels for small teams to 75-person party boats for large company gatherings." },
    { question: "Can we bring our own food and drinks?", answer: "Yes! All our private cruises are BYOB. You can bring your own catering or we can help connect you with local catering partners." },
    { question: "What team building activities can we do on the boat?", answer: "Guests can swim, float on giant lily pads, and enjoy the water. Many teams use the cruise time for informal networking, team discussions, or simply relaxing together outside the office." },
    { question: "Do you offer corporate packages or discounts?", answer: "Yes! We have corporate packages designed for business groups. Contact us directly for custom quotes based on your group size, date, and specific needs." },
    { question: "What happens if the weather is bad?", answer: "Safety comes first. If weather forces a cancellation, we offer full rescheduling or refunds. Our team monitors conditions closely and will reach out ahead of time." }
  ],
  '/blogs/corporate-boat-parties-austin-lake-travis-smartest-venue': [
    { question: "Is a boat party appropriate for mixed-age corporate teams?", answer: "Absolutely. Tone and music are completely adjustable based on your group. We host everything from startup teams to executive retreats, tailoring the experience to your company culture." },
    { question: "Can we keep the event professional?", answer: "Yes. Alcohol is optional, not required. Many companies use our BYOB structure to control the experience. The crew maintains professionalism throughout." },
    { question: "Is it safe for executives and clients?", answer: "Safety is our priority. Licensed captains and trained crew manage every aspect of the experience. All vessels are fully insured and regularly inspected." },
    { question: "How does alcohol work at corporate events on boats?", answer: "All cruises are BYOB. This gives you full control over what's served. Many companies partner with Party On Delivery for convenient marina delivery." },
    { question: "How far in advance should we book a corporate event?", answer: "We recommend 2-4 weeks minimum for corporate events. Popular dates fill quickly, especially in spring and fall." }
  ],
  '/blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart': [
    { question: "What happens if someone gets seasick on the boat?", answer: "Lake Travis has calm waters compared to the ocean, so seasickness is rare. However, our trained crew knows how to help if anyone feels unwell." },
    { question: "Are life jackets provided for non-swimmers?", answer: "Absolutely! We provide adult life jackets for all guests. We strongly encourage non-swimmers to wear life jackets throughout the cruise." },
    { question: "What happens if the weather turns bad during our cruise?", answer: "Our Coast Guard certified captains closely monitor weather conditions. If conditions become unsafe, we will dock at a safe location. We offer full rescheduling or refunds for weather-related cancellations." },
    { question: "Are your boats inspected regularly?", answer: "Yes, all our vessels undergo regular Coast Guard inspections and maintenance checks. This commitment to safety is why we have a perfect safety record." },
    { question: "How experienced are your captains?", answer: "All our captains are U.S. Coast Guard certified with extensive Lake Travis experience. They know every cove, shallow area, and safe anchoring spot." }
  ],
  '/blogs/ultimate-austin-bachelorette-party-boat-guide-lake-travis': [
    { question: "What is the ATX Disco Cruise?", answer: "The ATX Disco Cruise is Austin's famous shared party cruise exclusively for bachelorette and bachelor groups. Every Friday and Saturday, multiple small groups come together on one big party barge with DJ, photographer, floats, and all party supplies included." },
    { question: "How much does a bachelorette boat party cost?", answer: "ATX Disco Cruise tickets range from $85-$105 per person depending on time slot. This includes DJ, photographer, floats, coolers with ice, and all amenities. Private charters start at $800 for a 4-hour cruise." },
    { question: "Should we do ATX Disco Cruise or Private Charter?", answer: "ATX Disco Cruise is perfect for groups of 5-15 who want big party energy. Private Charter is better for large groups (30+) or those wanting complete privacy. Many groups even do both!" },
    { question: "Is alcohol included or do we bring our own?", answer: "Lake Travis is BYOB (Bring Your Own Beverage). We provide coolers with ice and cups. You bring your own alcohol—cans and plastic only, no glass. We partner with Party On Delivery for marina delivery." },
    { question: "How far in advance should we book?", answer: "We recommend booking 2-3 months in advance for peak season (March through August). Saturday time slots sell out fastest." },
    { question: "What should we bring on the boat?", answer: "Bring swimsuits, sunscreen, towels, sunglasses, and your beverages (cans/plastic only). Optional: matching bachelorette outfits, bride sash, decorations. We provide everything else including floats, ice, cups, and party supplies." }
  ],
  '/blogs/ultimate-austin-party-boat-experience-any-celebration': [
    { question: "What is included on an Austin party boat rental?", answer: "Most party boats include a professional captain, coolers with ice, Bluetooth sound system, ample seating, and water floats. The ATX Disco Cruise also includes a DJ, professional photographer, and disco dance floor. All boats are BYOB." },
    { question: "How does BYOB work on party boats?", answer: "BYOB means Bring Your Own Beverage. You bring whatever you want to drink (no glass containers). We provide coolers and ice. For easy delivery, we partner with Party On Delivery who can deliver to your Airbnb or the marina." },
    { question: "How many people can fit on a party boat?", answer: "We have boats ranging from 14 to 75 guests. The Day Tripper fits 14, Meeseeks fits 25, Clever Girl fits 50-75. The ATX Disco Cruise accommodates multiple groups on our largest vessel." },
    { question: "Can we swim off the boat?", answer: "Yes! Swimming is one of the best parts. Your captain will anchor at popular swimming spots like Devil's Cove. We provide large floats and lily pads." },
    { question: "What's the difference between private charter and ATX Disco Cruise?", answer: "Private charters give your group exclusive use of a boat with custom music and schedule. The ATX Disco Cruise is a shared party cruise with multiple groups, a professional DJ, photographer, and high-energy atmosphere." },
    { question: "How far in advance should I book?", answer: "Peak season (March-October) fills up quickly, especially Saturdays. We recommend booking 2-4 weeks in advance for the best availability." }
  ],
  '/blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing': [
    { question: "What are the pricing options for Lake Travis boat party packages?", answer: "Packages start at $800 for our Day Tripper (14 guests, Monday-Thursday) and range up to $2,200+ for our flagship Clever Girl (50-75 guests). Weekend packages are typically 15-20% higher than weekday rates." },
    { question: "What is included in a Lake Travis party boat package?", answer: "All packages include: private boat charter, professional captain, premium Bluetooth sound system, giant lily pad floats, coolers with ice, and swimming stops. All boats are BYOB friendly (cans and plastic only)." },
    { question: "How do I choose the right party boat size?", answer: "Choose based on group size: Day Tripper (up to 14), Meeseeks (up to 25), The Irony (up to 30), or Clever Girl (50-75 guests). We typically recommend slightly larger capacity for comfort." },
    { question: "Can we bring our own food and alcohol?", answer: "Yes! All packages are BYOB - bring your own beverages in cans and plastic only (no glass). You can bring your own food or we can connect you with catering partners." },
    { question: "How far in advance should I book?", answer: "We recommend booking 2-4 weeks in advance. Popular dates may require 4-6 weeks notice. Bachelor and bachelorette parties often book 2-3 months ahead." }
  ]
};

function generateFAQSchemaForBlog(faqs: Array<{ question: string; answer: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

const schemaCache: Map<string, object> = new Map();

function loadSchemaFile(relativePath: string): object | null {
  if (schemaCache.has(relativePath)) {
    return schemaCache.get(relativePath)!;
  }

  const fullPath = path.join(SCHEMA_DIR, relativePath);
  
  try {
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const schemaObject = JSON.parse(fileContent);
    schemaCache.set(relativePath, schemaObject);
    return schemaObject;
  } catch (error) {
    console.error(`Error loading schema file ${relativePath}:`, error);
    return null;
  }
}

export function getSchemaForRoute(pathname: string): object[] {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;

  const schemas: object[] = [];

  // Check file-based schema mapping (service pages)
  const schemaFiles = ROUTE_TO_SCHEMA_MAPPING[normalizedPath];
  if (schemaFiles && schemaFiles.length > 0) {
    for (const file of schemaFiles) {
      const schema = loadSchemaFile(file);
      if (schema) {
        // Handle array-format schema files (e.g., products.jsonld with multiple Product schemas)
        if (Array.isArray(schema)) {
          schemas.push(...schema);
        } else {
          schemas.push(schema);
        }
      }
    }
  }

  // Check blog FAQ schema mapping (blog posts with FAQ sections)
  const blogFaqs = BLOG_FAQ_SCHEMAS[normalizedPath];
  if (blogFaqs && blogFaqs.length > 0) {
    schemas.push(generateFAQSchemaForBlog(blogFaqs));
  }

  return schemas;
}

export function generateArticleSchema(blogPost: {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  publishedAt?: Date | string;
  modifiedAt?: Date | string;
  author?: {
    name: string;
  };
}, canonicalUrl?: string, req?: Request): object {
  const publishDate = blogPost.publishedAt 
    ? new Date(blogPost.publishedAt).toISOString()
    : new Date().toISOString();
  
  const modifiedDate = blogPost.modifiedAt 
    ? new Date(blogPost.modifiedAt).toISOString()
    : publishDate;

  // CRITICAL SEO FIX: Always use production domain for schema references
  // This ensures @id references match across all schemas (Organization, Article, etc.)
  const productionDomain = 'https://premierpartycruises.com';
  const defaultUrl = `${productionDomain}/blogs/${blogPost.slug}`;
  const schemaUrl = canonicalUrl || defaultUrl;

  // Organization @id MUST match the one in ORGANIZATION_SCHEMA
  const organizationId = `${productionDomain}/#organization`;
  const defaultImage = `${productionDomain}/media/schema/hero-boat-1.jpg`;

  // CRITICAL: Strip HTML from all text fields to prevent JSON-LD parsing errors
  const cleanTitle = stripHtml(blogPost.title);
  const cleanExcerpt = stripHtml(blogPost.excerpt) || stripHtml(blogPost.content?.substring(0, 160)) || '';
  const cleanAuthorName = stripHtml(blogPost.author?.name) || "Premier Party Cruises";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": cleanTitle,
    "description": cleanExcerpt,
    "image": blogPost.featuredImage || defaultImage,
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": cleanAuthorName
    },
    "publisher": {
      "@id": organizationId
    },
    "url": schemaUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": schemaUrl
    }
  };
}

export function isBlogPostRoute(pathname: string): boolean {
  if (!pathname.startsWith('/blogs/')) {
    return false;
  }
  
  const slug = pathname.slice('/blogs/'.length);
  
  if (!slug || slug.includes('/')) {
    return false;
  }
  
  return true;
}

export function isAnyBlogRoute(pathname: string): boolean {
  return isBlogPostRoute(pathname) || isStaticBlogRoute(pathname);
}
