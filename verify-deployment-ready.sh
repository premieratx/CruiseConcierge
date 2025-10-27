#!/bin/bash

echo "🔍 DEPLOYMENT VERIFICATION CHECKLIST"
echo "===================================="

# 1. Check build files exist
echo -n "✓ Build files exist... "
if [ -f "dist/index.js" ] && [ -f "dist/public/index.html" ] && [ -d "dist/public/assets" ]; then
  echo "✅ PASS"
else
  echo "❌ FAIL - Missing build files"
  exit 1
fi

# 2. Check server file size is reasonable
echo -n "✓ Server bundle size check... "
SIZE=$(stat -c%s "dist/index.js" 2>/dev/null || stat -f%z "dist/index.js" 2>/dev/null)
if [ "$SIZE" -gt 1000000 ]; then
  echo "✅ PASS ($(($SIZE / 1048576))MB)"
else
  echo "❌ FAIL - Server bundle too small"
  exit 1
fi

# 3. Check assets are built
echo -n "✓ Client assets built... "
ASSET_COUNT=$(ls dist/public/assets/*.js 2>/dev/null | wc -l)
if [ "$ASSET_COUNT" -gt 50 ]; then
  echo "✅ PASS ($ASSET_COUNT JS files)"
else
  echo "❌ FAIL - Not enough assets"
  exit 1
fi

# 4. Test production server starts
echo -n "✓ Production server starts... "
NODE_ENV=production node dist/index.js > /tmp/prod-test.log 2>&1 &
SERVER_PID=$!
sleep 2

if ps -p $SERVER_PID > /dev/null; then
  echo "✅ PASS"
else
  echo "❌ FAIL - Server crashed"
  cat /tmp/prod-test.log
  exit 1
fi

# 5. Test homepage loads
echo -n "✓ Homepage loads... "
if curl -s http://localhost:5000 | grep -q "Premier Party Cruises"; then
  echo "✅ PASS"
else
  echo "❌ FAIL - Homepage not loading"
  kill $SERVER_PID
  exit 1
fi

# 6. Test ATX Disco price is correct
echo -n "✓ ATX Disco price correct ($85)... "
if curl -s http://localhost:5000 | grep -q "\$85/person"; then
  echo "✅ PASS"
else
  echo "❌ FAIL - Wrong ATX Disco price"
  kill $SERVER_PID
  exit 1
fi

# 7. Test critical routes
echo -n "✓ Critical routes work... "
ROUTES_OK=true
for route in "/atx-disco-cruise" "/private-cruises" "/bachelor-party-austin"; do
  if ! curl -s http://localhost:5000$route | grep -q "Premier Party Cruises"; then
    ROUTES_OK=false
    break
  fi
done

if [ "$ROUTES_OK" = true ]; then
  echo "✅ PASS"
else
  echo "❌ FAIL - Some routes broken"
  kill $SERVER_PID
  exit 1
fi

# 8. Check contact info is present
echo -n "✓ Contact info present... "
if curl -s http://localhost:5000 | grep -q "512-488-5892"; then
  echo "✅ PASS"
else
  echo "❌ FAIL - Missing phone number"
  kill $SERVER_PID
  exit 1
fi

# Clean up
kill $SERVER_PID 2>/dev/null

echo ""
echo "===================================="
echo "✅ ALL CHECKS PASSED - READY TO DEPLOY!"
echo "===================================="
echo ""
echo "Build command to use: NODE_ENV=production node server/build-wrapper.js"
echo "Build wrapper handles the lightningcss issue correctly."
echo ""