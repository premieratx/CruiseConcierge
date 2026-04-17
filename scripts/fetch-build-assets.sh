#!/usr/bin/env bash
# Fetch build-time assets that live on the production CDN but are not
# committed to git (too heavy, or managed separately on Replit).
#
# Runs on every Netlify build AND can be run locally if a fresh clone is
# missing assets. Idempotent — skips files that already exist with size > 0.
#
# Usage:
#   ./scripts/fetch-build-assets.sh
#
# To add more files, append them to MISSING_ASSETS below.

set -euo pipefail

LIVE="https://premierpartycruises.com"
DEST_DIR="attached_assets"

# Add filenames (relative to /attached_assets) that are imported by the
# Vite build but not committed to the repo.
MISSING_ASSETS=(
  "disco_dance_party_v3.mp4"
  "fireball_dance_party_compressed.mp4"
  "mr_brightside_compressed.mp4"
  "pursuit_of_happiness_compressed.mp4"
)

mkdir -p "$DEST_DIR"

for f in "${MISSING_ASSETS[@]}"; do
  out="$DEST_DIR/$f"
  if [[ -s "$out" ]]; then
    echo "  ✓ $f (already present)"
    continue
  fi
  url="$LIVE/attached_assets/$f"
  echo "  ↓ $f"
  if ! curl -fsSL --retry 3 --max-time 120 -o "$out" "$url"; then
    echo "    ⚠️  Could not fetch $url — build may fail if this asset is imported." >&2
    rm -f "$out"
  fi
done

echo "Build assets ready."
