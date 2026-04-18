import EventPageTemplate from '@/components/EventPageTemplate';
import { Sparkles, Heart, Camera, Users, PartyPopper, Baby, Waves, Music, Shield, Star } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Epic Reveal Moment',
    description: 'Create a dramatic reveal with the stunning Lake Travis backdrop for the big announcement.'
  },
  {
    icon: Camera,
    title: 'Photo & Video Ready',
    description: 'Perfect lighting and views for capturing the priceless reactions on camera.'
  },
  {
    icon: PartyPopper,
    title: 'Celebration Space',
    description: 'Room for confetti, balloons, smoke bombs, or whatever creative reveal you have planned.'
  },
  {
    icon: Users,
    title: 'All Your Favorites',
    description: 'Invite family and friends to share in the exciting moment together.'
  },
  {
    icon: Heart,
    title: 'Memorable Experience',
    description: 'Give your announcement the unique setting it deserves - not just another backyard party.'
  },
  {
    icon: Baby,
    title: 'Stress-Free Planning',
    description: 'We handle the venue while you focus on the reveal and celebration.'
  },
  {
    icon: Waves,
    title: 'Scenic Backdrop',
    description: 'The rolling hills and blue waters of Lake Travis provide the ultimate reveal canvas.'
  },
  {
    icon: Music,
    title: 'Thematic Playlists',
    description: 'Sync your announcement with the perfect build-up music on our premium speakers.'
  },
  {
    icon: Shield,
    title: 'Safe Execution',
    description: 'Our captains ensure the boat is positioned perfectly for your reveal and guest safety.'
  },
  {
    icon: Star,
    title: 'Custom Props',
    description: 'Bring your custom reveal props, boxes, or cannons for a truly personalized event.'
  }
];

const faqs = [
  {
    question: 'What gender reveal methods work well on the boat?',
    answer: 'Confetti cannons, colored powder, balloon pops, and smoke bombs all work great on our boats! The open water provides a perfect backdrop and easy cleanup. We can even coordinate with the marina for balloon releases or special effects. Just discuss your plans with us beforehand.'
  },
  {
    question: 'Can we have confetti and balloons on the boat?',
    answer: 'Confetti and balloons are welcome! We ask that you use biodegradable confetti when possible out of respect for Lake Travis. Balloon releases should be done carefully - we recommend balloon garlands or pops rather than releasing balloons into the air.'
  },
  {
    question: 'How do we time the reveal for best photos?',
    answer: 'We recommend scheduling your reveal during golden hour (1-2 hours before sunset) for the best lighting. Our crew can help coordinate the timing so the reveal happens at the perfect moment with the sunset behind you. Photographers love the natural lighting on Lake Travis!'
  },
  {
    question: 'Can we keep the gender secret until the reveal on the boat?',
    answer: 'Absolutely! Many couples have a trusted friend, family member, or even us help coordinate the reveal so both parents are surprised. Just let us know your plan and we\'ll make sure everything is set up for the big moment without spoiling the surprise.'
  },
  {
    question: 'What is the best boat for a gender reveal party?',
    answer: 'For a small intimate reveal, Day Tripper (up to 14) is great. For a larger celebration with extended family, Meeseeks or The Irony (up to 30) or Clever Girl (up to 75) offer plenty of space for everyone to witness the big moment.'
  },
  {
    question: 'Can we bring pink and blue themed snacks and drinks?',
    answer: 'Yes! We are BYOB and BYOF. Many parents-to-be bring themed cupcakes, drinks, and snacks. We provide tables and coolers (BYO ice, or order pre-iced from Party On Delivery, our sister company) (in Essentials/Ultimate packages) to keep everything organized and chilled.'
  },
  {
    question: 'How long does a gender reveal cruise last?',
    answer: 'Our standard private charters are 3 hours. This gives you plenty of time to cruise to a beautiful spot, enjoy some music and snacks, do the big reveal, and celebrate on the way back to the marina.'
  },
  {
    question: 'Is there a restroom on the boat for our guests?',
    answer: 'Yes, all of our primary charter vessels are equipped with a clean, private marine restroom (head) for the comfort of your guests throughout the 3-hour cruise.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/private-cruises' },
  { label: 'Gender Reveal Cruises' }
];

export default function GenderRevealCruise() {
  return (
    <EventPageTemplate
      title="Gender Reveal Cruises"
      metaTitle="Gender Reveal Cruise Austin | Lake Travis Boat Party Celebration"
      metaDescription="Host an unforgettable gender reveal on Lake Travis. Private boat party with stunning views for your big announcement. Pink or blue - reveal in style!"
      pageRoute="/gender-reveal-cruise"
      heroTitle="Reveal in Style on Lake Travis"
      heroSubtitle="Make your gender reveal unforgettable with a stunning Lake Travis cruise featuring the perfect backdrop for your big pink or blue announcement."
      heroBadge="Gender Reveal Celebrations"
      heroIcon={Sparkles}
      heroImage="/attached_assets/party-atmosphere-3.jpg"
      introTitle="The Ultimate Gender Reveal Setting"
      introText="Pink or blue? Make your big announcement absolutely epic on Lake Travis! A gender reveal cruise gives you the stunning natural backdrop, the space for creative reveals, and the privacy to share this special moment with your closest family and friends. From confetti cannons to colored smoke, the open water provides the perfect canvas for your reveal and the reactions you'll treasure forever."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="purple"
      relatedCelebrationEventsSlug="/gender-reveal-cruise"
    />
  );
}
