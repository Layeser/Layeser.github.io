import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { site } from '../content/site'
import type { Figure as FigureT, Lang, Metric } from '../content/types'
import { dictionaries, formatNumber } from '../lib/i18n'
import { typeset } from '../lib/typography'
import { Rich } from './Rich'

export function MetricValue({ metric, lang, className = '' }: { metric: Metric; lang: Lang; className?: string }) {
  const v = formatNumber(metric.value, metric.digits, lang)
  const suffix = metric.suffix ? typeset(`1${metric.suffix}`, lang).slice(1) : ''
  return (
    <span className={`metric ${className}`}>
      {metric.from !== undefined && (
        <>
          <span className="text-faint">{formatNumber(metric.from, metric.digits, lang)}</span>
          <span className="mx-1 text-faint" aria-hidden="true">
            →
          </span>
          <span className="sr-only">{lang === 'fr' ? ' à ' : ' to '}</span>
        </>
      )}
      {v}
      {suffix}
    </span>
  )
}

export function SectionTitle({ id, eyebrow, title, intro, lang }: { id: string; eyebrow: string; title: string; intro?: string; lang: Lang }) {
  return (
    <div className="mb-10 max-w-prose">
      <p className="eyebrow mb-3" aria-hidden="true">{eyebrow}</p>
      <h2 id={`${id}-title`} className="text-3xl font-bold sm:text-4xl">
        {typeset(title, lang)}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{typeset(intro, lang)}</p>}
    </div>
  )
}

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  )
}

/** Real chart from the project repo, always on a light card so its colours are never altered. */
export function Figure({ fig, lang, eager = false }: { fig: FigureT; lang: Lang; eager?: boolean }) {
  const d = dictionaries[lang]
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="bg-white p-3 sm:p-5">
        <picture>
          <source srcSet={`/figures/${fig.src}.webp`} type="image/webp" />
          <img
            src={`/figures/${fig.src}.png`}
            width={fig.width}
            height={fig.height}
            alt={fig.alt[lang]}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="h-auto w-full"
          />
        </picture>
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-t border-line px-4 py-3 text-sm">
        <span className="text-muted">
          <Rich text={fig.caption[lang]} lang={lang} />
        </span>
        <span className="font-mono text-xs text-faint">{d.project.figure}</span>
      </figcaption>
    </figure>
  )
}

export function ExternalLink({ href, children, lang, className = 'link' }: { href: string; children: ReactNode; lang: Lang; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight size={14} aria-hidden="true" className="ml-0.5 inline-block align-[-2px]" />
      <span className="sr-only"> ({dictionaries[lang].a11y.external})</span>
    </a>
  )
}

/** E-mail assembled at runtime from two parts: not in the pre-rendered HTML, so naive scrapers miss it. */
export function EmailActions({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  const [email, setEmail] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const reduce = useReducedMotion()
  useEffect(() => setEmail(`${site.email.user}@${site.email.domain}`), [])
  const copy = async () => {
    if (!email) return
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked: the mailto button still works */
    }
  }
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex flex-wrap items-center gap-3">
        <a href={email ? `mailto:${email}` : '#contact'} className="btn-primary">
          <Mail size={16} aria-hidden="true" />
          {d.contact.write}
        </a>
        <button type="button" onClick={copy} className="btn-ghost min-w-[11rem] justify-center" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={copied ? 'done' : 'copy'}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2"
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? d.contact.copied : d.contact.copy}
            </m.span>
          </AnimatePresence>
        </button>
        {email && <span className="font-mono text-sm text-muted">{email}</span>}
      </div>
    </LazyMotion>
  )
}
