/**
 * Static blog fetch shim.
 *
 * Intercepts `fetch('/api/blog/public/*')` calls and serves responses from
 * the static JSON exported by `scripts/export-blog-static.mjs` into
 * `/blog-data/*`. This lets the Netlify build render blogs without the
 * Replit backend.
 *
 * Filtering (featured, search, categoryId, tagId, pagination) is done in
 * memory on the full index (78 posts) — trivially fast, no backend round
 * trip.
 *
 * Install once from main.tsx (or any entry that runs before blog pages).
 */

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string | null;
  featuredImage?: string | null;
  featured?: boolean;
  status?: string;
  authorId?: string;
  categories?: Array<{ id: string; slug: string; name: string }>;
  tags?: Array<{ id: string; slug: string; name: string }>;
  [k: string]: unknown;
};

const DATA_ROOT = '/blog-data';

const jsonCache = new Map<string, Promise<unknown>>();
function loadJson<T = unknown>(url: string): Promise<T> {
  let p = jsonCache.get(url);
  if (!p) {
    p = realFetch(url).then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${url} ${r.status}`))));
    jsonCache.set(url, p);
  }
  return p as Promise<T>;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function parseQuery(url: string): URLSearchParams {
  const i = url.indexOf('?');
  return new URLSearchParams(i === -1 ? '' : url.slice(i + 1));
}

function applyFilters(posts: BlogPost[], qs: URLSearchParams): BlogPost[] {
  let out = posts.filter((p) => p.status === 'published' || !p.status);
  const featured = qs.get('featured');
  if (featured === 'true') out = out.filter((p) => p.featured === true);
  const search = qs.get('search');
  if (search) {
    const s = search.toLowerCase();
    out = out.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(s) ||
        (p.excerpt || '').toLowerCase().includes(s) ||
        (p.content || '').toLowerCase().includes(s)
    );
  }
  const categoryId = qs.get('categoryId');
  if (categoryId) out = out.filter((p) => (p.categories || []).some((c: any) => c.id === categoryId));
  const tagId = qs.get('tagId');
  if (tagId) out = out.filter((p) => (p.tags || []).some((t: any) => t.id === tagId));
  // Sort by publishedAt desc
  out.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
  return out;
}

function paginate(posts: BlogPost[], qs: URLSearchParams) {
  const limit = Math.max(1, Math.min(1000, parseInt(qs.get('limit') || '12', 10)));
  const page = Math.max(1, parseInt(qs.get('page') || '1', 10));
  const start = (page - 1) * limit;
  const paged = posts.slice(start, start + limit);
  return {
    posts: paged,
    total: posts.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(posts.length / limit)),
  };
}

type Handler = (path: string, qs: URLSearchParams) => Promise<Response | null>;

const handlers: Array<{ match: RegExp; handle: Handler }> = [
  // /api/blog/public/posts[?featured=...&search=...&page=...&limit=...]
  {
    match: /^\/api\/blog\/public\/posts\/?$/,
    handle: async (_p, qs) => {
      const index = await loadJson<{ posts: BlogPost[] }>(`${DATA_ROOT}/posts.json`);
      const filtered = applyFilters(index.posts || [], qs);
      return jsonResponse(paginate(filtered, qs));
    },
  },
  // /api/blog/public/posts/<slug>
  {
    match: /^\/api\/blog\/public\/posts\/([^/?]+)$/,
    handle: async (path) => {
      const slug = path.match(/^\/api\/blog\/public\/posts\/([^/?]+)$/)?.[1];
      if (!slug) return jsonResponse({ error: 'no slug' }, 400);
      try {
        const full = await loadJson(`${DATA_ROOT}/posts/${slug}.json`);
        return jsonResponse(full);
      } catch {
        return jsonResponse({ error: 'not found' }, 404);
      }
    },
  },
  // /api/blog/public/categories
  {
    match: /^\/api\/blog\/public\/categories\/?$/,
    handle: async () => {
      const categories = await loadJson(`${DATA_ROOT}/categories.json`);
      return jsonResponse(categories);
    },
  },
  // /api/blog/public/categories/<slug>?...
  {
    match: /^\/api\/blog\/public\/categories\/([^/?]+)$/,
    handle: async (path, qs) => {
      const slug = path.match(/^\/api\/blog\/public\/categories\/([^/?]+)$/)?.[1];
      const index = await loadJson<{ posts: BlogPost[] }>(`${DATA_ROOT}/posts.json`);
      const categories = (await loadJson(`${DATA_ROOT}/categories.json`)) as any[];
      const category = categories.find((c) => c.slug === slug);
      if (!category) return jsonResponse({ error: 'not found' }, 404);
      const filtered = (index.posts || []).filter((p) =>
        (p.categories || []).some((c: any) => c.id === category.id || c.slug === category.slug)
      );
      return jsonResponse({ category, ...paginate(applyFilters(filtered, qs), qs) });
    },
  },
  // /api/blog/public/tags
  {
    match: /^\/api\/blog\/public\/tags\/?$/,
    handle: async () => {
      const tags = await loadJson(`${DATA_ROOT}/tags.json`);
      return jsonResponse(tags);
    },
  },
  // /api/blog/public/tags/<slug>?...
  {
    match: /^\/api\/blog\/public\/tags\/([^/?]+)$/,
    handle: async (path, qs) => {
      const slug = path.match(/^\/api\/blog\/public\/tags\/([^/?]+)$/)?.[1];
      const index = await loadJson<{ posts: BlogPost[] }>(`${DATA_ROOT}/posts.json`);
      const tags = (await loadJson(`${DATA_ROOT}/tags.json`)) as any[];
      const tag = tags.find((t) => t.slug === slug);
      if (!tag) return jsonResponse({ error: 'not found' }, 404);
      const filtered = (index.posts || []).filter((p) =>
        (p.tags || []).some((t: any) => t.id === tag.id || t.slug === tag.slug)
      );
      return jsonResponse({ tag, ...paginate(applyFilters(filtered, qs), qs) });
    },
  },
  // /api/blog/public/authors/<id>?...
  {
    match: /^\/api\/blog\/public\/authors\/([^/?]+)$/,
    handle: async (path, qs) => {
      const id = path.match(/^\/api\/blog\/public\/authors\/([^/?]+)$/)?.[1];
      const index = await loadJson<{ posts: BlogPost[] }>(`${DATA_ROOT}/posts.json`);
      const filtered = (index.posts || []).filter((p) => p.authorId === id);
      // Minimal author stub — full author records aren't exported
      const author = { id, name: 'Premier Party Cruises Team' };
      return jsonResponse({ author, ...paginate(applyFilters(filtered, qs), qs) });
    },
  },
];

let realFetch: typeof fetch;

export function installStaticBlogShim() {
  if (typeof window === 'undefined') return;
  if ((window as unknown as { __ppcBlogShimInstalled?: boolean }).__ppcBlogShimInstalled) return;
  (window as unknown as { __ppcBlogShimInstalled?: boolean }).__ppcBlogShimInstalled = true;
  realFetch = window.fetch.bind(window);

  window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    // Only intercept blog public endpoints
    if (!url.includes('/api/blog/public/')) return realFetch(input as RequestInfo, init);
    // Normalize to path + qs
    const pathStart = url.indexOf('/api/blog/public/');
    const afterHost = url.slice(pathStart);
    const [path] = afterHost.split('?');
    const qs = parseQuery(afterHost);
    for (const h of handlers) {
      if (h.match.test(path)) {
        try {
          const r = await h.handle(path, qs);
          if (r) return r;
        } catch (e) {
          console.warn('[blog-static] handler error', e);
          return jsonResponse({ error: 'handler failed' }, 500);
        }
      }
    }
    // No match — fall through to real fetch (which would 404 after cutover)
    return realFetch(input as RequestInfo, init);
  }) as typeof fetch;
}
