import { storage } from '../storage';
import type { InsertPageStatusTestRun, PageStatusPage } from '@shared/schema';
import { JSDOM } from 'jsdom';

export interface PageTestResult {
  httpStatus: number;
  responseTimeMs: number;
  seoChecks: {
    hasH1: boolean;
    hasMetaDescription: boolean;
    hasTitle: boolean;
    hasCanonical: boolean;
    hasSchema: boolean;
    robotsIndexable: boolean;
  };
  contentHash: string;
  errorMessage?: string;
  testStatus: 'success' | 'failed';
}

export class PageTestingService {
  /**
   * Test a single page URL
   */
  async testPage(url: string): Promise<PageTestResult> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'PageStatusBot/1.0 (Premier Party Cruises SEO Monitor)'
        },
        redirect: 'follow'
      });

      const responseTimeMs = Date.now() - startTime;
      const httpStatus = response.status;
      const html = await response.text();

      // Parse HTML for SEO checks
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // SEO Checks
      const hasH1 = document.querySelector('h1') !== null;
      const hasMetaDescription = document.querySelector('meta[name="description"]') !== null;
      const hasTitle = document.querySelector('title') !== null;
      const hasCanonical = document.querySelector('link[rel="canonical"]') !== null;
      
      // Check for schema.org structured data
      const hasSchema = 
        document.querySelector('script[type="application/ld+json"]') !== null ||
        document.querySelector('[itemscope]') !== null;

      // Check robots meta tag
      const robotsMeta = document.querySelector('meta[name="robots"]');
      const robotsContent = robotsMeta?.getAttribute('content') || '';
      const robotsIndexable = !robotsContent.includes('noindex');

      // Generate content hash (simple hash of first 1000 chars)
      const contentHash = this.generateHash(html.substring(0, 1000));

      return {
        httpStatus,
        responseTimeMs,
        seoChecks: {
          hasH1,
          hasMetaDescription,
          hasTitle,
          hasCanonical,
          hasSchema,
          robotsIndexable
        },
        contentHash,
        testStatus: httpStatus >= 200 && httpStatus < 300 ? 'success' : 'failed'
      };

    } catch (error: any) {
      return {
        httpStatus: 0,
        responseTimeMs: Date.now() - startTime,
        seoChecks: {
          hasH1: false,
          hasMetaDescription: false,
          hasTitle: false,
          hasCanonical: false,
          hasSchema: false,
          robotsIndexable: false
        },
        contentHash: '',
        errorMessage: error.message || 'Failed to fetch page',
        testStatus: 'failed'
      };
    }
  }

  /**
   * Test a page and store results in database
   */
  async testAndStorePage(page: PageStatusPage, initiatedBy: 'automated' | 'manual' = 'automated'): Promise<void> {
    const testResult = await this.testPage(page.url);

    // Create test run record
    const testRun: InsertPageStatusTestRun = {
      pageId: page.id,
      initiatedBy,
      startedAt: new Date(),
      completedAt: new Date(),
      testStatus: testResult.testStatus,
      httpStatus: testResult.httpStatus,
      responseTimeMs: testResult.responseTimeMs,
      contentHash: testResult.contentHash,
      seoChecks: testResult.seoChecks,
      errorMessage: testResult.errorMessage
    };

    await storage.createPageStatusTestRun(testRun);

    // Update page status based on test result
    const newStatus = testResult.httpStatus >= 200 && testResult.httpStatus < 300 ? 'live' : 'broken';
    
    await storage.updatePageStatusPage(page.id, {
      status: newStatus,
      lastConfirmedLiveAt: newStatus === 'live' ? new Date() : page.lastConfirmedLiveAt,
      hasSchema: testResult.seoChecks.hasSchema,
      isIndexable: testResult.seoChecks.robotsIndexable
    });
  }

  /**
   * Bulk test multiple pages
   */
  async bulkTestPages(pageIds: number[], initiatedBy: 'automated' | 'manual' = 'manual'): Promise<void> {
    for (const pageId of pageIds) {
      const page = await storage.getPageStatusPageById(pageId);
      if (page) {
        await this.testAndStorePage(page, initiatedBy);
      }
    }
  }

  /**
   * Generate a simple hash for content comparison
   */
  private generateHash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }
}

export const pageTestingService = new PageTestingService();
