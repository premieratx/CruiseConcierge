import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Comprehensive FAQ data aggregation from all sources
const allFAQs = {
  // From server/ssr/renderer.ts - Testimonials FAQ Page
  testimonialsFaq: {
    source: '/testimonials-faq (Server-Side Schema)',
    faqs: [
      {
        question: 'What can we bring on the boat?',
        answer: 'You may bring snacks, non-glass beverages, and decorations. Glass containers are not allowed.'
      },
      {
        question: 'Do you allow DJs or photographers?',
        answer: 'Yes, you may bring your own DJ or photographer, or book ours as an add-on.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'We offer flexible cancellation options. Contact us at least 48 hours in advance for rescheduling or refunds.'
      },
      {
        question: 'How many people can fit on your boats?',
        answer: 'Our boats range from 14 to 75+ passengers depending on the vessel and event type.'
      }
    ]
  },

  // From client/src/pages/TestimonialsFaq.tsx
  testimonialsFaqPage: {
    source: '/testimonials-faq (Frontend Page)',
    categories: {
      booking: {
        title: 'Booking & Reservations',
        faqs: [
          {
            question: 'How do I book a cruise with Premier Party Cruises?',
            answer: 'Booking is easy! You can book online through our website, call us at (512) 488-5892, or fill out our contact form. We\'ll work with you to customize the perfect experience for your group. For private charters, we recommend booking at least 2-3 weeks in advance, especially during peak season (March-October).'
          },
          {
            question: 'What deposit is required to secure my reservation?',
            answer: 'We require a 50% deposit to secure your reservation, with the remaining balance due 24 hours before your cruise. We accept credit cards, cash, and electronic transfers. The deposit is fully refundable if you cancel more than 7 days before your scheduled cruise.'
          },
          {
            question: 'What is your cancellation policy?',
            answer: 'Cancellations made more than 7 days before your cruise receive a full refund. Cancellations made 3-7 days before receive a 50% refund. Cancellations within 72 hours are non-refundable unless due to severe weather conditions. We understand plans can change and work with our customers whenever possible.'
          },
          {
            question: 'Can I reschedule my booking?',
            answer: 'Yes! We offer one complimentary reschedule if made more than 48 hours before your original cruise time, subject to availability. Additional reschedules may incur a $100 administrative fee. We\'re flexible and want to ensure you have the best possible experience.'
          },
          {
            question: 'Do you offer group discounts?',
            answer: 'Yes! We offer discounts for groups of 15+ people on private charters. Corporate events and multiple booking discounts are also available. Contact us directly for custom pricing based on your specific needs and group size.'
          }
        ]
      },
      pricing: {
        title: 'Pricing & Packages',
        faqs: [
          {
            question: 'What does the cruise price include?',
            answer: 'All cruises include professional captain and crew, fuel, coolers with ice, premium sound system with Bluetooth connectivity, safety equipment, and use of all onboard amenities. Private charters also include exclusive use of the boat and personalized service.'
          },
          {
            question: 'Are there any additional costs I should know about?',
            answer: 'The main additional costs are gratuity for the crew (20% recommended), food and beverages (you can bring your own), and any special add-ons like professional photography ($300), decorations setup ($150), or extended hours (rates vary by boat and date). We\'re transparent about all pricing upfront.'
          },
          {
            question: 'What are your private charter rates?',
            answer: 'Our private charter rates are based on boat capacity and day of week, as shown in the pricing tables above. Weekday rates (Monday-Thursday) include 3-hour cruises, while weekend rates (Friday-Sunday) include 4-hour cruises. All rates include captain, crew, and standard amenities.'
          },
          {
            question: 'How much do ATX Disco Cruise tickets cost?',
            answer: 'ATX Disco Cruise tickets are $85 per person for the Basic Package, $95 per person for the Disco Queen Package, and $105 per person for the Platinum Package. All packages include the 4-hour party cruise experience with DJ, dancing, and all onboard amenities.'
          },
          {
            question: 'Do you have special pricing for bachelor/bachelorette parties?',
            answer: 'Yes! Our bachelor/bachelorette packages start at $85 per person for the ATX Disco Cruise experience, or you can book a private charter using our capacity-based pricing shown above. We also offer photography packages and custom decorations for these special celebrations.'
          },
          {
            question: 'When is the crew fee required?',
            answer: 'An additional crew fee of $200 is added for groups with more than 20 people. This ensures we have adequate staffing for larger groups to maintain our high service standards and safety protocols.'
          },
          {
            question: 'How are taxes and gratuity calculated?',
            answer: 'Texas sales tax of 8.25% is applied to the subtotal (base cruise cost + crew fee if applicable). Gratuity of 20% is calculated on the same subtotal. These amounts are clearly itemized in your quote and final invoice.'
          },
          {
            question: 'What deposit is required?',
            answer: 'A 25% deposit is required for bookings made more than 30 days in advance. For bookings within 30 days of the event date, 100% payment is required at the time of booking. All deposits are fully refundable with 7+ days notice.'
          }
        ]
      },
      expectations: {
        title: 'What to Expect',
        faqs: [
          {
            question: 'What should I bring on the cruise?',
            answer: 'You can bring your own food, drinks (including alcohol for guests 21+), sunscreen, towels, and cameras. We provide coolers with ice, cups, and basic amenities. Don\'t bring glass containers, illegal substances, or pets (service animals are welcome). We have a full list of recommended items we can send you upon booking.'
          },
          {
            question: 'Can we bring our own alcohol?',
            answer: 'Yes! Guests 21+ can bring their own alcoholic beverages. We ask that you bring drinks in cans or plastic bottles only - no glass for safety reasons. Our crew can help serve drinks if needed, and we provide ice and cups. Please drink responsibly and have a designated driver for after the cruise.'
          },
          {
            question: 'What happens if someone gets seasick?',
            answer: 'Lake Travis is generally very calm, so seasickness is rare. However, we carry motion sickness remedies onboard and our experienced crew knows how to help. We recommend eating a light meal before boarding and avoiding excessive alcohol consumption. If needed, we can return to dock early.'
          },
          {
            question: 'Can we play our own music?',
            answer: 'Absolutely! All our boats have premium sound systems with Bluetooth connectivity. You can connect your phone or device to play your own playlists. For private charters, you have full control of the music. On disco cruises, we balance custom requests with our DJ\'s party mix.'
          },
          {
            question: 'What amenities are available on the boats?',
            answer: 'Our boats feature comfortable seating, shade areas, premium sound systems, restrooms, coolers with ice, swim ladders, and safety equipment. Larger boats also have dance floors, bars, and additional amenities. Each boat is regularly maintained and cleaned to ensure the best experience.'
          }
        ]
      },
      safety: {
        title: 'Safety & Policies',
        faqs: [
          {
            question: 'What safety measures do you have in place?',
            answer: 'Safety is our top priority. All our captains are Coast Guard licensed, our boats undergo regular safety inspections, and we carry all required safety equipment including life jackets for every passenger. We have a perfect safety record over 14+ years and maintain comprehensive insurance coverage.'
          },
          {
            question: 'Do you provide life jackets?',
            answer: 'Yes, we provide Coast Guard approved life jackets in all sizes, including infant and child sizes. While not required to be worn at all times on our large, stable boats, life jackets are mandatory when swimming or during rough weather conditions. Our crew will brief everyone on safety procedures before departure.'
          },
          {
            question: 'What are your capacity limits?',
            answer: 'We strictly adhere to Coast Guard capacity limits, which vary by boat size. Our 14-person boats accommodate up to 14 guests, 25-person boats up to 25 guests, and our largest boats accommodate up to 50 guests. These limits include all passengers and are enforced for safety and comfort.'
          },
          {
            question: 'What is your policy on swimming?',
            answer: 'Swimming is allowed in designated areas when conditions are safe. Life jackets are required while in the water, and our crew supervises all swimming activities. We only allow swimming when anchored in calm, deep water away from boat traffic. The captain makes the final decision on swimming safety based on current conditions.'
          },
          {
            question: 'Do you have insurance coverage?',
            answer: 'Yes, we carry comprehensive commercial marine insurance including liability coverage for passengers and property. All guests are covered under our policy during the cruise. We can provide proof of insurance for corporate events or special requirements upon request.'
          }
        ]
      },
      weather: {
        title: 'Weather & Conditions',
        faqs: [
          {
            question: 'What happens if the weather is bad?',
            answer: 'Safety comes first. If severe weather conditions (thunderstorms, high winds, etc.) make cruising unsafe, we will reschedule or provide a full refund. Light rain doesn\'t typically cancel cruises as our boats have covered areas. We monitor weather closely and will contact you 24-48 hours before your cruise if conditions look questionable.'
          },
          {
            question: 'Do cruises run in winter months?',
            answer: 'Yes, we operate year-round! While summer is our peak season, winter cruises can be magical with fewer crowds and beautiful scenery. We provide heated areas on boats during colder months and recommend bringing layers. Winter rates are often lower, making it a great value for groups.'
          },
          {
            question: 'What if it\'s too windy to cruise?',
            answer: 'If winds exceed safe operating levels (typically 25+ mph with white caps), we may need to cancel or reschedule for safety. Lake Travis can get choppy in high winds, affecting passenger comfort and safety. We\'ll notify you as early as possible and work to find an alternative date that works for your group.'
          },
          {
            question: 'How do you handle extreme heat in summer?',
            answer: 'All our boats have shaded areas and we provide plenty of ice and water. We recommend bringing sunscreen, hats, and staying hydrated. Summer is our most popular season, so the boats are equipped with everything needed for comfort. Early morning and evening cruises are popular options to avoid peak heat.'
          },
          {
            question: 'What\'s the best time of year for cruises?',
            answer: 'Every season has its charm! Spring (March-May) offers perfect temperatures and wildflowers. Summer (June-August) is peak party season with warm water for swimming. Fall (September-November) provides beautiful foliage and comfortable temperatures. Winter offers peaceful cruises with great deals and holiday lighting tours.'
          }
        ]
      },
      events: {
        title: 'Special Events',
        faqs: [
          {
            question: 'Do you specialize in bachelor and bachelorette parties?',
            answer: 'Absolutely! We\'re Austin\'s premier choice for bachelor and bachelorette celebrations. We offer both private charter options and spots on our famous ATX Disco Cruise. Our packages can include professional photography, custom decorations, special music playlists, and coordination with other Austin activities.'
          },
          {
            question: 'Can you accommodate corporate events and team building?',
            answer: 'Yes! We regularly host corporate events, team building activities, client entertainment, and company parties. We can customize experiences to meet your corporate needs, including catering coordination, presentation equipment, and professional atmosphere while still providing the fun Lake Travis experience.'
          },
          {
            question: 'Do you host wedding receptions or ceremonies?',
            answer: 'We host wedding receptions and can accommodate small, intimate ceremonies onboard. Lake Travis provides a stunning backdrop for your special day. We work with local wedding planners and can coordinate with photographers, caterers, and florists to create your dream wedding celebration.'
          },
          {
            question: 'What about birthday parties and anniversaries?',
            answer: 'Birthday and anniversary celebrations are some of our favorites! We can help customize decorations, coordinate special music, and even arrange surprise elements. From sweet 16s to 50th anniversaries, we\'ve celebrated them all. Our crew loves being part of these special milestones.'
          },
          {
            question: 'Can you handle large group events?',
            answer: 'Yes! Our largest boats accommodate up to 50 people, and for bigger events, we can coordinate multiple boats to cruise together. We\'ve successfully handled corporate retreats, family reunions, and large celebrations with 100+ people across our fleet. Advanced booking and planning help ensure everything goes smoothly.'
          }
        ]
      }
    }
  },

  // From shared/faq.ts - Corporate FAQs
  corporateFAQs: {
    source: 'shared/faq.ts (Corporate Events)',
    categories: {
      booking: {
        title: 'Corporate Booking & Reservations',
        faqs: [
          {
            question: 'How far in advance should we book our corporate event?',
            answer: 'For corporate events, we recommend booking 3-6 weeks in advance, especially for weekend dates during peak season (March-October). This allows adequate time for planning, coordination, and any special arrangements your company may need. Weekday corporate events typically have more availability and can often be booked with shorter notice.'
          },
          {
            question: 'What deposit is required for corporate bookings?',
            answer: 'Corporate bookings require a 25% deposit to secure your reservation, with the balance due 14 days before your event. We accept corporate credit cards, ACH transfers, and traditional payment methods. For established corporate clients, we can arrange net payment terms upon approval.'
          },
          {
            question: 'Do you offer corporate contracts and volume discounts?',
            answer: 'Yes! We offer corporate contracts for companies planning multiple events throughout the year. Volume discounts are available for groups of 25+ people or multiple bookings. We also provide special rates for Fortune 500 companies and established corporate partnerships. Contact our corporate sales team for custom pricing.'
          },
          {
            question: 'What is your corporate cancellation policy?',
            answer: 'Corporate cancellations made more than 21 days prior receive a full refund. 14-21 days prior: 75% refund. 7-14 days prior: 50% refund. Less than 7 days: 25% refund (except for severe weather). We understand business needs change and work with corporate clients to reschedule when possible.'
          },
          {
            question: 'Can we reschedule our corporate event?',
            answer: 'Absolutely! We offer one complimentary reschedule for corporate events if requested more than 72 hours before the original date, subject to availability. Additional reschedules may incur a $150 administrative fee. We work closely with corporate event planners to ensure flexibility.'
          }
        ]
      },
      services: {
        title: 'Corporate Services & Amenities',
        faqs: [
          {
            question: 'What corporate amenities do you provide?',
            answer: 'Our corporate packages include: professional Coast Guard certified captain and crew, premium sound system with microphone capabilities, climate-controlled areas, professional restrooms, coolers with ice, charging stations, and WiFi when requested. Enhanced packages include dedicated event coordinators and presentation equipment.'
          },
          {
            question: 'Can we bring catering or do you provide food service?',
            answer: 'You can bring your own catering, or we can connect you with our preferred corporate catering partners who specialize in on-water service. Our partners offer everything from lunch boxes and appetizer platters to full-service gourmet dining. We provide serving areas, tables, and coordination for seamless meal service.'
          },
          {
            question: 'Do you accommodate presentations and meetings?',
            answer: 'Yes! Our boats can be configured for corporate presentations with projection capabilities, wireless microphones, and professional seating arrangements. We offer both indoor climate-controlled areas and outdoor spaces perfect for team building activities. Advanced setup and technical support are included in our Corporate Ultimate package.'
          },
          {
            question: 'What about alcohol service for corporate events?',
            answer: 'We can coordinate with licensed beverage providers for corporate-appropriate alcohol service, including hosted bars, wine service, and signature cocktails. All service follows TABC regulations with certified staff. We also accommodate dry corporate events with premium non-alcoholic beverage packages.'
          },
          {
            question: 'Do you provide professional photography and videography?',
            answer: 'Yes! Professional photography is included in our Corporate Ultimate package, with videography available as an add-on. Our photographers understand corporate needs, capturing both candid team moments and professional group photos suitable for marketing materials. All images are delivered within 48 hours.'
          }
        ]
      },
      logistics: {
        title: 'Corporate Logistics & Planning',
        faqs: [
          {
            question: 'What group sizes can you accommodate?',
            answer: 'We accommodate corporate groups from 14 to 75+ people. Our 25-person boats are perfect for executive teams, while our 50-person vessels work great for department outings. For larger corporate events (75+ people), we can coordinate multiple boats to cruise together, maintaining group cohesion while meeting capacity requirements.'
          },
          {
            question: 'Where do corporate events depart from?',
            answer: 'Corporate events depart from our private marina on Lake Travis, approximately 20 minutes from downtown Austin. We provide exact location details, GPS coordinates, and parking information upon booking. Our marina offers convenient parking and easy boarding access for corporate groups.'
          },
          {
            question: 'How long are corporate cruises?',
            answer: 'Standard corporate cruises are 3-4 hours, perfect for afternoon team building or evening client entertainment. Half-day (6-hour) and full-day (8-hour) charters are available for corporate retreats and major company events. Custom durations can be arranged based on your corporate needs.'
          },
          {
            question: 'What happens in case of bad weather?',
            answer: 'Corporate event safety is our top priority. We monitor weather conditions closely and contact corporate coordinators 48-72 hours before the event if conditions look questionable. For unsafe weather, we offer full rescheduling assistance or venue alternatives. Our covered boats can handle light rain with climate-controlled comfort.'
          },
          {
            question: 'Do you provide transportation to and from the marina?',
            answer: 'While we don\'t provide direct transportation, we partner with corporate transportation companies and can arrange shuttle services for groups. Many corporate clients arrange bus transportation, and we can coordinate timing and logistics. Detailed directions and parking information are provided to all attendees.'
          }
        ]
      },
      activities: {
        title: 'Corporate Team Building & Activities',
        faqs: [
          {
            question: 'What team building activities do you offer?',
            answer: 'We offer various team building options including: lake-based scavenger hunts, group challenges, swimming competitions, and collaborative games. Our crew can facilitate activities or we can arrange professional team building facilitators. Activities are customized based on group dynamics and corporate objectives.'
          },
          {
            question: 'Can we combine business meetings with recreation?',
            answer: 'Absolutely! Many corporate clients use our boats for working lunches, quarterly reviews, or strategic planning sessions followed by team recreation. Our boats provide professional meeting spaces that transition seamlessly into party mode. This combination creates memorable experiences while accomplishing business objectives.'
          },
          {
            question: 'Is swimming included in corporate events?',
            answer: 'Swimming can be included based on the corporate group\'s preferences and the season. Lake Travis offers excellent swimming opportunities with our ladder access and safety equipment. Corporate groups often enjoy swimming as a team building activity, though participation is always optional and at participants\' own risk.'
          }
        ]
      },
      pricing: {
        title: 'Corporate Pricing & Packages',
        faqs: [
          {
            question: 'How is corporate event pricing structured?',
            answer: 'Corporate pricing is based on group size, duration, day of the week, and package level. Our Corporate Essentials package starts at competitive rates, while our Corporate Ultimate package includes premium amenities and services. Custom quotes are provided based on specific corporate requirements and add-ons.'
          },
          {
            question: 'Are there additional fees for corporate events?',
            answer: 'Our quoted prices include all standard amenities. Additional costs may include: premium catering coordination, extra crew for large groups (75+ people), extended hours beyond package duration, special equipment rentals, or enhanced photography/videography services. All additional costs are clearly outlined in your proposal.'
          },
          {
            question: 'Do you offer corporate membership programs?',
            answer: 'Yes! Our Corporate Partnership Program offers preferred pricing, priority booking, dedicated account management, and flexible scheduling for companies planning multiple events annually. Partners receive volume discounts, complimentary upgrades, and first access to new boats and services.'
          }
        ]
      }
    }
  },

  // Team Building Page FAQs
  teamBuilding: {
    source: '/team-building (Page)',
    faqs: [
      {
        question: 'What types of team building activities do you offer?',
        answer: 'We offer a variety of activities including problem-solving challenges, communication exercises, trust-building activities, scavenger hunts, team competitions, and leadership development exercises. All activities can be customized to your team\'s goals and company culture.'
      },
      {
        question: 'Do you provide a team building facilitator?',
        answer: 'Yes! Our Enhanced and Executive packages include professional facilitators who specialize in corporate team development. They\'ll guide your team through activities, ensure engagement, and help achieve your specific team building objectives.'
      }
    ]
  },

  // Client Entertainment Page FAQs
  clientEntertainment: {
    source: '/client-entertainment (Page)',
    faqs: [
      {
        question: 'How does a cruise help with client relationships?',
        answer: 'A Lake Travis cruise provides a unique, memorable experience that sets you apart from typical dinners or golf outings. The relaxed atmosphere facilitates better conversations, the scenery impresses, and clients appreciate the special effort, strengthening business relationships.'
      },
      {
        question: 'What catering options work best for client entertainment?',
        answer: 'We recommend gourmet appetizer stations for mingling or seated dinners for formal occasions. Popular choices include surf & turf, sushi stations, or Austin BBQ with an upscale twist. All dietary restrictions can be accommodated.'
      }
    ]
  }
};

export default function FAQReview() {
  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all FAQs for searching
  const getAllFAQs = () => {
    const allQuestions: Array<{
      source: string;
      category?: string;
      question: string;
      answer: string;
    }> = [];

    // Server-side testimonials FAQs
    allFAQs.testimonialsFaq.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.testimonialsFaq.source,
        question: faq.question,
        answer: faq.answer
      });
    });

    // Testimonials FAQ Page (categorized)
    Object.entries(allFAQs.testimonialsFaqPage.categories).forEach(([catKey, category]) => {
      category.faqs.forEach(faq => {
        allQuestions.push({
          source: allFAQs.testimonialsFaqPage.source,
          category: category.title,
          question: faq.question,
          answer: faq.answer
        });
      });
    });

    // Corporate FAQs (categorized)
    Object.entries(allFAQs.corporateFAQs.categories).forEach(([catKey, category]) => {
      category.faqs.forEach(faq => {
        allQuestions.push({
          source: allFAQs.corporateFAQs.source,
          category: category.title,
          question: faq.question,
          answer: faq.answer
        });
      });
    });

    // Team Building FAQs
    allFAQs.teamBuilding.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.teamBuilding.source,
        question: faq.question,
        answer: faq.answer
      });
    });

    // Client Entertainment FAQs
    allFAQs.clientEntertainment.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.clientEntertainment.source,
        question: faq.question,
        answer: faq.answer
      });
    });

    return allQuestions;
  };

  const allQuestions = getAllFAQs();

  // Filter based on search query
  const filteredQuestions = searchQuery.trim()
    ? allQuestions.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allQuestions;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">FAQ Review Dashboard</h1>
        <p className="text-muted-foreground">
          All FAQs from across the website - {allQuestions.length} total questions
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allQuestions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Testimonials Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(allFAQs.testimonialsFaqPage.categories).reduce(
                (acc, cat) => acc + cat.faqs.length,
                0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Corporate FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(allFAQs.corporateFAQs.categories).reduce(
                (acc, cat) => acc + cat.faqs.length,
                0
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Filtered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredQuestions.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ List */}
      <Card>
        <CardHeader>
          <CardTitle>All FAQ Questions & Answers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6" style={{ fontSize: '12px' }}>
            {filteredQuestions.map((faq, index) => (
              <div
                key={index}
                className="border-b pb-4 last:border-b-0"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{faq.question}</div>
                    <div className="text-muted-foreground">{faq.answer}</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {faq.source}
                  </Badge>
                  {faq.category && (
                    <Badge variant="secondary" className="text-xs">
                      {faq.category}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
