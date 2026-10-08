import { NextResponse } from 'next/server';
import { db, isLeadReady } from '@/lib/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  let acceptingRequests = false;
  if (isLeadReady()) {
    try {
      await db('leads?select=id&limit=0');
      acceptingRequests = true;
    } catch {}
  }
  return NextResponse.json({ acceptingRequests }, { headers: { 'Cache-Control': 'no-store' } });
}
