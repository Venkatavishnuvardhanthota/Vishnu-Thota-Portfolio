import type { CaseStudySection } from '../../types/project';

/**
 * The Customer Churn Prediction case study body. It lives in its own module so Vite emits it as a
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
      'A telecom company wants to spot customers likely to leave and estimate churn risk for a given customer profile. I used a public sample of 7,043 customers to ask how common churn is, how it varies with contract, tenure, charges and services, and whether a classifier can separate churners from stayers on customers it has not seen well enough to score one customer at a time in a web app. The result is a decision-support prototype, not a live retention system, and I treated every pattern as an association.',
      'Answer: a Logistic Regression model scores a customer\'s churn risk and catches 77.81% of churners on held-out customers, at the cost of about two flagged customers for every real churner; the project does not test whether retention offers work.',
    ],
  },
  {
    num: '02',
    title: 'Data',
    type: 'kv',
    items: [
      ['Source', 'IBM Telco Customer Churn sample (Kaggle)'],
      ['Grain', 'One row per customer'],
      ['Size', '7,043 rows × 21 columns; 5,174 stayed and 1,869 churned (26.5%)'],
      ['After cleaning', '7,032 rows × 20 columns: 11 blank TotalCharges records removed and customerID dropped'],
      ['Model input', '36 ordered predictors after encoding and adding five engineered features'],
      ['Split', 'Stratified 80/20: 5,625 training customers and 1,407 test customers'],
      ['Limit', 'One public dataset with no dates, so performance on other customers or later periods is unknown'],
    ],
  },
  {
    num: '03',
    title: 'Pipeline',
    type: 'kv',
    items: [
      ['Cleaning', 'Converted TotalCharges to numeric (11 blank strings became missing and were dropped), removed customerID, mapped Churn to 0 and 1, and one-hot encoded the categorical fields.'],
      ['Features', 'Five engineered features: tenure group (new up to 12 months, mid 13 to 48, loyal 49 to 72), a count of eight services, a new-customer flag, average monthly charge from total charges, and a high-value flag for monthly charges above 70.60, the training-row median.'],
      ['Validation', 'Scaling and then SMOTE were applied inside each of five cross-validation folds, and the test set was never resampled. After SMOTE the training data has 8,260 rows.'],
      ['Models', 'Logistic Regression and Random Forest, compared on mean 5-fold cross-validated ROC-AUC.'],
      ['App', 'A Streamlit form that engineers the same features, aligns the encoded columns to the saved training schema, scales the row, and returns churn and retention probabilities, a risk band and example outreach suggestions.'],
      ['Tests', 'pytest checks for tenure-group boundaries and for parity between batch and single-customer feature encoding.'],
    ],
  },
  {
    num: '04',
    title: 'Findings',
    type: 'list',
    items: [
      'Churn is 26.5% (1,869 of 7,043), so a model that always predicts "stay" would look about 73.5% accurate while catching no churners.',
      'Contract is the strongest pattern: churn is 42.7% on month-to-month contracts, 11.3% on one-year and 2.8% on two-year. This is an association; contract type may be tied to tenure, price or service mix.',
      'Churners had a median tenure of 10 months against 38 for customers who stayed. Churn is 47.68% for new customers (12 months or less), 23.64% for mid and 9.51% for loyal.',
      'Churners paid more per month on average ($74.44 against $61.31), which may reflect contract and service mix as well as price.',
      'Correlations with churn: tenure -0.35, fiber optic internet +0.31, two-year contract -0.30, electronic check payment +0.30.',
      'Churn by number of services is uneven: 43.8% with none, 21.2% with one, 36.5% with three, falling to 5.3% with all eight.',
    ],
  },
  {
    num: '05',
    title: 'Model Comparison',
    type: 'kv',
    items: [
      ['Logistic Regression (selected)', 'Mean 5-fold CV ROC-AUC 0.8463. Held-out test: ROC-AUC 0.8310, accuracy 73.35%, precision 49.91%, recall 77.81%, F1 0.6082.'],
      ['Random Forest', 'Mean 5-fold CV ROC-AUC 0.8455. Held-out test: ROC-AUC 0.8344, accuracy 76.69%, precision 54.83%, recall 69.79%, F1 0.6141.'],
      ["Everyone-stays baseline", "Labelling every held-out customer \"stay\" is 73.42% accurate (1,033 of 1,407), and Logistic Regression's 73.35% accuracy is no better than doing nothing. So accuracy is not the number to read here; recall is: Logistic Regression catches 77.81% of churners, against 69.79% for Random Forest, whose 76.69% accuracy comes with fewer churners caught."],
      ['Why Logistic Regression', 'It was selected on the cross-validation criterion. Random Forest scores slightly higher on the test set, but test results do not override the selection rule.'],
      ['Errors, Logistic Regression', 'Of 374 churners in the test set, 291 were caught and 83 missed; of 1,033 stayers, 292 were flagged by mistake.'],
    ],
    after: 'The margin is small: the cross-validated AUC lead is 0.0008, and I did not run repeated splits or report fold-to-fold variation, so another seed could change the choice. At a 0.50 threshold about half of the flagged customers are real churners (precision 49.91%), so a retention team would contact about two customers for every one who would leave.',
  },
  {
    num: '06',
    title: 'How a Retention Team Could Use This',
    type: 'list',
    items: [
      'Review customers in the high-risk band (above 0.70) first.',
      'Look first at month-to-month contracts (42.7% churn) and at customers in their first 12 months (47.68% churn), and test annual-contract offers there.',
      'Read the probabilities as relative risk, not an exact chance of leaving, because they are not calibrated.',
    ],
    after: 'These are suggestions to test, not measured outcomes: the project does not test whether retention offers work.',
  },
  {
    num: '07',
    title: 'Mistakes I Caught and Corrected',
    type: 'list',
    divider: 'rule',
    items: [
      'Blank TotalCharges escaped my missing-value check because empty strings are not NaN. I coerced the column to numeric and dropped the 11 rows; all 11 had tenure zero.',
      "Encoding mismatch at prediction time: one-hot encoding a single customer with drop_first removed the only category present, so the row no longer matched the training columns. I now create every category, reindex to the saved ordered feature list and fill missing columns with zero. A recorded review estimated the old behaviour shifted the mean predicted churn probability by 20.48 percentage points and changed 1,566 of 7,032 predictions; I treat that as a historical estimate, not a rerun result.",
      'Leakage in a feature threshold: I first computed the high-value cutoff on the full dataset, so test data influenced a feature. It is now computed from training rows only and stored for the app.',
      "Cross-validation did not match final training: validation used different scaling, and SMOTE's neighbour search ran on unscaled features. I moved scaling before SMOTE inside every fold.",
      'Model selection overwritten: the test-set winner had replaced the cross-validation choice in the saved model label. I kept the cross-validation choice as the selected model and marked the test winner as informational.',
      'Tenure boundaries differed between training and the app. I standardised them (new up to 12, mid 13 to 48, loyal above 48) and added boundary tests.',
      "Risk bands versus predicted class: the app's bands (low up to 0.40, medium up to 0.70, high above 0.70) differ from the 0.50 class threshold, so a medium badge can come with a \"stay\" prediction. The app now explains this.",
    ],
  },
  {
    num: '08',
    title: 'The Live App',
    type: 'para',
    text: 'The Streamlit app takes one customer profile (tenure 1 to 72 months, monthly charges $0 to $150, total charges $0 to $10,000) and returns churn and retention probabilities, a risk band, a probability chart and example outreach actions. The suggested actions are static examples, not validated interventions, and the probabilities are not calibrated.',
  },
  {
    num: '09',
    title: 'Visual Evidence',
    type: 'figures',
    items: [
      {
        src: '/projects/customer-churn/cc-app-result.webp',
        alt: 'Screenshot of the live Streamlit app: a sidebar showing Logistic Regression, AUC 0.8310, recall 0.7781 and 8,260 training samples, and a prediction for an example customer with a 74.7% churn probability, 25.3% retention probability, a HIGH risk label, four suggested actions and a probability bar chart.',
        caption: 'Live Streamlit app, prediction view for an example customer. The sidebar\'s 8,260 training samples is the row count after SMOTE; the suggested actions are static examples and the probabilities are not calibrated.',
        w: 1568,
        h: 729,
      },
      {
        src: '/projects/customer-churn/cc-confusion.webp',
        alt: 'Two confusion matrices on the 1,407 held-out customers. Logistic Regression: 741 true negatives, 292 false positives, 83 false negatives, 291 true positives. Random Forest: 818 true negatives, 215 false positives, 113 false negatives, 261 true positives.',
        caption: 'Held-out confusion matrices at the 0.50 threshold. Logistic Regression misses fewer churners (83 against 113) but flags more stayers (292 against 215).',
        w: 1584,
        h: 690,
      },
      {
        src: '/projects/customer-churn/cc-churn-by-contract.webp',
        alt: 'Two charts of churn rate by contract type: month-to-month 42.7%, one-year 11.3% and two-year 2.8%, shown as a stacked percentage bar and as horizontal bars.',
        caption: 'Churn rate by contract type. An association, not proof that contract type causes churn.',
        w: 1584,
        h: 672,
      },
      {
        src: '/projects/customer-churn/cc-feature-validation.webp',
        alt: 'Four bar charts checking the engineered features: churn rate by tenure group (new 47.68%, mid 23.64%, loyal 9.51%), by number of services (43.8% with none, 5.3% with eight), new versus existing customers (47.7% against 17.1%), and high versus normal monthly charges (35.2% against 18.0%).',
        caption: 'Churn rate by engineered feature. Associations, not causes.',
        w: 1584,
        h: 1224,
      },
      {
        src: '/projects/customer-churn/cc-monthly-charges.webp',
        alt: 'Box plot and density plot of monthly charges by churn status; churned customers average $74.44 per month against $61.31 for customers who stayed.',
        caption: 'Monthly charges by churn status; the diamonds and dashed lines mark the means.',
        w: 1584,
        h: 674,
      },
      {
        src: '/projects/customer-churn/cc-feature-importance.webp',
        alt: 'Horizontal bar chart of the top 15 Random Forest feature importances: tenure is highest at 0.1339, then two-year contract at 0.0906, fiber optic internet at 0.0855, total charges at 0.0702 and electronic check payment at 0.0679.',
        caption: 'Top 15 Random Forest feature importances (impurity-based). This is the comparison model, not the deployed Logistic Regression, and it shows what the model used, not what causes churn.',
        w: 1486,
        h: 1185,
      },
    ],
  },
  {
    num: '10',
    title: 'Limitations and Next Steps',
    type: 'list',
    items: [
      'The data is one public dataset with a single 80/20 split, so performance on other customers or later periods is unknown.',
      'Probabilities are not calibrated, because SMOTE changes the training class balance; read them as relative risk, not an exact chance of leaving.',
      'The 0.50 threshold and the 0.40 and 0.70 risk bands were not chosen from a retention cost or capacity analysis.',
      "Logistic Regression's cross-validated lead is only 0.0008, and robustness across seeds and repeated splits is not shown.",
      'There is no subgroup or fairness assessment.',
      'The notebook still computes the engineered features inline, duplicating the module the app uses, so the two can drift.',
      'No financial impact is claimed: the project does not test a retention campaign or estimate customer value.',
    ],
    after: 'Next steps: report fold-to-fold variation and repeated-split results, tie the threshold to a retention budget, check calibration and subgroup performance, and have training and the app import the same feature code.',
  },
  {
    num: '11',
    title: 'What I Did',
    type: 'para',
    text: 'Solo project. I cleaned and explored the data, engineered and validated five features, compared two classifiers with leakage-safe cross-validation, built and deployed the Streamlit app, wrote the tests, and audited my own work, correcting the issues described above.',
  },
  {
    num: '12',
    title: 'Tools and Skills',
    type: 'tags',
    groups: [
      {
        label: 'Tools',
        items: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'imbalanced-learn', 'matplotlib', 'seaborn', 'Streamlit', 'Plotly', 'pytest', 'Jupyter', 'Git/GitHub'],
      },
      {
        label: 'Skills shown',
        items: ['Churn Analysis', 'Classification', 'Cross-Validation', 'SMOTE Inside Training Folds', 'Data Leakage Prevention', 'Feature Engineering', 'Data Cleaning', 'Model Evaluation (ROC-AUC, Precision, Recall)', 'Model Deployment', 'Automated Testing'],
      },
    ],
  },
  { num: '13', title: 'Links', type: 'links' },
    ];
