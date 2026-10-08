import type { City } from './site';

export const regions = [
  'Alle Regionen',
  'Saterland & Umgebung',
  'Leer & Umgebung',
  'Papenburg & Emsland',
  'Ammerland & Umgebung',
  'Cloppenburg & Umgebung',
  'Oldenburg & Umgebung',
  'Aurich & Umgebung',
  'Friesland & Umgebung',
] as const;
export function cityRegion(city: City): string {
  if (['saterland', 'barssel', 'friesoythe', 'ostrhauderfehn', 'rhauderfehn'].includes(city.slug))
    return regions[1];
  const district = city.tags[1];
  if (district === 'Leer' || city.slug === 'emden') return regions[2];
  if (district === 'Emsland') return regions[3];
  if (district === 'Ammerland') return regions[4];
  if (district === 'Cloppenburg') return regions[5];
  if (district === 'Oldenburg' || city.slug === 'oldenburg') return regions[6];
  if (district === 'Aurich' || district === 'Wittmund') return regions[7];
  return regions[8];
}

export function nearbyCities(city: City, all: City[], count = 6) {
  const distance = (other: City) =>
    Math.hypot(other.lat - city.lat, (other.lon - city.lon) * Math.cos((city.lat * Math.PI) / 180));
  return all
    .filter((other) => other.slug !== city.slug)
    .sort((a, b) => distance(a) - distance(b))
    .slice(0, count);
}
