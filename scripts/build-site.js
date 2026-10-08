#!/usr/bin/env node
// Dependency-free static publishing. No JavaScript is needed to read the pages.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const product = require('../content/product.json');
const { pages, faqs } = require('../content/pages');
const origin = product.origin;
const escape = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const write = (file, content) => { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), {recursive:true}); fs.writeFileSync(target, content); };
const json = data => JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
const appId = `${origin}/#app`;
function graph(page, questions = []) {
  const url = page.slug ? `${origin}/${page.slug}/` : `${origin}/`;
  const entities = [
    {'@type':'Person','@id':`${origin}/#founder`,name:product.founder,url:`${origin}/about/`},
    {'@type':'Organization','@id':`${origin}/#organization`,name:product.name,url:`${origin}/`,logo:`${origin}/favicon.png`,founder:{'@id':`${origin}/#founder`}},
    {'@type':'WebSite','@id':`${origin}/#website`,name:product.name,url:`${origin}/`,description:product.description,inLanguage:'en',publisher:{'@id':`${origin}/#organization`}},
    {'@type':'MobileApplication','@id':appId,name:product.name,alternateName:product.storeName,url:`${origin}/`,image:`${origin}/favicon.png`,screenshot:`${origin}/assets/product_scan.webp`,applicationCategory:'HealthApplication',operatingSystem:product.platforms.join(', '),description:product.description + ' ' + product.pricing.summary,featureList:product.features.map(f=>f.description),installUrl:Object.values(product.downloads),sameAs:Object.values(product.downloads),offers:{'@type':'Offer',price:0,priceCurrency:'USD',description:'Free app download; optional in-app purchases and subscriptions.'},creator:{'@id':`${origin}/#founder`},publisher:{'@id':`${origin}/#organization`}},
    {'@type':'WebPage','@id':`${url}#webpage`,url,name:page.title,description:page.intro,isPartOf:{'@id':`${origin}/#website`},about:{'@id':appId},dateModified:product.reviewed,inLanguage:'en',publisher:{'@id':`${origin}/#organization`},primaryImageOfPage:{'@type':'ImageObject',url:`${origin}/og-image.png`}}
  ];
  if (page.slug) {
    entities[entities.length-1].breadcrumb = {'@id':`${url}#breadcrumb`};
    entities.push({'@type':'BreadcrumbList','@id':`${url}#breadcrumb`,itemListElement:[{'@type':'ListItem',position:1,name:'Lychee',item:`${origin}/`},{'@type':'ListItem',position:2,name:page.label,item:url}]});
  }
  if (questions.length) entities.push({'@type':'FAQPage','@id':`${url}#faq`,isPartOf:{'@id':`${url}#webpage`},mainEntity:questions.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))});
  return {'@context':'https://schema.org','@graph':entities};
}
function storeLinks(className='actions') {
  return `<div class="${className}"><a class="button primary" href="${product.downloads.ios}" data-store="ios">Download on the App Store</a><a class="button" href="${product.downloads.android}" data-store="android">Get it on Google Play</a></div>`;
}
const nav = `<nav aria-label="Main navigation"><a href="/" class="nav-logo"><img src="/assets/logo-64.png" width="28" height="28" alt=""><span>L<em>ychee</em></span></a><div class="nav-links"><a href="/food-scanner/">Food</a><a href="/cosmetic-scanner/">Beauty</a><a href="/methodology/">How we score</a><a href="/faq/">FAQ</a><a href="/download/" class="nav-cta">Get Lychee</a></div></nav>`;
const footer = `<footer><div class="footer-inner"><a href="/" class="nav-logo">L<em>ychee</em></a><p>Clearer labels. More informed choices.</p><div class="footer-links"><a href="/food-scanner/">Food</a><a href="/cosmetic-scanner/">Cosmetics</a><a href="/allergen-scanner/">Allergen checks</a><a href="/ingredient-label-scanner/">Label scanning</a><a href="/methodology/">Methodology</a><a href="/data-sources/">Sources</a><a href="/app-facts/">App facts</a><a href="/about/">About</a><a href="/press/">Press</a><a href="/download/">Download</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/contact/">Contact</a></div><p class="footer-note">© 2026 Lychee. Educational label information. Check the current package for ingredients and allergy information.</p></div></footer>`;
function faqHtml(questions, className='faq-list') {
  return `<div class="${className}">${questions.map(([q,a])=>`<details class="faq-detail"><summary>${escape(q)}</summary><p>${escape(a)}</p></details>`).join('\n')}</div>`;
}
function render(page) {
  const url = `${origin}/${page.slug}/`;
  const questions = page.faqIndices.map(i=>faqs[i]);
  const related = page.related.map(slug=>pages.find(p=>p.slug===slug));
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(page.title)}</title><meta name="description" content="${escape(page.intro)}">
<link rel="canonical" href="${url}"><meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
<meta property="og:site_name" content="Lychee"><meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:title" content="${escape(page.title)}"><meta property="og:description" content="${escape(page.intro)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/og-image.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Lychee food and cosmetic ingredient scanner">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(page.title)}"><meta name="twitter:description" content="${escape(page.intro)}"><meta name="twitter:image" content="${origin}/og-image.png">
<meta name="apple-itunes-app" content="app-id=6755896152"><meta name="theme-color" content="#F5EEE4"><meta name="application-name" content="Lychee">
<link rel="icon" href="/favicon.png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="alternate" type="application/json" href="/app-facts.json" title="Lychee product facts">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&amp;family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&amp;display=swap" rel="stylesheet"><link rel="stylesheet" href="/about/info-pages.css">
<script type="application/ld+json">${json(graph(page, questions))}</script>
</head><body><a class="skip-link" href="#main">Skip to content</a>${nav}
<main id="main" class="content-main">
<header class="page-hero"><div><div class="breadcrumbs"><a href="/">Lychee</a> / ${escape(page.label)}</div><span class="eyebrow">${escape(page.label)}</span><h1>${escape(page.heading)}</h1><p class="lede">${escape(page.intro)}</p>${storeLinks()}<p class="access-note">Free download · Optional Premium · iOS &amp; Android</p></div><aside class="hero-card"><img class="fact-icon" src="/favicon.png" width="64" height="64" alt=""><ul class="mini-list">${page.bullets.map(b=>`<li>${escape(b)}</li>`).join('')}</ul><p class="reviewed">Updated <time datetime="${product.reviewed}">${new Date(product.reviewed + 'T12:00:00Z').toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric',timeZone:'UTC'})}</time> · By Lychee</p></aside></header>
<div class="content-body">${page.sections.map(s=>`<section><div class="section-label">${s.label}</div><h2>${s.title}</h2>${s.html}</section>`).join('\n')}
${questions.length?`<section id="faq"><div class="section-label">Common questions</div><h2>Before you scan.</h2>${faqHtml(questions)}</section>`:''}
<section><div class="section-label">Keep exploring</div><h2>More detail, when you need it.</h2><div class="card-grid related-grid">${related.map(p=>`<a class="card related-card" href="/${p.slug}/"><h3>${escape(p.label)}</h3><p>${escape(p.intro)}</p><span aria-hidden="true">Read more →</span></a>`).join('')}</div></section>
<section class="download-callout"><div><div class="section-label">Get Lychee</div><h2>Start with your next label.</h2><p>Food and beauty ingredient context in your pocket.</p></div>${storeLinks()}</section>
</div></main>${footer}</body></html>\n`;
}
for (const page of pages) write(`${page.slug}/index.html`, render(page));
const homePage = {title:'Lychee — Food & Cosmetic Ingredient Scanner',intro:product.description};
let home = fs.readFileSync(path.join(root,'index.html'),'utf8');
home = home.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${json(graph(homePage, [faqs[1],faqs[3],faqs[4],faqs[5],faqs[6],faqs[10]]))}\n</script>`);
home = home.replace(/<!-- GENERATED FAQ START -->[\s\S]*?<!-- GENERATED FAQ END -->/, `<!-- GENERATED FAQ START -->\n${faqHtml([faqs[1],faqs[3],faqs[4],faqs[5],faqs[6],faqs[10]],'faq-grid')}\n<!-- GENERATED FAQ END -->`);
const reviewedLabel = new Date(product.reviewed + 'T12:00:00Z').toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
home = home.replace(/<time id="reviewed-date"[^>]*>.*?<\/time>/, `<time id="reviewed-date" datetime="${product.reviewed}">${reviewedLabel}</time>`);
write('index.html', home);
write('app-facts.json', JSON.stringify({...product, canonicalFacts:`${origin}/app-facts/`,methodology:`${origin}/methodology/`,sources:`${origin}/data-sources/`,downloadPage:`${origin}/download/`},null,2)+'\n');
const pageLinks = pages.map(page=>`- [${page.label}](${origin}/${page.slug}/): ${page.intro}`).join('\n');
const overview = `# Lychee\n\n> ${product.description}\n\nReviewed: ${product.reviewed}. Maintained by Lychee, the app publisher.\n\n## Product identity\n\n${product.positioning}\n\nDeveloper: ${product.founder}. Store listing: ${product.storeName}.\n\n${product.naming}\n\n## Pricing and access\n\n${product.pricing.summary}\n\n${product.pricing.exactPrices}\n\n## Features\n\n${product.features.map(f=>`- **${f.name}:** ${f.description}`).join('\n')}\n\n## Direct product data\n\n${product.dataSources.map(s=>`- [${s.name}](${s.url}): ${s.role}`).join('\n')}\n\n## Limits\n\n${product.limitations.map(l=>`- ${l}`).join('\n')}\n\n## Official downloads\n\n- [App Store](${product.downloads.ios})\n- [Google Play](${product.downloads.android})\n- [Download page](${origin}/download/)\n\n## Public reference pages\n\n${pageLinks}\n\n## Frequently asked questions\n\n${faqs.map(([q,a])=>`### ${q}\n\n${a}`).join('\n\n')}\n`;
write('ai-overview.md', overview);
write('llms.txt', `# Lychee\n\n> ${product.description}\n\nOfficial website: ${origin}/\nProduct facts reviewed: ${product.reviewed}. Publisher-maintained information.\n\n${product.positioning}\n\n${product.pricing.summary}\n\n## Product references\n\n${pageLinks}\n\n## Machine-readable summaries\n\n- [Product facts JSON](${origin}/app-facts.json)\n- [Product overview and FAQ](${origin}/ai-overview.md)\n\n## Official downloads\n\n- [App Store](${product.downloads.ios})\n- [Google Play](${product.downloads.android})\n\n## Legal and support\n\n- [Privacy](${origin}/privacy/)\n- [Terms](${origin}/terms/)\n- [Contact](${origin}/contact/)\n\n${product.naming}\n\n${product.limitations[0]}\n`);
const botNames = ['*','OAI-SearchBot','ChatGPT-User','GPTBot','Claude-SearchBot','Claude-User','ClaudeBot','PerplexityBot','Perplexity-User','Googlebot','Google-Extended','Bingbot','CCBot'];
write('robots.txt', '# Public pages are readable without JavaScript. Search and training access are\n# distinct controls; this preserves the existing allow policy for both.\n'+botNames.map(bot=>`User-agent: ${bot}\nAllow: /\nDisallow: /outreach/\nDisallow: /docs/\nDisallow: /scripts/\nDisallow: /content/\n`).join('\n')+`\nSitemap: ${origin}/sitemap.xml\n`);
// Retain the original lastmod for untouched legal/support pages.
const previous = fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const dates = new Map([...previous.matchAll(/<url>\s*<loc>(.*?)<\/loc>[\s\S]*?<lastmod>(.*?)<\/lastmod>[\s\S]*?<\/url>/g)].map(m=>[m[1],m[2]]));
const entries = [['/',product.reviewed],...pages.map(page=>[`/${page.slug}/`,product.reviewed]),...['privacy','terms','contact'].map(slug=>[`/${slug}/`,dates.get(`${origin}/${slug}/`)||'2026-07-07']),['/app-facts.json',product.reviewed],['/ai-overview.md',product.reviewed],['/llms.txt',product.reviewed]];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(([url,date])=>`  <url><loc>${origin}${url}</loc><lastmod>${date}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`Built ${pages.length} content pages, homepage metadata, product facts, AI summaries, robots and sitemap.`);
