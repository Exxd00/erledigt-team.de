import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { RECEIPT_COOKIE, readReceipt, conversionId } from '@/lib/receipt';
import { ThankYou } from '@/components/ThankYou';
import { Icon } from '@/components/Icon';
export const metadata = {
  title: 'Vielen Dank für Ihre Anfrage',
  robots: { index: false, follow: false },
  alternates: { canonical: '/danke' },
};
export default async function Page() {
  const receipt = readReceipt(
    (await cookies()).get(RECEIPT_COOKIE)?.value,
    process.env.RATE_LIMIT_SECRET || '',
  );
  if (!receipt) redirect('/anfrage');
  return (
    <section className="wrap section thank-you-page">
      <ThankYou
        id={receipt.id}
        eventId={conversionId(receipt.id, 'quote')}
        service={receipt.service}
        city={receipt.city}
      />
      <div className="success-panel">
        <Icon name="CircleCheck" size={54} />
        <p className="eyebrow">Erfolgreich übermittelt</p>
        <h1>Vielen Dank. Ihre Anfrage ist angekommen.</h1>
        <p>
          Ihre Angaben wurden sicher gespeichert. Wir schauen uns Ihr Vorhaben an und melden uns
          über den von Ihnen gewählten Kontaktweg.
        </p>
        <p>
          Ihre Referenz: <strong>{receipt.id.slice(0, 8).toUpperCase()}</strong>
        </p>
        <p>
          Ein Termin oder Auftrag ist damit noch nicht verbindlich vereinbart. Die nächsten Schritte
          besprechen wir persönlich mit Ihnen.
        </p>
        <Link href="/" className="button glass">
          Zur Startseite
        </Link>
      </div>
    </section>
  );
}
