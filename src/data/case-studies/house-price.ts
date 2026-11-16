import type { CaseStudySection } from '../../types/project';

/**
 * The House Price Prediction case study body. It lives in its own module so Vite emits it as a
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
      'Property prices are often judged by subjective comparisons or a single number such as price per unit of area, which ignores layout, stories, parking, road access and furnishing all at once. I used 545 houses to ask three questions: which attributes move with price, whether a tuned Random Forest beats a standardised linear baseline on a dataset this small, and whether the whole pipeline can be built cleanly enough to audit and reproduce. This is an analytical exercise, not a valuation tool.',
      'Answer: area, bathrooms and the engineered luxury score move most with price, a plain Linear Regression beat the tuned Random Forest on this split (test R² 0.6583 against 0.5977), and the pipeline is documented and audited.',
    ],
  },
  {
    num: '02',
    title: 'Data',
    type: 'kv',
    items: [
      ['Source', 'Housing Prices dataset (Kaggle)'],
      ['Grain', 'One row per house'],
      ['Size', '545 houses; 13 raw columns (price plus 12 attributes); 0 missing values and 0 duplicate rows'],
      ['Attributes', 'Area, bedrooms, bathrooms, stories, parking, six yes/no features (main road, guest room, basement, hot water heating, air conditioning, preferred area) and furnishing status'],
      ['Units', 'Price and area carry no currency or measurement unit in the source, so everything is reported in dataset units'],
    ],
  },
  {
    num: '03',
    title: 'Pipeline',
    type: 'kv',
    items: [
      ['Cleaning', 'Checked for missing values and duplicates, audited the categories of every text column, mapped six yes/no columns to 1 and 0, and one-hot encoded furnishing status, dropping one level to avoid a redundant dummy column.'],
      ['Features', 'Three engineered features: bed_bath_count (bedrooms + bathrooms), area_per_bed_bath (area divided by that count) and luxury_score (a count of five amenities: air conditioning, hot water heating, preferred area, guest room, basement).'],
      ['Split and scaling', 'An 80/20 split with a fixed seed: 436 training houses and 109 test houses. StandardScaler was fitted on the training rows only, so no test information leaks into training.'],
      ['Models', 'Linear Regression on the scaled features, and a Random Forest tuned by 5-fold cross-validated grid search over 108 combinations (540 fits) on the training rows. Best forest: 100 trees, max depth 7, minimum 2 houses per leaf; best cross-validated R² 0.6351.'],
      ['Evaluation', 'MAE, RMSE and R² for both models on the same 109 held-out houses, plus training scores to check for overfitting.'],
      ['Artifacts', 'Both models and the scaler saved with joblib, with library versions pinned to match.'],
    ],
  },
  {
    num: '04',
    title: 'Findings',
    type: 'list',
    items: [
      'Price is right-skewed: the mean is 4,766,729 against a median of 4,340,000 (skewness +1.21), with a tail up to 13,300,000. A log transform brings skewness down to +0.14.',
      'The strongest correlations with price are area (+0.54), bathrooms (+0.52), luxury_score (+0.51), bed_bath_count (+0.51) and air conditioning (+0.45). Unfurnished status is the one clear negative (-0.28). These are associations, not causes.',
      'Several features overlap: bed_bath_count correlates +0.89 with bedrooms and +0.75 with bathrooms, and luxury_score is built from five amenity columns.',
      'In the Random Forest, area carries 46.2% of the importance, and the three engineered features together carry 23.4%.',
      'In the linear model, area has the largest standardised coefficient: +946,722 per standard deviation of area.',
      'At a given area, unfurnished houses sit lower in price. This is descriptive.',
      'Both models underpredict the most expensive houses. The two test houses priced above 12 million (12.2M and 13.3M) were predicted at roughly 7M to 8.5M, which pushes RMSE well above MAE.',
    ],
  },
  {
    num: '05',
    title: 'Model Comparison',
    type: 'kv',
    items: [
      ['Linear Regression', 'Test R² 0.6583, MAE 966,320, RMSE 1,314,226. Training R² 0.6896, a gap of 0.0313.'],
      ['Random Forest, tuned', 'Test R² 0.5977, MAE 1,049,055, RMSE 1,426,042. Training R² 0.8784, a gap of 0.2807, which is clear overfitting.'],
      ['Difference', 'Linear Regression is better on all three test metrics: R² higher by 0.0606, MAE lower by 82,735 (7.89%) and RMSE lower by 111,816 (7.84%).'],
      ['Scale', "The linear model's average miss (MAE 966,320) is about 20% of the mean price (4,766,729)."],
    ],
    after: 'Why the linear model held up, as hypotheses I did not test: price rises fairly smoothly with area, bathrooms, stories and amenities; 436 training houses leave few houses per forest leaf, so deep trees can memorise noise; and my area-per-room ratio gave the linear model an interaction term. This is one 80/20 split with 109 test houses, so the 0.06 gap in R² is a result for this split, not a general ranking of the two methods.',
  },
  {
    num: '06',
    title: 'Mistakes I Caught and Corrected',
    type: 'list',
    divider: 'rule',
    items: [
      "Unverified units: my first version labelled prices in rupees and area in square feet. The source documents neither, so I removed every currency symbol and unit, relabelled the charts \"dataset units,\" and regenerated them.",
      "A check that could not fail: my test for leftover text columns used select_dtypes(include='object'), which returns nothing under pandas 3.0 string types even if strings remain. I replaced it with select_dtypes(exclude='number').",
      'A heatmap title that contradicted its colours: the title said green means positive and red negative, but the palette has no red. I corrected the title and regenerated the chart.',
      'Paths that only worked from one folder: the notebook failed when launched from the repository root. I resolve the project root with pathlib so it runs from either folder.',
      'Documentation drift: an early README listed files that did not exist and described an outlier check I never ran, and the notebook summary called regression results "accuracy" and left out RMSE. I rewrote both to match the repository and report MAE, RMSE and R² together.',
      'Unpinned libraries: the saved models were serialised with specific library versions, so I pinned those versions in requirements.txt.',
    ],
  },
  {
    num: '07',
    title: 'Visual Evidence',
    type: 'figures',
    items: [
      {
        src: '/projects/house-price/hp-actual-vs-predicted.webp',
        alt: 'Two scatter plots of actual against predicted house prices on the 109 test houses, Linear Regression on the left (R² 0.6583) and Random Forest on the right (R² 0.5977), each with a dashed perfect-prediction diagonal; both models track the diagonal for prices below about 7 million and fall well below it for the most expensive houses.',
        caption: 'Actual versus predicted price on the 109 test houses, in dataset units. Python (matplotlib, seaborn).',
        w: 1584,
        h: 702,
      },
      {
        src: '/projects/house-price/hp-feature-importance.webp',
        alt: 'Horizontal bar chart of Random Forest feature importance: area is largest at 0.462, then bed_bath_count 0.100, bathrooms 0.085, luxury_score 0.081 and area_per_bed_bath 0.054, with every other feature below 0.05.',
        caption: 'Random Forest feature importance (impurity-based). It shows what the model used, not what causes price.',
        w: 1470,
        h: 1020,
      },
      {
        src: '/projects/house-price/hp-price-vs-area.webp',
        alt: 'Scatter plot of house price against area, coloured by furnishing status; price rises with area, and unfurnished houses sit toward the lower price band.',
        caption: 'Price against area by furnishing status, in dataset units. Descriptive, not causal.',
        w: 1584,
        h: 998,
      },
      {
        src: '/projects/house-price/hp-price-distribution.webp',
        alt: 'Two histograms of house price: the raw distribution on the left is right-skewed, with a mean of 4.77 million above a median of 4.34 million, and the log-transformed distribution on the right is close to symmetric.',
        caption: 'Price distribution before and after a log transform, in dataset units.',
        w: 1584,
        h: 586,
      },
      {
        src: '/projects/house-price/hp-correlation.webp',
        alt: 'Lower-triangle correlation heatmap of price and 16 features; area (0.54), bathrooms (0.52), luxury_score (0.51) and bed_bath_count (0.51) correlate most strongly with price, and unfurnished status is negative (-0.28).',
        caption: 'Pearson correlations among price and the 16 features. Several features overlap by construction.',
        w: 1584,
        h: 1240,
      },
    ],
  },
  {
    num: '08',
    title: 'Limitations and Next Steps',
    type: 'list',
    items: [
      'The data is 545 houses and a single 80/20 split with 109 test houses, so scores depend on the split and the gap between the two models is small.',
      'Price and area have no documented unit, and the data has no location, age, build quality or market conditions, so about a third of the variation in price (R² 0.66) is left unexplained.',
      'Both models underpredict the most expensive houses, and both give point estimates only, with no prediction intervals.',
      'Two engineered features are exact sums of existing columns, so the design matrix has rank 14 of 16. Predictions are unaffected, but individual linear coefficients share weight and should not be read one by one.',
      'Everything here is association; no claim about cause is made.',
    ],
    after: 'Next steps: repeated cross-validation for both models to test whether the gap holds, a log-transformed target, and prediction intervals.',
  },
  {
    num: '09',
    title: 'What I Did',
    type: 'para',
    text: 'Solo project. I cleaned and encoded the data, engineered the three features, built and tuned both models, evaluated them on a held-out set, produced the five charts, and audited my own notebook and README, correcting the issues described above.',
  },
  {
    num: '10',
    title: 'Tools and Skills',
    type: 'tags',
    groups: [
      {
        label: 'Tools',
        items: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'matplotlib', 'seaborn', 'joblib', 'Jupyter', 'Git/GitHub'],
      },
      {
        label: 'Skills shown',
        items: ['Regression Modelling', 'Feature Engineering', 'Data Cleaning', 'Leakage-Free Train/Test Split', 'Hyperparameter Tuning', 'Overfitting Diagnostics', 'Model Evaluation (MAE, RMSE, R²)', 'Exploratory Analysis', 'Correlation Analysis'],
      },
    ],
  },
  { num: '11', title: 'Links', type: 'links' },
    ];
