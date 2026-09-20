import { useEffect, useRef } from 'react';
import { EDUCATION } from '../../data/education';
import EducationEntry from './EducationEntry';
import '../../styles/education.css';

/**
 * The academic progression: a single hairline rail with year milestones
 * (2021 → 2024 → 2027) and the two study stages branching off it. The
 * closing milestone is rendered hollow because it has not occurred yet.
 */
export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const last = EDUCATION[EDUCATION.length - 1];

  return (
    <div className="edu-tl" ref={ref}>
      {EDUCATION.map((entry, i) => (
        <div className="edu-stage" key={entry.id}>
          <div className="edu-node reveal" style={{ '--d': `${i * 0.1}s` } as React.CSSProperties}>
            <span className="edu-node__mark" aria-hidden="true" />
            <span className="edu-node__year">{entry.startYear}</span>
          </div>
          <EducationEntry entry={entry} index={i} />
        </div>
      ))}
      <div
        className="edu-node edu-node--future reveal"
        style={{ '--d': `${EDUCATION.length * 0.1}s` } as React.CSSProperties}
      >
        <span className="edu-node__mark" aria-hidden="true" />
        <span className="edu-node__year">{last.endYear}</span>
      </div>
    </div>
  );
}
