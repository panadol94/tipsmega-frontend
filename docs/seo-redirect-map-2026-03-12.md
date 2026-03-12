# SEO Redirect Map — Phase 3 (2026-03-12)

## Applied 301 Redirects

| Old URL | New Canonical URL | Cluster |
|---|---|---|
| `/blog/mega888-apk-download-2026` | `/blog/mega888-download-panduan-lengkap-2026` | Download |
| `/blog/mega888-free-credit-2026` | `/blog/mega888-free-credit-no-deposit-2026` | Free Credit |
| `/blog/mega888-free-credit-terkini-2026` | `/blog/mega888-free-credit-no-deposit-2026` | Free Credit |
| `/blog/mega888-rtp-panduan-lengkap-2026` | `/blog/mega888-rtp-live-malaysia-2026` | RTP |
| `/blog/mega888-withdrawal-guide` | `/blog/mega888-withdraw-cepat-malaysia-2026` | Withdraw |
| `/blog/cara-daftar-mega888` | `/blog/mega888-register-akaun-baru-2026` | Register |
| `/blog/mega888-ios-guide` | `/blog/mega888-download-ios-terbaru-2026` | iOS |
| `/blog/mega888-android-install` | `/blog/mega888-download-android-apk-terbaru-2026` | Android |

## Technical Notes
- Redirect rules implemented in `nginx.conf` via `rewrite ... permanent`.
- Redirect source slugs excluded from:
  - `/blog` listing (`app/blog/page.tsx`)
  - `sitemap.xml` (`app/sitemap.ts`)
- Source pages remain in content data for reference history, but are de-prioritized and redirected at edge.

## Next (Optional)
1. GSC URL inspection: submit canonical targets for recrawl.
2. Monitor 14-day trend on affected clusters (impressions, CTR, avg position).
3. If any source URL still ranks strongly, evaluate content salvage instead of full redirect.
