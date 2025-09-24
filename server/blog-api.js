import express from "express";
import Database from "@replit/database";

const db = new Database();
export const blogRouter = express.Router();

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

// GET /api/blog/public/posts
blogRouter.get("/public/posts", async (req, res) => {
  try {
    const {
      limit = "10",
      offset = "0",
      search = "",
      categorySlug = "",
      tagSlug = ""
    } = req.query;

    const postsIndexRaw = await db.get("index:posts");
    let slugs = Array.isArray(postsIndexRaw) ? postsIndexRaw : (postsIndexRaw?.value || []);

    // category filter
    if (categorySlug) {
      const key = `index:category:${categorySlug}:posts`;
      const arrRaw = await db.get(key);
      const arr = Array.isArray(arrRaw) ? arrRaw : (arrRaw?.value || []);
      slugs = slugs.filter(s => arr.includes(s));
    }

    // tag filter
    if (tagSlug) {
      const key = `index:tag:${tagSlug}:posts`;
      const arrRaw = await db.get(key);
      const arr = Array.isArray(arrRaw) ? arrRaw : (arrRaw?.value || []);
      slugs = slugs.filter(s => arr.includes(s));
    }

    // search (naive)
    if (search) {
      const q = String(search).toLowerCase().trim();
      const matches = [];
      for (const s of slugs) {
        const doc = await db.get(`search:${s}`);
        if (doc && doc.includes(q)) matches.push(s);
      }
      slugs = matches;
    }

    const total = slugs.length;
    const posts = await loadPostsBySlugs(slugs, { offset: Number(offset), limit: Number(limit) });

    return res.json({ posts, total });
  } catch (e) {
    console.error("Blog posts fetch error:", e);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /api/blog/public/posts/:slug
blogRouter.get("/public/posts/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const postRaw = await db.get(`post:${slug}`);
    const post = postRaw?.value || postRaw;
    if (!post || post.status !== "published") {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(post);
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
    const slugs = Array.isArray(postsIndexRaw) ? postsIndexRaw : (postsIndexRaw?.value || []);
    const catSlugsSet = new Set();
    
    for (const s of slugs) {
      const postRaw = await db.get(`post:${s}`);
      const post = postRaw?.value || postRaw;
      (post?.categories || []).forEach(c => catSlugsSet.add(c.slug));
    }
    
    const categoriesRaw = await Promise.all([...catSlugsSet].map(cs => db.get(`category:${cs}`)));
    const categories = categoriesRaw.map(raw => raw?.value || raw).filter(Boolean);
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
    const slugs = Array.isArray(postsIndexRaw) ? postsIndexRaw : (postsIndexRaw?.value || []);
    const tagSlugsSet = new Set();
    
    for (const s of slugs) {
      const postRaw = await db.get(`post:${s}`);
      const post = postRaw?.value || postRaw;
      (post?.tags || []).forEach(t => tagSlugsSet.add(t.slug));
    }
    
    const tagsRaw = await Promise.all([...tagSlugsSet].map(ts => db.get(`tag:${ts}`)));
    const tags = tagsRaw.map(raw => raw?.value || raw).filter(Boolean);
    res.json(tags);
  } catch (e) {
    console.error("Blog tags fetch error:", e);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});

// Additional utility routes
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
blogRouter.get("/management", async (req, res) => {
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
      const slugs = Array.isArray(postsIndexRaw) ? postsIndexRaw : (postsIndexRaw?.value || []);
      
      // Apply filters for WordPress posts
      let filteredSlugs = slugs;
      
      // Status filter for WordPress posts
      if (status) {
        const matches = [];
        for (const s of filteredSlugs) {
          const postRaw = await db.get(`post:${s}`);
          const post = postRaw?.value || postRaw;
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
          const post = postRaw?.value || postRaw;
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
      const wpPosts = wpPostsRaw.map(raw => raw?.value || raw).filter(Boolean);
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
      wordpressCategories = wpCategoriesRaw.map(raw => raw?.value || raw).filter(Boolean);
      wordpressTags = wpTagsRaw.map(raw => raw?.value || raw).filter(Boolean);
      
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
});

export default blogRouter;