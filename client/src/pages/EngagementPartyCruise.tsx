import EventPageTemplate from '@/components/EventPageTemplate';
import { Heart, Users, Wine, Music, Camera, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Celebrate Your Love',
    description: 'Share your exciting news with friends and family in a stunning lakeside setting.'
  },
  {
    icon: Users,
    title: 'Bring Everyone Together',
    description: 'Perfect opportunity for both families to meet and celebrate your engagement.'
  },
  {
    icon: Wine,
    title: 'Toast-Worthy Setting',
    description: 'Raise a glass to your future with Lake Travis sunsets as your backdrop.'
  },
  {
    icon: Music,
    title: 'Party Atmosphere',
    description: 'Dance, mingle, and celebrate with your premium Bluetooth sound system.'
  },
  {
    icon: Camera,
    title: 'Show Off the Ring',
    description: 'Capture stunning photos and videos of the happy couple and all your guests.'
  },
  {
    icon: Sparkles,
    title: 'Unique Experience',
    description: 'Give your guests a celebration they\'ll remember - not just another cocktail party.'
  }
];

const faqs = [
  {
    question: 'How many guests can we invite to an engagement party cruise?',
    answer: 'We can accommodate engagement parties from 6 to 75 guests depending on the boat you choose. Day Tripper fits up to 14, Meeseeks/The Irony handles 15-30 guests, and Clever Girl can host up to 75 guests. Most engagement parties fall in the 20-50 guest range.'
  },
  {
    question: 'Can we bring our own champagne and appetizers?',
    answer: 'Absolutely! We\'re completely BYOB and BYOF. Many couples bring champagne for toasts, appetizers, and celebration treats. We provide coolers with ice and tables for food service. You can also coordinate catering delivery to the marina.'
  },
  {
    question: 'What makes a boat engagement party special?',
    answer: 'An engagement party cruise offers something no venue can match - stunning natural beauty, privacy, and an experience your guests won\'t forget. The intimacy of being on the water together creates meaningful connections between families meeting for the first time.'
  },
  {
    question: 'What time of year is best for an engagement party cruise?',
    answer: 'Lake Travis is beautiful year-round! Spring and fall offer mild temperatures and gorgeous colors. Summer is perfect if you want guests to swim and cool off. Winter evenings can be magical with lighter crowds. Sunset cruises are popular any season.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/private-cruises' },
  { label: 'Engagement Party Cruises' }
];

export default function EngagementPartyCruise() {
  return (
    <EventPageTemplate
      title="Engagement Party Cruises"
      metaTitle="Engagement Party Cruise Austin | Lake Travis Celebration Boat"
      metaDescription="Celebrate your engagement on Lake Travis! Private boat party for the newly engaged couple and guests. Champagne, sunset views, and unforgettable memories."
      heroTitle="Celebrate Your Engagement"
      heroSubtitle="Announce your love and celebrate with friends and family on a stunning Lake Travis cruise featuring champagne toasts, beautiful sunsets, and joyful moments."
      heroBadge="Engagement Celebrations"
      heroIcon={Heart}
      videoId="4-Yx24Y6oro"
      heroImage="/attached_assets/party-atmosphere-1.jpg"
      introTitle="Share Your Joy on the Water"
      introText="You said yes - now it's time to celebrate! An engagement party cruise on Lake Travis brings together your favorite people in a spectacular setting. Watch your families bond, toast to your future together, and dance under the Texas sky. Our experienced crew takes care of everything so you can focus on basking in the excitement of your engagement."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="pink"
    />
  );
}
