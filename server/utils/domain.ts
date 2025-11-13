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

export function getCanonicalUrl(pathname: string, req?: Request): string {
  const baseDomain = getBaseDomain(req);
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;
  return `${baseDomain}${normalizedPath}`;
}
