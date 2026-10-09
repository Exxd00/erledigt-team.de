import Link from 'next/link';
import { Icon } from './Icon';

export function AnswerSummary({
  title,
  answer,
  facts = [],
}: {
  title: string;
  answer: string;
  facts?: { label: string; value: string }[];
}) {
  return (
    <section className="wrap answer-section" aria-labelledby="kurz-erklaert">
      <div className="answer-panel">
        <div className="answer-copy">
          <p className="eyebrow">
            <Icon name="MessageCircle" size={18} /> Kurz erklärt
          </p>
          <h2 id="kurz-erklaert">{title}</h2>
          <p>{answer}</p>
          <Link className="text-link" href="/fragen">
            Fragen vor der Anfrage <Icon name="ArrowUpRight" size={17} />
          </Link>
        </div>
        {facts.length > 0 && (
          <dl className="answer-facts">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
