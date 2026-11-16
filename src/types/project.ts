export interface Metric {
  /** Primary value, e.g. "17.13%" */
  v: string;
  /** Label, e.g. "Store-day MAPE" */
  l: string;
  /** Optional supporting note */
  n?: string;
  /** Keep the value on one line, shrinking it against the tile's own width
      rather than wrapping. Only for a value that must read as one comparison.
      `true` uses the shared 15cqw cap; a number overrides it, because the
      widest a string can be relative to its own em decides the largest cap
      that still fits — "12.49% → 20.15%" tops out at 13.30cqw and would
      overflow the tile outright at 15. */
  fit?: boolean | number;
}

/** No case study carries a generated visual. The alias stays `never` rather than
    being deleted so `Project.visual`, `SectionBase.visual` and `buildVisual` keep
    their signatures; an empty union is not valid syntax. */
export type VisualKey = never;

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
  /** One block of body copy. A section that runs to several sets `paras`
      instead, and then this and `lead` are not used. */
  text?: string;
  /** Optional sentence set in the serif italic accent, above the body copy. */
  lead?: string;
  /** Body paragraphs in reading order, in ordinary body voice. */
  paras?: string[];
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
  /** Optional paragraph that closes the rows, in ordinary body voice. */
  after?: string;
  /** Optional paragraphs that close the rows, set at the same measure as the
      other sections' body copy rather than in the value column. */
  notes?: string[];
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
  /** One-line question headline shown above the case-study title. */
  question: string;
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

/** Everything the homepage cards, the route head and the case-study header need.
    The body itself is a separate chunk: a list of seven cards has no use for
    seven articles, so /projects/:id fetches `sections` on demand. */
export type ProjectMeta = Omit<Project, 'sections'>;
