import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, ClosingCta, Eyebrow, ServiceCard } from '@/components/Shared';
import { Icon } from '@/components/Icon';
import { services, cities, cityBySlug } from '@/lib/content';
import { ServiceVisual } from '@/components/ServiceVisual';
import { nearbyCities, cityRegion } from '@/lib/regions';
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
  const imageService = ['textil', 'privat'].includes(c.lens || c.tags[0])
    ? 'polster-teppichreinigung'
    : ['bau', 'gewerbe', 'technik'].includes(c.lens || c.tags[0])
      ? 'hallen-gewerbereinigung'
      : ['aussen', 'fenster'].includes(c.lens || c.tags[0])
        ? 'glas-fensterreinigung'
        : 'buero-praxisreinigung';
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Einsatzgebiete', href: '/einsatzgebiete' }, { label: c.name }]}
      />
      <section className="wrap detail-hero">
        <div>
          <Eyebrow>
            {c.slug === 'saterland' ? 'Unser Standort · Saterland & Umgebung' : cityRegion(c)}
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
        <ServiceVisual slug={imageService} eager />
      </section>
      <section className="section surface-alt">
        <div className="wrap article-layout">
          <article className="article-content editorial-chapters">
            {c.sections.map((sec, i) => (
              <section key={sec.title}>
                <span className="chapter-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <h2>{sec.title}</h2>
                {sec.body.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </article>
          <aside className="article-aside">
            <div className="local-note">
              <Icon name="MapPin" />
              <strong>{c.name} & Umgebung</strong>
              <p>
                Unser Ausgangspunkt: Eschstraße 70, 26683 Saterland. Wir prüfen die
                Einsatzmöglichkeit anhand Ihrer Objektadresse.
              </p>
            </div>
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
            <ServiceCard key={s.slug} service={s} index={i} city={c.slug} visual={i < 3} />
          ))}
        </div>
      </section>
      <section className="wrap related">
        <h2>Weitere Orte entdecken</h2>
        <div className="city-cloud">
          {nearbyCities(c, cities, 8).map((x) => (
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
