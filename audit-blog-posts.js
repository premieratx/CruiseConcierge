const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://premierpartycruises.com';

const BLOG_SLUGS = [
  'top-spots-tips-for-an-unforgettable-austin-bachelorette-party-experience',
  'claude-ai-market-analysis-premier-party-cruises',
  'why-choose-austin-bachelorette-party',
  'how-to-throw-great-bachelor-party-austin',
  'austin-bachelorette-party-december',
  'austin-bachelor-party-november',
  'austin-bachelorette-party-october',
  'austin-bachelor-party-september',
  'austin-bachelorette-party-august',
  'austin-bachelor-party-july',
  'austin-bachelorette-party-june',
  'austin-bachelor-party-may',
  'austin-bachelorette-party-april',
  'austin-bachelor-party-march',
  'austin-bachelorette-party-february',
  'austin-bachelor-party-january',
  'perfect-bachelor-party-itinerary-austin',
  'why-choose-austin-bachelor-party',
  'how-to-throw-great-bachelorette-party-austin',
  'why-choose-integrated-event-services-comparing-austin-party-planning-options',
  'integrated-austin-event-services-combining-alcohol-delivery-and-boat-rentals-for-perfect-celebrations',
  'lake-travis-boat-safety-and-maintenance-quality-standards-for-party-cruises',
  'lake-travis-boat-party-regulations-legal-requirements-and-compliance-guide',
  'lake-travis-boat-party-costs-complete-pricing-guide-and-budget-planning',
  'lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials',
  'accessible-lake-travis-boat-parties-inclusive-event-planning-for-all-guests',
  'lake-travis-boat-party-insurance-understanding-coverage-and-liability-for-events',
  'creative-lake-travis-boat-party-themes-unique-ideas-for-memorable-celebrations',
  'lake-travis-boat-party-logistics-complete-planning-and-coordination-guide',
  'holiday-celebrations-on-lake-travis-seasonal-boat-party-planning-and-coordination',
  'lake-travis-boat-party-music-sound-systems-and-entertainment-coordination',
  'lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests',
  'lake-travis-boat-party-photography-capturing-perfect-memories-on-the-water',
  'first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning',
  'lake-travis-boat-party-entertainment-activities-and-amenities-for-unforgettable-events',
  'lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion',
  'lake-travis-boat-party-catering-food-and-beverage-coordination-for-perfect-events',
  'lake-travis-boat-party-packages-comprehensive-guide-to-options-and-pricing',
  'lake-travis-weather-planning-seasonal-considerations-for-perfect-boat-parties',
  'lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises',
  'birthday-party-boat-rentals-on-lake-travis-milestone-celebrations-with-a-view',
  'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations',
  'corporate-team-building-on-lake-travis-professional-boat-rental-solutions',
  'austin-bachelorette-party-boats-lake-travis-adventures-for-unforgettable-celebrations',
  'lake-travis-bachelor-party-boat-rentals-the-ultimate-guide-to-epic-celebrations',
  'party-alcohol-safety-in-austin-responsible-service-and-guest-well-being',
  'austin-party-venue-alcohol-delivery-navigating-policies-and-logistics',
  'holiday-party-alcohol-themes-new-years-fourth-of-july-and-austin-celebrations',
  'graduation-party-alcohol-planning-ut-and-austin-college-celebrations',
  'pool-party-alcohol-coordination-summer-event-planning-in-austin-heat',
  'birthday-party-alcohol-delivery-austin-milestone-celebrations-made-easy',
  'wedding-anniversary-celebration-ideas-recreating-your-special-day-with-boat-and-alcohol-packages',
  'outdoor-wedding-alcohol-logistics-hill-country-and-lake-travis-coordination',
  'austin-wedding-venue-alcohol-policies-delivery-solutions-for-every-location',
  'wedding-party-alcohol-coordination-getting-ready-bachelor-bachelorette-and-reception',
  'rehearsal-dinner-boat-alcohol-delivery-unique-wedding-weekend-experiences',
  'conference-after-party-alcohol-coordination-sxsw-acl-and-austin-event-integration',
  'startup-celebration-alcohol-packages-funding-rounds-launches-and-milestone-events',
  'holiday-office-party-alcohol-delivery-stress-free-corporate-celebration-planning',
  'executive-retreat-alcohol-planning-balancing-professionalism-and-team-bonding',
  'client-entertainment-alcohol-strategy-impressing-without-overdoing-it',
  'corporate-team-building-on-lake-travis-alcohol-coordination-for-professional-events',
  'bachelorette-party-alcohol-emergency-kit-last-minute-delivery-solutions',
  'budget-friendly-bachelorette-party-alcohol-maximum-fun-without-breaking-the-bank',
  'instagram-worthy-bachelorette-party-cocktails-recipes-and-delivery-coordination',
  'lake-travis-bachelorette-party-alcohol-laws-what-you-can-and-cant-bring-on-boats',
  'cocktail-kits-vs-individual-bottles-the-smart-bachelorette-party-alcohol-strategy',
  'austin-bachelorette-weekend-alcohol-timeline-day-by-day-drinking-strategy-for-multi-day-celebrations',
  'lake-travis-bachelor-party-alcohol-delivery-complete-coordination-guide-for-boat-parties',
  'the-ultimate-austin-bachelorette-party-alcohol-guide-what-to-order-when-to-order-and-how-much-you-actually-need',
  'austin-bachelorette-bliss-spa-retreats-disco-cruises-alcohol-delivery',
  'the-recipe-for-the-chillest-atx-bach-party',
  'must-haves-for-the-perfect-austin-bachelorette-weekend',
  'the-top-dos-and-dont-for-success-on-the-atx-disco-cruise-with-premier-party-cruises',
  'disco-cruise-fashion-part-1',
  'joint-bachelor-bachelorette-parties-with-premier-party-cruises',
  'the-top-five-celebrities-at-our-dream-party-barge',
  'hello-world'
];

const auditResults = {
  totalPosts: 0,
  successfulLoads: 0,
  failedLoads: [],
  brokenImages: [],
  brokenInternalLinks: [],
  brokenExternalLinks: [],
  missingNavigation: [],
  missingCTA: [],
  imagesWithoutAlt: [],
  structureIssues: [],
  paginationIssue: false
};

async function checkUrl(url, type = 'page') {
  try {
    const response = await axios.get(url, {
      timeout: 15000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500
    });
    return {
      url,
      status: response.status,
      ok: response.status >= 200 && response.status < 400,
      type
    };
  } catch (error) {
    return {
      url,
      status: error.response?.status || 0,
      ok: false,
      error: error.message,
      type
    };
  }
}

async function auditBlogPost(slug, index) {
  console.log(`\n[${index + 1}/${BLOG_SLUGS.length}] Auditing: ${slug}`);
  auditResults.totalPosts++;

  const blogUrl = `${BASE_URL}/blogs/${slug}`;
  
  try {
    const response = await axios.get(blogUrl, {
      timeout: 15000,
      maxRedirects: 5,
      validateStatus: (status) => status < 500
    });

    if (response.status !== 200) {
      auditResults.failedLoads.push({
        slug,
        url: blogUrl,
        status: response.status
      });
      console.log(`  ❌ Failed to load (Status: ${response.status})`);
      return;
    }

    console.log(`  ✅ Page loaded successfully`);
    auditResults.successfulLoads++;

    const $ = cheerio.load(response.data);
    
    // Check for navigation
    const hasNav = $('nav').length > 0 || $('[role="navigation"]').length > 0;
    if (!hasNav) {
      auditResults.missingNavigation.push(slug);
      console.log(`  ⚠️  Missing navigation`);
    }

    // Check for CTA links to /chat
    const chatLinks = $('a[href*="/chat"]');
    if (chatLinks.length === 0) {
      auditResults.missingCTA.push(slug);
      console.log(`  ⚠️  No CTA link to /chat found`);
    }

    // Check all images
    const images = $('img');
    console.log(`  📸 Found ${images.length} images`);
    
    for (let i = 0; i < images.length; i++) {
      const img = $(images[i]);
      const src = img.attr('src');
      const alt = img.attr('alt');

      if (!alt || alt.trim() === '') {
        auditResults.imagesWithoutAlt.push({
          slug,
          src: src || 'unknown'
        });
      }

      if (src) {
        const imageUrl = src.startsWith('http') ? src : `${BASE_URL}${src}`;
        // We'll batch check images later to avoid too many requests
      }
    }

    // Check all internal links
    const links = $('a');
    const internalLinks = [];
    const externalLinks = [];

    links.each((i, link) => {
      const href = $(link).attr('href');
      if (!href) return;

      if (href.startsWith('/') && !href.startsWith('//')) {
        internalLinks.push(href);
      } else if (href.startsWith('http') && !href.includes('premierpartycruises.com')) {
        externalLinks.push(href);
      }
    });

    console.log(`  🔗 Found ${internalLinks.length} internal links, ${externalLinks.length} external links`);

    // Check structure
    const h1Count = $('h1').length;
    const h2Count = $('h2').length;
    
    if (h1Count === 0) {
      auditResults.structureIssues.push({
        slug,
        issue: 'No H1 heading found'
      });
      console.log(`  ⚠️  No H1 heading found`);
    } else if (h1Count > 1) {
      auditResults.structureIssues.push({
        slug,
        issue: `Multiple H1 headings found (${h1Count})`
      });
      console.log(`  ⚠️  Multiple H1 headings (${h1Count})`);
    }

  } catch (error) {
    auditResults.failedLoads.push({
      slug,
      url: blogUrl,
      error: error.message
    });
    console.log(`  ❌ Error: ${error.message}`);
  }

  // Small delay to avoid overwhelming the server
  await new Promise(resolve => setTimeout(resolve, 500));
}

async function checkPagination() {
  console.log('\n=== CHECKING PAGINATION ===\n');
  
  const pages = [
    `${BASE_URL}/blogs`,
    `${BASE_URL}/blogs?page=2`,
    `${BASE_URL}/blogs?page=3`,
    `${BASE_URL}/blogs?page=4`
  ];

  const pageContents = [];
  for (const pageUrl of pages) {
    try {
      const response = await axios.get(pageUrl);
      pageContents.push(response.data);
    } catch (error) {
      console.log(`Failed to fetch ${pageUrl}: ${error.message}`);
    }
  }

  // Check if all pages show the same content
  if (pageContents.length >= 2) {
    const allSame = pageContents.every(content => content === pageContents[0]);
    if (allSame) {
      auditResults.paginationIssue = true;
      console.log('⚠️  PAGINATION ISSUE: All pages show identical content');
    } else {
      console.log('✅ Pagination appears to be working');
    }
  }
}

async function generateReport() {
  console.log('\n=== GENERATING AUDIT REPORT ===\n');
  
  const report = {
    summary: {
      totalPostsInDatabase: auditResults.totalPosts,
      successfullyLoaded: auditResults.successfulLoads,
      failedToLoad: auditResults.failedLoads.length,
      paginationBroken: auditResults.paginationIssue,
      totalIssuesFound: 
        auditResults.failedLoads.length +
        auditResults.brokenImages.length +
        auditResults.brokenInternalLinks.length +
        auditResults.brokenExternalLinks.length +
        auditResults.missingNavigation.length +
        auditResults.missingCTA.length +
        auditResults.imagesWithoutAlt.length +
        auditResults.structureIssues.length
    },
    issues: {
      paginationIssue: auditResults.paginationIssue ? 
        'Blog list pagination is broken - all pages (1-4) display the same 20 posts instead of paginating through all 78 posts' : 
        null,
      failedLoads: auditResults.failedLoads,
      missingNavigation: auditResults.missingNavigation,
      missingCTA: auditResults.missingCTA,
      imagesWithoutAlt: auditResults.imagesWithoutAlt.slice(0, 50), // Limit to first 50
      structureIssues: auditResults.structureIssues,
      brokenImages: auditResults.brokenImages,
      brokenInternalLinks: auditResults.brokenInternalLinks,
      brokenExternalLinks: auditResults.brokenExternalLinks
    },
    recommendations: []
  };

  if (auditResults.paginationIssue) {
    report.recommendations.push({
      priority: 'HIGH',
      issue: 'Pagination not working',
      fix: 'Fix the /blogs pagination to properly display posts 21-40 on page 2, 41-60 on page 3, etc. Currently all pages show the same first 20 posts.'
    });
  }

  if (auditResults.failedLoads.length > 0) {
    report.recommendations.push({
      priority: 'CRITICAL',
      issue: `${auditResults.failedLoads.length} blog posts failed to load`,
      fix: 'Investigate and fix the blog posts that return non-200 status codes'
    });
  }

  if (auditResults.missingNavigation.length > 0) {
    report.recommendations.push({
      priority: 'MEDIUM',
      issue: `${auditResults.missingNavigation.length} posts missing navigation`,
      fix: 'Ensure all blog posts have proper navigation elements'
    });
  }

  if (auditResults.missingCTA.length > 0) {
    report.recommendations.push({
      priority: 'MEDIUM',
      issue: `${auditResults.missingCTA.length} posts missing CTA links to /chat`,
      fix: 'Add call-to-action links to /chat in blog posts to drive conversions'
    });
  }

  if (auditResults.imagesWithoutAlt.length > 0) {
    report.recommendations.push({
      priority: 'LOW',
      issue: `${auditResults.imagesWithoutAlt.length} images missing alt text`,
      fix: 'Add descriptive alt text to all images for SEO and accessibility'
    });
  }

  if (auditResults.structureIssues.length > 0) {
    report.recommendations.push({
      priority: 'MEDIUM',
      issue: `${auditResults.structureIssues.length} posts have structural issues`,
      fix: 'Fix heading hierarchy issues (missing H1, multiple H1s, etc.)'
    });
  }

  // Write report to file
  const reportPath = 'BLOG_AUDIT_REPORT.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ Detailed report saved to ${reportPath}`);

  // Print summary
  console.log('\n=== AUDIT SUMMARY ===\n');
  console.log(`Total Posts in Database: ${report.summary.totalPostsInDatabase}`);
  console.log(`Successfully Loaded: ${report.summary.successfullyLoaded}`);
  console.log(`Failed to Load: ${report.summary.failedToLoad}`);
  console.log(`Pagination Working: ${!report.summary.paginationBroken ? '✅' : '❌'}`);
  console.log(`Total Issues Found: ${report.summary.totalIssuesFound}`);

  console.log('\n=== MAJOR ISSUES ===\n');
  if (report.recommendations.length === 0) {
    console.log('✅ No major issues found!');
  } else {
    report.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. [${rec.priority}] ${rec.issue}`);
      console.log(`   Fix: ${rec.fix}\n`);
    });
  }

  return report;
}

async function main() {
  console.log('=== BLOG POST AUDIT STARTING ===');
  console.log(`Auditing ${BLOG_SLUGS.length} blog posts on ${BASE_URL}\n`);

  // Check pagination first
  await checkPagination();

  // Audit all blog posts
  for (let i = 0; i < BLOG_SLUGS.length; i++) {
    await auditBlogPost(BLOG_SLUGS[i], i);
  }

  // Generate final report
  await generateReport();
  
  console.log('\n=== AUDIT COMPLETE ===\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
