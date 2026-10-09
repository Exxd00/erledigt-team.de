import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, guideBySlug } from '@/lib/guides';
import { serviceBySlug } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl, businessId, contentUpdatedAt, pageGraph } from '@/lib/structured-data';
import { Breadcrumb, ClosingCta, Eyebrow, FaqList, JsonLd } from '@/components/Shared';
import { AnswerSummary } from '@/components/AnswerSummary';
import { ServiceVisual } from '@/components/ServiceVisual';
import { Icon } from '@/components/Icon';
import { assets } from '@/lib/assets';
import { servicePresentation } from '@/lib/service-presentation';

export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const guide = guideBySlug((await params).slug);
  return guide ? pageMetadata(`/ratgeber/${guide.slug}`, guide.title, guide.description) : {};
}
export default async function GuidePage({ params }: Props) {
  const guide = guideBySlug((await params).slug);
  if (!guide) notFound();
  const path = `/ratgeber/${guide.slug}`;
  const service = serviceBySlug(guide.serviceSlug)!;
  return (
    <>
      <Breadcrumb items={[{ label: 'Ratgeber', href: '/ratgeber' }, { label: guide.label }]} />
      <section className="wrap detail-hero guide-hero">
        <div>
          <Eyebrow>{guide.label}</Eyebrow>
          <h1>{guide.title}</h1>
          <p className="lead">{guide.description}</p>
          <p className="editorial-byline">
            Von <Link href="/ueber-uns">ERLEDIGT TEAM Gebäudeservice</Link> · Veröffentlicht am{' '}
            <time dateTime={contentUpdatedAt}>9. Oktober 2026</time>
          </p>
        </div>
        <ServiceVisual slug={guide.serviceSlug} eager />
      </section>
      <AnswerSummary title="Die kurze Antwort" answer={guide.summary} />
      <section className="section wrap article-layout">
        <article className="article-content editorial-chapters">
          {guide.sections.map((section, i) => (
            <section key={section.id} id={section.id}>
              <span className="chapter-number" aria-hidden="true">
                0{i + 1}
              </span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.checklist && (
                <ul className="guide-checklist">
                  {section.checklist.map((item) => (
                    <li key={item}>
                      <Icon name="Check" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <section id="vergleichstabelle">
            <h2>Auf einen Blick</h2>
            <div
              className="comparison-scroll"
              role="region"
              aria-label={guide.comparison.caption}
              tabIndex={0}
            >
              <table className="comparison-table">
                <caption>{guide.comparison.caption}</caption>
                <thead>
                  <tr>
                    {guide.comparison.headers.map((header) => (
                      <th scope="col" key={header}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.comparison.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) =>
                        i === 0 ? (
                          <th scope="row" key={i}>
                            {cell}
                          </th>
                        ) : (
                          <td key={i}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </article>
        <aside className="article-aside">
          <h2>In diesem Ratgeber</h2>
          {guide.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
          <a href="#vergleichstabelle">Auf einen Blick</a>
          <Link href={`/leistungen/${service.slug}`} className="text-link">
            {service.name} ansehen
          </Link>
          <Link href={`/anfrage?leistung=${service.slug}`} className="button glass">
            Mein Vorhaben anfragen
          </Link>
        </aside>
      </section>
      <section className="section wrap faq-section">
        <div>
          <Eyebrow>Noch eine Frage?</Eyebrow>
          <h2>
            Die nächsten
            <br />
            <em>Antworten.</em>
          </h2>
          <Link className="text-link" href="/fragen">
            Alle Fragen & Antworten
          </Link>
        </div>
        <FaqList items={guide.faqs} />
      </section>
      <section className="wrap related">
        <h2>Weiterlesen</h2>
        <div className="city-cloud">
          {guides
            .filter((item) => item.slug !== guide.slug)
            .map((item) => (
              <Link href={`/ratgeber/${item.slug}`} key={item.slug}>
                {item.title}
              </Link>
            ))}
        </div>
      </section>
      <ClosingCta href={`/anfrage?leistung=${service.slug}`} />
      <JsonLd
        value={pageGraph(path, guide.title, guide.description, {
          mainEntity: { '@id': `${absoluteUrl(path)}#article` },
        })}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${absoluteUrl(path)}#article`,
          headline: guide.title,
          description: guide.description,
          abstract: guide.summary,
          image: [absoluteUrl(assets[servicePresentation[guide.serviceSlug].image].fallback)],
          inLanguage: 'de-DE',
          datePublished: contentUpdatedAt,
          dateModified: contentUpdatedAt,
          author: {
            '@type': 'Organization',
            '@id': businessId,
            name: 'ERLEDIGT TEAM',
            url: absoluteUrl('/ueber-uns'),
          },
          publisher: { '@id': businessId },
          mainEntityOfPage: { '@id': `${absoluteUrl(path)}#webpage` },
          about: { '@id': `${absoluteUrl(`/leistungen/${service.slug}`)}#service` },
        }}
      />
    </>
  );
}
