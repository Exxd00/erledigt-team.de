import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const RECEIPT_COOKIE = 'erledigt-receipt';
export const RECEIPT_TTL = 30 * 60;
type Receipt = { id: string; expires: number; service: string; city?: string };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function conversionId(id: string, kind: 'quote' | 'callback') {
  const hash = createHash('sha256').update(`erledigt:${kind}:${id}`).digest('hex');
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-8${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}
export function createReceipt(data: Omit<Receipt, 'expires'>, secret: string, now = Date.now()) {
  if (!secret) throw new Error('receipt_not_configured');
  const payload = Buffer.from(
    JSON.stringify({ ...data, expires: now + RECEIPT_TTL * 1000 }),
  ).toString('base64url');
  return `${payload}.${createHmac('sha256', secret).update(payload).digest('base64url')}`;
}
export function readReceipt(
  token: string | undefined,
  secret: string,
  now = Date.now(),
): Receipt | null {
  if (!token || token.length > 2000 || !secret) return null;
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return null;
    const expected = createHmac('sha256', secret).update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (
      !uuid.test(data.id) ||
      !Number.isFinite(data.expires) ||
      data.expires <= now ||
      data.expires > now + RECEIPT_TTL * 1000 ||
      !/^[a-z-]{1,80}$/.test(data.service) ||
      (data.city !== undefined && !/^[a-z-]{1,80}$/.test(data.city))
    )
      return null;
    return data;
  } catch {
    return null;
  }
}
