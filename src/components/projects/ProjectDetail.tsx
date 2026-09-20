import { Fragment } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../../data/projects';
import type { CaseStudySection, Project } from '../../types/project';
import { buildVisual } from './visuals';

const FIG_TAG = '<span class="fig-tag">Illustrative — verified metrics</span>';

function renderBody(sec: CaseStudySection, project: Project): ReactNode {
  switch (sec.type) {
    case 'para':
      return <p>{sec.text}</p>;
    case 'list':
      return (
        <ul>
          {sec.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case 'kv':
      return (
        <dl className="kv">
          {sec.items.map(([k, v]) => (
            <Fragment key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </Fragment>
          ))}
        </dl>
      );
    case 'metrics':
      return (
        <div className="pd__metrics" style={{ marginTop: 0 }}>
          {sec.items.map((m, i) => (
            <div className="pd__metric" key={i}>
              <div className="v">{m.v}</div>
              <div className="l">{m.l}</div>
            </div>
          ))}
        </div>
      );
    case 'tags':
      return (
        <ul className="tags">
          {project.technologies.map((t) => (
            <li className="tag" key={t}>
              {t}
            </li>
          ))}
        </ul>
      );
    case 'links':
      return (
        <div className="pd__links" style={{ marginTop: 0 }}>
          <a
            className="project__link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository <span className="arw" aria-hidden="true">↗</span>
          </a>
          {project.liveUrl ? (
            <a
              className="project__link"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live application <span className="arw" aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      );
  }
}

function CaseSection({ sec, project }: { sec: CaseStudySection; project: Project }) {
  // Mirror the original: attach the project visual to the results section.
  let visualKey = sec.visual;
  if (!visualKey && sec.type === 'metrics' && sec.num === '05') visualKey = project.visual;

  return (
    <section className="pd__section">
      <div className="pd__sec-head">
        <span className="pd__sec-num">{sec.num}</span>
        <span className="pd__sec-title">{sec.title}</span>
      </div>
      <div className="pd__body">
        {renderBody(sec, project)}
        {visualKey ? (
          <div className="pd__figure">
            <div
              className="figure"
              dangerouslySetInnerHTML={{ __html: buildVisual(visualKey) + FIG_TAG }}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface ProjectDetailProps {
  project: Project;
}

/**
 * Full-page case study for a single project. Rendered through a portal to
 * document.body by ProjectDetailPage while `body.route-detail` hides the shell.
 */
export default function ProjectDetail({ project }: ProjectDetailProps) {
  const navigate = useNavigate();
  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const goBack = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
      window.setTimeout(() => {
        const el = document.getElementById('work');
        if (el) el.scrollIntoView();
      }, 0);
    }
  };

  return (
    <>
      <div className="pd__bar">
        <div className="wrap pd__bar-inner">
          <a className="pd__back" href="/#work" onClick={goBack}>
            <span className="arw" aria-hidden="true">←</span> Back to Projects
          </a>
          <span className="wordmark">
            Vishnu&nbsp;Vardhan<span className="dot">.</span>
          </span>
        </div>
      </div>

      <article className="pd wrap">
        <header>
          <div className="pd__kicker">
            <span className="label" style={{ color: 'var(--ink-3)' }}>
              {project.number}
            </span>
            <span className="label label--ink">{project.category}</span>
          </div>
          <h1 className="pd__title" id="pdTitle" tabIndex={-1}>
            {project.title}
          </h1>
          <p className="pd__summary">{project.shortDescription}</p>
          <div className="pd__links">
            <a
              className="project__link"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span className="arw" aria-hidden="true">↗</span>
            </a>
            {project.liveUrl ? (
              <a
                className="project__link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live application <span className="arw" aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </header>

        <div className="pd__metrics">
          {project.metrics.map((m, i) => (
            <div className="pd__metric" key={i}>
              <div className="v">{m.v}</div>
              <div className="l">{m.l}</div>
              {m.n ? <div className="n">{m.n}</div> : null}
            </div>
          ))}
        </div>

        {project.sections.map((sec) => (
          <CaseSection key={sec.num} sec={sec} project={project} />
        ))}

        <div className="pd__next">
          <Link className="project__link" to={`/projects/${next.id}`}>
            Next — {next.title} <span className="arw" aria-hidden="true">→</span>
          </Link>
          <a className="project__link" href="/#work" onClick={goBack}>
            <span className="arw" aria-hidden="true">←</span> Back to Projects
          </a>
        </div>
      </article>
    </>
  );
}
