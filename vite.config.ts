import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build as esbuild } from 'esbuild'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { PROJECTS } from './src/data/projects'
import { HOME_META, SOCIAL_IMAGE_URL, projectMeta, type PageMeta } from './src/data/site'

/**
 * The site is a static index.html shell (Hero, Capabilities, About, etc.) with a
 * React app mounted only for the Projects feature. SPA fallback lets React Router
 * serve /projects/:id on direct load and refresh.
 */

// Values are interpolated into an HTML attribute (or <title>) verbatim, so the
// entities that would end or corrupt the tag have to be encoded.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

interface Slot {
  name: string
  /** Matches the whole tag; capture group 1 is the value this generator rewrites. */
  rx: RegExp
  write: (value: string) => string
  value: (meta: PageMeta) => string
}

const attr = (selector: string) => ({
  rx: new RegExp(`<${selector} content="([^"]*)" \\/>`),
  write: (v: string) => `<${selector} content="${v}" />`,
})

/**
 * Every head slot that differs between the homepage and a case study. The list is
 * also the contract checked against index.html at build time: each pattern must
 * match exactly one tag, and that tag must already hold the homepage value from
 * HOME_META — so a duplicate, a missing tag, or copy that drifted from
 * src/data/site.ts fails the build instead of shipping.
 */
const SLOTS: Slot[] = [
  {
    name: 'title',
    rx: /<title>([^<]*)<\/title>/,
    write: (v) => `<title>${v}</title>`,
    value: (m) => m.title,
  },
  { name: 'description', ...attr('meta name="description"'), value: (m) => m.description },
  {
    name: 'canonical',
    rx: /<link rel="canonical" href="([^"]*)" \/>/,
    write: (v) => `<link rel="canonical" href="${v}" />`,
    value: (m) => m.url,
  },
  { name: 'og:type', ...attr('meta property="og:type"'), value: (m) => m.ogType },
  { name: 'og:url', ...attr('meta property="og:url"'), value: (m) => m.url },
  { name: 'og:title', ...attr('meta property="og:title"'), value: (m) => m.socialTitle },
  { name: 'og:description', ...attr('meta property="og:description"'), value: (m) => m.socialDescription },
  { name: 'og:image', ...attr('meta property="og:image"'), value: () => SOCIAL_IMAGE_URL },
  {
    name: 'twitter:card',
    ...attr('meta name="twitter:card"'),
    // og.png is 1200x630, the exact 1.91:1 the large-image card crops to, so this
    // is the one card type that shows the whole social image.
    value: () => 'summary_large_image',
  },
  { name: 'twitter:title', ...attr('meta name="twitter:title"'), value: (m) => m.socialTitle },
  { name: 'twitter:description', ...attr('meta name="twitter:description"'), value: (m) => m.socialDescription },
  { name: 'twitter:image', ...attr('meta name="twitter:image"'), value: () => SOCIAL_IMAGE_URL },
]

/**
 * The Hero is the first content in the document and its role line is the LCP
 * element, so it must paint before the bundle runs. This renders the same React
 * component to static markup at build time and leaves it in #hero-root for
 * main.tsx to hydrate in place — the browser paints the text in the first frame
 * instead of waiting for React, and hydration adopts the existing nodes.
 *
 * The markup is generated from the component itself rather than copied, so the
 * two cannot drift. React and React DOM stay external because the generated
 * module is imported from this project, where Node resolves them normally.
 */
function staticHero() {
  const START = '<!--hero-static-start-->'
  const END = '<!--hero-static-end-->'
  const PLACEHOLDER = '<div id="hero-root"></div>'
  let root = ''

  return {
    name: 'static-hero',
    apply: 'build' as const,
    configResolved(config: { root: string }) {
      root = config.root
    },
    async transformIndexHtml(html: string) {
      if (!html.includes(PLACEHOLDER)) {
        throw new Error('static-hero: index.html has no empty <div id="hero-root"></div>')
      }
      const result = await esbuild({
        stdin: {
          contents: [
            "import React from 'react'",
            "import { renderToStaticMarkup } from 'react-dom/server'",
            "import HeroSection from './src/components/hero/HeroSection'",
            'export default renderToStaticMarkup(React.createElement(HeroSection))',
          ].join('\n'),
          resolveDir: root,
          sourcefile: 'hero-ssr-entry.tsx',
          loader: 'tsx',
        },
        bundle: true,
        write: false,
        platform: 'node',
        format: 'esm',
        jsx: 'automatic',
        loader: { '.css': 'empty' },
        external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
        logLevel: 'silent',
      })
      /* React and React DOM stay external, so the generated module imports them
         by name. It has to sit inside the project — where Node walks up to the
         real node_modules — rather than in os.tmpdir(), which has none. */
      const dir = join(root, 'node_modules', '.vite-temp')
      mkdirSync(dir, { recursive: true })
      const file = join(dir, `hero-ssr-${process.pid}.mjs`)
      writeFileSync(file, result.outputFiles![0].text)
      const mod = await import(pathToFileURL(file).href + `?v=${Date.now()}`)
      const markup = String(mod.default)
      if (!markup.startsWith('<section class="hero"')) {
        throw new Error(`static-hero: unexpected markup ${markup.slice(0, 80)}`)
      }
      return html.replace(PLACEHOLDER, `${START}<div id="hero-root">${markup}</div>${END}`)
    },
  }
}

/**
 * Emits one static HTML document per project case study so a crawler reading the
 * original HTML of /projects/<id> sees that route's title, description, canonical
 * and open-graph tags instead of the homepage's. Google's JS-SEO guidance is that
 * this metadata should be consistent between the initial response and the
 * post-render DOM; doing it at build time satisfies the crawler, and the matching
 * runtime sync in App.tsx satisfies the single-page session.
 *
 * The documents are otherwise byte-identical to dist/index.html. That is safe
 * because every asset reference Vite emits is root-absolute (/assets/…,
 * /favicon.svg, /hero-portrait.webp), so a page served from a nested path still
 * loads the same bundle — and because React Router resolves /projects/:id from the
 * URL, not from the file it was served out of.
 */
function projectRoutePages() {
  let outDir = ''

  return {
    name: 'project-route-pages',
    apply: 'build' as const,
    configResolved(config: { root: string; build: { outDir: string } }) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      let home: string
      try {
        home = readFileSync(join(outDir, 'index.html'), 'utf8')
      } catch {
        /* The build has already failed above this point and Vite is closing the
           bundle; rethrowing here would replace the real error with this one. */
        return
      }
      const HERO_BLOCK = /<!--hero-static-start-->[\s\S]*?<!--hero-static-end-->/
      const heroBlocks = home.match(new RegExp(HERO_BLOCK.source, 'g')) ?? []
      if (heroBlocks.length !== 1) {
        throw new Error(
          `project-route-pages: expected 1 static hero block in dist/index.html, found ${heroBlocks.length}`,
        )
      }
      /* A route document never paints the home shell (body.route-detail hides
         #main), so the hero is dropped from it. That removes the shell's h1 from
         the route document — the case study owns the only heading — and saves
         the markup from every deep link. */
      const template = home.replace(HERO_BLOCK, '<div id="hero-root"></div>')

      for (const slot of SLOTS) {
        const found = template.match(new RegExp(slot.rx.source, 'g')) ?? []
        if (found.length !== 1) {
          throw new Error(
            `project-route-pages: expected exactly 1 ${slot.name} tag in index.html, found ${found.length}`,
          )
        }
        const authored = slot.rx.exec(template)![1]
        const expected = esc(slot.value(HOME_META))
        if (authored !== expected) {
          throw new Error(
            `project-route-pages: index.html ${slot.name} is ${JSON.stringify(authored)} but ` +
              `src/data/site.ts declares ${JSON.stringify(expected)}. The runtime route sync writes ` +
              `the site.ts value, so the two must agree.`,
          )
        }
      }

      const render = (meta: PageMeta) =>
        SLOTS.reduce(
          (html, slot) => html.replace(slot.rx, () => slot.write(esc(slot.value(meta)))),
          template,
        )

      for (const project of PROJECTS) {
        const dir = join(outDir, 'projects', project.id)
        mkdirSync(dir, { recursive: true })
        writeFileSync(join(dir, 'index.html'), render(projectMeta(project)))
      }

      console.log(
        `project-route-pages: wrote ${PROJECTS.length} route documents (${PROJECTS.map((p) => p.id).join(', ')})`,
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), staticHero(), projectRoutePages()],
})
