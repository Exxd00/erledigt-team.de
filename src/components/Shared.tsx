import Link from 'next/link';
import { Icon } from './Icon';
import { site, type Faq, type ServicePreview } from '@/lib/site';
import { assets } from '@/lib/assets';
import { servicePresentation } from '@/lib/service-presentation';
import { SiteImage } from './SiteImage';
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs wrap" aria-label="Brotkrumennavigation">
      <Link href="/">Startseite</Link>
      {items.map((i, k) => (
        <span key={k}>
          <span aria-hidden="true">/</span>
          {i.href ? (
            <Link href={i.href}>{i.label}</Link>
          ) : (
            <span aria-current="page">{i.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function ServiceCard({
  service,
  index = 0,
  city,
  visual = false,
}: {
  service: ServicePreview;
  index?: number;
  city?: string;
  visual?: boolean;
}) {
  return (
    <Link
      className={`service-card${visual ? ' service-card-visual' : ''}`}
      href={city ? `/einsatzgebiete/${city}/${service.slug}` : `/leistungen/${service.slug}`}
      data-event="service_select"
      data-service={service.slug}
      data-city={city}
    >
      {visual && (
        <div className="service-card-photo">
          <SiteImage
            image={assets[servicePresentation[service.slug].image]}
            alt={`${servicePresentation[service.slug].alt} – illustrative Darstellung`}
            width="1536"
            height="1024"
            loading="lazy"
          />
        </div>
      )}
      <div className="service-card-top">
        <span className="service-icon">
          <Icon name={service.icon} size={27} />
        </span>
        <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <span className="service-category">{service.category}</span>
      <h3>{service.name}</h3>
      <p>{service.summary}</p>
      <span className="text-link">
        Leistung entdecken{' '}
        <span className="small-plus" aria-hidden="true">
          +
        </span>
      </span>
    </Link>
  );
}
export function ClosingCta({
  title = 'Saubere Sache. Klare Absprachen.',
  text = 'Erzählen Sie uns, was gereinigt werden soll. Wir klären den Umfang und erstellen ein Angebot, das zu Ihrem Objekt passt.',
  href = '/anfrage',
}: {
  title?: string;
  text?: string;
  href?: string;
}) {
  return (
    <section className="closing-section">
      <div className="wrap closing-inner">
        <div>
          <Eyebrow>Ihr nächster Schritt</Eyebrow>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="closing-actions">
          <Link
            className="button glass on-dark"
            href={href}
            data-event="cta_click"
            data-position="closing"
          >
            Unverbindlich anfragen
          </Link>
          <a href={site.phoneHref} className="simple-phone" data-event="phone_click">
            <Icon name="Phone" size={18} />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="faq-list">
      {items.map((f) => (
        <details key={f.question}>
          <summary>
            {f.question}
            <Icon name="ChevronDown" size={20} />
          </summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function Process() {
  return (
    <div className="process-grid">
      {[
        {
          n: '01',
          title: 'Sie sagen, was ansteht.',
          body: 'Wählen Sie die Leistung und beschreiben Sie Ihr Objekt. Ein paar Angaben zu Ort, Umfang und Termin reichen für den Anfang.',
          icon: 'ClipboardCheck',
        },
        {
          n: '02',
          title: 'Wir planen gemeinsam.',
          body: 'Wir klären offene Fragen und bei Bedarf einen Besichtigungstermin. Sie erhalten einen nachvollziehbaren Leistungsumfang.',
          icon: 'CalendarDays',
        },
        {
          n: '03',
          title: 'Wir kümmern uns darum.',
          body: 'Nach Ihrer Beauftragung reinigen wir zum vereinbarten Termin. Das Ergebnis und weitere Pflegeschritte besprechen wir mit Ihnen.',
          icon: 'CircleCheck',
        },
      ].map((x) => (
        <article key={x.n}>
          <div className="process-top">
            <span>{x.n}</span>
            <Icon name={x.icon} size={27} />
          </div>
          <h3>{x.title}</h3>
          <p>{x.body}</p>
        </article>
      ))}
    </div>
  );
}
export function JsonLd({ value }: { value: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, '\\u003c') }}
    />
  );
}
