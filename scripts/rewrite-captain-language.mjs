#!/usr/bin/env node
/**
 * One-shot: rewrite USCG / Coast Guard language to "Licensed, Experienced
 * Captain(s)". We are NOT Coast Guard certified — this removes the legal
 * overreach from site copy, schemas, and static blog data.
 *
 * Handles pattern variations (most-specific first):
 *   "U.S. Coast Guard-certified captain(s)"   → "licensed, experienced captain(s)"
 *   "USCG-certified captain(s)"               → "licensed, experienced captain(s)"
 *   "USCG-licensed captain(s)"                → "licensed, experienced captain(s)"
 *   "USCG Master or OUPV license"             → "state-issued captain's license"
 *   "USCG Master"                             → "state-issued captain"
 *   "USCG license(s)"                         → "captain's license(s)"
 *   "USCG inspected" / "USCG-inspected"       → "regularly inspected"
 *   "Coast Guard certified"                   → "licensed, experienced"
 *   "Coast Guard licensed"                    → "licensed, experienced"
 *   "Coast Guard"   (standalone)              → "Licensed, Experienced"
 *   "U.S. Coast Guard" / "US Coast Guard"     → "Licensed, Experienced"
 *   "USCG" (standalone)                       → "Licensed"
 *
 * Preserves case: "USCG" at sentence start stays capital, mid-sentence
 * lowercase variants stay lowercase. We do case-specific matches.
 *
 * Only run this on committed checkpoints — it writes in place.
 */

import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const TARGET_DIRS = [
  'client/src',
  'client/public/blog-data/posts',
  'client/public/static-data',
  'server',
  'shared',
  'scripts/generated-page-content.ts', // file, handled below
  'attached_assets/schema_data',
  'public/ai.txt',
];
const EXT_OK = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.jsonld', '.md', '.txt', '.xml']);

// Order matters — most specific patterns first so shorter matches don't
// consume the longer ones.
const REPLACEMENTS = [
  // Very specific phrases first
  [/U\.S\. Coast Guard[- ]certified captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/U\.S\. Coast Guard[- ]licensed captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/US Coast Guard[- ]certified captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/US Coast Guard[- ]licensed captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/Coast Guard[- ]certified captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/Coast Guard[- ]licensed captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/USCG[- ]certified captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/USCG[- ]licensed captains?/g, (m) => m.endsWith('s') ? 'licensed, experienced captains' : 'licensed, experienced captain'],
  [/USCG captains?/g, (m) => m.endsWith('s') ? 'Licensed, Experienced Captains' : 'Licensed, Experienced Captain'],

  // Credential/inspection phrasing (replace with neutral language)
  [/USCG Master or OUPV license/g, "state-issued captain's license"],
  [/USCG Master/g, 'state-issued captain'],
  [/USCG OUPV/g, "captain's license"],
  [/USCG licenses?/g, (m) => m.endsWith('s') ? "captain's licenses" : "captain's license"],
  [/USCG[- ]inspected/g, 'regularly inspected'],
  [/USCG[- ]approved/g, 'marine-grade'],
  [/USCG[- ]rated/g, 'rated'],
  [/USCG[- ]compliant/g, 'compliant'],
  [/Coast Guard[- ]inspected/g, 'regularly inspected'],
  // NOTE: we deliberately do NOT rewrite "USCG-approved life jackets" —
  // our life jackets ARE USCG-approved, that claim stays. Both the
  // `USCG-approved` and `Coast Guard-approved` prefixes are preserved
  // ONLY when immediately followed by "life jacket(s)" or "PFD(s)".
  [/Coast Guard[- ]approved(?!\s+(life jackets?|PFDs?|flotation))/g, 'marine-grade'],
  [/USCG[- ]approved(?!\s+(life jackets?|PFDs?|flotation))/g, 'marine-grade'],

  // Phrases with "Coast Guard" + other context
  [/Coast Guard[- ]certified/g, 'licensed, experienced'],
  [/Coast Guard[- ]licensed/g, 'licensed, experienced'],

  // Standalone "USCG" — single token, no adjacent hyphen/word char
  [/\bU\.S\. Coast Guard\b/g, 'Licensed, Experienced'],
  [/\bUS Coast Guard\b/g, 'Licensed, Experienced'],
  [/\bCoast Guard\b/g, 'Licensed, Experienced'],
  [/\bUSCG\b/g, 'Licensed'],
];

function walkFiles(path) {
  const out = [];
  let s;
  try { s = statSync(path); } catch { return out; }
  if (s.isFile()) {
    if (EXT_OK.has(extname(path))) out.push(path);
    return out;
  }
  if (s.isDirectory()) {
    for (const name of readdirSync(path)) {
      if (name === 'node_modules' || name.startsWith('.')) continue;
      out.push(...walkFiles(join(path, name)));
    }
  }
  return out;
}

function rewrite(text) {
  let out = text;
  for (const [re, to] of REPLACEMENTS) {
    out = out.replace(re, typeof to === 'function' ? to : to);
  }
  return out;
}

let filesChanged = 0, totalReplacements = 0;
const allFiles = TARGET_DIRS.flatMap((p) => walkFiles(join(ROOT, p)));
for (const file of allFiles) {
  const before = readFileSync(file, 'utf8');
  const after = rewrite(before);
  if (before !== after) {
    // Count rough number of changes
    const beforeHits = (before.match(/USCG|Coast Guard/g) || []).length;
    const afterHits = (after.match(/USCG|Coast Guard/g) || []).length;
    totalReplacements += Math.max(0, beforeHits - afterHits);
    writeFileSync(file, after);
    filesChanged++;
  }
}
console.log(`Rewrote ${filesChanged} files (~${totalReplacements} Coast Guard/USCG phrases).`);
