export interface StaticBlogMetadata {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  heroImage: string;
  keywords: string[];
}

const STATIC_BLOG_METADATA: Record<string, StaticBlogMetadata> = {
  '/austin-bachelor-party-ideas': {
    slug: 'austin-bachelor-party-ideas',
    title: "Austin Bachelor Party Ideas: Top Things to Do for an Epic Guys' Weekend",
    description: "Discover the ultimate Austin bachelor party ideas! From Lake Travis party boats to 6th Street bars, BBQ joints, and outdoor adventures - plan the perfect Austin bachelor weekend.",
    publishDate: '2025-01-15',
    author: 'Premier Party Cruises',
    heroImage: '/attached_assets/@capitalcityshots-1_1760080740012.jpg',
    keywords: [
      'bachelor party austin',
      'austin bachelor weekend',
      'austin bachelor party ideas',
      'lake travis party boat',
      'austin bachelor activities',
      'atx disco cruise',
      'bachelor party boat rental austin',
      'things to do bachelor party austin',
    ],
  },
  '/lake-travis-bachelor-party-boats': {
    slug: 'lake-travis-bachelor-party-boats',
    title: 'Lake Travis Bachelor Party Boats | Austin Cruise',
    description: 'Discover why Lake Travis party boats are perfect for bachelor parties in Austin. Learn about the ATX Disco Cruise, private charters, BYOB options, and pro tips for an epic lake party.',
    publishDate: '2025-01-15',
    author: 'Premier Party Cruises',
    heroImage: '/attached_assets/atx-disco-cruise-party.webp',
    keywords: [
      'lake travis bachelor party',
      'lake travis party boat',
      'austin bachelor party boat rental',
      'atx disco cruise',
      'lake travis boat rental bachelor',
      'austin party cruise',
      'lake travis cruises',
      'bachelor party boat austin',
    ],
  },
  '/wedding-anniversary-celebration-ideas': {
    slug: 'wedding-anniversary-celebration-ideas',
    title: 'Wedding Anniversary Ideas | Lake Travis Boat',
    description: 'Celebrate your wedding anniversary on Lake Travis with romantic boat rentals and BYOB packages. Intimate cruises or group celebrations for milestone anniversaries.',
    publishDate: '2025-08-12',
    author: 'Premier Party Cruises Team',
    heroImage: '/attached_assets/party-atmosphere-1.webp',
    keywords: [
      'wedding anniversary',
      'anniversary celebration ideas',
      'lake travis anniversary',
      'romantic boat rental austin',
      'anniversary party boat',
      'milestone celebration',
      'anniversary cruise',
      'lake travis boat rental',
      'austin anniversary ideas',
      'romantic lake travis',
    ],
  },
};

export function isStaticBlogRoute(pathname: string): boolean {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  return STATIC_BLOG_METADATA.hasOwnProperty(normalizedPath);
}

export function getStaticBlogMetadata(pathname: string): StaticBlogMetadata | null {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  return STATIC_BLOG_METADATA[normalizedPath] || null;
}

export function getAllStaticBlogRoutes(): string[] {
  return Object.keys(STATIC_BLOG_METADATA);
}
