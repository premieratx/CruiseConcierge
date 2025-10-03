import { storage } from '../server/storage';

async function createAllBlogPosts() {
  try {
    console.log('🚀 Creating all 17 blog posts...');
    
    // Get existing author, categories, and tags
    const authors = await storage.getBlogAuthors();
    const author = authors.find(a => a.slug === 'ppc-team');
    if (!author) {
      throw new Error('Author not found. Please run create-blog-posts.ts first.');
    }
    
    const allCategories = await storage.getBlogCategories();
    const allTags = await storage.getBlogTags();
    
    console.log(`✅ Found author: ${author.name}`);
    console.log(`✅ Found ${allCategories.length} categories`);
    console.log(`✅ Found ${allTags.length} tags`);
    
    // Helper function to add categories and tags to a post
    async function addPostRelations(postId: string, categoryNames: string[], tagNames: string[]) {
      const categoryIds = categoryNames.map(name => allCategories.find(c => c.name === name)?.id).filter(Boolean) as string[];
      const tagIds = tagNames.map(name => allTags.find(t => t.name === name)?.id).filter(Boolean) as string[];
      
      if (categoryIds.length > 0) {
        await storage.assignPostToCategories(postId, categoryIds, categoryIds[0]);
      }
      if (tagIds.length > 0) {
        await storage.assignPostToTags(postId, tagIds);
      }
    }

    const blogPosts = [];
    
    // Blog 1: How to Throw a Great Bachelorette Party in Austin
    const blog1 = await storage.createBlogPost({
      authorId: author.id,
      title: "How to Throw a Great Bachelorette Party in Austin",
      slug: "how-to-throw-great-bachelorette-party-austin",
      content: `
        <h2>Why Austin is Perfect for Your Bachelorette Party</h2>
        <p>Looking to plan an unforgettable bachelorette party? Austin, Texas is the ultimate destination for celebrating with your best friends before the big day. With its vibrant nightlife, stunning Lake Travis views, world-class dining, and endless entertainment options, Austin has everything you need for an epic bachelorette weekend.</p>
        
        <h2>Planning Your Austin Bachelorette Party: The Ultimate Timeline</h2>
        <p>Start planning your bachelorette party in Austin at least 3-4 months in advance, especially if you're visiting during peak season (March-October). Book your <strong>Lake Travis party boat</strong> cruise first, as these popular experiences fill up quickly. Secure accommodations next, then plan your itinerary around your boat day.</p>
        
        <h2>Must-Do Activities for Your Austin Bachelorette Party</h2>
        
        <h3>Lake Travis Party Boat Cruise</h3>
        <p>The crown jewel of any Austin bachelorette party is a <strong>Lake Travis party boat cruise</strong>. Spend 3-4 hours on the crystal-clear waters with your crew, enjoying music, drinks, swimming, and unforgettable views. Our private charters accommodate groups of 14-75 guests and include a captain, crew, sound system, and floating water mat. It's the perfect Instagram-worthy experience that will be the highlight of your celebration.</p>
        
        <h3>6th Street Bar Crawl</h3>
        <p>No Austin bachelorette party is complete without experiencing the legendary 6th Street. This historic entertainment district features over 60 bars, clubs, and live music venues. Start at Midnight Cowboy for craft cocktails, hit Barbarella for dancing, and end at Shakespeare's for late-night revelry.</p>
        
        <h3>Rainey Street Experience</h3>
        <p>For a more upscale vibe, Rainey Street offers converted bungalow bars with outdoor patios perfect for group celebrations. Try Banger's Sausage House & Beer Garden for 100+ beers on tap, or Lustre Pearl for rooftop drinks with skyline views.</p>
        
        <h3>Spa Day Relaxation</h3>
        <p>Balance the party with relaxation at one of Austin's premier spas. Milk + Honey or Lake Austin Spa Resort offer group packages perfect for bachelorette parties. Enjoy massages, facials, and champagne before hitting the town.</p>
        
        <h2>Where to Eat: Austin's Best for Bachelorette Parties</h2>
        <p>Austin's food scene is legendary. Start your day with breakfast tacos from Veracruz All Natural or Juan in a Million. For BBQ, Franklin BBQ is worth the wait (arrive early!), or try Terry Black's for equally amazing food with shorter lines. Food trucks at the Picnic offer diverse options perfect for groups. For upscale dining, reserve a table at Uchi for sushi or Odd Duck for innovative American cuisine.</p>
        
        <h2>Where to Stay in Austin</h2>
        <p>Downtown Austin puts you in the center of the action. The W Austin offers modern luxury with rooftop pool access. For budget-friendly options, consider Airbnb rentals in East Austin or South Congress. Many properties feature pools, hot tubs, and group-friendly layouts perfect for getting ready together.</p>
        
        <h2>Budgeting Your Austin Bachelorette Party</h2>
        <p>Plan for $500-800 per person for a 2-3 day Austin bachelorette party. This includes:</p>
        <ul>
          <li>Accommodations: $100-200 per night per person</li>
          <li>Lake Travis party boat: $75-150 per person</li>
          <li>Dining and drinks: $150-250</li>
          <li>Activities and entertainment: $100-200</li>
          <li>Transportation: $50-100</li>
        </ul>
        
        <h2>Sample Austin Bachelorette Itinerary</h2>
        
        <h3>Day 1: Arrival & Welcome</h3>
        <ul>
          <li>2pm: Check-in to your rental/hotel</li>
          <li>4pm: Pool party at your accommodation</li>
          <li>7pm: Dinner at Uchi or Odd Duck</li>
          <li>9pm: Rainey Street bar hop</li>
        </ul>
        
        <h3>Day 2: Lake Travis & Downtown</h3>
        <ul>
          <li>10am: Brunch at Snooze or Kerbey Lane</li>
          <li>12pm: <strong>Lake Travis Party Boat Cruise (3-4 hours)</strong></li>
          <li>5pm: Return to hotel to refresh</li>
          <li>8pm: BBQ dinner at Terry Black's</li>
          <li>10pm: 6th Street bar crawl and dancing</li>
        </ul>
        
        <h3>Day 3: Spa & Farewell</h3>
        <ul>
          <li>10am: Group spa treatments</li>
          <li>1pm: Farewell brunch at Elizabeth Street Cafe</li>
          <li>3pm: Shopping on South Congress</li>
          <li>5pm: Departure</li>
        </ul>
        
        <h2>Ready to Book Your Austin Bachelorette Party Boat?</h2>
        <p>Make your Austin bachelorette party unforgettable with a private party boat cruise on Lake Travis. <a href="/private-cruises">Contact Premier Party Cruises today</a> to reserve your date and create memories that will last a lifetime. Our experienced crew will ensure your celebration is safe, fun, and absolutely epic!</p>
      `,
      excerpt: "Planning an Austin bachelorette party? Discover the ultimate guide including Lake Travis party boats, 6th Street nightlife, dining, activities, and budget tips.",
      status: "published",
      metaTitle: "Austin Bachelorette Party Guide | Premier Party Cruises",
      metaDescription: "Plan the perfect Austin bachelorette party with our complete guide. Lake Travis boats, nightlife, dining & activities for an unforgettable celebration.",
      focusKeyphrase: "bachelorette party Austin",
      publishedAt: new Date()
    });
    await addPostRelations(blog1.id, ["Bachelorette Parties", "Austin Travel", "Party Planning"], ["Austin", "Bachelorette Party", "Party Boat", "Lake Travis", "Party Planning", "Travel Guide"]);
    blogPosts.push({ title: blog1.title, slug: blog1.slug, wordCount: blog1.wordCount });
    console.log(`✅ Blog 1: ${blog1.title}`);

    // Blog 2: How to Throw a Great Bachelor Party in Austin
    const blog2 = await storage.createBlogPost({
      authorId: author.id,
      title: "How to Throw a Great Bachelor Party in Austin",
      slug: "how-to-throw-great-bachelor-party-austin",
      content: `
        <h2>Why Austin is the Ultimate Bachelor Party Destination</h2>
        <p>When it comes to planning an epic bachelor party, Austin, Texas stands in a league of its own. From the legendary nightlife on 6th Street to the pristine waters of Lake Travis, Austin offers the perfect blend of adventure, entertainment, and southern hospitality that makes for an unforgettable guys' weekend.</p>
        
        <h2>The Complete Bachelor Party Planning Guide</h2>
        <p>Planning a successful <strong>bachelor party in Austin</strong> requires booking key activities 2-3 months in advance, especially during peak season (March-October). Start with your centerpiece activity—a Lake Travis party boat cruise—then build your itinerary around it. Book accommodations near downtown to minimize transportation hassles and maximize party time.</p>
        
        <h2>Top Activities for Your Austin Bachelor Party</h2>
        
        <h3>Lake Travis Party Boat Adventure</h3>
        <p>No Austin bachelor party is complete without a private party boat cruise on Lake Travis. Picture this: you and your crew on a fully-equipped party boat, cruising crystal-clear waters with cold drinks, great music, and Texas sunshine. Our <strong>Lake Travis party boats</strong> accommodate 14-75 guests and include everything you need: experienced captain and crew, premium sound system, floating water mat, and unlimited fun. It's the bachelor party experience your groom will never forget.</p>
        
        <h3>TopGolf Austin</h3>
        <p>Combine competition, drinks, and entertainment at TopGolf. Their climate-controlled bays, full-service restaurant, and rooftop terrace make it perfect for bachelor party groups. Book a VIP suite for your crew.</p>
        
        <h3>Austin Brewery Tours</h3>
        <p>Austin's craft beer scene is world-class. Book a brewery tour through Jester King, Live Oak, or Austin Beerworks. Many companies offer party bus packages that handle transportation between breweries—perfect for bachelor parties.</p>
        
        <h3>6th Street Nightlife</h3>
        <p>The legendary 6th Street entertainment district is bachelor party central. Start at Kung Fu Saloon for games and drinks, hit Rain for a nightclub experience, and end at Blind Pig for live music. VIP table service is available at most venues.</p>
        
        <h2>Austin's Best Food for Bachelor Parties</h2>
        <p>Fuel your bachelor party with Austin's incredible food scene. Start with breakfast tacos from Torchy's or Veracruz All Natural. For lunch, hit <strong>Franklin BBQ</strong> (arrive at 9am to beat the line) or Salt Lick in Driftwood for family-style BBQ with unlimited sides. Dinner options include Fogo de Chão Brazilian Steakhouse for unlimited meat, or Perry's Steakhouse for their famous pork chop. Late-night munchies? P. Terry's or Whataburger never disappoint.</p>
        
        <h2>Where to Stay: Bachelor Party Accommodations</h2>
        <p>Downtown Austin hotels like the W Austin or Fairmont Austin offer luxury and proximity to nightlife. For larger groups, consider renting a house in East Austin or near Zilker Park through Airbnb or VRBO. Many properties feature pools, game rooms, and outdoor spaces perfect for pre-gaming.</p>
        
        <h2>Budget Breakdown: Cost Per Person</h2>
        <p>Expect to budget $600-1,000 per person for a 2-3 day Austin bachelor party:</p>
        <ul>
          <li>Accommodations: $150-250 per night</li>
          <li>Lake Travis party boat: $100-200 per person</li>
          <li>Dining and drinks: $200-300</li>
          <li>Activities (TopGolf, breweries): $100-150</li>
          <li>Nightlife (cover charges, drinks): $100-200</li>
          <li>Transportation: $50-100</li>
        </ul>
        
        <h2>The Perfect Austin Bachelor Party Weekend</h2>
        
        <h3>Friday: Arrival & Appetizer</h3>
        <ul>
          <li>3pm: Check-in and settle into accommodations</li>
          <li>5pm: Happy hour at Easy Tiger or Better Half</li>
          <li>7pm: Dinner at Fogo de Chão or Perry's Steakhouse</li>
          <li>9pm: 6th Street bar crawl starting at Kung Fu Saloon</li>
          <li>Midnight: Late-night food at P. Terry's</li>
        </ul>
        
        <h3>Saturday: Main Event</h3>
        <ul>
          <li>10am: Breakfast tacos and recovery at Juan in a Million</li>
          <li>12pm: <strong>Lake Travis Party Boat Cruise (3-4 hours)</strong></li>
          <li>4pm: Back to hotel, rest and refresh</li>
          <li>7pm: BBQ feast at Franklin, Terry Black's, or Salt Lick</li>
          <li>9pm: Rainey Street bar hop</li>
          <li>11pm: Club scene at Rain or Barbarella</li>
        </ul>
        
        <h3>Sunday: Recovery & Farewell</h3>
        <ul>
          <li>11am: Brunch at Kerbey Lane or Snooze</li>
          <li>1pm: TopGolf or brewery tour (for those still standing)</li>
          <li>4pm: Farewell beers at Zilker Brewing or Live Oak</li>
          <li>6pm: Departure</li>
        </ul>
        
        <h2>Book Your Austin Bachelor Party Boat Today</h2>
        <p>Ready to plan the ultimate bachelor party? Start with a Lake Travis party boat cruise that will be the highlight of your weekend. <a href="/private-cruises">Contact Premier Party Cruises</a> to reserve your date and create an unforgettable Austin bachelor party experience. We'll handle the boat, you handle the celebration!</p>
      `,
      excerpt: "Plan an epic Austin bachelor party with this complete guide featuring Lake Travis boat cruises, TopGolf, brewery tours, BBQ, nightlife, and detailed itinerary.",
      status: "published",
      metaTitle: "Austin Bachelor Party Guide | Lake Travis Boats & Activities",
      metaDescription: "Ultimate Austin bachelor party guide: Lake Travis boats, TopGolf, BBQ, 6th Street nightlife, budget tips & complete weekend itinerary for guys.",
      focusKeyphrase: "bachelor party Austin",
      publishedAt: new Date()
    });
    await addPostRelations(blog2.id, ["Bachelor Parties", "Austin Travel", "Party Planning"], ["Austin", "Bachelor Party", "Party Boat", "Lake Travis", "Party Planning", "Travel Guide"]);
    blogPosts.push({ title: blog2.title, slug: blog2.slug, wordCount: blog2.wordCount });
    console.log(`✅ Blog 2: ${blog2.title}`);
    
    // Blog 3: Why Choose Austin for Your Bachelorette Party
    const blog3 = await storage.createBlogPost({
      authorId: author.id,
      title: "Why Choose Austin for Your Bachelorette Party",
      slug: "why-choose-austin-bachelorette-party",
      content: `
        <h2>10 Reasons Austin is the Perfect Bachelorette Party Destination</h2>
        
        <h3>1. Lake Travis Party Boats</h3>
        <p>Austin's crown jewel for bachelorette parties is <strong>Lake Travis</strong>. Crystal-clear waters, stunning hill country views, and private party boat cruises create the ultimate celebration setting. Spend 3-4 hours with your crew swimming, sunbathing, and dancing on a fully-equipped party boat—it's the Instagram-worthy experience every bachelorette party needs.</p>
        
        <h3>2. Legendary Nightlife</h3>
        <p>From the historic 6th Street entertainment district to the upscale Rainey Street bungalow bars, Austin's nightlife offers something for every bachelorette crew. Dance the night away at Barbarella, sip craft cocktails at Midnight Cowboy, or enjoy rooftop views at Lustre Pearl. With over 60 bars and clubs concentrated downtown, your group can bar hop all night without missing a beat.</p>
        
        <h3>3. World-Class Food Scene</h3>
        <p>Austin isn't called the food truck capital for nothing. Your <strong>Austin bachelorette party</strong> will feast on legendary BBQ (Franklin, Terry Black's), innovative food trucks, James Beard-nominated restaurants, and everything in between. From breakfast tacos to late-night bites, Austin's culinary scene keeps the party fueled.</p>
        
        <h3>4. Perfect Year-Round Weather</h3>
        <p>With 300 days of sunshine annually and mild winters, Austin is a bachelorette party destination any time of year. Peak season (March-October) offers hot summer days perfect for lake activities, while fall and spring provide ideal temperatures for outdoor celebrations without the crowds.</p>
        
        <h3>5. Instagram-Worthy Spots Everywhere</h3>
        <p>Austin is a photographer's dream. Capture stunning photos at the "I Love You So Much" mural, Greetings from Austin postcard mural, Congress Avenue Bridge bats, Mount Bonnell overlook, or aboard your Lake Travis party boat. Your bachelorette party will have content for days.</p>
        
        <h3>6. Thriving Party Boat Culture</h3>
        <p>Lake Travis has become synonymous with party boat celebrations. The hill country backdrop, reliable weather, and established party boat industry mean your bachelorette party will have access to top-tier boats, experienced crews, and unforgettable water experiences. It's the Texas version of a yacht party, but better.</p>
        
        <h3>7. Luxurious Spa Options</h3>
        <p>Balance the party with pampering at Austin's premier spas. Milk + Honey, Viva Day Spa, and Lake Austin Spa Resort offer group packages perfect for bachelorette parties. Enjoy massages, facials, champagne, and relaxation before hitting the town.</p>
        
        <h3>8. Central Location</h3>
        <p>Austin's central Texas location makes it easily accessible from anywhere in the U.S. Austin-Bergstrom International Airport offers direct flights from major cities, and downtown is just 20 minutes away. For regional guests, Austin is a quick drive from Houston, Dallas, and San Antonio.</p>
        
        <h3>9. Affordable Luxury</h3>
        <p>Unlike coastal destinations, Austin offers luxury experiences at reasonable prices. No state income tax means better deals, and the competitive entertainment scene keeps prices fair. Your bachelorette party budget goes further in Austin while still delivering premium experiences.</p>
        
        <h3>10. Friendly Austin Vibe</h3>
        <p>Austin's unofficial motto "Keep Austin Weird" extends to its welcoming, laid-back culture. Locals are friendly, service industry workers are accommodating to groups, and the city embraces celebrations. Your bachelorette party will feel welcome everywhere you go.</p>
        
        <h2>Unique Austin Experiences for Bachelorette Parties</h2>
        <p>Beyond the standard activities, Austin offers unique experiences perfect for bachelorette celebrations: Austin FC soccer games for sports fans, Barton Springs Pool for natural swimming, kayaking Lady Bird Lake, shopping on South Congress, live music at the Continental Club, or pedal taverns through downtown. The options are endless.</p>
        
        <h2>When to Visit Austin for Your Bachelorette Party</h2>
        <p><strong>Best months:</strong> April-May and September-October offer perfect weather, fewer crowds, and better availability. <strong>Peak season:</strong> June-August brings hot weather ideal for lake days but requires earlier booking. <strong>Budget-friendly:</strong> January-February and November offer great deals and mild weather.</p>
        
        <h2>Getting Around Austin</h2>
        <p>Rideshares (Uber/Lyft) are abundant and affordable. For larger groups, consider renting a party bus for the day or booking a driver service. Downtown is walkable, especially around 6th Street and Rainey Street. For your Lake Travis party boat, transportation is typically 30-40 minutes from downtown.</p>
        
        <h2>Book Your Austin Bachelorette Party Boat</h2>
        <p>Ready to celebrate in style? Austin's combination of Lake Travis party boats, world-class nightlife, amazing food, and perfect weather makes it the ultimate bachelorette party destination. <a href="/private-cruises">Reserve your Lake Travis party boat with Premier Party Cruises</a> and start planning the bachelorette celebration of a lifetime!</p>
      `,
      excerpt: "Discover 10 compelling reasons why Austin is the perfect bachelorette party destination, from Lake Travis boats to legendary nightlife and Instagram-worthy spots.",
      status: "published",
      metaTitle: "Why Austin for Bachelorette Parties | Top 10 Reasons",
      metaDescription: "Discover why Austin is perfect for bachelorette parties: Lake Travis boats, nightlife, food, weather, Instagram spots & more. Plan your celebration now!",
      focusKeyphrase: "Austin bachelorette party",
      publishedAt: new Date()
    });
    await addPostRelations(blog3.id, ["Bachelorette Parties", "Austin Travel", "Lake Travis"], ["Austin", "Bachelorette Party", "Party Boat", "Lake Travis", "Travel Guide"]);
    blogPosts.push({ title: blog3.title, slug: blog3.slug, wordCount: blog3.wordCount });
    console.log(`✅ Blog 3: ${blog3.title}`);

    // Continue with remaining posts...
    console.log(`\n✅ Created ${blogPosts.length} blog posts so far`);
    console.log('\n📊 Summary:');
    blogPosts.forEach(post => {
      console.log(`   - ${post.title} (${post.wordCount} words)`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

createAllBlogPosts();
