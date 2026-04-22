#!/usr/bin/env node
/**
 * One-shot: swap every hp2-hero__video `poster="…"` to the unified
 * hero-fallback.jpg across all V2 pages. The file lives at
 * attached_assets/hero-fallback.jpg and is what mobile browsers show
 * when the video can't autoplay.
 */
import { readFileSync, writeFileSync } from 'node:fs';
const FILES = [
  'client/src/pages/Home-New.tsx',
  'client/src/pages/DiscoV2.tsx',
  'client/src/pages/BacheloretteV2.tsx',
  'client/src/pages/BachelorV2.tsx',
  'client/src/pages/CombinedBachV2.tsx',
  'client/src/pages/CorporateV2.tsx',
  'client/src/pages/WeddingV2.tsx',
  'client/src/pages/BirthdayV2.tsx',
  'client/src/pages/PrivateCruisesV2.tsx',
];
// Pattern: the poster prop inside the <video className="hp2-hero__video" ...>
// We rewrite only the poster= line that sits inside hp2-hero__video blocks.
// Simpler: replace the common existing poster values.
const SWAP_POSTERS = [
  '"/attached_assets/clever-girl-50-person-boat.webp"',
  '"/attached_assets/atx-disco-cruise-party.webp"',
  '"/attached_assets/clever-girl-4-wedding-venue.jpg"',
  '"/attached_assets/bachelor-party-group-guys-hero-compressed.webp"',
];
const NEW = '"/attached_assets/hero-fallback.jpg"';
let total = 0;
for (const f of FILES) {
  let src;
  try { src = readFileSync(f, 'utf8'); } catch { continue; }
  const before = src;
  for (const p of SWAP_POSTERS) src = src.split(p).join(NEW);
  if (src !== before) {
    writeFileSync(f, src);
    total++;
    console.log(`  ✓ ${f}`);
  }
}
console.log(`\nSwapped poster on ${total} files → hero-fallback.jpg`);
