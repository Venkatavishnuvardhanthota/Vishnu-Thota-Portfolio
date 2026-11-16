import type { ProjectMeta } from '../types/project';

const GH = 'https://github.com/Venkatavishnuvardhanthota/';

/**
 * Single source of truth for the Projects section, the case-study header and every
 * route's head tags. All metrics/technologies come only from verified project
 * information.
 *
 * The article bodies are not here: each lives in src/data/case-studies/<id>.ts and
 * is fetched by /projects/:id, so the homepage does not carry seven case studies.
 */
export const PROJECTS: ProjectMeta[] = [
  {
    id: 'ab-testing',
    number: '01',
    title: 'Marketing A/B Testing Analysis',
    category: 'Data Analytics / Experimentation / BI',
    question: 'Did the ad beat the PSA?',
    shortDescription:
      'A conversion test on 588,101 users in SQL, Python and Tableau: the ad group converted 0.77 percentage points more than the PSA control, with the assumptions behind the business case stated.',
    technologies: ['SQL (MySQL)', 'Tableau', 'Python', 'statsmodels'],
    githubUrl: GH + 'ab-testing-analysis',
    liveUrl: null,
    previewMetric: { v: '+0.77 pp conversion lift', l: '95% CI +0.60 to +0.94 pp, p < 0.001, 588,101 users' },
    standfirst:
      'Users shown the ad converted at 2.55% vs 1.79% for a PSA control: +0.77 percentage points (95% CI +0.60 to +0.94, p < 0.001) across 588,101 users.',
    stack: ['SQL', 'Tableau', 'Python'],
    metrics: [
      { v: '588,101', l: 'Users analysed (one row per user)' },
      { v: '2.55% vs 1.79%', l: 'Ad vs PSA control conversion', fit: true },
      /* The U+00A0 before "pp" is the only unbreakable space in the strip: with a
         plain space the label ended "+0.94" and dropped "pp" onto its own line. */
      { v: '+0.77 pp', l: 'Absolute lift, 95% CI +0.60 to +0.94\u00A0pp' },
      { v: 'p = 1.7×10⁻¹³', l: 'Two-proportion z-test, z = 7.37' },
    ],
  },
  {
    id: 'rossmann',
    number: '02',
    title: 'Rossmann Store Sales Forecasting',
    category: 'Data Analytics / Machine Learning / BI',
    question: 'Can store-level sales be forecast well enough to plan with?',
    shortDescription:
      'A 12-week, store-level sales forecast for 1,115 Rossmann stores, comparing Prophet and XGBoost on a time-ordered holdout, with SQL, Excel, Python and a four-page Power BI report.',
    technologies: ['SQL (MySQL)', 'Excel', 'Power BI', 'DAX', 'Python', 'XGBoost', 'Prophet'],
    githubUrl: GH + 'rossmann-sales-forecasting',
    liveUrl: null,
    previewMetric: { v: '6.72% chain-wide MAPE', l: 'XGBoost against 32.89% for Prophet at the same daily grain' },
    standfirst:
      'XGBoost forecast chain-wide daily sales at 6.72% MAPE on an 84-day holdout, against 32.89% for Prophet at the same grain; the next 12 weeks total about 571.2 million in expected sales across 1,115 stores.',
    stack: ['SQL', 'Excel', 'Power BI', 'Python'],
    metrics: [
      { v: '6.72%', l: 'Chain-wide daily MAPE, XGBoost' },
      { v: '32.89%', l: 'Chain-wide daily MAPE, Prophet' },
      { v: '12.93%', l: 'Store-day MAPE, production\u00A0XGBoost' },
      { v: '571.2M', l: 'Expected sales, next 84 days' },
    ],
  },
  {
    id: 'banking-churn',
    number: '03',
    title: 'Banking Churn Analysis',
    category: 'Data Analytics / SQL / BI',
    question: 'Who is leaving, and where should retention focus?',
    shortDescription:
      'A SQL, Python and Power BI analysis of 10,127 credit card customers showing where attrition concentrates, with leakage columns removed and a three-page report of DAX measures over the cleaned table and two SQL exports.',
    technologies: ['SQL (MySQL)', 'Power BI', 'DAX', 'Python'],
    githubUrl: GH + 'banking-churn-analysis',
    liveUrl: null,
    previewMetric: { v: '12.49% → 20.15%', l: 'Attrition at 2 versus 3 contacts in the last 12 months, 10,127 customers' },
    standfirst:
      'Across 10,127 credit card customers, 16.07% churned. Churners made far fewer transactions (44.9 against 68.7), and attrition jumps from 12.49% at two contacts in the last 12 months to 20.15% at three.',
    stack: ['SQL', 'Power BI', 'Python'],
    metrics: [
      { v: '16.07%', l: 'Attrition rate, 1,627 of 10,127\u00A0customers' },
      { v: '$13.24M', l: 'Credit limits on churned\u00A0accounts' },
      { v: '-0.37', l: 'Correlation of transaction count with churn' },
      { v: '12.49% → 20.15%', l: 'Attrition at 2 vs 3 contacts in the last 12\u00A0months', fit: 13 },
    ],
  },
  {
    id: 'retail-sales',
    number: '04',
    title: 'Retail Sales Analysis',
    category: 'Data Analytics / BI',
    question: 'Where is revenue high but profit thin?',
    shortDescription:
      'A Python and Power BI analysis of Sample Superstore sales showing that Furniture earns $742K in sales at a 2.49% margin while Tables, Bookcases and Supplies lose money.',
    technologies: ['Power BI', 'DAX', 'Python', 'pandas'],
    githubUrl: GH + 'retail-sales-dashboard',
    liveUrl: null,
    previewMetric: { v: '2.49% Furniture margin', l: 'Against 17.40% for Technology; 3 of 17 sub-categories lose money' },
    standfirst:
      'Across 9,994 Sample Superstore order lines (2014–2017), Furniture earned $742K in sales at a 2.49% margin while Tables, Bookcases and Supplies lost money, shown in Python charts and a Power BI report.',
    stack: ['Power BI', 'Python'],
    metrics: [
      { v: '$2.30M', l: 'Total sales, 9,994 order lines' },
      { v: '12.47%', l: 'Overall profit margin ($286.4K\u00A0profit)' },
      { v: '2.49%', l: 'Furniture margin, against 17.40% for Technology' },
      { v: '3 of 17', l: 'Sub-categories with negative\u00A0profit' },
    ],
  },
  {
    id: 'customer-churn',
    number: '05',
    title: 'Customer Churn Prediction',
    category: 'Machine Learning / Classification',
    question: 'Which telecom customers are likely to leave?',
    shortDescription:
      'A Logistic Regression churn model for 7,043 telecom customers, chosen by leakage-safe cross-validation and deployed as a Streamlit app, with its precision and recall trade-off stated.',
    technologies: ['Python', 'scikit-learn', 'SMOTE', 'Streamlit'],
    githubUrl: GH + 'customer-churn-prediction',
    liveUrl: 'https://customer-churn-prediction-0001.streamlit.app/',
    previewMetric: { v: '77.81% churn recall', l: 'Logistic Regression, test ROC-AUC 0.8310, 1,407 held-out customers' },
    standfirst:
      'Logistic Regression, chosen by cross-validated ROC-AUC (0.8463 against 0.8455 for Random Forest, effectively a tie), flags 77.81% of churners among 1,407 held-out telecom customers (test ROC-AUC 0.8310) and runs in a live Streamlit app.',
    stack: ['Python', 'scikit-learn', 'Streamlit'],
    metrics: [
      { v: '0.8310', l: 'Test ROC-AUC, Logistic Regression' },
      { v: '77.81%', l: 'Logistic Regression churn recall on 1,407 held-out customers' },
      { v: '49.91%', l: 'Logistic Regression precision at the 0.50 threshold' },
      { v: '42.7% vs 2.8%', l: 'Churn: month-to-month vs two-year contracts', fit: 16 },
    ],
  },
  {
    id: 'product-sentiment',
    number: '06',
    title: 'Product Review Sentiment Analysis',
    category: 'NLP / Sentiment Analysis',
    question: 'Do food reviews agree with their star ratings?',
    shortDescription:
      'A VADER and TextBlob analysis of 568,454 Amazon food reviews that compares text labels with star ratings, with a Plotly dashboard and a Streamlit app.',
    technologies: ['Python', 'VADER', 'TextBlob', 'Plotly', 'Streamlit'],
    githubUrl: GH + 'product-sentiment-dashboard',
    liveUrl: 'https://prduct-sentiment-dashboard.streamlit.app/',
    previewMetric: { v: '80.38% agreement', l: 'VADER against a star-rating proxy; an always-positive labelling scores 78.07%' },
    standfirst:
      'Across 568,454 Amazon food reviews, VADER agrees with a star-rating proxy on 80.38% of reviews and labels 49.47% of one-star reviews positive: a lexicon-based workflow with a Plotly dashboard and a Streamlit app.',
    stack: ['Python', 'VADER', 'Plotly', 'Streamlit'],
    metrics: [
      { v: '568,454', l: 'Amazon food reviews analysed' },
      { v: '88.21%', l: 'Reviews VADER labels positive' },
      { v: '80.38%', l: 'Agreement vs a 78.07% always-positive baseline (not accuracy)' },
      { v: '49.47%', l: 'One-star reviews VADER labels\u00A0positive' },
    ],
  },
  {
    id: 'house-price',
    number: '07',
    title: 'House Price Prediction',
    category: 'Machine Learning / Regression',
    question: 'What moves a house price?',
    shortDescription:
      'A regression study on 545 houses in which a plain Linear Regression edged out a tuned Random Forest on one 109-house split, with overfitting diagnostics and an audited pipeline.',
    technologies: ['Python', 'pandas', 'scikit-learn', 'matplotlib'],
    githubUrl: GH + 'House-Price-Prediction',
    liveUrl: null,
    previewMetric: { v: 'R² 0.6583', l: 'Linear Regression against 0.5977 for a tuned Random Forest, 109 test houses' },
    standfirst:
      'On 545 houses, a plain Linear Regression (test R² 0.6583) edged out a grid-searched Random Forest (0.5977), which overfit: training R² 0.8784 against 0.5977 on the held-out houses.',
    stack: ['Python', 'pandas', 'scikit-learn'],
    metrics: [
      { v: '0.6583', l: 'Test R², Linear Regression' },
      { v: '0.5977', l: 'Test R², tuned Random Forest' },
      { v: '966,320', l: 'Test MAE, Linear Regression (dataset units)' },
      { v: '545', l: 'Houses, 16 features after\u00A0engineering' },
    ],
  },
];

export function getProjectById(id: string | undefined): ProjectMeta | undefined {
  if (!id) return undefined;
  return PROJECTS.find((p) => p.id === id);
}
