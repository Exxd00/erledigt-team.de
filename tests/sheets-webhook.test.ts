import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const script = fs.readFileSync(
  new URL('../integrations/google-apps-script/Code.gs', import.meta.url),
  'utf8',
);
const id = 'fc4a81f0-854e-4436-9476-7fdb45721402';
function harness(maxRows = 1000) {
  const rows: Record<string, string[][]> = {
    Anfragen: [['headers']],
    Ereignisse: [['headers']],
    Zustellung: [['headers']],
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
