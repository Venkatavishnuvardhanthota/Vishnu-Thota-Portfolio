import { useEffect, useRef } from 'react';
import { PROJECTS } from '../../data/projects';
import ProjectRow from './ProjectRow';

/**
 * The editorial project list. Rows mount into the static Work section and are
 * revealed on scroll with the same IntersectionObserver settings the original
 * single-file implementation used for its dynamically-rendered rows.
 */
export default function ProjectsSection() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ul className="projects__list" ref={listRef}>
      {PROJECTS.map((p) => (
        <ProjectRow key={p.id} project={p} />
      ))}
    </ul>
  );
}
