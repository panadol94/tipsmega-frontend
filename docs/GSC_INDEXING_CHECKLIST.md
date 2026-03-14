# Google Search Console Indexing Checklist — TipsMega888

Use this checklist after major SEO/site-structure updates.

## Priority URLs to inspect first
1. `https://tipsmega888.com/`
2. `https://tipsmega888.com/mega888`
3. `https://tipsmega888.com/trusted`
4. `https://tipsmega888.com/blog`
5. `https://tipsmega888.com/blog/mega888-login-link-terkini-2026`
6. `https://tipsmega888.com/blog/mega888-download-android-apk-terbaru-2026`
7. `https://tipsmega888.com/blog/mega888-download-ios-terbaru-2026`
8. `https://tipsmega888.com/blog/mega888-rtp-live-malaysia-2026`
9. `https://tipsmega888.com/about`
10. `https://tipsmega888.com/privacy-policy`
11. `https://tipsmega888.com/terms`
12. `https://tipsmega888.com/disclaimer`

## Before requesting indexing
- [ ] Open `https://tipsmega888.com/sitemap.xml`
- [ ] Confirm the updated URLs are present
- [ ] Confirm each page loads with status 200
- [ ] Confirm canonical matches the final page URL
- [ ] Confirm page is not blocked by `robots.txt`
- [ ] Confirm page meta robots is `index, follow`
- [ ] Confirm internal links point to the page from homepage, hub, footer, or article template

## In Google Search Console
### URL Inspection
For each priority URL above:
- [ ] Paste URL into **URL Inspection**
- [ ] Check **Page is indexed** / **URL is on Google** / **URL is not on Google**
- [ ] If not indexed, click **Request Indexing**
- [ ] If indexed but old version shown, click **Test Live URL** first, then **Request Indexing**

### Sitemaps
- [ ] Submit or resubmit: `https://tipsmega888.com/sitemap.xml`
- [ ] Confirm status is **Success**
- [ ] Check discovered URLs count increases after next recrawl

### Coverage / Pages report
Watch for these issues:
- [ ] Alternate page with proper canonical tag
- [ ] Crawled - currently not indexed
- [ ] Discovered - currently not indexed
- [ ] Duplicate without user-selected canonical
- [ ] Soft 404

## Recommended order for request indexing
### Batch 1 — Core pages
- [ ] Homepage `/`
- [ ] Mega888 Hub `/mega888`
- [ ] Trusted `/trusted`
- [ ] Blog `/blog`

### Batch 2 — Money / intent pages
- [ ] Login guide
- [ ] Android APK guide
- [ ] iOS guide
- [ ] RTP Live guide

### Batch 3 — Trust pages
- [ ] About
- [ ] Privacy Policy
- [ ] Terms
- [ ] Disclaimer

## What to record after submission
- Date submitted:
- URLs requested:
- Sitemap status:
- Indexed pages after 3 days:
- Indexed pages after 7 days:
- Queries showing impressions:
- Notes / anomalies:

## Quick interpretation
- If `site:tipsmega888.com` shows pages but target keyword still missing → ranking issue
- If URL Inspection says crawl okay but not indexed → content/value/internal-link issue
- If pages are indexed but not moving → continue with internal links, CTR improvements, and content updates
