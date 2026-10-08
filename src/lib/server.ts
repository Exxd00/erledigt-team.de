import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest } from 'next/server';
import { allowedOrigin } from './request-policy';
export function isConfigured() {
  return !!(
    process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.RATE_LIMIT_SECRET
  );
}
export function isLeadReady() {
  return (
    isConfigured() &&
    process.env.NEXT_PUBLIC_LAUNCH_READY === 'true' &&
    !!(
      process.env.SHEETS_WEBHOOK_URL &&
      process.env.SHEETS_WEBHOOK_TOKEN &&
      process.env.RESEND_API_KEY
    )
  );
}
export async function db(path: string, init: RequestInit = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('database_not_configured');
  const r = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(6000),
  });
  if (!r.ok) throw new Error(`database_${r.status}`);
  return r.status === 204 ? null : r.json();
}
export function sameOrigin(req: NextRequest) {
  return allowedOrigin({
    origin: req.headers.get('origin'),
    requestUrl: req.url,
    host: req.headers.get('host'),
    forwardedProtocol: req.headers.get('x-forwarded-proto'),
    configuredUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
}
export async function readBody(req: NextRequest, max = 14000) {
  const reader = req.body?.getReader();
  if (!reader) throw new Error('empty_body');
  let bytes = 0;
  let chunks = '';
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > max) {
      await reader.cancel();
      throw new Error('payload_too_large');
    }
    chunks += decoder.decode(value, { stream: true });
  }
  return JSON.parse(chunks + decoder.decode());
}
export async function rateLimit(req: NextRequest, kind: 'lead' | 'event') {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const day = new Date().toISOString().slice(0, 10);
  const hash = createHmac('sha256', process.env.RATE_LIMIT_SECRET!)
    .update(`${day}:${ip}:${kind}`)
    .digest('hex');
  return (await db('rpc/check_rate_limit', {
    method: 'POST',
    body: JSON.stringify({
      p_key: hash,
      p_limit: kind === 'lead' ? 6 : 180,
      p_window_seconds: kind === 'lead' ? 3600 : 600,
    }),
  })) as boolean;
}
export function secretMatches(received: string, expected: string) {
  const a = Buffer.from(received),
    b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
async function sheetPost(payload: Record<string, unknown>) {
  if (!process.env.SHEETS_WEBHOOK_URL || !process.env.SHEETS_WEBHOOK_TOKEN)
    throw new Error('sheet_not_configured');
  const r = await fetch(process.env.SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: process.env.SHEETS_WEBHOOK_TOKEN, ...payload }),
    signal: AbortSignal.timeout(8000),
  });
  const body = await r.json();
  if (!r.ok || body.ok !== true) throw new Error('sheet_delivery_failed');
}
export async function deliver(id: string) {
  const jobs = (await db(
    `delivery_outbox?entity_id=eq.${encodeURIComponent(id)}&status=eq.pending&select=*`,
  )) as {
    id: string;
    entity_id: string;
    kind: string;
    payload: Record<string, unknown>;
    attempts: number;
  }[];
  await Promise.all(
    jobs.map(async (job) => {
      let claimed = false;
      let deliveryStatus = 'pending';
      let errorCode: string | null = null;
      let sentAt: string | null = null;
      try {
        claimed = await db('rpc/claim_delivery', {
          method: 'POST',
          body: JSON.stringify({ p_id: job.id }),
        });
        if (!claimed) return;
        if (job.kind === 'sheet') {
          await sheetPost(job.payload);
        } else {
          if (!process.env.RESEND_API_KEY) throw new Error('email_not_configured');
          const lead = job.payload.lead as Record<string, unknown>;
          const text = [
            'Neue Anfrage über erledigt-team.de',
            `Referenz: ${id}`,
            `Name: ${lead.name}`,
            `Firma: ${lead.company || '–'}`,
            `Leistung: ${lead.service}`,
            `Ort: ${lead.postal_code} ${lead.city}`,
            `Objekt: ${lead.property_type}`,
            `Umfang: ${lead.scope || 'Noch offen'}`,
            `Rhythmus: ${lead.frequency}`,
            `Wunschtermin: ${lead.preferred_date || 'Nach Absprache'}`,
            `Kontaktweg: ${lead.contact_method}`,
            `E-Mail: ${lead.email || '–'}`,
            `Telefon: ${lead.phone || '–'}`,
            `Nachricht: ${lead.message || '–'}`,
          ].join('\n');
          const r = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
              'Idempotency-Key': job.id,
            },
            body: JSON.stringify({
              from: process.env.LEAD_EMAIL_FROM || 'ERLEDIGT TEAM <info@erledigt-team.de>',
              to: [process.env.LEAD_EMAIL_TO || 'info@erledigt-team.de'],
              subject: `Neue Reinigungsanfrage · ${id.slice(0, 8).toUpperCase()}`,
              text,
              ...(lead.email ? { reply_to: lead.email } : {}),
            }),
            signal: AbortSignal.timeout(8000),
          });
          if (!r.ok) throw new Error('email_delivery_failed');
        }
        sentAt = new Date().toISOString();
        deliveryStatus = 'sent';
        await db(`delivery_outbox?id=eq.${job.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'sent', sent_at: sentAt, last_error: null }),
        });
      } catch (error) {
        errorCode =
          error instanceof Error && /^[a-z_]+$/.test(error.message)
            ? error.message
            : 'delivery_failed';
        // Never release a job owned by another worker. Expired leases recover separately.
        if (claimed && deliveryStatus !== 'sent')
          await db(`delivery_outbox?id=eq.${job.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'pending', last_error: errorCode }),
          }).catch(() => {});
      }
      if (claimed && job.payload.kind === 'lead')
        await sheetPost({
          kind: 'delivery',
          delivery: {
            id: job.entity_id,
            key: `${job.id}:${job.attempts + 1}`,
            created_at: new Date().toISOString(),
            destination: job.kind,
            status: deliveryStatus,
            attempts: job.attempts + 1,
            error: errorCode || '',
            sent_at: sentAt || '',
          },
        }).catch(() => {});
    }),
  );
}
export async function retryQueued(limit = 20) {
  const started = Date.now();
  await db('rpc/release_stale_deliveries', { method: 'POST', body: '{}' });
  const rows = (await db(
    `delivery_outbox?status=eq.pending&select=entity_id&order=created_at.asc&limit=${limit}`,
  )) as { entity_id: string }[];
  const ids = [...new Set(rows.map((x) => x.entity_id))];
  let processed = 0;
  for (let i = 0; i < ids.length && Date.now() - started < 18000; i += 4) {
    const batch = ids.slice(i, i + 4);
    await Promise.allSettled(batch.map(deliver));
    processed += batch.length;
  }
  return { processed, selected: ids.length };
}
