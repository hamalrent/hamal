const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const rows = fs.readFileSync(path.join(root, 'ads', 'keyword-map.csv'), 'utf8').trim().split('\n').slice(1);
const urls = new Set();
const counts = {ru:0, ro:0, mo:0, en:0};
const escapeHtml = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

for (const row of rows) {
  const match = row.match(/^"([^"]*)","([^"]*)","([^"]*)","([^"]*)","([^"]*)"$/);
  assert.ok(match, `Malformed CSV row: ${row}`);
  const [, language, keyword, category, url, finalUrl] = match;
  assert.ok(Object.hasOwn(counts, language), `Unknown language: ${language}`);
  assert.ok(category);
  assert.equal(finalUrl, `https://hamal.rent${url}`);
  assert.ok(!urls.has(url), `Duplicate URL: ${url}`);
  urls.add(url);
  counts[language]++;
  const filename = path.join(root, url.slice(1));
  assert.ok(fs.existsSync(filename), `Missing page: ${url}`);
  const html = fs.readFileSync(filename, 'utf8');
  assert.ok(html.includes(`<h1>${escapeHtml(keyword)}</h1>`), `Wrong H1: ${url}`);
  assert.ok(html.includes('https://wa.me/37360300789?text='), `Missing WhatsApp: ${url}`);
  assert.ok(html.includes('tel:+37360300789'), `Missing phone: ${url}`);
  assert.ok(html.includes('name="googlebot" content="noindex,follow"'), `Missing search index rule: ${url}`);
  assert.ok(!html.includes('name="AdsBot-Google" content="noindex"'), `AdsBot blocked: ${url}`);
  for (const asset of ['../../logo-mark.svg', '../../landing.css', '../../landing.js']) {
    assert.ok(fs.existsSync(path.resolve(path.dirname(filename), asset)), `Missing asset ${asset} from ${url}`);
  }
  for (const other of Object.keys(counts)) {
    const sibling = path.resolve(path.dirname(filename), `../${other}/${path.basename(filename)}`);
    assert.ok(fs.existsSync(sibling), `Missing language variant: ${sibling}`);
  }
}
assert.deepEqual(counts, {ru:81, ro:81, mo:81, en:81});
assert.equal(rows.length, 324);
console.log(`Verified ${rows.length} pages and keyword mappings across four languages`);
