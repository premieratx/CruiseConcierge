import express from "express";
import Database from "@replit/database";

const db = new Database();
export const blogRouter = express.Router();

// Utility: fetch posts by slugs with pagination
async function loadPostsBySlugs(slugs, { offset=0, limit=10 }) {
  const slice = slugs.slice(offset, offset + limit);
  const posts = await Promise.all(slice.map(s => db.get(`post:${s}`)));
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

    let slugs = (await db.get("index:posts")) || [];

    // category filter
    if (categorySlug) {
      const key = `index:category:${categorySlug}:posts`;
      const arr = (await db.get(key)) || [];
      slugs = slugs.filter(s => arr.includes(s));
    }

    // tag filter
    if (tagSlug) {
      const key = `index:tag:${tagSlug}:posts`;
      const arr = (await db.get(key)) || [];
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
    const post = await db.get(`post:${slug}`);
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
    const slugs = (await db.get("index:posts")) || [];
    const catSlugsSet = new Set();
    
    for (const s of slugs) {
      const post = await db.get(`post:${s}`);
      (post?.categories || []).forEach(c => catSlugsSet.add(c.slug));
    }
    
    const categories = await Promise.all([...catSlugsSet].map(cs => db.get(`category:${cs}`)));
    res.json(categories.filter(Boolean));
  } catch (e) {
    console.error("Blog categories fetch error:", e);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/blog/public/tags
blogRouter.get("/public/tags", async (_req, res) => {
  try {
    // Collect tags from all posts
    const slugs = (await db.get("index:posts")) || [];
    const tagSlugsSet = new Set();
    
    for (const s of slugs) {
      const post = await db.get(`post:${s}`);
      (post?.tags || []).forEach(t => tagSlugsSet.add(t.slug));
    }
    
    const tags = await Promise.all([...tagSlugsSet].map(ts => db.get(`tag:${ts}`)));
    res.json(tags.filter(Boolean));
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

export default blogRouter;