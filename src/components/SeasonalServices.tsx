import Link from 'next/link';
import { Icon } from './Icon';
import { Eyebrow, ServiceCard } from './Shared';
import { seasonalServices } from '@/lib/seasonal-services';

export function SeasonalServices() {
  return (
    <section className="section surface-alt seasonal-section" aria-labelledby="seasonal-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>Ihr Grundstück. Jede Jahreszeit.</Eyebrow>
            <h2 id="seasonal-title">
              Draußen gepflegt.
              <br />
              <em>Auf den Winter vorbereitet.</em>
            </h2>
          </div>
          <p className="section-intro">
            Vom Rasenschnitt bis zur Schneeräumung: Wir planen Außenarbeiten nach Fläche, Jahreszeit
            und Nutzung. Für Ihr Zuhause, Ihre Wohnanlage und Ihren Betrieb.
          </p>
        </div>
        <div className="service-grid">
          {seasonalServices.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} visual />
          ))}
        </div>
        <div className="fleet-note">
          <span className="fleet-icon">
            <Icon name="Truck" size={32} />
          </span>
          <div>
            <h3>Eigene Fahrzeuge für den Wintereinsatz.</h3>
            <p>
              Für Schneeräumung stehen eigene Einsatzfahrzeuge bereit. Zufahrt, Flächengröße und
              Untergrund bestimmen, welche Technik wir an Ihrem Objekt einplanen.
            </p>
          </div>
          <Link
            href="/anfrage?leistung=winterdienst-schneeraeumung"
            className="button glass"
            data-event="cta_click"
            data-service="winterdienst-schneeraeumung"
            data-position="seasonal"
          >
            Winterdienst anfragen <Icon name="ArrowUpRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
