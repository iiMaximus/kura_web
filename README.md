# Lychee — lychee.fit

Static website for [Lychee](https://lychee.fit), a food and cosmetic ingredient scanner for iOS and Android. The food score prioritizes processing, with ingredient and nutrition context; cosmetics use a separate beta coverage- and exposure-aware model.

Free download and core scanning, with optional Premium. The free app may include ads; Premium includes ad-free scanning. Exact offers and device availability belong in the current store/in-app listing.

- [App Store](https://apps.apple.com/us/app/id6755896152)
- [Google Play](https://play.google.com/store/apps/details?id=com.maksymhoroszczak.allergify)
- [Public product facts](https://lychee.fit/app-facts/)

## Edit and validate

No package installation or framework build is needed. Node.js runs the dependency-free generator and checks.

```bash
npm run build
npm run check
python3 -m http.server 8765 --bind 127.0.0.1
```

- `content/product.json` is the source of product identity, pricing context, supported features, direct data sources and limits.
- `content/pages.js` contains the 18 information pages and shared FAQ answers.
- `scripts/build-site.js` generates those pages, public JSON facts, Markdown overview, `llms.txt`, `robots.txt` and sitemap. It also synchronizes the homepage JSON-LD and marked FAQ block.
- `index.html` is the hand-edited homepage. Preserve the generated FAQ markers; run the build after changes to facts or questions.
- `about/info-pages.css` styles the information pages.
- `privacy/`, `terms/` and `contact/` are hand-maintained. The generator preserves their content and their existing sitemap dates.
- `scripts/validate-site.js` checks all 22 HTML pages for local links, assets and canonicals, and checks generated pages for static readability, schema/FAQ agreement, consistent facts, sitemap completeness and crawler policy.
- `build.js` is a compatibility entry point for `node build.js`.

The HTML itself contains the content and links. JavaScript is not required to see the copy, follow download links or expand FAQ answers. Google verification, existing URLs, legal text and store identifiers are retained. Existing screenshots are marked as showing an earlier version.

## Publication

Publish the repository root as a static site, retaining the custom domain in `CNAME`. Do not configure a single-page-app fallback that returns the homepage for every unknown path. The live response headers observed on October 8, 2026 indicate Render/Cloudflare; `CNAME` alone does not prove a GitHub Pages deployment. Confirm the connected host and build settings before deploying.

Run `npm run build` and `npm run check`, review the resulting diff, then publish through the existing host. Verify `/robots.txt`, `/sitemap.xml`, `/app-facts.json`, `/download/` and the topic pages on the production domain after publication.

## AI discovery

See [the implementation and growth plan](docs/seo/ai-discovery-plan.md) for the audit findings, official crawler guidance, publication checks, external-source work and measurement. `llms.txt` is a supplementary content index, not a guarantee that an assistant will discover or recommend Lychee. Search crawlability, accurate public facts, useful answers and independent coverage remain the foundation.

Internal `content/`, `scripts/`, `docs/` and `outreach/` are excluded from crawling in `robots.txt`. These files are still public if deployed; do not put secrets or private business information in them.
