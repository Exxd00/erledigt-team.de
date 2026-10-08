import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.AUDIT_URL || 'http://localhost:3000';
const findings = [];
async function check(name, path, init, status) {
  const r = await fetch(base + path, init);
  assert.equal(r.status, status, name);
  findings.push({ name, status: r.status });
  return r;
}
const health = await check('Unconfigured form is visibly unavailable', '/api/health', {}, 200);
assert.equal((await health.json()).acceptingRequests, false);
const lead = {
  id: crypto.randomUUID(),
  service: 'glas-fensterreinigung',
  city: 'Saterland',
  postal_code: '26683',
  property_type: 'Privathaushalt',
  scope: '12 Fenster',
  frequency: 'Einmalig',
  preferred_date: '',
  name: 'Testperson',
  company: '',
  email: 'test@example.com',
  phone: '',
  contact_method: 'E-Mail',
  message: 'Local validation test',
  privacy: true,
  website: '',
  started_at: Date.now() - 5000,
  analytics_consent: false,
};
const post = (payload, origin = base) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: origin },
  body: JSON.stringify(payload),
});
await check('Foreign origin rejected', '/api/leads', post(lead, 'https://example.invalid'), 403);
await check('Invalid postcode rejected', '/api/leads', post({ ...lead, postal_code: '26' }), 422);
await check('Honeypot rejected', '/api/leads', post({ ...lead, website: 'bot' }), 422);
await check(
  'Oversized request rejected',
  '/api/leads',
  post({ ...lead, message: 'x'.repeat(15000) }),
  400,
);
await check('No fake success without backend configuration', '/api/leads', post(lead), 503);
await check('Retry endpoint rejects an unauthenticated request', '/api/internal/retry', {}, 401);
await check(
  'Async retry rejects an unauthenticated request',
  '/api/internal/retry',
  { method: 'POST' },
  401,
);
await check('Unknown city returns 404', '/einsatzgebiete/not-a-real-city', {}, 404);
const form = await check(
  'Prefilled form renders',
  '/anfrage?leistung=glas-fensterreinigung&ort=saterland',
  {},
  200,
);
const html = await form.text();
assert.ok(html.includes('value="Saterland"'));
assert.ok(
  /value="glas-fensterreinigung"[^>]*selected|selected=""[^>]*value="glas-fensterreinigung"/.test(
    html,
  ),
);
const robots = await (await check('Preview robots responds', '/robots.txt', {}, 200)).text();
assert.ok(robots.includes('Disallow: /'));
fs.writeFileSync(
  'docs/http-audit.json',
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      base,
      findings,
      limitations:
        'HTTP checks only. Browser interaction and real Supabase/Sheets/Resend delivery require connected services.',
    },
    null,
    2,
  ),
);
console.log(JSON.stringify(findings, null, 2));
