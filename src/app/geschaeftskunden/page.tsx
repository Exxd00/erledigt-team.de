import Link from 'next/link';
import { Breadcrumb, ClosingCta, Eyebrow, JsonLd } from '@/components/Shared';
import { BusinessDirectory } from '@/components/BusinessDirectory';
import { SeasonalServices } from '@/components/SeasonalServices';
import { SiteImage } from '@/components/SiteImage';
import { Icon } from '@/components/Icon';
import { businessPages, businessHubSections } from '@/lib/business-pages';
import { assets } from '@/lib/assets';
import { itemList, pageGraph } from '@/lib/structured-data';
import { pageMetadata } from '@/lib/seo';

const description =
  'Gebäudeservice für Unternehmen in Saterland und Umgebung: eigene Lösungen für Verwaltung, Büro, Handel und Industrie. Reinigung, Grünpflege und Winterdienst.';
export const metadata = pageMetadata(
  '/geschaeftskunden',
  'Gebäudeservice für Unternehmen in Saterland & Umgebung',
  description,
);

export default function Page() {
  const previews = businessPages.map(({ slug, name, description, focus, icon, image, alt }) => ({
    slug,
    name,
    description,
    focus,
    icon,
    image,
    alt,
  }));
  return (
    <>
      <Breadcrumb items={[{ label: 'Für Unternehmen' }]} />
      <section className="wrap detail-hero business-hero">
        <div>
          <Eyebrow>Für Unternehmen & Verwaltungen</Eyebrow>
          <h1>
            Ihr Betrieb läuft.
            <br />
            <em>Wir pflegen das Umfeld.</em>
          </h1>
          <p className="lead">
            Reinigung, Außenpflege und Winterdienst aus Saterland. Mit klaren Aufgaben, passenden
            Zeitfenstern und einem Ansprechpartner für Ihren Auftrag.
          </p>
          <div className="detail-actions">
            <Link
              className="button glass"
              href="/anfrage?objekt=gewerbe"
              data-event="cta_click"
              data-position="business_hero"
            >
              Objektbetreuung anfragen <Icon name="ArrowUpRight" size={18} />
            </Link>
            <a className="text-link" href="#branchen">
              Ihre Branche finden
            </a>
          </div>
        </div>
        <figure className="service-visual">
          <SiteImage
            image={assets.office}
            alt="Gepflegter Empfang in einem Unternehmen – illustrative Darstellung"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <figcaption>
            <span>Für Menschen. Für Räume. Für Ihren Alltag.</span>
            <small>Illustrative Darstellung</small>
          </figcaption>
        </figure>
      </section>
      <section className="section wrap" id="branchen">
        <div className="section-heading">
          <div>
            <Eyebrow>Was passt zu Ihrem Betrieb?</Eyebrow>
            <h2>
              Ihre Branche.
              <br />
              <em>Ihr eigener Plan.</em>
            </h2>
          </div>
          <p className="section-intro">
            Wählen Sie Ihre Situation. Jede Seite erklärt die entscheidenden Anforderungen und führt
            zu den passenden Leistungen.
          </p>
        </div>
        <BusinessDirectory pages={previews} />
      </section>
      <section className="section wrap business-editorial">
        <article className="article-content editorial-chapters">
          {businessHubSections.map((section, index) => (
            <section key={section.title}>
              <span className="chapter-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
      </section>
      <SeasonalServices />
      <ClosingCta
        title="Ihr Objekt. Gemeinsam gut organisiert."
        text="Nennen Sie uns Branche, Ort und die gewünschten Aufgaben. Wir klären mit Ihnen Umfang, Zeitfenster und die nächsten Schritte."
        href="/anfrage?objekt=gewerbe"
      />
      <JsonLd
        value={pageGraph('/geschaeftskunden', 'Gebäudeservice für Unternehmen', description, {
          '@type': 'CollectionPage',
          mainEntity: itemList(
            businessPages.map((page) => ({
              name: page.name,
              path: `/geschaeftskunden/${page.slug}`,
            })),
          ),
        })}
      />
    </>
  );
}
