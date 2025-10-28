// Corporate Events FAQ content
// Based on premierpartycruises.com FAQ section with corporate focus

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  priority: number;
}

export const corporateFAQs: FAQ[] = [
  // Booking & Reservations
  {
    id: 'corp_book_1',
    question: 'How far in advance should we book our corporate event?',
    answer: 'For corporate events, we recommend booking 3-6 weeks in advance, especially for weekend dates during peak season (March-October). This allows adequate time for planning, coordination, and any special arrangements your company may need. Weekday corporate events typically have more availability and can often be booked with shorter notice.',
    category: 'booking',
    priority: 1
  },
  {
    id: 'corp_book_2',
    question: 'What deposit is required for corporate bookings?',
    answer: 'Corporate bookings require a 25% deposit to secure your reservation, with the balance due 14 days before your event. We accept corporate credit cards, ACH transfers, and traditional payment methods. For established corporate clients, we can arrange net payment terms upon approval.',
    category: 'booking',
    priority: 2
  },
  {
    id: 'corp_book_3',
    question: 'Do you offer corporate contracts and volume discounts?',
    answer: 'Yes! We offer corporate contracts for companies planning multiple events throughout the year. Volume discounts are available for groups of 25+ people or multiple bookings. We also provide special rates for Fortune 500 companies and established corporate partnerships. Contact our corporate sales team for custom pricing.',
    category: 'booking',
    priority: 3
  },
  {
    id: 'corp_book_4',
    question: 'What is your corporate cancellation policy?',
    answer: 'Corporate cancellations made more than 21 days prior receive a full refund. 14-21 days prior: 75% refund. 7-14 days prior: 50% refund. Less than 7 days: 25% refund (except for severe weather). We understand business needs change and work with corporate clients to reschedule when possible.',
    category: 'booking',
    priority: 4
  },
  {
    id: 'corp_book_5',
    question: 'Can we reschedule our corporate event?',
    answer: 'Absolutely! We offer one complimentary reschedule for corporate events if requested more than 72 hours before the original date, subject to availability. Additional reschedules may incur a $150 administrative fee. We work closely with corporate event planners to ensure flexibility.',
    category: 'booking',
    priority: 5
  },

  // Corporate Services & Amenities
  {
    id: 'corp_service_1',
    question: 'What corporate amenities do you provide?',
    answer: 'Our corporate packages include: licensed, fun, experienced captains to take your group safely around the lake in style, premium sound system with microphone capabilities, climate-controlled areas, professional restrooms, coolers with ice, charging stations, and WiFi when requested. Enhanced packages include dedicated event coordinators and presentation equipment.',
    category: 'services',
    priority: 1
  },
  {
    id: 'corp_service_2',
    question: 'Can we bring catering or do you provide food service?',
    answer: 'You can bring your own catering, or we can connect you with our preferred corporate catering partners who specialize in on-water service. Our partners offer everything from lunch boxes and appetizer platters to full-service gourmet dining. We provide serving areas, tables, and coordination for seamless meal service.',
    category: 'services',
    priority: 2
  },
  {
    id: 'corp_service_3',
    question: 'Do you accommodate presentations and meetings?',
    answer: 'Yes! Our boats can be configured for corporate presentations with projection capabilities, wireless microphones, and professional seating arrangements. We offer both indoor climate-controlled areas and outdoor spaces perfect for team building activities. Advanced setup and technical support are included in our Corporate Ultimate package.',
    category: 'services',
    priority: 3
  },
  {
    id: 'corp_service_4',
    question: 'What about alcohol service for corporate events?',
    answer: 'We can coordinate with licensed beverage providers for corporate-appropriate alcohol service, including hosted bars, wine service, and signature cocktails. All service follows TABC regulations with certified staff. We also accommodate dry corporate events with premium non-alcoholic beverage packages.',
    category: 'services',
    priority: 4
  },
  {
    id: 'corp_service_5',
    question: 'Do you provide professional photography and videography?',
    answer: 'Yes! Professional photography is included in our Corporate Ultimate package, with videography available as an add-on. Our photographers understand corporate needs, capturing both candid team moments and professional group photos suitable for marketing materials. All images are delivered within 48 hours.',
    category: 'services',
    priority: 5
  },

  // Logistics & Planning
  {
    id: 'corp_logistics_1',
    question: 'What group sizes can you accommodate?',
    answer: 'We accommodate corporate groups from 14 to 75+ people. Our 25-person boats are perfect for executive teams, while our 50-person vessels work great for department outings. For larger corporate events (75+ people), we can coordinate multiple boats to cruise together, maintaining group cohesion while meeting capacity requirements.',
    category: 'logistics',
    priority: 1
  },
  {
    id: 'corp_logistics_2',
    question: 'Where do corporate events depart from?',
    answer: 'Corporate events depart from our private marina on Lake Travis, approximately 20 minutes from downtown Austin. We provide exact location details, GPS coordinates, and parking information upon booking. Our marina offers convenient parking and easy boarding access for corporate groups.',
    category: 'logistics',
    priority: 2
  },
  {
    id: 'corp_logistics_3',
    question: 'How long are corporate cruises?',
    answer: 'Standard corporate cruises are 3-4 hours, perfect for afternoon team building or evening client entertainment. Half-day (6-hour) and full-day (8-hour) charters are available for corporate retreats and major company events. Custom durations can be arranged based on your corporate needs.',
    category: 'logistics',
    priority: 3
  },
  {
    id: 'corp_logistics_4',
    question: 'What happens in case of bad weather?',
    answer: 'Corporate event safety is our top priority. We monitor weather conditions closely and contact corporate coordinators 48-72 hours before the event if conditions look questionable. For unsafe weather, we offer full rescheduling assistance or venue alternatives. Our covered boats can handle light rain with climate-controlled comfort.',
    category: 'logistics',
    priority: 4
  },
  {
    id: 'corp_logistics_5',
    question: 'Do you provide transportation to and from the marina?',
    answer: 'While we don\'t provide direct transportation, we partner with corporate transportation companies and can arrange shuttle services for groups. Many corporate clients arrange bus transportation, and we can coordinate timing and logistics. Detailed directions and parking information are provided to all attendees.',
    category: 'logistics',
    priority: 5
  },

  // Team Building & Activities
  {
    id: 'corp_activities_1',
    question: 'What team building activities do you offer?',
    answer: 'We offer various team building options including: lake-based scavenger hunts, group challenges, swimming competitions, and collaborative games. Our crew can facilitate activities or we can arrange professional team building facilitators. Activities are customized based on group dynamics and corporate objectives.',
    category: 'activities',
    priority: 1
  },
  {
    id: 'corp_activities_2',
    question: 'Can we combine business meetings with recreation?',
    answer: 'Absolutely! Many corporate clients use our boats for working lunches, quarterly reviews, or strategic planning sessions followed by team recreation. Our boats provide professional meeting spaces that transition seamlessly into party mode. This combination creates memorable experiences while accomplishing business objectives.',
    category: 'activities',
    priority: 2
  },
  {
    id: 'corp_activities_3',
    question: 'Is swimming included in corporate events?',
    answer: 'Swimming can be included based on the corporate group\'s preferences and the season. Lake Travis offers excellent swimming opportunities with our ladder access and safety equipment. Corporate groups often enjoy swimming as a team building activity, though participation is always optional and at participants\' own risk.',
    category: 'activities',
    priority: 3
  },

  // Pricing & Packages
  {
    id: 'corp_pricing_1',
    question: 'How is corporate event pricing structured?',
    answer: 'Corporate pricing is based on group size, duration, day of the week, and package level. Our Corporate Essentials package starts at competitive rates, while our Corporate Ultimate package includes premium amenities and services. Custom quotes are provided based on specific corporate requirements and add-ons.',
    category: 'pricing',
    priority: 1
  },
  {
    id: 'corp_pricing_2',
    question: 'Are there additional fees for corporate events?',
    answer: 'Our quoted prices include all standard amenities. Additional costs may include: premium catering coordination, extra crew for large groups (75+ people), extended hours beyond package duration, special equipment rentals, or enhanced photography/videography services. All additional costs are clearly outlined in your proposal.',
    category: 'pricing',
    priority: 2
  },
  {
    id: 'corp_pricing_3',
    question: 'Do you offer corporate membership programs?',
    answer: 'Yes! Our Corporate Partnership Program offers preferred pricing, priority booking, dedicated account management, and flexible scheduling for companies planning multiple events annually. Partners receive volume discounts, complimentary upgrades, and first access to new boats and services.',
    category: 'pricing',
    priority: 3
  }
];

// FAQ categories for filtering
export const faqCategories = [
  { id: 'all', name: 'All Questions', icon: 'HelpCircle', count: corporateFAQs.length },
  { id: 'booking', name: 'Booking & Reservations', icon: 'Calendar', count: corporateFAQs.filter(faq => faq.category === 'booking').length },
  { id: 'services', name: 'Services & Amenities', icon: 'Star', count: corporateFAQs.filter(faq => faq.category === 'services').length },
  { id: 'logistics', name: 'Logistics & Planning', icon: 'MapPin', count: corporateFAQs.filter(faq => faq.category === 'logistics').length },
  { id: 'activities', name: 'Team Building & Activities', icon: 'Users', count: corporateFAQs.filter(faq => faq.category === 'activities').length },
  { id: 'pricing', name: 'Pricing & Packages', icon: 'DollarSign', count: corporateFAQs.filter(faq => faq.category === 'pricing').length }
];

// Get FAQs by category
export function getFAQsByCategory(category: string): FAQ[] {
  if (category === 'all') {
    return corporateFAQs.sort((a, b) => a.priority - b.priority);
  }
  return corporateFAQs
    .filter(faq => faq.category === category)
    .sort((a, b) => a.priority - b.priority);
}

// Get most important FAQs (priority 1-2)
export function getFeaturedFAQs(): FAQ[] {
  return corporateFAQs
    .filter(faq => faq.priority <= 2)
    .sort((a, b) => a.priority - b.priority);
}

// Search FAQs by query
export function searchFAQs(query: string): FAQ[] {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return corporateFAQs;
  
  return corporateFAQs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.answer.toLowerCase().includes(searchTerm)
  );
}