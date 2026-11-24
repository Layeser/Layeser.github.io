import { Head } from 'vite-react-ssg'
import { dictionaries } from '../lib/i18n'

/** Bilingual: on GitHub Pages the 404 page is served for any unknown URL, whatever its language. */
export function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <Head>
        <html lang="en" />
        <title>Page not found · Page introuvable — Sekou Kaba</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="grid max-w-3xl gap-12 sm:grid-cols-2">
        {(['en', 'fr'] as const).map((l) => {
          const d = dictionaries[l].notFound
          return (
            <section key={l} lang={l} aria-labelledby={`nf-${l}`}>
              <p className="metric text-sm text-faint">404</p>
              <h1 id={`nf-${l}`} className="mt-2 text-3xl font-bold">
                {d.title}
              </h1>
              <p className="mt-3 text-muted">{d.text}</p>
              <a href={`/${l}/`} className="link mt-6 inline-block">
                {d.home}
              </a>
            </section>
          )
        })}
      </div>
    </main>
  )
}
