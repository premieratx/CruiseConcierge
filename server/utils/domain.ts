import { Request } from 'express';

export function getBaseDomain(req?: Request): string {
  // ALWAYS prefer request host if available (even in production)
  if (req && req.get('host')) {
    const protocol = req.protocol || 'http';
    const host = req.get('host');
    return `${protocol}://${host}`;
  }
  
  // Only fall back to hardcoded domain when no request available
  const isDeployment = process.env.REPLIT_DEPLOYMENT === '1';
  const isProduction = process.env.NODE_ENV === 'production' || isDeployment;
  
  if (isProduction) {
    return 'https://premierpartycruises.com';
  }
  
  return 'http://localhost:5000';
}

/**
 * Get the canonical URL for a given pathname.
 * CRITICAL: Canonical URLs ALWAYS use the production domain for SEO consistency.
 * This prevents "duplicate without user-selected canonical" errors in Google Search Console.
 * 
 * Query parameters (gclid, utm_*, etc.) are stripped.
 * Trailing slashes are normalized (removed except for root).
 */
export function getCanonicalUrl(pathname: string, req?: Request): string {
  // ALWAYS use production domain for canonical URLs (SEO best practice)
  const canonicalDomain = 'https://premierpartycruises.com';
  
  // Strip query parameters (gclid, utm_source, etc.)
  let cleanPath = pathname.split('?')[0];
  
  // Remove trailing slash (except for root)
  if (cleanPath.endsWith('/') && cleanPath !== '/') {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  return `${canonicalDomain}${cleanPath}`;
}
