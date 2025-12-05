'use client'

import { sanitizeHtml } from '@/lib/utils/sanitize'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Simple markdown to HTML conversion for basic syntax
  const convertMarkdownToHTML = (markdown: string): string => {
    let html = markdown

    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-black mt-10 mb-5">$1</h1>')

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')

    // Links - styled with theme primary color
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" style="color: var(--primary); text-decoration: underline;" target="_blank" rel="noopener noreferrer">$1</a>'
    )

    // Lists - Ordered
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-6 mb-2">$1</li>')
    html = html.replace(/(<li class="ml-6 mb-2">.*<\/li>\n?)+/g, '<ol class="list-decimal my-4 space-y-1">$&</ol>')

    // Lists - Unordered
    html = html.replace(/^[-*]\s+(.+)$/gm, '<li class="ml-6 mb-2 list-item">$1</li>')
    html = html.replace(/(<li class="ml-6 mb-2 list-item">.*<\/li>\n?)+/g, '<ul class="list-disc my-4 space-y-1">$&</ul>')

    // Paragraphs
    html = html.split('\n\n').map(para => {
      // Don't wrap headers, lists
      if (para.match(/^<[houl]/)) return para
      if (para.trim() === '') return ''
      return `<p class="mb-4 leading-relaxed">${para}</p>`
    }).join('\n')

    // Line breaks
    html = html.replace(/\n/g, '<br />')

    return html
  }

  return (
    <div
      className="article-content text-[var(--foreground)] text-lg"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(convertMarkdownToHTML(content)) }}
    />
  )
}
