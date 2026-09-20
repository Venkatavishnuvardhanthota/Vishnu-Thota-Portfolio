import { Fragment, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Application } from '../../data/applications';

interface ApplicationCardProps {
  app: Application;
  index: number;
}

/**
 * One deployed-application entry. The primary CTA opens the live Streamlit
 * deployment in a new tab; the secondary CTA routes (client-side) to the
 * existing case study so we never duplicate project content here.
 */
export default function ApplicationCard({ app, index }: ApplicationCardProps) {
  const style = { '--d': `${index * 0.08}s` } as CSSProperties;

  return (
    <article className="app-row reveal" style={style}>
      <div className="app-row__head">
        <div className="app-row__meta">
          <span className="app-idx">{app.number}</span>
          <span className="app-live">
            <span className="app-live__dot" aria-hidden="true" />
            {app.status}
          </span>
        </div>
        <h3 className="app-name">{app.title}</h3>
        <span className="app-flow" aria-label={`Workflow: ${app.workflow.join(', then ')}`}>
          {app.workflow.map((step, i) => (
            <Fragment key={step}>
              {i > 0 && (
                <span className="arw" aria-hidden="true">
                  →
                </span>
              )}
              <span>{step}</span>
            </Fragment>
          ))}
        </span>
      </div>

      <div className="app-row__body">
        <figure className="app-preview">
          <img
            className="app-preview__img"
            src={app.previewImage}
            alt={app.previewAlt}
            width={app.previewWidth}
            height={app.previewHeight}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="app-preview__cap">{app.previewCaption}</figcaption>
        </figure>

        <p className="app-desc">{app.description}</p>

        <div className="app-metric">
          <span className="app-metric__v">{app.metric}</span>
          <span className="app-metric__l">{app.metricLabel}</span>
        </div>

        <ul className="tags" aria-label={`${app.title} technologies`}>
          {app.technologies.map((tech) => (
            <li className="tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>

        <div className="app-links">
          <a
            className="app-cta app-cta--primary"
            href={app.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the live ${app.title} application in a new tab`}
          >
            Open Live Application <span className="arw" aria-hidden="true">↗</span>
          </a>
          <Link
            className="app-cta app-cta--secondary"
            to={app.projectRoute}
            aria-label={`View the ${app.title} case study`}
          >
            View Project <span className="arw" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
