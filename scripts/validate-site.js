#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const product = require('../content/product.json');
const { pages, faqs } = require('../content/pages');
const origin = product.origin;
const read = file => fs.readFileSync(path.join(root, file),'utf8');
const decode = text => text.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const failures = [];
function check(label, fn) { try { fn(); } catch (error) { failures.push(`${label}: ${error.message}`); } }
const publicFiles = ['index.html',...pages.map(page=>`${page.slug}/index.html`),'privacy/index.html','terms/index.html','contact/index.html'];
for (const file of publicFiles) {
  const html = read(file);
  check(`${file} canonical`,()=>{
    const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
    assert.equal(canonical.length,1,'expected one canonical');
    assert.equal(canonical[0][1],`${origin}/${file==='index.html'?'':file.replace(/index.html$/,'')}`);
  });
  check(`${file} internal links and assets`,()=>{
    for (const [,raw] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      if (!raw || /^(?:mailto:|tel:|data:|javascript:)/.test(raw)) continue;
      const url = new URL(decode(raw), `${origin}/${file}`);
      if (url.origin !== origin) continue;
      const pathname = decodeURIComponent(url.pathname);
      let target = path.join(root,pathname);
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target,'index.html');
      assert.ok(fs.existsSync(target), `missing ${raw}`);
      if (url.hash && target.endsWith('.html')) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(read(path.relative(root,target)).includes(`id="${id}"`),`missing fragment ${raw}`);
      }
    }
  });
  check(`${file} valid schema`,()=>{
    for (const [,data] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      const graph = JSON.parse(data);
      assert.equal(graph['@context'],'https://schema.org');
      assert.ok(Array.isArray(graph['@graph']));
    }
  });
  if (['privacy','terms','contact'].some(slug=>file.startsWith(`${slug}/`))) continue;
  check(`${file} accessible static content`,()=>{
    assert.equal((html.match(/<h1\b/g)||[]).length,1,'one h1 required');
    assert.equal((html.match(/<main\b/g)||[]).length,1,'one main landmark required');
    assert.ok(html.includes('<html lang="en">'));
    assert.ok(html.includes('class="skip-link"'));
    assert.ok(html.includes('id="main"'));
    assert.ok(html.includes('Optional Premium'));
    assert.ok(html.includes(product.downloads.ios));
    assert.ok(html.includes(product.downloads.android));
    assert.ok(!html.includes('onclick='),'content disclosure must work without JavaScript');
  });
  check(`${file} schema agrees with visible FAQ`,()=>{
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const faq = graph['@graph'].find(entity=>entity['@type']==='FAQPage');
    if (!faq) return;
    const answers = [...html.matchAll(/<details class="faq-detail"><summary>(.*?)<\/summary><p>(.*?)<\/p><\/details>/g)].map(m=>[decode(m[1]),decode(m[2])]);
    assert.deepEqual(faq.mainEntity.map(q=>[q.name,q.acceptedAnswer.text]),answers);
    const app = graph['@graph'].find(entity=>entity['@type']==='MobileApplication');
    assert.equal(app['@id'],`${origin}/#app`);
    assert.equal(app.description,product.description+' '+product.pricing.summary);
    assert.ok(!app.aggregateRating,'do not publish an unmaintained review count');
  });
}
check('Sitemap integrity',()=>{
  const xml = read('sitemap.xml');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  assert.equal(new Set(urls).size,urls.length,'duplicate URLs');
  for (const file of ['/',...pages.map(p=>`/${p.slug}/`),'/app-facts.json','/llms.txt','/ai-overview.md']) assert.ok(urls.includes(origin+file),`missing ${file}`);
  for (const url of urls) assert.ok(url.startsWith(origin+'/'),'foreign origin');
  assert.ok(!xml.includes('/docs/') && !xml.includes('/outreach/'));
});
check('Public facts stay synchronized',()=>{
  const facts = JSON.parse(read('app-facts.json'));
  for (const key of Object.keys(product)) assert.deepEqual(facts[key],product[key],`facts drift: ${key}`);
  for (const file of ['llms.txt','ai-overview.md']) {
    assert.ok(read(file).includes(product.reviewed));
    assert.ok(read(file).includes(product.downloads.ios));
    assert.ok(read(file).includes(product.downloads.android));
    assert.ok(read(file).includes(product.pricing.summary));
  }
  for (const page of pages) assert.ok(read('llms.txt').includes(`${origin}/${page.slug}/`),`unlisted ${page.slug}`);
  assert.ok(faqs.length>=10);
});
check('Search bots are allowed',()=>{
  const robots=read('robots.txt');
  for (const bot of ['OAI-SearchBot','Claude-SearchBot','Claude-User','Bingbot','Googlebot','PerplexityBot']) {
    const block=robots.split(`User-agent: ${bot}\n`)[1]?.split('User-agent:')[0];
    assert.ok(block?.includes('Allow: /\n'),`${bot} not allowed`);
    assert.ok(!/^Disallow: \/$/m.test(block),`${bot} blocked`);
    for (const dir of ['outreach','docs','scripts','content']) assert.ok(block.includes(`Disallow: /${dir}/`));
  }
});
if(failures.length){ console.error(failures.join('\n')); process.exit(1); }
console.log(`Validated ${publicFiles.length} HTML pages: canonicals, local links/assets, static content, schema/FAQ agreement, product facts, sitemap and search-bot access.`);
