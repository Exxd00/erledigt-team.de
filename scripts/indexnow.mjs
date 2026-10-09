import fs from 'node:fs';
import assert from 'node:assert/strict';

// Public, host-scoped discovery proof. This is not an account/API access secret.
const origin = 'https://erledigt-team.de';
const key = fs.readFileSync(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8').trim();
assert.match(key, /^[a-zA-Z0-9-]{8,128}$/);
const keyLocation = `${origin}/indexnow-key.txt`;
const get = async (url) => {
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${new URL(url).pathname}: expected HTTP 200`);
  return response.text();
};
const [liveKey, xml, robots] = await Promise.all([
  get(keyLocation),
  get(`${origin}/sitemap.xml`),
  get(`${origin}/robots.txt`),
]);
assert.equal(liveKey.trim(), key, 'Deploy the ownership file before submitting URLs');
assert.ok(!/^Disallow:\s*\/$/m.test(robots), 'Do not submit a site with crawling disabled');
const urlList = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))];
assert.ok(urlList.length > 0 && urlList.length <= 10000);
for (const value of urlList) {
  const url = new URL(value);
  assert.equal(url.origin, origin);
  assert.equal(url.search + url.hash, '');
  assert.ok(!/^\/(?:danke|api)(?:\/|$)/.test(url.pathname), 'Never submit receipts or APIs');
}
assert.ok(
  urlList.includes(`${origin}/fragen`) && urlList.includes(`${origin}/ratgeber`),
  'New pages must be live first',
);
if (!process.argv.includes('--submit')) {
  console.log(
    JSON.stringify({
      mode: 'dry-run',
      host: new URL(origin).host,
      urls: urlList.length,
      note: 'Add --submit after verifying the production deployment.',
    }),
  );
} else {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(30000),
  });
  const report = {
    submittedAt: new Date().toISOString(),
    host: new URL(origin).host,
    urls: urlList.length,
    status: response.status,
    meaning:
      response.status === 200
        ? 'URLs received; indexing and citations are not guaranteed.'
        : response.status === 202
          ? 'URLs received; ownership validation is pending.'
          : 'Submission not accepted. Inspect the response before retrying.',
  };
  fs.writeFileSync(
    new URL('../docs/indexnow-submission.json', import.meta.url),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.log(JSON.stringify(report));
  assert.ok([200, 202].includes(response.status), `IndexNow returned ${response.status}`);
}
