import test from 'node:test';
import assert from 'node:assert/strict';
import retryDeliveries from '../netlify/functions/retry-deliveries.mjs';

function setEnv(t: import('node:test').TestContext, values: Record<string, string>) {
  for (const [key, value] of Object.entries(values)) {
    const previous = process.env[key];
    process.env[key] = value;
    t.after(() => {
      if (previous === undefined) delete process.env[key];
      else process.env[key] = previous;
    });
  }
}

test('scheduled retry waits for launch and never runs without its secret', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => {
    throw new Error('unexpected_request');
  });
  setEnv(t, { NEXT_PUBLIC_LAUNCH_READY: 'false', CRON_SECRET: '' });
  assert.equal((await retryDeliveries()).status, 204);
  process.env.NEXT_PUBLIC_LAUNCH_READY = 'true';
  assert.equal((await retryDeliveries()).status, 204);
});

test('scheduled retry sends the secret only to the configured HTTPS site and disables redirects', async (t) => {
  setEnv(t, {
    NEXT_PUBLIC_LAUNCH_READY: 'true',
    CRON_SECRET: 'test-secret',
    URL: 'https://test-erledigt.netlify.app',
  });
  const call = t.mock.method(
    globalThis,
    'fetch',
    async (url: string | URL | Request, init?: RequestInit) => {
      assert.equal(String(url), 'https://test-erledigt.netlify.app/api/internal/retry');
      assert.equal(init?.method, 'POST');
      assert.equal(new Headers(init?.headers).get('authorization'), 'Bearer test-secret');
      assert.equal(init?.redirect, 'error');
      assert.ok(init?.signal instanceof AbortSignal);
      return new Response('{"accepted":true}', { status: 202 });
    },
  );
  assert.equal((await retryDeliveries()).status, 204);
  assert.equal(call.mock.callCount(), 1);
});

test('scheduler reports rejected work instead of a successful delivery', async (t) => {
  setEnv(t, {
    NEXT_PUBLIC_LAUNCH_READY: 'true',
    CRON_SECRET: 'test-secret',
    URL: 'https://test-erledigt.netlify.app',
  });
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }));
  await assert.rejects(retryDeliveries(), /retry_not_accepted/);
  process.env.URL = 'http://test-erledigt.netlify.app';
  await assert.rejects(retryDeliveries(), /retry_url_invalid/);
});
