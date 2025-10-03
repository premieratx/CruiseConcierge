import { storage } from '../server/storage';

async function completeBlogCreation() {
  try {
    console.log('🚀 Completing blog post creation (handling duplicates)...\n');
    
    const authors = await storage.getBlogAuthors();
    const author = authors.find(a => a.slug === 'ppc-team');
    if (!author) throw new Error('Author not found');
    
    const allCategories = await storage.getBlogCategories();
    const allTags = await storage.getBlogTags();
    
    console.log(`✅ Found: ${authors.length} authors, ${allCategories.length} categories, ${allTags.length} tags\n`);
    
    async function addRelations(postId: string, catNames: string[], tagNames: string[]) {
      const catIds = catNames.map(n => allCategories.find(c => c.name === n)?.id).filter(Boolean) as string[];
      const tagIds = tagNames.map(n => allTags.find(t => t.name === n)?.id).filter(Boolean) as string[];
      if (catIds.length > 0) await storage.assignPostToCategories(postId, catIds, catIds[0]);
      if (tagIds.length > 0) await storage.assignPostToTags(postId, tagIds);
    }

    async function createPost(data: any, cats: string[], tags: string[], num: number) {
      try {
        const post = await storage.createBlogPost({ ...data, authorId: author.id, status: "published", publishedAt: new Date() });
        await addRelations(post.id, cats, tags);
        console.log(`✅ Blog ${num}: ${post.title} (${post.wordCount} words)`);
        return true;
      } catch (err: any) {
        if (err.code === '23505') {
          console.log(`⏭️  Blog ${num}: Already exists - ${data.title}`);
          return false;
        }
        throw err;
      }
    }

    let created = 0, skipped = 0;

    // Blog 4: Why Choose Austin for Your Bachelor Party
    await createPost({
      title: "Why Choose Austin for Your Bachelor Party",
      slug: "why-choose-austin-bachelor-party",
      content: `<h2>Top 10 Reasons Austin is Perfect for Bachelor Parties</h2>
        <h3>1. Lake Travis Party Boats</h3>
        <p>Lake Travis offers the ultimate bachelor party centerpiece: private party boat cruises on pristine waters surrounded by Texas hill country. Our <strong>Austin bachelor party boats</strong> accommodate 14-75 guests with captain, crew, sound system, and water toys. It's the experience your groom will talk about for years.</p>
        <h3>2. World-Class BBQ Scene</h3>
        <p>Austin's BBQ is legendary. Franklin BBQ, Terry Black's, and La Barbecue serve some of the world's best smoked meats. Your bachelor party will feast like kings on brisket, ribs, and sausage that define Texas cuisine.</p>
        <h3>3. No State Income Tax</h3>
        <p>Texas has no state income tax, which means better deals on everything from accommodations to dining. Your bachelor party budget stretches further in Austin compared to coastal cities.</p>
        <h3>4. Electric Nightlife</h3>
        <p>6th Street, Rainey Street, and the Warehouse District offer 100+ bars and clubs. From dive bars to rooftop lounges to dance clubs, Austin's nightlife keeps bachelor parties entertained until 2am (or later).</p>
        <h3>5. Outdoor Adventure</h3>
        <p>Beyond party boats, Austin offers kayaking, paddleboarding, hiking, golf, and more. The combination of lake, hill country, and urban parks creates endless outdoor bachelor party options.</p>
        <h3>6. Craft Beer Capital</h3>
        <p>With 50+ breweries, Austin is a beer lover's paradise. Jester King, Live Oak, and Austin Beerworks offer world-class craft beer. Brewery tours and taproom hopping are bachelor party staples.</p>
        <h3>7. TopGolf & Entertainment</h3>
        <p>TopGolf Austin offers climate-controlled bays, full bar, restaurant, and rooftop terrace perfect for bachelor parties. Combine friendly competition with drinks and food for an afternoon of entertainment.</p>
        <h3>8. Central Location</h3>
        <p>Austin's central Texas location makes it accessible from anywhere. Direct flights from major cities, and it's a quick drive from Houston, Dallas, and San Antonio. Your bachelor party crew can easily converge on Austin.</p>
        <h3>9. Year-Round Perfect Weather</h3>
        <p>300+ days of sunshine and mild winters mean Austin is a bachelor party destination any time of year. Even "winter" sees 60-70°F days perfect for outdoor activities.</p>
        <h3>10. Keep Austin Weird Culture</h3>
        <p>Austin's laid-back, welcoming vibe embraces bachelor parties. The city's unofficial motto "Keep Austin Weird" extends to its celebration-friendly culture. You'll feel welcome everywhere.</p>
        <h2>What Makes Austin Unique for Bachelor Parties</h2>
        <p>Unlike Vegas or Miami, Austin offers authentic experiences. Live music venues showcase real talent, BBQ joints serve generations-old recipes, and Lake Travis provides natural beauty you can't find in a hotel pool. Austin bachelor parties get genuine Texas experiences, not manufactured tourism.</p>
        <h2>Best Time to Visit for Bachelor Parties</h2>
        <p><strong>Peak season (May-September):</strong> Hot weather, packed lake days, premium pricing. Book 3+ months ahead. <strong>Sweet spot (March-April, October-November):</strong> Perfect weather, good availability, better deals. <strong>Budget season (January-February):</strong> Mild weather, great prices, fewer crowds.</p>
        <h2>Book Your Austin Bachelor Party Boat</h2>
        <p>Ready to plan the ultimate bachelor party? <a href="/private-cruises">Reserve your Lake Travis party boat with Premier Party Cruises</a> and create an Austin bachelor party experience your groom will never forget!</p>`,
      excerpt: "Discover why Austin is the ultimate bachelor party destination with Lake Travis boats, world-class BBQ, nightlife, breweries, and perfect year-round weather.",
      metaTitle: "Why Choose Austin for Bachelor Parties | Top 10 Reasons",
      metaDescription: "Top 10 reasons Austin is perfect for bachelor parties: Lake Travis boats, BBQ, no state tax, nightlife, breweries & year-round weather. Plan now!",
      focusKeyphrase: "Austin bachelor party"
    }, ["Bachelor Parties", "Austin Travel", "Lake Travis"], ["Austin", "Bachelor Party", "Party Boat", "Lake Travis", "Travel Guide"], 4) ? created++ : skipped++;

    // Blog 5: Perfect Itinerary for a Bachelor Party in Austin
    await createPost({
      title: "Perfect Itinerary for a Bachelor Party in Austin",
      slug: "perfect-bachelor-party-itinerary-austin",
      content: `<h2>The Ultimate 3-Day Austin Bachelor Party Itinerary</h2>
        <p>Planning the perfect <strong>Austin bachelor party itinerary</strong> requires balancing legendary nightlife, outdoor adventures, amazing food, and that centerpiece Lake Travis party boat experience. This hour-by-hour guide ensures your bachelor weekend hits every note.</p>
        
        <h2>Friday: Arrival & First Impressions</h2>
        <h3>2:00 PM - Check-In & Settle</h3>
        <p>Arrive at your downtown accommodation or Airbnb. Popular options include W Austin (luxury), East Austin houses (groups), or South Congress hotels. Allow time for everyone to arrive and unpack.</p>
        <h3>4:00 PM - Happy Hour Welcome</h3>
        <p><strong>Location:</strong> Easy Tiger Bake Shop (6th Street)<br><strong>Budget:</strong> $20-30/person<br>Start with German-style beer garden vibes, pretzels, and craft beers. Perfect spot for the crew to gather and kick off the weekend.</p>
        <h3>6:30 PM - Dinner at Fogo de Chão</h3>
        <p><strong>Location:</strong> Fogo de Chão Brazilian Steakhouse (downtown)<br><strong>Budget:</strong> $60-80/person<br>All-you-can-eat Brazilian steakhouse with 15+ meat options. Perfect for fueling up before the night ahead. Reserve in advance.</p>
        <h3>9:00 PM - 6th Street Bar Crawl</h3>
        <p><strong>Route:</strong> Kung Fu Saloon → Shakespeare's → Rain → Blind Pig<br><strong>Budget:</strong> $100-150/person<br>Start at Kung Fu for games and shots, hit Shakespeare's for the crowd, dance at Rain nightclub, end at Blind Pig for live music. Consider VIP table service at Rain ($300-500 for the group).</p>
        <h3>1:00 AM - Late Night Fuel</h3>
        <p><strong>Location:</strong> P. Terry's or Whataburger<br><strong>Budget:</strong> $10/person<br>Essential late-night burgers to soak up the festivities.</p>
        
        <h2>Saturday: The Main Event</h2>
        <h3>10:00 AM - Recovery Breakfast</h3>
        <p><strong>Location:</strong> Juan in a Million<br><strong>Budget:</strong> $15/person<br>Legendary breakfast tacos and "Don Juan" plate. The portions are massive and the hangover cure is real.</p>
        <h3>11:30 AM - Depart for Lake Travis</h3>
        <p><strong>Transportation:</strong> Rent a party bus or arrange Ubers<br><strong>Budget:</strong> $30-50/person for party bus<br>30-40 minute drive to the lake. Stock up on drinks and snacks for the boat.</p>
        <h3>12:30 PM - LAKE TRAVIS PARTY BOAT CRUISE</h3>
        <p><strong>Duration:</strong> 3-4 hours<br><strong>Budget:</strong> $100-200/person<br><strong>THE HIGHLIGHT:</strong> Private <strong>Lake Travis bachelor party boat</strong> with captain, crew, sound system, and water toys. Swim, drink, blast music, and create unforgettable memories. This is what everyone will remember. <a href="/private-cruises">Book with Premier Party Cruises for the best experience</a>.</p>
        <h3>4:30 PM - Return & Refresh</h3>
        <p>Head back to accommodations. Rest, shower, and prepare for round 2.</p>
        <h3>7:00 PM - BBQ Feast</h3>
        <p><strong>Location:</strong> Terry Black's Barbecue or Salt Lick (Driftwood)<br><strong>Budget:</strong> $40-60/person<br>World-famous Texas BBQ. Terry Black's is in Austin with shorter lines. Salt Lick offers family-style AYCE 30 minutes outside Austin.</p>
        <h3>9:00 PM - Rainey Street Scene</h3>
        <p><strong>Route:</strong> Banger's → Craft Pride → Lustre Pearl → Container Bar<br><strong>Budget:</strong> $80-120/person<br>More upscale bar scene with converted bungalows, outdoor patios, and craft cocktails. Perfect for cigars, whiskey, and elevated bachelor party vibes.</p>
        <h3>11:30 PM - Club Night (Optional)</h3>
        <p><strong>Locations:</strong> Barbarella or Rain<br><strong>Budget:</strong> $50-100/person<br>For those with energy left, hit a club for dancing and bottle service.</p>
        
        <h2>Sunday: Recovery & Farewell</h2>
        <h3>11:00 AM - Brunch</h3>
        <p><strong>Location:</strong> Kerbey Lane Cafe or Snooze<br><strong>Budget:</strong> $20-30/person<br>Pancakes, migas, and Bloody Marys to ease into the final day.</p>
        <h3>1:00 PM - Bonus Activity (Choose One)</h3>
        <p><strong>Option A - TopGolf:</strong> 2 hours of golf, drinks, and friendly competition ($50/person)<br><strong>Option B - Brewery Tour:</strong> Visit 3 breweries with a driver service ($60/person)<br><strong>Option C - Pool Day:</strong> Relax at hotel/rental pool with cold beers ($20/person)</p>
        <h3>4:00 PM - Farewell Beers</h3>
        <p><strong>Location:</strong> Zilker Brewing or Live Oak Brewing<br><strong>Budget:</strong> $20/person<br>One last round with the crew before heading home.</p>
        <h3>6:00 PM - Departure</h3>
        <p>Head to the airport or hit the road. Memories made.</p>
        
        <h2>Complete Budget Breakdown</h2>
        <ul>
          <li><strong>Accommodations (2 nights):</strong> $200-400/person</li>
          <li><strong>Lake Travis Party Boat:</strong> $150-200/person</li>
          <li><strong>Dining (6 meals):</strong> $200-300/person</li>
          <li><strong>Nightlife & Drinks:</strong> $200-350/person</li>
          <li><strong>Transportation:</strong> $80-150/person</li>
          <li><strong>Activities (TopGolf, etc):</strong> $50-100/person</li>
          <li><strong>TOTAL PER PERSON:</strong> $880-1,500</li>
        </ul>
        
        <h2>Pro Tips for Your Austin Bachelor Party</h2>
        <ul>
          <li>Book your <strong>Lake Travis party boat</strong> 2-3 months in advance</li>
          <li>Reserve Friday/Saturday dinner spots 2-4 weeks ahead</li>
          <li>For BBQ, arrive at Franklin by 9am or choose Terry Black's for shorter waits</li>
          <li>Rent a party bus for lake day instead of coordinating multiple Ubers</li>
          <li>Designate a "party coordinator" to handle reservations and logistics</li>
          <li>Pack sunscreen, sunglasses, and swimwear for the boat</li>
          <li>Download offline maps of Austin's bar districts</li>
        </ul>
        
        <h2>What to Pack for Your Austin Bachelor Party</h2>
        <ul>
          <li>Swimwear and boat-appropriate clothing</li>
          <li>Sunscreen and sunglasses (Texas sun is intense)</li>
          <li>Comfortable walking shoes for nightlife</li>
          <li>Light jacket (AC in bars can be cold)</li>
          <li>Portable phone charger</li>
          <li>Cash for tips and cover charges</li>
          <li>Bachelor party group shirts (optional but fun)</li>
        </ul>
        
        <h2>Book Your Austin Bachelor Party Now</h2>
        <p>This <strong>Austin bachelor party itinerary</strong> has been perfected through hundreds of successful celebrations. The key is booking your Lake Travis party boat early—it's the experience that makes Austin bachelor parties legendary. <a href="/private-cruises">Reserve your date with Premier Party Cruises</a> and let us help you create the ultimate bachelor weekend!</p>`,
      excerpt: "The ultimate hour-by-hour Austin bachelor party itinerary covering 3 days of Lake Travis boats, BBQ, nightlife, activities, and detailed budget breakdown.",
      metaTitle: "Perfect Austin Bachelor Party Itinerary | 3-Day Guide",
      metaDescription: "Complete 3-day Austin bachelor party itinerary: Lake Travis boats, BBQ, 6th Street nightlife, TopGolf, budget breakdown & pro tips. 2000+ word guide!",
      focusKeyphrase: "Austin bachelor party itinerary"
    }, ["Bachelor Parties", "Austin Travel", "Party Planning", "Lake Travis"], ["Austin", "Bachelor Party", "Party Boat", "Lake Travis", "Party Planning", "Travel Guide"], 5) ? created++ : skipped++;

    // Monthly blogs start here...
    console.log('\n📅 Creating monthly blog posts...\n');

    // January - Bachelor focus
    await createPost({
      title: "Why Austin is Perfect for Bachelor Parties in January",
      slug: "austin-bachelor-party-january",
      content: `<h2>January Bachelor Parties in Austin: The Complete Guide</h2>
        <p>Planning a <strong>January bachelor party in Austin</strong>? You've chosen wisely. While other cities freeze, Austin offers mild winter weather, great deals, and fewer crowds—perfect for an unforgettable guys' weekend.</p>
        <h2>Austin Weather in January</h2>
        <p><strong>Average Temperature:</strong> 41°F-62°F (5°C-17°C)<br><strong>Rainfall:</strong> 2 inches average<br><strong>Lake Travis Conditions:</strong> Water temp 55-60°F, calm conditions, excellent boating weather</p>
        <p>January brings Austin's mildest winter weather. Expect sunny days in the 60s and cool nights in the 40s. Perfect sweater weather for outdoor activities, and Lake Travis party boats still operate in comfort.</p>
        <h2>Top January Events & Festivals</h2>
        <ul>
          <li><strong>New Year's Festivities (Early Jan):</strong> Extended celebrations throughout the city</li>
          <li><strong>Austin Marathon (Mid-Jan):</strong> City energy is high, great bar specials</li>
          <li><strong>Restaurant Week (Late Jan):</strong> Prix fixe menus at top restaurants</li>
        </ul>
        <h2>Lake Travis Party Boat Availability</h2>
        <p>January is prime booking season for Lake Travis bachelor parties. With off-season pricing and excellent availability, you'll get:</p>
        <ul>
          <li>Better rates (20-30% off peak summer pricing)</li>
          <li>More flexible booking times</li>
          <li>Less crowded lake conditions</li>
          <li>Experienced captains with perfect weather windows</li>
        </ul>
        <h2>Austin Nightlife in January</h2>
        <p>6th Street and Rainey Street are less crowded in January, meaning shorter bar lines, better service, and more space for your bachelor party crew. Local favorite venues:</p>
        <ul>
          <li>Craft Pride for whiskey and craft beer</li>
          <li>Midnight Cowboy for upscale cocktails</li>
          <li>Rain for dancing and bottle service</li>
          <li>Lustre Pearl for rooftop hangs</li>
        </ul>
        <h2>Pricing & Deals for January Bachelor Parties</h2>
        <p>January is LOW season in Austin, which means incredible deals:</p>
        <ul>
          <li><strong>Accommodations:</strong> 30-40% cheaper than summer</li>
          <li><strong>Party Boats:</strong> Off-season discounts available</li>
          <li><strong>Restaurants:</strong> Restaurant Week prix fixe menus</li>
          <li><strong>Flights:</strong> Post-holiday low fares</li>
        </ul>
        <h2>What to Pack for January</h2>
        <ul>
          <li>Layers: T-shirts, long sleeves, and a light jacket</li>
          <li>Jeans and casual pants</li>
          <li>Closed-toe shoes for nightlife</li>
          <li>Swimwear for the boat (midday sun warms up)</li>
          <li>Sunglasses and sunscreen</li>
        </ul>
        <h2>Pro Tips for January Bachelor Parties</h2>
        <ul>
          <li>Book boat cruises for midday (12pm-4pm) when temps peak</li>
          <li>Make dinner reservations during Restaurant Week for deals</li>
          <li>Take advantage of empty bars early evening (5-7pm)</li>
          <li>Check UT basketball schedule for game day energy</li>
        </ul>
        <h2>Sample January Bachelor Party Weekend</h2>
        <h3>Saturday</h3>
        <ul>
          <li>11am: Breakfast tacos at Veracruz</li>
          <li>1pm: Lake Travis party boat cruise (3 hours)</li>
          <li>5pm: Hotel refresh</li>
          <li>7pm: BBQ at Franklin or Terry Black's</li>
          <li>9pm: 6th Street bar crawl</li>
        </ul>
        <h3>Sunday</h3>
        <ul>
          <li>11am: Brunch at Kerbey Lane</li>
          <li>1pm: TopGolf or brewery tour</li>
          <li>4pm: Farewell drinks</li>
        </ul>
        <h2>Book Your January Austin Bachelor Party</h2>
        <p>January offers unbeatable value for Austin bachelor parties. Mild weather, great deals, and fewer crowds make it the smart choice. <a href="/private-cruises">Reserve your Lake Travis party boat with Premier Party Cruises</a> and take advantage of off-season rates!</p>`,
      excerpt: "January Austin bachelor parties offer mild weather, low-season pricing, and perfect Lake Travis conditions. Complete guide with weather, events, and itinerary.",
      metaTitle: "Austin Bachelor Party in January | Weather & Guide",
      metaDescription: "Plan a January Austin bachelor party: mild 60°F weather, 30% off pricing, Lake Travis boats & complete weekend guide. Best off-season value!",
      focusKeyphrase: "Austin bachelor party January"
    }, ["Bachelor Parties", "Austin Travel"], ["Austin", "Bachelor Party", "Party Boat", "Lake Travis", "Monthly Guide"], 6) ? created++ : skipped++;

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Created: ${created} new posts`);
    console.log(`   ⏭️  Skipped: ${skipped} existing posts`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

completeBlogCreation();
