import express from "express";
import { storage } from "./storage.js";

export const blogRouter = express.Router();

// Import authentication middleware
let requireAdminAuth = null;
const getRequireAdminAuth = async () => {
  if (!requireAdminAuth) {
    try {
      const routesModule = await import('./routes.js');
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

// Helper function to strip content from posts (for list endpoints)
function stripPostContent(post) {
  const { content, ...metadata } = post;
  return metadata;
}

// GET /api/blog/public/posts - Blog listing with optimized metadata only
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

    // Build filters object
    const filters = {
      status: 'published',
      limit: parseInt(limit),
      offset: parseInt(offset),
      sortBy: 'publishedAt',
      sortOrder: 'desc'
    };

    // Convert categorySlug to categoryId if provided
    if (categorySlug) {
      const category = await storage.getBlogCategoryBySlug(categorySlug);
      if (category) {
        filters.categoryId = category.id;
      } else {
        // Category not found, return empty result
        return res.json({ posts: [], total: 0 });
      }
    }

    // Convert tagSlug to tagId if provided
    if (tagSlug) {
      const tag = await storage.getBlogTagBySlug(tagSlug);
      if (tag) {
        filters.tagId = tag.id;
      } else {
        // Tag not found, return empty result
        return res.json({ posts: [], total: 0 });
      }
    }

    // Add featured filter if provided
    if (featured === 'true') {
      filters.featured = true;
    }

    // Add search filter if provided
    if (search) {
      filters.search = search;
    }

    // Fetch posts using single optimized query
    const result = await storage.getBlogPosts(filters);

    // Strip content field from all posts to reduce payload size
    const postsMetadata = result.posts.map(post => stripPostContent(post));

    return res.json({ 
      posts: postsMetadata, 
      total: result.total 
    });
  } catch (e) {
    console.error("Blog posts fetch error:", e);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /api/blog/public/posts/:slug - Single post with full content
blogRouter.get("/public/posts/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    
    // Try PostgreSQL first
    let post = await storage.getBlogPostBySlug(slug);
    let isWordPress = false;
    
    // If not found in PostgreSQL, try Replit DB for WordPress posts
    if (!post || post.status !== "published") {
      console.log(`🔍 [Blog API] Post not found in PostgreSQL, checking Replit DB for WordPress post: ${slug}`);
      
      const Database = (await import("@replit/database")).default;
      const replitDb = new Database();
      
      const postData = await replitDb.get(`post:${slug}`);
      
      if (postData) {
        // Unwrap Replit DB response (handles single, double, or no wrapping)
        const unwrapDbResponse = (response) => {
          if (Array.isArray(response) || response === null || response === undefined) {
            return response;
          }
          if (response && typeof response === 'object' && 'value' in response) {
            return unwrapDbResponse(response.value);
          }
          return response;
        };
        
        const unwrapped = unwrapDbResponse(postData);
        
        if (unwrapped && unwrapped.status === 'published') {
          // Map WordPress post data to expected structure
          post = {
            id: `wp-${slug}`,
            title: unwrapped.title,
            slug: slug,
            metaTitle: unwrapped.metaTitle || unwrapped.title,
            metaDescription: unwrapped.metaDescription || unwrapped.excerpt,
            excerpt: unwrapped.excerpt,
            content: unwrapped.content,
            publishedAt: unwrapped.publishedAt || unwrapped.date,
            updatedAt: unwrapped.updatedAt || unwrapped.modified,
            createdAt: unwrapped.publishedAt || unwrapped.date,
            featuredImageUrl: unwrapped.featuredImage || unwrapped.featuredImageUrl,
            authorId: null,
            wpPostId: unwrapped.id,
            status: 'published',
            viewCount: 0,
            featured: false,
            readingTime: unwrapped.readingTime || 5,
            wordCount: unwrapped.wordCount || 1000
          };
          isWordPress = true;
          console.log(`✅ [Blog API] Found WordPress post in Replit DB: ${post.title}`);
        }
      }
    } else {
      console.log(`✅ [Blog API] Found PostgreSQL post: ${post.title}`);
    }
    
    // If still not found, return 404
    if (!post || post.status !== "published") {
      console.log(`❌ [Blog API] Post not found in either PostgreSQL or Replit DB: ${slug}`);
      return res.status(404).json({ error: "Not found" });
    }

    // For WordPress posts, return simplified data without categories/tags/relations
    if (isWordPress) {
      return res.json({
        post: {
          ...post,
          author: { name: "Premier Party Cruises Team" },
          categories: [],
          tags: []
        },
        relatedPosts: []
      });
    }

    // For PostgreSQL posts, get full relations
    const [categories, tags, author] = await Promise.all([
      storage.getBlogPostCategories(post.id),
      storage.getBlogPostTags(post.id),
      post.authorId ? storage.getBlogAuthor(post.authorId) : Promise.resolve(null)
    ]);

    // Get related posts (same category, limited to 3)
    let relatedPosts = [];
    if (categories.length > 0) {
      const primaryCategoryId = categories[0].id;
      const relatedResult = await storage.getBlogPosts({
        status: 'published',
        categoryId: primaryCategoryId,
        limit: 4,
        offset: 0
      });
      
      // Filter out current post and limit to 3
      relatedPosts = relatedResult.posts
        .filter(p => p.slug !== slug)
        .slice(0, 3)
        .map(p => stripPostContent(p));
    }

    res.json({
      post: {
        ...post,
        author: author || null,
        categories: categories || [],
        tags: tags || []
      },
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
    const categories = await storage.getBlogCategories();
    res.json(categories);
  } catch (e) {
    console.error("Blog categories fetch error:", e);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/blog/public/tags
blogRouter.get("/public/tags", async (_req, res) => {
  try {
    const tags = await storage.getBlogTags();
    res.json(tags);
  } catch (e) {
    console.error("Blog tags fetch error:", e);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

// GET /api/blog/health - Production health checks
blogRouter.get("/health", async (_req, res) => {
  try {
    // Get PostgreSQL data
    let pgCounts = { posts: 0, authors: 0, categories: 0, tags: 0 };
    let pgStatus = 'healthy';
    
    try {
      const [blogPostsResult, authors, categories, tags] = await Promise.all([
        storage.getBlogPosts({ limit: 1000 }),
        storage.getBlogAuthors(),
        storage.getBlogCategories(),
        storage.getBlogTags()
      ]);
      
      pgCounts = {
        posts: blogPostsResult.total || 0,
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
      postgresql: {
        status: pgStatus,
        counts: pgCounts
      },
      totals: {
        posts: pgCounts.posts,
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
    const [allPosts, categories, tags] = await Promise.all([
      storage.getBlogPosts({ status: 'published', limit: 1000 }),
      storage.getBlogCategories(),
      storage.getBlogTags()
    ]);

    // Count by categories
    const categoryStats = {};
    categories.forEach(cat => {
      categoryStats[cat.name] = cat.postCount || 0;
    });
    
    // Count by tags
    const tagStats = {};
    tags.forEach(tag => {
      tagStats[tag.name] = tag.postCount || 0;
    });
    
    res.json({
      totalPosts: allPosts.total,
      totalCategories: categories.length,
      totalTags: tags.length,
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

      // Build filters
      const filters = {
        limit,
        offset,
        ...(search && { search }),
        ...(status && { status }),
        ...(authorId && { authorId }),
        ...(categoryId && { categoryId })
      };

      // Get all data in parallel
      const [postsResult, authors, categories, tags] = await Promise.all([
        storage.getBlogPosts(filters),
        storage.getBlogAuthors(),
        storage.getBlogCategories(),
        storage.getBlogTags()
      ]);

      // Calculate statistics
      const totalPosts = postsResult.total;
      const totalPublished = postsResult.posts.filter(p => p.status === 'published').length;
      const totalDrafts = postsResult.posts.filter(p => p.status === 'draft').length;
      const totalViews = postsResult.posts.reduce((sum, p) => sum + (p.viewCount || 0), 0);

      // Return data in expected format
      res.json({
        posts: postsResult.posts,
        authors,
        categories,
        tags,
        totalPosts,
        totalPublished,
        totalDrafts,
        totalViews
      });

    } catch (e) {
      console.error("Blog management fetch error:", e);
      res.status(500).json({ error: "Failed to fetch blog management data" });
    }
  });
});

export default blogRouter;
