import EventPageTemplate from '@/components/EventPageTemplate';
import { Cake, Gift, Music, Camera, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Cake,
    title: 'Birthday-Ready Setup',
    description: 'Our boats come equipped with party vibes perfect for celebrating another year of life on Lake Travis.'
  },
  {
    icon: Gift,
    title: 'Surprise Party Friendly',
    description: 'We help coordinate surprise birthday parties with discreet boarding and reveal moments.'
  },
  {
    icon: Music,
    title: 'Your Birthday Playlist',
    description: 'Premium Bluetooth sound system so you can play all the birthday hits and favorite songs.'
  },
  {
    icon: Camera,
    title: 'Instagram-Worthy Moments',
    description: 'Stunning Lake Travis backdrops make every birthday photo absolutely perfect.'
  },
  {
    icon: Users,
    title: 'Groups of All Sizes',
    description: 'From intimate gatherings of 6 to big bashes of 75, we have the perfect boat for your party.'
  },
  {
    icon: Shield,
    title: 'Safe Celebration',
    description: 'Licensed captains ensure everyone celebrates safely while having the time of their lives.'
  }
];

const faqs = [
  {
    question: 'Can we bring a birthday cake on the boat?',
    answer: 'Absolutely! We recommend cupcakes or sheet cakes that are easy to serve. Our Essentials and Ultimate packages include plates, utensils, and a folding table for cake cutting.'
  },
  {
    question: 'Do you provide birthday decorations?',
    answer: 'While we don\'t provide decorations, you\'re welcome to bring balloons, banners, and party supplies. Our Ultimate package includes disco ball cups and festive accessories to enhance the party atmosphere.'
  },
  {
    question: 'What ages are birthday parties suitable for?',
    answer: 'We welcome birthday celebrations for all ages! From kids\' parties to milestone birthdays like 21st, 30th, 40th, 50th and beyond. The BYOB policy applies only to guests 21+.'
  },
  {
    question: 'How far in advance should we book for a birthday party?',
    answer: 'We recommend booking 2-4 weeks in advance, especially for weekend dates and during peak season (May-September). Popular dates like holiday weekends fill up quickly.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Celebrations', href: '/celebrations' },
  { label: 'Birthday Party Boat Rental' }
];

export default function BirthdayPartyBoatRental() {
  return (
    <EventPageTemplate
      title="Birthday Party Boat Rental"
      metaTitle="Birthday Party Boat Rental Lake Travis | Austin TX Party Cruises"
      metaDescription="Celebrate your birthday on Lake Travis with a private party boat rental in Austin. Perfect for milestone birthdays, surprise parties, and unforgettable celebrations. Book today!"
      heroTitle="Birthday Party Boat Rentals on Lake Travis"
      heroSubtitle="Make your special day unforgettable with a private birthday cruise on Austin's most beautiful lake"
      heroBadge="Birthday Celebrations"
      heroIcon={Cake}
      heroImage="/attached_assets/party-atmosphere-1.jpg"
      introTitle="The Ultimate Birthday Party Experience"
      introText="Forget the crowded restaurants and boring party venues. Celebrate your birthday on a private boat cruising Lake Travis with stunning views, your favorite music, and all your friends. From intimate gatherings to large celebrations, we make every birthday legendary."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="purple"
      relatedCelebrationEventsSlug="/birthday-party-boat-rental"
    />
  );
}
