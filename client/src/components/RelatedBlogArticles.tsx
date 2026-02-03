import { Link } from 'wouter';
import { BookOpen, Users, Shield, Calendar, Sparkles, PartyPopper } from 'lucide-react';

interface RelatedBlogArticlesProps {
  category: 'bachelor' | 'bachelorette' | 'planning' | 'safety' | 'general';
  currentSlug?: string;
}

const blogCategories = {
  bachelor: [
    { title: 'Perfect Austin Bachelor Party Itinerary', slug: '/blogs/perfect-bachelor-party-itinerary-austin', icon: Calendar },
    { title: 'How to Throw a Great Bachelor Party', slug: '/blogs/how-to-throw-great-bachelor-party-austin', icon: PartyPopper },
    { title: 'Safest Austin Bachelor Party on Lake Travis', slug: '/blogs/safest-austin-bachelor-party-lake-travis', icon: Shield },
    { title: 'Austin Bachelor Party Ideas', slug: '/blogs/bachelor-party-ideas-austin-lake-travis', icon: Sparkles },
  ],
  bachelorette: [
    { title: 'How to Throw a Great Bachelorette Party', slug: '/blogs/how-to-throw-great-bachelorette-party-austin', icon: PartyPopper },
    { title: 'Top Spots & Tips for Austin Bachelorette', slug: '/blogs/top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience', icon: Sparkles },
    { title: 'Ultimate Austin Bachelorette Boat Guide', slug: '/blogs/ultimate-austin-bachelorette-boat-guide', icon: Users },
    { title: 'Austin Bachelorette Party Boats', slug: '/blogs/austin-bachelorette-party-boats', icon: Sparkles },
  ],
  planning: [
    { title: 'Integrated Event Services Comparison', slug: '/blogs/why-choose-integrated-event-services-comparing-austin-party-planning-options', icon: BookOpen },
    { title: 'Lake Travis Party Entertainment', slug: '/blogs/lake-travis-party-boat-entertainment-guide', icon: Sparkles },
    { title: 'ATX Disco Cruise Experience', slug: '/blogs/atx-disco-cruise-experience', icon: PartyPopper },
    { title: 'Creative Lake Travis Party Themes', slug: '/blogs/creative-lake-travis-party-themes', icon: Sparkles },
  ],
  safety: [
    { title: 'Lake Travis Boat Party Regulations', slug: '/blogs/lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide', icon: Shield },
    { title: 'Safety & Maintenance Standards', slug: '/blogs/lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises', icon: Shield },
    { title: 'Why Licensed Captains Matter', slug: '/blogs/licensed-captains-safety-lake-travis', icon: Users },
    { title: 'Safety First - Premier Party Cruises', slug: '/blogs/safety-first-premier-party-cruises', icon: Shield },
  ],
  general: [
    { title: 'ATX Disco Cruise Experience', slug: '/blogs/atx-disco-cruise-experience', icon: PartyPopper },
    { title: 'Lake Travis Party Entertainment', slug: '/blogs/lake-travis-party-boat-entertainment-guide', icon: Sparkles },
    { title: 'First Time Lake Travis Guide', slug: '/blogs/first-time-lake-travis-party-boat-rental-guide', icon: BookOpen },
    { title: 'Lake Travis Boat Party Packages', slug: '/blogs/lake-travis-party-boat-packages', icon: Users },
  ],
};

export default function RelatedBlogArticles({ category, currentSlug }: RelatedBlogArticlesProps) {
  const articles = blogCategories[category].filter(a => a.slug !== currentSlug);
  
  const otherCategories = Object.entries(blogCategories)
    .filter(([cat]) => cat !== category)
    .slice(0, 2)
    .flatMap(([, items]) => items.slice(0, 2));

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Related Articles
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore more Lake Travis party planning guides
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {articles.slice(0, 4).map((article) => {
            const Icon = article.icon;
            return (
              <Link
                key={article.slug}
                href={article.slug}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <Icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="font-medium text-gray-900 dark:text-white">{article.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            More Party Planning Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {otherCategories.map((article) => {
              const Icon = article.icon;
              return (
                <Link
                  key={article.slug}
                  href={article.slug}
                  className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-400 hover:shadow-md transition-all text-sm"
                >
                  <Icon className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white">{article.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/bachelor-party-austin" className="text-blue-600 hover:text-blue-700 font-medium">
              Bachelor Parties
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/bachelorette-party-austin" className="text-pink-600 hover:text-pink-700 font-medium">
              Bachelorette Parties
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/atx-disco-cruise" className="text-purple-600 hover:text-purple-700 font-medium">
              ATX Disco Cruise
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/private-cruises" className="text-blue-600 hover:text-blue-700 font-medium">
              Private Cruises
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
