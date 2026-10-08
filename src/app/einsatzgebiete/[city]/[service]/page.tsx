import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb, ClosingCta, Eyebrow, FaqList, JsonLd } from '@/components/Shared';
import { Icon } from '@/components/Icon';
import { cities, services, cityBySlug, serviceBySlug } from '@/lib/content';
import { localContent } from '@/lib/local-content';
import { site } from '@/lib/site';
export const dynamicParams = false;
export function generateStaticParams() {
  return cities.flatMap((c) => services.map((s) => ({ city: c.slug, service: s.slug })));
}
type Props = { params: Promise<{ city: string; service: string }> };
export async function generateMetadata({ params }: Props) {
  const p = await params,
    c = cityBySlug(p.city),
    s = serviceBySlug(p.service);
  if (!c || !s) return {};
  return {
    title: `${s.name} in ${c.name}`,
    description: localContent(c, s, cities).description,
    alternates: { canonical: `/einsatzgebiete/${c.slug}/${s.slug}` },
  };
}
export default async function Page({ params }: Props) {
  const p = await params,
    c = cityBySlug(p.city),
    s = serviceBySlug(p.service);
  if (!c || !s) notFound();
  const content = localContent(c, s, cities),
    href = `/anfrage?leistung=${s.slug}&ort=${c.slug}`;
  const nearby = cities
    .filter((x) => x.slug !== c.slug)
    .sort(
      (a, b) => Math.hypot(a.lat - c.lat, a.lon - c.lon) - Math.hypot(b.lat - c.lat, b.lon - c.lon),
    )
    .slice(0, 6);
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Einsatzgebiete', href: '/einsatzgebiete' },
          { label: c.name, href: `/einsatzgebiete/${c.slug}` },
          { label: s.name },
        ]}
      />
      <section className="wrap detail-hero">
        <div>
          <Eyebrow>
            {s.category} · {c.name}
          </Eyebrow>
          <h1>
            {s.name}
            <br />
            <em>in {c.name}.</em>
          </h1>
          <p className="lead">
            {s.summary} Wir klären, was Ihr Objekt in {c.name} braucht, und planen den Einsatz von
            Saterland aus.
          </p>
          <div className="detail-actions">
            <Link
              className="button glass"
              href={href}
              data-event="cta_click"
              data-service={s.slug}
              data-city={c.slug}
            >
              Diese Reinigung anfragen <Icon name="ArrowUpRight" size={18} />
            </Link>
            <a href="#vorbereitung" className="simple-phone">
              Erst informieren <Icon name="ArrowDown" size={18} />
            </a>
          </div>
        </div>
        <aside className="quick-panel">
          <span className="service-icon">
            <Icon name={s.icon} size={28} />
          </span>
          <h2>Das hilft uns beim Planen.</h2>
          <ul className="check-list">
            {s.formHints.map((h) => (
              <li key={h}>
                <Icon name="Check" size={18} />
                {h}
              </li>
            ))}
          </ul>
          <p>
            {c.distanceKm === 0
              ? 'Direkt an unserem Standort Saterland.'
              : `Ca. ${c.distanceKm} km Luftlinie von unserem Standort. Keine pauschale Anfahrtsberechnung.`}
          </p>
        </aside>
      </section>
      <section id="vorbereitung" className="section surface-alt">
        <div className="wrap article-layout">
          <article className="article-content">
            {content.sections.map((sec, i) => (
              <section id={`thema-${i}`} key={i}>
                <h2>{sec.title}</h2>
                <p>{sec.body}</p>
              </section>
            ))}
          </article>
          <aside className="article-aside">
            <h2>Für Ihre Entscheidung</h2>
            {content.sections.map((sec, i) => (
              <a key={i} href={`#thema-${i}`}>
                {sec.title}
              </a>
            ))}
            <Link href={href} className="button glass">
              Anfrage vorbereiten
            </Link>
          </aside>
        </div>
      </section>
      <section className="section wrap faq-section">
        <div>
          <Eyebrow>Vor der Anfrage</Eyebrow>
          <h2>
            Gut informiert.
            <br />
            <em>Klar entschieden.</em>
          </h2>
          <p className="section-intro">
            Der konkrete Umfang ergibt sich aus Ihrem Objekt. Ihre Anfrage ist der erste Schritt zur
            gemeinsamen Klärung.
          </p>
        </div>
        <FaqList items={s.faqs} />
      </section>
      <section className="wrap related">
        <h2>Mehr für Ihr Objekt in {c.name}</h2>
        <div className="city-cloud">
          {services
            .filter((x) => x.slug !== s.slug)
            .map((x) => (
              <Link key={x.slug} href={`/einsatzgebiete/${c.slug}/${x.slug}`}>
                {x.name}
              </Link>
            ))}
        </div>
        <div className="related-links">
          <Link className="text-link" href={`/einsatzgebiete/${c.slug}`}>
            Alle Leistungen in {c.name} <Icon name="ArrowUpRight" size={18} />
          </Link>
          <Link className="text-link" href={`/leistungen/${s.slug}`}>
            {s.name} im Überblick <Icon name="ArrowUpRight" size={18} />
          </Link>
        </div>
      </section>
      <section className="section wrap">
        <h2 className="nearby-title">Auch in Ihrer Umgebung</h2>
        <div className="city-cloud">
          {nearby.map((x) => (
            <Link key={x.slug} href={`/einsatzgebiete/${x.slug}/${s.slug}`}>
              {s.name} in {x.name}
            </Link>
          ))}
        </div>
      </section>
      <ClosingCta title={`Ihr Objekt in ${c.name}. Unser nächster Einsatz?`} href={href} />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${s.name} in ${c.name}`,
          serviceType: s.name,
          provider: { '@id': `${site.url}/#business` },
          areaServed: { '@type': 'Place', name: c.name },
          url: `${site.url}/einsatzgebiete/${c.slug}/${s.slug}`,
        }}
      />
    </>
  );
}
