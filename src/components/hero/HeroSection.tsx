import { useState } from 'react';
import type { CSSProperties } from 'react';
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
const ROLE = 'Seeking: Data Analyst internship or entry-level role';
/* Six tools, but the line is authored as two groups of glued sub-parts, because
   the tools line has to answer to three different column widths and CSS only
   gets to choose a break point it can also police:

     wide   one row, every separator drawn between two tools;
     middle two rows, one per group — "SQL · Excel · Power BI · Tableau" over
            "Python · Machine learning", the flattest pairing available;
     narrow one sub-part per row, so a 192px column never has to hold a run
            wider than 'SQL · Excel'.

   A group is `display:grid` over its sub-parts at the bottom tier and inline
   above it, which is why the break model has two levels: a single flat list of
   six parts cannot make two balanced rows out of a 264px column, because a
   two-column grid asks for the SUM of its columns' contents (327px here), not
   for the width of its widest row. The separators are drawn by CSS on the group
   and on the sub-part they precede, and each tier drops the ones that would end
   up heading a line — which is the defect the brief names, and the reason no
   separator is typed into the text. */
const TOOL_GROUPS = [
  ['SQL\u00A0·\u00A0Excel', 'Power\u00A0BI', 'Tableau'],
  ['Python', 'Machine\u00A0learning'],
];
const VALUE_LINE =
  "I check the data before I trust it, then say what the answer can and can't support. " +
  'Seven projects, from a 588,101-user ad test to a 1,115-store sales forecast.';
/* Runs that must never be split by a line break. Both are one measurement with
   its unit — "588,101-user" broken after the comma reads as a number with an
   orphan suffix — and the only reason they appear here at all is that a break
   opportunity is a property of the box, not of the text.
   The strings are still authored whole above; splitting them at these tokens is
   what keeps the wording byte-identical while CSS decides where the line may
   fall, and every token sits between text runs, so the server markup and the
   client render agree and hydration adopts the prerendered nodes.

   'Data Analyst' used to sit in this list. It should not have: a glue is a
   veto over `text-wrap: balance`, and on the role line it removed the only
   break that made the three-line case even, forcing "Seeking: Data Analyst" /
   "internship or" / "entry-level role" (300 / 176.3 / 210.8px) when the even
   set is "Seeking: Data" / "Analyst internship" / "or entry-level role"
   (188.4 / 249.8 / 249). Measured, the veto only ever bit in the three-line
   configurations — at every two-line width the released glue wraps identically,
   because pulling "Analyst" onto line 1 needs a third line. So it is not a
   measurement and not a unit: it is a job title, and a title is not a number. */
const GLUED = ['588,101-user', '1,115-store'];
const glue = (line: string) =>
  line
    .split(new RegExp(`(${GLUED.join('|')})`))
    .filter((part): part is string => Boolean(part))
    .map((part, i) =>
      GLUED.includes(part) ? <span className="hero__glue" key={i}>{part}</span> : part,
    );
const STATUS = 'Available immediately';
/* Owner-supplied, and the only Hero line that is not read off a data file. The
   tail is one non-breaking run: "Andhra Pradesh, India" is the place, and it is
   the thing that must not be what sits alone on a second line. */
const LOCATION = 'Proddatur, Kadapa, Andhra\u00A0Pradesh,\u00A0India';

/** The proof line is assembled from the records the sections below render:
 *  PROJECTS is the list the case studies come from and APPLICATIONS the entries
 *  that answer as live Streamlit apps. The third claim is the credential count,
 *  read off the Certifications section's two issuers (IBM and Google). */
const liveApps = APPLICATIONS.filter((app) => app.status === 'Live').length;

const PROOF_ITEMS = [
  `${PROJECTS.length}\u00A0projects`,
  `${liveApps}\u00A0live\u00A0apps`,
  'IBM\u00A0&\u00A0Google\u00A0certified',
];

/* The degree and its end year are read from the Education record; "AI &" is the
   Hero's own short form of the field that section spells out in full. The stage
   is worded as where the reader is now rather than as a graduating class, and it
   is the second group of the line: "(2027)" alone under the degree is a
   footnote, so the year travels with "Final year" and that pair travels on its
   own row when the column cannot hold both groups. */
const BTECH = EDUCATION.find((entry) => entry.id === 'btech');
const EDU_GROUPS = BTECH
  ? [
      `${BTECH.degree}\u00A0${BTECH.field
        .replace('Artificial Intelligence', 'AI')
        .replace(/\s/g, '\u00A0')}`,
      `Final\u00A0year\u00A0(${BTECH.endYear})`,
    ]
  : [];

const PROFILE_IDS = ['github', 'linkedin'];
const profiles = PROFILE_IDS.map((id) => CONTACT_LINKS.find((l) => l.id === id)).filter(
  (l): l is ContactLink => Boolean(l)
);
const email = CONTACT_LINKS.find((l) => l.id === 'email');
/* The address is printed with one break opportunity, placed before the @, so it
   can fold onto two lines in a narrow column without ever splitting a token. */
const [emailLocal, emailDomain] = (email?.value ?? '').split('@');

/** One line of dot-joined groups, used by the two Hero lines that carry a
 *  separator in a single flat run — the proof line and the degree line. The dot
 *  is drawn by CSS on every group but the first so a line that has to stack can
 *  drop it: a typed " · " sits at whichever side of the break the wrapping
 *  algorithm chooses, and a middot leading or trailing a row is what none of
 *  these lines should show. The space between groups is real markup, not part
 *  of the drawing, because a stacked line has no separator at all — and "Data
 *  Science" followed by "Final year" with nothing between them reads to a
 *  screen reader as one word. The tools line uses the same mechanism twice
 *  nested; see ToolsLine. */
function DotLine({ className, parts }: { className: string; parts: string[] }) {
  return (
    <p className={className}>
      {parts.map((part, i) => (
        <span key={part} className={i ? 'hero__part hero__part--sep' : 'hero__part'}>
          {i < parts.length - 1 ? `${part} ` : part}
        </span>
      ))}
    </p>
  );
}

/** The tools line is DotLine's model one level deeper: two groups, each of
 *  which can itself be split into sub-parts at the narrow end. The space
 *  between two groups is markup outside both of them, so a group's own row
 *  costs exactly what its tools cost — a trailing space carried inside the
 *  group would push "SQL · Excel · Power BI · Tableau" past the 264px column
 *  the reader's window leaves at 150% browser zoom. */
function ToolsLine() {
  return (
    <p className="hero__tools">
      {TOOL_GROUPS.flatMap((group, i) => [
        i ? ' ' : null,
        <span
          key={group.join('|')}
          className={i ? 'hero__part hero__part--sep hero__group' : 'hero__part hero__group'}
        >
          {group.map((part, j) => (
            <span key={part} className={j ? 'hero__sub hero__sub--sep' : 'hero__sub'}>
              {j < group.length - 1 ? `${part} ` : part}
            </span>
          ))}
        </span>,
      ])}
    </p>
  );
}

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
 * The entrance is a CSS animation rather than a class applied after hydration:
 * the hero is present in the initial HTML, so waiting for JavaScript (or for the
 * web fonts) to reveal it would postpone the LCP line. The animation starts with
 * the stylesheet, keeps start states in opacity/transform only, and ends at the
 * composed layout, so it cannot move anything.
 */
export default function HeroSection() {
  const [portraitMissing, setPortraitMissing] = useState(false);

  return (
    <section className="hero" aria-labelledby="hero-name">
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
                  <span style={{ '--hero-delay': `${0.1 + i * 0.08}s` } as CSSProperties}>{word}</span>
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

        <div className="hero__identity hero__rise" style={{ '--hero-delay': '0.42s' } as CSSProperties}>
          <p className="hero__role">{glue(ROLE)}</p>
          <ToolsLine />
          <p className="hero__value">{glue(VALUE_LINE)}</p>
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

        {/* The slot exists for one reason: the proof block is sized by its own
            longest line and sits flush right, and a box sized by its contents
            cannot also be the container those lines ask for their width. So the
            slot takes the track and contains, and the block inside keeps the
            width and the anchor it has always had. */}
        <div className="hero__proof-slot">
          <div className="hero__proof hero__rise" style={{ '--hero-delay': '0.5s' } as CSSProperties}>
            <DotLine className="hero__proof-line" parts={PROOF_ITEMS} />
            {EDU_GROUPS.length > 0 && <DotLine className="hero__meta hero__edu" parts={EDU_GROUPS} />}
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
                  <a className="hero__email" href={email.href}>
                    <BrandIcon paths={EMAIL_PATHS} />
                    <span>
                      {/* One expression for the local part and the @, and the
                          break opportunity after them: the address may only ever
                          fold after the @, which is the one place a split leaves
                          both halves readable. React builds two adjacent string
                          children as two text nodes while the server render
                          concatenates them into one, and that difference alone
                          makes hydration bail out to a full client render — so
                          the @ travels with the local part, not with the domain. */}
                      {emailLocal + '@'}
                      <wbr />
                      {emailDomain}
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
