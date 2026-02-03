import EventPageTemplate from '@/components/EventPageTemplate';
import { Heart, Sunset, Wine, Camera, Sparkles, Star } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Romantic Atmosphere',
    description: 'Private cruises designed for couples celebrating their love on the beautiful waters of Lake Travis.'
  },
  {
    icon: Sunset,
    title: 'Stunning Sunset Views',
    description: 'Time your cruise for golden hour and watch the sun paint the Texas sky in romantic hues.'
  },
  {
    icon: Wine,
    title: 'BYOB Celebration',
    description: 'Bring your favorite champagne or wine to toast your years together on the water.'
  },
  {
    icon: Camera,
    title: 'Picture-Perfect Memories',
    description: 'Lake Travis provides the perfect backdrop for anniversary photos you\'ll treasure forever.'
  },
  {
    icon: Sparkles,
    title: 'Special Touches',
    description: 'Our Ultimate package includes champagne flutes and special accessories for your celebration.'
  },
  {
    icon: Star,
    title: 'Milestone Celebrations',
    description: 'Whether it\'s your 1st or 50th anniversary, we help make every milestone magical.'
  }
];

const faqs = [
  {
    question: 'Can we have a private cruise for just the two of us?',
    answer: 'Absolutely! Our Day Tripper boat is perfect for intimate anniversary celebrations. You can also invite family and friends to share in your special day with larger boat options.'
  },
  {
    question: 'What time is best for a romantic anniversary cruise?',
    answer: 'We highly recommend a sunset cruise for anniversaries. The golden hour light creates the most romantic atmosphere on Lake Travis. Book the 5-8 PM time slot during summer months.'
  },
  {
    question: 'Can we bring food and drinks for our anniversary?',
    answer: 'Yes! You\'re welcome to bring your own food, champagne, wine, and drinks. We recommend cans and plastic containers. Our Essentials package includes coolers with ice and a table for your celebration spread.'
  },
  {
    question: 'Do you offer any special anniversary packages?',
    answer: 'Our Ultimate package is perfect for anniversaries with champagne flutes, festive accessories, and premium amenities. You can also coordinate catering delivery to the marina for a full celebration experience.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Celebrations', href: '/celebrations' },
  { label: 'Anniversary Cruise' }
];

export default function AnniversaryCruise() {
  return (
    <EventPageTemplate
      title="Anniversary Cruise"
      metaTitle="Anniversary Cruise Lake Travis | Romantic Austin Party Boat"
      metaDescription="Celebrate your anniversary with a romantic private cruise on Lake Travis. Stunning sunsets, intimate atmosphere, and unforgettable memories in Austin. Book your special day!"
      heroTitle="Romantic Anniversary Cruises on Lake Travis"
      heroSubtitle="Celebrate your love story with a private cruise featuring stunning sunsets and unforgettable moments"
      heroBadge="Anniversary Celebrations"
      heroIcon={Heart}
      heroImage="/attached_assets/party-atmosphere-2.jpg"
      introTitle="Celebrate Your Love on the Water"
      introText="Your anniversary deserves more than a dinner reservation. Escape to Lake Travis for a private cruise where you can toast your love, enjoy stunning views, and create new memories together. Whether it's your first anniversary or your fiftieth, we make every celebration special."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="pink"
    />
  );
}
