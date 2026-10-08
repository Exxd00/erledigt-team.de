import test from 'node:test';
import assert from 'node:assert/strict';
import { allowedOrigin, clientAddress } from '../src/lib/request-policy.ts';

test('rate limiting uses the provider forwarded address and handles its absence', () => {
  assert.equal(clientAddress(new Headers({ 'x-forwarded-for': '198.51.100.9' })), '198.51.100.9');
  assert.equal(clientAddress(new Headers()), 'unknown');
});
const local = {
  origin: 'http://localhost:3000',
  requestUrl: 'http://0.0.0.0:3000/api/leads',
  host: 'localhost:3000',
  forwardedProtocol: 'http',
};
test('accepts the public local Host when Next uses an internal bind address', () =>
  assert.equal(allowedOrigin(local), true));
test('accepts an HTTPS preview behind a reverse proxy', () =>
  assert.equal(
    allowedOrigin({
      ...local,
      origin: 'https://preview.vercel.app',
      host: 'preview.vercel.app',
      forwardedProtocol: 'https',
    }),
    true,
  ));
test('rejects foreign, missing and opaque origins', () => {
  for (const origin of [
    'https://example.invalid',
    null,
    'null',
    'file:///tmp/test',
    'javascript:alert(1)',
  ])
    assert.equal(allowedOrigin({ ...local, origin }), false);
});
test('compares the entire configured origin, not a hostname suffix', () => {
  const input = { ...local, configuredUrl: 'https://erledigt-team.de/' };
  assert.equal(allowedOrigin({ ...input, origin: 'https://erledigt-team.de' }), true);
  assert.equal(
    allowedOrigin({ ...input, origin: 'https://erledigt-team.de.example.invalid' }),
    false,
  );
});
