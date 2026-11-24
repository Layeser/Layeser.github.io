import { Head } from 'vite-react-ssg'
import { site } from '../content/site'
import type { Lang } from '../content/types'
import { dictionaries } from '../lib/i18n'

interface Props {
  lang: Lang
  title: string
  description: string
  /** path of this page, e.g. /en/projects/fraudguard/ */
  path: string
  /** the same page in each language, for hreflang */
  alternates: Record<Lang, string>
}

/** Per-language title, description, canonical, hreflang and Open Graph tags. */
export function Seo({ lang, title, description, path, alternates }: Props) {
  const d = dictionaries[lang]
  const url = `${site.url}${path}`
  const ogImage = `${site.url}/og-${lang}.png`
  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={`${site.url}${alternates.en}`} />
      <link rel="alternate" hrefLang="fr" href={`${site.url}${alternates.fr}`} />
      <link rel="alternate" hrefLang="x-default" href={`${site.url}${alternates.en}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={d.meta.ogAlt} />
      <meta property="og:locale" content={d.meta.ogLocale} />
      <meta property="og:locale:alternate" content={dictionaries[lang === 'en' ? 'fr' : 'en'].meta.ogLocale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#060911" />
    </Head>
  )
}
