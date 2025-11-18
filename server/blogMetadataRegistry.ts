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
    title: '3-Day Austin Bachelorette Itinerary | The Ultimate Weekend Guide',
    description: 'Plan the perfect 3-day Austin bachelorette party! Expert itinerary from Lake Travis boat parties to 6th Street nightlife. 125,000+ celebrations. Book now!',
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
    description: 'Create the ultimate Austin bachelorette weekend with our premier guide. Lake Travis boat parties, top nightlife, activities. 15+ years, 125,000+ guests.',
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
    description: 'Discover the top 10 Austin bachelorette party ideas! From Lake Travis boat cruises to 6th Street nightlife. 15+ years experience, 125,000+ celebrations.',
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
    title: 'Budget Austin Bachelorette Party Guide | Affordable Lake Travis Fun',
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
    title: 'Luxury Austin Bachelorette Party | Premium Lake Travis Experience',
    description: 'Indulge in a luxury Austin bachelorette party with premium Lake Travis boat rentals, VIP service, and upscale experiences. 15+ years, 125,000+ guests.',
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
    title: 'Adventure Austin Bachelorette Party | Outdoor Activities & Lake Travis',
    description: 'Plan an adventure-filled Austin bachelorette party! Lake Travis water sports, outdoor activities, hiking. 15+ years experience, 125,000+ celebrations.',
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
    title: 'Austin Bachelorette Nightlife Guide | 6th Street & Rainey Street',
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
    description: 'Experience the legendary ATX Disco Cruise on Lake Travis! All-inclusive party boat with DJ, open bar packages, dance floor. 125,000+ guests served. Book now!',
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
    title: 'Holiday Celebrations on Lake Travis: Seasonal Boat Party Planning | Premier Party Cruises',
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
    title: 'Joint Bachelor Bachelorette Parties on Lake Travis | Premier Party Cruises',
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
    title: 'Lake Travis Wedding Boat Rentals: Unique Venues for Austin Celebrations | Premier Party Cruises',
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
    title: 'Must-Haves for the Perfect Austin Bachelorette Weekend | Premier Party Cruises',
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
    title: 'Top Spots & Tips for an Unforgettable Austin Bachelorette Party | Premier Party Cruises',
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
    title: 'First-Time Lake Travis Boat Rental: Essential Tips for Austin Party Planning',
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
    title: 'Birthday Party Boat Austin | Milestone Celebrations on Lake Travis',
    description: 'Celebrate milestone birthdays on Lake Travis! Austin\'s premier party boat rentals with BYOB, crew, and floats. 15+ years, 125,000+ guests served.',
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
    title: 'Lake Travis Boat Rentals Texas | Large Group Party Boats (20-75 Guests) Austin',
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
    title: 'Lake Travis Weather Planning | Seasonal Guide for Perfect Boat Parties',
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
    title: 'First-Time Lake Travis Boat Rental Guide | Essential Austin Party Planning Tips',
    description: 'Planning your first Lake Travis boat rental? Expert guide to choosing boats, safety, pricing, and Austin party planning. 15+ years experience, 125,000+ guests.',
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
  }
};

export function getBlogMetadata(pathname: string): BlogMetadata | null {
  const cleanPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return blogMetadataRegistry[cleanPath] || null;
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(blogMetadataRegistry);
}
