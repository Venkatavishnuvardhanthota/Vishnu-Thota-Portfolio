import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ProjectDetail from '../components/projects/ProjectDetail';
import { getProjectById, PROJECTS } from '../data/projects';
import { loadCaseStudySections, peekCaseStudySections, prefetchCaseStudy } from '../data/case-studies';
import type { CaseStudySection } from '../types/project';

/**
 * Route component for /projects/:id. Resolves the project from the URL, takes
 * over the page (portals the case study to document.body while
 * `body.route-detail` hides the static shell), and restores scroll on exit.
 * An unknown id falls back to the home view.
 *
 * The header and the metric strip come from the metadata that is already in the
 * bundle, so they paint on the first frame. The article body is a separate chunk;
 * it is fetched here and the page grows into it. The state carries the id it
 * belongs to so a chunk that lands after the reader has moved to another case
 * study cannot paint under the wrong header.
 *
 * It deliberately does not touch document.title or any head tag: useRouteMetaSync
 * in App.tsx owns the head for every route, so navigating between two case studies
 * cannot leave one writer's value behind for the other to restore.
 */
export default function ProjectDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const project = getProjectById(id);
  const [loaded, setLoaded] = useState<{ id: string; sections: CaseStudySection[] } | null>(null);

  const sections =
    loaded && loaded.id === project?.id
      ? loaded.sections
      : project
        ? peekCaseStudySections(project.id) ?? null
        : null;

  useEffect(() => {
    if (!project) return;
    let live = true;
    loadCaseStudySections(project.id)
      ?.then((body) => {
        if (live) setLoaded({ id: project.id, sections: body });
      })
      .catch(() => {
        /* Leave the header and the pager; the next navigation asks again. */
      });
    return () => {
      live = false;
    };
  }, [project?.id]);

  /* Warm the two articles the reader can reach from here, once this one is on
     screen. The pager is the only route out of a case study that keeps you on a
     case study, and without this the next article's header paints from the
     bundle while its body is still in flight, so the whole block below it jumps:
     measured, all 36 pager transitions shifted, worst CLS 0.106 at 390x844, with
     the metric grid going from zero height to 128px in one commit.
     On idle, not immediately: fetching during the current article's own paint
     would compete with it for the same thread this is meant to protect. */
  useEffect(() => {
    if (!project) return;
    const idx = PROJECTS.indexOf(project);
    const neighbours = [idx > 0 ? PROJECTS[idx - 1] : null, idx >= 0 && idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null]
      .filter(Boolean) as typeof PROJECTS;
    let cancelled = false;
    const go = () => { if (!cancelled) neighbours.forEach((p) => prefetchCaseStudy(p.id)); };
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1200));
    const h = idle(go);
    return () => { cancelled = true; if ('cancel' in window && window.cancelIdleCallback) window.cancelIdleCallback(h as number); };
  }, [project?.id]);

  useLayoutEffect(() => {
    if (!project) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* Read before the class goes on: `body.route-detail` hides the static shell, and
       the document is a different height the moment it does. Everything below Skills
       is still mounted, so this is the place in the page the reader was holding. */
    const homeScroll = window.scrollY;

    document.body.classList.add('route-detail');
    window.scrollTo(0, 0);
    const titleEl = document.getElementById('pdTitle');
    /* Only when the reader arrived by changing route inside a document they were
       already in. React Router gives the first location of a document the key
       'default', so this is the load/SPA distinction without a module flag that
       would have to be reset on every new document.
       On a cold load the heading was never the thing the reader lost: the page
       starts at the top and focus is where the browser left it. Claiming the h1
       there pushed the first Tab past the header -- measured, the skip link, the
       Back control and the Resume pill only came round again after wrapping
       through every figure, link and pager on the page. On a route change the
       whole article has just been replaced under them, which is exactly when an
       announcement is owed. */
    const initialDocument = location.key === 'default';
    if (titleEl && !reduceMotion && !initialDocument) titleEl.focus({ preventScroll: true });

    return () => {
      document.body.classList.remove('route-detail');
      window.scrollTo(0, homeScroll);
    };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  /* The subtree is keyed on the project so a pager navigation builds the next
     article from new nodes instead of mutating the current one in place.
     Measured, the prefetch and the transition did their part -- the destination
     chunk was already in memory on all 36 legs, and the article mounted in the
     same commit as its header -- yet every leg still shifted, worst 0.106. The
     entries name the reason: `pd__title` 85px -> 122px, `pd__summary` 77px ->
     129px, and everything under them moving with them. Two case studies simply
     have different-length questions, and while React reuses the header nodes
     that difference is a layout shift. A cold load of the same page costs
     nothing, because nothing existed before it to move from; the key gives the
     in-app navigation the same shape -- the destination is built, not patched.
     The article has no state worth preserving across that boundary, and the
     figures carry their own width and height, so the remount re-decodes images
     from the HTTP cache into boxes the same size. */
  return createPortal(<ProjectDetail key={project.id} project={project} sections={sections} />, document.body);
}
