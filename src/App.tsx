import { createPortal } from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DeployedApplications from './components/applications/DeployedApplications';

/**
 * Home is rendered unconditionally so the project list stays mounted (and keeps
 * its scroll-reveal state) while a case study is displayed. React Router drives
 * only the full-page detail overlay at /projects/:id.
 *
 * Deployed Applications is a second static-shell island: it is portaled into the
 * #applications-root placeholder inside the Applications <section>. Rendering it
 * from this same tree keeps it inside the shared BrowserRouter, so its
 * "View Project" links navigate client-side to the existing case studies.
 */
export default function App() {
  const applicationsRoot = document.getElementById('applications-root');

  return (
    <>
      <Home />
      {applicationsRoot ? createPortal(<DeployedApplications />, applicationsRoot) : null}
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
}
