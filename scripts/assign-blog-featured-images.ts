/**
 * Assigns featured images and computes word counts for all DB-backed blog posts.
 * Images are served from /attached_assets/ (static route in server/index.ts).
 */
import { db } from '../server/db';
import { blogPosts } from '../shared/schema';
import { eq, sql } from 'drizzle-orm';

// ── Photo pools by topic ─────────────────────────────────────────────────────
const DISCO_PHOTOS = [
  '/attached_assets/disco_fun_best2_1765193453547.jpg',
  '/attached_assets/atx-disco-cruise-party.jpg',
  '/attached_assets/disco_fun_1765193453547.jpg',
  '/attached_assets/disco_fun2_1765193453547.jpg',
  '/attached_assets/disco_fun3_1765193453547.jpg',
  '/attached_assets/disco_fun5_1765193453548.jpg',
  '/attached_assets/disco_fun6_1765193453548.jpg',
  '/attached_assets/disco_fun7_1765193453548.jpg',
  '/attached_assets/disco_fun9_1765193453548.jpg',
  '/attached_assets/disco_fun_first_1765193453547.jpg',
];

const BACHELOR_PHOTOS = [
  '/attached_assets/bachelor-party-group-guys.jpg',
  '/attached_assets/bachelor-party-group-guys-hero.webp',
  '/attached_assets/bachelor-party-group-guys-optimized.webp',
];

const BACHELORETTE_PHOTOS = [
  '/attached_assets/clever-girl-3-bachelorette-boat.jpg',
  '/attached_assets/clever-girl-2-party-boat-austin.jpg',
  '/attached_assets/clever-girl-1-lake-travis-party-boat.jpg',
  '/attached_assets/clever-girl-50-person-boat.jpg',
];

const COMBINED_PHOTOS = [
  '/attached_assets/dancing-party-scene.jpg',
  '/attached_assets/atx-disco-cruise-party.jpg',
  '/attached_assets/disco_fun_best2_1765193453547.jpg',
];

const BOAT_PHOTOS = [
  '/attached_assets/clever-girl-1-lake-travis-party-boat.jpg',
  '/attached_assets/clever-girl-50-person-boat.jpg',
  '/attached_assets/day-tripper-14-person-boat.jpg',
  '/attached_assets/clever-girl-2-party-boat-austin.jpg',
];

const DEFAULT_PHOTOS = [
  '/attached_assets/atx-disco-cruise-party.jpg',
  '/attached_assets/dancing-party-scene.jpg',
  '/attached_assets/clever-girl-1-lake-travis-party-boat.jpg',
];

function pick(pool: string[], index: number): string {
  return pool[index % pool.length];
}

function htmlWordCount(html: string): number {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(w => w.length > 0).length;
}

async function main() {
  // Get all posts with their tags
  const posts = await db.execute(sql`
    SELECT 
      b.id, b.title, b.slug, b.featured_image, b.word_count, b.content,
      array_agg(t.name) FILTER (WHERE t.name IS NOT NULL) AS tag_names
    FROM blog_posts b
    LEFT JOIN blog_post_tags bpt ON b.id = bpt.post_id
    LEFT JOIN blog_tags t ON bpt.tag_id = t.id
    GROUP BY b.id, b.title, b.slug, b.featured_image, b.word_count, b.content
    ORDER BY b.published_at ASC
  `);

  console.log(`Total posts: ${posts.rows.length}`);
  let updated = 0;
  let discoCount = 0, bachCount = 0, bachetteCount = 0, combinedCount = 0, boatCount = 0;

  for (const post of posts.rows as any[]) {
    const tags: string[] = post.tag_names || [];
    const slug = post.slug || '';
    const content = post.content || '';
    
    // Determine photo pool
    const isDiscoTagged = tags.includes('ATX Disco Cruise');
    const isBachelorTagged = tags.includes('Bachelor Party') && !tags.includes('Bachelorette Party');
    const isBacheloretteTagged = tags.includes('Bachelorette Party') && !tags.includes('Bachelor Party');
    const isCombined = tags.includes('Bachelor Party') && tags.includes('Bachelorette Party');
    const isBoat = tags.includes('Party Boat') || tags.includes('Lake Travis') || slug.includes('private') || slug.includes('boat');

    // Also check slug for disco context
    const slugHasDisco = slug.includes('disco') || slug.includes('atx-disco');
    const slugHasBachelor = slug.includes('bachelor') && !slug.includes('bachelorette');
    const slugHasBachelorette = slug.includes('bachelorette');
    const slugHasCombined = slug.includes('bachelor') && slug.includes('bachelorette');

    let photoPool: string[];
    let counter: number;

    if (isDiscoTagged || slugHasDisco) {
      photoPool = DISCO_PHOTOS;
      counter = discoCount++;
    } else if (isCombined || slugHasCombined) {
      photoPool = COMBINED_PHOTOS;
      counter = combinedCount++;
    } else if (isBacheloretteTagged || slugHasBachelorette) {
      photoPool = BACHELORETTE_PHOTOS;
      counter = bachetteCount++;
    } else if (isBachelorTagged || slugHasBachelor) {
      photoPool = BACHELOR_PHOTOS;
      counter = bachCount++;
    } else if (isBoat) {
      photoPool = BOAT_PHOTOS;
      counter = boatCount++;
    } else {
      photoPool = DEFAULT_PHOTOS;
      counter = discoCount;
    }

    const assignedImage = pick(photoPool, counter);
    const wc = content ? htmlWordCount(content) : 0;

    // Update only if missing image or word count is 0
    if (!post.featured_image || post.word_count === 0 || post.word_count === null) {
      await db.execute(sql`
        UPDATE blog_posts 
        SET 
          featured_image = COALESCE(featured_image, ${assignedImage}),
          word_count = CASE WHEN word_count IS NULL OR word_count = 0 THEN ${wc} ELSE word_count END,
          updated_at = NOW()
        WHERE id = ${post.id}
      `);
      console.log(`✓ Updated: ${post.slug?.substring(0,50)} → img: ${!post.featured_image ? assignedImage.split('/').pop() : 'kept'} | wc: ${wc}`);
      updated++;
    }
  }

  console.log(`\nDone. Updated ${updated} posts.`);
}

main().catch(console.error);
