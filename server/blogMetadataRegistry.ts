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
    description: 'Plan the perfect 3-day Austin bachelorette party! Expert itinerary from Lake Travis boat parties to 6th Street nightlife. countless celebrations. Book now!',
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
    description: 'Create the ultimate Austin bachelorette weekend with our premier guide. Lake Travis boat parties, top nightlife, activities. 15+ years, countless guests.',
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
    description: 'Discover the top 10 Austin bachelorette party ideas! From Lake Travis boat cruises to 6th Street nightlife. 15+ years experience, countless celebrations.',
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
    description: 'Indulge in a luxury Austin bachelorette party with premium Lake Travis boat rentals, VIP service, and upscale experiences. 15+ years, countless guests.',
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
    description: 'Plan an adventure-filled Austin bachelorette party! Lake Travis water sports, outdoor activities, hiking. 15+ years experience, countless celebrations.',
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
    title: 'ATX Disco Cruise Experience: Austin\'s Ultimate Party Boat | Premier Party Cruises',
    description: 'Experience the legendary ATX Disco Cruise on Lake Travis! All-inclusive party boat with DJ, photographer, giant floats, dance floor. BYOB. countless guests served. Book now!',
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
    description: 'Celebrate milestone birthdays on Lake Travis! Austin\'s premier party boat rentals with BYOB, crew, and floats. 15+ years, countless guests served.',
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
    description: 'Planning your first Lake Travis boat rental? Expert guide to choosing boats, safety, pricing, and Austin party planning. 15+ years experience, countless guests.',
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
    description: 'Plan epic Lake Travis bachelor party boat rentals! Complete guide to boats, pricing, activities, and nightlife. 15+ years experience, countless celebrations.',
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
    description: '15+ years. countless guests. Zero safety incidents. Discover our industry-leading boat safety and maintenance standards on Lake Travis.',
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
    description: 'Plan an epic bachelorette party in Austin TX. Complete guide to Lake Travis cruises, spas, nightlife. 15+ years, countless guests.',
    publishDate: '2025-01-15',
    modifiedDate: '2025-12-09',
    author: 'Premier Party Cruises',
    heroImage: 'https://premierpartycruises.com/attached_assets/disco_fun_best2_1765193453547.jpg',
    keywords: ['epic bachelorette party Austin', 'ultimate bachelorette guide', 'Austin bachelorette planning', 'Lake Travis bachelorette', 'Austin nightlife bachelorette']
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
  }
};

export function getBlogMetadata(pathname: string): BlogMetadata | null {
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return blogMetadataRegistry[cleanPath] || null;
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(blogMetadataRegistry);
}
