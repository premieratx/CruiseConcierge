import EventPageTemplate from '@/components/EventPageTemplate';
import { Wine, Users, Utensils, Music, Camera, Heart, Clock, MapPin, Sparkles, Shield } from 'lucide-react';

const features = [
  {
    icon: Wine,
    title: 'Elegant Atmosphere',
    description: 'Toast to the happy couple in a sophisticated yet relaxed setting on beautiful Lake Travis.'
  },
  {
    icon: Users,
    title: 'Wedding Party Bonding',
    description: 'Perfect opportunity for both families and the wedding party to connect before the big day.'
  },
  {
    icon: Utensils,
    title: 'Catering Friendly',
    description: 'Bring your own catering or we can coordinate with local restaurants for seamless delivery.'
  },
  {
    icon: Music,
    title: 'Speech-Ready Sound',
    description: 'Premium sound system perfect for toasts, speeches, and creating the right ambiance.'
  },
  {
    icon: Camera,
    title: 'Photo Opportunities',
    description: 'Capture stunning group photos with the lake and Texas Hill Country as your backdrop.'
  },
  {
    icon: Heart,
    title: 'Stress-Free Evening',
    description: 'Let us handle the venue while you focus on celebrating with your loved ones.'
  },
  {
    icon: Clock,
    title: 'Sunset Timing',
    description: 'We time our rehearsal cruises to capture the absolute best golden hour views on the lake.'
  },
  {
    icon: MapPin,
    title: 'Prime Location',
    description: 'Depart from convenient Lake Travis marinas with easy access for all your wedding guests.'
  },
  {
    icon: Sparkles,
    title: 'Custom Decor',
    description: 'Personalize the boat with your wedding colors and floral arrangements for a cohesive look.'
  },
  {
    icon: Shield,
    title: 'Expert Captains',
    description: 'Our licensed, experienced captains ensure a smooth, safe, and professional experience for your VIPs.'
  }
];

const faqs = [
  {
    question: 'How many guests can attend a rehearsal dinner cruise?',
    answer: 'We can accommodate rehearsal dinners from intimate gatherings of 6-14 guests on our Day Tripper, 15-30 guests on Meeseeks/The Irony, or up to 75 guests on Clever Girl. Most rehearsal dinners book our medium or large boats to include both families and the wedding party.'
  },
  {
    question: 'Can we bring our own catering and drinks?',
    answer: 'Absolutely! We\'re BYOB and BYOF (bring your own food). Many couples work with Austin caterers who deliver to the marina, or you can bring prepared dishes. We provide coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company), tables for food service, and all the setup you need.'
  },
  {
    question: 'Is there enough space for toasts and speeches?',
    answer: 'Yes! Our boats have open deck areas perfect for gathering the group for toasts and speeches. The premium Bluetooth sound system ensures everyone can hear, and the sunset views provide a beautiful backdrop for these special moments.'
  },
  {
    question: 'What time should we schedule the rehearsal dinner cruise?',
    answer: 'Most rehearsal dinner cruises depart around 5-6 PM for a 3-hour cruise that captures the sunset. This allows time for boarding, cocktails, dinner service, toasts, and celebration as the sun sets over Lake Travis.'
  },
  {
    question: 'Can we decorate the boat for our rehearsal dinner?',
    answer: 'Yes, you are welcome to bring decorations! Many couples bring floral centerpieces, photos of the couple, and themed banners. We just ask that you avoid glitter or small confetti and use tape that won\'t damage the boat surface.'
  },
  {
    question: 'What happens if it rains on the day of our rehearsal?',
    answer: 'Our boats (Meeseeks, The Irony, and Clever Girl) have large covered areas that keep guests dry during passing showers. If the weather is severe or unsafe, our captains will make a call and we can discuss rescheduling or refund options according to our policy.'
  },
  {
    question: 'Do you provide plates, silverware, or napkins?',
    answer: 'Our Essentials and Ultimate packages include basic party supplies like cups and ice. For a rehearsal dinner, we recommend bringing your own high-quality disposable plates, silverware, and napkins to match your wedding theme.'
  },
  {
    question: 'Is there a restroom on the boat?',
    answer: 'Yes, all of our primary charter vessels are equipped with clean, private marine restrooms (heads) for the comfort of your guests throughout the 3-hour cruise.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/private-cruises' },
  { label: 'Rehearsal Dinner Cruises' }
];

export default function RehearsalDinnerCruise() {
  return (
    <EventPageTemplate
      title="Rehearsal Dinner Cruises"
      metaTitle="Rehearsal Dinner Cruise Austin | Lake Travis Wedding Party Boat"
      metaDescription="Host your rehearsal dinner on Lake Travis. Unique venue for wedding party celebrations with catering, toasts, and stunning sunset views. Book your cruise!"
      pageRoute="/rehearsal-dinner-cruise"
      heroTitle="Rehearsal Dinner on the Water"
      heroSubtitle="Celebrate the night before your wedding with an unforgettable Lake Travis cruise featuring stunning sunsets, delicious food, and quality time with your wedding party."
      heroBadge="Wedding Celebrations"
      heroIcon={Wine}
      heroImage="/attached_assets/clever-girl-4-wedding-venue.jpg"
      localVideo="/attached_assets/Wedding_Walkthrough_Video_1774071375807.mp4"
      introTitle="The Perfect Pre-Wedding Celebration"
      introText="Skip the traditional restaurant and give your wedding party an experience they'll never forget. A Lake Travis rehearsal dinner cruise brings together both families in a relaxed, beautiful setting. Watch the sunset paint the Texas Hill Country in golden hues while toasting to the happy couple. Our experienced crew handles all the details so you can focus on celebrating this special milestone."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="pink"
    />
  );
}
