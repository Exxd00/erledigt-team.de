'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { site } from '@/lib/site';
import { Icon } from './Icon';
import { track } from '@/lib/tracking';

export function ContactDock() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstOption = useRef<HTMLAnchorElement>(null);
  const root = useRef<HTMLElement>(null);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const scroll = () => setShowTop(window.scrollY > 600);
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    firstOption.current?.focus();
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (e.target instanceof Node && !root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', outside);
    };
  }, [open]);
  return (
    <aside className="contact-dock" ref={root} aria-label="Schneller Kontakt">
      {open && (
        <div className="contact-dock-panel" id="contact-options">
          <div className="dock-title">
            <strong>Wie können wir helfen?</strong>
            <button
              className="icon-button"
              aria-label="Kontaktoptionen schließen"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <Icon name="X" size={18} />
            </button>
          </div>
          <p>Rückruf anfordern, direkt anrufen oder Ihr Vorhaben beschreiben.</p>
          <a
            ref={firstOption}
            href={site.phoneHref}
            data-event="phone_click"
            data-position="contact_dock"
          >
            <Icon name="Phone" />
            <span>
              Anrufen<small>{site.phone}</small>
            </span>
            <Icon name="ArrowUpRight" size={17} />
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-event="whatsapp_click"
            data-position="contact_dock"
          >
            <Icon name="MessageCircle" />
            <span>
              WhatsApp schreiben<small>Öffnet WhatsApp in einem neuen Tab</small>
            </span>
            <Icon name="ArrowUpRight" size={17} />
          </a>
          <a href={`mailto:${site.email}`} data-event="email_click" data-position="contact_dock">
            <Icon name="Mail" />
            <span>
              E-Mail schreiben<small>{site.email}</small>
            </span>
            <Icon name="ArrowUpRight" size={17} />
          </a>
          <Link href="/anfrage" data-event="cta_click" data-position="contact_dock">
            <Icon name="ClipboardCheck" />
            <span>
              Angebot anfragen<small>Unverbindlich · Schritt für Schritt</small>
            </span>
            <Icon name="ArrowUpRight" size={17} />
          </Link>
        </div>
      )}
      <div className="dock-controls">
        {showTop && (
          <a
            href="#main"
            className="liquid-orb back-top"
            data-track-handled="true"
            aria-label="Zurück nach oben"
            onClick={() => {
              track('interaction', { position: 'contact_dock', step: 'back_to_top' });
            }}
          >
            <Icon name="ArrowUpRight" size={21} />
          </a>
        )}
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-orb whatsapp-orb"
          data-event="whatsapp_click"
          data-position="floating_whatsapp"
          aria-label="WhatsApp öffnen (neuer Tab)"
          title="Auf WhatsApp schreiben"
        >
          <Icon name="MessageCircle" size={25} />
          <span>WhatsApp</span>
        </a>
        <button
          className="liquid-orb contact-orb"
          ref={trigger}
          aria-label={open ? 'Kontakt schließen' : 'Kontaktmöglichkeiten öffnen'}
          aria-expanded={open}
          data-track-handled="true"
          aria-controls="contact-options"
          onClick={() => {
            setOpen(!open);
            if (!open) track('interaction', { position: 'contact_dock', step: 'open' });
          }}
        >
          <Icon name={open ? 'X' : 'Phone'} size={25} />
          <span>Kontakt</span>
        </button>
      </div>
    </aside>
  );
}
