import { NextRequest, NextResponse, after } from 'next/server';
import { callbackSchema } from '@/lib/validation';
import { db, deliver, isLeadReady, rateLimit, readBody, sameOrigin } from '@/lib/server';
import { conversionId } from '@/lib/receipt';
export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false }, { status: 403 });
  let raw;
  try {
    raw = await readBody(req, 4000);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parsed = callbackSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 422 });
  const value = parsed.data;
  if (value.website || Date.now() - value.started_at < 2000 || value.started_at > Date.now())
    return NextResponse.json({ ok: false }, { status: 422 });
  if (!isLeadReady()) return NextResponse.json({ ok: false }, { status: 503 });
  try {
    if (!(await rateLimit(req, 'lead')))
      return NextResponse.json({ ok: false }, { status: 429, headers: { 'Retry-After': '3600' } });
    const { website, started_at, ...clean } = value;
    void website;
    void started_at;
    if (!value.analytics_consent) {
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
          request_type: 'callback',
          contact_method: 'Telefon',
          service: 'beratung',
          privacy_version: '2026-10-09',
          created_at: new Date().toISOString(),
        },
      }),
    });
    after(() => deliver(value.id));
    return NextResponse.json(
      { ok: true, id: value.id, event_id: conversionId(value.id, 'callback') },
      { status: 201, headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
