#!/usr/bin/env node
/**
 * Second-pass cleanup after rewrite-captain-language.mjs. Fixes double-
 * word and awkward-phrasing artifacts produced by the first pass.
 */
import { readFileSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const DIRS = [
  'client/src', 'client/public/blog-data/posts', 'client/public/static-data',
  'server', 'shared', 'attached_assets/schema_data', 'public/ai.txt',
  'scripts/generated-page-content.ts',
];
const EXT = new Set(['.ts','.tsx','.js','.mjs','.cjs','.json','.jsonld','.md','.txt','.xml']);

const RX = [
  // Kill doubled "Licensed" adjectives
  [/\bLicensed[- ]licensed\b/g, 'licensed'],
  [/\blicensed[- ]Licensed\b/g, 'licensed'],
  [/\bLicensed[- ]certified\b/g, 'licensed'],
  [/\bLicensed Licensed,/g, 'Licensed,'],
  [/\blicensed Licensed,/g, 'licensed,'],
  [/\bLicensed, Experienced \(Licensed\)/g, 'state-issued'],
  [/\bLicensed, Experienced Captain \(Licensed\)/g, 'licensed captain'],
  [/\bLicensed, Experienced \(Licensed, Experienced\)/g, 'licensed, experienced'],
  [/\bLicensed,?\s*Experienced\s*,?\s*Licensed\b/g, 'Licensed, Experienced'],
  [/\bLicensed, Experienced approved\b/g, 'marine-grade'],
  [/\bLicensed[- ]approved\b/g, 'marine-grade'],
  // "holds a current Licensed, Experienced Master" → reword
  [/holds a current Licensed, Experienced Master or OUPV license/g, "holds a current state-issued captain's license"],
  [/holds a current Licensed, Experienced Master/g, "holds a current state-issued captain's license"],
  [/current Licensed, Experienced Master/g, "current state-issued captain's license"],
  // Generic cleanup of "Licensed Master" artifacts
  [/\bLicensed Master or OUPV license\b/g, "state-issued captain's license"],
  [/\bLicensed Master\b/g, "state-issued captain"],
  // Fix comma spacing artifacts
  [/Licensed,  Experienced/g, 'Licensed, Experienced'],
];

function walk(p) {
  let s; try { s = statSync(p); } catch { return []; }
  if (s.isFile()) return EXT.has(extname(p)) ? [p] : [];
  if (s.isDirectory()) {
    const out = [];
    for (const n of readdirSync(p)) {
      if (n === 'node_modules' || n.startsWith('.')) continue;
      out.push(...walk(join(p, n)));
    }
    return out;
  }
  return [];
}

let changed = 0;
for (const f of DIRS.flatMap(p => walk(join(ROOT, p)))) {
  const a = readFileSync(f, 'utf8');
  let b = a;
  for (const [re, to] of RX) b = b.replace(re, to);
  if (a !== b) { writeFileSync(f, b); changed++; }
}
console.log(`Cleanup: ${changed} files fixed.`);
