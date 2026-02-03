import EventPageTemplate from '@/components/EventPageTemplate';
import { Heart, Flower2, Users, Sunset, Star, Waves } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Honor Their Memory',
    description: 'Create a peaceful, meaningful celebration of life on the serene waters of Lake Travis.'
  },
  {
    icon: Flower2,
    title: 'Personalized Tributes',
    description: 'Bring photos, flowers, and mementos to create a deeply personal memorial experience.'
  },
  {
    icon: Users,
    title: 'Gather Loved Ones',
    description: 'Bring family and friends together in a beautiful, private setting to share memories.'
  },
  {
    icon: Sunset,
    title: 'Peaceful Setting',
    description: 'The tranquil waters and stunning views provide a serene backdrop for reflection.'
  },
  {
    icon: Star,
    title: 'Meaningful Moments',
    description: 'Space for speeches, readings, and quiet moments of remembrance during the cruise.'
  },
  {
    icon: Waves,
    title: 'Ash Scattering',
    description: 'We respectfully accommodate ash scattering ceremonies on Lake Travis waters.'
  }
];

const faqs = [
  {
    question: 'Do you accommodate ash scattering ceremonies?',
    answer: 'Yes, we respectfully accommodate ash scattering ceremonies on Lake Travis. Our captains are experienced in providing a dignified, peaceful experience for families during these meaningful moments.'
  },
  {
    question: 'What makes a boat memorial service special?',
    answer: 'The peaceful waters, beautiful scenery, and privacy of a boat create an intimate, meaningful setting for remembrance. Many families find the natural beauty of Lake Travis provides comfort and peace during difficult times.'
  },
  {
    question: 'Can we play music and share memories during the cruise?',
    answer: 'Absolutely. Our Bluetooth sound system allows you to play their favorite songs, and we create quiet moments for speeches, readings, poems, or memory sharing. The cruise is fully customizable to honor their life.'
  },
  {
    question: 'How many people can attend a memorial celebration cruise?',
    answer: 'Our boats accommodate 6-75 guests depending on which vessel you choose. We can help you select the right boat based on your expected attendance and the type of service you\'re planning.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Celebrations', href: '/celebrations' },
  { label: 'Memorial Celebration Cruise' }
];

export default function MemorialCelebrationCruise() {
  return (
    <EventPageTemplate
      title="Memorial Celebration Cruise"
      metaTitle="Celebration of Life Cruise Lake Travis | Memorial Service Austin"
      metaDescription="Honor your loved one with a peaceful celebration of life cruise on Lake Travis. Ash scattering ceremonies, memorial services, and meaningful gatherings in Austin."
      heroTitle="Celebration of Life Cruises on Lake Travis"
      heroSubtitle="Honor their memory with a peaceful, meaningful gathering on Austin's beautiful waters"
      heroBadge="Celebration of Life"
      heroIcon={Heart}
      heroImage="/attached_assets/party-atmosphere-2.jpg"
      introTitle="A Beautiful Way to Remember"
      introText="Some lives are so special, they deserve to be celebrated in an equally special way. A private cruise on Lake Travis provides a peaceful, beautiful setting to gather with loved ones, share memories, and honor a life well lived. The serene waters and stunning Texas scenery create a meaningful backdrop for remembrance."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="blue"
    />
  );
}
