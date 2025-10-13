# Keep-Alive Setup Guide for Premier Party Cruises

## Problem
Replit Autoscale deployments go dormant after 15 minutes of inactivity, making the site temporarily unavailable to visitors and search engine crawlers.

## Solution
Use a free external monitoring service to ping your website every 10 minutes, keeping it alive 24/7.

---

## OPTION 1: UptimeRobot (RECOMMENDED - 100% Free Forever)

**Setup Time: 2 minutes**

### Step-by-Step:

1. **Go to**: https://uptimerobot.com/signUp

2. **Sign up** (Free account - no credit card required)
   - Email: [Your email]
   - Create password
   - Verify email

3. **Add New Monitor** (after login):
   - Click: **"+ Add New Monitor"**
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `Premier Party Cruises`
   - URL: `https://premierpartycruises.com`
   - Monitoring Interval: **10 minutes**
   - Click: **"Create Monitor"**

4. **Done!** Your site will be pinged every 10 minutes forever.

### What You Get:
- ✅ Site stays alive 24/7 (never goes dormant)
- ✅ Email/SMS alerts if site goes down
- ✅ Uptime statistics and reporting
- ✅ 50 monitors on free plan
- ✅ No credit card ever required

---

## OPTION 2: Cron-job.org (Alternative)

**Setup Time: 2 minutes**

1. Go to: https://cron-job.org
2. Sign up (free)
3. Create new cron job:
   - URL: `https://premierpartycruises.com`
   - Interval: Every 10 minutes
4. Save and activate

---

## OPTION 3: Better Stack (Better Uptime)

**Setup Time: 3 minutes**

1. Go to: https://betterstack.com/better-uptime
2. Sign up (free tier available)
3. Add HTTP monitor:
   - URL: `https://premierpartycruises.com`
   - Check interval: 10 minutes
4. Activate monitor

---

## Why This Works

- **Autoscale dormancy**: 15 minutes of no traffic → site sleeps
- **Our solution**: Ping every 10 minutes → site never sleeps
- **Cost**: $0 (completely free)
- **SEO impact**: Site is always available to Google crawlers
- **Performance**: No cold starts, always fast

---

## Current Deployment Info

- **Type**: Autoscale (4 vCPU / 8 GiB RAM / 3 Max)
- **Domains**:
  - https://premierpartycruises.com
  - https://www.premierpartycruises.com
  - https://cruise-concierge-brian-hill.replit.app

**All domains will stay alive with monitoring on the primary domain.**

---

## Verification

After setup, verify it's working:

1. Check your monitoring dashboard (shows successful pings)
2. Test: Let site sit idle for 20 minutes, then visit → should load instantly (not dormant)
3. Monitor uptime stats over 24 hours

---

## Important Notes

- ✅ **SEO content is permanent** - All schemas and HTML are in your code and will NEVER disappear
- ✅ **This only solves uptime** - Makes sure site is always available when crawlers visit
- ✅ **Free forever** - No costs for basic uptime monitoring
- ✅ **Set and forget** - Once configured, runs automatically forever

---

## Recommended Action

**Set up UptimeRobot now** (takes 2 minutes): https://uptimerobot.com/signUp

This is the exact solution used by thousands of developers for Replit, Heroku, and similar platforms.
