import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../content/site'
import type { Lang } from '../content/types'
import { dictionaries } from '../lib/i18n'
import { Header } from './Header'

// Survives remounts (a lazy route mounts the layout twice during hydration).
let lastPath: string | null = null

/** Restores the scroll ratio saved by the language switch on first load; honours #hash; top on real navigation. */
function useScrollManagement() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (lastPath === null) {
      lastPath = pathname
      try {
        const saved = sessionStorage.getItem('scroll')
        if (saved) {
          sessionStorage.removeItem('scroll')
          const { path, ratio } = JSON.parse(saved) as { path: string; ratio: number }
          if (path === pathname) {
            const max = document.documentElement.scrollHeight - innerHeight
            scrollTo({ top: ratio * max, behavior: 'instant' })
            return
          }
        }
      } catch {
        /* storage unavailable */
      }
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else if (pathname !== lastPath) {
      scrollTo({ top: 0, behavior: 'instant' })
    }
    lastPath = pathname
  }, [pathname, hash])
}

export function Layout({ lang, children }: { lang: Lang; children: ReactNode }) {
  const d = dictionaries[lang]
  useScrollManagement()
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {d.a11y.skip}
      </a>
      <Header lang={lang} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{d.footer.built}</p>
          <p>
            {d.footer.licence} ·{' '}
            <a className="link" href={`${site.github}/Layeser.github.io`}>
              {d.footer.source}
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}
