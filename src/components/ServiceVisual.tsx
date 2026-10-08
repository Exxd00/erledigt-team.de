import Link from 'next/link';
import { assets } from '@/lib/assets';
import { servicePresentation } from '@/lib/service-presentation';
import { type Service } from '@/lib/site';
import { Icon } from './Icon';
import { SiteImage } from './SiteImage';

export function ServiceVisual({ slug, eager = false }: { slug: string; eager?: boolean }) {
  const p = servicePresentation[slug];
  return (
    <figure className={`service-visual visual-${p.image}`}>
      <SiteImage
        image={assets[p.image]}
        alt={`${p.alt} – KI-generiertes Motiv`}
        width="1536"
        height="1024"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
      />
      <figcaption>
        <span>{p.focus}</span>
        <small>Illustrative Darstellung</small>
      </figcaption>
    </figure>
  );
}

export function ServiceDecision({
  service,
  city,
  href,
}: {
  service: Service;
  city?: string;
  href: string;
}) {
  const p = servicePresentation[service.slug];
  return (
    <section className="section wrap decision-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span />
            Ihr Objekt entscheidet
          </p>
          <h2>{p.promise}</h2>
        </div>
        <p className="section-intro">
          {city
            ? `Für Ihren Einsatz in ${city} klären wir diese Punkte gemeinsam.`
            : 'Mit diesen drei Fragen wird aus einem Wunsch ein passender Reinigungsauftrag.'}
        </p>
      </div>
      <div className="decision-grid">
        {p.decisions.map(([title, body], i) => (
          <article key={title}>
            <span className="decision-number">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="scope-bar">
        <div>
          <strong>Das nehmen wir gemeinsam auf:</strong>
          <ul>
            {p.outcomes.map((item) => (
              <li key={item}>
                <Icon name="Check" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Link
          className="button glass"
          href={href}
          data-event="cta_click"
          data-service={service.slug}
          data-position="service_decision"
        >
          Passendes Angebot anfragen
          <Icon name="ArrowUpRight" size={18} />
        </Link>
      </div>
    </section>
  );
}
