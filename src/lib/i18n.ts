import { en } from '../content/en'
import { fr } from '../content/fr'
import type { Bi, Dictionary, Lang, Term } from '../content/types'
import { typeset } from './typography'

/** Applies the language's typography (apostrophes, French spacing) to every string of a dictionary, once. */
function typesetDeep<T>(value: T, lang: Lang): T {
  if (typeof value === 'string') return (value.startsWith('/') ? value : typeset(value, lang)) as T
  if (Array.isArray(value)) return value.map((v) => typesetDeep(v, lang)) as T
  if (value && typeof value === 'object')
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typesetDeep(v, lang)])) as T
  return value
}

export const dictionaries: Record<Lang, Dictionary> = { en: typesetDeep(en, 'en'), fr: typesetDeep(fr, 'fr') }

const locale: Record<Lang, string> = { en: 'en-GB', fr: 'fr-FR' }
export const projectsSegment: Record<Lang, string> = { en: 'projects', fr: 'projets' }

export const homePath = (lang: Lang) => `/${lang}/`
export const projectPath = (lang: Lang, slug: string) => `/${lang}/${projectsSegment[lang]}/${slug}/`

/** The equivalent page in the other language (project pages map to their twin, everything else to home). */
export function equivalentPath(pathname: string, to: Lang): string {
  const m = pathname.match(/^\/(en|fr)\/(projects|projets)\/([^/]+)\/?$/)
  if (m?.[3]) return projectPath(to, m[3])
  return homePath(to)
}

export const other = (lang: Lang): Lang => (lang === 'en' ? 'fr' : 'en')

export const pick = <T,>(bi: Bi<T>, lang: Lang): T => bi[lang]
export const term = (t: Term, lang: Lang): string => (typeof t === 'string' ? t : t[lang])

/** Numbers through Intl: decimal comma and narrow no-break thousands separator in French. */
export function formatNumber(value: number, digits: number, lang: Lang): string {
  // tiny values (e.g. a 0.0002 mAP) keep enough digits to stay truthful
  const d = value !== 0 && Math.abs(value) < 10 ** -digits ? Math.ceil(-Math.log10(Math.abs(value))) : digits
  return new Intl.NumberFormat(locale[lang], { minimumFractionDigits: d, maximumFractionDigits: d }).format(value)
}

/** "2026-06" → "Jun 2026" / "juin 2026"; "2024" → "2024". */
export function formatMonth(ym: string, lang: Lang, withMonth = true): string {
  const [y, m] = ym.split('-')
  if (!m || !withMonth) return y ?? ym
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, 1))
  return new Intl.DateTimeFormat(locale[lang], { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date)
}

export function formatRange(start: string, end: string, lang: Lang, endMonth = true): string {
  const s = formatMonth(start, lang, start.includes('-'))
  const e = formatMonth(end, lang, endMonth)
  return `${s} – ${e}`
}
