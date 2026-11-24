import type { RouteRecord } from 'vite-react-ssg'
import { ViteReactSSG } from 'vite-react-ssg'
import { projects } from './content/projects'
import { EnHome, FrHome } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Root } from './pages/Root'
import './styles/index.css'

const slugs = projects.map((p) => p.slug)

// Every route is pre-rendered to static HTML; project pages are split into their own chunk.
export const routes: RouteRecord[] = [
  { path: '/', element: <Root /> },
  { path: '/en', element: <EnHome /> },
  { path: '/fr', element: <FrHome /> },
  {
    path: '/en/projects/:slug',
    lazy: async () => ({ Component: (await import('./pages/ProjectPage')).EnProject }),
    getStaticPaths: () => slugs.map((s) => `/en/projects/${s}`),
  },
  {
    path: '/fr/projets/:slug',
    lazy: async () => ({ Component: (await import('./pages/ProjectPage')).FrProject }),
    getStaticPaths: () => slugs.map((s) => `/fr/projets/${s}`),
  },
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <NotFound /> },
]

export const createRoot = ViteReactSSG({ routes })
