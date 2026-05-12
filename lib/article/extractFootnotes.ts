/**
 * Extracts a footnotes block from an article's rendered HTML so it can
 * be displayed as a standalone sidebar widget instead of being lost at
 * the bottom of the article body — and so the References widget
 * doesn't pick up footnote URLs as "references".
 *
 * Different sources produce different markup, so we try several
 * detection patterns in order of confidence:
 *
 *   1. <ol> with <li id="(footnote|fn|sdfootnote|endnote|...)-?N">
 *      Covers mammoth's DOCX output AND LibreOffice/OpenOffice
 *      conventions (sdfootnote*) AND endnote variants.
 *   2. <ol class="footnotes">  — explicit legacy/styled output.
 *   3. <h2|h3>(?:Foot|End)notes</h2|h3> + numbered <p> entries.
 *      Used by our PDF-extraction fallback (textToHtml output).
 *   4. Catch-all: any <ol> near the END of the body where most <li>s
 *      have <a href="#..."> back-link anchors (mammoth's footnote
 *      list signature).
 *
 * Returns the article body with the footnote block removed and a
 * structured list of { number, html } entries the widget can render.
 */

export interface ExtractedFootnote {
  number: number
  html: string
}

export interface FootnoteExtractionResult {
  body: string
  footnotes: ExtractedFootnote[]
}

const FOOTNOTE_ID_RE = /^(?:footnote|fn|sdfootnote|endnote|edn|note)[-_]?(\d+)$/i
const BACK_REF_HREF_RE = /<a[^>]*href=["']#(?:footnote-?ref|footnoteref|sdfootnoteanc|endnote-?ref|fnref|_ftnref)[^"']*["'][^>]*>[\s\S]*?<\/a>/gi

function stripBackRef(html: string): string {
  return html.replace(BACK_REF_HREF_RE, '').trim()
}

export function extractFootnotes(html: string): FootnoteExtractionResult {
  if (!html) return { body: '', footnotes: [] }

  let body = html
  let footnotes: ExtractedFootnote[] = []

  // ── Pattern 1: <ol> whose <li>s have known footnote-style ids ────
  const olRe = /<ol\b[^>]*>([\s\S]*?)<\/ol>/gi
  let olMatch: RegExpExecArray | null
  while ((olMatch = olRe.exec(body)) !== null) {
    const fullOl = olMatch[0]
    const listInner = olMatch[1]

    // Parse every <li> inside and see how many match our id patterns.
    const liRe = /<li([^>]*)>([\s\S]*?)<\/li>/gi
    const items: { rawNum: number; html: string }[] = []
    let matched = 0
    let total = 0
    let liMatch: RegExpExecArray | null
    while ((liMatch = liRe.exec(listInner)) !== null) {
      total++
      const attrs = liMatch[1]
      const inner = liMatch[2]
      const idMatch = attrs.match(/\bid=["']([^"']+)["']/i)
      const idNum = idMatch ? idMatch[1].match(FOOTNOTE_ID_RE)?.[1] : undefined
      if (idNum) {
        matched++
        items.push({ rawNum: parseInt(idNum, 10), html: stripBackRef(inner) })
      } else {
        items.push({ rawNum: total, html: stripBackRef(inner) })
      }
    }

    // Treat this <ol> as a footnote list when at least half its
    // entries carry a footnote-style id.
    if (total > 0 && matched / total >= 0.5) {
      footnotes = items.map((it, i) => ({
        number: it.rawNum || i + 1,
        html: it.html,
      }))
      body = body.replace(fullOl, '').trim()
      break // only consume the first qualifying <ol>
    }
  }

  // ── Pattern 2: legacy/explicit <ol class="footnotes"> ────────────
  if (footnotes.length === 0) {
    const mammothBlockRe = /<ol[^>]*class=["'][^"']*\bfootnotes\b[^"']*["'][^>]*>([\s\S]*?)<\/ol>/i
    const mammothMatch = body.match(mammothBlockRe)
    if (mammothMatch) {
      const listInner = mammothMatch[1]
      const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
      let liMatch: RegExpExecArray | null
      let n = 1
      while ((liMatch = liRe.exec(listInner)) !== null) {
        footnotes.push({ number: n++, html: stripBackRef(liMatch[1]) })
      }
      body = body.replace(mammothMatch[0], '').trim()
    }
  }

  // ── Pattern 3: <h2|h3>Footnotes</h2|h3> + numbered <p> entries ──
  if (footnotes.length === 0) {
    const headingRe = /<h([23])>\s*(?:Foot|End)notes?\s*<\/h\1>([\s\S]*?)$/i
    const headingMatch = body.match(headingRe)
    if (headingMatch) {
      const tail = headingMatch[2]
      const pRe = /<p[^>]*>\s*(\d{1,3})[\.\)]\s*([\s\S]*?)<\/p>/gi
      let pMatch: RegExpExecArray | null
      let lastIdx = 0
      while ((pMatch = pRe.exec(tail)) !== null) {
        lastIdx = pRe.lastIndex
        footnotes.push({
          number: parseInt(pMatch[1], 10),
          html: pMatch[2].trim(),
        })
      }
      if (footnotes.length > 0) {
        // Drop the heading + consumed entries; keep anything past them.
        body = body.replace(headingMatch[0], tail.slice(lastIdx)).trim()
      }
    }
  }

  // ── Pattern 4 (catch-all): trailing <ol> with back-link anchors ─
  // Mammoth's footnote <li>s nearly always include an "↑" back-link
  // to the in-body marker. If we see that pattern in any <ol> at the
  // end of the document, treat it as a footnote list even if the IDs
  // didn't match.
  if (footnotes.length === 0) {
    const trailingOlRe = /<ol\b[^>]*>([\s\S]*?)<\/ol>\s*$/i
    const trailingMatch = body.match(trailingOlRe)
    if (trailingMatch) {
      const listInner = trailingMatch[1]
      const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
      let total = 0
      let withBackRef = 0
      const items: string[] = []
      let liMatch: RegExpExecArray | null
      while ((liMatch = liRe.exec(listInner)) !== null) {
        total++
        const inner = liMatch[1]
        if (BACK_REF_HREF_RE.test(inner)) withBackRef++
        BACK_REF_HREF_RE.lastIndex = 0 // reset RegExp /g state
        items.push(stripBackRef(inner))
      }
      if (total > 0 && withBackRef / total >= 0.5) {
        footnotes = items.map((html, i) => ({ number: i + 1, html }))
        body = body.replace(trailingMatch[0], '').trim()
      }
    }
  }

  return { body, footnotes }
}
