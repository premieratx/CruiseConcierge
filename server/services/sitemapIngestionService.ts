import { storage } from '../storage';
import type { InsertPageStatusPage } from '@shared/schema';
import { XMLParser } from 'fast-xml-parser';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export class SitemapIngestionService {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://premierpartycruises.com') {
    this.baseUrl = baseUrl;
  }

  /**
   * Known React routes in the application
   */
  private reactRoutes = [
    '/',
    '/bachelor-party-austin',
    '/bachelorette-party-austin',
    '/combined-bachelor-bachelorette-austin',
    '/atx-disco-cruise',
    '/private-cruises',
    '/party-boat-austin',
    '/party-boat-lake-travis',
    '/team-building',
    '/company-milestone',
    '/client-entertainment',
    '/graduation-party',
    '/milestone-birthday',
    '/sweet-16',
    '/rehearsal-dinner',
    '/after-party',
    '/welcome-party',
    '/contact',
    '/faq',
    '/testimonials-faq',
    '/blog',
    '/admin',
    '/dashboard',
    '/quote-builder'
  ];

  /**
   * Fetch and parse sitemap.xml
   */
  async fetchSitemap(): Promise<SitemapUrl[]> {
    const sitemapUrl = `${this.baseUrl}/sitemap.xml`;
    
    try {
      const response = await fetch(sitemapUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
      }

      const xml = await response.text();
      const parser = new XMLParser();
      const parsed = parser.parse(xml);

      // Handle both urlset and sitemapindex formats
      if (parsed.urlset && parsed.urlset.url) {
        const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
        return urls.map((url: any) => ({
          loc: url.loc,
          lastmod: url.lastmod,
          changefreq: url.changefreq,
          priority: url.priority ? parseFloat(url.priority) : undefined
        }));
      }

      // Handle sitemapindex (multiple sitemaps)
      if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
        const sitemaps = Array.isArray(parsed.sitemapindex.sitemap) 
          ? parsed.sitemapindex.sitemap 
          : [parsed.sitemapindex.sitemap];
        
        // Fetch all child sitemaps
        const allUrls: SitemapUrl[] = [];
        for (const sitemap of sitemaps) {
          const childUrls = await this.fetchSitemapByUrl(sitemap.loc);
          allUrls.push(...childUrls);
        }
        return allUrls;
      }

      return [];
    } catch (error: any) {
      console.error('Error fetching sitemap:', error);
      throw new Error(`Sitemap ingestion failed: ${error.message}`);
    }
  }

  /**
   * Fetch a specific sitemap URL
   */
  private async fetchSitemapByUrl(url: string): Promise<SitemapUrl[]> {
    const response = await fetch(url);
    const xml = await response.text();
    const parser = new XMLParser();
    const parsed = parser.parse(xml);

    if (parsed.urlset && parsed.urlset.url) {
      const urls = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
      return urls.map((url: any) => ({
        loc: url.loc,
        lastmod: url.lastmod,
        changefreq: url.changefreq,
        priority: url.priority ? parseFloat(url.priority) : undefined
      }));
    }

    return [];
  }

  /**
   * Classify a URL as React, WordPress, or HTML
   */
  private classifyUrl(url: string): { sourceType: string; isReactRoute: boolean; isWordPress: boolean } {
    // Extract pathname from URL
    const pathname = new URL(url).pathname;

    // Check if it's a known React route
    const isReactRoute = this.reactRoutes.includes(pathname) || pathname.startsWith('/blog/');
    
    // WordPress patterns (if you have WordPress content)
    const isWordPress = pathname.includes('/wp-') || pathname.includes('/wordpress/');

    // Determine source type
    let sourceType = 'html';
    if (isReactRoute) {
      sourceType = 'react';
    } else if (isWordPress) {
      sourceType = 'wordpress';
    }

    return {
      sourceType,
      isReactRoute,
      isWordPress
    };
  }

  /**
   * Ingest sitemap and populate database
   */
  async ingestSitemap(): Promise<{ created: number; updated: number; errors: string[] }> {
    const urls = await this.fetchSitemap();
    let created = 0;
    let updated = 0;
    const errors: string[] = [];

    for (const sitemapUrl of urls) {
      try {
        const pathname = new URL(sitemapUrl.loc).pathname;
        const slug = pathname.replace(/^\//, '').replace(/\/$/, '') || 'home';
        const classification = this.classifyUrl(sitemapUrl.loc);

        // Check if page already exists
        const existingPages = await storage.getPageStatusPages();
        const existingPage = existingPages.find(p => p.url === sitemapUrl.loc);

        const pageData: InsertPageStatusPage = {
          url: sitemapUrl.loc,
          slug: slug,
          sourceType: classification.sourceType,
          isReactRoute: classification.isReactRoute,
          isWordPress: classification.isWordPress,
          sitemapPath: sitemapUrl.loc,
          lastPublishedAt: sitemapUrl.lastmod ? new Date(sitemapUrl.lastmod) : undefined,
          status: 'unknown',
          hasSchema: false,
          isIndexable: true,
          onSitemap: true,
          notes: `Imported from sitemap on ${new Date().toISOString()}`
        };

        if (existingPage) {
          // Update existing page
          await storage.updatePageStatusPage(existingPage.id, {
            ...pageData,
            onSitemap: true
          });
          updated++;
        } else {
          // Create new page
          await storage.createPageStatusPage(pageData);
          created++;
        }
      } catch (error: any) {
        errors.push(`Failed to process ${sitemapUrl.loc}: ${error.message}`);
        console.error(`Error processing ${sitemapUrl.loc}:`, error);
      }
    }

    // Mark pages not in sitemap as onSitemap = false
    const allPages = await storage.getPageStatusPages();
    const sitemapUrls = new Set(urls.map(u => u.loc));
    
    for (const page of allPages) {
      if (!sitemapUrls.has(page.url) && page.onSitemap) {
        await storage.updatePageStatusPage(page.id, { onSitemap: false });
      }
    }

    return { created, updated, errors };
  }
}

export const sitemapIngestionService = new SitemapIngestionService();
