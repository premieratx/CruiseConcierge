// scripts/import-wxr.js
// Import WordPress WXR into Replit DB, shaped for your app's API schema.
// Enhanced with AI optimization for Premier Party Cruises event categories

import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";
import { JSDOM } from "jsdom";
import slugify from "slugify";
import { nanoid } from "nanoid";
import Database from "@replit/database";

const db = new Database();
const WXR_FILE = process.env.FILE || "data/wordpress-export.xml";

// ---------- helpers ----------
const STOP = new Set([
  "with","that","this","from","will","your","have","been","they","them","their",
  "into","about","when","what","where","which","while","there","then","than",
  "also","because","just","make","like","over","such","some","more","most","less",
  "very","much","many","each","every","after","before","between","among","other",
  "ours","ourselves","hers","herself","himself","themselves","ours","were","have",
  "been","being","within","without","under","above","below","across","toward",
  "towards","around","again","even","ever","never","could","should","would"
]);

// Enhanced brand seeds for AI optimization
const BRAND_SEEDS = [
  "premier party cruises","party on delivery","atx disco cruise",
  "lake travis","austin","bachelorette","bachelor","party boat","boat cruise",
  "corporate event","wedding","alcohol delivery","concierge","airbnb","itinerary",
  // Additional event category seeds for AI optimization
  "corporate events","wedding parties","bachelor party","bachelorette party",
  "birthday parties","graduation party","team building","client entertainment",
  "rehearsal dinner","bridal shower","anniversary celebration"
];

// Event category templates for AI optimization
const EVENT_ENHANCEMENTS = {
  "corporate": [
    "Whether you're planning a corporate retreat, client entertainment event, or team building experience on Lake Travis, our Premier Party Cruises fleet offers the perfect venue for professional gatherings.",
    "Make your next corporate event unforgettable with our exclusive Lake Travis boat charters. From team building activities to client entertainment, we provide a unique Austin business experience.",
    "Corporate events on Lake Travis create lasting impressions. Our professional crew and Party on Delivery alcohol service ensure your business gathering exceeds expectations."
  ],
  "wedding": [
    "Planning a wedding celebration or rehearsal dinner? Our Lake Travis wedding party cruises offer a magical Austin venue for your special day.",
    "Create unforgettable wedding memories with Premier Party Cruises. From bridal showers to rehearsal dinners, our boats provide the perfect romantic Lake Travis setting.",
    "Wedding parties love our Lake Travis cruises for bachelor and bachelorette celebrations, rehearsal dinners, and anniversary parties. Party on Delivery handles all your beverage needs."
  ],
  "bachelor": [
    "Bachelor parties find the ultimate Austin experience aboard our Lake Travis party boats. Professional crew, premium sound systems, and Party on Delivery service make it legendary.",
    "Looking for an epic bachelor party venue? Our Austin Lake Travis cruises offer the perfect combination of adventure and celebration for unforgettable memories.",
    "Bachelor party groups choose Premier Party Cruises for our exclusive Lake Travis experience. Add Party on Delivery alcohol service for the complete Austin celebration."
  ],
  "bachelorette": [
    "Bachelorette parties love our Lake Travis disco cruises! Dance under the stars while enjoying Austin's most beautiful waterway with your best friends.",
    "Plan the perfect bachelorette party with Premier Party Cruises. Our ATX Disco experience and Party on Delivery service create magical Austin memories.",
    "Bachelorette celebrations become extraordinary on Lake Travis. Our party boats offer the ideal Austin venue for pre-wedding festivities with friends."
  ],
  "birthday": [
    "Birthday celebrations reach new heights aboard our Lake Travis party boats. From milestone birthdays to intimate gatherings, we make Austin celebrations special.",
    "Make your birthday unforgettable with a Premier Party Cruises Lake Travis experience. Our crew and Party on Delivery service handle everything for your special day.",
    "Birthday parties on Lake Travis offer a unique Austin celebration venue. Our boats accommodate groups of all sizes for memorable milestone moments."
  ],
  "graduation": [
    "Graduation parties deserve special celebration! Our Lake Travis cruises provide the perfect Austin venue to honor academic achievements with family and friends.",
    "Celebrate graduation milestones with Premier Party Cruises. Our Lake Travis boats offer a unique Austin venue for honoring educational accomplishments.",
    "Graduation celebrations become extraordinary on Lake Travis. Party on Delivery ensures your achievement party has everything needed for success."
  ]
};

// Service integration templates
const SERVICE_CALLOUTS = [
  "Enhance your Lake Travis experience with Party on Delivery's premium alcohol service, featuring curated selections delivered directly to your departure point.",
  "Our partnership with Party on Delivery ensures your Lake Travis adventure includes top-shelf beverages, craft cocktails, and premium wine selections.",
  "Complete your Austin party boat experience with Party on Delivery's professional alcohol service, handling all beverage logistics for seamless celebrations.",
  "Party on Delivery's expert team coordinates perfectly with Premier Party Cruises, providing premium beverages that elevate your Lake Travis celebration."
];

function htmlToText(html) {
  const dom = new JSDOM(html || "");
  return dom.window.document.body.textContent || "";
}

function firstParagraph(html) {
  const dom = new JSDOM(html || "");
  const p = dom.window.document.querySelector("p");
  return (p?.textContent || "").replace(/\s+/g, " ").trim();
}

function excerpt(html, max = 240) {
  const txt = firstParagraph(html);
  return txt.length > max ? txt.slice(0, max - 1) + "…" : txt;
}

function normalizeHTML(html, title) {
  const dom = new JSDOM(html || "");
  const doc = dom.window.document;

  // Ensure H1 exists and is properly centered
  if (!doc.querySelector("h1") && title) {
    const h1 = doc.createElement("h1");
    h1.textContent = title;
    h1.setAttribute("style", "text-align: center; margin: 2rem 0; font-size: 2.5rem; font-weight: bold; color: #1e40af;");
    doc.body.insertBefore(h1, doc.body.firstChild);
  }

  // Center and style all headings
  doc.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading, i) => {
    const currentStyle = heading.getAttribute("style") || "";
    heading.setAttribute("style", currentStyle + "text-align: center; margin: 1.5rem 0; color: #1e40af;");
  });

  // Make images responsive and properly centered with Premier branding
  doc.querySelectorAll("img").forEach((img, i) => {
    if (!img.getAttribute("alt") || img.getAttribute("alt").trim() === "") {
      img.setAttribute("alt", `${title} — Premier Party Cruises & Party On Delivery — image ${i + 1}`);
    }
    img.removeAttribute("loading");
    img.removeAttribute("decoding");
    img.removeAttribute("width");
    img.removeAttribute("height");
    
    // Center and make responsive
    img.setAttribute("style", "max-width:100%; height:auto; display:block; margin:2rem auto; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);");
    
    // Wrap in figure for better styling
    const figure = doc.createElement("figure");
    figure.setAttribute("style", "text-align: center; margin: 2rem 0;");
    img.parentNode.insertBefore(figure, img);
    figure.appendChild(img);
    
    if (img.getAttribute("alt")) {
      const caption = doc.createElement("figcaption");
      caption.textContent = img.getAttribute("alt");
      caption.setAttribute("style", "font-style: italic; color: #6b7280; margin-top: 0.5rem;");
      figure.appendChild(caption);
    }
  });

  // Center text blocks and improve typography
  doc.querySelectorAll("p").forEach(p => {
    const currentStyle = p.getAttribute("style") || "";
    p.setAttribute("style", currentStyle + "text-align: justify; line-height: 1.6; margin: 1rem 0; max-width: 800px; margin-left: auto; margin-right: auto;");
  });

  // Style lists
  doc.querySelectorAll("ul, ol").forEach(list => {
    const currentStyle = list.getAttribute("style") || "";
    list.setAttribute("style", currentStyle + "max-width: 800px; margin: 1rem auto; padding-left: 2rem;");
  });

  return "<!-- normalized & enhanced -->\n" + doc.body.innerHTML;
}

function detectCentralTopic(text, title) {
  const baseline = (title + " " + text).toLowerCase();

  // Enhanced topic detection for event categories
  const eventCategories = {
    "corporate": ["corporate", "business", "team", "client", "meeting", "conference", "retreat", "professional"],
    "wedding": ["wedding", "bridal", "bride", "groom", "marriage", "ceremony", "rehearsal", "anniversary"],
    "bachelor": ["bachelor", "groom", "guys", "men", "stag"],
    "bachelorette": ["bachelorette", "bride", "girls", "women", "hen"],
    "birthday": ["birthday", "celebration", "anniversary", "milestone", "party"],
    "graduation": ["graduation", "graduate", "degree", "diploma", "achievement", "school", "university"]
  };

  // Check for event categories first
  for (const [category, keywords] of Object.entries(eventCategories)) {
    const matches = keywords.filter(keyword => baseline.includes(keyword));
    if (matches.length > 0) {
      return `${category} events`;
    }
  }

  // Seed match
  const counts = {};
  for (const s of BRAND_SEEDS) {
    const re = new RegExp("\\b" + s.replace(/\s+/g, "\\s+") + "\\b", "g");
    counts[s] = (baseline.match(re) || []).length;
  }
  const topSeed = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0];
  if (topSeed && topSeed[1] > 0) return topSeed[0];

  // Fallback: frequent bigrams
  const words = baseline.replace(/[^a-z0-9\s]/g," ").split(/\s+/)
    .filter(w=>w.length>3 && !STOP.has(w));
  const bigrams = {};
  for (let i=0;i<words.length-1;i++){
    const k = words[i]+" "+words[i+1];
    bigrams[k] = (bigrams[k]||0)+1;
  }
  const top = Object.entries(bigrams).sort((a,b)=>b[1]-a[1])[0]?.[0];
  return top || (words[0] || "austin party boat");
}

function extractTopicTerms(text, limit=12) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/)
    .filter(w=>w.length>3 && !STOP.has(w));
  const freq = {};
  for (const w of words) freq[w]=(freq[w]||0)+1;

  return Object.entries(freq).sort((a,b)=>b[1]-a[1])
    .map(([w])=>w)
    .filter(w=>!["premier","party","cruises","delivery","austin","travis","lake"].includes(w))
    .slice(0,limit);
}

function focusKeywords(central, terms) {
  const base = [
    "Premier Party Cruises",
    "Party On Delivery",
    "ATX Disco Cruise",
    "Austin bachelorette boat",
    "Lake Travis party boat"
  ];
  const variants = [
    `${central}`,
    `${central} Austin`,
    `${central} Lake Travis`,
    ...terms.slice(0,3).map(t=>`${t} Austin`),
    ...terms.slice(3,6).map(t=>`${t} Lake Travis`)
  ];
  return Array.from(new Set([...base, ...variants].map(s=>s.trim()).filter(Boolean))).slice(0,10);
}

function enhanceContent(content, centralTopic, title) {
  const dom = new JSDOM(content || "");
  const doc = dom.window.document;
  
  // Detect event category
  let eventCategory = "general";
  const topicLower = centralTopic.toLowerCase();
  
  if (topicLower.includes("corporate") || topicLower.includes("business")) eventCategory = "corporate";
  else if (topicLower.includes("wedding") || topicLower.includes("bridal")) eventCategory = "wedding";
  else if (topicLower.includes("bachelor")) eventCategory = "bachelor";
  else if (topicLower.includes("bachelorette")) eventCategory = "bachelorette";
  else if (topicLower.includes("birthday")) eventCategory = "birthday";
  else if (topicLower.includes("graduation")) eventCategory = "graduation";

  // Add event-specific enhancement
  if (eventCategory !== "general" && EVENT_ENHANCEMENTS[eventCategory]) {
    const enhancements = EVENT_ENHANCEMENTS[eventCategory];
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    
    // Find a good place to insert (after first H2 or before last paragraph)
    const firstH2 = doc.querySelector("h2");
    const allParagraphs = doc.querySelectorAll("p");
    
    const enhancementDiv = doc.createElement("div");
    enhancementDiv.innerHTML = `<p style="background: linear-gradient(to right, #eff6ff, #dbeafe); padding: 1.5rem; border-left: 4px solid #1e40af; margin: 2rem auto; max-width: 800px; border-radius: 0 8px 8px 0; font-style: italic;">${randomEnhancement}</p>`;
    
    if (firstH2) {
      firstH2.parentNode.insertBefore(enhancementDiv.firstChild, firstH2.nextSibling);
    } else if (allParagraphs.length > 1) {
      const lastParagraph = allParagraphs[allParagraphs.length - 1];
      lastParagraph.parentNode.insertBefore(enhancementDiv.firstChild, lastParagraph);
    } else {
      doc.body.appendChild(enhancementDiv.firstChild);
    }
  }

  // Add service callout (1 in 3 posts gets this)
  if (Math.random() < 0.33) {
    const randomCallout = SERVICE_CALLOUTS[Math.floor(Math.random() * SERVICE_CALLOUTS.length)];
    const calloutDiv = doc.createElement("div");
    calloutDiv.innerHTML = `<div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 1rem; margin: 2rem auto; max-width: 800px; border-radius: 8px; text-align: center;"><p style="margin: 0; color: #15803d; font-weight: 500;">${randomCallout}</p></div>`;
    
    const allParagraphs = doc.querySelectorAll("p");
    if (allParagraphs.length > 0) {
      const lastParagraph = allParagraphs[allParagraphs.length - 1];
      lastParagraph.parentNode.insertBefore(calloutDiv.firstChild, lastParagraph.nextSibling);
    } else {
      doc.body.appendChild(calloutDiv.firstChild);
    }
  }

  return doc.body.innerHTML;
}

function slug(s) {
  return slugify(s || "post", { lower:true, strict:true });
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
  // Handle case where category might be a single item or not exist
  const categories = item.category;
  let arr = [];
  
  if (categories) {
    // If it's an array, use it directly
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
      // If it's a single item, wrap in array
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

// Replit DB helpers
async function setIfMissing(key, value) {
  const existing = await db.get(key);
  if (!existing) await db.set(key, value);
}

async function pushIndex(indexKey, value) {
  let arr = await db.get(indexKey);
  
  // Ensure we have an array
  if (!Array.isArray(arr)) {
    arr = [];
  }
  
  if (!arr.includes(value)) {
    arr.push(value);
    await db.set(indexKey, arr);
  }
}

async function pushIndexSortedByDate(listKey, slug, dateIso) {
  let list = await db.get(listKey);
  
  // Ensure we have an array
  if (!Array.isArray(list)) {
    list = [];
  }
  
  const filtered = list.filter(s=>s!==slug);
  await db.set(`date:${slug}`, dateIso || null);
  filtered.push(slug);
  
  const withDates = await Promise.all(filtered.map(async s=>{
    const d = await db.get(`date:${s}`);
    return { s, d: d ? new Date(d).getTime() : 0 };
  }));
  withDates.sort((a,b)=>b.d - a.d);
  await db.set(listKey, withDates.map(o=>o.s));
}

// Main import function
(async ()=>{
  console.log("🚀 Starting WordPress import with AI optimization...");
  
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
  let enhanced = 0;

  for (const it of items) {
    const postType = it["post_type"] || it["wp:post_type"] || "post";
    if (postType !== "post") continue;

    const wpTitle = it.title || "Untitled";
    const wpContent = it["content:encoded"] || it["encoded"] || "";
    const wpSlug = it["wp:post_name"] || wpTitle;
    const link = it.link || null;
    const date = it["pubDate"] || it["wp:post_date"] || it["wp:post_date_gmt"] || null;
    const publishedAt = date ? new Date(date).toISOString() : null;

    const authorName = it["dc:creator"] || it["wp:author_display_name"] || "Premier Team";
    const author = authorObj(authorName);
    await setIfMissing(`author:${author.slug}`, author);

    // Categories and tags
    const cats = wpTaxItems(it, "category").map(x=>toCategory(x.name));
    const tags = wpTaxItems(it, "tag").map(x=>toTag(x.name));

    // Featured image handling
    let featuredImage = null;
    let featuredImageAlt = null;
    const postmeta = it["wp:postmeta"] || [];
    for (const m of postmeta) {
      const key = m["wp:meta_key"] || m["meta_key"];
      const val = m["wp:meta_value"] || m["meta_value"];
      if (key === "_thumbnail_url") featuredImage = val;
      if (key === "_thumbnail_alt") featuredImageAlt = val;
    }

    // Content processing with AI optimization
    let content = normalizeHTML(wpContent, wpTitle);
    const text = htmlToText(content);
    const central = detectCentralTopic(text, wpTitle);
    const terms = extractTopicTerms(text, 10);
    const keywords = focusKeywords(central, terms);

    // Enhance content with event-specific information
    content = enhanceContent(content, central, wpTitle);
    if (content.includes("background: linear-gradient") || content.includes("Party on Delivery")) {
      enhanced++;
    }

    const post = {
      id: `post_${nanoid(10)}`,
      title: wpTitle,
      content,
      excerpt: excerpt(content),
      slug: slug(wpSlug),
      status: "published",
      publishedAt,
      featuredImage: featuredImage || undefined,
      featuredImageAlt: featuredImageAlt || undefined,
      author,
      categories: cats,
      tags: [
        ...tags,
        ...keywords.map(k=>toTag(k))
      ]
    };

    // Save to Replit DB
    await db.set(`post:${post.slug}`, post);

    // Update indexes
    await pushIndexSortedByDate("index:posts", post.slug, post.publishedAt);
    await pushIndex(`index:author:${author.slug}:posts`, post.slug);

    for (const c of cats) {
      await setIfMissing(`category:${c.slug}`, c);
      await pushIndex(`index:category:${c.slug}:posts`, post.slug);
    }
    
    for (const t of post.tags) {
      await setIfMissing(`tag:${t.slug}`, t);
      await pushIndex(`index:tag:${t.slug}:posts`, post.slug);
    }

    // Search index
    const searchable = `${post.title}\n${post.excerpt}\n${text}`.toLowerCase();
    await db.set(`search:${post.slug}`, searchable);

    imported++;
    if (imported % 10 === 0) console.log(`Imported ${imported} posts... (${enhanced} enhanced)`);
  }

  console.log(`✅ Import complete!`);
  console.log(`📊 Total imported: ${imported} posts`);
  console.log(`🎯 AI enhanced: ${enhanced} posts`);
  console.log(`🚀 Your blog is ready with optimized content!`);
})();