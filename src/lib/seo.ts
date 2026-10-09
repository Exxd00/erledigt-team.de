import type { Metadata } from 'next';
import { site } from './site';

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: 'de_DE',
      type: 'website',
      images: [
        {
          url: '/images/hero-cleaning.webp',
          width: 1536,
          height: 1024,
          alt: 'ERLEDIGT TEAM Gebäudeservice – illustrative Darstellung',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      images: ['/images/hero-cleaning.webp'],
    },
  };
}
