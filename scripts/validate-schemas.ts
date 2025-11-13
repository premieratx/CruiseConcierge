import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_DIR = path.resolve(process.cwd(), 'attached_assets/schema_data');

interface ValidationResult {
  file: string;
  valid: boolean;
  errors: string[];
  warnings: string[];
  type?: string;
}

interface FAQSchema {
  '@type': string;
  mainEntity?: any[];
}

const results: ValidationResult[] = [];
const faqSchemas: Map<string, FAQSchema[]> = new Map();

function validateSchemaFile(filePath: string): ValidationResult {
  const relativePath = path.relative(SCHEMA_DIR, filePath);
  const result: ValidationResult = {
    file: relativePath,
    valid: true,
    errors: [],
    warnings: []
  };

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if file is empty
    if (!content.trim()) {
      result.valid = false;
      result.errors.push('File is empty');
      return result;
    }

    // Parse JSON
    let schema: any;
    try {
      schema = JSON.parse(content);
    } catch (parseError: any) {
      result.valid = false;
      result.errors.push(`Invalid JSON: ${parseError.message}`);
      return result;
    }

    // Check for required @context
    if (!schema['@context']) {
      result.errors.push('Missing @context field');
      result.valid = false;
    } else if (schema['@context'] !== 'https://schema.org') {
      result.warnings.push(`Non-standard @context: ${schema['@context']}`);
    }

    // Check for @type
    if (!schema['@type']) {
      result.errors.push('Missing @type field');
      result.valid = false;
    } else {
      result.type = schema['@type'];
    }

    // Specific validation for FAQPage
    if (schema['@type'] === 'FAQPage') {
      if (!schema.mainEntity) {
        result.errors.push('FAQPage missing mainEntity field');
        result.valid = false;
      } else if (!Array.isArray(schema.mainEntity)) {
        result.errors.push('FAQPage mainEntity must be an array');
        result.valid = false;
      } else if (schema.mainEntity.length === 0) {
        result.warnings.push('FAQPage has no questions');
      } else {
        // Validate each question
        schema.mainEntity.forEach((question: any, index: number) => {
          if (!question['@type'] || question['@type'] !== 'Question') {
            result.errors.push(`Question ${index + 1}: Missing or invalid @type`);
            result.valid = false;
          }
          if (!question.name) {
            result.errors.push(`Question ${index + 1}: Missing name field`);
            result.valid = false;
          }
          if (!question.acceptedAnswer) {
            result.errors.push(`Question ${index + 1}: Missing acceptedAnswer`);
            result.valid = false;
          } else if (question.acceptedAnswer['@type'] !== 'Answer') {
            result.errors.push(`Question ${index + 1}: acceptedAnswer must have @type: Answer`);
            result.valid = false;
          } else if (!question.acceptedAnswer.text) {
            result.errors.push(`Question ${index + 1}: acceptedAnswer missing text`);
            result.valid = false;
          }
        });
      }

      // Track FAQ schemas for duplicate detection
      const directory = path.dirname(relativePath);
      if (!faqSchemas.has(directory)) {
        faqSchemas.set(directory, []);
      }
      faqSchemas.get(directory)!.push(schema);
    }

    // Specific validation for Service
    if (schema['@type'] === 'Service') {
      if (!schema.name) {
        result.errors.push('Service missing name field');
        result.valid = false;
      }
      if (!schema.description) {
        result.warnings.push('Service missing description field');
      }
      if (!schema.provider) {
        result.warnings.push('Service missing provider field');
      }
    }

    // Specific validation for Event
    if (schema['@type'] === 'Event') {
      if (!schema.name) {
        result.errors.push('Event missing name field');
        result.valid = false;
      }
      if (!schema.startDate) {
        result.warnings.push('Event missing startDate field');
      }
      if (!schema.location) {
        result.warnings.push('Event missing location field');
      }
    }

    // Specific validation for Organization
    if (schema['@type'] === 'Organization') {
      if (!schema.name) {
        result.errors.push('Organization missing name field');
        result.valid = false;
      }
      if (!schema.url) {
        result.warnings.push('Organization missing url field');
      }
    }

  } catch (error: any) {
    result.valid = false;
    result.errors.push(`Unexpected error: ${error.message}`);
  }

  return result;
}

function findAllSchemaFiles(dir: string): string[] {
  const files: string[] = [];
  
  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.jsonld') || entry.name.endsWith('.json'))) {
        files.push(fullPath);
      }
    }
  }
  
  walk(dir);
  return files;
}

// Main validation
console.log('🔍 Starting schema validation...\n');

const schemaFiles = findAllSchemaFiles(SCHEMA_DIR);
console.log(`Found ${schemaFiles.length} schema files\n`);

// Validate each file
for (const file of schemaFiles) {
  const result = validateSchemaFile(file);
  results.push(result);
}

// Print results
let validCount = 0;
let errorCount = 0;
let warningCount = 0;

console.log('📊 Validation Results:\n');
console.log('='.repeat(80));

for (const result of results) {
  if (result.valid && result.errors.length === 0 && result.warnings.length === 0) {
    validCount++;
    console.log(`✅ ${result.file} - ${result.type || 'Unknown type'}`);
  } else {
    if (result.errors.length > 0) {
      errorCount++;
      console.log(`❌ ${result.file} - ${result.type || 'Unknown type'}`);
      result.errors.forEach(err => console.log(`   ERROR: ${err}`));
    }
    if (result.warnings.length > 0) {
      warningCount++;
      if (result.errors.length === 0) {
        console.log(`⚠️  ${result.file} - ${result.type || 'Unknown type'}`);
      }
      result.warnings.forEach(warn => console.log(`   WARNING: ${warn}`));
    }
  }
}

console.log('='.repeat(80));
console.log(`\n📈 Summary:`);
console.log(`   Total files: ${results.length}`);
console.log(`   Valid: ${validCount}`);
console.log(`   With errors: ${errorCount}`);
console.log(`   With warnings: ${warningCount}`);

// Check for duplicate FAQ schemas in same directory
console.log('\n🔍 Checking for duplicate FAQ schemas...\n');
let duplicatesFound = false;

for (const [directory, schemas] of faqSchemas.entries()) {
  if (schemas.length > 1) {
    duplicatesFound = true;
    console.log(`❌ DUPLICATE: ${directory} has ${schemas.length} FAQ schemas`);
  }
}

if (!duplicatesFound) {
  console.log('✅ No duplicate FAQ schemas found in same directory');
}

// Exit with error code if validation failed
if (errorCount > 0 || duplicatesFound) {
  console.log('\n❌ Validation failed - please fix errors above');
  process.exit(1);
} else if (warningCount > 0) {
  console.log('\n⚠️  Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ All schemas valid!');
  process.exit(0);
}
