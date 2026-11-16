import type { CaseStudySection } from '../../types/project';

/**
 * The Rossmann Store Sales Forecasting case study body. It lives in its own module so Vite emits it as a
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
      'Retail sales move with weekday, promotions, holidays, season and store characteristics. A forecast of the next 12 weeks can inform broad staffing and inventory-capacity planning: overestimating can mean excess labour or stock, underestimating can mean shortfalls. I built a store-level forecast for the 12 weeks after the data ends, compared two forecasting approaches on a time-ordered holdout, and presented the results in Power BI. No operational outcome or cost saving was measured, so the forecast is a planning proxy.',
      'Answer: the production model forecasts the next 84 days for all 1,115 stores, with an average percentage error of 6.72% on chain-wide daily sales and 12.93% on store-day sales; whether the forecast improves staffing or stock decisions was not tested.',
    ],
  },
  {
    num: '02',
    title: 'Data',
    type: 'kv',
    items: [
      ['Source', 'Rossmann Store Sales competition data (Kaggle)'],
      ['Grain', 'One row per store per day'],
      ['Size', '1,017,209 store-days for 1,115 stores, 2013-01-01 to 2015-07-31'],
      ['Tables', 'A daily sales table (sales, customers, open, promo and holiday flags) and a store table (store type, assortment, competition and recurring-promotion fields)'],
      ['Modelling set', '844,338 open, positive-sales store-days'],
      ['Holdout', '2015-05-09 to 2015-07-31 (84 days): 766,584 training rows and 77,754 validation rows'],
      ['Forecast', '2015-08-01 to 2015-10-23 (84 days) for 1,115 stores: 93,660 store-days'],
      ['Currency', 'The data gives no currency; Rossmann operates in Germany, so figures are probably euros.'],
      ['Not in the data', 'Product-level sales, prices, inventory, profit, future promotion schedules and future closure calendars'],
    ],
  },
  {
    num: '03',
    title: 'Pipeline: SQL → Excel → Python → Power BI',
    type: 'kv',
    items: [
      ['SQL (MySQL)', 'A relational schema (a store table and a train table keyed by store and date, with a foreign key), a load script that turns blank numeric fields into NULL, and seven query scripts: a filtered join, five analytical summaries (monthly sales by store type, per-store promo lift, top and bottom stores by revenue, month-over-month growth using LAG, seasonality by calendar month) and a full-data export.'],
      ['Excel', 'Preliminary pivot analysis (monthly totals, store-type averages) for a first profile. Later measures use average sales per open store-day, because monthly totals mix the number of open days with sales intensity.'],
      ['Python', 'Notebook 1 cleans and explores the data (imputation, row filtering, calendar features, six charts). Notebook 2 runs the Prophet and XGBoost experiments, the date-based validation, the production forecast and the saved models.'],
      ['Power BI', 'A four-page report on a star schema: a date dimension and three fact tables (history, validation predictions, future forecast), with eleven DAX measures.'],
    ],
  },
  {
    num: '04',
    title: 'Data Quality: Found and Fixed',
    type: 'list',
    divider: 'rule',
    items: [
      'Blank competition distances imported as zeros, which would have looked like a competitor at distance zero. The final load script converts blanks to NULL.',
      'Three missing competition distances were filled with the median across unique stores (2,325.0), not the row-weighted median (2,330.0), because the store table has one row per store.',
      'Removed 172,817 closed store-days and 54 open days with zero sales, leaving 844,338.',
      'Competition-open and Promo2 timing fields that are blank because they do not apply were left missing, not imputed.',
      'Added Month, Year and WeekOfYear, and one-hot encoded store type, assortment and promo interval, using the same encoding at forecast time.',
    ],
  },
  {
    num: '05',
    title: 'Exploratory Findings',
    type: 'list',
    items: [
      'Store type B has the highest average sales per open store-day (about 10.2K, against 6.8K to 6.9K for the other types), but it has only 17 stores and differs in assortment and opening pattern. This is descriptive, not a type effect.',
      'Promo days average higher sales in 1,114 of 1,115 stores. Promotion assignment is not random, so this is an association, not a causal lift.',
      'Saturday is the weakest weekday per open store-day (about 5.9K); Monday and Sunday are the highest (about 8.2K each). Sunday looks strong per open store but weak chain-wide, because few stores open.',
      'December has the highest average sales per open store-day (about 8.6K, against about 6.5K to 7.2K in other months), but the data contains only two Decembers, so seasonal certainty is limited.',
      'Competition distance has no simple relationship with average store sales. The highest-selling stores sit at short distances, which may reflect dense, high-traffic locations and not a competitor effect.',
    ],
  },
  {
    num: '06',
    title: 'Model Comparison',
    type: 'kv',
    items: [
      ['Prophet, baseline', '63.76% chain-wide daily MAPE (MAE 857,491; RMSE 1,418,151)'],
      ['Prophet, German public holidays', '32.89% (MAE 607,088; RMSE 920,710). Kept as the Prophet comparator.'],
      ['Prophet, tuned', '22.48% MAPE, but MAE 662,991 and RMSE 968,381 are both worse than the holiday-aware model, so it was not selected. Three settings changed together, so the cause is not isolated.'],
      ['XGBoost, chain-wide daily', '6.72% (MAE 409,790; RMSE 617,347) for the production model.'],
      ['XGBoost, store-day', '21.00% default; 17.92% after manual tuning; 12.64% with Promo and a store-level baseline (not usable, no future Promo schedule); 12.93% production without Promo (MAE 839; RMSE 1,138).'],
      ['Prophet + XGBoost blends', '50/50: 17.99%. 80/20 toward XGBoost: 10.20%. XGBoost alone: 6.72%. Prophet did not improve the chain-wide forecast.'],
    ],
    after: 'Like for like: XGBoost store-day predictions were summed by date and compared with Prophet on chain-wide daily totals (6.72% against 32.89%). The 12.93% store-day figure answers a harder, different question and is not compared with Prophet. Production XGBoost leaves out Promo because future promotions are unknown. The same 84-day holdout was used to choose between variants, so the scores are mildly optimistic. The randomised search (15 combinations, date-grouped expanding-window folds) selected n_estimators=200 and max_depth=6.',
  },
  {
    num: '07',
    title: 'Mistakes I Caught and Corrected',
    type: 'list',
    items: [
      'Mismatched grain: my first comparison put Prophet\'s chain-wide daily score next to XGBoost\'s store-day score. Summing XGBoost predictions by date made it like for like: 32.89% against 6.72%.',
      'Wrong validation split: an early split took the last 84 rows, not the last 84 dates across all stores. A date mask replaced it, giving 766,584 training and 77,754 validation rows.',
      'Prophet error diagnosis: a 63.76% MAPE looked like general failure, but sorting the errors showed the worst days (May 14 and May 25, 2015) were near-total closures (97.1% and 97.0% of stores closed). Adding a German public-holiday calendar brought MAPE to 32.89%.',
      'Weekday encoding: training weekdays ran 1 to 7 while pandas uses 0 to 6, which would have shifted future-date features by a day. I aligned them and added assertions in Notebook 2.',
      'Dashboard scatter: it collapsed to four store-type points because it had no store identifier. A per-store category restored one point per store.',
      'Overclaims withdrawn: March and July month-over-month changes (March 2014 +7.88%, July 2014 -8.50%) are not a recurring seasonal lift; Sunday is not the weakest day (it is low chain-wide because stores are closed); and promotions do not help every store, since one store shows a negative lift.',
    ],
  },
  {
    num: '08',
    title: 'Forecast and Dashboard',
    type: 'para',
    paras: [
      'Production XGBoost was refit without Promo on all history and predicted sales for every store on each of the 84 future days: 1,115 stores × 84 dates = 93,660 store-days. PredictedSales is the estimate if the store is open. ExpectedSales multiplies it by OpenRate, the store\'s historical share of open days for that weekday.',
      'Expected sales over the 84 days: 571,208,572. If every store were open: 677,183,104 (an upper scenario). Sales are in the source data units; the currency is probably euros.',
      'Sanity check, not validation: for the 931 stores that traded normally over the same 84 days of 2014, expected 2015 sales are 480.2M against 451.0M actual in 2014 (+6.5%).',
      'The Power BI report has four pages: Executive Overview; Store Performance (competitor distance against sales, one point per store, and stores ranked by revenue); Promotions & Seasonality; and 12-Week Forecast (validation metrics, actual versus predicted, the 84-day forecast and a model-selection note).',
    ],
  },
  {
    num: '09',
    title: 'Visual Evidence',
    type: 'figures',
    items: [
      {
        src: '/projects/rossmann/ros-pbi-forecast.webp',
        alt: 'Power BI page titled 12-Week Sales Forecast — XGBoost: tiles for validation MAE 839, RMSE 1,138, store-day MAPE 12.93% and open-rate-weighted expected revenue 571.21M, above an 84-day forecast chart and an actual-versus-predicted chart for the validation period.',
        caption: 'Power BI, 12-Week Forecast page. Validation metrics are for the production model (no Promo).',
        w: 1440,
        h: 652,
      },
      {
        src: '/projects/rossmann/ros-pbi-overview.webp',
        alt: 'Power BI page titled Rossmann Sales Performance — Executive Overview: tiles for total revenue 6bn, total customers 644M, average sales per open store-day 6.96K and total stores 1,115, a monthly revenue trend for 2013 to 2015, average sales per open store-day by store format, and slicers for store type, promo and year.',
        caption: 'Power BI, Executive Overview page.',
        w: 1377,
        h: 772,
      },
      {
        src: '/projects/rossmann/ros-pbi-stores.webp',
        alt: 'Power BI page titled Store Performance & Competitive Positioning: a scatter of competition distance against average sales per open store-day with one point per store, a table of all stores ranked by revenue, tiles for top-10 average revenue and chain average revenue per store, and bar charts of the top 10 and bottom 10 stores by revenue.',
        caption: 'Power BI, Store Performance page. Competitor distance is shown as an association, not a cause.',
        w: 1435,
        h: 802,
      },
      {
        src: '/projects/rossmann/ros-forecast-chainwide.webp',
        alt: 'Line chart of predicted chain-wide daily sales from 2015-08-01 to 2015-10-23 for the production model, with one line for every store open and one for open-rate-weighted expected sales; the expected line drops sharply each week.',
        caption: '12-week forecast, production model. Orange is expected sales weighted by each store\'s historical weekday open rate; the weekly dips are Sundays, when few stores open. Point estimates only.',
        w: 1584,
        h: 652,
      },
      {
        src: '/projects/rossmann/ros-promo-storetype.webp',
        alt: 'Grouped bar chart of average sales per open store-day by store type (a, b, c, d), with and without promotion; promo days are higher in every store type.',
        caption: 'Average sales per open store-day, promo versus non-promo, by store type. An association, not a causal estimate: promotion assignment is not random.',
        w: 1182,
        h: 734,
      },
      {
        src: '/projects/rossmann/ros-feature-importance.webp',
        alt: 'Horizontal bar chart of XGBoost feature importance for the production model without Promo; the store-level baseline (StoreMeanSales) is the largest, followed by week of year, day of week and month.',
        caption: 'Feature importance, production XGBoost (no Promo). Model-internal importance, not a causal effect.',
        w: 1183,
        h: 884,
      },
    ],
  },
  {
    num: '10',
    title: 'Limitations and Next Steps',
    type: 'list',
    items: [
      'The production model gives point estimates only, with no prediction intervals.',
      'The data spans about 2.6 years, so annual seasonality is weakly supported.',
      'The 84-day holdout was reused to choose between variants and there is no untouched test period, so the scores are mildly optimistic.',
      'There is no future promotion schedule, so Promo is excluded from the production model.',
      'OpenRate is a weekday-level historical average. It does not model closure schedules or public-holiday closures.',
      'No business impact was measured.',
      'The repository\'s Query 7 export is incomplete (48,328 of 1,017,209 rows); Notebook 1 reads the separate full merged file. The raw competition CSVs are not committed.',
    ],
    after: 'Next steps: an untouched test period or rolling-origin evaluation; known calendar, closure or promotion data only if available at forecast time; prediction intervals; and measuring operational value once a forecast is used.',
  },
  {
    num: '11',
    title: 'What I Did',
    type: 'para',
    text: 'Solo project. I wrote the SQL schema, load script and queries; profiled the data in Excel; cleaned and explored it in Python; compared Prophet and XGBoost on a time-ordered holdout; built the 12-week forecast; and built the four-page Power BI report. I also caught and corrected the grain mismatch, the validation split and the weekday-encoding error described above.',
  },
  {
    num: '12',
    title: 'Tools and Skills',
    type: 'tags',
    groups: [
      {
        label: 'Tools',
        items: ['SQL (MySQL)', 'Excel', 'Power BI', 'DAX', 'Python', 'pandas', 'scikit-learn', 'XGBoost', 'Prophet', 'Jupyter', 'Git/GitHub'],
      },
      {
        label: 'Skills shown',
        items: ['Forecasting', 'Time-Series Validation', 'Model Evaluation (MAPE, MAE, RMSE)', 'Error Analysis', 'SQL Window Functions', 'Data Cleaning', 'Feature Engineering', 'Exploratory Analysis', 'DAX Measures', 'Dashboard Design'],
      },
    ],
  },
  { num: '13', title: 'Links', type: 'links' },
    ];
