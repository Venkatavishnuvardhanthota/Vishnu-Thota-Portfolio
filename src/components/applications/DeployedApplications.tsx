import { useEffect, useRef } from 'react';
import { APPLICATIONS } from '../../data/applications';
import ApplicationCard from './ApplicationCard';
import '../../styles/applications.css';

/**
 * The Deployed Applications showcase. Rows mount into the static section's
 * #applications-root and are revealed on scroll with the same observer the
 * project list uses, so motion behaviour stays consistent across the page.
 */
export default function DeployedApplications() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
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
    <div className="apps" ref={ref}>
      {APPLICATIONS.map((app, i) => (
        <ApplicationCard key={app.id} app={app} index={i} />
      ))}
    </div>
  );
}
