export interface InternalLink {
  slug: string;
  label: string;
  description?: string;
}

export const blogInternalLinks: InternalLink[] = [
  {
    slug: '/atx-disco-cruise',
    label: 'ATX Disco Cruise',
    description: 'Austin\'s premier multi-group party boat experience on Lake Travis',
  },
  {
    slug: '/bachelor-party',
    label: 'Bachelor Party',
    description: 'Bachelor party packages and cruises on Lake Travis',
  },
  {
    slug: '/bachelorette-party',
    label: 'Bachelorette Party',
    description: 'Bachelorette party packages and Lake Travis experiences',
  },
  {
    slug: '/combined-bachelor-bachelorette',
    label: 'Combined Bachelor/Bachelorette',
    description: 'Joint bachelor and bachelorette party cruises',
  },
  {
    slug: '/private-cruises',
    label: 'Private Cruises',
    description: 'Private boat rentals and charters on Lake Travis',
  },
  {
    slug: '/contact',
    label: 'Contact',
    description: 'Get a free quote or contact us',
  },
  {
    slug: '/gallery',
    label: 'Gallery',
    description: 'Photos from past party cruises',
  },
  {
    slug: '/testimonials-faq',
    label: 'Testimonials & FAQ',
    description: 'Customer reviews and frequently asked questions',
  },
  {
    slug: '/party-boat-austin',
    label: 'Party Boat Austin',
    description: 'Austin party boat rentals and cruises',
  },
  {
    slug: '/party-boat-lake-travis',
    label: 'Party Boat Lake Travis',
    description: 'Lake Travis party boat experiences',
  },
  {
    slug: '/corporate-events',
    label: 'Corporate Events',
    description: 'Team building and corporate party cruises',
  },
  {
    slug: '/birthday-parties',
    label: 'Birthday Parties',
    description: 'Birthday party cruises on Lake Travis',
  },
  {
    slug: '/',
    label: 'Home',
    description: 'Premier Party Cruises homepage',
  },
];

export function getLinkBySlug(slug: string): InternalLink | undefined {
  return blogInternalLinks.find(link => link.slug === slug);
}

export function getLinksByKeywords(keywords: string[]): InternalLink[] {
  return blogInternalLinks.filter(link =>
    keywords.some(keyword =>
      link.label.toLowerCase().includes(keyword.toLowerCase()) ||
      link.description?.toLowerCase().includes(keyword.toLowerCase())
    )
  );
}
