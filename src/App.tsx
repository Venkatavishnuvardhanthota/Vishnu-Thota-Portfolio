import { useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetailPage from './pages/ProjectDetailPage';
import HeroSection from './components/hero/HeroSection';
import DeployedApplications from './components/applications/DeployedApplications';
import CertificationsSection from './components/certifications/CertificationsSection';
import EducationSection from './components/education/EducationSection';
import ContactSection from './components/contact/ContactSection';
import { getProjectById } from './data/projects';
import { prefetchCaseStudy } from './data/case-studies';
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
    setContent('og:title', meta.socialTitle);
    setContent('og:description', meta.socialDescription);
    setContent('twitter:title', meta.socialTitle);
    setContent('twitter:description', meta.socialDescription);
  }, [meta.url]);
}

/**
 * The Skills section stays in the static shell, so its used-across project names are
 * plain `<a href="/projects/…">` and following one reloads the document — which puts
 * the reader at the top of a page they were halfway down. Those clicks are handed to
 * the router that already owns this page's history instead of a second navigation
 * stack, and the entry says where the reader came from so the case study's Back
 * control can read as a way out rather than a link to the project list. Nothing about
 * which group was open travels with it: all five are open, and the section has no
 * script of its own. Everything that is not a case-study link, and every click the
 * browser should keep for itself (non-primary button, modifier key, already
 * prevented), is left alone.
 */
function useShellCaseStudyLinks() {
  const navigate = useNavigate();

  useEffect(() => {
    const skills = document.getElementById('skills');
    if (!skills) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const anchor = target ? target.closest<HTMLAnchorElement>('a[href^="/projects/"]') : null;
      const href = anchor ? anchor.getAttribute('href') : null;
      if (!href) return;
      e.preventDefault();
      navigate(href, { state: { from: 'skills' } });
    };

    skills.addEventListener('click', onClick);
    return () => skills.removeEventListener('click', onClick);
  }, [navigate]);
}

/**
 * The case-study body is a chunk, so the first visit to a page would otherwise
 * paint its header and then grow into the article. Hovering or focusing a link to
 * it is a strong signal the reader is about to go there, so the chunk is fetched
 * then — one listener on the document, because the links that point at a case
 * study are spread across a React island, the static Skills shell and the pager,
 * and none of them needs to know about this.
 */
function useCaseStudyPrefetch() {
  useEffect(() => {
    const onIntent = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="/projects/"]');
      if (!anchor) return;
      const id = (anchor.getAttribute('href') ?? '').slice('/projects/'.length).split(/[/?#]/)[0];
      if (id) prefetchCaseStudy(id);
    };
    document.addEventListener('pointerover', onIntent, { passive: true });
    document.addEventListener('focusin', onIntent, { passive: true });
    return () => {
      document.removeEventListener('pointerover', onIntent);
      document.removeEventListener('focusin', onIntent);
    };
  }, []);
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
  useShellCaseStudyLinks();
  useCaseStudyPrefetch();

  const onDetail = useMatch('/projects/:id') !== null;
  const heroRoot = document.getElementById('hero-root');
  /* main.tsx hydrates the prerendered hero and marks it; a route document has no
     prerendered hero, so App owns the root once the shell is shown again. While a
     case study is open the shell is hidden, and leaving the hero out of it is what
     keeps the route document's only h1 the case study's. */
  const heroHydrated = heroRoot?.dataset.hydrated === '1';
  const applicationsRoot = document.getElementById('applications-root');
  const certificationsRoot = document.getElementById('certifications-root');
  const educationRoot = document.getElementById('education-root');
  const contactRoot = document.getElementById('contact-root');

  return (
    <>
      <Home />
      {heroRoot && !heroHydrated && !onDetail ? createPortal(<HeroSection />, heroRoot) : null}
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
