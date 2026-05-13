/**
 * Extracts a footnotes block from an article's rendered HTML so it can
 * be displayed as a standalone sidebar widget instead of being lost at
 * the bottom of the article body — and so the References widget
 * doesn't pick up footnote URLs as "references".
 *
 * Each extracted entry carries:
 *   - `number`   visible display number (1-indexed, what readers see)
 *   - `anchorId` the id attribute the widget renders, matched to the
 *                in-body marker's href so clicking [1] scrolls to it.
 *                Derived from the source order — zero-indexed sources
 *                (mammoth's #footnote-0) keep their zero-index ids.
 *   - `html`     the entry's body HTML, with the back-ref `↑` link stripped.
 */

export interface ExtractedFootnote {
  number: number
  anchorId: string
  html: string
}

export interface FootnoteExtractionResult {
  body: string
  footnotes: ExtractedFootnote[]
}

const FOOTNOTE_ID_RE = /^(?:footnote|fn|sdfootnote|endnote|edn|note)[-_]?(\d+)$/i
const BACK_REF_HREF_RE = /<a[^>]*href=["']#(?:footnote-?ref|footnoteref|sdfootnoteanc|endnote-?ref|fnref|_ftnref)([-_]?\d+)["'][^>]*>[\s\S]*?<\/a>/i

function stripBackRef(html: string): string {
  // /g flag because there can be multiple back-ref links in one footnote.
  return html
    .replace(/<a[^>]*href=["']#(?:footnote-?ref|footnoteref|sdfootnoteanc|endnote-?ref|fnref|_ftnref)[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
    .trim()
}

function backRefIndex(html: string): string | null {
  const m = html.match(BACK_REF_HREF_RE)
  if (!m) return null
  // Strip the leading separator (`-` or `_`) so we get just the number.
  return m[1].replace(/^[-_]/, '')
}

export function extractFootnotes(html: string): FootnoteExtractionResult {
  if (!html) return { body: '', footnotes: [] }

  let body = html
  let footnotes: ExtractedFootnote[] = []

  const buildAnchorId = (i: number, fromId?: string, fromBackRef?: string | null): string => {
    if (fromId) return fromId
    if (fromBackRef !== undefined && fromBackRef !== null) return `footnote-${fromBackRef}`
    return `footnote-${i + 1}`
  }

  // ── Pass A: any <ol> where the items either carry footnote-style ids
  // OR contain back-reference anchors (mammoth's "↑" link). This single
  // pass replaces the old patterns 1 and 4 — covers id-tagged items,
  // back-ref-tagged items, and items with neither (we just take the
  // numeric index from order in that case). The list doesn't have to
  // be at the very end of the body either, so a trailing empty <p> or
  // a heading after it doesn't break detection.
  if (footnotes.length === 0) {
    const olRe = /<ol\b[^>]*>([\s\S]*?)<\/ol>/gi
    let olMatch: RegExpExecArray | null
    while ((olMatch = olRe.exec(body)) !== null) {
      const fullOl = olMatch[0]
      const listInner = olMatch[1]
      const liRe = /<li([^>]*)>([\s\S]*?)<\/li>/gi
      const items: { anchorId: string; html: string }[] = []
      let total = 0
      let confidenceHits = 0
      let liMatch: RegExpExecArray | null
      while ((liMatch = liRe.exec(listInner)) !== null) {
        total++
        const attrs = liMatch[1]
        const inner = liMatch[2]
        const idAttrMatch = attrs.match(/\bid=["']([^"']+)["']/i)
        const idAttr = idAttrMatch?.[1]
        const idMatchesFootnote = idAttr && FOOTNOTE_ID_RE.test(idAttr)
        const backRef = backRefIndex(inner)
        if (idMatchesFootnote || backRef !== null) confidenceHits++
        const anchorId = buildAnchorId(items.length, idMatchesFootnote ? idAttr : undefined, backRef)
        items.push({ anchorId, html: stripBackRef(inner) })
      }
      // Treat as footnote list if at least half the <li>s carry a
      // footnote-shaped signal (matching id OR back-ref anchor).
      if (total > 0 && confidenceHits / total >= 0.5) {
        footnotes = items.map((it, i) => ({
          number: i + 1,
          anchorId: it.anchorId,
          html: it.html,
        }))
        body = body.replace(fullOl, '').trim()
        break
      }
    }
  }

  // ── Pass B: legacy/explicit <ol class="footnotes"> ───────────────
  if (footnotes.length === 0) {
    const mammothBlockRe = /<ol[^>]*class=["'][^"']*\bfootnotes\b[^"']*["'][^>]*>([\s\S]*?)<\/ol>/i
    const mammothMatch = body.match(mammothBlockRe)
    if (mammothMatch) {
      const listInner = mammothMatch[1]
      const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
      let liMatch: RegExpExecArray | null
      let n = 1
      while ((liMatch = liRe.exec(listInner)) !== null) {
        const inner = liMatch[1]
        const backRef = backRefIndex(inner)
        footnotes.push({
          number: n,
          anchorId: backRef !== null ? `footnote-${backRef}` : `footnote-${n}`,
          html: stripBackRef(inner),
        })
        n++
      }
      body = body.replace(mammothMatch[0], '').trim()
    }
  }

  // ── Pass C: heading containing "Footnotes" / "Notes" + entries ──
  if (footnotes.length === 0) {
    const headingPatterns: RegExp[] = [
      /<h([1-6])\b[^>]*>\s*(?:<(?:strong|b|em|i)\b[^>]*>\s*)?(?:Foot|End)?notes?\s*(?:<\/(?:strong|b|em|i)>\s*)?<\/h\1>([\s\S]*?)$/i,
      /<p[^>]*>\s*<(?:strong|b)\b[^>]*>\s*(?:Foot|End)?notes?\s*<\/(?:strong|b)>\s*<\/p>([\s\S]*?)$/i,
    ]
    for (const re of headingPatterns) {
      const headingMatch = body.match(re)
      if (!headingMatch) continue
      const tail = headingMatch[headingMatch.length - 1]
      const olAfter = tail.match(/^\s*<[ou]l\b[^>]*>([\s\S]*?)<\/[ou]l>/i)
      if (olAfter) {
        const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
        let liMatch: RegExpExecArray | null
        let n = 1
        while ((liMatch = liRe.exec(olAfter[1])) !== null) {
          const inner = liMatch[1]
          const backRef = backRefIndex(inner)
          footnotes.push({
            number: n,
            anchorId: backRef !== null ? `footnote-${backRef}` : `footnote-${n}`,
            html: stripBackRef(inner),
          })
          n++
        }
        if (footnotes.length > 0) {
          body = body.replace(headingMatch[0], tail.slice(olAfter[0].length)).trim()
          break
        }
      } else {
        const pRe = /<p[^>]*>\s*(\d{1,3})[\.\)]\s*([\s\S]*?)<\/p>/gi
        let pMatch: RegExpExecArray | null
        let lastIdx = 0
        while ((pMatch = pRe.exec(tail)) !== null) {
          lastIdx = pRe.lastIndex
          const num = parseInt(pMatch[1], 10)
          footnotes.push({
            number: num,
            anchorId: `footnote-${num}`,
            html: pMatch[2].trim(),
          })
        }
        if (footnotes.length > 0) {
          body = body.replace(headingMatch[0], tail.slice(lastIdx)).trim()
          break
        }
      }
    }
  }

  // ── Pass D: any block element containing ONLY a footnote-style label
  // (final fallback for unusual mammoth output). ───────────────────
  if (footnotes.length === 0) {
    const labelOnlyRe = /<(?:h[1-6]|p|div)\b[^>]*>\s*(?:<(?:strong|b|em|i)\b[^>]*>\s*)?(?:Foot|End)?notes?\s*:?\s*(?:<\/(?:strong|b|em|i)>\s*)?<\/(?:h[1-6]|p|div)>/i
    const labelMatch = body.match(labelOnlyRe)
    if (labelMatch && labelMatch.index !== undefined) {
      const before = body.slice(0, labelMatch.index)
      const after = body.slice(labelMatch.index + labelMatch[0].length)
      const listAfter = after.match(/^\s*<[ou]l\b[^>]*>([\s\S]*?)<\/[ou]l>/i)
      if (listAfter) {
        const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
        let liMatch: RegExpExecArray | null
        let n = 1
        while ((liMatch = liRe.exec(listAfter[1])) !== null) {
          const inner = liMatch[1]
          const backRef = backRefIndex(inner)
          footnotes.push({
            number: n,
            anchorId: backRef !== null ? `footnote-${backRef}` : `footnote-${n}`,
            html: stripBackRef(inner),
          })
          n++
        }
        if (footnotes.length > 0) {
          body = (before + after.slice(listAfter[0].length)).trim()
        }
      } else {
        const pRe = /<p[^>]*>\s*(\d{1,3})[\.\)]\s*([\s\S]*?)<\/p>/gi
        let pMatch: RegExpExecArray | null
        let lastIdx = 0
        while ((pMatch = pRe.exec(after)) !== null) {
          lastIdx = pRe.lastIndex
          const num = parseInt(pMatch[1], 10)
          footnotes.push({
            number: num,
            anchorId: `footnote-${num}`,
            html: pMatch[2].trim(),
          })
        }
        if (footnotes.length > 0) {
          body = (before + after.slice(lastIdx)).trim()
        }
      }
    }
  }

  return { body, footnotes }
}
