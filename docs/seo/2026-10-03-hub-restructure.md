# SEO repair — 3 October 2026

User authorized fixing the live SEO audit, preserving Scan, Trusted Company, popup, original images, six menus, account/Stars/payment flows and premium racing design.

## Scope
- Ten existing substantial Hub guides migrated to `/panduan/mega888-{topic}`. No new factual advice or fabricated images/tests; all original paragraphs and references retained.
- `app/data/hubGuides.ts` is the shared registry for title, summary, images, original publication dates, content modification dates and sitemap entries. `HUB_UPDATED` governs Hub lastmod and CollectionPage metadata.
- Hub retains Problem Solver, visual guides, every legacy section anchor and every prior image. Daily sections are now summaries linking to full guides. Approximate extracted words: 10,234 → 2,536.
- Dedicated guides have a single H1, unique canonical, description, Article and Breadcrumb metadata, existing referenced sources and cross-guide links. Hub description: 149 characters.
- Sitemap: 256 → 266 entries. Hub and homepage lastmod 2026-10-03, Info lastmod restored to evidenced 2026-09-24 update; unchanged routes retain dates.
- Homepage copy states indicative catalogue/simulation methodology rather than operator live signals; numerical marketing stat replaced with source/type/limitation labels. Scan controls/handlers, payment and account code unchanged.
- Homepage source FAQ methodology restored to already-correct production wording, preventing future build regression.
- Daily publishing automation updated to use dedicated substantive guides, registry-driven real lastmod dates, and preserve CURRENT homepage. Identical stylesheet href duplication is distinct from valid multiple different CSS files.

## Deployment constraints
Production homepage has an intentional older CSS/JS skin differing from current full builds. Do not replace it wholesale. Backup and stage: `/root/.openclaw/workspace/backups/seo-fix-20261003/`.
Homepage deployment patches only approved strings in existing HTML/flight and its actual referenced HomeClient chunk; edited chunk receives a new SHA-256-based filename. Original stylesheets, controls, image URLs and link destinations are preserved exactly. Source carries equivalent copy edits. Full-build output is used only for Hub, new guide routes, sitemap and additional absent hashed assets. Never delete older assets needed by unrelated routes.

## Verification
- Build: 320 static pages. Existing Next configuration skips TypeScript validation; no full-typecheck claim.
- Focused ESLint: zero errors, 12 image-element warnings plus deprecated ignore-file notice.
- Static assertions: all original guide paragraphs/headings retained; all prior Hub image URLs and legacy anchors retained; all 10 canonicals and sitemap entries correct; sitemap 266 URLs.
- Browser checks cover widths 375/390/1440, both popup actions, all six nav items, ID validation (no scan submission), 12 Solver combinations, dedicated article metadata/images/anchors, 37 internal destinations and client-side navigation back to homepage. Browser logs archived in backup directory.
- No paid scans, authenticated payment transactions, Google rank gains or Search Console results claimed.

Publication and final live-check outcome recorded below after completion.

## Final outcome
Published and live-verified on 2026-10-03. Full snapshot comparison confirms every original production file outside the planned Hub/homepage/sitemap scope is byte-identical. All original images/assets remain. Both final preview and live browser suites passed: 10 guides, 37 internal destinations, 12 Solver combinations, widths 375/390/1440, no JS page errors or horizontal overflow, popup actions and input validation intact, zero scan requests. Client navigation Hub → guide → homepage passes. Sitemap live contains 266 entries. Homepage, Hub and sampled guides return HTTP 200 with expected titles and canonicals. Mobile homepage and desktop article screenshots visually inspected. No rollback needed.
