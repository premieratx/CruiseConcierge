import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request } from 'express';
import { isStaticBlogRoute } from './staticBlogMetadata';
import { getBaseDomain } from './utils/domain';

const __filename = fileURLToPath(import.meta.url);

// CRITICAL: Strip HTML tags from strings to prevent JSON-LD parsing errors
// WordPress content often contains HTML in author names, descriptions, etc.
function stripHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp;
    .replace(/&amp;/g, '&')  // Replace &amp;
    .replace(/&lt;/g, '<')   // Replace &lt;
    .replace(/&gt;/g, '>')   // Replace &gt;
    .replace(/&quot;/g, '"') // Replace &quot;
    .replace(/&#39;/g, "'")  // Replace &#39;
    .replace(/\s+/g, ' ')    // Collapse whitespace
    .trim();
}
const __dirname = path.dirname(__filename);

const SCHEMA_DIR = path.resolve(process.cwd(), 'attached_assets/schema_data');

interface RouteSchemaMapping {
  [route: string]: string[];
}

const ROUTE_TO_SCHEMA_MAPPING: RouteSchemaMapping = {
  '/': [
    'homepage/organization.jsonld',
    'homepage/faq.jsonld',
    'homepage/service-private.jsonld',
    'homepage/service-disco.jsonld',
    'homepage/service-daytripper.jsonld',
    'homepage/service-meeseeks.jsonld',
    'homepage/service-clevergirl.jsonld'
  ],
  '/faq': ['faq/faq.jsonld'],
  '/team-building': ['team-building/faq.jsonld', 'team-building/service.jsonld'],
  '/client-entertainment': ['client-entertainment/faq.jsonld', 'client-entertainment/service.jsonld'],
  '/company-milestone': ['company-milestone/faq.jsonld', 'company-milestone/service.jsonld'],
  '/rehearsal-dinner': ['rehearsal-dinner/faq.jsonld', 'rehearsal-dinner/service.jsonld'],
  '/welcome-party': ['welcome-party/faq.jsonld', 'welcome-party/service.jsonld'],
  '/after-party': ['after-party/faq.jsonld', 'after-party/service.jsonld'],
  '/sweet-16': ['sweet-16/faq.jsonld', 'sweet-16/service.jsonld'],
  '/graduation-party': ['graduation-party/faq.jsonld', 'graduation-party/service.jsonld'],
  '/milestone-birthday': ['milestone-birthday/faq.jsonld', 'milestone-birthday/service.jsonld'],
  '/atx-disco-cruise': ['atx-disco-cruise/event.jsonld', 'atx-disco-cruise/faq.jsonld'],
  '/private-cruises': ['private-cruises/faq.jsonld', 'private-cruises/service.jsonld'],
  '/bachelor-party-austin': ['bachelor-party-austin/faq.jsonld', 'bachelor-party-austin/service.jsonld'],
  '/bachelorette-party-austin': ['bachelorette-party-austin/faq.jsonld', 'bachelorette-party-austin/service.jsonld'],
  '/combined-bachelor-bachelorette-austin': ['combined-bachelor-bachelorette-austin/faq.jsonld'],
  '/party-boat-austin': ['party-boat-austin/faq.jsonld'],
  '/party-boat-lake-travis': ['party-boat-lake-travis/faq.jsonld'],
  '/testimonials-faq': ['testimonials-faq/faq.jsonld'],
  '/contact': ['contact/faq.jsonld', 'contact/service.jsonld'],
};

const schemaCache: Map<string, object> = new Map();

function loadSchemaFile(relativePath: string): object | null {
  if (schemaCache.has(relativePath)) {
    return schemaCache.get(relativePath)!;
  }

  const fullPath = path.join(SCHEMA_DIR, relativePath);
  
  try {
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const schemaObject = JSON.parse(fileContent);
    schemaCache.set(relativePath, schemaObject);
    return schemaObject;
  } catch (error) {
    console.error(`Error loading schema file ${relativePath}:`, error);
    return null;
  }
}

export function getSchemaForRoute(pathname: string): object[] {
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  
  const schemaFiles = ROUTE_TO_SCHEMA_MAPPING[normalizedPath];
  
  if (!schemaFiles || schemaFiles.length === 0) {
    return [];
  }

  const schemas: object[] = [];
  
  for (const file of schemaFiles) {
    const schema = loadSchemaFile(file);
    if (schema) {
      schemas.push(schema);
    }
  }
  
  return schemas;
}

export function generateArticleSchema(blogPost: {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  publishedAt?: Date | string;
  modifiedAt?: Date | string;
  author?: {
    name: string;
  };
}, canonicalUrl?: string, req?: Request): object {
  const publishDate = blogPost.publishedAt 
    ? new Date(blogPost.publishedAt).toISOString()
    : new Date().toISOString();
  
  const modifiedDate = blogPost.modifiedAt 
    ? new Date(blogPost.modifiedAt).toISOString()
    : publishDate;

  // CRITICAL SEO FIX: Always use production domain for schema references
  // This ensures @id references match across all schemas (Organization, Article, etc.)
  const productionDomain = 'https://premierpartycruises.com';
  const defaultUrl = `${productionDomain}/blogs/${blogPost.slug}`;
  const schemaUrl = canonicalUrl || defaultUrl;

  // Organization @id MUST match the one in ORGANIZATION_SCHEMA
  const organizationId = `${productionDomain}/#organization`;
  const defaultImage = `${productionDomain}/media/schema/hero-boat-1.jpg`;

  // CRITICAL: Strip HTML from all text fields to prevent JSON-LD parsing errors
  const cleanTitle = stripHtml(blogPost.title);
  const cleanExcerpt = stripHtml(blogPost.excerpt) || stripHtml(blogPost.content?.substring(0, 160)) || '';
  const cleanAuthorName = stripHtml(blogPost.author?.name) || "Premier Party Cruises";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": cleanTitle,
    "description": cleanExcerpt,
    "image": blogPost.featuredImage || defaultImage,
    "datePublished": publishDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": cleanAuthorName
    },
    "publisher": {
      "@id": organizationId
    },
    "url": schemaUrl,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": schemaUrl
    }
  };
}

export function isBlogPostRoute(pathname: string): boolean {
  if (!pathname.startsWith('/blogs/')) {
    return false;
  }
  
  const slug = pathname.slice('/blogs/'.length);
  
  if (!slug || slug.includes('/')) {
    return false;
  }
  
  return true;
}

export function isAnyBlogRoute(pathname: string): boolean {
  return isBlogPostRoute(pathname) || isStaticBlogRoute(pathname);
}
