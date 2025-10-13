import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
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
    'homepage/product-daytripper.jsonld',
    'homepage/product-meeseeks.jsonld',
    'homepage/product-clevergirl.jsonld'
  ],
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
  author?: {
    name: string;
  };
}): object {
  const publishDate = blogPost.publishedAt 
    ? new Date(blogPost.publishedAt).toISOString()
    : new Date().toISOString();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blogPost.title,
    "description": blogPost.excerpt || blogPost.content?.substring(0, 160) || '',
    "image": blogPost.featuredImage || "https://premierpartycruises.com/media/schema/hero-boat-1.jpg",
    "datePublished": publishDate,
    "dateModified": publishDate,
    "author": {
      "@type": "Person",
      "name": blogPost.author?.name || "Premier Party Cruises"
    },
    "publisher": {
      "@id": "https://premierpartycruises.com/#organization"
    },
    "url": `https://premierpartycruises.com/blogs/${blogPost.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://premierpartycruises.com/blogs/${blogPost.slug}`
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
