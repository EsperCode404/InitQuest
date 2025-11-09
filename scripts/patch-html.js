// scripts/patch-html.js
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist', 'index.html');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist/index.html not found. Run the build first.');
  process.exit(1);
}

let html = fs.readFileSync(distPath, 'utf8');

// 1) Replace CSS reference to point to dist/styles.css
// This looks for any href that ends with main.css (assets/css/main.css or ./assets/css/main.css etc.)
html = html.replace(/href=(["'])(?:.*\/)?main\.css\1/gi, 'href="styles.css"');

// 2) Remove all external <script src="..."></script> tags (keep inline scripts if any — basic approach)
html = html.replace(/<script\b[^>]*src=["'][^"']*["'][^>]*>\s*<\/script>/gi, '');

// 3) Ensure bundle.js is injected before </body>
// If there's already a bundle.js reference, don't add another.
if (!/src=(["'])bundle\.js\1/.test(html)) {
  html = html.replace(/<\/body>/i, '  <script src="bundle.js"></script>\n</body>');
}

// 4) Save back
fs.writeFileSync(distPath, html, 'utf8');
console.log('✅ Patched dist/index.html → styles.css + bundle.js');
