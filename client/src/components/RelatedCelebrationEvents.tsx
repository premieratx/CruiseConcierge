import { Link } from 'wouter';
import { Heart, Cake, Gift, Baby, PartyPopper, Sparkles } from 'lucide-react';

interface RelatedCelebrationEventsProps {
  currentPage?: string;
}

const celebrationEvents = [
  { name: 'Baby Shower', slug: '/baby-shower-cruise', icon: Baby, color: 'pink' },
  { name: 'Birthday Party', slug: '/birthday-party-boat-rental', icon: Cake, color: 'purple' },
  { name: 'Engagement Party', slug: '/engagement-party-cruise', icon: Heart, color: 'red' },
  { name: 'Gender Reveal', slug: '/gender-reveal-cruise', icon: Gift, color: 'blue' },
  { name: 'Holiday Party', slug: '/holiday-party-cruise', icon: Sparkles, color: 'green' },
  { name: 'Bridal Shower', slug: '/bridal-shower-cruise', icon: PartyPopper, color: 'pink' },
];

const colorClasses: Record<string, string> = {
  pink: 'text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 border-pink-200',
  purple: 'text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200',
  red: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200',
  blue: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200',
  green: 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200',
};

export default function RelatedCelebrationEvents({ currentPage }: RelatedCelebrationEventsProps) {
  const filteredEvents = celebrationEvents.filter(event => event.slug !== currentPage);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            More Lake Travis Celebration Cruises
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Celebrate life's special moments on the water
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEvents.map((event) => {
            const Icon = event.icon;
            return (
              <Link
                key={event.slug}
                href={event.slug}
                className={`flex items-center gap-3 p-4 rounded-lg border bg-white dark:bg-gray-800 transition-all hover:shadow-md ${colorClasses[event.color]}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium text-gray-900 dark:text-white">{event.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Planning a bachelor or bachelorette party?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/bachelor-party-austin" 
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Bachelor Parties
              </Link>
              <Link 
                href="/bachelorette-party-austin" 
                className="inline-flex items-center px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors"
              >
                Bachelorette Parties
              </Link>
              <Link 
                href="/atx-disco-cruise" 
                className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                ATX Disco Cruise
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
