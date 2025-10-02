import fs from 'fs';

// Read the entire routes.ts file
const content = fs.readFileSync('server/routes.ts', 'utf8');
const lines = content.split('\n');

// Patterns for routes to REMOVE
const routesToRemove = [
  /app\.(get|post|put|patch|delete)\("\/api\/contacts/,
  /app\.(get|post|put|patch|delete)\("\/api\/projects/,
  /app\.(get|post|put|patch|delete)\("\/api\/quotes/,
  /app\.(get|post|put|patch|delete)\("\/api\/invoices/,
  /app\.(get|post|put|patch|delete)\("\/api\/payments/,
  /app\.(get|post|put|patch|delete)\("\/api\/bookings/,
  /app\.(get|post|put|patch|delete)\("\/api\/availability/,
  /app\.(get|post|put|patch|delete)\("\/api\/calendar/,
  /app\.(get|post|put|patch|delete)\("\/api\/leads/,
  /app\.(get|post|put|patch|delete)\("\/api\/disco/,
  /app\.(get|post|put|patch|delete)\("\/api\/timeframes/,
  /app\.(get|post|put|patch|delete)\("\/api\/slots/,
  /app\.(get|post|put|patch|delete)\("\/api\/partial-leads/,
  /app\.(get|post|put|patch|delete)\("\/api\/chat/,  // Remove all chat routes (not admin chat which is /api/admin/ai-assistant)
  /app\.(get|post|put|patch|delete)\("\/api\/portal/,
  /app\.(get|post|put|patch|delete)\("\/api\/quote-templates/,
  /app\.(get|post|put|patch|delete)\("\/api\/checkout/,
  /app\.(get|post|put|patch|delete)\("\/api\/customer/,
  /app\.(get|post|put|patch|delete)\("\/api\/webhook/,
  /app\.(get|post|put|patch|delete)\("\/api\/discounts\//,  // discount validation for quotes
];

// Also identify helper functions to remove
const helperFunctions = [
  'createQuoteFromChat',
  'createQuoteBuilderLead'
];

// Find all route definition lines to remove
const linesToRemove = [];

lines.forEach((line, index) => {
  routesToRemove.forEach(pattern => {
    if (pattern.test(line)) {
      linesToRemove.push({
        lineNumber: index + 1,
        content: line.trim().substring(0, 100)
      });
    }
  });
});

console.log(`Found ${linesToRemove.size} route definition lines`);
console.log('\nRoutes to remove:');
linesToRemove.forEach(item => {
  console.log(`Line ${item.lineNumber}: ${item.content}`);
});

// Save for reference
fs.writeFileSync('lines-to-remove.json', JSON.stringify(linesToRemove, null, 2));
console.log('\nSaved to lines-to-remove.json');
