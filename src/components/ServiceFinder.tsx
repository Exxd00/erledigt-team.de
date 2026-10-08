'use client';
import { useState } from 'react';
import Link from 'next/link';
import { assets } from '@/lib/assets';
import { track } from '@/lib/tracking';
import { Icon } from './Icon';
import { SiteImage } from './SiteImage';

const situations = [
  {
    label: 'Für mein Zuhause',
    icon: 'House',
    image: assets.textile,
    title: 'Weniger Arbeit. Mehr Zeit für zu Hause.',
    text: 'Klare Fenster, gepflegte Polster oder eine gründliche Reinigung nach besonderen Belastungen: Beginnen Sie mit dem Bereich, der Ihnen wichtig ist.',
    links: [
      ['glas-fensterreinigung', 'Fenster & Glas'],
      ['polster-teppichreinigung', 'Polster & Teppiche'],
      ['grund-sonderreinigung', 'Gründlich auffrischen'],
    ],
    note: 'Für den ersten Kontakt reichen Ort und eine grobe Beschreibung.',
  },
  {
    label: 'Für meinen Betrieb',
    icon: 'Building2',
    image: assets.office,
    title: 'Eine Reinigung, die in Ihren Betrieb passt.',
    text: 'Ob Büro, Praxis oder Gewerbehalle: Arbeitszeiten, Materialien und die Nutzung Ihrer Räume bestimmen den Reinigungsplan. Wählen Sie Ihren Schwerpunkt.',
    links: [
      ['buero-praxisreinigung', 'Büro & Praxis'],
      ['hallen-gewerbereinigung', 'Hallen & Gewerbe'],
      ['unterhaltsreinigung', 'Regelmäßige Pflege'],
    ],
    note: 'Betriebszeiten und besondere Vorgaben berücksichtigen wir in der Planung.',
  },
  {
    label: 'Für meine Immobilien',
    icon: 'Layers',
    image: assets.hero,
    title: 'Mehrere Flächen. Ein klarer Ansprechpartner.',
    text: 'Vom gemeinsamen Eingangsbereich bis zur Objektübergabe: Beschreiben Sie Aufgänge, Nutzung und Zuständigkeiten. Wir stimmen die Aufgaben mit Ihnen ab.',
    links: [
      ['treppenhausreinigung', 'Treppenhaus & Eingang'],
      ['baustellenreinigung', 'Bau & Übergabe'],
      ['pv-anlagen-reinigung', 'PV-Anlagen'],
    ],
    note: 'Auch mehrere Objekte lassen sich in einer Anfrage zusammenfassen.',
  },
] as const;
export function ServiceFinder() {
  const [selected, setSelected] = useState(0);
  const s = situations[selected];
  return (
    <section className="section wrap service-finder" aria-labelledby="finder-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span />
            Was steht bei Ihnen an?
          </p>
          <h2 id="finder-title">
            Der passende Einstieg.
            <br />
            <em>In einer Entscheidung.</em>
          </h2>
        </div>
        <p className="section-intro">
          Wählen Sie Ihre Situation. Die passenden Leistungen finden Sie direkt darunter.
        </p>
      </div>
      <div className="audience-options" aria-label="Reinigung nach Ihrer Situation">
        <>
          {situations.map((item, i) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={selected === i}
              data-track-handled="true" aria-controls="finder-result"
              onClick={() => {
                setSelected(i);
                track('filter_used', {
                  position: 'home_finder',
                  step: ['private', 'business', 'property'][i],
                });
              }}
            >
              <Icon name={item.icon} />
              {item.label}
              <Icon name="ArrowUpRight" size={18} />
            </button>
          ))}
        </>
      </div>
      <div className="finder-result" id="finder-result">
        <div className="finder-image">
          <SiteImage
            image={s.image}
            width="1536"
            height="1024"
            loading="lazy"
            alt="Beispiel für sorgfältige Reinigung – KI-generiertes Motiv"
          />
          <small>Illustrative Darstellung</small>
        </div>
        <div className="finder-copy">
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          <div className="finder-links">
            {s.links.map(([slug, label]) => (
              <Link
                key={slug}
                href={`/leistungen/${slug}`}
                data-event="service_select"
                data-service={slug}
                data-position="home_finder"
              >
                {label}
                <Icon name="ArrowUpRight" size={18} />
              </Link>
            ))}
          </div>
          <p className="finder-note">
            <Icon name="CircleCheck" size={18} />
            {s.note}
          </p>
          <Link
            href="/anfrage"
            className="button glass"
            data-event="cta_click"
            data-position="home_finder"
          >
            Mein Vorhaben beschreiben
            <Icon name="ArrowUpRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
