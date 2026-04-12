import EventPageTemplate from '@/components/EventPageTemplate';
import { Gift, Sparkles, Camera, Music, Heart, Crown, Users, Utensils, Waves, Star } from 'lucide-react';

const features = [
  {
    icon: Crown,
    title: 'Bride-to-Be Treatment',
    description: 'Make the bride feel like royalty with our special guest of honor float and VIP touches.'
  },
  {
    icon: Gift,
    title: 'Gift Opening Space',
    description: 'Plenty of room for gifts, games, and all the bridal shower activities you have planned.'
  },
  {
    icon: Sparkles,
    title: 'Instagrammable Everything',
    description: 'Stunning backdrops for photos that will look amazing in the wedding album and social media.'
  },
  {
    icon: Music,
    title: 'Curated Vibes',
    description: 'Play your carefully curated playlist on our premium Bluetooth sound system.'
  },
  {
    icon: Camera,
    title: 'Photo Perfect',
    description: 'Golden hour lighting and lake views create the perfect setting for group photos.'
  },
  {
    icon: Heart,
    title: 'Memorable Experience',
    description: 'Give the bride an experience she\'ll remember forever, not just another restaurant party.'
  },
  {
    icon: Users,
    title: 'Bachelorette Bonding',
    description: 'The perfect pre-wedding event for the bridal party to connect and celebrate together.'
  },
  {
    icon: Utensils,
    title: 'Brunch on the Water',
    description: 'Bring your favorite brunch spreads, mimosas, and treats to enjoy while cruising.'
  },
  {
    icon: Waves,
    title: 'Relaxing Escape',
    description: 'A calm and peaceful alternative to the stress of wedding planning for the bride.'
  },
  {
    icon: Star,
    title: 'Custom Themes',
    description: 'Whether it\'s "Last Sail Before the Veil" or a classic floral theme, our boats are your canvas.'
  }
];

const faqs = [
  {
    question: 'What bridal shower activities work well on the boat?',
    answer: 'Gift opening, bridal games, champagne toasts, and photo sessions all work wonderfully on our boats. Many groups also enjoy swimming and using the floats. We have tables for games and plenty of seating for socializing and opening gifts.'
  },
  {
    question: 'Can we decorate the boat for the bridal shower?',
    answer: 'Yes! You can bring decorations to personalize the space - banners, balloons, photo props, and tablecloths are all welcome. Our Ultimate Package includes disco ball cups and party supplies. Just let us know your plans and we\'ll help coordinate.'
  },
  {
    question: 'What\'s the best package for a bridal shower?',
    answer: 'Our Essentials or Ultimate packages are most popular for bridal showers. The Ultimate Package includes the guest of honor float (perfect for the bride!), champagne flutes, and full party setup. The Essentials Package is great if you want to bring your own special touches.'
  },
  {
    question: 'How far in advance should we book for a bridal shower cruise?',
    answer: 'We recommend booking 4-8 weeks in advance, especially for weekend dates during peak season (April-October). Popular Saturday afternoons fill up quickly, so the earlier you book, the better your chances of getting your preferred date and time.'
  },
  {
    question: 'Are there age restrictions for bridal shower guests?',
    answer: 'No, all ages are welcome on our private cruises! If you are planning a BYOB celebration with alcohol, we just require that all guests consuming alcohol are 21+ with valid ID. We have life jackets for children and infants as well.'
  },
  {
    question: 'Can we do a themed bridal shower on the boat?',
    answer: 'Absolutely! Common themes include "Last Sail Before the Veil," "Nautical Bride," or "Final Fiesta." You can bring matching swimwear, custom shirts, and themed decorations to make the day even more special.'
  },
  {
    question: 'Do you provide a place to keep food and drinks cold?',
    answer: 'Yes, all our boats come equipped with large coolers. If you choose the Essentials or Ultimate package, we provide the ice as well. You just need to bring your favorite beverages and snacks!'
  },
  {
    question: 'How many people can we bring for a bridal shower?',
    answer: 'We have boat options for every group size. Day Tripper is perfect for up to 14 guests, Meeseeks or The Irony can handle up to 30, and our flagship Clever Girl can host up to 75 guests for a large bridal celebration.'
  }
];

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/private-cruises' },
  { label: 'Bridal Shower Cruises' }
];

export default function BridalShowerCruise() {
  return (
    <EventPageTemplate
      title="Bridal Shower Cruises"
      metaTitle="Bridal Shower Cruise Austin | Lake Travis Boat Party for Bride"
      metaDescription="Throw the perfect bridal shower on Lake Travis. Private boat party with champagne, games, gifts, and stunning views. Make the bride-to-be feel special!"
      pageRoute="/bridal-shower-cruise"
      heroTitle="Celebrate the Bride-to-Be"
      heroSubtitle="Give the bride an unforgettable bridal shower on Lake Travis with champagne toasts, stunning views, and quality time with her favorite ladies."
      heroBadge="Bridal Celebrations"
      heroIcon={Gift}
      heroImage="/attached_assets/clever-girl-8-wedding-reception.jpg"
      localVideo="/attached_assets/Wedding_Walkthrough_Video_1774071375807.mp4"
      introTitle="A Bridal Shower She'll Never Forget"
      introText="Forget the traditional living room bridal shower - treat the bride-to-be to an experience she'll cherish forever. A Lake Travis bridal shower cruise combines the elegance of a celebration with the adventure of being on the water. Open gifts with the Texas Hill Country as your backdrop, play games on the open deck, and toast to love as the sun sets over the lake."
      features={features}
      faqs={faqs}
      breadcrumbItems={breadcrumbItems}
      accentColor="pink"
    />
  );
}
