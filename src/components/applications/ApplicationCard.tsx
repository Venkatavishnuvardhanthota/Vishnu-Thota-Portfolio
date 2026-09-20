import type { CSSProperties } from 'react';
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
        <span className="app-idx">{app.number}</span>
        <h3 className="app-name">{app.title}</h3>
        <span className="app-flow">
          Project <span className="arw" aria-hidden="true">→</span> Live Application
        </span>
      </div>

      <div className="app-row__body">
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
