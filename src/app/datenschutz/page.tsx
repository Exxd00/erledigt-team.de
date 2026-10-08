import { Breadcrumb, Eyebrow } from '@/components/Shared';
import { site } from '@/lib/site';
import { legal } from '@/lib/legal';
const hostingProvider = 'Vercel';
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
          Betrieb wird {hostingProvider} (Vercel Inc., USA) als Hostingdienst eingesetzt. Zweck dieser
          Verarbeitung ist die sichere und funktionsfähige Bereitstellung der Website. Rechtsgrundlage
          ist Artikel 6 Absatz 1 Buchstabe f DSGVO. Informationen zur Infrastruktur und Verarbeitung
          finden Sie in den <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Datenschutzhinweisen von Vercel</a>.
        </p>
        <p>
          Für das Logo und eigens für diese Website erstellte Illustrationsbilder nutzen wir ImgBB.
          Beim Laden dieser Bilder wird eine Verbindung zu i.ibb.co hergestellt; dabei erhält der
          Bilderdienst insbesondere Ihre IP-Adresse und technische Verbindungsdaten. Die Einbindung
          dient der Bereitstellung unserer Website (Artikel 6 Absatz 1 Buchstabe f DSGVO). Über das
          Anfrageformular werden keine Kundenfotos an ImgBB übertragen. Weitere Hinweise finden Sie
          in der{' '}
          <a href="https://imgbb.com/privacy" target="_blank" rel="noreferrer">
            Datenschutzerklärung von ImgBB
          </a>
          .
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
        <h2>4. Speicherung und Weiterleitung Ihrer Anfrage</h2>
        <p>
          Anfragen werden in einer zugriffsgeschützten Datenbank von Supabase Pte. Ltd. gespeichert.
          Die gewählte Projektregion ist London. Eine interne Übersicht führen wir in Google Sheets
          mit Google Apps Script (Google Ireland Limited). Die Tabelle ist nicht öffentlich. Über
          Resend (Plus Five Five, Inc., Versandregion Irland) wird eine Benachrichtigung mit den
          Anfrageangaben an unser geschäftliches Postfach gesendet. Der Empfang erfolgt über
          Microsoft 365. Diese Dienste unterstützen die Bearbeitung und die zuverlässige Zustellung
          Ihrer Anfrage. Nur eine bestätigte Speicherung führt zur Erfolgsmeldung im Formular;
          vorübergehend gescheiterte Weiterleitungen können erneut versucht werden.
        </p>
        <p>
          Personenbezogene Anfragen werden so lange aufbewahrt, wie sie zur Bearbeitung, zu
          vereinbarten Folgeschritten oder zur Erfüllung gesetzlicher Pflichten benötigt werden.
          Entfällt dieser Zweck und besteht keine Aufbewahrungspflicht, sind die Daten zu löschen.
          Für konkrete Auskünfte oder ein Löschbegehren erreichen Sie uns unter der oben genannten
          Adresse. Weitere Anbieterinformationen: <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">Supabase</a>,{' '}
          <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">Google</a>,{' '}
          <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">Resend</a> und{' '}
          <a href="https://privacy.microsoft.com/de-de/privacystatement" target="_blank" rel="noreferrer">Microsoft</a>.
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
          bereinigte Kampagnenangaben werden nur nach Zustimmung für die Sitzung gespeichert.
          Einwilligungsabhängige Ereignisse werden in unserer Datenbank und internen Ereignistabelle
          erfasst. Zusätzlich nutzen wir Google Analytics 4 von Google Ireland Limited zur
          Reichweitenmessung. Google erhält dabei unter anderem Ereignisnamen, bereinigte Seitenpfade,
          Geräteinformationen und eine pseudonyme Browserkennung. Das Absenden einer erfolgreich
          gespeicherten Anfrage wird als „generate_lead“ gemessen. Anfrageinhalte und die interne
          Anfragekennung werden nicht an Google Analytics übermittelt.
        </p>
        <p>Google Analytics wird erst nach Ihrer Zustimmung geladen. Google Signals und die
          Personalisierung von Werbung sind für diese Einbindung deaktiviert. Die Analyse-Cookies
          sind auf höchstens 60 Tage eingestellt; unsere Sitzungsdaten enden mit der Browsersitzung.
          Ihre lokale Darstellungs- und Einwilligungsauswahl bleibt bis zur Änderung oder Löschung
          der Browserdaten gespeichert. Beim Widerruf werden Analyse-Cookies entfernt und die Seite
          ohne Analytics neu geladen. Rechtsgrundlagen der freiwilligen Analyse sind Artikel 6
          Absatz 1 Buchstabe a DSGVO und § 25 Absatz 1 TDDDG. Weitere Informationen finden Sie bei{' '}
          <a href="https://support.google.com/analytics/answer/12017362?hl=de" target="_blank" rel="noreferrer">Google zu Daten und Datenschutz in Europa</a>.
        </p>
        <h2>6. Internationale Verarbeitung</h2>
        <p>Die genannten Anbieter nutzen teilweise internationale Infrastruktur. Auch bei einer
          ausgewählten europäischen Region können zusätzliche Verarbeitungen, etwa für Support
          oder Infrastruktur, außerhalb des Europäischen Wirtschaftsraums stattfinden, insbesondere
          in den USA. Maßgeblich sind die jeweils anwendbaren vertraglichen Regelungen und Garantien
          nach den Artikeln 44 ff. DSGVO. Informationen zu den für einen konkreten Dienst geltenden
          Übermittlungen und Garantien können Sie bei uns anfordern; die oben verlinkten
          Anbieterinformationen erläutern die jeweilige Verarbeitung.</p>
        <h2>7. Schutz vor Missbrauch</h2>
        <p>
          Das Anfrageformular prüft Eingaben und begrenzt wiederholte Übermittlungen. Für die
          zeitlich begrenzte Ratenkontrolle wird aus einer Verbindungsadresse ein täglich
          wechselnder, nicht im Klartext gespeicherter Prüfwert gebildet. Die hierfür vorgesehenen
          Einträge werden nach kurzer Frist bereinigt. Wiederholte Übertragungen derselben Anfrage
          werden anhand einer Anfragekennung erkannt, damit technische Wiederholungen keine
          doppelten Vorgänge erzeugen.
        </p>
        <h2>8. Ihre Rechte</h2>
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
