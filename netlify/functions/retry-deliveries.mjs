/** Wake the existing durable outbox; delivery itself runs in Next's after(). */
export default async function retryDeliveries() {
  const secret = process.env.CRON_SECRET;
  if (process.env.NEXT_PUBLIC_LAUNCH_READY !== 'true' || !secret)
    return new Response(null, { status: 204 });

  // URL is a read-only Netlify runtime variable for this site's primary address.
  const site = new URL(process.env.URL || '');
  if (site.protocol !== 'https:' || site.username || site.password)
    throw new Error('retry_url_invalid');

  const response = await fetch(new URL('/api/internal/retry', site), {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}` },
    redirect: 'error',
    signal: AbortSignal.timeout(15000),
  });
  if (response.status !== 202) throw new Error('retry_not_accepted');
  return new Response(null, { status: 204 });
}

export const config = { schedule: '*/5 * * * *' };
