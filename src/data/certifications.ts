/**
 * Where the credential actually lives. `pdf` is a document stored in
 * public/certificates/; `external` is a provider-hosted credential page with
 * no local copy, so its action must not be described as opening a PDF.
 */
export type CredentialType = 'pdf' | 'external';

export type Certification = {
  id: string;
  number: string;
  title: string;
  provider: string;
  platform?: string;
  credential?: string;
  highlight?: string;
  description?: string;
  skills?: string[];
  credentialType?: CredentialType;
  certificateUrl?: string;
  verificationUrl?: string;
  previewImage?: string;
  previewWidth?: number;
  previewHeight?: number;
  previewAlt?: string;
  previewCaption?: string;
};

/**
 * The four certificates owned by Vishnu. Facts about the PDF-backed ones
 * (grades, course counts, coverage) come only from the certificate documents
 * in public/certificates/. The Google Cloud entry is a provider-hosted Credly
 * credential: its title, provider, platform and badge come from the supplied
 * badge, its description and skills from the official credential information,
 * and it deliberately carries no date — none was supplied. Its one level word,
 * FOUNDATIONAL, is a tag rather than a chip: the word comes from the
 * credential's own description, and the row title already reads Certificate,
 * so a chip saying the same only repeated it. No card carries a date at all:
 * the issue dates are on the credentials themselves, so the rows state the
 * provider and platform and leave the dates there. Nothing here is inferred
 * or embellished.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'google-cloud-data-analytics',
    number: '01',
    title: 'Google Cloud Data Analytics Certificate',
    provider: 'Google Cloud',
    platform: 'Credly',
    credentialType: 'external',
    description:
      'A foundational Google Cloud data analytics certificate covering SQL, data cleaning, analysis, visualization, business intelligence, and cloud data workflows.',
    skills: [
      'BigQuery',
      'SQL',
      'Data Cleaning',
      'Data Modeling',
      'Data Visualization',
      'Business Intelligence',
      'FOUNDATIONAL',
    ],
    certificateUrl: 'https://www.credly.com/badges/33becd13-1be1-44a8-9ead-363bd886265e',
    previewImage: '/cert-previews/google-cloud-data-analytics.webp',
    previewWidth: 600,
    previewHeight: 600,
    previewCaption: 'Actual credential badge',
    previewAlt:
      'Google Cloud Data Analytics Certificate issued to Venkata Vishnu Vardhan Thota',
  },
  {
    id: 'ibm-data-science',
    number: '02',
    title: 'IBM Data Science Professional Certificate',
    provider: 'IBM',
    platform: 'Coursera',
    credential: 'Professional Certificate',
    highlight: '12 courses',
    description:
      'A twelve-course professional certificate covering data science methodology, Python, SQL, data analysis, data visualization, and machine learning, closing with an applied data science capstone.',
    skills: [
      'Data Science Methodology',
      'Python',
      'SQL',
      'Data Analysis',
      'Data Visualization',
      'Machine Learning',
      'Applied Capstone',
    ],
    certificateUrl: '/certificates/ibm-data-science.pdf',
    verificationUrl: 'https://coursera.org/verify/professional-cert/4LEROUKB27HZ',
    previewImage: '/cert-previews/ibm-data-science.webp',
    previewWidth: 640,
    previewHeight: 484,
    previewAlt:
      'IBM Data Science Professional Certificate issued to Venkata Vishnu Vardhan Thota',
  },
  {
    id: 'deloitte-data-analytics',
    number: '03',
    title: 'Data Analytics Job Simulation',
    provider: 'Deloitte',
    platform: 'Forage',
    credential: 'Certificate of Completion',
    description:
      'A Deloitte data analytics job simulation completed on Forage, with practical tasks in data analysis and forensic technology.',
    skills: ['Data Analysis', 'Forensic Technology'],
    certificateUrl: '/certificates/deloitte-data-analytics-job-simulation.pdf',
    previewImage: '/cert-previews/deloitte-data-analytics-job-simulation.webp',
    previewWidth: 640,
    previewHeight: 352,
    previewAlt:
      'Deloitte Data Analytics Job Simulation Certificate of Completion issued to Venkata Vishnu Vardhan Thota',
  },
  {
    id: 'oracle-databases-foundations',
    number: '04',
    title: 'Databases for Developers: Foundations',
    provider: 'Oracle',
    credential: 'Certificate of Excellence',
    highlight: '100% grade',
    description:
      'Oracle database foundations course completed with a 100% grade.',
    certificateUrl: '/certificates/oracle-databases-for-developers-foundations.pdf',
    previewImage: '/cert-previews/oracle-databases-for-developers-foundations.webp',
    previewWidth: 640,
    previewHeight: 510,
    previewAlt:
      'Oracle Certificate of Excellence in Databases for Developers: Foundations issued to Venkata Vishnu Vardhan Thota',
  },
];
