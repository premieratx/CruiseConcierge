#!/usr/bin/env npx tsx
/**
 * Extract content from React blog components and generate PAGE_CONTENT entries
 * 
 * This script reads React component files and extracts text content for SSR.
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const BLOG_COMPONENTS_DIR = join(process.cwd(), 'client/src/pages/blog');

interface ExtractedContent {
  slug: string;
  h1: string;
  introduction: string;
  sections: { heading: string; content: string }[];
}

function camelToKebab(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function extractStringLiterals(content: string): string[] {
  const strings: string[] = [];
  
  // Match template literals and regular strings
  const regex = /['"`]([^'"`\n]{20,500})['"`]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const str = match[1].trim();
    // Filter out imports, paths, CSS classes, etc.
    if (
      !str.includes('import') &&
      !str.includes('from') &&
      !str.includes('/') &&
      !str.includes('className') &&
      !str.includes('style') &&
      !str.startsWith('@') &&
      !str.startsWith('bg-') &&
      !str.startsWith('text-') &&
      str.length > 30
    ) {
      strings.push(str);
    }
  }
  
  return strings;
}

function extractArrayContent(content: string, arrayName: string): string[] {
  const results: string[] = [];
  
  // Find the array definition
  const arrayRegex = new RegExp(`const\\s+${arrayName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, 'm');
  const match = content.match(arrayRegex);
  
  if (match) {
    const arrayContent = match[1];
    
    // Extract title and description properties
    const titleRegex = /title:\s*['"`]([^'"`]+)['"`]/g;
    const descRegex = /description:\s*['"`]([^'"`]+)['"`]/g;
    const questionRegex = /question:\s*['"`]([^'"`]+)['"`]/g;
    const answerRegex = /answer:\s*['"`]([^'"`]+)['"`]/g;
    
    let m;
    while ((m = titleRegex.exec(arrayContent)) !== null) results.push(m[1]);
    while ((m = descRegex.exec(arrayContent)) !== null) results.push(m[1]);
    while ((m = questionRegex.exec(arrayContent)) !== null) results.push('Q: ' + m[1]);
    while ((m = answerRegex.exec(arrayContent)) !== null) results.push('A: ' + m[1]);
  }
  
  return results;
}

function extractHelmetTitle(content: string): string {
  const match = content.match(/<title>([^<]+)<\/title>/);
  return match ? match[1].replace(/\s*\|.*$/, '').trim() : '';
}

function extractH1FromJSX(content: string): string {
  // Look for h1 elements or heading props
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1Match) return h1Match[1].trim();
  
  // Look for BlogPostLayout heading prop
  const headingMatch = content.match(/heading=['"`]([^'"`]+)['"`]/);
  if (headingMatch) return headingMatch[1].trim();
  
  // Look for title in Helmet
  return extractHelmetTitle(content);
}

function extractMetaDescription(content: string): string {
  const match = content.match(/content=['"`]([^'"`]{50,200})['"`]/);
  return match ? match[1].trim() : '';
}

function processComponent(filePath: string): ExtractedContent | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const fileName = filePath.split('/').pop()?.replace('.tsx', '') || '';
    
    // Convert component name to slug
    let slug = camelToKebab(fileName);
    
    // Extract main heading
    const h1 = extractH1FromJSX(content) || fileName.replace(/([A-Z])/g, ' $1').trim();
    
    // Extract meta description as introduction
    const introduction = extractMetaDescription(content) || `Comprehensive guide for ${h1}`;
    
    // Extract content from arrays
    const sections: { heading: string; content: string }[] = [];
    
    // Look for common array patterns
    const arrayPatterns = [
      'benefits', 'features', 'faqs', 'FAQ', 'items', 'options', 'types',
      'steps', 'tips', 'reasons', 'advantages', 'stats', 'highlights',
      'corporateBenefits', 'fleetOptions', 'eventTypes', 'whyChooseStats'
    ];
    
    for (const pattern of arrayPatterns) {
      const extracted = extractArrayContent(content, pattern);
      if (extracted.length > 0) {
        sections.push({
          heading: pattern.charAt(0).toUpperCase() + pattern.slice(1).replace(/([A-Z])/g, ' $1'),
          content: extracted.join(' ')
        });
      }
    }
    
    // Also extract standalone string literals
    const strings = extractStringLiterals(content);
    if (strings.length > 0) {
      sections.push({
        heading: 'Overview',
        content: strings.slice(0, 10).join(' ')
      });
    }
    
    return { slug, h1, introduction, sections };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

function generatePageContentEntry(extracted: ExtractedContent): string {
  const sectionsCode = extracted.sections
    .map(s => `      { heading: '${s.heading.replace(/'/g, "\\'")}', content: '${s.content.replace(/'/g, "\\'")}' }`)
    .join(',\n');
  
  return `  '/blogs/${extracted.slug}': {
    h1: '${extracted.h1.replace(/'/g, "\\'")}',
    introduction: '${extracted.introduction.replace(/'/g, "\\'")}',
    sections: [
${sectionsCode}
    ]
  }`;
}

async function main() {
  console.log('🔍 Extracting content from React blog components...\n');
  
  const files = readdirSync(BLOG_COMPONENTS_DIR)
    .filter(f => f.endsWith('.tsx'))
    .map(f => join(BLOG_COMPONENTS_DIR, f));
  
  console.log(`Found ${files.length} component files\n`);
  
  const entries: string[] = [];
  
  for (const file of files) {
    const extracted = processComponent(file);
    if (extracted && extracted.sections.length > 0) {
      entries.push(generatePageContentEntry(extracted));
      console.log(`✓ ${extracted.slug}: ${extracted.sections.length} sections`);
    }
  }
  
  console.log(`\n📝 Generated ${entries.length} PAGE_CONTENT entries\n`);
  
  // Output to file
  const output = `// Auto-generated PAGE_CONTENT entries from React components
// Add these to server/ssr/pageContent.ts

export const GENERATED_PAGE_CONTENT = {
${entries.join(',\n\n')}
};
`;
  
  writeFileSync('scripts/generated-page-content.ts', output);
  console.log('✅ Written to scripts/generated-page-content.ts');
}

main().catch(console.error);
