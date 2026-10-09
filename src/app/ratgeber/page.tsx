import Link from 'next/link';
import { guides } from '@/lib/guides';
import { pageMetadata } from '@/lib/seo';
import { itemList, pageGraph } from '@/lib/structured-data';
import { Breadcrumb, ClosingCta, Eyebrow, JsonLd } from '@/components/Shared';
import { GuideCards } from '@/components/GuideCards';

const title = 'Reinigungsratgeber: auswählen, vergleichen und vorbereiten';
const description =
  'Praktische Entscheidungshilfen von ERLEDIGT TEAM: Reinigungsangebote vergleichen, Reinigungsarten unterscheiden und einen Einsatz vorbereiten.';
export const metadata = pageMetadata('/ratgeber', title, description);

export default function GuidesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Ratgeber' }]} />
      <section className="wrap page-intro">
        <Eyebrow>Der nächste Schritt wird einfacher</Eyebrow>
        <h1>
          Gut informiert.
          <br />
          <em>Sauber entschieden.</em>
        </h1>
        <p>
          Sie brauchen keine Fachbegriffe, um eine passende Reinigung anzufragen. Unsere Ratgeber
          helfen Ihnen, Ihr Vorhaben einzuordnen, Angebote verständlich zu vergleichen und die
          wichtigen Angaben vorzubereiten.
        </p>
      </section>
      <section className="wrap guide-directory" aria-label="Reinigungsratgeber">
        <GuideCards />
      </section>
      <section className="section wrap article-content guide-introduction">
        <h2>Beginnen Sie mit der Frage, die für Sie gerade wichtig ist</h2>
        <p>
          Geht es um den Preis, um die richtige Leistung oder um die Vorbereitung eines Termins?
          Diese drei Entscheidungen hängen zusammen. Ein Angebot lässt sich erst sinnvoll
          vergleichen, wenn der gewünschte Umfang verständlich beschrieben ist. Ein passender Umfang
          wiederum ergibt sich aus der Nutzung und dem Zustand Ihrer Räume. Die Ratgeber zeigen,
          welche Angaben dabei helfen und welche Punkte vor einer Beauftragung persönlich geklärt
          werden sollten.
        </p>
        <p>
          Für Privatkunden kann es zunächst um Fenster, Polster oder eine gründliche Auffrischung
          gehen. Unternehmen und Hausverwaltungen müssen häufig zusätzlich Arbeitszeiten, mehrere
          Nutzer und regelmäßige Abläufe berücksichtigen. Die Entscheidungshilfen lassen sich auf
          diese unterschiedlichen Situationen übertragen. Sie ersetzen jedoch keine individuelle
          Prüfung von Material, Zugänglichkeit und besonderen Anforderungen an Ihrem Objekt.
        </p>
        <h2>Klare Informationen statt pauschaler Zusagen</h2>
        <p>
          ERLEDIGT TEAM plant vom Standort Eschstraße 70 in Saterland aus Reinigungen in der
          Umgebung. Unsere Texte erklären das Leistungsangebot und die Vorbereitung einer Anfrage.
          Preise, verfügbare Termine und der konkrete Arbeitsumfang werden für das jeweilige Objekt
          abgestimmt. Deshalb finden Sie hier keine pauschalen Zeitversprechen oder Preise, die
          unabhängig von den tatsächlichen Voraussetzungen gelten sollen.
        </p>
        <p>
          Die Ratgeber unterscheiden außerdem zwischen Reinigung und anderen Aufgaben. Technische
          Wartung, Reparaturen oder die Beurteilung besonderer Materialien gehören nicht automatisch
          zu einem Reinigungsauftrag. Wenn eine solche Frage für Ihr Vorhaben wichtig ist, nennen
          Sie sie bitte schon im ersten Kontakt. So können offene Punkte vor einer Zusage
          angesprochen werden.
        </p>
        <h2>Von der Information zur passenden Anfrage</h2>
        <p>
          Jeder Ratgeber führt zu einer passenden Leistung. Wenn Sie Ihren Ort auswählen möchten,
          nutzen Sie unsere Übersicht der Einsatzgebiete. Für den Einstieg reichen eine grobe
          Beschreibung, Ort und Postleitzahl sowie eine Kontaktmöglichkeit. Fehlende Einzelheiten
          können anschließend gemeinsam ergänzt werden. Die Anfrage verpflichtet Sie noch nicht zur
          Beauftragung; über Umfang, Preis und einen verbindlichen Termin entscheiden Sie nach der
          Abstimmung.
        </p>
        <div className="related-links">
          <Link className="text-link" href="/fragen">
            Häufige Fragen beantworten
          </Link>
          <Link className="text-link" href="/leistungen">
            Passende Leistung finden
          </Link>
          <Link className="text-link" href="/einsatzgebiete">
            Meinen Ort auswählen
          </Link>
        </div>
      </section>
      <ClosingCta />
      <JsonLd
        value={pageGraph('/ratgeber', title, description, {
          '@type': 'CollectionPage',
          mainEntity: itemList(
            guides.map((guide) => ({ name: guide.title, path: `/ratgeber/${guide.slug}` })),
          ),
        })}
      />
    </>
  );
}
