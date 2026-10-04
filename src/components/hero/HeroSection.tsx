import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/hero.css';
import { CONTACT_LINKS, RESUME_URL, type ContactLink } from '../../data/contact';
import { APPLICATIONS } from '../../data/applications';
import { PROJECTS } from '../../data/projects';
import { EDUCATION } from '../../data/education';

/* The one portrait path. Swapping the asset — a .webp cut-out of the same
   framing, or a retake — is a path change in four places that all describe the
   same file: this constant, the `preload`, the `og:image`/`twitter:image`
   content in index.html, and SOCIAL_IMAGE_URL in src/data/site.ts (the build
   fails if the last two drift apart). Nothing else reads the picture: the image
   box, the grid's centre track and the fallback plate are all derived from the
   figures below, so a replacement lands without touching the composition. */
const PORTRAIT_SRC = '/hero-portrait.webp';
const PORTRAIT_W = 1225;
const PORTRAIT_H = 1284;
const PORTRAIT_ALT = 'Black-and-white studio portrait of Venkata Vishnu Vardhan Thota';
/* React 18 has no fetchPriority prop, so the attribute goes to the DOM in its
   lowercase form — it has to survive to the element for the head preload to be
   matched rather than duplicated. */
const PORTRAIT_FETCH = { fetchpriority: 'high' } as Record<string, string>;

/* The masthead: one horizontal line, four words, the whole name. The last word
   is the surname and is drawn in the secondary ink — the reference's one colour
   break, and the reason the line is four spans rather than one string of text. */
const NAME_WORDS = ['Venkata', 'Vishnu', 'Vardhan', 'Thota'];
/* Only the standing-in plate for a portrait that never arrives. It is rendered
   when, and only when, the file fails — the name is spelled out by the masthead
   above it, so nothing here repeats it in the normal state. */
const NAME_PLATE = 'Venkata Vishnu Vardhan Thota';
const ROLE = 'Data Analyst';
const TOOLS = 'SQL · Excel · Power BI · Tableau · Python';
const VALUE_LINE =
  'I turn raw data into decisions with SQL, Excel and dashboards — ' +
  'A/B tests, sales forecasting and churn analysis.';
const STATUS = 'Available immediately · Internship or full-time';
/* The one proof point the Hero links to. Its three figures are the A/B case
   study's own numbers restated as a sentence — 588,101 records, +0.77 pp
   absolute lift, p = 1.71e-13 — all three held in src/data/projects.ts rather
   than derived here, because the sentence is copy and not a table. Change the
   data and this string has to be checked against it by hand.
   It is set as two fixed lines rather than one running string: as a single
   string the column broke it wherever it happened to fall, which put the middle
   dot at the head of a line. `line1`/`line2` are the two break points, and
   nothing else may break. */
const FEATURE = {
  label: 'Featured result',
  line1: 'A/B test on 588,101 users',
  line2: '+0.77 pp conversion lift · p < 0.001',
  to: '/projects/ab-testing',
};
/* Owner-supplied, and the only Hero line that is not read off a data file. The
   About card and the Contact section still print the previous town — both live
   outside this section, so they are reported rather than edited here. */
const LOCATION = 'Proddatur, Andhra Pradesh, India';

/** The proof line is assembled from the records the sections below render:
 *  PROJECTS is the list the case studies come from, APPLICATIONS the entries
 *  that answer as live Streamlit apps, and the record count is the sum of the
 *  two dataset sizes their own metric tables state — 588,101 A/B records and
 *  568,454 Amazon food reviews. A figure that stops matching the data drops out
 *  of the line instead of outliving its source. */
const RECORD_SOURCES = ['588,101', '568,454'];
const recordValues = PROJECTS.flatMap((project) => project.metrics.map((m) => m.v)).filter((v) =>
  RECORD_SOURCES.includes(v)
);
const recordsAnalyzed =
  recordValues.length === RECORD_SOURCES.length
    ? recordValues.reduce((sum, v) => sum + Number(v.replace(/,/g, '')), 0)
    : 0;
const liveApps = APPLICATIONS.filter((app) => app.status === 'Live').length;

const PROOF = [
  `${PROJECTS.length} projects`,
  `${liveApps} live apps`,
  recordsAnalyzed >= 1_000_000 ? '1M+ records' : null,
]
  .filter(Boolean)
  .join(' · ');

/* The degree and its end year are read from the Education record; "AI &" is the
   Hero's own short form of the field that section spells out in full. The stage
   is worded as where the reader is now rather than as a graduating class. */
const BTECH = EDUCATION.find((entry) => entry.id === 'btech');
const EDUCATION_LINE = BTECH
  ? `${BTECH.degree} ${BTECH.field.replace('Artificial Intelligence', 'AI')} · Final year (${BTECH.endYear})`
  : '';

const PROFILE_IDS = ['github', 'linkedin'];
const profiles = PROFILE_IDS.map((id) => CONTACT_LINKS.find((l) => l.id === id)).filter(
  (l): l is ContactLink => Boolean(l)
);
const email = CONTACT_LINKS.find((l) => l.id === 'email');

/** Stroke marks at the header controls' own 1.5/24 weight, so the links row
 *  reads on the same line as the theme toggle rather than as filled brand art. */
function BrandIcon({ paths }: { paths: string[] }) {
  return (
    <svg
      className="hero__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

const GITHUB_PATHS = [
  'M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5',
];
const LINKEDIN_PATHS = [
  'M8 11v5',
  'M8 8v.01',
  'M12 16v-5',
  'M16 16v-3a2 2 0 1 0 -4 0',
  'M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10',
];
const EMAIL_PATHS = [
  'M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -10',
  'M3 7l9 6l9 -6',
];

/**
 * Hero — one editorial masthead on the page background.
 *
 * The body grid is `1fr | --fig-w | 1fr` across the whole viewport over two
 * rows: the heading takes the whole first row and the portrait, centred in the
 * middle track, starts the second. So the name sits above the figure in the
 * flow, and the row gap is the only thing between the last line of type and the
 * top of the portrait — no overlap to clip and no stacking order to police. The
 * two copy blocks take that second row's outer tracks and are anchored to their
 * own edges of the window, leaving the figure a centred band of its own.
 *
 * Source order is the mobile reading order — name, portrait, identity with the
 * featured result, the status pill and the actions under the value line, then
 * proof — so small screens change only the tracks, never the tree. The heading
 * is the complete name on one line: VENKATA VISHNU VARDHAN THOTA, the surname in
 * the secondary ink.
 *
 * The portrait stays uncropped: width is the chosen term, height follows the
 * source ratio the component states, and the element reserves that box before
 * the file decodes so nothing shifts.
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
      {/* Two rows: the heading takes the whole first one and the figure starts
          the second, so the name is above the portrait in the flow rather than
          beside it, and the two copy blocks stand at the far edges of the
          viewport, one either side of the figure's lower body. */}
      <div className="hero__body">
        <h1 className="hero__name" id="hero-name">
          <span className="hero__words">
            {NAME_WORDS.map((word, i) => (
              <span
                key={word}
                className={`hero__word${
                  i === NAME_WORDS.length - 1 ? ' hero__word--surname' : ''
                }`}
              >
                <span className="mask">
                  <span style={{ transitionDelay: `${0.1 + i * 0.08}s` }}>{word}</span>
                </span>
              </span>
            ))}
          </span>
        </h1>

        <figure
          className={`portrait hero__figure${portraitMissing ? ' portrait--missing' : ''}`}
        >
          <img
            className="portrait__img"
            src={PORTRAIT_SRC}
            alt={PORTRAIT_ALT}
            width={PORTRAIT_W}
            height={PORTRAIT_H}
            style={{ aspectRatio: `${PORTRAIT_W} / ${PORTRAIT_H}` }}
            decoding="async"
            loading="eager"
            {...PORTRAIT_FETCH}
            onError={() => setPortraitMissing(true)}
          />
          {/* Only the substitute for a portrait that never decodes. With the
              file present there is no spelled-out name anywhere in the figure. */}
          {portraitMissing && (
            <div className="portrait__fallback" aria-hidden="true">
              <span>{NAME_PLATE}</span>
            </div>
          )}
        </figure>

        <div className="hero__identity hero__rise" style={{ transitionDelay: '0.42s' }}>
          <p className="hero__role">{ROLE}</p>
          <p className="hero__tools">{TOOLS}</p>
          <p className="hero__value">{VALUE_LINE}</p>
          {/* One linked proof point, in flow between the value line and the pill:
              it answers the paragraph above it and is not a second call to action,
              so it carries the body's ink and the site's own underlined-link rule
              rather than a button's surface. */}
          <div className="hero__feature">
            <p className="hero__feature-label">{FEATURE.label}</p>
            {/* Two fixed lines, and the accessible name is those two lines joined
                with a comma so it still reads as one sentence. The separator in
                the second is glued to the word before it with a no-break space:
                where the column is too narrow to hold the line at all (see the
                escape in hero.css) that makes it wrap AFTER the dot, so a stray
                "·" can never head a line even there. */}
            <Link
              className="hero__feature-link"
              to={FEATURE.to}
              aria-label={`${FEATURE.line1}, ${FEATURE.line2}`}
            >
              <span className="hero__feature-line">{FEATURE.line1}</span>
              <span className="hero__feature-line">
                {FEATURE.line2.replace(' · ', '\u00A0· ')}
                <span className="arw" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </div>
          {/* The availability reads as the end of the argument, not as a banner
              over the page, and the actions follow it down the same column —
              in flow, so they stay with the content at every width. */}
          <p className="hero__status">
            <span className="hero__dot" aria-hidden="true" />
            <span>{STATUS}</span>
          </p>
          <div className="hero__cta">
            <a className="hero__btn hero__btn--primary" href="#projects">
              View Projects <span className="arw" aria-hidden="true">↓</span>
            </a>
            <a className="hero__btn hero__btn--secondary" href={RESUME_URL} download>
              Download Résumé
            </a>
          </div>
        </div>

        <div className="hero__proof hero__rise" style={{ transitionDelay: '0.5s' }}>
          <p className="hero__proof-line">{PROOF}</p>
          {EDUCATION_LINE && <p className="hero__meta">{EDUCATION_LINE}</p>}
          <p className="hero__meta">{LOCATION}</p>

          <ul className="hero__links">
            {profiles.map((profile) => (
              <li key={profile.id}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BrandIcon paths={profile.id === 'github' ? GITHUB_PATHS : LINKEDIN_PATHS} />
                  <span>{profile.label}</span>
                  <span className="arw" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
            {email && (
              <li>
                {/* The address itself, not the word "Email": a recruiter reading
                    this should be able to select and copy it. */}
                <a href={email.href}>
                  <BrandIcon paths={EMAIL_PATHS} />
                  <span>{email.value}</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
