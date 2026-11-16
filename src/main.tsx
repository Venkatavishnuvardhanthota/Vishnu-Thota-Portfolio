import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import HeroSection from './components/hero/HeroSection';
import './styles/projects.css';

/* The hero is rendered into index.html at build time so its opening text is the
   first paint. Hydration adopts those nodes; the attribute tells App not to
   portal a second copy into the same root. On the dev server (and on any page
   built without the prerender) the root is empty, so App owns it as before. */
const heroRoot = document.getElementById('hero-root');
if (heroRoot?.firstElementChild) {
  hydrateRoot(
    heroRoot,
    <React.StrictMode>
      <HeroSection />
    </React.StrictMode>,
  );
  heroRoot.dataset.hydrated = '1';
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}
