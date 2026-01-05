export interface BlogMetadata {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  heroImage: string;
  keywords: string[];
}

export const blogMetadataRegistry: Record<string, BlogMetadata> = {
  '3-day-austin-bachelorette-itinerary': {
    slug: '3-day-austin-bachelorette-itinerary',
    title: '3-Day Austin Bachelorette Itinerary | Weekend',
    description: 'Plan the perfect 3-day Austin bachelorette party! Expert itinerary from Lake Travis boat parties to 6th Street nightlife. 150,000+ celebrations. Book now!',
    publishDate: '2024-01-01',
    modifiedDate: '2024-12-18',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: [
      '3-day Austin bachelorette',
      'Austin bachelorette itinerary',
      'weekend bachelorette Austin',
      'Lake Travis bachelorette',
      '6th Street nightlife',
      'Austin party planning',
      'bachelorette weekend guide'
    ]
  },
  
  'ultimate-austin-bachelorette-weekend': {
    slug: 'ultimate-austin-bachelorette-weekend',
    title: 'Ultimate Austin Bachelorette Weekend | Premier Party Guide',
    description: 'Create the ultimate Austin bachelorette weekend with our premier guide. Lake Travis boat parties, top nightlife, activities. 15+ years, 150,000+ guests.',
    publishDate: '2024-01-05',
    modifiedDate: '2024-12-20',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: [
      'Austin bachelorette weekend',
      'ultimate bachelorette guide',
      'Lake Travis boat party',
      'Austin nightlife',
      'bachelorette activities',
      'Austin party planning'
    ]
  },
  
  'top-10-austin-bachelorette-ideas': {
    slug: 'top-10-austin-bachelorette-ideas',
    title: 'Top 10 Austin Bachelorette Ideas | Ultimate Party Guide 2025',
    description: 'Discover the top 10 Austin bachelorette party ideas! From Lake Travis boat cruises to 6th Street nightlife. 15+ years experience, 150,000+ celebrations.',
    publishDate: '2024-01-10',
    modifiedDate: '2024-12-18',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: [
      'Austin bachelorette ideas',
      'top bachelorette activities',
      'Lake Travis boat party',
      'Austin nightlife',
      'bachelorette party planning',
      'Austin celebrations'
    ]
  },
  
  'budget-austin-bachelorette': {
    slug: 'budget-austin-bachelorette',
    title: 'Budget Austin Bachelorette | Affordable Lake Travis',
    description: 'Plan an unforgettable budget Austin bachelorette party! Affordable Lake Travis boat rentals, BYOB options, free activities. 15+ years experience.',
    publishDate: '2024-01-15',
    modifiedDate: '2024-12-20',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg',
    keywords: [
      'budget Austin bachelorette',
      'affordable Lake Travis',
      'cheap bachelorette party',
      'Austin BYOB',
      'budget party planning',
      'affordable boat rental'
    ]
  },
  
  'luxury-austin-bachelorette': {
    slug: 'luxury-austin-bachelorette',
    title: 'Luxury Austin Bachelorette | Lake Travis VIP',
    description: 'Indulge in a luxury Austin bachelorette party with premium Lake Travis boat rentals, VIP service, and upscale experiences. 15+ years, 150,000+ guests.',
    publishDate: '2024-01-20',
    modifiedDate: '2024-12-22',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: [
      'luxury Austin bachelorette',
      'premium Lake Travis',
      'VIP bachelorette party',
      'upscale Austin celebration',
      'luxury boat rental',
      'premium party planning'
    ]
  },
  
  'adventure-austin-bachelorette': {
    slug: 'adventure-austin-bachelorette',
    title: 'Adventure Austin Bachelorette | Lake Travis Fun',
    description: 'Plan an adventure-filled Austin bachelorette party! Lake Travis water sports, outdoor activities, hiking. 15+ years experience, 150,000+ celebrations.',
    publishDate: '2024-01-25',
    modifiedDate: '2024-12-20',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg',
    keywords: [
      'adventure Austin bachelorette',
      'outdoor bachelorette party',
      'Lake Travis activities',
      'water sports Austin',
      'adventure party planning',
      'active bachelorette'
    ]
  },
  
  'austin-bachelorette-nightlife': {
    slug: 'austin-bachelorette-nightlife',
    title: 'Austin Bachelorette Nightlife | 6th & Rainey St',
    description: 'Your complete Austin bachelorette nightlife guide! Best bars on 6th Street, Rainey Street, live music venues. 15+ years local expertise.',
    publishDate: '2024-01-30',
    modifiedDate: '2024-12-18',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: [
      'Austin bachelorette nightlife',
      '6th Street bars',
      'Rainey Street',
      'Austin live music',
      'bachelorette party bars',
      'downtown Austin nightlife'
    ]
  },
  
  'blogs/atx-disco-cruise-experience': {
    slug: 'blogs/atx-disco-cruise-experience',
    title: 'ATX Disco Cruise Experience | Austin Party Boat',
    description: 'Experience the legendary ATX Disco Cruise on Lake Travis! All-inclusive party boat with DJ, photographer, giant floats, dance floor. BYOB. 150,000+ guests served. Book now!',
    publishDate: '2025-01-05',
    modifiedDate: '2025-01-10',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: [
      'ATX Disco Cruise',
      'Austin party boat',
      'Lake Travis disco cruise',
      'all-inclusive boat party',
      'Austin nightlife',
      'party boat Austin'
    ]
  },
  
  'blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination': {
    slug: 'blogs/holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination',
    title: 'Lake Travis Holiday Boat Parties | Seasonal Guide',
    description: 'Plan unforgettable holiday celebrations on Lake Travis! Year-round boat parties for Christmas, New Year\'s, 4th of July. 15+ years experience.',
    publishDate: '2024-11-01',
    modifiedDate: '2024-11-15',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: [
      'Lake Travis holiday parties',
      'seasonal boat celebrations',
      'Christmas boat party',
      'New Year\'s Lake Travis',
      'holiday party planning',
      'Austin seasonal events'
    ]
  },
  
  'blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises': {
    slug: 'blogs/joint-bachelor-bachelorette-parties-with-premier-party-cruises',
    title: 'Joint Bachelor Bachelorette Lake Travis Parties',
    description: 'Host the ultimate joint bachelor bachelorette party on Lake Travis! Large boats, custom packages, perfect for combined celebrations. Book now!',
    publishDate: '2024-10-15',
    modifiedDate: '2024-11-20',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: [
      'joint bachelor bachelorette party',
      'combined party Lake Travis',
      'Jack and Jill party boat',
      'Lake Travis group events',
      'bachelor bachelorette Austin'
    ]
  },
  
  'blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations': {
    slug: 'blogs/lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations',
    title: 'Lake Travis Wedding Boat Rentals | Austin Venues',
    description: 'Discover unique Lake Travis wedding boat rentals in Austin! Intimate ceremonies, rehearsal dinners, receptions on the water. 15+ years experience.',
    publishDate: '2024-09-01',
    modifiedDate: '2024-11-10',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg',
    keywords: [
      'Lake Travis wedding',
      'Austin wedding boat',
      'boat wedding venue',
      'Lake Travis ceremony',
      'Austin waterfront wedding',
      'wedding boat rental'
    ]
  },
  
  'blogs/must-haves-for-the-perfect-austin-bachelorette-weekend': {
    slug: 'blogs/must-haves-for-the-perfect-austin-bachelorette-weekend',
    title: 'Austin Bachelorette Weekend Must-Haves',
    description: 'Essential must-haves for an unforgettable Austin bachelorette weekend! Lake Travis boat parties, nightlife, activities. Expert planning guide.',
    publishDate: '2024-08-15',
    modifiedDate: '2024-11-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: [
      'Austin bachelorette must-haves',
      'bachelorette party essentials',
      'Lake Travis party',
      'Austin celebration planning',
      'bachelorette weekend checklist'
    ]
  },
  
  'blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience': {
    slug: 'blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience',
    title: 'Austin Bachelorette Party | Top Spots & Tips',
    description: 'Discover top spots and expert tips for an unforgettable Austin bachelorette party! Lake Travis boats, 6th Street bars, best activities.',
    publishDate: '2024-07-20',
    modifiedDate: '2024-10-30',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: [
      'Austin bachelorette spots',
      'bachelorette party tips',
      'Lake Travis activities',
      'Austin nightlife guide',
      'bachelorette planning Austin'
    ]
  },
  
  'blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning': {
    slug: 'blogs/first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning',
    title: 'First-Time Lake Travis Boat Rental Tips',
    description: 'Planning your first Lake Travis boat rental in Austin? Get essential tips for a perfect party, from choosing the right boat to safety and planning. Your ultimate guide to fun on Lake Travis!',
    publishDate: '2025-01-10',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: [
      'lake travis boat rental',
      'first time boat rental',
      'austin party planning',
      'lake travis party boat',
      'austin boat rental guide',
      'lake travis tips',
      'party boat austin',
      'lake travis cruises'
    ]
  },
  
  'blog/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy': {
    slug: 'blog/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy',
    title: 'Birthday Party Boat Austin | Lake Travis',
    description: 'Celebrate milestone birthdays on Lake Travis! Austin\'s premier party boat rentals with BYOB, crew, and floats. 15+ years, 150,000+ guests served.',
    publishDate: '2025-11-01',
    modifiedDate: '2025-11-12',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: [
      'birthday party Austin',
      'milestone birthday Lake Travis',
      'party boat birthday',
      'Austin birthday celebration',
      'Lake Travis birthday party',
      '30th birthday Austin',
      '40th birthday party',
      '50th birthday Lake Travis'
    ]
  },
  
  'blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests': {
    slug: 'blog/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
    title: 'Lake Travis Boat Rentals | Large Groups 20-75',
    description: 'Lake Travis boat rentals for large groups in Austin, Texas. Party boat cruises for 20-75 guests. Corporate events, reunions. BYOB. Book now!',
    publishDate: '2025-11-01',
    modifiedDate: '2025-11-12',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: [
      'boat rental lake travis texas',
      'party boat austin',
      'large group boat rental',
      'Austin corporate events',
      'Lake Travis team building',
      'reunion party boat',
      'bachelorette party'
    ]
  },
  
  'blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties': {
    slug: 'blog/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties',
    title: 'Lake Travis Weather Guide | Seasonal Boat Parties',
    description: 'Plan perfect Lake Travis boat parties year-round! Seasonal weather guide, safety tips, and best times for Austin celebrations. 15+ years experience.',
    publishDate: '2025-11-01',
    modifiedDate: '2025-11-12',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg',
    keywords: [
      'Lake Travis weather',
      'Austin boat party seasons',
      'Lake Travis year-round boating',
      'best time Lake Travis',
      'seasonal party planning Austin',
      'Lake Travis weather guide'
    ]
  },
  
  'first-time-lake-travis-boat-rental-guide': {
    slug: 'first-time-lake-travis-boat-rental-guide',
    title: 'First-Time Lake Travis Boat Rental Guide',
    description: 'Planning your first Lake Travis boat rental? Expert guide to choosing boats, safety, pricing, and Austin party planning. 15+ years experience, 150,000+ guests.',
    publishDate: '2025-11-01',
    modifiedDate: '2025-11-12',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: [
      'Lake Travis boat rental',
      'Austin party planning',
      'first time boat rental',
      'Lake Travis guide',
      'party boat Austin',
      'bachelor party Lake Travis',
      'bachelorette party Austin'
    ]
  },
  
  'blogs/lake-travis-bachelor-party-austin-celebrations': {
    slug: 'blogs/lake-travis-bachelor-party-austin-celebrations',
    title: 'Lake Travis Bachelor Party: Ultimate Austin Adventure Guide',
    description: 'Plan the ultimate lake travis bachelor party with boat rentals, adventure activities, and vibrant Austin nightlife, ensuring unforgettable celebrations.',
    publishDate: '2025-01-20',
    modifiedDate: '2025-12-03',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/lake-travis-bachelor-party-scenic.jpg',
    keywords: [
      'lake travis bachelor party',
      'austin bachelor party',
      'bachelor party lake travis',
      'lake travis boat rental bachelor party',
      'party boat rentals',
      'lake travis fun',
      'adventure activities'
    ]
  },
  
  'blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations': {
    slug: 'blogs/lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations',
    title: 'Lake Travis Bachelor Party Boat Rentals Guide',
    description: 'Plan epic Lake Travis bachelor party boat rentals! Complete guide to boats, pricing, activities, and nightlife. 15+ years experience, 150,000+ celebrations.',
    publishDate: '2025-01-01',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: [
      'Lake Travis bachelor party boat',
      'bachelor party boat rentals Austin',
      'epic bachelor party',
      'Lake Travis celebrations',
      'party boat Austin',
      'bachelor party ideas'
    ]
  },
  
  'blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery': {
    slug: 'blogs/austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery',
    title: 'Austin Bachelorette: Spa, Disco Cruise & More',
    description: 'Plan the perfect Austin bachelorette party with spa retreats, Lake Travis disco cruises, and seamless alcohol delivery. Your complete guide to bachelorette bliss.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: [
      'Austin bachelorette party',
      'Lake Travis bachelorette',
      'ATX Disco Cruise',
      'Austin spa bachelorette',
      'Party On Delivery',
      'bachelorette weekend Austin'
    ]
  },

  'blogs/austin-party-venue-alcohol-delivery-navigating-policies-and-logistics': {
    slug: 'blogs/austin-party-venue-alcohol-delivery-navigating-policies-and-logistics',
    title: 'Austin Party Alcohol Delivery | Policies Guide',
    description: 'Navigate Austin alcohol delivery policies with ease. TABC compliance, venue coordination, and Party On Delivery integration for stress-free events.',
    publishDate: '2025-01-20',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp',
    keywords: ['Austin alcohol delivery', 'TABC compliance', 'venue coordination', 'Party On Delivery', 'event alcohol logistics']
  },

  'blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy': {
    slug: 'blogs/birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy',
    title: 'Birthday Party Alcohol Delivery Austin: Milestone Celebrations',
    description: 'Make milestone birthdays easy with Party On Delivery in Austin. 21st, 30th, 40th, 50th celebrations with hassle-free alcohol delivery.',
    publishDate: '2025-01-22',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-4_1760080740017.jpg',
    keywords: ['birthday alcohol delivery Austin', 'milestone birthday party', '21st birthday Austin', 'Party On Delivery birthday']
  },

  'blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view': {
    slug: 'blogs/birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view',
    title: 'Birthday Boat Rentals Lake Travis | Milestones',
    description: 'Celebrate milestone birthdays on Lake Travis! Boat rentals for 21st, 30th, 40th, 50th birthdays. Scenic views, BYOB, perfect celebrations.',
    publishDate: '2025-01-25',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-8_1760080740018.jpg',
    keywords: ['birthday boat rental Lake Travis', 'milestone birthday cruise', 'Lake Travis birthday party', 'party boat Austin birthday']
  },

  'blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions': {
    slug: 'blogs/corporate-team-building-on-lake-travis-professional-boat-rental-solutions',
    title: 'Corporate Team Building Lake Travis: Professional Boat Rentals',
    description: 'Host professional corporate team building on Lake Travis. Private boat rentals for retreats, client events, and company celebrations.',
    publishDate: '2025-01-28',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-12_1760080740019.jpg',
    keywords: ['corporate team building Lake Travis', 'company boat rental Austin', 'professional event boat', 'corporate retreat Lake Travis']
  },

  'blogs/graduation-party-alcohol-planning-ut-and-austin-college-celebrations': {
    slug: 'blogs/graduation-party-alcohol-planning-ut-and-austin-college-celebrations',
    title: 'Graduation Party Alcohol Planning: UT & Austin Celebrations',
    description: 'Plan the perfect UT graduation party! Alcohol delivery, Lake Travis cruises, and celebration tips for Austin college grads.',
    publishDate: '2025-02-01',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-16_1760080740020.jpg',
    keywords: ['UT graduation party', 'Austin college graduation', 'graduation alcohol delivery', 'Lake Travis graduation cruise']
  },

  'blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide': {
    slug: 'blogs/lake-travis-boat-party-logistics-complete-planning-and-coordination-guide',
    title: 'Lake Travis Boat Party Logistics: Complete Planning Guide',
    description: 'Master Lake Travis boat party logistics! Complete planning checklist, coordination tips, and timeline for stress-free celebrations.',
    publishDate: '2025-02-05',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-20_1760080740021.jpg',
    keywords: ['Lake Travis party logistics', 'boat party planning', 'Lake Travis coordination', 'party boat checklist Austin']
  },

  'blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide': {
    slug: 'blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide',
    title: 'Lake Travis Boat Party Regulations: Legal Compliance Guide',
    description: 'Understand Lake Travis boat party regulations. TABC compliance, safety requirements, and what Premier Party Cruises handles for you.',
    publishDate: '2025-02-08',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-24_1760080807866.jpg',
    keywords: ['Lake Travis regulations', 'boat party legal requirements', 'TABC compliance boat', 'Lake Travis safety rules']
  },

  'blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises': {
    slug: 'blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises',
    title: 'Lake Travis Boat Safety & Maintenance Standards',
    description: '15+ years. 150,000+ guests. Zero safety incidents. Discover our industry-leading boat safety and maintenance standards on Lake Travis.',
    publishDate: '2025-02-10',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/clever-girl-1-lake-travis-party-boat.jpg',
    keywords: ['Lake Travis boat safety', 'party cruise maintenance', 'USCG licensed captains', 'boat safety inspections', 'Premier Party Cruises safety record']
  },

  'blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests': {
    slug: 'blogs/lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
    title: 'Lake Travis Party Boat Rentals: Large Group Events Guide (20+)',
    description: 'Plan large group boat parties on Lake Travis! Guide for 20-75 guests with boat options, pricing, and coordination tips.',
    publishDate: '2025-02-12',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-32_1760080807868.jpg',
    keywords: ['large group boat rental', 'Lake Travis 20+ guests', 'party boat big groups', 'Austin group events boat']
  },

  'blogs/party-alcohol-safety-in-austin-responsible-service-and-guest-well-being': {
    slug: 'blogs/party-alcohol-safety-in-austin-responsible-service-and-guest-well-being',
    title: 'Party Alcohol Safety Austin: Responsible Service Guide',
    description: 'Ensure guest safety at Austin parties. Responsible alcohol service, BYOB boat tips, and guest well-being best practices.',
    publishDate: '2025-02-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-36_1760080807868.jpg',
    keywords: ['alcohol safety Austin', 'responsible service', 'BYOB safety tips', 'party guest well-being']
  },

  'blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options': {
    slug: 'blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options',
    title: 'Integrated Event Services: Austin Party Planning Comparison',
    description: 'Compare DIY vs integrated event services in Austin. Save 10+ hours with Party On Delivery + Premier Party Cruises.',
    publishDate: '2025-02-18',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/@capitalcityshots-40_1760080807869.jpg',
    keywords: ['integrated event services', 'Austin party planning comparison', 'DIY vs professional', 'Party On Delivery Premier']
  },

  'blogs/why-choose-austin-bachelor-party': {
    slug: 'blogs/why-choose-austin-bachelor-party',
    title: 'Why Choose Austin for Your Bachelor Party: Top 10 Reasons',
    description: 'Discover the top 10 reasons Austin is perfect for bachelor parties. Lake Travis boats, world-class BBQ, epic nightlife, and more.',
    publishDate: '2025-02-20',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['Austin bachelor party', 'why Austin bachelor party', 'Lake Travis bachelor', 'Austin BBQ bachelor party', 'Austin nightlife bachelor']
  },

  'blogs/austin-bachelor-party-january': {
    slug: 'blogs/austin-bachelor-party-january',
    title: 'Austin Bachelor Party in January | Winter Lake Travis Guide',
    description: 'Plan an Austin bachelor party in January. Winter Lake Travis boat rentals, mild weather tips, and off-season pricing advantages.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['Austin bachelor party January', 'winter bachelor party', 'Lake Travis winter', 'off-season boat rental']
  },

  'blogs/austin-bachelor-party-march': {
    slug: 'blogs/austin-bachelor-party-march',
    title: 'Austin Bachelor Party in March | SXSW Season Lake Travis',
    description: 'Plan an Austin bachelor party in March during SXSW. Spring Lake Travis boat rentals, live music, and perfect weather for celebrations.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['Austin bachelor party March', 'SXSW bachelor party', 'spring Lake Travis', 'March boat rental Austin']
  },

  'blogs/austin-bachelor-party-may': {
    slug: 'blogs/austin-bachelor-party-may',
    title: 'Austin Bachelor Party in May | Peak Season Lake Travis',
    description: 'Plan an Austin bachelor party in May. Perfect weather, peak season Lake Travis boat rentals, and unforgettable celebrations.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['Austin bachelor party May', 'spring bachelor party', 'Lake Travis May', 'peak season boat rental']
  },

  'blogs/austin-bachelor-party-july': {
    slug: 'blogs/austin-bachelor-party-july',
    title: 'Austin Bachelor Party in July | Summer Lake Travis Guide',
    description: 'Plan an Austin bachelor party in July. Summer Lake Travis boat parties, 4th of July celebrations, and hot weather party tips.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['Austin bachelor party July', 'summer bachelor party', 'Lake Travis July', '4th of July boat party']
  },

  'blogs/austin-bachelor-party-september': {
    slug: 'blogs/austin-bachelor-party-september',
    title: 'Austin Bachelor Party in September | Fall Lake Travis',
    description: 'Plan an Austin bachelor party in September. Fall Lake Travis boat rentals, cooler weather, and Labor Day weekend celebrations.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['Austin bachelor party September', 'fall bachelor party', 'Lake Travis September', 'Labor Day boat party']
  },

  'blogs/austin-bachelor-party-november': {
    slug: 'blogs/austin-bachelor-party-november',
    title: 'Austin Bachelor Party in November | Fall Lake Travis Guide',
    description: 'Plan an Austin bachelor party in November. Mild fall weather, off-peak Lake Travis pricing, and perfect celebration conditions.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['Austin bachelor party November', 'fall bachelor party', 'Lake Travis November', 'Thanksgiving weekend boat']
  },

  'blogs/austin-bachelorette-party-february': {
    slug: 'blogs/austin-bachelorette-party-february',
    title: 'Austin Bachelorette Party in February | Valentine\'s Season',
    description: 'Plan an Austin bachelorette party in February. Valentine\'s themed celebrations, mild weather Lake Travis boat rentals.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['Austin bachelorette party February', 'Valentine bachelorette', 'Lake Travis February', 'winter bachelorette Austin']
  },

  'blogs/austin-bachelorette-party-april': {
    slug: 'blogs/austin-bachelorette-party-april',
    title: 'Austin Bachelorette Party in April | Spring Wildflowers',
    description: 'Plan an Austin bachelorette party in April. Spring wildflowers, perfect weather, and beautiful Lake Travis boat cruises.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['Austin bachelorette party April', 'spring bachelorette', 'Lake Travis April', 'wildflower season Austin']
  },

  'blogs/austin-bachelorette-party-june': {
    slug: 'blogs/austin-bachelorette-party-june',
    title: 'Austin Bachelorette Party in June | Summer Lake Travis',
    description: 'Plan an Austin bachelorette party in June. Peak wedding season, summer Lake Travis cruises, and unforgettable celebrations.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['Austin bachelorette party June', 'summer bachelorette', 'Lake Travis June', 'wedding season Austin']
  },

  'blogs/austin-bachelorette-party-august': {
    slug: 'blogs/austin-bachelorette-party-august',
    title: 'Austin Bachelorette Party in August | Hot Summer Guide',
    description: 'Plan an Austin bachelorette party in August. Beat the heat on Lake Travis, refreshing boat parties, and summer celebration tips.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['Austin bachelorette party August', 'summer bachelorette', 'Lake Travis August', 'hot weather boat party']
  },

  'blogs/austin-bachelorette-party-october': {
    slug: 'blogs/austin-bachelorette-party-october',
    title: 'Austin Bachelorette Party in October | Fall Celebration',
    description: 'Plan an Austin bachelorette party in October. Beautiful fall weather, Lake Travis scenic cruises, and Halloween-themed fun.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['Austin bachelorette party October', 'fall bachelorette', 'Lake Travis October', 'Halloween bachelorette']
  },

  'blogs/austin-bachelorette-party-december': {
    slug: 'blogs/austin-bachelorette-party-december',
    title: 'Austin Bachelorette Party in December | Holiday Season',
    description: 'Plan an Austin bachelorette party in December. Holiday-themed celebrations, mild winter weather, and festive Lake Travis cruises.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['Austin bachelorette party December', 'holiday bachelorette', 'Lake Travis December', 'winter bachelorette Austin']
  },

  'blogs/epic-bachelor-party-austin-ultimate-guide': {
    slug: 'blogs/epic-bachelor-party-austin-ultimate-guide',
    title: 'Epic Bachelor Party Austin TX | Ultimate Planning Guide',
    description: 'Plan an epic bachelor party in Austin TX. Complete guide to Lake Travis boats, nightlife, BBQ, activities. 15+ years experience.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['epic bachelor party Austin', 'ultimate bachelor party guide', 'Austin bachelor party planning', 'Lake Travis bachelor', 'Austin nightlife bachelor']
  },

  'blogs/epic-bachelorette-party-austin-ultimate-guide': {
    slug: 'blogs/epic-bachelorette-party-austin-ultimate-guide',
    title: 'Epic Bachelorette Party Austin TX | Ultimate Guide',
    description: 'Plan an epic bachelorette party in Austin TX. Complete guide to Lake Travis cruises, spas, nightlife. 15+ years, 150,000+ guests.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['epic bachelorette party Austin', 'ultimate bachelorette guide', 'Austin bachelorette planning', 'Lake Travis bachelorette', 'Austin nightlife bachelorette']
  },

  'blogs/how-to-throw-great-bachelor-party-austin': {
    slug: 'blogs/how-to-throw-great-bachelor-party-austin',
    title: 'How to Throw a Great Bachelor Party in Austin | Complete Guide',
    description: 'Learn how to throw an unforgettable bachelor party in Austin. Complete planning guide with Lake Travis boats, nightlife, budget tips. 15+ years experience.',
    publishDate: '2025-10-03',
    modifiedDate: '2025-12-16',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/bachelor-party-group-guys-hero-compressed.webp',
    keywords: ['how to throw bachelor party Austin', 'Austin bachelor party guide', 'bachelor party planning', 'Lake Travis bachelor party', 'Austin bachelor weekend']
  },

  'blogs/how-to-throw-great-bachelorette-party-austin': {
    slug: 'blogs/how-to-throw-great-bachelorette-party-austin',
    title: 'How to Throw a Great Bachelorette Party in Austin | Complete Guide',
    description: 'Learn how to throw an unforgettable bachelorette party in Austin. Complete planning guide with Lake Travis boats, nightlife, spa ideas. 15+ years experience.',
    publishDate: '2025-10-03',
    modifiedDate: '2025-12-16',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/dancing-party-scene.webp',
    keywords: ['how to throw bachelorette party Austin', 'Austin bachelorette party guide', 'bachelorette party planning', 'Lake Travis bachelorette', 'Austin bachelorette weekend']
  },

  'blogs/rehearsal-dinner-boat-alcohol-delivery-unique-wedding-weekend-experiences': {
    slug: 'blogs/rehearsal-dinner-boat-alcohol-delivery-unique-wedding-weekend-experiences',
    title: 'Rehearsal Dinner Boat Lake Travis | Wedding Weekend Guide',
    description: 'Host your rehearsal dinner on Lake Travis. Unique wedding weekend experiences with private boat rentals and alcohol delivery options.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/clever-girl-1-lake-travis-party-boat.jpg',
    keywords: ['rehearsal dinner boat', 'Lake Travis wedding', 'wedding weekend Austin', 'rehearsal dinner venue', 'unique wedding experiences']
  },

  'blogs/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties': {
    slug: 'blogs/lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties',
    title: 'Lake Travis Weather Guide | Seasonal Boat Party Planning',
    description: 'Plan perfect Lake Travis boat parties year-round. Seasonal weather guide, best months, and tips for all-weather celebrations.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg',
    keywords: ['Lake Travis weather', 'seasonal boat party', 'Austin weather planning', 'Lake Travis best months', 'year-round boating Austin']
  },

  'blogs/why-choose-austin-bachelorette-party': {
    slug: 'blogs/why-choose-austin-bachelorette-party',
    title: 'Why Choose Austin for Your Bachelorette Party: Top 10 Reasons',
    description: 'Discover the top 10 reasons Austin is perfect for bachelorette parties. Lake Travis boats, world-class food, legendary nightlife, and more.',
    publishDate: '2025-02-20',
    modifiedDate: '2025-12-15',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg',
    keywords: ['Austin bachelorette party', 'why Austin bachelorette', 'Lake Travis bachelorette', 'Austin nightlife bachelorette', 'bachelorette party ideas']
  },

  'blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations': {
    slug: 'blogs/integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations',
    title: 'Integrated Austin Event Services: Alcohol Delivery & Boat Rentals',
    description: 'Planning an event in Austin? Discover how Premier Party Cruises offers seamless Lake Travis boat rentals for bachelor/bachelorette parties, corporate events, weddings, and more.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-15',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/atx-disco-cruise-party.webp',
    keywords: ['Austin event services', 'Lake Travis party planning', 'Austin party boat rental', 'bachelor party Austin', 'bachelorette party Austin', 'corporate events Austin']
  },

  // CORPORATE EVENTS (13 pages)
  'blogs/all-inclusive-corporate-packages': {
    slug: 'blogs/all-inclusive-corporate-packages',
    title: 'All-Inclusive Corporate Packages Lake Travis',
    description: 'Corporate event packages on Lake Travis. Catering, DJ, photographer included. Team building and celebrations. 15+ years serving Austin companies.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['corporate packages Lake Travis', 'all-inclusive corporate events', 'Austin team building', 'company celebrations']
  },

  'blogs/austin-best-corporate-events': {
    slug: 'blogs/austin-best-corporate-events',
    title: 'Best Corporate Events Austin | 10-100 Guests',
    description: 'Host the best corporate events in Austin on Lake Travis. From intimate team outings to large company celebrations. Perfect venue for 10-100 guests.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['best corporate events Austin', 'Lake Travis corporate venue', 'team outings Austin', 'company celebrations']
  },

  'blogs/austin-suburbs-corporate-events': {
    slug: 'blogs/austin-suburbs-corporate-events',
    title: 'Austin Suburbs Corporate Events | Easy Access',
    description: 'Corporate events near Austin suburbs. Round Rock, Cedar Park, Pflugerville companies love Lake Travis boat parties. Easy access, stress-free planning.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Austin suburbs corporate events', 'Round Rock company events', 'Cedar Park boat parties', 'Pflugerville corporate']
  },

  'blogs/company-holiday-party-lake-travis': {
    slug: 'blogs/company-holiday-party-lake-travis',
    title: 'Company Holiday Party Lake Travis | Book Now',
    description: 'Host your company holiday party on Lake Travis! Unique venue for Christmas parties, year-end celebrations. All-inclusive packages available.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: ['company holiday party Lake Travis', 'Christmas party boat', 'year-end celebration Austin', 'corporate holiday event']
  },

  'blogs/company-party-10-people-austin': {
    slug: 'blogs/company-party-10-people-austin',
    title: 'Company Party 10 People Austin | Small Groups',
    description: 'Perfect company party for 10 people in Austin. Intimate Lake Travis boat rental for small team outings and celebrations. Book today!',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['company party 10 people', 'small team outing Austin', 'intimate boat rental', 'small group celebration']
  },

  'blogs/company-party-25-people-austin': {
    slug: 'blogs/company-party-25-people-austin',
    title: 'Company Party 25 People Austin | Mid-Size',
    description: 'Company party for 25 people on Lake Travis. Ideal mid-size corporate event venue in Austin. All-inclusive options available.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['company party 25 people', 'mid-size corporate event', 'Lake Travis venue', 'Austin team party']
  },

  'blogs/company-party-50-people-austin': {
    slug: 'blogs/company-party-50-people-austin',
    title: 'Company Party 50 People Austin | Large Groups',
    description: 'Host a company party for 50 people in Austin. Large group Lake Travis boat party with premium amenities. Perfect for team building.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: ['company party 50 people', 'large group boat party', 'Austin corporate event', 'team building Lake Travis']
  },

  'blogs/company-party-75-people-austin': {
    slug: 'blogs/company-party-75-people-austin',
    title: 'Company Party 75 People Austin | Big Events',
    description: 'Company party for 75 people on our flagship Lake Travis boat. Austin\'s premier venue for large corporate celebrations and events.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: ['company party 75 people', 'flagship boat Austin', 'large corporate celebration', 'big group events']
  },

  'blogs/dallas-to-lake-travis-corporate': {
    slug: 'blogs/dallas-to-lake-travis-corporate',
    title: 'Dallas to Lake Travis Corporate Events | DFW',
    description: 'Dallas companies love Lake Travis corporate events! Easy 3-hour drive from DFW. Unique venue for team building and celebrations.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Dallas corporate events', 'DFW to Lake Travis', 'Dallas team building', 'Texas corporate venue']
  },

  'blogs/destination-austin-offsite-retreats': {
    slug: 'blogs/destination-austin-offsite-retreats',
    title: 'Destination Austin Offsite Retreats | Unique',
    description: 'Plan destination offsite retreats in Austin on Lake Travis. Unique team building venue for out-of-town companies. Easy coordination.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['destination offsite Austin', 'corporate retreat Lake Travis', 'team building retreat', 'out-of-town company events']
  },

  'blogs/quarterly-outings-lake-travis-make-routine-company-events-easy': {
    slug: 'blogs/quarterly-outings-lake-travis-make-routine-company-events-easy',
    title: 'Quarterly Outings Lake Travis | Easy Planning',
    description: 'Make quarterly company outings easy with Lake Travis boat parties. Recurring corporate events made simple. Book your next team outing today.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['quarterly outings Lake Travis', 'recurring corporate events', 'team outing planning', 'company boat parties']
  },

  'blogs/why-austin-companies-choose-premier': {
    slug: 'blogs/why-austin-companies-choose-premier',
    title: 'Why Austin Companies Choose Premier Cruises',
    description: 'Discover why Austin\'s top companies choose Premier Party Cruises for corporate events. 15+ years experience, perfect safety record.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['why choose Premier', 'Austin corporate boat', 'trusted party cruises', 'corporate event experience']
  },

  'blogs/large-group-events-lake-travis': {
    slug: 'blogs/large-group-events-lake-travis',
    title: 'Large Group Events Lake Travis | 30-75 Guests',
    description: 'Large group events on Lake Travis for 30-75 guests. Austin\'s premier venue for corporate celebrations and big group outings.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: ['large group events Lake Travis', 'big group boat party', 'Austin large gatherings', 'corporate group outings']
  },

  // INDUSTRY-SPECIFIC (7 pages)
  'blogs/construction-trades-boat-parties-austin': {
    slug: 'blogs/construction-trades-boat-parties-austin',
    title: 'Construction & Trades Boat Parties Austin',
    description: 'Construction companies love Lake Travis boat parties! Celebrate project completions, safety milestones, and team achievements on the water.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['construction boat parties Austin', 'trades team celebration', 'project completion party', 'safety milestone event']
  },

  'blogs/finance-law-firms-boat-parties-austin': {
    slug: 'blogs/finance-law-firms-boat-parties-austin',
    title: 'Finance & Law Firm Boat Parties Austin',
    description: 'Austin finance and law firms choose Lake Travis for client entertainment and team celebrations. Professional yet memorable venue.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['finance firm boat party', 'law firm events Austin', 'client entertainment Lake Travis', 'professional celebrations']
  },

  'blogs/healthcare-wellness-boat-parties-austin': {
    slug: 'blogs/healthcare-wellness-boat-parties-austin',
    title: 'Healthcare & Wellness Boat Parties Austin',
    description: 'Healthcare and wellness companies celebrate on Lake Travis. Staff appreciation, medical conferences, wellness retreats on the water.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['healthcare boat parties Austin', 'wellness retreat Lake Travis', 'staff appreciation medical', 'healthcare team events']
  },

  'blogs/marketing-creative-agencies-boat-austin': {
    slug: 'blogs/marketing-creative-agencies-boat-austin',
    title: 'Marketing & Creative Agency Events Austin',
    description: 'Austin marketing and creative agencies host team events on Lake Travis. Inspire creativity with unique boat party venue.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['marketing agency boat party', 'creative team events Austin', 'agency celebration Lake Travis', 'creative retreat']
  },

  'blogs/real-estate-client-entertainment-boat-austin': {
    slug: 'blogs/real-estate-client-entertainment-boat-austin',
    title: 'Real Estate Client Entertainment Austin',
    description: 'Austin real estate professionals entertain clients on Lake Travis. Impressive venue for closings, client appreciation events.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['real estate client entertainment', 'Austin realtor events', 'closing celebration boat', 'client appreciation Lake Travis']
  },

  'blogs/small-business-boat-parties-austin': {
    slug: 'blogs/small-business-boat-parties-austin',
    title: 'Small Business Boat Parties Austin | Teams',
    description: 'Austin small business owners choose Lake Travis for team celebrations. Affordable boat party packages for growing companies.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['small business boat party', 'affordable corporate events', 'Austin startup celebration', 'team party Lake Travis']
  },

  'blogs/tech-companies-boat-parties-austin': {
    slug: 'blogs/tech-companies-boat-parties-austin',
    title: 'Tech Company Boat Parties Austin | Startups',
    description: 'Austin tech companies and startups celebrate on Lake Travis. Product launches, team building, investor events on the water.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['tech company boat party Austin', 'startup celebration Lake Travis', 'product launch event', 'investor events boat']
  },

  // ALCOHOL/BEVERAGE GUIDES (16 pages)
  'blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations': {
    slug: 'blogs/austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations',
    title: 'Bachelorette Weekend Alcohol Timeline Austin',
    description: 'Day-by-day alcohol timeline for Austin bachelorette weekends. Smart drinking strategy for multi-day celebrations on Lake Travis.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['bachelorette alcohol timeline', 'drinking strategy Austin', 'multi-day celebration tips', 'bachelorette weekend planning']
  },

  'blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location': {
    slug: 'blogs/austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location',
    title: 'Austin Wedding Venue Alcohol Policies Guide',
    description: 'Navigate Austin wedding venue alcohol policies. Delivery solutions for Lake Travis, Hill Country, and downtown locations.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Austin wedding alcohol policies', 'venue delivery solutions', 'Hill Country wedding alcohol', 'Lake Travis wedding']
  },

  'blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions': {
    slug: 'blogs/bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions',
    title: 'Bachelorette Alcohol Emergency Kit Austin',
    description: 'Last-minute alcohol delivery solutions for Austin bachelorette parties. Emergency kit essentials and quick delivery options.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['bachelorette alcohol emergency', 'last-minute delivery Austin', 'party kit essentials', 'quick alcohol delivery']
  },

  'blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank': {
    slug: 'blogs/budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank',
    title: 'Budget Bachelorette Alcohol Guide Austin',
    description: 'Budget-friendly alcohol guide for Austin bachelorette parties. Maximum fun without breaking the bank. BYOB tips included.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['budget bachelorette alcohol', 'affordable party tips', 'BYOB bachelorette Austin', 'budget party planning']
  },

  'blogs/client-entertainment-alcohol-strategy-impressing-without-overdoing-it': {
    slug: 'blogs/client-entertainment-alcohol-strategy-impressing-without-overdoing-it',
    title: 'Client Entertainment Alcohol Strategy Guide',
    description: 'Professional alcohol strategy for client entertainment in Austin. Impress without overdoing it. Corporate event beverage tips.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['client entertainment alcohol', 'professional beverage strategy', 'corporate event drinks', 'business entertainment tips']
  },

  'blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy': {
    slug: 'blogs/cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy',
    title: 'Cocktail Kits vs Bottles | Party Strategy',
    description: 'Cocktail kits vs individual bottles for bachelorette parties. Smart alcohol strategy for Lake Travis boat parties and events.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['cocktail kits bachelorette', 'alcohol strategy', 'boat party drinks', 'party beverage planning']
  },

  'blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration': {
    slug: 'blogs/conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration',
    title: 'SXSW ACL After Party Alcohol Coordination',
    description: 'Conference after party alcohol coordination for SXSW, ACL, and Austin events. Seamless integration with Lake Travis boat parties.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['SXSW after party', 'ACL event coordination', 'Austin conference party', 'event alcohol planning']
  },

  'blogs/corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events': {
    slug: 'blogs/corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events',
    title: 'Corporate Team Building Alcohol Planning',
    description: 'Alcohol coordination for Lake Travis corporate team building. Professional event planning with beverage logistics handled.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['corporate team building alcohol', 'professional event beverages', 'Lake Travis corporate planning', 'business event coordination']
  },

  'blogs/executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding': {
    slug: 'blogs/executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding',
    title: 'Executive Retreat Alcohol Planning Austin',
    description: 'Executive retreat alcohol planning in Austin. Balance professionalism with team bonding on Lake Travis corporate events.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['executive retreat alcohol', 'professional team bonding', 'Lake Travis retreat planning', 'corporate executive events']
  },

  'blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning': {
    slug: 'blogs/holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning',
    title: 'Holiday Office Party Alcohol Delivery Austin',
    description: 'Stress-free alcohol delivery for Austin holiday office parties. Corporate celebration planning made easy. Book now!',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: ['holiday office party alcohol', 'corporate celebration delivery', 'Austin holiday event', 'stress-free party planning']
  },

  'blogs/holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations': {
    slug: 'blogs/holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations',
    title: 'Holiday Party Alcohol Themes Austin Guide',
    description: 'Holiday party alcohol themes for New Year\'s, 4th of July, and Austin celebrations. Seasonal boat party beverage ideas.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-2.jpg',
    keywords: ['holiday party alcohol themes', 'New Years boat party', '4th of July Lake Travis', 'seasonal celebration drinks']
  },

  'blogs/instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination': {
    slug: 'blogs/instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination',
    title: 'Instagram-Worthy Bachelorette Cocktails',
    description: 'Instagram-worthy bachelorette party cocktail recipes and delivery coordination. Picture-perfect drinks for Lake Travis parties.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['Instagram bachelorette cocktails', 'picture-perfect drinks', 'party drink recipes', 'Lake Travis cocktails']
  },

  'blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties': {
    slug: 'blogs/lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties',
    title: 'Bachelor Party Alcohol Delivery Lake Travis',
    description: 'Complete alcohol delivery guide for Lake Travis bachelor parties. BYOB coordination for boat parties. Everything you need to know.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['bachelor party alcohol delivery', 'Lake Travis BYOB guide', 'boat party alcohol coordination', 'bachelor party drinks']
  },

  'blogs/lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats': {
    slug: 'blogs/lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats',
    title: 'Lake Travis Boat Alcohol Laws | What to Know',
    description: 'Lake Travis alcohol laws for bachelorette parties. What you can and can\'t bring on boats. BYOB rules and regulations explained.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['Lake Travis alcohol laws', 'boat BYOB rules', 'bachelorette party regulations', 'Texas boating alcohol laws']
  },

  'blogs/outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination': {
    slug: 'blogs/outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination',
    title: 'Outdoor Wedding Alcohol Logistics Austin',
    description: 'Outdoor wedding alcohol logistics for Hill Country and Lake Travis. Coordination guide for Texas waterfront celebrations.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['outdoor wedding alcohol logistics', 'Hill Country wedding', 'Lake Travis wedding coordination', 'Texas waterfront wedding']
  },

  'blogs/pool-party-alcohol-coordination-summer-event-planning-in-austin-heat': {
    slug: 'blogs/pool-party-alcohol-coordination-summer-event-planning-in-austin-heat',
    title: 'Pool Party Alcohol Coordination Austin Heat',
    description: 'Summer pool party alcohol coordination in Austin heat. Event planning tips for hot weather celebrations on Lake Travis.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg',
    keywords: ['pool party alcohol Austin', 'summer event planning', 'hot weather celebration', 'Lake Travis summer party']
  },

  // BOAT PARTY GUIDES (11 pages)
  'blogs/accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests': {
    slug: 'blogs/accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests',
    title: 'Accessible Lake Travis Boat Parties | ADA',
    description: 'Accessible boat parties on Lake Travis. Inclusive event planning for all guests. ADA considerations and accommodations guide.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['accessible boat parties', 'ADA Lake Travis', 'inclusive event planning', 'accessibility accommodations']
  },

  'blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations': {
    slug: 'blogs/austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations',
    title: 'Austin Bachelorette Boats Lake Travis Guide',
    description: 'Austin bachelorette party boats on Lake Travis. Adventures for unforgettable celebrations. Book the perfect party boat today!',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['Austin bachelorette boats', 'Lake Travis party boat', 'bachelorette adventures', 'unforgettable celebrations']
  },

  'blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations': {
    slug: 'blogs/creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations',
    title: 'Creative Lake Travis Party Themes | Ideas',
    description: 'Creative boat party themes for Lake Travis celebrations. Unique ideas for memorable bachelor, bachelorette, and corporate events.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['Lake Travis party themes', 'creative boat party ideas', 'unique celebration themes', 'memorable event ideas']
  },

  'blogs/lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events': {
    slug: 'blogs/lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events',
    title: 'Lake Travis Boat Party Catering Guide',
    description: 'Catering coordination for Lake Travis boat parties. Food and beverage planning for perfect events. Local vendor recommendations.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Lake Travis catering', 'boat party food', 'event catering coordination', 'Austin catering vendors']
  },

  'blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning': {
    slug: 'blogs/lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning',
    title: 'Lake Travis Boat Party Costs | Price Guide',
    description: 'Complete Lake Travis boat party pricing guide. Budget planning for bachelor, bachelorette, and corporate events. Transparent costs.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Lake Travis boat party costs', 'pricing guide', 'budget planning', 'transparent boat rental pricing']
  },

  'blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events': {
    slug: 'blogs/lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events',
    title: 'Lake Travis Boat Entertainment & Amenities',
    description: 'Entertainment and amenities for Lake Travis boat parties. Activities for unforgettable events including DJ, floats, and more.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['Lake Travis entertainment', 'boat party amenities', 'DJ floats activities', 'unforgettable event features']
  },

  'blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events': {
    slug: 'blogs/lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events',
    title: 'Lake Travis Boat Party Insurance Guide',
    description: 'Understanding insurance and liability for Lake Travis boat parties. Event coverage explained for worry-free celebrations.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['boat party insurance', 'Lake Travis liability', 'event coverage', 'worry-free celebrations']
  },

  'blogs/lake-travis-boat-party-music-sound-systems-and-entertainment-coordination': {
    slug: 'blogs/lake-travis-boat-party-music-sound-systems-and-entertainment-coordination',
    title: 'Lake Travis Boat Party Music & Sound Guide',
    description: 'Music and sound system coordination for Lake Travis boat parties. Entertainment planning for the perfect party atmosphere.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['boat party music', 'Lake Travis sound systems', 'entertainment coordination', 'party atmosphere planning']
  },

  'blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing': {
    slug: 'blogs/lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing',
    title: 'Lake Travis Boat Party Packages | Options',
    description: 'Comprehensive guide to Lake Travis boat party packages. All options and pricing for bachelor, bachelorette, and corporate events.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Lake Travis party packages', 'boat rental options', 'pricing guide', 'event package comparison']
  },

  'blogs/lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water': {
    slug: 'blogs/lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water',
    title: 'Lake Travis Boat Party Photography Tips',
    description: 'Capture perfect memories at Lake Travis boat parties. Photography tips and professional photographer recommendations.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['boat party photography', 'Lake Travis photo tips', 'professional photographer', 'capturing memories']
  },

  'blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials': {
    slug: 'blogs/lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials',
    title: 'Lake Travis Boat Party Reviews | Real Stories',
    description: 'Real customer reviews and testimonials from Lake Travis boat parties. Authentic experiences from 150,000+ guests served.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Lake Travis reviews', 'boat party testimonials', 'customer experiences', 'real party stories']
  },

  // SAFETY & QUALITY (3 pages)
  'blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises': {
    slug: 'blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises',
    title: 'Lake Travis Boat Safety Guidelines | Tips',
    description: 'Essential safety guidelines for Lake Travis party cruises. Safe boating tips and what to expect on Premier Party Cruises.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Lake Travis boat safety', 'party cruise guidelines', 'safe boating tips', 'Premier safety standards']
  },

  'blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart': {
    slug: 'blogs/safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart',
    title: 'Premier Safety Record & First Aid Training',
    description: 'Premier Party Cruises safety record and first aid training. 15+ years with perfect safety. What sets us apart on Lake Travis.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Premier safety record', 'first aid training', 'perfect safety history', 'Lake Travis trusted operator']
  },

  // SPECIALTY CONTENT (5 pages)
  'blogs/austin-bachelor-party-ideas': {
    slug: 'blogs/austin-bachelor-party-ideas',
    title: 'Austin Bachelor Party Ideas | Best Activities',
    description: 'Top Austin bachelor party ideas and activities. Lake Travis boat parties, nightlife, golf, and more. Plan the ultimate celebration!',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Austin bachelor party ideas', 'best activities', 'Lake Travis bachelor', 'nightlife golf celebration']
  },

  'blogs/disco-cruise-fashion-part-1': {
    slug: 'blogs/disco-cruise-fashion-part-1',
    title: 'ATX Disco Cruise Fashion Guide | What to Wear',
    description: 'What to wear to the ATX Disco Cruise on Lake Travis. Fashion guide and outfit ideas for Austin\'s hottest party boat experience.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/disco-dance-floor.jpg',
    keywords: ['ATX Disco Cruise fashion', 'what to wear boat party', 'Lake Travis outfit ideas', 'party boat style guide']
  },

  'blogs/employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party': {
    slug: 'blogs/employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party',
    title: 'Employee Appreciation Day Lake Travis Party',
    description: 'Reward your team with an easy all-inclusive boat party for Employee Appreciation Day. Lake Travis corporate celebrations made simple.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Employee Appreciation Day', 'team reward boat party', 'all-inclusive corporate event', 'Lake Travis celebration']
  },

  'blogs/lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion': {
    slug: 'blogs/lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion',
    title: 'Lake Travis Sunset Cruises | Romance & Events',
    description: 'Romantic sunset cruises on Lake Travis. Celebration options for anniversaries, proposals, and special occasions in Austin.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/group-swimming-lilypad.jpg',
    keywords: ['Lake Travis sunset cruise', 'romantic boat Austin', 'anniversary cruise', 'proposal venue Lake Travis']
  },

  'blogs/perfect-bachelor-party-itinerary-austin': {
    slug: 'blogs/perfect-bachelor-party-itinerary-austin',
    title: 'Perfect Austin Bachelor Party Itinerary',
    description: 'The perfect Austin bachelor party itinerary. Day-by-day guide with Lake Travis boat party, nightlife, and activities included.',
    publishDate: '2024-01-15',
    modifiedDate: '2025-01-05',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/media/schema/hero-boat-1.jpg',
    keywords: ['Austin bachelor party itinerary', 'day-by-day guide', 'Lake Travis bachelor', 'nightlife activities plan']
  }
};

export function getBlogMetadata(pathname: string): BlogMetadata | null {
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return blogMetadataRegistry[cleanPath] || null;
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(blogMetadataRegistry);
}
