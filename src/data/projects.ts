import type { Project } from '../types/project';

const GH = 'https://github.com/Venkatavishnuvardhanthota/';

/**
 * Single source of truth for the Projects section and the routed case studies.
 * All metrics/technologies come only from verified project information.
 */
export const PROJECTS: Project[] = [
  {
    id: 'rossmann',
    number: '01',
    title: 'Rossmann Store Sales Forecasting',
    category: 'Data Science / Forecasting',
    shortDescription:
      'Store-level sales forecasting across the Rossmann chain, benchmarking a Prophet baseline against a tuned XGBoost model on a chronological holdout.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Prophet'],
    githubUrl: GH + 'rossmann-sales-forecasting',
    liveUrl: null,
    previewMetric: { v: '17.13% store-day MAPE', l: 'Chronological 84-day holdout' },
    metrics: [
      { v: '1,115', l: 'Stores' },
      { v: '84-day', l: 'Chronological holdout' },
      { v: '17.13%', l: 'Store-day MAPE' },
      { v: '8.20%', l: 'Chain-wide daily MAPE' },
    ],
    visual: 'forecast',
    sections: [
      { num: '01', title: 'Overview', type: 'para', text: 'A time-series forecasting project that predicts store-level sales for the Rossmann chain using historical sales data, comparing a statistical baseline against a gradient-boosted model.' },
      { num: '02', title: 'The Problem', type: 'para', text: 'Retail planners need reliable store-day sales forecasts. The challenge is a large, multi-store time series with trend, seasonality, and calendar effects that a single global model must capture without leaking future information.' },
      { num: '03', title: 'Data', type: 'kv', items: [['Scope', '1,115 stores'], ['Validation', '84-day chronological holdout'], ['Leakage control', 'Time-ordered split, no shuffling']] },
      { num: '04', title: 'Approach', type: 'list', items: ['Time-series preparation and feature engineering on historical sales', 'Prophet fitted as a forecasting benchmark', 'XGBoost trained as the final model', 'Performance validated on the held-out 84-day window'] },
      { num: '05', title: 'Results', type: 'metrics', items: [{ v: '17.13%', l: 'Store-day MAPE' }, { v: '~1,062', l: 'MAE' }, { v: '~1,493', l: 'RMSE' }, { v: '8.20%', l: 'Chain-wide daily MAPE' }] },
      { num: '06', title: 'Key Insights', type: 'list', items: ['Aggregating to chain-wide daily totals smooths store-level noise, lowering MAPE from 17.13% to 8.20%', 'A chronological holdout is essential: random splits would overstate forecast quality', 'Prophet provides a transparent benchmark against which the XGBoost model is judged'] },
      { num: '07', title: 'Technology', type: 'tags' },
      { num: '08', title: 'Links', type: 'links' },
    ],
  },
  {
    id: 'ab-testing',
    number: '02',
    title: 'Marketing A/B Testing Analysis',
    category: 'Data Analytics / Experimentation',
    shortDescription:
      'A two-proportion experiment on 588,101 marketing records testing whether an ad variant lifts conversion, with hypothesis testing and a confidence interval.',
    technologies: ['Python', 'Pandas', 'Statistical Testing'],
    githubUrl: GH + 'ab-testing-analysis',
    liveUrl: null,
    previewMetric: { v: '+43.1% relative lift', l: 'p = 1.71e-13 · statistically significant' },
    metrics: [
      { v: '588,101', l: 'Records' },
      { v: '2.55%', l: 'Ad conversion' },
      { v: '1.79%', l: 'Control conversion' },
      { v: '+43.1%', l: 'Relative lift' },
    ],
    visual: 'ab',
    sections: [
      { num: '01', title: 'Overview', type: 'para', text: 'An experiment analysis that compares a marketing ad variant against a control to determine whether the observed difference in conversion is statistically meaningful rather than chance.' },
      { num: '02', title: 'Hypothesis & Experiment', type: 'para', text: 'Null hypothesis: the ad and control convert at the same rate. Alternative: the ad converts at a higher rate. Traffic is split between variants and conversions recorded per group.' },
      { num: '03', title: 'Data', type: 'kv', items: [['Records', '588,101'], ['Design', 'Two-group conversion experiment'], ['Outcome', 'Binary conversion per record']] },
      { num: '04', title: 'Statistical Test', type: 'kv', items: [['Test', 'Two-proportion z-test'], ['Statistic', 'z = 7.37'], ['Significance', 'p = 1.71e-13'], ['Interval', '95% CI: +0.60 to +0.94 percentage points']] },
      { num: '05', title: 'Results', type: 'metrics', items: [{ v: '2.55%', l: 'Ad conversion' }, { v: '1.79%', l: 'Control conversion' }, { v: '+0.77 pp', l: 'Absolute lift' }, { v: '+43.1%', l: 'Relative lift' }] },
      { num: '06', title: 'Business Impact', type: 'para', text: 'The lift is both statistically significant and practically material: the 95% confidence interval (+0.60 to +0.94 percentage points) excludes zero, supporting rollout of the ad variant over the control.' },
      { num: '07', title: 'Technology', type: 'tags' },
      { num: '08', title: 'Links', type: 'links' },
    ],
  },
  {
    id: 'customer-churn',
    number: '03',
    title: 'Customer Churn Prediction',
    category: 'Machine Learning / Classification',
    shortDescription:
      'A Random Forest churn classifier over 7,043 customers and 21 features, with SMOTE rebalancing and a Streamlit prediction application.',
    technologies: ['Python', 'Scikit-learn', 'Random Forest', 'SMOTE', 'Streamlit'],
    githubUrl: GH + 'customer-churn-prediction',
    liveUrl: null,
    previewMetric: { v: 'AUC-ROC 0.8343', l: 'Random Forest with SMOTE' },
    metrics: [
      { v: '7,043', l: 'Customers' },
      { v: '21', l: 'Features' },
      { v: '0.8343', l: 'AUC-ROC' },
      { v: 'Streamlit', l: 'Prediction application' },
    ],
    visual: 'churn',
    sections: [
      { num: '01', title: 'Overview', type: 'para', text: 'A supervised classification project that predicts which customers are likely to churn, pairing a balanced-tree model with an interactive Streamlit application for scoring customers.' },
      { num: '02', title: 'The Problem', type: 'para', text: 'Churn is typically rare relative to retention, so a naive classifier can score well on accuracy while missing the customers who actually leave. The project targets discrimination quality on the minority class.' },
      { num: '03', title: 'Data', type: 'kv', items: [['Customers', '7,043'], ['Features', '21'], ['Imbalance handling', 'SMOTE oversampling of the minority class']] },
      { num: '04', title: 'Approach', type: 'list', items: ['Feature preparation across 21 customer attributes', 'SMOTE applied to rebalance the churn class', 'Random Forest trained as the classifier', 'Evaluated with AUC-ROC to measure ranking quality'] },
      { num: '05', title: 'Results', type: 'metrics', items: [{ v: '0.8343', l: 'AUC-ROC' }, { v: '7,043', l: 'Customers scored' }, { v: '21', l: 'Input features' }] },
      { num: '06', title: 'Application', type: 'para', text: 'The model is exposed through a Streamlit application, allowing a customer profile to be entered and a churn prediction returned interactively.' },
      { num: '07', title: 'Technology', type: 'tags' },
      { num: '08', title: 'Links', type: 'links' },
    ],
  },
  {
    id: 'product-sentiment',
    number: '04',
    title: 'Product Review Sentiment Analysis',
    category: 'NLP / Data Visualization',
    shortDescription:
      'Sentiment analysis over 568,454 Amazon food reviews using VADER and TextBlob, surfaced through an interactive Plotly + Streamlit dashboard.',
    technologies: ['Python', 'VADER', 'TextBlob', 'TF-IDF', 'WordCloud', 'Plotly', 'Streamlit'],
    githubUrl: GH + 'product-sentiment-dashboard',
    liveUrl: null,
    previewMetric: { v: '88.2% positive', l: 'VADER agreement with star ratings: 79.6%' },
    metrics: [
      { v: '568,454', l: 'Amazon food reviews' },
      { v: '88.2%', l: 'Overall positive rate' },
      { v: '79.6%', l: 'VADER accuracy vs star ratings' },
    ],
    visual: 'sentiment',
    sections: [
      { num: '01', title: 'Overview', type: 'para', text: 'A natural-language-processing project that scores product-review sentiment at scale and presents the distribution, drivers, and disagreement through an interactive dashboard.' },
      { num: '02', title: 'Review Corpus', type: 'kv', items: [['Source', 'Amazon food reviews'], ['Size', '568,454 reviews'], ['Signal', 'Free text plus star ratings']] },
      { num: '03', title: 'NLP Pipeline', type: 'list', items: ['VADER lexicon scoring for sentiment polarity', 'TextBlob as a comparative sentiment estimator', 'TF-IDF to surface discriminative review terms', 'WordCloud visualization of prominent vocabulary'] },
      { num: '04', title: 'Dashboard', type: 'para', text: 'Results are presented in an interactive dashboard built with Plotly and Streamlit, letting a reader filter and explore sentiment across the corpus.' },
      { num: '05', title: 'Results', type: 'metrics', items: [{ v: '88.2%', l: 'Overall positive rate' }, { v: '79.6%', l: 'VADER accuracy vs star ratings' }, { v: '568,454', l: 'Reviews analyzed' }] },
      { num: '06', title: 'Error Analysis', type: 'para', text: 'Comparing VADER polarity against the review star rating gives 79.6% agreement, quantifying where lexicon sentiment diverges from stated rating and guiding interpretation of the remaining cases.' },
      { num: '07', title: 'Technology', type: 'tags' },
      { num: '08', title: 'Links', type: 'links' },
    ],
  },
  {
    id: 'retail-sales',
    number: '05',
    title: 'Retail Sales Analysis',
    category: 'Data Analytics / Business Intelligence',
    shortDescription:
      'An exploratory analysis of US Superstore sales in Python with a Power BI dashboard of revenue, profit, and seasonal patterns.',
    technologies: ['Python', 'Pandas', 'Power BI'],
    githubUrl: GH + 'retail-sales-dashboard',
    liveUrl: null,
    previewMetric: { v: '$0.84M — Technology', l: 'Highest-revenue category' },
    metrics: [
      { v: '$0.84M', l: 'Technology revenue (top category)' },
      { v: 'California', l: 'Highest-revenue state' },
      { v: 'November', l: 'Peak sales month' },
      { v: '2.49%', l: 'Furniture profit margin' },
    ],
    visual: 'retail',
    sections: [
      { num: '01', title: 'Overview', type: 'para', text: 'A business-intelligence project that explores US Superstore sales to understand where revenue and profit come from, and where the business loses money.' },
      { num: '02', title: 'Data', type: 'kv', items: [['Dataset', 'US Superstore retail sales'], ['Tooling', 'Python EDA + Power BI']] },
      { num: '03', title: 'Approach', type: 'list', items: ['Exploratory data analysis in Python across category, subcategory, state, and month', 'Profit and margin analysis to locate loss-making lines', 'Power BI dashboard summarizing revenue, profit, and seasonality'] },
      { num: '04', title: 'Findings', type: 'list', visual: 'retail', items: ['Technology is the highest-revenue category at $0.84M', 'Tables and Bookcases are loss-making subcategories', 'California is the highest-revenue state', 'November is the peak sales month', 'Furniture carries a thin 2.49% profit margin'] },
      { num: '05', title: 'Key Insights', type: 'para', text: 'Revenue concentration and thin furniture margins point to a mix problem: top-line growth is driven by Technology while parts of Furniture erode profit, suggesting pricing or cost review on the loss-making subcategories.' },
      { num: '06', title: 'Technology', type: 'tags' },
      { num: '07', title: 'Links', type: 'links' },
    ],
  },
  {
    id: 'banking-churn',
    number: '06',
    title: 'Banking Churn Analysis',
    category: 'Data Analytics / SQL / BI',
    shortDescription:
      'A SQL-and-Power BI analysis of 10,127 bank customers identifying attrition drivers, behavioral indicators, and revenue at risk.',
    technologies: ['MySQL', 'SQL CTEs & window functions', 'Python / Pandas', 'Power BI / DAX'],
    githubUrl: GH + 'banking-churn-analysis',
    liveUrl: null,
    previewMetric: { v: '16.07% attrition', l: '$13.24M revenue at risk identified' },
    metrics: [
      { v: '10,127', l: 'Customers' },
      { v: '16.07%', l: 'Attrition rate' },
      { v: '-0.37', l: 'Total_Trans_Ct correlation' },
      { v: '$13.24M', l: 'Revenue at risk' },
    ],
    visual: 'banking',
    sections: [
      { num: '01', title: 'Overview', type: 'para', text: 'An analytical study of bank-customer attrition that combines SQL analysis with a Power BI report to quantify who leaves, why, and what revenue is exposed.' },
      { num: '02', title: 'The Problem', type: 'para', text: 'Customer attrition erodes recurring revenue. The analysis aims to size the attrition problem and surface behavioral indicators that separate attrited from retained customers.' },
      { num: '03', title: 'SQL Analysis', type: 'list', items: ['MySQL as the analytical store', 'CTEs to stage customer-level aggregations', 'Window functions for comparative and running metrics', 'Python/Pandas for correlation and summary analysis'] },
      { num: '04', title: 'Behavioral Indicators', type: 'kv', items: [['Transaction activity', 'Attrited customers average 44.9 transactions vs 68.7 for existing'], ['Strongest signal', 'Total_Trans_Ct correlates with attrition at -0.37'], ['Interpretation', 'Declining transaction engagement precedes attrition']] },
      { num: '05', title: 'Results', type: 'metrics', items: [{ v: '16.07%', l: 'Attrition rate' }, { v: '$13.24M', l: 'Revenue at risk' }, { v: '10,127', l: 'Customers analyzed' }] },
      { num: '06', title: 'Reporting', type: 'para', text: 'Findings are delivered through a Power BI report using DAX measures, letting stakeholders explore attrition and revenue-at-risk by segment.' },
      { num: '07', title: 'Technology', type: 'tags' },
      { num: '08', title: 'Links', type: 'links' },
    ],
  },
  {
    id: 'house-price',
    number: '07',
    title: 'House Price Prediction',
    category: 'Machine Learning / Regression',
    shortDescription:
      'A regression study on 545 property records comparing Linear Regression and Random Forest with feature engineering and GridSearchCV tuning.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Linear Regression', 'Random Forest', 'StandardScaler', 'GridSearchCV'],
    githubUrl: GH + 'House_Price_Prediction',
    liveUrl: null,
    previewMetric: { v: 'R² 0.6583', l: 'Linear Regression · MAE ~₹970,043' },
    metrics: [
      { v: '545', l: 'Original records' },
      { v: '0.6583', l: 'Linear Regression R²' },
      { v: '~₹970,043', l: 'Linear Regression MAE' },
      { v: '~₹1,324,507', l: 'Linear Regression RMSE' },
    ],
    visual: 'house',
    sections: [
      { num: '01', title: 'Overview', type: 'para', text: 'A supervised regression project that predicts house prices from property characteristics, comparing a linear baseline with a tree-based model under a consistent tuning pipeline.' },
      { num: '02', title: 'The Problem', type: 'para', text: 'Property pricing depends on many interacting characteristics. The goal is a model that generalizes to unseen properties and quantifies its own error in currency terms.' },
      { num: '03', title: 'Data', type: 'kv', items: [['Records', '545 original property records'], ['Preparation', 'Feature engineering on property characteristics']] },
      { num: '04', title: 'Approach', type: 'list', items: ['Feature engineering from raw property attributes', 'StandardScaler for scale-sensitive models', 'GridSearchCV for hyperparameter selection', 'Linear Regression baseline and Random Forest comparison'] },
      { num: '05', title: 'Results', type: 'metrics', items: [{ v: '0.6583', l: 'Linear Regression R²' }, { v: '~₹970,043', l: 'Linear Regression MAE' }, { v: '~₹1,324,507', l: 'Linear Regression RMSE' }] },
      { num: '06', title: 'Key Insights', type: 'para', text: 'Reporting error in rupees (MAE ~₹970,043) makes model quality interpretable to a non-technical audience, while R² 0.6583 indicates the linear baseline explains roughly two-thirds of price variance.' },
      { num: '07', title: 'Technology', type: 'tags' },
      { num: '08', title: 'Links', type: 'links' },
    ],
  },
];

export function getProjectById(id: string | undefined): Project | undefined {
  if (!id) return undefined;
  return PROJECTS.find((p) => p.id === id);
}
