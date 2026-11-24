// After pre-rendering: GitHub Pages 404 page, sitemap with both languages, .nojekyll, and a guard that every
// expected route was actually rendered (a missing page fails the build instead of shipping a hole).
import { copyFileSync, existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'

const SITE = 'https://layeser.github.io'
const dist = new URL('../dist/', import.meta.url).pathname
const src = readFileSync(new URL('../src/content/projects.ts', import.meta.url), 'utf8')
const slugs = [...src.matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1])
if (slugs.length < 10) throw new Error(`expected the project slugs, found ${slugs.length}`)

const pairs = [['/en/', '/fr/'], ...slugs.map((s) => [`/en/projects/${s}/`, `/fr/projets/${s}/`])]
for (const p of pairs.flat()) {
  if (!existsSync(`${dist}${p}index.html`)) throw new Error(`route not pre-rendered: ${p}`)
}
// <meta charset> must sit in the first 1024 bytes: move it (and the viewport) to the top of <head>.
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(d + f).isDirectory() ? walk(`${d}${f}/`) : [d + f]))
// Preload the Latin Manrope file: with critical CSS inlined, the @font-face is otherwise discovered late.
const fonts = readdirSync(`${dist}assets`).filter((f) => /^manrope-latin-wght-normal-.*\.woff2$/.test(f))
const preload = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('')
for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  let html = readFileSync(file, 'utf8')
  const charset = '<meta charset="UTF-8">'
  html = html.replace(charset, '').replace('<head>', `<head>${charset}${preload}`)
  // The pages are pre-rendered: JavaScript only adds interactivity, so it must not compete with the first paint.
  html = html.replace(/<script type="module" crossorigin src=/g, '<script type="module" crossorigin fetchpriority="low" src=')
  writeFileSync(file, html)
}
// "/" without JavaScript: the two language links are in the HTML; also send no-JS visitors and crawlers to /en/.
const root = `${dist}index.html`
writeFileSync(root, readFileSync(root, 'utf8').replace('</head>', '<noscript><meta http-equiv="refresh" content="0; url=/en/"></noscript></head>'))
copyFileSync(`${dist}404/index.html`, `${dist}404.html`)
writeFileSync(`${dist}.nojekyll`, '')

const today = new Date().toISOString().slice(0, 10)
const urls = pairs
  .flatMap(([en, fr]) =>
    [en, fr].map(
      (loc) => `  <url>
    <loc>${SITE}${loc}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${en}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${SITE}${fr}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${en}"/>
  </url>`,
    ),
  )
  .join('\n')
writeFileSync(
  `${dist}sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
)
console.log(`postbuild: ${pairs.length * 2} pages in sitemap, 404.html, .nojekyll`)
