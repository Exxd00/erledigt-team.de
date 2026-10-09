'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
import { site } from '@/lib/site';
import { callbackSchema } from '@/lib/validation';
import { contactEvents } from '@/lib/contact-events';
import { attribution, hasAnalyticsConsent, track, trackConfirmedRequest } from '@/lib/tracking';

type Choice = { kind: 'phone' | 'whatsapp' | 'email'; position: string };
export function ContactDialogs() {
  const path = usePathname();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [callback, setCallback] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [error, setError] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const id = useRef('');
  const started = useRef(0);
  const inFlight = useRef(false);
  const confirmed = useRef(false);
  function close() {
    if (!inFlight.current) setChoice(null);
  }
  useEffect(() => {
    function open(e: MouseEvent) {
      if (e.button > 1 || !(e.target instanceof Element)) return;
      const link = e.target.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.dataset.contactConfirmed === 'true') return;
      const href = link.getAttribute('href');
      const kind =
        href === site.phoneHref
          ? 'phone'
          : href === site.whatsappHref
            ? 'whatsapp'
            : href === `mailto:${site.email}`
              ? 'email'
              : null;
      if (!kind) return;
      e.preventDefault();
      e.stopPropagation();
      trigger.current = link;
      const position = link.dataset.position || 'content';
      setChoice({ kind, position: /^[a-z_]{1,60}$/.test(position) ? position : 'content' });
      setCallback(false);
      setName('');
      setPhone('');
      setPrivacy(false);
      setWebsite('');
      setStatus('idle');
      setError('');
      confirmed.current = false;
      id.current = crypto.randomUUID();
      started.current = Date.now();
    }
    document.addEventListener('click', open, true);
    document.addEventListener('auxclick', open, true);
    return () => {
      document.removeEventListener('click', open, true);
      document.removeEventListener('auxclick', open, true);
    };
  }, []);
  useEffect(() => {
    if (!inFlight.current) setChoice(null);
  }, [path]);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (choice) {
      if (!element.open) element.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = overflow;
      };
    }
    element.close();
    if (trigger.current?.isConnected) trigger.current.focus();
  }, [choice]);
  const confirm = () => {
    if (!choice || confirmed.current) return;
    confirmed.current = true;
    track(contactEvents[choice.kind], { position: choice.position });
    // Keep the clicked href stable until the browser completes its native navigation.
    window.setTimeout(() => setChoice(null), 0);
  };
  async function requestCallback(e: React.FormEvent) {
    e.preventDefault();
    if (inFlight.current || !choice) return;
    const payload = {
      id: id.current,
      name,
      phone,
      privacy,
      website,
      started_at: started.current,
      analytics_consent: hasAnalyticsConsent(),
      page_path: path,
      position: choice.position,
      ...attribution(),
    };
    const parsed = callbackSchema.safeParse(payload);
    if (!parsed.success) {
      setError(
        !privacy
          ? 'Bitte bestätigen Sie die Datenschutzhinweise.'
          : 'Bitte geben Sie eine gültige Telefonnummer ein.',
      );
      return;
    }
    inFlight.current = true;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (!response.ok || !data.ok || data.id !== id.current || !data.event_id)
        throw new Error('save_failed');
      setStatus('success');
      trackConfirmedRequest(contactEvents.callback, data.id, data.event_id, {
        position: choice.position,
      });
    } catch {
      setStatus('idle');
      setError(
        'Ihr Rückruf konnte noch nicht bestätigt werden. Bitte versuchen Sie es erneut oder rufen Sie direkt an. Eine Wiederholung speichert dieselbe Anfrage nicht doppelt.',
      );
    } finally {
      inFlight.current = false;
    }
  }
  const external = choice?.kind === 'whatsapp';
  return (
    <dialog
      ref={dialog}
      className="contact-dialog"
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      data-track-handled="true"
    >
      <div className="contact-dialog-inner">
        <button
          type="button"
          className="icon-button dialog-close"
          aria-label="Dialog schließen"
          onClick={close}
          disabled={status === 'sending'}
        >
          <Icon name="X" size={20} />
        </button>
        <span className="dialog-symbol">
          <Icon
            name={
              status === 'success'
                ? 'CircleCheck'
                : choice?.kind === 'phone'
                  ? 'Phone'
                  : external
                    ? 'MessageCircle'
                    : 'Mail'
            }
            size={30}
          />
        </span>
        {choice?.kind === 'phone' ? (
          <>
            <h2 id="contact-dialog-title">
              {status === 'success'
                ? 'Ihr Rückruf ist angefragt.'
                : callback
                  ? 'Wir rufen Sie zurück.'
                  : 'Wie möchten Sie telefonieren?'}
            </h2>
            <p id="contact-dialog-description">
              {status === 'success'
                ? 'Ihre Nummer wurde gespeichert. Unser Team meldet sich schnellstmöglich bei Ihnen.'
                : callback
                  ? 'Hinterlassen Sie Ihre Nummer. Wir melden uns schnellstmöglich – persönlich und unverbindlich.'
                  : 'Direkt mit uns sprechen oder Ihre Nummer hinterlassen und einen Rückruf anfordern.'}
            </p>
            {status === 'success' ? (
              <div role="status" className="callback-result">
                <p>
                  Referenz: <strong>{id.current.slice(0, 8).toUpperCase()}</strong>
                </p>
                <button className="button glass" onClick={close}>
                  Erledigt
                </button>
              </div>
            ) : (
              <>
                {!callback ? (
                  <div className="contact-choice-grid">
                    <button className="contact-choice glass" onClick={() => setCallback(true)}>
                      <Icon name="Phone" />
                      <span>
                        Rückruf anfordern<small>Nummer hinterlassen · wir melden uns</small>
                      </span>
                      <Icon name="ArrowUpRight" size={18} />
                    </button>
                    <a
                      className="contact-choice glass"
                      href={site.phoneHref}
                      data-contact-confirmed="true"
                      onClick={confirm}
                    >
                      <Icon name="Phone" />
                      <span>
                        Direkt anrufen<small>{site.phone}</small>
                      </span>
                      <Icon name="ArrowUpRight" size={18} />
                    </a>
                  </div>
                ) : (
                  <form className="callback-form" onSubmit={requestCallback} noValidate>
                    <div className="field">
                      <label htmlFor="callback-phone">Ihre Telefonnummer *</label>
                      <input
                        id="callback-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        maxLength={35}
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={status === 'sending'}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="callback-name">
                        Ihr Name <small>(optional)</small>
                      </label>
                      <input
                        id="callback-name"
                        name="name"
                        autoComplete="name"
                        maxLength={120}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={status === 'sending'}
                      />
                    </div>
                    <div className="honeypot" aria-hidden="true">
                      <label htmlFor="callback-website">Website</label>
                      <input
                        id="callback-website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                    <label className="callback-privacy">
                      <input
                        type="checkbox"
                        checked={privacy}
                        onChange={(e) => setPrivacy(e.target.checked)}
                        disabled={status === 'sending'}
                      />
                      <span>
                        Ich möchte zurückgerufen werden und habe die{' '}
                        <Link href="/datenschutz" target="_blank" rel="noopener noreferrer">
                          Datenschutzhinweise
                        </Link>{' '}
                        gelesen. *
                      </span>
                    </label>
                    {error && (
                      <p className="field-error" role="alert">
                        {error}
                      </p>
                    )}
                    <button className="button glass" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Wird gespeichert …' : 'Rückruf jetzt anfordern'}
                    </button>
                    <a
                      className="dialog-text-link"
                      href={site.phoneHref}
                      data-contact-confirmed="true"
                      onClick={confirm}
                    >
                      Lieber direkt anrufen: {site.phone}
                    </a>
                  </form>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <h2 id="contact-dialog-title">
              {external ? 'Weiter zu WhatsApp?' : 'E-Mail-Programm öffnen?'}
            </h2>
            <p id="contact-dialog-description">
              {external
                ? 'Sie wechseln zu WhatsApp, einem Dienst von Meta. Dort gelten die Datenschutzbestimmungen des Anbieters. Erst dort entscheiden Sie, ob Sie eine Nachricht senden.'
                : `Ihr E-Mail-Programm öffnet eine neue Nachricht an ${site.email}. Eine E-Mail wird erst gesendet, wenn Sie sie dort selbst abschicken.`}
            </p>
            <div className="dialog-actions">
              <a
                href={external ? site.whatsappHref : `mailto:${site.email}`}
                className="button glass"
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                data-contact-confirmed="true"
                onClick={confirm}
              >
                {external ? 'Bestätigen & WhatsApp öffnen' : 'Bestätigen & E-Mail öffnen'}
                <Icon name="ArrowUpRight" size={18} />
              </a>
              <button className="button secondary" type="button" onClick={close}>
                Abbrechen
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
