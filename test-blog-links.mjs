import axios from 'axios';
import { JSDOM } from 'jsdom';
import { writeFileSync } from 'fs';

const BASE_URL = 'https://premierpartycruises.com';
const API_BASE = `${BASE_URL}/api/blog/public/posts`;
const TIMEOUT = 5000;
const API_TIMEOUT = 30000; // 30 seconds for API calls

// Results storage
const results = {
  totalBlogs: 0,
  totalLinks: 0,
  totalLinksFound: 0,
  totalInternalLinksFound: 0,
  brokenLinks: [],
  testedLinks: new Set(),
  workingLinks: []
};

async function fetchAllPosts() {
  console.log('Fetching all blog posts...');
  try {
    const response = await axios.get(`${API_BASE}?limit=200`, { timeout: API_TIMEOUT });
    return response.data.posts || response.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    return [];
  }
}

async function fetchPostContent(slug) {
  try {
    const response = await axios.get(`${API_BASE}/${slug}`, { timeout: API_TIMEOUT });
    return response.data.post || response.data;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error.message);
    return null;
  }
}

function extractLinks(html) {
  if (!html) return [];
  
  try {
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll('a[href]');
    const hrefs = [];
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        hrefs.push(href);
      }
    });
    
    return hrefs;
  } catch (error) {
    console.error('Error parsing HTML:', error.message);
    return [];
  }
}

function isInternalLink(url) {
  if (!url) return false;
  
  // Skip anchor links, mailto, tel
  if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return false;
  }
  
  // Check if it's an internal link
  return url.includes('premierpartycruises.com') || url.startsWith('/');
}

function normalizeUrl(url, baseUrl = BASE_URL) {
  if (!url) return null;
  
  // Already a full URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Relative URL
  if (url.startsWith('/')) {
    return `${baseUrl}${url}`;
  }
  
  return null;
}

async function testLink(url) {
  try {
    const response = await axios.head(url, {
      timeout: TIMEOUT,
      maxRedirects: 5,
      validateStatus: () => true // Don't throw on any status code
    });
    return response.status;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return 'TIMEOUT';
    }
    if (error.response) {
      return error.response.status;
    }
    return 'ERROR';
  }
}

function generateReport() {
  const lines = [];
  
  lines.push('='.repeat(80));
  lines.push('BLOG LINKS BROKEN LINKS REPORT');
  lines.push('Generated: ' + new Date().toISOString());
  lines.push('='.repeat(80));
  lines.push('');
  
  lines.push(`SUMMARY:`);
  lines.push(`- Total blogs tested: ${results.totalBlogs}`);
  lines.push(`- Total links found in blogs: ${results.totalLinksFound}`);
  lines.push(`- Total internal links found: ${results.totalInternalLinksFound}`);
  lines.push(`- Total unique internal links tested: ${results.testedLinks.size}`);
  lines.push(`- Working links: ${results.workingLinks.length}`);
  lines.push(`- Broken links found: ${results.brokenLinks.length}`);
  lines.push('');
  
  if (results.brokenLinks.length === 0) {
    lines.push('✓ No broken links found! All internal links are working correctly.');
  } else {
    lines.push('BROKEN LINKS:');
    lines.push('-'.repeat(80));
    
    results.brokenLinks.forEach(item => {
      lines.push(`Blog: ${item.blogTitle}`);
      lines.push(`Broken Link: ${item.url}`);
      lines.push(`Status: ${item.status}`);
      lines.push('-'.repeat(80));
    });
  }
  
  lines.push('');
  lines.push('TESTED INTERNAL LINKS (Unique URLs):');
  lines.push('-'.repeat(80));
  
  // Show all tested links with their status
  const allTestedLinks = [
    ...results.workingLinks.map(l => ({ ...l, broken: false })),
    ...results.brokenLinks.map(l => ({ url: l.url, status: l.status, broken: true }))
  ];
  
  // Get unique URLs
  const uniqueTestedUrls = [...new Set(allTestedLinks.map(l => l.url))];
  uniqueTestedUrls.sort();
  
  uniqueTestedUrls.forEach(url => {
    const linkInfo = allTestedLinks.find(l => l.url === url);
    const statusSymbol = linkInfo.broken ? '✗' : '✓';
    lines.push(`${statusSymbol} ${url} (${linkInfo.status})`);
  });
  
  return lines.join('\n');
}

async function main() {
  console.log('Starting blog link checker...\n');
  
  // Step 1: Fetch all posts
  const posts = await fetchAllPosts();
  results.totalBlogs = posts.length;
  
  console.log(`Found ${results.totalBlogs} blog posts\n`);
  
  if (posts.length === 0) {
    console.log('No posts found. Exiting.');
    return;
  }
  
  // Step 2-5: Process each post
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`[${i + 1}/${posts.length}] Processing: ${post.title}`);
    
    // Fetch full content
    const fullPost = await fetchPostContent(post.slug);
    if (!fullPost) {
      console.log(`  ⚠ Could not fetch content for ${post.slug}`);
      continue;
    }
    
    // Extract links from content
    const content = fullPost.content || '';
    const links = extractLinks(content);
    results.totalLinksFound += links.length;
    
    console.log(`  Found ${links.length} links`);
    
    // Filter and test internal links
    const internalLinks = links
      .filter(isInternalLink)
      .map(url => normalizeUrl(url))
      .filter(url => url !== null);
    
    results.totalInternalLinksFound += internalLinks.length;
    console.log(`  ${internalLinks.length} internal links to test`);
    
    // Test each unique link
    const uniqueLinks = [...new Set(internalLinks)];
    
    for (const link of uniqueLinks) {
      // Skip if already tested
      if (results.testedLinks.has(link)) {
        continue;
      }
      
      results.testedLinks.add(link);
      results.totalLinks++;
      
      const status = await testLink(link);
      
      // Check if broken (4xx, 5xx, or error)
      if (typeof status === 'number' && (status >= 400 || status < 200)) {
        console.log(`  ✗ BROKEN: ${link} (${status})`);
        results.brokenLinks.push({
          blogTitle: post.title,
          blogSlug: post.slug,
          url: link,
          status: status
        });
      } else if (status === 'ERROR' || status === 'TIMEOUT') {
        console.log(`  ✗ ${status}: ${link}`);
        results.brokenLinks.push({
          blogTitle: post.title,
          blogSlug: post.slug,
          url: link,
          status: status
        });
      } else {
        // Working link
        results.workingLinks.push({
          url: link,
          status: status
        });
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('');
  }
  
  // Step 6: Generate report
  console.log('\nGenerating report...');
  const report = generateReport();
  
  // Save to file
  writeFileSync('/tmp/blog_links_report.txt', report);
  console.log('\n✓ Report saved to /tmp/blog_links_report.txt');
  
  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY:');
  console.log(`- Total blogs tested: ${results.totalBlogs}`);
  console.log(`- Total links found in blogs: ${results.totalLinksFound}`);
  console.log(`- Total internal links found: ${results.totalInternalLinksFound}`);
  console.log(`- Total unique internal links tested: ${results.testedLinks.size}`);
  console.log(`- Working links: ${results.workingLinks.length}`);
  console.log(`- Broken links found: ${results.brokenLinks.length}`);
  console.log('='.repeat(80));
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
