'use client'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown to HTML conversion for basic syntax
  const convertMarkdownToHTML = (markdown: string): string => {
    let html = markdown

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-2xl font-black mt-8 mb-4" style="color: #000">$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-3xl font-black mt-10 mb-6" style="color: #000">$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-4xl font-black mt-12 mb-8" style="color: #000">$1</h1>')

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-black">$1</strong>')

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')

    // Lists - Ordered
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-6 mb-3 text-xl font-bold" style="color: #000">$1</li>')
    html = html.replace(/(<li.*<\/li>\n?)+/g, '<ol class="list-decimal list-outside space-y-3 mb-8">$&</ol>')

    // Paragraphs
    html = html.split('\n\n').map(para => {
      // Don't wrap headers, lists
      if (para.match(/^<[houl]/)) return para
      if (para.trim() === '') return ''
      return `<p class="text-xl font-bold leading-relaxed mb-8" style="color: #000">${para}</p>`
    }).join('\n')

    // Line breaks
    html = html.replace(/\n/g, '<br />')

    return html
  }

  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(content) }}
    />
  )
}
