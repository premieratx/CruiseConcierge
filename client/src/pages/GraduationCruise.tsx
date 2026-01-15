import EventPageTemplate from '@/components/EventPageTemplate';
import { GraduationCap, Trophy, Users, Music, Camera, PartyPopper } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Celebrate Achievement',
    description: 'Honor years of hard work with a graduation party your grad will never forget on Lake Travis.'
  },
  {
    icon: Trophy,
    title: 'Recognition Worthy',
    description: 'Create a celebration that matches the magnitude of their accomplishment.'
  },
  {
    icon: Users,
    title: 'Bring Everyone Together',
    description: 'Room for family, friends, and classmates to celebrate together on our spacious boats.'
  },
  {
    icon: Music,
    title: 'Party Your Way',
    description: 'Bluetooth sound system lets the graduate play their favorite playlist all cruise long.'
  },
  {
    icon: Camera,
    title: 'Graduation Photos',
    description: 'Capture memories with cap and gown photos against Lake Travis\'s stunning backdrop.'
  },
  {
    icon: PartyPopper,
    title: 'Ultimate Send-Off',
    description: 'Perfect way to celebrate before they head off to their next adventure.'
  }
];

const faqs = [
  {
    question: 'What age groups do you host for graduation parties?',
    answer: 'We host graduation celebrations for all levels - high school, college, graduate school, and professional programs. Our boats accommodate groups from 6-75 guests.'
  },
  {
    question: 'Can graduates bring their cap and gown for photos?',
    answer: 'Absolutely! Many graduates bring their cap and gown for photos on the boat. Lake Travis provides a stunning backdrop that makes for incredible graduation photos.'
  },
  {
    question: 'Is alcohol allowed at graduation parties?',
    answer: 'Yes, for guests 21 and over. We\'re BYOB friendly (cans and plastic only). For high school graduations, we ensure all beverage policies are followed appropriately.'
  },
  {
    question: 'How many guests can we bring to a graduation party?',
    answer: 'Our boats accommodate different group sizes: Day Tripper (up to 14 guests), Meeseeks/The Irony (15-30 guests), and Clever Girl (31-75 guests). Choose based on your guest list.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Celebrations', href: '/celebrations' },
  { label: 'Graduation Cruise' }
];

export default function GraduationCruise() {
  return (
    <EventPageTemplate
      title="Graduation Cruise"
      metaTitle="Graduation Party Cruise Lake Travis | Austin TX Celebration"
      metaDescription="Celebrate graduation with a private party cruise on Lake Travis. Perfect for high school, college, and grad school celebrations. Book an unforgettable Austin graduation party!"
      heroTitle="Graduation Party Cruises on Lake Travis"
      heroSubtitle="Celebrate their achievement with an unforgettable graduation party on Austin's most beautiful lake"
      heroBadge="Graduation Celebrations"
      heroIcon={GraduationCap}
      videoId="4-Yx24Y6oro"
      heroImage="/attached_assets/party-atmosphere-3.jpg"
      introTitle="They Earned an Epic Celebration"
      introText="After years of hard work, late nights studying, and countless exams, your graduate deserves a celebration that matches their achievement. A private Lake Travis cruise is the perfect way to honor their success before they embark on their next adventure."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="blue"
    />
  );
}
