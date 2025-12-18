/**
 * Schema Validator for Google Search Console Compliance
 * 
 * This script validates structured data (JSON-LD) on key pages to prevent
 * GSC errors like:
 * - Duplicate schemas (e.g., multiple FAQPage, duplicate Product)
 * - Missing required fields (e.g., price, availability on Offer)
 * - Invalid schema structures
 * 
 * Run: npx tsx scripts/schema-validator.ts
 * 
 * Add to pre-deploy checks to prevent regressions.
 */

import http from 'http';
import https from 'https';

interface SchemaValidationResult {
  url: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
  schemaCount: Record<string, number>;
}

interface ValidationConfig {
  allowedDuplicates: string[]; // Schema types that are allowed to have multiple instances
  requiredFieldsByType: Record<string, string[]>;
}

const config: ValidationConfig = {
  // Service can have multiple instances (different boats/offerings)
  allowedDuplicates: ['Service'],
  
  // Required fields for each schema type to be GSC-valid
  requiredFieldsByType: {
    'Product': ['name', 'offers'],
    'Offer': ['price', 'priceCurrency', 'availability'],
    'FAQPage': ['mainEntity'],
    'Organization': ['name'],
    'LocalBusiness': ['name', 'address'],
    'Service': ['name', 'provider'],
    'Event': ['name', 'startDate'],
    'Article': ['headline', 'author', 'datePublished'],
  }
};

const PAGES_TO_VALIDATE = [
  '/',
  '/atx-disco-cruise',
  '/private-cruises',
  '/bachelor-party-austin',
  '/bachelorette-party-austin',
  '/corporate-events',
  '/team-building',
  '/faq',
];

async function fetchPage(url: string): Promise<string> {
  const fullUrl = url.startsWith('http') ? url : `http://localhost:5000${url}`;
  
  return new Promise((resolve, reject) => {
    const client = fullUrl.startsWith('https') ? https : http;
    
    const req = client.get(fullUrl, { 
      headers: { 'User-Agent': 'Googlebot/2.1' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function extractJsonLd(html: string): object[] {
  const schemas: object[] = [];
  const pattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  
  let match;
  while ((match = pattern.exec(html)) !== null) {
    try {
      const schema = JSON.parse(match[1]);
      schemas.push(schema);
    } catch (e) {
      // Invalid JSON, will be caught as error
    }
  }
  
  return schemas;
}

function extractMicrodata(html: string): { type: string; count: number }[] {
  const types: Record<string, number> = {};
  const pattern = /itemType="https:\/\/schema\.org\/([^"]+)"/g;
  
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const type = match[1];
    types[type] = (types[type] || 0) + 1;
  }
  
  return Object.entries(types).map(([type, count]) => ({ type, count }));
}

function getSchemaType(schema: any): string {
  if (Array.isArray(schema['@type'])) {
    return schema['@type'].join(', ');
  }
  return schema['@type'] || 'Unknown';
}

function validateSchema(schema: any, parentType: string = ''): string[] {
  const errors: string[] = [];
  const type = getSchemaType(schema);
  
  // Check required fields (except Offer which has special handling)
  if (type !== 'Offer') {
    const requiredFields = config.requiredFieldsByType[type];
    if (requiredFields) {
      for (const field of requiredFields) {
        if (!schema[field]) {
          errors.push(`${type}: Missing required field '${field}'`);
        }
      }
    }
  }
  
  // Special validation for Offer type - accepts price OR priceSpecification
  if (type === 'Offer') {
    const hasPrice = schema.price !== undefined;
    const hasPriceSpec = schema.priceSpecification && 
      (schema.priceSpecification.minPrice !== undefined || 
       schema.priceSpecification.price !== undefined);
    
    if (!hasPrice && !hasPriceSpec) {
      errors.push(`${type}: Missing required field 'price' or 'priceSpecification.minPrice'`);
    }
    if (!schema.priceCurrency) {
      errors.push(`${type}: Missing required field 'priceCurrency'`);
    }
    if (!schema.availability) {
      errors.push(`${type}: Missing required field 'availability'`);
    }
  }
  
  // Recursively validate nested offers
  if (schema.offers) {
    if (Array.isArray(schema.offers)) {
      schema.offers.forEach((offer: any, i: number) => {
        errors.push(...validateSchema(offer, type).map(e => `${type}.offers[${i}]: ${e}`));
      });
    } else if (typeof schema.offers === 'object') {
      errors.push(...validateSchema(schema.offers, type).map(e => `${type}.offers: ${e}`));
    }
  }
  
  // Validate AggregateOffer (different requirements)
  if (type === 'AggregateOffer') {
    if (!schema.lowPrice && !schema.highPrice) {
      errors.push(`${type}: Missing required field 'lowPrice' or 'highPrice'`);
    }
    if (!schema.priceCurrency) {
      errors.push(`${type}: Missing required field 'priceCurrency'`);
    }
  }
  
  return errors;
}

async function validatePage(url: string): Promise<SchemaValidationResult> {
  const result: SchemaValidationResult = {
    url,
    passed: true,
    errors: [],
    warnings: [],
    schemaCount: {}
  };
  
  try {
    const html = await fetchPage(url);
    
    // Extract JSON-LD schemas
    const schemas = extractJsonLd(html);
    
    // Count schema types
    for (const schema of schemas) {
      const type = getSchemaType(schema);
      result.schemaCount[type] = (result.schemaCount[type] || 0) + 1;
    }
    
    // Check for duplicates (except allowed ones)
    for (const [type, count] of Object.entries(result.schemaCount)) {
      if (count > 1 && !config.allowedDuplicates.includes(type)) {
        result.errors.push(`Duplicate schema: ${type} appears ${count} times (GSC will flag this)`);
      }
    }
    
    // Validate each schema's required fields
    for (const schema of schemas) {
      const schemaErrors = validateSchema(schema);
      result.errors.push(...schemaErrors);
    }
    
    // Check for microdata that might conflict with JSON-LD
    const microdata = extractMicrodata(html);
    const problematicMicrodata = microdata.filter(m => 
      ['Product', 'Offer', 'FAQPage', 'Organization'].includes(m.type)
    );
    
    if (problematicMicrodata.length > 0) {
      for (const m of problematicMicrodata) {
        result.warnings.push(`Found ${m.count} microdata ${m.type} element(s) that may conflict with JSON-LD`);
      }
    }
    
    result.passed = result.errors.length === 0;
    
  } catch (e: any) {
    result.errors.push(`Failed to fetch page: ${e.message}`);
    result.passed = false;
  }
  
  return result;
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('           SCHEMA VALIDATOR - GSC Compliance Check');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  const results: SchemaValidationResult[] = [];
  
  for (const page of PAGES_TO_VALIDATE) {
    process.stdout.write(`Validating ${page}... `);
    const result = await validatePage(page);
    results.push(result);
    
    if (result.passed) {
      console.log('✓ PASSED');
    } else {
      console.log('✗ FAILED');
      for (const error of result.errors) {
        console.log(`    ❌ ${error}`);
      }
    }
    
    for (const warning of result.warnings) {
      console.log(`    ⚠️  ${warning}`);
    }
  }
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('                         SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log(`\n  Total Pages:  ${results.length}`);
  console.log(`  ✓ Passed:     ${passed}`);
  console.log(`  ✗ Failed:     ${failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL PAGES PASS SCHEMA VALIDATION - GSC READY!\n');
    process.exit(0);
  } else {
    console.log('\n❌ SCHEMA VALIDATION FAILED - Fix errors before deploy!\n');
    
    console.log('Failed pages:');
    for (const result of results.filter(r => !r.passed)) {
      console.log(`\n  ${result.url}:`);
      for (const error of result.errors) {
        console.log(`    - ${error}`);
      }
    }
    
    process.exit(1);
  }
}

main().catch(console.error);
