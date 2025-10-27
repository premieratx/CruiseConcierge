#!/usr/bin/env node

/**
 * Test script to validate Google Rich Results structured data
 * Checks for common errors reported by Google Search Console
 */

const http = require('http');

// Pages to test
const pagesToTest = [
  { path: '/', name: 'Homepage', expectedSchemas: ['Organization', 'WebSite', 'BreadcrumbList'] },
  { path: '/atx-disco-cruise', name: 'ATX Disco Cruise', expectedSchemas: ['Event', 'FAQPage', 'BreadcrumbList'] },
  { path: '/bachelor-party-austin', name: 'Bachelor Party', expectedSchemas: ['Service', 'FAQPage', 'BreadcrumbList'] },
  { path: '/bachelorette-party-austin', name: 'Bachelorette Party', expectedSchemas: ['Service', 'FAQPage', 'BreadcrumbList'] },
  { path: '/private-cruises', name: 'Private Cruises', expectedSchemas: ['Service', 'FAQPage', 'BreadcrumbList'] },
  { path: '/faq', name: 'FAQ Page', expectedSchemas: ['FAQPage', 'BreadcrumbList'] }
];

// Validation rules
const validationRules = {
  Event: {
    required: ['@type', 'name', 'description', 'startDate', 'endDate', 'location', 'offers'],
    nested: {
      location: ['@type', 'name', 'address'],
      offers: ['@type', 'price', 'priceCurrency', 'availability', 'validFrom']
    }
  },
  FAQPage: {
    required: ['@type', 'mainEntity'],
    validateMainEntity: (mainEntity) => {
      if (!Array.isArray(mainEntity)) return 'mainEntity must be an array';
      for (let i = 0; i < mainEntity.length; i++) {
        const item = mainEntity[i];
        if (item['@type'] !== 'Question') return `Item ${i} missing @type: Question`;
        if (!item.name) return `Item ${i} missing name property`;
        if (!item.acceptedAnswer) return `Item ${i} missing acceptedAnswer`;
        const answer = item.acceptedAnswer;
        if (answer['@type'] !== 'Answer') return `Item ${i} acceptedAnswer missing @type: Answer`;
        if (!answer.text) return `Item ${i} acceptedAnswer missing text property`;
      }
      return null;
    }
  },
  BreadcrumbList: {
    required: ['@type', 'itemListElement'],
    validateItems: (items) => {
      if (!Array.isArray(items)) return 'itemListElement must be an array';
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.position) return `Item ${i} missing position`;
        if (!item.name) return `Item ${i} missing name`;
        // Last item shouldn't have item property
        if (i < items.length - 1 && !item.item) {
          return `Item ${i} missing item property (only last item should omit it)`;
        }
        // If item exists, check if it's properly structured
        if (item.item && typeof item.item === 'object') {
          if (!item.item['@id']) return `Item ${i} item missing @id property`;
        }
      }
      return null;
    }
  },
  Review: {
    required: ['@type', 'itemReviewed', 'author', 'reviewRating', 'reviewBody'],
    nested: {
      itemReviewed: ['@type', 'name'],
      author: ['@type', 'name'],
      reviewRating: ['@type', 'ratingValue']
    }
  },
  Product: {
    required: ['@type', 'name', 'offers'],
    nested: {
      offers: ['@type', 'price', 'priceCurrency', 'availability']
    },
    validateReviews: (reviews) => {
      if (!reviews) return null;
      if (!Array.isArray(reviews)) return 'reviews must be an array';
      for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        if (!review.itemReviewed) return `Review ${i} missing itemReviewed`;
        if (!review.author?.name) return `Review ${i} missing author.name`;
      }
      return null;
    }
  }
};

// Fetch and parse page
async function fetchPage(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

// Extract JSON-LD scripts
function extractSchemas(html) {
  const schemas = [];
  const regex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      schemas.push(json);
    } catch (e) {
      console.error('Failed to parse JSON-LD:', e.message);
    }
  }
  
  return schemas;
}

// Validate schema
function validateSchema(schema, type) {
  const errors = [];
  const rules = validationRules[type];
  
  if (!rules) return errors;

  // Check required fields
  for (const field of rules.required) {
    if (!schema[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Check nested fields
  if (rules.nested) {
    for (const [parent, fields] of Object.entries(rules.nested)) {
      if (schema[parent]) {
        for (const field of fields) {
          if (!schema[parent][field]) {
            errors.push(`Missing nested field: ${parent}.${field}`);
          }
        }
      }
    }
  }

  // Type-specific validation
  if (type === 'FAQPage' && rules.validateMainEntity) {
    const error = rules.validateMainEntity(schema.mainEntity);
    if (error) errors.push(error);
  }

  if (type === 'BreadcrumbList' && rules.validateItems) {
    const error = rules.validateItems(schema.itemListElement);
    if (error) errors.push(error);
  }

  if (type === 'Product' && rules.validateReviews) {
    const error = rules.validateReviews(schema.review);
    if (error) errors.push(error);
  }

  // Check date formats for Events
  if (type === 'Event') {
    if (schema.startDate && !isValidISO8601(schema.startDate)) {
      errors.push(`Invalid startDate format (not ISO 8601): ${schema.startDate}`);
    }
    if (schema.endDate && !isValidISO8601(schema.endDate)) {
      errors.push(`Invalid endDate format (not ISO 8601): ${schema.endDate}`);
    }
  }

  return errors;
}

// Validate ISO 8601 date format
function isValidISO8601(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString.includes('T');
}

// Main test function
async function runTests() {
  console.log('🔍 Testing Google Rich Results Structured Data...\n');
  
  let totalErrors = 0;
  const results = [];

  for (const page of pagesToTest) {
    console.log(`Testing ${page.name} (${page.path})...`);
    
    try {
      const html = await fetchPage(page.path);
      const schemas = extractSchemas(html);
      
      if (schemas.length === 0) {
        console.log(`  ⚠️  No structured data found`);
        totalErrors++;
      } else {
        console.log(`  ✅ Found ${schemas.length} schema(s)`);
        
        // Check each schema
        for (const schema of schemas) {
          const schemaType = Array.isArray(schema['@type']) ? schema['@type'][0] : schema['@type'];
          const errors = validateSchema(schema, schemaType);
          
          if (errors.length > 0) {
            console.log(`  ❌ ${schemaType} errors:`);
            errors.forEach(error => {
              console.log(`      - ${error}`);
              totalErrors++;
            });
          } else {
            console.log(`  ✅ ${schemaType} valid`);
          }
        }
        
        // Check if expected schemas are present
        if (page.expectedSchemas) {
          const foundTypes = schemas.map(s => Array.isArray(s['@type']) ? s['@type'][0] : s['@type']);
          for (const expected of page.expectedSchemas) {
            if (!foundTypes.includes(expected)) {
              console.log(`  ⚠️  Missing expected schema: ${expected}`);
            }
          }
        }
      }
    } catch (error) {
      console.log(`  ❌ Error fetching page: ${error.message}`);
      totalErrors++;
    }
    
    console.log('');
  }

  // Summary
  console.log('=' .repeat(50));
  if (totalErrors === 0) {
    console.log('✅ All structured data validations passed!');
  } else {
    console.log(`❌ Found ${totalErrors} total error(s)`);
    console.log('\nCommon fixes:');
    console.log('- Events: Ensure startDate, endDate, location.address, and all offers fields are present');
    console.log('- FAQ: Ensure @type: "Question" and "Answer" are properly set with name/text properties');
    console.log('- Breadcrumbs: Ensure position and item.@id are set (except for last item)');
    console.log('- Reviews: Ensure itemReviewed and author.name are always present');
  }
}

// Run tests
runTests().catch(console.error);