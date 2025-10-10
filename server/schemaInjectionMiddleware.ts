import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSchemaForRoute } from './schemaLoader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDevelopment = process.env.NODE_ENV === 'development';

// Cache for the base template
let baseTemplate: string | null = null;
const schemaCache = new Map<string, string>();

/**
 * Load the base index.html template
 */
function loadBaseTemplate(): string {
  if (baseTemplate) {
    return baseTemplate;
  }

  const templatePath = isDevelopment
    ? path.resolve(__dirname, '../client/index.html')
    : path.resolve(process.cwd(), 'dist/public/index.html');

  try {
    baseTemplate = fs.readFileSync(templatePath, 'utf-8');
    return baseTemplate;
  } catch (error) {
    console.error('Error loading index.html template:', error);
    throw error;
  }
}

/**
 * Generate schema script tags from schema objects
 */
function generateSchemaScripts(schemas: object[]): string {
  if (schemas.length === 0) {
    return '';
  }

  return schemas
    .map(schema => {
      const jsonString = JSON.stringify(schema, null, 2);
      return `    <script type="application/ld+json">\n${jsonString}\n    </script>`;
    })
    .join('\n');
}

/**
 * Inject schema markup into the HTML template
 */
function injectSchemas(html: string, schemas: object[]): string {
  if (schemas.length === 0) {
    return html;
  }

  const schemaScripts = generateSchemaScripts(schemas);
  
  // Inject before the closing </head> tag
  const headCloseIndex = html.indexOf('</head>');
  if (headCloseIndex === -1) {
    console.warn('Could not find </head> tag in template');
    return html;
  }

  return (
    html.substring(0, headCloseIndex) +
    '\n' +
    schemaScripts +
    '\n  ' +
    html.substring(headCloseIndex)
  );
}

/**
 * Middleware to inject schema markup into React-rendered pages
 */
export function schemaInjectionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const pathname = req.path;

  // Skip if this is an API route, static asset, or special route
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/@') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return next();
  }

  // Check if we have schemas for this route
  const schemas = getSchemaForRoute(pathname);
  
  console.log(`[Schema Injection] Route: ${pathname}, Schemas found: ${schemas.length}`);
  
  if (schemas.length === 0) {
    // No schemas for this route, continue to next middleware
    return next();
  }

  // Check cache first
  const cacheKey = pathname;
  if (schemaCache.has(cacheKey)) {
    return res.send(schemaCache.get(cacheKey)!);
  }

  try {
    // Load base template and inject schemas
    const baseHtml = loadBaseTemplate();
    const augmentedHtml = injectSchemas(baseHtml, schemas);

    // Cache the result
    if (!isDevelopment) {
      schemaCache.set(cacheKey, augmentedHtml);
    }

    // Send the augmented HTML
    res.send(augmentedHtml);
  } catch (error) {
    console.error(`Error injecting schemas for ${pathname}:`, error);
    next(error);
  }
}

/**
 * Clear the schema cache (useful for development/testing)
 */
export function clearSchemaCache(): void {
  baseTemplate = null;
  schemaCache.clear();
}
