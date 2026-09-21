# Thota Venkata Vishnu Vardhan

**Data Analyst / Data Scientist**

> Data analyst and scientist building end-to-end solutions — from exploratory analysis and
> machine learning to deployed applications and interactive dashboards.

This repository is the source of my personal portfolio site: a case-study-driven overview of
selected data work, two live applications, certifications, education, and contact details.

[![React 18.3](https://img.shields.io/badge/React-18.3-149eca?style=flat-square)](https://react.dev)
[![TypeScript 5.6](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=flat-square)](https://www.typescriptlang.org)
[![Vite 5.4](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square)](https://vitejs.dev)

**Links:** [GitHub](https://github.com/Venkatavishnuvardhanthota) ·
[LinkedIn](https://www.linkedin.com/in/venkata-vishnu-vardhan-thota) ·
[Email](mailto:venkatavishnuvardhanthota@gmail.com) ·
[Résumé (PDF)](public/resume/VishnuThota_CV.pdf)

---

## Contents

- [Selected Work](#selected-work)
- [Deployed Applications](#deployed-applications)
- [Skills](#skills)
- [Certifications](#certifications)
- [Education](#education)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Implementation Notes](#implementation-notes)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Selected Work

Seven data projects, each presented on the site as a structured case study — problem, data,
approach, results, and the reasoning behind them. Every metric below is taken from the project
itself; nothing is estimated. Source code for all seven is public.

| # | Project | Focus | Headline result | Stack |
|---|---------|-------|-----------------|-------|
| 01 | [Rossmann Store Sales Forecasting](https://github.com/Venkatavishnuvardhanthota/rossmann-sales-forecasting) | Forecasting | **17.13%** store-day MAPE on an 84-day chronological holdout; **8.20%** chain-wide daily MAPE · 1,115 stores | Prophet, XGBoost, Pandas, Scikit-learn |
| 02 | [Marketing A/B Testing Analysis](https://github.com/Venkatavishnuvardhanthota/ab-testing-analysis) | Experimentation | **+43.1%** relative conversion lift on 588,101 records · two-proportion z-test, z = 7.37, p = 1.71e-13 | Python, Pandas, statistical testing |
| 03 | [Customer Churn Prediction](https://github.com/Venkatavishnuvardhanthota/customer-churn-prediction) | Classification | **AUC-ROC 0.8343** · 7,043 customers, 21 features, SMOTE-rebalanced | Random Forest, Scikit-learn, Streamlit |
| 04 | [Product Review Sentiment Analysis](https://github.com/Venkatavishnuvardhanthota/product-sentiment-dashboard) | NLP | **568,454** reviews analyzed · 88.2% positive · 79.6% VADER agreement with star ratings | VADER, TextBlob, TF-IDF, Plotly |
| 05 | [Retail Sales Analysis](https://github.com/Venkatavishnuvardhanthota/retail-sales-dashboard) | Business intelligence | Technology leads at **$0.84M** revenue; Tables and Bookcases identified as loss-making | Python, Pandas, Power BI |
| 06 | [Banking Churn Analysis](https://github.com/Venkatavishnuvardhanthota/banking-churn-analysis) | SQL / BI | **16.07%** attrition, **$13.24M** revenue at risk across 10,127 customers; transaction count is the strongest signal (r = −0.37) | MySQL, CTEs & window functions, Power BI / DAX |
| 07 | [House Price Prediction](https://github.com/Venkatavishnuvardhanthota/House_Price_Prediction) | Regression | **R² 0.6583**, MAE ≈ **₹970,043** on 545 property records | Linear Regression, Random Forest, GridSearchCV |

Each project route (`/projects/:id`) renders its case study from typed data, including
deterministic inline-SVG charts generated from the verified metrics.

---

## Deployed Applications

Two projects shipped as interactive, publicly reachable applications. These are the pieces of the
portfolio a visitor can actually use.

### Customer Churn Prediction

Score a customer profile in the browser against a Random Forest model rebalanced with SMOTE.

- **Live:** <https://customer-churn-prediction-0001.streamlit.app/>
- **Metric:** AUC-ROC **0.8343** · 7,043 customers · 21 input features
- **Stack:** Python · Scikit-learn · Random Forest · SMOTE · Streamlit
- **Source:** [customer-churn-prediction](https://github.com/Venkatavishnuvardhanthota/customer-churn-prediction)

### Product Review Sentiment Analysis

Explore sentiment across a large review corpus and score individual reviews interactively.

- **Live:** <https://prduct-sentiment-dashboard.streamlit.app/>
- **Metric:** **568,454** Amazon food reviews analyzed
- **Stack:** Python · VADER · TextBlob · TF-IDF · Plotly · Streamlit
- **Source:** [product-sentiment-dashboard](https://github.com/Venkatavishnuvardhanthota/product-sentiment-dashboard)

Section previews are screenshots captured directly from the live apps.

---

## Skills

Five disciplines, each mapped to the projects where it was actually applied.

| Area | Tools & techniques |
|------|--------------------|
| **Data Analytics** | Python, SQL, Pandas, NumPy, Excel, statistics, EDA, data cleaning & wrangling, A/B testing |
| **Machine Learning** | Scikit-learn, Logistic Regression, Random Forest, XGBoost, Prophet, feature engineering, SMOTE, cross-validation, AUC-ROC, model evaluation |
| **Data Visualization & BI** | Power BI, Tableau, Matplotlib, Seaborn, Plotly, DAX, dashboard development, KPI reporting |
| **Natural Language Processing** | NLTK, VADER, TextBlob, TF-IDF, WordCloud, sentiment analysis, text preprocessing |
| **Programming & Tools** | Java, Git, GitHub, Streamlit, Jupyter Notebook |

---

## Certifications

| Credential | Issuer | Date | Detail |
|------------|--------|------|--------|
| [IBM Data Science Professional Certificate](https://coursera.org/verify/professional-cert/4LEROUKB27HZ) | IBM · Coursera | April 7, 2026 | 12 courses — data science methodology, Python, SQL, analysis, visualization, machine learning, applied capstone |
| Data Analytics Job Simulation | Deloitte · Forage | January 10, 2026 | Certificate of Completion — data analysis, forensic technology |
| Databases for Developers: Foundations | Oracle | — | Certificate of Excellence, 100% grade |

Certificate PDFs are stored in [`public/certificates/`](public/certificates) and open from the
site's "View Certificate" links.

---

## Education

| # | Qualification | Institution | Period | Result |
|---|---------------|-------------|--------|--------|
| 01 | Diploma, Computer Science | Government Polytechnic College | 2021—2024 | CGPA 8.10 |
| 02 | B.Tech, Artificial Intelligence & Data Science | Study World College of Engineering | 2024—2027 (current) | CGPA 7.72 |

---

## Tech Stack

**Runtime & language**
- React 18.3 with TypeScript 5.6 (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- Vite 5.4 for development, bundling, and preview
- React Router 6 (`BrowserRouter`) for client-side case-study routing

**Styling**
- Hand-written CSS — one stylesheet per React island, plus shared design tokens defined in
  `index.html` (color, type scale, spacing, easing)
- No UI framework, component library, or CSS-in-JS runtime

**Fonts & assets**
- Hanken Grotesk (UI) and Newsreader (editorial accents), loaded from Google Fonts with
  `preconnect`; the hero portrait is `preload`ed
- Optimized WebP previews for application and certificate imagery

There is no backend, database, analytics script, environment variable, or third-party API key in
this project — it builds to static files only.

---

## Architecture

The site uses a **static shell with mounted React islands** rather than a full SPA or a single
hand-written page. Global structure, navigation, and typographic tokens live in `index.html`;
content-rich sections are React components portaled into placeholder roots at runtime.

```
index.html (static shell: nav, About, Skills, Footer, utilities)
   │
   ├── #hero-root           ← HeroSection
   ├── #root                ← ProjectsSection  (createRoot, the React entry)
   ├── #applications-root   ← DeployedApplications
   ├── #certifications-root ← CertificationsSection
   ├── #education-root      ← EducationSection
   └── #contact-root        ← ContactSection
```

`src/main.tsx` creates a single root inside one `BrowserRouter`; `src/App.tsx` renders the
Projects list inline and portals the remaining islands from the *same* tree. Because portaling
preserves React context, every island's `<Link>` participates in client-side navigation — a
second router would have broken shared history.

**Routing**

| Path | View |
|------|------|
| `/` | Portfolio home — all sections |
| `/projects/:id` | Full-page case study, layered over the home view |

The Projects list stays mounted while a case study is open, so scroll-reveal state survives
navigation. `:id` is one of `rossmann`, `ab-testing`, `customer-churn`, `product-sentiment`,
`retail-sales`, `banking-churn`, `house-price`.

**Content as data** — every visible fact is rendered from a typed module, so the site can be
updated without touching markup or styles:

| File | Exports |
|------|---------|
| `src/data/projects.ts` | `PROJECTS`, `getProjectById()` |
| `src/data/applications.ts` | `APPLICATIONS` |
| `src/data/certifications.ts` | `CERTIFICATIONS` |
| `src/data/education.ts` | `EDUCATION` |
| `src/data/contact.ts` | `CONTACT_LINKS`, `RESUME_URL` |

---

## Getting Started

**Prerequisites:** Node.js 18 or later (Vite 5 requirement) and npm.

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# type-check and produce a production build in dist/
npm run build

# serve the production build locally
npm run preview
```

Neither port is pinned in `vite.config.ts`, so Vite uses its defaults (5173 for `dev`, 4173 for
`preview`) and increments them if something is already listening; the URL each command prints is
the one to open.

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `vite` | Dev server with HMR |
| `npm run build` | `tsc && vite build` | Strict type-check, then emit static files to `dist/` |
| `npm run preview` | `vite preview` | Serve the built output for local verification |

There are no tests or lint scripts configured; `npm run build` is the verification gate, and it
fails on any TypeScript error.

---

## Project Structure

```
.
├── index.html                  # Static shell: head/SEO, tokens, nav, About, Skills, Footer, utilities
├── vite.config.ts              # Vite + React plugin
├── tsconfig.json               # Strict TypeScript, react-jsx, bundler resolution
├── public/
│   ├── hero-portrait.png       # 942×1128 cut-out portrait (used uncropped)
│   ├── resume/                 # VishnuThota_CV.pdf
│   ├── certificates/           # 3 certificate PDFs
│   ├── cert-previews/          # 3 WebP certificate previews
│   ├── app-previews/           # 2 WebP screenshots from the live apps
│   └── projects/               # empty placeholder (git keep)
└── src/
    ├── main.tsx                # Single createRoot + BrowserRouter
    ├── App.tsx                 # Islands + portal wiring + route table
    ├── pages/
    │   ├── Home.tsx            # Projects view (stays mounted)
    │   └── ProjectDetailPage.tsx
    ├── components/
    │   ├── hero/               # HeroSection
    │   ├── projects/           # ProjectsSection, ProjectRow, ProjectPreview,
    │   │                       #   ProjectDetail, visuals.ts (inline SVG)
    │   ├── applications/       # DeployedApplications, ApplicationCard
    │   ├── certifications/     # CertificationsSection, CertificationRow
    │   ├── education/          # EducationSection, EducationEntry
    │   └── contact/            # ContactSection, ContactLink
    ├── data/                   # Typed content: projects, applications,
    │                           #   certifications, education, contact
    ├── types/project.ts        # Project / case-study discriminated union
    └── styles/                 # One stylesheet per island
```

---

## Implementation Notes

Details that are enforced deliberately, and visible on the built page:

- **Scroll-reveal per island.** Each content island (Projects, Applications, Certifications,
  Education, Contact) runs its own `IntersectionObserver` over its `.reveal` children; the shell's
  observer runs once at parse time and cannot see nodes that mount later. Under
  `prefers-reduced-motion`, or where `IntersectionObserver` is unavailable, content is shown
  immediately instead of animating in.
- **Reload stability.** `scroll-behavior: smooth` is suppressed until the first user gesture, and
  `#hero-root` reserves its final height before React mounts, so browser scroll restoration
  lands on the right position instead of sliding after a reload.
- **Zoom-independent hero portrait.** The figure's width resolves to the minimum of three
  computed terms: a viewport-relative size clamped between 30rem and 48rem (so the subject holds
  its physical size as browser zoom changes), a text-collision guard measuring the clear space
  beside the intro column, and the vertical budget left after the oversized wordmark. Height then
  follows the source 942:1128 ratio at `height: auto` — the figure carries no `object-fit`, no
  fixed-height box and no clipping, so the scale may change but the crop cannot. The single
  `overflow: hidden` in the Hero is on the section root, where it clips the wordmark, not the
  portrait.
- **Responsive without new breakpoints.** Two thresholds — 1099px and 560px — plus a small nav
  adjustment at 400px. Below 1099px, hover-only affordances (certificate previews) are dropped
  rather than made tap-dependent.
- **Accessibility.** Landmark regions, `aria-labelledby` on every section, `aria-expanded` /
  `aria-controls` on the Skills accordion and mobile menu, focus management in the overlay
  dialog, `aria-current` on the in-progress degree, and descriptive `alt` text on photographic
  content (portrait, application screenshots, certificate previews).
- **Verified facts only.** Metrics, dates, links, and grades come from the underlying projects
  and documents. Absent data stays absent — for example, the Oracle certificate carries no
  reliable completion date, so none is displayed.

---

## Deployment

`npm run build` produces a fully static site in `dist/` — HTML, one JS bundle, one CSS bundle,
and the copied `public/` assets. It can be hosted by any static file server.

Two things to configure on the host:

1. **SPA fallback.** Direct requests and refreshes for `/projects/:id` must rewrite to
   `index.html` so React Router can resolve them. (Vite's dev server and `vite preview` already
   do this.)
2. **Canonical and social URLs.** There is no production domain yet, so the page carries no
   `<link rel="canonical">` and no `og:url`, rather than a placeholder one. `og:image` and
   `twitter:image` currently resolve to `hero-portrait.png` relatively and need absolute URLs
   once the domain is known.

---

## Contact

Open to entry-level opportunities in data analytics, data science, machine learning, and business
intelligence.

| Channel | Link |
|---------|------|
| Email | [venkatavishnuvardhanthota@gmail.com](mailto:venkatavishnuvardhanthota@gmail.com) |
| LinkedIn | [linkedin.com/in/venkata-vishnu-vardhan-thota](https://www.linkedin.com/in/venkata-vishnu-vardhan-thota) |
| GitHub | [github.com/Venkatavishnuvardhanthota](https://github.com/Venkatavishnuvardhanthota) |
| Résumé | [VishnuThota_CV.pdf](public/resume/VishnuThota_CV.pdf) |
