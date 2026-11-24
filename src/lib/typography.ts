import type { Lang } from '../content/types'

const NNBSP = ' ' // narrow no-break space
const NBSP = ' '

/**
 * Typographic pass on prose (never on code spans):
 * - straight apostrophes → ’ in both languages;
 * - French: narrow no-break space before ; ! ? and inside « », no-break space before ':';
 * - both: no-break space between a number and %, ms, s, M, k, pt, × so units never wrap alone.
 */
export function typeset(text: string, lang: Lang): string {
  let t = text.replace(/(\w)'(\w)/g, '$1’$2').replace(/'/g, '’')
  if (lang === 'fr') {
    t = t
      .replace(/ ([;!?])/g, `${NNBSP}$1`)
      .replace(/ :(\s|$)/g, `${NBSP}:$1`)
      .replace(/« /g, `«${NNBSP}`)
      .replace(/ »/g, `${NNBSP}»`)
  }
  t = t.replace(/(\d) (%|ms\b|s\b|M\b|k\b|pt\b|×)/g, `$1${NNBSP}$2`)
  return t
}

export type Token =
  | { kind: 'text'; value: string }
  | { kind: 'strong'; value: string }
  | { kind: 'code'; value: string }
  | { kind: 'sup'; value: string }
  | { kind: 'sub'; value: string }

/** Minimal inline markup used in the content files: **bold**, `code`, ^{sup}, _{sub}. */
export function tokenize(src: string): Token[] {
  const out: Token[] = []
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\^\{([^}]+)\}|_\{([^}]+)\}/g
  let last = 0
  for (let m = re.exec(src); m; m = re.exec(src)) {
    if (m.index > last) out.push({ kind: 'text', value: src.slice(last, m.index) })
    if (m[1] !== undefined) out.push({ kind: 'strong', value: m[1] })
    else if (m[2] !== undefined) out.push({ kind: 'code', value: m[2] })
    else if (m[3] !== undefined) out.push({ kind: 'sup', value: m[3] })
    else if (m[4] !== undefined) out.push({ kind: 'sub', value: m[4] })
    last = re.lastIndex
  }
  if (last < src.length) out.push({ kind: 'text', value: src.slice(last) })
  return out
}

/** Plain-text version for <title>, meta tags and alt text. */
export function plain(src: string, lang: Lang): string {
  return typeset(
    tokenize(src)
      .map((t) => t.value)
      .join(''),
    lang,
  )
}
