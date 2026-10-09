export interface Metric {
  /** Primary value, e.g. "17.13%" */
  v: string;
  /** Label, e.g. "Store-day MAPE" */
  l: string;
  /** Optional supporting note */
  n?: string;
}

export type VisualKey =
  | 'forecast'
  | 'churn'
  | 'sentiment'
  | 'retail'
  | 'banking'
  | 'house';

/** A real exported image that sits in `public/projects/<id>/`. */
export interface Figure {
  src: string;
  alt: string;
  caption: string;
  /** Intrinsic size, so the image reserves its own box. Optional because a
      figure can be authored before its export exists. */
  w?: number;
  h?: number;
}

interface SectionBase {
  num: string;
  title: string;
  /** Optional deterministic visual attached to this section */
  visual?: VisualKey;
}

export interface ParaSection extends SectionBase {
  type: 'para';
  text: string;
  /** Optional sentence set in the serif italic accent, above the body copy. */
  lead?: string;
}
export interface ListSection extends SectionBase {
  type: 'list';
  items: string[];
  /** `rule` separates items with hairlines instead of leading dashes. */
  divider?: 'dash' | 'rule';
  /** Optional paragraph that closes the list. */
  after?: string;
}
export interface KvSection extends SectionBase {
  type: 'kv';
  items: ReadonlyArray<readonly [string, string]>;
}
export interface MetricsSection extends SectionBase {
  type: 'metrics';
  items: Metric[];
}
export interface TagsSection extends SectionBase {
  type: 'tags';
  /** Optional labelled groups; without them the project's own technology
      list is rendered, which is what every case study did before. */
  groups?: ReadonlyArray<{ label: string; items: string[] }>;
}
export interface LinksSection extends SectionBase {
  type: 'links';
}
export interface FiguresSection extends SectionBase {
  type: 'figures';
  items: Figure[];
}

export type CaseStudySection =
  | ParaSection
  | ListSection
  | KvSection
  | MetricsSection
  | TagsSection
  | LinksSection
  | FiguresSection;

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  /** The case study's own serif standfirst. Separate from `shortDescription`
      because that field is also the homepage row copy and the route's meta
      description, and a case-study rewrite must not reach either. */
  standfirst?: string;
  /** Small-caps tool line under the standfirst, in display order. */
  stack?: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string | null;
  previewMetric: Metric;
  metrics: Metric[];
  visual?: VisualKey;
  sections: CaseStudySection[];
}
