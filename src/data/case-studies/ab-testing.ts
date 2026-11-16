import type { CaseStudySection } from '../../types/project';

/**
 * The Marketing A/B Testing Analysis case study body. It lives in its own module so Vite emits it as a
 * separate chunk: the homepage needs only the card metadata, and carrying seven
 * article bodies to paint a list is most of what the bundle was for. Loaded by
 * loadCaseStudySections in src/data/case-studies/index.ts.
 */
export const sections: CaseStudySection[] = [
  {
    num: '01',
    title: 'Business Problem and Decision',
    type: 'para',
    paras: [
      'A marketing team has to decide whether to continue or expand an ad campaign. Two raw percentages are not enough, so I asked three questions. Do users shown the ad convert at a higher rate than a Public Service Announcement (PSA) control group? By how much? How certain is that estimate? I also kept statistical evidence separate from financial value.',
      'Answer: the ad group converted 0.77 percentage points more than the PSA control (95% CI +0.60 to +0.94), so I recommend continuing with monitoring, conditional on confirming how users were assigned and measuring real cost and margin.',
    ],
  },
  {
    num: '02',
    title: 'Data',
    type: 'kv',
    items: [
      ['Source', 'Public Marketing A/B Testing dataset (Kaggle)'],
      ['Grain', 'One row per user'],
      ['Size', '588,101 users; six analytical fields: user ID, test group, converted, total ads, peak-exposure weekday, peak-exposure hour'],
      ['Ad group', '564,577 users; 14,423 conversions'],
      ['PSA control', '23,524 users; 420 conversions'],
      ['Split', 'Roughly 96% ad / 4% PSA'],
      ['Period', 'None. The data has no date column, so the analysis uses weekday and peak-exposure hour, not a calendar timeline.'],
    ],
  },
  {
    num: '03',
    title: 'Pipeline: SQL → Python → Tableau',
    type: 'kv',
    items: [
      ['SQL (MySQL)', 'A repeatable staged load: raw CSV to staging table to normalised analysis table, with the converted field mapped to 1/0 and row-count checkpoints. Three analysis queries: conversion rate by group; cumulative conversions by hour using window functions partitioned by group; conversion rate by weekday with explicit Monday-to-Sunday ordering.'],
      ['Python', 'pandas validation and cleaning, group conversion rates, a statsmodels two-proportion z-test with a Wald confidence interval, Matplotlib charts, and a labelled business scenario. The SQL group counts were cross-checked against pandas.'],
      ['Tableau', 'A packaged dashboard in two pages: KPI tiles with a group comparison, and exposure-segment views by weekday and hour.'],
    ],
  },
  {
    num: '04',
    title: 'Data Quality: Found and Fixed',
    type: 'list',
    divider: 'rule',
    items: [
      'Row-count checkpoints: the scripted MySQL load counts rows at staging and again after normalisation, and both checks report the full 588,101 users before any analysis ran.',
      'Validation: the saved output reports zero nulls, empty strings, duplicate rows and duplicate user IDs. Both groups, all 7 weekdays and all 24 hours are present.',
      'Exported index column dropped, going from 7 columns to 6.',
      'No dates: I did not invent a daily trend. Chart titles say day and hour mean peak ad exposure, not conversion time.',
      'Reporting units: very small p-values print as 0.000000, so I report them in scientific notation, and I keep percentage points separate from relative lift.',
    ],
  },
  {
    num: '05',
    title: 'Findings',
    type: 'list',
    divider: 'rule',
    items: [
      'Ad group converted at 2.5547% (14,423 of 564,577). PSA control converted at 1.7854% (420 of 23,524).',
      'Absolute lift is +0.77 percentage points. Relative to the PSA baseline that is +43.1%. These are different quantities and are labelled separately.',
      'Two-sided two-proportion z-test: z = 7.37, p = 1.7×10⁻¹³. The 95% Wald confidence interval for the difference is +0.595 to +0.943 pp.',
      'Exposure is close between the groups: 24.82 ads per user in the ad group against 24.76 in the PSA group, with medians of 13 and 12. A rank-based test still flags a statistically detectable difference, so the groups are not perfectly balanced.',
      'Exploratory segments by peak-exposure weekday: Saturday has the lowest ad conversion rate (about 2.13%); Tuesday has the largest ad-vs-PSA gap (about +1.60 pp); Thursday has the smallest (about +0.14 pp); the Thursday and Sunday intervals include zero. No multiple-comparison correction was applied across the 31 day-and-hour comparisons (7 weekdays and 24 hours), and hours 3 to 6 each have fewer than 100 PSA users. These are hypotheses to test, not targeting rules.',
      'By peak-exposure hour, the ad rate is ahead in 23 of the 24 hours; the exception, hour 3, rests on one PSA conversion among 89 users.',
    ],
  },
  {
    num: '06',
    title: 'Visual Evidence',
    type: 'figures',
    items: [
      {
        src: '/projects/ab-testing/ab-tableau-summary.webp',
        alt: 'Tableau dashboard page 1: KPI tiles showing control rate 1.79%, ad rate 2.55%, lift +0.77 pp and p-value below 0.001, above a bar chart of conversion rate for the ad and PSA groups, with a note on the statistical result and the unknown assignment method.',
        caption: 'Tableau dashboard, page 1. KPI tiles and group comparison; lift is shown in percentage points.',
        w: 1200,
        h: 800,
      },
      {
        src: '/projects/ab-testing/ab-comparison.webp',
        alt: 'Bar chart of conversion rate: PSA control 1.79% and ad group 2.55%.',
        caption: 'Conversion rate by group. Python (Matplotlib).',
        w: 1034,
        h: 734,
      },
      {
        src: '/projects/ab-testing/ab-tableau-trends.webp',
        alt: 'Tableau dashboard page with three panels: conversion rate by weekday of peak ad exposure for ad and PSA groups; cumulative conversions by hour of peak ad exposure as a stacked area; and conversion rate by hour of peak ad exposure.',
        caption: 'Tableau dashboard, page 2. Segments are by peak ad exposure, not conversion time. The cumulative panel is stacked, so the top edge is the combined ad + PSA total.',
        w: 1200,
        h: 800,
      },
      {
        src: '/projects/ab-testing/ab-weekday.webp',
        alt: 'Grouped bar chart of conversion rate by weekday of peak ad exposure, Monday to Sunday, for ad and PSA groups. The ad group is higher on every weekday; the gap is smallest on Thursday and largest on Tuesday.',
        caption: 'Conversion rate by weekday of peak ad exposure (not conversion day). Python (Matplotlib). Exploratory: no multiple-comparison correction, no uncertainty shown.',
        w: 1584,
        h: 784,
      },
    ],
  },
  {
    num: '07',
    title: 'Method and Validation',
    type: 'para',
    text: 'Null hypothesis: both groups have the same conversion proportion. The test is two-sided, using successes of 14,423 and 420 and sample sizes of 564,577 and 23,524. It assumes independent users, which the unique-user-ID check supports; it cannot confirm how users were assigned to groups. The confidence interval gives a range of plausible effect sizes. The p-value does not say whether the effect is large or profitable.',
  },
  {
    num: '08',
    title: 'Recommendation and Impact',
    type: 'para',
    lead: 'Continue or expand the campaign with monitoring, conditional on confirming how users were assigned and measuring real cost and margin.',
    text: 'Scenario, not a result: if the observed gap applied to the 564,577 ad-group users, that is about 4,343 additional conversions. At an assumed ₹500 order value, that is about ₹21.7 lakh (₹2,171,491) in gross value. Across the 95% confidence interval, the same scenario spans about ₹16.8 to ₹26.6 lakh. The data has no ad spend, margin or verified order values, so this is neither profit nor ROI.',
  },
  {
    num: '09',
    title: 'Limitations and Next Steps',
    type: 'list',
    items: [
      'The assignment mechanism is undocumented, so the lift is not proven causal.',
      'The roughly 96/4 split has no known intended ratio, so sample-ratio mismatch cannot be checked.',
      'There is no cost, margin or verified order value.',
      'There are no timestamps.',
      'Segment comparisons are exploratory.',
    ],
    after: 'Next steps: a pre-specified segment plan, an alternative interval method as a robustness check, and a financial model built on real cost data.',
  },
  {
    num: '10',
    title: 'What I Did',
    type: 'para',
    text: 'Solo project. I built the SQL load and queries, the Python validation and statistical test, and the Tableau dashboard, and I caught and fixed the partial import.',
  },
  {
    num: '11',
    title: 'Tools and Skills',
    type: 'tags',
    groups: [
      {
        label: 'Tools',
        items: ['SQL (MySQL)', 'Tableau', 'Python', 'pandas', 'statsmodels', 'Matplotlib', 'Jupyter', 'Git/GitHub'],
      },
      {
        label: 'Skills shown',
        items: ['A/B Testing', 'Hypothesis Testing', 'Confidence Intervals', 'SQL Window Functions', 'Data Validation', 'Data Cleaning', 'KPI Dashboards', 'Business Scenario Analysis'],
      },
    ],
  },
  { num: '12', title: 'Links', type: 'links' },
    ];
