import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const script = fs.readFileSync(
  new URL('../integrations/google-apps-script/Code.gs', import.meta.url),
  'utf8',
);
const id = 'fc4a81f0-854e-4436-9476-7fdb45721402';
function harness(maxRows = 1000, failPrimaryOnce = false) {
  const rows: Record<string, string[][]> = {
    Anfragen: [['headers']],
    Ereignisse: [['headers']],
    Zustellung: [['headers']],
    Kontaktaktionen: [['headers']],
  };
  let opens = 0,
    expanded = 0,
    locked = false;
  const sheet = (name: string) => ({
    getLastRow: () => rows[name].length,
    getMaxRows: () => maxRows,
    insertRowsAfter: (_after: number, amount: number) => {
      expanded += amount;
      maxRows += amount;
    },
    getRange: (row: number, col: number, count: number, _width: number) => ({
      createTextFinder: (value: string) => ({
        matchEntireCell: () => ({
          findNext: () =>
            rows[name].slice(row - 1, row - 1 + count).some((r) => r[col - 1] === value),
        }),
      }),
      setNumberFormat: (format: string) => assert.equal(format, '@'),
      setValues: (values: string[][]) => {
        if (name === 'Kontaktaktionen' && failPrimaryOnce) {
          failPrimaryOnce = false;
          throw new Error('transient_write_failure');
        }
        assert.ok(row <= maxRows);
        rows[name][row - 1] = Array.from(values[0]);
      },
    }),
  });
  const context = vm.createContext({
    LockService: {
      getScriptLock: () => ({
        waitLock: () => {
          locked = true;
        },
        hasLock: () => locked,
        releaseLock: () => {
          locked = false;
        },
      }),
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (key: string) => (key === 'WEBHOOK_TOKEN' ? 'test-secret' : 'book'),
      }),
    },
    SpreadsheetApp: {
      openById: () => {
        opens++;
        return { getSheetByName: sheet };
      },
    },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: (text: string) => ({ setMimeType: () => text }),
    },
  });
  vm.runInContext(script, context);
  return {
    rows,
    send: (payload: Record<string, unknown>) =>
      JSON.parse(context.doPost({ postData: { contents: JSON.stringify(payload) } })),
    opens: () => opens,
    expanded: () => expanded,
  };
}
test('webhook rejects unauthorized requests before opening a spreadsheet', () => {
  const h = harness();
  assert.equal(h.send({ token: 'wrong', kind: 'lead', lead: { id } }).ok, false);
  assert.equal(h.opens(), 0);
});
test('lead retries append once and neutralize spreadsheet formulas', () => {
  const h = harness();
  const payload = {
    token: 'test-secret',
    kind: 'lead',
    lead: { id, name: '=IMPORTXML("test")', phone: '+49123456789' },
  };
  assert.equal(h.send(payload).ok, true);
  assert.equal(h.send(payload).record_id, id);
  assert.equal(h.send(payload).duplicate, true);
  assert.equal(h.rows.Anfragen.length, 2);
  assert.equal(h.rows.Anfragen[1][3], '\'=IMPORTXML("test")');
  assert.equal(h.rows.Anfragen[1][6], "'+49123456789");
  assert.equal(h.rows.Kontaktaktionen.length, 2);
});

test('retry repairs a partial primary-log write without duplicating the request', () => {
  const h = harness(1000, true);
  const payload = {
    token: 'test-secret',
    kind: 'lead',
    lead: { id, request_type: 'callback', phone: '+49123456789' },
  };
  assert.equal(h.send(payload).ok, false);
  assert.equal(h.rows.Anfragen.length, 2);
  assert.equal(h.rows.Kontaktaktionen.length, 1);
  assert.equal(h.send(payload).ok, true);
  assert.equal(h.rows.Anfragen.length, 2);
  assert.equal(h.rows.Anfragen[1][24], 'Rückruf');
  assert.equal(h.rows.Kontaktaktionen[1][2], 'callback_erledigt_team');
});

test('five primary types are logged once; opening, request analytics and refused analytics are excluded', () => {
  const h = harness();
  const nextId = (n: number) => `fc4a81f0-854e-4436-9476-7fdb4572140${n}`;
  for (const [i, request_type] of ['quote', 'callback'].entries()) {
    const lead = { id: nextId(i), request_type };
    h.send({ token: 'test-secret', kind: 'lead', lead });
    h.send({ token: 'test-secret', kind: 'lead', lead });
  }
  const names = [
    'direkt_anrufen_erledigt_team',
    'whatsapp_erledigt_team',
    'email_erledigt_team',
    'callback_erledigt_team',
    'formular_erfolg_erledigt_team',
    'contact_dock_open',
  ];
  names.forEach((name, i) => {
    const event = { id: nextId(i + 2), name, consent: 'analytics', phone: 'private contact' };
    h.send({ token: 'test-secret', kind: 'event', event });
    h.send({ token: 'test-secret', kind: 'event', event });
  });
  h.send({
    token: 'test-secret',
    kind: 'event',
    event: { id: nextId(9), name: names[0], consent: false },
  });
  assert.equal(h.rows.Kontaktaktionen.length, 6);
  assert.equal(new Set(h.rows.Kontaktaktionen.slice(1).map((r) => r[2])).size, 5);
  assert.ok(!JSON.stringify(h.rows.Kontaktaktionen).includes('private contact'));
});
test('event rows exclude contact data even when supplied to the webhook', () => {
  const h = harness();
  h.send({
    token: 'test-secret',
    kind: 'event',
    event: {
      id,
      name: 'page_view',
      path: '/',
      email: 'private@example.com',
      message: 'private message',
    },
  });
  assert.equal(h.rows.Ereignisse.length, 2);
  assert.ok(!h.rows.Ereignisse[1].includes('private@example.com'));
  assert.ok(!h.rows.Ereignisse[1].includes('private message'));
});
test('delivery attempts have persistent deduplication and separate history rows', () => {
  const h = harness();
  const payload = {
    token: 'test-secret',
    kind: 'delivery',
    delivery: { id, key: `${id}:1`, destination: 'email', status: 'pending', attempts: 1 },
  };
  h.send(payload);
  assert.equal(h.send(payload).record_id, `${id}:1`);
  assert.equal(h.send(payload).duplicate, true);
  h.send({
    ...payload,
    delivery: { ...payload.delivery, key: `${id}:2`, attempts: 2, status: 'sent' },
  });
  assert.equal(h.rows.Zustellung.length, 3);
  assert.equal(h.rows.Zustellung[2][3], 'sent');
});
test('a full sheet grows before appending a new event', () => {
  const h = harness(1);
  assert.equal(
    h.send({ token: 'test-secret', kind: 'event', event: { id, name: 'page_view', path: '/' } }).ok,
    true,
  );
  assert.equal(h.expanded(), 500);
  assert.equal(h.rows.Ereignisse.length, 2);
});
