export type Lang = 'en' | 'fr'
export const LANGS: readonly Lang[] = ['en', 'fr'] as const

/** Text that exists in both languages. A missing language is a compile error. */
export interface Bi<T = string> {
  en: T
  fr: T
}

/** Rich inline text: plain strings, plus a few typographic tokens rendered by <Rich>. */
export type Rich = string

export interface ProofPoint {
  value: Rich
  label: string
}

export interface Dictionary {
  meta: { siteTitle: string; homeTitle: string; homeDescription: string; ogLocale: string; ogAlt: string }
  a11y: {
    skip: string
    nav: string
    toLight: string
    toDark: string
    language: string
    switchTo: string
    portraitAlt: string
    external: string
  }
  nav: { work: string; experience: string; skills: string; about: string; contact: string }
  cv: { label: string; href: string; note: string }
  hero: {
    role: string
    line: string
    availability: string
    proofs: [ProofPoint, ProofPoint, ProofPoint]
    ctaWork: string
  }
  work: {
    title: string
    intro: string
    personal: string
    featured: string
    more: string
    read: string
  }
  experience: {
    title: string
    intro: string
    clientWork: string
    clientNote: string
    publicReconstruction: string
    research: string
    stack: string
  }
  skills: {
    title: string
    intro: string
    notions: string
    inTraining: string
    languagesTitle: string
    languages: string
    legend: string
  }
  education: { title: string }
  about: { title: string; paragraphs: string[] }
  contact: {
    title: string
    text: string
    copy: string
    copied: string
    write: string
  }
  project: {
    back: string
    personal: string
    keyResults: string
    stack: string
    repo: string
    figure: string
    next: string
    headings: Record<SectionKind, string>
  }
  notFound: { title: string; text: string; home: string }
  footer: { built: string; licence: string; source: string }
}

export type SectionKind =
  | 'problem'
  | 'context'
  | 'approach'
  | 'results'
  | 'decisions'
  | 'limitations'
  | 'lessons'

export interface Metric {
  value: number
  digits: number
  /** suffix rendered after the formatted number: '%', ' ms', ' s'… */
  suffix?: string
  /** optional "from" value rendered as `from → value` */
  from?: number
  label: Bi
}

export interface Figure {
  /** path under /figures, without extension: both .webp and .png exist */
  src: string
  width: number
  height: number
  alt: Bi
  caption: Bi
}

export interface Section {
  kind: SectionKind
  body: Bi<Rich[]>
}

export interface Project {
  slug: string
  repo: string
  featured: boolean
  title: Bi
  line: Bi
  /** the single number on the card */
  headline: Metric
  /** extra context for the card number, e.g. "rules: 0.426" */
  headlineNote: Bi
  metrics: Metric[]
  stack: string[]
  sections: Section[]
  figures: Figure[]
}

export interface Role {
  title: Bi
  start: string // YYYY-MM
  end: string // YYYY-MM
  bullets: Bi<Rich[]>
  highlight?: Bi
}

export interface Experience {
  id: string
  org: Bi
  place: Bi
  roles: Role[]
  stack: string[]
  client?: { note: Bi; reconstructionSlug: string }
}

export interface Education {
  school: string
  degree: Bi
  place: Bi
  start: string
  end: string
  /** show the month of the end date (the CV states "Oct. 2026", "Jul. 2021") */
  endMonth: boolean
}

/** A skill name: a plain string when it reads the same in both languages, else a Bi. */
export type Term = string | Bi

export interface SkillGroup {
  title: Bi
  items: Term[]
  notions?: Term[]
  inTraining?: Term[]
}
