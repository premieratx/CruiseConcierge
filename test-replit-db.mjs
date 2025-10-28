import Database from "@replit/database";

const db = new Database();

(async () => {
  try {
    const keys = await db.list();
    const blogKeys = [];
    
    for (const key of keys) {
      if (key.startsWith('post:')) {
        blogKeys.push(key);
      }
    }
    
    console.log(`Found ${blogKeys.length} blog posts in Replit DB`);
    
    if (blogKeys.length > 0) {
      console.log('\nFirst 10 post slugs:');
      blogKeys.slice(0, 10).forEach(k => console.log(`  - ${k.replace('post:', '')}`));
      
      // Test the specific post
      if (blogKeys.includes('post:austin-bachelorette-party-october')) {
        console.log('\n✅ Post "austin-bachelorette-party-october" EXISTS in Replit DB');
        const postData = await db.get('post:austin-bachelorette-party-october');
        console.log('Status:', postData?.status || 'unknown');
        console.log('Title:', postData?.title || 'unknown');
      } else {
        console.log('\n❌ Post "austin-bachelorette-party-october" NOT FOUND in Replit DB');
      }
    } else {
      console.log('\n❌ NO blog posts found in Replit DB at all!');
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
})();
