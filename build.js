const fs = require('fs');
const sharp = require('sharp');
const marked = require('marked');

async function main() {
  console.log("Processing icon...");
  const roundedCorners = Buffer.from(
    '<svg><rect x="0" y="0" width="512" height="512" rx="112" ry="112"/></svg>'
  );
  await sharp('icon.png')
    .resize(512, 512)
    .composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
    .png()
    .toFile('favicon.png');

  console.log("Processing landing.html...");
  let html = fs.readFileSync('landing.html', 'utf-8');

  // 1. Add favicon
  if (!html.includes('<link rel="icon"')) {
    html = html.replace('</head>', '  <link rel="icon" type="image/png" href="/favicon.png">\n</head>');
  }

  // 2. Add icon to nav logo
  if (!html.includes('class="nav-logo-img"')) {
    html = html.replace(
      '<div class="nav-logo">',
      '<div class="nav-logo" style="display: flex; align-items: center; gap: 8px;"><img src="/favicon.png" class="nav-logo-img" style="width: 28px; height: 28px; border-radius: 6px;" alt="Kura Logo">'
    );
  }

  // 3. Update nav links to absolute roots
  // Replace internal anchors in nav with root-based anchors so they work on subpages
  html = html.replace(/"#how-it-works"/g, '"/#how-it-works"');
  html = html.replace(/"#features"/g, '"/#features"');
  html = html.replace(/"#science"/g, '"/#science"');
  html = html.replace(/"#faq"/g, '"/#faq"');

  // 4. Update footer links
  html = html.replace('<a href="#">Privacy policy</a>', '<a href="/privacy">Privacy policy</a>');
  html = html.replace('<a href="#">Terms of use</a>', '<a href="/terms">Terms of use</a>');
  html = html.replace('<a href="#">Contact</a>', '<a href="/contact">Contact</a>');

  // 5. Save updated index.html
  fs.writeFileSync('index.html', html);
  console.log("Saved index.html");

  // Remove landing.html
  try { fs.unlinkSync('landing.html'); } catch(e) {}

  // Extract sections to wrap subpages
  const headEnd = html.indexOf('</head>');
  const navStart = html.indexOf('<nav>');
  const navEnd = html.indexOf('</nav>') + 6;
  const footerStart = html.indexOf('<footer>');

  let head = html.substring(0, headEnd) + `
  <style>
    .page-content {
      max-width: 800px;
      margin: 140px auto 80px;
      padding: 0 40px;
    }
    .page-content h1 {
      font-family: 'Fraunces', serif;
      font-size: 48px;
      font-weight: 300;
      letter-spacing: -0.03em;
      margin-bottom: 32px;
      color: var(--ink);
    }
    .page-content h2 {
      font-size: 24px;
      margin: 32px 0 16px;
      font-weight: 700;
      font-family: 'Fraunces', serif;
    }
    .page-content p, .page-content li {
      font-size: 16px;
      line-height: 1.7;
      color: var(--ink-soft);
      margin-bottom: 16px;
    }
    .page-content a {
      color: var(--terra);
      text-decoration: underline;
    }
    .page-content ul {
      margin-bottom: 16px;
      padding-left: 24px;
    }
    /* Simple utility to ensure Tally form fits well */
    .tally-container {
      margin-top: 40px;
    }
  </style>
  </head>
  <body>
  `;

  let nav = html.substring(navStart, navEnd);
  let footer = html.substring(footerStart);

  function generatePage(title, contentHTML) {
    // Replace title
    let customHead = head.replace(/<title>.*<\/title>/, `<title>${title} — Kura</title>`);
    return customHead + '\n' + nav + '\n<div class="page-content">\n' + contentHTML + '\n</div>\n' + footer;
  }

  // Build /privacy
  console.log("Processing Privacy...");
  const privacyMd = fs.readFileSync('privacy.md', 'utf-8');
  const privacyHtmlContent = marked.parse(privacyMd);
  fs.mkdirSync('privacy', { recursive: true });
  fs.writeFileSync('privacy/index.html', generatePage('Privacy Policy', privacyHtmlContent));

  // Build /terms
  console.log("Processing Terms...");
  const termsMd = fs.readFileSync('terms.md.txt', 'utf-8');
  const termsHtmlContent = marked.parse(termsMd);
  fs.mkdirSync('terms', { recursive: true });
  fs.writeFileSync('terms/index.html', generatePage('Terms of Use', termsHtmlContent));

  // Build /contact
  console.log("Processing Contact...");
  const contactHtmlContent = `
    <h1>Contact Us</h1>
    <p>We'd love to hear from you. Have a question, partnership idea, or feedback? Use the form below.</p>
    <div class="tally-container">
      <iframe data-tally-src="https://tally.so/r/q4YPvg?transparentBackground=1" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0" title="Contact Us"></iframe>
      <script>var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}</script>
    </div>
  `;
  fs.mkdirSync('contact', { recursive: true });
  fs.writeFileSync('contact/index.html', generatePage('Contact Us', contactHtmlContent));

  console.log("All done.");
}

main().catch(console.error);
