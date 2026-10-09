import test from 'node:test';
import assert from 'node:assert/strict';
import { createReceipt, readReceipt, conversionId, RECEIPT_TTL } from '../src/lib/receipt.ts';
import { renderLeadEmail } from '../src/lib/lead-email.ts';
import { callbackSchema, eventSchema } from '../src/lib/validation.ts';
import { contactEvents } from '../src/lib/contact-events.ts';

const id = 'fc4a81f0-854e-4436-9476-7fdb45721402';
test('thank-you receipts require an untampered signature and expire after thirty minutes', () => {
  const now = Date.now();
  const token = createReceipt(
    { id, service: 'glas-fensterreinigung', city: 'saterland' },
    'secret',
    now,
  );
  assert.equal(readReceipt(token, 'secret', now)?.id, id);
  assert.equal(readReceipt(undefined, 'secret', now), null);
  assert.equal(readReceipt(token, 'wrong-key', now), null);
  assert.equal(readReceipt(`x${token}`, 'secret', now), null);
  assert.equal(readReceipt(`${token}.extra`, 'secret', now), null);
  assert.equal(readReceipt(token, 'secret', now + RECEIPT_TTL * 1000), null);
  assert.throws(() => createReceipt({ id, service: 'beratung' }, ''));
});
test('primary events have stable distinct IDs and GA-compatible names', () => {
  assert.equal(conversionId(id, 'quote'), conversionId(id, 'quote'));
  assert.notEqual(conversionId(id, 'quote'), conversionId(id, 'callback'));
  assert.notEqual(conversionId(id, 'quote'), id);
  assert.equal(new Set(Object.values(contactEvents)).size, 5);
  for (const name of Object.values(contactEvents)) {
    assert.ok(/^[a-z][a-z_]{1,39}$/.test(name));
    assert.ok(
      eventSchema.safeParse({
        id: conversionId(id, 'quote'),
        name,
        path: '/danke',
        session_id: id,
        device: 'mobile',
        consent: 'analytics',
      }).success,
    );
  }
});
test('callback requires a real phone shape and affirmative request consent, not a name', () => {
  const request = {
    id,
    name: '',
    phone: '+49 155 67451482',
    privacy: true,
    website: '',
    started_at: Date.now(),
    analytics_consent: false,
    page_path: '/',
    position: 'contact_dock',
  };
  assert.ok(callbackSchema.safeParse(request).success);
  for (const phone of ['', '123', '-------', 'person@example.com'])
    assert.ok(!callbackSchema.safeParse({ ...request, phone }).success);
  assert.ok(!callbackSchema.safeParse({ ...request, privacy: false }).success);
});
test('HTML notifications escape user content and include readable text and callback details', () => {
  const notification = renderLeadEmail(
    {
      request_type: 'callback',
      created_at: '2026-10-09T12:00:00Z',
      name: '<script>bad()</script>',
      phone: '+49 155 67451482',
      message: '<img src=x onerror=bad()>',
    },
    id,
  );
  assert.match(notification.subject, /Rückruf/);
  assert.match(notification.html, /&lt;script&gt;/);
  assert.ok(!notification.html.includes('<script>'));
  assert.ok(!notification.html.includes('<img src=x'));
  assert.match(notification.html, /width="100%"/);
  assert.match(notification.html, /tel:\+4915567451482/);
  assert.match(notification.text, /\+49 155 67451482/);
  assert.match(notification.text, /FC4A81F0/);
});
