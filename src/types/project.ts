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
  | 'ab'
  | 'churn'
  | 'sentiment'
  | 'retail'
  | 'banking'
  | 'house';

interface SectionBase {
  num: string;
  title: string;
  /** Optional deterministic visual attached to this section */
  visual?: VisualKey;
}

export interface ParaSection extends SectionBase {
  type: 'para';
  text: string;
}
export interface ListSection extends SectionBase {
  type: 'list';
  items: string[];
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
}
export interface LinksSection extends SectionBase {
  type: 'links';
}

export type CaseStudySection =
  | ParaSection
  | ListSection
  | KvSection
  | MetricsSection
  | TagsSection
  | LinksSection;

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string | null;
  previewMetric: Metric;
  metrics: Metric[];
  visual: VisualKey;
  sections: CaseStudySection[];
}
