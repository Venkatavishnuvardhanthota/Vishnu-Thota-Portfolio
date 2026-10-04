import { type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Application } from '../../data/applications';

interface ApplicationCardProps {
  app: Application;
  index: number;
}

/**
 * One deployed-application entry, laid out as an editorial spread: the whole
 * description of the app in a sticky left column, the screenshot alone on the
 * right. The primary CTA opens the live Streamlit deployment in a new tab; the
 * secondary CTA routes (client-side) to the existing case study so we never
 * duplicate project content here.
 */
export default function ApplicationCard({ app, index }: ApplicationCardProps) {
  const style = { '--d': `${index * 0.08}s` } as CSSProperties;

  return (
    <article className="app-card reveal" style={style}>
      <div className="app-info">
        <div className="app-meta">
          <span className="app-idx">{app.number}</span>
          <span className="app-live">
            <span className="app-live__dot" aria-hidden="true" />
            {app.status}
          </span>
        </div>
        <h3 className="app-name">{app.title}</h3>
        <p className="app-question">{app.question}</p>

        <div className="app-links">
          <a
            className="app-cta app-cta--primary"
            href={app.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the live ${app.title} application in a new tab`}
          >
            Open Live App <span className="arw" aria-hidden="true">↗</span>
          </a>
          <Link
            className="app-cta app-cta--secondary"
            to={app.projectRoute}
            state={{ from: 'live-apps' }}
            aria-label={`View the ${app.title} case study`}
          >
            Read Case Study <span className="arw" aria-hidden="true">→</span>
          </Link>
        </div>

        <p className="app-desc">{app.description}</p>

        <div className="app-metric">
          <span className="app-metric__v">{app.metric}</span>
          <span className="app-metric__l">{app.metricLabel}</span>
          {app.metricNote && <span className="app-metric__note">{app.metricNote}</span>}
        </div>

        <ul className="tags" aria-label={`${app.title} technologies`}>
          {app.technologies.map((tech) => (
            <li className="tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <figure className="app-preview">
        <a
          className="app-preview__link"
          href={app.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the live ${app.title} application in a new tab`}
        >
          <img
            className="app-preview__img"
            src={app.previewImage}
            alt={app.previewAlt}
            width={app.previewWidth}
            height={app.previewHeight}
            loading="lazy"
            decoding="async"
          />
        </a>
        <figcaption className="app-preview__cap">{app.previewCaption}</figcaption>
      </figure>
    </article>
  );
}
