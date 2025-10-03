// scripts/reorganize-blog-posts.js
// Comprehensive SEO reorganization and optimization for all blog posts

import Database from "@replit/database";
import slugify from "slugify";

const db = new Database();

// Target keywords for SEO
const TARGET_KEYWORDS = {
  partyBoat: "party boat Austin",
  partyBoatLakeTravis: "party boat Lake Travis",
  bachelor: "bachelor party Austin",
  bachelorette: "bachelorette party Austin"
};

// Content silos (categories) configuration
const CATEGORIES = {
  partyBoatAustin: {
    id: "cat_party-boat-austin",
    name: "Party Boat Austin",
    slug: "party-boat-austin",
    description: "General party boat experiences and tips for Austin, Texas"
  },
  bachelorParty: {
    id: "cat_bachelor-party-austin",
    name: "Bachelor Party Austin",
    slug: "bachelor-party-austin",
    description: "Bachelor party ideas and planning guides for Austin"
  },
  bacheloretteParty: {
    id: "cat_bachelorette-party-austin",
    name: "Bachelorette Party Austin",
    slug: "bachelorette-party-austin",
    description: "Bachelorette party planning and ideas for Austin"
  },
  corporateEvents: {
    id: "cat_corporate-events",
    name: "Corporate Events",
    slug: "corporate-events",
    description: "Corporate team building and business events on Lake Travis"
  },
  weddings: {
    id: "cat_weddings",
    name: "Weddings",
    slug: "weddings",
    description: "Wedding-related boat events and celebrations"
  },
  specialEvents: {
    id: "cat_special-events",
    name: "Special Events",
    slug: "special-events",
    description: "Birthdays, graduations, holidays and other celebrations"
  },
  planningLogistics: {
    id: "cat_planning-logistics",
    name: "Planning & Logistics",
    slug: "planning-logistics",
    description: "Party planning guides, tips, and checklists"
  },
  safetyRegulations: {
    id: "cat_safety-regulations",
    name: "Safety & Regulations",
    slug: "safety-regulations",
    description: "Safety guidelines, insurance, and legal compliance"
  }
};

// Common tags for SEO
const COMMON_TAGS = {
  lakeTravis: { id: "tag_lake-travis", name: "Lake Travis", slug: "lake-travis" },
  austinParties: { id: "tag_austin-parties", name: "Austin Parties", slug: "austin-parties" },
  boatRental: { id: "tag_boat-rental", name: "Boat Rental", slug: "boat-rental" },
  partyPlanning: { id: "tag_party-planning", name: "Party Planning", slug: "party-planning" },
  summerActivities: { id: "tag_summer-activities", name: "Summer Activities", slug: "summer-activities" },
  groupEvents: { id: "tag_group-events", name: "Group Events", slug: "group-events" },
  waterActivities: { id: "tag_water-activities", name: "Water Activities", slug: "water-activities" },
  austinNightlife: { id: "tag_austin-nightlife", name: "Austin Nightlife", slug: "austin-nightlife" },
  partyIdeas: { id: "tag_party-ideas", name: "Party Ideas", slug: "party-ideas" },
  eventPlanning: { id: "tag_event-planning", name: "Event Planning", slug: "event-planning" }
};

// Categorization logic based on post content
function analyzeAndCategorize(post) {
  const title = (post.title || "").toLowerCase();
  const content = (post.content || "").toLowerCase();
  const excerpt = (post.excerpt || "").toLowerCase();
  const fullText = `${title} ${content} ${excerpt}`;
  
  const categories = [];
  const tags = [COMMON_TAGS.lakeTravis]; // Every post gets Lake Travis tag
  
  // Bachelor party detection
  if (fullText.includes("bachelor") && !fullText.includes("bachelorette")) {
    categories.push(CATEGORIES.bachelorParty);
    tags.push(COMMON_TAGS.austinParties, COMMON_TAGS.groupEvents, COMMON_TAGS.partyIdeas);
  }
  
  // Bachelorette party detection
  if (fullText.includes("bachelorette")) {
    categories.push(CATEGORIES.bacheloretteParty);
    tags.push(COMMON_TAGS.austinParties, COMMON_TAGS.groupEvents, COMMON_TAGS.partyIdeas);
  }
  
  // Corporate events detection
  if (fullText.match(/corporate|business|team[\s-]?building|company|client|professional/)) {
    categories.push(CATEGORIES.corporateEvents);
    tags.push(COMMON_TAGS.groupEvents, COMMON_TAGS.eventPlanning);
  }
  
  // Wedding detection
  if (fullText.match(/wedding|rehearsal[\s-]?dinner|bridal|reception/)) {
    categories.push(CATEGORIES.weddings);
    tags.push(COMMON_TAGS.eventPlanning);
  }
  
  // Special events detection
  if (fullText.match(/birthday|graduation|holiday|anniversary|sweet[\s-]?16|milestone/)) {
    categories.push(CATEGORIES.specialEvents);
    tags.push(COMMON_TAGS.partyIdeas, COMMON_TAGS.eventPlanning);
  }
  
  // Planning & logistics detection
  if (fullText.match(/plan|checklist|guide|tip|how[\s-]?to|budget|prepare|organize/)) {
    categories.push(CATEGORIES.planningLogistics);
    tags.push(COMMON_TAGS.partyPlanning, COMMON_TAGS.eventPlanning);
  }
  
  // Safety & regulations detection
  if (fullText.match(/safety|insurance|legal|regulation|law|permit|license|liability/)) {
    categories.push(CATEGORIES.safetyRegulations);
  }
  
  // If no specific category, default to Party Boat Austin
  if (categories.length === 0) {
    categories.push(CATEGORIES.partyBoatAustin);
    tags.push(COMMON_TAGS.austinParties, COMMON_TAGS.partyIdeas);
  }
  
  // Add contextual tags
  if (fullText.match(/summer|june|july|august/)) {
    tags.push(COMMON_TAGS.summerActivities);
  }
  if (fullText.match(/night|evening|sunset/)) {
    tags.push(COMMON_TAGS.austinNightlife);
  }
  if (fullText.match(/rental|book|reserve/)) {
    tags.push(COMMON_TAGS.boatRental);
  }
  if (fullText.match(/swim|water|lake|boat/)) {
    tags.push(COMMON_TAGS.waterActivities);
  }
  
  return {
    categories: categories.slice(0, 2), // Max 2 categories per post
    tags: [...new Set(tags)] // Remove duplicates
  };
}

// Optimize content with SEO keywords
function optimizeContent(post) {
  let content = post.content || "";
  const title = (post.title || "").toLowerCase();
  let needsOptimization = false;
  
  // Check if content already has target keywords
  const hasPartyBoatAustin = content.toLowerCase().includes("party boat austin") || 
                             content.toLowerCase().includes("party boat in austin");
  const hasLakeTravis = content.toLowerCase().includes("lake travis");
  
  // Add SEO-optimized introduction if missing key elements
  if (!hasPartyBoatAustin && !content.toLowerCase().includes("premier party cruises")) {
    needsOptimization = true;
    
    // Determine which keyword intro to add based on categorization
    let intro = "";
    
    if (title.includes("bachelor") && !title.includes("bachelorette")) {
      intro = `<p>Planning a <strong>bachelor party Austin</strong> celebration? Premier Party Cruises offers the ultimate <strong>party boat Lake Travis</strong> experience for your special event.</p>\n\n`;
    } else if (title.includes("bachelorette")) {
      intro = `<p>Looking for an unforgettable <strong>bachelorette party Austin</strong> experience? Our <strong>party boat Lake Travis</strong> cruises provide the perfect celebration venue.</p>\n\n`;
    } else if (title.includes("corporate") || title.includes("business") || title.includes("team")) {
      intro = `<p>Elevate your corporate event with a <strong>party boat Austin</strong> experience on beautiful Lake Travis. Premier Party Cruises specializes in professional team building and client entertainment.</p>\n\n`;
    } else if (title.includes("wedding")) {
      intro = `<p>Create magical memories with a <strong>party boat Lake Travis</strong> wedding celebration. Premier Party Cruises offers unique venues for rehearsal dinners and wedding parties in Austin.</p>\n\n`;
    } else {
      intro = `<p>Discover the best <strong>party boat Austin</strong> has to offer with Premier Party Cruises on Lake Travis. Whether you're celebrating a special occasion or just want to have fun on the water, we've got you covered.</p>\n\n`;
    }
    
    content = intro + content;
  }
  
  // Add internal links if missing
  const internalLinks = [
    { keyword: "party boat Austin", url: "/party-boat-austin", added: false },
    { keyword: "bachelor party Austin", url: "/bachelor-party-austin", added: false },
    { keyword: "bachelorette party Austin", url: "/bachelorette-party-austin", added: false },
    { keyword: "party boat Lake Travis", url: "/party-boat-lake-travis", added: false }
  ];
  
  // Add one relevant internal link per post (avoid over-optimization)
  for (const link of internalLinks) {
    if (title.includes(link.keyword.split(" ")[0].toLowerCase()) || 
        content.toLowerCase().includes(link.keyword.toLowerCase())) {
      
      // Check if link doesn't already exist
      if (!content.includes(link.url)) {
        // Add a contextual internal link paragraph at the end
        const linkParagraph = `\n\n<p>Learn more about our <a href="${link.url}">${link.keyword}</a> experiences and book your next celebration today!</p>`;
        
        if (!content.includes("Learn more about our")) {
          content = content + linkParagraph;
          needsOptimization = true;
        }
      }
      break; // Only add one internal link per post
    }
  }
  
  return {
    optimizedContent: content,
    wasOptimized: needsOptimization
  };
}

// Generate SEO-optimized excerpt
function generateSEOExcerpt(post, categories) {
  const title = post.title || "Party Experience";
  const primaryCategory = categories[0]?.name || "Party Boat";
  
  // Create keyword-rich excerpt
  let excerpt = "";
  
  if (title.toLowerCase().includes("bachelor")) {
    excerpt = `Plan the ultimate bachelor party Austin experience on Lake Travis. ${title} - discover why our party boat cruises are perfect for unforgettable celebrations.`;
  } else if (title.toLowerCase().includes("bachelorette")) {
    excerpt = `Create memories with a bachelorette party Austin celebration on our Lake Travis party boats. ${title} - your guide to the perfect party boat experience.`;
  } else {
    excerpt = `${title} - Experience the best party boat Austin has to offer on Lake Travis with Premier Party Cruises. Your ultimate guide to ${primaryCategory.toLowerCase()} celebrations.`;
  }
  
  // Truncate to reasonable length
  return excerpt.length > 200 ? excerpt.slice(0, 197) + "..." : excerpt;
}

// Main reorganization function
async function reorganizeBlogPosts() {
  console.log("🚀 Starting blog post reorganization and SEO optimization...\n");
  
  try {
    // Step 1: Fetch all post slugs from index
    console.log("📥 Step 1: Fetching all posts from Replit DB...");
    const postsIndexRaw = await db.get("index:posts");
    const postSlugs = Array.isArray(postsIndexRaw) ? postsIndexRaw : (postsIndexRaw?.value || []);
    
    console.log(`   Found ${postSlugs.length} posts in index\n`);
    
    if (postSlugs.length === 0) {
      console.log("❌ No posts found in database!");
      return;
    }
    
    // Step 2: Update categories in database
    console.log("📁 Step 2: Creating/updating category definitions...");
    for (const [key, category] of Object.entries(CATEGORIES)) {
      await db.set(`category:${category.slug}`, category);
    }
    console.log(`   ✓ Created ${Object.keys(CATEGORIES).length} categories\n`);
    
    // Step 3: Update tags in database
    console.log("🏷️  Step 3: Creating/updating tag definitions...");
    for (const [key, tag] of Object.entries(COMMON_TAGS)) {
      await db.set(`tag:${tag.slug}`, tag);
    }
    console.log(`   ✓ Created ${Object.keys(COMMON_TAGS).length} tags\n`);
    
    // Step 4: Process each post
    console.log("🔄 Step 4: Processing and optimizing posts...\n");
    
    let processedCount = 0;
    let optimizedCount = 0;
    let errors = [];
    
    for (const slug of postSlugs) {
      try {
        // Fetch post
        const postRaw = await db.get(`post:${slug}`);
        const post = postRaw?.value || postRaw;
        
        if (!post) {
          errors.push(`Post not found: ${slug}`);
          continue;
        }
        
        // Analyze and categorize
        const { categories, tags } = analyzeAndCategorize(post);
        
        // Optimize content
        const { optimizedContent, wasOptimized } = optimizeContent(post);
        
        // Generate SEO excerpt
        const seoExcerpt = generateSEOExcerpt(post, categories);
        
        // Update post with new data
        const updatedPost = {
          ...post,
          categories,
          tags,
          content: optimizedContent,
          excerpt: seoExcerpt,
          seoOptimized: true,
          lastOptimized: new Date().toISOString()
        };
        
        // Save back to database
        await db.set(`post:${slug}`, updatedPost);
        
        processedCount++;
        if (wasOptimized) optimizedCount++;
        
        // Log progress
        const categoryNames = categories.map(c => c.name).join(", ");
        console.log(`   ✓ [${processedCount}/${postSlugs.length}] ${post.title}`);
        console.log(`     Categories: ${categoryNames}`);
        console.log(`     Tags: ${tags.length} applied`);
        if (wasOptimized) {
          console.log(`     🎯 Content optimized with target keywords`);
        }
        console.log("");
        
      } catch (error) {
        errors.push(`Error processing ${slug}: ${error.message}`);
        console.error(`   ❌ Error processing ${slug}:`, error.message);
      }
    }
    
    // Step 5: Summary report
    console.log("\n" + "=".repeat(60));
    console.log("✅ REORGANIZATION COMPLETE!");
    console.log("=".repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   • Total posts processed: ${processedCount}/${postSlugs.length}`);
    console.log(`   • Posts with content optimization: ${optimizedCount}`);
    console.log(`   • Categories created: ${Object.keys(CATEGORIES).length}`);
    console.log(`   • Tags created: ${Object.keys(COMMON_TAGS).length}`);
    
    if (errors.length > 0) {
      console.log(`\n⚠️  Errors encountered: ${errors.length}`);
      errors.forEach(err => console.log(`   - ${err}`));
    }
    
    console.log("\n🎯 SEO Optimization Applied:");
    console.log(`   • Target keywords: ${Object.values(TARGET_KEYWORDS).join(", ")}`);
    console.log(`   • Internal links: Added to relevant posts`);
    console.log(`   • Meta descriptions: Regenerated with keywords`);
    console.log(`   • Content silos: All posts categorized`);
    
    console.log("\n📈 Category Distribution:");
    const categoryCount = {};
    for (const slug of postSlugs) {
      const postRaw = await db.get(`post:${slug}`);
      const post = postRaw?.value || postRaw;
      if (post?.categories) {
        post.categories.forEach(cat => {
          categoryCount[cat.name] = (categoryCount[cat.name] || 0) + 1;
        });
      }
    }
    Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .forEach(([name, count]) => {
        console.log(`   • ${name}: ${count} posts`);
      });
    
    console.log("\n🚀 All posts are now optimized for SEO!");
    console.log("   Visit your blog to see the improvements.\n");
    
  } catch (error) {
    console.error("\n❌ Fatal error during reorganization:", error);
    throw error;
  }
}

// Run the reorganization
reorganizeBlogPosts()
  .then(() => {
    console.log("✅ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
