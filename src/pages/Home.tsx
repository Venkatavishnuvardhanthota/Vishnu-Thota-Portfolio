import ProjectsSection from '../components/projects/ProjectsSection';

/**
 * Home view. Navigation, About and Skills stay in the static index.html shell;
 * App.tsx portals the remaining sections into their placeholder roots. This
 * page renders the Projects list into the Work section, and it stays mounted
 * across navigation so the list keeps its reveal state while a case study is
 * shown as a full-page overlay.
 */
export default function Home() {
  return <ProjectsSection />;
}
