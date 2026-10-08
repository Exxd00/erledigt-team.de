import { Breadcrumb, ClosingCta, Eyebrow } from '@/components/Shared';
import { CityDirectory } from '@/components/Directories';
import { cityPreviews } from '@/lib/content';
export const metadata = {
  title: 'Städte & Einsatzgebiete rund um Saterland',
  description:
    'Gebäudeservice aus Saterland im Umkreis von etwa 50 km. Stadt finden, Leistungen vergleichen und Reinigung vor Ort anfragen.',
  alternates: { canonical: '/einsatzgebiete' },
};
export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Einsatzgebiete' }]} />
      <div className="wrap">
        <div className="page-intro">
          <Eyebrow>Saterland & Umgebung</Eyebrow>
          <h1>
            Ein Team aus der Region.
            <br />
            <em>Auch für Ihren Ort.</em>
          </h1>
          <p>
            Von der Eschstraße 70 in Saterland aus betreuen wir Objekte im Umkreis von etwa 50
            Kilometern. Finden Sie Ihren Ort und die passende Leistung.
          </p>
        </div>
        <div className="directory-content">
          <CityDirectory cities={cityPreviews} />
          <section className="service-directory-note">
            <h2>Regional planen, vor Ort gründlich arbeiten</h2>
            <p>
              Ein gutes Reinigungsergebnis beginnt nicht erst an der Haustür. Für einen gut
              vorbereiteten Einsatz müssen auch Anfahrt, Zugang und die Abläufe im Gebäude
              zusammenpassen. ERLEDIGT TEAM startet in Saterland und plant von dort aus Aufträge in
              den umliegenden Städten und Gemeinden. Die Übersicht hilft Ihnen, sich zu orientieren
              und direkt zu einer passenden Ortsseite zu gelangen.
            </p>
            <p>
              Der genannte Umkreis beschreibt eine ungefähre Luftlinie. Er ist weder eine zugesagte
              Fahrzeit noch eine pauschale Aussage zu Anfahrtskosten. Straßenverbindungen und die
              genaue Lage des Objekts können sich unterscheiden. Deshalb prüfen wir die
              Einsatzmöglichkeit anhand Ihrer Adresse und des gewünschten Leistungsumfangs. Die
              angezeigten Entfernungen dienen der ersten Orientierung. Grundlage sind
              Ortskoordinaten von{' '}
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
                OpenStreetMap-Mitwirkenden
              </a>
              ; die Berechnung beginnt an unserer Geschäftsadresse.
            </p>
            <h2>Ein zentraler Standort, unterschiedliche Anforderungen</h2>
            <p>
              Die Ortsseiten beschreiben unser Einsatzgebiet. Sie stehen nicht für separate
              Niederlassungen. Ihr Ansprechpartner bleibt ERLEDIGT TEAM in der Eschstraße 70, 26683
              Saterland. Ob ein Privathaus, eine Praxis oder eine Gewerbehalle gereinigt werden
              soll: Wir klären zunächst die konkreten Voraussetzungen und stimmen anschließend den
              Ablauf mit Ihnen ab.
            </p>
            <p>
              Bei Objekten mit mehreren Nutzern ist die Zugangsplanung besonders hilfreich. Teilen
              Sie uns mit, wer vor Ort die Türen öffnet, welche Bereiche während der Reinigung
              genutzt werden und wann möglichst wenig Betrieb herrscht. Für mehrere Standorte können
              Sie die jeweiligen Adressen und Aufgaben gemeinsam nennen. Daraus lässt sich prüfen,
              ob eine gebündelte Planung sinnvoll ist.
            </p>
            <h2>So finden Sie den richtigen Einstieg</h2>
            <p>
              Nutzen Sie die Ortssuche oder grenzen Sie die Liste nach Entfernung ein. Auf einer
              Ortsseite sehen Sie sämtliche Leistungen, die Sie für diesen Einsatzort anfragen
              können. Jede Kombination führt zu einer eigenen Informationsseite mit Hinweisen zum
              Objekt und zur Vorbereitung. Sie können außerdem von einer Leistungsseite aus direkt
              einen Ort auswählen.
            </p>
            <p>
              Ist Ihr Ort nicht aufgeführt oder liegt Ihre Adresse am Rand des genannten Umkreises,
              beschreiben Sie uns Ihr Vorhaben trotzdem. Wir prüfen den Einzelfall, ohne Ihnen vorab
              eine Verfügbarkeit zu versprechen. Für die erste Anfrage genügen die Postleitzahl, der
              Ort und eine kurze Beschreibung. Einen verbindlichen Termin und den genauen Umfang
              vereinbaren wir erst nach gemeinsamer Abstimmung.
            </p>
          </section>
        </div>
      </div>
      <ClosingCta title="Ihr Ort. Ihr Objekt. Unser nächster Einsatz?" />
    </>
  );
}
