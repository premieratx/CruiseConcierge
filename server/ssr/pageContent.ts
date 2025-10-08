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
}

export const PAGE_CONTENT: Record<string, PageContent> = {
  '/': {
    h1: 'Premier Party Cruises - Austin Lake Travis Boat Rentals',
    introduction: 'Experience the ultimate party cruise on Lake Travis with Austin\'s premier boat rental company. Choose from private charters, the ATX Disco Cruise, bachelor parties, bachelorette parties, corporate events, and more. Professional crew, premium amenities, and unforgettable celebrations await.',
    sections: [
      {
        heading: 'Private Charters - Your Exclusive Boat Experience',
        paragraphs: [
          'Choose from our fleet of premium party boats: "Day Tripper" (14 people), "Me Seeks the Irony" (18-25 people), or flagship "Clever Girl" (30-50 people) with giant Texas flag and 14 disco balls. Every private charter includes licensed captains, premium Bluetooth sound systems, large coolers with ice, and all the amenities for an unforgettable celebration.',
          'Perfect for weddings, corporate events, birthdays, and any special celebration. Starting at $195 per hour with a 4-hour minimum. Fully customizable packages to match your event needs.'
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
          'Join the BEST party on Lake Travis! Our signature ATX Disco Cruise features a professional DJ, photographer, disco dance floor, giant floats, and an incredible party atmosphere. Three package levels available: Basic Bach ($85), Disco Queen/King ($95), and Super Sparkle Platinum ($105).',
          'Every disco cruise includes professional entertainment, photo delivery, party supplies, and an unforgettable experience with multiple bachelor and bachelorette groups celebrating together.'
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
          'Plan the perfect bachelor or bachelorette party on Lake Travis! Choose between our affordable ATX Disco Cruise packages or rent a private boat exclusively for your group. Bride cruises FREE on Disco Queen and Platinum packages (16+ paying guests).',
          'We specialize in creating unforgettable bachelor and bachelorette experiences with professional entertainment, premium amenities, and dedicated service. Over 125,000 happy customers have celebrated with us!'
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
          'Elevate your corporate events with a Lake Travis cruise! Perfect for team building, client entertainment, company milestones, and employee appreciation. Our fleet accommodates groups from 14 to 75+ guests with professional service and premium amenities.',
          'Customizable packages include catering coordination, AV equipment, and dedicated event planning to ensure your corporate event is a complete success.'
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
      }
    ]
  },
  '/bachelor-party-austin': {
    h1: 'Austin Bachelor Party Boat Rentals | Lake Travis Cruises',
    introduction: 'Plan the ultimate bachelor party on Lake Travis with Premier Party Cruises! Choose from our affordable ATX Disco Cruise packages ($85-$105 per person) or rent a private boat exclusively for your group. Professional DJ, photographer, party floats, and unforgettable memories included.',
    sections: [
      {
        heading: 'ATX Disco Cruise Bachelor Party Packages',
        paragraphs: [
          'Join the BEST party on Lake Travis! Our disco cruise offers three package levels designed specifically for bachelor parties, with everything included for an epic celebration.'
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
          'Want the boat all to yourselves? Rent a private boat for your bachelor party! Our fleet includes boats for 14, 25, and 50+ guests with professional captains, premium sound, and complete customization.',
          'Private charters start at $195/hour (4-hour minimum) and include everything you need for an exclusive celebration on Lake Travis.'
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
    ]
  },
  '/bachelorette-party-austin': {
    h1: 'Austin Bachelorette Party Boat Cruises | Lake Travis',
    introduction: 'Plan the ultimate bachelorette party on Lake Travis! The ATX Disco Cruise is our specialty with packages starting at $85. Bride cruises FREE on Disco Queen and Platinum packages (16+ paying guests). Professional DJ, photographer, floats, and unforgettable celebration guaranteed!',
    sections: [
      {
        heading: 'Bachelorette Party Cruise Packages',
        paragraphs: [
          'Choose from three amazing package levels designed specifically for bachelorette parties. Each package includes professional DJ, photographer, and everything you need for an epic Lake Travis celebration!'
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
          'Want the boat exclusively for your bachelorette party? Rent a private boat from our fleet! Perfect for groups that want complete privacy and customization. Our boats accommodate 14-50 guests with professional captains and premium amenities.',
          'Private charters include everything: captain, crew, sound system, coolers, ice, and complete control over your route and schedule. Starting at $195/hour with 4-hour minimum.'
        ]
      },
      {
        heading: 'Why Bachelorette Parties Choose Us',
        paragraphs: [
          'With 14+ years specializing in bachelorette parties, we know exactly how to create an unforgettable celebration. Over 125,000 happy customers, perfect safety record, and Austin\'s newest fleet make us the #1 choice for Lake Travis bachelorette parties.'
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
    ]
  },
  '/combined-bachelor-bachelorette-austin': {
    h1: 'Combined Bachelor Bachelorette Parties Austin | Lake Travis',
    introduction: 'Why celebrate separately? Plan the ultimate combined bachelor and bachelorette party on Lake Travis! Both bride AND groom cruise FREE on Party Squad and Ultimate packages. Join the ATX Disco Cruise or rent a private boat for guys and girls celebrating together. Starting at $85 per person.',
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
    ]
  },
  '/atx-disco-cruise': {
    h1: 'ATX Disco Cruise - Ultimate Party Boat Experience Austin',
    introduction: 'Experience the legendary ATX Disco Cruise on Lake Travis! Professional DJ, photographer, disco dance floor, giant floats, and the best party atmosphere in Austin. Three packages available from $85-$105 per person. Join multiple bachelor and bachelorette parties for an unforgettable celebration!',
    sections: [
      {
        heading: 'ATX Disco Cruise Packages',
        paragraphs: [
          'Choose your perfect disco cruise package! Every level includes professional DJ, photographer, party floats, and an incredible 4-hour Lake Travis experience.'
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
      }
    ]
  },
  '/private-cruises': {
    h1: 'Private Boat Rentals Lake Travis | Austin Party Cruises',
    introduction: 'Rent a private boat on Lake Travis for your exclusive celebration! Choose from our fleet of premium boats accommodating 14-75 guests. Everything set up when you arrive - professional captain, crew, sound system, coolers, and complete customization. Three package levels from Standard to Ultimate. Starting at $195/hour.',
    sections: [
      {
        heading: 'Our Private Boat Fleet',
        paragraphs: [
          'Choose the perfect boat for your group size and celebration style:'
        ],
        lists: [
          {
            title: 'Day Tripper - 14 Person Boat',
            items: [
              'Perfect for intimate groups up to 14 guests',
              'Licensed captain and premium sound system',
              'Coolers with ice provided',
              'Comfortable seating with sun and shade',
              'Starting at $195/hour (4-hour minimum)',
              'Ideal for small birthday parties and gatherings'
            ]
          },
          {
            title: 'Me Seeks the Irony - 25 Person Boat',
            items: [
              'Popular choice for medium groups (18-25 guests)',
              'Professional captain and crew',
              'Premium Bluetooth sound system',
              'Large coolers with ice',
              'Starting at $295/hour (4-hour minimum)',
              'Perfect for bachelor/bachelorette parties'
            ]
          },
          {
            title: 'Clever Girl - 50 Person Flagship',
            items: [
              'Flagship boat with 14 disco balls',
              'Giant Texas flag display',
              'Accommodates 30-50 guests',
              'Professional crew and premium amenities',
              'Starting at $495/hour (4-hour minimum)',
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
            title: 'Essentials Package (+$100/hour)',
            items: [
              'Everything from Standard Package',
              'Coolers pre-stocked with ice',
              '5-gallon insulated water dispenser',
              'Solo cups and ice water',
              '6-foot folding table for food',
              'Vendor coordination for catering',
              'Enhanced convenience'
            ]
          },
          {
            title: 'Ultimate Package (+$250/hour)',
            items: [
              'Everything from Essentials Package',
              'Giant lily pad float',
              'Guest of honor float (unicorn or ring)',
              'Disco ball cups for party vibes',
              'Bubble guns and bubble wands',
              'Champagne flutes and fruit juices',
              'SPF-50 spray sunscreen',
              'Plates, plasticware, paper towels',
              'Full party atmosphere setup'
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
      }
    ]
  },
  '/after-party': {
    h1: 'Wedding After Party Cruises Lake Travis | Austin',
    introduction: 'Don\'t let your wedding night end! Continue the celebration with a late-night Lake Travis cruise for you and your closest friends. Professional DJ, midnight champagne, dancing under the stars, and the perfect finale to your special day. Three packages available starting at $200/hour.',
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
      }
    ]
  },
  '/welcome-party': {
    h1: 'Wedding Welcome Party Cruises Lake Travis | Austin',
    introduction: 'Start your wedding weekend with an unforgettable welcome party on Lake Travis! Gather guests who traveled from out of town for a relaxed cruise experience. Perfect for Friday evening before Saturday weddings. Private boat rentals for 14-75 guests with professional service.',
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
      }
    ]
  },
  '/rehearsal-dinner': {
    h1: 'Rehearsal Dinner Cruises Lake Travis | Austin Weddings',
    introduction: 'Host an unforgettable rehearsal dinner on Lake Travis! Private boat cruises for your wedding party and close family. Elegant yet relaxed atmosphere with sunset views, premium service, and complete customization. Perfect alternative to traditional restaurant dinners.',
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
      }
    ]
  },
  '/team-building': {
    h1: 'Team Building Cruises Lake Travis | Corporate Austin',
    introduction: 'Strengthen your team with an unforgettable Lake Travis cruise! Perfect for corporate team building, employee appreciation, and fostering collaboration. Private boats for 14-75 guests with professional service. Unique Austin experience that brings teams together.',
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
      }
    ]
  },
  '/client-entertainment': {
    h1: 'Client Entertainment Cruises Lake Travis | Austin Corporate',
    introduction: 'Impress your clients with an exclusive Lake Travis cruise! Perfect for client appreciation, relationship building, and closing deals in style. Private boat experiences for 14-50 guests with premium service and Austin hospitality.',
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
      }
    ]
  },
  '/company-milestone': {
    h1: 'Company Milestone Cruises Lake Travis | Corporate Celebrations',
    introduction: 'Celebrate company milestones in style on Lake Travis! Perfect for anniversaries, IPOs, major wins, and achievement celebrations. Private boat experiences for teams of 14-75 with professional service and unforgettable memories.',
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
      }
    ]
  },
  '/birthday-parties': {
    h1: 'Birthday Party Boat Cruises Lake Travis | Austin Celebrations',
    introduction: 'Celebrate birthdays on Lake Travis with an unforgettable party cruise! Perfect for milestone birthdays, kids parties, and any age celebration. Private boats for 14-75 guests with DJ, floats, and professional service. Make this birthday one they\'ll never forget!',
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
    ]
  },
  '/graduation-party': {
    h1: 'Graduation Party Cruises Lake Travis | Austin Celebrations',
    introduction: 'Celebrate graduation achievements on Lake Travis! Perfect for high school, college, and graduate school celebrations. Private boat parties for 14-75 guests with DJ, floats, and unforgettable memories. The ultimate way to honor academic success!',
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
      }
    ]
  },
  '/sweet-16': {
    h1: 'Sweet 16 Party Cruises Lake Travis | Austin Birthday Boats',
    introduction: 'Celebrate Sweet 16 in style on Lake Travis! Unique birthday cruise experience with DJ, floats, and friends. Private boat parties for 14-50 guests with professional service and supervised fun. Make this Sweet 16 absolutely unforgettable!',
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
      }
    ]
  },
  '/milestone-birthday': {
    h1: 'Milestone Birthday Cruises Lake Travis | 30th 40th 50th Parties',
    introduction: 'Celebrate milestone birthdays (30th, 40th, 50th, 60th+) on Lake Travis! Sophisticated party cruises with friends and family. Private boats for 14-75 guests, customizable packages, and unforgettable experiences. Make this milestone birthday absolutely legendary!',
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
      }
    ]
  },
  '/party-boat-austin': {
    h1: 'Party Boat Austin | Lake Travis Cruises & Rentals',
    introduction: 'Austin\'s premier party boat experience on Lake Travis! Choose from private boat rentals or join the legendary ATX Disco Cruise. Perfect for bachelor/bachelorette parties, birthdays, corporate events, and any celebration. Professional crew, premium amenities, and unforgettable Lake Travis memories!',
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
      }
    ]
  },
  '/party-boat-lake-travis': {
    h1: 'Party Boat Lake Travis | Austin Cruises & Rentals',
    introduction: 'Experience the ultimate party boat on Lake Travis! Premier Party Cruises offers private boat rentals and the ATX Disco Cruise for unforgettable celebrations. 14+ years serving Austin with perfect safety record. Book your Lake Travis party boat today!',
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
      }
    ]
  },
  '/corporate-events': {
    h1: 'Corporate Events Lake Travis | Austin Business Cruises',
    introduction: 'Elevate your corporate events with Lake Travis cruises! Perfect for team building, client entertainment, company milestones, and employee appreciation. Private boats for 14-75 guests with professional service. Premier corporate event experience in Austin.',
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
    ]
  },
  '/wedding-parties': {
    h1: 'Wedding Party Cruises Lake Travis | Austin Wedding Boats',
    introduction: 'Celebrate your wedding on Lake Travis! Perfect for welcome parties, rehearsal dinners, wedding day cruises, and after parties. Private boat rentals for 14-75 guests with elegant service. Make your Austin wedding unforgettable with a Lake Travis celebration!',
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
    ]
  },
  '/testimonials-faq': {
    h1: 'Testimonials & FAQ | Premier Party Cruises Lake Travis',
    introduction: 'Read what our customers say about their Lake Travis party cruise experiences! Over 125,000 happy guests, 5-star reviews, and answers to all your questions about Premier Party Cruises. See why we\'re Austin\'s #1 party boat company!',
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
    ]
  }
};
