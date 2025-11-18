import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, Calendar, Users, Sparkles, Music, 
  UtensilsCrossed, Wine, Package, Car, Mail, PartyPopper 
} from 'lucide-react';
import { useLocation } from 'wouter';

interface ChecklistItem {
  icon: any;
  title: string;
  description: string;
  highlight?: string;
}

interface PartyPlanningChecklistProps {
  partyType?: string;
  eventType?: string;
  customItems?: ChecklistItem[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function PartyPlanningChecklist({ 
  partyType = 'Party Boat Experience', 
  eventType = 'party',
  customItems 
}: PartyPlanningChecklistProps) {
  const [, navigate] = useLocation();

  const defaultChecklistItems: ChecklistItem[] = [
    {
      icon: Calendar,
      title: 'Set Your Date & Choose the Perfect Time',
      description: 'Select your ideal date and time slot. Our online booking shows real-time availability so you can lock in your perfect cruise time instantly.',
      highlight: 'Real-time availability calendar'
    },
    {
      icon: Users,
      title: 'Determine Your Guest Count & Boat Size',
      description: 'Count your guests and we\'ll match you with the perfect boat. From intimate 14-person vessels to our spacious 50-person party boats, we have the right size for every celebration.',
      highlight: 'Expert boat matching'
    },
    {
      icon: Sparkles,
      title: 'Choose Your Package Level',
      description: 'Pick from our three package tiers: Standard ($200/hr), Essentials ($225/hr), or Ultimate ($250/hr). Each level includes more amenities and convenience to match your style and budget.',
      highlight: 'Transparent pricing, no hidden fees'
    },
    {
      icon: Music,
      title: 'Plan Your Soundtrack',
      description: 'Create your perfect playlist on our premium Bluetooth sound system, or let us arrange a professional DJ for your event. We can coordinate everything!',
      highlight: 'DJ coordination available'
    },
    {
      icon: UtensilsCrossed,
      title: 'Plan Your Food',
      description: 'Bring your own picnic, snacks, or order from your favorite Austin restaurant. Many groups pick up food on the way to the marina or have it delivered.',
      highlight: 'Tables & coolers provided'
    },
    {
      icon: Wine,
      title: 'Plan Your Beverages',
      description: 'BYOB and use our coolers with ice, or arrange alcohol delivery directly to the boat through our delivery partners. We make it easy either way!',
      highlight: 'Direct-to-boat delivery available'
    },
    {
      icon: Package,
      title: 'DIY or All-Inclusive? You Choose!',
      description: 'Want total control? Go DIY with our Standard package. Prefer convenience? Our Ultimate All-Inclusive package includes decorations, floats, party supplies, and setup - we handle everything!',
      highlight: 'All-inclusive options eliminate stress'
    },
    {
      icon: Car,
      title: 'Arrange Transportation to the Marina',
      description: 'Need a ride? We can coordinate round-trip transportation from your Austin hotel or Airbnb directly to the marina. Show up relaxed, not stressed!',
      highlight: 'Transportation coordination available'
    },
    {
      icon: Mail,
      title: 'Send Invitations & Build Excitement',
      description: 'Share your cruise details with guests! We provide all the info you need including marina directions, what to bring, and timing. Your guests will be counting down the days!',
      highlight: 'Guest information packets provided'
    },
    {
      icon: PartyPopper,
      title: 'Relax & Enjoy - We Handle the Rest!',
      description: 'On the day of your cruise, just show up and have fun! Our professional crew handles navigation, safety, setup, and cleanup. You focus on making memories.',
      highlight: 'White-glove service guaranteed'
    }
  ];

  const checklistItems = customItems || defaultChecklistItems;

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-2 bg-brand-blue text-white">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Complete Planning Guide
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            How to Plan an Unforgettable {partyType} on Lake Travis
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Planning a {partyType.toLowerCase()}? Follow our expert 10-step {eventType} planning guide. Premier Party Cruises handles every detail - from initial booking to your celebration day on beautiful Lake Travis!
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto"
        >
          {checklistItems.map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-brand-blue group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-brand-blue/10 group-hover:bg-brand-blue/20 flex items-center justify-center transition-colors">
                        <item.icon className="h-6 w-6 text-brand-blue" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-semibold">
                          Step {index + 1}
                        </Badge>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {item.description}
                      </p>
                      {item.highlight && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                          <CheckCircle2 className="h-4 w-4" />
                          {item.highlight}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-brand-blue text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Why Choose Premier Party Cruises for Your {partyType}?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                We've perfected the art of Lake Travis {eventType} celebrations! With years of experience hosting unforgettable {partyType.toLowerCase()} events, professional crews, pristine boats, and unmatched local expertise, we handle every detail so you can focus on having fun. From planning to the final toast, we're with you every step of the way.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => window.open('https://events.premierpartycruises.com/widget/form/X1zEKdfbmjqs2hBHWNN1', '_blank')}
                  className="bg-white text-brand-blue hover:bg-gray-100 font-bold"
                  data-testid="checklist-cta-quote"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Planning Your {partyType}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="border-2 border-white text-white hover:bg-white/10 font-bold"
                  data-testid="checklist-cta-contact"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Questions? Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
