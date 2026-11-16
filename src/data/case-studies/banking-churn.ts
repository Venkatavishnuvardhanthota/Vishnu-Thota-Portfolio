import type { CaseStudySection } from '../../types/project';

/**
 * The Banking Churn Analysis case study body. It lives in its own module so Vite emits it as a
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
      'A credit card issuer loses interchange and interest income when customers leave, and churn often shows up as disengagement before an account closes. I analysed 10,127 customers to answer three questions for a retention team: which segments churn, which behaviours separate churned from retained customers, and where retention effort should focus. I kept the work diagnostic and transparent, with no predictive model, so every rule can be audited in SQL, Python and Power BI.',
      'Answer: churn concentrates among customers whose transactions are low, who use little of their credit limit, and who reach three or more contacts in the last 12 months (attrition rises from 12.49% at two contacts to 20.15% at three), so retention effort should start there; these are associations to test, not proven causes.',
    ],
  },
  {
    num: '02',
    title: 'Data',
    type: 'kv',
    items: [
      ['Source', 'Credit Card Customers dataset (Kaggle)'],
      ['Grain', 'One row per customer'],
      ['Size', '10,127 customers; 23 raw columns, 20 after cleaning'],
      ['Target', '1,627 attrited customers (16.07%) and 8,500 existing customers'],
      ['Fields', 'Demographics (age, gender, dependents, education, marital status, income band), card tier, relationship length and product count, and 12-month behaviour (transactions, inactive months, contacts in the last 12 months, utilisation, revolving balance, credit limit, quarter-over-quarter change)'],
      ['Limit', 'A single snapshot: 12-month aggregates, with no dates and no account-closure timestamps'],
    ],
  },
  {
    num: '03',
    title: 'Pipeline: SQL → Python → Power BI',
    type: 'kv',
    items: [
      ['SQL (MySQL)', 'Seven query scripts: overall attrition rate (with a window function), attrition by card tier, behaviour of churned versus retained customers, the top 50 churned accounts by credit limit (a CTE with ROW_NUMBER), attrition by income band, spend-velocity change, and attrition by number of contacts in the last 12 months.'],
      ['Python', 'A 14-cell notebook (12 code cells and 2 markdown cells) using pandas, matplotlib and seaborn for cleaning, data-quality checks, seven charts and a 15×15 correlation matrix.'],
      ['Power BI', 'A three-page report (Executive Overview, Behavioural Signals, At-Risk Profiles) whose visuals are driven by 13 DAX measures over three tables: the cleaned customer table and two SQL result tables.'],
      ['Cross-check', 'Six quantities, each traced below to the file, notebook cell or visual that computes it. Recomputed means the tool derives the figure from the data it holds; checked against the SQL export means it reads the exported result.'],
    ],
    notes: [
      'Customer counts: MySQL counts them in sql/01_attrition_rate.sql, which groups the raw import by attrition flag; pandas prints them in notebook cells 2 and 3, before and after the leakage columns are dropped; Power BI recomputes them in the "Total Customers" card on Executive Overview, a DAX measure over the cleaned table.',
      'Attrition rate: MySQL computes it in sql/01_attrition_rate.sql, a window function over the raw import; pandas computes it in notebook cell 6, which prints the share of attrited customers; Power BI recomputes it in the attrition-rate card and the attrition-by-card-tier bar chart on Executive Overview, both DAX measures over the cleaned table.',
      'Card-tier rates: MySQL computes them in sql/02_attrition_by_card.sql, a CTE over the raw import; pandas computes them in notebook cell 7, which groups the cleaned table by card tier; Power BI recomputes them in the attrition-by-card-tier bar chart on Executive Overview, the "Attrition Rate" measure over the cleaned table.',
      'Behaviour averages: MySQL computes them in sql/03_behavioral_comparison.sql and sql/06_spend_decline.sql; pandas computes them in notebook cells 8, 9, 10 and 12, the boxplots, the spend-versus-frequency scatter and the utilisation means; Power BI recomputes them in the three Behavioural Signals average charts and the spend-decline chart on At-Risk Profiles, DAX measures over the cleaned table, while the scatter reads the raw columns.',
      'Contact-bucket rates: MySQL computes them in sql/07_contacts_vs_attrition.sql, with 5 and 6 contacts merged into a "5+" bucket; pandas does not compute them; Power BI does not recompute them either, because the bucket chart on At-Risk Profiles reads the query7 SQL export, so those figures were checked against the SQL export instead.',
      'Churned credit exposure: MySQL does not compute it and pandas does not compute it; Power BI recomputes it in the "Credit Exposure" card on Executive Overview, a DAX measure over the cleaned table.',
    ],
  },
  {
    num: '04',
    title: 'Data Quality: Found and Fixed',
    type: 'list',
    divider: 'rule',
    items: [
      'Target leakage: the raw file includes two columns of probabilities from a Naive Bayes model already fitted on the churn label. I excluded them. Their 130-character names also broke the MySQL import, whose column-name limit is 64 characters.',
      'Hidden missing values: there are no nulls, but "Unknown" strings stand in for missing education (15.00%), income (10.98%) and marital status (7.40%), and 3,046 customers (30.08%) have at least one. I kept "Unknown" as its own category instead of dropping almost a third of the data or imputing labels. Churn in those groups (16.82% to 17.22%) is close to the portfolio rate of 16.07%.',
      'Credit-limit ceiling: 508 customers (5.02%) share exactly $34,516.00 and 507 share $1,438.30, and both groups average 36.0 months as customers, which is consistent with capping in the source data. It surfaced when RANK() returned 89 tied rows instead of 50 for the top churned accounts. ROW_NUMBER() with a tie-break on transaction amount fixed the ranking.',
      'Small cell: all 54 customers with 6 contacts in the last 12 months churned, which would distort a chart. I merged 5 and 6 contacts into a "5+" bucket (113 of 230, 49.13%) and kept the 54-customer finding in the notes.',
    ],
  },
  {
    num: '05',
    title: 'Findings',
    type: 'list',
    items: [
      '1,627 of 10,127 customers churned (16.07%). Their accounts held $13.24M in credit limits (mean $8,136). That is credit exposure, not lost revenue.',
      'Transaction count is the strongest signal: churned customers averaged 44.93 transactions against 68.67 for retained customers (median 43 vs 71; correlation -0.37). The most transactions any churned customer made was 94, against 139 for retained customers.',
      'Contacts in the last 12 months show a cliff: attrition is 1.75% at 0 contacts, 7.20% at 1, 12.49% at 2, 20.15% at 3, 22.63% at 4 and 49.13% at 5 or more (230 customers).',
      'Low utilisation: churned customers averaged 16.25% credit utilisation against 29.64% for retained customers. Among the 50 churned accounts the top-50 query returns — ranked by credit limit, with the ties broken by transaction amount — 20 had no revolving balance and the group averaged 2.15% utilisation. Ranking by credit limit alone, with those ties unresolved, returns 24 instead, so the ordering is what fixes the count.',
      'Spending contracted more for churners: the Q4-to-Q1 transaction-count ratio averaged 0.554 against 0.742, and the spend ratio 0.694 against 0.773. Both groups are below 1.0, so the signal is the size of the drop, not the direction.',
      'Blue cards hold 93.36% of churned customers (1,519 of 1,627). Platinum has the highest rate (25.00%) but on only 20 customers, and Gold is 18.10% on 116, so those are small-sample results, not findings to act on.',
      'Income shows no clear gradient: among known income bands, attrition runs from 13.48% to 17.33%, with the top band (17.33%) and the under-$40K band (17.19%) highest. Age, dependents and time as a customer each correlate with churn at about 0.02 or less.',
    ],
  },
  {
    num: '06',
    title: 'Recommendations',
    type: 'list',
    items: [
      'Route accounts to a retention specialist once they reach 3 or more contacts in the last 12 months.',
      "Flag accounts whose yearly transaction count is falling towards 45, the leavers' average.",
      'Target customers with zero or very low utilisation and 2 to 3 or more inactive months with incentives such as cashback or balance transfers.',
      'Do not launch a Platinum-wide campaign on 20 customers; review those accounts individually.',
    ],
    after: 'These are starting points to test, not measured savings or validated thresholds. The data is a single snapshot with no costs and no record of any retention action.',
  },
  {
    num: '07',
    title: 'Mistakes I Caught and Corrected',
    type: 'list',
    divider: 'rule',
    items: [
      'A trap in the card breakdown: Blue cards hold 1,519 of the 1,627 churners, which looks like a Blue problem. But Blue is 93% of all customers and its 16.10% churn rate matches the 16.07% overall. Platinum has the highest rate (25.00%), but on 20 customers (5 churners), too few to act on. The behavioural signal is activity: leavers averaged 44.9 transactions a year against 68.7 for stayers, a gap of 23.7.',
      'I first labelled the $13.24M "Revenue at Risk." A credit limit is the most a bank allows a customer to borrow, not revenue, so I renamed it "Credit Exposure."',
      'A dashboard note said "about 508 attrited customers" sit at the credit-limit ceiling. 508 is all customers at the ceiling; 89 of them are attrited. I corrected the note.',
      'The Power BI top-50 table sorted by customer ID instead of the transaction-amount order from SQL. I set the sort in the visual.',
      'Spend-trend label: my SQL labelled both churned and retained customers "Declining Spend," because both averages are below 1.0. I kept the query as it was and changed the interpretation, not the threshold.',
      'Power BI display bugs: KPI cards abbreviated 10,127 to "10K" (fixed with a DAX FORMAT measure), and the "5+" contact bucket lost its "+" because Power Query typed the column as a number (fixed by setting it to text).',
      "Self-audit fixes: I committed the seven SQL scripts the README referred to, replaced an absolute notebook path with a relative one, and saved the notebook's executed outputs.",
    ],
  },
  {
    num: '08',
    title: 'Power BI Report',
    type: 'para',
    text: 'Executive Overview shows the attrition rate, credit exposure and customer count, attrition by card tier with a small-sample warning, and an income slicer. Behavioural Signals compares churned and retained customers on transaction count, months inactive, utilisation and a spend-versus-frequency scatter, filtered by card tier. At-Risk Profiles shows attrition by contact bucket, spend decline, the average credit limit of churned customers, and the top 50 churned accounts by credit limit with a note on the $34,516 ceiling.',
  },
  {
    num: '09',
    title: 'Visual Evidence',
    type: 'figures',
    items: [
      {
        src: '/projects/banking-churn/ban-pbi-risk.webp',
        alt: 'Power BI At-Risk Profiles page: a note on the $34,516 credit limit ceiling, a table of the top 50 churned accounts by credit limit, a column chart of attrition rate by contacts, rising from 12.49% at 2 contacts to 20.15% at 3 and 49.13% at 5 or more, a column chart of spend decline for churned versus retained customers, and a card showing the average credit limit of churned customers, $8,136.',
        caption: 'Power BI, At-Risk Profiles page. The ceiling note counts 508 customers at the limit, 89 of them attrited.',
        w: 1160,
        h: 637,
      },
      {
        src: '/projects/banking-churn/ban-pbi-overview.webp',
        alt: 'Power BI Executive Overview page: cards for attrition rate 16.07%, credit exposure $13.237M and total customers 10,127, an income-category slicer, a donut chart of existing versus attrited customers, a bar chart of attrition rate by card tier, and a note that Platinum (n=20) and Gold (n=116) are small samples.',
        caption: 'Power BI, Executive Overview page. Credit exposure is the total credit limit on churned accounts, not lost revenue.',
        w: 1157,
        h: 575,
      },
      {
        src: '/projects/banking-churn/ban-pbi-behavior.webp',
        alt: 'Power BI Behavioural Signals page with a card-tier slicer and four charts comparing attrited and existing customers: average transaction count (44.9 vs 68.7), months inactive (2.69 vs 2.27), credit utilization (16.25% vs 29.64%), and a scatter of transaction amount against transaction count.',
        caption: 'Power BI, Behavioural Signals page.',
        w: 1160,
        h: 642,
      },
      {
        src: '/projects/banking-churn/ban-boxplot-trans.webp',
        alt: 'Boxplot of total transaction count for attrited and existing customers; the attrited box, with a median of 43, sits below the existing box, with a median of 71.',
        caption: 'Total transaction count by customer status. Python (seaborn).',
        w: 1183,
        h: 733,
      },
      {
        src: '/projects/banking-churn/ban-scatter.webp',
        alt: 'Scatter plot of transaction amount against transaction count with attrited customers in red and existing customers in blue; churned customers appear mostly at low spend and low counts, plus a smaller group at about $7,500 to $10,500 in spend with 50 to 80 transactions, and none in the highest-spend, highest-count group.',
        caption: 'Transaction amount against transaction count, by customer status. Python (matplotlib).',
        w: 1333,
        h: 883,
      },
    ],
  },
  {
    num: '10',
    title: 'Limitations and Next Steps',
    type: 'list',
    items: [
      'The data is a single snapshot with no dates or closure timestamps, so I cannot measure how long before closing a third service contact occurs, and the findings are associations, not causes.',
      'The analysis uses group means, boxplots and correlations, with no hypothesis tests or multivariate controls.',
      'Credit limits appear capped at both ends in the source data (508 customers at $34,516.00 and 507 at $1,438.30), so credit-limit findings need care.',
      'Platinum (20 customers) and Gold (116) rates are unstable, and the 6-contact group (54 customers) is merged into "5+".',
      'Credit exposure is a total of credit limits, not revenue, cost or profit.',
    ],
    after: 'Next steps: Welch t-tests, Mann-Whitney U and chi-square tests with confidence intervals (Wilson intervals for the small card tiers), then a leakage-free predictive model (regularised logistic regression and gradient-boosted trees) evaluated with stratified cross-validation and precision-recall AUC, with explainability.',
  },
  {
    num: '11',
    title: 'What I Did',
    type: 'para',
    text: 'Solo project. I wrote the SQL queries, cleaned and explored the data in Python, and built the three-page Power BI report, whose DAX measures recompute each figure over the cleaned table while the top-50 table and the contact chart read the SQL exports, so the contact figures come from one query rather than three separate calculations. I also audited my own work and corrected the labels, notes and files described above.',
  },
  {
    num: '12',
    title: 'Tools and Skills',
    type: 'tags',
    groups: [
      {
        label: 'Tools',
        items: ['SQL (MySQL)', 'Power BI', 'DAX', 'Python', 'pandas', 'matplotlib', 'seaborn', 'Jupyter', 'Git/GitHub'],
      },
      {
        label: 'Skills shown',
        items: ['Churn Analysis', 'SQL Window Functions', 'SQL CTEs', 'Data Cleaning', 'Target Leakage Detection', 'Exploratory Analysis', 'Correlation Analysis', 'KPI Dashboards', 'DAX Measures', 'Cross-Tool Reconciliation'],
      },
    ],
  },
  { num: '13', title: 'Links', type: 'links' },
    ];
