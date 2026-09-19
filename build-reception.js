// Builds royal-maroon/reception.html (the reception-only invitation) from index.html.
// Vercel runs this on every deploy, so only index.html needs editing.
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'royal-maroon');
let html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const swaps = [
  // tells js/main.js to show the reception only
  ['<html lang="en" class="no-js">', '<html lang="en" class="no-js" data-invite="reception">'],
  // link previews (WhatsApp etc.) read these before any script runs
  ['their Silver Jubilee celebrations on 17th &amp; 18th October 2026', 'their Silver Jubilee Reception on 18th October 2026'],
  ['Celebrating 25 Years of Togetherness · 17th &amp; 18th October 2026', 'Silver Jubilee Reception · 18th October 2026'],
];
for (const [from, to] of swaps) {
  if (!html.includes(from)) throw new Error(`build-reception: could not find "${from}" in index.html`);
  html = html.replace(from, to);
}

fs.writeFileSync(path.join(dir, 'reception.html'), html);
console.log('Built royal-maroon/reception.html');
