import { Breadcrumb, Eyebrow } from '@/components/Shared';
import { site } from '@/lib/site';
import { legal } from '@/lib/legal';
export const metadata = {
  title: 'Impressum',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Impressum' }]} />
      <div className="wrap legal">
        <div className="page-intro">
          <Eyebrow>Rechtliche Angaben</Eyebrow>
          <h1>Impressum</h1>
        </div>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <strong>{legal.businessName}</strong>
          <br />
          Inhaber: {legal.proprietor}
          <br />
          {site.street}
          <br />
          {site.postal} {site.city}
          <br />
          Deutschland
        </p>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={site.phoneHref}>{site.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <h2>Umsatzsteuer</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: {legal.vatId}</p>
        <h2>Handwerkskammer</h2>
        <p>
          Mitglied der {legal.chamber}, {legal.chamberAddress}. Eingetragen im Verzeichnis der
          zulassungsfreien Handwerksbetriebe mit dem Handwerk Gebäudereiniger. Weitere Informationen
          zur Kammer erhalten Sie auf{' '}
          <a href={legal.chamberUrl} target="_blank" rel="noreferrer">
            hwk-oldenburg.de
          </a>
          .
        </p>
        <h2>Hinweise zum Angebot</h2>
        <p>
          Die Website informiert über die Reinigungsleistungen von ERLEDIGT TEAM und bietet die
          Möglichkeit, einen individuellen Auftrag anzufragen. Die beschriebenen Einsatzgebiete
          kennzeichnen Regionen, für die eine Reinigung geprüft und geplant werden kann. Sie
          bezeichnen keine zusätzlichen Niederlassungen. Der zentrale Standort befindet sich an der
          oben genannten Anschrift in Saterland.
        </p>
        <p>
          Eine Kontaktaufnahme über das Formular, per Telefon oder per E-Mail begründet noch keinen
          kostenpflichtigen Auftrag. Leistungsumfang, Voraussetzungen, Preis und Termin werden im
          Einzelfall abgestimmt. Eine verbindliche Zusage erfolgt erst nach entsprechender
          Vereinbarung. Die Regionenübersicht dient der ersten Orientierung; die tatsächliche
          Anfahrt hängt von der konkreten Objektadresse und Straßenverbindung ab.
        </p>
        <h2>Bilder und Gestaltung</h2>
        <p>
          Das Unternehmenszeichen und die angegebenen Kontaktdaten wurden für diesen Auftritt
          bereitgestellt. Die Reinigungsmotive sind eigens erzeugte illustrative Bilder. Sie werden
          nicht als Referenzaufnahmen, Nachweis einer bestimmten Ausrüstung oder Darstellung
          abgeschlossener Kundenaufträge verwendet. Inhalte zu Reinigungsverfahren dienen der ersten
          Orientierung und ersetzen keine objektspezifische Beurteilung.
        </p>
        <p>
          Wenn Ihnen fehlerhafte Kontaktdaten, nicht erreichbare Seiten oder unklare
          Leistungsbeschreibungen auffallen, erreichen Sie uns über die oben genannten Kontaktwege.
          Bitte nennen Sie dabei die betroffene Seite und eine kurze Beschreibung, damit wir den
          Hinweis nachvollziehen können. Sensible persönliche Unterlagen sind für eine solche
          Rückmeldung nicht erforderlich.
        </p>
        <h2>Umfang und Einsatzgebiete</h2>
        <p>
          Maßgeblich für einen konkreten Auftrag sind die individuell vereinbarten Leistungen und
          Konditionen. Allgemeine Beschreibungen auf dieser Website dienen der Orientierung und
          stellen keine Zusage für besondere Verfahren oder feste Ausführungszeiten dar. Die
          Ortsseiten benennen Städte und Gemeinden mit ihrer Umgebung. Die tatsächliche Fahrstrecke,
          der Zugang zum Objekt und mögliche Anfahrtskosten werden für die konkrete Anfrage geprüft.
          Eine Ortsseite ersetzt deshalb keine individuelle Abstimmung über den Einsatz.
        </p>
        <h2>Gesetzliche Grundlage</h2>
        <p>
          Die Anbieterinformationen orientieren sich an den Informationspflichten für
          geschäftsmäßige digitale Dienste. Die maßgebliche gesetzliche Vorschrift ist{' '}
          <a
            href="https://www.gesetze-im-internet.de/ddg/__5.html"
            target="_blank"
            rel="noreferrer"
          >
            § 5 des Digitale-Dienste-Gesetzes
          </a>
          . Für Informationen zum Umgang mit personenbezogenen Daten lesen Sie bitte die gesonderten{' '}
          <a href="/datenschutz">Datenschutzhinweise</a>.
        </p>
      </div>
    </>
  );
}
