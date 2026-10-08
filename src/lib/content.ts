import data from '@/data/content.json';
import { serviceBasics, type Service, type City } from './site';
export const services: Service[] = serviceBasics.map(([slug, name, category, summary, icon]) => ({
  slug,
  name,
  category,
  summary,
  icon,
  sections: [],
  formHints: [],
  faqs: [],
  ...(data.services as Partial<Service>[]).find((s) => s.slug === slug),
}));
export const cities: City[] = data.cities.length
  ? (data.cities as City[])
  : [
      {
        slug: 'saterland',
        name: 'Saterland',
        lat: 53.1,
        lon: 7.68,
        distanceKm: 0,
        summary: 'Unser Ausgangspunkt für Gebäudeservice in der Region.',
        sections: [],
        tags: ['Standort'],
      },
    ];
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const servicePreviews = services.map(({ slug, name, category, summary, icon }) => ({
  slug,
  name,
  category,
  summary,
  icon,
}));
export const cityPreviews = cities.map(({ slug, name, distanceKm, summary }) => ({
  slug,
  name,
  distanceKm,
  summary,
}));
export const serviceOptions = services.map(({ slug, name }) => ({ slug, name }));
export const cityOptions = cities.map(({ slug, name }) => ({ slug, name }));
