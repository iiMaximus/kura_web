# Lychee AI discovery: implementation and growth plan

Reviewed October 8, 2026. This is a working plan for the publisher, not public consumer copy. The implementation is in the website repository; production effects require deployment and recrawling.

## What the audit found

The existing site already used static HTML, canonical URLs, JSON-LD, a sitemap and explicit AI crawler allow rules. The main gaps were inconsistent claims and generic pages that did not describe the current product in enough detail.

The homepage said Lychee never considers calories, while the app displays nutrition and uses nutrient inputs. It made blanket regulatory claims and described source integrations more broadly than the barcode lookup implementation supports. It said there were no ads despite ad code, a Premium ad-free benefit and advertising disclosures in the app stores. Product counts, timings and ratings lacked an ongoing update mechanism.

The refresh removes those inconsistencies and preserves the processing-first scoring philosophy. It gives food and cosmetic scores distinct explanations, including incomplete data, beta status and exposure. It does not weaken the app model or claim that regulatory approval, an AI explanation or a barcode scan proves individual safety.

## What is implemented

- Refreshed homepage, readable without client JavaScript, with real download links and direct links to discovery questions.
- Eighteen substantive information pages, including new allergen, ingredient-label, download and public-facts pages.
- Shared product facts used for consistent application/entity metadata, public JSON, the Markdown overview and `llms.txt`.
- Concrete food score ranges and cosmetic coverage rules, verified against the current application source.
- Source distinctions: Open Food Facts and Open Beauty Facts supply product records; Lychee rules and dictionaries supply analysis; external reference links are background resources, not claimed live integrations.
- A sourced Lychee/Yuka method comparison, explicitly disclosed as publisher-written.
- Native FAQ disclosure, visible answer text in the HTML, consistent FAQ markup, breadcrumbs, canonical URLs, internal links and reviewed dates.
- Existing search/training allow policy retained; internal working directories excluded from crawling.
- A dependency-free rebuild and validation workflow. The homepage FAQ and metadata use the same facts as the other pages.

## What the official guidance supports

[Google Search: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) says its AI search experiences still use the established requirements for crawlable, indexable pages and helpful content. It does not require a special AI text file or special schema. Structured data must match the visible content. Treat `llms.txt` as an optional convenience, not the main investment or a proven ranking factor.

[OpenAI crawler documentation](https://developers.openai.com/api/docs/bots) distinguishes OAI-SearchBot, which supports ChatGPT search, from GPTBot, which concerns model training. Allowing training is not the same as gaining search recommendations. ChatGPT-User handles user-directed page access and is not the search-indexing control.

[Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) distinguishes Claude-SearchBot, Claude-User and ClaudeBot. Access should also be checked at the CDN/host; a permissive robots file does not cancel a challenge or firewall block.

[xAI web-search documentation](https://docs.x.ai/developers/tools/web-search) documents retrieval of current web information. This audit did not establish an official dedicated Grok robots token or special optimization standard. The generic public allow rule is retained; no guessed crawler identity is added.

[Yuka's food method](https://help.yuka.io/l/en/article/ijzgfvi1jq) and [independence statement](https://yuka.io/en/independence/) support the limited comparison on the site. Recheck them when editing the comparison. Do not imply that Yuka has advertising or lacks food/cosmetic scanning.

## Publish and check access

1. Run the build and check commands. Publish the static root through the existing host. The live headers observed during this audit indicate Render/Cloudflare; verify the actual connected branch and publish settings. No deployment is performed by these scripts.
2. Verify status 200, content types and useful HTML for the homepage, new pages, robots, sitemap and product-facts JSON. Verify unknown paths return a real 404. Check production against local output.
3. Use Google Search Console and Bing Webmaster Tools to submit the sitemap and inspect the priority URLs. Prefer the homepage, food scanner, allergen scanner, methodology, comparison and download page. No indexing success should be claimed without account evidence.
4. Inspect host/CDN logs or verified crawler diagnostics for access failures. Test representative user agents, but remember a successful spoofed user-agent request does not prove a real crawler can reach the site. Do not disable security protections globally to admit crawlers.
5. Check each store link, available regions and current monetization. Obtain current app screenshots to replace the explicitly marked older screenshots.
6. Allow time for recrawling. A date change or sitemap submission is not evidence that an assistant has reindexed the page.

## Independent sources: the next growth work

Self-published pages can explain the product, but assistants may also consult store listings, reviews, comparisons, communities and other publishers. Prioritize a few useful, accurate sources over large volumes of duplicate promotional copy.

| Priority | Work | Concrete deliverable |
| --- | --- | --- |
| 1 | Align store copy and public profiles | Use current name, processing-first positioning, beta cosmetic limits and truthful Premium/advertising details everywhere. The current store copy also contains stronger privacy and safety language that needs review before reuse. |
| 1 | Seek hands-on independent reviews | A real demo, a representative shopping basket, screenshots and the scoring explanation. Reviewers choose their own conclusion; do not buy undisclosed praise. |
| 2 | Submit to relevant product/app directories | Consistent factual descriptions, category, developer and the two official store URLs. Only submit where a genuine scanner audience exists. |
| 2 | Publish useful original comparisons | A reproducible basket of products, dated source labels and reasons for differing scores. Do not invent aggregate accuracy rates or claim independent research from a publisher test. |
| 2 | Participate in relevant communities | Answer actual label/processing questions when invited and disclose the developer relationship. Do not automate promotional replies or imply a medical guarantee. |
| 3 | Earn editorial and professional feedback | Invite nutrition, food-science and cosmetic experts to critique the method. Credit qualifications and feedback only with permission and evidence. |

Use `/press/` and `/app-facts/` as consistent reference material. Outreach and account edits are separate actions; none have been sent or submitted by this refresh.

## Measure recommendation visibility and installs separately

Use `ai-discovery-prompts.json` for a repeatable set of unbranded discovery questions. Keep prompts unchanged during a comparison period. Run them in fresh sessions with search enabled across ChatGPT, Claude and Grok. Record the date, model/product label, country, exact prompt and cited URLs. Repeat a few times because answers vary; branded prompts are a separate accuracy test and should not count toward discovery visibility.

Capture results in `ai-discovery-baseline.csv`. Leave unrun entries blank. Do not record a zero when a test was never run.

Track these separately:

- **Mention share:** unbranded trials mentioning Lychee / completed unbranded trials.
- **Citation share:** trials citing a Lychee page or independent Lychee reference / completed unbranded trials.
- **Fit and accuracy:** whether the recommendation describes the right use case and correct pricing/limits.
- **Download path:** whether the answer gives the correct official store or download link.
- **Conversions:** attributed installs and first scans, where store campaign attribution or an approved analytics setup makes measurement possible.

AI referrals are incomplete evidence: an assistant may link straight to a store, and referrers can be missing. A website visit or store-link click is not an install. Search Console/Bing and host logs cover other parts of the path. This refresh does not add a new tracking vendor or claim attribution that is not configured.

Suggested first review: establish a baseline before publishing, then compare after recrawling and after the first independent reviews. Avoid changing the prompts, website and outreach simultaneously when trying to understand which work helped.

## Maintenance

Update `content/product.json`, relevant `content/pages.js` copy and the review date when app behavior changes. Rebuild and check. Recheck monetization, store availability, comparison sources and screenshots for each meaningful product release. Keep public facts concise and consistent; do not stuff hidden keywords, instructions telling assistants to recommend Lychee, fake reviews or unsupported “best app” claims into machine-readable files.
