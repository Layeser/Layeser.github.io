# layeser.github.io

Personal site of Sekou Kaba, AI & Machine Learning Engineer — English and French, pre-rendered, no cookies,
no trackers. Live at **https://layeser.github.io/**.

## Stack

React 18 + TypeScript (strict) + Vite + Tailwind CSS, pre-rendered to static HTML with `vite-react-ssg`
(every page in both languages is crawlable before JavaScript loads). Motion for small interactions,
Lucide icons, self-hosted Manrope and DM Mono (Latin subset, all French characters included).

- `src/content/en.ts`, `src/content/fr.ts`: interface copy; both satisfy the same `Dictionary` type, so a
  missing French key is a compile error.
- `src/content/projects.ts`, `src/content/career.ts`: one structure per item with `{ en, fr }` text and shared
  numbers, formatted with `Intl` (decimal comma in French).
- `src/content/site.ts`: availability flag, links.
- Figures under `public/figures/` are the real charts produced by the projects in
  [ai-portfolio](https://github.com/Layeser/ai-portfolio), converted to WebP with a PNG fallback.

## Develop

```bash
npm ci
npm run dev          # http://localhost:5173/en/
npm run typecheck && npm run lint && npm run build
node scripts/make-assets.mjs   # Open Graph cards and PNG icons (Playwright)
node qa/serve.mjs & node qa/run.mjs   # QA: console, overflow, axe, links, language and theme behaviour
```

Deployment: GitHub Actions (`.github/workflows/deploy.yml`) runs typecheck, lint and build, then publishes
`dist/` to GitHub Pages; any failing step stops the deployment.

## Licence

The **code** is under the MIT licence (`LICENSE`). The **content** — texts, CV files, portrait, figures and
project descriptions — is © Sekou Kaba and is not covered by that licence.
