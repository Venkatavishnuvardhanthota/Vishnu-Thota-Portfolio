/**
 * Deployed Applications — projects that ship as live, publicly accessible
 * Streamlit apps. Only applications with a verified public URL belong here;
 * repositories, notebooks, Power BI files, and local-only tools do not count.
 *
 * The "View project" link routes to the existing case-study page rather than
 * duplicating project data, so this model stores only what the showcase needs.
 */
export interface Application {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  /** Headline verified metric value, e.g. "0.8343" */
  metric: string;
  /** Metric label, e.g. "AUC-ROC" */
  metricLabel: string;
  /** Public, live deployment URL */
  liveUrl: string;
  /** Internal React Router path to the related case study */
  projectRoute: string;
  /** Source repository */
  githubUrl: string;
}

export const APPLICATIONS: Application[] = [
  {
    id: 'customer-churn',
    number: '01',
    title: 'Customer Churn Prediction',
    description:
      'Interactive machine-learning application for predicting telecom customer churn using a Random Forest model with SMOTE rebalancing — score a customer profile in the browser.',
    technologies: ['Python', 'Scikit-learn', 'Random Forest', 'SMOTE', 'Streamlit'],
    metric: '0.8343',
    metricLabel: 'AUC-ROC',
    liveUrl: 'https://customer-churn-prediction-0001.streamlit.app/',
    projectRoute: '/projects/customer-churn',
    githubUrl: 'https://github.com/Venkatavishnuvardhanthota/customer-churn-prediction',
  },
  {
    id: 'product-sentiment',
    number: '02',
    title: 'Product Review Sentiment Analysis',
    description:
      'Interactive NLP application analyzing 568,454 Amazon food reviews with VADER and TextBlob sentiment analysis, TF-IDF keyword extraction, and a Plotly dashboard.',
    technologies: ['VADER', 'TextBlob', 'TF-IDF', 'Plotly', 'Streamlit'],
    metric: '568,454',
    metricLabel: 'Reviews analyzed',
    liveUrl: 'https://prduct-sentiment-dashboard.streamlit.app/',
    projectRoute: '/projects/product-sentiment',
    githubUrl: 'https://github.com/Venkatavishnuvardhanthota/product-sentiment-dashboard',
  },
];
