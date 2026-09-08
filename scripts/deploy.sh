#!/usr/bin/env bash
# Production Deployment Script for VPS

set -e

echo "=== Starting Engineered Food Production Build ==="

# 1. Install dependencies
echo "Installing dependencies..."
npm ci

# 2. Build 3D GLB assets
echo "Generating and optimizing 3D assets..."
node scripts/generate-burger-model.js
./scripts/optimize-models.sh

# 3. Build Astro static production bundle
echo "Building Astro production bundle..."
npm run build

# 4. Reload Caddy web server
if command -v caddy &> /dev/null; then
  echo "Reloading Caddy web server..."
  sudo caddy reload --config ./Caddyfile || echo "Caddy reload failed; please check Caddy service."
else
  echo "Caddy command not found. Static output is ready in ./dist"
fi

echo "=== Deployment Successfully Completed ==="
