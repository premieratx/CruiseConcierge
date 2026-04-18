import EventPageTemplate from '@/components/EventPageTemplate';
import { GraduationCap, Shield, Camera, Music, Users, Star, Clock, Ship, Check, Heart } from 'lucide-react';

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
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Book your pre-prom sunset cruise or post-prom celebration to fit your school\'s schedule.'
  },
  {
    icon: Ship,
    title: 'Modern Fleet',
    description: 'Our well-maintained boats provide a stylish and comfortable setting for high school celebrations.'
  },
  {
    icon: Check,
    title: 'Easy Coordination',
    description: 'We work directly with parent groups and schools to ensure all logistics are handled professionally.'
  },
  {
    icon: Heart,
    title: 'Unforgettable Memories',
    description: 'Give students a high-school milestone they\'ll cherish for years to come.'
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
  },
  {
    question: 'What is the minimum age for a BYOB cruise?',
    answer: 'For groups where alcohol is present, all guests must be 21+ with a valid ID. For school-organized events or prom cruises where alcohol is not permitted, we welcome high school students. We have a zero-tolerance policy for underage drinking.'
  },
  {
    question: 'Are chaperones required for prom cruises?',
    answer: 'For student groups under 18, we require at least one adult chaperone (21+) per boat. Chaperones are responsible for the behavior of the group, while our captain and crew focus on the safe operation of the vessel.'
  },
  {
    question: 'Can we bring our own food and snacks?',
    answer: 'Yes! We are BYOF (Bring Your Own Food) friendly. Students often bring pizza, snacks, and soda. Our Essentials and Ultimate packages include coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) to keep your beverages cold throughout the cruise.'
  },
  {
    question: 'What happens if we have more than 75 students?',
    answer: 'Our flagship boat, Clever Girl, has a maximum capacity of 75 guests. If your group is larger, we can coordinate multiple boats (like Meeseeks and The Irony) to depart together, accommodating up to 135+ guests across our fleet.'
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
      pageRoute="/prom-cruise"
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
