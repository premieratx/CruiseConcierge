// Comprehensive SSR content database for all pages
// This content is rendered server-side to be visible to SEO crawlers, Ubersuggest, and AI engines

export interface PageSection {
  heading: string;
  paragraphs: string[];
  lists?: {
    title?: string;
    items: string[];
  }[];
}

export interface PageContent {
  h1: string;
  introduction: string;
  sections: PageSection[];
  relatedPages?: string[];  // Array of link catalog keys for footer links
}

// Master Link Catalog - Centralized directory of all internal links
export const LINK_CATALOG: Record<string, {url: string; text: string}> = {
  'bachelor-party': {url: '/bachelor-party-austin', text: 'Bachelor Party Cruises'},
  'bachelorette-party': {url: '/bachelorette-party-austin', text: 'Bachelorette Party Cruises'},
  'atx-disco': {url: '/atx-disco-cruise', text: 'ATX Disco Cruise'},
  'private-cruises': {url: '/private-cruises', text: 'Private Boat Rentals'},
  'wedding-party': {url: '/wedding-parties', text: 'Wedding Party Boats'},
  'corporate-events': {url: '/corporate-events', text: 'Corporate Events'},
  'birthday-party': {url: '/birthday-parties', text: 'Birthday Parties'},
  'team-building': {url: '/team-building', text: 'Team Building Events'},
  'graduation-party': {url: '/graduation-party', text: 'Graduation Parties'},
  'combined-bach': {url: '/combined-bachelor-bachelorette-austin', text: 'Combined Bachelor & Bachelorette Parties'},
  'faq': {url: '/faq', text: 'FAQ'},
  'contact': {url: '/contact', text: 'Contact Us'},
  'testimonials': {url: '/testimonials-faq', text: 'Customer Reviews'},
  'home': {url: '/', text: 'Premier Party Cruises Home'},
  'sweet-16': {url: '/sweet-16', text: 'Sweet 16 Parties'},
  'milestone-birthday': {url: '/milestone-birthday', text: 'Milestone Birthday Parties'},
  'after-party': {url: '/after-party', text: 'Wedding After Parties'},
  'rehearsal-dinner': {url: '/rehearsal-dinner', text: 'Rehearsal Dinners'},
  'welcome-party': {url: '/welcome-party', text: 'Wedding Welcome Parties'},
  'client-entertainment': {url: '/client-entertainment', text: 'Client Entertainment'},
  'company-milestone': {url: '/company-milestone', text: 'Company Milestones'},
  'party-boat-austin': {url: '/party-boat-austin', text: 'Austin Party Boats'},
  'party-boat-lake-travis': {url: '/party-boat-lake-travis', text: 'Lake Travis Party Boats'},
  'gallery': {url: '/gallery', text: 'Photo Gallery'}
};

export const PAGE_CONTENT: Record<string, PageContent> = {
  '/': {
    h1: 'Premier Party Cruises - Austin Lake Travis Boat Rentals',
    introduction: 'Experience the ultimate party cruise on Lake Travis with Austin\'s premier boat rental company. Choose from [[private-cruises]], the [[atx-disco]], [[bachelor-party]], [[bachelorette-party]], [[corporate-events]], and more. Professional crew, premium amenities, and unforgettable celebrations await.',
    sections: [
      {
        heading: 'Private Charters - Your Exclusive Boat Experience',
        paragraphs: [
          'Choose from our fleet of premium party boats: "Day Tripper" (1-14 people), "Me Seeks the Irony" (15-30 people), or flagship "Clever Girl" (31-75 people) with giant Texas flag and 14 disco balls. Every [[private-cruises]] includes licensed captains, premium Bluetooth sound systems, large coolers with ice, and all the amenities for an unforgettable celebration.',
          'Perfect for [[wedding-party]], [[corporate-events]], [[birthday-party]], and any special celebration. Starting at $200 per hour with a 4-hour minimum. Fully customizable packages to match your event needs.'
        ],
        lists: [
          {
            title: 'Private Charter Features',
            items: [
              'Licensed captains & professional crew',
              'Premium Bluetooth sound systems',
              'Large coolers with ice provided',
              'Lily pads & floaties available',
              'BYOB friendly (21+ with ID)',
              'Customizable routes on Lake Travis',
              'Perfect for groups of 14-75 guests'
            ]
          }
        ]
      },
      {
        heading: 'ATX Disco Cruise - The Ultimate Party Experience',
        paragraphs: [
          'Join the BEST party on Lake Travis! Our signature [[atx-disco]] features a professional DJ, photographer, disco dance floor, giant floats, and an incredible party atmosphere. Three package levels available: Basic Bach ($85), Disco Queen/King ($95), and Super Sparkle Platinum ($105).',
          'Every disco cruise includes professional entertainment, photo delivery, party supplies, and an unforgettable experience with multiple [[bachelor-party]] and [[bachelorette-party]] groups celebrating together.'
        ],
        lists: [
          {
            title: 'Disco Cruise Includes',
            items: [
              'Professional DJ playing all day',
              'Professional photographer',
              'Giant unicorn floats',
              'Multiple lily pad floats',
              'Disco dance floor',
              'Party supplies & mixers',
              'Ice water stations',
              'Clean restroom facilities'
            ]
          }
        ]
      },
      {
        heading: 'Bachelor & Bachelorette Parties',
        paragraphs: [
          'Plan the perfect [[bachelor-party]] or [[bachelorette-party]] on Lake Travis! Choose between our affordable [[atx-disco]] packages or rent a [[private-cruises]] exclusively for your group. Bride cruises FREE on Disco Queen and Platinum packages (16+ paying guests).',
          'We specialize in creating unforgettable [[bachelor-party]] and [[bachelorette-party]] experiences with professional entertainment, premium amenities, and dedicated service. Over 125,000 happy customers have celebrated with us! Learn more about [[combined-bach]] options too.'
        ],
        lists: [
          {
            title: 'Party Highlights',
            items: [
              'BYOB with coolers and ice',
              'Alcohol delivery to the boat',
              'Transportation discounts',
              'Reserved spots for your group',
              'Special celebration items',
              'Complimentary delivery services',
              'Professional photos included'
            ]
          }
        ]
      },
      {
        heading: 'Corporate Events & Team Building',
        paragraphs: [
          'Elevate your [[corporate-events]] with a Lake Travis cruise! Perfect for [[team-building]], [[client-entertainment]], [[company-milestone]], and employee appreciation. Our fleet accommodates groups from 14 to 75+ guests with professional service and premium amenities.',
          'Customizable packages include catering coordination, AV equipment, and dedicated event planning to ensure your [[corporate-events]] is a complete success.'
        ]
      },
      {
        heading: 'Why Choose Premier Party Cruises',
        paragraphs: [
          'With 14+ years of experience and over 125,000 satisfied customers, we are Austin\'s longest-running and most trusted party cruise company. Our perfect safety record, Coast Guard certified captains, and newest fleet ensure an exceptional experience every time.'
        ],
        lists: [
          {
            title: 'Our Advantages',
            items: [
              '14+ years of Lake Travis expertise',
              '125,000+ happy customers served',
              'Perfect safety record maintained',
              'Newest fleet in Austin',
              'Coast Guard certified captains',
              'Full-service experience included',
              'Custom packages for any event',
              'Professional crew & premium sound'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What types of party boat rentals do you offer? We offer two main types of party boat experiences: Private Charters (exclusive boat rental for your group of 1-75 guests, starting at $200/hour with 4-hour minimum) and the ATX Disco Cruise (join other groups on our signature party cruise with DJ, photographer, and all amenities included, $85-$105 per person). Perfect for bachelor parties, bachelorette parties, corporate events, birthdays, weddings, and any special celebration.',
          'How much does it cost to rent a party boat on Lake Travis? Private charters start at $200 per hour with a 4-hour minimum. We have three boats available: Day Tripper (1-14 people, $200-350/hr), Meeseeks and The Irony (15-30 people, $225-425/hr), and Clever Girl (31-75 people with 14 disco balls, $250-500/hr). Crew fees are included in these price ranges. ATX Disco Cruise packages range from $85-$105 per person and include professional DJ, photographer, floats, and all amenities.',
          'Can we bring food and drinks on the boat? Yes! All cruises are fully BYOB friendly (21+ with valid ID required). You can bring your own beer, wine, seltzers, and non-alcoholic beverages in cans or plastic containers - no glass allowed for safety. We provide large coolers with ice. You can also bring snacks and meals, or we can coordinate alcohol delivery directly to the boat for your convenience.',
          'Does the bride or groom cruise free? Yes! The bride or groom cruises FREE on our Disco Queen/King and Super Sparkle Platinum packages when you have 16+ paying guests. This is our special thank you for choosing Premier Party Cruises for your bachelor or bachelorette party celebration.',
          'Where do you depart from on Lake Travis? We depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. We\'re the closest marina to downtown Austin, approximately 30 minutes away, making us convenient for all your guests.',
          'What\'s included with the ATX Disco Cruise? Every ATX Disco Cruise includes a professional DJ playing all day, professional photographer with photo delivery, giant unicorn floats, multiple lily pad floats, disco dance floor, party supplies and mixers, ice water stations, clean restroom facilities, and an unforgettable party atmosphere with multiple bachelor and bachelorette groups celebrating together.',
          'What makes Premier Party Cruises different from other Lake Travis boat rentals? With 14+ years of experience and over 125,000 satisfied customers, we are Austin\'s longest-running and most trusted party cruise company. We maintain a perfect safety record with Coast Guard certified captains, operate the newest fleet in Austin, and provide full-service experiences with professional crew and premium sound systems. We\'re the only company offering the signature ATX Disco Cruise party experience.',
          'Can you accommodate corporate events and team building activities? Absolutely! We specialize in corporate events and team building on Lake Travis. Our fleet accommodates groups from 14 to 75+ guests with professional service and premium amenities. Customizable packages include catering coordination, AV equipment, and dedicated event planning to ensure your corporate event is a complete success.'
        ]
      }
    ],
    relatedPages: [
      'bachelor-party', 'bachelorette-party', 'atx-disco', 'private-cruises',
      'wedding-party', 'corporate-events', 'birthday-party', 'team-building',
      'combined-bach', 'testimonials', 'faq', 'contact'
    ]
  },
  '/bachelor-party-austin': {
    h1: 'Austin Bachelor Party Boat Rentals | Lake Travis Cruises',
    introduction: 'Plan the ultimate [[bachelor-party]] on Lake Travis with Premier Party Cruises! Choose from our affordable [[atx-disco]] packages ($85-$105 per person) or rent a [[private-cruises]] exclusively for your group. Professional DJ, photographer, party floats, and unforgettable memories included.',
    sections: [
      {
        heading: 'ATX Disco Cruise Bachelor Party Packages',
        paragraphs: [
          'Join the BEST party on Lake Travis! Our [[atx-disco]] offers three package levels designed specifically for [[bachelor-party]], with everything included for an epic celebration.'
        ],
        lists: [
          {
            title: 'Basic Bach Package - $85',
            items: [
              'Join the ultimate bachelor party cruise',
              'BYOB with shared cooler and ice',
              'Alcohol & food delivery available',
              'Professional DJ and photographer',
              'Giant floats and party atmosphere',
              'Always cheaper than private cruises'
            ]
          },
          {
            title: 'Disco King Package - $95 (Most Popular)',
            items: [
              'Private cooler with ice for your group',
              'Reserved spot on the boat',
              'Disco visor & ball necklace for groom',
              'Complimentary alcohol & lunch delivery',
              '25% discount on transportation',
              '$50-$100 Airbnb delivery voucher',
              'Everything from Basic Bach'
            ]
          },
          {
            title: 'Super Sparkle Platinum - $105',
            items: [
              'Personal unicorn float for the groom',
              'Mimosa setup with champagne flutes',
              '$100 Airbnb concierge voucher',
              'Towel service & SPF-50 sunscreen',
              'Cooler pre-stocked when you arrive',
              'Everything from Disco King'
            ]
          }
        ]
      },
      {
        heading: 'What\'s Included on Every Bachelor Party Cruise',
        paragraphs: [
          'Every ATX Disco Cruise bachelor party includes professional entertainment, party amenities, and an unforgettable Lake Travis experience. Here\'s what you get:'
        ],
        lists: [
          {
            items: [
              'Professional DJ playing your favorites all day',
              'Professional photographer capturing epic moments',
              'Digital photo delivery after the event',
              'Private cooler with ice for your group',
              'Mimosa supplies with juice and fruit',
              'Multiple giant lily pad floats (6x20 feet)',
              'Party supplies including cups and koozies',
              'Ice water stations for hydration',
              'Clean restroom facilities',
              'Shaded areas to escape the sun',
              'Party atmosphere with other bachelor groups'
            ]
          }
        ]
      },
      {
        heading: 'Private Bachelor Party Boat Charters',
        paragraphs: [
          'Want the boat all to yourselves? Rent a [[private-cruises]] for your [[bachelor-party]]! Our fleet includes boats for 14, 25, and 50+ guests with professional captains, premium sound, and complete customization.',
          'Private charters start at $195/hour (4-hour minimum) and include everything you need for an exclusive celebration on Lake Travis. Check out our [[combined-bach]] options if you want to celebrate with your fiancée\'s group too!'
        ]
      },
      {
        heading: 'Why Bachelor Parties Love Premier Party Cruises',
        paragraphs: [
          'Over 125,000 happy customers have celebrated with us, making us Austin\'s #1 choice for bachelor parties. With 14+ years of experience, perfect safety record, and the newest fleet on Lake Travis, your bachelor party is in expert hands.'
        ],
        lists: [
          {
            items: [
              'Always more affordable than other options',
              'Professional entertainment included',
              'BYOB friendly with cooler service',
              'Lake Travis\' best party atmosphere',
              'Multiple package options to fit any budget',
              'Easy booking and planning process',
              'Flexible group sizes from 10-100+ guests',
              'Perfect safety record maintained'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'Can we bring our own alcohol? Yes! BYOB for guests 21+ with ID. We provide coolers and ice. Cans and plastic containers only.',
          'How many people can join? Disco cruises handle 20-40+ guests per group. Private boats accommodate 14-75 guests depending on the vessel.',
          'What about food? You can bring your own food or we can coordinate delivery right to the boat. Many groups order pizza, tacos, or catering.',
          'Is swimming allowed? Yes, when conditions are safe at the captain\'s discretion. Life jackets required in the water, provided for adults.',
          'How far in advance should we book? Weekend dates fill 6-8 weeks early. Book as soon as possible to secure your preferred date.'
        ]
      }
    ],
    relatedPages: [
      'atx-disco', 'bachelorette-party', 'private-cruises', 'combined-bach',
      'wedding-party', 'birthday-party', 'team-building', 'corporate-events',
      'graduation-party', 'testimonials', 'faq', 'contact'
    ]
  },
  '/bachelorette-party-austin': {
    h1: 'Austin Bachelorette Party Boat Cruises | Lake Travis',
    introduction: 'Plan the ultimate [[bachelorette-party]] on Lake Travis! The [[atx-disco]] is our specialty with packages starting at $85. Bride cruises FREE on Disco Queen and Platinum packages (16+ paying guests). Professional DJ, photographer, floats, and unforgettable celebration guaranteed!',
    sections: [
      {
        heading: 'Bachelorette Party Cruise Packages',
        paragraphs: [
          'Choose from three amazing package levels designed specifically for [[bachelorette-party]]. Each package includes professional DJ, photographer, and everything you need for an epic Lake Travis celebration!'
        ],
        lists: [
          {
            title: 'Basic Bach Package - $85',
            items: [
              'Join the BEST bachelorette party on Lake Travis',
              'BYOB with shared cooler and ice',
              'Alcohol & food delivery available',
              'Professional DJ and photographer included',
              'Giant floats and party atmosphere',
              'Most affordable option for bachelorette groups'
            ]
          },
          {
            title: 'Disco Queen Package - $95 (Most Popular)',
            items: [
              '🎉 BRIDE CRUISES FREE with this package!',
              'Private cooler with ice for your group',
              'Reserved spot for your bachelorette crew',
              'Disco ball cup & bubble gun for bride',
              'Complimentary alcohol & lunch delivery',
              '25% discount on round-trip transportation',
              '$50-$100 Airbnb delivery voucher'
            ]
          },
          {
            title: 'Super Sparkle Platinum - $105',
            items: [
              '🎉 BRIDE CRUISES FREE with this package!',
              'Personal unicorn float for the bride',
              'Mimosa setup with flutes, juices & chambong',
              '$100 Airbnb concierge services voucher',
              'Towel service & SPF-50 spray sunscreen',
              'Cooler pre-stocked with drinks on arrival',
              'Everything from Disco Queen Package'
            ]
          }
        ]
      },
      {
        heading: 'What Makes Our Bachelorette Cruises Special',
        paragraphs: [
          'Bachelorette parties are our specialty! We\'ve perfected the ultimate Lake Travis bachelorette experience with professional entertainment, premium amenities, and incredible party atmosphere. Here\'s what\'s included:'
        ],
        lists: [
          {
            items: [
              'Professional DJ playing bachelorette favorites all day',
              'Professional photographer capturing every moment',
              'Private cooler space for your group',
              'Mimosa supplies with champagne flutes',
              'Multiple 6x20\' giant lily pad floats',
              'Party supplies: cups, koozies, decorations',
              'Ice water stations throughout the cruise',
              'Clean restroom facilities on board',
              'Shaded lounge areas',
              'Party atmosphere with other bachelorette groups'
            ]
          }
        ]
      },
      {
        heading: 'Private Bachelorette Boat Charters',
        paragraphs: [
          'Want the boat exclusively for your [[bachelorette-party]]? Rent a [[private-cruises]] from our fleet! Perfect for groups that want complete privacy and customization. Our boats accommodate 14-50 guests with professional captains and premium amenities.',
          'Private charters include everything: captain, crew, sound system, coolers, ice, and complete control over your route and schedule. Starting at $195/hour with 4-hour minimum. Or check out [[combined-bach]] options!'
        ]
      },
      {
        heading: 'Why Bachelorette Parties Choose Us',
        paragraphs: [
          'With 14+ years specializing in [[bachelorette-party]], we know exactly how to create an unforgettable celebration. Over 125,000 happy customers, perfect safety record, and Austin\'s newest fleet make us the #1 choice for Lake Travis bachelorette parties.'
        ],
        lists: [
          {
            items: [
              'Bride cruises FREE on premium packages',
              'Most Instagram-worthy party boat experience',
              'Professional photos delivered after cruise',
              'BYOB friendly with full cooler service',
              'Multiple package options for any budget',
              'Easy planning and coordination',
              'Perfect for groups of 10-100+ guests',
              'Coast Guard certified captains'
            ]
          }
        ]
      }
    ],
    relatedPages: [
      'atx-disco', 'bachelor-party', 'private-cruises', 'combined-bach',
      'wedding-party', 'birthday-party', 'sweet-16', 'graduation-party',
      'milestone-birthday', 'testimonials', 'faq', 'contact'
    ]
  },
  '/combined-bachelor-bachelorette-austin': {
    h1: 'Combined Bachelor Bachelorette Parties Austin | Lake Travis',
    introduction: 'Why celebrate separately? Plan the ultimate [[combined-bach]] on Lake Travis! Both bride AND groom cruise FREE on Party Squad and Ultimate packages. Join the [[atx-disco]] or rent a [[private-cruises]] for guys and girls celebrating together. Starting at $85 per person.',
    sections: [
      {
        heading: 'Combined Party Packages - Everyone Together',
        paragraphs: [
          'The modern way to celebrate! Combine your bachelor and bachelorette parties for one epic Lake Travis experience. Both sides get to bond before the wedding, save money, and create unforgettable memories together.'
        ],
        lists: [
          {
            title: 'Basic Combined Package - $85',
            items: [
              'Join the ultimate combined party cruise',
              'BYOB with shared cooler for everyone',
              'Alcohol & food delivery available',
              'Perfect for budget-conscious groups',
              'Professional DJ and photographer',
              'Always more affordable than separate parties'
            ]
          },
          {
            title: 'Party Squad Package - $95 (Most Popular)',
            items: [
              '🎉 Both BRIDE & GROOM cruise FREE!',
              'Private cooler for your entire group',
              'Reserved area for your combined party',
              'Special celebration items for the couple',
              'Complimentary alcohol & food delivery',
              '25% discount on transportation',
              '$50-$100 Airbnb delivery voucher'
            ]
          },
          {
            title: 'Ultimate Celebration Package - $105',
            items: [
              '🎉 Both BRIDE & GROOM cruise FREE!',
              'Premium party floats for entire group',
              'Mixology setup with champagne & supplies',
              '$100 Airbnb concierge voucher',
              'Towel service & SPF-50 sunscreen',
              'Cooler completely pre-stocked',
              'Everything from Party Squad Package'
            ]
          }
        ]
      },
      {
        heading: 'Why Combined Parties Are Better',
        paragraphs: [
          'Save time, save money, and everyone bonds before the wedding! Combined bachelor/bachelorette parties are the future of pre-wedding celebrations. Your friends from both sides get to know each other in an incredible setting, creating friendships that last beyond the wedding day.',
          'With activities everyone loves - DJ, floats, swimming, dancing - there\'s something for every guest. Plus, both the bride and groom cruise FREE on select packages!'
        ]
      },
      {
        heading: 'What\'s Included for Combined Groups',
        paragraphs: [
          'Everything you need for guys and girls to party together on Lake Travis:'
        ],
        lists: [
          {
            items: [
              'Professional DJ playing music everyone enjoys',
              'Professional photographer for epic group photos',
              'Private cooler space for your combined group',
              'Party supplies: mixers, cups, ice',
              'Multiple giant floats everyone can enjoy',
              'Celebration essentials for the entire crew',
              'Ice water stations for everyone',
              'Clean restroom facilities',
              'Plenty of shaded lounge areas',
              'Party atmosphere with other combined groups'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'How many people can you fit? Disco cruise handles 20-40+ guests per group. Private boats accommodate up to 75 guests.',
          'Should we do disco or private cruise? Under 30 people: disco cruise is perfect. 30+ people: consider a private boat. We\'ll help you choose!',
          'Can we split payments? Yes! Split payment options available at checkout for easy group coordination.',
          'What if guys and girls want different things? No problem! Plenty of zones on the boat - floats, DJ area, lounge spots. BYOB keeps everyone happy.',
          'Do bride and groom really cruise free? Yes! On Party Squad and Ultimate packages with 16+ paying guests, both cruise absolutely FREE.'
        ]
      }
    ],
    relatedPages: [
      'bachelor-party', 'bachelorette-party', 'atx-disco', 'private-cruises',
      'wedding-party', 'rehearsal-dinner', 'welcome-party', 'after-party',
      'birthday-party', 'testimonials', 'faq', 'contact', 'home'
    ]
  },
  '/atx-disco-cruise': {
    h1: 'ATX Disco Cruise - Ultimate Party Boat Experience Austin',
    introduction: 'Experience the legendary [[atx-disco]] on Lake Travis! Professional DJ, photographer, disco dance floor, giant floats, and the best party atmosphere in Austin. Three packages available from $85-$105 per person. Join multiple [[bachelor-party]] and [[bachelorette-party]] for an unforgettable celebration!',
    sections: [
      {
        heading: 'ATX Disco Cruise Packages',
        paragraphs: [
          'Choose your perfect [[atx-disco]] package! Every level includes professional DJ, photographer, party floats, and an incredible 4-hour Lake Travis experience. Perfect alternative to [[private-cruises]] for budget-conscious groups!'
        ],
        lists: [
          {
            title: 'Basic Bach Package - $85',
            items: [
              'Full 4-hour Lake Travis cruise',
              'Professional DJ entertainment all day',
              'Professional photographer',
              'Digital photo delivery',
              'Giant unicorn float access',
              'Multi-group party atmosphere',
              'BYOB with shared coolers & ice',
              'Alcohol & lunch delivery available'
            ]
          },
          {
            title: 'Disco Queen/King Package - $95 (Most Popular)',
            items: [
              'Everything in Basic Bach',
              'Private cooler with ice for your group',
              'Reserved spot on the boat',
              'Disco ball cup & bubble gun for guest of honor',
              'Complimentary alcohol & lunch delivery',
              '25% discount on transportation',
              '$50-$100 Airbnb delivery voucher',
              'Premium boat positioning'
            ]
          },
          {
            title: 'Super Sparkle Platinum - $105',
            items: [
              'Everything in Disco Queen',
              'Personal unicorn float for guest of honor',
              'Mimosa setup with flutes, juices & chambong',
              '$100 Airbnb concierge voucher',
              'Towel service & SPF-50 sunscreen',
              'Cooler pre-stocked with drinks',
              'VIP treatment throughout',
              'Extended photo coverage'
            ]
          }
        ]
      },
      {
        heading: 'What Makes The Disco Cruise Special',
        paragraphs: [
          'The ATX Disco Cruise is unlike anything else in Austin! Join other bachelor and bachelorette parties for a multi-group celebration with professional entertainment, incredible energy, and Lake Travis\' best party atmosphere.'
        ],
        lists: [
          {
            title: 'Every Disco Cruise Includes',
            items: [
              'Professional DJ spinning all day',
              'Professional photographer capturing memories',
              'Disco dance floor with LED lights',
              'Multiple giant lily pad floats',
              'Party supplies and mixers',
              'Ice water stations',
              'Clean restroom facilities',
              'Shaded lounge areas',
              'Incredible multi-group party vibe'
            ]
          }
        ]
      },
      {
        heading: 'The Disco Cruise Experience',
        paragraphs: [
          'Picture this: You arrive at Anderson Mill Marina and board a massive party boat with disco balls, LED lights, and a pumping sound system. The DJ is already playing your favorite hits, other groups are dancing, and the energy is electric.',
          'For 4 hours, you\'ll cruise beautiful Lake Travis, dance on the disco floor, swim from giant floats, and party with bachelor and bachelorette groups from all over. Professional photographers capture every moment. It\'s the most fun you\'ll have on the water!',
          'With packages starting at just $85, the ATX Disco Cruise is ALWAYS more affordable than a private boat, with way more energy and entertainment included.'
        ]
      },
      {
        heading: 'Why Groups Love The Disco Cruise',
        paragraphs: [
          'Over 125,000 guests have experienced the ATX Disco Cruise. Here\'s why it\'s Austin\'s #1 party boat:'
        ],
        lists: [
          {
            items: [
              'Most affordable Lake Travis party option',
              'Professional entertainment included',
              'Multi-group party atmosphere',
              'No planning required - we handle everything',
              'BYOB friendly with full cooler service',
              'Perfect for groups of 10-40 guests',
              'Book last minute - availability most weekends',
              'Bride/Groom cruises FREE on select packages'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What is the ATX Disco Cruise? A shared 4-hour party boat for bachelor/bachelorette groups with pro DJ and photographer, BYOB, floats, and multi-group energy.',
          'When does it run? Fridays 12–4 PM and Saturdays 11–3 PM or 3:30–7:30 PM from March to October.',
          'How much are tickets? $85 Basic, $95 Queen/King, $105 Platinum.',
          'What happens in bad weather? Rain or shine. For severe weather, we move the party to Lemonade Disco land venue.',
          'What\'s the alcohol policy? BYOB for 21+; cans/plastic only; coolers with ice and cups provided.',
          'When do we get photos? Professional photos delivered digitally within 2–3 weeks after your cruise.',
          'Where do we meet? Anderson Mill Marina, 13993 FM 2769, Leander, TX 78641. Arrive 15–20 minutes early; free parking available.',
          'Does bride/groom cruise free? Yes! On Disco Queen and Platinum packages with 16+ paying guests, bride OR groom cruises absolutely FREE.'
        ]
      }
    ],
    relatedPages: [
      'bachelor-party', 'bachelorette-party', 'private-cruises', 'combined-bach',
      'wedding-party', 'birthday-party', 'team-building', 'corporate-events',
      'graduation-party', 'sweet-16', 'testimonials', 'faq', 'contact'
    ]
  },
  '/private-cruises': {
    h1: 'Private Boat Rentals Lake Travis | Austin Party Cruises',
    introduction: 'Rent a [[private-cruises]] on Lake Travis for your exclusive celebration! Choose from our fleet of premium boats accommodating 1-75 guests. Everything set up when you arrive - professional captain, crew, sound system, coolers, and complete customization. Three package levels from Standard to Ultimate. Starting at $200/hour with 4-hour minimum. Perfect for [[bachelor-party]], [[bachelorette-party]], [[corporate-events]], and more!',
    sections: [
      {
        heading: 'Our Private Boat Fleet',
        paragraphs: [
          'Choose the perfect boat for your group size and celebration style. Great alternative to [[atx-disco]] if you want complete exclusivity:'
        ],
        lists: [
          {
            title: 'Day Tripper - 1-14 Person Boat',
            items: [
              'Perfect for intimate groups of 1-14 guests',
              'Licensed captain and premium sound system',
              'Coolers with ice provided',
              'Comfortable seating with sun and shade',
              '$200-350/hr depending on day (4-hour minimum)',
              'Ideal for small birthday parties and gatherings'
            ]
          },
          {
            title: 'Meeseeks and The Irony - 15-30 Person Boat',
            items: [
              'Popular choice for medium groups (15-30 guests)',
              'Professional captain and crew',
              'Premium Bluetooth sound system',
              'Large coolers with ice',
              '$225-425/hr depending on day and group size (4-hour minimum)',
              'Perfect for bachelor/bachelorette parties'
            ]
          },
          {
            title: 'Clever Girl - 31-75 Person Flagship',
            items: [
              'Flagship boat with 14 disco balls',
              'Giant Texas flag display',
              'Accommodates 31-75 guests',
              'Professional crew and premium amenities',
              '$250-500/hr depending on day and group size (4-hour minimum)',
              'Ideal for corporate events and large celebrations'
            ]
          }
        ]
      },
      {
        heading: 'Private Cruise Package Options',
        paragraphs: [
          'Choose from three package levels - each one scales perfectly to your group size and boat selection:'
        ],
        lists: [
          {
            title: 'Standard Package',
            items: [
              'Professional captain and crew',
              'Large coolers (bring your own ice)',
              'Premium Bluetooth sound system',
              'Clean restroom facilities',
              'Sun and shade seating areas',
              'BYOB friendly (cans/plastic only)',
              'Basic cruise experience'
            ]
          },
          {
            title: 'Essentials Package (Flat Fee: +$100-200 per cruise)',
            items: [
              'Everything from Standard Package',
              'Coolers pre-stocked with ice',
              '5-gallon insulated water dispenser',
              'Solo cups and ice water',
              '6-foot folding table for food',
              'Vendor coordination for catering',
              'Enhanced convenience',
              'Fee depends on group size, NOT charged per hour'
            ]
          },
          {
            title: 'Ultimate Package (Flat Fee: +$250-350 per cruise)',
            items: [
              'Everything from Essentials Package',
              'Giant lily pad float',
              'Guest of honor float (unicorn or ring)',
              'Disco ball cups for party vibes',
              'Bubble guns and bubble wands',
              'Champagne flutes and fruit juices',
              'SPF-50 spray sunscreen',
              'Plates, plasticware, paper towels',
              'Full party atmosphere setup',
              'Fee depends on group size, NOT charged per hour'
            ]
          }
        ]
      },
      {
        heading: 'Why Choose Private Cruises',
        paragraphs: [
          'Private boat rentals give you complete control over your Lake Travis experience. Choose your own route, timing, activities, and guest list. Perfect for:'
        ],
        lists: [
          {
            items: [
              'Corporate events and team building',
              'Wedding parties and receptions',
              'Birthday celebrations and anniversaries',
              'Family reunions and gatherings',
              'Client entertainment',
              'Graduation parties',
              'Any occasion requiring exclusivity'
            ]
          }
        ]
      },
      {
        heading: 'Transparent Pricing',
        paragraphs: [
          'Our pricing is simple and transparent. Hourly rate × duration = base cost. No hidden fees or surprise charges. Additional crew fees apply for larger groups: $50/hour for 26-30 guests, $100/hour for 51-75 guests. 8.25% tax added. Suggested 20% gratuity for exceptional service.',
          '25% deposit required if booking more than 30 days out. Full payment required if booking within 30 days of cruise date. Flexible payment options available.'
        ]
      },
      {
        heading: 'What\'s Included',
        paragraphs: [
          'Every private cruise includes everything you need for a successful celebration:'
        ],
        lists: [
          {
            items: [
              'Coast Guard certified captain',
              'Professional crew members',
              'Premium Bluetooth sound system',
              'Large coolers (ice in Essentials/Ultimate)',
              'Clean restroom facilities',
              'Safety equipment and life jackets',
              'Comfortable seating - sun and shade',
              'Flexible route customization',
              'Full captain\'s discretion on activities'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What boats are available? We offer three exceptional vessels: Day Tripper (14-person boat) perfect for intimate groups starting at $200/hour with a 4-hour minimum. Meeseeks and The Irony (25-person boat) is our most popular choice for medium groups of 18-25 guests, starting at $225/hour. Clever Girl (50-person flagship) features 14 disco balls and a giant Texas flag, starting at $250/hour, perfect for corporate events.',
          'What\'s included in each package? Standard Package includes professional captain and crew, large coolers (bring your own ice), premium Bluetooth sound system, clean restroom facilities, and sun/shade seating. Essentials Package adds coolers pre-stocked with ice, water dispenser, solo cups, 6-foot folding table, and catering coordination. Ultimate Package adds giant lily pad float, guest of honor float, disco ball cups, bubble guns, champagne flutes, SPF-50 sunscreen, plates, and full party setup.',
          'Can we bring food and drinks? Yes! We are fully BYOB friendly (21+ with valid ID required). Bring your own beer, wine, seltzers in cans or plastic containers - no glass. We provide large coolers and cups. With Essentials Package, coolers come pre-stocked with ice. Ultimate Package includes champagne flutes, plates, plasticware, and a 6-foot table for food setup.',
          'How does pricing work? Base cost is Hourly rate × Duration. Day Tripper $200/hour, Meeseeks $225/hour, Clever Girl $250/hour (4-hour minimums). Essentials Package adds $100-200/hour, Ultimate adds $250-350/hour. Additional crew fees: $50/hour for 26-30 guests, $100/hour for 51-75 guests. Plus 8.25% tax and suggested 20% gratuity.',
          'How far in advance should we book? Popular weekend dates fill 6-8 weeks in advance, especially during peak season (April-September). For special events like bachelor/bachelorette parties, corporate events, or milestone birthdays, we suggest booking 2-3 months ahead to secure your preferred date and boat.',
          'How do deposits and payments work? 25% deposit if >30 days out (balance due 30 days prior). If booking within 30 days, 50% deposit due and remainder within 72 hours.',
          'What\'s your cancellation policy? 48-hour full refund window after booking. After that, cancellations are weather-dependent at the captain\'s discretion. Pro-rated refunds if weather shortens the cruise.',
          'Can we customize our route? Absolutely! You have complete control over your Lake Travis experience. Work with your captain to customize your route, timing, and activities. The typical cruise includes 30-45 minutes of cruising, then we tie up along the cliffs of a beautiful Lake Travis nature preserve with crystal clear water for swimming (typically 1.5-2 hours), then cruise back. However, the time is yours - customize any combination of cruising and swimming time that works for your group.'
        ]
      }
    ],
    relatedPages: [
      'atx-disco', 'bachelor-party', 'bachelorette-party', 'corporate-events',
      'wedding-party', 'birthday-party', 'team-building', 'client-entertainment',
      'company-milestone', 'graduation-party', 'testimonials', 'faq', 'contact'
    ]
  },
  '/after-party': {
    h1: 'Wedding After Party Cruises Lake Travis | Austin',
    introduction: 'Don\'t let your wedding night end! Continue the celebration with a late-night [[after-party]] cruise for you and your closest friends. Professional DJ, midnight champagne, dancing under the stars, and the perfect finale to your special day. Choose from [[private-cruises]] starting at $200/hour.',
    sections: [
      {
        heading: 'After Party Cruise Packages',
        paragraphs: [
          'Keep the celebration going after your reception with our specialized after-party cruise packages:'
        ],
        lists: [
          {
            title: 'Standard 4-Hour Cruise - $200/hour',
            items: [
              'Experienced professional captain',
              '2 large coolers (bring your own ice & drinks)',
              'Premium Bluetooth speaker system',
              'Clean restroom facilities',
              'Seating for up to 14 guests',
              'Sun and shade areas',
              'Vendor coordination for catering'
            ]
          },
          {
            title: 'Cruise w/Essentials - $225/hour',
            items: [
              'Everything from Standard Cruise',
              '5-gallon insulated dispenser with ice water',
              'Fresh water and solo cups',
              'Coolers pre-stocked with ice',
              '6-ft folding table for food & drinks',
              'Enhanced convenience for your group'
            ]
          },
          {
            title: 'Ultimate Party Package - $250/hour',
            items: [
              'Everything from Essentials Package',
              'Giant lily pad float',
              'Guest of honor float (unicorn or ring)',
              'Disco ball cups for party atmosphere',
              'Bubble guns and bubble wands',
              'Champagne flutes and fruit juices',
              'SPF-50 spray sunscreen provided',
              'Plates, plasticware, paper towels',
              'Full party atmosphere with disco balls'
            ]
          }
        ]
      },
      {
        heading: 'The Perfect Wedding Finale',
        paragraphs: [
          'After your reception, gather your closest friends and family for an intimate late-night cruise on Lake Travis. Picture dancing under the stars, toasting with champagne at midnight, and celebrating with the people who matter most.',
          'Our after-party cruises typically run 10pm-2am, giving you the perfect transition from reception to continued celebration. Professional crew handles everything while you enjoy your special night.',
          'Many couples choose this as their "last hurrah" before the honeymoon - a private, intimate celebration with their inner circle on beautiful Lake Travis.'
        ]
      },
      {
        heading: 'What Makes After Party Cruises Special',
        paragraphs: [
          'Unlike traditional after-parties at bars or hotels, a Lake Travis cruise offers:'
        ],
        lists: [
          {
            items: [
              'Private, intimate setting for close friends',
              'Late-night hours (10pm-2am typical)',
              'Professional DJ and sound system',
              'Midnight champagne service',
              'LED party lighting for nighttime ambiance',
              'Late night snacks and treats',
              'Couple\'s VIP area for newlyweds',
              'Send-off supplies and sparklers',
              'Professional party crew',
              'Unforgettable memories on the water'
            ]
          }
        ]
      },
      {
        heading: 'Planning Your After Party',
        paragraphs: [
          'Coordinate with your reception venue for seamless transition. We recommend booking transportation for your guests from the reception to the marina. Most groups are 15-30 people - your closest friends and family.',
          'BYOB friendly, or we can coordinate catering and beverage delivery. Many couples arrange for late-night tacos, pizza, or other favorites to be delivered right to the boat.',
          'Book early as after-party cruises are extremely popular, especially for weekend weddings. We\'ll work with your timeline to create the perfect celebration finale.'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What time should a wedding after party cruise start? After party cruises typically start 10pm-11pm, timing perfectly with most wedding reception endings. Popular schedules are 10pm-1am or 11pm-2am, giving the couple and close friends 2-3 hours to continue celebrating.',
          'What\'s included in a wedding after party cruise? After party cruises include professional crew experienced with late-night events, premium sound system with Bluetooth, party lighting and disco balls for dance vibes, swimming access (weather permitting), BYOB cooler service, comfortable seating, and climate-controlled restrooms.',
          'Is swimming allowed during late-night after party cruises? Yes! Weather and lake conditions permitting, swimming and floating under the stars is a highlight of after party cruises. We provide floats and water toys. Many newlyweds love jumping in the lake in wedding attire for epic photos.',
          'What is the alcohol policy for wedding after parties? After party cruises are BYOB (bring your own beer, wine, champagne, and spirits). Many couples bring leftover alcohol from the reception. We provide ice, coolers, cups, and openers.',
          'What group size works best for after party cruises? After parties typically host 14-50+ of your closest friends and family - those who want to keep celebrating after the reception ends. Most couples invite 20-30 people who truly want to party late into the night.',
          'How much does a wedding after party cruise cost? After party pricing depends on boat and package. Base rates: Day Tripper $195/hr (14 guests), Me Seeks the Irony $295/hr (25 guests), Clever Girl $495/hr (50+ guests). Most 2-3 hour after parties cost $890-$2,535 total.',
          'How far in advance should we book the wedding after party? Book your after party cruise when you book your wedding venue to secure your date. Peak wedding season (April-October) and Saturday night slots fill quickly, often 3-6 months in advance.'
        ]
      }
    ],
    relatedPages: [
      'wedding-party', 'rehearsal-dinner', 'welcome-party', 'bachelor-party',
      'bachelorette-party', 'combined-bach', 'private-cruises', 'birthday-party',
      'corporate-events', 'testimonials', 'faq', 'contact', 'home'
    ]
  },
  '/welcome-party': {
    h1: 'Wedding Welcome Party Cruises Lake Travis | Austin',
    introduction: 'Start your [[wedding-party]] weekend with an unforgettable [[welcome-party]] on Lake Travis! Gather guests who traveled from out of town for a relaxed cruise experience. Perfect for Friday evening before Saturday weddings. [[private-cruises]] for 14-75 guests with professional service.',
    sections: [
      {
        heading: 'Welcome Party on the Water',
        paragraphs: [
          'Set the tone for your wedding weekend with a beautiful Lake Travis welcome party cruise. Your out-of-town guests will love this unique Austin experience, and it\'s the perfect way for both families to mingle before the big day.',
          'Typically scheduled for Friday evening (5pm-9pm), our welcome party cruises offer sunset views, relaxed atmosphere, and quality time with your loved ones. Choose from our fleet of boats to accommodate your guest count.'
        ]
      },
      {
        heading: 'Perfect for Wedding Weekends',
        paragraphs: [
          'Why choose a welcome party cruise:'
        ],
        lists: [
          {
            items: [
              'Unique Austin experience for out-of-town guests',
              'Both families get to know each other',
              'Relaxed atmosphere before wedding day',
              'Beautiful Lake Travis sunset views',
              'Less formal than rehearsal dinner',
              'Kids and families welcome',
              'BYOB with full cooler service',
              'Flexible timing around your schedule',
              'Professional crew handles everything',
              'Create memories before the ceremony'
            ]
          }
        ]
      },
      {
        heading: 'Welcome Party Packages',
        paragraphs: [
          'All the same great package options as our private cruises - Standard, Essentials, and Ultimate. Pricing starts at $195/hour with 3-4 hour minimum typical for welcome parties.',
          'Popular add-ons include catering coordination, beverage service, and sunset timing for incredible photos. We\'ll work with you to create the perfect welcome experience for your guests.'
        ]
      },
      {
        heading: 'What Guests Love',
        paragraphs: [
          'Out-of-town guests consistently rate welcome party cruises as a highlight of the wedding weekend. It\'s relaxed, fun, uniquely Austin, and gives everyone quality time together before the busy wedding day.',
          'Many couples use this time for toasts, sharing stories, and building excitement for the wedding. The intimate boat setting creates natural conversation and connection that traditional welcome dinners can\'t match.'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'Why is a cruise perfect for welcoming out-of-town wedding guests? A Lake Travis cruise gives out-of-town guests an authentic Austin experience while providing the perfect icebreaker setting. The relaxed boat atmosphere encourages mingling as guests from both families meet before the formal wedding.',
          'What group capacity works best for wedding welcome parties? Welcome party cruises accommodate 14-75 guests across our fleet. Most welcome parties host 30-50 guests including out-of-town family, bridal party, and close friends arriving early for the weekend celebration.',
          'Should welcome parties be casual or more formal? Welcome parties work best as casual, relaxed affairs - think resort casual or smart casual attire. This creates a comfortable icebreaker atmosphere before the formal wedding events.',
          'What\'s the ideal timing for a welcome party cruise? Welcome parties typically run 2-3 hours, scheduled the evening before the wedding. Popular timing is 5pm-8pm or 6pm-9pm, allowing guests to arrive from travel, check into hotels, and join refreshed.',
          'What catering options work for welcome party cruises? Welcome parties often feature casual, shareable Austin favorites: BBQ sliders, taco bars, queso and chips, or appetizer spreads. The Essentials package includes full catering coordination and serving assistance.',
          'How much does a wedding welcome party cruise cost? Welcome party pricing varies by boat size and package. Most 2-3 hour welcome parties range from $590-$2,535 depending on size and package.',
          'Where does the welcome party cruise depart from? Welcome party cruises depart from Anderson Mill Marina on Lake Travis, approximately 30 minutes from downtown Austin. Free parking is available, and many couples arrange shuttle service from hotel blocks.'
        ]
      }
    ],
    relatedPages: [
      'wedding-party', 'rehearsal-dinner', 'after-party', 'bachelor-party',
      'bachelorette-party', 'combined-bach', 'private-cruises', 'corporate-events',
      'birthday-party', 'testimonials', 'faq', 'contact', 'home'
    ]
  },
  '/rehearsal-dinner': {
    h1: 'Rehearsal Dinner Cruises Lake Travis | Austin Weddings',
    introduction: 'Host an unforgettable [[rehearsal-dinner]] on Lake Travis! [[private-cruises]] for your [[wedding-party]] and close family. Elegant yet relaxed atmosphere with sunset views, premium service, and complete customization. Perfect alternative to traditional restaurant dinners.',
    sections: [
      {
        heading: 'Rehearsal Dinner on Lake Travis',
        paragraphs: [
          'Transform your rehearsal dinner into an extraordinary experience! Instead of a traditional restaurant, gather your wedding party and closest family on a private Lake Travis cruise. Watch the sunset, enjoy catered dinner, and celebrate in style before your big day.',
          'Our rehearsal dinner cruises typically run 3-4 hours in the evening, timed perfectly to catch the gorgeous Lake Travis sunset. Intimate setting for 15-40 guests with professional crew and complete customization.'
        ]
      },
      {
        heading: 'Why Choose a Cruise for Rehearsal Dinner',
        paragraphs: [
          'A Lake Travis rehearsal dinner cruise offers unique advantages:'
        ],
        lists: [
          {
            items: [
              'Stunning sunset backdrop for speeches',
              'Private, intimate setting for close family',
              'No noise from other restaurant guests',
              'Flexible timing and schedule',
              'Memorable Austin experience',
              'Perfect for toasts and celebrations',
              'Catering coordination available',
              'Professional service and crew',
              'Beautiful photo opportunities',
              'Stress-free evening before the wedding'
            ]
          }
        ]
      },
      {
        heading: 'Rehearsal Dinner Details',
        paragraphs: [
          'We coordinate with your caterer or restaurant for dinner delivery to the boat, or you can bring your own food and beverages. Popular options include upscale catering, family-style meals, or BBQ favorites.',
          'Timing is flexible - most groups prefer 6pm-9pm or 7pm-10pm to catch the sunset. We provide tables, seating, sound system for speeches, and all the amenities for a perfect rehearsal dinner.',
          'Pricing starts at $195/hour for our smallest boat (14 guests) up to $495/hour for our flagship (40+ guests). Add Essentials or Ultimate package for enhanced convenience and party atmosphere.'
        ]
      },
      {
        heading: 'Creating the Perfect Evening',
        paragraphs: [
          'Many couples use the rehearsal dinner cruise for heartfelt toasts, sharing stories, and quality time with their wedding party. The intimate boat setting creates a relaxed yet elegant atmosphere that traditional venues can\'t replicate.',
          'Your guests will remember this unique experience long after the wedding. It sets the perfect tone for your big day and gives everyone special memories on beautiful Lake Travis.'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What is the ideal group size for a rehearsal dinner cruise? Rehearsal dinner cruises typically accommodate 14-50 guests depending on your wedding party size. Most rehearsal dinners have 20-30 guests including wedding party, parents, grandparents, and siblings.',
          'What catering options are available for rehearsal dinners? We coordinate with Austin\'s finest restaurants and caterers for your rehearsal dinner. Popular options include upscale BBQ from Salt Lick or County Line, elegant plated dinners, family-style Italian, or customized menus from local Austin favorites.',
          'What is the best timing for a sunset rehearsal dinner cruise? For maximum romance, book your rehearsal dinner to depart 2 hours before sunset. This allows time for boarding, welcome drinks, photos during golden hour, dinner service, and toasts at sunset over Lake Travis.',
          'What are the alcohol and beverage service options? Rehearsal dinner cruises are BYOB - bring your own wine, champagne, and beer. We provide ice, coolers, cups, and bottle openers. Many rehearsal dinners feature champagne toasts, wine with dinner, and craft beers.',
          'How much does a rehearsal dinner cruise cost? Pricing depends on boat size and package. Typical 3-hour rehearsal dinner ranges from $585-$2,535 total depending on boat and package selection.',
          'How far in advance should we book our rehearsal dinner cruise? Book 6-8 weeks in advance to secure your preferred date and boat, especially for peak wedding season (April-October) and Friday evening rehearsals.',
          'Where do we depart from for the rehearsal dinner cruise? Rehearsal dinner cruises depart from Anderson Mill Marina on Lake Travis, just 30 minutes from downtown Austin. The marina offers ample free parking and is easily accessible for out-of-town wedding guests.'
        ]
      }
    ],
    relatedPages: [
      'wedding-party', 'welcome-party', 'after-party', 'bachelor-party',
      'bachelorette-party', 'combined-bach', 'private-cruises', 'corporate-events',
      'birthday-party', 'team-building', 'testimonials', 'faq', 'contact'
    ]
  },
  '/team-building': {
    h1: 'Team Building Cruises Lake Travis | Corporate Austin',
    introduction: 'Strengthen your team with an unforgettable [[team-building]] cruise! Perfect for [[corporate-events]], employee appreciation, and fostering collaboration. [[private-cruises]] for 14-75 guests with professional service. Unique Austin experience that brings teams together.',
    sections: [
      {
        heading: 'Corporate Team Building on the Water',
        paragraphs: [
          'Take your team building to the next level with a Lake Travis cruise! Our team building cruises provide the perfect environment for collaboration, communication, and connection outside the office.',
          'Whether you\'re onboarding new employees, celebrating achievements, or strengthening department relationships, a Lake Travis cruise creates shared experiences that translate to better teamwork back at the office.'
        ]
      },
      {
        heading: 'Team Building Activities & Format',
        paragraphs: [
          'Our team building cruises can be structured or relaxed, depending on your goals:'
        ],
        lists: [
          {
            items: [
              'Icebreaker activities on the water',
              'Problem-solving challenges and games',
              'Team communication exercises',
              'Relaxed networking and bonding time',
              'Swimming and floating (weather permitting)',
              'Group meals and refreshments',
              'Professional facilitation available',
              'Custom activities for your objectives',
              'Flexible 3-6 hour formats',
              'Debrief and reflection time'
            ]
          }
        ]
      },
      {
        heading: 'Why Lake Travis for Team Building',
        paragraphs: [
          'Lake Travis provides the ideal setting for team building events. Away from office distractions, in a relaxed outdoor environment, teams naturally open up and connect on a personal level.',
          'The shared experience of being on the water, trying new activities, and enjoying Austin\'s natural beauty creates lasting bonds. Many companies report improved communication and collaboration after team building cruises.',
          'Plus, it\'s a memorable perk that shows your team they\'re valued. Employees love the unique experience and consistently rate Lake Travis team building as a career highlight.'
        ]
      },
      {
        heading: 'Planning Your Team Building Event',
        paragraphs: [
          'We handle all the logistics so you can focus on your team. Choose from our fleet based on group size (14-75 guests). Add catering, team building facilitation, or other services as needed.',
          'Popular formats include half-day morning cruises, afternoon sessions, or full-day team building retreats. We\'ll work with your schedule and objectives to create the perfect experience.',
          'Pricing starts at $195/hour with package upgrades available. Volume discounts for regular corporate clients. Book early as team building dates fill quickly, especially in spring and fall.'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'Do you provide team building activities? Yes! We offer both structured and relaxed formats based on your team building goals. Activities include icebreaker activities on the water, problem-solving challenges and games, team communication exercises, relaxed networking and bonding time, and swimming and floating. Professional facilitation is available, and we can create custom activities tailored to your specific objectives.',
          'What group sizes can you host? We accommodate 14-75 guests across our three-boat fleet. Day Tripper hosts 14 guests, Meeseeks and The Irony accommodates 25 guests, and Clever Girl can host 50+ guests. For larger groups, we can coordinate multiple boats. Volume discounts are available for regular corporate clients.',
          'Can we bring catering? Yes! You can bring your own catering, or we\'ll coordinate with your preferred caterer or restaurant to ensure seamless delivery and setup. Full bar setups are available, or you can bring your own beverages (BYOB for guests 21+).',
          'How much does team building cost? Team building cruises start at $200/hour for our Day Tripper boat. Most team building events run 3-6 hours. Package upgrades include Essentials (+$100-200/hour) and Ultimate (+$250-350/hour) with additional amenities. Volume discounts are available for companies booking multiple team building events.',
          'Where do we depart? All team building cruises depart from Anderson Mill Marina, located at 13993 FM 2769, Leander, TX 78641. Free parking is available for all guests. The marina is conveniently located about 30 minutes from downtown Austin.',
          'How far in advance should we book? Team building dates fill quickly, especially during spring and fall months when weather is ideal. We recommend booking 6-8 weeks in advance to secure your preferred date and boat.',
          'What makes Lake Travis ideal for team building? Lake Travis provides the perfect team building environment—away from office distractions in a relaxed outdoor setting where teams naturally open up and connect on a personal level. Many companies report enhanced communication, collaboration, and team cohesion after Lake Travis team building cruises.'
        ]
      }
    ],
    relatedPages: [
      'corporate-events', 'client-entertainment', 'company-milestone', 'private-cruises',
      'wedding-party', 'bachelor-party', 'bachelorette-party', 'birthday-party',
      'graduation-party', 'testimonials', 'faq', 'contact', 'home'
    ]
  },
  '/client-entertainment': {
    h1: 'Client Entertainment Cruises Lake Travis | Austin Corporate',
    introduction: 'Impress your clients with an exclusive [[client-entertainment]] on Lake Travis! Perfect for [[corporate-events]], relationship building, and closing deals in style. [[private-cruises]] for 14-50 guests with premium service and Austin hospitality.',
    sections: [
      {
        heading: 'Client Entertainment on Lake Travis',
        paragraphs: [
          'Take client entertainment to the next level with a private Lake Travis cruise. Whether you\'re thanking valued clients, building new relationships, or closing important deals, a cruise provides the perfect setting for meaningful business connections.',
          'Our client entertainment cruises offer the right balance of professionalism and relaxation. Impress clients with Austin\'s natural beauty while enjoying premium service, catered meals, and quality conversation time.'
        ]
      },
      {
        heading: 'Perfect for Client Relationships',
        paragraphs: [
          'Why clients love Lake Travis cruises:'
        ],
        lists: [
          {
            items: [
              'Unique Austin experience they won\'t forget',
              'Private, exclusive setting for conversation',
              'Relaxed atmosphere for relationship building',
              'Impressive without being overly formal',
              'Quality one-on-one time away from office',
              'Beautiful Lake Travis scenery',
              'Professional crew and premium service',
              'Catered meals and beverage service',
              'Flexible format for your business goals',
              'Memorable experience that stands out'
            ]
          }
        ]
      },
      {
        heading: 'Client Entertainment Formats',
        paragraphs: [
          'Customize your client cruise based on your objectives. Popular formats include lunch cruises (11am-2pm), afternoon outings (2pm-5pm), or sunset cocktail cruises (6pm-9pm).',
          'We coordinate with your preferred caterer or restaurant for upscale meal service. Full bar setups available, or bring your own beverages. Sound system for presentations if needed, or keep it purely social.',
          'Many companies use client cruises for quarterly appreciation events, deal closings, partnership celebrations, or simply strengthening key relationships. The intimate boat setting facilitates genuine connections that conference rooms can\'t match.'
        ]
      },
      {
        heading: 'Professional Service Guaranteed',
        paragraphs: [
          'Our experienced crew understands the importance of client entertainment. Discreet, professional service ensures your clients feel valued and impressed. Coast Guard certified captains, premium boats, and attention to every detail.',
          'We\'ve hosted hundreds of corporate client events with perfect track record. Your clients will leave impressed with both your company and their Lake Travis experience. It\'s an investment in relationships that pays dividends.',
          'Pricing starts at $295/hour for medium boats (25 guests) up to $495/hour for our flagship (50 guests). Ultimate package recommended for maximum client impression. Book 4-6 weeks in advance for best availability.'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What client entertainment formats do you offer? We offer fully customizable client entertainment formats based on your business objectives. Popular options include lunch cruises (11am-2pm) for daytime client meetings, afternoon outings (2pm-5pm) for relaxed networking, and sunset cocktail cruises (6pm-9pm) for impressive evening entertainment.',
          'How many clients can we bring? We accommodate 14-50 guests for client entertainment events. Our Day Tripper boat hosts intimate groups of 14 guests at $200/hour, Meeseeks and The Irony accommodates 25 guests at $225/hour, and our flagship Clever Girl hosts up to 50 guests at $250/hour.',
          'Can we bring catering? Yes! We coordinate seamlessly with your preferred caterer or restaurant to provide upscale meal service for your clients. Whether you want appetizers, full meals, or desserts, we\'ll ensure professional delivery and elegant presentation.',
          'Do you provide AV for presentations? Yes! Our premium sound system is available for presentations, announcements, or background music. Many clients choose to keep the experience purely social, and we accommodate either approach seamlessly.',
          'How far in advance should we book? We recommend booking 4-6 weeks in advance for optimal availability, especially if you have specific dates or times in mind. For sunset cruises during peak season (spring and fall), earlier booking ensures you secure your preferred date.',
          'Why choose a Lake Travis cruise for clients? A Lake Travis cruise offers a unique Austin experience that clients won\'t forget. The private, exclusive setting facilitates genuine conversation and relationship building away from office distractions in a memorable setting that truly stands out.'
        ]
      }
    ],
    relatedPages: [
      'corporate-events', 'team-building', 'company-milestone', 'private-cruises',
      'wedding-party', 'rehearsal-dinner', 'bachelor-party', 'bachelorette-party',
      'birthday-party', 'testimonials', 'faq', 'contact', 'home'
    ]
  },
  '/company-milestone': {
    h1: 'Company Milestone Cruises Lake Travis | Corporate Celebrations',
    introduction: 'Celebrate [[company-milestone]] in style on Lake Travis! Perfect for anniversaries, IPOs, major wins, and achievement celebrations. [[private-cruises]] for teams of 14-75 with professional service and unforgettable memories for your [[corporate-events]].',
    sections: [
      {
        heading: 'Milestone Celebrations on the Water',
        paragraphs: [
          'Company milestones deserve exceptional celebrations! Whether you\'re celebrating 10 years in business, closing a major deal, hitting revenue targets, or going public, a Lake Travis cruise provides the perfect venue for honoring achievements.',
          'Our milestone celebration cruises create shared memories that reinforce company culture and celebrate success with your entire team. From intimate executive cruises to full-company celebrations, we scale to your needs.'
        ]
      },
      {
        heading: 'Types of Milestone Celebrations',
        paragraphs: [
          'We\'ve hosted celebrations for every type of company milestone:'
        ],
        lists: [
          {
            items: [
              'Company anniversary celebrations (5, 10, 25+ years)',
              'IPO and funding round successes',
              'Revenue milestone achievements',
              'Major client wins and deal closings',
              'Product launch celebrations',
              'Expansion and office openings',
              'Award recognitions and industry honors',
              'Retirement celebrations for executives',
              'Merger and acquisition celebrations',
              'Record-breaking quarter or year celebrations'
            ]
          }
        ]
      },
      {
        heading: 'Creating the Perfect Celebration',
        paragraphs: [
          'Your milestone celebration should reflect the significance of the achievement. We offer complete customization: timing, route, activities, catering, and special touches.',
          'Popular elements include: champagne toasts, catered meals, professional photography, awards presentations, team recognition, and celebratory decorations. Sound system available for speeches and announcements.',
          'Many companies combine the celebration with team building activities, making it both fun and purposeful. The Lake Travis setting creates a relaxed yet special atmosphere for honoring success.'
        ]
      },
      {
        heading: 'Professional Event Coordination',
        paragraphs: [
          'We understand the importance of milestone events. Our experienced team handles all logistics, from catering coordination to timeline management. You focus on celebrating while we ensure everything runs perfectly.',
          'Fleet options accommodate any group size: 14 guests (executive team) to 75+ (entire company). Ultimate package recommended for milestone celebrations to maximize the special feel.',
          'Book 6-8 weeks in advance for milestone events. Pricing starts at $195/hour, with volume discounts available for larger groups. We\'ll create a celebration worthy of your achievement!'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What types of milestones do you celebrate? We celebrate all types of company milestones including company anniversaries (5, 10, 25+ years), IPO and funding round successes, revenue milestone achievements, major client wins and deal closings, product launch celebrations, expansion and office openings, and industry award recognitions.',
          'How many people can attend? We accommodate 14-75+ guests for milestone celebrations. Our Day Tripper boat is perfect for intimate executive team celebrations (14 guests), Meeseeks and The Irony suits department-level celebrations (25 guests), and Clever Girl can host entire company celebrations (50-75 guests).',
          'Can we customize the celebration? Absolutely! We offer complete customization including timing, route, activities, catering, and special touches to reflect the significance of your milestone. Popular elements include champagne toasts, catered gourmet meals, professional photography, awards presentations, and celebratory decorations.',
          'Do you provide professional photography? Yes! Professional photography services are available to capture your milestone celebration memories. Our photographers understand corporate events and can provide both candid shots and formal group photos.',
          'Can we do speeches and presentations? Yes! Our premium sound system is available for speeches, announcements, and presentations. Many companies use the cruise to present achievement awards, share company updates, recognize team members, and make important announcements.',
          'How much does a milestone celebration cost? Milestone celebrations start at $200/hour for our Day Tripper boat. The Essentials package adds $100-200/hour, and the Ultimate package (recommended for milestones) adds $250-350/hour. Volume discounts are available for larger groups.',
          'Where do we depart? Milestone celebrations depart from Anderson Mill Marina, located at 13993 FM 2769, Leander, TX 78641. The marina offers ample free parking for your entire team and is conveniently located approximately 30 minutes from downtown Austin.'
        ]
      }
    ],
    relatedPages: [
      'corporate-events', 'team-building', 'client-entertainment', 'private-cruises',
      'wedding-party', 'birthday-party', 'graduation-party', 'bachelor-party',
      'bachelorette-party', 'testimonials', 'faq', 'contact', 'home'
    ]
  },
  '/birthday-parties': {
    h1: 'Birthday Party Boat Cruises Lake Travis | Austin Celebrations',
    introduction: 'Celebrate [[birthday-party]] on Lake Travis with an unforgettable party cruise! Perfect for [[milestone-birthday]], [[sweet-16]], and any age celebration. [[private-cruises]] for 14-75 guests with DJ, floats, and professional service. Make this birthday one they\'ll never forget!',
    sections: [
      {
        heading: 'Birthday Parties on Lake Travis',
        paragraphs: [
          'Make birthdays extraordinary with a Lake Travis party cruise! Whether it\'s Sweet 16, 21st, 30th, 40th, 50th, or any milestone, our birthday cruises create memories that last a lifetime.',
          'Choose from our fleet of party boats and three package levels. From simple cruises to ultimate party experiences with DJ, floats, and all the fun. Every age group loves the unique Lake Travis experience!'
        ]
      },
      {
        heading: 'Birthday Party Options',
        paragraphs: [
          'Customize your perfect birthday celebration:'
        ],
        lists: [
          {
            title: 'Party Formats',
            items: [
              'Kids birthday parties (supervised, life jackets provided)',
              'Teen celebrations (Sweet 16, graduation)',
              '21st birthday parties (BYOB, ID required)',
              'Milestone birthdays (30th, 40th, 50th, 60th+)',
              'Adult birthday celebrations',
              'Surprise party cruises',
              'Combined friend group celebrations',
              'Family reunion birthday parties'
            ]
          },
          {
            title: 'Party Features Available',
            items: [
              'Professional DJ and sound system',
              'Giant party floats and water toys',
              'Birthday decorations and supplies',
              'Cake and catering coordination',
              'Photography and video',
              'Customized birthday playlists',
              'Special guest of honor treatment',
              'Games and activities'
            ]
          }
        ]
      },
      {
        heading: 'Age-Appropriate Options',
        paragraphs: [
          'We specialize in birthday parties for all ages! Kids parties include extra safety measures, life jackets, and supervised fun. Teen parties have age-appropriate activities and responsible oversight.',
          'Adult birthday parties can include BYOB, catered meals, and party atmosphere. Milestone birthdays get special treatment with celebration supplies and VIP guest of honor service.',
          'Family-friendly options available for multi-generational celebrations. Grandparents to grandkids - everyone enjoys the Lake Travis experience together!'
        ]
      },
      {
        heading: 'Planning Your Birthday Cruise',
        paragraphs: [
          'Birthday cruises typically run 3-4 hours. Popular times are afternoon (2pm-5pm) for kids, or evening (6pm-9pm) for adults. Sunset cruises especially popular for milestone birthdays.',
          'Pricing starts at $195/hour for intimate gatherings (14 guests) up to $495/hour for big celebrations (50+ guests). Add Ultimate package for full party experience with floats, DJ, and all the fun.',
          'Book 4-6 weeks in advance for weekend dates. We\'ll coordinate all details including catering, decorations, and special birthday surprises. Just show up and celebrate!'
        ]
      }
    ],
    relatedPages: [
      'sweet-16', 'milestone-birthday', 'graduation-party', 'private-cruises',
      'bachelor-party', 'bachelorette-party', 'corporate-events', 'wedding-party',
      'team-building', 'atx-disco', 'testimonials', 'faq', 'contact'
    ]
  },
  '/graduation-party': {
    h1: 'Graduation Party Cruises Lake Travis | Austin Celebrations',
    introduction: 'Celebrate [[graduation-party]] achievements on Lake Travis! Perfect for high school, college, and graduate school celebrations. [[private-cruises]] for 14-75 guests with DJ, floats, and unforgettable memories. The ultimate way to honor academic success with [[birthday-party]] vibes!',
    sections: [
      {
        heading: 'Graduation Celebrations on the Water',
        paragraphs: [
          'Graduation marks a major milestone deserving of an epic celebration! Whether high school, college, or graduate school, a Lake Travis party cruise creates memories graduates will cherish forever.',
          'Invite classmates, family, and friends for a celebration that stands out. Professional crew, party atmosphere, and beautiful Lake Travis scenery make the perfect backdrop for honoring achievement.'
        ]
      },
      {
        heading: 'Graduation Party Packages',
        paragraphs: [
          'Choose from three package levels perfect for graduation celebrations:'
        ],
        lists: [
          {
            title: 'Standard Graduation Package',
            items: [
              'Professional captain and crew',
              'Premium Bluetooth sound system',
              'Coolers with ice provided',
              'Comfortable seating areas',
              'Perfect for families and close friends',
              'Celebration on a budget'
            ]
          },
          {
            title: 'Essentials Package (Most Popular)',
            items: [
              'Everything from Standard',
              'Pre-stocked coolers with ice',
              'Water dispenser and cups',
              'Food service tables',
              'Enhanced convenience',
              'Perfect for combined family/friend groups'
            ]
          },
          {
            title: 'Ultimate Grad Party Package',
            items: [
              'Everything from Essentials',
              'Giant lily pad floats',
              'Guest of honor float for graduate',
              'Party supplies and decorations',
              'Bubble guns and photo props',
              'Full party atmosphere',
              'Ultimate celebration experience'
            ]
          }
        ]
      },
      {
        heading: 'Perfect for All Graduation Types',
        paragraphs: [
          'High school graduations: Celebrate with classmates before everyone heads to college. Create last memories together on Lake Travis with DJ, floats, and party vibes.',
          'College graduations: Invite family who traveled to Austin for the ceremony. Show them Lake Travis while celebrating your achievement. Perfect venue for multi-generational celebrations.',
          'Graduate school & professional programs: Celebrate advanced degrees with colleagues, mentors, and family. More sophisticated celebrations with catering and cocktails available.',
          'Class parties: Combine with other graduates for larger celebrations. Split costs while creating bigger party atmosphere with multiple families and friend groups.'
        ]
      },
      {
        heading: 'Graduation Party Details',
        paragraphs: [
          'Most graduation parties run 3-4 hours in late afternoon or evening. Popular May/June weekend dates book 6-8 weeks in advance - reserve early!',
          'Catering coordination available - popular options include BBQ, pizza, tacos, or upscale dining. BYOB friendly for 21+ guests with ID. Family-friendly non-alcoholic celebrations welcome.',
          'Pricing starts at $195/hour for intimate graduations (14 guests) to $495/hour for big class celebrations (50+ guests). Ultimate package recommended for maximum celebration vibes.',
          'We\'ve hosted hundreds of graduation parties - it\'s one of our favorite celebrations! The pride, excitement, and joy of graduates and families creates incredible energy on the water.'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What group size works for graduation parties? Graduation cruises accommodate 14-75 guests depending on celebration style. Day Tripper (14 guests) works for intimate family celebrations, Me Seeks the Irony (25 guests) suits typical graduation parties with close friends and family, and Clever Girl (50-75 guests) handles larger class celebrations and combined graduation parties.',
          'Can we bring graduation decorations? Absolutely! Graduation parties can be fully customized with school colors, banners, balloons, and celebratory decorations. The crew assists with setup when you book Essentials or Ultimate packages. Many families bring photos, diplomas for display, and class memorabilia.',
          'Do you accommodate both family and friend groups? Yes! Graduation cruises are perfect for combined celebrations with both family members who traveled for the ceremony and the graduate\'s friend group. The boat setting provides natural spaces for both groups to celebrate together and separately.',
          'Can we bring food and cake? Absolutely! We coordinate with your preferred caterer or restaurant for delivery. Popular choices include pizza, BBQ, tacos, or upscale catering. Birthday-style graduation cakes are welcome - our crew provides space and service for cake cutting ceremony.',
          'What\'s the best timing for graduation parties? Most graduation parties run 3-4 hours in late afternoon or evening (4pm-8pm or 6pm-10pm). May and June weekend dates book 6-8 weeks in advance, so reserve early! Consider the ceremony schedule and travel plans of out-of-town family.',
          'Is alcohol allowed at graduation parties? BYOB is allowed for guests 21+ with valid ID. Many graduation parties are family-friendly with non-alcoholic beverages. We provide coolers, ice, cups, and openers. Responsible consumption required with crew discretion.',
          'How much does a graduation party cruise cost? Graduation party pricing depends on boat size. Day Tripper starts at $195/hour (14 guests), Me Seeks the Irony at $295/hour (25 guests), Clever Girl at $495/hour (50-75 guests). Ultimate package (+$250-350/hr) recommended for full graduation celebration experience. Most 3-4 hour parties range from $585-$3,380 total.'
        ]
      }
    ],
    relatedPages: [
      'birthday-party', 'sweet-16', 'milestone-birthday', 'private-cruises',
      'bachelor-party', 'bachelorette-party', 'corporate-events', 'team-building',
      'wedding-party', 'atx-disco', 'testimonials', 'faq', 'contact'
    ]
  },
  '/sweet-16': {
    h1: 'Sweet 16 Party Cruises Lake Travis | Austin Birthday Boats',
    introduction: 'Celebrate [[sweet-16]] in style on Lake Travis! Unique [[birthday-party]] cruise experience with DJ, floats, and friends. [[private-cruises]] for 14-50 guests with professional service and supervised fun. Make this Sweet 16 absolutely unforgettable!',
    sections: [
      {
        heading: 'Sweet 16 Lake Travis Experience',
        paragraphs: [
          'Make Sweet 16 truly special with a Lake Travis party cruise! Instead of traditional venues, celebrate on the water with friends, DJ, floats, and incredible Lake Travis views. It\'s the unique Austin experience teenagers love!',
          'Our Sweet 16 cruises provide the perfect balance of fun and safety. Professional crew, supervised activities, and age-appropriate entertainment ensure parents can relax while the birthday teen and friends have the time of their lives.'
        ]
      },
      {
        heading: 'Sweet 16 Party Features',
        paragraphs: [
          'Everything included for an epic Sweet 16 celebration:'
        ],
        lists: [
          {
            items: [
              'Professional DJ with teen-favorite playlists',
              'Giant party floats and water toys',
              'Birthday decorations and supplies',
              'Guest of honor special treatment',
              'Photo opportunities throughout cruise',
              'Swimming (life jackets provided)',
              'Dance area with sound system',
              'Clean restroom facilities',
              'Shaded lounge areas',
              'Supervised fun with professional crew',
              'Coolers for snacks and drinks (non-alcoholic)',
              'Cake service coordination'
            ]
          }
        ]
      },
      {
        heading: 'Safety & Supervision',
        paragraphs: [
          'Sweet 16 parties include enhanced safety measures and supervision. Coast Guard certified captain, professional crew, and safety equipment ensure secure fun on the water.',
          'Life jackets provided and required for swimming activities. Crew monitors all water activities. Age-appropriate music and entertainment. Parent/guardian presence options available based on your preference.',
          'We\'ve hosted hundreds of teen celebrations with perfect safety record. Parents trust us to provide responsible fun while teens enjoy an amazing Lake Travis experience.'
        ]
      },
      {
        heading: 'Planning Your Sweet 16 Cruise',
        paragraphs: [
          'Sweet 16 cruises typically run 3-4 hours in afternoon (1pm-4pm or 2pm-5pm). These times work perfect for teen energy and parent schedules.',
          'Popular guest count is 20-30 teens (friends and classmates). Our 25-person boat is most popular for Sweet 16 celebrations. Ultimate package recommended for full party experience.',
          'Catering options include pizza delivery, taco catering, or favorite teen foods. Non-alcoholic beverages and mocktails available. Birthday cake service coordinated.',
          'Book 6-8 weeks in advance for weekend dates, especially during summer and spring. Pricing starts at $295/hour with Ultimate package at $545/hour. Worth every penny for an unforgettable Sweet 16!',
          'This is the Sweet 16 story they\'ll tell forever. Friends still talking about it years later. Instagram-worthy, memory-making, absolutely epic Lake Travis Sweet 16!'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What are the age requirements for Sweet 16 party cruises? Sweet 16 cruises are designed for teenagers celebrating their 16th birthday with friends aged 13-18. At least one parent or adult chaperone (21+) must be onboard. We recommend 2-3 adult chaperones for larger parties to ensure proper supervision.',
          'How is the Sweet 16 party supervised? Professional captain and crew maintain constant supervision and safety oversight throughout the cruise. Parents/chaperones provide additional supervision based on your preference. Life jackets are available and required for swimming.',
          'What\'s included in a Sweet 16 party cruise? All Sweet 16 cruises include licensed captain and professional crew, premium Bluetooth sound system for teen playlists, swimming and floating access (weather permitting), comfortable seating, climate-controlled restrooms, and ice/coolers. Ultimate package (+$250-350/hr) adds giant floats, decorations, water toys, and premium entertainment setup.',
          'Is swimming safe during Sweet 16 parties? Yes, swimming is safe with proper precautions. All swimmers must wear provided life jackets. Crew monitors water activities and weather conditions constantly. Swimming occurs in designated safe areas of Lake Travis with crew oversight.',
          'What music and entertainment options are available? Sweet 16 parties feature premium Bluetooth sound systems for streaming teen playlists. The birthday girl can be DJ with her own Spotify or Apple Music. Ultimate package includes enhanced sound and party lighting for dance vibes.',
          'What group size is ideal for Sweet 16 parties? Sweet 16 cruises accommodate 14-50 guests. Day Tripper (14 guests) suits intimate celebrations with closest friends, Me Seeks the Irony (25 guests) works for typical friend groups plus a few family members, and Clever Girl (50+ guests) handles big celebrations.',
          'How much does a Sweet 16 party cruise cost? Sweet 16 pricing varies by boat size and package. Base rates: Day Tripper $195/hr (14 guests), Me Seeks the Irony $295/hr (25 guests), Clever Girl $495/hr (50+ guests). Ultimate (+$250-350/hr) includes floats, decorations, water toys, and premium party package. Most 3-4 hour Sweet 16 parties range from $585-$3,380.'
        ]
      }
    ],
    relatedPages: [
      'birthday-party', 'graduation-party', 'milestone-birthday', 'private-cruises',
      'bachelor-party', 'bachelorette-party', 'wedding-party', 'corporate-events',
      'team-building', 'atx-disco', 'testimonials', 'faq', 'contact'
    ]
  },
  '/milestone-birthday': {
    h1: 'Milestone Birthday Cruises Lake Travis | 30th 40th 50th Parties',
    introduction: 'Celebrate [[milestone-birthday]] (30th, 40th, 50th, 60th+) on Lake Travis! Sophisticated [[birthday-party]] cruises with friends and family. [[private-cruises]] for 14-75 guests, customizable packages, and unforgettable experiences. Make this milestone birthday absolutely legendary!',
    sections: [
      {
        heading: 'Milestone Birthday Celebrations',
        paragraphs: [
          'Milestone birthdays deserve extraordinary celebrations! Whether you\'re turning 30, 40, 50, 60, or beyond, a Lake Travis cruise provides the perfect venue for honoring life\'s big moments.',
          'Gather friends and family for a sophisticated yet fun celebration on the water. Beautiful scenery, premium service, and complete customization make milestone birthdays unforgettable.'
        ]
      },
      {
        heading: 'Perfect for Every Milestone',
        paragraphs: [
          'We specialize in milestone birthday celebrations for all ages:'
        ],
        lists: [
          {
            title: '30th Birthday Parties',
            items: [
              'Fun party atmosphere with friends',
              'DJ and dance floor available',
              'BYOB with full cooler service',
              'Perfect blend of sophistication and fun',
              'Instagram-worthy celebration'
            ]
          },
          {
            title: '40th Birthday Celebrations',
            items: [
              'Upscale yet relaxed atmosphere',
              'Catered meals and cocktail service',
              'Friends and family together',
              'Sunset timing for beautiful backdrop',
              'Sophisticated milestone celebration'
            ]
          },
          {
            title: '50th, 60th & Beyond',
            items: [
              'Multi-generational celebrations',
              'Elegant catering and service',
              'Comfortable seating for all ages',
              'Special recognition and toasts',
              'Creating lasting family memories',
              'Premium experience for honored guest'
            ]
          }
        ]
      },
      {
        heading: 'Milestone Party Packages',
        paragraphs: [
          'Choose from our three package levels, each perfect for milestone celebrations:',
          'Standard Package: Professional captain, crew, sound system, and basic amenities. Great for intimate gatherings and budget-conscious celebrations.',
          'Essentials Package: Adds pre-stocked coolers, water service, and enhanced convenience. Most popular for milestone birthdays with 20-40 guests.',
          'Ultimate Package: Full party experience with floats, party supplies, complete setup. Recommended for milestone celebrations where you want maximum impact and zero hassle.'
        ]
      },
      {
        heading: 'Creating Unforgettable Memories',
        paragraphs: [
          'Milestone birthdays are about celebrating life\'s journey with the people who matter most. Lake Travis provides the perfect setting - beautiful, relaxed, and away from everyday distractions.',
          'Popular elements include champagne toasts, photo slideshows (we provide sound system), catered meals from favorite restaurants, and heartfelt speeches from friends and family.',
          'Many groups do sunset timing for incredible photos and romantic ambiance. The golden hour light on Lake Travis creates magical birthday celebration moments.',
          'Pricing starts at $195/hour for intimate celebrations (14 guests) to $495/hour for large milestone parties (50+ guests). Most milestone celebrations run 4 hours including cruise, meal, toasts, and celebration.',
          'Book 6-8 weeks in advance for weekend dates. We\'ll coordinate every detail - catering, decorations, special surprises - to make this milestone birthday absolutely perfect!'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'Which milestone birthdays do you celebrate? We celebrate all milestone birthdays: 21st (finally legal!), 30th (new decade), 40th (fabulous at forty), 50th (golden celebration), 60th, 70th, 80th and beyond! Each milestone deserves unique celebration reflecting the honoree\'s personality and life stage.',
          'What group size is ideal for milestone birthday cruises? Milestone birthday cruises accommodate 14-75 guests depending on celebration style. Day Tripper (14 guests) creates intimate gatherings with closest friends and family, Me Seeks the Irony (25 guests) suits most milestone celebrations, and Clever Girl (50-75 guests) handles big bash celebrations.',
          'Can you help coordinate surprise birthday parties? Yes! We love surprise parties and coordinate timing perfectly for the big reveal. Work with our team to plan guest arrival before the birthday honoree. We\'ll position the boat for maximum surprise impact and help coordinate the \'surprise!\' moment.',
          'What catering and birthday cake options are available? Milestone birthdays deserve special catering! Options include upscale appetizers, seated dinners, BBQ feasts, or the honoree\'s favorite cuisines. We coordinate with Austin\'s finest caterers for delivery and setup. Birthday cakes are welcome - crew provides space for cake cutting ceremony.',
          'Do you provide champagne service for milestone birthdays? Milestone birthdays are perfect for champagne toasts! Cruises are BYOB - bring your favorite champagne, wine, and spirits. We provide ice, coolers, champagne flutes, and crew assistance with serving.',
          'How much does a milestone birthday cruise cost? Milestone birthday pricing depends on boat size and package level. Base rates: Day Tripper $195/hr (14 guests), Me Seeks the Irony $295/hr (25 guests), Clever Girl $495/hr (50-75 guests). Ultimate (+$250-350/hr recommended for milestones) includes complete premium experience. Most 3-4 hour milestone celebrations cost $885-$3,380.',
          'What\'s the best timing for milestone birthday cruises? Milestone birthdays typically run 3-4 hours for complete celebration experience. Popular timing includes sunset cruises for romantic atmosphere, afternoon parties for swimming and activities, or evening celebrations for dinner and toasts.'
        ]
      }
    ],
    relatedPages: [
      'birthday-party', 'sweet-16', 'graduation-party', 'private-cruises',
      'bachelor-party', 'bachelorette-party', 'wedding-party', 'corporate-events',
      'team-building', 'atx-disco', 'testimonials', 'faq', 'contact'
    ]
  },
  '/party-boat-austin': {
    h1: 'Party Boat Austin | Lake Travis Cruises & Rentals',
    introduction: 'Austin\'s premier [[party-boat-austin]] experience on Lake Travis! Choose from [[private-cruises]] or join the legendary [[atx-disco]]. Perfect for [[bachelor-party]]/[[bachelorette-party]], birthdays, [[corporate-events]], and any celebration. Professional crew, premium amenities, and unforgettable Lake Travis memories!',
    sections: [
      {
        heading: 'Austin Party Boat Options',
        paragraphs: [
          'Premier Party Cruises offers two amazing party boat experiences in Austin:'
        ],
        lists: [
          {
            title: 'ATX Disco Cruise - $85-$105 per person',
            items: [
              'Join the ultimate multi-group party cruise',
              'Professional DJ and photographer included',
              'Giant floats and disco dance floor',
              'Perfect for bachelor/bachelorette parties',
              'Most affordable Austin party boat option',
              'Packages from Basic Bach to Platinum VIP'
            ]
          },
          {
            title: 'Private Party Boat Rentals - Starting $195/hour',
            items: [
              'Exclusive boat just for your group',
              'Fleet: 14, 25, or 50 person capacity',
              'Complete customization and control',
              'Perfect for corporate events & private parties',
              'Professional captain and crew included',
              'Three package levels available'
            ]
          }
        ]
      },
      {
        heading: 'Why Choose Austin Party Boats',
        paragraphs: [
          'Lake Travis is Austin\'s premier party destination, and Premier Party Cruises has been the leader for 14+ years. Here\'s why Austin groups choose us:'
        ],
        lists: [
          {
            items: [
              '14+ years Austin party boat experience',
              '125,000+ happy customers served',
              'Perfect safety record maintained',
              'Newest and nicest fleet on Lake Travis',
              'Coast Guard certified captains',
              'BYOB friendly with cooler service',
              'Professional entertainment options',
              'Complete customization available',
              'Easy booking and planning',
              'Best value for Austin party boats'
            ]
          }
        ]
      },
      {
        heading: 'Perfect for Any Austin Celebration',
        paragraphs: [
          'Our Austin party boats are perfect for any occasion:'
        ],
        lists: [
          {
            items: [
              'Bachelor & bachelorette parties',
              'Birthday celebrations (all ages)',
              'Corporate events & team building',
              'Wedding parties (rehearsal, welcome, after)',
              'Graduation parties',
              'Anniversary celebrations',
              'Family reunions',
              'Client entertainment',
              'Company milestones',
              'Just-because Lake Travis fun!'
            ]
          }
        ]
      },
      {
        heading: 'The Austin Party Boat Experience',
        paragraphs: [
          'Picture this: You and your group cruising beautiful Lake Travis with Austin skyline in the distance. Music pumping from premium speakers, friends dancing, swimming from giant floats, and creating memories that last forever.',
          'Our professional crew handles everything - navigation, safety, setup - while you enjoy the ultimate Austin party experience. BYOB friendly, so bring your favorite drinks. Catering coordination available for food.',
          'Whether you choose the high-energy ATX Disco Cruise or exclusive private boat rental, you\'re guaranteed an unforgettable Austin party boat experience on Lake Travis!',
          'Book your Austin party boat today! Weekend dates fill 6-8 weeks in advance. Don\'t miss out on the best party boat experience Austin has to offer!'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What\'s the difference between ATX Disco Cruise and private boat rental? ATX Disco Cruise is a multi-group shared party cruise with professional DJ, photographer, and disco dance floor at $85-105/person. Private boat rentals are exclusively your group with complete customization starting at $195/hour. Disco Cruise is budget-friendly and high-energy; private boats offer exclusivity and control.',
          'How many people can party boats accommodate in Austin? We accommodate 14-75 guests for private boats. Day Tripper hosts 14 guests, Meeseeks and The Irony accommodates 25 guests, and Clever Girl can host 50-75 guests. Disco Cruise welcomes groups of 6-20+ per group, with multiple groups sharing the boat.',
          'What\'s included with Austin party boats? All cruises include Coast Guard certified captain and professional crew, premium Bluetooth sound systems, life jackets and safety equipment, coolers with ice, clean restroom facilities, and sun/shade seating areas. Private boats offer complete BYOB service; Disco Cruise includes DJ and photographer.',
          'Where do Austin party boats depart from? All cruises depart from Anderson Mill Marina on Lake Travis, located at 13993 FM 2769, Leander, TX 78641. The marina is approximately 30 minutes from downtown Austin with ample free parking for all guests.',
          'Can we bring our own food and drinks on Austin party boats? Yes! BYOB is allowed for guests 21+ with valid ID (cans and plastic containers only). We provide coolers and ice. You can bring your own food or we can coordinate catering delivery. Many groups order pizza, BBQ, tacos, or other Austin favorites delivered right to the boat.',
          'How far in advance should we book Austin party boats? Book 6-8 weeks in advance for weekend dates, especially during peak season (April-October). Weekday bookings can be made with less advance notice. Popular dates like bachelor/bachelorette parties and summer weekends fill earliest.',
          'What makes Lake Travis the best Austin party boat destination? Lake Travis offers beautiful clear blue water perfect for swimming, stunning Hill Country scenery, year-round perfect weather, Instagram-worthy sunset views, and professional party atmosphere. Located just 20 miles from downtown Austin with easy access.'
        ]
      }
    ],
    relatedPages: [
      'atx-disco', 'private-cruises', 'bachelor-party', 'bachelorette-party',
      'birthday-party', 'wedding-party', 'corporate-events', 'team-building',
      'graduation-party', 'party-boat-lake-travis', 'testimonials', 'faq', 'contact'
    ]
  },
  '/party-boat-lake-travis': {
    h1: 'Party Boat Lake Travis | Austin Cruises & Rentals',
    introduction: 'Experience the ultimate [[party-boat-lake-travis]]! Premier Party Cruises offers [[private-cruises]] and the [[atx-disco]] for unforgettable celebrations. 14+ years serving Austin with perfect safety record. Book your Lake Travis party boat today!',
    sections: [
      {
        heading: 'Lake Travis Party Boat Options',
        paragraphs: [
          'Choose your perfect Lake Travis party boat experience:'
        ],
        lists: [
          {
            title: 'Private Lake Travis Boat Rentals',
            items: [
              'Exclusive boat just for your group',
              '14, 25, or 50 person capacity boats',
              'Professional captain and crew',
              'Premium Bluetooth sound systems',
              'BYOB with coolers and ice',
              'Customizable routes and activities',
              'Perfect for private celebrations',
              'Starting at $195/hour'
            ]
          },
          {
            title: 'ATX Disco Cruise Lake Travis',
            items: [
              'Join the legendary party cruise',
              'Professional DJ and photographer',
              'Disco dance floor with LED lights',
              'Giant unicorn and lily pad floats',
              'Multi-group party atmosphere',
              'Bachelor/bachelorette party favorite',
              'Most affordable Lake Travis option',
              'Packages $85-$105 per person'
            ]
          }
        ]
      },
      {
        heading: 'Why Lake Travis for Party Boats',
        paragraphs: [
          'Lake Travis is Central Texas\' premier party destination for good reason:'
        ],
        lists: [
          {
            items: [
              'Beautiful clear blue water perfect for swimming',
              'Stunning Hill Country scenery',
              'Perfect year-round weather',
              '20 miles from downtown Austin',
              'Multiple coves and party spots',
              'Sunset views that are Instagram-perfect',
              'Best party atmosphere in Texas',
              'Professional marina facilities',
              'Easy access from Austin, Round Rock, Cedar Park',
              'The Lake Travis experience is legendary!'
            ]
          }
        ]
      },
      {
        heading: 'Lake Travis Party Boat Features',
        paragraphs: [
          'Every Premier Party Cruises boat on Lake Travis includes:'
        ],
        lists: [
          {
            items: [
              'Coast Guard certified captains',
              'Professional crew members',
              'Premium Bluetooth sound systems',
              'Large coolers (ice included on select packages)',
              'Clean restroom facilities',
              'Comfortable seating - sun and shade',
              'Safety equipment and life jackets',
              'Swimming platform access',
              'Party float options available',
              'Complete Lake Travis knowledge and expertise'
            ]
          }
        ]
      },
      {
        heading: 'Planning Your Lake Travis Party',
        paragraphs: [
          'Lake Travis party boats are perfect for any celebration: bachelor/bachelorette parties, birthdays, corporate events, weddings, graduations, and more. We\'ve hosted over 125,000 guests with perfect safety record.',
          'Most parties run 3-4 hours, with options for longer adventures. Popular times include afternoon fun (2pm-6pm) or sunset cruises (6pm-9pm). Private boats offer complete flexibility on timing.',
          'BYOB friendly for guests 21+ with ID (cans/plastic containers only). Catering coordination available - many groups love having food delivered right to the boat on Lake Travis.',
          'Book 6-8 weeks in advance for weekend dates, especially during peak season (April-September). Weekday availability is better with less advance notice needed.',
          'Pricing: Private boats start at $195/hour (4-hour minimum). Disco Cruise packages $85-$105 per person. Best value for Lake Travis party boats, guaranteed!',
          'Ready to experience the best party boat on Lake Travis? Book now and create memories that last forever!'
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'What are the party boat options on Lake Travis? Lake Travis offers two main options: Private boat rentals (exclusive boat for your group, 14-75 capacity, starting $195/hour) and ATX Disco Cruise (multi-group party with DJ and photographer, $85-105/person). Private boats offer exclusivity; Disco Cruise is more affordable with high-energy atmosphere.',
          'How many people can Lake Travis party boats hold? Private boats accommodate 14-75 guests depending on vessel. Day Tripper holds 14 guests, Meeseeks and The Irony holds 25 guests, and Clever Girl accommodates 50-75 guests. Disco Cruise welcomes multiple groups of 6-20+ per group.',
          'Can we bring our own alcohol on Lake Travis party boats? Yes! All Lake Travis party boats are BYOB friendly for guests 21+ with valid ID. Cans and plastic containers only (no glass). We provide coolers, ice, cups, and openers. Responsible consumption is required.',
          'What\'s included with Lake Travis party boats? All boats include Coast Guard certified captain, professional crew, premium Bluetooth sound system, coolers with ice (select packages), safety equipment and life jackets, clean restroom facilities, comfortable seating with sun and shade areas, and swimming platform access.',
          'Where do Lake Travis party boats depart from? All cruises depart from Anderson Mill Marina, located at 13993 FM 2769, Leander, TX 78641. Free parking available for all guests. The marina is approximately 30 minutes from downtown Austin with easy access from Austin, Round Rock, and Cedar Park.',
          'How far in advance should we book? Book 6-8 weeks in advance for weekend dates, especially during peak season (April-September). Summer weekends and popular dates book earliest. Weekday availability is better with less advance notice needed.',
          'What makes Lake Travis the best for party boats? Lake Travis offers beautiful clear blue water perfect for swimming, stunning Hill Country scenery with nature preserves, perfect year-round weather, Instagram-worthy sunset views, professional marina facilities, and legendary party atmosphere. It\'s Central Texas\' premier party destination!'
        ]
      }
    ],
    relatedPages: [
      'atx-disco', 'private-cruises', 'bachelor-party', 'bachelorette-party',
      'birthday-party', 'wedding-party', 'corporate-events', 'team-building',
      'graduation-party', 'party-boat-austin', 'testimonials', 'faq', 'contact'
    ]
  },
  '/corporate-events': {
    h1: 'Corporate Events Lake Travis | Austin Business Cruises',
    introduction: 'Elevate your [[corporate-events]] with Lake Travis cruises! Perfect for [[team-building]], [[client-entertainment]], [[company-milestone]], and employee appreciation. [[private-cruises]] for 14-75 guests with professional service. Premier corporate event experience in Austin.',
    sections: [
      {
        heading: 'Corporate Event Solutions',
        paragraphs: [
          'Transform your corporate events with unique Lake Travis cruise experiences. We specialize in professional business events that combine productivity with memorable experiences.'
        ],
        lists: [
          {
            title: 'Team Building Events',
            items: [
              'Strengthen team collaboration and communication',
              'Icebreaker activities on the water',
              'Problem-solving challenges and games',
              'Relaxed networking environment',
              'Build lasting team connections',
              'Custom activities for your goals'
            ]
          },
          {
            title: 'Client Entertainment',
            items: [
              'Impress clients with unique Austin experience',
              'Private setting for relationship building',
              'Upscale catering and beverage service',
              'Professional crew and premium boats',
              'Memorable experiences that close deals',
              'Flexible formats for your business needs'
            ]
          },
          {
            title: 'Company Milestones & Celebrations',
            items: [
              'Company anniversaries and achievements',
              'IPO and funding celebrations',
              'Revenue milestone recognition',
              'Award ceremonies and honors',
              'Retirement celebrations',
              'Expansion and growth celebrations'
            ]
          },
          {
            title: 'Employee Appreciation',
            items: [
              'Thank your team in style',
              'Quarterly or annual appreciation events',
              'Department celebrations',
              'Employee of the quarter/year recognition',
              'Work-life balance initiatives',
              'Retention and morale building'
            ]
          }
        ]
      },
      {
        heading: 'Corporate Event Features',
        paragraphs: [
          'Professional service and amenities for successful corporate events:'
        ],
        lists: [
          {
            items: [
              'Coast Guard certified professional captains',
              'Experienced crew trained for corporate events',
              'Premium boats with professional appearance',
              'Catering coordination with top Austin vendors',
              'Full bar service available',
              'Sound system for presentations',
              'Wi-Fi available on select boats',
              'Professional photography options',
              'Customizable formats and activities',
              'Complete event planning support',
              'Flexible payment and invoicing',
              'Volume discounts for regular clients'
            ]
          }
        ]
      },
      {
        heading: 'Why Companies Choose Lake Travis',
        paragraphs: [
          'Lake Travis provides the ideal setting for corporate events. Away from office distractions, teams and clients engage authentically in a relaxed yet professional environment.',
          'The unique Austin experience impresses clients and delights employees. It shows your company values quality experiences and invests in relationships. Many companies report improved morale, collaboration, and business results after Lake Travis events.',
          'Perfect location just 20 miles from downtown Austin, easily accessible for all attendees. Beautiful Hill Country scenery provides stunning backdrop for corporate photos and social media.',
          '14+ years serving Austin businesses with perfect safety and service record. Over 125,000 guests have experienced our professional corporate events. We understand business needs and deliver exceptional results.'
        ]
      },
      {
        heading: 'Corporate Event Planning',
        paragraphs: [
          'We handle all event logistics so you can focus on your business objectives. Choose from our fleet based on group size (14-75 guests). Select package level from Standard to Ultimate based on desired experience.',
          'Popular formats: half-day team building (3-4 hours), client lunch cruises (2-3 hours), sunset cocktail events (2-3 hours), or full-day corporate retreats (6+ hours).',
          'Catering options range from casual BBQ to upscale dining. Full bar service available, or bring your own beverages. Activities can be structured (facilitated team building) or relaxed (networking and relationship building).',
          'Pricing starts at $195/hour with volume discounts for regular corporate clients. Most corporate events are 3-4 hours. Book 4-6 weeks in advance for optimal date selection.',
          'Let us create the perfect corporate event on Lake Travis. Contact us today to discuss your business objectives and how a cruise can achieve them!'
        ]
      }
    ],
    relatedPages: [
      'team-building', 'client-entertainment', 'company-milestone', 'private-cruises',
      'wedding-party', 'bachelor-party', 'bachelorette-party', 'birthday-party',
      'graduation-party', 'party-boat-austin', 'testimonials', 'faq', 'contact'
    ]
  },
  '/wedding-parties': {
    h1: 'Wedding Party Cruises Lake Travis | Austin Wedding Boats',
    introduction: 'Celebrate your [[wedding-party]] on Lake Travis! Perfect for [[welcome-party]], [[rehearsal-dinner]], wedding day cruises, and [[after-party]]. [[private-cruises]] for 14-75 guests with elegant service. Make your Austin wedding unforgettable with a Lake Travis celebration!',
    sections: [
      {
        heading: 'Wedding Celebration Options',
        paragraphs: [
          'Premier Party Cruises specializes in wedding celebrations on Lake Travis. Choose from multiple event types throughout your wedding weekend:'
        ],
        lists: [
          {
            title: 'Welcome Party Cruises',
            items: [
              'Greet out-of-town guests Friday evening',
              'Beautiful sunset on Lake Travis',
              'Both families get to know each other',
              'Relaxed atmosphere before wedding day',
              'Show guests the beauty of Austin',
              'Perfect alternative to traditional welcome dinner'
            ]
          },
          {
            title: 'Rehearsal Dinner Cruises',
            items: [
              'Intimate setting for wedding party and family',
              'Elegant yet relaxed atmosphere',
              'Sunset backdrop for toasts and speeches',
              'Catered dinner service on the water',
              'Create special memories the night before',
              'More unique than traditional restaurant venues'
            ]
          },
          {
            title: 'Wedding Day Cruises',
            items: [
              'Unique wedding ceremony on the water',
              'Reception cruises after ceremony',
              'Cocktail hour while guests mingle',
              'Sunset wedding photos on Lake Travis',
              'Intimate elopement experiences',
              'Unforgettable wedding day on the water'
            ]
          },
          {
            title: 'After Party Cruises',
            items: [
              'Continue celebrating after reception',
              'Late night DJ and dancing',
              'Midnight champagne toasts',
              'Close friends and family only',
              'Perfect wedding night finale',
              'Memories to last a lifetime'
            ]
          }
        ]
      },
      {
        heading: 'Wedding Party Features',
        paragraphs: [
          'Professional wedding service with attention to every detail:'
        ],
        lists: [
          {
            items: [
              'Experienced captains and wedding-trained crew',
              'Elegant boats perfect for weddings',
              'Complete catering coordination',
              'Premium sound system for music and speeches',
              'Professional photography available',
              'Customizable decorations and setup',
              'Champagne service and toasts',
              'Dance floor areas on larger boats',
              'Romantic sunset timing available',
              'Flexible packages for any budget',
              'Complete wedding planning support',
              'Seamless timeline coordination'
            ]
          }
        ]
      },
      {
        heading: 'Why Choose Lake Travis for Weddings',
        paragraphs: [
          'Lake Travis provides the most stunning wedding backdrop in Austin. Crystal blue water, Hill Country scenery, and gorgeous sunsets create magical wedding moments you\'ll treasure forever.',
          'Your guests will remember the unique Lake Travis experience long after the wedding. It\'s sophisticated yet relaxed, elegant yet fun - the perfect balance for wedding celebrations.',
          'Many couples choose multiple Lake Travis events throughout their wedding weekend: welcome party Friday, rehearsal dinner cruise, and after party Saturday. It creates a cohesive, memorable wedding experience.',
          'Perfect for destination weddings in Austin. Out-of-town guests love experiencing Lake Travis, and it showcases the best of Austin hospitality and natural beauty.'
        ]
      },
      {
        heading: 'Wedding Planning Details',
        paragraphs: [
          'We recommend booking wedding cruises 3-6 months in advance, especially for peak wedding season (April-June, September-October). This ensures optimal date and boat availability.',
          'Our wedding coordinator works with you to plan every detail: timing, catering, decorations, music, and special touches. We coordinate with your other vendors to ensure seamless execution.',
          'Fleet options accommodate any wedding party size: intimate elopements (14 guests) to large receptions (75+ guests). Choose package level from elegant Standard to luxurious Ultimate.',
          'Pricing starts at $195/hour for smaller boats, up to $495/hour for our flagship. Most wedding events are 3-4 hours. We offer wedding package discounts for booking multiple events.',
          'Let us make your wedding day perfect! Contact us today to start planning your unforgettable Lake Travis wedding celebration.'
        ]
      }
    ],
    relatedPages: [
      'rehearsal-dinner', 'welcome-party', 'after-party', 'bachelor-party',
      'bachelorette-party', 'combined-bach', 'private-cruises', 'corporate-events',
      'birthday-party', 'graduation-party', 'testimonials', 'faq', 'contact'
    ]
  },
  '/testimonials-faq': {
    h1: 'Testimonials & FAQ | Premier Party Cruises Lake Travis',
    introduction: 'Read what our customers say about their Lake Travis [[testimonials]] experiences! Over 125,000 happy guests, 5-star reviews, and answers to all your questions about Premier Party Cruises. See why we\'re Austin\'s #1 [[party-boat-austin]] company!',
    sections: [
      {
        heading: 'Customer Testimonials',
        paragraphs: [
          'Don\'t just take our word for it - hear from real customers who\'ve experienced Premier Party Cruises:'
        ],
        lists: [
          {
            items: [
              '"Best bachelorette party ever! The disco cruise was AMAZING - DJ was incredible, photographer captured perfect moments, and the bride cruised free! 10/10 recommend!" - Sarah M., Dallas',
              '"Booked a private cruise for our corporate team building. Professional service, beautiful boat, and our team loved it. Already planning our next event!" - Michael T., Austin',
              '"50th birthday party on Lake Travis was perfect! Captain was great, Ultimate package had everything, and our guests are still talking about it months later!" - Jennifer L., Round Rock',
              '"ATX Disco Cruise for our combined bachelor/bachelorette party was the best decision! Both sides had a blast together, way better than separate parties!" - Chris & Amanda, San Antonio',
              '"Rehearsal dinner cruise was magical! Sunset was gorgeous, catering was perfect, and it set the tone for our wedding weekend. Highly recommend!" - Taylor & Brandon, Georgetown'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions',
        paragraphs: [
          'Get answers to the most common questions about Premier Party Cruises:'
        ],
        lists: [
          {
            title: 'What\'s Included?',
            items: [
              'Licensed, experienced captain & crew',
              'Premium Bluetooth sound system',
              'Large coolers with ice (Essentials/Ultimate packages)',
              'Clean restroom facilities',
              'Sun and shade seating areas',
              'Safety equipment and life jackets',
              'Professional service throughout'
            ]
          },
          {
            title: 'Can We Bring Food and Drinks?',
            items: [
              'Yes! BYOB for guests 21+ with valid ID',
              'Cans and plastic containers only (no glass)',
              'Bring snacks, meals, or coordinate catering delivery',
              'We provide coolers and ice (package dependent)',
              'Solo cups provided on Essentials/Ultimate packages',
              'Popular: pizza, tacos, BBQ, or upscale catering'
            ]
          },
          {
            title: 'How Do Deposits and Payments Work?',
            items: [
              '25% deposit if booking >30 days out',
              'Balance due 30 days prior to cruise date',
              'If booking within 30 days: 50% deposit due',
              'Remainder due within 72 hours',
              'Credit card, debit card, or bank transfer accepted',
              'Flexible payment plans available for large groups'
            ]
          },
          {
            title: 'What\'s Your Cancellation Policy?',
            items: [
              '48-hour full refund window after booking',
              'After 48 hours: weather-dependent at captain\'s discretion',
              'Unsafe weather = full refund or reschedule',
              'Pro-rated refunds if weather shortens cruise',
              'We want you to have a great experience safely!',
              'Flexible rescheduling when possible'
            ]
          },
          {
            title: 'Is Swimming Allowed?',
            items: [
              'Yes! When conditions are safe',
              'Captain\'s discretion based on weather, water, traffic',
              'Life jackets required in the water',
              'Adult life jackets provided',
              'Bring infant/child life jackets if needed',
              'Lily pads and floats available (package dependent)'
            ]
          },
          {
            title: 'How Far in Advance Should We Book?',
            items: [
              'Weekend dates: book 6-8 weeks in advance',
              'Peak season (April-September): book 8-12 weeks early',
              'Weekdays: 2-4 weeks usually sufficient',
              'Last-minute availability sometimes possible',
              'Popular dates (holidays, graduation season) fill fastest',
              'Book early for best boat and time selection!'
            ]
          }
        ]
      },
      {
        heading: 'Why Choose Premier Party Cruises',
        paragraphs: [
          'With 14+ years of experience and over 125,000 satisfied customers, Premier Party Cruises is Austin\'s most trusted Lake Travis party boat company. Here\'s what sets us apart:'
        ],
        lists: [
          {
            items: [
              '14+ years Lake Travis expertise',
              '125,000+ happy customers served',
              'Perfect safety record maintained',
              'Newest fleet on Lake Travis',
              'Coast Guard certified captains',
              '5-star customer reviews',
              'Professional, friendly crew',
              'Flexible packages for any budget',
              'Complete party planning support',
              'Best value on Lake Travis guaranteed!'
            ]
          }
        ]
      },
      {
        heading: 'Still Have Questions?',
        paragraphs: [
          'We\'re here to help! Contact us at (512) 488-5892 or clientservices@premierpartycruises.com for answers to any questions not covered here.',
          'Our friendly team can help you choose the perfect boat, package, and timing for your celebration. We make Lake Travis party planning easy and stress-free!',
          'Ready to book? Start your quote online or call us directly. We can\'t wait to help you create unforgettable Lake Travis memories!'
        ]
      }
    ],
    relatedPages: [
      'bachelor-party', 'bachelorette-party', 'atx-disco', 'private-cruises',
      'wedding-party', 'corporate-events', 'team-building', 'birthday-party',
      'graduation-party', 'party-boat-austin', 'party-boat-lake-travis', 'faq', 'contact'
    ]
  },
  '/contact': {
    h1: 'Contact Premier Party Cruises - Lake Travis Austin',
    introduction: 'Ready to plan your Lake Travis adventure? [[contact]] Premier Party Cruises, Austin\'s premier [[party-boat-austin]] and party cruise company. Call us at (512) 488-5892 or email clientservices@premierpartycruises.com for immediate assistance with your [[private-cruises]] booking.',
    sections: [
      {
        heading: 'Get in Touch with Premier Party Cruises',
        paragraphs: [
          'Premier Party Cruises is here to make your Lake Travis celebration unforgettable. Whether you\'re planning a bachelor party, bachelorette party, corporate event, birthday celebration, or just a fun day on the water, our experienced team is ready to help you create the perfect experience.',
          'Located at 13993 FM 2769, Leander, TX 78641, we\'ve been serving the Austin area and Lake Travis for over 14 years. With our fleet of premium party boats and professional crew, we ensure every cruise is safe, fun, and memorable.'
        ],
        lists: [
          {
            title: 'Contact Information',
            items: [
              'Phone: (512) 488-5892 - Call or text anytime!',
              'Email: clientservices@premierpartycruises.com',
              'Address: 13993 FM 2769, Leander, TX 78641',
              'Hours: Monday-Sunday, 9:00 AM - 9:00 PM',
              'Response Time: Usually within 1 hour during business hours',
              'Emergency Contact: Available for day-of cruise issues'
            ]
          }
        ]
      },
      {
        heading: 'Why Contact Premier Party Cruises',
        paragraphs: [
          'When you reach out to Premier Party Cruises, you\'re connecting with Austin\'s most experienced Lake Travis party boat company. Our team has helped over 125,000 customers create unforgettable memories on the water. We pride ourselves on exceptional customer service, transparent pricing, and creating customized experiences that exceed expectations.',
          'Our booking specialists are Lake Travis experts who can help you choose the perfect boat, select the ideal package, recommend the best times to cruise, and coordinate all the details for your special event. We handle everything from small intimate gatherings to large corporate events and multi-boat celebrations.'
        ],
        lists: [
          {
            title: 'How We Can Help You',
            items: [
              'Instant quotes and availability for any date',
              'Expert recommendations for boat and package selection',
              'Custom packages tailored to your specific needs',
              'Group discounts for large parties',
              'Transportation coordination assistance',
              'Catering and bar service recommendations',
              'Special celebration add-ons (decorations, photographers, DJs)',
              'Weather contingency planning',
              'Same-day booking when available',
              'Flexible payment options and plans'
            ]
          }
        ]
      },
      {
        heading: 'Booking Your Lake Travis Party Cruise',
        paragraphs: [
          'Booking with Premier Party Cruises is easy and flexible. You can start your quote online, call us directly, or send an email with your party details. We offer instant booking confirmation, secure payment processing, and comprehensive booking support from initial inquiry through your cruise date.',
          'Our online booking system allows you to check real-time availability, select your preferred boat and package, customize your experience with add-ons, and receive instant confirmation. For those who prefer personal service, our booking specialists are available by phone seven days a week.'
        ],
        lists: [
          {
            title: 'What to Have Ready When You Contact Us',
            items: [
              'Preferred cruise date (and backup dates if flexible)',
              'Approximate number of guests',
              'Type of celebration (bachelor, bachelorette, birthday, corporate)',
              'Preferred cruise duration (4-hour minimum)',
              'Budget range for planning purposes',
              'Any special requests or requirements',
              'Transportation needs from Austin',
              'Interest in add-on services (DJ, photographer, catering)'
            ]
          }
        ]
      },
      {
        heading: 'Customer Service Excellence',
        paragraphs: [
          'At Premier Party Cruises, customer service is our top priority. From your first contact through your cruise and beyond, we\'re committed to providing exceptional service. Our team responds quickly to inquiries, provides detailed information about all options, and works within your budget to create the perfect experience.',
          'We maintain a 5-star rating across all review platforms because we genuinely care about each customer\'s experience. Our team goes above and beyond to accommodate special requests, handle last-minute changes, and ensure every detail is perfect for your Lake Travis celebration.'
        ],
        lists: [
          {
            title: 'Our Service Commitments',
            items: [
              'Response to all inquiries within 1 hour during business hours',
              'Transparent, all-inclusive pricing with no hidden fees',
              'Flexible cancellation and rescheduling policies',
              'Weather monitoring and proactive communication',
              'Day-of cruise support and coordination',
              'Post-cruise follow-up to ensure satisfaction',
              'Assistance with group logistics and planning',
              'Bilingual support available (English and Spanish)'
            ]
          }
        ]
      },
      {
        heading: 'Frequently Asked Questions When Contacting Us',
        paragraphs: [
          'When you contact Premier Party Cruises, our team is prepared to answer all your questions about Lake Travis boat rentals, party packages, pricing, and logistics. Here are some of the most common questions we help customers with every day.',
          'Don\'t hesitate to ask us anything - no question is too small or too complicated. Our experienced team has handled thousands of events and can provide expert guidance on everything from boat selection to party planning to Lake Travis navigation.'
        ],
        lists: [
          {
            title: 'Common Questions We Answer',
            items: [
              'What\'s the difference between private charters and disco cruises?',
              'How much does it cost to rent a party boat?',
              'What\'s included in each package?',
              'Can we bring our own food and drinks?',
              'Is alcohol allowed on the boats?',
              'What happens if weather is bad?',
              'How far in advance should we book?',
              'Do you offer group discounts?',
              'Can we customize our cruise route?',
              'What safety measures are in place?',
              'Is transportation available from Austin?',
              'Can we bring our own DJ or decorations?'
            ]
          }
        ]
      },
      {
        heading: 'Connect on Social Media',
        paragraphs: [
          'Follow Premier Party Cruises on social media for the latest updates, special offers, and amazing photos from recent cruises. We love sharing the fun and excitement of Lake Travis with our community. Tag us in your photos and use #PremierPartyCruises to be featured!',
          'Our social media channels are also great for getting quick answers to questions, seeing real customer experiences, and finding inspiration for your own Lake Travis celebration. Join thousands of happy customers who follow us for Lake Travis party boat updates and exclusive deals.'
        ],
        lists: [
          {
            title: 'Find Us On Social Media',
            items: [
              'Instagram: @premierpartycruises - Daily cruise photos and stories',
              'Facebook: Premier Party Cruises - Updates, events, and reviews',
              'TikTok: @premierpartycruisesatx - Fun videos from the lake',
              'YouTube: Premier Party Cruises - Virtual boat tours and highlights',
              'Google Business: Read reviews and see photos',
              'Yelp: Check out detailed customer experiences',
              'TripAdvisor: #1 rated Lake Travis boat rental'
            ]
          }
        ]
      },
      {
        heading: 'Visit Us at Lake Travis',
        paragraphs: [
          'Premier Party Cruises operates from prime Lake Travis locations with easy access from Austin. Our main office at 13993 FM 2769 in Leander is just 30 minutes from downtown Austin. We depart from multiple marinas around Lake Travis to provide convenient access for all our customers.',
          'Whether you\'re coming from Austin, Round Rock, Cedar Park, or anywhere in Central Texas, we\'re easily accessible via major highways. Our team can provide detailed directions, parking information, and even arrange transportation from your location to ensure a smooth start to your Lake Travis adventure.'
        ],
        lists: [
          {
            title: 'Location and Directions',
            items: [
              'Main Office: 13993 FM 2769, Leander, TX 78641',
              'Just 30 minutes from downtown Austin',
              'Easy access from Highway 183 and FM 1431',
              'Multiple departure locations on Lake Travis',
              'Free parking available at all marina locations',
              'Rideshare and transportation services available',
              'GPS coordinates: 30.432167, -97.881167',
              'Look for Premier Party Cruises flags and signs'
            ]
          }
        ]
      }
    ],
    relatedPages: [
      'bachelor-party', 'bachelorette-party', 'atx-disco', 'private-cruises',
      'wedding-party', 'corporate-events', 'team-building', 'birthday-party',
      'graduation-party', 'party-boat-austin', 'testimonials', 'faq', 'home'
    ]
  },
  '/gallery': {
    h1: 'Gallery - Premier Party Cruises Austin Lake Travis Photos & Videos',
    introduction: 'Explore our stunning collection of photos and videos from real Premier Party Cruises events on Lake Travis. See [[bachelor-party]], [[bachelorette-party]], [[corporate-events]], [[atx-disco]], and all the amazing celebrations on Austin\'s premier party boats.',
    sections: [
      {
        heading: 'Real Photos from Lake Travis Party Cruises',
        paragraphs: [
          'Browse through thousands of authentic photos from actual Premier Party Cruises events. Our gallery showcases the excitement, beauty, and unforgettable moments that happen daily on Lake Travis. From epic bachelor parties to elegant corporate events, see why we\'re Austin\'s #1 rated party boat company.',
          'All photos are taken by our professional photographers or shared by happy customers. We capture the energy of ATX Disco Cruises, the elegance of wedding celebrations, the excitement of bachelor and bachelorette parties, and the natural beauty of Lake Travis sunsets.'
        ],
        lists: [
          {
            title: 'Photo Categories',
            items: [
              'Bachelor Party celebrations with the guys',
              'Bachelorette Party fun with the bride tribe',
              'ATX Disco Cruise dance floor action',
              'Corporate events and team building',
              'Birthday party celebrations',
              'Wedding parties and rehearsal dinners',
              'Lake Travis scenic sunset views',
              'Fleet showcase - Day Tripper, Me Seeks, Clever Girl',
              'Summer fun with lily pads and floats',
              'Party atmosphere and group celebrations'
            ]
          }
        ]
      },
      {
        heading: 'Premier Party Cruises Fleet Gallery',
        paragraphs: [
          'Take a virtual tour of our premium party boat fleet. Each vessel is meticulously maintained and equipped with state-of-the-art sound systems, comfortable seating, and all the amenities for an incredible Lake Travis experience.',
          'From our intimate 14-person Day Tripper to our flagship 75-person Clever Girl with 14 disco balls and a giant Texas flag, see why our boats are the newest and nicest on Lake Travis.'
        ],
        lists: [
          {
            title: 'Our Premium Fleet',
            items: [
              'Day Tripper - 14 person luxury pontoon boat',
              'Me Seeks the Irony - 25 person party boat',
              'Clever Girl - 50-75 person flagship vessel',
              'Professional sound systems on every boat',
              'Lily pads and floating mats included',
              'Coolers with ice provided',
              'Clean restroom facilities',
              'Safety equipment and licensed captains'
            ]
          }
        ]
      },
      {
        heading: 'ATX Disco Cruise Photo Highlights',
        paragraphs: [
          'Experience the magic of our famous ATX Disco Cruise through stunning photography. See multiple bachelor and bachelorette groups coming together for the ultimate Lake Travis party with professional DJs, photographers, and non-stop entertainment.',
          'Our Disco Cruise photos capture the energy of the dance floor, the fun of giant unicorn floats, the beauty of Lake Travis, and the joy of celebrations. Every cruise is professionally photographed with digital copies provided to all guests.'
        ],
        lists: [
          {
            title: 'Disco Cruise Moments',
            items: [
              'Dance floor action with live DJ',
              'Giant unicorn float adventures',
              'Group photos with Lake Travis backdrop',
              'Swimming and lily pad relaxation',
              'Sunset golden hour photography',
              'Bachelor and bachelorette group shots',
              'Party games and competitions',
              'Professional photography included'
            ]
          }
        ]
      },
      {
        heading: 'Customer Celebration Photos',
        paragraphs: [
          'See real celebrations from our amazing customers! These authentic photos showcase the variety of events we host on Lake Travis - from intimate gatherings to massive multi-boat parties. Every photo tells a story of unforgettable memories made with Premier Party Cruises.',
          'Our customers love sharing their experiences, and we\'re proud to showcase their celebrations. Tag us @premierpartycruises on Instagram or use #PremierPartyCruises to be featured in our gallery!'
        ],
        lists: [
          {
            title: 'Celebration Types Featured',
            items: [
              'Bachelor parties living their best life',
              'Bachelorette parties with the bride tribe',
              'Corporate team building success stories',
              'Milestone birthday celebrations',
              'Family reunions on the water',
              'Graduation parties',
              'Anniversary celebrations',
              'Surprise proposals on Lake Travis',
              'Holiday parties and special events'
            ]
          }
        ]
      },
      {
        heading: 'Lake Travis Scenic Beauty',
        paragraphs: [
          'Lake Travis provides the perfect backdrop for your celebration. Our gallery showcases the natural beauty of the Texas Hill Country, crystal-clear waters, dramatic cliffs, and spectacular sunsets that make every cruise memorable.',
          'From sunrise to sunset, Lake Travis offers constantly changing scenery. Our photos capture the golden hours, blue skies, starlit evenings, and the unique beauty that makes Lake Travis one of the most beautiful lakes in Texas.'
        ],
        lists: [
          {
            title: 'Scenic Highlights',
            items: [
              'Stunning Lake Travis sunset views',
              'Crystal clear swimming spots',
              'Dramatic cliff formations',
              'Hidden coves and peaceful inlets',
              'Austin skyline views from the water',
              'Wildlife sightings - birds and fish',
              'Full moon cruises',
              'Golden hour photography opportunities'
            ]
          }
        ]
      },
      {
        heading: 'Video Gallery Highlights',
        paragraphs: [
          'Watch our video gallery to experience the energy and excitement of Premier Party Cruises. From boat tours to event highlights, our videos give you an immersive look at what makes us Austin\'s premier party boat company.',
          'See testimonials from happy customers, virtual boat tours, ATX Disco Cruise highlights, and get inspired for your own Lake Travis adventure. All videos are available on our YouTube channel @premierpartycruises.'
        ],
        lists: [
          {
            title: 'Featured Videos',
            items: [
              'Virtual boat tours of our entire fleet',
              'ATX Disco Cruise highlight reels',
              'Customer testimonials and reviews',
              'Bachelor party celebration videos',
              'Bachelorette party fun compilations',
              'Lake Travis scenic drone footage',
              'Safety and orientation videos',
              'Seasonal event highlights',
              'Behind the scenes with our crew'
            ]
          }
        ]
      }
    ],
    relatedPages: [
      'bachelor-party', 'bachelorette-party', 'atx-disco', 'private-cruises',
      'wedding-party', 'corporate-events', 'birthday-party', 'graduation-party',
      'team-building', 'party-boat-austin', 'testimonials', 'contact', 'home'
    ]
  }
};
