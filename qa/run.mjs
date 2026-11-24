// Full QA pass against the built site served on :4173. Output: JSON report on stdout.
import AxeBuilder from '@axe-core/playwright'
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const base = 'http://127.0.0.1:4173'
const slugs = [...readFileSync('src/content/projects.ts', 'utf8').matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1])
const routes = ['/en/', '/fr/', ...slugs.map((s) => `/en/projects/${s}/`), ...slugs.map((s) => `/fr/projets/${s}/`)]
const report = { routes: routes.length, console: [], overflow: [], axe: [], frLeaks: [], frDecimals: [], links: {}, behaviour: [] }
const browser = await chromium.launch()

// 1. every route, both themes, four widths: console errors, horizontal overflow; axe + language checks at 1440
for (const theme of ['dark', 'light']) {
  for (const path of routes) {
    for (const width of [390, 768, 1440, 1920]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme })
      const page = await ctx.newPage()
      const msgs = []
      page.on('console', (m) => ['error', 'warning'].includes(m.type()) && msgs.push(m.text()))
      page.on('pageerror', (e) => msgs.push(String(e)))
      await page.goto(base + path, { waitUntil: 'networkidle' })
      const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      if (ov > 0) report.overflow.push({ path, width, theme, px: ov })
      if (msgs.length) report.console.push({ path, width, theme, msgs })
      if (width === 1440) {
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
        for (const v of axe.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? '')))
          report.axe.push({ path, theme, id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0]?.target.join(' ') })
        if (theme === 'dark') {
          const text = await page.evaluate(() => {
            const clone = document.body.cloneNode(true)
            clone.querySelectorAll('code, .chip, .chip-quiet, figure img, [lang="en"]').forEach((n) => n.remove())
            return clone.innerText
          })
          if (path.startsWith('/fr')) {
            for (const w of ['Read the case study', 'Download CV', 'Personal project', 'Limitations', 'undefined', 'Next project', 'All projects', 'Key results', 'Skills'])
              if (text.includes(w)) report.frLeaks.push({ path, w })
            const dec = [...text.matchAll(/(?<![\w.-])\d+\.\d+(?![\w.])/g)].map((m) => m[0])
            if (dec.length) report.frDecimals.push({ path, dec: [...new Set(dec)].slice(0, 12) })
          } else if (text.includes('undefined')) report.frLeaks.push({ path, w: 'undefined (EN)' })
        }
      }
      await ctx.close()
    }
  }
}

// 2. links: every href on every route
const hrefs = new Set()
{
  const page = await browser.newPage()
  for (const path of routes) {
    await page.goto(base + path, { waitUntil: 'domcontentloaded' })
    for (const h of await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')))) hrefs.add(h)
  }
  for (const l of ['en', 'fr']) {
    await page.goto(`${base}/${l}/`)
    for (const id of ['work', 'experience', 'skills', 'about', 'contact', 'main'])
      if (!(await page.$(`#${id}`))) report.behaviour.push(`missing anchor #${id} on /${l}/`)
  }
  await page.close()
}
for (const h of hrefs) {
  if (!h || h.startsWith('mailto:') || h.startsWith('#')) continue
  const url = h.startsWith('http') ? h : base + h.split('#')[0]
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (link-check)' } })
    report.links[h] = r.status
  } catch (e) {
    report.links[h] = String(e).slice(0, 60)
  }
}

// 3. behaviour: language detection, switch keeps the page, persistence; theme persistence
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark', locale: 'en-GB' })
  const page = await ctx.newPage()
  await page.goto(`${base}/`)
  await page.waitForURL(/\/en\/$/)
  report.behaviour.push(`/ with an en-GB browser -> ${new URL(page.url()).pathname}`)
  await page.goto(`${base}/en/projects/rag-assistant/`)
  await page.evaluate(() => scrollTo(0, 1200))
  await page.click('a[hreflang="fr"]')
  await page.waitForURL(/\/fr\/projets\/rag-assistant\/$/)
  await page.waitForTimeout(300)
  report.behaviour.push(`EN->FR switch on a project page -> ${new URL(page.url()).pathname}, scrollY ${Math.round(await page.evaluate(() => scrollY))} (was 1200)`)
  report.behaviour.push(`html lang after the switch: ${await page.getAttribute('html', 'lang')}`)
  await page.goto(`${base}/`)
  await page.waitForURL(/\/fr\/$/)
  report.behaviour.push(`/ after choosing FR (en-GB browser) -> ${new URL(page.url()).pathname}`)
  await page.click('header button[aria-label*="thème"]')
  const t1 = await page.getAttribute('html', 'data-theme')
  await page.reload()
  report.behaviour.push(`theme toggled to ${t1}, after reload ${await page.getAttribute('html', 'data-theme')}`)
  await ctx.close()
  const ctxFr = await browser.newContext({ locale: 'fr-FR' })
  const p2 = await ctxFr.newPage()
  await p2.goto(`${base}/`)
  await p2.waitForURL(/\/(en|fr)\/$/)
  report.behaviour.push(`/ with a fr-FR browser, nothing stored -> ${new URL(p2.url()).pathname}`)
  await ctxFr.close()
}
await browser.close()
const notOk = Object.entries(report.links).filter(([, s]) => s !== 200)
console.log(JSON.stringify({ ...report, links: { checked: Object.keys(report.links).length, notOk } }, null, 1))
