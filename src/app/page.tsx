import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { ClosingCta, Eyebrow, FaqList, JsonLd, Process, ServiceCard } from '@/components/Shared';
import { services, cities } from '@/lib/content';
import { site } from '@/lib/site';
export const metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-photo">
          <img
            src="/images/hero-cleaning.webp"
            alt="Professionelle Glasreinigung an einem modernen Gebäude – illustrative Darstellung"
            fetchPriority="high"
            width="1536"
            height="1024"
          />
        </div>
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <div className="hero-copy">
            <Eyebrow>Gebäudeservice aus Saterland</Eyebrow>
            <h1>
              Saubere Räume.
              <br />
              Ein gutes Gefühl.
              <br />
              <em>Erledigt.</em>
            </h1>
            <p>
              Für Ihr Zuhause. Für Ihren Betrieb.
              <br />
              Wir kümmern uns um die Reinigung –<br className="desktop-break" /> und Sie um das, was
              Ihnen wichtig ist.
            </p>
            <div className="hero-actions">
              <Link
                href="/anfrage"
                className="button glass on-dark"
                data-event="cta_click"
                data-position="hero"
              >
                Reinigung anfragen <Icon name="Sparkles" size={19} />
              </Link>
              <Link href="/leistungen" className="button outline-light">
                Leistungen entdecken
              </Link>
            </div>
            <div className="hero-notes">
              <span>
                <Icon name="Check" size={16} />
                Unverbindliches Angebot
              </span>
              <span>
                <Icon name="MapPin" size={16} />
                50 km um Saterland
              </span>
            </div>
          </div>
          <div className="hero-caption">
            <span className="caption-line" />
            <span>
              Ihr Auftrag.
              <br />
              <strong>Unser Einsatz. Erledigt.</strong>
            </span>
          </div>
        </div>
      </section>
      <section className="promise-strip" aria-label="Unser Anspruch">
        <div className="wrap promise-grid">
          <div>
            <Icon name="Sparkles" />
            <span>
              <strong>Gründlich</strong>
              <small>Bis ins Detail gedacht.</small>
            </span>
          </div>
          <div>
            <Icon name="CalendarDays" />
            <span>
              <strong>Flexibel</strong>
              <small>Passend zu Ihrem Alltag.</small>
            </span>
          </div>
          <div>
            <Icon name="ShieldCheck" />
            <span>
              <strong>Zuverlässig</strong>
              <small>Mit klaren Absprachen.</small>
            </span>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Unsere Leistungen</Eyebrow>
            <h2>
              Für jede Fläche.
              <br />
              <em>Die passende Lösung.</em>
            </h2>
          </div>
          <div className="section-intro">
            <p>
              Regelmäßige Pflege oder ein besonderer Einsatz: Wir stimmen die Reinigung auf Ihr
              Objekt, die Materialien und Ihren Tagesablauf ab.
            </p>
            <Link href="/leistungen" className="text-link">
              Alle 11 Leistungen ansehen <span aria-hidden="true">+</span>
            </Link>
          </div>
        </div>
        <div className="service-grid">
          {[services[0], services[4], services[10], services[1], services[7], services[8]].map(
            (s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ),
          )}
        </div>
      </section>
      <section className="section surface-alt">
        <div className="wrap story-grid">
          <div className="story-photo">
            <img
              src="/images/solar-cleaning.webp"
              alt="Schonende Reinigung von Solarmodulen mit einer weichen Bürste – illustrative Darstellung"
              loading="lazy"
              width="1536"
              height="1024"
            />
            <div className="photo-label">
              <Icon name="Droplets" />
              <span>
                Saubere Werte.
                <br />
                <strong>Für heute und morgen.</strong>
              </span>
            </div>
          </div>
          <div className="story-copy">
            <Eyebrow>Mehr als nur sauber</Eyebrow>
            <h2>
              Ihre Räume verdienen
              <br />
              <em>Aufmerksamkeit.</em>
            </h2>
            <p>
              Ein heller Eingangsbereich, gepflegte Arbeitsplätze und saubere Fenster verändern, wie
              sich ein Gebäude anfühlt. Genau dort setzt ERLEDIGT TEAM an: mit einer Reinigung, die
              zur tatsächlichen Nutzung passt.
            </p>
            <p>
              Wir starten mit Ihren Anforderungen. Welche Flächen sind wichtig? Wann ist der Zugang
              möglich? Welche Materialien brauchen besondere Pflege? Daraus entsteht ein klarer
              Auftrag – für eine einmalige Reinigung genauso wie für einen regelmäßigen Rhythmus.
            </p>
            <ul className="check-list">
              <li>
                <Icon name="Check" />
                Ein Ansprechpartner für Ihren Auftrag
              </li>
              <li>
                <Icon name="Check" />
                Leistungsumfang vor Beginn abgestimmt
              </li>
              <li>
                <Icon name="Check" />
                Termine passend zum Objekt geplant
              </li>
            </ul>
            <Link href="/ueber-uns" className="text-link">
              ERLEDIGT TEAM kennenlernen <span aria-hidden="true">+</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Einfach zu Ihrem Angebot</Eyebrow>
            <h2>
              Weniger Aufwand für Sie.
              <br />
              <em>Ein klarer Ablauf.</em>
            </h2>
          </div>
          <p className="section-intro">
            Von der ersten Nachricht bis zum vereinbarten Einsatz wissen Sie, welcher Schritt als
            Nächstes folgt.
          </p>
        </div>
        <Process />
      </section>
      <section className="region-section section">
        <div className="wrap region-grid">
          <div>
            <Eyebrow>In Ihrer Nähe</Eyebrow>
            <h2>
              Hier zu Hause.
              <br />
              <em>Für Sie unterwegs.</em>
            </h2>
            <p>
              Unser Ausgangspunkt ist die Eschstraße 70 in Saterland. Von hier aus planen wir
              Einsätze im Umkreis von etwa 50 Kilometern – im Oldenburger Münsterland, im Ammerland,
              in Ostfriesland und im nördlichen Emsland.
            </p>
            <p>
              Die genaue Einsatzmöglichkeit klären wir anhand Ihrer Adresse und des Auftragsumfangs.
              Auch bei mehreren Objekten besprechen wir eine sinnvolle Planung und passende
              Reinigungsintervalle.
            </p>
            <Link href="/einsatzgebiete" className="button glass">
              Ort finden
            </Link>
          </div>
          <div className="region-panel">
            <div className="region-origin">
              <Icon name="MapPin" size={28} />
              <div>
                <strong>Saterland</strong>
                <span>Eschstraße 70 · 26683</span>
              </div>
              <span className="radius">
                50 <small>km</small>
              </span>
            </div>
            <div className="city-cloud">
              {cities.slice(0, 12).map((c) => (
                <Link
                  key={c.slug}
                  href={`/einsatzgebiete/${c.slug}`}
                  data-event="city_select"
                  data-city={c.slug}
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <p>Ihre Stadt fehlt? Nennen Sie uns den Einsatzort in Ihrer Anfrage.</p>
          </div>
        </div>
      </section>
      <section className="section wrap faq-section">
        <div>
          <Eyebrow>Gut zu wissen</Eyebrow>
          <h2>
            Noch eine Frage?
            <br />
            <em>Hier wird es klar.</em>
          </h2>
          <p>
            Sie möchten Ihr Vorhaben direkt besprechen?
            <br />
            <a className="text-link" href={site.phoneHref} data-event="phone_click">
              {site.phone}
            </a>
          </p>
        </div>
        <FaqList
          items={[
            {
              question: 'Für wen arbeitet ERLEDIGT TEAM?',
              answer:
                'Unsere Leistungen richten sich an Privatkunden, Unternehmen, Praxen, Hausverwaltungen und gewerbliche Betriebe. Ob einzelne Fenster, regelmäßig genutzte Räume oder größere Flächen: Wir prüfen den konkreten Bedarf und die Voraussetzungen vor Ort.',
            },
            {
              question: 'Wie entsteht der Preis für meine Reinigung?',
              answer:
                'Fläche, Material, Verschmutzung, Erreichbarkeit und der gewünschte Rhythmus bestimmen den Aufwand. Deshalb erstellen wir ein individuelles Angebot. Wenn die Angaben noch nicht ausreichen, klären wir die offenen Punkte telefonisch oder bei einer vereinbarten Besichtigung.',
            },
            {
              question: 'Kann die Reinigung außerhalb der Öffnungszeiten stattfinden?',
              answer:
                'Nennen Sie uns Ihre möglichen Zeitfenster. Wir besprechen, wie sich Zugang, Schlüsselübergabe und Reinigung mit Ihrem Betrieb verbinden lassen. Ein Termin gilt erst nach unserer gemeinsamen Bestätigung.',
            },
            {
              question: 'Muss ich mich schon mit der Anfrage festlegen?',
              answer:
                'Nein. Eine Anfrage dient zunächst dazu, Ihren Bedarf kennenzulernen. Erst wenn der Umfang und das Angebot abgestimmt sind und Sie den Auftrag erteilen, planen wir den Einsatz verbindlich.',
            },
          ]}
        />
      </section>
      <ClosingCta />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${site.url}/#business`,
          name: site.name,
          url: site.url,
          email: site.email,
          telephone: site.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.street,
            postalCode: site.postal,
            addressLocality: site.city,
            addressCountry: 'DE',
          },
          areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
          logo: `${site.url}/images/logo.jpg`,
        }}
      />
    </>
  );
}
