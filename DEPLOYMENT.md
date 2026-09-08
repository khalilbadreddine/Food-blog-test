# Engineered Food — VPS & Caddy Deployment Guide

This site is optimized for deployment on an **Oracle Cloud Always Free VPS (ARM64, Ubuntu/Debian)** behind **Caddy** (auto-HTTPS) with **Cloudflare CDN/DNS**.

---

## 1. Prerequisites on VPS

1. **Install Node.js 22 LTS & Git:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs git caddy
   ```

2. **Clone Repository:**
   ```bash
   sudo mkdir -p /var/www/engineered-food
   sudo chown -R $USER:$USER /var/www/engineered-food
   git clone <repo-url> /var/www/engineered-food
   cd /var/www/engineered-food
   ```

---

## 2. Environment Variables Setup

Create `/var/www/engineered-food/.env`:
```env
PUBLIC_SITE_URL=https://engineeredfood.com
PUBLIC_SITE_NAME="Engineered Food"
PUBLIC_UMAMI_WEBSITE_ID="your-umami-id"
PUBLIC_UMAMI_SCRIPT_URL="https://analytics.yourdomain.com/script.js"
PUBLIC_PINTEREST_TAG_ID="your-pinterest-tag-id"
```

---

## 3. Build & Deploy Script

Run the deploy helper:
```bash
./scripts/deploy.sh
```

Or manually:
```bash
npm ci
npm run build
sudo caddy reload --config ./Caddyfile
```

---

## 4. Cloudflare CDN Setup

1. In Cloudflare DNS, set an `A` record pointing `engineeredfood.com` to your VPS public IP with proxy turned **ON** (orange cloud).
2. Set SSL/TLS mode to **Full (strict)**.
