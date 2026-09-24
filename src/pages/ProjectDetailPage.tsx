import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Navigate, useParams } from 'react-router-dom';
import ProjectDetail from '../components/projects/ProjectDetail';
import { getProjectById } from '../data/projects';

/**
 * Route component for /projects/:id. Resolves the project from the URL, takes
 * over the page (portals the case study to document.body while
 * `body.route-detail` hides the static shell), and restores scroll on exit.
 * An unknown id falls back to the home view.
 *
 * It deliberately does not touch document.title or any head tag: useRouteMetaSync
 * in App.tsx owns the head for every route, so navigating between two case studies
 * cannot leave one writer's value behind for the other to restore.
 */
export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = getProjectById(id);

  useLayoutEffect(() => {
    if (!project) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const homeScroll = window.scrollY;

    document.body.classList.add('route-detail');
    window.scrollTo(0, 0);
    const titleEl = document.getElementById('pdTitle');
    if (titleEl && !reduceMotion) titleEl.focus({ preventScroll: true });

    return () => {
      document.body.classList.remove('route-detail');
      window.scrollTo(0, homeScroll);
    };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return createPortal(<ProjectDetail project={project} />, document.body);
}
