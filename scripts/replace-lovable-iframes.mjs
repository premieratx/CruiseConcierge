#!/usr/bin/env node
/**
 * Replaces the Lovable iframe quote builder with the native
 * EmbeddedQuoteFlow component on all public marketing pages. One-shot
 * migration script — NOT run at build time.
 *
 * Target pattern:
 *   <iframe
 *     src="https://ppc-quote-builder.lovable.app/"
 *     ...
 *     data-testid="iframe-quote-builder"
 *   />
 *
 * Replacement:
 *   <EmbeddedQuoteFlow source="<page_id>_embed" />
 *
 * Also adds the import to the top of each file and strips any
 * postMessage listener that was wired for iframe height.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const FILES = [
  ['client/src/pages/AfterParty.tsx', 'after_party'],
  ['client/src/pages/Sweet16.tsx', 'sweet16'],
  ['client/src/pages/RehearsalDinner.tsx', 'rehearsal_dinner'],
  ['client/src/pages/PartyBoatAustin.tsx', 'party_boat_austin'],
  ['client/src/pages/MilestoneBirthday.tsx', 'milestone_birthday'],
  ['client/src/pages/GraduationParty.tsx', 'graduation_party'],
  ['client/src/pages/CompanyMilestone.tsx', 'company_milestone'],
  ['client/src/pages/CombinedBachelorBachelorette.tsx', 'combined_bach'],
  ['client/src/pages/ClientEntertainment.tsx', 'client_entertainment'],
  ['client/src/pages/WelcomeParty.tsx', 'welcome_party'],
];

const IFRAME_PATTERN =
  /<iframe\s+src="https:\/\/ppc-quote-builder\.lovable\.app\/"[^>]*?data-testid="iframe-quote-builder"\s*\/>/s;

// Loosely match postMessage listeners wired for lovable.app resize events.
const POSTMSG_HANDLER_PATTERN =
  /\/\/[^\n]*lovable[^\n]*\n|useEffect\(\s*\(\)\s*=>\s*\{\s*const\s+handle(?:Message|Resize)\s*=[\s\S]*?event\.origin[^}]*lovable\.app[\s\S]*?window\.removeEventListener[\s\S]*?\}\s*,\s*\[[^\]]*\]\s*\);?/g;

const IMPORT_RE = /^import\s+[^;]*from\s+["'][^"']+["'];?\s*$/m;

function processFile(file, pageId) {
  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch (e) {
    console.warn(`  ✗ ${file} — ${e.message}`);
    return false;
  }
  if (!IFRAME_PATTERN.test(src)) {
    console.log(`  · ${file} — no iframe match, skipping`);
    return false;
  }

  // 1. Replace iframe with EmbeddedQuoteFlow
  src = src.replace(
    IFRAME_PATTERN,
    `<EmbeddedQuoteFlow source="${pageId}_embed" />`
  );

  // 2. Add import if missing
  if (!src.includes('import EmbeddedQuoteFlow') && !src.includes('from "@/components/EmbeddedQuoteFlow"')) {
    // Insert after the first import statement
    const m = src.match(IMPORT_RE);
    if (m) {
      const insertAt = m.index + m[0].length;
      src =
        src.slice(0, insertAt) +
        `\nimport EmbeddedQuoteFlow from "@/components/EmbeddedQuoteFlow";` +
        src.slice(insertAt);
    }
  }

  // 3. Strip the postMessage listener effect (best-effort).
  // We don't touch files without a matching pattern — some pages never had
  // the listener.
  const before = src;
  src = src.replace(POSTMSG_HANDLER_PATTERN, (m) => {
    if (m.includes('lovable.app')) return '';
    return m;
  });
  const strippedListener = before !== src;

  writeFileSync(file, src);
  console.log(`  ✓ ${basename(file)} → EmbeddedQuoteFlow${strippedListener ? ' (stripped postMessage listener)' : ''}`);
  return true;
}

let ok = 0, skip = 0;
for (const [file, pageId] of FILES) {
  if (processFile(file, pageId)) ok++;
  else skip++;
}
console.log(`\nDone: ${ok} replaced, ${skip} skipped.`);
