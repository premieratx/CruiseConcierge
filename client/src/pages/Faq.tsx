import { Link } from 'wouter';
import PublicNavigation from '@/components/PublicNavigation';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { SectionReveal } from '@/components/SectionReveal';
import FAQ, { FAQCategory, generateFAQSchema } from '@/components/FAQ';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, Phone, Mail, MessageCircle, ArrowRight,
  Ship, Calendar, DollarSign, Shield, Users, 
  CloudRain, Clock, MapPin, Anchor
} from 'lucide-react';

// Comprehensive FAQ categories with SEO-optimized content
const faqCategories: FAQCategory[] = [
  {
    name: 'General Questions',
    description: 'Essential information about our Lake Travis boat rental services',
    items: [
      {
        id: 'what-types',
        question: 'What types of boat rentals are available on Lake Travis?',
        answer: (
          <>
            We offer two main experiences: <Link href="/private-cruises" className="text-primary hover:underline">Private Boat Charters</Link> for 
            exclusive groups of 14-75 guests starting at $1,050 for 4 hours, and the <Link href="/atx-disco-cruise" className="text-primary hover:underline">ATX 
            Disco Cruise</Link>, our signature party boat experience with DJ, photographer, and amenities included at $85-105 per person. Perfect 
            for bachelor parties, bachelorette parties, corporate events, and celebrations on Lake Travis.
          </>
        )
      },
      {
        id: 'location',
        question: 'Where do you depart from on Lake Travis?',
        answer: 'We depart from Anderson Mill Marina at 13993 FM 2769, Leander, TX 78641. Located approximately 30 minutes from downtown Austin, we\'re the most convenient marina on Lake Travis. Free parking is available, and we recommend arriving 15-20 minutes before departure for check-in and boarding.'
      },
      {
        id: 'what-included',
        question: 'What\'s included with my boat rental on Lake Travis?',
        answer: 'All rentals include Licensed, fun, experienced captains to take your group safely around the lake in style, premium sound system, cooler space (bring your own ice & drinks for standard packages, or add Essentials/Ultimate packages for ice included, or order ahead from Party On Delivery), restroom facilities, and shaded areas. ATX Disco Cruises add professional DJ and photographer, giant floats, and party supplies. Private charters can be customized with additional amenities. Every cruise is BYOB-friendly with no corkage fees.'
      },
      {
        id: 'experience',
        question: 'Why choose Premier Party Cruises for Lake Travis boat rentals?',
        answer: 'With 15+ years of experience and countless satisfied customers, we\'re Austin\'s longest-running party cruise company. We maintain a perfect safety record with Licensed, fun, experienced captains to take your group safely around the lake in style, operate the newest fleet on Lake Travis, and provide full-service experiences. We\'re the only company offering the signature ATX Disco Cruise.'
      },
      {
        id: 'capacity',
        question: 'How many people can you accommodate on Lake Travis cruises?',
        answer: 'We accommodate groups from 14 to 75 guests per boat. Private boats range from Day Tripper (14 guests) to Clever Girl (75 guests). The ATX Disco Cruise handles groups of 20-40 comfortably, with a maximum capacity of 100 guests total per cruise. For larger corporate events, we can coordinate multiple boats departing together.'
      }
    ]
  },
  {
    name: 'Booking & Reservations',
    description: 'Everything about booking your Lake Travis boat experience',
    items: [
      {
        id: 'how-book',
        question: 'How do I book a boat rental on Lake Travis?',
        answer: (
          <>
            Booking is easy! Use our <a href="/chat" className="text-primary hover:underline">instant quote builder</a> to 
            select your date, time, and package. You\'ll receive an immediate quote with availability. Secure your reservation 
            with a deposit, and pay the balance later. Our team is available at (512) 488-5892 for questions or custom requests.
          </>
        )
      },
      {
        id: 'advance-booking',
        question: 'How far in advance should I book my Lake Travis cruise?',
        answer: 'Weekend dates typically book 8-12 weeks for priority time slots - once they book they\'re gone! This is especially true during peak season (April-September). Saturdays book fastest, followed by Fridays and Sundays. We recommend booking immediately once your group confirms dates. Last-minute availability is rare for weekends but sometimes available weekdays.'
      },
      {
        id: 'deposit',
        question: 'What\'s required to secure my boat rental reservation?',
        answer: 'If booking 14+ days before cruise: 25% deposit required, remaining balance due 14 days before cruise. If booking less than 14 days before cruise: 50% deposit required, remaining balance due within 48 hours of booking (or 3 days after booking). We accept all major credit cards. For groups wanting to split payments, we offer convenient payment splitting options at checkout. Corporate clients can request invoicing for approved accounts.'
      },
      {
        id: 'changes',
        question: 'Can I modify my reservation after booking?',
        answer: 'Yes, you can add guests or upgrade packages up to 7 days before your cruise, subject to availability. Date changes depend on availability and may incur fees. Guest count increases are welcome if space permits. Contact us early for any changes at (512) 488-5892.'
      },
      {
        id: 'confirmation',
        question: 'What happens after I book my Lake Travis boat rental?',
        answer: 'You\'ll receive immediate email confirmation with all details, directions, and preparation tips. One week before, we\'ll send a reminder with final logistics. The day before, you\'ll get captain contact information and weather updates. We handle all the details for a smooth experience.'
      }
    ]
  },
  {
    name: 'Pricing & Payment',
    description: 'Transparent pricing information for all boat rental options',
    items: [
      {
        id: 'pricing-overview',
        question: 'How much does it cost to rent a boat on Lake Travis?',
        answer: 'Private boats start at $1,050 for 4-hour cruises for up to 14 guests, ranging up to $2,660 for larger boats (75 guests). The ATX Disco Cruise costs $85-105 per person including DJ, photographer, and amenities. Best value in Austin!'
      },
      {
        id: 'whats-included-price',
        question: 'What\'s included in the rental price?',
        answer: 'Your rental includes the boat, licensed, fun, experienced captains to take your group safely around the lake in style, fuel, cooler space (bring your own ice for standard packages - Essentials/Ultimate packages include ice), sound system, and safety equipment. ATX Disco Cruises add professional DJ, photographer, floats, and party supplies. No hidden fees, fuel surcharges, or dock fees. Gratuity for exceptional service is appreciated but not required.'
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover) and ACH transfers. Groups can split payments among multiple cards at checkout. Corporate clients can request NET terms with approved credit. We don\'t accept cash, checks, or cryptocurrency.'
      },
      {
        id: 'group-discounts',
        question: 'Do you offer group discounts for large parties?',
        answer: 'Yes! Corporate events and multi-boat bookings receive custom pricing. Returning customers enjoy loyalty discounts. Military and first responders receive 10% off with valid ID.'
      },
      {
        id: 'hidden-fees',
        question: 'Are there any additional fees beyond the quoted price?',
        answer: 'No hidden fees! Our quotes include everything: boat, captain, fuel, ice, and listed amenities. Optional add-ons like transportation or decorations are clearly priced. The only potential additional cost is gratuity for exceptional service, which is appreciated but never required.'
      }
    ]
  },
  {
    name: 'Food & Drinks',
    description: 'BYOB policies and what you can bring on your cruise',
    items: [
      {
        id: 'byob-policy',
        question: 'Can we bring our own alcohol on the boat?',
        answer: 'Yes! All cruises are BYOB-friendly for guests 21+ with valid ID. Bring beer, wine, seltzers, and spirits in cans or plastic containers only - no glass for safety. We provide cooler space (bring your own ice, or add Essentials/Ultimate packages for ice included, or order ahead from Party On Delivery). This policy keeps costs low while letting you bring your favorite drinks.'
      },
      {
        id: 'food-allowed',
        question: 'Can we bring food on the Lake Travis cruise?',
        answer: 'Absolutely! Bring your own snacks, meals, or party platters. Popular options include sandwiches, fruit platters, and finger foods that are easy to eat while cruising. Remember, we don\'t provide food but you\'re welcome to bring whatever you\'d like!'
      },
      {
        id: 'catering',
        question: 'Do you offer catering services for boat parties?',
        answer: 'We don\'t provide food directly, but you\'re welcome to bring your own food or arrange catering from any Austin vendor of your choice. We can help coordinate alcohol delivery through Party On Delivery to make your event easier. We provide tables, coolers, and ice for your convenience.'
      },
      {
        id: 'drinks-logistics',
        question: 'How should we pack drinks for the cruise?',
        answer: 'Pack drinks in cans or plastic bottles (no glass) in soft coolers or bags. We have plenty of cooler space onboard. Bring your own ice, or add Essentials/Ultimate packages for ice included, or order everything stocked and ready from Party On Delivery. Bring more than you think - it\'s hot on the lake! Consider bringing water, sodas for mixers, and hydration drinks alongside alcoholic beverages.'
      },
      {
        id: 'water-provided',
        question: 'Is drinking water provided on the boat?',
        answer: 'Yes, we provide ice water stations on all boats to keep everyone hydrated. However, we recommend bringing additional bottled water, sports drinks, or flavored waters, especially during hot summer months. Staying hydrated is crucial for enjoying your full time on Lake Travis.'
      }
    ]
  },
  {
    name: 'Safety & Requirements',
    description: 'Important safety information and cruise requirements',
    items: [
      {
        id: 'safety-measures',
        question: 'What safety measures are in place on Lake Travis boats?',
        answer: 'All boats have Licensed, fun, experienced captains to take your group safely around the lake in style, required safety equipment, and life jackets for every passenger. We maintain comprehensive insurance, conduct regular safety inspections, and monitor weather constantly. Our perfect safety record over 15 years demonstrates our commitment to your security on the water.'
      },
      {
        id: 'age-requirements',
        question: 'What are the age requirements for Lake Travis boat rentals?',
        answer: 'All ages are welcome on private charters with adult supervision. The ATX Disco Cruise is 21+ only as it\'s a party atmosphere. Life jackets are on board and available for swimming - we encourage guests to wear them for safety. Infants require appropriate safety equipment. Valid ID required for all adults consuming alcohol.'
      },
      {
        id: 'swimming',
        question: 'Can we swim during the Lake Travis cruise?',
        answer: 'Yes! After cruising for 30-45 minutes, we tie up along the cliffs of a beautiful Lake Travis nature preserve with crystal clear water. We typically anchor for swimming 1.5-2 hours. Life jackets are on board and available for swimming - we encourage guests to wear them for safety. The captain chooses safe locations based on weather and water conditions.'
      },
      {
        id: 'what-to-bring',
        question: 'What should we bring for our Lake Travis boat rental?',
        answer: 'Bring sunscreen, sunglasses, hats, towels, and swimsuits. Pack drinks and snacks in cans/plastic (no glass). Don\'t forget a phone/camera for photos, and consider a waterproof case. Wear comfortable shoes with grip. We recommend bringing layers as lake weather can change.'
      },
      {
        id: 'mobility',
        question: 'Are your boats accessible for guests with mobility challenges?',
        answer: 'Our crew assists with boarding and accommodates mobility needs when possible. Please inform us of any special requirements when booking. While boats have some limitations, we work to ensure everyone can enjoy Lake Travis. Contact us to discuss specific accessibility needs.'
      }
    ]
  },
  {
    name: 'Weather & Cancellations',
    description: 'Policies for weather, cancellations, and rescheduling',
    items: [
      {
        id: 'weather-policy',
        question: 'What happens if there\'s bad weather on my cruise date?',
        answer: 'We cruise rain or shine! Light rain won\'t cancel your cruise - boats have covered areas. For severe weather (lightning, high winds), the captain makes safety decisions. If we cancel for weather, you receive a full refund or can reschedule. Your safety is our top priority.'
      },
      {
        id: 'cancellation-policy',
        question: 'What\'s your cancellation policy for boat rentals?',
        answer: 'Cancel 48+ hours after booking for a full refund. After that, deposits are non-refundable but can be applied to rescheduling within 12 months. If we cancel for weather or safety, you receive a full refund. We understand plans change and work with reasonable requests.'
      },
      {
        id: 'rescheduling',
        question: 'Can I reschedule my Lake Travis boat rental?',
        answer: 'Yes, rescheduling is possible based on availability. Changes 30+ days out are free. Within 30 days may incur fees. Your deposit can be applied to a new date within 12 months. Popular dates fill quickly, so reschedule as early as possible.'
      },
      {
        id: 'rain-cruise',
        question: 'Do you still cruise if it\'s raining?',
        answer: 'Yes, we cruise in light rain! Boats have covered areas to stay dry, and often rain passes quickly on Lake Travis. Many groups find cruising in light rain refreshing and fun. Only lightning or severe storms cause cancellations. We monitor weather closely and communicate any concerns.'
      },
      {
        id: 'refund-timeline',
        question: 'How quickly are refunds processed?',
        answer: 'Weather cancellation refunds are processed within 48 hours and appear in your account within 3-5 business days. Approved cancellation refunds follow the same timeline. We can also apply credits to future bookings immediately if you prefer to reschedule rather than refund.'
      }
    ]
  },
  {
    name: 'Special Events',
    description: 'Information for bachelor/bachelorette parties and corporate events',
    items: [
      {
        id: 'bachelor-parties',
        question: 'What makes your bachelor party boat rentals special?',
        answer: (
          <>
            Our <Link href="/bachelor-party-austin" className="text-primary hover:underline">bachelor party cruises</Link> include 
            everything for an epic celebration: professional DJ, photographer, giant floats, and party atmosphere. Choose the 
            ATX Disco Cruise for the ultimate party or a private boat for exclusive celebrations on Lake Travis. Multiple time 
            slots available with optional add-on packages for enhanced experiences.
          </>
        )
      },
      {
        id: 'bachelorette-parties',
        question: 'What\'s included in bachelorette party packages?',
        answer: (
          <>
            Our <Link href="/bachelorette-party-austin" className="text-primary hover:underline">bachelorette party packages</Link> feature 
            professional DJ and photographer, mimosa supplies, giant unicorn floats, and Instagram-worthy moments. Perfect for 
            creating unforgettable memories with your girls on Lake Travis! Choose from 3 time slots with optional add-on 
            packages to customize your experience.
          </>
        )
      },
      {
        id: 'corporate-events',
        question: 'Can you accommodate corporate events and team building?',
        answer: (
          <>
            Absolutely! Our <Link href="/corporate-events" className="text-primary hover:underline">corporate event packages</Link> accommodate 
            up to 75 guests on our largest boat. For larger corporate events, we can coordinate multiple boats. Professional service, 
            custom amenities, team building activities, client entertainment, and company celebrations. Alcohol delivery coordination, 
            AV equipment, and dedicated event planning ensure your corporate event exceeds expectations on Lake Travis.
          </>
        )
      },
      {
        id: 'birthdays',
        question: 'Do you offer special packages for birthday parties?',
        answer: 'Yes! Birthday packages include decorations, party supplies, and special recognition for the birthday VIP. We accommodate milestone birthdays, sweet 16s, and group celebrations. The birthday person receives special perks and photo opportunities. Our crew ensures your birthday celebration is unforgettable on Lake Travis.'
      },
      {
        id: 'weddings',
        question: 'Can you host wedding events on Lake Travis?',
        answer: 'We specialize in wedding-related events including rehearsal dinners, welcome parties, and after-parties. While we don\'t perform ceremonies, we create memorable celebration cruises for wedding parties. Our boats provide unique venues for pre and post-wedding festivities with stunning Lake Travis backdrops.'
      }
    ]
  },
  {
    name: 'ATX Disco Cruise',
    description: 'Specific information about our signature party cruise',
    items: [
      {
        id: 'disco-what',
        question: 'What is the ATX Disco Cruise?',
        answer: (
          <>
            The <Link href="/atx-disco-cruise" className="text-primary hover:underline">ATX Disco Cruise</Link> is Austin\'s 
            premier shared party boat experience on Lake Travis. Multiple bachelor and bachelorette groups party together with 
            a professional DJ, photographer, giant floats, and electric atmosphere. It\'s more affordable than private boats 
            while offering superior amenities and unforgettable party vibes.
          </>
        )
      },
      {
        id: 'disco-pricing',
        question: 'How much does ATX Disco Cruise cost?',
        answer: 'ATX Disco Cruise pricing varies by time slot: Friday 12-4pm ($95/person), Saturday 11am-3pm ($105/person - our BEST cruise), and Saturday 3:30-7:30pm ($85/person). All prices include tax and gratuity totals of $124.88, $137.81, or $111.56 respectively. Optional add-on packages available based on party type.'
      },
      {
        id: 'disco-schedule',
        question: 'When does the ATX Disco Cruise operate?',
        answer: 'The ATX Disco Cruise runs March through October. Friday cruises: 12:00 PM - 4:00 PM. Saturday offers two slots: 11:00 AM - 3:00 PM and 3:30 PM - 7:30 PM. Each cruise is 4 full hours of non-stop party fun. Limited dates available, so book early!'
      },
      {
        id: 'disco-included',
        question: 'What\'s included with ATX Disco Cruise tickets?',
        answer: 'Every ticket includes professional DJ playing all day, professional photographer with digital photos, giant unicorn and lily pad floats, disco decorations and party supplies, BYOB setup with coolers and ice, clean restrooms, shaded areas, and an incredible multi-group party atmosphere you won\'t find anywhere else.'
      },
      {
        id: 'disco-vs-private',
        question: 'Should we choose the Disco Cruise or a private boat?',
        answer: 'The Disco Cruise offers better value for groups under 30, with more amenities included and an unmatched party atmosphere. Private boats provide exclusivity and customization for groups wanting privacy or specific timing. Most bachelor/bachelorette parties choose the Disco Cruise for superior entertainment value.'
      },
      {
        id: 'disco-capacity',
        question: 'How many people are on the ATX Disco Cruise?',
        answer: 'The Disco Cruise accommodates up to 100 guests total, typically 3-5 different bachelor/bachelorette groups. Your group maintains its own space and identity while enjoying the collective party energy. Groups of 20-40 find it perfect - large enough for epic parties, intimate enough to stay connected.'
      }
    ]
  }
];

// Calculate all FAQ items for schema
const allFaqItems = faqCategories.flatMap(category => category.items);

export default function Faq() {
  return (
    <>
      <SEOHead 
        pageRoute="/faq"
        defaultTitle="FAQ - Lake Travis Boat Rentals | Austin Cruises"
        defaultDescription="Find answers to common questions about boat rentals, party cruises, pricing, safety, and special events on Lake Travis. Learn about our bachelor party boats, bachelorette cruises, and corporate events in Austin."
        defaultKeywords={["Lake Travis boat rental FAQ", "Austin party cruise questions", "boat rental pricing", "bachelor party boats", "bachelorette cruise info"]}
        customSchema={generateFAQSchema(allFaqItems.map(item => ({
          ...item,
          answer: typeof item.answer === 'string' ? item.answer : 
            'Visit our FAQ page for detailed information about our Lake Travis boat rental services.'
        })))}
      />
      
      <PublicNavigation />
      <Breadcrumb />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950" data-page-ready="faq">
        {/* Hero Section */}
        <SectionReveal>
          <section className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <HelpCircle className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-5xl md:text-6xl font-playfair font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h1>
                <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Everything you need to know about Lake Travis boat rentals, party cruises, and special events in Austin
                </p>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Quick Contact Cards */}
        <SectionReveal>
          <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer">
                  <a href="tel:+15124885892" className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Call Us</p>
                      <p className="font-semibold text-base">(512) 488-5892</p>
                    </div>
                  </a>
                </Card>
                
                <Card className="p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer">
                  <a href="mailto:clientservices@premierpartycruises.com" className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email Us</p>
                      <p className="font-semibold text-sm break-all">clientservices@premierpartycruises.com</p>
                    </div>
                  </a>
                </Card>
                
                <Card className="p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href="/chat">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Live Chat</p>
                        <p className="font-semibold text-base">Get Instant Quote</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            </div>
          </section>
        </SectionReveal>
        
        {/* Quick Navigation */}
        <SectionReveal>
          <section className="py-6 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {faqCategories.map((category, index) => (
                  <Button
                    key={category.name}
                    variant="outline"
                    size="sm"
                    className="font-sans tracking-wider rounded-xl"
                    onClick={() => {
                      const element = document.getElementById(category.name.toLowerCase().replace(/\s+/g, '-'));
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
        
        {/* FAQ Content */}
        <section className="py-24 px-6 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            {faqCategories.map((category, categoryIndex) => (
              <SectionReveal key={category.name}>
                <div
                  id={category.name.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-20 last:mb-0 relative"
                >
                  {/* Numbered Indicator */}
                  <div className="absolute -left-4 md:-left-12 -top-4 text-6xl font-black text-blue-200 dark:text-blue-900 opacity-30">
                    {String(categoryIndex + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-3">
                      {category.name}
                    </h2>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                  
                  <Card className="rounded-xl shadow-lg p-6">
                    <FAQ categories={[category]} />
                  </Card>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <SectionReveal>
          <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center">
                <h2 className="text-3xl font-playfair font-bold mb-6 text-gray-900 dark:text-white">
                  Still Have Questions?
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our team is here to help you plan the perfect Lake Travis experience. Get in touch today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button size="lg" variant="outline" className="rounded-xl px-8">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Get Instant Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>
      </main>

      <Footer />
    </>
  );
}
