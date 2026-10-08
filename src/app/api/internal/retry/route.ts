import { NextRequest, NextResponse } from 'next/server';
import { retryQueued, secretMatches } from '@/lib/server';
export const maxDuration = 60;
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secretMatches(req.headers.get('authorization') || '', `Bearer ${secret}`))
    return new NextResponse(null, { status: 401 });
  try {
    return NextResponse.json(await retryQueued(40));
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}
