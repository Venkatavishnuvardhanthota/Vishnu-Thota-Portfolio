import { useEffect, useRef } from 'react';
import { CERTIFICATIONS } from '../../data/certifications';
import CertificationRow from './CertificationRow';
import '../../styles/certifications.css';

/**
 * The Certifications showcase. Mounts into the static section's
 * #certifications-root and reveals rows with the same observer the project
 * and application islands use, so motion stays consistent across the page.
 */
export default function CertificationsSection() {
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
      // A credential row carries its certificate image, so it runs 398-895px
      // tall. A fraction of that height is a wait the reader pays before the
      // row's own heading paints; the top edge crossing is the whole trigger.
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="certs" ref={ref}>
      {CERTIFICATIONS.map((cert, i) => (
        <CertificationRow key={cert.id} cert={cert} index={i} />
      ))}
    </div>
  );
}
