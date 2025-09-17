import { storage } from "./storage";
import { randomUUID } from "crypto";

export async function seedBlogData() {
  console.log("Creating sample blog data...");
  
  try {
    // Create sample author
    const author = await storage.createBlogAuthor({
      name: "Premier Party Cruises",
      email: "team@premiercruises.com", 
      bio: "The official team at Premier Party Cruises, bringing you the best party boat experiences on Lake Travis.",
      avatar: "",
      active: true
    });
    console.log(`✅ Author created: ${author.name}`);

    // Create sample categories
    const eventCategory = await storage.createBlogCategory({
      name: "Events & Celebrations",
      slug: "events",
      description: "Ideas and tips for planning the perfect celebration on the water",
      active: true,
      displayOrder: 1
    });

    const tipsCategory = await storage.createBlogCategory({
      name: "Boating Tips",
      slug: "tips", 
      description: "Expert advice for making the most of your Lake Travis experience",
      active: true,
      displayOrder: 2
    });

    console.log(`✅ Categories created: ${eventCategory.name}, ${tipsCategory.name}`);

    // Create sample tags
    const partyTag = await storage.createBlogTag({
      name: "Party Planning",
      slug: "party-planning",
      description: "Tips for planning the perfect party",
      active: true
    });

    const lakeTag = await storage.createBlogTag({
      name: "Lake Travis",
      slug: "lake-travis",
      description: "All about Lake Travis",
      active: true
    });

    console.log(`✅ Tags created: ${partyTag.name}, ${lakeTag.name}`);

    // Create sample blog posts
    const posts = [
      {
        title: "Ultimate Guide to Planning a Bachelor Party on Lake Travis",
        slug: "bachelor-party-lake-travis-guide",
        excerpt: "Everything you need to know to throw an unforgettable bachelor party on the beautiful waters of Lake Travis.",
        content: `<h2>Planning the Perfect Bachelor Party</h2>
        <p>Lake Travis offers the perfect setting for an unforgettable bachelor party. With crystal clear waters, stunning scenery, and world-class party boats, you'll create memories that last a lifetime.</p>
        
        <h3>What to Expect</h3>
        <ul>
        <li>Professional captain and crew</li>
        <li>Premium sound system with Bluetooth connectivity</li>
        <li>Spacious decks for dancing and relaxing</li>
        <li>Coolers with ice for your beverages</li>
        <li>Water toys and activities</li>
        </ul>
        
        <h3>Planning Tips</h3>
        <p>Book early, especially during peak season (April-September). Consider add-ons like decorations, catering, and photography services to make the day extra special.</p>`,
        status: "published" as const,
        authorId: author.id,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        featured: true,
        viewCount: 245,
        metaTitle: "Bachelor Party on Lake Travis - Ultimate Guide | Premier Party Cruises",
        metaDescription: "Plan the perfect bachelor party on Lake Travis with our ultimate guide. Professional boats, premium amenities, and unforgettable experiences."
      },
      {
        title: "Corporate Team Building Events That Actually Work",
        slug: "corporate-team-building-lake-travis",
        excerpt: "Discover why Lake Travis is the perfect venue for corporate events that bring teams together and boost morale.",
        content: `<h2>Team Building on the Water</h2>
        <p>Take your corporate events to the next level with a team building experience on Lake Travis. Our corporate packages are designed to foster collaboration while providing a fun, relaxing environment.</p>
        
        <h3>Why Choose a Boat for Team Building?</h3>
        <ul>
        <li>Unique environment encourages creativity</li>
        <li>Natural setting reduces stress and tension</li>
        <li>Shared experiences build stronger bonds</li>
        <li>Away from office distractions</li>
        </ul>
        
        <h3>Corporate Package Includes</h3>
        <p>Our corporate packages include professional presentation setup, catering options, team building activities, and dedicated event coordination.</p>`,
        status: "published" as const,
        authorId: author.id,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        featured: false,
        viewCount: 132,
        metaTitle: "Corporate Team Building Events on Lake Travis | Premier Party Cruises",
        metaDescription: "Host effective corporate team building events on Lake Travis. Professional venues, catering, and activities that bring teams together."
      },
      {
        title: "Lake Travis Safety: What Every Party Host Should Know",
        slug: "lake-travis-safety-guide",
        excerpt: "Essential safety tips and guidelines for a fun and secure party boat experience on Lake Travis.",
        content: `<h2>Safety First on Lake Travis</h2>
        <p>At Premier Party Cruises, safety is our top priority. Here's what every party host should know to ensure everyone has a fun and secure experience.</p>
        
        <h3>Before You Board</h3>
        <ul>
        <li>Count your guests and verify capacity limits</li>
        <li>Review safety equipment locations</li>
        <li>Understand emergency procedures</li>
        <li>Designate a sober point person</li>
        </ul>
        
        <h3>During Your Cruise</h3>
        <p>Our professional crew handles all navigation and safety protocols. Guests should stay within designated areas, follow crew instructions, and avoid overindulgence in alcohol.</p>
        
        <h3>Emergency Preparedness</h3>
        <p>All our boats are equipped with full safety equipment, GPS tracking, and direct communication with coast guard and emergency services.</p>`,
        status: "published" as const,
        authorId: author.id,
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        featured: false,
        viewCount: 89,
        metaTitle: "Lake Travis Safety Guide for Party Boats | Premier Party Cruises",
        metaDescription: "Essential safety tips for Lake Travis party boat rentals. Professional guidance for a fun and secure boating experience."
      }
    ];

    for (const postData of posts) {
      const post = await storage.createBlogPost(postData);
      
      // Assign to categories
      await storage.assignPostToCategories(post.id, [eventCategory.id], eventCategory.id);
      if (postData.title.includes("Safety")) {
        await storage.assignPostToCategories(post.id, [tipsCategory.id], tipsCategory.id);
      }
      
      // Assign tags
      await storage.assignPostToTags(post.id, [partyTag.id, lakeTag.id]);
      
      console.log(`✅ Blog post created: ${post.title}`);
    }

    console.log("✅ Blog data seeding complete!");
    return true;
  } catch (error) {
    console.error("❌ Blog seeding failed:", error);
    return false;
  }
}