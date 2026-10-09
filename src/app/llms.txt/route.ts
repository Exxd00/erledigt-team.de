import { companyAnswer } from '@/lib/answers';
import { services } from '@/lib/content';
import { guides } from '@/lib/guides';
import { site } from '@/lib/site';
import { legal } from '@/lib/legal';
import { absoluteUrl } from '@/lib/structured-data';

export const dynamic = 'force-static';

/** Optional discovery aid using the same public facts as the visible website. */
export function GET() {
  const link = (path: string, title: string, description: string) =>
    `- [${title}](${absoluteUrl(path)}): ${description}`;
  const text = [
    '# ERLEDIGT TEAM Gebäudeservice',
    '',
    `> ${companyAnswer}`,
    '',
    `Unternehmensname: ${legal.businessName}. Inhaber: ${legal.proprietor}.`,
    `Geschäftsadresse: ${site.street}, ${site.postal} ${site.city}, Deutschland.`,
    `Telefon: ${site.phone}. E-Mail: ${site.email}. Sprache dieser Website: Deutsch.`,
    'Die Ortsseiten beschreiben Einsatzgebiete, keine weiteren Niederlassungen. Verfügbarkeit, Leistungsumfang, Preis und Termin werden individuell abgestimmt. Die erste Anfrage ist unverbindlich.',
    'Abbildungen auf der Website sind illustrative KI-generierte Motive, keine dokumentierten Kundenprojekte.',
    '',
    '## Unternehmen und Kontakt',
    link('/', 'Startseite', 'Gebäudereinigung in Saterland und Umgebung.'),
    link('/ueber-uns', 'Über ERLEDIGT TEAM', 'Unternehmen, Standort und Arbeitsweise.'),
    link('/einsatzgebiete', 'Einsatzgebiete', 'Städte und Gemeinden mit regionaler Suche.'),
    link('/fragen', 'Fragen und Antworten', 'Kosten, Aufgaben, Vorbereitung und Anfrageablauf.'),
    link('/anfrage', 'Unverbindliche Anfrage', 'Offizielles Anfrageformular für Kunden.'),
    link('/impressum', 'Impressum', 'Verantwortlicher und rechtliche Unternehmensangaben.'),
    '',
    '## Reinigungsleistungen',
    ...services.map((service) =>
      link(`/leistungen/${service.slug}`, service.name, service.summary),
    ),
    '',
    '## Ratgeber',
    ...guides.map((guide) => link(`/ratgeber/${guide.slug}`, guide.title, guide.description)),
    '',
    '## Weitere Informationen',
    link(
      '/datenschutz',
      'Datenschutz',
      'Informationen zur Verarbeitung von Anfragen und optionaler Nutzungsanalyse.',
    ),
    link('/sitemap.xml', 'XML-Sitemap', 'Öffentliche kanonische Seiten der Website.'),
    '',
  ].join('\n');
  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
