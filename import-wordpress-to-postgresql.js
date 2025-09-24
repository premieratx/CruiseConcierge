#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const WORDPRESS_FILE = 'attached_assets/ppc-wp-blogs-export-9-24-25_1758692094299.xml';
const API_URL = 'http://localhost:5000/api/blog/import/wordpress';

async function importWordPressContent() {
  try {
    console.log('🚀 Starting WordPress import to PostgreSQL...');
    
    // Read the WordPress XML file
    console.log('📖 Reading WordPress XML file...');
    const xmlContent = fs.readFileSync(WORDPRESS_FILE, 'utf8');
    
    console.log(`📊 XML file size: ${(xmlContent.length / 1024 / 1024).toFixed(2)} MB`);
    
    // Prepare the request payload
    const payload = {
      xmlContent: xmlContent,
      options: {
        allowDuplicates: false,
        preserveIds: true,
        importImages: true,
        convertToMarkdown: false
      }
    };
    
    console.log('🌐 Sending import request to PostgreSQL endpoint...');
    
    // Make the API request
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ WordPress import completed successfully!');
    console.log('📊 Import Results:');
    console.log(`   📝 Created Posts: ${result.createdPosts || 0}`);
    console.log(`   👤 Created Authors: ${result.createdAuthors || 0}`);
    console.log(`   📂 Created Categories: ${result.createdCategories || 0}`);
    console.log(`   🏷️  Created Tags: ${result.createdTags || 0}`);
    console.log(`   ⏭️  Skipped Posts: ${result.skippedPosts || 0}`);
    
    if (result.errors && result.errors.length > 0) {
      console.log('⚠️  Errors encountered:');
      result.errors.forEach((error, i) => {
        console.log(`   ${i + 1}. ${error}`);
      });
    }
    
    console.log('\n🎉 WordPress content should now be available on both local and live domains!');
    
  } catch (error) {
    console.error('❌ WordPress import failed:', error.message);
    process.exit(1);
  }
}

// Run the import
importWordPressContent();