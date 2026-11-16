import { Fragment, startTransition } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../../data/projects';
import { RESUME_URL } from '../../data/contact';
import type { CaseStudySection, ProjectMeta } from '../../types/project';
import CaseStudyClosing from './CaseStudyClosing';
import Figure from './Figure';
import { buildVisual } from './visuals';

const FIG_TAG = '<span class="fig-tag">Illustrative — verified metrics</span>';

function renderBody(sec: CaseStudySection, project: ProjectMeta, firstFigureSrc: string | undefined): ReactNode {
  switch (sec.type) {
    case 'para': {
      const blocks = sec.paras?.length ? sec.paras : sec.text ? [sec.text] : [];
      return (
        <>
          {sec.lead ? <p className="pd__lead">{sec.lead}</p> : null}
          {blocks.map((t, i) => (
            <p key={i}>
              {sec.num === '01' && i === 0 ? (
                <>
                  <strong>The problem:</strong> {t}
                </>
              ) : (
                t
              )}
            </p>
          ))}
        </>
      );
    }
    case 'list':
      return (
        <>
          <ul className={sec.divider === 'rule' ? 'pd__rules' : undefined}>
            {sec.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
          {sec.after ? <p className="pd__after">{sec.after}</p> : null}
        </>
      );
    case 'kv':
      return (
        <>
          <dl className="kv">
            {sec.items.map(([k, v]) => (
              <Fragment key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </Fragment>
            ))}
          </dl>
          {sec.notes?.map((n, i) => (
            <p className="pd__notes" key={i}>
              {n}
            </p>
          ))}
          {sec.after ? <p className="pd__after">{sec.after}</p> : null}
        </>
      );
    case 'metrics':
      return (
        <div className="pd__metrics" style={{ marginTop: 0 }}>
          {sec.items.map((m, i) => (
            <div className={m.fit ? 'pd__metric pd__metric--fit' : 'pd__metric'} key={i}
              style={typeof m.fit === 'number' ? ({ '--fit-cqw': `${m.fit}cqw` } as CSSProperties) : undefined}>
              <div className="v">{m.v}</div>
              <div className="l">{m.l}</div>
            </div>
          ))}
        </div>
      );
    case 'tags':
      if (sec.groups) {
        return (
          <div className="pd__tag-groups">
            {sec.groups.map((g) => (
              <div className="pd__tag-group" key={g.label}>
                <span className="label">{g.label}</span>
                <ul className="tags" aria-label={`${g.label} used on this project`}>
                  {g.items.map((t) => (
                    <li className="tag" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      return (
        <ul className="tags">
          {project.technologies.map((t) => (
            <li className="tag" key={t}>
              {t}
            </li>
          ))}
        </ul>
      );
    case 'figures':
      return (
        <div className="pd__figures">
          {sec.items.map((f) => (
            <Figure key={f.src} figure={f} priority={f.src === firstFigureSrc} />
          ))}
        </div>
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

function CaseSection({
  sec,
  project,
  firstFigureSrc,
}: {
  sec: CaseStudySection;
  project: ProjectMeta;
  firstFigureSrc: string | undefined;
}) {
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
        {renderBody(sec, project, firstFigureSrc)}
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
  project: ProjectMeta;
  /** The article body, fetched by the route. `null` until its chunk is in. */
  sections: CaseStudySection[] | null;
}

/** The route state the home page attaches when it sends a reader here. */
interface OriginState {
  from?: string;
}

/**
 * Full-page case study for a single project. Rendered through a portal to
 * document.body by ProjectDetailPage while `body.route-detail` hides the shell.
 */
export default function ProjectDetail({ project, sections }: ProjectDetailProps) {
  const navigate = useNavigate();
  const idx = PROJECTS.indexOf(project);
  /* The pager walks the reading list once, not in a loop: the first case study
     has no previous slot and the last has no next one. */
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx >= 0 && idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;
  /* The first figure on the page is the only one marked eager; everything after
     it stays lazy. Read from the body, so it is undefined while the chunk loads. */
  const firstFigureSrc = sections?.find((s) => s.type === 'figures')?.items[0]?.src;
  /* Where the reader came from decides how this page lets them leave. Arriving from
     the Skills section or from Live Apps means the entry behind this one is their own
     place in the page — a scroll position they were holding when they clicked — so the
     control is a plain Back. Arriving any other way, including a case study URL opened
     directly, has no such entry, and walking history would leave the site: that
     control names the Projects section and goes there. */
  const origin = useLocation().state as OriginState | null;
  const fromList = origin?.from === 'skills' || origin?.from === 'live-apps';
  const backLabel = fromList ? 'Back' : 'Back to Projects';

  const goBack = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (fromList) {
      navigate(-1);
      return;
    }
    navigate('/#projects');
    window.setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView();
    }, 0);
  };

  /* The closing block's Contact button uses the same landing logic as goBack:
     route home, then scroll the section under the sticky header in the same
     frame, so the arrival matches the Back control's. */
  const goContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/#contact');
    window.setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView();
    }, 0);
  };

  /* The pager is the one route change on the site whose destination is already
     known and already fetched, so it is the one worth marking as a transition.
     Inside a transition React keeps showing the outgoing article until the new
     page's first render can complete; combined with the idle prefetch of the
     neighbouring chunks, that is what stops the metric grid and the body from
     arriving one commit after the header and pushing everything below it down.
     A modified click is left to the browser: Ctrl, Meta, Shift and Alt all mean
     something the reader asked for that a transition would throw away. */
  const goPager = (to: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    startTransition(() => navigate(to));
  };

  return (
    <>
      <header className="pd__bar">
        <div className="wrap pd__bar-inner">
          <a className="pd__back" href="/#projects" onClick={goBack}>
            <span className="arw" aria-hidden="true">←</span>
            <span className="pd__back-label">
              <span className="pd__back-full">{backLabel}</span>
              {!fromList && <span className="pd__back-short">Projects</span>}
            </span>
          </a>
          <div className="pd__bar-right">
            <a
              className="nav__resume"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé <span className="arw" aria-hidden="true">↗</span>
            </a>
            <span className="wordmark">
              Vishnu&nbsp;Vardhan<span className="dot">.</span>
            </span>
          </div>
        </div>
      </header>

      <article className="pd wrap" role="main">
        <header>
          <div className="pd__kicker">
            <span className="label" style={{ color: 'var(--ink-3)' }}>
              {project.number}
            </span>
            <span className="pd__project">{project.title}</span>
            <span className="label label--ink">{project.category}</span>
          </div>
          <h1 className="pd__title" id="pdTitle" tabIndex={-1}>
            {project.question}
          </h1>
          <p className="pd__summary">{project.standfirst ?? project.shortDescription}</p>
          {project.stack?.length ? (
            <p className="pd__stack">{project.stack.join(' · ')}</p>
          ) : null}
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
            <div className={m.fit ? 'pd__metric pd__metric--fit' : 'pd__metric'} key={i}
              style={typeof m.fit === 'number' ? ({ '--fit-cqw': `${m.fit}cqw` } as CSSProperties) : undefined}>
              <div className="v">{m.v}</div>
              <div className="l">{m.l}</div>
              {m.n ? <div className="n">{m.n}</div> : null}
            </div>
          ))}
        </div>

        {sections ? (
          <>
            {sections.map((sec) => (
              <CaseSection key={sec.num} sec={sec} project={project} firstFigureSrc={firstFigureSrc} />
            ))}

            {/* The closing block and the pager mount in the same commit as the
                sections: painting them at the page foot before the article exists
                would put them in the first viewport and then shift them down. */}
            <CaseStudyClosing onContact={goContact} />

            <nav className="pd__pager" aria-label="Case studies">
              {prev ? (
                <Link className="pd__pager-link pd__pager-link--prev" to={`/projects/${prev.id}`} onClick={goPager(`/projects/${prev.id}`)}>
                  <span className="pd__pager-label">Previous</span>
                  <span className="pd__pager-title">
                    <span className="arw" aria-hidden="true">←</span>{' '}
                    <span className="pd__pager-num">{prev.number}</span> {prev.title}
                  </span>
                </Link>
              ) : (
                <span className="pd__pager-slot" aria-hidden="true" />
              )}
              {next ? (
                <Link className="pd__pager-link pd__pager-link--next" to={`/projects/${next.id}`} onClick={goPager(`/projects/${next.id}`)}>
                  <span className="pd__pager-label">Next</span>
                  <span className="pd__pager-title">
                    <span className="pd__pager-num">{next.number}</span> {next.title}{' '}
                    <span className="arw" aria-hidden="true">→</span>
                  </span>
                </Link>
              ) : (
                <span className="pd__pager-slot" aria-hidden="true" />
              )}
            </nav>
          </>
        ) : null}
      </article>
    </>
  );
}
