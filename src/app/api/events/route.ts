import { NextRequest, NextResponse, after } from 'next/server';
import { eventSchema } from '@/lib/validation';
import { db, deliver, isConfigured, rateLimit, readBody, sameOrigin } from '@/lib/server';
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return new NextResponse(null, { status: 403 });
  if (!isConfigured()) return new NextResponse(null, { status: 503 });
  try {
    const parsed = eventSchema.safeParse(await readBody(req, 4000));
    if (!parsed.success) return new NextResponse(null, { status: 422 });
    if (!(await rateLimit(req, 'event'))) return new NextResponse(null, { status: 429 });
    const event = { ...parsed.data, created_at: new Date().toISOString() };
    await db('rpc/save_event', { method: 'POST', body: JSON.stringify({ p_event: event }) });
    after(() => deliver(event.id));
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
