import EventPageTemplate from '@/components/EventPageTemplate';
import { GraduationCap, Shield, Camera, Music, Users, Star } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Prom-Perfect Setting',
    description: 'Create unforgettable prom memories with stunning Lake Travis views and a unique celebration venue.'
  },
  {
    icon: Shield,
    title: 'Safe & Supervised',
    description: 'Professional captains ensure a safe environment while students enjoy a memorable experience.'
  },
  {
    icon: Camera,
    title: 'Photo-Ready Moments',
    description: 'Lake Travis sunsets and beautiful scenery create the perfect backdrop for prom photos.'
  },
  {
    icon: Music,
    title: 'Premium Sound System',
    description: 'Bluetooth speakers let students play their favorite songs and dance the night away on the water.'
  },
  {
    icon: Users,
    title: 'Group Friendly',
    description: 'Perfect for friend groups, clubs, or school-organized events with boats accommodating 6-75 students.'
  },
  {
    icon: Star,
    title: 'Unique Experience',
    description: 'Stand out from traditional venues with a prom cruise your students will remember forever.'
  }
];

const faqs = [
  {
    question: 'Is a prom cruise safe for high school students?',
    answer: 'Absolutely! Safety is our top priority. Our licensed captains are experienced professionals, and our boats are fully equipped with safety gear. We maintain strict BYOB policies (no alcohol for underage guests), and our crew ensures a fun but safe environment for all students.'
  },
  {
    question: 'Can schools or parent groups book prom cruises?',
    answer: 'Yes! We work with schools, parent groups, and student organizations to plan memorable prom events. We can accommodate various group sizes and help coordinate logistics for school-approved events.'
  },
  {
    question: 'What should students wear on a prom cruise?',
    answer: 'Students can wear their prom attire! We recommend comfortable shoes for moving around the boat. Bring a change of clothes if planning to swim. The boat has both sun and shade areas, and we recommend sunscreen for daytime cruises.'
  },
  {
    question: 'How do prom cruise timing and logistics work?',
    answer: 'We offer flexible scheduling for prom events. Popular options include sunset cruises before or after dinner. Standard cruises are 3 hours. We\'ll coordinate meeting at the marina and can work with your event timeline. Photography time at the dock is included.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Prom Cruise' }
];

export default function PromCruise() {
  return (
    <EventPageTemplate
      title="Prom Cruise"
      metaTitle="Prom Cruise Austin | Lake Travis School Event Boat Rentals | Premier Party Cruises"
      metaDescription="Make prom unforgettable with a Lake Travis cruise! Safe, supervised party boats for student groups. Perfect for prom, homecoming, and school celebrations. Book your student event today!"
      heroTitle="A Prom They'll Never Forget"
      heroSubtitle="Skip the ordinary venue and celebrate prom on Lake Travis. Stunning sunsets, great music, and memories that last a lifetime."
      heroBadge="School Event Cruises"
      heroIcon={GraduationCap}
      heroImage="/attached_assets/party-atmosphere-3.jpg"
      introTitle="Elevate Your Prom Experience"
      introText="Prom should be extraordinary. Our Lake Travis prom cruises offer students a unique, memorable experience that stands out from traditional venues. With beautiful sunset views, premium sound systems for dancing, and stunning photo opportunities, a prom cruise creates the magical evening every student deserves."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="purple"
    />
  );
}
