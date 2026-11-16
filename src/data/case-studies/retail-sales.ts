import type { CaseStudySection } from '../../types/project';

/**
 * The Retail Sales Analysis case study body. It lives in its own module so Vite emits it as a
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
      'Raw transaction rows are hard for a business team to read, and high sales do not guarantee healthy profit. One order can hold several line items, so counting rows overstates orders. I analysed the Sample Superstore data to separate revenue from profit quality: which categories, sub-categories, regions and months drive sales, and where margin is thin or negative. I then packaged the answers in a Power BI report that a manager can filter by region. The work is descriptive: it points to where to investigate, not to what caused a loss.',
      'Answer: revenue and profit quality diverge. Technology and Office Supplies keep about 17% of sales as profit, Furniture keeps 2.49%, and Tables, Bookcases and Supplies lose money; the Power BI report lets a manager filter these views by region, and the next step is to investigate the causes.',
    ],
  },
  {
    num: '02',
    title: 'Data',
    type: 'kv',
    items: [
      ['Source', 'Sample Superstore retail dataset (public Kaggle and Tableau Community distribution)'],
      ['Grain', 'One row per order line item; a single order can have several lines'],
      ['Size', '9,994 line items from 5,009 distinct orders and 793 customers, in 21 raw columns'],
      ['Period', 'Orders dated 2014-01-03 to 2017-12-30'],
      ['Quality', '0 missing values and 0 duplicate rows in the 21 raw columns'],
      ['Derived', 'Five added columns (order year, order month, month name, weekday and shipping duration), making 26 columns; shipping took 0 to 7 days, about 3.96 on average'],
    ],
  },
  {
    num: '03',
    title: 'Pipeline: Python → Power BI',
    type: 'kv',
    items: [
      ['Python', 'Read the raw file with the correct Windows-1252 encoding, checked shape, types, missing values and duplicates, parsed the dates, added the calendar and shipping columns, wrote a prepared CSV and exported six charts at 300 DPI.'],
      ['Power BI', 'A report built on that prepared CSV, with a region slicer, KPI cards, profit by sub-category, a state map, sales by category and a calendar-month sales chart.'],
      ['DAX', 'Three explicit measures: Total Revenue, Total Profit and Total Orders. Total Orders uses DISTINCTCOUNT of Order ID, so an order with several lines counts once.'],
      ['Handoff', 'The prepared CSV is the data contract between Python and Power BI.'],
    ],
  },
  {
    num: '04',
    title: 'Data Quality: Found and Fixed',
    type: 'list',
    divider: 'rule',
    items: [
      'Encoding: the raw CSV failed to load as UTF-8 (a UnicodeDecodeError). I specified Windows-1252 instead of dropping characters.',
      'Rows are not orders: 9,994 rows are order lines, not orders. I report 9,994 line items and 5,009 distinct orders separately, and the Power BI order count uses DISTINCTCOUNT.',
      'Monthly chart title: pooling January to December across four years shows seasonality, not a year-over-year trend. I titled the chart "Sales by Calendar Month (2014–2017 combined)."',
      'Chart scale: sales and profit on one axis made the profit bars negligible, so the category chart uses two side-by-side panels with independent axes.',
      "Clipped labels: the region chart's value labels were cut off at the plot edge, so I added axis margin and checked the exported image.",
      'Paths and housekeeping: the notebook failed when run from another folder, so I resolve the project root in code. I also removed unused dependencies and README merge-conflict markers and kept one canonical chart filename.',
    ],
  },
  {
    num: '05',
    title: 'Findings',
    type: 'list',
    items: [
      'Total sales are $2,297,200.86 and total profit is $286,397.02, an overall margin of 12.47%.',
      'Sales alone mislead: Technology leads with $836,154 in sales and $145,455 in profit (17.40% margin), Office Supplies has $719,047 in sales and $122,491 in profit (17.04%), but Furniture has $741,999.80 in sales and only $18,451 in profit (2.49%).',
      'Three of 17 sub-categories lose money: Tables (-$17,725.48), Bookcases (-$3,472.56) and Supplies (-$1,189.10). Copiers is the most profitable at about $55.6K.',
      'West has the most sales ($725,458, profit $108,418) and Central has the weakest margin (7.92%) despite $501,240 in sales. East has $678,781 in sales and South has $391,722.',
      'California is the top state by sales ($457,688).',
      'November has the highest pooled calendar-month sales ($352,461). This is a seasonal pattern across 2014–2017 combined, not proof that November led in every year.',
      'Consumer accounts for 50.6% of sales, Corporate for 30.7% and Home Office for 18.7%. That is revenue mix, not profitability.',
    ],
  },
  {
    num: '06',
    title: 'Where I Would Look Next',
    type: 'list',
    items: [
      "Investigate Furniture at product and order level, because its 2.49% margin is far below Technology's 17.40% and Office Supplies' 17.04%.",
      'Review discounts, pricing, fulfilment cost and product mix for Tables, Bookcases and Supplies first.',
      "Judge regions by margin as well as sales: Central's 7.92% margin means volume alone is not a sufficient performance signal.",
      'Treat November as a seasonal planning clue, and validate it year by year before any staffing or inventory decision.',
    ],
    after: 'These are places to investigate, not conclusions. I did not analyse discounts, costs or returns, so this project cannot say what causes the thin or negative margins.',
  },
  {
    num: '07',
    title: 'Power BI Report',
    type: 'para',
    text: 'The Power BI report opens with three KPI cards (total revenue, total profit and total orders) and lets a viewer filter every visual by region: profit by sub-category, revenue by state on a map, sales by category and sales by calendar month. Three explicit DAX measures define the KPIs, and Total Orders counts each order once with DISTINCTCOUNT.',
  },
  {
    num: '08',
    title: 'Visual Evidence',
    type: 'figures',
    items: [
      {
        src: '/projects/retail-sales/rs-pbi-dashboard.webp',
        alt: 'Power BI Retail Sales Analysis Dashboard: three KPI cards (total revenue, total profit and total orders), profit by sub-category, a map of revenue by state, a region slicer with Select all, Central, East, South and West, sales by category, and sales by calendar month.',
        caption: 'Power BI report. The region slicer filters every visual.',
        w: 1392,
        h: 781,
      },
      {
        src: '/projects/retail-sales/rs-category-sales-profit.webp',
        alt: 'Two bar charts side by side: sales by category (Furniture about $742K, Office Supplies about $719K, Technology about $836K) and profit by category (Furniture about $18K, Office Supplies about $122K, Technology about $145K).',
        caption: 'Sales and profit by category on separate axes. Furniture sells almost as much as the others but keeps far less profit.',
        w: 1584,
        h: 666,
      },
      {
        src: '/projects/retail-sales/rs-profit-by-subcategory.webp',
        alt: 'Horizontal bar chart of profit by sub-category, from Copiers (about $55.6K, the highest) down to Tables (about -$17.7K), with Bookcases and Supplies also negative and a dashed zero line separating green profit bars from red loss bars.',
        caption: 'Profit by sub-category. Red bars are loss-making: Tables, Bookcases and Supplies.',
        w: 1584,
        h: 780,
      },
      {
        src: '/projects/retail-sales/rs-sales-by-region.webp',
        alt: 'Horizontal bar chart of total sales by region: West $725,458, East $678,781, Central $501,240 and South $391,722.',
        caption: 'Total sales by region. Central has the weakest margin (7.92%) despite its sales volume.',
        w: 1584,
        h: 778,
      },
      {
        src: '/projects/retail-sales/rs-sales-by-calendar-month.webp',
        alt: 'Line chart of total sales by calendar month, 2014 to 2017 combined, lowest in February at about $60K and peaking in November at about $352K, with the November peak labelled.',
        caption: 'Sales pooled by calendar month across all four years. A seasonal pattern, not a year-over-year trend.',
        w: 1584,
        h: 778,
      },
    ],
  },
  {
    num: '09',
    title: 'Limitations and Next Steps',
    type: 'list',
    items: [
      'This is historical sample data: there is no live feed, no scheduled refresh and no forecasting.',
      'Month patterns pool four years, so they show seasonality, not a chronological trend.',
      "Category and sub-category totals can hide product and order variation: Furniture's 2.49% margin is an aggregate.",
      'The data has no cost or return detail, and I did not analyse discounts, so no cause of low or negative margins is claimed.',
      'A new user must download the raw dataset, rerun the notebook to regenerate the prepared CSV, and set the Power BI source path before refreshing.',
    ],
    after: 'Next steps: order-level and product-level drill-through in the report, a year-by-year check of the November peak, and a discount and cost analysis of the loss-making sub-categories.',
  },
  {
    num: '10',
    title: 'What I Did',
    type: 'para',
    text: 'Solo project. I inspected and prepared the data in Python, engineered the calendar and shipping features, produced the six charts, built the Power BI report and its DAX measures, and audited my own work, correcting the encoding, path, chart-scale, label and naming issues described above.',
  },
  {
    num: '11',
    title: 'Tools and Skills',
    type: 'tags',
    groups: [
      {
        label: 'Tools',
        items: ['Power BI', 'DAX', 'Power Query', 'Python', 'pandas', 'matplotlib', 'seaborn', 'Jupyter', 'Git/GitHub'],
      },
      {
        label: 'Skills shown',
        items: ['Business Intelligence Dashboards', 'DAX Measures', 'KPI Reporting', 'Exploratory Data Analysis', 'Profit Margin Analysis', 'Data Cleaning', 'Data Visualization', 'Seasonality Analysis'],
      },
    ],
  },
  { num: '12', title: 'Links', type: 'links' },
    ];
