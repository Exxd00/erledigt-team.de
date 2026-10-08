import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, ClosingCta, Eyebrow, ServiceCard } from '@/components/Shared';
import { Icon } from '@/components/Icon';
import { services, cities, cityBySlug } from '@/lib/content';
export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const c = cityBySlug((await params).city);
  return c
    ? {
        title: `Gebäudereinigung in ${c.name}`,
        description: `Reinigung in ${c.name} anfragen: Gebäude, Fenster, Gewerbe und Spezialreinigung. ERLEDIGT TEAM plant Ihren Einsatz vom Standort Saterland aus.`,
        alternates: { canonical: `/einsatzgebiete/${c.slug}` },
      }
    : {};
}
export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const c = cityBySlug((await params).city);
  if (!c) notFound();
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Einsatzgebiete', href: '/einsatzgebiete' }, { label: c.name }]}
      />
      <section className="wrap detail-hero">
        <div>
          <Eyebrow>
            {c.distanceKm === 0
              ? 'Unser Standort'
              : `Einsatzgebiet · ca. ${c.distanceKm} km Luftlinie`}
          </Eyebrow>
          <h1>
            Sauberkeit für {c.name}.<br />
            <em>ERLEDIGT TEAM.</em>
          </h1>
          <p className="lead">{c.summary}</p>
          <Link
            className="button glass"
            href={`/anfrage?ort=${c.slug}`}
            data-event="cta_click"
            data-city={c.slug}
          >
            Reinigung in {c.name} anfragen
          </Link>
        </div>
        <aside className="quick-panel">
          <span className="service-icon">
            <Icon name="MapPin" size={28} />
          </span>
          <h2>Von Saterland zu Ihnen.</h2>
          <p>Ein Ansprechpartner, elf Leistungen und eine Planung, die zu Ihrem Objekt passt.</p>
          <p>
            Unser Standort: Eschstraße 70, 26683 Saterland. Die Einsatzmöglichkeit prüfen wir anhand
            Ihrer Adresse.
          </p>
        </aside>
      </section>
      <section className="section surface-alt">
        <div className="wrap article-layout">
          <article className="article-content">
            {c.sections.map((sec) => (
              <section key={sec.title}>
                <h2>{sec.title}</h2>
                {sec.body.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </article>
          <aside className="article-aside">
            <h2>Leistungen in {c.name}</h2>
            {services.map((s) => (
              <Link key={s.slug} href={`/einsatzgebiete/${c.slug}/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </aside>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Was steht an?</Eyebrow>
            <h2>
              Unsere Leistungen
              <br />
              <em>in {c.name}.</em>
            </h2>
          </div>
          <p className="section-intro">
            Öffnen Sie eine Leistung für konkrete Hinweise und eine Anfrage mit Ihrem Ort.
          </p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} city={c.slug} />
          ))}
        </div>
      </section>
      <section className="wrap related">
        <h2>Weitere Orte entdecken</h2>
        <div className="city-cloud">
          {cities
            .filter((x) => x.slug !== c.slug)
            .slice(0, 10)
            .map((x) => (
              <Link key={x.slug} href={`/einsatzgebiete/${x.slug}`}>
                {x.name}
              </Link>
            ))}
        </div>
      </section>
      <ClosingCta href={`/anfrage?ort=${c.slug}`} title={`Ihr nächster Schritt in ${c.name}.`} />
    </>
  );
}
