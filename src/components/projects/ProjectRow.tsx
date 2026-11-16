import { useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { ProjectMeta } from '../../types/project';
import ProjectPreview from './ProjectPreview';

interface ProjectRowProps {
  project: ProjectMeta;
}

/**
 * A single editorial project row. Collapsed by default; expands on hover
 * (desktop) or focus-within (keyboard) via CSS, and on touch via an explicit
 * toggle. Clicking the row opens the routed case study on pointer devices.
 */
export default function ProjectRow({ project }: ProjectRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const panelId = `pp-${project.id}`;

  const openDetail = () => navigate(`/projects/${project.id}`);

  const onRowClick = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) return; // let in-row links navigate natively
    const touchOnly = window.matchMedia('(hover: none)').matches;
    if (touchOnly) {
      setIsOpen((o) => !o);
    } else {
      openDetail();
    }
  };

  const onToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((o) => !o);
  };

  // Space on a focused title opens the case study (Enter is native to the link).
  const onTitleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      openDetail();
    }
  };

  return (
    <li
      className={isOpen ? 'prow reveal is-open' : 'prow reveal'}
      data-id={project.id}
      onClick={onRowClick}
    >
      <div className="prow__main">
        <span className="prow__num">{project.number}</span>
        <Link
          className="prow__title"
          to={`/projects/${project.id}`}
          onKeyDown={onTitleKeyDown}
        >
          {project.title}
        </Link>
        {/* The category is a list of disciplines separated by " / ", and the
            only place it may break is one of those separators. Each part is
            glued to the slash that follows it — a non-breaking space before the
            slash, `white-space: nowrap` across the pair — and the break
            opportunity is the plain space rendered BETWEEN the spans, outside
            any nowrap box, which is the only unglued whitespace in the label.
            A line can therefore end "Data Analytics /" and never "Data
            Analytics" with the slash below it, and never strand "BI" alone. */}
        <span className="prow__cat">
          {project.category
            .split(' / ')
            .flatMap((part, i, all) =>
              i < all.length - 1
                ? [
                    <span className="prow__cat-part" key={part}>
                      {`${part}\u00A0/`}
                    </span>,
                    ' ',
                  ]
                : [
                    <span className="prow__cat-part" key={part}>
                      {part}
                    </span>,
                  ],
            )}
        </span>
        <button
          className="prow__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggleClick}
        >
          <span className="tg" aria-hidden="true">+</span>
          <span>Preview</span>
        </button>
        <span className="prow__arrow" aria-hidden="true">→</span>
      </div>
      <div className="prow__panel" id={panelId}>
        <div className="prow__panel-inner">
          <ProjectPreview project={project} />
        </div>
      </div>
    </li>
  );
}
