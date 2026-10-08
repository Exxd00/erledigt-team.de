import test from 'node:test';
import assert from 'node:assert/strict';
import { leadSchema, eventSchema, neutralizeSheetCell } from '../src/lib/validation.ts';
const valid = {
  id: 'fc4a81f0-854e-4436-9476-7fdb45721402',
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
  message: 'Test',
  privacy: true,
  website: '',
  started_at: Date.now() - 5000,
  analytics_consent: false,
};
test('requires an explicit privacy acknowledgement and selected contact channel', () => {
  assert.equal(leadSchema.safeParse(valid).success, true);
  assert.equal(leadSchema.safeParse({ ...valid, privacy: false }).success, false);
  assert.equal(leadSchema.safeParse({ ...valid, email: '' }).success, false);
  assert.equal(
    leadSchema.safeParse({ ...valid, contact_method: 'Telefon', phone: '' }).success,
    false,
  );
});
test('rejects unexpected services, oversized requests and invalid postcodes', () => {
  assert.equal(leadSchema.safeParse({ ...valid, service: 'untrusted' }).success, false);
  assert.equal(leadSchema.safeParse({ ...valid, message: 'x'.repeat(3001) }).success, false);
  assert.equal(leadSchema.safeParse({ ...valid, postal_code: '26' }).success, false);
});
test('analytics strips unknown personal fields and rejects URLs with queries', () => {
  const event = {
    id: valid.id,
    name: 'page_view',
    path: '/leistungen',
    session_id: valid.id,
    device: 'mobile',
    consent: 'analytics',
    email: 'private@example.com',
  };
  const parsed = eventSchema.parse(event);
  assert.equal('email' in parsed, false);
  assert.equal(
    eventSchema.safeParse({ ...event, path: '/anfrage?email=private@example.com' }).success,
    false,
  );
  assert.equal(eventSchema.safeParse({ ...event, consent: 'necessary' }).success, false);
});
test('spreadsheet values cannot become executable formulas', () => {
  for (const cell of ['=IMPORTXML("x")', '+123', '-1+2', '@SUM(A1)'])
    assert.ok(neutralizeSheetCell(cell).startsWith("'"));
  assert.equal(neutralizeSheetCell('Saterland'), 'Saterland');
});
test('rejects impossible calendar dates and phone numbers without digits', () => {
  assert.equal(leadSchema.safeParse({ ...valid, preferred_date: '2026-02-30' }).success, false);
  assert.equal(leadSchema.safeParse({ ...valid, preferred_date: '2026-13-01' }).success, false);
  assert.equal(
    leadSchema.safeParse({ ...valid, contact_method: 'Telefon', phone: '-------' }).success,
    false,
  );
  assert.equal(
    leadSchema.safeParse({
      ...valid,
      preferred_date: '2026-11-01',
      contact_method: 'Telefon',
      phone: '+49 155 67451482',
    }).success,
    true,
  );
});
