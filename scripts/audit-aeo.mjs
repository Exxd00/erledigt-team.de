import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { guides } from '../src/lib/guides.ts';

const root = '.next/server/app';
const origin = 'https://erledigt-team.de';
const walk = (directory) =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((item) =>
      item.isDirectory()
        ? walk(path.join(directory, item.name))
        : [path.join(directory, item.name)],
    );
const normalize = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const errors = [];
const stats = {
  htmlPages: 0,
  linkedPageEntities: 0,
  servicePages: 0,
  localServicePages: 0,
  faqPages: 0,
  questions: 0,
  articles: 0,
  breadcrumbPages: 0,
};
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
for (const file of walk(root).filter(
  (file) => file.endsWith('.html') && !path.relative(root, file).startsWith('_'),
)) {
  const relative = path
    .relative(root, file)
    .replaceAll('\\', '/')
    .replace(/\.html$/, '');
  const route = relative === 'index' ? '/' : `/${relative}`;
  const html = fs.readFileSync(file, 'utf8');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
  const visible = normalize(
    main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' '),
  );
  const nodes = [];
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      const value = JSON.parse(match[1]);
      nodes.push(...(value['@graph'] || [value]));
    } catch {
      errors.push(`${route}: invalid JSON-LD`);
    }
  }
  stats.htmlPages++;
  const businesses = nodes.filter((node) => node['@type'] === 'LocalBusiness');
  check(businesses.length === 1, `${route}: expected one real business`);
  const business = businesses[0];
  check(business?.['@id'] === `${origin}/#business`, `${route}: inconsistent business ID`);
  check(
    business?.address?.streetAddress === 'Eschstraße 70' &&
      business?.address?.addressLocality === 'Saterland',
    `${route}: incorrect business address`,
  );
  check(
    business?.contactPoint?.email === 'info@erledigt-team.de',
    `${route}: missing contact details`,
  );
  check(business?.description?.length > 40, `${route}: business description missing`);
  check(
    !business?.aggregateRating && !business?.review && !business?.openingHoursSpecification,
    `${route}: unverified ratings or opening hours`,
  );
  check(
    nodes.some((node) => node['@id'] === `${origin}/#website` && node['@type'] === 'WebSite'),
    `${route}: missing website entity`,
  );

  if (!['/impressum', '/datenschutz'].includes(route)) {
    const page = nodes.find((node) => node['@id'] === `${origin}${route}#webpage`);
    check(
      page?.url === `${origin}${route}` && page?.isPartOf?.['@id'] === `${origin}/#website`,
      `${route}: missing linked page entity`,
    );
    if (page) stats.linkedPageEntities++;
  }
  if (route !== '/') {
    const breadcrumb = nodes.find((node) => node['@type'] === 'BreadcrumbList');
    check(breadcrumb?.itemListElement?.length > 1, `${route}: missing breadcrumb data`);
    if (breadcrumb) {
      stats.breadcrumbPages++;
      check(
        breadcrumb.itemListElement.every(
          (item, i) => item.position === i + 1 && visible.includes(normalize(item.name)),
        ),
        `${route}: breadcrumb differs from visible navigation`,
      );
    }
  }
  for (const service of nodes.filter((node) => node['@type'] === 'Service')) {
    stats.servicePages++;
    check(service.provider?.['@id'] === business?.['@id'], `${route}: unresolved service provider`);
    check(service.url === `${origin}${route}`, `${route}: wrong service URL`);
    check(
      visible.includes(normalize(service.description)),
      `${route}: service answer differs from visible text`,
    );
    if (/^\/einsatzgebiete\/[^/]+\/[^/]+$/.test(route)) {
      stats.localServicePages++;
      check(
        service.areaServed.length === 1,
        `${route}: local page needs one matching service area`,
      );
      check(
        !nodes.some((node) => node['@type'] === 'FAQPage'),
        `${route}: repeated service FAQ must be marked only on its canonical service page`,
      );
    }
  }
  for (const faq of nodes.filter((node) => node['@type'] === 'FAQPage')) {
    stats.faqPages++;
    for (const question of faq.mainEntity) {
      stats.questions++;
      check(visible.includes(normalize(question.name)), `${route}: hidden FAQ question`);
      check(
        visible.includes(normalize(question.acceptedAnswer.text)),
        `${route}: hidden FAQ answer`,
      );
    }
  }
  for (const article of nodes.filter((node) => node['@type'] === 'Article')) {
    stats.articles++;
    check(
      visible.includes(normalize(article.headline)) &&
        visible.includes(normalize(article.abstract)),
      `${route}: article differs from visible content`,
    );
    check(article.author?.['@id'] === business?.['@id'], `${route}: unsupported article author`);
    check(
      article.image?.length && fs.existsSync(`public${new URL(article.image[0]).pathname}`),
      `${route}: article image missing`,
    );
    check(
      new Set([...main.matchAll(/<h[12][^>]*id="([^"]+)"/g)].map((match) => match[1])).size > 0,
      `${route}: answer heading has no anchor`,
    );
  }
  check(
    !/\b\d+\s*(?:km|Kilometer)\b|Umkreis|Luftlinie/i.test(visible),
    `${route}: public distance wording`,
  );
}
const sitemap = fs.readFileSync(`${root}/sitemap.xml.body`, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
check(!urls.some((url) => /\/danke|\/api\//.test(url)), 'Receipt/private endpoint in sitemap');
check(
  urls.every((url) => (url === origin || url.startsWith(`${origin}/`)) && !url.includes('?')),
  'Noncanonical sitemap URL',
);
for (const route of ['/fragen', '/ratgeber', ...guides.map((guide) => `/ratgeber/${guide.slug}`)])
  check(urls.includes(`${origin}${route}`), `Missing sitemap URL ${route}`);
const robots = fs.readFileSync(`${root}/robots.txt.body`, 'utf8');
check(
  robots.includes('User-Agent: OAI-SearchBot') && robots.includes('Allow: /'),
  'Search crawler access missing',
);
check(!/^Disallow:\s*\/$/m.test(robots), 'Production robots blocks search');
const llms = fs.readFileSync(`${root}/llms.txt.body`, 'utf8');
check(
  llms.includes('info@erledigt-team.de') && llms.includes('keine weiteren Niederlassungen'),
  'Public discovery summary missing verified facts',
);
check(
  !llms.includes('/danke') && !llms.includes('/api/'),
  'Discovery summary exposes private routes',
);
for (const guide of guides) {
  const words =
    guide.sections
      .flatMap((section) => section.paragraphs)
      .join(' ')
      .match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu)?.length || 0;
  check(words >= 300, `${guide.slug}: fewer than 300 editorial words`);
}
check(stats.articles === guides.length, 'Not all guides have Article data');
check(stats.localServicePages === 858, 'Unexpected local service count');
const report = {
  checkedAt: new Date().toISOString(),
  ...stats,
  sitemapUrls: urls.length,
  errors,
  note: 'Technical and content consistency checks; not a ranking or citation prediction.',
};
fs.writeFileSync('docs/aeo-audit.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
assert.equal(errors.length, 0, 'AEO audit failed');
