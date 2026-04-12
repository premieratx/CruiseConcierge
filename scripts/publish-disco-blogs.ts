/**
 * Publish 16 ATX Disco Cruise blog posts from the pasted text file.
 * Applies all factual fixes before inserting.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { db } from '../server/db';
import { blogPosts, blogPostCategories, blogPostTags } from '../shared/schema';
import { sql } from 'drizzle-orm';

// ── IDs from the live database ───────────────────────────────────────────────
const AUTHOR_ID = 'f5d2d3c4-ccaa-41ff-be80-4533c5baad0e'; // Premier Party Cruises

const CAT = {
  bachelor:   '1596c60c-5fe2-482d-afde-c1805cc5d37b',
  lakeTravis: 'e802b1b1-fc24-41fd-8c70-71bd650ab65f',
  austinTravel:'07dca670-fc1d-4d65-b34f-636d5728f36d',
  bachelorette:'78f3e75e-a0c2-4d16-910d-9a8a2b801c2b',
  planning:   '653cf793-3824-4767-9949-897d0c6d3092',
  featured:   '301911fe-6c25-4bbb-a9f4-a15c115c3e65',
};

const TAG = {
  bachelorParty:       '3ad88d98-87bd-4372-a944-fc1782d1ddf3',
  bacheloretteParty:   'e422d23d-a63e-4195-93d2-260d256c6e9d',
  lakeTravis:          '73474b3d-c946-4a4c-b6e2-61fda4c48878',
  austin:              '3ddf117c-d09e-4c24-a232-65f3af2810c6',
  partyBoat:           '2e78b6ea-1a82-444a-a963-d5f6090669d3',
  partyPlanning:       '4fd505b1-ecad-4cff-8113-52dc56ce681c',
  atxDisco:            '32c27590-6737-4621-a71a-5443d28188f2',
  bachelorIdeas:       'abe63468-0030-4086-bc47-4103fe0c2170',
  bacheloretteIdeas:   'db15b635-25d6-4aac-b783-e0ee3dc59697',
  partyBoatAustin:     'b182cb2e-c24f-49c8-b1a9-953d3b6ad63c',
  allInclusive:        '6787abba-a334-44c2-91a0-c3c98b57bbbe',
};

// ── Slug generator ────────────────────────────────────────────────────────────
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ── Text-to-HTML converter ────────────────────────────────────────────────────
function textToHtml(raw: string): string {
  const lines = raw.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip image idea lines
    if (/^Image idea:/i.test(line)) { i++; continue; }

    // Empty line → paragraph break (we use it as separator)
    if (line === '') { i++; continue; }

    // Numbered section heading: "1. Something" OR "Case N: Something"
    if (/^(\d+\.|Case \d+:)/.test(line) && line.length < 120) {
      out.push(`<h3>${line}</h3>`);
      i++;
      continue;
    }

    // All-caps short heading or standalone short question/label
    const isShortHeading =
      line.length < 80 &&
      !line.endsWith('.') &&
      !line.startsWith('"') &&
      !/^\d/.test(line) &&
      (
        /^(The |Why |How |What |When |Is |Are |Do |Did |Was |Ever |Ready |From |In |For |By |At |On |Off )/.test(line) ||
        /[:?]$/.test(line)
      );

    if (isShortHeading && line.length > 3) {
      const tag = line.length < 60 ? 'h2' : 'h3';
      out.push(`<${tag}>${line}</${tag}>`);
      i++;
      continue;
    }

    // Regular paragraph
    out.push(`<p>${line}</p>`);
    i++;
  }

  return out.join('\n');
}

// ── Apply factual fixes ───────────────────────────────────────────────────────
function applyFixes(html: string): string {
  // FIX 1: "$85–$105 per person depending on the timeslot (and that includes tax and tip – no surprise fees)"
  // → Base prices; all-in with tax + gratuity is $111–$138 per person
  html = html.replace(
    /\$85[–-]\$?105 per person depending on the timeslot \(and that includes tax and tip[^)]*\)/gi,
    '$85–$105 per person (base price, depending on timeslot). The all-in total including tax and 20% gratuity comes to approximately $111–$138 per person'
  );

  // FIX 2: "So an $105 ticket really means $105 – you're not adding 8.25% tax or a 20% tip on top; it's built-in. No math, no surprises."
  html = html.replace(
    /So an \$105 ticket really means \$105[^.]+it[''']s built-in\. No math, no surprises\./gi,
    'Pricing is transparent: base ticket prices are $85–$105, and the all-in totals including Texas sales tax and 20% gratuity are approximately $111.56 (Saturday 3:30pm), $124.88 (Friday), and $137.81 (Saturday 11am). No hidden fees.'
  );

  // FIX 3: "the listed ticket prices already include tax and gratuity"
  html = html.replace(
    /the listed ticket prices already include tax and gratuity/gi,
    'Ticket prices of $85–$105 are base rates; tax and 20% gratuity bring the all-in totals to $111–$138 per person'
  );

  // FIX 4: "$85–$105 before tax/fees, with everything included it comes out to around $111–$137 per person total"
  // This one is actually accurate (the all-in is $111-$137.81), keep it and just clean up
  // Actually that phrasing IS correct — $85-$105 before tax, ~$111-$137 all-in. Leave it.

  // FIX 5: "up to $500/hour (large boat)" — our Clever Girl max is $400/hr
  html = html.replace(/up to \$500\/hour \(large boat\)/gi, 'up to $400/hour (largest boat, peak Saturday)');
  html = html.replace(/\$500\/hour \(large boat\)/gi, '$400/hour (largest boat on peak Saturdays)');

  // FIX 6: "around $85-$105 each plus tax, includes everything" — also need to clarify gratuity
  html = html.replace(
    /around \$85-\$105 each plus tax, includes everything/gi,
    'around $85–$105 each (base); all-in with tax and 20% gratuity comes to approximately $111–$138, and that covers everything'
  );

  // FIX 7: No glass policy — remove champagne bottle exception
  html = html.replace(
    /Champagne bottles are usually allowed for toasts \(just be careful with glass\)\./gi,
    'The no-glass policy applies to all beverages — stick to cans and plastic containers for everyone\'s safety.'
  );

  // FIX 8: "50+ people comfortably" → "up to 75 guests"
  html = html.replace(/host 50\+ people comfortably/gi, 'host up to 75 guests');
  html = html.replace(/can host 50\+ people/gi, 'can host up to 75 guests');

  // FIX 9: DJ implied on private charters — add clarification
  html = html.replace(
    /There's something for everyone to enjoy\. Want to dance and rage\? We've got a killer sound system and DJ\./gi,
    "There's something for everyone to enjoy. Want to dance and rage? The boat comes equipped with a premium sound system — connect your playlist via Bluetooth and take the party wherever you want."
  );

  // FIX 10: "plus tax" on line 231 — that post says "$85-$105 each plus tax" which is missing gratuity mention
  html = html.replace(
    /around \$85-\$105 each plus tax, includes everything/gi,
    'around $85–$105 per person (base); the all-in total with tax and 20% gratuity runs approximately $111–$138 per person, and that covers everything'
  );

  // FIX 11: Remove "Image idea:" lines that slipped through (just in case)
  html = html.replace(/<p>Image idea:.*?<\/p>\n?/gi, '');

  return html;
}

// ── Read the source file ──────────────────────────────────────────────────────
const filePath = join(process.cwd(), 'attached_assets/Pasted-ATX-Disco-Cruise-vs-Private-Boat-Which-Is-Better-for-a-_1775151940753.txt');
const allLines = readFileSync(filePath, 'utf8').split('\n');

interface BlogEntry {
  startLine: number;
  endLine: number;
  categories: string[];
  tags: string[];
  featured: boolean;
  excerpt?: string;
}

// Line numbers are 1-indexed here (matching what cat -n shows)
const BLOG_RANGES: BlogEntry[] = [
  {
    startLine: 1, endLine: 43,
    categories: [CAT.bachelorette, CAT.featured],
    tags: [TAG.atxDisco, TAG.bacheloretteParty, TAG.lakeTravis, TAG.austin, TAG.partyBoatAustin],
    featured: true,
  },
  {
    startLine: 45, endLine: 64,
    categories: [CAT.bachelorette, CAT.featured],
    tags: [TAG.atxDisco, TAG.bacheloretteParty, TAG.austin],
    featured: false,
  },
  {
    startLine: 66, endLine: 111,
    categories: [CAT.bachelorette, CAT.bachelor],
    tags: [TAG.atxDisco, TAG.bacheloretteParty, TAG.bachelorParty, TAG.lakeTravis, TAG.austin],
    featured: true,
  },
  {
    startLine: 113, endLine: 190,
    categories: [CAT.planning, CAT.featured],
    tags: [TAG.atxDisco, TAG.partyBoatAustin, TAG.austin, TAG.partyPlanning],
    featured: false,
  },
  {
    startLine: 192, endLine: 244,
    categories: [CAT.bachelor, CAT.featured],
    tags: [TAG.atxDisco, TAG.bachelorParty, TAG.lakeTravis, TAG.austin, TAG.bachelorIdeas],
    featured: true,
  },
  {
    startLine: 246, endLine: 295,
    categories: [CAT.bachelorette, CAT.bachelor],
    tags: [TAG.atxDisco, TAG.bacheloretteParty, TAG.bachelorParty, TAG.allInclusive],
    featured: false,
  },
  {
    startLine: 297, endLine: 379,
    categories: [CAT.featured, CAT.planning],
    tags: [TAG.atxDisco, TAG.allInclusive, TAG.austin, TAG.partyPlanning],
    featured: false,
  },
  {
    startLine: 381, endLine: 441,
    categories: [CAT.featured, CAT.planning],
    tags: [TAG.atxDisco, TAG.austin, TAG.partyBoatAustin],
    featured: false,
  },
  {
    startLine: 443, endLine: 518,
    categories: [CAT.featured, CAT.austinTravel],
    tags: [TAG.atxDisco, TAG.austin, TAG.partyBoatAustin],
    featured: false,
  },
  {
    startLine: 520, endLine: 634,
    categories: [CAT.lakeTravis, CAT.planning],
    tags: [TAG.partyBoatAustin, TAG.lakeTravis, TAG.austin, TAG.partyPlanning],
    featured: false,
  },
  {
    startLine: 635, endLine: 659,
    categories: [CAT.bachelorette],
    tags: [TAG.bacheloretteParty, TAG.bacheloretteIdeas, TAG.austin, TAG.partyBoatAustin],
    featured: false,
  },
  {
    startLine: 661, endLine: 686,
    categories: [CAT.bachelor],
    tags: [TAG.bachelorParty, TAG.bachelorIdeas, TAG.austin, TAG.partyBoatAustin],
    featured: false,
  },
  {
    startLine: 688, endLine: 709,
    categories: [CAT.bachelorette, CAT.bachelor],
    tags: [TAG.bacheloretteParty, TAG.bachelorParty, TAG.lakeTravis, TAG.allInclusive],
    featured: false,
  },
  {
    startLine: 711, endLine: 729,
    categories: [CAT.bachelorette, CAT.austinTravel],
    tags: [TAG.bacheloretteParty, TAG.bacheloretteIdeas, TAG.austin],
    featured: false,
  },
  {
    startLine: 731, endLine: 749,
    categories: [CAT.bachelor, CAT.austinTravel],
    tags: [TAG.bachelorParty, TAG.bachelorIdeas, TAG.austin],
    featured: false,
  },
  {
    startLine: 751, endLine: 896,
    categories: [CAT.bachelorette, CAT.bachelor, CAT.planning],
    tags: [TAG.bacheloretteParty, TAG.bachelorParty, TAG.allInclusive, TAG.partyPlanning],
    featured: false,
  },
];

// ── Parse a single blog from line range ──────────────────────────────────────
function parseBlog(entry: BlogEntry) {
  const lines = allLines.slice(entry.startLine - 1, entry.endLine);
  const title = lines[0]?.trim() ?? '';

  let metaDescription = '';
  let contentStart = 1;
  if (lines[1]?.startsWith('Meta Description:')) {
    metaDescription = lines[1].replace(/^Meta Description:\s*/i, '').trim();
    contentStart = 2;
  }

  const contentLines = lines.slice(contentStart);
  const rawContent = contentLines.join('\n');
  const htmlContent = applyFixes(textToHtml(rawContent));

  // Word count from raw text (strip image ideas etc.)
  const cleanText = rawContent
    .replace(/^Image idea:.*$/gim, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleanText.split(' ').filter(w => w.length > 0);
  const wordCount = words.length;
  const readingTime = Math.ceil(wordCount / 200);

  // Excerpt from first real paragraph
  const firstPara = contentLines.find(l =>
    l.trim() && !l.startsWith('Image idea:') && l.length > 40
  ) ?? '';
  const excerpt = firstPara.slice(0, 250).trim() + (firstPara.length > 250 ? '...' : '');

  return {
    title,
    slug: slugify(title),
    metaDescription,
    content: htmlContent,
    excerpt,
    wordCount,
    readingTime,
    categories: entry.categories,
    tags: entry.tags,
    featured: entry.featured,
  };
}

// ── Main publish function ─────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting blog publish run — 16 ATX Disco posts\n');
  let successCount = 0;
  let skipCount = 0;

  for (let idx = 0; idx < BLOG_RANGES.length; idx++) {
    const entry = BLOG_RANGES[idx];
    const blog = parseBlog(entry);

    console.log(`[${idx + 1}/16] "${blog.title}"`);
    console.log(`       slug: ${blog.slug} | words: ${blog.wordCount}`);

    // Check for existing slug
    const existing = await db.execute(
      sql`SELECT id FROM blog_posts WHERE slug = ${blog.slug} LIMIT 1`
    );
    if ((existing.rows?.length ?? 0) > 0) {
      console.log(`       ⚠️  SKIPPED — slug already exists\n`);
      skipCount++;
      continue;
    }

    // Insert the post
    const result = await db.execute(sql`
      INSERT INTO blog_posts (
        title, slug, content, content_type, excerpt, meta_description,
        author_id, status, featured,
        word_count, reading_time, published_at, created_at, updated_at
      ) VALUES (
        ${blog.title},
        ${blog.slug},
        ${blog.content},
        'html',
        ${blog.excerpt},
        ${blog.metaDescription},
        ${AUTHOR_ID},
        'published',
        ${blog.featured},
        ${blog.wordCount},
        ${blog.readingTime},
        NOW(),
        NOW(),
        NOW()
      )
      RETURNING id
    `);

    const postId = (result.rows?.[0] as any)?.id ?? null;
    if (!postId) {
      console.log(`       ❌ Insert returned no ID\n`);
      continue;
    }

    // Categories
    for (let ci = 0; ci < blog.categories.length; ci++) {
      const catId = blog.categories[ci];
      await db.execute(sql`
        INSERT INTO blog_post_categories (post_id, category_id, is_primary)
        VALUES (${postId}, ${catId}, ${ci === 0})
        ON CONFLICT DO NOTHING
      `);
    }

    // Tags
    for (const tagId of blog.tags) {
      await db.execute(sql`
        INSERT INTO blog_post_tags (post_id, tag_id)
        VALUES (${postId}, ${tagId})
        ON CONFLICT DO NOTHING
      `);
    }

    console.log(`       ✅ Published (id: ${postId})\n`);
    successCount++;
  }

  console.log(`\n🏁 Done: ${successCount} published, ${skipCount} skipped.`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
