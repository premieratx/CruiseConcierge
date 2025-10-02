const fs = require('fs');

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
  /app\.(get|post|put|patch|delete)\("\/api\/chat\/(?!admin)/,  // Keep admin/chat
  /app\.(get|post|put|patch|delete)\("\/api\/portal/,
  /app\.(get|post|put|patch|delete)\("\/api\/quote-templates/,
  /app\.(get|post|put|patch|delete)\("\/api\/checkout/,
  /app\.(get|post|put|patch|delete)\("\/api\/customer/,
  /app\.(get|post|put|patch|delete)\("\/api\/webhook/,
  /app\.(get|post|put|patch|delete)\("\/api\/discounts\//,  // discount validation for quotes
];

// Find all route definition lines to remove
const linesToRemove = new Set();

lines.forEach((line, index) => {
  routesToRemove.forEach(pattern => {
    if (pattern.test(line)) {
      console.log(`Line ${index + 1}: ${line.trim().substring(0, 100)}`);
      linesToRemove.add(index + 1);
    }
  });
});

console.log(`\nFound ${linesToRemove.size} route definition lines to analyze`);
console.log('\nThese are the starting lines. The actual removal will include the full route handler.\n');

// Export for further processing
fs.writeFileSync('lines-to-remove.json', JSON.stringify(Array.from(linesToRemove).sort((a, b) => a - b), null, 2));
console.log('Saved route lines to lines-to-remove.json');
