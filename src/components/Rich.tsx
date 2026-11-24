import { Fragment } from 'react'
import type { Lang } from '../content/types'
import { tokenize, typeset } from '../lib/typography'

/** Renders content strings with their inline markup and the language's typography. */
export function Rich({ text, lang }: { text: string; lang: Lang }) {
  return (
    <>
      {tokenize(text).map((t, i) => {
        switch (t.kind) {
          case 'strong':
            return (
              <strong key={i} className="font-semibold text-ink">
                {typeset(t.value, lang)}
              </strong>
            )
          case 'code':
            return (
              <code key={i} className="rounded bg-raised px-1 py-0.5 font-mono text-[0.85em]">
                {t.value}
              </code>
            )
          case 'sup':
            return <sup key={i}>{t.value}</sup>
          case 'sub':
            return <sub key={i}>{t.value}</sub>
          default:
            return <Fragment key={i}>{typeset(t.value, lang)}</Fragment>
        }
      })}
    </>
  )
}
