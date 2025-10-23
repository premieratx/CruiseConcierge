import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Ship, Users, Music, Calendar, Crown, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedService {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface RelatedServicesSectionProps {
  services?: RelatedService[];
  title?: string;
  description?: string;
  className?: string;
  currentPath?: string;
}

const defaultServices: RelatedService[] = [
  {
    title: 'ATX Disco Cruise',
    description: 'Join Austin\'s hottest party cruise with DJ, photographer, and giant floats',
    href: '/atx-disco-cruise',
    icon: <Music className="w-5 h-5" />,
    popular: true
  },
  {
    title: 'Bachelor Parties',
    description: 'Epic bachelor party celebrations on Lake Travis with your crew',
    href: '/bachelor-party-austin',
    icon: <Users className="w-5 h-5" />
  },
  {
    title: 'Bachelorette Parties',
    description: 'Unforgettable bachelorette experiences with champagne and fun',
    href: '/bachelorette-party-austin',
    icon: <Crown className="w-5 h-5" />
  },
  {
    title: 'Private Cruises',
    description: 'Exclusive boat charters for intimate celebrations and events',
    href: '/private-cruises',
    icon: <Ship className="w-5 h-5" />
  },
  {
    title: 'Corporate Events',
    description: 'Team building and client entertainment on the water',
    href: '/corporate-events',
    icon: <Calendar className="w-5 h-5" />
  }
];

export function RelatedServicesSection({
  services = defaultServices,
  title = 'Related Services',
  description = 'Explore more ways to celebrate on Lake Travis',
  className,
  currentPath = ''
}: RelatedServicesSectionProps) {
  // Filter out the current page from related services
  const filteredServices = services.filter(service => service.href !== currentPath).slice(0, 4);

  return (
    <section className={cn('py-12 px-4', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredServices.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {service.popular && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-primary">{service.icon}</span>
                  {service.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                
                <Link href={service.href}>
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}