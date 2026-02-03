import EventPageTemplate from '@/components/EventPageTemplate';
import { Sparkles, Heart, Camera, Users, PartyPopper, Baby } from 'lucide-react';

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
