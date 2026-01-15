import EventPageTemplate from '@/components/EventPageTemplate';
import { PartyPopper, Music, Waves, Users, Camera, Sparkles } from 'lucide-react';

const features = [
  {
    icon: PartyPopper,
    title: 'Ultimate Party Vibes',
    description: 'Our boats are designed for celebration with disco balls, premium sound, and the perfect party atmosphere.'
  },
  {
    icon: Music,
    title: 'Your Playlist, Your Party',
    description: 'Bluetooth-enabled sound systems let you DJ your own party with your favorite tracks all cruise long.'
  },
  {
    icon: Waves,
    title: 'Swim & Splash',
    description: 'Anchor in a beautiful cove for swimming, floating, and cooling off in Lake Travis\' crystal-clear waters.'
  },
  {
    icon: Users,
    title: 'Any Group Size',
    description: 'From intimate groups of 6 to large parties of 75, we have the perfect boat for your crew.'
  },
  {
    icon: Camera,
    title: 'Instagram-Worthy Moments',
    description: 'Stunning lake views, sunset backdrops, and party vibes create endless photo opportunities.'
  },
  {
    icon: Sparkles,
    title: 'Party Packages Available',
    description: 'Add floats, decorations, disco ball cups, and more with our Essentials and Ultimate packages.'
  }
];

const faqs = [
  {
    question: 'What makes an Austin boat party special?',
    answer: 'Austin boat parties on Lake Travis combine the natural beauty of Texas Hill Country with an incredible party atmosphere. Our boats feature premium sound systems, disco balls, and plenty of space to dance, swim, and celebrate with stunning lake views as your backdrop.'
  },
  {
    question: 'Can we play our own music at the boat party?',
    answer: 'Absolutely! All our boats have premium Bluetooth sound systems. Simply connect your phone and play your party playlist all cruise long. You\'re the DJ of your own party!'
  },
  {
    question: 'Is swimming included in the Austin boat party experience?',
    answer: 'Yes! We\'ll anchor in a beautiful cove where you can swim, float, and cool off in Lake Travis. Our Ultimate package includes a giant lily pad float and guest of honor float for even more water fun.'
  },
  {
    question: 'What should we bring to our Austin boat party?',
    answer: 'Bring your drinks (BYOB in cans/plastic), snacks, sunscreen, towels, and your party spirit! We provide the boat, captain, sound system, cooler space, and restrooms. Upgrade packages include ice, water, floats, and party supplies.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Austin Boat Party' }
];

export default function AustinBoatParty() {
  return (
    <EventPageTemplate
      title="Austin Boat Party"
      metaTitle="Austin Boat Party | Lake Travis Party Cruises | Premier Party Cruises"
      metaDescription="Throw the ultimate Austin boat party on Lake Travis! Premium party boats with sound systems, disco vibes, and swimming. BYOB friendly. Groups 6-75. Book your party cruise today!"
      heroTitle="The Ultimate Austin Boat Party Experience"
      heroSubtitle="Turn up the music, dive into Lake Travis, and celebrate under the Texas sun. Your unforgettable boat party starts here."
      heroBadge="Party on the Water"
      heroIcon={PartyPopper}
      videoId="4-Yx24Y6oro"
      heroImage="/attached_assets/party-atmosphere-1.jpg"
      introTitle="Austin's Best Boat Party Awaits"
      introText="Forget the ordinary. An Austin boat party on Lake Travis is the ultimate way to celebrate with friends. Picture this: your favorite music pumping through premium speakers, crystal-clear water for swimming, stunning Hill Country views, and your whole crew together for an epic day. That's what we deliver, every single cruise."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="pink"
    />
  );
}
