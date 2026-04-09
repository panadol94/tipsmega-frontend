# TipsMega888 — Wave 2 SEO / Content Cleanup Plan
**Date:** 2026-03-23
**Status:** Draft — FOR REVIEW BEFORE DEPLOY
**Model:** MiniMax M2.7 (repo-only prep, no production touch)

---

## Context: What Wave 1/2/3 Already Did

| Sprint | Date | Actions |
|---|---|---|
| Sprint 1 | 2026-03-12 | Cannibalization audit + pillar/cluster mapping documented |
| Sprint 2 | 2026-03-12 | Hub page `/mega888` added; 10 title/description CTR fixes; sitemap updated |
| Sprint 3 | 2026-03-12 | 301 redirects applied in `nginx.conf` (8 blog URL merges + 8 soft-404 fixes) |
| GSC | 2026-03-15+ | Indexing checklist + GSC submission documented |

### Already Redirected (nginx.conf — DONE ✅)
| Old URL | → New Canonical | Cluster |
|---|---|---|
| `/blog/mega888-apk-download-2026` | `/blog/mega888-download-panduan-lengkap-2026` | Download |
| `/blog/mega888-free-credit-2026` | `/blog/mega888-free-credit-no-deposit-2026` | Free Credit |
| `/blog/mega888-free-credit-terkini-2026` | `/blog/mega888-free-credit-no-deposit-2026` | Free Credit |
| `/blog/mega888-rtp-panduan-lengkap-2026` | `/blog/mega888-rtp-live-malaysia-2026` | RTP |
| `/blog/mega888-withdrawal-guide` | `/blog/mega888-withdraw-cepat-malaysia-2026` | Withdraw |
| `/blog/cara-daftar-mega888` | `/blog/mega888-register-akaun-baru-2026` | Register |
| `/blog/mega888-ios-guide` | `/blog/mega888-download-ios-terbaru-2026` | iOS |
| `/blog/mega888-android-install` | `/blog/mega888-download-android-apk-terbaru-2026` | Android |
| `/blog/mega888-login-link-terkini` | `/blog/mega888-login-link-terkini-2026` | Login |
| `/blog/mega888-download-android-apk-terkini-2026` | `/blog/mega888-download-android-apk-terbaru-2026` | Download |
| `/blog/mega888-download-ios-terkini-2026` | `/blog/mega888-download-ios-terbaru-2026` | iOS |
| `/blog/mega888-malaysia-2026` | `/blog/mega888-malaysia-2026-panduan-lengkap` | General |

Plus 8 soft-404 / short-URL → blog canonical redirects (e.g. `/mega888-login` → `/blog/mega888-login-link-terkini-2026`).

---

## Wave 2 — Remaining Cannibalization Actions

### Action Map: Missing Redirects

| # | Old Slug | Status in nginx.conf | Action Required | Priority | Deploy? |
|---|---|---|---|---|---|
| 1 | `download-mega888-apk` | ✅ Added | 301 → `/blog/mega888-download-panduan-lengkap-2026` | HIGH | **READY** |
| 2 | `kredit-percuma-mega888` | ✅ Added | 301 → `/blog/mega888-free-credit-no-deposit-2026` | HIGH | **READY** |
| 3 | `mega888-register-malaysia` | ✅ Added | 301 → `/blog/mega888-register-akaun-baru-2026` | MEDIUM | **READY** |
| 4 | `mega888-auto-cuci` | ⏸️ HOLD | 301 → `/blog/mega888-withdraw-cepat-malaysia-2026` — keyword overlap risk, needs content audit | MEDIUM | **HOLD** |
| 5 | `mega888-download-free-2026` | ⏸️ HOLD | Thin duplicate of pillar download page; needs content audit before redirect | HIGH | **HOLD** |

### Action Map: Thin / Low-Value Pages (noindex applied)

| Slug | Concern | Decision | Status |
|---|---|---|---|
| `mega888-test-id` | Thin demo/test account info page — no search value | `robots: { index: false }` + canonical=self | ✅ **Done — noindex in `app/blog/[slug]/page.tsx`** |
| `mega888-vs-pussy888` | Competitor comparison cannibalizes Mega888 pillar; low purchase-intent | `robots: { index: false }` + canonical=self | ✅ **Done — noindex in `app/blog/[slug]/page.tsx`** |
| `mega888-918kiss-beza` | Competitor comparison cannibalizes Mega888 pillar; low purchase-intent | `robots: { index: false }` + canonical=self | ✅ **Done — noindex in `app/blog/[slug]/page.tsx`** |
| `mega888-original-vs-fake` | Trust/safety page — useful intent but thin content risk | `robots: { index: false }` + canonical=self (keep for users, exclude from index) | ✅ **Done — noindex in `app/blog/[slug]/page.tsx`** |
| `mega888-download-free-2026` | Thin duplicate of pillar download page; keyword "mega888 download free" low-intent | Needs content audit before redirect decision | ⏸️ **HOLD** |

### Action Map: GSC / Indexing Post-Redirect

After applying any nginx.conf redirect changes, submit these in GSC:
1. All **new canonical targets** (request recrawl + index)
2. Resubmit **sitemap.xml**
3. Watch Coverage report for "Duplicate without user-selected canonical" — means a page is still being crawled without the correct self-referencing canonical

---

## Wave 2 — nginx.conf Additions (IMPLEMENTED ✅)

**File:** `/tmp/tipsmega-frontend/nginx.conf`
**Status:** ✅ Applied — 3 deploy-ready redirects added; 2 HOLD redirects commented out

### ✅ DEPLOY-READY — 3 redirects (confirmed safe)

```nginx
        # Wave 2 — cannibalization: remaining duplicate blog URLs
        rewrite ^/blog/download-mega888-apk/?$ https://tipsmega888.com/blog/mega888-download-panduan-lengkap-2026 permanent;
        rewrite ^/blog/kredit-percuma-mega888/?$ https://tipsmega888.com/blog/mega888-free-credit-no-deposit-2026 permanent;
        rewrite ^/blog/mega888-register-malaysia/?$ https://tipsmega888.com/blog/mega888-register-akaun-baru-2026 permanent;
```

### ⏸️ HOLD — 2 redirects (NOT yet ready — commented out in nginx.conf)

```nginx
        # rewrite ^/blog/mega888-auto-cuci/?$ https://tipsmega888.com/blog/mega888-withdraw-cepat-malaysia-2026 permanent;
        # rewrite ^/blog/mega888-download-free-2026/?$ https://tipsmega888.com/blog/mega888-download-panduan-lengkap-2026 permanent;
```

### ✅ NOINDEX — applied in `app/blog/[slug]/page.tsx` (4 pages)

- `mega888-test-id`
- `mega888-vs-pussy888`
- `mega888-918kiss-beza`
- `mega888-original-vs-fake`

---

## Wave 2 — Content Quality Audit Triggers

These pages need a human/content review before any redirect decision:

1. **`mega888-test-id`** — open in browser, check word count and uniqueness
2. **`mega888-vs-pussy888`** — open in browser, check if content adds genuine value or is thin
3. **`mega888-918kiss-beza`** — same as above
4. **`mega888-original-vs-fake`** — check if content is thin or valuable trust signal

For each, record:
- Approx word count
- Does it answer a distinct user intent the pillar page doesn't?
- Recommendation: keep + canonical / keep + noindex / redirect

---

## Wave 2 — Thin Page: `mega888-download-free-2026` Quick Content Check

```bash
# Check content length of mega888-download-free-2026 in blogArticles.ts
grep -A 200 '"slug": "mega888-download-free-2026"' /tmp/tipsmega-frontend/app/data/blogArticles.ts | head -50
```

If it's essentially the same structure as the pillar download page with minor wording changes → safe to 301-redirect directly.

---

## Deploy Decision Checklist (FOR MAIN AGENT)

Before any Coolify deploy, confirm:

- [x] nginx.conf Wave 2 additions reviewed — **3 deploy-ready redirects applied**
- [x] Thin page decisions documented — **4 pages noindexed; 2 redirects HOLD**
- [ ] GSC batch submission list ready (canonical targets after redirect change)
- [ ] Rollback plan: if ranking drops, comment out redirect rules in nginx.conf and redeploy
- [ ] sitemap.xml re-submission scheduled post-deploy

---

## Files Modified in This Wave 2 Prep

| File | Change | Status |
|---|---|---|
| `docs/SEO_WAVE2_PLAN_2026-03-23.md` | Updated — redirect table, noindex table, HOLD items, deploy checklist | ✅ Done |
| `nginx.conf` | ✅ **3 deploy-ready redirects** added (Wave 2 block); **2 redirects commented out** (HOLD) | ✅ Done |
| `app/blog/[slug]/page.tsx` | ✅ **4 pages noindexed** via `robots: { index: false }` conditional | ✅ Done |
| `app/data/blogArticles.ts` | No changes | — |

---

*MiniMax M2.7 | Wave 2 prep | 2026-03-23 | REPO ONLY — DO NOT DEPLOY*
