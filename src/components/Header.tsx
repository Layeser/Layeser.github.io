import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Lang } from '../content/types'
import { dictionaries, equivalentPath, homePath, other } from '../lib/i18n'

type Theme = 'light' | 'dark'

function useTheme(): [Theme | null, () => void] {
  const [theme, setTheme] = useState<Theme | null>(null) // unknown until mounted: the pre-rendered HTML is theme-neutral
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark')
  }, [])
  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* private mode: the choice simply does not persist */
    }
    setTheme(next)
  }
  return [theme, toggle]
}

/** Language switch: same page in the other language, scroll position kept as a ratio of the page height. */
function LangSwitch({ lang }: { lang: Lang }) {
  const { pathname } = useLocation()
  const d = dictionaries[lang]
  const target = other(lang)
  const href = equivalentPath(pathname, target)
  const remember = () => {
    try {
      localStorage.setItem('lang', target)
      const max = document.documentElement.scrollHeight - innerHeight
      sessionStorage.setItem('scroll', JSON.stringify({ path: href, ratio: max > 0 ? scrollY / max : 0 }))
    } catch {
      /* storage unavailable */
    }
  }
  return (
    <nav aria-label={d.a11y.language} className="flex items-center rounded-lg border border-line p-0.5 font-mono text-xs">
      {(['en', 'fr'] as const).map((l) =>
        l === lang ? (
          <span key={l} aria-current="true" className="rounded-md bg-raised px-2 py-1 font-medium text-ink">
            {l.toUpperCase()}
          </span>
        ) : (
          <a
            key={l}
            href={href}
            hrefLang={l}
            lang={l}
            onClick={remember}
            aria-label={`${l.toUpperCase()} — ${d.a11y.switchTo}`}
            className="rounded-md px-2 py-1 text-muted hover:text-ink"
          >
            {l.toUpperCase()}
          </a>
        ),
      )}
    </nav>
  )
}

export function Header({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  const [theme, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  const home = homePath(lang)
  const items: [string, string][] = [
    ['work', d.nav.work],
    ['experience', d.nav.experience],
    ['skills', d.nav.skills],
    ['about', d.nav.about],
    ['contact', d.nav.contact],
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link to={home} className="flex items-center gap-2.5 font-semibold tracking-tight">
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
            <rect width="32" height="32" rx="8" className="fill-ink" />
            <text x="16" y="21.5" textAnchor="middle" className="fill-bg" fontFamily="Manrope Variable, sans-serif" fontSize="14" fontWeight="800">
              SK
            </text>
          </svg>
          <span className="sr-only sm:not-sr-only">Sekou Kaba</span>
        </Link>
        <nav aria-label={d.a11y.nav} className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {items.map(([id, label]) => (
              <li key={id}>
                <Link to={`${home}#${id}`} className="hover:text-ink">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} />
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'light' ? d.a11y.toDark : d.a11y.toLight}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-ink"
          >
            {theme === 'light' ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
          </button>
          <a href={d.cv.href} download className="btn-primary hidden !px-3 !py-1.5 lg:inline-flex">
            <Download size={15} aria-hidden="true" />
            {d.cv.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Menu"
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted hover:text-ink md:hidden"
          >
            {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label={d.a11y.nav} className="border-t border-line md:hidden">
          <ul className="shell flex flex-col py-2">
            {items.map(([id, label]) => (
              <li key={id}>
                <Link to={`${home}#${id}`} onClick={() => setOpen(false)} className="block py-3 text-lg text-ink">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href={d.cv.href} download className="flex items-center gap-2 py-3 text-lg text-accent">
                <Download size={16} aria-hidden="true" />
                {d.cv.label}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
