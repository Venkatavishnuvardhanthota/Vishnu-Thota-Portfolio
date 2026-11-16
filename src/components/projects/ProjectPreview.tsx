import { Link } from 'react-router-dom';
import { APPLICATIONS } from '../../data/applications';
import type { ProjectMeta } from '../../types/project';

interface ProjectPreviewProps {
  project: ProjectMeta;
}

/**
 * Expanded panel content for a project row: short description, the verified
 * preview metric, the first five technologies, and the ways out — the running
 * app when there is one, then the case study.
 */
export default function ProjectPreview({ project }: ProjectPreviewProps) {
  /* applications.ts owns the deployed URL, so reading it here keeps the row and
     the Live Apps section pointing at the same address. Only a live entry
     qualifies, which is why exactly two of the seven rows carry the link. */
  const liveApp = APPLICATIONS.find((app) => app.id === project.id && app.status === 'Live');

  return (
    <div className="prow__panel-content">
      <div>
        <p className="prow__desc">{project.shortDescription}</p>
        <div className="prow__metric">
          <div className="v">{project.previewMetric.v}</div>
          <div className="l">{project.previewMetric.l}</div>
        </div>
      </div>
      <div className="prow__aside">
        <ul className="tags" aria-label="Key technologies">
          {project.technologies.slice(0, 5).map((t) => (
            <li className="tag" key={t}>
              {t}
            </li>
          ))}
        </ul>
        <div className="prow__links">
          {liveApp && (
            <a
              className="prow__live"
              href={liveApp.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${liveApp.title} live app (opens in new tab)`}
            >
              Live app <span className="arw" aria-hidden="true">↗</span>
            </a>
          )}
          <Link className="project__link" to={`/projects/${project.id}`}>
            View case study <span className="arw" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
