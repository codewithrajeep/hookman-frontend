#!/bin/bash

set -e

# Configurable base URL
BASE_URL="${1:-http://localhost:3000}"

# Public routes to test — add new public pages here as you build them
PUBLIC_ROUTES=(
  "/"
  "/login"
  "/register"
)

echo "🧪 Starting dev server test against $BASE_URL"
echo ""

# Start dev server in background if testing localhost
SERVER_PID=""
if [[ "$BASE_URL" == *"localhost"* ]]; then
  echo "▶ Starting dev server..."
  pnpm dev &
  SERVER_PID=$!

  # Wait for server to be ready
  echo "⏳ Waiting for server to be ready..."
  for i in {1..20}; do
    if curl -s -f "$BASE_URL" > /dev/null 2>&1; then
      echo "✅ Server is ready"
      break
    fi
    if [ $i -eq 20 ]; then
      echo "❌ Server failed to start after 40 seconds"
      kill $SERVER_PID 2>/dev/null
      exit 1
    fi
    sleep 2
  done
fi

# Cleanup function
cleanup() {
  if [ -n "$SERVER_PID" ]; then
    echo ""
    echo "🧹 Stopping dev server..."
    kill $SERVER_PID 2>/dev/null
    wait $SERVER_PID 2>/dev/null
    echo "✅ Server stopped"
  fi
}
trap cleanup EXIT INT TERM

# Test each route
echo ""
echo "▶ Testing public routes..."
FAILED=0

for route in "${PUBLIC_ROUTES[@]}"; do
  URL="$BASE_URL$route"
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null || echo "000")

  # Accept 200 or 307/308 (Next.js redirects for auth pages)
  if [[ "$STATUS" == "200" || "$STATUS" == "307" || "$STATUS" == "308" ]]; then
    echo "  ✅ $route → $STATUS"
  else
    echo "  ❌ $route → $STATUS"
    FAILED=$((FAILED + 1))
  fi
done

echo ""
if [ $FAILED -eq 0 ]; then
  echo "✅ All routes passed"
else
  echo "❌ $FAILED route(s) failed"
  exit 1
fi
