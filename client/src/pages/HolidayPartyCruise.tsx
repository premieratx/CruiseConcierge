import EventPageTemplate from '@/components/EventPageTemplate';
import { Snowflake, Gift, Star, Users, Music, Sparkles } from 'lucide-react';

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
    />
  );
}
