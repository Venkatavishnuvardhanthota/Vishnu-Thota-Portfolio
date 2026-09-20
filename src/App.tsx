import { createPortal } from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DeployedApplications from './components/applications/DeployedApplications';
import CertificationsSection from './components/certifications/CertificationsSection';
import EducationSection from './components/education/EducationSection';

/**
 * Home is rendered unconditionally so the project list stays mounted (and keeps
 * its scroll-reveal state) while a case study is displayed. React Router drives
 * only the full-page detail overlay at /projects/:id.
 *
 * Deployed Applications, Certifications, and Education are static-shell
 * islands: they are portaled into their #applications-root /
 * #certifications-root / #education-root placeholders inside the
 * corresponding <section>s. Rendering them from this same tree keeps them
 * inside the shared BrowserRouter, so their links navigate client-side.
 */
export default function App() {
  const applicationsRoot = document.getElementById('applications-root');
  const certificationsRoot = document.getElementById('certifications-root');
  const educationRoot = document.getElementById('education-root');

  return (
    <>
      <Home />
      {applicationsRoot ? createPortal(<DeployedApplications />, applicationsRoot) : null}
      {certificationsRoot ? createPortal(<CertificationsSection />, certificationsRoot) : null}
      {educationRoot ? createPortal(<EducationSection />, educationRoot) : null}
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
}
