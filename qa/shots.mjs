import { chromium } from 'playwright'
const base = 'http://127.0.0.1:4173'
const [,, path = '/en/', theme = 'dark', width = '1440', out = 'qa/shot.png', full = '0'] = process.argv
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: +width, height: 900 }, colorScheme: theme })
const errors = []
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push(String(e)))
await page.goto(base + path, { waitUntil: 'networkidle' })
await page.screenshot({ path: out, fullPage: full === '1' })
console.log(JSON.stringify({ path, theme, width, errors }))
await browser.close()
