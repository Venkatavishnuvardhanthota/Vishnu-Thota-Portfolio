import type { CSSProperties } from 'react';
import type { EducationEntry as EducationEntryData } from '../../data/education';

interface EducationEntryProps {
  entry: EducationEntryData;
  index: number;
}

/**
 * One study stage. The identity line carries the stage's own year range, so the
 * card states its dates in text and the axis above it is free to be decorative:
 * `01 · 2024 — 2027 · Expected` reads as B.Tech's period on its own, in one
 * column on a phone, with the whole timeline hidden. Nothing is drawn here to
 * point at the axis — the range replaced the leader lines.
 *
 * The status is the one place the data's semantic word and the printed word
 * differ: `status: 'Current'` marks which stage is running, while the card says
 * `In Progress`, which is what reads beside a score.
 */
export default function EducationEntry({ entry, index }: EducationEntryProps) {
  const style = { '--d': `${index * 0.1}s` } as CSSProperties;

  return (
    <article
      className="edu-col reveal"
      style={style}
      aria-current={entry.status ? 'true' : undefined}
    >
      <p className="edu-id">
        <span className="edu-id__n">{entry.number}</span>
        {' · '}
        <span className="edu-id__y">
          {entry.startYear} {'\u2014'} {entry.endYear}
        </span>
        {entry.endShort ? (
          <>
            {' · '}
            <span className="edu-id__exp">{entry.endShort}</span>
          </>
        ) : null}
      </p>
      <h3 className="edu-degree">{entry.degree}</h3>
      <p className="edu-field">{entry.field}</p>
      <p className="edu-inst">{entry.institution}</p>
      <p className="edu-score">
        <span className="edu-score__v">{entry.cgpa}</span>
        <span className="edu-score__t">
          <span className="edu-score__l">CGPA / {entry.cgpaScale}</span>
          {entry.status ? (
            <>
              {' · '}
              <span className="edu-status">In Progress</span>
            </>
          ) : null}
        </span>
      </p>
    </article>
  );
}
