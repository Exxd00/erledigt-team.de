import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb, ClosingCta, Eyebrow, FaqList, JsonLd, ServiceCard } from '@/components/Shared';
import { AnswerSummary } from '@/components/AnswerSummary';
import { Icon } from '@/components/Icon';
import { SiteImage } from '@/components/SiteImage';
import { businessPages } from '@/lib/business-pages';
import { serviceBySlug } from '@/lib/content';
import { assets } from '@/lib/assets';
import { absoluteUrl, pageGraph, questionEntities } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return businessPages.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = businessPages.find((page) => page.slug === slug);
  return page
    ? pageMetadata(
        `/geschaeftskunden/${page.slug}`,
        `${page.name}: Gebäudeservice in Saterland & Umgebung`,
        page.description,
      )
    : {};
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = businessPages.find((page) => page.slug === slug);
  if (!page) notFound();
  const path = `/geschaeftskunden/${page.slug}`;
  const href = `/anfrage?objekt=${page.property}`;
  return (
    <>
      <Breadcrumb
        items={[{ label: 'Für Unternehmen', href: '/geschaeftskunden' }, { label: page.name }]}
      />
      <section className="wrap detail-hero business-hero">
        <div>
          <Eyebrow>{page.name} · Saterland & Umgebung</Eyebrow>
          <h1>{page.title}</h1>
          <p className="lead">{page.description}</p>
          <div className="detail-actions">
            <Link
              href={href}
              className="button glass"
              data-event="cta_click"
              data-position="business_hero"
            >
              Passendes Angebot anfragen <Icon name="ArrowUpRight" size={18} />
            </Link>
            <a href="#leistungen" className="text-link">
              Passende Leistungen
            </a>
          </div>
        </div>
        <figure className="service-visual">
          <SiteImage
            image={assets[page.image]}
            alt={`${page.alt} – illustrative Darstellung`}
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <figcaption>
            <span>{page.focus}</span>
            <small>Illustrative Darstellung</small>
          </figcaption>
        </figure>
      </section>
      <AnswerSummary
        title={`Was ist für ${page.name} entscheidend?`}
        answer={page.answer}
        facts={page.priorities.map((value, index) => ({
          label: `Schwerpunkt 0${index + 1}`,
          value,
        }))}
      />
      <section className="section surface-alt">
        <div className="wrap article-layout">
          <article className="article-content editorial-chapters">
            {page.sections.map((section, index) => (
              <section id={`abschnitt-${index}`} key={section.title}>
                <span className="chapter-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </article>
          <aside className="article-aside">
            <h2>Ihr Weg zum Angebot</h2>
            {page.sections.map((section, index) => (
              <a key={section.title} href={`#abschnitt-${index}`}>
                {section.title}
              </a>
            ))}
            <Link href={href} className="button glass">
              Objekt anfragen
            </Link>
          </aside>
        </div>
      </section>
      <section className="section wrap" id="leistungen">
        <div className="section-heading">
          <div>
            <Eyebrow>Passend zu Ihrem Bedarf</Eyebrow>
            <h2>
              Diese Leistungen
              <br />
              <em>lassen sich verbinden.</em>
            </h2>
          </div>
          <p className="section-intro">
            Sie wählen die benötigten Aufgaben. Jede Leistung wird mit ihrem konkreten Umfang und
            passenden Voraussetzungen abgestimmt.
          </p>
        </div>
        <div className="service-grid">
          {page.services.map((slug, index) => {
            const service = serviceBySlug(slug);
            return service ? <ServiceCard key={slug} service={service} index={index} /> : null;
          })}
        </div>
      </section>
      <section className="section wrap">
        <div className="business-brief">
          <div>
            <Eyebrow>Für den ersten Kontakt</Eyebrow>
            <h2>Diese Angaben helfen uns.</h2>
            <p>Grobe Angaben reichen zum Start. Details klären wir gemeinsam.</p>
          </div>
          <ul className="check-list">
            {page.brief.map((item) => (
              <li key={item}>
                <Icon name="Check" size={20} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={href}
            className="button glass"
            data-event="cta_click"
            data-position="business_brief"
          >
            Meine Anfrage vorbereiten <Icon name="ArrowUpRight" size={18} />
          </Link>
        </div>
      </section>
      <section className="section wrap faq-section">
        <div>
          <Eyebrow>Gut zu wissen</Eyebrow>
          <h2>
            Ihre Fragen.
            <br />
            <em>Klar beantwortet.</em>
          </h2>
        </div>
        <FaqList items={page.faqs} />
      </section>
      <section className="wrap related">
        <h2>Weitere Branchen</h2>
        <div className="city-cloud">
          {businessPages
            .filter((other) => other.slug !== page.slug)
            .map((other) => (
              <Link key={other.slug} href={`/geschaeftskunden/${other.slug}`}>
                {other.name}
              </Link>
            ))}
        </div>
      </section>
      <ClosingCta href={href} title="Sagen Sie uns, was Ihr Objekt braucht." />
      <JsonLd
        value={pageGraph(path, page.name, page.description, {
          audience: { '@type': 'BusinessAudience', audienceType: page.name },
        })}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${absoluteUrl(path)}#fragen`,
          mainEntity: questionEntities(page.faqs),
        }}
      />
    </>
  );
}
