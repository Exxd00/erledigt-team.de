'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from './Icon';
import { ServiceCard } from './Shared';
import { categories, type ServicePreview, type CityPreview } from '@/lib/site';
import { track } from '@/lib/tracking';
const normalize = (s: string) =>
  s
    .toLocaleLowerCase('de')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
export function ServiceDirectory({ services }: { services: ServicePreview[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const filtered = services.filter(
    (s) =>
      (category === categories[0] || s.category === category) &&
      normalize(`${s.name} ${s.summary}`).includes(normalize(search)),
  );
  return (
    <>
      <div className="filter-panel">
        <div className="search-field">
          <label htmlFor="service-search">Welche Reinigung suchen Sie?</label>
          <Icon name="Search" size={20} />
          <input
            id="service-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zum Beispiel Fenster, Büro oder PV …"
          />
        </div>
        <div className="filter-chips" aria-label="Leistungen nach Bereich filtern">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                track('filter_used', { position: 'services', step: c });
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'Leistung' : 'Leistungen'} gefunden
      </p>
      {filtered.length ? (
        <div className="service-grid">
          {filtered.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Keine passende Leistung gefunden.</h3>
          <p>Versuchen Sie einen anderen Begriff oder beschreiben Sie uns Ihr Vorhaben.</p>
          <button
            className="button secondary"
            onClick={() => {
              setSearch('');
              setCategory(categories[0]);
            }}
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </>
  );
}
export function CityDirectory({ cities }: { cities: CityPreview[] }) {
  const [search, setSearch] = useState('');
  const [radius, setRadius] = useState('50');
  const [sort, setSort] = useState('distance');
  const filtered = cities
    .filter((c) => c.distanceKm <= Number(radius) && normalize(c.name).includes(normalize(search)))
    .sort((a, b) =>
      sort === 'name' ? a.name.localeCompare(b.name, 'de') : a.distanceKm - b.distanceKm,
    );
  return (
    <>
      <div className="filter-panel">
        <div className="search-row">
          <div className="search-field">
            <label htmlFor="city-search">Stadt oder Gemeinde suchen</label>
            <Icon name="Search" size={20} />
            <input
              id="city-search"
              type="search"
              placeholder="Zum Beispiel Saterland oder Leer …"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <label htmlFor="radius">Umkreis</label>
            <select
              id="radius"
              value={radius}
              onChange={(e) => {
                setRadius(e.target.value);
                track('filter_used', { position: 'cities', step: `radius_${e.target.value}` });
              }}
            >
              <option value="50">Bis etwa 50 km</option>
              <option value="30">Bis etwa 30 km</option>
              <option value="15">Bis etwa 15 km</option>
            </select>
          </div>
          <div className="filter-select">
            <label htmlFor="sort">Sortieren</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="distance">Nach Entfernung</option>
              <option value="name">Alphabetisch</option>
            </select>
          </div>
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} Orte · Entfernungen als ungefähre Luftlinie, keine Fahrstrecken
      </p>
      {filtered.length ? (
        <div className="city-grid">
          {filtered.map((c) => (
            <Link
              className="city-card"
              href={`/einsatzgebiete/${c.slug}`}
              key={c.slug}
              data-event="city_select"
              data-city={c.slug}
            >
              <div className="city-card-header">
                <Icon name="MapPin" />
                <span>{c.distanceKm === 0 ? 'Unser Standort' : `ca. ${c.distanceKm} km`}</span>
              </div>
              <h3>{c.name}</h3>
              <p>{c.summary}</p>
              <span className="text-link">
                Leistungen in {c.name}
                <span aria-hidden="true">+</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Ihr Ort ist noch nicht dabei?</h3>
          <p>Die Objektadresse entscheidet. Fragen Sie einen Einsatz einfach direkt bei uns an.</p>
          <Link className="button glass" href="/anfrage">
            Einsatzort anfragen
          </Link>
        </div>
      )}
    </>
  );
}
