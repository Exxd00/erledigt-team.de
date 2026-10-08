import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = '.next/server/app';
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((f) => (f.isDirectory() ? walk(path.join(dir, f.name)) : [path.join(dir, f.name)]));
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&(?:nbsp|lt|gt);/g, ' ');
const wordCount = (s) => (s.match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu) || []).length;
const htmlFiles = walk(root).filter(
  (f) => f.endsWith('.html') && !path.relative(root, f).startsWith('_'),
);
const pages = new Map(
  htmlFiles.map((f) => {
    const relative = path
      .relative(root, f)
      .replaceAll('\\', '/')
      .replace(/\.html$/, '');
    return [relative === 'index' ? '/' : `/${relative}`, fs.readFileSync(f, 'utf8')];
  }),
);
const routes = new Set([...pages.keys(), '/anfrage', '/sitemap.xml', '/robots.txt']);
const errors = [],
  results = [],
  titles = new Set();
for (const [route, html] of pages) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  const text = decode(
    main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' '),
  );
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');
  const canonical = decode(html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1] || '');
  const count = wordCount(text);
  if (count < 300) errors.push(`${route}: ${count} main-content words`);
  if ((main.match(/<h1\b/g) || []).length !== 1) errors.push(`${route}: expected one h1`);
  if (titles.has(title)) errors.push(`${route}: duplicate title`);
  titles.add(title);
  if (
    canonical !== `https://erledigt-team.de${route === '/' ? '' : route}` &&
    canonical !== `https://erledigt-team.de${route}`
  )
    errors.push(`${route}: incorrect canonical ${canonical}`);
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const target = new URL(href, `https://erledigt-team.de${route}`);
    if (!routes.has(target.pathname)) errors.push(`${route}: broken link ${href}`);
    if (
      target.hash &&
      pages.has(target.pathname) &&
      !pages.get(target.pathname).includes(`id="${target.hash.slice(1)}"`)
    )
      errors.push(`${route}: broken anchor ${href}`);
  }
  for (const m of html.matchAll(/<img\b[^>]*src="([^"]+)"/g))
    if (m[1].startsWith('/images/') && !fs.existsSync(`public${m[1]}`))
      errors.push(`${route}: missing image ${m[1]}`);
  results.push({ route, mainWords: count, title });
}
const data = JSON.parse(fs.readFileSync('src/data/content.json', 'utf8'));
assert.equal(
  pages.size,
  data.cities.length * (data.services.length + 1) + data.services.length + 6,
  'Unexpected static-page count',
);
const report = {
  generatedAt: new Date().toISOString(),
  staticPages: pages.size,
  dynamicForm: '/anfrage',
  minimumMainWords: Math.min(...results.map((p) => p.mainWords)),
  errors,
  checks: [
    'main word count',
    'one h1',
    'unique titles',
    'self canonical',
    'internal links and anchors',
    'image existence',
  ],
  pages: results,
};
fs.writeFileSync('docs/build-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, pages: undefined }, null, 2));
assert.equal(errors.length, 0, 'Built-site audit failed');
