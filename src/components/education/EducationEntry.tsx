import type { CSSProperties } from 'react';
import type { EducationEntry as EducationEntryData } from '../../data/education';

interface EducationEntryProps {
  entry: EducationEntryData;
  index: number;
}

/**
 * One stage of the academic progression, hanging off the timeline rail.
 * Hierarchy: period → degree → field → institution, with the CGPA given
 * its own restrained serif treatment.
 */
export default function EducationEntry({ entry, index }: EducationEntryProps) {
  const style = { '--d': `${index * 0.1}s` } as CSSProperties;

  return (
    <article className="edu-entry reveal" style={style} aria-current={entry.status ? 'true' : undefined}>
      <div className="edu-entry__main">
        <div className="edu-entry__head">
          <span className="edu-num">{entry.number}</span>
          <span className="edu-period">
            {entry.startYear} — {entry.endYear}
          </span>
          {entry.status && (
            <span className="edu-status">
              <span className="edu-status__dot" aria-hidden="true" />
              {entry.status}
            </span>
          )}
        </div>
        <h3 className="edu-degree">{entry.degree}</h3>
        <p className="edu-field">{entry.field}</p>
        <p className="edu-inst">{entry.institution}</p>
      </div>
      <div className="edu-score">
        <span className="edu-score__v">{entry.cgpa}</span>
        <span className="edu-score__l">CGPA</span>
      </div>
    </article>
  );
}
