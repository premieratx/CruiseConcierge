import EventPageTemplate from '@/components/EventPageTemplate';
import { Users, Camera, Waves, Music, Shield, PartyPopper, Heart, Ship, Utensils, Star } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Generations Together',
    description: 'Bring the whole family together for quality time on beautiful Lake Travis waters.'
  },
  {
    icon: Camera,
    title: 'Family Photo Op',
    description: 'Stunning lake backdrop creates perfect settings for those treasured family portraits.'
  },
  {
    icon: Waves,
    title: 'Swimming & Fun',
    description: 'Kids and adults alike can swim, float, and play in the warm Lake Travis waters.'
  },
  {
    icon: Music,
    title: 'Family Playlist',
    description: 'Bluetooth sound system for everyone\'s favorite songs from every generation.'
  },
  {
    icon: Shield,
    title: 'Safe for All Ages',
    description: 'Licensed captains and safety equipment ensure every family member is protected.'
  },
  {
    icon: PartyPopper,
    title: 'Celebration Ready',
    description: 'Perfect for combining reunions with birthdays, anniversaries, or other milestones.'
  },
  {
    icon: Heart,
    title: 'Stress-Free Bonding',
    description: 'Our crew handles the navigation so you can focus on connecting with your relatives.'
  },
  {
    icon: Ship,
    title: 'Vessels for All Sizes',
    description: 'From intimate groups of 14 to massive reunions of 75, we have the right boat for you.'
  },
  {
    icon: Utensils,
    title: 'Picnic Perfect',
    description: 'Spacious decks and tables make it easy to host a family-style meal on the water.'
  },
  {
    icon: Star,
    title: 'Custom Memories',
    description: 'Personalize your reunion with themed decorations and activities for all ages.'
  }
];

const faqs = [
  {
    question: 'Are your boats safe for children?',
    answer: 'Absolutely! Safety is our top priority. We have life jackets for all ages, including children\'s sizes. Our licensed captains are experienced with family groups and ensure everyone stays safe while having fun.'
  },
  {
    question: 'Can we bring food for a family picnic on the boat?',
    answer: 'Yes! We encourage families to bring their own food and snacks. Our Essentials and Ultimate packages include coolers with ice, a folding table, and serving supplies. You can also coordinate catering delivery to the marina.'
  },
  {
    question: 'How many family members can fit on your largest boat?',
    answer: 'Our largest boat, Clever Girl, accommodates up to 75 guests - perfect for large family reunions. For smaller gatherings, Meeseeks/The Irony holds 15-30 guests, and Day Tripper is great for intimate groups up to 14.'
  },
  {
    question: 'Is the boat accessible for elderly family members?',
    answer: 'Our boats have comfortable seating areas with both sun and shade. While boarding does require stepping onto the boat, our crew assists all passengers. Please let us know in advance if any family members have mobility concerns so we can prepare accordingly.'
  },
  {
    question: 'What activities do you recommend for large family groups?',
    answer: 'Swimming is always a hit! With our Ultimate package, the giant lily pad float provides hours of fun for kids and adults. We also recommend playing family-friendly music, taking group photos during sunset, and having a dedicated time for family announcements or stories.'
  },
  {
    question: 'Can we combine a family reunion with a birthday or anniversary celebration?',
    answer: 'Definitely! Many families use their reunion cruise to honor a special milestone. You can bring a cake, decorations, and even coordinate a surprise for the guest of honor with our crew.'
  },
  {
    question: 'Do you have a restroom on board for the family?',
    answer: 'Yes, all of our primary charter vessels are equipped with a clean, private marine restroom (head) for the comfort and convenience of all family members throughout the cruise.'
  },
  {
    question: 'Is there shade available on the boat for sensitive family members?',
    answer: 'Yes! Each of our boats features significant covered areas that provide shade from the Texas sun, allowing family members to stay cool and comfortable while still enjoying the lake views.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Celebrations', href: '/celebrations' },
  { label: 'Family Reunion Cruise' }
];

export default function FamilyReunionCruise() {
  return (
    <EventPageTemplate
      title="Family Reunion Cruise"
      metaTitle="Family Reunion Cruise Lake Travis | Austin TX Party Boat"
      metaDescription="Host your family reunion on Lake Travis with a private party boat. All ages welcome, swimming, photos, and quality family time. Book your Austin family gathering today!"
      pageRoute="/family-reunion-cruise"
      heroTitle="Family Reunion Cruises on Lake Travis"
      heroSubtitle="Bring generations together for an unforgettable day of fun and connection on Austin's beautiful lake"
      heroBadge="Family Celebrations"
      heroIcon={Users}
      heroImage="/attached_assets/party-atmosphere-3.jpg"
      introTitle="Quality Family Time on the Water"
      introText="Skip the backyard BBQ and create memories your family will talk about for years. A private Lake Travis cruise brings everyone together - from grandparents to grandkids - for swimming, photos, great food, and the kind of quality time that's hard to find anywhere else. Make your next family reunion truly unforgettable."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="green"
    />
  );
}
