import Link from 'next/link';
import { commonQuestions } from '@/lib/answers';
import { pageMetadata } from '@/lib/seo';
import { pageGraph, questionEntities } from '@/lib/structured-data';
import { Breadcrumb, ClosingCta, Eyebrow, JsonLd } from '@/components/Shared';
import { Icon } from '@/components/Icon';

const title = 'Fragen zur Reinigung: Kosten, Ablauf und Einsatzgebiet';
const description =
  'Antworten von ERLEDIGT TEAM zu Reinigungsleistungen, Angeboten, Terminen und dem Einsatzgebiet Saterland und Umgebung.';
export const metadata = pageMetadata('/fragen', title, description);

export default function QuestionsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Fragen & Antworten' }]} />
      <section className="wrap page-intro">
        <Eyebrow>Fragen & Antworten</Eyebrow>
        <h1>
          Vorher wissen.
          <br />
          <em>In Ruhe entscheiden.</em>
        </h1>
        <p>
          Welche Reinigung passt, was wird für ein Angebot gebraucht und wie geht es danach weiter?
          Hier finden Sie klare Antworten von ERLEDIGT TEAM für Ihr Vorhaben in Saterland und
          Umgebung.
        </p>
        <nav className="answer-jump-links" aria-label="Frage auswählen">
          {commonQuestions.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.question}
            </a>
          ))}
        </nav>
      </section>
      <section className="wrap answer-library" aria-label="Antworten vor der Anfrage">
        {commonQuestions.map((item, i) => (
          <article className="answer-entry" key={item.id} id={item.id}>
            <span className="chapter-number" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
            <Link className="text-link" href={item.link}>
              {item.linkLabel} <Icon name="ArrowUpRight" size={18} />
            </Link>
          </article>
        ))}
      </section>
      <ClosingCta
        title="Ihre Frage ist noch offen?"
        text="Schildern Sie uns Ihr Vorhaben. Wir klären die offenen Punkte persönlich, bevor Sie über eine Beauftragung entscheiden."
      />
      <JsonLd
        value={pageGraph('/fragen', title, description, {
          '@type': 'FAQPage',
          mainEntity: questionEntities(commonQuestions),
        })}
      />
    </>
  );
}
