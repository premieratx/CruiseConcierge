import { storage } from '../server/storage';

interface ImageAltIssue {
  postTitle: string;
  postSlug: string;
  imageSource: string;
  currentAlt: string;
  issueType: 'MISSING' | 'GENERIC' | 'FILENAME' | 'TOO_SHORT' | 'NO_KEYWORDS';
  suggestedAlt?: string;
}

function analyzeAltText(altText: string): 'GOOD' | 'MISSING' | 'GENERIC' | 'FILENAME' | 'TOO_SHORT' | 'NO_KEYWORDS' {
  // Check if missing or empty
  if (!altText || altText.trim() === '') return 'MISSING';
  
  // Check if generic placeholder
  if (altText.toLowerCase() === 'image' || altText.toLowerCase() === 'photo' || altText.toLowerCase() === 'picture') {
    return 'GENERIC';
  }
  
  // Check if it's a filename
  if (altText.includes('.jpg') || altText.includes('.png') || altText.includes('.jpeg') || altText.includes('.gif') || altText.includes('.webp')) {
    return 'FILENAME';
  }
  
  // Check if too short (less than 10 characters)
  if (altText.length < 10) return 'TOO_SHORT';
  
  // Check for relevant SEO keywords
  const keywords = [
    'party boat', 'lake travis', 'bachelor', 'bachelorette', 
    'austin', 'atx disco', 'cruise', 'premier party cruises',
    'corporate', 'celebration', 'wedding', 'boat rental'
  ];
  
  const altLower = altText.toLowerCase();
  const hasKeyword = keywords.some(kw => altLower.includes(kw));
  
  if (!hasKeyword) return 'NO_KEYWORDS';
  
  return 'GOOD';
}

function generateSuggestedAlt(postTitle: string, imageIndex: number): string {
  const titleLower = postTitle.toLowerCase();
  
  // Generate contextual alt text based on post title
  if (titleLower.includes('bachelor')) {
    return `Bachelor party Austin on Lake Travis party boat - ${postTitle} - image ${imageIndex + 1}`;
  } else if (titleLower.includes('bachelorette')) {
    return `Bachelorette party Austin ATX DISCO CRUISE Lake Travis - ${postTitle} - image ${imageIndex + 1}`;
  } else if (titleLower.includes('corporate') || titleLower.includes('business')) {
    return `Corporate event on Lake Travis party boat Austin - ${postTitle} - image ${imageIndex + 1}`;
  } else if (titleLower.includes('wedding')) {
    return `Wedding celebration Lake Travis party boat rental - ${postTitle} - image ${imageIndex + 1}`;
  } else if (titleLower.includes('lake travis') || titleLower.includes('party boat')) {
    return `Lake Travis party boat cruise Premier Party Cruises - ${postTitle} - image ${imageIndex + 1}`;
  } else {
    return `Premier Party Cruises Lake Travis party boat - ${postTitle} - image ${imageIndex + 1}`;
  }
}

async function auditBlogImages() {
  console.log('🔍 BLOG IMAGE ALT TEXT AUDIT');
  console.log('=' .repeat(80));
  console.log('\nFetching all published blog posts...\n');
  
  try {
    // Fetch all published blog posts
    const result = await storage.getBlogPosts({ 
      status: 'published', 
      limit: 100,
      offset: 0 
    });
    
    const posts = result.posts;
    console.log(`✅ Found ${posts.length} published blog posts\n`);
    
    const issues: ImageAltIssue[] = [];
    let totalImages = 0;
    let goodAltTextCount = 0;
    
    // Analyze each blog post
    for (const post of posts) {
      const content = post.content || '';
      
      // Find all <img> tags in the content
      const imgRegex = /<img[^>]*>/gi;
      const imgMatches = content.match(imgRegex) || [];
      
      imgMatches.forEach((imgTag, index) => {
        totalImages++;
        
        // Extract alt attribute
        const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
        const alt = altMatch ? altMatch[1] : '';
        
        // Extract src attribute  
        const srcMatch = imgTag.match(/src=["']([^"']*)["']/i);
        const src = srcMatch ? srcMatch[1] : 'unknown';
        
        // Analyze alt text quality
        const quality = analyzeAltText(alt);
        
        if (quality === 'GOOD') {
          goodAltTextCount++;
        } else {
          issues.push({
            postTitle: post.title,
            postSlug: post.slug,
            imageSource: src,
            currentAlt: alt,
            issueType: quality,
            suggestedAlt: generateSuggestedAlt(post.title, index)
          });
        }
      });
      
      // Also check featured image alt text
      if (post.featuredImage) {
        totalImages++;
        const featuredAlt = post.featuredImageAlt || '';
        const quality = analyzeAltText(featuredAlt);
        
        if (quality === 'GOOD') {
          goodAltTextCount++;
        } else {
          issues.push({
            postTitle: post.title,
            postSlug: post.slug,
            imageSource: post.featuredImage,
            currentAlt: featuredAlt,
            issueType: quality,
            suggestedAlt: `${post.title} - Premier Party Cruises Lake Travis Austin featured image`
          });
        }
      }
    }
    
    // Print summary
    console.log('📊 AUDIT SUMMARY');
    console.log('-'.repeat(80));
    console.log(`Total Blog Posts Analyzed: ${posts.length}`);
    console.log(`Total Images Found: ${totalImages}`);
    console.log(`Images with GOOD Alt Text: ${goodAltTextCount}`);
    console.log(`Images with Issues: ${issues.length}`);
    console.log('');
    
    if (issues.length === 0) {
      console.log('🎉 All blog images have proper alt text!\n');
      return { issues: [], totalImages, goodAltTextCount };
    }
    
    // Group issues by type
    const issuesByType = {
      MISSING: issues.filter(i => i.issueType === 'MISSING'),
      GENERIC: issues.filter(i => i.issueType === 'GENERIC'),
      FILENAME: issues.filter(i => i.issueType === 'FILENAME'),
      TOO_SHORT: issues.filter(i => i.issueType === 'TOO_SHORT'),
      NO_KEYWORDS: issues.filter(i => i.issueType === 'NO_KEYWORDS')
    };
    
    // Print issues by type
    console.log('❌ ISSUES FOUND BY TYPE:');
    console.log('-'.repeat(80));
    
    if (issuesByType.MISSING.length > 0) {
      console.log(`\n🚫 MISSING ALT TEXT (${issuesByType.MISSING.length} images):`);
      issuesByType.MISSING.forEach(issue => {
        console.log(`   Post: "${issue.postTitle}"`);
        console.log(`   Image: ${issue.imageSource.substring(0, 60)}...`);
        console.log(`   Suggested: "${issue.suggestedAlt}"`);
        console.log('');
      });
    }
    
    if (issuesByType.GENERIC.length > 0) {
      console.log(`\n📝 GENERIC ALT TEXT (${issuesByType.GENERIC.length} images):`);
      issuesByType.GENERIC.forEach(issue => {
        console.log(`   Post: "${issue.postTitle}"`);
        console.log(`   Current: "${issue.currentAlt}"`);
        console.log(`   Suggested: "${issue.suggestedAlt}"`);
        console.log('');
      });
    }
    
    if (issuesByType.FILENAME.length > 0) {
      console.log(`\n📁 FILENAME AS ALT TEXT (${issuesByType.FILENAME.length} images):`);
      issuesByType.FILENAME.forEach(issue => {
        console.log(`   Post: "${issue.postTitle}"`);
        console.log(`   Current: "${issue.currentAlt}"`);
        console.log(`   Suggested: "${issue.suggestedAlt}"`);
        console.log('');
      });
    }
    
    if (issuesByType.TOO_SHORT.length > 0) {
      console.log(`\n📏 TOO SHORT ALT TEXT (${issuesByType.TOO_SHORT.length} images):`);
      issuesByType.TOO_SHORT.forEach(issue => {
        console.log(`   Post: "${issue.postTitle}"`);
        console.log(`   Current: "${issue.currentAlt}" (${issue.currentAlt.length} chars)`);
        console.log(`   Suggested: "${issue.suggestedAlt}"`);
        console.log('');
      });
    }
    
    if (issuesByType.NO_KEYWORDS.length > 0) {
      console.log(`\n🔑 NO SEO KEYWORDS (${issuesByType.NO_KEYWORDS.length} images):`);
      issuesByType.NO_KEYWORDS.forEach(issue => {
        console.log(`   Post: "${issue.postTitle}"`);
        console.log(`   Current: "${issue.currentAlt}"`);
        console.log(`   Suggested: "${issue.suggestedAlt}"`);
        console.log('');
      });
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('📋 NEXT STEPS:');
    console.log('1. Review the suggested alt text above');
    console.log('2. Run the fix script to automatically update blog post images');
    console.log('3. Verify all images have keyword-rich, descriptive alt text');
    console.log('='.repeat(80) + '\n');
    
    return { issues, totalImages, goodAltTextCount };
    
  } catch (error) {
    console.error('❌ Error during audit:', error);
    throw error;
  }
}

// Run the audit
auditBlogImages()
  .then(() => {
    console.log('✅ Audit complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
