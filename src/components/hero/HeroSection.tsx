import { useEffect, useState } from 'react';
import '../../styles/hero.css';

const PORTRAIT_SRC = '/hero-portrait.png';
const PORTRAIT_ALT = 'Black-and-white studio portrait of Thota Venkata Vishnu Vardhan';

/**
 * The opening spread. Copy is fixed and verified, so it lives here rather than
 * in src/data — there is nothing to map over.
 *
 * Source order is the mobile reading order (role, name, statement, portrait,
 * description, foot rail); the layout re-places those same nodes into a
 * two-column grid from 561px up, so no second markup tree is needed.
 *
 * The portrait is sized from the space the Hero actually has — see hero.css —
 * which keeps it uncropped at every viewport and every browser-zoom level.
 * Nothing here moves it on scroll: any transform on that box risks pushing it
 * out of the spread.
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
        <div className="hero__grid">
          <p className="hero__role hero__rise" style={{ transitionDelay: '0.05s' }}>
            <span className="hero__tick" aria-hidden="true" />
            <span className="label label--ink">Data Analyst / Data Scientist</span>
          </p>

          <h1 className="hero__name" id="hero-name">
            <span className="mask">
              <span style={{ transitionDelay: '0.12s' }}>Thota Venkata Vishnu Vardhan</span>
            </span>
          </h1>

          <div className="hero__statement">
            <p className="hero__verse">
              <span className="mask">
                <span style={{ transitionDelay: '0.26s' }}>Turning raw data</span>
              </span>
              <span className="mask">
                <span style={{ transitionDelay: '0.34s' }}>
                  into <em className="hero__accent">decisions.</em>
                </span>
              </span>
            </p>
            <span className="hero__break" aria-hidden="true" />
            <p className="hero__verse">
              <span className="mask">
                <span style={{ transitionDelay: '0.46s' }}>Building systems</span>
              </span>
              <span className="mask">
                <span style={{ transitionDelay: '0.54s' }}>around it.</span>
              </span>
            </p>
          </div>

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

          <p className="hero__lede hero__rise" style={{ transitionDelay: '0.66s' }}>
            Data analyst and scientist building end-to-end solutions — from exploratory analysis
            and machine learning to deployed applications and interactive dashboards.
          </p>
        </div>

        <div className="hero__rail hero__rise" style={{ transitionDelay: '0.8s' }}>
          <a className="hero__cue" href="#work" aria-label="Explore work — jump to selected projects">
            <span className="label">Explore work</span>
            <span className="arw" aria-hidden="true">↓</span>
          </a>
          <span className="label hero__tag">Analytics · ML · Software</span>
        </div>
      </div>
    </section>
  );
}
