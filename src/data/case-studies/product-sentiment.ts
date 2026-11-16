import type { CaseStudySection } from '../../types/project';

/**
 * The Product Review Sentiment Analysis case study body. It lives in its own module so Vite emits it as a
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
      'A star rating squeezes a whole review into one number, and nobody can read half a million comments. I wanted to know whether practical text-analysis methods can summarise a large review collection: how the language labels relate to star ratings, which products and years show higher negative shares, and which phrases rank highly in each group. The project is descriptive. It does not train a classifier, and I treat star ratings as a rough proxy for sentiment, not as ground truth.',
      'Answer: as a first-pass summary, yes, with limits: VADER labels 88.21% of reviews positive and agrees with a star-rating proxy on 80.38%, but it labels 49.47% of one-star reviews positive, so its labels need human checks before decisions.',
    ],
  },
  {
    num: '02',
    title: 'Data',
    type: 'kv',
    items: [
      ['Source', 'Amazon Fine Food Reviews (Stanford SNAP collection)'],
      ['Grain', 'One row per review'],
      ['Size', '568,454 reviews × 10 raw columns (about 300.9 MB); 17 columns in the processed file'],
      ['Period', '8 October 1999 to 26 October 2012'],
      ['Ratings', '1 star: 52,268; 2 stars: 29,769; 3 stars: 42,640; 4 stars: 80,655; 5 stars: 363,122'],
      ['Missing', '26 ProfileName and 27 Summary values; no other raw column has missing values'],
      ['Limit', 'There are no human-labelled sentiment values, so star ratings are the only comparison label'],
    ],
  },
  {
    num: '03',
    title: 'Pipeline',
    type: 'kv',
    items: [
      ['Cleaning', 'Two text paths. For VADER: strip HTML first, then URLs, and normalise whitespace while keeping the capitalisation, punctuation and emoticons VADER reads. For word and phrase analysis: lowercase, expand negative contractions, remove punctuation and digits, tokenise, and drop stopwords except "not", "no" and "nor".'],
      ['Scoring', 'VADER compound score from -1 to +1: at or above +0.05 is positive, at or below -0.05 is negative, and anything between is neutral. TextBlob polarity and subjectivity were computed as a comparison.'],
      ['Proxy', 'Star ratings mapped to three classes: 1 to 2 stars negative, 3 stars neutral, 4 to 5 stars positive.'],
      ['Summaries', 'Label mix by star rating, product, year and review length; word clouds; and TF-IDF phrases of two to three words from a balanced sample of 5,000 reviews per class.'],
      ['Outputs', 'A processed CSV, saved charts, a five-panel Plotly HTML dashboard and a Streamlit app that scores one typed review.'],
    ],
  },
  {
    num: '04',
    title: 'Data Quality: Found and Fixed',
    type: 'list',
    divider: 'rule',
    items: [
      'Cleaning that erased sentiment cues: aggressive cleaning removes the capitalisation, punctuation and negation that VADER reads, so I built a separate VADER path and kept "not", "no" and "nor" in the phrase path.',
      'HTML and URL order: removing URLs before HTML could swallow real words inside links, so I strip HTML first and added regression examples for links, negation and word corruption.',
      'Empty text read as neutral: a review that is empty after cleaning scores 0.0 and looks neutral, so I added a vader_empty flag and mark empty TextBlob results as missing. The current processed file has no such rows, but the guard stays.',
      'Fragile paths and schema: the notebook now finds the project root from either folder, uses a strict column drop and asserts the expected 17-column schema.',
    ],
  },
  {
    num: '05',
    title: 'Findings',
    type: 'list',
    items: [
      'VADER labels 501,419 reviews positive (88.21%), 55,646 negative (9.79%) and 11,389 neutral (2.00%).',
      'It agrees with the star-rating proxy on 80.38% of reviews, with 111,534 disagreements. That is agreement with a proxy, not accuracy against human-labelled sentiment.',
      "A baseline that labels every review positive would agree with the proxy on 78.07% (443,777 of 568,454, the four- and five-star reviews), so VADER's 80.38% is 2.3 points above that baseline, and TextBlob's 75.94% falls below it.",
      'Overall agreement hides the minority classes: from the confusion matrix, VADER matches the proxy on 95.2% of positive-proxy reviews but only 40.1% of negative-proxy and 3.8% of neutral-proxy reviews.',
      'VADER labels 49.47% of one-star reviews and 65.11% of two-star reviews positive, which shows a large mismatch between the text label and the rating.',
      'TextBlob agrees with the proxy on 75.94% (saved notebook output, not recomputable from the processed CSV), and mean TextBlob subjectivity is 0.5501.',
      'Among 5,030 products with at least 20 reviews, the highest VADER-negative share is 66.7% (16 of 24 reviews). That is a small-group share, not a quality verdict.',
      'Yearly positive share (years with at least 100 reviews, 2003 to 2012) runs from 86.27% in 2004 to 93.18% in 2003. These are descriptive differences, not causes.',
      'Positive reviews average 81.66 words, negative 75.69 and neutral 41.34. This is an association only.',
      'Top TF-IDF phrases overlap across classes: "not sure" and "grocery store" appear in the top phrases of more than one group, so a top phrase is not necessarily distinctive.',
    ],
  },
  {
    num: '06',
    title: 'How I Would Use These Results',
    type: 'list',
    items: [
      'Use VADER labels as a first-pass summary of a large review set, not as a verdict on any single review.',
      'Check low-rating reviews by hand: about half of one-star reviews get a positive text label.',
      'Compare products only above a minimum review count, and show the count next to every rate.',
      'Treat yearly and review-length differences as questions to investigate, not explanations.',
    ],
    after: 'Measuring true sentiment accuracy would need a stratified, human-labelled sample, which this project does not have.',
  },
  {
    num: '07',
    title: 'Mistakes I Caught and Corrected',
    type: 'list',
    divider: 'rule',
    items: [
      'Agreement called accuracy: I first described agreement with star ratings as accuracy. Stars are not human-labelled sentiment and the three-way mapping loses information, so I renamed it "agreement with the star-rating proxy."',
      'A confidence label that was not confidence: the app showed the absolute VADER compound score times 100 as "Confidence," which reads like a probability. I renamed it "Score Magnitude" and explained that it measures distance from neutral.',
      "A neutral example that was not neutral: the app's example review scored -0.092, which is negative under my thresholds. I replaced it with one that scores 0.000 and tested the examples against the real scoring function.",
      'Product and yearly claims that changed: earlier output named different products and years and implied quality rankings. I recomputed from the processed table, applied minimum sizes (20 reviews per product, 100 per year) and relabelled the measure "negative-label share."',
      'Word-frequency overreach: removing negators and calling phrases "distinctive" misled readers, so I kept negators and now describe results as top within-group phrases.',
      'Streamlit failures: the app imported functions that did not exist yet, and its example buttons did not fill the text box because widget state was set in the wrong order. I aligned the module and initialised state first.',
    ],
  },
  {
    num: '08',
    title: 'Dashboard and App',
    type: 'para',
    text: 'The Plotly dashboard has five panels: label mix, sentiment by star rating, yearly shares, products by negative share and top TF-IDF phrases. The Streamlit app scores one typed review with the shared cleaner, shows the VADER compound score, the label and the TextBlob measures, and labels the score magnitude as distance from neutral, not confidence. The dashboard loads Plotly.js from a CDN, so it needs a network connection.',
  },
  {
    num: '09',
    title: 'Visual Evidence',
    type: 'figures',
    items: [
      {
        src: '/projects/product-sentiment/sp-dashboard.webp',
        alt: 'Five-panel Plotly dashboard titled Amazon Food Reviews — Sentiment Analysis Dashboard: a donut chart of label shares, bars of sentiment by star rating, yearly sentiment share lines for 2003 to 2012, the top 10 products by VADER-negative share, and the top TF-IDF phrases for positive and negative reviews.',
        caption: 'Plotly dashboard (interactive HTML). The product and year panels apply minimum review counts.',
        w: 1400,
        h: 1200,
      },
      {
        src: '/projects/product-sentiment/sp-confusion-matrix.webp',
        alt: 'Three-by-three confusion matrix of star-rating proxy labels (rows) against VADER labels (columns): 422,423 positive-proxy reviews labelled positive, 45,240 negative-proxy reviews labelled positive, 33,756 neutral-proxy reviews labelled positive, and 32,879 negative-proxy reviews labelled negative.',
        caption: 'VADER labels against the star-rating proxy, raw counts. The proxy is not ground truth.',
        w: 1068,
        h: 876,
      },
      {
        src: '/projects/product-sentiment/sp-vader-by-stars.webp',
        alt: 'Heatmap of the percentage of reviews at each star rating that VADER labels positive, neutral or negative: 49.5% of one-star reviews and 65.1% of two-star reviews are labelled positive, rising to 95.8% at five stars.',
        caption: 'VADER label by star rating, as a percentage of each rating.',
        w: 1088,
        h: 726,
      },
      {
        src: '/projects/product-sentiment/sp-tfidf-phrases.webp',
        alt: 'Three bar charts of the top 15 TF-IDF phrases for positive, negative and neutral reviews: "highly recommend" leads the positive group and "not recommend" leads the negative group, and some phrases, such as "not sure" and "grocery store", appear in more than one group.',
        caption: 'Top within-group TF-IDF phrases (two to three words) from a balanced sample of 15,000 reviews. A top phrase is not necessarily unique to one group.',
        w: 1584,
        h: 594,
      },
    ],
  },
  {
    num: '10',
    title: 'Limitations and Next Steps',
    type: 'list',
    items: [
      'VADER and TextBlob are general lexicon methods and can miss sarcasm, mixed feelings and domain-specific language.',
      'Star ratings are an imperfect proxy, so 80.38% agreement is not accuracy.',
      'Positive reviews dominate (88.21%), so overall agreement can hide poor handling of negative reviews.',
      'Product and year summaries are descriptive and do not show product quality or causes.',
      "TextBlob's 75.94% comes from saved notebook output and cannot be recomputed from the processed CSV, which stores subjectivity but not polarity or labels.",
      'TF-IDF results depend on the 5,000-per-class sample, the cleaning and the settings.',
      'I have not shown a clean-machine rerun of the whole pipeline.',
    ],
    after: 'Next steps: a stratified, human-labelled sample to measure true accuracy, exporting TextBlob polarity and labels so its agreement can be recomputed, one script that regenerates every output, and automated tests for the shared cleaner.',
  },
  {
    num: '11',
    title: 'What I Did',
    type: 'para',
    text: 'Solo project. I cleaned and scored the reviews with VADER and TextBlob, designed the two cleaning paths, compared the labels with star ratings, built the product, yearly, length and TF-IDF summaries, created the Plotly dashboard and the Streamlit app, and audited my own work, correcting the labelling and cleaning issues described above.',
  },
  {
    num: '12',
    title: 'Tools and Skills',
    type: 'tags',
    groups: [
      {
        label: 'Tools',
        items: ['Python', 'pandas', 'NumPy', 'VADER', 'TextBlob', 'NLTK', 'scikit-learn', 'matplotlib', 'seaborn', 'Plotly', 'Streamlit', 'Jupyter', 'Git/GitHub'],
      },
      {
        label: 'Skills shown',
        items: ['Sentiment Analysis', 'Text Preprocessing', 'TF-IDF', 'Exploratory Data Analysis', 'Data Cleaning', 'Data Visualization', 'Interactive Dashboards', 'Metric Interpretation', 'Edge-Case Testing'],
      },
    ],
  },
  { num: '13', title: 'Links', type: 'links' },
    ];
