import { Head } from 'vite-react-ssg'
import { site } from '../content/site'

// "/" resolves to the stored language, else the browser language (fr* → French, anything else → English).
// The script runs before paint; without JavaScript the two links below are the page.
const redirect = `(function(){var l=null;try{l=localStorage.getItem('lang')}catch(e){}
if(l!=='en'&&l!=='fr'){l=((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase().indexOf('fr')===0?'fr':'en'}
location.replace('/'+l+'/'+location.hash)})()`

export function Root() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <Head>
        <html lang="en" />
        <title>Sekou Kaba — AI & Machine Learning Engineer</title>
        <meta name="description" content="AI & Machine Learning Engineer. English and French versions." />
        <link rel="canonical" href={`${site.url}/en/`} />
        <link rel="alternate" hrefLang="en" href={`${site.url}/en/`} />
        <link rel="alternate" hrefLang="fr" href={`${site.url}/fr/`} />
        <link rel="alternate" hrefLang="x-default" href={`${site.url}/en/`} />
        <script>{redirect}</script>
      </Head>
      <p className="flex gap-6 text-lg">
        <a className="link" href="/en/" hrefLang="en">
          English
        </a>
        <a className="link" href="/fr/" hrefLang="fr" lang="fr">
          Français
        </a>
      </p>
    </main>
  )
}
