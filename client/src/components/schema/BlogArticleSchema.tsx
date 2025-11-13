import { Helmet } from 'react-helmet-async';

interface BlogArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  keywords: string[];
  images: string[];
  url?: string;
}

export function BlogArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  keywords,
  images,
  url,
}: BlogArticleSchemaProps) {
  const ensureAbsoluteUrl = (path: string): string => {
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://premierpartycruises.com';
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: images.map(ensureAbsoluteUrl),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Premier Party Cruises',
      logo: {
        '@type': 'ImageObject',
        url: ensureAbsoluteUrl('/attached_assets/PPC-Logo-LARGE.webp'),
      },
    },
    keywords: keywords.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url || (typeof window !== 'undefined' ? window.location.href : ''),
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
