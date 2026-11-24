import { AlertTriangle, ArrowLeft, ArrowRight, FlaskConical } from 'lucide-react'
import { Github } from '../components/brand'
import { Link, useParams } from 'react-router-dom'
import { ExternalLink, Figure, MetricValue } from '../components/bits'
import { Layout } from '../components/Layout'
import { Rich } from '../components/Rich'
import { Seo } from '../components/Seo'
import { projectBySlug, projects } from '../content/projects'
import { site } from '../content/site'
import type { Lang } from '../content/types'
import { dictionaries, homePath, projectPath } from '../lib/i18n'
import { plain, typeset } from '../lib/typography'
import { NotFound } from './NotFound'

export function ProjectPage({ lang }: { lang: Lang }) {
  const { slug = '' } = useParams()
  const p = projectBySlug(slug)
  if (!p) return <NotFound />
  const d = dictionaries[lang]
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]
  const title = `${plain(p.title[lang], lang)} — Sekou Kaba`
  return (
    <Layout lang={lang}>
      <Seo
        lang={lang}
        title={title}
        description={plain(p.line[lang], lang)}
        path={projectPath(lang, p.slug)}
        alternates={{ en: projectPath('en', p.slug), fr: projectPath('fr', p.slug) }}
      />
      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div className="backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="shell relative py-12 sm:py-16">
            <Link to={`${homePath(lang)}#work`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
              <ArrowLeft size={15} aria-hidden="true" />
              {d.project.back}
            </Link>
            <p className="eyebrow mt-8 flex items-center gap-2">
              <FlaskConical size={13} aria-hidden="true" />
              {d.project.personal}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold sm:text-5xl">{typeset(p.title[lang], lang)}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-muted">{typeset(p.line[lang], lang)}</p>
            {p.metrics.length > 0 && (
              <div className="mt-10">
                <h2 className="eyebrow mb-3">{d.project.keyResults}</h2>
                <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                  {p.metrics.map((m) => (
                    <div key={m.label.en} className="flex flex-col bg-surface p-5">
                      <dt className="order-2 mt-1 text-sm text-muted">
                        <Rich text={m.label[lang]} lang={lang} />
                      </dt>
                      <dd className="text-2xl font-medium text-ink">
                        <MetricValue metric={m} lang={lang} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </header>

        <div className="shell grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="min-w-0 space-y-12">
            {p.sections.map((s) => {
              const isLimit = s.kind === 'limitations'
              return (
                <section
                  key={s.kind}
                  aria-labelledby={`s-${s.kind}`}
                  className={isLimit ? 'rounded-2xl border border-warn/40 bg-warn/5 p-6 sm:p-8' : ''}
                >
                  <h2 id={`s-${s.kind}`} className={`flex items-center gap-2 text-2xl font-bold ${isLimit ? 'text-ink' : ''}`}>
                    {isLimit && <AlertTriangle size={20} aria-hidden="true" className="text-warn" />}
                    {d.project.headings[s.kind]}
                  </h2>
                  <div className="mt-4 max-w-prose space-y-4 text-[1.0625rem] leading-relaxed text-muted">
                    {s.body[lang].map((para) => (
                      <p key={para}>
                        <Rich text={para} lang={lang} />
                      </p>
                    ))}
                  </div>
                </section>
              )
            })}
            {p.figures.length > 0 && (
              <div className="space-y-8">
                {p.figures.map((f) => (
                  <Figure key={f.src} fig={f} lang={lang} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h2 className="eyebrow mb-3">{d.project.stack}</h2>
              <ul className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <Github size={18} aria-hidden="true" className="mb-2 text-muted" />
              <ExternalLink href={`${site.portfolioRepo}/tree/main/${p.repo}`} lang={lang} className="link text-sm font-semibold">
                {d.project.repo}
              </ExternalLink>
              <p className="mt-2 font-mono text-xs text-faint">ai-portfolio/{p.repo}</p>
            </div>
          </aside>
        </div>

        {next && (
          <nav aria-label={d.project.next} className="border-t border-line">
            <div className="shell py-10">
              <Link to={projectPath(lang, next.slug)} className="group inline-flex flex-col">
                <span className="eyebrow">{d.project.next}</span>
                <span className="mt-2 flex items-center gap-2 text-2xl font-bold group-hover:text-accent">
                  {typeset(next.title[lang], lang)}
                  <ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </nav>
        )}
      </article>
    </Layout>
  )
}

export const EnProject = () => <ProjectPage lang="en" />
export const FrProject = () => <ProjectPage lang="fr" />
