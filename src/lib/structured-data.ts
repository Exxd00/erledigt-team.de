import { site, serviceBasics, type Service, type City, type Faq } from './site.ts';
import { legal } from './legal.ts';

export const businessId = `${site.url}/#business`;
export const websiteId = `${site.url}/#website`;
export const contentUpdatedAt = '2026-10-09';
export const absoluteUrl = (path: string) => new URL(path, `${site.url}/`).href;

/** One real business identity. Town pages describe coverage, never extra offices. */
export function businessGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': businessId,
        name: site.name,
        legalName: legal.businessName,
        description:
          'Gebäudeservice für Privatkunden, Unternehmen und Hausverwaltungen aus Saterland. Reinigungsleistungen in Saterland und Umgebung nach individueller Abstimmung.',
        url: site.url,
        email: site.email,
        telephone: site.phone,
        logo: absoluteUrl('/images/logo.jpg'),
        image: absoluteUrl('/images/hero-cleaning.webp'),
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.street,
          postalCode: site.postal,
          addressLocality: site.city,
          addressRegion: 'Niedersachsen',
          addressCountry: 'DE',
        },
        areaServed: { '@type': 'Place', name: 'Saterland und Umgebung' },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Kundenanfragen',
          telephone: site.phone,
          email: site.email,
          url: absoluteUrl('/anfrage'),
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Reinigungsleistungen',
          itemListElement: serviceBasics.map(([slug, name]) => ({
            '@type': 'Offer',
            url: absoluteUrl(`/leistungen/${slug}`),
            itemOffered: {
              '@type': 'Service',
              '@id': `${absoluteUrl(`/leistungen/${slug}`)}#service`,
              name,
              provider: { '@id': businessId },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: 'ERLEDIGT TEAM Gebäudeservice',
        url: site.url,
        inLanguage: 'de-DE',
        publisher: { '@id': businessId },
      },
    ],
  };
}

export function pageGraph(
  path: string,
  name: string,
  description: string,
  extra: Record<string, unknown> = {},
) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'de-DE',
    isPartOf: { '@id': websiteId },
    about: { '@id': businessId },
    publisher: { '@id': businessId },
    ...extra,
  };
}

export function serviceGraph(
  service: Service,
  path: string,
  area: City | City[],
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: Array.isArray(area) ? service.name : `${service.name} in ${area.name}`,
    serviceType: service.name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': businessId },
    areaServed: (Array.isArray(area) ? area : [area]).map((city) => ({
      '@type': 'Place',
      name: city.name,
      url: absoluteUrl(`/einsatzgebiete/${city.slug}`),
    })),
    mainEntityOfPage: { '@id': `${absoluteUrl(path)}#webpage` },
  };
}

export function questionEntities(items: Faq[]) {
  return items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  }));
}

export function itemList(items: { name: string; path: string }[]) {
  return {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function breadcrumbGraph(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Startseite', href: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}
