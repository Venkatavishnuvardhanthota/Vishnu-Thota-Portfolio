import { Link } from 'react-router-dom';
import type { Project } from '../../types/project';

interface ProjectPreviewProps {
  project: Project;
}

/**
 * Expanded panel content for a project row: short description, the verified
 * preview metric, the first five technologies, and a case-study link.
 */
export default function ProjectPreview({ project }: ProjectPreviewProps) {
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
        <Link className="project__link" to={`/projects/${project.id}`}>
          View case study <span className="arw" aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}
