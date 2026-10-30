import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { ClosingCta, Eyebrow, FaqList, JsonLd } from '@/components/Shared';
import { services, cities } from '@/lib/content';
import { site } from '@/lib/site';
import { assets } from '@/lib/assets';
import { SiteImage } from '@/components/SiteImage';
import { HomeServiceGrid } from '@/components/HomeServiceGrid';
import { companyAnswer } from '@/lib/answers';
import { pageGraph } from '@/lib/structured-data';
import './home.css';

const sectors = [
  {
    slug: 'hausverwaltungen-wohnanlagen',
    name: 'Hausverwaltung',
    text: 'Wohnanlagen & gemeinsame Flächen',
    icon: 'Layers',
  },
  {
    slug: 'bueros-praxen',
    name: 'Büro & Praxis',
    text: 'Sauberkeit im Arbeitsalltag',
    icon: 'Building2',
  },
  {
    slug: 'handel-gewerbeimmobilien',
    name: 'Handel & Gewerbe',
    text: 'Gepflegt für Ihre Kunden',
    icon: 'Store',
  },
  {
    slug: 'industrie-logistik',
    name: 'Industrie & Logistik',
    text: 'Abgestimmt auf Ihren Betrieb',
    icon: 'Warehouse',
  },
];
const steps = [
  {
    title: 'Vorhaben beschreiben',
    text: 'Ort, Leistung und ein grober Umfang reichen für den Anfang.',
  },
  {
    title: 'Angebot abstimmen',
    text: 'Wir klären Zugang, Aufgaben, Preis und den passenden Termin.',
  },
  {
    title: 'Auftrag erteilen',
    text: 'Erst nach Ihrer Beauftragung planen wir den Einsatz verbindlich.',
  },
];

export const metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-photo">
          <SiteImage
            image={assets.hero}
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
              Drinnen sauber.
              <br />
              Draußen gepflegt.
              <br />
              <em>Erledigt.</em>
            </h1>
            <p>
              Für Ihr Zuhause. Für Ihren Betrieb.
              <br />
              Reinigung, Grünpflege und Winterdienst –<br className="desktop-break" /> passend zu
              Ihrem Objekt und Ihrem Alltag.
            </p>
            <div className="hero-actions">
              <Link
                href="/anfrage"
                className="button glass on-dark"
                data-event="cta_click"
                data-position="hero"
              >
                Angebot anfragen <Icon name="Sparkles" size={19} />
              </Link>
              <Link href="#leistungen" className="button outline-light">
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
                Saterland & Umgebung
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
      <section className="promise-strip home-promise" aria-label="Unser Anspruch">
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
      <section className="home-section wrap" id="leistungen" aria-labelledby="home-services-title">
        <div className="home-section-heading">
          <div>
            <Eyebrow>Was steht bei Ihnen an?</Eyebrow>
            <h2 id="home-services-title">
              Die passende Leistung.
              <br />
              <em>Auf einen Blick.</em>
            </h2>
          </div>
          <div className="home-section-intro">
            <p>
              Drinnen, draußen oder rund ums Jahr: Wählen Sie den Bereich, der zu Ihrem Vorhaben
              passt.
            </p>
            <Link href="/leistungen" className="text-link">
              Alle {services.length} Leistungen <Icon name="ArrowUpRight" size={18} />
            </Link>
          </div>
        </div>
        <HomeServiceGrid />
        <p className="home-fleet-note">
          <Icon name="Truck" size={22} />
          <span>
            Eigene Fahrzeuge für den Wintereinsatz. Flächen und Einsatzzeiten stimmen wir mit Ihnen
            ab.
          </span>
        </p>
      </section>

      <section className="home-section surface-alt" aria-labelledby="home-business-title">
        <div className="wrap home-business-layout">
          <div className="home-business-intro">
            <Eyebrow>Für Unternehmen & Verwaltungen</Eyebrow>
            <h2 id="home-business-title">
              Ihr Objekt.
              <br />
              <em>Ihr Arbeitsalltag.</em>
            </h2>
            <p>
              Bewohner, Kunden oder Schichtbetrieb: Jede Branche braucht einen eigenen Ablauf.
              Finden Sie die Betreuung, die zu Ihrem Betrieb passt.
            </p>
            <Link href="/geschaeftskunden" className="text-link">
              Alle Lösungen für Unternehmen <Icon name="ArrowUpRight" size={18} />
            </Link>
          </div>
          <div className="home-sector-grid">
            {sectors.map((sector) => (
              <Link
                key={sector.slug}
                href={`/geschaeftskunden/${sector.slug}`}
                className="home-sector-card"
                data-event="cta_click"
                data-position="home_business"
              >
                <span className="home-sector-top">
                  <Icon name={sector.icon} size={25} />
                  <Icon name="ArrowUpRight" size={18} />
                </span>
                <h3>{sector.name}</h3>
                <p>{sector.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section wrap" aria-labelledby="home-about-title">
        <div className="home-story-layout">
          <div className="home-about-panel">
            <Eyebrow>ERLEDIGT TEAM</Eyebrow>
            <h2 id="home-about-title">
              Persönlich abgestimmt.
              <br />
              <em>Klar erledigt.</em>
            </h2>
            <p>{companyAnswer}</p>
            <ul className="home-trust-list">
              <li>
                <Icon name="Check" size={19} />
                Ein Ansprechpartner für Ihren Auftrag
              </li>
              <li>
                <Icon name="Check" size={19} />
                Umfang und Preis vor Beginn geklärt
              </li>
              <li>
                <Icon name="Check" size={19} />
                Einmalig oder regelmäßig nach Bedarf
              </li>
            </ul>
            <Link href="/ueber-uns" className="text-link">
              Das Team kennenlernen <Icon name="ArrowUpRight" size={18} />
            </Link>
          </div>
          <div className="home-process-panel">
            <Eyebrow>In drei Schritten</Eyebrow>
            <h2>
              So einfach
              <br />
              <em>kann es gehen.</em>
            </h2>
            <ol className="home-steps">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="home-step-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/anfrage"
              className="button glass"
              data-event="cta_click"
              data-position="home_process"
            >
              Mein Vorhaben beschreiben <Icon name="ArrowUpRight" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-region wrap" aria-labelledby="home-region-title">
        <div className="home-region-intro">
          <Icon name="MapPin" size={28} />
          <div>
            <h2 id="home-region-title">
              Saterland <em>& Umgebung.</em>
            </h2>
            <p>
              Von unserem Standort in der Eschstraße 70 aus planen wir Einsätze in der Region. Ob
              Ihr Objekt betreut werden kann, klären wir anhand von Adresse, Umfang und Termin.
            </p>
          </div>
        </div>
        <div className="home-region-links">
          <div className="home-city-links">
            {cities.slice(0, 4).map((city) => (
              <Link
                key={city.slug}
                href={`/einsatzgebiete/${city.slug}`}
                data-event="city_select"
                data-city={city.slug}
              >
                {city.name}
              </Link>
            ))}
          </div>
          <Link href="/einsatzgebiete" className="text-link">
            Meinen Ort finden <Icon name="ArrowUpRight" size={18} />
          </Link>
        </div>
      </section>

      <section className="home-section wrap home-faq" aria-labelledby="home-faq-title">
        <div>
          <Eyebrow>Gut zu wissen</Eyebrow>
          <h2 id="home-faq-title">
            Kurz gefragt.
            <br />
            <em>Klar beantwortet.</em>
          </h2>
          <p className="home-faq-intro">
            Noch etwas offen? Wir besprechen Ihr Vorhaben gern persönlich.
          </p>
          <a className="text-link" href={site.phoneHref} data-event="phone_click">
            <Icon name="Phone" size={18} />
            {site.phone}
          </a>
          <div className="home-knowledge-links">
            <Link href="/fragen" className="text-link">
              Weitere Fragen & Antworten <Icon name="ArrowUpRight" size={18} />
            </Link>
            <Link href="/ratgeber" className="text-link">
              Tipps vor dem Auftrag <Icon name="ArrowUpRight" size={18} />
            </Link>
          </div>
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
      <JsonLd value={pageGraph('/', 'Gebäudeservice in Saterland & Umgebung', companyAnswer)} />
    </>
  );
}
