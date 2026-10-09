import Link from 'next/link';
import { guides, guideForService } from '@/lib/guides';
import { Icon } from './Icon';
import { ServiceVisual } from './ServiceVisual';

export function GuideCards() {
  return (
    <div className="guide-grid">
      {guides.map((guide) => (
        <article className="guide-card" key={guide.slug}>
          <ServiceVisual slug={guide.serviceSlug} />
          <div className="guide-card-copy">
            <p className="eyebrow">{guide.label}</p>
            <h3>
              <Link href={`/ratgeber/${guide.slug}`}>{guide.title}</Link>
            </h3>
            <p>{guide.description}</p>
            <Link className="text-link" href={`/ratgeber/${guide.slug}`}>
              Ratgeber lesen <Icon name="ArrowUpRight" size={18} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function RelatedGuide({ service }: { service: string }) {
  const guide = guideForService(service);
  return (
    <aside className="wrap related-guide">
      <Icon name="ClipboardCheck" size={26} />
      <div>
        <p className="eyebrow">Gut vorbereitet</p>
        <h2>{guide.title}</h2>
      </div>
      <Link className="text-link" href={`/ratgeber/${guide.slug}`}>
        Entscheidungshilfe lesen <Icon name="ArrowUpRight" size={18} />
      </Link>
    </aside>
  );
}
