#!/usr/bin/env bash
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:3000}"
UA="Googlebot/2.1 (+http://www.google.com/bot.html)"
DEEP_PATH="${DEEP_PATH:-/wedding-catering-mesa-az}"
TMP_HTML="$(mktemp)"
trap 'rm -f "$TMP_HTML"' EXIT

status="$(curl -sS -A "$UA" -o "$TMP_HTML" -w '%{http_code}' "$BASE$DEEP_PATH")"
if [[ "$status" != "200" ]]; then
  echo "FAIL: expected HTTP 200 for $DEEP_PATH; received $status"
  exit 1
fi

root_html="$(sed -n '/<div id="root">/,/<\/div><script type="module"/p' "$TMP_HTML")"
if ! grep -q "Wedding Catering" <<<"$root_html"; then
  echo "FAIL: crawler response did not include expected visible deep-page text inside #root"
  exit 1
fi

if ! grep -q 'href="/catering-menu"' <<<"$root_html"; then
  echo "FAIL: crawler response did not include expected internal anchors inside #root"
  exit 1
fi

title_count="$(grep -o '<title>' "$TMP_HTML" | wc -l | tr -d ' ')"
canonical_count="$(grep -o 'rel="canonical"' "$TMP_HTML" | wc -l | tr -d ' ')"
if [[ "$title_count" != "1" || "$canonical_count" != "1" ]]; then
  echo "FAIL: expected exactly one title and canonical; found title=$title_count canonical=$canonical_count"
  exit 1
fi

if ! grep -q "https://www.thelocalcaterer.com$DEEP_PATH" "$TMP_HTML"; then
  echo "FAIL: self-referencing canonical was not found"
  exit 1
fi

sitemap_count="$(curl -sS "$BASE/sitemap.xml" | grep -c '<loc>')"
if [[ "$sitemap_count" -lt 45 ]]; then
  echo "FAIL: sitemap is unexpectedly incomplete ($sitemap_count URLs)"
  exit 1
fi

if ! curl -sS "$BASE/robots.txt" | grep -q 'Sitemap: https://www.thelocalcaterer.com/sitemap.xml'; then
  echo "FAIL: robots.txt does not reference the canonical sitemap"
  exit 1
fi

echo "PASS: Googlebot receives SSR body text, internal links, one route title, one self-canonical, and a complete sitemap."
