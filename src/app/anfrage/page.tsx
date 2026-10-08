import { LeadForm } from '@/components/LeadForm';
import { Breadcrumb, Eyebrow } from '@/components/Shared';
import { Icon } from '@/components/Icon';
import { serviceOptions, cityOptions } from '@/lib/content';
import { site } from '@/lib/site';
export const metadata = {
  title: 'Reinigung unverbindlich anfragen',
  description:
    'Beschreiben Sie Ihr Objekt und erhalten Sie ein passendes Angebot von ERLEDIGT TEAM. Einfach in drei Schritten anfragen.',
  alternates: { canonical: '/anfrage' },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ leistung?: string; ort?: string }>;
}) {
  const q = await searchParams;
  return (
    <>
      <Breadcrumb items={[{ label: 'Anfrage' }]} />
      <div className="wrap">
        <div className="page-intro">
          <Eyebrow>Ihr Auftrag beginnt hier</Eyebrow>
          <h1>
            Sie haben etwas vor.
            <br />
            <em>Wir kümmern uns.</em>
          </h1>
          <p>
            Ein paar Angaben zu Ihrem Objekt – und wir können gemeinsam den nächsten Schritt planen.
            Persönlich, klar und unverbindlich.
          </p>
        </div>
        <div className="form-layout">
          <LeadForm
            services={serviceOptions}
            cities={cityOptions}
            defaultService={q.leistung}
            defaultCity={q.ort}
          />
          <aside className="form-aside">
            <h2>Lieber direkt besprechen?</h2>
            <p>
              Manches lässt sich in einem kurzen Gespräch leichter klären. Rufen Sie uns an oder
              schreiben Sie eine E-Mail.
            </p>
            <a className="contact-line" href={site.phoneHref} data-event="phone_click">
              <Icon name="Phone" />
              {site.phone}
            </a>
            <a className="contact-line" href={`mailto:${site.email}`} data-event="email_click">
              <Icon name="Mail" />
              {site.email}
            </a>
            <p>
              <strong>ERLEDIGT TEAM Gebäudeservice</strong>
              <br />
              {site.street}
              <br />
              {site.postal} {site.city}
            </p>
            <ul className="check-list">
              <li>
                <Icon name="Check" size={18} />
                Unverbindliche Anfrage
              </li>
              <li>
                <Icon name="Check" size={18} />
                Individuell abgestimmter Umfang
              </li>
              <li>
                <Icon name="Check" size={18} />
                Keine Buchung ohne Ihre Zusage
              </li>
            </ul>
            <h2>Was passiert danach?</h2>
            <p>
              Nach Eingang schauen wir uns Ihre Angaben an. Bei offenen Fragen melden wir uns über
              den von Ihnen gewählten Kontaktweg. Je nach Objekt kann eine Besichtigung sinnvoll
              sein, bevor ein Angebot erstellt wird.
            </p>
            <p>
              Ein gewünschtes Datum hilft uns bei der Planung. Es gilt erst als vereinbart, wenn wir
              den Einsatz miteinander bestätigt haben. Auch den Zugang zum Gebäude und mögliche
              Vorbereitungen klären wir rechtzeitig.
            </p>
          </aside>
        </div>
        <article className="legal">
          <h2>So wird aus Ihrer Anfrage ein passendes Angebot</h2>
          <p>
            Sie brauchen weder ein fertiges Leistungsverzeichnis noch exakte Maße, um Kontakt
            aufzunehmen. Nennen Sie uns zunächst den Ort und die Art Ihres Objekts. Eine grobe
            Flächenangabe oder die Anzahl der Fenster erleichtert die Einschätzung. Wenn mehrere
            Leistungen zusammenkommen, können Sie diese im Nachrichtenfeld beschreiben.
          </p>
          <p>
            Hinweise zu empfindlichen Oberflächen, Zugangsbeschränkungen oder einem laufenden
            Betrieb sind hilfreich. Bitte senden Sie im ersten Schritt keine Gesundheitsdaten,
            Ausweiskopien oder sonstigen sensiblen Unterlagen. Für die Planung einer Reinigung sind
            sie in der Regel nicht erforderlich. Die genaue Objektadresse und weitere Details
            stimmen wir bei Bedarf im direkten Kontakt ab.
          </p>
          <p>
            Sie wählen selbst, ob Sie per Telefon oder E-Mail kontaktiert werden möchten. Für den
            gewählten Weg ist die entsprechende Angabe erforderlich; weitere Kontaktdaten sind
            freiwillig. Nach dem Absenden bestätigt das Formular die Speicherung nur dann, wenn Ihre
            Anfrage tatsächlich im System angekommen ist. Bei einer technischen Störung bleiben
            Telefon und E-Mail als direkte Kontaktmöglichkeiten sichtbar.
          </p>
          <p>
            Wir nutzen Ihre Angaben, um den Bedarf zu verstehen, Rückfragen zu beantworten und den
            Leistungsumfang vorzubereiten. Die Anfrage allein löst weder eine kostenpflichtige
            Beauftragung noch eine verbindliche Terminbuchung aus. Sie können Ihre Wünsche im
            anschließenden Gespräch präzisieren. Erst wenn beide Seiten Umfang und Ablauf abgestimmt
            haben, entscheiden Sie über den Auftrag.
          </p>
        </article>
      </div>
    </>
  );
}
