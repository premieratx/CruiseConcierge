#!/usr/bin/env bash
# Fetch build-time assets referenced by the frontend but not committed to git.
#
# Two sweeps:
#   1. Literal @assets/... imports from .ts/.tsx — whatever Vite can't resolve
#      locally breaks the build. We fetch these from the live CDN first.
#   2. String-referenced /attached_assets/<file> URLs in the code + HTML. These
#      don't block the build but are served at runtime, so we need them in the
#      final bundle for a Replit-independent deploy.
#
# Runs on every Netlify build AND can be run locally. Idempotent — never
# re-downloads files that already exist with size > 0.
#
# Usage:
#   ./scripts/fetch-build-assets.sh           # full sweep (imports + referenced)
#   ./scripts/fetch-build-assets.sh imports   # only the must-have imports
#
# Environment:
#   LIVE_BASE    override the source CDN (default: https://premierpartycruises.com)

set -euo pipefail

LIVE="${LIVE_BASE:-https://premierpartycruises.com}"
DEST_DIR="attached_assets"
MODE="${1:-full}"

mkdir -p "$DEST_DIR"

download_one() {
  local name="$1"
  local out="$DEST_DIR/$name"

  if [[ -s "$out" ]]; then
    return 0
  fi

  mkdir -p "$(dirname "$out")"

  # URL-encode spaces and other risky chars so Replit (Express static) serves
  # them correctly. Curl's --data-urlencode is for POST bodies, so we do a
  # simple targeted substitution for the characters we see in asset names.
  local encoded
  encoded=$(printf '%s' "$name" \
    | sed -E 's/ /%20/g; s/\[/%5B/g; s/\]/%5D/g; s/\(/%28/g; s/\)/%29/g')
  local url="$LIVE/attached_assets/$encoded"

  if curl -fsSL --retry 2 --max-time 60 -o "$out" "$url" 2>/dev/null; then
    echo "  ↓ $name"
  else
    rm -f "$out"
    # Silent on 404s — some referenced assets are local-only (legitimate
    # miss). Vite will fail the build if a MUST-HAVE import is unresolved.
  fi
}

# ─── Sweep 1: @assets/* imports that block the build ───────────────────────
echo "Sweep 1/2: @assets/* imports"
{
  # Match the full contents of `'@assets/anything'` or `"@assets/anything"` —
  # this preserves spaces and special chars that can legally appear in
  # filenames (e.g. `@assets/day tripper-1 party boat.jpg`).
  # Only scan .ts/.tsx sources so .ARCHIVED files don't pollute the list.
  grep -rhoE "['\"]@assets/[^'\"]+['\"]" client/src --include='*.ts' --include='*.tsx' 2>/dev/null \
    | sed -E "s|['\"]@assets/||; s|['\"]\$||" \
    | sort -u
} > /tmp/assets-imports.list

while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  download_one "$f"
done < /tmp/assets-imports.list

if [[ "$MODE" == "imports" ]]; then
  echo "Done (imports-only mode)."
  exit 0
fi

# ─── Sweep 2: runtime /attached_assets/<file> references ───────────────────
echo "Sweep 2/2: /attached_assets/* runtime references"
{
  # Runtime URL references: /attached_assets/<file>.<ext> — these live inside
  # JSX string props (src, href, poster, etc.) and HTML. Names here don't
  # usually have spaces (URLs get encoded), so a simple char class is fine.
  grep -rhoE "/attached_assets/[-A-Za-z0-9._/+%]+\\.(webp|png|jpg|jpeg|gif|mp4|webm|mp3|pdf|svg|ico)" client/src public 2>/dev/null \
    | sed 's|^/attached_assets/||' \
    | sort -u
} > /tmp/assets-referenced.list

total=$(wc -l < /tmp/assets-referenced.list | tr -d ' ')
echo "  found $total unique referenced paths"

count=0
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  download_one "$f"
  count=$((count + 1))
  if (( count % 50 == 0 )); then
    echo "  ... progress: $count / $total"
  fi
done < /tmp/assets-referenced.list

echo "Build assets ready. ($(ls -A "$DEST_DIR" | wc -l | tr -d ' ') files total)"
