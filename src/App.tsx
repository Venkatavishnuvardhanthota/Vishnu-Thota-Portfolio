import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';
import HeroSection from './components/hero/HeroSection';
import DeployedApplications from './components/applications/DeployedApplications';
import CertificationsSection from './components/certifications/CertificationsSection';
import EducationSection from './components/education/EducationSection';
import ContactSection from './components/contact/ContactSection';
import { getProjectById } from './data/projects';
import { HOME_META, projectMeta } from './data/site';

/**
 * Rewrites an existing head tag in place, never appends: a second canonical or a
 * second og:title is exactly the conflict this sync exists to avoid, and every tag
 * below is guaranteed to exist exactly once by projectRoutePages() at build time.
 */
function setContent(name: string, value: string) {
  const tag = document.head.querySelector(`meta[property="${name}"], meta[name="${name}"]`);
  if (tag) tag.setAttribute('content', value);
}

/**
 * Keeps <title>, <link rel="canonical">, the meta description and the Open Graph /
 * Twitter tags pointed at whichever route is actually rendered. The image and card
 * tags are not written because they are the same on every route.
 *
 * Every route ships its own static document with all of these already correct, so
 * this only has to keep them truthful once the SPA navigates without a document
 * reload — Next project, Back to Projects, browser back/forward. It derives from the
 * same useMatch that decides whether the case study renders, so the head and the
 * content cannot disagree, and it is keyed on the route URL because that is unique
 * per project and every other value is derived from it.
 */
function useRouteMetaSync() {
  const match = useMatch('/projects/:id');
  const project = match ? getProjectById(match.params.id) : undefined;
  // An unknown id resolves to the homepage metadata, which is what ProjectDetailPage's
  // <Navigate to="/" replace /> is about to land on regardless.
  const meta = project ? projectMeta(project) : HOME_META;

  useLayoutEffect(() => {
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', meta.url);
    document.title = meta.title;
    setContent('description', meta.description);
    setContent('og:type', meta.ogType);
    setContent('og:url', meta.url);
    setContent('og:title', meta.title);
    setContent('og:description', meta.description);
    setContent('twitter:title', meta.title);
    setContent('twitter:description', meta.description);
  }, [meta.url]);
}

/**
 * Home is rendered unconditionally so the project list stays mounted (and keeps
 * its scroll-reveal state) while a case study is displayed. React Router drives
 * only the full-page detail overlay at /projects/:id.
 *
 * The Hero, Deployed Applications, Certifications, Education and Contact
 * sections are static-shell islands: they are portaled into their #hero-root /
 * #applications-root / #certifications-root / #education-root / #contact-root
 * placeholders inside the corresponding <section>s. Rendering them from this
 * same tree keeps them inside the shared BrowserRouter, so their links navigate
 * client-side.
 */
export default function App() {
  useRouteMetaSync();

  const heroRoot = document.getElementById('hero-root');
  const applicationsRoot = document.getElementById('applications-root');
  const certificationsRoot = document.getElementById('certifications-root');
  const educationRoot = document.getElementById('education-root');
  const contactRoot = document.getElementById('contact-root');

  return (
    <>
      <Home />
      {heroRoot ? createPortal(<HeroSection />, heroRoot) : null}
      {applicationsRoot ? createPortal(<DeployedApplications />, applicationsRoot) : null}
      {certificationsRoot ? createPortal(<CertificationsSection />, certificationsRoot) : null}
      {educationRoot ? createPortal(<EducationSection />, educationRoot) : null}
      {contactRoot ? createPortal(<ContactSection />, contactRoot) : null}
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
}
