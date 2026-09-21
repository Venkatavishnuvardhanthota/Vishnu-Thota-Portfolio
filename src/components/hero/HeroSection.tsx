import { useEffect, useState } from 'react';
import '../../styles/hero.css';
import { CONTACT_LINKS, type ContactLink } from '../../data/contact';

const PORTRAIT_SRC = '/hero-portrait.png';
const PORTRAIT_ALT = 'Black-and-white studio portrait of Thota Venkata Vishnu Vardhan';
const NAME_LINES = ['Thota Venkata', 'Vishnu Vardhan'];
/** Lower-right meta, in the order the composition wants them. Reused from
 *  src/data/contact so the Hero can never drift from the Contact section. */
const HERO_LINK_IDS = ['github', 'linkedin', 'email'];

const heroLinks = HERO_LINK_IDS.map((id) => CONTACT_LINKS.find((l) => l.id === id)).filter(
  (l): l is ContactLink => Boolean(l)
);

/**
 * Hero V2 — a layered masthead rather than a two-column spread: the name is an
 * oversized background element, the portrait sits in front of it on the centre
 * axis, and the professional context + links run along the bottom.
 *
 * Source order is still the mobile reading order (name, portrait, role, lede,
 * CTA, links), so no second tree is needed for small screens.
 *
 * The portrait is never cropped and never transforms on scroll — see hero.css,
 * where its width is derived from the space the Hero actually has. The name is
 * sized from its measured em width, so it spans the content column exactly.
 *
 * Entrance is driven by an `is-in` class rather than the shell's body.is-loaded,
 * because this section mounts after that class has already been applied.
 */
export default function HeroSection() {
  const [isIn, setIsIn] = useState(false);
  const [portraitMissing, setPortraitMissing] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || !document.fonts) {
      setIsIn(true);
      return;
    }
    let frame = 0;
    // Wait for the web fonts so the masked lines never animate at the wrong
    // metrics; the timer is the safety net if fonts.ready never settles.
    const timer = window.setTimeout(() => setIsIn(true), 1400);
    document.fonts.ready
      .then(() => {
        frame = requestAnimationFrame(() => setIsIn(true));
      })
      .catch(() => setIsIn(true));
    return () => {
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={`hero${isIn ? ' is-in' : ''}`} aria-labelledby="hero-name">
      <div className="wrap hero__inner">
        <div className="hero__stage">
          <h1 className="hero__name" id="hero-name">
            {NAME_LINES.map((line, i) => (
              <span
                key={line}
                className={`hero__name-line${i === 0 ? ' hero__name-line--ghost' : ''}`}
              >
                <span className="mask">
                  <span style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>{line}</span>
                </span>
              </span>
            ))}
          </h1>

          <div className="hero__figure">
            <figure className={`portrait${portraitMissing ? ' portrait--missing' : ''}`}>
              <img
                className="portrait__img"
                src={PORTRAIT_SRC}
                alt={PORTRAIT_ALT}
                width={942}
                height={1128}
                decoding="async"
                loading="eager"
                onError={() => setPortraitMissing(true)}
              />
              <div className="portrait__fallback" aria-hidden="true">
                <span>Thota Venkata Vishnu Vardhan</span>
              </div>
            </figure>
          </div>
        </div>

        <div className="hero__foot">
          <div className="hero__intro">
            <p className="hero__role hero__rise" style={{ transitionDelay: '0.5s' }}>
              <span className="hero__tick" aria-hidden="true" />
              <span className="label label--ink">
                Data Analyst<span className="hero__slash"> / </span>Data Scientist
              </span>
            </p>
            <p className="hero__lede hero__rise" style={{ transitionDelay: '0.58s' }}>
              Data analyst and scientist building end-to-end solutions — from exploratory analysis
              and machine learning to deployed applications and interactive dashboards.
            </p>
            <a
              className="hero__cue hero__rise"
              href="#work"
              aria-label="Explore work — jump to selected projects"
              style={{ transitionDelay: '0.66s' }}
            >
              <span className="label">Explore work</span>
              <span className="arw" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <ul className="hero__links hero__rise" style={{ transitionDelay: '0.74s' }}>
            {heroLinks.map((link) => (
              <li key={link.id}>
                <a
                  className="label"
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span>{link.label}</span>
                  <span className="arw" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
