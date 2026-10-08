import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap error-page">
      <p className="eyebrow">Seite nicht gefunden</p>
      <h1>
        Hier ist gerade
        <br />
        nichts zu reinigen.
      </h1>
      <p>
        Die gewünschte Seite gibt es nicht. Unsere Leistungen finden Sie weiterhin in der Übersicht.
      </p>
      <Link className="button glass" href="/leistungen">
        Zu den Leistungen
      </Link>
    </div>
  );
}
