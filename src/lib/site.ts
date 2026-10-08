export const site = {
  name: 'ERLEDIGT TEAM',
  email: 'info@erledigt-team.de',
  phone: '+49 155 67451482',
  phoneHref: 'tel:+4915567451482',
  street: 'Eschstraße 70',
  postal: '26683',
  city: 'Saterland',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://erledigt-team.de',
};
export const categories = [
  'Alle Leistungen',
  'Gebäudereinigung',
  'Glas & Fenster',
  'Industrie & Gewerbe',
  'Spezialreinigung',
];
export const serviceBasics = [
  [
    'unterhaltsreinigung',
    'Unterhaltsreinigung',
    'Gebäudereinigung',
    'Sauberkeit, die im Alltag bleibt. Für regelmäßig gepflegte Räume und einen planbaren Ablauf.',
    'Sparkles',
  ],
  [
    'buero-praxisreinigung',
    'Büro- & Praxisreinigung',
    'Gebäudereinigung',
    'Gepflegte Arbeitsplätze und ein einladender Empfang. Abgestimmt auf Ihre Öffnungszeiten.',
    'Building2',
  ],
  [
    'grund-sonderreinigung',
    'Grund- & Sonderreinigung',
    'Gebäudereinigung',
    'Wenn die normale Pflege nicht mehr reicht: gezielte Reinigung für besondere Anforderungen.',
    'Brush',
  ],
  [
    'treppenhausreinigung',
    'Treppenhausreinigung',
    'Gebäudereinigung',
    'Vom Eingang bis zum letzten Absatz. Ein gepflegter erster Eindruck für Bewohner und Gäste.',
    'Layers',
  ],
  [
    'glas-fensterreinigung',
    'Glas- & Fensterreinigung',
    'Glas & Fenster',
    'Mehr Licht, klare Sicht. Glasflächen, Rahmen und Falze nach vereinbartem Umfang.',
    'PanelsTopLeft',
  ],
  [
    'maschinen-anlagenreinigung',
    'Maschinen- & Anlagenreinigung',
    'Industrie & Gewerbe',
    'Sorgfältig geplant und mit Ihrem Betrieb abgestimmt. Für zugängliche Maschinen und Anlagen.',
    'Settings2',
  ],
  [
    'hallen-gewerbereinigung',
    'Hallen- & Gewerbeflächen',
    'Industrie & Gewerbe',
    'Saubere Laufwege und gepflegte Flächen. Passend zu Nutzung, Material und Betriebsablauf.',
    'Warehouse',
  ],
  [
    'baustellenreinigung',
    'Baustellenreinigung',
    'Industrie & Gewerbe',
    'Aus Baustelle wird nutzbarer Raum. Grob- und Feinreinigung für eine vorbereitete Übergabe.',
    'HardHat',
  ],
  [
    'polster-teppichreinigung',
    'Polster- & Teppichreinigung',
    'Spezialreinigung',
    'Frische für textile Oberflächen. Das Verfahren richtet sich nach Faser, Farbe und Zustand.',
    'Sofa',
  ],
  [
    'dach-oberflaechenreinigung',
    'Dach- & Oberflächenreinigung',
    'Spezialreinigung',
    'Außenflächen materialgerecht pflegen. Mit vorheriger Prüfung von Zustand und Zugänglichkeit.',
    'House',
  ],
  [
    'pv-anlagen-reinigung',
    'PV-Anlagen-Reinigung',
    'Spezialreinigung',
    'Schonende Pflege Ihrer Solarmodule. Abgestimmt auf Herstellerhinweise und sichere Erreichbarkeit.',
    'Sun',
  ],
] as const;
export type ContentSection = { title: string; body: string };
export type Faq = { question: string; answer: string };
export type Service = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  icon: string;
  sections: ContentSection[];
  formHints: string[];
  faqs: Faq[];
};
export type ServicePreview = Pick<Service, 'slug' | 'name' | 'category' | 'summary' | 'icon'>;
export type CityPreview = Pick<City, 'slug' | 'name' | 'distanceKm' | 'summary'>;
export type City = {
  slug: string;
  name: string;
  lat: number;
  lon: number;
  distanceKm: number;
  summary: string;
  sections: ContentSection[];
  tags: string[];
  sourceUrls?: string[];
  lens?: string;
  access?: string;
  intro?: string;
  index?: number;
};
