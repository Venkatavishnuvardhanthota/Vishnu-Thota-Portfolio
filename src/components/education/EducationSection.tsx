import { useEffect, useRef, type CSSProperties } from 'react';
import { EDUCATION } from '../../data/education';
import EducationEntry from './EducationEntry';
import '../../styles/education.css';

/** Custom properties are not in React's style typing. */
type Vars = CSSProperties & Record<string, string | number>;

const yr = (v: string) => Number(v);

/**
 * The axis reads recent → past, and the stages are listed the same way, so the
 * degree in progress owns the left end. Every position below is arithmetic on
 * the years in the data — nothing is measured, which is what lets the whole
 * drawing be CSS and lets the cards be the only copy of the dates that a
 * screen reader or a phone has to rely on.
 */
const TICKS = [...new Set(EDUCATION.flatMap((e) => [e.startYear, e.endYear]))].sort(
  (a, b) => yr(b) - yr(a),
);

/** The stage still running. It is what the NOW marker and the two B.Tech bands describe. */
const RUNNING = EDUCATION.find((e) => e.status);

const LATEST = yr(TICKS[0]);
const EARLIEST = yr(TICKS[TICKS.length - 1]);

/** Today, as a year number. The label prints this, so it is never a hard-coded 2026. */
const MARK = new Date().getFullYear();

/** Where a year falls along the axis, as a percentage from the LEFT end. */
const at = (year: number) =>
  Math.min(100, Math.max(0, ((LATEST - year) / (LATEST - EARLIEST)) * 100));

/** The marker clamped inside the running stage, so a year past `endYear`
 *  collapses the remaining band to zero instead of giving it a negative width. */
const POS = RUNNING
  ? Math.min(yr(RUNNING.endYear), Math.max(yr(RUNNING.startYear), MARK))
  : LATEST;

/**
 * Three states, each bound to the date interval it stands for and drawn in the
 * screen order the axis runs: the years of the current degree still to come, the
 * years of it already behind, and every year that closed before it began.
 */
const SEGMENTS = RUNNING
  ? [
      { state: 'future', from: yr(RUNNING.endYear), to: POS },
      { state: 'current', from: POS, to: yr(RUNNING.startYear) },
      { state: 'closed', from: yr(RUNNING.startYear), to: EARLIEST },
    ]
  : [{ state: 'closed', from: LATEST, to: EARLIEST }];

const edge = (i: number) => (i === 0 ? 'start' : i === TICKS.length - 1 ? 'end' : 'hinge');

/**
 * The academic progression on one horizontal line: 2027 at the near end, 2021 at
 * the far end, and the years between them in three states of the same neutral
 * ink — a thick solid band where the running degree has progressed, a dashed hair
 * where it has not, and a solid hair for the stage that closed. The green marker
 * sits on the line at today's position.
 *
 * The whole block is `aria-hidden`: it restates what the cards say in text, so
 * nothing essential depends on its colour, thickness or geometry.
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

  const closing = EDUCATION.reduce((a, b) => (yr(b.endYear) > yr(a.endYear) ? b : a));

  return (
    <div className="edu-axis" ref={ref}>
      <div className="edu-timeline" aria-hidden="true">
        <div className="edu-ends">
          <span>◂ Recent</span>
          <span>Past</span>
        </div>

        <ol className="edu-years" aria-hidden="true">
          {TICKS.map((year, i) => (
            <li
              className={`edu-year edu-year--${edge(i)} reveal`}
              style={{ '--d': `${i * 0.08}s` } as Vars}
              key={year}
            >
              <span className="edu-year__v">{year}</span>
              {year === closing.endYear && closing.endNote && (
                <span className="edu-year__note"> · {closing.endNote}</span>
              )}
            </li>
          ))}
        </ol>

        <div className="edu-rail" aria-hidden="true">
          {SEGMENTS.map((s) => (
            <span
              className={`edu-seg edu-seg--${s.state}`}
              style={{ '--w': `${at(s.to) - at(s.from)}%` } as Vars}
              key={s.state}
            />
          ))}
          {TICKS.map((year) => (
            <span className="edu-node" style={{ '--x': `${at(yr(year))}%` } as Vars} key={year} />
          ))}
          {RUNNING && (
            <span className="edu-today" style={{ '--x': `${at(POS)}%` } as Vars}>
              <span className="edu-today__dot" />
              <span className="edu-today__label">NOW · {MARK}</span>
            </span>
          )}
        </div>
      </div>

      <div className="edu-cols">
        {EDUCATION.map((entry, i) => (
          <EducationEntry entry={entry} index={i} key={entry.id} />
        ))}
      </div>
    </div>
  );
}
