import type { Project } from '../types/project';

/**
 * The single production origin every canonical and social URL is written against.
 * Consumed by the runtime route sync in App.tsx and by the build-time page
 * generator in vite.config.ts, so the two can never disagree.
 */
export const SITE_ORIGIN = 'https://vishnu-thota.vercel.app';

/** The one social image, shared by the homepage and every case-study route. */
export const SOCIAL_IMAGE_URL = `${SITE_ORIGIN}/og.png`;

export interface PageMeta {
  /** Canonical URL, and og:url — deliberately the same string. */
  url: string;
  /** <title> and document.title. */
  title: string;
  /** meta description. */
  description: string;
  /** og:title and twitter:title — the card headline, shorter than the tab title. */
  socialTitle: string;
  /** og:description and twitter:description — the card standfirst. */
  socialDescription: string;
  ogType: 'website' | 'article';
}

/**
 * Homepage metadata. index.html has to carry these exact values —
 * projectRoutePages() fails the build if it drifts — because this is also what the
 * runtime writes back when the SPA navigates home, and a homepage whose rendered
 * head disagrees with its own served HTML is the bug this whole file exists to
 * prevent.
 */
export const HOME_META: PageMeta = {
  url: `${SITE_ORIGIN}/`,
  title: 'Venkata Vishnu Vardhan Thota — Data Analyst | SQL, Python, Power BI',
  description:
    'Fresher Data Analyst skilled in SQL, Python, Power BI and Tableau. A/B testing, ' +
    'forecasting, churn and sentiment projects with 2 live apps. Available immediately ' +
    'for internships and full-time roles.',
  socialTitle: 'Venkata Vishnu Vardhan Thota — Data Analyst',
  socialDescription:
    '7 projects · 2 live apps · SQL, Python, Power BI, Tableau. ' +
    'Open to internships and full-time roles. Available immediately.',
  ogType: 'website',
};

/**
 * Case-study head metadata, formatted only from fields already authored in
 * src/data/projects.ts — nothing here adds a claim the page does not make. The
 * "— Vishnu Vardhan" suffix is the one the case study has always used for
 * document.title, so the static <title> and the client-rendered one match.
 */
export function projectMeta(project: Project): PageMeta {
  const meta = {
    url: `${SITE_ORIGIN}/projects/${project.id}`,
    title: `${project.title} — Vishnu Vardhan`,
    description: project.shortDescription,
    ogType: 'article',
  } as const;
  /* A case study's card says the same thing as its tab: the headline is the
     project title and the standfirst is its own short description. */
  return { ...meta, socialTitle: meta.title, socialDescription: meta.description };
}
