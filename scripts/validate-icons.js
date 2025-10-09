#!/usr/bin/env node

/**
 * Validates that all icon imports from lucide-react actually exist
 * Prevents build failures from missing icons like 'Champagne'
 */

import { readFileSync } from 'fs';
import { glob } from 'glob';
import * as lucideIcons from 'lucide-react';

const errors = [];
const validIcons = new Set(Object.keys(lucideIcons));

// Find all TypeScript/TSX files
const files = glob.sync('**/*.{ts,tsx}', {
  ignore: ['node_modules/**', 'dist/**', '.replit/**']
});

console.log(`🔍 Validating icon imports in ${files.length} files...`);

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  
  // Match lucide-react import statements
  const importMatches = content.matchAll(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"]/g);
  
  for (const match of importMatches) {
    const imports = match[1]
      .split(',')
      .map(i => i.trim())
      .filter(i => i && !i.includes(' as ')); // Skip renamed imports
    
    for (const iconName of imports) {
      if (!validIcons.has(iconName)) {
        errors.push({
          file,
          icon: iconName,
          line: content.substring(0, match.index).split('\n').length
        });
      }
    }
  }
}

if (errors.length > 0) {
  console.error('\n❌ Found invalid lucide-react icon imports:\n');
  errors.forEach(({ file, icon, line }) => {
    console.error(`  ${file}:${line} - Icon '${icon}' does not exist in lucide-react`);
  });
  console.error('\n📚 See available icons: https://lucide.dev/icons/\n');
  process.exit(1);
}

console.log('✅ All icon imports are valid!\n');
