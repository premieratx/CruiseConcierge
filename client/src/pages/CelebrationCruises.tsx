import EventPageTemplate from '@/components/EventPageTemplate';
import { Heart, Gift, Star, Users, Camera, Calendar } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Every Occasion',
    description: 'From anniversaries and engagements to promotions and retirements, we make every milestone special.'
  },
  {
    icon: Gift,
    title: 'Surprise Celebrations',
    description: 'Plan the perfect surprise party on the water. We help coordinate every detail for maximum impact.'
  },
  {
    icon: Star,
    title: 'VIP Treatment',
    description: 'Our professional captains and crew ensure your guest of honor feels like a star all cruise long.'
  },
  {
    icon: Users,
    title: 'Intimate to Grand',
    description: 'Boats for every celebration size, from romantic couples cruises to parties of 75 guests.'
  },
  {
    icon: Camera,
    title: 'Memory-Making',
    description: 'Lake Travis provides the perfect backdrop for photos that capture your special moments forever.'
  },
  {
    icon: Calendar,
    title: 'Flexible Timing',
    description: 'Morning brunch cruises, afternoon parties, or magical sunset celebrations—you choose the vibe.'
  }
];

const faqs = [
  {
    question: 'What types of celebrations are your cruises good for?',
    answer: 'Our celebration cruises are perfect for any occasion: birthdays, anniversaries, engagements, baby showers, graduations, retirements, promotions, reunions, and more. If there\'s something worth celebrating, we can make it special on Lake Travis!'
  },
  {
    question: 'Can you help us plan a surprise celebration cruise?',
    answer: 'Absolutely! We love helping coordinate surprise celebrations. We can help with timing, coordinating arrival, and ensuring everything is perfect when the guest of honor arrives. Just let us know your plans when booking.'
  },
  {
    question: 'Do you provide decorations for celebration cruises?',
    answer: 'Our Ultimate package includes party supplies and decorations. You\'re also welcome to bring your own decorations to personalize your celebration. We recommend easy-to-manage items like banners, balloons, and themed napkins.'
  },
  {
    question: 'Can we do a dinner or brunch celebration cruise?',
    answer: 'While we don\'t provide catering, you\'re welcome to bring your own food and drinks (BYOB in cans/plastic). Our Essentials package includes a 6-foot folding table perfect for setting up a buffet spread. Many guests coordinate catering delivery to the marina.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Celebration Cruises' }
];

export default function CelebrationCruises() {
  return (
    <EventPageTemplate
      title="Celebration Cruises"
      metaTitle="Celebration Cruises Austin | Lake Travis Private Party Boats | Premier Party Cruises"
      metaDescription="Celebrate life's special moments on Lake Travis! Private celebration cruises for anniversaries, engagements, graduations, and every milestone. Groups 6-75 guests. Book today!"
      heroTitle="Celebrate Life's Special Moments on Lake Travis"
      heroSubtitle="Anniversaries, engagements, graduations, and every milestone in between—make your celebration unforgettable with a private cruise."
      heroBadge="Celebrate in Style"
      heroIcon={Heart}
      heroImage="/attached_assets/party-atmosphere-2.jpg"
      introTitle="Every Celebration Deserves Something Special"
      introText="Life's milestones deserve more than a dinner reservation. Our celebration cruises on Lake Travis transform your special occasion into an unforgettable experience. Whether you're marking an anniversary, toasting an engagement, celebrating a graduation, or honoring any of life's precious moments, we provide the perfect setting for your memories."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="green"
    />
  );
}
