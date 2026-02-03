import EventPageTemplate from '@/components/EventPageTemplate';
import { Crown, Gem, Star, Anchor, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Crown,
    title: 'Luxury Experience',
    description: 'Our flagship Clever Girl features 14 disco balls, premium seating, and VIP amenities for the ultimate yacht experience.'
  },
  {
    icon: Gem,
    title: 'Premium Amenities',
    description: 'Enjoy spacious decks, comfortable seating, premium sound systems, and clean restroom facilities.'
  },
  {
    icon: Star,
    title: 'Five-Star Service',
    description: 'Our professional captains and crew ensure your yacht rental exceeds all expectations.'
  },
  {
    icon: Anchor,
    title: 'Prime Lake Travis Location',
    description: 'Cruise past stunning limestone cliffs, beautiful coves, and the best views of Texas Hill Country.'
  },
  {
    icon: Shield,
    title: 'Safe & Reliable',
    description: 'All vessels are meticulously maintained with licensed captains at the helm for your peace of mind.'
  },
  {
    icon: Sparkles,
    title: 'Customizable Packages',
    description: 'From standard to ultimate packages, customize your yacht experience with floats, decorations, and party supplies.'
  }
];

const faqs = [
  {
    question: 'What makes your Lake Travis yacht rentals different from regular boat rentals?',
    answer: 'Our yacht-style vessels like Clever Girl offer a luxury experience with features like 14 disco balls, expansive deck space, premium sound systems, and capacity for up to 75 guests. It\'s designed for upscale celebrations and VIP experiences.'
  },
  {
    question: 'Is a yacht rental on Lake Travis suitable for corporate events?',
    answer: 'Absolutely! Our yacht rentals are perfect for corporate events, client entertainment, team building, and executive celebrations. The spacious layout and premium amenities create an impressive setting for business entertaining.'
  },
  {
    question: 'What is included in a Lake Travis yacht rental?',
    answer: 'Every yacht rental includes a professional captain, premium Bluetooth sound system, restroom facilities, cooler space, and both covered and open deck areas. Upgrade to our Ultimate package for floats, disco ball cups, bubble machines, and full party supplies.'
  },
  {
    question: 'How far in advance should I book a yacht rental on Lake Travis?',
    answer: 'For peak season (May-September) and weekends, we recommend booking 2-4 weeks in advance. Our larger yacht is especially popular, so early booking ensures availability for your preferred date and time.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Lake Travis Yacht Rental' }
];

export default function LakeTravisYachtRental() {
  return (
    <EventPageTemplate
      title="Lake Travis Yacht Rental"
      metaTitle="Lake Travis Yacht Rental | Luxury Boat Charter Austin | Premier Party Cruises"
      metaDescription="Rent a luxury yacht on Lake Travis for your upscale celebration. Premium vessels for up to 75 guests with professional crew. Perfect for corporate events, weddings, and VIP parties."
      heroTitle="Luxury Yacht Rentals on Lake Travis"
      heroSubtitle="Elevate your celebration with Austin's premier yacht experience. Stunning vessels, professional crew, and unforgettable views of Texas Hill Country."
      heroBadge="Luxury Yacht Experience"
      heroIcon={Crown}
      heroImage="/attached_assets/clever-girl-50-person-boat.jpg"
      introTitle="Experience Lake Travis in Luxury"
      introText="For those who demand the finest, our Lake Travis yacht rentals deliver an unparalleled experience. Whether you're hosting a corporate event, celebrating a milestone, or treating your group to something special, our luxury vessels provide the perfect backdrop for your most important occasions."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="purple"
    />
  );
}
