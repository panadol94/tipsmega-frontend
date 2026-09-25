# Premium racing presentation — 25 September 2026

## Authorized scope
Owner approved red/black premium motorsport styling and light animation. Preserve Scan, Trusted Company, all six menus (desktop/mobile), popup and both actions, imagery, Stars/auth/community/share, existing text/link destinations and daily Hub content. No paid scans.

## Implementation
- Versioned static stylesheet `public/racing-premium-20260925.css`, loaded persistently in root layout. No business component, handler, API, content or media changed.
- Graphite/carbon diagonal panels, racing red primary actions, italic Exo headings and readable editorial text. Compact mobile hero retains entire original image with contain sizing (no crop), two hero CTAs, statistics and all copy.
- Popup illustration and text remain scrollable; original close, Trusted and existing-ID actions retained. Both actions stay reachable on short screens with sticky positions.
- All six navigation links remain; >=1280px desktop uses a right-side dock, smaller screens retain bottom dock. Toast lifted clear of bottom navigation.
- One-shot hero sweep, 180–300ms hover transitions, CSS progressive scroll reveal only where supported; reduced-motion overrides. Original scan loading logic unchanged; no invented speed/progress gauges.
- Existing skin was loading, but narrow coverage and component-local/inline styles left mixed accents. New explicit overrides resolve these and root-layout reference survives subsequent source builds.

## Publication strategy
Prior source/live wording differs, so full-build replacement was deliberately not used. Rediscovered real public Traefik target `583782757bff` (`oeraw35walk5dm0d19t8kjkr-095450280193`), `/usr/share/nginx/html`; named standby container was not touched.
Full backup: `/root/.openclaw/workspace/backups/racing-premium-20260925/html`.
Before mutation, a fresh complete snapshot matched backup. Added one stylesheet link to 305 HTML files and one additive CSS asset. This keeps shared skin on direct entry/refresh as well as client navigation. A byte audit confirmed every pre-existing file is identical, except the single link addition to HTML. Old scripts, CSS, flight payloads, images, media and metadata preserved.
Future source builds include the stylesheet via root layout. Backup includes predeploy/after snapshots, before manifest and exact changed-path deployment.json. Rollback: restore backed-up HTML files; added unused stylesheet may remain safely.

## Verification
- Build successful, static export completed (existing TypeScript-skip project setting; not a full typecheck claim).
- Focused layout ESLint zero errors; existing `.eslintignore` deprecation warning only. `git diff --check` passes.
- Chromium inspected desktop/mobile actual screenshots. At390×844 mobile input top≈683px, ending≈739px, above bottom menu; no imagery/content removed. At1440 input≈679px, side dock no scanner overlap.
- Public popup buttons both visible and hit-testable at390×844,1440×844,375×667. Existing-ID dismisses; Trusted action navigates to `/trusted`. Header Scan CTA scrolls to scanner. Invalid input disables scan, valid 12-digit input enables it; never clicked paid scan.
- All six menu links rendered at mobile/desktop. Existing homepage/Hub DOM inventory comparison (normalize only the pre-existing ticking HH:MM:SS community countdown); Trusted control/link inventory checked after data settle. First Trusted sample comparison differed transiently; fresh390px comparison matched exactly. Homepage raw text mismatch was traced to existing community countdown ticking from04:23:14 to04:23:13, not changed content. Final suite outcome recorded below.
- Daily sections `connection-failed` and `cache-dan-data` retained; all12 Problem Solver issue/device branches checked. Reduced-motion disables new hero sweep. Browser page errors and scan API calls captured by suite.
- Test scripts/logs: `/tmp/racing-verify.cjs`, `/tmp/racing-live.log`, `/tmp/racing-build.log`, `/tmp/racing-lint.log`; inspected `/tmp/racing-live-*.png` plus preview screenshots.

No authenticated Stars/payment/paid-scan transactions tested. No claims of Google-rank improvement or physical-device testing.

## Final public suite outcome
PASS: widths375/390/1440, both popup actions visible/hit-testable and functional, unchanged inventories (only countdown normalized), all12 solver branches, reduced-motion, no horizontal overflow, no JavaScript page errors, zero scan API calls. Latest live screenshots inspected for Home/Hub/Trusted and popup. Full original-byte audit passes as described above. Source stylesheet matches live asset.
