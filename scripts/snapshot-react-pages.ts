#!/usr/bin/env npx tsx
/**
 * Snapshot React Blog Pages for SSR
 * 
 * This script fetches rendered React pages and stores the HTML content
 * in the database so crawlers can see it.
 * 
 * Uses puppeteer to render pages with JavaScript, then extracts content.
 */

import { chromium } from 'playwright';
import { Pool } from '@neondatabase/serverless';

const BASE_URL = process.env.SERVER_URL || 'http://localhost:5000';

// Blog slugs that need SSR content (React-only pages without database content)
const REACT_BLOG_SLUGS = [
  'austin-best-corporate-events',
  'company-party-10-people-austin',
  'company-party-25-people-austin',
  'company-party-50-people-austin',
  'company-party-75-people-austin',
  'tech-companies-boat-parties-austin',
  'small-business-boat-parties-austin',
  'construction-trades-boat-parties-austin',
  'finance-law-firms-boat-parties-austin',
  'healthcare-wellness-boat-parties-austin',
  'dallas-to-lake-travis-corporate',
  'destination-austin-offsite-retreats',
  'company-holiday-party-lake-travis',
  'quarterly-outings-lake-travis-make-routine-company-events-easy',
  'marketing-creative-agencies-boat-austin',
  'real-estate-client-entertainment-boat-austin',
  'safety-first-how-premiers-perfect-record-and-first-aid-training-set-us-apart',
  'why-austin-companies-choose-premier',
  'austin-suburbs-corporate-events',
  'large-group-events-lake-travis',
  'employee-appreciation-day-reward-your-team-with-an-easy-all-inclusive-boat-party',
  'atx-disco-cruise-experience',
  'atx-disco-cruise-dos-and-donts-bachelor-party',
  'austin-bachelor-party-january',
  'austin-bachelor-party-march',
  'austin-bachelor-party-may',
  'austin-bachelor-party-july',
  'austin-bachelor-party-september',
  'austin-bachelor-party-november',
  'austin-bachelorette-party-february',
  'austin-bachelorette-party-april',
  'austin-bachelorette-party-june',
  'austin-bachelorette-party-august',
  'austin-bachelorette-party-october',
  'austin-bachelorette-party-december',
];

interface PageContent {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
}

async function snapshotPage(page: any, slug: string): Promise<PageContent | null> {
  const url = `${BASE_URL}/blogs/${slug}`;
  
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for React to render
    await page.waitForTimeout(2000);
    
    // Extract content
    const result = await page.evaluate(() => {
      // Get H1
      const h1 = document.querySelector('h1');
      const title = h1?.textContent?.trim() || '';
      
      // Get main content area (excluding nav, footer)
      const main = document.querySelector('main') || document.querySelector('article') || document.body;
      
      // Clone and clean
      const clone = main.cloneNode(true) as HTMLElement;
      
      // Remove scripts, styles, nav, footer
      clone.querySelectorAll('script, style, nav, footer, header, .navigation, .footer').forEach(el => el.remove());
      
      // Get HTML content
      const content = clone.innerHTML;
      
      // Get text for excerpt
      const text = clone.textContent?.replace(/\s+/g, ' ').trim() || '';
      const excerpt = text.substring(0, 300) + '...';
      
      return { title, content, excerpt };
    });
    
    return {
      slug,
      title: result.title,
      content: result.content,
      excerpt: result.excerpt
    };
  } catch (error) {
    console.error(`Error snapshotting ${slug}:`, error);
    return null;
  }
}

async function saveToDatabase(pool: Pool, pageContent: PageContent) {
  const { slug, title, content, excerpt } = pageContent;
  
  // Check if post exists
  const existing = await pool.query(
    'SELECT id FROM blog_posts WHERE slug = $1',
    [slug]
  );
  
  if (existing.rows.length > 0) {
    // Update existing
    await pool.query(
      'UPDATE blog_posts SET content = $1, excerpt = $2 WHERE slug = $3',
      [content, excerpt, slug]
    );
    console.log(`✓ Updated: ${slug}`);
  } else {
    // Create new
    await pool.query(
      `INSERT INTO blog_posts (slug, title, content, excerpt, status, published_at) 
       VALUES ($1, $2, $3, $4, 'published', NOW())`,
      [slug, title, content, excerpt]
    );
    console.log(`✓ Created: ${slug}`);
  }
}

async function main() {
  console.log('🚀 Snapshotting React blog pages for SSR...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let success = 0;
  let failed = 0;
  
  for (const slug of REACT_BLOG_SLUGS) {
    const content = await snapshotPage(page, slug);
    if (content && content.content.length > 500) {
      await saveToDatabase(pool, content);
      success++;
    } else {
      console.log(`✗ Failed or insufficient content: ${slug}`);
      failed++;
    }
  }
  
  await browser.close();
  await pool.end();
  
  console.log(`\n✅ Complete: ${success} pages snapshotted, ${failed} failed`);
}

main().catch(console.error);
