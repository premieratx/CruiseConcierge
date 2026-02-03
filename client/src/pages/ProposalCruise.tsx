import EventPageTemplate from '@/components/EventPageTemplate';
import { Heart, Sparkles, Camera, Music, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Romantic Setting',
    description: 'Propose with Lake Travis as your backdrop during golden hour for an unforgettable moment.'
  },
  {
    icon: Sparkles,
    title: 'Private & Intimate',
    description: 'Just the two of you (or with hidden friends/family) for this life-changing question.'
  },
  {
    icon: Camera,
    title: 'Photography Ready',
    description: 'Perfect lighting and stunning views make for incredible proposal photos and videos.'
  },
  {
    icon: Music,
    title: 'Your Special Playlist',
    description: 'Play your meaningful songs on our premium Bluetooth sound system during the moment.'
  },
  {
    icon: Shield,
    title: 'Discreet Coordination',
    description: 'Our crew helps coordinate surprise elements without giving anything away.'
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Choose sunset cruises for magical lighting or daytime for swimming celebration after.'
  }
];

const faqs = [
  {
    question: 'Can you help me plan the surprise proposal?',
    answer: 'Absolutely! Our team has helped coordinate dozens of successful proposals. We can assist with timing the moment, hiding photographers, coordinating champagne service, and ensuring everything goes perfectly. Just let us know your vision and we\'ll make it happen.'
  },
  {
    question: 'Can I bring a photographer on board?',
    answer: 'Yes! We encourage it for such a special moment. Your photographer can hide below deck and emerge at the perfect moment, or position themselves on the upper deck for the best angles. We\'ll coordinate with them beforehand.'
  },
  {
    question: 'What\'s the best time of day for a proposal cruise?',
    answer: 'Sunset cruises are the most popular for proposals - the golden hour lighting is absolutely magical on Lake Travis. We recommend booking 2-3 hours before sunset so you have time to cruise, pop the question during golden hour, and celebrate after.'
  },
  {
    question: 'Can I invite family and friends to surprise them after?',
    answer: 'Yes! Many couples have family and friends waiting at the dock for a surprise celebration, or you can have them hidden on the boat to reveal after the big moment. We can help coordinate either option for maximum surprise factor.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/private-cruises' },
  { label: 'Proposal Cruises' }
];

export default function ProposalCruise() {
  return (
    <EventPageTemplate
      title="Proposal Cruises"
      metaTitle="Marriage Proposal Cruise Lake Travis | Romantic Austin Boat Rental"
      metaDescription="Plan the perfect marriage proposal on Lake Travis. Private romantic cruises with stunning sunset views, champagne service, and discreet coordination. She'll say yes!"
      heroTitle="Pop the Question on Lake Travis"
      heroSubtitle="Create an unforgettable proposal moment with stunning lake views, romantic sunset lighting, and complete privacy for your special question."
      heroBadge="Romantic Proposals"
      heroIcon={Heart}
      heroImage="/attached_assets/party-atmosphere-1.jpg"
      introTitle="The Perfect Proposal Setting"
      introText="Lake Travis provides the ultimate romantic backdrop for your marriage proposal. Imagine dropping to one knee as the sun sets over the Texas Hill Country, with the peaceful waters reflecting golden light. Our experienced crew helps coordinate every detail discreetly, from hiding photographers to timing the champagne service, ensuring your proposal moment is absolutely perfect."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="pink"
    />
  );
}
