'use client';
export type EventName =
  | 'page_view'
  | 'cta_click'
  | 'phone_click'
  | 'email_click'
  | 'service_select'
  | 'city_select'
  | 'filter_used'
  | 'form_start'
  | 'form_step'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'interaction'
  | 'scroll_depth'
  | 'consent_update';
type EventDetails = {
  service?: string;
  city?: string;
  position?: string;
  step?: string;
  lead_id?: string;
};
export const CONSENT_KEY = 'erledigt-consent-v1';
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
export function startGoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (
    !id ||
    !/^G-[A-Z0-9]+$/.test(id) ||
    !hasAnalyticsConsent() ||
    document.getElementById('ga-script')
  )
    return;
  const w = window as AnalyticsWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer?.push(arguments);
  };
  w.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  w.gtag('js', new Date());
  w.gtag('config', id, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname,
    page_referrer: document.referrer ? new URL(document.referrer).origin : '',
  });
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.async = true;
  document.head.appendChild(script);
}
export function revokeAnalytics() {
  const w = window as AnalyticsWindow;
  w.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((n) => /^_ga(?:_|$)/.test(n));
  for (const name of names) {
    document.cookie = `${name}=;Max-Age=0;path=/`;
    const parts = location.hostname.split('.');
    for (let i = 0; i < parts.length - 1; i++)
      document.cookie = `${name}=;Max-Age=0;path=/;domain=.${parts.slice(i).join('.')}`;
  }
}
export function hasAnalyticsConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'analytics';
  } catch {
    return false;
  }
}
export function attribution() {
  if (!hasAnalyticsConsent()) return {};
  try {
    return JSON.parse(sessionStorage.getItem('erledigt-attribution') || '{}') as Record<
      string,
      string
    >;
  } catch {
    return {};
  }
}
export function track(name: EventName, details: EventDetails = {}) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  try {
    startGoogleAnalytics();
    let session = sessionStorage.getItem('erledigt-session');
    if (!session) {
      session = crypto.randomUUID();
      sessionStorage.setItem('erledigt-session', session);
    }
    const payload = {
      id: crypto.randomUUID(),
      name,
      path: location.pathname,
      session_id: session,
      device: innerWidth < 768 ? 'mobile' : innerWidth < 1100 ? 'tablet' : 'desktop',
      ...attribution(),
      ...details,
      consent: 'analytics',
    };
    void fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
    const w = window as Window & { gtag?: (...args: unknown[]) => void };
    w.gtag?.('event', name, {
      ...details,
      page_path: location.pathname,
      page_location: location.origin + location.pathname,
      page_referrer: document.referrer ? new URL(document.referrer).origin : '',
    });
  } catch {
    /* The main journey never depends on analytics. */
  }
}
export function captureAttribution() {
  if (!hasAnalyticsConsent()) return;
  try {
    if (sessionStorage.getItem('erledigt-attribution')) return;
    const q = new URLSearchParams(location.search);
    const safe = (v: string | null) => (v && /^[\p{L}\p{N}_ .-]{1,80}$/u.test(v) ? v : '');
    let source = safe(q.get('utm_source'));
    if (!source && document.referrer) {
      try {
        source = new URL(document.referrer).hostname;
      } catch {}
    }
    sessionStorage.setItem(
      'erledigt-attribution',
      JSON.stringify({
        source: source || 'direct',
        medium: safe(q.get('utm_medium')),
        campaign: safe(q.get('utm_campaign')),
        landing_page: location.pathname,
      }),
    );
  } catch {}
}
