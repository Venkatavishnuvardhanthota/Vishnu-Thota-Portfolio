export type EducationEntry = {
  id: string;
  number: string;
  startYear: string;
  endYear: string;
  degree: string;
  field: string;
  institution: string;
  cgpa: string;
  status?: string;
};

/**
 * The verified academic progression: Diploma (2021–2024) into B.Tech AI &
 * Data Science (2024–2027, in progress). Only facts confirmed by the owner
 * are recorded here — no percentages, rankings, or invented dates.
 */
export const EDUCATION: EducationEntry[] = [
  {
    id: 'diploma',
    number: '01',
    startYear: '2021',
    endYear: '2024',
    degree: 'Diploma',
    field: 'Computer Science',
    institution: 'Government Polytechnic College',
    cgpa: '8.10',
  },
  {
    id: 'btech',
    number: '02',
    startYear: '2024',
    endYear: '2027',
    degree: 'B.Tech',
    field: 'Artificial Intelligence & Data Science',
    institution: 'Study World College of Engineering',
    cgpa: '7.72',
    status: 'Current',
  },
];
