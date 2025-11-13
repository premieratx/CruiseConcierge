import { ReactNode } from 'react';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { BlogArticleSchema } from '@/components/schema/BlogArticleSchema';
import { TableOfContents } from '@/components/TableOfContents';
import { StickyCTA } from '@/components/StickyCTA';
import { LazyImage } from '@/components/LazyImage';
import { SectionReveal } from '@/components/SectionReveal';
import { cn } from '@/lib/utils';

export interface TOCSection {
  id: string;
  title: string;
  icon?: ReactNode;
}

export interface BlogPostLayoutProps {
  title: string;
  metaDescription: string;
  publishDate: string;
  modifiedDate?: string;
  author: string;
  heroImage: string;
  heroImageAlt: string;
  keywords: string[];
  sections: TOCSection[];
  children: ReactNode;
  pageRoute: string;
  className?: string;
}

export function BlogPostLayout({
  title,
  metaDescription,
  publishDate,
  modifiedDate,
  author,
  heroImage,
  heroImageAlt,
  keywords,
  sections,
  children,
  pageRoute,
  className,
}: BlogPostLayoutProps) {
  const articleImages = [heroImage];

  return (
    <Layout>
      <SEOHead
        pageRoute={pageRoute}
        defaultTitle={title}
        defaultDescription={metaDescription}
        defaultKeywords={keywords}
        image={heroImage}
        article={{
          publishedTime: publishDate,
          modifiedTime: modifiedDate || publishDate,
          author,
          section: 'Blog',
          tags: keywords,
        }}
      />

      <BlogArticleSchema
        headline={title}
        description={metaDescription}
        datePublished={publishDate}
        dateModified={modifiedDate}
        author={author}
        keywords={keywords}
        images={articleImages}
        url={pageRoute}
      />

      <TableOfContents sections={sections} />

      <article className={cn("pt-24 pb-16", className)}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Image */}
          <SectionReveal>
            <div className="mb-8 rounded-lg overflow-hidden shadow-2xl" data-testid="blog-hero-container">
              <LazyImage
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-auto"
                priority
                data-testid="blog-hero-image"
              />
            </div>
          </SectionReveal>

          {/* Article Header */}
          <SectionReveal>
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight" data-testid="blog-title">
                {title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400" data-testid="blog-meta">
                <span className="text-sm">By {author}</span>
                <span className="text-sm">•</span>
                <time className="text-sm" dateTime={publishDate}>
                  {new Date(publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </header>
          </SectionReveal>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none" data-testid="blog-content">
            {children}
          </div>
        </div>
      </article>

      <StickyCTA
        primaryText="Book Your Party Cruise"
        primaryHref="https://premierpartycruises.xola.com/checkout"
        secondaryText="Get Free Quote"
        secondaryHref="/contact"
      />
    </Layout>
  );
}
