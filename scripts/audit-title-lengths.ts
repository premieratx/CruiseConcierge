import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';

interface TitleAuditResult {
  url: string;
  route: string;
  component: string;
  title: string;
  length: number;
  exceeds60: boolean;
  foundInFile: boolean;
}

// Extract URLs from sitemap
function extractUrlsFromSitemap(): string[] {
  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
  const sitemapContent = readFileSync(sitemapPath, 'utf-8');
  
  const parser = new XMLParser();
  const result = parser.parse(sitemapContent);
  
  const urls: string[] = [];
  if (result.urlset && result.urlset.url) {
    const urlEntries = Array.isArray(result.urlset.url) ? result.urlset.url : [result.urlset.url];
    urlEntries.forEach((entry: any) => {
      if (entry.loc) {
        urls.push(entry.loc);
      }
    });
  }
  
  return urls;
}

// Map route to component file
function routeToComponentFile(route: string): string | null {
  const routeMap: { [key: string]: string } = {
    '/': 'Home.tsx',
    '/after-party': 'AfterParty.tsx',
    '/atx-disco-cruise': 'ATXDiscoCruise.tsx',
    '/bachelor-party-austin': 'BachelorParty.tsx',
    '/bachelorette-party-austin': 'BacheloretteParty.tsx',
    '/birthday-parties': 'BirthdayParties.tsx',
    '/client-entertainment': 'ClientEntertainment.tsx',
    '/combined-bachelor-bachelorette-austin': 'CombinedBachelorBachelorette.tsx',
    '/company-milestone': 'CompanyMilestone.tsx',
    '/corporate-events': 'CorporateEvents.tsx',
    '/graduation-party': 'GraduationParty.tsx',
    '/milestone-birthday': 'MilestoneBirthday.tsx',
    '/private-cruises': 'PrivateCruises.tsx',
    '/rehearsal-dinner': 'RehearsalDinner.tsx',
    '/sweet-16': 'Sweet16.tsx',
    '/team-building': 'TeamBuilding.tsx',
    '/wedding-parties': 'WeddingParties.tsx',
    '/welcome-party': 'WelcomeParty.tsx',
    '/book-now': 'BookNow.tsx',
    '/book-online': 'BookOnline.tsx',
    '/chat': 'Chat.tsx',
    '/contact': 'Contact.tsx',
    '/faq': 'Faq.tsx',
    '/gallery': 'Gallery.tsx',
    '/party-boat-austin': 'PartyBoatAustin.tsx',
    '/party-boat-lake-travis': 'PartyBoatLakeTravis.tsx',
    '/testimonials': 'TestimonialsFaq.tsx',
    '/affiliates': 'Affiliates.tsx',
    '/partners': 'Partners.tsx',
    '/discounts': 'Discounts.tsx',
  };
  
  // Handle blog routes
  if (route.startsWith('/blog/')) {
    return 'BlogPost.tsx';
  }
  if (route === '/blog') {
    return 'Blog.tsx';
  }
  
  return routeMap[route] || null;
}

// Extract title from component file
function extractTitleFromComponent(componentFile: string, route: string): { title: string; found: boolean } {
  try {
    const componentPath = join(process.cwd(), 'client', 'src', 'pages', componentFile);
    const content = readFileSync(componentPath, 'utf-8');
    
    // Look for defaultTitle prop in SEOHead component
    const defaultTitleMatch = content.match(/defaultTitle=["']([^"']+)["']/);
    if (defaultTitleMatch) {
      return { title: defaultTitleMatch[1], found: true };
    }
    
    // Look for <title> tag in Helmet
    const helmetTitleMatch = content.match(/<title>([^<]+)<\/title>/);
    if (helmetTitleMatch) {
      return { title: helmetTitleMatch[1], found: true };
    }
    
    // For blog posts, check if there's a dynamic title
    if (componentFile === 'BlogPost.tsx') {
      return { title: '[Dynamic Blog Post Title]', found: false };
    }
    
    return { title: '[Title not found]', found: false };
  } catch (error) {
    return { title: `[Error reading ${componentFile}]`, found: false };
  }
}

// Main audit function
function auditTitles(): TitleAuditResult[] {
  const urls = extractUrlsFromSitemap();
  const results: TitleAuditResult[] = [];
  
  console.log(`Found ${urls.length} URLs in sitemap\n`);
  
  for (const url of urls) {
    const route = url.replace('https://premierpartycruises.com', '');
    const componentFile = routeToComponentFile(route);
    
    if (componentFile) {
      const { title, found } = extractTitleFromComponent(componentFile, route);
      const length = title.length;
      const exceeds60 = length > 60;
      
      results.push({
        url,
        route,
        component: componentFile,
        title,
        length,
        exceeds60,
        foundInFile: found
      });
    } else {
      results.push({
        url,
        route,
        component: '[Unknown component]',
        title: '[Unknown]',
        length: 0,
        exceeds60: false,
        foundInFile: false
      });
    }
  }
  
  return results;
}

// Generate report
function generateReport(results: TitleAuditResult[]): void {
  const longTitles = results.filter(r => r.exceeds60 && r.foundInFile);
  const notFound = results.filter(r => !r.foundInFile && r.component !== '[Unknown component]');
  const unknown = results.filter(r => r.component === '[Unknown component]');
  
  console.log('='.repeat(80));
  console.log('TITLE LENGTH AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`\nTotal URLs audited: ${results.length}`);
  console.log(`Titles exceeding 60 characters: ${longTitles.length}`);
  console.log(`Titles not found in files: ${notFound.length}`);
  console.log(`Unknown components: ${unknown.length}`);
  
  if (longTitles.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('TITLES EXCEEDING 60 CHARACTERS (NEED FIXING)');
    console.log('='.repeat(80));
    longTitles.forEach(result => {
      console.log(`\n${result.route}`);
      console.log(`  Component: ${result.component}`);
      console.log(`  Title: "${result.title}"`);
      console.log(`  Length: ${result.length} characters (${result.length - 60} over limit)`);
    });
  }
  
  if (notFound.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('TITLES NOT FOUND IN FILES (CHECK MANUALLY)');
    console.log('='.repeat(80));
    notFound.forEach(result => {
      console.log(`\n${result.route}`);
      console.log(`  Component: ${result.component}`);
    });
  }
  
  if (unknown.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('UNKNOWN COMPONENTS (NEED MAPPING)');
    console.log('='.repeat(80));
    unknown.forEach(result => {
      console.log(`  ${result.route}`);
    });
  }
  
  // Save detailed report to JSON
  const reportData = {
    summary: {
      totalUrls: results.length,
      longTitles: longTitles.length,
      notFound: notFound.length,
      unknown: unknown.length
    },
    longTitles,
    notFound,
    unknown,
    allResults: results
  };
  
  const reportPath = join(process.cwd(), 'TITLE_AUDIT_REPORT.json');
  writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n\nDetailed report saved to: TITLE_AUDIT_REPORT.json`);
}

// Run the audit
const results = auditTitles();
generateReport(results);
