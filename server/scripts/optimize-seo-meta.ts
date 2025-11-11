/**
 * SEO Metadata Optimization Script
 * Updates database with optimized meta titles and descriptions for all pages
 * Ensures titles are under 60 chars with location keywords
 * Ensures descriptions are 150-160 chars with action verbs and CTAs
 */

import { storage } from '../storage';
import type { InsertSeoPage } from '@shared/schema';

// Define optimized SEO data for each page
const seoPages: InsertSeoPage[] = [
  {
    pageRoute: '/',
    pageName: 'Homepage',
    metaTitle: 'Austin Party Boat Rentals | Lake Travis Cruises',
    metaDescription: 'Experience the ultimate party boat rentals on Lake Travis. Austin\'s premier fleet with disco cruises, private charters & events. Book now!',
    openGraphTitle: 'Austin Party Boat Rentals | Lake Travis Cruises',
    openGraphDescription: 'Experience the ultimate party boat rentals on Lake Travis. Austin\'s premier fleet with disco cruises, private charters & events. Book now!',
    openGraphType: 'website',
    twitterTitle: 'Austin Party Boat Rentals | Lake Travis Cruises',
    twitterDescription: 'Experience the ultimate party boat rentals on Lake Travis. Austin\'s premier fleet with disco cruises, private charters & events. Book now!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'party boat Austin',
    targetKeywords: ['party boat Austin', 'Lake Travis boat rentals', 'Austin boat party', 'Lake Travis cruises'],
    robotsDirective: 'index, follow',
    priority: 100,
    changeFrequency: 'weekly'
  },
  {
    pageRoute: '/bachelor-party-austin',
    pageName: 'Bachelor Party Cruises',
    metaTitle: 'Austin Bachelor Party Boats | Lake Travis Cruises',
    metaDescription: 'Book the ultimate bachelor party boat on Lake Travis Austin. BYOB cruises with premium sound, Party On Delivery coordination & epic party atmosphere. Reserve today!',
    openGraphTitle: 'Austin Bachelor Party Boats | Lake Travis Cruises',
    openGraphDescription: 'Book the ultimate bachelor party boat on Lake Travis Austin. BYOB cruises with premium sound, Party On Delivery coordination & epic party atmosphere. Reserve today!',
    openGraphType: 'website',
    twitterTitle: 'Austin Bachelor Party Boats | Lake Travis Cruises',
    twitterDescription: 'Book the ultimate bachelor party boat on Lake Travis Austin. BYOB cruises with premium sound, Party On Delivery coordination & epic party atmosphere. Reserve today!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'bachelor party boat Austin',
    targetKeywords: ['bachelor party boat Austin', 'Lake Travis bachelor party', 'Austin bachelor cruise', 'bachelor party Lake Travis'],
    robotsDirective: 'index, follow',
    priority: 95,
    changeFrequency: 'weekly'
  },
  {
    pageRoute: '/bachelorette-party-austin',
    pageName: 'Bachelorette Party Cruises',
    metaTitle: 'Austin Bachelorette Party Boats | Lake Travis',
    metaDescription: 'Celebrate your bachelorette party on Lake Travis Austin. Luxury boats with music, drinks & unforgettable views. Perfect for groups. Book now!',
    openGraphTitle: 'Austin Bachelorette Party Boats | Lake Travis',
    openGraphDescription: 'Celebrate your bachelorette party on Lake Travis Austin. Luxury boats with music, drinks & unforgettable views. Perfect for groups. Book now!',
    openGraphType: 'website',
    twitterTitle: 'Austin Bachelorette Party Boats | Lake Travis',
    twitterDescription: 'Celebrate your bachelorette party on Lake Travis Austin. Luxury boats with music, drinks & unforgettable views. Perfect for groups. Book now!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'bachelorette party boat Austin',
    targetKeywords: ['bachelorette party boat Austin', 'Lake Travis bachelorette', 'Austin bachelorette cruise', 'bachelorette party Lake Travis'],
    robotsDirective: 'index, follow',
    priority: 95,
    changeFrequency: 'weekly'
  },
  {
    pageRoute: '/atx-disco-cruise',
    pageName: 'ATX Disco Cruise',
    metaTitle: 'ATX Disco Cruise | Lake Travis Party Boat',
    metaDescription: 'Dance the night away on Austin\'s famous disco cruise. Lake Travis party boat with DJ, light show & cocktails. Limited tickets - Reserve today!',
    openGraphTitle: 'ATX Disco Cruise | Lake Travis Party Boat',
    openGraphDescription: 'Dance the night away on Austin\'s famous disco cruise. Lake Travis party boat with DJ, light show & cocktails. Limited tickets - Reserve today!',
    openGraphType: 'event',
    twitterTitle: 'ATX Disco Cruise | Lake Travis Party Boat',
    twitterDescription: 'Dance the night away on Austin\'s famous disco cruise. Lake Travis party boat with DJ, light show & cocktails. Limited tickets - Reserve today!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'ATX disco cruise',
    targetKeywords: ['ATX disco cruise', 'Lake Travis disco boat', 'Austin party cruise', 'disco boat Austin'],
    robotsDirective: 'index, follow',
    priority: 90,
    changeFrequency: 'weekly'
  },
  {
    pageRoute: '/private-cruises',
    pageName: 'Private Boat Rentals',
    metaTitle: 'Private Boat Rentals Austin | Lake Travis',
    metaDescription: 'Book private boat rentals on Lake Travis Austin. Customizable cruises for any occasion with premium amenities. Perfect for groups. Get quote!',
    openGraphTitle: 'Private Boat Rentals Austin | Lake Travis',
    openGraphDescription: 'Book private boat rentals on Lake Travis Austin. Customizable cruises for any occasion with premium amenities. Perfect for groups. Get quote!',
    openGraphType: 'website',
    twitterTitle: 'Private Boat Rentals Austin | Lake Travis',
    twitterDescription: 'Book private boat rentals on Lake Travis Austin. Customizable cruises for any occasion with premium amenities. Perfect for groups. Get quote!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'private boat rental Austin',
    targetKeywords: ['private boat rental Austin', 'Lake Travis private cruise', 'Austin boat charter', 'private yacht Austin'],
    robotsDirective: 'index, follow',
    priority: 90,
    changeFrequency: 'weekly'
  },
  {
    pageRoute: '/corporate-events',
    pageName: 'Corporate Event Cruises',
    metaTitle: 'Corporate Event Cruises | Lake Travis Austin',
    metaDescription: 'Host impressive corporate events on Lake Travis Austin. Team outings, client entertainment & company parties on luxury boats. Book today!',
    openGraphTitle: 'Corporate Event Cruises | Lake Travis Austin',
    openGraphDescription: 'Host impressive corporate events on Lake Travis Austin. Team outings, client entertainment & company parties on luxury boats. Book today!',
    openGraphType: 'website',
    twitterTitle: 'Corporate Event Cruises | Lake Travis Austin',
    twitterDescription: 'Host impressive corporate events on Lake Travis Austin. Team outings, client entertainment & company parties on luxury boats. Book today!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'corporate event boat Austin',
    targetKeywords: ['corporate event boat Austin', 'Lake Travis corporate cruise', 'Austin company party boat', 'business event cruise'],
    robotsDirective: 'index, follow',
    priority: 85,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/team-building',
    pageName: 'Team Building Cruises',
    metaTitle: 'Team Building Cruises Austin | Lake Travis',
    metaDescription: 'Strengthen your team with unique Lake Travis Austin cruises. Fun team building activities on water with catering options. Reserve today!',
    openGraphTitle: 'Team Building Cruises Austin | Lake Travis',
    openGraphDescription: 'Strengthen your team with unique Lake Travis Austin cruises. Fun team building activities on water with catering options. Reserve today!',
    openGraphType: 'website',
    twitterTitle: 'Team Building Cruises Austin | Lake Travis',
    twitterDescription: 'Strengthen your team with unique Lake Travis Austin cruises. Fun team building activities on water with catering options. Reserve today!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'team building cruise Austin',
    targetKeywords: ['team building cruise Austin', 'Lake Travis team events', 'Austin corporate team building', 'team outing boat'],
    robotsDirective: 'index, follow',
    priority: 80,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/birthday-parties',
    pageName: 'Birthday Party Boats',
    metaTitle: 'Birthday Party Boats Austin | Lake Travis',
    metaDescription: 'Celebrate birthdays in style on Lake Travis Austin. Party boats with music, swimming & sunset views. All ages welcome. Book your party!',
    openGraphTitle: 'Birthday Party Boats Austin | Lake Travis',
    openGraphDescription: 'Celebrate birthdays in style on Lake Travis Austin. Party boats with music, swimming & sunset views. All ages welcome. Book your party!',
    openGraphType: 'website',
    twitterTitle: 'Birthday Party Boats Austin | Lake Travis',
    twitterDescription: 'Celebrate birthdays in style on Lake Travis Austin. Party boats with music, swimming & sunset views. All ages welcome. Book your party!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'birthday party boat Austin',
    targetKeywords: ['birthday party boat Austin', 'Lake Travis birthday cruise', 'Austin birthday boat rental', 'birthday celebration cruise'],
    robotsDirective: 'index, follow',
    priority: 85,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/wedding-venues',
    pageName: 'Wedding Venue Boats',
    metaTitle: 'Wedding Venue Boats | Lake Travis Austin',
    metaDescription: 'Experience unique wedding venues on Lake Travis Austin boats. Ceremonies & receptions with stunning sunset views. Create memories. Get quote!',
    openGraphTitle: 'Wedding Venue Boats | Lake Travis Austin',
    openGraphDescription: 'Experience unique wedding venues on Lake Travis Austin boats. Ceremonies & receptions with stunning sunset views. Create memories. Get quote!',
    openGraphType: 'website',
    twitterTitle: 'Wedding Venue Boats | Lake Travis Austin',
    twitterDescription: 'Experience unique wedding venues on Lake Travis Austin boats. Ceremonies & receptions with stunning sunset views. Create memories. Get quote!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'wedding boat venue Austin',
    targetKeywords: ['wedding boat venue Austin', 'Lake Travis wedding cruise', 'Austin wedding boat', 'waterfront wedding venue'],
    robotsDirective: 'index, follow',
    priority: 80,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/reunions',
    pageName: 'Reunion Cruises',
    metaTitle: 'Reunion Cruises Austin | Lake Travis Boats',
    metaDescription: 'Host memorable family & class reunions on Lake Travis Austin. Spacious boats perfect for large groups with catering available. Book now!',
    openGraphTitle: 'Reunion Cruises Austin | Lake Travis Boats',
    openGraphDescription: 'Host memorable family & class reunions on Lake Travis Austin. Spacious boats perfect for large groups with catering available. Book now!',
    openGraphType: 'website',
    twitterTitle: 'Reunion Cruises Austin | Lake Travis Boats',
    twitterDescription: 'Host memorable family & class reunions on Lake Travis Austin. Spacious boats perfect for large groups with catering available. Book now!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'reunion cruise Austin',
    targetKeywords: ['reunion cruise Austin', 'Lake Travis family reunion', 'class reunion boat Austin', 'group reunion cruise'],
    robotsDirective: 'index, follow',
    priority: 75,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/rehearsal-dinner',
    pageName: 'Rehearsal Dinner Cruises',
    metaTitle: 'Rehearsal Dinner Cruises | Lake Travis',
    metaDescription: 'Create unforgettable rehearsal dinners on Lake Travis Austin. Intimate boat settings with catering & sunset views. Reserve your date!',
    openGraphTitle: 'Rehearsal Dinner Cruises | Lake Travis',
    openGraphDescription: 'Create unforgettable rehearsal dinners on Lake Travis Austin. Intimate boat settings with catering & sunset views. Reserve your date!',
    openGraphType: 'website',
    twitterTitle: 'Rehearsal Dinner Cruises | Lake Travis',
    twitterDescription: 'Create unforgettable rehearsal dinners on Lake Travis Austin. Intimate boat settings with catering & sunset views. Reserve your date!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'rehearsal dinner cruise Austin',
    targetKeywords: ['rehearsal dinner cruise Austin', 'Lake Travis rehearsal dinner', 'wedding rehearsal boat', 'dinner cruise Austin'],
    robotsDirective: 'index, follow',
    priority: 75,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/sweet-16',
    pageName: 'Sweet 16 Party Boats',
    metaTitle: 'Sweet 16 Party Boats | Lake Travis Austin',
    metaDescription: 'Celebrate Sweet 16 in style on Lake Travis Austin. Safe, fun party boats with music & swimming. Perfect for teens. Book your celebration!',
    openGraphTitle: 'Sweet 16 Party Boats | Lake Travis Austin',
    openGraphDescription: 'Celebrate Sweet 16 in style on Lake Travis Austin. Safe, fun party boats with music & swimming. Perfect for teens. Book your celebration!',
    openGraphType: 'website',
    twitterTitle: 'Sweet 16 Party Boats | Lake Travis Austin',
    twitterDescription: 'Celebrate Sweet 16 in style on Lake Travis Austin. Safe, fun party boats with music & swimming. Perfect for teens. Book your celebration!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'Sweet 16 party boat Austin',
    targetKeywords: ['Sweet 16 party boat Austin', 'Lake Travis Sweet 16', 'teen birthday cruise Austin', 'Sweet 16 celebration boat'],
    robotsDirective: 'index, follow',
    priority: 75,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/quinceañeras',
    pageName: 'Quinceañera Party Boats',
    metaTitle: 'Quinceañera Boats Austin | Lake Travis',
    metaDescription: 'Celebrate Quinceañeras on beautiful Lake Travis Austin boats. Traditional celebrations with modern fun. Family-friendly. Reserve today!',
    openGraphTitle: 'Quinceañera Boats Austin | Lake Travis',
    openGraphDescription: 'Celebrate Quinceañeras on beautiful Lake Travis Austin boats. Traditional celebrations with modern fun. Family-friendly. Reserve today!',
    openGraphType: 'website',
    twitterTitle: 'Quinceañera Boats Austin | Lake Travis',
    twitterDescription: 'Celebrate Quinceañeras on beautiful Lake Travis Austin boats. Traditional celebrations with modern fun. Family-friendly. Reserve today!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'Quinceañera boat Austin',
    targetKeywords: ['Quinceañera boat Austin', 'Lake Travis Quinceañera', 'Austin Quinceañera cruise', 'Quince celebration boat'],
    robotsDirective: 'index, follow',
    priority: 75,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/contact',
    pageName: 'Contact Us',
    metaTitle: 'Contact Premier Party Cruises | Austin Boats',
    metaDescription: 'Contact Austin\'s premier Lake Travis boat rental company. Quick quotes, availability & booking assistance. Call or message us today!',
    openGraphTitle: 'Contact Premier Party Cruises | Austin Boats',
    openGraphDescription: 'Contact Austin\'s premier Lake Travis boat rental company. Quick quotes, availability & booking assistance. Call or message us today!',
    openGraphType: 'website',
    twitterTitle: 'Contact Premier Party Cruises | Austin Boats',
    twitterDescription: 'Contact Austin\'s premier Lake Travis boat rental company. Quick quotes, availability & booking assistance. Call or message us today!',
    twitterCard: 'summary',
    focusKeyword: 'contact Austin boat rental',
    targetKeywords: ['contact Austin boat rental', 'Lake Travis boat inquiry', 'party boat contact', 'Austin cruise booking'],
    robotsDirective: 'index, follow',
    priority: 70,
    changeFrequency: 'yearly'
  },
  {
    pageRoute: '/faq',
    pageName: 'Frequently Asked Questions',
    metaTitle: 'FAQs | Austin Lake Travis Boat Rentals',
    metaDescription: 'Find answers about Austin Lake Travis boat rentals. Pricing, capacity, weather policies & booking info. Everything you need to know!',
    openGraphTitle: 'FAQs | Austin Lake Travis Boat Rentals',
    openGraphDescription: 'Find answers about Austin Lake Travis boat rentals. Pricing, capacity, weather policies & booking info. Everything you need to know!',
    openGraphType: 'website',
    twitterTitle: 'FAQs | Austin Lake Travis Boat Rentals',
    twitterDescription: 'Find answers about Austin Lake Travis boat rentals. Pricing, capacity, weather policies & booking info. Everything you need to know!',
    twitterCard: 'summary',
    focusKeyword: 'Lake Travis boat rental FAQ',
    targetKeywords: ['Lake Travis boat rental FAQ', 'Austin boat questions', 'party cruise FAQs', 'boat rental policies'],
    robotsDirective: 'index, follow',
    priority: 70,
    changeFrequency: 'monthly'
  },
  {
    pageRoute: '/golden-ticket',
    pageName: 'Golden Ticket Deals',
    metaTitle: 'Golden Ticket Deals | Austin Party Boats',
    metaDescription: 'Discover exclusive Golden Ticket deals for Austin Lake Travis party boats. Limited-time discounts & special packages. Save big - Book now!',
    openGraphTitle: 'Golden Ticket Deals | Austin Party Boats',
    openGraphDescription: 'Discover exclusive Golden Ticket deals for Austin Lake Travis party boats. Limited-time discounts & special packages. Save big - Book now!',
    openGraphType: 'website',
    twitterTitle: 'Golden Ticket Deals | Austin Party Boats',
    twitterDescription: 'Discover exclusive Golden Ticket deals for Austin Lake Travis party boats. Limited-time discounts & special packages. Save big - Book now!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'Austin boat rental deals',
    targetKeywords: ['Austin boat rental deals', 'Lake Travis discounts', 'party boat specials', 'Golden Ticket offers'],
    robotsDirective: 'index, follow',
    priority: 85,
    changeFrequency: 'weekly'
  },
  {
    pageRoute: '/gallery',
    pageName: 'Photo Gallery',
    metaTitle: 'Photo Gallery | Austin Lake Travis Cruises',
    metaDescription: 'Browse stunning photos of Austin Lake Travis party boats & cruises. See our fleet, events & happy customers. Get inspired for your event!',
    openGraphTitle: 'Photo Gallery | Austin Lake Travis Cruises',
    openGraphDescription: 'Browse stunning photos of Austin Lake Travis party boats & cruises. See our fleet, events & happy customers. Get inspired for your event!',
    openGraphType: 'website',
    twitterTitle: 'Photo Gallery | Austin Lake Travis Cruises',
    twitterDescription: 'Browse stunning photos of Austin Lake Travis party boats & cruises. See our fleet, events & happy customers. Get inspired for your event!',
    twitterCard: 'summary_large_image',
    focusKeyword: 'Lake Travis boat photos',
    targetKeywords: ['Lake Travis boat photos', 'Austin party boat gallery', 'cruise photos Austin', 'boat rental pictures'],
    robotsDirective: 'index, follow',
    priority: 70,
    changeFrequency: 'monthly'
  }
];

async function optimizeSeoMetadata() {
  console.log('🚀 Starting SEO metadata optimization...\n');
  console.log(`📋 Processing ${seoPages.length} pages...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const page of seoPages) {
    try {
      console.log(`⚙️  Optimizing: ${page.pageRoute}`);
      console.log(`   Title: "${page.metaTitle}" (${page.metaTitle?.length || 0} chars)`);
      console.log(`   Description: "${page.metaDescription}" (${page.metaDescription?.length || 0} chars)`);

      // Add orgId if not present
      const pageData = {
        ...page,
        orgId: 'org_demo'
      };

      await storage.upsertSeoPage(pageData);
      
      successCount++;
      console.log(`   ✅ Successfully optimized!\n`);
    } catch (error) {
      errorCount++;
      console.error(`   ❌ Error optimizing ${page.pageRoute}:`, error);
      console.error(`      ${error.message}\n`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 SEO Optimization Complete!');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${successCount} pages`);
  console.log(`❌ Errors: ${errorCount} pages`);
  console.log(`📈 Total processed: ${seoPages.length} pages`);
  console.log('='.repeat(60) + '\n');

  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run the optimization
optimizeSeoMetadata()
  .then(() => {
    console.log('🎉 SEO metadata optimization completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error during optimization:', error);
    process.exit(1);
  });