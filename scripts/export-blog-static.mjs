#!/usr/bin/env node
/**
 * One-time + build-time blog static export.
 *
 * Fetches all blog posts, categories, tags, and authors from the live
 * Replit Express backend and writes them as static JSON into the repo at
 *   client/public/blog-data/posts.json
 *   client/public/blog-data/posts/<slug>.json
 *   client/public/blog-data/categories.json
 *   client/public/blog-data/tags.json
 *   client/public/blog-data/authors/<id>.json
 *
 * The blog components (Blog, Blogs, BlogPost, BlogCategory, BlogTag,
 * BlogAuthor) read from these static files instead of /api/blog/public/*,
 * so blog works even when Replit is gone.
 *
 * Run:
 *   node scripts/export-blog-static.mjs
 *
 * Run again whenever you publish a new post on Replit (until you migrate
 * blog authoring fully off Replit).
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const LIVE = 'https://premierpartycruises.com';
const OUT = 'client/public/blog-data';

function ensure(p) { mkdirSync(dirname(p), { recursive: true }); }
function write(p, data) { ensure(p); writeFileSync(p, JSON.stringify(data, null, 2)); }

async function fetchJson(path) {
  const res = await fetch(`${LIVE}${path}`, { headers: { 'User-Agent': 'PPC-Blog-Export/1.0' } });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json();
}

async function main() {
  console.log('Exporting blog content from', LIVE);
  mkdirSync(OUT, { recursive: true });

  // Index
  const indexResp = await fetchJson('/api/blog/public/posts?limit=500');
  const posts = indexResp.posts || [];
  console.log(`  ✓ Index: ${posts.length} posts`);
  write(`${OUT}/posts.json`, { posts, total: posts.length });

  // Categories + compute real post counts from the index
  const categories = await fetchJson('/api/blog/public/categories');
  const catCounts = new Map();
  for (const p of posts) for (const c of (p.categories || [])) {
    const key = c.id || c.slug;
    catCounts.set(key, (catCounts.get(key) || 0) + 1);
  }
  if (Array.isArray(categories)) {
    for (const c of categories) {
      c.postCount = catCounts.get(c.id) || catCounts.get(c.slug) || 0;
    }
  }
  write(`${OUT}/categories.json`, categories);
  console.log(`  ✓ Categories: ${Array.isArray(categories) ? categories.length : 'n/a'} (w/ real post counts)`);

  // Tags + compute real post counts
  const tags = await fetchJson('/api/blog/public/tags');
  const tagCounts = new Map();
  for (const p of posts) for (const t of (p.tags || [])) {
    const key = t.id || t.slug;
    tagCounts.set(key, (tagCounts.get(key) || 0) + 1);
  }
  if (Array.isArray(tags)) {
    for (const t of tags) {
      t.postCount = tagCounts.get(t.id) || tagCounts.get(t.slug) || 0;
    }
  }
  write(`${OUT}/tags.json`, tags);
  console.log(`  ✓ Tags: ${Array.isArray(tags) ? tags.length : 'n/a'} (w/ real post counts)`);

  // Each post by slug (full body)
  let ok = 0, fail = 0;
  const CONCURRENCY = 6;
  const queue = [...posts];
  async function worker() {
    while (queue.length) {
      const post = queue.shift();
      if (!post || !post.slug) continue;
      try {
        const full = await fetchJson(`/api/blog/public/posts/${post.slug}`);
        write(`${OUT}/posts/${post.slug}.json`, full);
        ok++;
      } catch (e) {
        console.warn(`  ✗ ${post.slug}: ${e.message}`);
        fail++;
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`  ✓ Full posts: ${ok} ok, ${fail} fail`);

  // Unique authors
  const authorIds = [...new Set(posts.map(p => p.authorId).filter(Boolean))];
  let aOk = 0, aFail = 0;
  for (const id of authorIds) {
    try {
      const author = await fetchJson(`/api/blog/public/authors/${id}`);
      write(`${OUT}/authors/${id}.json`, author);
      aOk++;
    } catch (e) {
      aFail++;
    }
  }
  console.log(`  ✓ Authors: ${aOk} ok, ${aFail} fail`);

  // Manifest
  write(`${OUT}/manifest.json`, {
    exportedAt: new Date().toISOString(),
    source: LIVE,
    counts: { posts: ok, categories: Array.isArray(categories) ? categories.length : 0, tags: Array.isArray(tags) ? tags.length : 0, authors: aOk },
  });
  console.log('Done.');
}

main().catch(e => { console.error('Export failed:', e); process.exit(1); });
