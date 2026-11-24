// Renders the Open Graph cards (EN/FR) and PNG icons with the site's own fonts and tokens.
// Run once after changing the hero copy: node scripts/make-assets.mjs
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const nm = new URL('../node_modules/', import.meta.url).pathname
const manrope = readFileSync(`${nm}@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2`).toString('base64')
const mono = readFileSync(`${nm}@fontsource/dm-mono/files/dm-mono-latin-500-normal.woff2`).toString('base64')
const portrait = readFileSync(new URL('../public/portrait/sekou-kaba-sm.jpg', import.meta.url)).toString('base64')
const fonts = `@font-face{font-family:M;src:url(data:font/woff2;base64,${manrope}) format('woff2');font-weight:200 800}
@font-face{font-family:D;src:url(data:font/woff2;base64,${mono}) format('woff2')}`

const copy = {
  en: { role: 'AI & MACHINE LEARNING ENGINEER', line: 'I take AI systems from research to production, and measure them before I trust them.',
        proofs: [['1<sup>st</sup> / 13', 'Kaggle challenge'], ['CVPR 2027', 'paper under review'], ['2 M', 'transactions, fraud detection']] },
  fr: { role: 'INGÉNIEUR IA & MACHINE LEARNING', line: 'Je mène les systèmes d’IA de la recherche à la production, et je les mesure avant de leur faire confiance.',
        proofs: [['1<sup>re</sup> / 13', 'challenge Kaggle'], ['CVPR 2027', 'article en évaluation'], ['2 M', 'transactions, détection de fraude']] },
}

const og = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#060911;color:#e8ecf4;font-family:M;position:relative;overflow:hidden}
.g{position:absolute;inset:0;background:radial-gradient(700px 380px at 90% -10%,rgba(90,120,255,.22),transparent 60%),radial-gradient(500px 300px at -5% 0%,rgba(177,156,255,.12),transparent 60%)}
.w{position:absolute;inset:0;padding:60px 80px;display:grid;grid-template-columns:1fr 260px;gap:56px}
h1{font-size:76px;font-weight:800;letter-spacing:-.03em;line-height:1}.r{font-family:D;color:#7da7ff;letter-spacing:.16em;font-size:22px;margin-top:22px}
p.l{font-size:27px;line-height:1.35;color:#a0abbf;margin-top:24px;max-width:700px}
.pr{position:absolute;left:80px;right:80px;bottom:52px;display:flex;gap:0;border:1px solid #222b40;border-radius:20px;overflow:hidden}
.pr>div{flex:1;padding:18px 24px;background:#0c111e}.pr>div+div{border-left:1px solid #222b40}
.v{font-family:D;font-size:28px}.v sup{font-size:.55em}.t{color:#a0abbf;font-size:19px;margin-top:4px}
img{width:240px;height:258px;object-fit:cover;border-radius:28px;border:1px solid #222b40}</style></head>
<body><div class="g"></div><div class="w"><div><h1>Sekou Kaba</h1><div class="r">${c.role}</div><p class="l">${c.line}</p></div>
<img src="data:image/jpeg;base64,${portrait}"></div>
<div class="pr">${c.proofs.map(([v, t]) => `<div><div class="v">${v}</div><div class="t">${t}</div></div>`).join('')}</div></body></html>`

const icon = (size) => `<!doctype html><html><head><style>${fonts}*{margin:0}body{width:${size}px;height:${size}px;background:transparent}
div{width:${size}px;height:${size}px;border-radius:${size * 0.24}px;background:#0b1220;color:#e8ecf4;display:grid;place-items:center;
font-family:M;font-weight:800;font-size:${size * 0.44}px;letter-spacing:-.04em;box-shadow:inset 0 0 0 ${Math.max(1, size * 0.03)}px rgba(125,167,255,.35)}</style></head>
<body><div>SK</div></body></html>`

const browser = await chromium.launch()
for (const lang of ['en', 'fr']) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(og(copy[lang]), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `public/og-${lang}.png` })
  await page.close()
}
for (const [size, name] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  await page.setContent(icon(size), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `public/${name}`, omitBackground: true })
  await page.close()
}
await browser.close()
console.log('og-en.png, og-fr.png and icons written')
