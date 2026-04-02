# Sprint 3 SEO: Internal Linking & RelatedArticles Audit

**Date:** 2026-04-02
**Scope:** tipsmega888.com — blog article clustering + relatedArticles
**Status:** ANALYSIS COMPLETE — actionable recommendations below

---

## Current State Summary

| Metric | Value |
|---|---|
| Total blog articles | 61 |
| Visible (non-redirected) | ~57 |
| Redirected/consolidated | ~4 (`mega888-withdrawal-guide`, `cara-daftar-mega888`, `mega888-android-install`, `mega888-ios-guide`) |
| Articles with `relatedArticles` populated | 47 |
| Articles with zero inbound `relatedArticles` | **47** |
| Articles with zero `relatedArticles` themselves | ~14 |
| Articles in the "core cluster" (most-linked) | 3: `rahsia-menang-slot-otai-scanner-ai-rtp-mega888`, `tips-mega888-pro`, `hack-rtp-mega888` |

---

## Core Problem: The "Mega888 Hub" Articles Are Disconnected

The `/mega888` hub links to these critical destination pages:
- `/blog/mega888-register-akaun baru-2026` — Login/register (top search intent)
- `/blog/mega888-download-android-apk-terbaru-2026` — Android APK
- `/blog/mega888-download-ios-terkini-2026` — iOS download
- `/blog/mega888-download-panduan-lenkp-2026` — General download hub
- `/blog/mega888-free-credit-no-deposit-2026` — Free credit
- `/blog/mega888-rtp-live-malaysia-2026` — RTP live
- `/blog/kiosk-mega888-trusted` — Trusted agents
- `/blog/mega888-rtp-scanner-panduan-lengkap-2026` — AI Scanner guide

**But all of these articles have `relatedArticles` pointing to a tight closed loop of 3 articles (`rahsia-menang-slot...`, `tips-mega888-pro`, `hack-rtp-mega888`) instead of linking to each other across the cluster.**

This creates a structural problem: the hub page links TO these articles, but the articles don't link WELL to each other or to the hub — breaking the topical authority signal.

---

## 10 Specific Recommendations

### 🔴 HIGH PRIORITY — Hub Cluster Cross-Linking (Pages linked FROM homepage/mega888 hub)

**1. `mega888-register-akaun baru-2026`** (Register/Login — major intent, hub destination)
→ ADD: `mega888-download-android-apk-terbaru-2026` (next logical step after register)
→ ADD: `kiosk-mega888-trusted` (must register through a trusted company)
→ ADD: `mega888-rtp-scanner-panduan-lengkap-2026` (scanner after setup)
→ REMOVE/REPLACE: `rahsia-menang-slot-otai-scanner-ai-rtp-mega888` (off-topic anchor, too distant)
→ REMOVE/REPLACE: `hack-rtp-mega888` (off-topic)

**2. `mega888-download-android-apk-terbaru-2026`** (Android download — major intent)
→ ADD: `mega888-register-akaun baru-2026` (must have account before downloading)
→ ADD: `mega888-download-ios-terkini-2026` (cross-platform alternative)
→ ADD: `mega888-download-panduan-lenkp-2026` (broader download hub / PC option)
→ REMOVE/REPLACE: `rahsia-menang-slot-otai-scanner-ai-rtp-mega888` (too distant semantically)
→ REMOVE/REPLACE: `tips-mega888-pro` (off-topic)

**3. `mega888-download-ios-terkini-2026`** (iOS download)
→ ADD: `mega888-download-android-apk-terbaru-2026` (alternative platform)
→ ADD: `mega888-register-akaun baru-2026` (prerequisite)
→ ADD: `mega888-rtp-live-malaysia-2026` (what to check after install)
→ REMOVE/REPLACE: `rahsia-menang-slot-otai-scanner-ai-rtp-mega888` (too distant)
→ REMOVE/REPLACE: `hack-rtp-mega888` (off-topic)

**4. `mega888-free-credit-no-deposit-2026`** (Free credit — high intent)
→ ADD: `kiosk-mega888-trusted` (where to claim safely)
→ ADD: `mega888-scam-elak` (safety context around "free credit" scams)
→ ADD: `mega888-register-akaun baru-2026` (claim requires account)
→ REMOVE/REPLACE: `rahsia-menang-slot-otai-scanner-ai-rtp-mega888` (off-topic)
→ REMOVE/REPLACE: `hack-rtp-mega888` (off-topic)

**5. `kiosk-mega888-trusted`** (Trusted agents — safety critical)
→ ADD: `mega888-register-akaun baru-2026` (how to register via trusted company)
→ ADD: `mega888-withdraw-cepat-malaysia-2026` (why trusted = faster payout)
→ ADD: `mega888-scam-elak` (complementary safety content)
→ Current cluster links (`download`, `withdraw`, `auto-cuci`) are GOOD — keep

**6. `mega888-rtp-live-malaysia-2026`** (RTP live)
→ ADD: `mega888-rtp-scanner-panduan-lenkp-2026` (scanner tool companion)
→ ADD: `mega888-slot-paling-mudah-menang-2026` (which games to apply RTP data to)
→ ADD: `mega888-register-akaun baru-2026` (prerequisite before using scanner)
→ Current links are GOOD — keep `scanner-panduan-lenkp`, `download`, `kiosk-trusted`

---

### 🟡 MEDIUM PRIORITY — Content Depth & Authority Expansion

**7. `mega888-vs-pussy888`** (Comparison — competitive intent)
→ ADD: `mega888-register-akaun baru-2026` (how to join the recommended platform)
→ ADD: `mega888-rtp-scanner-panduan-lenkp-2026` (differentiating feature: AI scanner)
→ ADD: `kelebihan-mega888` (internal cross-reference to platform strengths)
→ REMOVE/REPLACE: `rahsia-menang-slot-otai-scanner-ai-rtp-mega888` (too generic)

**8. `mega888-akaun-kena-block`** (Account blocked — problem-solving)
→ ADD: `kiosk-mega888-trusted` (how to avoid future blocks via trusted company)
→ ADD: `mega888-register-akaun baru-2026` (how to open a new account)
→ ADD: `mega888-scam-elak` (avoiding behavior that leads to blocks)

**9. `mega888-agent-jadi`** (How to become an agent — niche intent)
→ ADD: `kiosk-mega888-trusted` (where to affiliate with)
→ ADD: `mega888-withdraw-cepat-malaysia-2026` (payout operations context)
→ ADD: `mega888-scam-elak` (protecting yourself as an agent)

**10. `cara-menang-mega888`** (How to win daily — high volume intent)
→ ADD: `mega888-rtp-live-malaysia-2026` (data-driven approach)
→ ADD: `mega888-slot-paling-mudah-menang-2026` (game selection)
→ ADD: `mega888-rtp-scanner-panduan-lenkp-2026` (scanner = core tool)
→ REMOVE/REPLACE: `rahsia-menang-slot-otai-scanner-ai-rtp-mega888` (nearly duplicate topic — consolidate or replace)

---

## Structural Issue: "Closed Cluster" of 3 Articles

**`rahsia-menang-slot-otai-scanner-ai-rtp-mega888`, `tips-mega888-pro`, and `hack-rtp-mega888`** appear in the `relatedArticles` of **~40+ articles** on the site. This:

1. Dilutes link equity (every article pointing to the same 3 = over-linking)
2. Creates a "dead end" — users clicked from 40+ pages and all land on the same 3 articles
3. Misses topical breadth — articles about iOS, Android, free credit, vs comparisons, etc. should link to topic-relevant articles, not a generic "winning secrets" cluster

**Recommendation:** Audit these 3 articles' own `relatedArticles` (they're already well-connected to each other) and use them as "hub exits" rather than repeating them in every other article's related list. Consider adding 1-2 of them per article MAX, plus topic-specific cross-links.

---

## Orphaned Articles (No Inbound Links at All)

These articles exist but are NOT referenced in any `relatedArticles` array anywhere on the site:

| Slug | Title | Priority Fix? |
|---|---|---|
| `mega888-vs-pussy888` | Mega888 vs Pussy888 | ✅ Yes — add to comparison/combat content |
| `mega888-scam-elak` | Cara Elakkan Scam Mega888 | ✅ Yes — safety cluster anchor |
| `kelebihan-mega888` | Kelebihan Mega888 | 🔶 Medium — platform overview |
| `mega888-original-vs-fake` | Mega888 Original vs Fake | 🔶 Medium — safety cluster |
| `mega888-akaun-kena-block` | Akaun Kena Block | 🔶 Medium — problem-solving |
| `mega888-minimum-deposit` | Minimum Deposit RM10 | 🔶 Medium — financial info |
| `mega888-desktop-pc` | Desktop PC version | 🔶 Low — niche |
| `mega888-new-game-2026` | New games 2026 | 🔶 Low — timely |

These need inbound links from related topic articles to stop being orphans.

---

## Implementation Notes

1. **No slug changes needed** — all recommended target slugs already exist in `BLOG_ARTICLES`
2. **Changes are additive** — add new slugs to `relatedArticles` arrays, optionally remove over-represented ones (the 3 closed-cluster articles)
3. **Auto-linking in `page.tsx`** already uses `buildInternalLinkRules()` — once `relatedArticles` arrays are corrected, the in-content auto-links will automatically use better anchor text
4. **Do NOT add redirect-source slugs** to `relatedArticles` — they exist in `BLOG_ARTICLES` but serve as redirects and won't have a proper article page
5. **Hub links (`/mega888` page)** are fine as-is — the problem is the articles themselves don't link back/around properly

---

*Analysis by subagent. Implementation to be done by main agent or through source edits to `app/data/blogArticles.ts`.*
