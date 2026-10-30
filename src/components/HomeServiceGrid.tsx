import Link from 'next/link';
import { services } from '@/lib/content';
import { assets } from '@/lib/assets';
import { Icon } from './Icon';
import { SiteImage } from './SiteImage';

const highlights = [
  {
    slug: 'unterhaltsreinigung',
    title: 'Reinigung innen',
    text: 'Regelmäßig saubere Räume.',
    image: 'office',
    alt: 'Reinigung eines Empfangsbereichs',
  },
  {
    slug: 'glas-fensterreinigung',
    title: 'Glas & Fenster',
    text: 'Klare Sicht. Gepflegte Rahmen.',
    image: 'hero',
    alt: 'Glasreinigung an einer Gebäudefassade',
  },
  {
    slug: 'pv-anlagen-reinigung',
    title: 'PV-Anlagen',
    text: 'Module schonend reinigen.',
    image: 'solar',
    alt: 'Schonende Reinigung von Solarmodulen',
  },
  {
    slug: 'winterdienst-schneeraeumung',
    title: 'Winterdienst',
    text: 'Schnee räumen. Wege streuen.',
    image: 'winter',
    alt: 'Fahrzeug zur Schneeräumung auf einer Zufahrt',
  },
  {
    slug: 'rasen-gruenflaechenpflege',
    title: 'Rasen & Grün',
    text: 'Mähen und Flächen pflegen.',
    image: 'grounds',
    alt: 'Gepflegte Rasenfläche mit einem Rasenmäher',
  },
  {
    slug: 'hecken-gehoelzpflege',
    title: 'Heckenpflege',
    text: 'Schonende Pflegeschnitte.',
    image: 'hedge',
    alt: 'Pflegeschnitt an einer erreichbaren Hecke',
  },
] as const;

export function HomeServiceGrid() {
  const featured = new Set<string>(highlights.map((item) => item.slug));
  const furtherServices = services.filter((service) => !featured.has(service.slug));

  return (
    <>
      <div className="home-service-grid">
        {highlights.map((item) => (
          <Link
            key={item.slug}
            href={`/leistungen/${item.slug}`}
            className="home-service-card"
            data-event="service_select"
            data-service={item.slug}
            data-position="home_services"
          >
            <SiteImage
              image={assets[item.image]}
              alt={`${item.alt} – illustrative Darstellung`}
              width="1536"
              height="1024"
              loading="lazy"
            />
            <div className="home-service-copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="home-card-action">
                Entdecken <Icon name="ArrowUpRight" size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <details className="home-more-services">
        <summary id="home_more_services">
          <span>
            <strong>Weitere Reinigungsleistungen</strong>
            <span>Büro, Treppenhaus, Bau & mehr</span>
          </span>
          <Icon name="ChevronDown" />
        </summary>
        <div className="home-more-links">
          {furtherServices.map((service) => (
            <Link
              key={service.slug}
              href={`/leistungen/${service.slug}`}
              data-event="service_select"
              data-service={service.slug}
              data-position="home_more_services"
            >
              {service.name}
              <Icon name="ArrowUpRight" size={18} />
            </Link>
          ))}
        </div>
      </details>
    </>
  );
}
