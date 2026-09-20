export type Certification = {
  id: string;
  number: string;
  title: string;
  provider: string;
  platform?: string;
  date?: string;
  credential?: string;
  highlight?: string;
  description?: string;
  skills?: string[];
  certificateUrl: string;
  verificationUrl?: string;
  previewImage?: string;
  previewWidth?: number;
  previewHeight?: number;
  previewAlt?: string;
};

/**
 * The three verified certificates owned by Vishnu. Facts (dates, grades,
 * course counts, coverage) come only from the certificate documents in
 * public/certificates/ — nothing is inferred or embellished.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'ibm-data-science',
    number: '01',
    title: 'IBM Data Science Professional Certificate',
    provider: 'IBM',
    platform: 'Coursera',
    date: 'April 7, 2026',
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
      'IBM Data Science Professional Certificate issued by Coursera to Venkata Vishnu Vardhan Thota, dated Apr 7, 2026',
  },
  {
    id: 'deloitte-data-analytics',
    number: '02',
    title: 'Data Analytics Job Simulation',
    provider: 'Deloitte',
    platform: 'Forage',
    date: 'January 10, 2026',
    credential: 'Certificate of Completion',
    description:
      'A Deloitte data analytics job simulation completed on Forage, with practical tasks in data analysis and forensic technology.',
    skills: ['Data Analysis', 'Forensic Technology'],
    certificateUrl: '/certificates/deloitte-data-analytics-job-simulation.pdf',
    previewImage: '/cert-previews/deloitte-data-analytics-job-simulation.webp',
    previewWidth: 640,
    previewHeight: 352,
    previewAlt:
      'Deloitte Data Analytics Job Simulation Certificate of Completion for Venkata Vishnu Vardhan Thota, January 10th, 2026',
  },
  {
    id: 'oracle-databases-foundations',
    number: '03',
    title: 'Databases for Developers: Foundations',
    provider: 'Oracle',
    credential: 'Certificate of Excellence',
    highlight: '100% grade',
    description:
      'Oracle database foundations course completed with a 100% grade, taught by Chris Saxon.',
    certificateUrl: '/certificates/oracle-databases-for-developers-foundations.pdf',
    previewImage: '/cert-previews/oracle-databases-for-developers-foundations.webp',
    previewWidth: 640,
    previewHeight: 510,
    previewAlt:
      'Oracle Certificate of Excellence for Thota Venkata Vishnu Vardhan, 100% grade in Databases for Developers: Foundations',
  },
];
