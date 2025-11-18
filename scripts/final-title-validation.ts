import * as fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

interface ValidationResult {
  url: string;
  title: string;
  length: number;
  status: 'PASS' | 'FAIL';
}

async function validateAllTitles() {
  try {
    // Read sitemap
    const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf-8');
    const parser = new XMLParser();
    const sitemap = parser.parse(sitemapContent);
    
    const urls = sitemap.urlset.url.map((entry: any) => entry.loc);
    console.log(`Found ${urls.length} URLs in sitemap\n`);
    
    const results: ValidationResult[] = [];
    const failures: ValidationResult[] = [];
    const passes: ValidationResult[] = [];
    
    // Test each URL
    for (const fullUrl of urls) {
      const url = new URL(fullUrl);
      const path = url.pathname;
      
      try {
        const response = await fetch(`http://localhost:5000${path}`);
        const html = await response.text();
        
        // Extract title
        const titleMatch = html.match(/<title>([^<]*)<\/title>/);
        const title = titleMatch ? titleMatch[1] : 'NO TITLE FOUND';
        const length = title.length;
        const status = length <= 60 ? 'PASS' : 'FAIL';
        
        const result: ValidationResult = { url: path, title, length, status };
        results.push(result);
        
        if (status === 'FAIL') {
          failures.push(result);
          console.log(`❌ FAIL (${length} chars): ${path}`);
          console.log(`   Title: "${title}"\n`);
        } else {
          passes.push(result);
        }
        
        // Add delay to avoid overwhelming server
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error checking ${path}:`, error);
        results.push({
          url: path,
          title: 'ERROR',
          length: 0,
          status: 'FAIL'
        });
      }
    }
    
    // Generate summary
    console.log('\n' + '='.repeat(80));
    console.log('VALIDATION SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total URLs checked: ${results.length}`);
    console.log(`✅ PASS (≤60 chars): ${passes.length}`);
    console.log(`❌ FAIL (>60 chars): ${failures.length}`);
    console.log('='.repeat(80));
    
    if (failures.length > 0) {
      console.log('\nFAILED PAGES (titles >60 characters):');
      console.log('-'.repeat(80));
      failures.forEach(f => {
        console.log(`${f.url} (${f.length} chars)`);
        console.log(`  "${f.title}"`);
      });
    } else {
      console.log('\n🎉 SUCCESS! All pages have titles ≤60 characters!');
    }
    
    // Save detailed report
    const reportPath = 'attached_assets/title-validation-report.json';
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalUrls: results.length,
      passes: passes.length,
      failures: failures.length,
      results: results
    }, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error('Validation failed:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

validateAllTitles();
