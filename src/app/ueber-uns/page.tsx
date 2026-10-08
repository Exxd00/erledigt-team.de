import Link from 'next/link';
import { assets } from '@/lib/assets';
import { SiteImage } from '@/components/SiteImage';
import { Breadcrumb, ClosingCta, Eyebrow, Process } from '@/components/Shared';
export const metadata = {
  title: 'Über ERLEDIGT TEAM',
  description:
    'Gebäudeservice aus Saterland: gründliche Reinigung, klare Absprachen und ein persönlicher Kontakt für Ihr Objekt.',
  alternates: { canonical: '/ueber-uns' },
};
export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Über uns' }]} />
      <section className="wrap">
        <div className="page-intro">
          <Eyebrow>ERLEDIGT TEAM Gebäudeservice</Eyebrow>
          <h1>
            Ihr Auftrag.
            <br />
            Unser Einsatz.
            <br />
            <em>Erledigt.</em>
          </h1>
          <p>
            Wir möchten, dass Sie sich in Ihren Räumen wohlfühlen und sich auf die vereinbarten
            Abläufe verlassen können. Darauf richten wir unsere Arbeit aus.
          </p>
        </div>
      </section>
      <section className="section surface-alt">
        <div className="wrap story-grid">
          <div className="story-photo">
            <SiteImage
              image={assets.hero}
              width="1536"
              height="1024"
              alt="Glasreinigung an einem modernen Gebäude – illustrative Darstellung"
            />
          </div>
          <article className="article-content">
            <section>
              <h2>Sauberkeit braucht Aufmerksamkeit</h2>
              <p>
                Hinter einer guten Reinigung stehen viele kleine Entscheidungen. Welcher Bereich
                wird täglich genutzt? Welche Oberfläche ist empfindlich? Wann lässt sich arbeiten,
                ohne Ihren Alltag unnötig zu stören? ERLEDIGT TEAM beginnt mit diesen Fragen und
                entwickelt daraus einen klaren Umfang für Ihr Objekt.
              </p>
              <p>
                Unser Standort ist die Eschstraße 70 in Saterland. Von hier aus planen wir Einsätze
                für Privatkunden, Unternehmen und Verwaltungen in der Region. Das Angebot reicht von
                der laufenden Gebäudepflege über Glas- und Fensterreinigung bis zu speziellen
                Aufgaben an Textilien, Gewerbeflächen oder Solaranlagen.
              </p>
            </section>
            <section>
              <h2>Gründlich. Flexibel. Zuverlässig.</h2>
              <p>
                Gründlichkeit bedeutet für uns, die vereinbarten Bereiche aufmerksam zu bearbeiten
                und Besonderheiten vorher anzusprechen. Flexibilität entsteht durch eine Planung,
                die zu den tatsächlichen Voraussetzungen passt. Zuverlässigkeit braucht klare
                Absprachen: Wer öffnet das Gebäude, was gehört zum Auftrag und wie geben wir
                Rückmeldung?
              </p>
              <p>
                Diese Fragen sind bei einer kleinen Fensterreinigung genauso wichtig wie bei einem
                regelmäßig betreuten Objekt. Wir möchten, dass Sie den Ablauf nachvollziehen können
                und wissen, welcher Schritt als Nächstes ansteht. Wenn sich Ihr Bedarf ändert,
                besprechen wir die Auswirkungen auf Umfang und Terminplanung.
              </p>
            </section>
          </article>
        </div>
      </section>
      <section className="section wrap">
        <article className="article-content">
          <section>
            <h2>Ein persönlicher Weg zum passenden Angebot</h2>
            <p>
              Sie müssen vor der ersten Kontaktaufnahme keine Fachbegriffe kennen. Beschreiben Sie
              einfach, was gereinigt werden soll und welches Ergebnis Ihnen wichtig ist. Die
              Objektart, der Einsatzort und eine ungefähre Größenangabe reichen für den Einstieg.
              Bei besonderen Materialien oder schwer zugänglichen Flächen klären wir die
              Voraussetzungen im Gespräch oder bei einer vereinbarten Besichtigung.
            </p>
            <p>
              Erst danach entsteht ein Angebot mit abgestimmten Aufgaben. Wir unterscheiden
              Reinigung von Reparatur, Wartung und baulicher Instandsetzung. Dadurch bleiben
              Erwartungen und Leistungsumfang nachvollziehbar. Ein angefragtes Datum gilt noch nicht
              als bestätigter Termin. Die Durchführung planen wir verbindlich, sobald Umfang und
              Beauftragung geklärt sind.
            </p>
          </section>
          <section>
            <h2>Für Räume, die Ihnen wichtig sind</h2>
            <p>
              Ein gepflegtes Zuhause, ein sauberer Arbeitsplatz oder ein einladender Eingangsbereich
              wirken jeden Tag. Wir möchten unseren Teil dazu beitragen, dass diese Bereiche
              angenehm nutzbar bleiben. Wählen Sie eine Leistung aus oder schildern Sie uns mehrere
              Aufgaben zusammen. Gemeinsam prüfen wir, wie sich daraus ein sinnvoller Einsatz für
              Ihr Objekt gestalten lässt.
            </p>
            <p>
              Die Bilder auf dieser Website wurden als illustrative Motive erstellt. Sie zeigen die
              Themen unserer Leistungen und werden nicht als dokumentierte Kundenprojekte
              ausgegeben.
            </p>
            <Link href="/leistungen" className="text-link">
              Unsere Leistungen kennenlernen
            </Link>
          </section>
        </article>
        <Process />
      </section>
      <ClosingCta />
    </>
  );
}
