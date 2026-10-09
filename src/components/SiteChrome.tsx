'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { site } from '@/lib/site';
import { assets } from '@/lib/assets';
import { SiteImage } from './SiteImage';
import {
  type EventName,
  track,
  CONSENT_KEY,
  captureAttribution,
  hasAnalyticsConsent,
  revokeAnalytics,
} from '@/lib/tracking';

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="ERLEDIGT TEAM – Startseite">
      <span className="brand-mark">
        <SiteImage image={assets.logo} width="76" height="38" alt="" />
      </span>
      <span>
        <strong>
          ERLEDIGT <em>TEAM</em>
        </strong>
        <small>GEBÄUDESERVICE</small>
      </span>
    </Link>
  );
}
export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('erledigt-theme', next ? 'dark' : 'light');
    } catch {}
  };
  return (
    <>
      <div className="topline">
        <div className="wrap">
          <span>
            <Icon name="MapPin" size={14} /> Saterland & Umgebung
          </span>
          <a href={`mailto:${site.email}`} data-event="email_click">
            {site.email}
          </a>
          <span className="topline-motto">Gründlich. Flexibel. Zuverlässig.</span>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Hauptnavigation">
            <Link className={path.startsWith('/leistungen') ? 'active' : ''} href="/leistungen">
              Leistungen
            </Link>
            <Link
              className={path.startsWith('/einsatzgebiete') ? 'active' : ''}
              href="/einsatzgebiete"
            >
              Einsatzgebiete
            </Link>
            <Link href="/ueber-uns">Über uns</Link>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-switch"
              aria-label={dark ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'}
              onClick={toggle}
            >
              <Icon name={dark ? 'Sun' : 'Moon'} size={21} />
            </button>
            <Link
              href="/anfrage"
              className="button glass header-cta"
              data-event="cta_click"
              data-position="header"
            >
              Angebot anfragen
            </Link>
            <button
              ref={menuButton}
              className="icon-button menu-button"
              aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? 'X' : 'Menu'} />
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-navigation wrap"
            aria-label="Mobile Navigation"
          >
            <Link href="/">Startseite</Link>
            <Link href="/leistungen">Alle Leistungen</Link>
            <Link href="/einsatzgebiete">Städte & Einsatzgebiete</Link>
            <Link href="/ueber-uns">Über ERLEDIGT TEAM</Link>
            <Link href="/anfrage">Angebot anfragen</Link>
            <a href={site.phoneHref} data-event="phone_click">
              <Icon name="Phone" /> {site.phone}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-event="whatsapp_click"
              data-position="mobile_menu"
            >
              <Icon name="MessageCircle" /> WhatsApp (neuer Tab)
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Brand />
          <p>Ihr Auftrag. Unser Einsatz. Erledigt.</p>
          <p className="muted">
            Gebäudeservice aus Saterland.
            <br />
            Für Ihr Zuhause und Ihren Betrieb.
          </p>
        </div>
        <div>
          <h2>Sauber geplant.</h2>
          <Link href="/leistungen">Unsere Leistungen</Link>
          <Link href="/einsatzgebiete">Unsere Einsatzgebiete</Link>
          <Link href="/ueber-uns">Über uns</Link>
          <Link href="/anfrage">Angebot anfragen</Link>
        </div>
        <div>
          <h2>Persönlich erreichbar.</h2>
          <a href={site.phoneHref} data-event="phone_click">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} data-event="email_click">
            {site.email}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-event="whatsapp_click"
            data-position="footer"
          >
            WhatsApp schreiben (neuer Tab)
          </a>
          <p>
            {site.street}
            <br />
            {site.postal} {site.city}
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <small>© {new Date().getFullYear()} ERLEDIGT TEAM</small>
        <div>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <button onClick={() => window.dispatchEvent(new Event('open-consent'))}>
            Cookie-Einstellungen
          </button>
        </div>
      </div>
    </footer>
  );
}
export function ConsentAndTracking() {
  const path = usePathname();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(CONSENT_KEY));
    } catch {
      setVisible(true);
    }
    const open = () => setVisible(true);
    window.addEventListener('open-consent', open);
    return () => window.removeEventListener('open-consent', open);
  }, []);
  useEffect(() => {
    captureAttribution();
    track('page_view');
  }, [path]);
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-track-handled]')) return;
      const a = (e.target as HTMLElement).closest<HTMLElement>('[data-event]');
      if (a) {
        track(a.dataset.event as EventName, {
          position: a.dataset.position || 'content',
          service: a.dataset.service,
          city: a.dataset.city,
        });
        return;
      }
      const control = (e.target as HTMLElement).closest<HTMLElement>(
        'a[href],button,summary,input[type="checkbox"],input[type="radio"]',
      );
      if (!control) return;
      const href = control.getAttribute('href') || '';
      const name = href.startsWith('tel:')
        ? 'phone_click'
        : href.startsWith('mailto:')
          ? 'email_click'
          : 'interaction';
      track(name, {
        position: control.tagName.toLowerCase(),
        step: /^[a-z_-]{1,60}$/.test(control.id) ? control.id : undefined,
      });
    };
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
  useEffect(() => {
    const seen = new Set<number>();
    let scheduled = false;
    const scroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const length = document.documentElement.scrollHeight - innerHeight;
        if (length <= 0) return;
        const percent = Math.round((scrollY / length) * 100);
        for (const threshold of [25, 50, 75, 90])
          if (percent >= threshold && !seen.has(threshold) && hasAnalyticsConsent()) {
            seen.add(threshold);
            track('scroll_depth', { position: 'page', step: String(threshold) });
          }
      });
    };
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, [path]);
  const choose = (value: 'necessary' | 'analytics') => {
    const previous = hasAnalyticsConsent();
    try {
      localStorage.setItem(CONSENT_KEY, value);
      if (value === 'necessary') {
        sessionStorage.removeItem('erledigt-session');
        sessionStorage.removeItem('erledigt-attribution');
      }
    } catch {}
    setVisible(false);
    if (value === 'analytics') {
      captureAttribution();
      track('consent_update');
      track('page_view');
    }
    if (previous && value === 'necessary') {
      revokeAnalytics();
      location.reload();
    }
  };
  return visible ? (
    <aside className="consent-box" aria-label="Datenschutzeinstellungen">
      <div className="consent-title">
        <Icon name="ShieldCheck" />
        <strong>Sie entscheiden.</strong>
      </div>
      <p>
        Notwendige Funktionen sind immer aktiv. Mit Ihrer Zustimmung messen wir Seitenaufrufe und
        Klicks, um unser Angebot zu verbessern. Inhalte Ihrer Anfrage bleiben außerhalb der
        Nutzungsanalyse.
      </p>
      <Link href="/datenschutz">Datenschutzhinweise</Link>
      <div className="consent-actions">
        <button className="button secondary" onClick={() => choose('necessary')}>
          Nur notwendige
        </button>
        <button className="button glass" onClick={() => choose('analytics')}>
          Analyse erlauben
        </button>
      </div>
    </aside>
  ) : null;
}
