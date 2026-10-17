import assert from 'node:assert/strict';
import fs from 'node:fs';
import { seasonalServices } from '../src/lib/seasonal-services.ts';
import { businessPages } from '../src/lib/business-pages.ts';

// Only exercise validation on an unconfigured local server; never create test
// leads, email, or tracking rows in the live company's systems.
const base = process.env.AUDIT_URL || 'http://127.0.0.1:3017';
assert.ok(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const health = await (await fetch(`${base}/api/health`)).json();
assert.equal(health.acceptingRequests, false);
const checks = [];
const get = async (path) => {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  return response.text();
};
const paths = ['/geschaeftskunden', ...businessPages.map((p) => `/geschaeftskunden/${p.slug}`), ...seasonalServices.map((s) => `/leistungen/${s.slug}`)];
const sitemap = await get('/sitemap.xml');
for (const path of paths) {
  const html = await get(path);
  assert.ok(html.includes(`href="https://erledigt-team.de${path}"`), `${path}: canonical`);
  assert.ok(sitemap.includes(`https://erledigt-team.de${path}</loc>`), `${path}: sitemap`);
  checks.push({ path, status: 200, canonical: true, inSitemap: true });
}
for (const service of seasonalServices) {
  const html = await get(`/anfrage?leistung=${service.slug}&ort=saterland&objekt=hausverwaltung`);
  assert.ok(html.includes(`value="${service.slug}" selected=""`), `${service.slug}: preselected`);
  assert.ok(html.includes('value="Saterland"'));
  assert.ok(html.includes('selected="">Hausverwaltung</option>'));
  const response = await fetch(`${base}/api/leads`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base },
    body: JSON.stringify({ id: crypto.randomUUID(), service: service.slug, city: 'Saterland', postal_code: '26683', property_type: 'Hausverwaltung', scope: 'Lokaler Validierungstest', frequency: 'Regelmäßig', preferred_date: '', name: 'Lokaler Test', company: '', email: 'test@example.com', phone: '', contact_method: 'E-Mail', message: 'Local test; backend intentionally disabled', privacy: true, website: '', started_at: Date.now() - 10000, analytics_consent: false }),
  });
  assert.equal(response.status, 503, `${service.slug}: should pass validation but refuse an unconfigured backend`);
  checks.push({ service: service.slug, prefilledForm: true, localApi: 503 });
}
const report = { checkedAt: new Date().toISOString(), checks, externalWrites: 0, note: 'Local HTTP validation only. Existing persistence and delivery integration is covered by tests; no test leads were sent to production.' };
fs.writeFileSync('docs/expansion-http-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
