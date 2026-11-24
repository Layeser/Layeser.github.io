import { ArrowRight, Download, FileText, FlaskConical, Lock } from 'lucide-react'
import { Github, Linkedin } from '../components/brand'
import { Link } from 'react-router-dom'
import { EmailActions, ExternalLink, MetricValue, Section, SectionTitle } from '../components/bits'
import { Layout } from '../components/Layout'
import { Rich } from '../components/Rich'
import { Seo } from '../components/Seo'
import { education, experience, skills } from '../content/career'
import { projects } from '../content/projects'
import { site } from '../content/site'
import type { Lang, Project } from '../content/types'
import { dictionaries, formatRange, homePath, projectPath, term } from '../lib/i18n'
import { typeset } from '../lib/typography'

function Hero({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div className="backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="gridlines pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="max-w-3xl">
          {site.availability.enabled && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {typeset(d.hero.availability, lang)}
            </p>
          )}
          <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            Sekou Kaba
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.16em] text-accent">{d.hero.role}</p>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl">{typeset(d.hero.line, lang)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`${homePath(lang)}#work`} className="btn-primary">
              {d.hero.ctaWork}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a href={d.cv.href} download className="btn-ghost">
              <Download size={16} aria-hidden="true" />
              {d.cv.label}
            </a>
            <a href={site.github} className="btn-ghost" aria-label="GitHub">
              <Github size={16} aria-hidden="true" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a href={site.linkedin} className="btn-ghost" aria-label="LinkedIn">
              <Linkedin size={16} aria-hidden="true" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="mx-auto w-56 sm:w-64 lg:w-72">
          <picture>
            <source srcSet="/portrait/sekou-kaba-sm.avif 400w, /portrait/sekou-kaba-lg.avif 641w" type="image/avif" sizes="(min-width: 1024px) 18rem, 16rem" />
            <source srcSet="/portrait/sekou-kaba-sm.webp 400w, /portrait/sekou-kaba-lg.webp 641w" type="image/webp" sizes="(min-width: 1024px) 18rem, 16rem" />
            <img
              src="/portrait/sekou-kaba-lg.jpg"
              width={641}
              height={690}
              alt={d.a11y.portraitAlt}
              fetchPriority="high"
              decoding="async"
              className="aspect-[641/690] w-full rounded-3xl border border-line object-cover shadow-2xl shadow-black/20"
            />
          </picture>
        </div>
      </div>
      <div className="shell relative pb-16">
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {d.hero.proofs.map((p) => (
            <li key={p.label} className="bg-surface/90 p-5">
              <p className="metric text-2xl font-medium text-ink">
                <Rich text={p.value} lang={lang} />
              </p>
              <p className="mt-1 text-sm text-muted">{typeset(p.label, lang)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProjectCard({ p, lang, big }: { p: Project; lang: Lang; big: boolean }) {
  const d = dictionaries[lang]
  return (
    <li className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/50">
      <p className="eyebrow mb-4 flex items-center gap-2">
        <FlaskConical size={13} aria-hidden="true" />
        {d.work.personal}
      </p>
      <h3 className={`font-bold ${big ? 'text-2xl' : 'text-xl'}`}>
        <Link to={projectPath(lang, p.slug)} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {typeset(p.title[lang], lang)}
        </Link>
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{typeset(p.line[lang], lang)}</p>
      <div className="mt-6">
        <MetricValue metric={p.headline} lang={lang} className={`${big ? 'text-4xl' : 'text-3xl'} font-medium text-ink`} />
        <p className="mt-1 text-sm text-muted">
          <Rich text={p.headline.label[lang]} lang={lang} />
        </p>
        <p className="mt-0.5 font-mono text-xs text-faint">{typeset(p.headlineNote[lang], lang)}</p>
      </div>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={d.project.stack}>
        {p.stack.slice(0, big ? 6 : 4).map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 text-sm font-semibold text-accent" aria-hidden="true">
        {d.work.read} <ArrowRight size={14} className="inline align-[-2px] transition-transform group-hover:translate-x-0.5" />
      </p>
    </li>
  )
}

function Work({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <Section id="work">
      <SectionTitle id="work" eyebrow="01" title={d.work.title} intro={d.work.intro} lang={lang} />
      <ul className="grid gap-5 md:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.slug} p={p} lang={lang} big />
        ))}
      </ul>
      <h3 className="eyebrow mb-5 mt-14">{d.work.more}</h3>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <ProjectCard key={p.slug} p={p} lang={lang} big={false} />
        ))}
      </ul>
    </Section>
  )
}

function ExperienceSection({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  return (
    <Section id="experience" className="border-t border-line">
      <SectionTitle id="experience" eyebrow="02" title={d.experience.title} intro={d.experience.intro} lang={lang} />
      <ol className="relative space-y-12 border-l border-line pl-6 sm:pl-10">
        {experience.map((x) => (
          <li key={x.id} className="relative">
            <span className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent sm:-left-[45px]" aria-hidden="true" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-bold">{typeset(x.org[lang], lang)}</h3>
              <p className="font-mono text-xs text-faint">{x.place[lang]}</p>
            </div>
            {x.roles.map((r) => (
              <div key={r.start} className="mt-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-semibold text-ink">{typeset(r.title[lang], lang)}</p>
                  <p className="metric text-sm text-muted">{formatRange(r.start, r.end, lang)}</p>
                </div>
                <ul className="mt-3 space-y-2 text-muted">
                  {r.bullets[lang].map((b) => (
                    <li key={b} className="relative pl-4 leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-faint">
                      <Rich text={b} lang={lang} />
                    </li>
                  ))}
                </ul>
                {r.highlight && (
                  <p className="mt-4 rounded-xl border border-violet/30 bg-violet/5 px-4 py-3 text-sm">
                    <span className="eyebrow mr-2 !text-violet">{d.experience.research}</span>
                    <span className="text-muted">{typeset(r.highlight[lang], lang)}</span>
                  </p>
                )}
              </div>
            ))}
            {x.client && (
              <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-line bg-raised/50 px-4 py-3 text-sm text-muted">
                <Lock size={14} aria-hidden="true" className="text-faint" />
                <span className="font-semibold text-ink">{d.experience.clientWork}</span>
                <span>· {typeset(x.client.note[lang], lang)}</span>
                <span>{typeset(d.experience.publicReconstruction, lang)}</span>
                <Link to={projectPath(lang, x.client.reconstructionSlug)} className="link">
                  FraudGuard
                </Link>
              </p>
            )}
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={d.experience.stack}>
              {x.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Skills({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  return (
    <Section id="skills" className="border-t border-line">
      <SectionTitle id="skills" eyebrow="03" title={d.skills.title} intro={d.skills.intro} lang={lang} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.title.en} className="card p-6">
            <h3 className="font-bold">{typeset(g.title[lang], lang)}</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={term(s, 'en')} className="chip">
                  {term(s, lang)}
                </li>
              ))}
            </ul>
            {(g.notions?.length || g.inTraining?.length) && (
              <div className="mt-4 space-y-2 border-t border-dashed border-line pt-4 text-xs">
                {g.notions?.length ? (
                  <p className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-mono text-faint">{d.skills.notions}</span>
                    {g.notions.map((s) => (
                      <span key={term(s, 'en')} className="chip-quiet">
                        {term(s, lang)}
                      </span>
                    ))}
                  </p>
                ) : null}
                {g.inTraining?.length ? (
                  <p className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-mono text-faint">{d.skills.inTraining}</span>
                    {g.inTraining.map((s) => (
                      <span key={term(s, 'en')} className="chip-quiet">
                        {term(s, lang)}
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-8 text-muted">
        <span className="font-semibold text-ink">{d.skills.languagesTitle}</span> — {typeset(d.skills.languages, lang)}
      </p>
    </Section>
  )
}

function EducationAndAbout({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  return (
    <>
      <Section id="education" className="border-t border-line">
        <SectionTitle id="education" eyebrow="04" title={d.education.title} lang={lang} />
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {education.map((e) => (
            <li key={e.school} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <p className="font-bold">{e.school}</p>
                <p className="text-muted">{typeset(e.degree[lang], lang)}</p>
              </div>
              <p className="shrink-0 text-sm text-faint">
                {e.place[lang]} · <span className="metric">{formatRange(e.start, e.end, lang, e.endMonth)}</span>
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="about" className="border-t border-line">
        <SectionTitle id="about" eyebrow="05" title={d.about.title} lang={lang} />
        <div className="max-w-prose space-y-5 text-lg leading-relaxed text-muted">
          {d.about.paragraphs.map((p) => (
            <p key={p}>{typeset(p, lang)}</p>
          ))}
        </div>
      </Section>
    </>
  )
}

function Contact({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  return (
    <Section id="contact" className="border-t border-line">
      <div className="card relative overflow-hidden p-8 sm:p-12">
        <div className="backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <p className="eyebrow mb-3">06 · {d.nav.contact}</p>
          <h2 id="contact-title" className="max-w-2xl text-3xl font-bold sm:text-4xl">
            {typeset(d.contact.text, lang)}
          </h2>
          <div className="mt-8">
            <EmailActions lang={lang} />
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <ExternalLink href={site.linkedin} lang={lang}>
              LinkedIn
            </ExternalLink>
            <ExternalLink href={site.github} lang={lang}>
              GitHub
            </ExternalLink>
            <a href={d.cv.href} download className="link">
              <FileText size={14} aria-hidden="true" className="mr-1 inline align-[-2px]" />
              {d.cv.label} <span className="text-faint">({d.cv.note})</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Home({ lang }: { lang: Lang }) {
  const d = dictionaries[lang]
  return (
    <Layout lang={lang}>
      <Seo lang={lang} title={d.meta.homeTitle} description={d.meta.homeDescription} path={homePath(lang)} alternates={{ en: '/en/', fr: '/fr/' }} />
      <Hero lang={lang} />
      <Work lang={lang} />
      <ExperienceSection lang={lang} />
      <Skills lang={lang} />
      <EducationAndAbout lang={lang} />
      <Contact lang={lang} />
    </Layout>
  )
}

export const EnHome = () => <Home lang="en" />
export const FrHome = () => <Home lang="fr" />
