import fs from 'fs';

console.log('🧹 Starting comprehensive routes cleanup...');

// Read the entire file
const content = fs.readFileSync('server/routes.ts', 'utf8');
const lines = content.split('\n');

console.log(`📄 Total lines in file: ${lines.length}`);

// Track sections to remove
const sectionsToRemove = [];

// Find helper functions to remove (lines 521-2217 approximately)
// We'll find them by looking for specific function signatures

let inHelperFunction = false;
let helperStart = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Find start of deprecated helper functions
  if (line.includes('export async function createQuoteFromChat') || 
      line.includes('export async function createQuoteBuilderLead')) {
    helperStart = i;
    inHelperFunction = true;
    console.log(`Found deprecated helper at line ${i + 1}: ${line.trim().substring(0, 60)}`);
  }
  
  // Find end of helper functions (when we hit the real registerRoutes)
  if (inHelperFunction && line.includes('export async function registerRoutes')) {
    sectionsToRemove.push({ start: helperStart, end: i - 1 });
    console.log(`Helper section ends at line ${i}: ${helperStart + 1}-${i}`);
    inHelperFunction = false;
    helperStart = -1;
  }
}

// Patterns for individual routes to remove
const routePatterns = [
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
  /app\.(get|post|put|patch|delete)\("\/api\/chat\//,  
  /app\.(get|post|put|patch|delete)\("\/api\/portal/,
  /app\.(get|post|put|patch|delete)\("\/api\/quote-templates/,
  /app\.(get|post|put|patch|delete)\("\/api\/checkout/,
  /app\.(get|post|put|patch|delete)\("\/api\/customer/,
  /app\.(get|post|put|patch|delete)\("\/api\/webhook/,
  /app\.(get|post|put|patch|delete)\("\/api\/discounts\//,
];

// Find route handlers to remove (they span multiple lines, so we need to find their full extent)
const routesToRemove = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this line starts a route to remove
  const shouldRemove = routePatterns.some(pattern => pattern.test(line));
  
  if (shouldRemove) {
    // Find the end of this route handler by looking for the closing }); or });
    let depth = 0;
    let start = i;
    let end = i;
    let foundStart = false;
    
    for (let j = i; j < lines.length; j++) {
      const currentLine = lines[j];
      
      // Count braces to find the end
      for (const char of currentLine) {
        if (char === '{') depth++;
        if (char === '}') depth--;
      }
      
      // Once we've seen an opening brace
      if (depth > 0) foundStart = true;
      
      // When depth returns to 0 after going positive, we've found the end
      if (foundStart && depth === 0 && currentLine.includes('});')) {
        end = j;
        routesToRemove.push({ start, end, route: line.trim().substring(0, 80) });
        console.log(`Route to remove at lines ${start + 1}-${end + 1}: ${line.trim().substring(0, 60)}`);
        break;
      }
    }
  }
}

console.log(`\n📊 Summary:`);
console.log(`- Helper function sections to remove: ${sectionsToRemove.length}`);
console.log(`- Individual routes to remove: ${routesToRemove.length}`);

// Build set of lines to exclude
const linesToExclude = new Set();

// Add helper function sections
for (const section of sectionsToRemove) {
  for (let i = section.start; i <= section.end; i++) {
    linesToExclude.add(i);
  }
}

// Add individual routes
for (const route of routesToRemove) {
  for (let i = route.start; i <= route.end; i++) {
    linesToExclude.add(i);
  }
}

console.log(`\n🗑️  Total lines to remove: ${linesToExclude.size}`);

// Build cleaned content
const cleanedLines = lines.filter((line, index) => !linesToExclude.has(index));

console.log(`📝 Writing cleaned file...`);
console.log(`Original lines: ${lines.length}`);
console.log(`Cleaned lines: ${cleanedLines.length}`);
console.log(`Lines removed: ${lines.length - cleanedLines.length}`);

// Write the cleaned file
fs.writeFileSync('server/routes.ts.clean', cleanedLines.join('\n'));

console.log(`✅ Cleaned file written to server/routes.ts.clean`);
console.log(`\n⚠️  Please review the cleaned file before replacing the original!`);
