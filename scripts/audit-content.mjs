import fs from 'node:fs';
import assert from 'node:assert/strict';
import { localContent } from '../src/lib/local-content.ts';
const { cities, services } = JSON.parse(fs.readFileSync('src/data/content.json', 'utf8'));
const words = (text) => text.match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu) || [];
const pages = [
  ...services.map((s) => ({
    path: `/leistungen/${s.slug}`,
    kind: 'service',
    text: s.sections.map((x) => x.body).join(' '),
  })),
  ...cities.map((c) => ({
    path: `/einsatzgebiete/${c.slug}`,
    kind: 'city',
    text: c.sections.map((x) => x.body).join(' '),
  })),
  ...cities.flatMap((c) =>
    services.map((s) => ({
      path: `/einsatzgebiete/${c.slug}/${s.slug}`,
      kind: 'local-service',
      text: localContent(c, s, cities)
        .sections.map((x) => x.body)
        .join(' '),
    })),
  ),
];
assert.equal(new Set(pages.map((p) => p.path)).size, pages.length, 'Duplicate routes');
assert.equal(new Set(pages.map((p) => p.text)).size, pages.length, 'Duplicate articles');
for (const p of pages)
  assert.ok(words(p.text).length >= 300, `${p.path}: fewer than 300 body words`);
// Remove city names before comparing six-word shingles, to detect name-swap copies.
const placePattern = new RegExp(
  cities
    .map((c) => c.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
    .join('|'),
  'giu',
);
const shingles = (text) => {
  const w = words(text.replace(placePattern, 'ORT').toLowerCase());
  return new Set(w.slice(0, -5).map((_, i) => w.slice(i, i + 6).join(' ')));
};
const sets = pages.map((p) => shingles(p.text));
const similar = [];
let highest = 0;
for (let i = 0; i < pages.length; i++)
  for (let j = i + 1; j < pages.length; j++) {
    const a = sets[i],
      b = sets[j];
    let intersection = 0;
    for (const x of a) if (b.has(x)) intersection++;
    const score = intersection / (a.size + b.size - intersection);
    highest = Math.max(highest, score);
    if (score > 0.58)
      similar.push({
        a: pages[i].path,
        b: pages[j].path,
        sharedShingleRatio: Number(score.toFixed(3)),
      });
  }
const report = {
  generatedAt: new Date().toISOString(),
  servicePages: services.length,
  cityPages: cities.length,
  combinedPages: cities.length * services.length,
  totalEditorialPages: pages.length,
  minBodyWords: Math.min(...pages.map((p) => words(p.text).length)),
  maxNameNormalizedJaccard: Number(highest.toFixed(3)),
  note: 'Six-word shingle Jaccard, city names normalized. Shared service facts are intentional. This is an editorial duplicate check, not a search-ranking guarantee.',
  closestPairs: similar.sort((a, b) => b.sharedShingleRatio - a.sharedShingleRatio).slice(0, 12),
  pages: pages.map(({ path, kind, text }) => ({ path, kind, bodyWords: words(text).length })),
};
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/content-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, pages: undefined }, null, 2));
assert.ok(highest < 0.72, 'Near-duplicate article: review content before release');
