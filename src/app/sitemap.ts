import type { MetadataRoute } from 'next';
import { services, cities } from '@/lib/content';
import { site } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/leistungen',
    '/einsatzgebiete',
    '/ueber-uns',
    '/anfrage',
    ...services.map((s) => `/leistungen/${s.slug}`),
    ...cities.flatMap((c) => [
      `/einsatzgebiete/${c.slug}`,
      ...services.map((s) => `/einsatzgebiete/${c.slug}/${s.slug}`),
    ]),
  ].map((path) => ({
    url: site.url + path,
    lastModified: new Date('2026-10-08'),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path.split('/').length < 4 ? 0.8 : 0.6,
  }));
}
