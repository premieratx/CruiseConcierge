import express from "express";
import Database from "@replit/database";

// Import authentication middleware
let requireAdminAuth = null;
const getRequireAdminAuth = async () => {
  if (!requireAdminAuth) {
    try {
      const routesModule = await import('./routes');
      // Extract requireAdminAuth from the routes module
      requireAdminAuth = routesModule.requireAdminAuth;
      if (!requireAdminAuth) {
        // Fallback auth check
        requireAdminAuth = (req, res, next) => {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Missing authentication token' });
          }
          const token = authHeader.split(' ')[1];
          if (token !== 'admin-dev-token') {
            return res.status(401).json({ error: 'Unauthorized: Invalid authentication token' });
          }
          req.adminUser = { id: 'admin', role: 'admin' };
          next();
        };
      }
    } catch (error) {
      console.error('Failed to import auth middleware:', error);
      // Fallback auth middleware
      requireAdminAuth = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'Unauthorized: Missing authentication token' });
        }
        const token = authHeader.split(' ')[1];
        if (token !== 'admin-dev-token') {
          return res.status(401).json({ error: 'Unauthorized: Invalid authentication token' });
        }
        req.adminUser = { id: 'admin', role: 'admin' };
        next();
      };
    }
  }
  return requireAdminAuth;
};

const db = new Database();
export const blogRouter = express.Router();

// Utility: Unwrap Replit DB responses (handles single, double, or no wrapping)
function unwrapDbResponse(response) {
  // If it's already an array or null/undefined, return as-is
  if (Array.isArray(response) || response === null || response === undefined) {
    return response;
  }
  
  // If it's an object with a 'value' property, recursively unwrap
  if (response && typeof response === 'object' && 'value' in response) {
    return unwrapDbResponse(response.value);
  }
  
  // If we get here and it's an object but not wrapped, return as-is
  // (this handles the case where individual posts are returned directly)
  return response;
}

// Import storage for PostgreSQL blog data
let storage = null;
const getStorage = async () => {
  if (!storage) {
    try {
      const { storage: storageInstance } = await import('./storage');
      storage = storageInstance;
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      throw new Error('Storage initialization failed');
    }
  }
  return storage;
};

// Utility: fetch posts by slugs with pagination
async function loadPostsBySlugs(slugs, { offset=0, limit=10 }) {
  // Handle Replit DB response format - it may return {ok: true, value: array}
  const slugArray = Array.isArray(slugs) ? slugs : (slugs?.value || []);
  const slice = slugArray.slice(offset, offset + limit);
  const posts = await Promise.all(slice.map(async s => {
    const post = await db.get(`post:${s}`);
    return post?.value || post; // Handle both direct and wrapped responses
  }));
  // Filter out nulls and keep only published
  return posts.filter(p => p && p.status === "published");
}

// GET /api/blog/public/posts - WordPress posts from Replit DB
blogRouter.get("/public/posts", async (req, res) => {
  try {
    const {
      categorySlug = undefined,
      tagSlug = undefined,
      limit = '20',
      offset = '0',
      featured = undefined,
      search = ''
    } = req.query;

    const postsIndexRaw = await db.get("index:posts");
    let slugs = unwrapDbResponse(postsIndexRaw) || [];
    
    // Filter by featured status
    if (featured === 'true') {
      const matches = [];
      for (const s of slugs) {
        const postRaw = await db.get(`post:${s}`);
        const post = unwrapDbResponse(postRaw);
        if (post?.featured === true && post?.status === "published") {
          matches.push(s);
        }
      }
      slugs = matches;
    }
    
    // Filter by category
    if (categorySlug) {
      const matches = [];
      for (const s of slugs) {
        const postRaw = await db.get(`post:${s}`);
        const post = unwrapDbResponse(postRaw);
        if (post?.categories?.some(c => c.slug === categorySlug)) {
          matches.push(s);
        }
      }
      slugs = matches;
    }
    
    // Filter by tag
    if (tagSlug) {
      const matches = [];
      for (const s of slugs) {
        const postRaw = await db.get(`post:${s}`);
        const post = unwrapDbResponse(postRaw);
        if (post?.tags?.some(t => t.slug === tagSlug)) {
          matches.push(s);
        }
      }
      slugs = matches;
    }
    
    // Filter by search
    if (search) {
      const q = search.toLowerCase().trim();
      const matches = [];
      for (const s of slugs) {
        const postRaw = await db.get(`post:${s}`);
        const post = unwrapDbResponse(postRaw);
        if (post && (
          post.title?.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q) ||
          post.content?.toLowerCase().includes(q)
        )) {
          matches.push(s);
        }
      }
      slugs = matches;
    }
    
    // Pagination
    const total = slugs.length;
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    const paginatedSlugs = slugs.slice(offsetNum, offsetNum + limitNum);
    
    // Load posts
    const postsRaw = await Promise.all(paginatedSlugs.map(s => db.get(`post:${s}`)));
    const posts = postsRaw
      .map(raw => unwrapDbResponse(raw))
      .filter(p => p && p.status === "published");

    return res.json({ posts, total });
  } catch (e) {
    console.error("Blog posts fetch error:", e);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /api/blog/public/posts/:slug - WordPress posts from Replit DB
blogRouter.get("/public/posts/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const postRaw = await db.get(`post:${slug}`);
    const post = unwrapDbResponse(postRaw);
    
    if (!post || post.status !== "published") {
      return res.status(404).json({ error: "Not found" });
    }
    
    // Get related posts from same category (if any)
    let relatedPosts = [];
    if (post.categories && post.categories.length > 0) {
      const primaryCategorySlug = post.categories[0].slug;
      const postsIndexRaw = await db.get("index:posts");
      const slugs = unwrapDbResponse(postsIndexRaw) || [];
      
      for (const s of slugs) {
        if (s === slug || relatedPosts.length >= 3) continue;
        const relatedPostRaw = await db.get(`post:${s}`);
        const relatedPost = unwrapDbResponse(relatedPostRaw);
        
        if (relatedPost?.status === "published" && 
            relatedPost?.categories?.some(c => c.slug === primaryCategorySlug)) {
          relatedPosts.push(relatedPost);
        }
      }
    }
    
    res.json({
      post,
      author: post.author || null,
      categories: post.categories || [],
      tags: post.tags || [],
      relatedPosts
    });
  } catch (e) {
    console.error("Blog post fetch error:", e);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// GET /api/blog/public/categories
blogRouter.get("/public/categories", async (_req, res) => {
  try {
    // Collect categories from all posts
    const postsIndexRaw = await db.get("index:posts");
    const slugs = unwrapDbResponse(postsIndexRaw) || [];
    const catSlugsSet = new Set();
    
    for (const s of slugs) {
      const postRaw = await db.get(`post:${s}`);
      const post = unwrapDbResponse(postRaw);
      (post?.categories || []).forEach(c => catSlugsSet.add(c.slug));
    }
    
    const categoriesRaw = await Promise.all([...catSlugsSet].map(cs => db.get(`category:${cs}`)));
    const categories = categoriesRaw.map(raw => unwrapDbResponse(raw)).filter(Boolean);
    res.json(categories);
  } catch (e) {
    console.error("Blog categories fetch error:", e);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/blog/public/tags
blogRouter.get("/public/tags", async (_req, res) => {
  try {
    // Collect tags from all posts
    const postsIndexRaw = await db.get("index:posts");
    const slugs = unwrapDbResponse(postsIndexRaw) || [];
    const tagSlugsSet = new Set();
    
    for (const s of slugs) {
      const postRaw = await db.get(`post:${s}`);
      const post = unwrapDbResponse(postRaw);
      (post?.tags || []).forEach(t => tagSlugsSet.add(t.slug));
    }
    
    const tagsRaw = await Promise.all([...tagSlugsSet].map(ts => db.get(`tag:${ts}`)));
    const tags = tagsRaw.map(raw => unwrapDbResponse(raw)).filter(Boolean);
    res.json(tags);
  } catch (e) {
    console.error("Blog tags fetch error:", e);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

// Additional utility routes
// GET /api/blog/health - Production health checks
blogRouter.get("/health", async (_req, res) => {
  try {
    // Get WordPress data from Replit DB
    const postsIndexRaw = await db.get("index:posts");
    const wpPostSlugs = unwrapDbResponse(postsIndexRaw) || [];
    
    // Count WordPress posts by status
    const wpCounts = { total: 0, published: 0, draft: 0 };
    for (const slug of wpPostSlugs) {
      const postRaw = await db.get(`post:${slug}`);
      const post = unwrapDbResponse(postRaw);
      if (post) {
        wpCounts.total++;
        if (post.status === 'published') wpCounts.published++;
        if (post.status === 'draft') wpCounts.draft++;
      }
    }
    
    // Get PostgreSQL data
    let pgCounts = { posts: 0, authors: 0, categories: 0, tags: 0 };
    let pgStatus = 'healthy';
    try {
      const storage = await getStorage();
      const blogPostsResult = await storage.getBlogPosts({ limit: 1000 });
      const authors = await storage.getBlogAuthors();
      const categories = await storage.getBlogCategories();
      const tags = await storage.getBlogTags();
      
      pgCounts = {
        posts: Array.isArray(blogPostsResult) ? blogPostsResult.length : 
               (blogPostsResult?.posts ? blogPostsResult.posts.length : 0),
        authors: authors.length,
        categories: categories.length,
        tags: tags.length
      };
    } catch (pgError) {
      pgStatus = 'error';
      console.error('PostgreSQL health check failed:', pgError);
    }
    
    const healthReport = {
      timestamp: new Date().toISOString(),
      overall: pgStatus === 'healthy' ? 'healthy' : 'degraded',
      wordpress: {
        status: 'healthy',
        posts: wpCounts
      },
      postgresql: {
        status: pgStatus,
        counts: pgCounts
      },
      totals: {
        posts: wpCounts.total + pgCounts.posts,
        publishedPosts: wpCounts.published,
        authors: pgCounts.authors,
        categories: pgCounts.categories,
        tags: pgCounts.tags
      }
    };
    
    console.log('🏥 Blog health check:', JSON.stringify(healthReport, null, 2));
    res.json(healthReport);
  } catch (e) {
    console.error("Blog health check error:", e);
    res.status(500).json({ 
      timestamp: new Date().toISOString(),
      overall: 'unhealthy', 
      error: "Health check failed",
      details: e.message 
    });
  }
});

// GET /api/blog/stats - Blog statistics
blogRouter.get("/stats", async (_req, res) => {
  try {
    const slugs = (await db.get("index:posts")) || [];
    const posts = await Promise.all(slugs.map(s => db.get(`post:${s}`)));
    const published = posts.filter(p => p && p.status === "published");
    
    // Count by categories
    const categoryStats = {};
    published.forEach(post => {
      (post.categories || []).forEach(cat => {
        categoryStats[cat.name] = (categoryStats[cat.name] || 0) + 1;
      });
    });
    
    // Count by tags
    const tagStats = {};
    published.forEach(post => {
      (post.tags || []).forEach(tag => {
        tagStats[tag.name] = (tagStats[tag.name] || 0) + 1;
      });
    });
    
    res.json({
      totalPosts: published.length,
      totalCategories: Object.keys(categoryStats).length,
      totalTags: Object.keys(tagStats).length,
      categoryStats,
      tagStats: Object.fromEntries(
        Object.entries(tagStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10) // Top 10 tags
      )
    });
  } catch (e) {
    console.error("Blog stats error:", e);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// GET /api/blog/management - Admin dashboard endpoint 
blogRouter.get("/management", async (req, res, next) => {
  // Apply admin authentication
  const authMiddleware = await getRequireAdminAuth();
  authMiddleware(req, res, async () => {
  try {
    const {
      tab = "posts",
      page = "1",
      search = "",
      status = "",
      authorId = "",
      categoryId = ""
    } = req.query;

    const limit = 20;
    const offset = (parseInt(page) - 1) * limit;

    // Get WordPress posts from Replit DB
    let wordpressPosts = [];
    try {
      const postsIndexRaw = await db.get("index:posts");
      const slugs = unwrapDbResponse(postsIndexRaw) || [];
      
      // Apply filters for WordPress posts
      let filteredSlugs = slugs;
      
      // Status filter for WordPress posts
      if (status) {
        const matches = [];
        for (const s of filteredSlugs) {
          const postRaw = await db.get(`post:${s}`);
          const post = unwrapDbResponse(postRaw);
          if (post && post.status === status) matches.push(s);
        }
        filteredSlugs = matches;
      }
      
      // Search filter for WordPress posts
      if (search) {
        const q = String(search).toLowerCase().trim();
        const matches = [];
        for (const s of filteredSlugs) {
          const postRaw = await db.get(`post:${s}`);
          const post = unwrapDbResponse(postRaw);
          if (post && (
            post.title?.toLowerCase().includes(q) ||
            post.excerpt?.toLowerCase().includes(q) ||
            post.content?.toLowerCase().includes(q)
          )) {
            matches.push(s);
          }
        }
        filteredSlugs = matches;
      }

      // Load WordPress posts
      const wpPostsRaw = await Promise.all(filteredSlugs.map(s => db.get(`post:${s}`)));
      const wpPosts = wpPostsRaw.map(raw => unwrapDbResponse(raw)).filter(Boolean);
      wordpressPosts = wpPosts.map(post => ({
        ...post,
        source: 'wordpress',
        // Transform to match PostgreSQL structure
        id: post.id || post.slug,
        publishedAt: post.publishedAt || post.createdAt,
        viewCount: post.viewCount || 0
      }));
    } catch (wpError) {
      console.error('Error fetching WordPress posts:', wpError);
    }

    // Get PostgreSQL posts from storage
    let postgresqlPosts = [];
    let postgresqlAuthors = [];
    let postgresqlCategories = [];
    let postgresqlTags = [];
    
    try {
      const storageInstance = await getStorage();
      
      const filters = {
        limit: 1000, // Get all for now, we'll paginate later
        offset: 0,
        ...(search && { search }),
        ...(status && { status }),
        ...(authorId && { authorId }),
        ...(categoryId && { categoryId })
      };
      
      // Robust error handling for each PostgreSQL operation
      try {
        const pgResult = await storageInstance.getBlogPosts(filters);
        postgresqlPosts = (pgResult?.posts || []).map(post => ({
          ...post,
          source: 'postgresql'
        }));
      } catch (postsError) {
        console.warn('PostgreSQL getBlogPosts failed, using empty array:', postsError.message);
        postgresqlPosts = [];
      }
      
      // Get authors, categories, tags from PostgreSQL with individual error handling
      try {
        postgresqlAuthors = await storageInstance.getBlogAuthors() || [];
      } catch (authorsError) {
        console.warn('PostgreSQL getBlogAuthors failed, using empty array:', authorsError.message);
        postgresqlAuthors = [];
      }
      
      try {
        postgresqlCategories = await storageInstance.getBlogCategories() || [];
      } catch (categoriesError) {
        console.warn('PostgreSQL getBlogCategories failed, using empty array:', categoriesError.message);
        postgresqlCategories = [];
      }
      
      try {
        postgresqlTags = await storageInstance.getBlogTags() || [];
      } catch (tagsError) {
        console.warn('PostgreSQL getBlogTags failed, using empty array:', tagsError.message);
        postgresqlTags = [];
      }
      
    } catch (pgError) {
      console.error('PostgreSQL storage initialization failed, falling back to Replit DB only:', pgError);
      postgresqlPosts = [];
      postgresqlAuthors = [];
      postgresqlCategories = [];
      postgresqlTags = [];
    }

    // Get WordPress authors, categories, tags from Replit DB
    let wordpressAuthors = [];
    let wordpressCategories = [];
    let wordpressTags = [];
    
    try {
      // Collect WordPress categories and tags
      const wpCatSlugsSet = new Set();
      const wpTagSlugsSet = new Set();
      
      for (const post of wordpressPosts) {
        (post.categories || []).forEach(c => wpCatSlugsSet.add(c.slug));
        (post.tags || []).forEach(t => wpTagSlugsSet.add(t.slug));
      }
      
      const wpCategoriesRaw = await Promise.all([...wpCatSlugsSet].map(cs => db.get(`category:${cs}`)));
      const wpTagsRaw = await Promise.all([...wpTagSlugsSet].map(ts => db.get(`tag:${ts}`)));
      
      // Handle Replit DB response format and filter out nulls
      wordpressCategories = wpCategoriesRaw.map(raw => unwrapDbResponse(raw)).filter(Boolean);
      wordpressTags = wpTagsRaw.map(raw => unwrapDbResponse(raw)).filter(Boolean);
      
      // WordPress authors (simplified)
      const uniqueAuthors = new Set();
      wordpressPosts.forEach(post => {
        if (post.author?.name) uniqueAuthors.add(post.author.name);
      });
      
      wordpressAuthors = Array.from(uniqueAuthors).map(name => ({
        id: `wp_${name.toLowerCase().replace(/\s+/g, '_')}`,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@wordpress.com`,
        bio: `WordPress author: ${name}`,
        active: true,
        source: 'wordpress'
      }));
    } catch (wpMetaError) {
      console.error('Error fetching WordPress metadata:', wpMetaError);
    }

    // Merge all posts
    const allPosts = [...wordpressPosts, ...postgresqlPosts];
    
    // Sort by creation date (newest first)
    allPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.publishedAt || 0);
      const dateB = new Date(b.createdAt || b.publishedAt || 0);
      return dateB.getTime() - dateA.getTime();
    });

    // Apply pagination to merged results
    const paginatedPosts = allPosts.slice(offset, offset + limit);

    // Merge metadata
    const allAuthors = [...postgresqlAuthors, ...wordpressAuthors];
    const allCategories = [...postgresqlCategories, ...wordpressCategories];
    const allTags = [...postgresqlTags, ...wordpressTags];

    // Calculate statistics
    const totalPosts = allPosts.length;
    const totalPublished = allPosts.filter(p => p.status === 'published').length;
    const totalDrafts = allPosts.filter(p => p.status === 'draft').length;
    const totalViews = allPosts.reduce((sum, p) => sum + (p.viewCount || 0), 0);

    // Return data in expected format
    res.json({
      posts: paginatedPosts,
      authors: allAuthors,
      categories: allCategories,
      tags: allTags,
      totalPosts,
      totalPublished,
      totalDrafts,
      totalViews
    });

  } catch (e) {
    console.error("Blog management fetch error:", e);
    res.status(500).json({ error: "Failed to fetch blog management data" });
  }
  }); // Close auth middleware
});

export default blogRouter;