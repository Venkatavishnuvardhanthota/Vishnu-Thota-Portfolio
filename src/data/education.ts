export type EducationEntry = {
  id: string;
  number: string;
  startYear: string;
  endYear: string;
  degree: string;
  field: string;
  institution: string;
  cgpa: string;
  cgpaScale: string;
  endNote?: string;
  /** The card's short form of `endNote`: the axis can afford two words, the
   *  identity line beside the number cannot. */
  endShort?: string;
  status?: 'Current';
};

/**
 * The two study stages, listed by what is current rather than by when each one
 * began: the B.Tech is the degree in progress, so it leads. This array is the
 * presentation order and the DOM order, and it is also what each card now
 * prints as its own year range — the stage's `startYear` → `endYear` sits in the
 * card's identity line, so the progression reads from text alone and the axis
 * above is decorative. The chronology is never written twice in one card.
 *
 * `status` is deliberately the semantic word, not the printed one. It marks
 * which stage is running (and drives `aria-current` plus the marker on the
 * axis); the card words the same fact as progress, because "In Progress" reads
 * better beside a score than "Current" does. The value is narrowed to the one
 * literal so that mapping in the renderer cannot silently go stale for a second
 * status word.
 *
 * CGPA values (7.72, 8.10) are the owner's stated scores. The "/ 10" that
 * follows each one is the presentation the owner asked for; it has NOT been
 * checked against a marksheet, because no marksheet exists in this repository
 * (public/ carries three certificate PDFs and the résumé, nothing else). So
 * `cgpaScale` is recorded as an assumption, not as a verified fact, and it is a
 * per-entry field so a 4-point or 100-point document can be honoured for one
 * stage without touching the other. Nothing else here is inferred.
 */
export const EDUCATION: EducationEntry[] = [
  {
    id: 'btech',
    number: '01',
    startYear: '2024',
    endYear: '2027',
    degree: 'B.Tech',
    field: 'Artificial Intelligence & Data Science',
    institution: 'Study World College of Engineering',
    cgpa: '7.72',
    cgpaScale: '10',
    endNote: 'Expected graduation',
    endShort: 'Expected',
    status: 'Current',
  },
  {
    id: 'diploma',
    number: '02',
    startYear: '2021',
    endYear: '2024',
    degree: 'Diploma',
    field: 'Computer Science',
    institution: 'Government Polytechnic College',
    cgpa: '8.10',
    cgpaScale: '10',
  },
];
