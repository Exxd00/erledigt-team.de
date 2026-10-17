import type { MetadataRoute } from 'next';
import { services, localServices, cities } from '@/lib/content';
import { businessPages } from '@/lib/business-pages';
import { guides } from '@/lib/guides';
import { contentUpdatedAt } from '@/lib/structured-data';
import { site } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/leistungen',
    '/geschaeftskunden',
    ...businessPages.map((page) => `/geschaeftskunden/${page.slug}`),
    '/einsatzgebiete',
    '/ueber-uns',
    '/anfrage',
    '/fragen',
    '/ratgeber',
    ...guides.map((guide) => `/ratgeber/${guide.slug}`),
    ...services.map((s) => `/leistungen/${s.slug}`),
    ...cities.flatMap((c) => [
      `/einsatzgebiete/${c.slug}`,
      ...localServices.map((s) => `/einsatzgebiete/${c.slug}/${s.slug}`),
    ]),
  ].map((path) => ({
    url: site.url + path,
    lastModified: new Date(contentUpdatedAt),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path.split('/').length < 4 ? 0.8 : 0.6,
  }));
}
