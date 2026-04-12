import { Link, useLocation } from 'wouter';
import { useEffect, useState, Fragment } from 'react';
import { 
  Breadcrumb as BreadcrumbNav,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

interface BreadcrumbSegment {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbConfig {
  [key: string]: {
    category?: string;
    label: string;
    parent?: string;
  };
}

// Define breadcrumb hierarchy configuration
const breadcrumbConfig: BreadcrumbConfig = {
  // Events pages
  '/bachelor-party-austin': { category: 'Events', label: 'Bachelor Party' },
  '/bachelorette-party-austin': { category: 'Events', label: 'Bachelorette Party' },
  '/corporate-events': { category: 'Events', label: 'Corporate Events' },
  '/team-building': { category: 'Events', label: 'Team Building' },
  '/birthday-parties': { category: 'Events', label: 'Birthday Parties' },
  '/wedding-parties': { category: 'Events', label: 'Wedding Parties' },
  
  // Cruises pages
  '/atx-disco-cruise': { category: 'Cruises', label: 'ATX Disco Cruise' },
  '/private-cruises': { category: 'Cruises', label: 'Private Charters' },
  
  // Info pages
  '/faq': { label: 'FAQ' },
  '/contact': { label: 'Contact' },
  '/gallery': { label: 'Gallery' },
  
  // Blog pages
  '/blogs': { label: 'Blog' },
  '/blog': { label: 'Blog' },
};

// Compute segments synchronously for a given location (SSR-safe)
function computeSegments(location: string, customSegments?: BreadcrumbSegment[]): BreadcrumbSegment[] {
  if (!location || typeof location !== 'string') return [];
  if (location === '/' || location === '') return [];
  if (customSegments && customSegments.length > 0) return customSegments;

  const generatedSegments: BreadcrumbSegment[] = [
    { label: 'Home', href: '/' }
  ];

  if (location.startsWith('/blog/')) {
    generatedSegments.push({ label: 'Blog', href: '/blogs' });
    const slug = location.replace('/blog/', '');
    generatedSegments.push({ label: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), current: true });
  } else {
    const config = breadcrumbConfig[location];
    if (config) {
      if (config.category) {
        generatedSegments.push({ label: config.category });
      }
      generatedSegments.push({ label: config.label, current: true });
    } else {
      const pathSegments = location.split('/').filter(s => s);
      pathSegments.forEach((segment, index) => {
        const label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        generatedSegments.push({
          label,
          current: index === pathSegments.length - 1
        });
      });
    }
  }

  return generatedSegments;
}

interface BreadcrumbProps {
  customSegments?: BreadcrumbSegment[];
  hideOnMobile?: boolean;
  className?: string;
}

export default function Breadcrumb({ customSegments, hideOnMobile = false, className }: BreadcrumbProps) {
  const [location] = useLocation();

  // Compute segments synchronously so they're available during SSR
  const [segments, setSegments] = useState<BreadcrumbSegment[]>(() =>
    computeSegments(location, customSegments)
  );

  useEffect(() => {
    setSegments(computeSegments(location, customSegments));
  }, [location, customSegments]);

  // Compute banner flags from location (SSR-safe — location is always available)
  const isBachelorettePage =
    location.includes('bachelorette') &&
    location !== '/bachelorette-party-austin';
  const isBachelorOnlyPage =
    location.includes('bachelor') &&
    !location.includes('bachelorette') &&
    location !== '/bachelor-party-austin';
  const isCombinedPage =
    location.includes('bachelor') &&
    location.includes('bachelorette') &&
    location !== '/bachelorette-party-austin' &&
    location !== '/bachelor-party-austin';

  // NOTE: Schema.org BreadcrumbList is handled by SSR (server/ssr/renderer.ts)
  // to avoid duplicate/conflicting schemas and "Missing field 'item'" errors
  // This component only renders the visual breadcrumb navigation

  return (
    <>
      {/* Breadcrumb nav — only render when we have segments */}
      {segments.length > 0 && (
        <BreadcrumbNav
          className={`bg-gray-50 dark:bg-gray-900 border-b px-4 py-3 ${hideOnMobile ? 'hidden sm:block' : ''} ${className || ''}`}
          aria-label="Breadcrumb navigation"
        >
          <div className="container mx-auto max-w-7xl">
            <BreadcrumbList className="flex-wrap">
              {segments.map((segment, index) => (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {segment.current ? (
                      <BreadcrumbPage className="text-gray-700 dark:text-gray-300 font-medium">
                        {segment.label}
                      </BreadcrumbPage>
                    ) : segment.href ? (
                      <BreadcrumbLink asChild>
                        <Link
                          href={segment.href}
                          className="text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                        >
                          {index === 0 && <Home className="w-4 h-4" />}
                          <span>{segment.label}</span>
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">{segment.label}</span>
                    )}
                  </BreadcrumbItem>
                  {index < segments.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </div>
        </BreadcrumbNav>
      )}

      {/* Referral banners — rendered based on location (SSR-safe, no segments dependency) */}
      {isCombinedPage && (
        <div className="bg-blue-700 text-white py-3 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-sm font-medium">
              <strong>Planning a combined trip?</strong> See the full guides:&nbsp;
              <Link href="/bachelorette-party-austin" className="underline hover:no-underline">Austin Bachelorette Guide</Link>
              &nbsp;&amp;&nbsp;
              <Link href="/bachelor-party-austin" className="underline hover:no-underline">Austin Bachelor Party Guide</Link>
            </p>
            <Link href="/bachelorette-party-austin" className="flex-shrink-0 bg-white text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm hover:bg-blue-50 transition-colors whitespace-nowrap">
              View Main Guides →
            </Link>
          </div>
        </div>
      )}

      {isBachelorettePage && !isCombinedPage && (
        <div className="bg-blue-700 text-white py-3 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-sm font-medium">
              <strong>Looking for the complete Austin bachelorette party guide?</strong> Pricing, boats, the ATX Disco Cruise, and all options — it&apos;s all on the main page.
            </p>
            <Link href="/bachelorette-party-austin" className="flex-shrink-0 bg-white text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm hover:bg-blue-50 transition-colors whitespace-nowrap">
              Main Bachelorette Guide →
            </Link>
          </div>
        </div>
      )}

      {isBachelorOnlyPage && (
        <div className="bg-blue-700 text-white py-3 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-sm font-medium">
              <strong>Looking for the complete Austin bachelor party guide?</strong> Pricing, boats, the ATX Disco Cruise, and all options — it&apos;s all on the main page.
            </p>
            <Link href="/bachelor-party-austin" className="flex-shrink-0 bg-white text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm hover:bg-blue-50 transition-colors whitespace-nowrap">
              Main Bachelor Party Guide →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

// Export a hook for blog pages to use
export function useBreadcrumb(customSegments?: BreadcrumbSegment[]) {
  return { segments: customSegments };
}
