import { NextRequest, NextResponse, after } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { db, deliver, isLeadReady, rateLimit, readBody, sameOrigin } from '@/lib/server';
import { createReceipt, RECEIPT_COOKIE, RECEIPT_TTL } from '@/lib/receipt';
import { cityOptions } from '@/lib/content';
export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: 'origin' }, { status: 403 });
  let raw;
  try {
    raw = await readBody(req);
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }
  const result = leadSchema.safeParse(raw);
  if (!result.success)
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  const lead = result.data;
  if (lead.website || Date.now() - lead.started_at < 2000 || lead.started_at > Date.now())
    return NextResponse.json({ ok: false, error: 'invalid_request' }, { status: 422 });
  if (!isLeadReady())
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 });
  try {
    if (!(await rateLimit(req, 'lead')))
      return NextResponse.json(
        { ok: false, error: 'rate_limit' },
        { status: 429, headers: { 'Retry-After': '3600' } },
      );
    const { website, started_at, ...clean } = lead;
    void website;
    void started_at;
    if (!lead.analytics_consent) {
      delete clean.source;
      delete clean.medium;
      delete clean.campaign;
      delete clean.landing_page;
    }
    await db('rpc/save_lead', {
      method: 'POST',
      body: JSON.stringify({
        p_lead: {
          ...clean,
          request_type: 'quote',
          page_path: '/anfrage',
          privacy_version: '2026-10-09',
          created_at: new Date().toISOString(),
        },
      }),
    });
    after(() => deliver(lead.id));
    const response = NextResponse.json(
      { ok: true, id: lead.id },
      { status: 201, headers: { 'Cache-Control': 'no-store' } },
    );
    const city = cityOptions.find(
      (c) => c.name.toLocaleLowerCase('de-DE') === lead.city.toLocaleLowerCase('de-DE'),
    )?.slug;
    response.cookies.set(
      RECEIPT_COOKIE,
      createReceipt({ id: lead.id, service: lead.service, city }, process.env.RATE_LIMIT_SECRET!),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/danke',
        maxAge: RECEIPT_TTL,
      },
    );
    return response;
  } catch {
    return NextResponse.json({ ok: false, error: 'save_failed' }, { status: 503 });
  }
}
