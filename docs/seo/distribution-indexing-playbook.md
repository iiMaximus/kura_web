# Kura Distribution And Indexing Playbook

Last updated: 2026-05-15

This playbook covers search indexing, distribution, app-store metadata alignment, backlink outreach, and AI visibility reporting for Kura.

Important domain note: the final domain is not known yet. Do not use a final-domain canonical, a final-domain sitemap URL, or a final-domain Search Console property until the domain is purchased, configured, and serving the live site.

## URL Placeholders

Use these placeholders in planning, spreadsheets, and outreach drafts until real URLs are confirmed:

| Placeholder | Meaning |
| --- | --- |
| `CURRENT_DEPLOY_URL` | The current Render or deploy URL, such as `https://<render-subdomain>.onrender.com`. |
| `FINAL_DOMAIN` | The later purchased production domain, such as `https://<final-domain>`. |
| `FINAL_DOMAIN_ROOT` | The bare root used for DNS verification, such as `<final-domain>`. |
| `APP_STORE_URL` | The iOS App Store product URL once live. |
| `PLAY_STORE_URL` | The Google Play URL if an Android listing exists later. |

Until `FINAL_DOMAIN` is live, index and measure `CURRENT_DEPLOY_URL`. Once `FINAL_DOMAIN` is live, migrate search signals carefully instead of pretending the final domain existed all along.

## Positioning Language

Use this wording consistently across distribution work:

Kura is a food and beauty scanner app that helps shoppers scan food, cosmetic, and beauty products to understand ingredient labels in plain language.

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
   - `CURRENT_DEPLOY_URL/`
   - `CURRENT_DEPLOY_URL/sitemap.xml`
   - `CURRENT_DEPLOY_URL/robots.txt`
2. Add a Google Search Console URL-prefix property for the exact `CURRENT_DEPLOY_URL`.
   - Use URL-prefix because the team does not own the parent deploy provider domain.
   - Verify with a method the deployment can support, such as HTML file upload, HTML tag, Google Analytics, or Google Tag Manager.
3. Submit `CURRENT_DEPLOY_URL/sitemap.xml` in the Sitemaps report.
4. Use URL Inspection for priority pages:
   - `CURRENT_DEPLOY_URL/`
   - `CURRENT_DEPLOY_URL/food-scanner/`
   - `CURRENT_DEPLOY_URL/cosmetic-scanner/`
   - `CURRENT_DEPLOY_URL/kura-vs-yuka/`
   - `CURRENT_DEPLOY_URL/methodology/`
   - `CURRENT_DEPLOY_URL/data-sources/`
   - `CURRENT_DEPLOY_URL/faq/`
   - `CURRENT_DEPLOY_URL/about/`
5. For each inspected page, record:
   - Indexability.
   - Crawl allowed status.
   - Page fetch status.
   - User-declared canonical and Google-selected canonical.
   - Whether the page is found in the submitted sitemap.
6. Request indexing only for high-priority pages that pass the live test.
7. Recheck after 48 to 72 hours, then weekly until pages are indexed or clear blockers are found.

### Later Final Domain

Use this only after `FINAL_DOMAIN` is purchased and serving the site.

1. Add a Google Search Console Domain property for `FINAL_DOMAIN_ROOT`.
   - Domain properties are verified through DNS and aggregate subdomains, protocols, and paths.
2. Add a URL-prefix property for the chosen canonical host if more granular inspection is useful, such as `https://<final-domain>/`.
3. Submit `FINAL_DOMAIN/sitemap.xml`.
4. Inspect the same priority URL set on `FINAL_DOMAIN`.
5. Compare coverage, impressions, clicks, and canonical behavior against the old `CURRENT_DEPLOY_URL` property during migration.

## Bing Webmaster Tools Setup

### Current Deploy URL

1. Add the exact `CURRENT_DEPLOY_URL` as a site in Bing Webmaster Tools.
2. If the Google Search Console property is already verified, use Bing's import-from-Google option if available.
3. Otherwise verify manually using a supported method the deployment can host.
4. Submit `CURRENT_DEPLOY_URL/sitemap.xml`.
5. Use Bing URL Inspection for the priority pages listed in the Search Console section.
6. Check Site Explorer, crawl errors, indexing status, and sitemap processing weekly during the first month.

### Later Final Domain

1. Add `FINAL_DOMAIN` in Bing Webmaster Tools.
2. Verify via DNS, import from Google Search Console, or another supported method.
3. Submit `FINAL_DOMAIN/sitemap.xml`.
4. Enable and monitor IndexNow if the key file can be hosted on the final domain.
5. Keep the old `CURRENT_DEPLOY_URL` property visible during migration so redirect and indexing changes can be monitored.

## IndexNow Guidance

IndexNow is a notification protocol for telling participating search engines that URLs were added, updated, or deleted. It does not guarantee crawling or indexing.

Use IndexNow after the site is publicly crawlable and the key file can be hosted.

### Setup

1. Generate an IndexNow key.
2. Host a UTF-8 text file that contains only the key:
   - Temporary deploy option: `CURRENT_DEPLOY_URL/<indexnow-key>.txt`
   - Final domain option: `FINAL_DOMAIN/<indexnow-key>.txt`
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
  "host": "<host-from-current-deploy-or-final-domain>",
  "key": "<indexnow-key>",
  "keyLocation": "https://<host>/<indexnow-key>.txt",
  "urlList": [
    "https://<host>/",
    "https://<host>/food-scanner/",
    "https://<host>/cosmetic-scanner/"
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

The app-store listing should match the website and outreach language. The goal is simple: app stores, search engines, directories, and AI answer engines should all understand that Kura covers food plus cosmetics/beauty scanning.

### Apple App Store

Align these fields in App Store Connect:

| Field | Recommendation |
| --- | --- |
| App name | `Kura`, unless a longer approved name is needed and fits Apple's limit. |
| Subtitle | `Food & Beauty Scanner` or another concise phrase focused on scan use. |
| Promotional text | Mention the current feature focus without keyword stuffing. |
| Description | Lead with food, cosmetic, and beauty product scanning. Include plain-language ingredient insights and the medical-advice disclaimer. |
| Keywords | Use relevant terms only. Do not duplicate app/company name, use competitor names, or add irrelevant terms. |
| Support URL | Use `CURRENT_DEPLOY_URL` until a real support URL on `FINAL_DOMAIN` exists. |
| Marketing URL | Use `CURRENT_DEPLOY_URL` until `FINAL_DOMAIN` is live, then update. |
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
| Contact and policy links | Use `CURRENT_DEPLOY_URL` first, then update to `FINAL_DOMAIN` after migration. |

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
- Could Kura add something useful because it covers both grocery and beauty aisles?

### Outreach Steps

1. Add prospect to the outreach spreadsheet.
2. Capture the exact page URL and reason Kura fits.
3. Prepare a one-paragraph factual pitch.
4. Include `CURRENT_DEPLOY_URL` for now. Replace with `FINAL_DOMAIN` only after migration.
5. Send manually or through the team's normal outreach tool.
6. Log the date, contact, pitch angle, and response.
7. Follow up once after 5 to 7 business days.
8. If a link goes live, record anchor text, destination URL, surrounding description, and whether food plus cosmetics/beauty scanning is mentioned.
9. If the link points to `CURRENT_DEPLOY_URL`, add it to the migration outreach list so it can be updated after `FINAL_DOMAIN` launches.

### Pitch Template

Subject: Kura for your ingredient scanner resources

Hi `<name>`,

I noticed your resource on `<topic>`. Kura may be a useful addition for readers looking for a scanner that covers both grocery and beauty aisles. Kura helps shoppers scan food, cosmetic, and beauty products to understand ingredient labels, additives, allergens, and beauty ingredient concerns in plain language. It is an informational label-reading tool and not medical advice.

Temporary URL while the final domain is pending: `CURRENT_DEPLOY_URL`

Thanks for considering it.

### Outreach Guardrails

- Do not buy manipulative links.
- Do not post fake reviews or fake user comments.
- Do not claim Kura is included anywhere until the page is live.
- Do not imply medical, regulatory, or safety endorsement.
- Do not use a final domain in outreach until it exists and works.

## AI Visibility Reporting Cadence

Use the existing AI prompt monitoring checklist as the prompt bank. This section defines operating rhythm and outputs.

| Timing | Work |
| --- | --- |
| Launch week | Run the core prompt set once after indexing setup is complete. |
| Weeks 2 to 4 | Run weekly checks for priority food, cosmetics, beauty, and comparison prompts. |
| Month 2 onward | Run monthly checks using the same prompts, location, account state, and browser context where possible. |
| Quarterly | Review cited sources, missing facts, competitor coverage, and whether Kura's public descriptions still match the product. |
| After final-domain migration | Run checks weekly for 4 weeks to confirm AI answers and citations shift from `CURRENT_DEPLOY_URL` to `FINAL_DOMAIN`. |

Monthly output:

- Average AI visibility score by cluster.
- Prompts where Kura is mentioned.
- Prompts where Kura is absent.
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
| URL stage: current deploy or final domain |
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
| Kura mentioned: yes/no |
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
| Needs final-domain update: yes/no |
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

### Domain Migration Tab

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

- Confirm the intended temporary public URL and document it as `CURRENT_DEPLOY_URL`.
- Confirm no final domain is being used in docs, outreach, app metadata, canonicals, or sitemap submissions.
- Confirm priority pages return `200`.
- Confirm `robots.txt` is reachable.
- Confirm `sitemap.xml` is reachable and uses the current deploy URLs.
- Confirm important pages are linked from the site navigation or crawlable internal links.
- Confirm pages describe Kura as covering food, cosmetic, and beauty products.
- Confirm disclaimers avoid medical, safety, or guaranteed outcome claims.
- Prepare the measurement workbook.

### Launch Day

- Add `CURRENT_DEPLOY_URL` to Google Search Console.
- Verify ownership.
- Submit `CURRENT_DEPLOY_URL/sitemap.xml`.
- Inspect priority URLs and request indexing where appropriate.
- Add `CURRENT_DEPLOY_URL` to Bing Webmaster Tools.
- Submit `CURRENT_DEPLOY_URL/sitemap.xml` in Bing.
- If the IndexNow key file is hosted, submit changed priority URLs and log responses.
- Update app-store support and marketing URLs to `CURRENT_DEPLOY_URL` only if no final domain exists.
- Start outreach with `CURRENT_DEPLOY_URL` and note that it will need replacement after final-domain migration.

### First 30 Days

- Check Google and Bing indexing weekly.
- Run AI visibility checks weekly for priority prompts.
- Send a small batch of qualified outreach each week.
- Prioritize sources that AI answer engines cite.
- Fix inaccurate public descriptions where the team controls the profile.
- Record whether each source mentions cosmetics/beauty scanning.

## Final Domain Migration Checklist

Use this when the final purchased domain is ready. Keep the migration boring: same content, same paths where possible, clean redirects, and careful measurement.

### Before Migration

- Purchase `FINAL_DOMAIN`.
- Choose one canonical host, such as `https://<final-domain>/` or `https://www.<final-domain>/`.
- Configure DNS and TLS.
- Add Google Search Console Domain property for `FINAL_DOMAIN_ROOT`.
- Add Bing Webmaster Tools site for `FINAL_DOMAIN`.
- Confirm Search Console verification will survive the move.
- Map every `CURRENT_DEPLOY_URL` page to its `FINAL_DOMAIN` equivalent.
- Keep the same URL paths where possible:
  - `/`
  - `/food-scanner/`
  - `/cosmetic-scanner/`
  - `/kura-vs-yuka/`
  - `/methodology/`
  - `/data-sources/`
  - `/faq/`
  - `/about/`
- Prepare a new sitemap that uses only `FINAL_DOMAIN` URLs.
- Prepare redirects from `CURRENT_DEPLOY_URL` to matching `FINAL_DOMAIN` URLs.
- Prepare updated app-store URLs, social profiles, directory profiles, and outreach templates.

### Migration Day

- Point production traffic to `FINAL_DOMAIN`.
- Turn on permanent redirects from `CURRENT_DEPLOY_URL` to matching `FINAL_DOMAIN` URLs.
- Avoid redirect chains.
- Confirm old URLs redirect directly to the matching new URLs.
- Confirm new URLs return `200`.
- Confirm `FINAL_DOMAIN/sitemap.xml` uses only final-domain URLs.
- Submit `FINAL_DOMAIN/sitemap.xml` in Google Search Console.
- Submit `FINAL_DOMAIN/sitemap.xml` in Bing Webmaster Tools.
- Use Google URL Inspection on priority final-domain URLs.
- Use Bing URL Inspection on priority final-domain URLs.
- Submit changed URLs through IndexNow if the final-domain key file is hosted.
- Use Google's Change of Address tool if the old and new properties are eligible and all pre-checks pass.

### After Migration

- Monitor old and new Search Console properties daily for the first week.
- Monitor weekly for at least 4 more weeks.
- Keep redirects for at least 1 year, and longer if practical.
- Update app-store support and marketing URLs to `FINAL_DOMAIN`.
- Update owned profiles, social bios, directory listings, and outreach templates.
- Ask existing live link partners to update links from `CURRENT_DEPLOY_URL` to `FINAL_DOMAIN`.
- Track whether Google and Bing select `FINAL_DOMAIN` as canonical.
- Run AI visibility checks weekly for 4 weeks and record whether citations move to `FINAL_DOMAIN`.

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
