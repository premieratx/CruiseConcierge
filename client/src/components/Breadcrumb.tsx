import { Link, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Breadcrumb as BreadcrumbNav,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
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

interface BreadcrumbProps {
  customSegments?: BreadcrumbSegment[];
  hideOnMobile?: boolean;
  className?: string;
}

export default function Breadcrumb({ customSegments, hideOnMobile = false, className }: BreadcrumbProps) {
  const [location] = useLocation();
  const [segments, setSegments] = useState<BreadcrumbSegment[]>([]);

  useEffect(() => {
    // Don't show breadcrumbs on homepage
    if (location === '/' || location === '') {
      setSegments([]);
      return;
    }

    // Use custom segments if provided
    if (customSegments && customSegments.length > 0) {
      setSegments(customSegments);
      return;
    }

    // Generate segments based on current route
    const generatedSegments: BreadcrumbSegment[] = [
      { label: 'Home', href: '/' }
    ];

    // Check if it's a blog post page
    if (location.startsWith('/blog/')) {
      generatedSegments.push({ label: 'Blog', href: '/blogs' });
      // The blog post title should be passed as customSegments for blog posts
      const slug = location.replace('/blog/', '');
      generatedSegments.push({ label: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), current: true });
    } else {
      // Use configuration for known pages
      const config = breadcrumbConfig[location];
      if (config) {
        if (config.category) {
          generatedSegments.push({ label: config.category });
        }
        generatedSegments.push({ label: config.label, current: true });
      } else {
        // Fallback for unknown pages - capitalize the path
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

    setSegments(generatedSegments);
  }, [location, customSegments]);

  // Don't render if no segments (homepage) or empty
  if (segments.length === 0) {
    return null;
  }

  // Generate Schema.org BreadcrumbList structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": segments.map((segment, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": segment.label,
      "item": segment.href ? `https://premierpartycruises.com${segment.href}` : undefined
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <BreadcrumbNav 
        className={`bg-gray-50 dark:bg-gray-900 border-b px-4 py-3 ${hideOnMobile ? 'hidden sm:block' : ''} ${className || ''}`}
        aria-label="Breadcrumb navigation"
      >
        <div className="container mx-auto max-w-7xl">
          <BreadcrumbList className="flex-wrap">
            {segments.map((segment, index) => (
              <BreadcrumbItem key={index}>
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
                {index < segments.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </div>
      </BreadcrumbNav>
    </>
  );
}

// Export a hook for blog pages to use
export function useBreadcrumb(customSegments?: BreadcrumbSegment[]) {
  return { segments: customSegments };
}