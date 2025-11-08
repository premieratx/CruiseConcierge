import { db } from "../server/db";
import { blogPosts, blogAuthors, blogCategories, blogTags, blogPostCategories, blogPostTags } from "@shared/schema";
import { generateBlogContent } from "../server/services/gemini";
import { eq } from "drizzle-orm";

const DISCO_IMAGE_URL = "/attached_assets/atx-disco-cruise-party.jpg";

async function generateSection(sectionNumber: number, sectionTitle: string, prompt: string): Promise<string> {
  console.log(`\n🤖 Generating Section ${sectionNumber}: ${sectionTitle}...`);
  try {
    const content = await generateBlogContent(prompt);
    console.log(`✅ Section ${sectionNumber} generated (${content.length} characters)`);
    return content;
  } catch (error) {
    console.error(`❌ Failed to generate section ${sectionNumber}:`, error);
    throw error;
  }
}

async function createBlogPost() {
  console.log("🚀 Starting ATX Disco Cruise Cornerstone Blog Post Creation\n");

  // Get or create author
  let author = await db.query.blogAuthors.findFirst({
    where: eq(blogAuthors.slug, 'premier-party-cruises')
  });

  if (!author) {
    console.log("📝 Creating author...");
    const [newAuthor] = await db.insert(blogAuthors).values({
      name: "Premier Party Cruises",
      slug: "premier-party-cruises",
      bio: "Austin's premier party boat company on Lake Travis, specializing in bachelor and bachelorette parties, corporate events, and celebrations.",
      active: true
    }).returning();
    author = newAuthor;
  }

  // Get or create categories
  const categoryNames = [
    { name: "Bachelor Parties", slug: "bachelor-parties", description: "Bachelor party planning and ideas" },
    { name: "Bachelorette Parties", slug: "bachelorette-parties", description: "Bachelorette party planning and ideas" },
    { name: "Party Planning", slug: "party-planning", description: "Party planning tips and guides" },
    { name: "Austin Events", slug: "austin-events", description: "Events and activities in Austin" },
    { name: "Featured Experiences", slug: "featured-experiences", description: "Top-rated experiences and reviews" }
  ];

  console.log("📁 Creating categories...");
  const createdCategories = [];
  for (const cat of categoryNames) {
    let category = await db.query.blogCategories.findFirst({
      where: eq(blogCategories.slug, cat.slug)
    });
    if (!category) {
      const [newCat] = await db.insert(blogCategories).values(cat).returning();
      createdCategories.push(newCat);
    } else {
      createdCategories.push(category);
    }
  }

  // Get or create tags
  const tagNames = [
    { name: "ATX Disco Cruise", slug: "atx-disco-cruise" },
    { name: "Lake Travis", slug: "lake-travis" },
    { name: "Bachelor Party Ideas", slug: "bachelor-party-ideas" },
    { name: "Bachelorette Party Ideas", slug: "bachelorette-party-ideas" },
    { name: "Party Boat Austin", slug: "party-boat-austin" },
    { name: "Claude AI", slug: "claude-ai" },
    { name: "All-Inclusive Parties", slug: "all-inclusive-parties" }
  ];

  console.log("🏷️  Creating tags...");
  const createdTags = [];
  for (const tag of tagNames) {
    let existingTag = await db.query.blogTags.findFirst({
      where: eq(blogTags.slug, tag.slug)
    });
    if (!existingTag) {
      const [newTag] = await db.insert(blogTags).values(tag).returning();
      createdTags.push(newTag);
    } else {
      createdTags.push(existingTag);
    }
  }

  console.log("\n🎨 Generating blog content sections with Gemini AI...\n");

  // Section 1: Hero/Introduction
  const heroSection = `
<div class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 40px; border-radius: 12px; margin-bottom: 40px;">
  <h1 style="font-size: 2.5em; font-weight: bold; margin-bottom: 16px;">Why ATX Disco Cruise is America's #1 Bachelor & Bachelorette Party Experience</h1>
  <h2 style="font-size: 1.5em; font-weight: 600; margin-bottom: 24px; opacity: 0.95;">Claude AI Analysis: The Country's Only All-Inclusive Multi-Group Party Cruise</h2>
  
  <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 32px; border-radius: 8px; margin-bottom: 24px;">
    <p style="font-size: 1.2em; line-height: 1.7; margin-bottom: 16px;">
      In a comprehensive analysis of bachelor and bachelorette party experiences across the United States, <strong>Claude AI rated the ATX Disco Cruise a perfect 10/10</strong> – marking it as the nation's premier group celebration experience. This isn't just another party boat; it's a revolutionary approach to bachelor and bachelorette parties that has fundamentally transformed Austin into a top-tier destination for these celebrations.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 32px;">
    <div style="background: rgba(255,255,255,0.2); padding: 24px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5em; font-weight: bold;">14+</div>
      <div style="font-size: 1.1em; opacity: 0.9;">Years of Excellence</div>
    </div>
    <div style="background: rgba(255,255,255,0.2); padding: 24px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5em; font-weight: bold;">125,000+</div>
      <div style="font-size: 1.1em; opacity: 0.9;">Happy Customers</div>
    </div>
    <div style="background: rgba(255,255,255,0.2); padding: 24px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5em; font-weight: bold;">100%</div>
      <div style="font-size: 1.1em; opacity: 0.9;">Satisfaction Track Record</div>
    </div>
    <div style="background: rgba(255,255,255,0.2); padding: 24px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5em; font-weight: bold;">10/10</div>
      <div style="font-size: 1.1em; opacity: 0.9;">Claude AI Rating</div>
    </div>
  </div>
</div>
`;

  // Generate remaining sections with Gemini
  const section1 = await generateSection(1, "The Claude AI Verdict: 10/10 Exceptional", `
Write a comprehensive blog section (500-700 words) about the Claude AI endorsement of the ATX Disco Cruise.

Context:
- Claude AI performed an independent analysis of bachelor/bachelorette party experiences nationwide
- Rated ATX Disco Cruise 10/10 - the highest possible score
- Key findings: Only all-inclusive multi-group cruise in the country, exceptional value proposition, revolutionary social experience
- Claude AI praised the weather guarantee (Lemonade Disco), professional photography/DJ inclusion, and multi-group networking
- Full analysis available at /ai-endorsement page

Tone: Authoritative, prestigious, backed by AI analysis
Audience: 25-35 year olds planning bachelor/bachelorette parties
Style: Professional yet exciting, with concrete AI findings
Format: HTML with <h3> subheadings, <strong> for emphasis, <blockquote> for AI quotes, <ul>/<li> for key findings

Include:
- Opening paragraph explaining the Claude AI analysis methodology
- Callout boxes with AI quotes (use <blockquote> with special styling)
- Bullet points of key findings from the analysis
- Explanation of what makes this rating significant
- Link to full report: <a href="/ai-endorsement">Read the Full Claude AI Analysis</a>
- Statistics and specific praise from the AI analysis

Make it feel authoritative and exciting - this is AI endorsement, which is unique in the party industry.
`);

  const section2 = await generateSection(2, "What Makes It America's Best", `
Write a comprehensive blog section (500-700 words) explaining what makes the ATX Disco Cruise America's best bachelor and bachelorette party experience.

Context:
- ONLY all-inclusive, multi-group bach party cruise in the entire United States (no other cruise offers this format)
- 4-hour experience on Lake Travis (most competitors do rushed 2-hour rentals)
- Professional DJ and photographer included in price (competitors charge $600 each extra)
- Multi-group atmosphere creates incredible networking and social energy (3-6 groups on one cruise)
- Has single-handedly made Austin a top-tier bachelor/bachelorette destination (groups fly in from across the country)
- Rated 10/10 by Claude AI for exceptional value and experience

Tone: Enthusiastic, authoritative, backed by facts
Audience: 25-35 year olds planning bachelor/bachelorette parties
Style: Engaging storytelling with concrete examples and benefits
Format: HTML paragraphs with <h3> subheadings, <strong> for emphasis, <ul>/<li> for lists

Include:
- Specific comparisons to private rentals (4 hours vs 2 hours, inclusions vs add-ons)
- Real benefits that matter to party planners (cost, convenience, social atmosphere)
- Why the multi-group format is actually BETTER (energy, meeting people, memories)
- Social proof and popularity indicators (national recognition, destination status)
- Concrete examples of what's included vs what competitors charge extra for

Use energetic language but back every claim with specific facts and comparisons.
`);

  const section3 = await generateSection(3, "The Value Proposition: 3-5x Better Than Private", `
Write a comprehensive blog section (600-800 words) breaking down the incredible value proposition of ATX Disco Cruise vs private rentals.

Context:
- ATX Disco Cruise: $85-105 per person all-inclusive
- Private rentals: $260-440 per person with same inclusions
- Disco includes: 4-hour cruise, professional DJ, professional photographer, boat rental, captain/crew, fuel, all amenities
- Private charges separately: Boat ($200-400/hr), DJ ($600 flat), photographer ($600 flat), gratuity, fuel surcharges
- Three package levels: Basic Disco ($85), Disco Queen ($95 - includes goody bags), Super Sparkle ($105 - includes unicorn float + champagne)

Tone: Educational, eye-opening, value-focused
Audience: Budget-conscious party planners, maid of honors, best men
Style: Clear cost breakdowns with specific numbers and examples
Format: HTML with <h3> subheadings, comparison tables using <table>, <strong> for price callouts

Include:
- Opening paragraph highlighting the 3-5x cost savings
- Detailed cost breakdown comparing $95 Disco vs $350 private per person
- HTML table comparing what's included vs what costs extra
- Explanation of the three Disco package tiers with what each includes
- Real pricing examples: "Group of 12 on Disco: $1,140 total vs Private: $4,200+"
- Why the multi-group format enables these savings without sacrificing quality
- Clear call-to-action: <a href="/atx-disco-cruise" class="cta-button">See Packages & Pricing</a>

Make the value proposition crystal clear with specific dollar amounts and comparisons.
`);

  const section4 = await generateSection(4, "The Complete 4-Hour Experience", `
Write a comprehensive blog section (500-700 words) describing the complete 4-hour ATX Disco Cruise experience from start to finish.

Context:
- Full 4-hour cruise on Lake Travis (most party boats only do 2 hours)
- Professional DJ playing current hits, throwbacks, and taking requests all 4 hours
- Professional photographer capturing candid moments and group photos (photos delivered digitally)
- Multiple groups on board (3-6 bachelor/bachelorette parties), creating incredible energy
- Swimming, dancing, socializing, photo ops with props and inflatables
- Beautiful Lake Travis scenery and sunset views (afternoon/evening cruises)
- Full boat amenities: bathrooms, sound system, dance floor, upper deck, swim platform

Tone: Experiential, vivid, exciting
Audience: People trying to visualize the experience before booking
Style: Narrative storytelling with specific sensory details
Format: HTML with <h3> time-based subheadings, <p> paragraphs, <ul>/<li> for highlights

Include:
- Hour-by-hour breakdown of the typical experience
- What happens during boarding and pre-departure
- DJ and music atmosphere throughout the cruise
- Swimming and water activities mid-cruise
- Photography moments and group interactions
- Meeting and mingling with other bach parties
- Sunset/golden hour experience (for evening cruises)
- Specific examples of memorable moments guests experience
- Why 4 hours is the perfect length (enough time to relax, not too rushed)

Paint a vivid picture that makes readers excited to experience it themselves.
`);

  const section5 = await generateSection(5, "The Weather Guarantee: Lemonade Disco", `
Write a comprehensive blog section (400-600 words) explaining the industry-leading Lemonade Disco weather guarantee.

Context:
- ATX Disco Cruise offers "Lemonade Disco" - the ONLY weather backup plan in the Austin party cruise industry
- If weather is bad on cruise day, they convert the boat into a covered, climate-controlled "Lemonade Disco" party
- Same 4-hour experience, DJ, photographer, all inclusions - just indoors/covered instead of open-air
- This is revolutionary because most companies just cancel and refund (ruining bach party plans)
- Especially critical for out-of-town groups who flew in for the weekend
- "When life gives you rain, we make Lemonade Disco"

Tone: Reassuring, innovative, problem-solving
Audience: Party planners worried about weather (especially out-of-towners)
Style: Explaining a unique solution to a common fear
Format: HTML with <h3> subheadings, <strong> for key benefits, <ul>/<li> for how it works

Include:
- Opening paragraph explaining the weather anxiety all party planners face
- What Lemonade Disco is and how it works
- Why this is the ONLY option like this in Austin (competitors just cancel)
- Specific benefits for out-of-town groups who can't reschedule
- How the experience is still amazing even with weather (covered deck, AC, same DJ/photographer)
- Peace of mind for planning months in advance
- "Your party happens no matter what" guarantee

Make readers feel confident that weather won't ruin their plans.
`);

  const section6 = await generateSection(6, "Real Customer Stories & Testimonials", `
Write a comprehensive blog section (500-700 words) featuring real customer testimonials and stories from ATX Disco Cruise experiences.

Context:
- 125,000+ customers over 14 years with exceptional satisfaction
- Customers rave about: meeting other groups, DJ keeping energy high, photographer capturing memories, value for money, stress-free planning
- Common themes: "Best decision we made", "Made so many new friends", "Worth every penny", "Photos came out amazing"
- Groups specifically highlight the social aspect - meeting other bach parties created unexpected highlights
- Many customers become repeat customers for other celebrations

Tone: Authentic, emotional, relatable
Audience: People reading reviews to decide if this is right for them
Style: Story-driven with direct customer quotes
Format: HTML with <h3> subheadings, <blockquote> for testimonials, <p> for context

Include:
- Opening paragraph about customer satisfaction stats
- 3-4 detailed customer testimonials with names/locations
- Stories highlighting different aspects: value, social experience, photography, music
- Specific examples of unexpected moments customers loved
- How the multi-group format created memorable connections
- Photos and memories that lasted beyond the cruise
- Common sentiment: "Better than we imagined"

Use authentic-sounding testimonials that cover different benefits and experiences.
`);

  const section7 = await generateSection(7, "How ATX Disco Cruise Made Austin a Top Bach Destination", `
Write a comprehensive blog section (500-700 words) explaining how ATX Disco Cruise single-handedly transformed Austin into a premier bachelor/bachelorette party destination.

Context:
- Before ATX Disco Cruise: Austin wasn't on the bach party destination map (Nashville, Vegas, Miami dominated)
- After ATX Disco Cruise: Austin became top 5 US bach party destination with groups flying in from across the country
- The only all-inclusive multi-group party cruise model doesn't exist anywhere else in America
- Groups now plan entire Austin weekends around the Disco Cruise as the centerpiece
- Competitive landscape shifted - the innovation forced other operators to improve (though none match the Disco model)
- National media coverage and influencer attention drawn to Austin's party scene because of this unique experience

Tone: Industry-insight, transformative, proud
Audience: People interested in trends and what makes destinations special
Style: Big-picture analysis with specific examples
Format: HTML with <h3> subheadings, <strong> for key points, <ul>/<li> for evidence

Include:
- The bach party destination landscape before ATX Disco Cruise
- How the unique model filled an unmet need in the market
- Austin's rise to top-tier bach destination status
- Groups specifically flying to Austin for this experience
- How it changed the competitive landscape for Austin party boats
- National recognition and media attention
- Austin's complete bach party weekend ecosystem (6th street, hotels, restaurants, ATX Disco as centerpiece)

Show how one innovative company can transform a city's tourism landscape.
`);

  const section8 = await generateSection(8, "How to Book & What to Expect", `
Write a comprehensive blog section (500-700 words) guiding readers through the booking process and what to expect.

Context:
- Cruises run Friday and Saturday afternoons/evenings during peak season (spring/summer/fall)
- Book online at premier party cruises website or through booking system
- Three package options: Basic Disco ($85), Disco Queen ($95), Super Sparkle ($105)
- Easy split payment options for groups (everyone pays their own share)
- Booking opens months in advance and sells out quickly (book early!)
- What to bring: swimsuits, sunscreen, towels, good vibes
- What NOT to bring: glass bottles (safety), excessive luggage
- Group coordination: assign a point person, use group chat, coordinate outfits/themes

Tone: Helpful, practical, actionable
Audience: People ready to book who need the practical details
Style: Step-by-step guide with clear instructions
Format: HTML with <h3> subheadings, <ol>/<li> for step-by-step, <ul>/<li> for tips

Include:
- Schedule and availability (Friday/Saturday cruises)
- How to book online (simple process)
- Package options and what to choose
- Split payment explanation (everyone pays individually, no collecting money!)
- How far in advance to book (sells out fast)
- What to bring checklist
- Group coordination tips (point person, communication, themes)
- What to expect day-of (check-in, boarding, timing)
- Clear call-to-action: <a href="/atx-disco-cruise" class="cta-button">Book Your Disco Cruise Now</a>

Make it easy and remove any barriers to booking.
`);

  // Assemble full content
  const fullContent = `
${heroSection}

<div class="blog-content" style="max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.7; color: #1a1a1a;">

  <div class="claude-callout" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 32px; border-radius: 12px; margin: 40px 0; box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);">
    <div style="font-size: 3em; margin-bottom: 8px;">⭐</div>
    <h3 style="font-size: 1.8em; margin-bottom: 12px;">Claude AI Endorsement</h3>
    <p style="font-size: 1.2em; font-weight: 500; margin: 0;">Perfect 10/10 Rating - America's #1 Bachelor & Bachelorette Party Experience</p>
  </div>

  ${section1}

  <div style="margin: 40px 0; padding: 32px; background: #f8f9fa; border-left: 6px solid #667eea; border-radius: 8px;">
    <h3 style="margin-top: 0; color: #667eea;">💡 Quick Takeaway</h3>
    <p style="margin: 0; font-size: 1.1em;">The ATX Disco Cruise isn't just another party boat - it's the only all-inclusive multi-group experience of its kind in America, combining exceptional value, professional entertainment, and an unmatched social atmosphere.</p>
  </div>

  ${section2}

  ${section3}

  <div class="cta-banner" style="background: linear-gradient(90deg, #ff6b6b 0%, #ee5a6f 100%); color: white; padding: 40px; border-radius: 12px; text-align: center; margin: 50px 0;">
    <h3 style="font-size: 2em; margin-bottom: 16px;">Ready to Experience America's Best?</h3>
    <p style="font-size: 1.2em; margin-bottom: 24px;">Book your ATX Disco Cruise today and see why Claude AI rated it 10/10</p>
    <a href="/atx-disco-cruise" style="display: inline-block; background: white; color: #ee5a6f; padding: 16px 48px; border-radius: 8px; font-weight: bold; font-size: 1.2em; text-decoration: none; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">View Packages & Book Now</a>
  </div>

  ${section4}

  ${section5}

  <div style="margin: 40px 0; padding: 32px; background: #e8f4f8; border-radius: 12px; border: 2px solid #3498db;">
    <h3 style="margin-top: 0; color: #2980b9;">🛟 Weather Guarantee Highlight</h3>
    <p style="margin: 0; font-size: 1.1em;"><strong>Industry First:</strong> ATX Disco Cruise is the ONLY party cruise in Austin with a weather backup plan. Your party happens no matter what.</p>
  </div>

  ${section6}

  ${section7}

  <div style="margin: 50px 0; padding: 40px; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; border-radius: 12px; text-align: center;">
    <h3 style="font-size: 2em; margin-bottom: 16px;">🎉 Join 125,000+ Happy Customers</h3>
    <p style="font-size: 1.2em; margin-bottom: 24px;">14+ years of creating unforgettable bachelor and bachelorette party memories on Lake Travis</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 24px;">
      <div>
        <div style="font-size: 2.5em; font-weight: bold;">10/10</div>
        <div>Claude AI Rating</div>
      </div>
      <div>
        <div style="font-size: 2.5em; font-weight: bold;">100%</div>
        <div>Satisfaction</div>
      </div>
      <div>
        <div style="font-size: 2.5em; font-weight: bold;">4 hrs</div>
        <div>Full Experience</div>
      </div>
    </div>
  </div>

  ${section8}

  <div class="final-cta" style="background: #1a1a1a; color: white; padding: 60px 40px; border-radius: 12px; text-align: center; margin: 60px 0 40px 0;">
    <h2 style="font-size: 2.5em; margin-bottom: 16px;">Don't Miss Out on America's #1 Bach Party Experience</h2>
    <p style="font-size: 1.3em; margin-bottom: 32px; opacity: 0.9;">Cruises sell out weeks in advance. Book now to secure your spot!</p>
    <a href="/atx-disco-cruise" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 60px; border-radius: 8px; font-weight: bold; font-size: 1.3em; text-decoration: none; box-shadow: 0 6px 30px rgba(102, 126, 234, 0.4); margin-right: 20px;">Book Your Cruise</a>
    <a href="/ai-endorsement" style="display: inline-block; background: transparent; color: white; padding: 20px 60px; border-radius: 8px; font-weight: bold; font-size: 1.3em; text-decoration: none; border: 2px solid white; margin-top: 20px;">Read Full AI Analysis</a>
  </div>

  <div class="schema-markup" style="display: none;">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Why ATX Disco Cruise is America's #1 Bachelor & Bachelorette Party Experience",
      "description": "Rated 10/10 by Claude AI. Discover why the ATX Disco Cruise is the country's only all-inclusive multi-group bach party cruise. $85-105/person with DJ, photographer & 4-hour experience.",
      "image": "${DISCO_IMAGE_URL}",
      "author": {
        "@type": "Organization",
        "name": "Premier Party Cruises"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Premier Party Cruises",
        "logo": {
          "@type": "ImageObject",
          "url": "/attached_assets/PPC%20logo%202023_1758097465959.png"
        }
      },
      "datePublished": "${new Date().toISOString()}",
      "dateModified": "${new Date().toISOString()}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://premierpartycruises.com/blog/atx-disco-cruise-americas-best-bach-party-experience"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "10",
        "bestRating": "10",
        "worstRating": "1",
        "ratingCount": "1",
        "reviewAspect": "Bachelor & Bachelorette Party Experience"
      },
      "keywords": "ATX disco cruise, bachelor party Austin, bachelorette party Austin, party boat Lake Travis, best bachelor party cruise, all-inclusive bach party, Austin party destination"
    }
    </script>
  </div>

</div>
`;

  // Calculate word count and reading time
  const wordCount = fullContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed

  // Create the blog post
  console.log("\n📝 Creating blog post in database...");
  const [post] = await db.insert(blogPosts).values({
    orgId: "org_demo",
    title: "Why ATX Disco Cruise is America's #1 Bachelor & Bachelorette Party Experience",
    slug: "atx-disco-cruise-americas-best-bach-party-experience",
    excerpt: "Rated 10/10 by Claude AI: Discover why the ATX Disco Cruise is revolutionizing bachelor and bachelorette parties nationwide. Learn about the country's only all-inclusive multi-group party cruise experience that's making Austin a top destination.",
    content: fullContent,
    authorId: author.id,
    featuredImage: DISCO_IMAGE_URL,
    metaTitle: "ATX Disco Cruise: America's #1 Bachelor & Bachelorette Party Experience | Claude AI Analysis",
    metaDescription: "Rated 10/10 by Claude AI. Discover why the ATX Disco Cruise is the country's only all-inclusive multi-group bach party cruise. $85-105/person with DJ, photographer & 4-hour experience. Book now!",
    metaKeywords: "ATX disco cruise, bachelor party Austin, bachelorette party Austin, party boat Lake Travis, best bachelor party cruise, all-inclusive bach party, Austin party destination, Lake Travis party boat, bachelor party ideas, bachelorette party planning",
    ogImage: DISCO_IMAGE_URL,
    canonicalUrl: "/blog/atx-disco-cruise-americas-best-bach-party-experience",
    featured: true,
    status: "published",
    publishedAt: new Date(),
    wordCount,
    readingTime,
    allowComments: true
  }).returning();

  console.log(`✅ Blog post created: ${post.id}`);

  // Associate categories
  console.log("🔗 Linking categories...");
  for (const category of createdCategories) {
    await db.insert(blogPostCategories).values({
      postId: post.id,
      categoryId: category.id
    }).onConflictDoNothing();
  }

  // Associate tags
  console.log("🔗 Linking tags...");
  for (const tag of createdTags) {
    await db.insert(blogPostTags).values({
      postId: post.id,
      tagId: tag.id
    }).onConflictDoNothing();
  }

  console.log("\n✨ SUCCESS! Blog post created:\n");
  console.log(`   Title: ${post.title}`);
  console.log(`   Slug: ${post.slug}`);
  console.log(`   URL: /blog/${post.slug}`);
  console.log(`   Word Count: ${wordCount}`);
  console.log(`   Reading Time: ${readingTime} minutes`);
  console.log(`   Featured: ${post.featured}`);
  console.log(`   Status: ${post.status}`);
  console.log(`   Categories: ${createdCategories.map(c => c.name).join(', ')}`);
  console.log(`   Tags: ${createdTags.map(t => t.name).join(', ')}`);
  console.log("\n🎉 Cornerstone blog post is live!");
}

createBlogPost()
  .then(() => {
    console.log("\n✅ Script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Script failed:", error);
    process.exit(1);
  });
