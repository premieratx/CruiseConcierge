import { storage } from '../server/storage';

async function createMonthlyBlogs() {
  const authors = await storage.getBlogAuthors();
  const author = authors.find(a => a.slug === 'ppc-team')!;
  const allCategories = await storage.getBlogCategories();
  const allTags = await storage.getBlogTags();
  
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
      console.log(`✅ Blog ${num}: ${post.title}`);
      return true;
    } catch (err: any) {
      if (err.code === '23505') {
        console.log(`⏭️  Blog ${num}: Already exists - ${data.title}`);
        return false;
      }
      throw err;
    }
  }

  const monthlyData = [
    {
      month: "February", type: "Bachelorette", temp: "45°F-65°F", rain: "2.5 inches", theme: "Valentine's", event: "Austin Rodeo, Valentine's festivities", num: 7,
      categoryType: "Bachelorette Parties", partyType: "Bachelorette Party"
    },
    {
      month: "March", type: "Bachelor", temp: "52°F-72°F", rain: "2 inches", theme: "Spring Break", event: "SXSW Festival, Spring Break crowds", num: 8,
      categoryType: "Bachelor Parties", partyType: "Bachelor Party"
    },
    {
      month: "April", type: "Bachelorette", temp: "61°F-80°F", rain: "3 inches", theme: "Spring weather", event: "Bluebonnet season, Spring festivals", num: 9,
      categoryType: "Bachelorette Parties", partyType: "Bachelorette Party"
    },
    {
      month: "May", type: "Bachelor", temp: "69°F-87°F", rain: "4 inches", theme: "Memorial Day", event: "Memorial Day weekend, pool parties", num: 10,
      categoryType: "Bachelor Parties", partyType: "Bachelor Party"
    },
    {
      month: "June", type: "Bachelorette", temp: "74°F-93°F", rain: "3.5 inches", theme: "Summer start", event: "Summer lake season kicks off", num: 11,
      categoryType: "Bachelorette Parties", partyType: "Bachelorette Party"
    },
    {
      month: "July", type: "Bachelor", temp: "76°F-96°F", rain: "2 inches", theme: "4th of July", event: "Independence Day celebrations, fireworks", num: 12,
      categoryType: "Bachelor Parties", partyType: "Bachelor Party"
    },
    {
      month: "August", type: "Bachelorette", temp: "76°F-97°F", rain: "2.5 inches", theme: "Peak summer", event: "Peak lake season, Bat Fest", num: 13,
      categoryType: "Bachelorette Parties", partyType: "Bachelorette Party"
    },
    {
      month: "September", type: "Bachelor", temp: "71°F-91°F", rain: "3.5 inches", theme: "Labor Day", event: "Labor Day weekend, ACL Festival prep", num: 14,
      categoryType: "Bachelor Parties", partyType: "Bachelor Party"
    },
    {
      month: "October", type: "Bachelorette", temp: "62°F-82°F", rain: "3 inches", theme: "Fall weather", event: "ACL Music Festival, Halloween festivities", num: 15,
      categoryType: "Bachelorette Parties", partyType: "Bachelorette Party"
    },
    {
      month: "November", type: "Bachelor", temp: "51°F-71°F", rain: "2.5 inches", theme: "Thanksgiving", event: "UT Football, Thanksgiving weekend", num: 16,
      categoryType: "Bachelor Parties", partyType: "Bachelor Party"
    },
    {
      month: "December", type: "Bachelorette", temp: "43°F-64°F", rain: "2 inches", theme: "Holiday parties", event: "Trail of Lights, New Year's Eve", num: 17,
      categoryType: "Bachelorette Parties", partyType: "Bachelorette Party"
    }
  ];

  for (const m of monthlyData) {
    await createPost({
      title: `Why Austin is Perfect for ${m.type} Parties in ${m.month}`,
      slug: `austin-${m.type.toLowerCase()}-party-${m.month.toLowerCase()}`,
      content: `
        <h2>${m.month} ${m.type} Parties in Austin: The Complete Guide</h2>
        <p>Planning a <strong>${m.month} ${m.type.toLowerCase()} party in Austin</strong>? ${m.month} brings ${m.theme} energy to Texas' capital city, creating the perfect atmosphere for your celebration. From Lake Travis party boats to legendary nightlife, here's everything you need to know about ${m.month} ${m.type.toLowerCase()} parties in Austin.</p>
        
        <h2>Austin Weather in ${m.month}</h2>
        <p><strong>Average Temperature:</strong> ${m.temp}<br><strong>Rainfall:</strong> ${m.rain} average<br><strong>Lake Travis Conditions:</strong> ${m.month === "January" || m.month === "February" || m.month === "December" ? "Cool but pleasant, great for boat cruises with layers" : m.month === "June" || m.month === "July" || m.month === "August" ? "Perfect lake weather, warm water temps, peak boating season" : "Ideal conditions for lake activities"}</p>
        <p>${m.month} offers ${m.temp.includes("45°F") || m.temp.includes("43°F") ? "mild winter" : m.temp.includes("90°F") || m.temp.includes("96°F") || m.temp.includes("97°F") ? "hot summer" : "perfect spring/fall"} weather in Austin. ${m.month === "July" || m.month === "August" ? "The heat is perfect for Lake Travis activities - everyone wants to be on the water!" : m.month === "December" || m.month === "January" || m.month === "February" ? "Cooler temperatures make it comfortable for all-day activities, and the lake is less crowded." : "Comfortable temperatures ideal for both outdoor lake adventures and nightlife."}</p>
        
        <h2>Top ${m.month} Events & Festivals</h2>
        <p>${m.event} make ${m.month} an exciting time for ${m.type.toLowerCase()} parties in Austin. ${m.month === "March" ? "SXSW brings incredible energy to the city with world-class music and parties everywhere." : m.month === "October" ? "Austin City Limits Music Festival attracts top talent and creates an electric atmosphere." : m.month === "July" ? "Independence Day celebrations include lake fireworks and special party boat cruises." : m.month === "May" ? "Memorial Day weekend kicks off summer with packed bars and lake activities." : m.month === "December" ? "Holiday lights and New Year's Eve create magical celebration opportunities." : `${m.event} add extra excitement to your ${m.type.toLowerCase()} celebration.`}</p>
        
        <h2>Lake Travis Party Boat Availability</h2>
        <p>${m.month === "June" || m.month === "July" || m.month === "August" || m.month === "May" ? "Peak season! Book 2-3 months in advance for best availability." : m.month === "March" || m.month === "April" || m.month === "October" ? "Great availability with comfortable weather. Book 1-2 months ahead." : "Off-season availability with excellent rates. Book 3-4 weeks in advance."} ${m.type === "Bachelorette" ? "Our Lake Travis bachelorette party boats" : "Our Austin bachelor party boats"} accommodate 14-75 guests with captain, crew, sound system, and water activities.</p>
        <p>${m.month} lake conditions are ${m.month === "July" || m.month === "August" ? "absolutely perfect with warm water and sunny skies" : m.month === "December" || m.month === "January" || m.month === "February" ? "surprisingly pleasant with calm waters and comfortable midday temperatures" : "ideal for boat parties with great weather and beautiful scenery"}.</p>
        
        <h2>Austin Nightlife in ${m.month}</h2>
        <p>${m.month === "March" ? "SXSW brings world-class talent to 6th Street and Rainey Street. Bars are packed with energy." : m.month === "October" ? "ACL Festival creates an electric nightlife scene with after-parties and special events." : m.month === "June" || m.month === "July" || m.month === "August" ? "Summer nights on 6th Street and Rainey Street are legendary. Rooftop bars are perfect for warm evenings." : m.month === "December" ? "Holiday-themed bar crawls and New Year's Eve parties make December nightlife special." : "Austin's legendary bar scene is perfect for your ${m.type.toLowerCase()} celebration."} ${m.type === "Bachelorette" ? "Popular bachelorette spots include Midnight Cowboy, Barbarella, and Lustre Pearl." : "Top bachelor party venues include Kung Fu Saloon, Rain nightclub, and craft beer bars on Rainey Street."}</p>
        
        <h2>Pricing & Deals for ${m.month}</h2>
        <p>${m.month === "June" || m.month === "July" || m.month === "August" || m.month === "May" ? "Peak season pricing. Budget $800-1,200/person for a full weekend." : m.month === "March" || m.month === "April" || m.month === "September" || m.month === "October" ? "Shoulder season rates. Expect $600-900/person for a great weekend." : "Off-season deals! Budget $500-700/person with discounts on boats and accommodations."}</p>
        <ul>
          <li>Party Boat: ${m.month === "June" || m.month === "July" || m.month === "August" ? "$150-200/person" : m.month === "December" || m.month === "January" || m.month === "February" ? "$100-150/person (off-season rates)" : "$120-180/person"}</li>
          <li>Accommodations: ${m.month === "March" ? "Premium rates due to SXSW" : m.month === "October" ? "Higher rates during ACL Festival" : m.month === "July" || m.month === "August" ? "Peak summer rates" : "Great deals available"}</li>
          <li>Restaurants: ${m.month === "January" ? "Restaurant Week offers prix fixe deals" : "Standard pricing with happy hour specials"}</li>
        </ul>
        
        <h2>What to Pack for ${m.month}</h2>
        <ul>
          <li>${m.month === "December" || m.month === "January" || m.month === "February" ? "Layers: T-shirts, long sleeves, light jacket" : "Light, breathable clothing for hot weather"}</li>
          <li>${m.month === "July" || m.month === "August" || m.month === "June" ? "Lots of sunscreen (Texas sun is intense!)" : "Sunscreen and sunglasses"}</li>
          <li>Swimwear for the Lake Travis boat</li>
          <li>${m.type === "Bachelorette" ? "Cute outfits for nightlife and photo ops" : "Casual comfortable clothes for activities"}</li>
          <li>${m.month === "December" || m.month === "January" || m.month === "February" ? "Light jacket for cool evenings" : "Hat for sun protection"}</li>
        </ul>
        
        <h2>Pro Tips for ${m.month} ${m.type} Parties</h2>
        <ul>
          <li>${m.month === "March" ? "Book EVERYTHING early - SXSW makes the city very busy" : m.month === "October" ? "ACL weekend requires 2-3 month advance booking" : m.month === "July" ? "Book 4th of July weekend boats 3+ months ahead" : "Book Lake Travis boats and accommodations in advance"}</li>
          <li>${m.month === "July" || m.month === "August" ? "Start lake activities early (9am-1pm) to avoid peak heat" : m.month === "December" || m.month === "January" ? "Schedule boat cruises for midday when temps are warmest" : "Flexible timing works great in this weather"}</li>
          <li>${m.type === "Bachelorette" ? "Reserve spa treatments and upscale dinners ahead" : "Make BBQ and steakhouse reservations in advance"}</li>
          <li>${m.month === "February" ? "Valentine's theme makes everything more fun and festive" : m.month === "December" ? "Holiday lights create amazing photo opportunities" : `Take advantage of ${m.event.toLowerCase()}`}</li>
        </ul>
        
        <h2>Sample ${m.month} ${m.type} Party Weekend</h2>
        <h3>Saturday</h3>
        <ul>
          <li>11am: ${m.type === "Bachelorette" ? "Brunch at Snooze or Elizabeth Street Cafe" : "Breakfast tacos at Veracruz or Juan in a Million"}</li>
          <li>1pm: <strong>Lake Travis Party Boat Cruise (3-4 hours)</strong></li>
          <li>5pm: Return to hotel to refresh</li>
          <li>7pm: ${m.type === "Bachelorette" ? "Dinner at Uchi or Odd Duck" : "BBQ feast at Franklin or Terry Black's"}</li>
          <li>9pm: ${m.type === "Bachelorette" ? "Rainey Street bar hop with craft cocktails" : "6th Street bar crawl starting at Kung Fu Saloon"}</li>
        </ul>
        <h3>Sunday</h3>
        <ul>
          <li>11am: Recovery brunch at Kerbey Lane</li>
          <li>1pm: ${m.type === "Bachelorette" ? "Spa treatments or South Congress shopping" : "TopGolf or brewery tour"}</li>
          <li>4pm: Farewell drinks and departure</li>
        </ul>
        
        <h2>Book Your ${m.month} ${m.type} Party Boat</h2>
        <p>${m.month} is ${m.month === "June" || m.month === "July" || m.month === "August" ? "peak season" : m.month === "March" || m.month === "October" ? "an exciting time" : "perfect"} for <strong>${m.type.toLowerCase()} parties in Austin</strong>. ${m.theme.charAt(0).toUpperCase() + m.theme.slice(1)} energy, ${m.temp.includes("90°F") || m.temp.includes("96°F") ? "perfect lake weather" : "great weather"}, and ${m.type === "Bachelorette" ? "unforgettable experiences" : "epic celebrations"} await. <a href="/private-cruises">Reserve your Lake Travis party boat with Premier Party Cruises</a> and create memories that will last forever!</p>
      `,
      excerpt: `${m.month} Austin ${m.type.toLowerCase()} parties offer ${m.temp} weather, ${m.theme} energy, and perfect Lake Travis conditions. Complete guide with events, pricing, and itinerary.`,
      metaTitle: `Austin ${m.type} Party in ${m.month} | Weather & Guide`,
      metaDescription: `Plan a ${m.month} Austin ${m.type.toLowerCase()} party: ${m.temp} weather, ${m.theme} vibe, Lake Travis boats & complete guide. ${m.month === "June" || m.month === "July" || m.month === "August" ? "Peak season!" : "Great deals!"}`,
      focusKeyphrase: `Austin ${m.type.toLowerCase()} party ${m.month}`
    }, [m.categoryType, "Austin Travel"], ["Austin", m.partyType, "Party Boat", "Lake Travis", "Monthly Guide"], m.num);
  }

  console.log('\n✅ All monthly blogs created!');
}

createMonthlyBlogs();
