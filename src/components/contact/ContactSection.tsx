import { useEffect, useRef } from 'react';
import { CONTACT_LINKS, RESUME_URL } from '../../data/contact';
import ContactLink from './ContactLink';
import '../../styles/contact.css';

/**
 * The closing call to action: three hairline contact rows and one secondary
 * résumé CTA. No form, no phone number, no extra social profiles.
 */
export default function ContactSection() {
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
    <div className="contact__body" ref={ref}>
      <div className="contact__links">
        {CONTACT_LINKS.map((link, i) => (
          <ContactLink key={link.id} link={link} index={i} />
        ))}
      </div>

      <div className="contact__actions">
        <a
          className="contact-cta"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download résumé, PDF opens in a new tab"
        >
          Download résumé <span className="arw" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
