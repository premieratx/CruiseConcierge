import EventPageTemplate from '@/components/EventPageTemplate';
import { Snowflake, Gift, Star, Users, Music, Sparkles, Clock, Ship, Check, Calendar } from 'lucide-react';

const features = [
  {
    icon: Snowflake,
    title: 'Holiday Magic on the Water',
    description: 'Celebrate Christmas, New Year\'s Eve, and every holiday with stunning Lake Travis views.'
  },
  {
    icon: Gift,
    title: 'Corporate Holiday Parties',
    description: 'Impress your team with a unique holiday celebration they\'ll talk about all year long.'
  },
  {
    icon: Star,
    title: 'New Year\'s Eve Special',
    description: 'Ring in the new year on Lake Travis—the most memorable way to celebrate in Austin.'
  },
  {
    icon: Users,
    title: 'Groups of All Sizes',
    description: 'From intimate family gatherings to company-wide parties, we have boats for 6-75 guests.'
  },
  {
    icon: Music,
    title: 'Festive Atmosphere',
    description: 'Premium sound systems for holiday playlists, plus space for dancing and celebration.'
  },
  {
    icon: Sparkles,
    title: 'Party Packages',
    description: 'Add festive touches with our Ultimate package including decorations, floats, and party supplies.'
  },
  {
    icon: Clock,
    title: 'Flexible Booking',
    description: 'Choose from morning, afternoon, or evening cruises to fit your holiday schedule.'
  },
  {
    icon: Ship,
    title: 'Fleet Variety',
    description: 'Our diverse fleet means we have the perfect boat for any size holiday gathering.'
  },
  {
    icon: Check,
    title: 'Professional Service',
    description: 'Over 15 years of experience ensuring your holiday party runs smoothly and safely.'
  },
  {
    icon: Calendar,
    title: 'Seasonal Themes',
    description: 'Celebrate any holiday throughout the year, from Halloween to Independence Day.'
  }
];

const faqs = [
  {
    question: 'Do you offer holiday party cruises for Christmas and New Year\'s Eve?',
    answer: 'Yes! Our holiday party cruises are perfect for Christmas celebrations, New Year\'s Eve parties, and other holiday gatherings. Lake Travis provides a unique and memorable setting for your seasonal celebrations. Book early as holiday dates fill up quickly!'
  },
  {
    question: 'Are holiday party cruises good for corporate events?',
    answer: 'Absolutely! Many companies choose our holiday party cruises for their annual celebrations. It\'s a unique alternative to traditional venues that impresses employees and clients alike. Our larger boats accommodate up to 75 guests for company parties.'
  },
  {
    question: 'What\'s the weather like for winter holiday cruises in Austin?',
    answer: 'Austin winters are generally mild, making Lake Travis cruises enjoyable year-round. December and January temperatures typically range from 40-60°F. Our boats have covered areas for comfort, and we recommend layers. We monitor weather closely and communicate any concerns.'
  },
  {
    question: 'Can we bring holiday decorations on the boat?',
    answer: 'Yes! You\'re welcome to bring holiday decorations to personalize your celebration. We recommend easy-to-manage items like garlands, lights (battery-powered), festive banners, and themed tableware. Our crew can help you set up before guests arrive.'
  },
  {
    question: 'How far in advance should we book for a December holiday party?',
    answer: 'December is one of our busiest months for corporate and private events. We recommend booking 2-4 months in advance for prime weekend and evening slots to ensure you get your preferred boat and date.'
  },
  {
    question: 'What is your capacity for holiday events?',
    answer: 'We can host groups from as small as 6 on our Day Tripper (up to 14) to as large as 75 on our flagship Clever Girl. If you have a very large group, we can even coordinate multiple boats departing together.'
  },
  {
    question: 'Can we have a themed holiday party like a "Tropical Christmas"?',
    answer: 'Absolutely! Lake Travis is the perfect spot for a "Mele Kalikimaka" or Tropical-themed holiday party. We encourage you to bring themed props, music, and even catering to match your vision.'
  },
  {
    question: 'Is there a restroom on the boat for our holiday guests?',
    answer: 'Yes, all of our primary charter vessels are equipped with a clean, private marine restroom (head) for the comfort and convenience of all your guests throughout the party.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Holiday Party Cruise' }
];

export default function HolidayPartyCruise() {
  return (
    <EventPageTemplate
      title="Holiday Party Cruise"
      metaTitle="Holiday Party Cruise Austin | Christmas & New Year's Eve Boat Rentals | Premier Party Cruises"
      metaDescription="Celebrate the holidays on Lake Travis! Book a Christmas party cruise or New Year's Eve celebration. Perfect for corporate events and private parties. Groups 6-75 guests."
      pageRoute="/holiday-party-cruise"
      heroTitle="Celebrate the Holidays on Lake Travis"
      heroSubtitle="Christmas parties, New Year's Eve celebrations, and festive gatherings—make this holiday season unforgettable with a cruise."
      heroBadge="Holiday Celebrations"
      heroIcon={Snowflake}
      heroImage="/attached_assets/party-atmosphere-1.jpg"
      introTitle="The Most Wonderful Time for a Cruise"
      introText="This holiday season, skip the same old venues and celebrate on Lake Travis. Our holiday party cruises offer a unique, memorable experience for Christmas parties, New Year's Eve celebrations, and every festive gathering in between. Whether it's a corporate event or a family celebration, we make the holidays magical on the water."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="yellow"
      relatedCelebrationEventsSlug="/holiday-party-cruise"
    />
  );
}
