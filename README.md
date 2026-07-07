# Lychee — lychee.fit

Website for [Lychee](https://lychee.fit), the free food scanner app for iOS and Android. Scan any barcode to spot ultra-processed food (NOVA signals), risky additives, allergens, and hidden sugars in about a second — plus secondary cosmetics and skincare scanning. 100% independent: no ads, no sponsorships, no account required.

- **Website:** https://lychee.fit
- **iOS:** https://apps.apple.com/us/app/id6755896152
- **Android:** https://play.google.com/store/apps/details?id=com.maksymhoroszczak.allergify
- **Press kit:** https://lychee.fit/press/

## Repo layout

Static site deployed via GitHub Pages (custom domain in `CNAME`).

- `index.html` — homepage (hand-edited; carries the primary JSON-LD entity graph)
- `<topic>/index.html` — landing pages (food scanner, ultra-processed food scanner, Lychee vs Yuka, etc.)
- `press/` — public press & media kit
- `og-image.png`, `apple-touch-icon.png`, `assets/` — generated brand assets
- `llms.txt`, `ai-overview.md` — guidance for AI crawlers and assistants
- `outreach/`, `docs/` — internal marketing/SEO notes (disallowed in `robots.txt`)
- `build.js` — **stale**; consumed a deleted `landing.html`. Do not run — pages are edited directly and carry hand-tuned SEO metadata.
