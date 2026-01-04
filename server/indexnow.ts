import crypto from 'crypto';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const SITE_URL = process.env.SITE_URL || 'https://premierpartycruises.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

if (!INDEXNOW_KEY) {
  console.warn('[IndexNow] ⚠️ INDEXNOW_KEY environment variable not set - IndexNow disabled');
}

export interface IndexNowResult {
  status: 'success' | 'error' | 'skipped';
  statusCode?: number;
  message: string;
  urlCount?: number;
}

export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (!INDEXNOW_KEY) {
    return { status: 'error', message: 'INDEXNOW_KEY environment variable not configured' };
  }
  
  if (!urls || urls.length === 0) {
    return { status: 'skipped', message: 'No URLs to submit' };
  }

  const absoluteUrls = urls.map((url) => {
    if (url.startsWith('http')) return url;
    return `${SITE_URL}/${url.replace(/^\//, '')}`;
  });

  const payload = {
    host: 'premierpartycruises.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: absoluteUrls.slice(0, 10000)
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': `PremierPartyCruises/${crypto.createHash('md5').update(SITE_URL).digest('hex').slice(0, 8)}`
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log(`[IndexNow] ✅ Submitted ${absoluteUrls.length} URLs successfully`);
      return {
        status: 'success',
        statusCode: response.status,
        message: 'URLs submitted successfully to IndexNow',
        urlCount: absoluteUrls.length
      };
    } else {
      const errorText = await response.text();
      console.error(`[IndexNow] ❌ Submission failed: ${response.status} - ${errorText}`);
      return {
        status: 'error',
        statusCode: response.status,
        message: `IndexNow submission failed: ${response.statusText}`
      };
    }
  } catch (error) {
    console.error('[IndexNow] ❌ Network error:', error);
    return {
      status: 'error',
      message: `IndexNow network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function submitSitemapToIndexNow(): Promise<IndexNowResult> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    
    const urlMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g);
    if (!urlMatches) {
      return { status: 'error', message: 'No URLs found in sitemap' };
    }
    
    const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
    
    console.log(`[IndexNow] 📄 Found ${urls.length} URLs in sitemap`);
    return submitToIndexNow(urls);
  } catch (error) {
    console.error('[IndexNow] ❌ Failed to parse sitemap:', error);
    return {
      status: 'error',
      message: `Failed to parse sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export function getIndexNowKey(): string {
  return INDEXNOW_KEY;
}
