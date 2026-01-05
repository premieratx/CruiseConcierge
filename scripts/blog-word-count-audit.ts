#!/usr/bin/env npx tsx
/**
 * Blog Word Count Audit Script
 * 
 * Validates that ALL blog pages have adequate word count for SEO.
 * Critical for ensuring crawlers (SEMrush, Ubersuggest, Google) see content.
 * 
 * Run: npx tsx scripts/blog-word-count-audit.ts
 * 
 * SUCCESS CRITERIA:
 * - All pages must have 500+ words (minimum for SEO)
 * - Recommended: 1000+ words for competitive keywords
 * 
 * CREATED: To prevent SSR issues that caused 100+ pages to show 0 words
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';
import { JSDOM } from 'jsdom';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';
const SITEMAP_PATH = join(process.cwd(), 'public', 'sitemap.xml');
const MIN_WORD_COUNT = 500;
const RECOMMENDED_WORD_COUNT = 1000;

interface PageResult {
  url: string;
  wordCount: number;
  hasH1: boolean;
  h1Text: string;
  status: 'pass' | 'warning' | 'fail';
  issues: string[];
}

function parseSitemap(): string[] {
  const xmlContent = readFileSync(SITEMAP_PATH, 'utf-8');
  const parser = new XMLParser();
  const parsed = parser.parse(xmlContent);
  
  if (!parsed.urlset || !parsed.urlset.url) {
    throw new Error('Invalid sitemap structure');
  }
  
  const urls = Array.isArray(parsed.urlset.url) 
    ? parsed.urlset.url 
    : [parsed.urlset.url];
  
  return urls.map((entry: any) => entry.loc);
}

function extractWordCount(html: string): number {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Remove script, style, noscript elements
  const toRemove = doc.querySelectorAll('script, style, noscript');
  toRemove.forEach(el => el.remove());
  
  // Use body text content (includes all SSR content)
  const text = doc.body?.textContent || '';
  
  // Clean and count words (filter out short strings and non-words)
  const words = text
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(word => word.length >= 2 && /[a-zA-Z]/.test(word));
  
  return words.length;
}

function extractH1(html: string): { hasH1: boolean; h1Text: string } {
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const hasH1 = !!h1Match;
  const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
  return { hasH1, h1Text };
}

async function auditPage(url: string): Promise<PageResult> {
  const path = url.replace('https://premierpartycruises.com', '');
  const fullUrl = `${SERVER_URL}${path}`;
  
  try {
    const response = await fetch(fullUrl, { 
      headers: { 'User-Agent': 'SEO-Audit-Bot' } 
    });
    
    if (!response.ok) {
      return {
        url: path,
        wordCount: 0,
        hasH1: false,
        h1Text: '',
        status: 'fail',
        issues: [`HTTP ${response.status}`]
      };
    }
    
    const html = await response.text();
    const wordCount = extractWordCount(html);
    const { hasH1, h1Text } = extractH1(html);
    
    const issues: string[] = [];
    let status: 'pass' | 'warning' | 'fail' = 'pass';
    
    if (wordCount < MIN_WORD_COUNT) {
      issues.push(`Word count: ${wordCount} (minimum: ${MIN_WORD_COUNT})`);
      status = 'fail';
    } else if (wordCount < RECOMMENDED_WORD_COUNT) {
      issues.push(`Word count: ${wordCount} (recommended: ${RECOMMENDED_WORD_COUNT})`);
      status = 'warning';
    }
    
    if (!hasH1) {
      issues.push('Missing H1 tag');
      status = 'fail';
    }
    
    return {
      url: path,
      wordCount,
      hasH1,
      h1Text: h1Text.substring(0, 50) + (h1Text.length > 50 ? '...' : ''),
      status,
      issues
    };
  } catch (error) {
    return {
      url: path,
      wordCount: 0,
      hasH1: false,
      h1Text: '',
      status: 'fail',
      issues: [`Fetch error: ${error}`]
    };
  }
}

async function main() {
  console.log('🔍 BLOG WORD COUNT AUDIT');
  console.log('=' .repeat(60));
  console.log(`Server: ${SERVER_URL}`);
  console.log(`Minimum word count: ${MIN_WORD_COUNT}`);
  console.log(`Recommended word count: ${RECOMMENDED_WORD_COUNT}`);
  console.log('');
  
  // Get all blog URLs from sitemap
  const allUrls = parseSitemap();
  const blogUrls = allUrls.filter(url => 
    url.includes('/blogs/') || url.includes('/blog/')
  );
  
  console.log(`Found ${blogUrls.length} blog pages to audit\n`);
  
  const results: PageResult[] = [];
  const BATCH_SIZE = 10;
  
  // Process in batches
  for (let i = 0; i < blogUrls.length; i += BATCH_SIZE) {
    const batch = blogUrls.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(url => auditPage(url)));
    results.push(...batchResults);
    
    process.stdout.write(`\rProgress: ${Math.min(i + BATCH_SIZE, blogUrls.length)}/${blogUrls.length}`);
  }
  
  console.log('\n\n' + '=' .repeat(60));
  
  // Summary
  const passed = results.filter(r => r.status === 'pass');
  const warnings = results.filter(r => r.status === 'warning');
  const failed = results.filter(r => r.status === 'fail');
  
  console.log('📊 SUMMARY');
  console.log('-'.repeat(40));
  console.log(`✅ Passed (${RECOMMENDED_WORD_COUNT}+ words): ${passed.length}`);
  console.log(`⚠️  Warnings (${MIN_WORD_COUNT}-${RECOMMENDED_WORD_COUNT} words): ${warnings.length}`);
  console.log(`❌ Failed (<${MIN_WORD_COUNT} words): ${failed.length}`);
  console.log(`📄 Total pages: ${results.length}`);
  
  const avgWordCount = Math.round(
    results.reduce((sum, r) => sum + r.wordCount, 0) / results.length
  );
  console.log(`📈 Average word count: ${avgWordCount}`);
  
  // Show failed pages
  if (failed.length > 0) {
    console.log('\n❌ FAILED PAGES (Need Immediate Attention)');
    console.log('-'.repeat(60));
    failed.forEach(r => {
      console.log(`  ${r.url}`);
      console.log(`    Words: ${r.wordCount}, H1: ${r.hasH1 ? '✓' : '✗'}`);
      r.issues.forEach(issue => console.log(`    → ${issue}`));
    });
  }
  
  // Show warnings
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (Below Recommended)');
    console.log('-'.repeat(60));
    warnings.slice(0, 10).forEach(r => {
      console.log(`  ${r.url} - ${r.wordCount} words`);
    });
    if (warnings.length > 10) {
      console.log(`  ... and ${warnings.length - 10} more`);
    }
  }
  
  // Exit status
  const score = Math.round((passed.length + warnings.length * 0.5) / results.length * 100);
  console.log(`\n🏆 SEO WORD COUNT SCORE: ${score}%`);
  
  if (failed.length > 0) {
    console.log('\n🚨 AUDIT FAILED - Fix pages with <500 words before deploy');
    process.exit(1);
  } else if (warnings.length > results.length * 0.2) {
    console.log('\n⚠️  AUDIT PASSED WITH WARNINGS - Consider improving pages with <1000 words');
    process.exit(0);
  } else {
    console.log('\n✅ AUDIT PASSED - All pages have adequate content');
    process.exit(0);
  }
}

main().catch(console.error);
