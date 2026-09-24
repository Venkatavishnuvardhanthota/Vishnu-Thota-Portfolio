import type { Project } from '../types/project';

/**
 * The single production origin every canonical and social URL is written against.
 * Consumed by the runtime route sync in App.tsx and by the build-time page
 * generator in vite.config.ts, so the two can never disagree.
 */
export const SITE_ORIGIN = 'https://vishnu-thota.vercel.app';

/** The one social image, shared by every route until a dedicated card exists. */
export const SOCIAL_IMAGE_URL = `${SITE_ORIGIN}/hero-portrait.png`;

export interface PageMeta {
  /** Canonical URL, and og:url — deliberately the same string. */
  url: string;
  /** <title>, og:title and twitter:title. */
  title: string;
  /** meta description, og:description and twitter:description. */
  description: string;
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
  title: 'Thota Venkata Vishnu Vardhan — Data Analyst / Data Scientist',
  description:
    'Portfolio of Thota Venkata Vishnu Vardhan, data analyst and data scientist: seven data projects in machine learning, BI and NLP, two of them live.',
  ogType: 'website',
};

/**
 * Case-study head metadata, formatted only from fields already authored in
 * src/data/projects.ts — nothing here adds a claim the page does not make. The
 * "— Vishnu Vardhan" suffix is the one the case study has always used for
 * document.title, so the static <title> and the client-rendered one match.
 */
export function projectMeta(project: Project): PageMeta {
  return {
    url: `${SITE_ORIGIN}/projects/${project.id}`,
    title: `${project.title} — Vishnu Vardhan`,
    description: project.shortDescription,
    ogType: 'article',
  };
}
