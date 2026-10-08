export function clientAddress(headers: Headers) {
  // Vercel overwrites x-forwarded-for with the connecting client's address.
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export function allowedOrigin(input: {
  origin: string | null;
  requestUrl: string;
  host: string | null;
  forwardedProtocol: string | null;
  configuredUrl?: string;
}) {
  if (!input.origin) return false;
  try {
    const origin = new URL(input.origin);
    if (!['http:', 'https:'].includes(origin.protocol)) return false;
    const request = new URL(input.requestUrl),
      allowed = [request.origin];
    if (input.configuredUrl) allowed.push(new URL(input.configuredUrl).origin);
    // Next's internal bind address can differ from the public Host header.
    const protocol =
      input.forwardedProtocol?.split(',')[0]?.trim() || request.protocol.replace(':', '');
    if (input.host && /^(?:http|https)$/.test(protocol))
      allowed.push(new URL(`${protocol}://${input.host}`).origin);
    return allowed.includes(origin.origin);
  } catch {
    return false;
  }
}
