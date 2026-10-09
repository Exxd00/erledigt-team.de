import { Breadcrumb, ClosingCta, Eyebrow, JsonLd } from '@/components/Shared';
import { itemList, pageGraph } from '@/lib/structured-data';
import { ServiceDirectory } from '@/components/Directories';
import { servicePreviews } from '@/lib/content';
export const metadata = {
  title: 'Unsere Reinigungsleistungen',
  description:
    'Alle 11 Reinigungsleistungen von ERLEDIGT TEAM: Gebäudereinigung, Glas, Industrie und Spezialreinigung. Finden Sie die passende Leistung.',
  alternates: { canonical: '/leistungen' },
};
export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Leistungen' }]} />
      <div className="wrap">
        <div className="page-intro">
          <Eyebrow>Unsere Leistungen</Eyebrow>
          <h1>
            Was sauber werden soll,
            <br />
            <em>nehmen wir persönlich.</em>
          </h1>
          <p>
            Vom einzelnen Fenster bis zur regelmäßigen Objektpflege: Finden Sie die passende
            Reinigung für Ihr Zuhause oder Ihren Betrieb.
          </p>
        </div>
        <div className="directory-content">
          <ServiceDirectory services={servicePreviews} />
          <section className="service-directory-note">
            <h2>Eine Reinigung, die zu Ihrem Objekt passt</h2>
            <p>
              Jede Fläche stellt andere Anforderungen. Im Treppenhaus zählt ein verlässlicher
              Rhythmus, in einem Büro die Abstimmung mit den Arbeitszeiten. Bei Glasflächen spielen
              Rahmen, Falze und die sichere Erreichbarkeit eine Rolle. ERLEDIGT TEAM betrachtet
              deshalb zunächst das ganze Objekt und anschließend die einzelnen Aufgaben. So wird aus
              einer allgemeinen Anfrage ein nachvollziehbarer Leistungsumfang.
            </p>
            <p>
              Sie können unsere Leistungen einzeln anfragen oder mehrere Bereiche miteinander
              verbinden. Wenn zum Beispiel nach einer Renovierung sowohl Böden als auch Fenster
              gereinigt werden sollen, hilft eine gemeinsame Planung. Bei laufender Betreuung legen
              wir fest, welche Aufgaben bei jedem Besuch anstehen und welche in größeren Abständen
              sinnvoll sind. Das schafft Orientierung und erleichtert spätere Anpassungen.
            </p>
            <h2>Welche Angaben helfen bei der Planung?</h2>
            <p>
              Nennen Sie uns den Ort, die Art des Gebäudes und die gewünschten Flächen. Eine grobe
              Größenangabe reicht zunächst aus. Hilfreich sind außerdem Hinweise zur Verschmutzung,
              zu empfindlichen Materialien und zum Zugang. Wenn Sie unsicher sind, welches Verfahren
              geeignet ist, beschreiben Sie lieber das gewünschte Ergebnis. Die passende
              Vorgehensweise klären wir im Gespräch.
            </p>
            <p>
              Besondere Sicherheitsanforderungen stimmen wir vor dem Einsatz ab. Dazu gehören etwa
              Arbeiten in der Nähe technischer Anlagen, schwer erreichbare Außenflächen oder
              zeitliche Einschränkungen im laufenden Betrieb. Ein angefragter Termin ist noch keine
              verbindliche Zusage. Erst nach Prüfung der Voraussetzungen und Ihrer Beauftragung wird
              der Einsatz fest geplant.
            </p>
            <h2>Regelmäßig oder einmalig – beides beginnt mit klaren Absprachen</h2>
            <p>
              Eine einzelne Grundreinigung kann den Start für eine anschließend einfachere Pflege
              bilden. Ein regelmäßiger Reinigungsplan wiederum soll den Aufwand im Alltag
              kalkulierbar machen. Welche Lösung für Sie sinnvoll ist, hängt von der Nutzung und dem
              Zustand Ihrer Räume ab. Wir besprechen gemeinsam, wie häufig welche Flächen gereinigt
              werden sollen und welche Vorbereitungen dafür nötig sind.
            </p>
            <p>
              Unser Standort liegt in Saterland. Für Aufträge in der Umgebung planen wir Anfahrt,
              Zugänglichkeit und Arbeitsumfang zusammen. Nutzen Sie die Filter, um einen Bereich
              einzugrenzen, oder senden Sie direkt eine Anfrage mit mehreren gewünschten Leistungen.
              Sie müssen die Reinigung vorab weder technisch beurteilen noch ein vollständiges
              Leistungsverzeichnis erstellen.
            </p>
          </section>
        </div>
      </div>
      <ClosingCta />
      <JsonLd
        value={pageGraph('/leistungen', 'Unsere Reinigungsleistungen', metadata.description, {
          '@type': 'CollectionPage',
          mainEntity: itemList(
            servicePreviews.map((s) => ({ name: s.name, path: `/leistungen/${s.slug}` })),
          ),
        })}
      />
    </>
  );
}
