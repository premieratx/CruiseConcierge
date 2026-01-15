import EventPageTemplate from '@/components/EventPageTemplate';
import { Baby, Gift, Heart, Camera, Sparkles, Users } from 'lucide-react';

const features = [
  {
    icon: Baby,
    title: 'Mom-to-Be Focus',
    description: 'Celebrate the expecting mom with a unique experience she\'ll treasure forever.'
  },
  {
    icon: Gift,
    title: 'Gift Opening Space',
    description: 'Plenty of room for gifts, games, and all your baby shower activities.'
  },
  {
    icon: Heart,
    title: 'Intimate Celebration',
    description: 'Quality time with close friends and family in a beautiful private setting.'
  },
  {
    icon: Camera,
    title: 'Photo Memories',
    description: 'Stunning lake backdrop for maternity photos and group shots to remember.'
  },
  {
    icon: Sparkles,
    title: 'Unique Experience',
    description: 'Skip the traditional venue for an unforgettable celebration on the water.'
  },
  {
    icon: Users,
    title: 'Stress-Free Hosting',
    description: 'We handle the venue details so hosts can focus on celebrating mom.'
  }
];

const faqs = [
  {
    question: 'Is a boat baby shower safe for pregnant guests?',
    answer: 'Absolutely! Our boats are stable and smooth-riding, perfect for expecting moms. We cruise at gentle speeds and the lake is typically calm. There\'s plenty of comfortable seating in both sun and shade, and a clean restroom is always available on board.'
  },
  {
    question: 'What baby shower activities work well on the boat?',
    answer: 'Gift opening, baby shower games, and photo sessions all work wonderfully! We have tables for games and food, plenty of seating for socializing, and the beautiful lake views make every photo special. Many groups also enjoy light refreshments and cake cutting on board.'
  },
  {
    question: 'What\'s the best time to schedule a baby shower cruise?',
    answer: 'Afternoon cruises (1-4 PM or 2-5 PM) are most popular for baby showers. This timing works well for energy levels, food service, and capturing beautiful photos. We recommend avoiding the hottest summer afternoons - spring and fall are ideal seasons.'
  },
  {
    question: 'Can we bring our own decorations and cake?',
    answer: 'Yes! You can bring decorations, a cake, food, and all the party supplies you need. We provide tables for setup, coolers for beverages, and help coordinate everything. Many hosts decorate with a baby shower theme and bring specialty cakes from local bakeries.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/private-cruises' },
  { label: 'Baby Shower Cruises' }
];

export default function BabyShowerCruise() {
  return (
    <EventPageTemplate
      title="Baby Shower Cruises"
      metaTitle="Baby Shower Cruise Austin | Lake Travis Boat Party for Mom-to-Be"
      metaDescription="Host a unique baby shower on Lake Travis. Private boat celebration with games, gifts, and stunning views. Celebrate the mom-to-be in style!"
      heroTitle="Welcome Baby on the Water"
      heroSubtitle="Celebrate the mom-to-be with an unforgettable baby shower cruise on Lake Travis featuring gifts, games, and gorgeous lakeside views."
      heroBadge="Baby Celebrations"
      heroIcon={Baby}
      videoId="4-Yx24Y6oro"
      heroImage="/attached_assets/party-atmosphere-2.jpg"
      introTitle="A Baby Shower to Remember"
      introText="Give the mom-to-be a baby shower experience unlike any other. A Lake Travis cruise combines the joy of celebrating new life with the beauty of nature. Open adorable baby gifts with the Texas Hill Country as your backdrop, play games on the open deck, and create precious memories that will be shared for years to come. Our gentle cruises are perfect for expecting moms."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="purple"
    />
  );
}
