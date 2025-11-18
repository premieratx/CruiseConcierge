import { storage } from '../server/storage';

async function checkSEOMetadata() {
  try {
    // Check combined-bachelor-bachelorette page
    const combinedSEO = await storage.getSEOMetadata('/combined-bachelor-bachelorette-austin');
    console.log('SEO Metadata for /combined-bachelor-bachelorette-austin:');
    console.log(JSON.stringify(combinedSEO, null, 2));
    console.log('\n---\n');
    
    // Check FAQ page
    const faqSEO = await storage.getSEOMetadata('/faq');
    console.log('SEO Metadata for /faq:');
    console.log(JSON.stringify(faqSEO, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
  
  process.exit(0);
}

checkSEOMetadata();
