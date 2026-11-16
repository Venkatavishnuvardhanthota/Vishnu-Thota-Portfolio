import type { CaseStudySection } from '../../types/project';

/**
 * The seven article bodies, each an `import()` of its own module.
 *
 * Vite emits one chunk per entry, so a reader who never opens a case study never
 * downloads one, and a reader who opens one downloads only that one. The promise
 * is cached rather than the settled array so two requests for the same page
 * (a prefetch racing a navigation) share one fetch.
 */
const LOADERS: Record<string, () => Promise<{ sections: CaseStudySection[] }>> = {
  'ab-testing': () => import('./ab-testing'),
  rossmann: () => import('./rossmann'),
  'banking-churn': () => import('./banking-churn'),
  'retail-sales': () => import('./retail-sales'),
  'customer-churn': () => import('./customer-churn'),
  'product-sentiment': () => import('./product-sentiment'),
  'house-price': () => import('./house-price'),
};

const pending = new Map<string, Promise<CaseStudySection[]>>();
const resolved = new Map<string, CaseStudySection[]>();

export function loadCaseStudySections(id: string): Promise<CaseStudySection[]> | undefined {
  const loader = LOADERS[id];
  if (!loader) return undefined;
  let promise = pending.get(id);
  if (!promise) {
    promise = loader()
      .then((m) => {
        resolved.set(id, m.sections);
        return m.sections;
      })
      .catch((e) => {
        /* Do not cache a failure: the next navigation asks again. */
        pending.delete(id);
        throw e;
      });
    pending.set(id, promise);
  }
  return promise;
}

/** The body if it is already in memory, so a prefetched or revisited page paints whole. */
export function peekCaseStudySections(id: string): CaseStudySection[] | undefined {
  return resolved.get(id);
}

/** Warm one chunk without caring about the result, for hover and focus intent. */
export function prefetchCaseStudy(id: string) {
  const promise = loadCaseStudySections(id);
  /* A failed prefetch is not an error the reader should see: the navigation that
     follows requests the module again and surfaces its own failure. */
  promise?.catch(() => {});
}
