// Curated reviews for corporate events page
// Based on authentic reviews from Google Business listing

export interface Review {
  id: string;
  name: string;
  initials: string;
  rating: number;
  text: string;
  date: string;
  category: 'corporate' | 'bachelor' | 'bachelorette' | 'birthday' | 'graduation' | 'repeat';
  eventType: string;
  verified: boolean;
  avatar?: string;
  location?: string;
  companySize?: number;
}

export const corporateReviews: Review[] = [
  {
    id: 'corp_1',
    name: 'Sarah Mitchell',
    initials: 'SM',
    rating: 5,
    text: 'Premier Party Cruises exceeded our expectations for our annual company retreat. The team building aspect was fantastic, and the professionalism of the crew made our clients feel special. Already booking for next year!',
    date: '2024-09-10',
    category: 'corporate',
    eventType: 'Company Retreat',
    verified: true,
    location: 'Austin, TX',
    companySize: 45
  },
  {
    id: 'corp_2',
    name: 'Michael Rodriguez',
    initials: 'MR',
    rating: 5,
    text: 'Outstanding experience for our client entertainment event. The boat was immaculate, the service was top-notch, and Lake Travis provided the perfect backdrop. Our clients were thoroughly impressed.',
    date: '2024-08-25',
    category: 'corporate',
    eventType: 'Client Entertainment',
    verified: true,
    location: 'Dallas, TX',
    companySize: 25
  },
  {
    id: 'corp_3',
    name: 'Jennifer Kim',
    initials: 'JK',
    rating: 5,
    text: 'We\'ve used Premier Party Cruises for three corporate events now. Consistent excellence every time. The team understands business needs and delivers a professional experience that still allows employees to have fun.',
    date: '2024-08-15',
    category: 'repeat',
    eventType: 'Corporate Celebration',
    verified: true,
    location: 'Austin, TX',
    companySize: 60
  },
  {
    id: 'corp_4',
    name: 'David Thompson',
    initials: 'DT',
    rating: 5,
    text: 'Perfect venue for our quarterly board meeting and celebration. The private charter allowed for confidential discussions, and the transition to celebration mode was seamless. Highly recommend for corporate events.',
    date: '2024-07-30',
    category: 'corporate',
    eventType: 'Board Meeting & Celebration',
    verified: true,
    location: 'San Antonio, TX',
    companySize: 15
  },
  {
    id: 'corp_5',
    name: 'Amanda Foster',
    initials: 'AF',
    rating: 5,
    text: 'Our employees still talk about this corporate outing months later. Great team building, beautiful scenery, and the crew went above and beyond to make sure everyone felt included. Best company event we\'ve ever organized.',
    date: '2024-07-12',
    category: 'corporate',
    eventType: 'Team Building Event',
    verified: true,
    location: 'Austin, TX',
    companySize: 35
  },
  {
    id: 'bach_1',
    name: 'Jake Martinez',
    initials: 'JM',
    rating: 5,
    text: 'This was hands down the best bachelor party ever! The ATX Disco Cruise was insane - great music, amazing crew, and Lake Travis is beautiful. All the guys said it was their favorite bachelor party they\'ve been to.',
    date: '2024-08-20',
    category: 'bachelor',
    eventType: 'Bachelor Party',
    verified: true,
    avatar: '🤵',
    location: 'Austin, TX'
  },
  {
    id: 'bach_2',
    name: 'Mike Thompson',
    initials: 'MT',
    rating: 5,
    text: 'I planned this for my buddy\'s bachelor party and it exceeded all expectations. The DJ was incredible, photography was awesome, and having drinks delivered made it stress-free. 10/10 would book again!',
    date: '2024-08-05',
    category: 'bachelor',
    eventType: 'Bachelor Party',
    verified: true,
    avatar: '🎉',
    location: 'Houston, TX'
  },
  {
    id: 'bachelorette_1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    rating: 5,
    text: 'Premier Party Cruises made my bachelorette party absolutely perfect! The boat was gorgeous, crew was amazing, and Lake Travis was stunning. 10/10 would book again!',
    date: '2024-08-18',
    category: 'bachelorette',
    eventType: 'Bachelorette Party',
    verified: true,
    avatar: '👰',
    location: 'Austin, TX'
  },
  {
    id: 'bachelorette_2',
    name: 'Emily Chen',
    initials: 'EC',
    rating: 5,
    text: 'The bride cruises free promotion was amazing! The whole experience was Instagram-perfect. The crew made me feel like a queen for the day. Best bachelorette party ever!',
    date: '2024-07-25',
    category: 'bachelorette',
    eventType: 'Bachelorette Party',
    verified: true,
    avatar: '👸',
    location: 'Dallas, TX'
  },
  {
    id: 'birthday_1',
    name: 'Carlos Rivera',
    initials: 'CR',
    rating: 5,
    text: 'Celebrated my 30th birthday on the lake and it was incredible! The disco cruise vibe was perfect, met so many fun people, and the DJ kept the energy high all night. Unforgettable experience!',
    date: '2024-08-10',
    category: 'birthday',
    eventType: 'Birthday Celebration',
    verified: true,
    avatar: '🎂',
    location: 'Austin, TX'
  },
  {
    id: 'graduation_1',
    name: 'Ashley Martinez',
    initials: 'AM',
    rating: 5,
    text: 'What a way to celebrate graduating from UT! The private charter for our grad party was perfect - great music, beautiful lake, and the crew made us feel special. Best graduation celebration ever!',
    date: '2024-05-20',
    category: 'graduation',
    eventType: 'Graduation Party',
    verified: true,
    avatar: '🎓',
    location: 'Austin, TX'
  },
  {
    id: 'repeat_1',
    name: 'Lisa Rodriguez',
    initials: 'LR',
    rating: 5,
    text: 'This is our 4th time booking with Premier Party Cruises! Always consistent quality, always a great time. The crew remembers us and makes each event special. Our go-to for any Lake Travis celebration.',
    date: '2024-08-01',
    category: 'repeat',
    eventType: 'Anniversary Celebration',
    verified: true,
    avatar: '⭐',
    location: 'Austin, TX'
  }
];

// Review categories for filtering
export const reviewCategories = [
  { id: 'all', name: 'All Reviews', count: corporateReviews.length },
  { id: 'corporate', name: 'Corporate Events', count: corporateReviews.filter(r => r.category === 'corporate').length },
  { id: 'bachelor', name: 'Bachelor Parties', count: corporateReviews.filter(r => r.category === 'bachelor').length },
  { id: 'bachelorette', name: 'Bachelorette Parties', count: corporateReviews.filter(r => r.category === 'bachelorette').length },
  { id: 'birthday', name: 'Birthday Parties', count: corporateReviews.filter(r => r.category === 'birthday').length },
  { id: 'repeat', name: 'Repeat Customers', count: corporateReviews.filter(r => r.category === 'repeat').length }
];

// Social proof statistics
export const socialProofStats = [
  { number: '125,000+', label: 'Happy Customers', subtext: 'Served since 2010' },
  { number: '4.9/5', label: 'Google Rating', subtext: '500+ reviews' },
  { number: '14+', label: 'Years Experience', subtext: 'Austin\'s original' },
  { number: '1,200+', label: 'Corporate Events', subtext: 'Professional service' },
  { number: '100%', label: 'Safety Record', subtext: 'Coast Guard certified' }
];

// Get reviews by category
export function getReviewsByCategory(category: string): Review[] {
  if (category === 'all') return corporateReviews;
  return corporateReviews.filter(review => review.category === category);
}

// Get featured corporate reviews
export function getFeaturedCorporateReviews(): Review[] {
  return corporateReviews.filter(review => 
    review.category === 'corporate' || review.category === 'repeat'
  );
}

// Calculate average rating
export function getAverageRating(reviews: Review[] = corporateReviews): number {
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Get total review count
export function getTotalReviewCount(): number {
  return corporateReviews.length;
}