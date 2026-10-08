import { Breadcrumb, Eyebrow } from '@/components/Shared';
import { site } from '@/lib/site';
import { legal } from '@/lib/legal';
export const metadata = {
  title: 'Datenschutzhinweise',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Datenschutz' }]} />
      <div className="wrap legal">
        <div className="page-intro">
          <Eyebrow>Ihre Daten</Eyebrow>
          <h1>Datenschutzhinweise</h1>
          <p>Stand: 8. Oktober 2026</p>
        </div>
        <h2>1. Verantwortlicher und Kontakt</h2>
        <p>
          {legal.proprietor}, handelnd als {legal.businessName}, {site.street}, {site.postal}{' '}
          {site.city}. Bei Fragen zur Verarbeitung Ihrer Daten können Sie sich an{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a> oder telefonisch an{' '}
          <a href={site.phoneHref}>{site.phone}</a> wenden.
        </p>
        <h2>2. Technische Bereitstellung</h2>
        <p>
          Beim Aufruf einer Website werden technische Verbindungsdaten verarbeitet, damit Inhalte an
          Ihren Browser übertragen und Störungen erkannt werden können. Dazu können die IP-Adresse,
          der Zeitpunkt, der aufgerufene Pfad und technische Angaben zum Browser gehören. Für den
          vorgesehenen Betrieb wird Vercel als Hostingdienst eingesetzt. Zweck dieser Verarbeitung
          ist die sichere und funktionsfähige Bereitstellung der Website. Die konkrete vertragliche
          Ausgestaltung und Aufbewahrung der Hostingprotokolle werden vor der Freigabe dokumentiert.
        </p>
        <h2>3. Anfragen und Kontaktaufnahme</h2>
        <p>
          Wenn Sie uns eine Anfrage senden, verarbeiten wir die von Ihnen eingegebenen Kontakt- und
          Objektdaten, um Ihr Anliegen zu bearbeiten, Rückfragen zu stellen und ein Angebot
          vorzubereiten. Pflichtangaben sind im Formular gekennzeichnet. Für den gewählten
          Kontaktweg benötigen wir eine gültige E-Mail-Adresse oder Telefonnummer. Ergänzende
          Informationen und ein Wunschtermin sind freiwillig. Bitte übermitteln Sie keine
          Gesundheitsdaten oder andere Informationen, die für den Reinigungsauftrag nicht benötigt
          werden.
        </p>
        <p>
          Die Verarbeitung zur Vorbereitung oder Durchführung eines Vertrags erfolgt auf Grundlage
          von Artikel 6 Absatz 1 Buchstabe b DSGVO. Sonstige geschäftliche Rückfragen können auf
          Grundlage eines berechtigten Interesses an ihrer Bearbeitung nach Artikel 6 Absatz 1
          Buchstabe f DSGVO verarbeitet werden. Soweit eine Verarbeitung auf Einwilligung beruht,
          ist Artikel 6 Absatz 1 Buchstabe a DSGVO die Grundlage. Sie können eine Einwilligung mit
          Wirkung für die Zukunft widerrufen.
        </p>
        <h2>4. Vorgesehene Verarbeitung der Anfrage</h2>
        <p>
          Die technische Anbindung ist für eine geschützte Speicherung in Supabase, eine interne
          Übersicht in Google Sheets und eine E-Mail-Benachrichtigung über Resend vorbereitet.
          Formulardaten werden serverseitig übertragen; geheime Zugangsdaten werden nicht an
          Besucher ausgegeben. Das Formular zeigt eine erfolgreiche Speicherung nur nach einer
          bestätigten Annahme durch das Backend an. Solange die Anbindung nicht bereit ist, stehen
          die direkten Kontaktwege zur Verfügung.
        </p>
        <p>
          Vor dem regulären Betrieb werden die tatsächlich eingesetzten Dienstleister,
          Auftragsverarbeitungsverträge, Verarbeitungsorte und gegebenenfalls erforderlichen
          Garantien für internationale Übermittlungen abschließend geprüft und ergänzt.
          Personenbezogene Anfragen werden nur so lange aufbewahrt, wie es für die Bearbeitung
          erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Ein verbindlicher
          betrieblicher Löschplan wird vor der Freigabe festgelegt.
        </p>
        <h2>5. Einstellungen und freiwillige Nutzungsanalyse</h2>
        <p>
          Ihre Auswahl zum hellen oder dunklen Erscheinungsbild und zu den Datenschutzeinstellungen
          wird lokal im Browser gespeichert. Eine optionale Nutzungsanalyse startet erst, wenn Sie
          „Analyse erlauben“ wählen. Dann können Seitenaufrufe, ausgewählte Leistungen, angeklickte
          Kontaktmöglichkeiten und die erreichten Formularschritte erfasst werden. Freitext, Namen,
          E-Mail-Adressen und Telefonnummern werden nicht als Analyseparameter versendet. Ein Klick
          auf eine Telefonnummer ist lediglich ein Klick und kein Nachweis eines geführten
          Gesprächs.
        </p>
        <p>
          Die Zustimmung ist freiwillig und kann über „Cookie-Einstellungen“ im Fußbereich geändert
          werden. Bei Ablehnung bleibt die Website nutzbar. Eine zufällige Sitzungskennung und
          bereinigte Kampagnenangaben werden nur nach Zustimmung für die Sitzung gespeichert. Google
          Analytics ist ausschließlich aktivierbar, wenn eine Messkennung hinterlegt wurde und Ihre
          Zustimmung vorliegt; die abschließenden Informationen dazu werden vor seiner Aktivierung
          ergänzt.
        </p>
        <h2>6. Schutz vor Missbrauch</h2>
        <p>
          Das Anfrageformular prüft Eingaben und begrenzt wiederholte Übermittlungen. Für die
          zeitlich begrenzte Ratenkontrolle wird aus einer Verbindungsadresse ein täglich
          wechselnder, nicht im Klartext gespeicherter Prüfwert gebildet. Die hierfür vorgesehenen
          Einträge werden nach kurzer Frist bereinigt. Wiederholte Übertragungen derselben Anfrage
          werden anhand einer Anfragekennung erkannt, damit technische Wiederholungen keine
          doppelten Vorgänge erzeugen.
        </p>
        <h2>7. Ihre Rechte</h2>
        <p>
          Nach Maßgabe der DSGVO haben Sie insbesondere Rechte auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung und Datenübertragbarkeit. Gegen bestimmte Verarbeitungen
          können Sie Widerspruch einlegen. Außerdem können Sie sich bei einer
          Datenschutzaufsichtsbehörde beschweren. Die gesetzlichen Regelungen finden Sie in der{' '}
          <a
            href="https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de"
            target="_blank"
            rel="noreferrer"
          >
            Datenschutz-Grundverordnung
          </a>
          . Kontaktieren Sie uns für ein Anliegen bitte über die oben genannte E-Mail-Adresse.
        </p>
      </div>
    </>
  );
}
