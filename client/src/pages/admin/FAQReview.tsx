import { useState } from 'react';
import AdminNoIndex from "@/components/AdminNoIndex";
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
            answer: 'ATX Disco Cruise tickets are priced by time slot: Friday 12-4pm ($95/person), Saturday 11am-3pm ($105/person - BEST), Saturday 3:30-7:30pm ($85/person). All prices include tax & gratuity ($124.88, $137.81, $111.56 respectively). Optional add-on packages available based on party type.'
          },
          {
            question: 'Do you have special pricing for bachelor/bachelorette parties?',
            answer: 'Yes! ATX Disco Cruise tickets range from $85-$105 per person depending on the time slot you choose (includes tax & gratuity). You can also book a private charter using our capacity-based pricing. We offer optional add-on packages based on party type, plus photography and custom decorations for these special celebrations.'
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
            answer: 'Safety is our top priority. All our captains are Coast Guard licensed, our boats undergo regular safety inspections, and we carry all required safety equipment including life jackets for every passenger. We have a perfect safety record over 15+ years and maintain comprehensive insurance coverage.'
          },
          {
            question: 'Do you provide life jackets?',
            answer: 'Yes, life jackets are on board and available for swimming - we encourage guests to wear them for safety. We provide Coast Guard approved life jackets in all sizes, including infant and child sizes. Our crew will brief everyone on safety procedures before departure.'
          },
          {
            question: 'What are your capacity limits?',
            answer: 'We strictly adhere to Coast Guard capacity limits, which vary by boat size. Our 14-person boats accommodate up to 14 guests, 25-person boats up to 25 guests, and our largest boats accommodate up to 50 guests. These limits include all passengers and are enforced for safety and comfort.'
          },
          {
            question: 'What is your policy on swimming?',
            answer: 'Swimming is allowed in designated areas when conditions are safe. Life jackets are on board and available for swimming - we encourage guests to wear them for safety. Our crew supervises all swimming activities. We only allow swimming when anchored in calm, deep water away from boat traffic. The captain makes the final decision on swimming safety based on current conditions.'
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
            answer: 'Our corporate packages include: licensed, fun, experienced captains to take your group safely around the lake in style, premium sound system with microphone capabilities, climate-controlled areas, professional restrooms, coolers with ice, charging stations, and WiFi when requested. Enhanced packages include dedicated event coordinators and presentation equipment.'
          },
          {
            question: 'Can we bring catering or do you provide food service?',
            answer: 'For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. Our catering partners specialize in on-water service and offer everything from lunch boxes and appetizer platters to full-service gourmet dining. We provide serving areas, tables, and coordination for seamless meal service.'
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

  // Team Building Page FAQs - UPDATED with all 6 FAQs
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
      },
      {
        question: 'Can activities be customized to our company goals?',
        answer: 'Absolutely! We work with you to understand your team dynamics and objectives. Whether you\'re focusing on communication, leadership, innovation, or just team bonding, we\'ll tailor activities to meet your specific needs.',
        isNew: true
      },
      {
        question: 'What catering options are available?',
        answer: 'For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. Popular catering options include casual BBQ, breakfast tacos, lunch buffets, or evening appetizers. We can also arrange team cooking challenges as part of the experience.',
        isNew: true
      },
      {
        question: 'What\'s the ideal group size for team building?',
        answer: 'We accommodate teams from 15-75 people. Smaller groups (15-30) allow for more intimate activities, while larger groups can be divided into teams for competitions. We\'ll recommend the best boat and format for your group size.',
        isNew: true
      },
      {
        question: 'How do we measure team building success?',
        answer: 'With our Executive package, we provide pre and post-event assessments, participant feedback, and a comprehensive report. We also offer follow-up consultation to help maintain momentum from the team building experience.',
        isNew: true
      }
    ]
  },

  // Client Entertainment Page FAQs - UPDATED with all 6 FAQs
  clientEntertainment: {
    source: '/client-entertainment (Page)',
    faqs: [
      {
        question: 'How does a cruise help with client relationships?',
        answer: 'A Lake Travis cruise provides a unique, memorable experience that sets you apart from typical dinners or golf outings. The relaxed atmosphere facilitates better conversations, the scenery impresses, and clients appreciate the special effort, strengthening business relationships.'
      },
      {
        question: 'What catering options work best for client entertainment?',
        answer: 'For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. We recommend gourmet appetizer stations for mingling or seated dinners for formal occasions. Popular choices include surf & turf, sushi stations, or Austin BBQ with an upscale twist. All dietary restrictions can be accommodated.'
      },
      {
        question: 'How does alcohol work for client entertainment?',
        answer: 'All Premier cruises are BYOB (Bring Your Own Beverage). We work with Party On Delivery to have your drinks delivered and iced down when you arrive, making it seamless. Optional external bartending service available for $600 per cruise plus cost of alcohol.',
        isNew: true
      },
      {
        question: 'What\'s the best time for client entertainment cruises?',
        answer: 'Sunset cruises (5-8 PM) are most popular, offering beautiful views and transitioning from day to evening. Lunch cruises (11 AM-2 PM) work well for business hours, while evening cruises create a special event atmosphere.',
        isNew: true
      },
      {
        question: 'Will we have privacy for business discussions?',
        answer: 'Absolutely. All client entertainment cruises are private charters. You have the entire boat to yourselves with discrete, professional crew. The layout includes quiet areas perfect for confidential conversations.',
        isNew: true
      },
      {
        question: 'Can we customize the experience for our industry?',
        answer: 'Yes! We regularly customize experiences for tech companies, law firms, financial services, and more. From menu selections to entertainment choices, we\'ll tailor everything to match your company culture and client expectations.',
        isNew: true
      }
    ]
  },

  // NEW: Bachelor Party Page FAQs
  bachelorParty: {
    source: '/bachelor-party-austin (Page)',
    faqs: [
      {
        question: 'What is your refund policy?',
        answer: 'We offer a 48-hour full refund window after booking. This gives you time to coordinate with your group and make sure everyone is on board. After 48 hours, deposits become non-refundable but can be transferred to another date with advance notice.',
        isNew: true
      },
      {
        question: 'Can we split the payment between multiple people?',
        answer: 'Absolutely! We offer split payment options at checkout. Each person can pay their portion directly, making it easy to manage group bookings. The organizer doesn\'t have to front the entire cost.',
        isNew: true
      },
      {
        question: 'Is disco attire required?',
        answer: 'Disco attire is encouraged but not required! Many groups love dressing up in disco themes - it makes for amazing photos and adds to the fun vibe. But come as you are - the most important thing is that you\'re comfortable and ready to party!',
        isNew: true
      },
      {
        question: 'What happens if there\'s bad weather?',
        answer: 'We cruise rain or shine - the boat has cover available! For severe weather (lightning, high winds), we have the "Lemonade Disco" backup plan: a land party with fajita/BBQ buffet and drinks. You\'ll still have an epic party, just on dry land. Full refunds are only issued if we cancel and cannot provide the backup event.',
        isNew: true
      },
      {
        question: 'Can we add people after booking?',
        answer: 'Yes! You can easily add 1-2 people after booking, subject to availability. Just contact us as soon as you know, and we\'ll add them to your reservation. The earlier you let us know, the better we can accommodate.',
        isNew: true
      },
      {
        question: 'Do you offer group discounts?',
        answer: 'Yes! Groups of 10+ people receive special discounted rates. The bigger your group, the better the deal. Contact us for specific pricing for your group size.',
        isNew: true
      },
      {
        question: 'What\'s your alcohol policy?',
        answer: 'BYOB - bring your own beverages! We provide private coolers with ice for each group. We also partner with local alcohol delivery services who can deliver your drinks directly to the boat. Just bring what you want to drink and we handle everything else!',
        isNew: true
      },
      {
        question: 'How far in advance should we book?',
        answer: 'Book as early as possible! Most weekends sell out 4-6 weeks in advance, and we\'re usually booked SOLID at least a month ahead. Peak season (March-October) books up even faster. Don\'t wait - secure your date now!',
        isNew: true
      }
    ]
  },

  // NEW: Bachelorette Party Page FAQs
  bacheloretteParty: {
    source: '/bachelorette-party-austin (Page)',
    faqs: [
      {
        question: 'What is your refund policy?',
        answer: 'We offer a 48-hour full refund window after booking. This gives you time to coordinate with your girls and make sure everyone is on board. After 48 hours, deposits become non-refundable but can be transferred to another date with advance notice.',
        isNew: true
      },
      {
        question: 'Can we split the payment between the girls?',
        answer: 'Absolutely! We offer split payment options at checkout. Each bridesmaid can pay their portion directly, making it easy to manage group bookings. The MOH doesn\'t have to front the entire cost!',
        isNew: true
      },
      {
        question: 'Is disco attire required?',
        answer: 'Disco attire is encouraged but not required! Many bachelorette groups love coordinating disco outfits - it makes for AMAZING photos and adds to the fun vibe. But come as you are - the most important thing is celebrating the bride!',
        isNew: true
      },
      {
        question: 'What happens if there\'s bad weather?',
        answer: 'We cruise rain or shine - the boat has cover available! For severe weather (lightning, high winds), we have the "Lemonade Disco" backup plan: a land party with fajita/BBQ buffet and drinks. You\'ll still have an epic bachelorette party, just on dry land!',
        isNew: true
      },
      {
        question: 'Can we add more girls after booking?',
        answer: 'Yes! You can easily add 1-2 more bridesmaids after booking, subject to availability. Just contact us as soon as you know, and we\'ll add them to your reservation. The earlier you let us know, the better!',
        isNew: true
      },
      {
        question: 'Do you offer group discounts?',
        answer: 'Yes! Groups of 10+ people receive special discounted rates. The bigger your bridal squad, the better the deal. Contact us for specific pricing for your group size.',
        isNew: true
      },
      {
        question: 'What\'s your alcohol policy?',
        answer: 'BYOB - bring your own bubbly! We provide private coolers with ice for each group. We also partner with local alcohol delivery services who can deliver champagne and rosé directly to the boat. We handle everything else!',
        isNew: true
      },
      {
        question: 'How far in advance should we book?',
        answer: 'Book as early as possible! Most weekends sell out 4-6 weeks in advance, and we\'re usually booked SOLID at least a month ahead. Spring & summer bachelorette season books up even faster. Don\'t wait - secure your date now!',
        isNew: true
      }
    ]
  },

  // NEW: ATX Disco Cruise Page FAQs
  atxDiscoCruise: {
    source: '/atx-disco-cruise (Page)',
    faqs: [
      {
        question: 'What exactly is the ATX Disco Cruise?',
        answer: 'The ATX Disco Cruise is America\'s premier bachelor and bachelorette party cruise experience! It\'s a shared party boat on Lake Travis where multiple bach parties from across the country come together for an epic 4-hour celebration with a professional DJ, photographer, and unforgettable multi-group energy.',
        isNew: true
      },
      {
        question: 'What is your refund policy?',
        answer: 'We offer a 48-hour full refund window after booking. After 48 hours, deposits become non-refundable but can be transferred to another date with advance notice. Weather cancellations include the Lemonade Disco backup option or full refund.',
        isNew: true
      },
      {
        question: 'Can we split the payment between multiple people?',
        answer: 'Absolutely! We offer split payment options at checkout. Each person can pay their portion directly, making it easy to manage group bookings. The organizer doesn\'t have to front the entire cost.',
        isNew: true
      },
      {
        question: 'What happens if there\'s bad weather?',
        answer: 'We cruise rain or shine - the boat has covered areas! For severe weather (lightning, high winds), we activate the "Lemonade Disco" - a land-based party with fajita/BBQ buffet, drinks, and DJ. You still get an epic party, just on dry land!',
        isNew: true
      },
      {
        question: 'Can we add people after booking?',
        answer: 'Yes! You can add 1-2 people after booking, subject to availability. Contact us as soon as you know and we\'ll add them to your reservation. The earlier you let us know, the better we can accommodate.',
        isNew: true
      },
      {
        question: 'What if we have a large group?',
        answer: 'Perfect! Groups of all sizes are welcome. The boat holds up to 100 people total across all bach parties. Larger groups get better positioning and recognition. Book early to secure your spot!',
        isNew: true
      },
      {
        question: 'What\'s your alcohol policy?',
        answer: 'BYOB - bring your own beverages! We provide coolers with ice (private coolers available with add-on packages). We also partner with delivery services who can bring alcohol directly to the boat. Just bring what you want to drink!',
        isNew: true
      },
      {
        question: 'How far in advance should we book?',
        answer: 'Book as early as possible! Peak weekends (March-October) sell out 4-6 weeks in advance. Summer Saturdays often book 2+ months ahead. Secure your date now to avoid disappointment!',
        isNew: true
      },
      {
        question: 'What should we bring?',
        answer: 'Bring: Your drinks (BYOB), sunscreen, sunglasses, swimwear, towel, and your party energy! Add-on packages can include additional supplies - check your booking confirmation for details on what\'s included.',
        isNew: true
      },
      {
        question: 'When does the ATX Disco Cruise run?',
        answer: 'Friday: 12:00 PM - 4:00 PM ($95/person) • Saturday: 11:00 AM - 3:00 PM ($105/person - BEST) • Saturday: 3:30 PM - 7:30 PM ($85/person). All prices include tax & gratuity. Available year-round, weather permitting.',
        isNew: true
      },
      {
        question: 'When do we get our photos?',
        answer: 'Professional photos are delivered digitally within 48-72 hours after your cruise via email or download link. You\'ll receive high-quality images of all the epic moments captured by our photographer!',
        isNew: true
      },
      {
        question: 'Where do we park and meet?',
        answer: 'Meet at Anderson Mill Marina on Lake Travis (13619 FM 2769, Austin, TX 78730). Free parking available. Arrive 15-20 minutes early for check-in. Transportation packages available with discount!',
        isNew: true
      },
      {
        question: 'Is there a dress code?',
        answer: 'No formal dress code! Many groups do fun themes (disco, nautical, matching outfits) which makes for amazing photos. Bring swimwear for the floats. Most important: be comfortable and ready to party!',
        isNew: true
      },
      {
        question: 'Will there be other bach parties on the boat?',
        answer: 'YES - that\'s the magic! You\'ll meet 3-8 other bach parties from across America (Texas, California, Chicago, etc.). The multi-group energy creates an unforgettable experience. Everyone\'s celebrating, the vibe is electric!',
        isNew: true
      },
      {
        question: 'Is food included?',
        answer: 'Food is not included. Please eat before your cruise and bring snacks/light refreshments if needed. We provide coolers with ice for your BYOB beverages. Premium add-on packages include alcohol delivery coordination assistance.',
        isNew: true
      },
      {
        question: 'Is there an age limit?',
        answer: 'Must be 21+ to consume alcohol. All guests welcome, but this is a party cruise atmosphere best suited for adults. Valid ID required for alcohol consumption.',
        isNew: true
      }
    ]
  },

  // NEW: Private Cruises Page FAQs
  privateCruises: {
    source: '/private-cruises (Page)',
    faqs: [
      {
        question: 'How far in advance should I book my private cruise?',
        answer: 'We recommend booking 2-4 weeks in advance for weekend dates, especially during peak season (April-September). Weekday cruises typically have more availability and can often be booked with shorter notice.',
        isNew: true
      },
      {
        question: 'What\'s included in the private cruise price?',
        answer: 'All private cruises include: licensed, fun, experienced captains to take your group safely around the lake in style, fuel, coolers with ice, premium sound system with Bluetooth connectivity, safety equipment, and basic amenities. Food, beverages, and extra crew (if needed) are additional.',
        isNew: true
      },
      {
        question: 'Can we bring our own food and drinks?',
        answer: 'Absolutely! You can bring your own food, snacks, and beverages (including alcohol for guests 21+). We provide coolers and ice. We can also connect you with preferred catering partners for full-service dining.',
        isNew: true
      },
      {
        question: 'What happens if the weather is bad?',
        answer: 'Safety is our top priority. If weather conditions are unsafe, we\'ll work with you to reschedule your cruise to another date. We monitor weather closely and will contact you 24-48 hours before your cruise if conditions look questionable.',
        isNew: true
      },
      {
        question: 'Do you provide decorations for special events?',
        answer: 'We can accommodate basic decorations and help coordinate with local vendors for more elaborate setups. Many clients bring their own decorations, and our crew is happy to help with setup before departure.',
        isNew: true
      },
      {
        question: 'What are your cancellation policies?',
        answer: 'Cancellations more than 14 days prior receive full refund. 7-14 days prior: 50% refund. Less than 7 days: no refund except for unsafe weather conditions. We offer date changes based on availability.',
        isNew: true
      },
      {
        question: 'How do deposits and payments work?',
        answer: 'If booking more than 30 days out, we require a 25% deposit to secure your date. The balance is due 30 days before your cruise. If booking within 30 days, full payment is required upfront.',
        isNew: true
      },
      {
        question: 'Can swimming be included in our private cruise?',
        answer: 'Yes! Lake Travis offers great swimming opportunities. We can anchor in swimming areas and provide ladder access. We recommend bringing water shoes and sunscreen. Swimming is always at your own risk.',
        isNew: true
      }
    ]
  },

  // NEW: Home Page FAQs
  homePage: {
    source: '/ (Home Page)',
    faqs: [
      {
        question: 'What types of party boat services do you offer in Austin?',
        answer: 'We offer two main types of party boat experiences on Lake Travis: Private Charters (exclusive boat rentals for your group with boats holding 14-75 people) and ATX Disco Cruises (shared party boat experiences with professional DJ and photographer starting at $85/person). Both include professional captains, premium sound systems, coolers with ice, and depart from Anderson Mill Marina.',
        isNew: true
      },
      {
        question: 'How much does a party boat rental cost in Austin?',
        answer: 'Austin party boat pricing varies by experience type. Private charters start at $275/hour for our 14-person boat with 4-hour minimums. ATX Disco Cruise tickets range from $85-$105 per person depending on the time slot (Friday 12-4pm: $95, Saturday 11am-3pm: $105, Saturday 3:30-7:30pm: $85), with all prices including tax & gratuity. Weekend rates are higher than weekday rates. Contact us for exact pricing for your specific date and group size.',
        isNew: true
      },
      {
        question: 'Where do Austin party boats depart from?',
        answer: 'All Premier Party Cruises depart from Anderson Mill Marina located at 13993 FM2769, Leander, TX 78641 on Lake Travis. The marina is conveniently located just 30 minutes from downtown Austin, making it easily accessible for guests from Austin, Lakeway, Bee Cave, and Cedar Park. Free parking is available at the marina.',
        isNew: true
      },
      {
        question: 'What\'s included in your party boat services?',
        answer: 'Every party boat cruise includes: licensed, fun, experienced captains to take your group safely around the lake in style, premium Bluetooth sound system, large coolers with ice, all required safety equipment, fuel, and access to Lake Travis\'s most scenic coves and beaches. ATX Disco Cruises also include professional DJ, photographer, party favors, and reserved seating areas. Optional add-ons include lily pads, alcohol delivery, and transportation services.',
        isNew: true
      },
      {
        question: 'Can we bring our own alcohol on the party boat?',
        answer: 'Yes! All our party boats are BYOB (Bring Your Own Booze). We provide large coolers with ice for your beverages. For added convenience, we partner with Party On Delivery - our sister company that delivers alcohol directly to your boat at the marina. You can order online and they deliver everything 50 feet from your boat, so you don\'t have to carry anything!',
        isNew: true
      },
      {
        question: 'How far in advance should we book our Austin party boat?',
        answer: 'We recommend booking 4-6 weeks in advance, especially for weekend dates and during peak season (April-September). ATX Disco Cruises for bachelorette and bachelor parties sell out the fastest. Private charters for corporate events and large groups should be booked 6-8 weeks ahead. Last-minute bookings (1-2 weeks) may be available on weekdays.',
        isNew: true
      }
    ]
  },

  // NEW: Party Boat Austin Page FAQs
  partyBoatAustin: {
    source: '/party-boat-austin (Page)',
    faqs: [
      {
        question: 'What makes Premier the best party boat in Austin?',
        answer: 'Premier Party Cruises has been Austin\'s #1 party boat company since 2009 with countless happy customers. We offer the newest fleet on Lake Travis, licensed, fun, experienced captains to take your group safely around the lake in style, perfect safety record, premium sound systems, and unmatched local expertise. Our party boats depart from Anderson Mill Marina and cruise the most beautiful parts of Lake Travis, just 30 minutes from downtown Austin.',
        isNew: true
      },
      {
        question: 'How much does a party boat rental cost in Austin?',
        answer: 'Party boat rental prices in Austin vary by boat size and day of week. Private charters start at $275/hour for our 14-person boat on weekdays, with 4-hour minimums. Our ATX Disco Cruise tickets range from $85-$105 per person (depending on time slot) and include DJ, photographer, and party favors, with all prices including tax & gratuity. Weekend and holiday rates are higher. Contact us for exact pricing for your Austin party boat rental.',
        isNew: true
      },
      {
        question: 'Where do Austin party boats depart from?',
        answer: 'Our Austin party boats depart from Anderson Mill Marina, located at 13993 FM2769, Leander, TX 78641 on Lake Travis. The marina is conveniently located just 30 minutes from downtown Austin, making it easily accessible for Austin party boat guests coming from all parts of the city. Free parking is available at the marina.',
        isNew: true
      },
      {
        question: 'What\'s included in an Austin party boat rental?',
        answer: 'Every Austin party boat rental includes: licensed, fun, experienced captains to take your group safely around the lake in style, premium Bluetooth sound system, large coolers with ice, all safety equipment, fuel, and cruising Lake Travis\'s most scenic areas. Optional add-ons include lily pads and floaties for swimming, professional DJ services, photographer, catering coordination, and decorations for special events.',
        isNew: true
      },
      {
        question: 'How far in advance should I book a party boat in Austin?',
        answer: 'For weekend Austin party boat rentals, especially during peak season (April-September), we recommend booking 2-4 weeks in advance. Bachelorette parties and corporate events on Lake Travis should book even earlier. Weekday party boat rentals in Austin typically have more availability and can often be booked with shorter notice. Contact us to check real-time availability.',
        isNew: true
      }
    ]
  },

  // NEW: Party Boat Lake Travis Page FAQs
  partyBoatLakeTravis: {
    source: '/party-boat-lake-travis (Page)',
    faqs: [
      {
        question: 'What makes Lake Travis the best party boat location?',
        answer: 'Lake Travis is renowned for having the clearest water in Texas with over 270 miles of pristine shoreline and countless secluded coves perfect for swimming and partying. The lake maintains a constant 70-degree water temperature year-round, making it ideal for Lake Travis party boat adventures any season. With crystal clear water, dramatic limestone cliffs, and protected coves, Lake Travis offers the most scenic and enjoyable party boat experience in Central Texas.',
        isNew: true
      },
      {
        question: 'How much does a Lake Travis party boat rental cost?',
        answer: 'Lake Travis party boat rental prices vary by boat size and day. Private Lake Travis charters start at $275/hour for our 14-person boat on weekdays with 4-hour minimums. Our Lake Travis ATX Disco Cruise tickets range from $85-$105 per person (depending on time slot) and include DJ, photographer, and party favors, with all prices including tax & gratuity. Weekend and holiday Lake Travis party boat rates are higher. Contact us for exact Lake Travis pricing for your event.',
        isNew: true
      },
      {
        question: 'Where do Lake Travis party boats depart from?',
        answer: 'Our Lake Travis party boats depart from Anderson Mill Marina, located at 13993 FM2769, Leander, TX 78641 on the northwest side of Lake Travis. The marina is conveniently just 30 minutes from downtown Austin, making it easily accessible for Lake Travis party boat guests from Austin, Lakeway, Bee Cave, and Cedar Park. Free parking is available at the Lake Travis marina.',
        isNew: true
      },
      {
        question: 'What\'s included in a Lake Travis party boat rental?',
        answer: 'Every Lake Travis party boat rental includes: licensed, fun, experienced captains to take your group safely around the lake in style, premium Bluetooth sound system, large coolers with ice, all safety equipment, fuel, and cruising Lake Travis\'s most scenic coves and beaches. Optional Lake Travis add-ons include lily pads and floaties for swimming, professional DJ services, photographer, catering coordination, and decorations for special Lake Travis events.',
        isNew: true
      },
      {
        question: 'What\'s the best time of year for Lake Travis?',
        answer: 'Lake Travis party boats operate year-round with the lake maintaining comfortable water temperatures even in winter. Peak Lake Travis season runs April through September with warm weather and calm waters. However, fall and spring offer beautiful Lake Travis conditions with fewer crowds. Lake Travis water levels are typically best March through October, making these ideal months for your Lake Travis party boat experience.',
        isNew: true
      }
    ]
  },

  // NEW: Graduation Party Page FAQs
  graduationParty: {
    source: '/graduation-party (Page)',
    faqs: [
      {
        question: 'When should we schedule a graduation party cruise?',
        answer: 'Most graduation cruises happen within 1-2 weeks after graduation ceremonies. Popular times are late May through early June for high school and May for college. Book early as this is our busiest season for grad parties!',
        isNew: true
      },
      {
        question: 'Can we combine multiple graduates in one party?',
        answer: 'Absolutely! Joint graduation parties are very popular and cost-effective. We can customize decorations for multiple schools/graduates. Many friend groups combine their celebrations for one epic party.',
        isNew: true
      },
      {
        question: 'Can we use school colors and graduation themes?',
        answer: 'Yes! We love customizing with school colors, mascots, and graduation year. Bring banners, signs, or photos. Popular additions include photo displays showing the graduate\'s journey from kindergarten to graduation.',
        isNew: true
      },
      {
        question: 'Do you accommodate both high school and college graduations?',
        answer: 'Yes! We tailor the experience to the age group. High school grads (17-18) have supervised, alcohol-free celebrations with mocktails. College grads (21+) can BYOB - we work with Party On Delivery to have drinks delivered and iced down. Mixed age groups are handled appropriately.',
        isNew: true
      },
      {
        question: 'What activities work best for graduation parties?',
        answer: 'Swimming, dancing, photo sessions, superlatives/awards, toasts and speeches, and future predictions games are all popular. For high school grads, we focus on fun activities. College grads often prefer more socializing time.',
        isNew: true
      },
      {
        question: 'How do guests handle graduation gifts?',
        answer: 'We have a designated gift table area. Many grads request "cards only" for the cruise and handle larger gifts separately. We can also coordinate gift card boxes or money trees as requested.',
        isNew: true
      }
    ]
  },

  // NEW: Company Milestone Page FAQs
  companyMilestone: {
    source: '/company-milestone (Page)',
    faqs: [
      {
        question: 'What types of milestones do companies celebrate?',
        answer: 'Common celebrations include IPOs, major funding rounds, company anniversaries (5, 10, 25 years), achieving revenue goals, successful product launches, mergers and acquisitions, awards and recognitions, and major contract wins.',
        isNew: true
      },
      {
        question: 'How can we customize the celebration to our achievement?',
        answer: 'We\'ll work with you to create a themed experience. This includes custom signage, specific decorations, branded materials, tailored menu selections, and even coordinating with your marketing team for photo/video content that aligns with your announcement strategy.',
        isNew: true
      },
      {
        question: 'Can we hold an awards ceremony on the boat?',
        answer: 'Absolutely! We have dedicated spaces perfect for presentations, with PA systems for speeches and awards. Many companies use the sunset as a backdrop for award photos, creating memorable moments for recipients.',
        isNew: true
      },
      {
        question: 'When should we schedule our milestone celebration?',
        answer: 'Most companies celebrate within 2-4 weeks of the achievement while excitement is high. Afternoon cruises work well for all-hands celebrations, while evening cruises create a more formal atmosphere for executive teams.',
        isNew: true
      },
      {
        question: 'Can we use photos/videos for company marketing?',
        answer: 'Yes! With our professional photography/videography packages, you\'ll receive high-quality content perfect for social media, press releases, and internal communications. We can coordinate with your marketing team on specific shots needed.',
        isNew: true
      },
      {
        question: 'What if our entire company won\'t fit on one boat?',
        answer: 'For larger companies, we can arrange multiple boats departing together, or schedule department rotations throughout the day. Some companies also choose to celebrate with their core team or top performers as a special recognition.',
        isNew: true
      }
    ]
  },

  // NEW: Sweet 16 Page FAQs
  sweet16: {
    source: '/sweet-16 (Page)',
    faqs: [
      {
        question: 'What supervision is provided for teen parties?',
        answer: 'Our professional crew maintains a safe, supervised environment throughout the cruise. We have clear safety rules, designated swimming areas with supervision, and maintain appropriate music and atmosphere for teens. Parents are welcome to attend or can feel confident leaving their teens in our care.',
        isNew: true
      },
      {
        question: 'Can parents attend or is it teens only?',
        answer: 'That\'s entirely up to you! Many Sweet 16s have a mix of teens with a few parents/chaperones on board. Some prefer teens-only with parents just for drop-off/pickup. We accommodate either format and ensure appropriate supervision regardless.',
        isNew: true
      },
      {
        question: 'What food and drink options work best for Sweet 16s?',
        answer: 'Popular options include pizza, sliders, tacos, fruit platters, and dessert bars. For drinks, we create fancy mocktails, smoothies, sodas, and juices. Everything is presented beautifully for those important Instagram moments!',
        isNew: true
      },
      {
        question: 'What kind of music is appropriate?',
        answer: 'Our DJs specialize in teen parties with current pop hits, clean versions of popular songs, and dance favorites. The birthday girl can provide a playlist or our DJ will read the room. All music is age-appropriate and parent-approved.',
        isNew: true
      },
      {
        question: 'What activities do teens enjoy on the cruise?',
        answer: 'Dancing is always popular! Plus swimming, photo sessions, TikTok video creation, mocktail making, and scenic cruising. We can also arrange games, contests, or special surprises based on the birthday girl\'s interests.',
        isNew: true
      },
      {
        question: 'Can we have a themed Sweet 16?',
        answer: 'Absolutely! Popular themes include Enchanted Garden, Hollywood Glam, Tropical Paradise, or Disco Dreams. We\'ll help coordinate decorations, props, and even suggest dress codes to match your theme perfectly.',
        isNew: true
      }
    ]
  },

  // NEW: Milestone Birthday Page FAQs
  milestoneBirthday: {
    source: '/milestone-birthday (Page)',
    faqs: [
      {
        question: 'What milestone birthdays do you typically celebrate?',
        answer: 'We specialize in all milestone birthdays - 21st, 30th, 40th, 50th, 60th, and beyond! Each milestone gets special touches: 21st parties often feature celebratory toasts, 30th and 40th focus on fun themes, while 50th and beyond emphasize elegance and nostalgia.',
        isNew: true
      },
      {
        question: 'Can you help coordinate a surprise party?',
        answer: 'Absolutely! We\'re experts at surprise parties. We\'ll work with your designated planner, coordinate arrival timing, help with distraction plans, and ensure the birthday person is genuinely surprised. Our crew is discreet and professional.',
        isNew: true
      },
      {
        question: 'What decorations are included vs. what can we bring?',
        answer: 'We provide basic birthday banners, balloons, and table settings. You\'re welcome to bring custom decorations, photo displays, or themed items. Popular additions include decade-specific decorations, photo timelines, and personalized banners.',
        isNew: true
      },
      {
        question: 'Can we bring our own birthday cake?',
        answer: 'Yes! We have a dedicated cake table with all serving supplies. We can also connect you with local bakeries who deliver to the marina. Our crew will handle cake service and coordinate the perfect moment for singing and candles.',
        isNew: true
      },
      {
        question: 'What activities work well for different age groups?',
        answer: 'For 21st-30th: dancing, swimming, party games. For 40th-50th: mix of relaxation and celebration. For 60th+: scenic cruising, storytelling, nostalgic music. We customize activities based on your group\'s preferences and energy level.',
        isNew: true
      },
      {
        question: 'How do guests handle bringing gifts on a boat?',
        answer: 'We have a designated gift table area. Many groups opt for a gift opening on land and cards-only on the boat. We can also arrange gift transportation back to vehicles after the cruise.',
        isNew: true
      }
    ]
  },

  // NEW: Rehearsal Dinner Page FAQs
  rehearsalDinner: {
    source: '/rehearsal-dinner (Page)',
    faqs: [
      {
        question: 'Do you provide catering for rehearsal dinners?',
        answer: 'For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. We work with Austin\'s best catering partners who specialize in boat events. We\'ll connect you with trusted vendors and our crew will assist with all setup and service during your cruise.',
        isNew: true
      },
      {
        question: 'What time should we schedule our rehearsal dinner cruise?',
        answer: 'We recommend starting 2 hours before sunset for the best experience. This gives you daylight for boarding and mingling, sunset for dinner and photos, and twilight for speeches and toasts. Our team will help you choose the perfect timing based on your wedding date.',
        isNew: true
      },
      {
        question: 'How do speeches and toasts work on the boat?',
        answer: 'We provide a wireless microphone system perfect for speeches. The boat has designated areas ideal for toasts with everyone able to see and hear. Many couples do speeches during sunset for the most romantic backdrop.',
        isNew: true
      },
      {
        question: 'Can we decorate the boat for our rehearsal dinner?',
        answer: 'Absolutely! We encourage personalizing the space. Our crew arrives early to help with setup. We can accommodate flowers, signs, photos, and lighting. We\'ll work with your wedding planner or help you DIY.',
        isNew: true
      },
      {
        question: 'What\'s the backup plan for bad weather?',
        answer: 'The boat has covered areas for light rain. For severe weather, we\'ll work with you to reschedule or we can arrange an indoor waterfront venue. We monitor weather closely and communicate any concerns 48 hours before your event.',
        isNew: true
      },
      {
        question: 'Is there parking for all our guests?',
        answer: 'Yes! We have ample free parking at the marina. We can also arrange shuttle service from your hotel or venue. Many couples use this as a gathering point before heading to the rehearsal dinner cruise together.',
        isNew: true
      }
    ]
  },

  // NEW: After Party Page FAQs
  afterParty: {
    source: '/after-party (Page)',
    faqs: [
      {
        question: 'What time do after party cruises typically start?',
        answer: 'Most after party cruises begin between 9-11 PM, perfectly timed for when your reception winds down. We can customize the timing to match your wedding schedule. Late night cruises run until 1-2 AM.',
        isNew: true
      },
      {
        question: 'How do guests get from the reception to the boat?',
        answer: 'We recommend arranging shuttle buses from your reception venue to the marina. This ensures safe transportation and keeps the party energy going. Many couples use the same transportation service from their wedding.',
        isNew: true
      },
      {
        question: 'Can we continue with our wedding DJ or band?',
        answer: 'We can work with your wedding DJ if they\'re available, or provide one of our professional party DJs who specialize in keeping the energy high. Either way, you control the playlist and vibe.',
        isNew: true
      },
      {
        question: 'What food options work best for after parties?',
        answer: 'For food, you have two options: (1) Bring your own - easy items that won\'t make a mess like sliders, pizza, tacos, or dessert bars, or (2) We can help arrange full catering and setup from Austin vendors. We also offer coffee and energy drinks to keep the party going. Lighter late-night snacks are most popular for after parties.',
        isNew: true
      },
      {
        question: 'What should guests wear?',
        answer: 'Most guests change into comfortable party attire after the reception. We recommend bringing a change of clothes or at least comfortable shoes. The vibe is more relaxed than the formal reception.',
        isNew: true
      },
      {
        question: 'Do all wedding guests usually attend the after party?',
        answer: 'Typically 30-60% of wedding guests continue to the after party. It\'s usually the younger crowd and closest friends. This creates a more intimate, high-energy celebration to cap off your special day.',
        isNew: true
      }
    ]
  },

  // NEW: Welcome Party Page FAQs
  welcomeParty: {
    source: '/welcome-party (Page)',
    faqs: [
      {
        question: 'When should we schedule the welcome party cruise?',
        answer: 'Most couples schedule their welcome party the day before the wedding, either as an afternoon or early evening cruise. This gives out-of-town guests a chance to meet everyone before the big day while keeping the schedule relaxed.',
        isNew: true
      },
      {
        question: 'What food options work best for welcome parties?',
        answer: 'For food, you have two options: (1) Bring your own - easy items that won\'t make a mess, or (2) We can help arrange full catering and setup from Austin vendors. Texas BBQ and Fajita bars are our most popular catering choices - they\'re casual, delicious, and give guests a true Austin experience. We can also arrange lighter appetizers or full dinner service based on your preferences.',
        isNew: true
      },
      {
        question: 'What entertainment options do you recommend?',
        answer: 'For welcome parties, we recommend either acoustic musicians for a relaxed vibe or a small band for more energy. The music creates atmosphere while still allowing guests to mingle and chat comfortably.',
        isNew: true
      },
      {
        question: 'How do guests get to the boat?',
        answer: 'We have ample parking at the marina, and many couples arrange shuttle buses from hotels. This makes it easy for out-of-town guests and creates a fun group arrival experience.',
        isNew: true
      },
      {
        question: 'What if the weather doesn\'t cooperate?',
        answer: 'Our boats have covered areas for sun or light rain protection. For severe weather, we can reschedule or arrange an alternative waterfront venue. We monitor conditions closely and communicate any concerns early.',
        isNew: true
      },
      {
        question: 'Can we customize the party to match our wedding theme?',
        answer: 'Absolutely! We love helping couples create cohesive wedding weekends. From decorations to menu choices, we\'ll work with you to ensure the welcome party perfectly complements your wedding style.',
        isNew: true
      }
    ]
  },

  // NEW: ATX Disco Cruise - Combined Bachelor/Bachelorette FAQs
  combinedBachelorBachelorette: {
    source: '/atx-disco-cruise (ATX Disco Cruise - serves combined bachelor/bachelorette parties)',
    faqs: [
      {
        question: 'What is a combined bachelor/bachelorette party?',
        answer: 'It\'s the modern trend of celebrating together! Instead of splitting up, the bride and groom\'s friend groups join forces for one epic party. It\'s perfect for couples whose friends already know each other or want everyone to bond before the wedding. More fun, less planning, and one unforgettable experience!',
        isNew: true
      },
      {
        question: 'How many people can you accommodate for a combined party?',
        answer: 'We excel at larger groups! Our Disco Cruises can handle 20-40+ people comfortably, and for even bigger combined celebrations, we offer private boats up to 75 people. The bigger the group, the better the party - and we have the boats to make it happen!',
        isNew: true
      },
      {
        question: 'Should we book a private cruise or join the Disco Cruise?',
        answer: 'Great question! For groups under 30 people, the Disco Cruise is usually the best value and vibe. For 30+, or if you want complete control of the boat, go private. We can help you decide based on your group size, budget, and party style. Both options are AMAZING for combined parties!',
        isNew: true
      },
      {
        question: 'Can we split costs between the bride and groom\'s sides?',
        answer: 'Absolutely! We make it easy to split payments however you want - by side, by person, or any way that works for your group. Everyone can pay their portion directly at checkout. No awkward Venmo requests needed!',
        isNew: true
      },
      {
        question: 'What if guys want different things than girls?',
        answer: 'We\'ve got you covered! Our boats have multiple zones - some people can chill on floats, others can dance with the DJ, some can lounge in the shade. BYOB means everyone brings what they like. There\'s something for everyone, and that\'s what makes combined parties so fun!',
        isNew: true
      },
      {
        question: 'What activities work best for mixed groups?',
        answer: 'Everything! The DJ keeps the energy high, giant floats are a hit with everyone, swimming and lounging on the water is universal fun. We\'ve seen countless combined parties where guys and girls all have an absolute blast together. The shared celebration creates amazing memories!',
        isNew: true
      },
      {
        question: 'What happens if there\'s bad weather?',
        answer: 'We cruise rain or shine - the boat has covered areas! For severe weather (lightning, high winds), we have backup plans including our "Lemonade Party" option with food and drinks on land. Your combined celebration will still be epic, just adjusted for safety!',
        isNew: true
      },
      {
        question: 'How far in advance should we book?',
        answer: 'Book as early as possible! Combined parties are trending hard, and larger group dates fill up 6-8 weeks out. Weekend slots go especially fast. Lock in your date now to ensure everyone can celebrate together!',
        isNew: true
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
      isNew?: boolean;
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
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Client Entertainment FAQs
    allFAQs.clientEntertainment.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.clientEntertainment.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Bachelor Party FAQs
    allFAQs.bachelorParty.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.bachelorParty.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Bachelorette Party FAQs
    allFAQs.bacheloretteParty.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.bacheloretteParty.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // ATX Disco Cruise FAQs
    allFAQs.atxDiscoCruise.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.atxDiscoCruise.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Private Cruises FAQs
    allFAQs.privateCruises.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.privateCruises.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Home Page FAQs
    allFAQs.homePage.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.homePage.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Party Boat Austin FAQs
    allFAQs.partyBoatAustin.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.partyBoatAustin.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Party Boat Lake Travis FAQs
    allFAQs.partyBoatLakeTravis.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.partyBoatLakeTravis.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Graduation Party FAQs
    allFAQs.graduationParty.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.graduationParty.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Company Milestone FAQs
    allFAQs.companyMilestone.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.companyMilestone.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Sweet 16 FAQs
    allFAQs.sweet16.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.sweet16.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Milestone Birthday FAQs
    allFAQs.milestoneBirthday.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.milestoneBirthday.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Rehearsal Dinner FAQs
    allFAQs.rehearsalDinner.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.rehearsalDinner.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // After Party FAQs
    allFAQs.afterParty.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.afterParty.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Welcome Party FAQs
    allFAQs.welcomeParty.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.welcomeParty.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    // Combined Bachelor/Bachelorette FAQs
    allFAQs.combinedBachelorBachelorette.faqs.forEach(faq => {
      allQuestions.push({
        source: allFAQs.combinedBachelorBachelorette.source,
        question: faq.question,
        answer: faq.answer,
        isNew: faq.isNew
      });
    });

    return allQuestions;
  };

  const allQuestions = getAllFAQs();
  const newFAQsCount = allQuestions.filter(faq => faq.isNew).length;

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
      <AdminNoIndex />
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">FAQ Review Dashboard</h1>
        <p className="text-muted-foreground">
          All FAQs from across the website - {allQuestions.length} total questions ({newFAQsCount} new)
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
            <CardTitle className="text-sm font-medium">New FAQs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{newFAQsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
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
                  {faq.isNew && (
                    <Badge className="text-xs bg-green-600 hover:bg-green-700">
                      NEW
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
