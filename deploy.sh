#!/bin/bash
# ==============================================
# Script Deploy Laravel ke Vercel
# Jalankan: chmod +x deploy.sh && ./deploy.sh
# ==============================================

set -e

echo "🚀 Memulai proses deploy ke Vercel..."
echo ""

# 1. Install PHP dependencies (production only)
echo "📦 [1/4] Installing Composer dependencies..."
composer install --optimize-autoloader --no-dev --no-interaction

# 2. Install Node dependencies
echo "📦 [2/4] Installing Node dependencies..."
npm ci

# 3. Build frontend assets (Vite + React + Tailwind)
echo "🔨 [3/4] Building frontend assets..."
npm run build

echo "✅ Build selesai!"
echo ""

# 4. Deploy ke Vercel
echo "🚀 [4/4] Deploying to Vercel..."
echo ""
echo "Pilih salah satu:"
echo "  a) Deploy preview:    vercel"
echo "  b) Deploy production: vercel --prod"
echo ""
read -p "Deploy sekarang ke production? (y/n): " answer
if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    vercel --prod
else
    echo ""
    echo "Jalankan manual: vercel --prod"
fi
