#!/usr/bin/env node

import Database from "@replit/database";

const db = new Database();

async function migrateWordPressContent() {
  try {
    console.log('🚀 Starting migration from Replit DB to PostgreSQL...');
    
    // Get all post slugs from Replit DB
    console.log('📖 Reading WordPress posts from Replit DB...');
    const postsIndexRaw = await db.get("index:posts");
    const slugs = Array.isArray(postsIndexRaw) ? postsIndexRaw : (postsIndexRaw?.value || []);
    
    console.log(`📊 Found ${slugs.length} posts in Replit DB`);
    
    if (slugs.length === 0) {
      console.log('⚠️  No posts found in Replit DB');
      return;
    }
    
    // Load all posts from Replit DB
    const posts = [];
    for (const slug of slugs) {
      const postRaw = await db.get(`post:${slug}`);
      const post = postRaw?.value || postRaw;
      if (post && post.status === "published") {
        posts.push(post);
        console.log(`✅ Found post: "${post.title}" (${post.id})`);
      }
    }
    
    console.log(`📝 Found ${posts.length} published WordPress posts to migrate`);
    
    // Migrate each post to PostgreSQL
    for (const post of posts) {
      try {
        console.log(`🔄 Migrating: "${post.title}"`);
        
        // Prepare post data for PostgreSQL
        const postData = {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          contentType: 'html',
          status: 'published',
          publishedAt: post.publishedAt,
          metaTitle: post.title,
          metaDescription: post.excerpt || '',
          featuredImage: post.featuredImage || null,
          featuredImageAlt: post.featuredImageAlt || null,
          wpPostId: null, // Mark as migrated from Replit DB
          wpGuid: null,
          wpStatus: 'migrated_from_replit',
          wpImportDate: new Date().toISOString(),
          viewCount: 0,
          allowComments: true,
          featured: false
        };
        
        // Make API request to create post in PostgreSQL
        const response = await fetch('http://localhost:5000/api/blog/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Failed to migrate "${post.title}": ${errorText}`);
          continue;
        }
        
        const result = await response.json();
        console.log(`✅ Successfully migrated: "${post.title}" (PostgreSQL ID: ${result.id})`);
        
      } catch (error) {
        console.error(`❌ Error migrating "${post.title}":`, error.message);
      }
    }
    
    console.log('\n🎉 Migration completed! WordPress content should now be available on live domain.');
    console.log('🔍 Checking final state...');
    
    // Verify migration by checking the management API
    const verifyResponse = await fetch('http://localhost:5000/api/blog/management');
    if (verifyResponse.ok) {
      const managementData = await verifyResponse.json();
      console.log(`📊 Total posts now in management API: ${managementData.posts?.length || 0}`);
      
      const wordpressPosts = managementData.posts?.filter(p => 
        p.source === 'wordpress' || 
        p.wpStatus === 'migrated_from_replit' ||
        p.title?.includes('WordPress') ||
        p.title?.includes('Celebrities') ||
        p.title?.includes('Executive Retreat')
      ) || [];
      
      console.log(`📝 WordPress-sourced posts: ${wordpressPosts.length}`);
      wordpressPosts.forEach(post => {
        console.log(`   - "${post.title}" (${post.id})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
migrateWordPressContent();