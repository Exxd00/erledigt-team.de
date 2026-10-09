import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumb, ClosingCta, Eyebrow, FaqList, JsonLd } from '@/components/Shared';
import { Icon } from '@/components/Icon';
import { services, cities, serviceBySlug } from '@/lib/content';
import { site } from '@/lib/site';
import { ServiceVisual, ServiceDecision } from '@/components/ServiceVisual';
import { AnswerSummary } from '@/components/AnswerSummary';
import { RelatedGuide } from '@/components/GuideCards';
import { serviceAnswer } from '@/lib/answers';
import { absoluteUrl, pageGraph, questionEntities, serviceGraph } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  return s
    ? pageMetadata(`/leistungen/${s.slug}`, `${s.name} in Saterland & Umgebung`, s.summary)
    : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const href = `/anfrage?leistung=${s.slug}`;
  const path = `/leistungen/${s.slug}`;
  const answer = serviceAnswer(s);
  return (
    <>
      <Breadcrumb items={[{ label: 'Leistungen', href: '/leistungen' }, { label: s.name }]} />
      <section className="wrap detail-hero">
        <div>
          <Eyebrow>{s.category}</Eyebrow>
          <h1>
            {s.name}.<br />
            <em>Mit Sorgfalt erledigt.</em>
          </h1>
          <p className="lead">{s.summary}</p>
          <div className="detail-actions">
            <Link className="button glass" href={href} data-event="cta_click" data-service={s.slug}>
              Diese Reinigung anfragen
            </Link>
            <a className="simple-phone" href={site.phoneHref} data-event="phone_click">
              <Icon name="Phone" size={18} />
              {site.phone}
            </a>
          </div>
        </div>
        <ServiceVisual slug={s.slug} eager />
      </section>
      <AnswerSummary title={`Was umfasst ${s.name}?`} answer={answer} />
      <ServiceDecision service={s} href={href} />
      <section className="section surface-alt">
        <div className="wrap article-layout">
          <article className="article-content editorial-chapters">
            {s.sections.map((sec, i) => (
              <section id={`abschnitt-${i}`} key={sec.title}>
                <span className="chapter-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <h2>{sec.title}</h2>
                {sec.body.split('\n\n').map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </section>
            ))}
          </article>
          <aside className="article-aside">
            <h2>Auf dieser Seite</h2>
            {s.sections.map((x, i) => (
              <a key={x.title} href={`#abschnitt-${i}`}>
                {x.title}
              </a>
            ))}
            <Link className="button glass" href={href}>
              Angebot anfragen
            </Link>
          </aside>
        </div>
      </section>
      <section className="section wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>In Ihrer Nähe</Eyebrow>
            <h2>
              {s.name}
              <br />
              <em>an Ihrem Standort.</em>
            </h2>
          </div>
          <p className="section-intro">
            Wählen Sie Ihren Ort für Hinweise zum Einsatz und eine bereits passend vorbereitete
            Anfrage.
          </p>
        </div>
        <div className="city-cloud">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/einsatzgebiete/${c.slug}/${s.slug}`}
              data-event="city_select"
              data-city={c.slug}
              data-service={s.slug}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>
      {s.faqs.length > 0 && (
        <section className="section wrap faq-section">
          <div>
            <Eyebrow>Ihre Fragen</Eyebrow>
            <h2>
              Vorher wissen,
              <br />
              <em>was wichtig ist.</em>
            </h2>
          </div>
          <FaqList items={s.faqs} />
        </section>
      )}
      <RelatedGuide service={s.slug} />
      <ClosingCta href={href} />
      <JsonLd
        value={pageGraph(path, `${s.name} in Saterland & Umgebung`, answer, {
          mainEntity: { '@id': `${absoluteUrl(path)}#service` },
        })}
      />
      <JsonLd value={serviceGraph(s, path, cities, answer)} />
      {s.faqs.length > 0 && (
        <JsonLd
          value={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${absoluteUrl(path)}#fragen`,
            mainEntity: questionEntities(s.faqs),
          }}
        />
      )}
    </>
  );
}
