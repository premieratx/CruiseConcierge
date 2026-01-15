import EventPageTemplate from '@/components/EventPageTemplate';
import { Briefcase, Award, Users, Sunset, Wine, Star } from 'lucide-react';

const features = [
  {
    icon: Briefcase,
    title: 'Career Celebration',
    description: 'Honor decades of hard work and dedication with a retirement party on beautiful Lake Travis.'
  },
  {
    icon: Award,
    title: 'Recognition Deserved',
    description: 'Create a celebration that truly honors their contributions and career achievements.'
  },
  {
    icon: Users,
    title: 'Colleagues & Family',
    description: 'Bring together coworkers, friends, and family for a memorable sendoff celebration.'
  },
  {
    icon: Sunset,
    title: 'Into the Sunset',
    description: 'Symbolic sunset cruise as they sail into this exciting new chapter of life.'
  },
  {
    icon: Wine,
    title: 'Toast to Success',
    description: 'BYOB friendly so you can toast to their accomplishments with their favorite drinks.'
  },
  {
    icon: Star,
    title: 'VIP Treatment',
    description: 'Make the guest of honor feel special with our premium cruise packages.'
  }
];

const faqs = [
  {
    question: 'Can we host a company retirement party on your boats?',
    answer: 'Absolutely! Our boats are perfect for corporate retirement celebrations. We can accommodate groups from 6-75 guests. Many companies choose our Clever Girl for larger team celebrations.'
  },
  {
    question: 'What time is best for a retirement party cruise?',
    answer: 'Sunset cruises are especially popular for retirement parties - there\'s something poetic about sailing into the sunset as they begin their next chapter. We recommend the 5-8 PM slot during summer.'
  },
  {
    question: 'Can we bring food and drinks for the party?',
    answer: 'Yes! We\'re BYOB friendly and you can bring your own catering. Our Essentials package includes a folding table, coolers with ice, and cups. We can also help coordinate delivery from local caterers.'
  },
  {
    question: 'Do you allow speeches and presentations?',
    answer: 'Of course! Our Bluetooth sound system can be used for speeches, and we can create quiet moments during the cruise for special presentations, awards, or memory sharing.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Celebrations', href: '/celebrations' },
  { label: 'Retirement Party Cruise' }
];

export default function RetirementPartyCruise() {
  return (
    <EventPageTemplate
      title="Retirement Party Cruise"
      metaTitle="Retirement Party Cruise Lake Travis | Austin TX Celebration"
      metaDescription="Celebrate retirement with a private party cruise on Lake Travis. Perfect for corporate sendoffs and personal celebrations. Book an unforgettable Austin retirement party!"
      heroTitle="Retirement Party Cruises on Lake Travis"
      heroSubtitle="Honor a career of dedication with an unforgettable celebration on Austin's beautiful lake"
      heroBadge="Retirement Celebrations"
      heroIcon={Briefcase}
      videoId="4-Yx24Y6oro"
      heroImage="/attached_assets/party-atmosphere-1.jpg"
      introTitle="They've Earned This Celebration"
      introText="After years of early mornings, late nights, and countless contributions, retirement deserves more than a cake in the break room. Celebrate their career with a private Lake Travis cruise where colleagues, friends, and family can properly honor their achievements and toast to the adventures ahead."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="green"
    />
  );
}
