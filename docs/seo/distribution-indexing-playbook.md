# Lychee Distribution And Indexing Playbook

Last updated: 2026-06-03

This playbook covers search indexing, distribution, app-store metadata alignment, backlink outreach, and AI visibility reporting for Lychee.

Important domain note: Lychee's production website is https://lychee.fit. Use this host for canonical tags, sitemaps, Search Console, Bing Webmaster Tools, app-store support URLs, directory submissions, and backlink outreach.

## Canonical URLs

Use these values in planning, spreadsheets, and outreach drafts:

| Field | Value |
| --- | --- |
| `PRODUCTION_ORIGIN` | https://lychee.fit |
| `PRODUCTION_DOMAIN_ROOT` | lychee.fit |
| `APP_STORE_URL` | The iOS App Store product URL once live. |
| `PLAY_STORE_URL` | The Google Play URL if an Android listing exists later. |

Index and measure https://lychee.fit. If an older deploy URL was previously indexed, keep redirects and monitoring in place while signals consolidate on https://lychee.fit.

## Positioning Language

Use this wording consistently across distribution work:

Lychee is a food and beauty scanner app that helps shoppers scan food, cosmetic, and beauty products to understand ingredient labels in plain language.

Approved supporting phrases:

- Food and beauty scanner.
- Ingredient scanner for food, cosmetics, and beauty products.
- Scan food labels, cosmetic ingredient lists, skincare, makeup, additives, and allergens.
- Plain-language ingredient insights for grocery and beauty aisles.
- Informational label-reading tool, not medical advice.

Avoid unsupported claims:

- FDA-approved.
- Doctor-approved.
- Guaranteed safe.
- Detects every allergen.
- The healthiest choice.
- The cleanest beauty app.
- Replaces professional medical advice.

## Search Console Setup

### Current Deploy URL

Use this when the only public URL is the Render/current deploy URL.

1. Confirm the public URL:
   - `https://lychee.fit/`
   - `https://lychee.fit/sitemap.xml`
   - `https://lychee.fit/robots.txt`
2. Add a Google Search Console URL-prefix property for the exact `https://lychee.fit`.
   - Use URL-prefix because the team does not own the parent deploy provider domain.
   - Verify with a method the deployment can support, such as HTML file upload, HTML tag, Google Analytics, or Google Tag Manager.
3. Submit `https://lychee.fit/sitemap.xml` in the Sitemaps report.
4. Use URL Inspection for priority pages:
   - `https://lychee.fit/`
   - `https://lychee.fit/food-scanner/`
   - `https://lychee.fit/cosmetic-scanner/`
   - `https://lychee.fit/lychee-vs-yuka/`
   - `https://lychee.fit/methodology/`
   - `https://lychee.fit/data-sources/`
   - `https://lychee.fit/faq/`
   - `https://lychee.fit/about/`
5. For each inspected page, record:
   - Indexability.
   - Crawl allowed status.
   - Page fetch status.
   - User-declared canonical and Google-selected canonical.
   - Whether the page is found in the submitted sitemap.
6. Request indexing only for high-priority pages that pass the live test.
7. Recheck after 48 to 72 hours, then weekly until pages are indexed or clear blockers are found.

### Production Domain

Use this for the live `https://lychee.fit` property.

1. Add a Google Search Console Domain property for `lychee.fit`.
   - Domain properties are verified through DNS and aggregate subdomains, protocols, and paths.
2. Add a URL-prefix property for `https://lychee.fit/` if more granular inspection is useful.
3. Submit `https://lychee.fit/sitemap.xml`.
4. Inspect the same priority URL set on `https://lychee.fit`.
5. Compare coverage, impressions, clicks, and canonical behavior against any older deploy property during migration.

## Bing Webmaster Tools Setup

### Production URL

1. Add the exact `https://lychee.fit` as a site in Bing Webmaster Tools.
2. If the Google Search Console property is already verified, use Bing's import-from-Google option if available.
3. Otherwise verify manually using a supported method the deployment can host.
4. Submit `https://lychee.fit/sitemap.xml`.
5. Use Bing URL Inspection for the priority pages listed in the Search Console section.
6. Check Site Explorer, crawl errors, indexing status, and sitemap processing weekly during the first month.

### DNS Verified Property

1. Add `https://lychee.fit` in Bing Webmaster Tools.
2. Verify via DNS, import from Google Search Console, or another supported method.
3. Submit `https://lychee.fit/sitemap.xml`.
4. Enable and monitor IndexNow if the key file can be hosted on `lychee.fit`.
5. Keep any old deploy property visible during migration so redirect and indexing changes can be monitored.

## IndexNow Guidance

IndexNow is a notification protocol for telling participating search engines that URLs were added, updated, or deleted. It does not guarantee crawling or indexing.

Use IndexNow after the site is publicly crawlable and the key file can be hosted.

### Setup

1. Generate an IndexNow key.
2. Host a UTF-8 text file that contains only the key:
   - Temporary deploy option: `https://lychee.fit/<indexnow-key>.txt`
   - Final domain option: `https://lychee.fit/<indexnow-key>.txt`
3. Submit changed URLs with the matching host and key file location.
4. Confirm submissions in Bing Webmaster Tools where available.

### Submission Rules

- Submit only URLs that changed after IndexNow is enabled.
- Submit new, updated, deleted, or redirected URLs.
- Do not bulk-submit old unchanged URLs just because the protocol was enabled.
- Do not submit URLs outside the verified host.
- Treat HTTP `200` as "received", not "indexed".
- Watch for `400`, `403`, `422`, and `429` responses and fix the cause before retrying.

### POST Payload Template

```json
{
  "host": "lychee.fit",
  "key": "<indexnow-key>",
  "keyLocation": "https://lychee.fit/<indexnow-key>.txt",
  "urlList": [
    "https://lychee.fit/",
    "https://lychee.fit/food-scanner/",
    "https://lychee.fit/cosmetic-scanner/"
  ]
}
```

### Automation

Add IndexNow to the deployment workflow only after the domain decision is clear.

Recommended automation behavior:

- Read the production sitemap after deploy.
- Compare URL and `lastmod` values against the previous deploy.
- Submit only changed URLs.
- Store submission date, response code, URL count, host, and deploy id.
- Alert on non-200 responses.

## App-Store Metadata Alignment

The app-store listing should match the website and outreach language. The goal is simple: app stores, search engines, directories, and AI answer engines should all understand that Lychee covers food plus cosmetics/beauty scanning.

### Apple App Store

Align these fields in App Store Connect:

| Field | Recommendation |
| --- | --- |
| App name | `Lychee`, unless a longer approved name is needed and fits Apple's limit. |
| Subtitle | `Food & Beauty Scanner` or another concise phrase focused on scan use. |
| Promotional text | Mention the current feature focus without keyword stuffing. |
| Description | Lead with food, cosmetic, and beauty product scanning. Include plain-language ingredient insights and the medical-advice disclaimer. |
| Keywords | Use relevant terms only. Do not duplicate app/company name, use competitor names, or add irrelevant terms. |
| Support URL | Use `https://lychee.fit` until a real support URL on `https://lychee.fit` exists. |
| Marketing URL | Use `https://lychee.fit` until `https://lychee.fit` is live, then update. |
| Screenshots | Show food scanning, cosmetics/beauty scanning, ingredient review, and plain-language explanations. |

Apple metadata constraints to respect:

- App name can be up to 30 characters.
- Promotional text can be up to 170 characters.
- Description can be up to 4000 characters and should be plain text.
- Keywords are limited and should avoid duplicate words, competing app names, irrelevant terms, and protected phrases.

### Google Play

Use this if an Android listing exists later.

| Field | Recommendation |
| --- | --- |
| App name | Keep under the 30-character limit and avoid promo language. |
| Short description | State the core value in 80 characters or less. Example: `Scan food, cosmetics, and beauty labels before you buy.` |
| Full description | Naturally explain food scanning, cosmetics scanning, beauty ingredient review, additives, allergens, and product transparency. |
| Graphics and screenshots | Show real app UI for food and beauty scanning. Avoid misleading badges, rankings, or promotional claims. |
| Contact and policy links | Use `https://lychee.fit` first, then update to `https://lychee.fit` after migration. |

Google Play has no hidden keyword field for normal listings, so important terms should appear naturally in visible copy. Avoid repetition, emojis, irrelevant special characters, ranking claims, price promotions, and misleading references to other apps or companies.

## Backlink Campaign Workflow

The backlink goal is legitimate discovery, not volume. Prioritize pages that help shoppers and are likely to be cited by AI systems.

### Target Types

- App directories that accept iOS productivity, shopping, health, food, or lifestyle apps.
- Food label, additive, allergen, and grocery shopping resources.
- Cosmetics ingredient, skincare, makeup, and beauty product transparency resources.
- Newsletters or blogs covering ingredient-conscious shopping.
- Roundups for barcode scanners, ingredient scanners, food scanner apps, cosmetics scanner apps, and beauty scanner apps.
- Founder/startup directories where the app story is relevant.
- Existing pages that AI answer engines cite for "best food scanner app", "cosmetics ingredient scanner", or "apps like Yuka".

### Qualification

Before pitching, record:

- Does the page already link to apps or consumer tools?
- Is the audience relevant to food, cosmetics, beauty, ingredient labels, allergens, additives, or shopping transparency?
- Is the page maintained and indexed?
- Does the publisher use factual descriptions rather than paid link farms?
- Could Lychee add something useful because it covers both grocery and beauty aisles?

### Outreach Steps

1. Add prospect to the outreach spreadsheet.
2. Capture the exact page URL and reason Lychee fits.
3. Prepare a one-paragraph factual pitch.
4. Include `https://lychee.fit` for now. Replace with `https://lychee.fit` only after migration.
5. Send manually or through the team's normal outreach tool.
6. Log the date, contact, pitch angle, and response.
7. Follow up once after 5 to 7 business days.
8. If a link goes live, record anchor text, destination URL, surrounding description, and whether food plus cosmetics/beauty scanning is mentioned.
9. If the link points to `https://lychee.fit`, add it to the migration outreach list so it can be updated after `https://lychee.fit` launches.

### Pitch Template

Subject: Lychee for your ingredient scanner resources

Hi `<name>`,

I noticed your resource on `<topic>`. Lychee may be a useful addition for readers looking for a scanner that covers both grocery and beauty aisles. Lychee helps shoppers scan food, cosmetic, and beauty products to understand ingredient labels, additives, allergens, and beauty ingredient concerns in plain language. It is an informational label-reading tool and not medical advice.

Temporary URL while the production domain is live: `https://lychee.fit`

Thanks for considering it.

### Outreach Guardrails

- Do not buy manipulative links.
- Do not post fake reviews or fake user comments.
- Do not claim Lychee is included anywhere until the page is live.
- Do not imply medical, regulatory, or safety endorsement.
- Use https://lychee.fit in outreach and directory submissions.

## AI Visibility Reporting Cadence

Use the existing AI prompt monitoring checklist as the prompt bank. This section defines operating rhythm and outputs.

| Timing | Work |
| --- | --- |
| Launch week | Run the core prompt set once after indexing setup is complete. |
| Weeks 2 to 4 | Run weekly checks for priority food, cosmetics, beauty, and comparison prompts. |
| Month 2 onward | Run monthly checks using the same prompts, location, account state, and browser context where possible. |
| Quarterly | Review cited sources, missing facts, competitor coverage, and whether Lychee's public descriptions still match the product. |
| After production-domain setup | Run checks weekly for 4 weeks to confirm AI answers and citations use `https://lychee.fit`. |

Monthly output:

- Average AI visibility score by cluster.
- Prompts where Lychee is mentioned.
- Prompts where Lychee is absent.
- Whether food scanning is mentioned.
- Whether cosmetics/beauty scanning is mentioned.
- Citations shown by answer engines.
- Incorrect or stale descriptions.
- Top 3 content or outreach actions for the next month.

## Measurement Spreadsheet Fields

Create one workbook with these tabs.

### Indexing Tab

| Field |
| --- |
| Date checked |
| URL |
| URL scope: production or old deploy redirect |
| Page type |
| HTTP status |
| In sitemap: yes/no |
| Sitemap submitted to Google: yes/no/date |
| Sitemap submitted to Bing: yes/no/date |
| Google index status |
| Google last crawl |
| Google-selected canonical |
| Bing index status |
| Bing crawl status |
| IndexNow submitted: yes/no/date |
| IndexNow response code |
| Issue found |
| Owner |
| Next action |
| Follow-up date |

### AI Visibility Tab

| Field |
| --- |
| Date |
| Channel |
| Prompt cluster |
| Exact prompt |
| Location/context |
| Lychee mentioned: yes/no |
| Position |
| Competitors mentioned |
| Citation/source URL |
| Food scanning mentioned: yes/no |
| Cosmetics/beauty scanning mentioned: yes/no |
| Description accuracy |
| Score 0-4 |
| Missing facts |
| Follow-up action |

### Backlink Outreach Tab

| Field |
| --- |
| Prospect name |
| Prospect URL |
| Target page URL |
| Contact name |
| Contact email/form/social |
| Category |
| Relevance reason |
| Pitch angle |
| Destination URL used |
| Status |
| First outreach date |
| Follow-up date |
| Response |
| Link live: yes/no |
| Live URL |
| Anchor text |
| Mentions food scanning: yes/no |
| Mentions cosmetics/beauty scanning: yes/no |
| Needs lychee.fit update: yes/no |
| Notes |

### App Metadata Tab

| Field |
| --- |
| Platform |
| Locale |
| App name |
| Subtitle or short description |
| Full description |
| Keyword field, if applicable |
| Support URL |
| Marketing URL |
| Screenshot themes |
| Mentions food scanning: yes/no |
| Mentions cosmetics/beauty scanning: yes/no |
| Disclaimer present: yes/no |
| Last updated |
| Owner |
| Next revision date |

### Redirect Monitoring Tab

| Field |
| --- |
| Old URL |
| New URL |
| Redirect status |
| Redirect target |
| Canonical target |
| In old sitemap: yes/no |
| In new sitemap: yes/no |
| Google inspected: yes/no/date |
| Bing inspected: yes/no/date |
| IndexNow submitted: yes/no/date |
| External links to update |
| App/profile links updated: yes/no |
| Issue |
| Owner |
| Follow-up date |

## Launch Checklist

### Before Public Indexing

- Confirm the intended production public URL is `https://lychee.fit`.
- Confirm https://lychee.fit is used in docs, outreach, app metadata, canonicals, and sitemap submissions.
- Confirm priority pages return `200`.
- Confirm `robots.txt` is reachable.
- Confirm `sitemap.xml` is reachable and uses only `https://lychee.fit` URLs.
- Confirm important pages are linked from the site navigation or crawlable internal links.
- Confirm pages describe Lychee as covering food, cosmetic, and beauty products.
- Confirm disclaimers avoid medical, safety, or guaranteed outcome claims.
- Prepare the measurement workbook.

### Launch Day

- Add `https://lychee.fit` to Google Search Console.
- Verify ownership.
- Submit `https://lychee.fit/sitemap.xml`.
- Inspect priority URLs and request indexing where appropriate.
- Add `https://lychee.fit` to Bing Webmaster Tools.
- Submit `https://lychee.fit/sitemap.xml` in Bing.
- If the IndexNow key file is hosted, submit changed priority URLs and log responses.
- Update app-store support and marketing URLs to `https://lychee.fit`.
- Start outreach with `https://lychee.fit` and use UTM-tagged target URLs where useful.

### First 30 Days

- Check Google and Bing indexing weekly.
- Run AI visibility checks weekly for priority prompts.
- Send a small batch of qualified outreach each week.
- Prioritize sources that AI answer engines cite.
- Fix inaccurate public descriptions where the team controls the profile.
- Record whether each source mentions cosmetics/beauty scanning.

## Production Domain Maintenance Checklist

Use this now that `https://lychee.fit` is the production website. Keep the setup boring: one canonical host, stable paths, clean redirects, and careful measurement.

### Setup

- Use `https://lychee.fit/` as the canonical host.
- Confirm DNS and TLS are healthy.
- Add Google Search Console Domain property for `lychee.fit`.
- Add Bing Webmaster Tools site for `https://lychee.fit`.
- Keep the same URL paths where possible:
  - `/`
  - `/food-scanner/`
  - `/cosmetic-scanner/`
  - `/lychee-vs-yuka/`
  - `/methodology/`
  - `/data-sources/`
  - `/faq/`
  - `/about/`
- Keep the sitemap using only `https://lychee.fit` URLs.
- Keep app-store URLs, social profiles, directory profiles, and outreach templates pointed at `https://lychee.fit`.

### Release Checks

- Confirm production traffic resolves to `https://lychee.fit`.
- Confirm any old deploy URLs permanently redirect to matching `https://lychee.fit` URLs.
- Avoid redirect chains.
- Confirm new URLs return `200`.
- Confirm `https://lychee.fit/sitemap.xml` uses only `https://lychee.fit` URLs.
- Submit `https://lychee.fit/sitemap.xml` in Google Search Console.
- Submit `https://lychee.fit/sitemap.xml` in Bing Webmaster Tools.
- Use Google URL Inspection on priority production URLs.
- Use Bing URL Inspection on priority production URLs.
- Submit changed URLs through IndexNow if the key file is hosted.
- Use Google's Change of Address tool if the old and new properties are eligible and all pre-checks pass.

### After Migration

- Monitor old and new Search Console properties daily for the first week.
- Monitor weekly for at least 4 more weeks.
- Keep redirects for at least 1 year, and longer if practical.
- Update app-store support and marketing URLs to `https://lychee.fit`.
- Update owned profiles, social bios, directory listings, and outreach templates.
- Ask existing live link partners to update links from `https://lychee.fit` to `https://lychee.fit`.
- Track whether Google and Bing select `https://lychee.fit` as canonical.
- Run AI visibility checks weekly for 4 weeks and record whether citations move to `https://lychee.fit`.

## Source References

- Google Search Console: [Add a website property](https://support.google.com/webmasters/answer/34592)
- Google Search Console: [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
- Google Search Console: [Sitemap](https://support.google.com/webmasters/answer/12817956)
- Google Search Console: [Change of Address tool](https://support.google.com/webmasters/answer/9370220)
- Google Search Central: [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- Bing Webmaster Tools: [How to add IndexNow to your website](https://www.bing.com/indexnow/getstarted)
- IndexNow: [Documentation](https://www.indexnow.org/documentation)
- Apple Developer: [Creating your product page](https://developer.apple.com/app-store/product-page/)
- App Store Connect: [Platform version information](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)
- Google Play Console Help: [Create and set up your app](https://support.google.com/googleplay/android-developer/answer/9859152)
- Google Play Console Help: [Metadata policy](https://support.google.com/googleplay/android-developer/answer/9898842)
- Google Play Console Help: [Best practices for your store listing](https://support.google.com/googleplay/android-developer/answer/13393723)
