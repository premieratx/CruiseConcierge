import { Link } from 'wouter';
import { Calendar } from 'lucide-react';

interface MonthlyGuidesNavProps {
  type: 'bachelor' | 'bachelorette';
  currentMonth?: string;
}

const bachelorMonths = [
  { month: 'January', slug: 'austin-bachelor-party-january', season: 'Winter' },
  { month: 'March', slug: 'austin-bachelor-party-march', season: 'SXSW' },
  { month: 'May', slug: 'austin-bachelor-party-may', season: 'Peak' },
  { month: 'July', slug: 'austin-bachelor-party-july', season: 'Summer' },
  { month: 'September', slug: 'austin-bachelor-party-september', season: 'Fall' },
  { month: 'November', slug: 'austin-bachelor-party-november', season: 'Fall' },
];

const bacheloretteMonths = [
  { month: 'February', slug: 'austin-bachelorette-party-february', season: "Valentine's" },
  { month: 'April', slug: 'austin-bachelorette-party-april', season: 'Spring' },
  { month: 'June', slug: 'austin-bachelorette-party-june', season: 'Summer' },
  { month: 'August', slug: 'austin-bachelorette-party-august', season: 'Hot Summer' },
  { month: 'October', slug: 'austin-bachelorette-party-october', season: 'Fall' },
  { month: 'December', slug: 'austin-bachelorette-party-december', season: 'Holiday' },
];

export default function MonthlyGuidesNav({ type, currentMonth }: MonthlyGuidesNavProps) {
  const months = type === 'bachelor' ? bachelorMonths : bacheloretteMonths;
  const otherType = type === 'bachelor' ? 'bachelorette' : 'bachelor';
  const otherMonths = type === 'bachelor' ? bacheloretteMonths : bachelorMonths;
  const partyType = type === 'bachelor' ? 'Bachelor' : 'Bachelorette';
  const otherPartyType = type === 'bachelor' ? 'Bachelorette' : 'Bachelor';

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Austin {partyType} Party Guides by Month
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Plan your perfect Lake Travis celebration for any time of year
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {months.map((item) => (
            <Link
              key={item.slug}
              href={`/blogs/${item.slug}`}
              className={`block p-4 rounded-lg border transition-all ${
                currentMonth === item.month
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              <div className="font-semibold">{item.month}</div>
              <div className={`text-sm ${currentMonth === item.month ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                {item.season} Guide
              </div>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            {otherPartyType} Party Monthly Guides
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherMonths.map((item) => (
              <Link
                key={item.slug}
                href={`/blogs/${item.slug}`}
                className="block p-3 text-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-pink-400 hover:shadow-md transition-all"
              >
                <div className="font-medium text-sm">{item.month}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.season}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Looking for more party planning resources?
          </p>
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
