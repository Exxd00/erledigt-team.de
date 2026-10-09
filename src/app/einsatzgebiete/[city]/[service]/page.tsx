import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb, ClosingCta, Eyebrow, FaqList, JsonLd } from '@/components/Shared';
import { Icon } from '@/components/Icon';
import { cities, services, cityBySlug, serviceBySlug } from '@/lib/content';
import { localContent } from '@/lib/local-content';
import { AnswerSummary } from '@/components/AnswerSummary';
import { RelatedGuide } from '@/components/GuideCards';
import { serviceAnswer } from '@/lib/answers';
import { absoluteUrl, pageGraph, serviceGraph } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/seo';
import { ServiceVisual, ServiceDecision } from '@/components/ServiceVisual';
import { nearbyCities } from '@/lib/regions';
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
  return pageMetadata(
    `/einsatzgebiete/${c.slug}/${s.slug}`,
    `${s.name} in ${c.name}`,
    `${s.name} in ${c.name} und Umgebung anfragen. ERLEDIGT TEAM aus Saterland: Umfang, Vorbereitung und Termine persönlich abstimmen.`,
  );
}
export default async function Page({ params }: Props) {
  const p = await params,
    c = cityBySlug(p.city),
    s = serviceBySlug(p.service);
  if (!c || !s) notFound();
  const content = localContent(c, s, cities),
    href = `/anfrage?leistung=${s.slug}&ort=${c.slug}`;
  const nearby = nearbyCities(c, cities);
  const path = `/einsatzgebiete/${c.slug}/${s.slug}`;
  const answer = serviceAnswer(s, c);
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
            {s.category} · {c.name} & Umgebung
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
        <ServiceVisual slug={s.slug} eager />
      </section>
      <AnswerSummary title={`${s.name} in ${c.name}: Was ist wichtig?`} answer={answer} />
      <ServiceDecision service={s} city={c.name} href={href} />
      <section id="vorbereitung" className="section surface-alt">
        <div className="wrap article-layout">
          <article className="article-content editorial-chapters">
            {content.sections.map((sec, i) => (
              <section id={`thema-${i}`} key={i}>
                <span className="chapter-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <h2>{sec.title}</h2>
                <p>{sec.body}</p>
              </section>
            ))}
          </article>
          <aside className="article-aside">
            <div className="local-note">
              <Icon name="MapPin" />
              <strong>{c.name} & Umgebung</strong>
              <p>
                Geplant von unserem Standort in Saterland. Zugang und Termin stimmen wir direkt für
                Ihr Objekt ab.
              </p>
            </div>
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
      <RelatedGuide service={s.slug} />
      <ClosingCta title={`Ihr Objekt in ${c.name}. Unser nächster Einsatz?`} href={href} />
      <JsonLd
        value={pageGraph(path, `${s.name} in ${c.name}`, answer, {
          mainEntity: { '@id': `${absoluteUrl(path)}#service` },
        })}
      />
      <JsonLd value={serviceGraph(s, path, c, answer)} />
    </>
  );
}
