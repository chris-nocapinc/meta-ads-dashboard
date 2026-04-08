#!/bin/bash
# Meta Ads Testing Agent — one-command startup
cd "$(dirname "$0")"

if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies (first run only)..."
  npm install --silent
fi

echo "🚀 Starting Meta Ads Testing Agent..."
npx vite --open
