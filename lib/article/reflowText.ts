/**
 * Reflow text extracted from a PDF so that visual lines within a
 * paragraph get joined back into a single paragraph, but explicit
 * paragraph breaks (blank lines, page joiners) are preserved.
 *
 * PDFs encode each visual line as its own text run. pdf-parse outputs
 * them with a single `\n` between lines, which the downstream editor
 * then renders as separate <p> blocks — so what was one paragraph in
 * the source becomes a stack of single-line paragraphs in the parse.
 *
 * Strategy:
 *   1. Normalize line endings.
 *   2. Split on blank-line boundaries (two-or-more newlines) — these are
 *      paragraph or page breaks from the original document.
 *   3. Within each block, join wrapped lines with a space, joining
 *      end-of-line hyphenations without a space ("hyphen-\nated" ->
 *      "hyphenated").
 *   4. Collapse runs of whitespace, drop empty blocks, rejoin with
 *      "\n\n" so each surviving block becomes one paragraph.
 */
export function reflowExtractedText(raw: string): string {
  if (!raw) return ''

  // 1. Normalize line endings to \n
  const normalized = raw.replace(/\r\n?/g, '\n')

  // If the source has zero blank lines, every line is adjacent and we
  // can't tell paragraphs from wrapped lines. Bail out and let the
  // downstream normalizePdfText (which has line-level heuristics for
  // sentence-end + capital-start, all-caps detection, etc.) handle it.
  if (!/\n\s*\n/.test(normalized)) {
    return normalized
  }

  // 2. Split on paragraph boundaries (blank lines)
  const blocks = normalized.split(/\n\s*\n+/)

  const reflowed = blocks.map(block => {
    // 3. Within a block, glue wrapped lines back into one paragraph.
    //    - "word-\nword" (hyphen at end of line) -> "wordword"
    //    - "word\nword"  (normal wrap)            -> "word word"
    const joined = block
      .replace(/-\n(\w)/g, '$1')   // strip end-of-line hyphenation
      .replace(/\n/g, ' ')           // remaining wraps become spaces

    // 4. Collapse internal whitespace, trim ends.
    return joined.replace(/[ \t]+/g, ' ').trim()
  }).filter(Boolean)

  return reflowed.join('\n\n')
}
