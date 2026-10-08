import { after, NextRequest, NextResponse } from 'next/server';
import { isLeadReady, retryQueued, secretMatches } from '@/lib/server';
export const maxDuration = 60;
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secretMatches(req.headers.get('authorization') || '', `Bearer ${secret}`))
    return new NextResponse(null, { status: 401 });
  if (!isLeadReady()) return new NextResponse(null, { status: 503 });
  try {
    return NextResponse.json(await retryQueued(40));
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}

// An authenticated manual retry can return immediately while Vercel finishes work.
// Acceptance is not delivery confirmation; the outbox is the delivery status source.
export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secretMatches(req.headers.get('authorization') || '', `Bearer ${secret}`))
    return new NextResponse(null, { status: 401 });
  if (!isLeadReady()) return new NextResponse(null, { status: 503 });
  after(async () => {
    try {
      await retryQueued(40);
    } catch {
      // Keep logs free of request data, provider responses and credentials.
      console.error('delivery_retry_failed');
    }
  });
  return NextResponse.json({ accepted: true }, { status: 202 });
}
