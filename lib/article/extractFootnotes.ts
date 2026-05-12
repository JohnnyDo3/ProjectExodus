/**
 * Extracts a footnotes block from an article's rendered HTML so it can
 * be displayed as a standalone sidebar widget instead of being lost at
 * the bottom of the article body.
 *
 * Handles two formats produced by our parse pipeline:
 *   1. Mammoth's DOCX output:    <ol class="footnotes"><li id="footnote-1">...</li>...</ol>
 *   2. PDF-extraction fallback:  <h2|h3>Footnotes</h2|h3> followed by
 *                                <p>1. text</p><p>2. text</p>...
 *
 * Returns the article body with the footnote block removed, and a
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

export function extractFootnotes(html: string): FootnoteExtractionResult {
  if (!html) return { body: '', footnotes: [] }

  let body = html
  const footnotes: ExtractedFootnote[] = []

  // ── Pattern 1: mammoth's <ol class="footnotes"> ──────────────────
  const mammothBlockRe = /<ol[^>]*class=["'][^"']*\bfootnotes\b[^"']*["'][^>]*>([\s\S]*?)<\/ol>/i
  const mammothMatch = body.match(mammothBlockRe)
  if (mammothMatch) {
    const listInner = mammothMatch[1]
    const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi
    let liMatch: RegExpExecArray | null
    let n = 1
    while ((liMatch = liRe.exec(listInner)) !== null) {
      // Mammoth appends a back-reference link like
      // <a href="#footnote-ref-1">↑</a>. Strip it for the widget — the
      // widget already provides its own navigation context.
      const cleaned = liMatch[1]
        .replace(/<a[^>]*href=["']#footnote-ref-[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '')
        .trim()
      footnotes.push({ number: n++, html: cleaned })
    }
    body = body.replace(mammothMatch[0], '').trim()
  }

  // ── Pattern 2: <h2|h3>Footnotes</h2|h3> + numbered <p> entries ──
  // PDF-sourced articles get a "## Footnotes" heading appended by
  // extract-trailing-pdf-footnotes -> textToHtml, which produces
  // <h3>Footnotes</h3><p>1. text</p><p>2. text</p>...
  const pdfHeadingRe = /<h([23])>\s*Footnotes\s*<\/h\1>([\s\S]*?)$/i
  const pdfMatch = body.match(pdfHeadingRe)
  if (pdfMatch) {
    const tail = pdfMatch[2]
    // Pull each "<p>N. text</p>". Allow optional ) or . after the
    // number. Stop at the first <p> that doesn't match (probably
    // unrelated content past the footnote block).
    const pRe = /<p[^>]*>\s*(\d{1,3})[\.\)]\s*([\s\S]*?)<\/p>/gi
    let pMatch: RegExpExecArray | null
    let consumed = ''
    while ((pMatch = pRe.exec(tail)) !== null) {
      consumed = tail.slice(0, pRe.lastIndex)
      footnotes.push({
        number: parseInt(pMatch[1], 10),
        html: pMatch[2].trim(),
      })
    }
    if (footnotes.length > 0 || consumed !== '') {
      // Remove the heading + consumed entries from the body.
      body = body.replace(pdfMatch[0], pdfMatch[2].slice(consumed.length)).trim()
    }
  }

  return { body, footnotes }
}
