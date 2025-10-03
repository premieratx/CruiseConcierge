// scripts/import-wxr-fast.js
// FAST minimal import - get data in quickly, no AI enhancements

import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";
import slugify from "slugify";
import { nanoid } from "nanoid";
import Database from "@replit/database";

const db = new Database();
const WXR_FILE = process.env.FILE || "data/wordpress-export.xml";

function slug(s) {
  return slugify(s || "post", { lower:true, strict:true });
}

function simpleExcerpt(html, max = 200) {
  // Simple text extraction without JSDOM
  const htmlStr = String(html || "");
  const text = htmlStr
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
}

function authorObj(nameRaw) {
  const name = (nameRaw || "Premier Team").toString();
  const aslug = slug(name);
  return {
    id: `author_${aslug}`,
    name,
    slug: aslug,
    bio: "",
    avatar: ""
  };
}

function wpTaxItems(item, key) {
  const categories = item.category;
  let arr = [];
  
  if (categories) {
    if (Array.isArray(categories)) {
      arr = categories.map(c=>{
        if (typeof c === "string") return { nicename: slug(c), name: c, domain: "post_tag" };
        return {
          nicename: c?.nicename || slug(c?.["#text"] || c?.text || ""),
          name: c?.["#text"] || c?.text || c?.nicename || "",
          domain: c?.domain || "post_tag"
        };
      });
    } else {
      const c = categories;
      if (typeof c === "string") {
        arr = [{ nicename: slug(c), name: c, domain: "post_tag" }];
      } else {
        arr = [{
          nicename: c?.nicename || slug(c?.["#text"] || c?.text || ""),
          name: c?.["#text"] || c?.text || c?.nicename || "",
          domain: c?.domain || "post_tag"
        }];
      }
    }
  }
  
  return arr.filter(x => (key==="category" ? x.domain==="category" : x.domain!=="category") && x.name);
}

function toTag(name) {
  const tslug = slug(name);
  return { id: `tag_${tslug}`, name, slug: tslug };
}

function toCategory(name) {
  const cslug = slug(name);
  return { id: `cat_${cslug}`, name, slug: cslug };
}

// Main import function
(async ()=>{
  console.log("🚀 Starting FAST WordPress import (minimal processing)...");
  
  const xml = fs.readFileSync(path.resolve(WXR_FILE), "utf8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    removeNSPrefix: true,
    processEntities: true,
  });
  
  const obj = parser.parse(xml);
  const items = obj?.rss?.channel?.item || [];
  console.log(`Found ${items.length} items in WordPress export.`);

  let imported = 0;
  const postsData = [];
  const authorsMap = new Map();
  const categoriesMap = new Map();
  const tagsMap = new Map();

  // Phase 1: Process all posts (minimal DB operations)
  console.log("\n📥 Phase 1: Processing posts...");
  for (const it of items) {
    const postType = it["post_type"] || it["wp:post_type"] || "post";
    if (postType !== "post") continue;

    const wpTitle = it.title || "Untitled";
    const wpContent = it["content:encoded"] || it["encoded"] || "";
    const wpSlug = it["wp:post_name"] || wpTitle;
    const date = it["pubDate"] || it["wp:post_date"] || it["wp:post_date_gmt"] || null;
    const publishedAt = date ? new Date(date).toISOString() : null;

    const authorName = it["dc:creator"] || it["wp:author_display_name"] || "Premier Team";
    const author = authorObj(authorName);
    authorsMap.set(author.slug, author);

    // Categories and tags
    const cats = wpTaxItems(it, "category").map(x=>toCategory(x.name));
    const tags = wpTaxItems(it, "tag").map(x=>toTag(x.name));

    cats.forEach(c => categoriesMap.set(c.slug, c));
    tags.forEach(t => tagsMap.set(t.slug, t));

    // Featured image
    let featuredImage = null;
    let featuredImageAlt = null;
    const postmeta = it["wp:postmeta"] || [];
    for (const m of postmeta) {
      const key = m["wp:meta_key"] || m["meta_key"];
      const val = m["wp:meta_value"] || m["meta_value"];
      if (key === "_thumbnail_url") featuredImage = val;
      if (key === "_thumbnail_alt") featuredImageAlt = val;
    }

    const post = {
      id: `post_${nanoid(10)}`,
      title: wpTitle,
      content: wpContent, // Save raw content for now
      excerpt: simpleExcerpt(wpContent),
      slug: slug(wpSlug),
      status: "published",
      publishedAt,
      featuredImage: featuredImage || undefined,
      featuredImageAlt: featuredImageAlt || undefined,
      author,
      categories: cats,
      tags: tags
    };

    postsData.push(post);
    imported++;
    
    if (imported % 20 === 0) {
      console.log(`  Processed ${imported} posts...`);
    }
  }

  console.log(`✓ Processed ${imported} posts in memory`);

  // Phase 2: Batch write to database
  console.log("\n💾 Phase 2: Writing to Replit DB...");
  
  // Write all authors
  for (const [slug, author] of authorsMap) {
    await db.set(`author:${slug}`, author);
  }
  console.log(`✓ Saved ${authorsMap.size} authors`);

  // Write all categories
  for (const [slug, cat] of categoriesMap) {
    await db.set(`category:${slug}`, cat);
  }
  console.log(`✓ Saved ${categoriesMap.size} categories`);

  // Write all tags
  for (const [slug, tag] of tagsMap) {
    await db.set(`tag:${slug}`, tag);
  }
  console.log(`✓ Saved ${tagsMap.size} tags`);

  // Write all posts
  for (let i = 0; i < postsData.length; i++) {
    const post = postsData[i];
    await db.set(`post:${post.slug}`, post);
    
    if ((i + 1) % 20 === 0) {
      console.log(`  Saved ${i + 1}/${postsData.length} posts...`);
    }
  }
  console.log(`✓ Saved ${postsData.length} posts`);

  // Create sorted index
  console.log("\n📊 Phase 3: Creating index...");
  const sortedPosts = [...postsData].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA; // Newest first
  });
  
  const postSlugs = sortedPosts.map(p => p.slug);
  await db.set("index:posts", postSlugs);
  console.log(`✓ Created index with ${postSlugs.length} posts`);

  console.log(`\n✅ Import complete!`);
  console.log(`📊 Total imported: ${imported} posts`);
  console.log(`📁 Authors: ${authorsMap.size}`);
  console.log(`🏷️  Categories: ${categoriesMap.size}`);
  console.log(`🔖 Tags: ${tagsMap.size}`);
  console.log(`🚀 Blog data is now in Replit DB!`);
})();
