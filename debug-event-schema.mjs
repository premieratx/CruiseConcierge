#!/usr/bin/env node

import http from 'http';

// Fetch page
function fetchPage(path) {
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

// Debug Event schema
async function debugEventSchema() {
  console.log('Fetching ATX Disco Cruise page...\n');
  
  try {
    const html = await fetchPage('/atx-disco-cruise');
    const schemas = extractSchemas(html);
    
    // Find Event schema
    const eventSchema = schemas.find(s => s['@type'] === 'Event');
    
    if (eventSchema) {
      console.log('Found Event Schema:');
      console.log(JSON.stringify(eventSchema, null, 2));
      
      console.log('\nChecking offers structure:');
      if (eventSchema.offers) {
        console.log('offers type:', typeof eventSchema.offers);
        console.log('Is array?:', Array.isArray(eventSchema.offers));
        
        if (Array.isArray(eventSchema.offers)) {
          console.log('Number of offers:', eventSchema.offers.length);
          
          eventSchema.offers.forEach((offer, index) => {
            console.log(`\nOffer ${index}:`, JSON.stringify(offer, null, 2));
            
            // Check for required fields
            const requiredFields = ['@type', 'price', 'priceCurrency', 'availability', 'validFrom'];
            const missingFields = requiredFields.filter(field => !offer[field]);
            
            if (missingFields.length > 0) {
              console.log(`  Missing fields: ${missingFields.join(', ')}`);
            } else {
              console.log('  ✅ All required fields present');
            }
          });
        }
      } else {
        console.log('No offers field found in Event schema!');
      }
      
      // Check for other required Event fields
      console.log('\n\nOther Event fields:');
      console.log('startDate:', eventSchema.startDate || 'MISSING');
      console.log('endDate:', eventSchema.endDate || 'MISSING');
      console.log('description:', eventSchema.description ? 'Present' : 'MISSING');
      console.log('location:', eventSchema.location ? 'Present' : 'MISSING');
      if (eventSchema.location?.address) {
        console.log('location.address:', 'Present');
      } else {
        console.log('location.address:', 'MISSING');
      }
    } else {
      console.log('No Event schema found!');
      console.log('\nAll schemas found:');
      schemas.forEach(s => {
        console.log('- @type:', s['@type']);
      });
    }
  } catch (error) {
    console.log('Error fetching page:', error.message);
  }
}

// Run debug
debugEventSchema().catch(console.error);