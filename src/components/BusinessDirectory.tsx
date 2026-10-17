'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BusinessCards, type BusinessPreview } from './BusinessCards';
import { Icon } from './Icon';

const normalize = (value: string) =>
  value
    .toLocaleLowerCase('de-DE')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss');
export function BusinessDirectory({ pages }: { pages: BusinessPreview[] }) {
  const [query, setQuery] = useState('');
  const matches = pages.filter((page) =>
    normalize(`${page.name} ${page.description} ${page.focus}`).includes(normalize(query.trim())),
  );
  return (
    <div>
      <div className="business-search">
        <label htmlFor="business-search">Ihre Branche finden</label>
        <div className="business-search-input">
          <Icon name="Search" size={20} />
          <input
            id="business-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Zum Beispiel Büro, Verwaltung oder Handel"
          />
        </div>
        <p role="status">
          {matches.length} passende {matches.length === 1 ? 'Branche' : 'Branchen'}
        </p>
      </div>
      <BusinessCards pages={matches} />
      {matches.length === 0 && (
        <div className="notice">
          <p>
            Ihre Branche ist nicht dabei? Beschreiben Sie uns Ihr Objekt – wir prüfen den passenden
            Umfang.
          </p>
          <button type="button" className="button secondary" onClick={() => setQuery('')}>
            Alle Branchen anzeigen
          </button>{' '}
          <Link className="text-link" href="/anfrage?objekt=gewerbe">
            Objekt anfragen
          </Link>
        </div>
      )}
    </div>
  );
}
