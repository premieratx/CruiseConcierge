import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  Heart, Wine, Music, Users, Building, Trophy,
  Crown, Sparkles, GraduationCap, ChevronRight, 
  Calendar, MessageSquare, Star, Check, ArrowRight,
  Gift, PartyPopper, Briefcase, Cake, Clock, Shield
} from 'lucide-react';
import { formatCurrency } from '@shared/formatters';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Experience types
type ExperienceCategory = 'wedding' | 'corporate' | 'birthday' | 'special';

interface PackageTier {
  name: string;
  price: string;
  duration: string;
  features: string[];
  recommended?: boolean;
}

interface Experience {
  id: string;
  category: ExperienceCategory;
  title: string;
  tagline: string;
  icon: any;
  highlights: string[];
  overview: string;
  packages: PackageTier[];
  pageUrl: string;
}

// Experience data
const experiences: Experience[] = [
  // Wedding Experiences
  {
    id: 'rehearsal-dinner',
    category: 'wedding',
    title: 'Rehearsal Dinner',
    tagline: 'Elegant pre-wedding celebration on Lake Travis',
    icon: Wine,
    highlights: [
      'Intimate sunset cruises',
      'Tables & coolers for your food',
      'Toast the couple in style'
    ],
    overview: 'Create unforgettable memories with an elegant rehearsal dinner cruise on Lake Travis. Our experienced crew ensures a seamless evening while you focus on celebrating with family and closest friends.',
    packages: [
      {
        name: 'Intimate Gathering',
        price: '$400',
        duration: '2 hours',
        features: [
          '14-person pontoon boat',
          'Sunset cruise timing',
          'Champagne toast setup',
          'Premium sound system',
          'Professional captain'
        ]
      },
      {
        name: 'Classic Celebration',
        price: '$675',
        duration: '3 hours',
        features: [
          '25-30 person pontoon',
          'Extended cruise time',
          'Full bar setup assistance',
          'Decorated boat option',
          'Dedicated crew member'
        ],
        recommended: true
      },
      {
        name: 'Luxury Experience',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '50-person flagship party boat',
          'Spacious single-deck design',
          'Alcohol delivery coordination',
          'Premium amenities',
          'Multiple crew members'
        ]
      }
    ],
    pageUrl: '/rehearsal-dinner'
  },
  {
    id: 'welcome-party',
    category: 'wedding',
    title: 'Welcome Party',
    tagline: 'Kick off wedding weekend in Austin style',
    icon: Heart,
    highlights: [
      'Welcome out-of-town guests',
      'Casual lake atmosphere',
      'Mix and mingle cruise'
    ],
    overview: 'Start your wedding weekend with a splash! Our welcome party cruises provide the perfect casual atmosphere for guests to meet, mingle, and enjoy beautiful Lake Travis views.',
    packages: [
      {
        name: 'Casual Welcome',
        price: '$450',
        duration: '2 hours',
        features: [
          '25-30 person pontoon',
          'Afternoon cruise',
          'Coolers & ice included',
          'Bluetooth sound system',
          'Swimming stops available'
        ]
      },
      {
        name: 'Premium Welcome',
        price: '$750',
        duration: '3 hours',
        features: [
          '50-person party boat',
          'Extended cruise time',
          'Multiple entertainment zones',
          'Bar setup assistance',
          'Water toys included'
        ],
        recommended: true
      },
      {
        name: 'Grand Welcome',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '75-person large party boat',
          'Full party atmosphere',
          'DJ equipment ready',
          'Spacious single-deck layout',
          'Full crew service'
        ]
      }
    ],
    pageUrl: '/welcome-party'
  },
  {
    id: 'after-party',
    category: 'wedding',
    title: 'After Party',
    tagline: 'Keep the celebration going all night',
    icon: Music,
    highlights: [
      'Late night party cruise',
      'DJ-ready sound system',
      'Dance under the stars'
    ],
    overview: 'When the reception ends, the real party begins! Continue celebrating on Lake Travis with music, dancing, and unforgettable memories under the stars.',
    packages: [
      {
        name: 'Intimate After Party',
        price: '$400',
        duration: '2 hours',
        features: [
          '14-person pontoon',
          'Night cruise lighting',
          'Premium sound system',
          'Late night availability',
          'Party atmosphere setup'
        ]
      },
      {
        name: 'Classic After Party',
        price: '$675',
        duration: '3 hours',
        features: [
          '25-30 person pontoon',
          'LED party lighting',
          'DJ-ready setup',
          'Extended hours available',
          'Experienced party crew'
        ],
        recommended: true
      },
      {
        name: 'Ultimate After Party',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '50-75 person party boat',
          'Multiple party zones',
          'Professional lighting',
          'VIP atmosphere',
          'Full crew service'
        ]
      }
    ],
    pageUrl: '/after-party'
  },

  // Corporate Events
  {
    id: 'team-building',
    category: 'corporate',
    title: 'Team Building',
    tagline: 'Strengthen bonds with interactive lake activities',
    icon: Users,
    highlights: [
      'Interactive team challenges',
      'Swimming & water activities',
      'Boost morale & collaboration'
    ],
    overview: 'Take your team out of the office and onto Lake Travis for an unforgettable team building experience. Our customizable activities promote collaboration, communication, and camaraderie.',
    packages: [
      {
        name: 'Small Team',
        price: '$600',
        duration: '3 hours',
        features: [
          '14-person pontoon',
          'Team building activities',
          'Swimming stops',
          'Coolers & refreshments',
          'Activity coordination'
        ]
      },
      {
        name: 'Department Outing',
        price: '$900',
        duration: '4 hours',
        features: [
          '25-30 person pontoon',
          'Multiple activity zones',
          'Water sports equipment',
          'BBQ grill available',
          'Professional facilitation'
        ],
        recommended: true
      },
      {
        name: 'Company Retreat',
        price: '$1,250',
        duration: '5 hours',
        features: [
          '50-75 person party boat',
          'Full day experience',
          'Tables for your food setup',
          'Team challenges',
          'Awards & recognition setup'
        ]
      }
    ],
    pageUrl: '/team-building'
  },
  {
    id: 'client-entertainment',
    category: 'corporate',
    title: 'Client Entertainment',
    tagline: 'Impress clients with Austin\'s best views',
    icon: Building,
    highlights: [
      'Professional atmosphere',
      'Scenic lake tour',
      'Premium hospitality'
    ],
    overview: 'Show your clients the best of Austin hospitality with a luxury cruise on Lake Travis. Perfect for closing deals, celebrating partnerships, or networking in style.',
    packages: [
      {
        name: 'Executive Meeting',
        price: '$600',
        duration: '3 hours',
        features: [
          '14-person pontoon',
          'Quiet business atmosphere',
          'Refreshment service',
          'Scenic route planning',
          'Professional captain'
        ]
      },
      {
        name: 'Client Appreciation',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '50-person flagship party boat',
          'BYOB - Party On Delivery coordination',
          'Coolers and ice setup',
          'Business amenities',
          'Dedicated crew'
        ],
        recommended: true
      },
      {
        name: 'VIP Experience',
        price: '$1,250',
        duration: '5 hours',
        features: [
          '75-person large party boat',
          'White glove service',
          'Tables & coolers provided',
          'Entertainment options',
          'Concierge service'
        ]
      }
    ],
    pageUrl: '/client-entertainment'
  },
  {
    id: 'company-milestone',
    category: 'corporate',
    title: 'Company Milestones',
    tagline: 'Celebrate achievements in grand style',
    icon: Trophy,
    highlights: [
      'Launch celebrations',
      'Anniversary parties',
      'Award ceremonies'
    ],
    overview: 'Mark your company\'s biggest achievements with a memorable celebration on Lake Travis. From product launches to anniversaries, make milestones unforgettable.',
    packages: [
      {
        name: 'Small Celebration',
        price: '$675',
        duration: '3 hours',
        features: [
          '25-30 person pontoon',
          'Celebration setup',
          'Toast coordination',
          'Music & atmosphere',
          'Photo opportunities'
        ]
      },
      {
        name: 'Major Milestone',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '50-person party boat',
          'Speech platform setup',
          'Award ceremony space',
          'Alcohol delivery coordination',
          'Professional crew'
        ],
        recommended: true
      },
      {
        name: 'Grand Celebration',
        price: '$1,250',
        duration: '5 hours',
        features: [
          '75-person large party boat',
          'Full event production',
          'Multiple celebration zones',
          'Premium everything',
          'Dedicated event team'
        ]
      }
    ],
    pageUrl: '/company-milestone'
  },

  // Birthday Parties
  {
    id: 'milestone-birthday',
    category: 'birthday',
    title: 'Milestone Birthdays',
    tagline: '21st, 30th, 40th, 50th & beyond',
    icon: Crown,
    highlights: [
      'Unforgettable celebrations',
      'All ages welcome',
      'Customized experiences'
    ],
    overview: 'Make milestone birthdays truly special with a custom Lake Travis cruise. Whether turning 21 or 80, we create the perfect atmosphere for your celebration.',
    packages: [
      {
        name: 'Intimate Celebration',
        price: '$400',
        duration: '2 hours',
        features: [
          '14-person pontoon',
          'Birthday decorations',
          'Cake table setup',
          'Party playlist ready',
          'Birthday surprises'
        ]
      },
      {
        name: 'Party Cruise',
        price: '$675',
        duration: '3 hours',
        features: [
          '25-30 person pontoon',
          'Full party setup',
          'Swimming & activities',
          'Birthday throne available',
          'Celebration crew'
        ],
        recommended: true
      },
      {
        name: 'Grand Celebration',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '50-75 person party boat',
          'Multiple party areas',
          'DJ equipment ready',
          'VIP birthday treatment',
          'Full service crew'
        ]
      }
    ],
    pageUrl: '/milestone-birthday'
  },
  {
    id: 'sweet-16',
    category: 'birthday',
    title: 'Sweet 16',
    tagline: 'Make their 16th birthday unforgettable',
    icon: Sparkles,
    highlights: [
      'Teen-friendly activities',
      'Instagram-worthy moments',
      'Safe & supervised fun'
    ],
    overview: 'Create the ultimate Sweet 16 celebration on Lake Travis! Our experienced crew ensures a safe, fun, and memorable experience for teens and their friends.',
    packages: [
      {
        name: 'Sweet Celebration',
        price: '$400',
        duration: '2 hours',
        features: [
          '14-person pontoon',
          'Teen-friendly music',
          'Photo prop setup',
          'Swimming stops',
          'Experienced crew'
        ]
      },
      {
        name: 'Party Package',
        price: '$675',
        duration: '3 hours',
        features: [
          '25-30 person pontoon',
          'Dance party setup',
          'Water activities',
          'Birthday decorations',
          'Safety supervision'
        ],
        recommended: true
      },
      {
        name: 'Ultimate Sweet 16',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '50-person party boat',
          'Multiple zones for activities',
          'Professional photo ops',
          'Full party production',
          'Dedicated teen crew'
        ]
      }
    ],
    pageUrl: '/sweet-16'
  },

  // Special Events
  {
    id: 'graduation-party',
    category: 'special',
    title: 'Graduation Parties',
    tagline: 'Celebrate academic achievements in style',
    icon: GraduationCap,
    highlights: [
      'High school & college grads',
      'Family-friendly options',
      'Memory-making moments'
    ],
    overview: 'Honor your graduate\'s achievement with a memorable Lake Travis celebration. Perfect for high school, college, or advanced degree celebrations.',
    packages: [
      {
        name: 'Small Grad Party',
        price: '$400',
        duration: '2 hours',
        features: [
          '14-person pontoon',
          'Grad decorations',
          'Family-friendly cruise',
          'Photo opportunities',
          'Celebration atmosphere'
        ]
      },
      {
        name: 'Class Celebration',
        price: '$675',
        duration: '3 hours',
        features: [
          '25-30 person pontoon',
          'Friends & family size',
          'Party atmosphere',
          'Swimming activities',
          'Grad party crew'
        ],
        recommended: true
      },
      {
        name: 'Grand Graduation',
        price: '$1,000',
        duration: '4 hours',
        features: [
          '50-75 person party boat',
          'Large group capacity',
          'Multiple celebration areas',
          'Full party amenities',
          'Professional service'
        ]
      }
    ],
    pageUrl: '/graduation-party'
  }
];

// Group experiences by category
const experiencesByCategory = {
  wedding: experiences.filter(e => e.category === 'wedding'),
  corporate: experiences.filter(e => e.category === 'corporate'),
  birthday: experiences.filter(e => e.category === 'birthday'),
  special: experiences.filter(e => e.category === 'special')
};

// Category metadata
const categoryMeta = {
  wedding: {
    title: 'Wedding Experiences',
    description: 'Celebrate love on Lake Travis',
    icon: Heart,
    color: 'text-pink-600 dark:text-pink-400'
  },
  corporate: {
    title: 'Corporate Events',
    description: 'Professional celebrations & team building',
    icon: Briefcase,
    color: 'text-blue-600 dark:text-blue-400'
  },
  birthday: {
    title: 'Birthday Parties',
    description: 'Make birthdays unforgettable',
    icon: Cake,
    color: 'text-purple-600 dark:text-purple-400'
  },
  special: {
    title: 'Special Events',
    description: 'Celebrate life\'s milestones',
    icon: PartyPopper,
    color: 'text-green-600 dark:text-green-400'
  }
};

// Experience card component
function ExperienceCard({ experience }: { experience: Experience }) {
  const [, navigate] = useLocation();
  const Icon = experience.icon;
  const categoryColor = categoryMeta[experience.category].color;

  return (
    <Dialog>
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-brand-blue/50">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Icon className={`h-8 w-8 ${categoryColor}`} />
            <Badge variant="secondary" className="text-xs">
              {experience.category === 'wedding' && 'Wedding'}
              {experience.category === 'corporate' && 'Corporate'}
              {experience.category === 'birthday' && 'Birthday'}
              {experience.category === 'special' && 'Special'}
            </Badge>
          </div>
          <CardTitle className="text-xl">{experience.title}</CardTitle>
          <CardDescription className="text-sm">{experience.tagline}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {experience.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex gap-2 pt-2">
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex-1 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                data-testid={`button-learn-more-${experience.id}`}
              >
                Learn More
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </DialogTrigger>
            
            <div
              className="xola-custom xola-checkout flex-1"
              data-button-id="695186923c261203770cc2e7"
            >
              <Button
                className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-black font-semibold"
                data-testid={`button-book-now-${experience.id}`}
              >
                Book Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog content */}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={`h-10 w-10 ${categoryColor}`} />
            <Badge variant="secondary">{categoryMeta[experience.category].title}</Badge>
          </div>
          <DialogTitle className="text-2xl md:text-3xl">{experience.title}</DialogTitle>
          <DialogDescription className="text-base mt-2">
            {experience.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p className="text-gray-600 dark:text-gray-400">{experience.overview}</p>
          </div>

          {/* Package tiers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Your Package</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {experience.packages.map((pkg, index) => (
                <Card 
                  key={index} 
                  className={cn(
                    "relative",
                    pkg.recommended && "border-2 border-brand-blue shadow-lg"
                  )}
                >
                  {pkg.recommended && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-brand-blue">{pkg.price}</p>
                      <p className="text-sm text-gray-500">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {pkg.duration}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional info */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Flexible Booking</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All packages include professional captain, fuel, coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), premium sound system, 
                  and safety equipment. Food and beverages can be brought aboard or catered.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
          <Button
            onClick={() => navigate(experience.pageUrl)}
            variant="outline"
            className="flex-1"
            data-testid={`button-view-details-${experience.id}`}
          >
            View Full Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            onClick={() => navigate('/chat')}
            className="flex-1 bg-brand-yellow hover:bg-brand-yellow/90 text-black font-bold"
            data-testid={`button-get-quote-${experience.id}`}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Get Quote Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main component
export default function ExperienceCards() {
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory>('wedding');

  return (
    <div className="space-y-8">
      {/* Category tabs */}
      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as ExperienceCategory)}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          {Object.entries(categoryMeta).map(([key, meta]) => {
            const CategoryIcon = meta.icon;
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <CategoryIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{meta.title}</span>
                <span className="sm:hidden">{meta.title.split(' ')[0]}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {Object.entries(experiencesByCategory).map(([category, categoryExperiences]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {categoryMeta[category as ExperienceCategory].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {categoryMeta[category as ExperienceCategory].description}
              </p>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {categoryExperiences.map((experience) => (
                <motion.div
                  key={experience.id}
                  variants={cardVariants}
                >
                  <ExperienceCard experience={experience} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}