import EventPageTemplate from '@/components/EventPageTemplate';
import { Heart, Flower2, Users, Sunset, Star, Waves, Shield, Music, Anchor, Cloud } from 'lucide-react';

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
    title: 'Tranquil Waters',
    description: 'A calming environment that provides a sense of peace during your private service.'
  },
  {
    icon: Shield,
    title: 'Professional Crew',
    description: 'Our captains are respectful and discreet, ensuring a dignified experience for your family.'
  },
  {
    icon: Music,
    title: 'Reflective Soundtrack',
    description: 'Play their favorite songs or peaceful music through our premium sound system.'
  },
  {
    icon: Anchor,
    title: 'Private Gathering',
    description: 'Avoid the crowds with a private charter dedicated solely to your memorial service.'
  },
  {
    icon: Cloud,
    title: 'Outdoor Reflection',
    description: 'Experience the healing power of nature and the open Texas sky as you remember your loved one.'
  }
];

const faqs = [
  {
    question: 'What is your policy on ash scattering?',
    answer: 'While we understand the desire for a water burial, Lake Travis regulations and our company policy do not allow the scattering of ashes into the water. We respectfully offer our boats as a peaceful venue for a memorial service and celebration of life while keeping the lake pristine for all.'
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
  },
  {
    question: 'Can we decorate the boat for the celebration of life?',
    answer: 'Yes, you are welcome to bring photos, flower arrangements, and other mementos to personalize the space. We can help you arrange these items to create a beautiful tribute to your loved one.'
  },
  {
    question: 'What time of day is best for a memorial cruise?',
    answer: 'Morning cruises often offer the calmest waters and a sense of quiet renewal. Sunset cruises provide a beautiful, symbolic end to the day and a peaceful atmosphere for reflection.'
  },
  {
    question: 'Is there a restroom available for our guests?',
    answer: 'Yes, all of our primary charter vessels are equipped with a clean, private marine restroom (head) to ensure the comfort of your guests throughout the service.'
  },
  {
    question: 'Can we bring food and refreshments for the gathering?',
    answer: 'Yes, we are BYOB and BYOF friendly. Many families bring light refreshments or a small meal to share while reminiscing. We provide tables and coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) (in Essentials/Ultimate packages).'
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
      pageRoute="/memorial-celebration-cruise"
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
