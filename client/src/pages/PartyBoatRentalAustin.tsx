import EventPageTemplate from '@/components/EventPageTemplate';
import { Ship, Users, Music, Waves, Shield, Calendar } from 'lucide-react';

const features = [
  {
    icon: Ship,
    title: 'Premium Fleet',
    description: 'Choose from our fleet of well-maintained party boats designed for celebrations of all sizes.'
  },
  {
    icon: Users,
    title: 'Groups 6-75',
    description: 'Whether intimate gatherings or large parties, we have the perfect boat for your group size.'
  },
  {
    icon: Music,
    title: 'Premium Sound System',
    description: 'Bluetooth-enabled speakers let you play your party playlist all cruise long.'
  },
  {
    icon: Waves,
    title: 'Lake Travis Experience',
    description: 'Cruise the beautiful waters of Lake Travis with stunning Texas Hill Country views.'
  },
  {
    icon: Shield,
    title: 'Licensed Captains',
    description: 'Professional, experienced captains ensure your safety while you focus on having fun.'
  },
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Morning, afternoon, or sunset cruises available to fit your celebration plans.'
  }
];

const faqs = [
  {
    question: 'What sizes of party boats do you offer for rent in Austin?',
    answer: 'We offer three boat sizes: Day Tripper for 6-14 guests, Meeseeks/The Irony for 15-30 guests, and our flagship Clever Girl for 31-75 guests. All boats feature premium amenities and professional captains.'
  },
  {
    question: 'Can we bring our own food and drinks on the party boat?',
    answer: 'Yes! All our boats are BYOB-friendly. You can bring your own food, drinks, and ice. We just ask that all beverages be in cans or plastic containers (no glass). We can also help coordinate alcohol delivery through our partners.'
  },
  {
    question: 'How long are the party boat rentals?',
    answer: 'Our standard cruise duration is 3 hours, which gives you plenty of time to enjoy Lake Travis, swim, and celebrate. Extended cruises are available upon request.'
  },
  {
    question: 'What is included with the party boat rental?',
    answer: 'Every rental includes a licensed captain, premium Bluetooth sound system, clean restroom facilities, cooler space, and both sun and shade seating areas. Upgrade packages add extras like ice, water, floats, and party supplies.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Party Boat Rental Austin' }
];

export default function PartyBoatRentalAustin() {
  return (
    <EventPageTemplate
      title="Party Boat Rental Austin"
      metaTitle="Party Boat Rental Austin | Lake Travis Boat Rentals | Premier Party Cruises"
      metaDescription="Rent a party boat in Austin for your next celebration. Premium boats for 6-75 guests on Lake Travis. Licensed captains, BYOB friendly, premium sound systems. Book today!"
      pageRoute="/party-boat-rental-austin"
      heroTitle="Austin's Premier Party Boat Rentals"
      heroSubtitle="Experience Lake Travis aboard our luxury party boats. Perfect for birthdays, bachelor parties, corporate events, and any celebration worth remembering."
      heroBadge="Party Boat Rentals"
      heroIcon={Ship}
      heroImage="/attached_assets/clever-girl-50-person-boat.jpg"
      introTitle="Your Austin Party Boat Adventure Awaits"
      introText="Looking for the ultimate party experience in Austin? Our party boat rentals on Lake Travis offer the perfect setting for any celebration. From intimate gatherings to large group parties, our fleet of professionally captained boats provides everything you need for an unforgettable day on the water."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="blue"
    />
  );
}
