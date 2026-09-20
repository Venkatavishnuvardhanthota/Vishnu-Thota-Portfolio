import ProjectsSection from '../components/projects/ProjectsSection';

/**
 * Home view. The static portfolio sections (Hero, About, Capabilities,
 * Education, Certifications, Contact, Footer) remain in index.html; React owns
 * only the Projects feature, which this page renders into the Work section.
 * Home stays mounted across navigation so the list keeps its reveal state
 * while a case study is shown as a full-page overlay.
 */
export default function Home() {
  return <ProjectsSection />;
}
