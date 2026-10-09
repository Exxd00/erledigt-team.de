'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from './Icon';
import { leadSchema, type LeadInput } from '@/lib/validation';
import { attribution, hasAnalyticsConsent, track } from '@/lib/tracking';
import { site, type Service, type City } from '@/lib/site';
type Fields = Omit<LeadInput, 'id' | 'started_at' | 'analytics_consent' | 'privacy'> & {
  privacy: boolean;
};
export function LeadForm({
  services,
  cities,
  defaultService = '',
  defaultCity = '',
}: {
  services: Pick<Service, 'slug' | 'name'>[];
  cities: Pick<City, 'slug' | 'name'>[];
  defaultService?: string;
  defaultCity?: string;
}) {
  const router = useRouter();
  const service = services.find((s) => s.slug === defaultService);
  const city = cities.find((c) => c.slug === defaultCity);
  const [v, setV] = useState<Fields>({
    service: (service?.slug || 'beratung') as Fields['service'],
    city: city?.name || '',
    postal_code: city?.slug === 'saterland' ? '26683' : '',
    property_type: 'Privathaushalt',
    scope: '',
    frequency: 'Noch offen',
    preferred_date: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    contact_method: 'E-Mail',
    message: '',
    privacy: false,
    website: '',
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');
  const [serverError, setServerError] = useState('');
  const [accepting, setAccepting] = useState<boolean | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useRef('');
  const started = useRef(0);
  const touched = useRef(false);
  // Only a known public city slug reaches analytics, never the user's free text.
  const analyticsCity = cities.find(
    (c) => c.name.toLocaleLowerCase('de-DE') === v.city.trim().toLocaleLowerCase('de-DE'),
  )?.slug;
  useEffect(() => {
    id.current = crypto.randomUUID();
    started.current = Date.now();
    void fetch('/api/health')
      .then((r) => r.json())
      .then((d) => setAccepting(d.acceptingRequests === true))
      .catch(() => setAccepting(null));
  }, []);
  const set = (k: keyof Fields, val: string | boolean) => {
    setV((x) => ({ ...x, [k]: val }));
    setErrors((x) => ({ ...x, [k]: '' }));
    if (!touched.current) {
      track('form_start', { service: v.service, city: analyticsCity });
      touched.current = true;
    }
  };
  const validate = (current: number) => {
    const result = leadSchema.safeParse({
      ...v,
      // Consent is requested only on the review step. An unfinished literal field
      // must not prevent Zod's contact-channel refinement on earlier steps.
      privacy: current < 2 ? true : v.privacy,
      id: id.current,
      started_at: started.current,
      analytics_consent: hasAnalyticsConsent(),
    });
    const relevant =
      current === 0
        ? [
            'service',
            'city',
            'postal_code',
            'property_type',
            'scope',
            'frequency',
            'preferred_date',
          ]
        : current === 1
          ? ['name', 'email', 'phone', 'contact_method', 'company', 'message']
          : Object.keys(v);
    const next: Record<string, string> = {};
    if (!result.success)
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (relevant.includes(key))
          next[key] =
            key === 'privacy'
              ? 'Bitte bestätigen Sie die Datenschutzhinweise.'
              : key === 'postal_code'
                ? 'Bitte eine fünfstellige Postleitzahl eingeben.'
                : key === 'email'
                  ? 'Bitte eine gültige E-Mail-Adresse eingeben.'
                  : key === 'name'
                    ? 'Bitte Ihren Namen angeben.'
                    : key === 'city'
                      ? 'Bitte den Einsatzort angeben.'
                      : issue.message.startsWith('Bitte')
                        ? issue.message
                        : 'Bitte prüfen Sie diese Angabe.';
      }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) setTimeout(() => document.getElementById(first)?.focus(), 0);
    return !first;
  };
  const move = (n: number) => {
    setStep(n);
    track('form_step', { step: String(n + 1), service: v.service, city: analyticsCity });
    setTimeout(() => heading.current?.focus(), 0);
  };
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    if (step < 2) {
      if (validate(step)) move(step + 1);
      return;
    }
    if (!validate(2)) return;
    setStatus('sending');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...v,
          id: id.current,
          started_at: started.current,
          analytics_consent: hasAnalyticsConsent(),
          ...attribution(),
        }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || !data.ok)
        throw new Error(
          response.status === 429
            ? 'Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.'
            : response.status === 503
              ? 'Die Speicherung konnte gerade nicht bestätigt werden. Bitte versuchen Sie es erneut; dieselbe Anfrage wird nicht doppelt gespeichert. Alternativ erreichen Sie uns telefonisch oder per E-Mail.'
              : 'Die Anfrage konnte nicht bestätigt werden. Bitte versuchen Sie es erneut; dieselbe Anfrage wird nicht doppelt gespeichert.',
        );
      router.replace('/danke');
    } catch (err) {
      setStatus('idle');
      setServerError(
        err instanceof Error && err.name !== 'TimeoutError'
          ? err.message
          : 'Die Verbindung hat zu lange gedauert. Bitte erneut versuchen; Ihre Anfrage wird nicht doppelt gespeichert.',
      );
      track('form_submit_error', { service: v.service, city: analyticsCity });
    }
  }
  const field = (key: keyof Fields, label: string, type = 'text', hint = '', required = false) => (
    <div className={`field ${key === 'message' ? 'full' : ''}`}>
      <label htmlFor={key}>
        {label}
        {required ? ' *' : ''}
      </label>
      {key === 'message' ? (
        <textarea
          id={key}
          value={String(v[key])}
          onChange={(e) => set(key, e.target.value)}
          maxLength={3000}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : undefined}
        />
      ) : (
        <input
          id={key}
          name={key}
          type={type}
          autoComplete={
            (
              {
                name: 'name',
                email: 'email',
                phone: 'tel',
                company: 'organization',
                postal_code: 'postal-code',
                city: 'address-level2',
              } as Record<string, string>
            )[key]
          }
          inputMode={key === 'postal_code' ? 'numeric' : undefined}
          value={String(v[key])}
          onChange={(e) => set(key, e.target.value)}
          maxLength={key === 'postal_code' ? 5 : key === 'email' ? 254 : 160}
          aria-required={required}
          aria-invalid={!!errors[key]}
          aria-describedby={errors[key] ? `${key}-error` : hint ? `${key}-hint` : undefined}
        />
      )}
      {hint && <small id={`${key}-hint`}>{hint}</small>}
      {errors[key] && (
        <p id={`${key}-error`} className="field-error">
          {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <ol className="form-progress" aria-label="Fortschritt">
        {['Ihr Objekt', 'Ihr Kontakt', 'Prüfen & senden'].map((t, i) => (
          <li
            key={t}
            className={i <= step ? 'active' : ''}
            aria-current={i === step ? 'step' : undefined}
          >
            {i + 1}. {t}
          </li>
        ))}
      </ol>
      <h2 ref={heading} tabIndex={-1}>
        {
          [
            'Was dürfen wir für Sie reinigen?',
            'Wie erreichen wir Sie?',
            'Alles richtig? Dann kann es losgehen.',
          ][step]
        }
      </h2>
      <p className="form-subtitle">
        {
          [
            'Die wichtigsten Angaben zuerst. Details klären wir gemeinsam.',
            'Wir verwenden Ihre Angaben zur Bearbeitung Ihrer Anfrage.',
            'Ihre Anfrage ist unverbindlich. Prüfen Sie Ihre Angaben vor dem Senden.',
          ][step]
        }
      </p>
      {accepting === false && (
        <div className="notice">
          Das Onlineformular wird derzeit vorbereitet. Sie erreichen uns direkt unter{' '}
          <a href={site.phoneHref}>{site.phone}</a> oder{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      )}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          autoComplete="off"
          tabIndex={-1}
          value={v.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>
      {step === 0 && (
        <div className="form-grid">
          <div className="field full">
            <label htmlFor="service">Gewünschte Leistung *</label>
            <select
              id="service"
              value={v.service}
              onChange={(e) => {
                set('service', e.target.value);
                track('service_select', { service: e.target.value });
              }}
            >
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
              <option value="beratung">Mehrere Leistungen / Beratung</option>
            </select>
          </div>
          {field('city', 'Einsatzort', 'text', 'Stadt oder Gemeinde des Objekts.', true)}
          {field('postal_code', 'Postleitzahl', 'text', '', true)}
          <div className="field">
            <label htmlFor="property_type">Objektart *</label>
            <select
              id="property_type"
              value={v.property_type}
              onChange={(e) => set('property_type', e.target.value)}
            >
              {[
                'Privathaushalt',
                'Gewerbe / Büro',
                'Praxis',
                'Hausverwaltung',
                'Industrie / Halle',
                'Sonstiges',
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          {field('scope', 'Ungefährer Umfang', 'text', 'Optional: z. B. 120 m² oder 12 Fenster.')}
          <div className="field">
            <label htmlFor="frequency">Reinigungsrhythmus</label>
            <select
              id="frequency"
              value={v.frequency}
              onChange={(e) => set('frequency', e.target.value)}
            >
              {['Noch offen', 'Einmalig', 'Regelmäßig'].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          {field('preferred_date', 'Wunschtermin', 'date', 'Optional; wird von uns bestätigt.')}
        </div>
      )}
      {step === 1 && (
        <>
          <div className="form-grid">
            {field('name', 'Ihr Name', 'text', '', true)}
            {field('company', 'Firma / Verwaltung', 'text', 'Optional.')}
            <div className="field full">
              <label>Bevorzugter Kontaktweg *</label>
              <div className="choice-row">
                {['E-Mail', 'Telefon'].map((x) => (
                  <label className="choice" key={x}>
                    <input
                      type="radio"
                      name="contact_method"
                      checked={v.contact_method === x}
                      onChange={() => set('contact_method', x)}
                    />
                    {x}
                  </label>
                ))}
              </div>
            </div>
            {field('email', 'E-Mail-Adresse', 'email', '', v.contact_method === 'E-Mail')}
            {field('phone', 'Telefonnummer', 'tel', '', v.contact_method === 'Telefon')}
            {field(
              'message',
              'Was sollten wir noch wissen?',
              'text',
              'Optional: Zugang, besondere Materialien oder mehrere Leistungen. Bitte keine sensiblen Daten eintragen.',
            )}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <dl className="review-list">
            {[
              ['Leistung', services.find((s) => s.slug === v.service)?.name || 'Beratung'],
              ['Objekt', `${v.property_type} · ${v.postal_code} ${v.city}`],
              ['Umfang', v.scope || 'Noch offen'],
              ['Rhythmus', v.frequency],
              ['Termin', v.preferred_date || 'Nach Absprache'],
              ['Kontakt', `${v.name} · ${v.contact_method === 'E-Mail' ? v.email : v.phone}`],
              ['Nachricht', v.message || 'Keine ergänzenden Angaben'],
            ].map(([k, val]) => (
              <div key={k} style={{ display: 'contents' }}>
                <dt>{k}</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
          <label className="consent-field">
            <input
              type="checkbox"
              checked={v.privacy}
              onChange={(e) => set('privacy', e.target.checked)}
              aria-invalid={!!errors.privacy}
              id="privacy"
            />
            <span>
              Ich habe die{' '}
              <Link href="/datenschutz" target="_blank">
                Datenschutzhinweise
              </Link>{' '}
              zur Bearbeitung meiner Anfrage gelesen. *
            </span>
          </label>
          {errors.privacy && (
            <p className="field-error" role="alert">
              {errors.privacy}
            </p>
          )}
        </>
      )}
      {serverError && (
        <div className="notice error-notice" role="alert">
          {serverError} <a href={site.phoneHref}>Anrufen</a>
        </div>
      )}
      <div className="form-buttons">
        {step > 0 && (
          <button
            type="button"
            className="button secondary"
            disabled={status === 'sending'}
            onClick={() => move(step - 1)}
          >
            Zurück
          </button>
        )}
        <button
          className="button glass"
          type="submit"
          disabled={status === 'sending' || (step === 2 && accepting === false)}
        >
          {status === 'sending'
            ? 'Wird gesendet …'
            : step === 2
              ? 'Anfrage unverbindlich senden'
              : 'Weiter'}
        </button>
      </div>
      <p style={{ fontSize: '.7rem', marginTop: 18 }}>
        * Pflichtangaben · Kein Auftrag ohne Ihre Bestätigung.
      </p>
    </form>
  );
}
