/**
 * Deployed Applications — projects that ship as live, publicly accessible
 * Streamlit apps. Only applications with a verified public URL belong here;
 * repositories, notebooks, Power BI files, and local-only tools do not count.
 *
 * The secondary CTA routes to the existing case-study page rather than
 * duplicating project data, so this model stores only what the showcase needs.
 *
 * Every figure below is traceable to the Customer Churn or Product Sentiment
 * case study in src/data/projects.ts, or to the captured screenshot of the app
 * it ships with. Nothing is estimated to fill out a sentence.
 */
export type PreviewType = 'screenshot' | 'illustrative';

export interface Application {
  id: string;
  number: string;
  title: string;
  /** The question the app answers, shown under the title in place of the old workflow line. */
  question: string;
  description: string;
  technologies: string[];
  /** Headline verified metric value, e.g. "0.8343" */
  metric: string;
  /** Metric label, e.g. "AUC-ROC" */
  metricLabel: string;
  /** Secondary line under the metric — quieter than the serif number, never a second headline. */
  metricNote?: string;
  /** Public, live deployment URL */
  liveUrl: string;
  /** Internal React Router path to the related case study */
  projectRoute: string;
  /** Source repository */
  githubUrl: string;
  /** Status label shown beside the number, e.g. "Live" */
  status: string;
  /** Preview asset path (public/) */
  previewImage: string;
  /** Intrinsic preview dimensions, used to reserve layout space */
  previewWidth: number;
  previewHeight: number;
  /** Descriptive alt text for the preview */
  previewAlt: string;
  previewType: PreviewType;
  /** Honest caption shown under the preview */
  previewCaption: string;
}

export const APPLICATIONS: Application[] = [
  {
    id: 'customer-churn',
    number: '01',
    title: 'Customer Churn Prediction',
    question: 'Which telecom customers are likely to leave?',
    description:
      'A Random Forest model with SMOTE rebalancing scores a customer profile in your browser. Try it: change Contract Type and compare the predicted risk.',
    technologies: ['Python', 'Scikit-learn', 'Random Forest', 'SMOTE', 'Streamlit'],
    metric: '0.8343',
    metricLabel: 'AUC-ROC',
    metricNote: '7,043 customers · 8,260 training rows after SMOTE',
    liveUrl: 'https://customer-churn-prediction-0001.streamlit.app/',
    projectRoute: '/projects/customer-churn',
    githubUrl: 'https://github.com/Venkatavishnuvardhanthota/customer-churn-prediction',
    status: 'Live',
    previewImage: '/app-previews/customer-churn.webp',
    previewWidth: 1152,
    previewHeight: 720,
    previewAlt: 'Customer Churn Predictor app with account and service inputs',
    previewType: 'screenshot',
    previewCaption: 'Captured from the live application',
  },
  {
    id: 'product-sentiment',
    number: '02',
    title: 'Product Review Sentiment Analysis',
    question: 'Do food reviews agree with their star ratings?',
    description:
      'Paste any product review and the app scores its sentiment with VADER and TextBlob, alongside TF-IDF keywords and a Plotly dashboard of the full corpus. Across 568,454 Amazon food reviews, 88.2% are positive and VADER agrees with the star rating 79.6% of the time. Try it: paste a review and click Analyze Review.',
    technologies: ['VADER', 'TextBlob', 'TF-IDF', 'Plotly', 'Streamlit'],
    metric: '568,454',
    metricLabel: 'reviews · 79.6% agreement with star ratings',
    liveUrl: 'https://prduct-sentiment-dashboard.streamlit.app/',
    projectRoute: '/projects/product-sentiment',
    githubUrl: 'https://github.com/Venkatavishnuvardhanthota/product-sentiment-dashboard',
    status: 'Live',
    previewImage: '/app-previews/product-sentiment.webp',
    previewWidth: 1152,
    previewHeight: 720,
    previewAlt: 'Product Review Sentiment Analyzer app with review input and sentiment dashboard',
    previewType: 'screenshot',
    previewCaption: 'Captured from the live application',
  },
];
