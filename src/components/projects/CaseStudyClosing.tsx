import type { MouseEvent } from 'react';
import { RESUME_URL } from '../../data/contact';

type Props = { onContact?: (e: MouseEvent<HTMLAnchorElement>) => void };

export default function CaseStudyClosing({ onContact }: Props) {
  return (
    <section className="pd__closing">
      <p className="pd__closing-note">
        Available immediately for Data Analyst internships and <span className="pd__closing-nowrap">entry-level</span> roles.
      </p>
      <div className="pd__closing-actions">
        <a className="hero__btn hero__btn--primary" href="/#contact" onClick={onContact}>
          Contact <span className="arw" aria-hidden="true">→</span>
        </a>
        <a
          className="hero__btn hero__btn--secondary"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé <span className="arw" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
