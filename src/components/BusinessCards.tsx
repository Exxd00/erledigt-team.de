import Link from 'next/link';
import { Icon } from './Icon';
import { SiteImage } from './SiteImage';
import { assets } from '@/lib/assets';
import type { BusinessPage } from '@/lib/business-pages';

export type BusinessPreview = Pick<
  BusinessPage,
  'slug' | 'name' | 'description' | 'focus' | 'icon' | 'image' | 'alt'
>;

export function BusinessCard({ page }: { page: BusinessPreview }) {
  return (
    <Link
      className="business-card"
      href={`/geschaeftskunden/${page.slug}`}
      data-event="cta_click"
      data-position="business_directory"
    >
      <div className="business-card-image">
        <SiteImage
          image={assets[page.image]}
          alt={`${page.alt} – illustrative Darstellung`}
          width="1536"
          height="1024"
          loading="lazy"
        />
        <span className="business-card-icon">
          <Icon name={page.icon} size={26} />
        </span>
      </div>
      <div className="business-card-copy">
        <p className="eyebrow">{page.focus}</p>
        <h3>{page.name}</h3>
        <p>{page.description}</p>
        <span className="text-link">
          Lösung für Ihren Betrieb <Icon name="ArrowUpRight" size={18} />
        </span>
      </div>
    </Link>
  );
}

export function BusinessCards({ pages }: { pages: BusinessPreview[] }) {
  return (
    <div className="business-grid">
      {pages.map((page) => (
        <BusinessCard key={page.slug} page={page} />
      ))}
    </div>
  );
}
