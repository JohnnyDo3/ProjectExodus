'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileText, Plus, Edit2, Trash2 } from 'lucide-react'
import { WidgetWrapper } from '../WidgetWrapper'

interface ArticlesWidgetProps {
  articles: any[]
  onRemove?: () => void
  onDeleteArticle?: (id: string) => void
}

export function ArticlesWidget({
  articles,
  onRemove,
  onDeleteArticle,
}: ArticlesWidgetProps) {
  const router = useRouter()

  const handleEditArticle = (slug: string) => {
    router.push(`/articles/${slug}/edit`)
  }

  return (
    <WidgetWrapper
      id="articles"
      title="My Articles"
      icon={FileText}
      theme="accent"
      onRemove={onRemove}
      showRemove={!!onRemove}
      headerActions={
        <Link href="/articles/write">
          <button className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center hover:bg-[var(--primary)] transition-colors">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </Link>
      }
    >
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {articles.length > 0 ? (
          articles.map((article: any) => (
            <div key={article.id} className="relative group">
              <Link href={`/articles/${article.slug}`}>
                <div className="p-2.5 bg-gradient-to-br from-[var(--accent)]/5 to-transparent border border-[var(--accent)]/20 rounded-lg cursor-pointer hover:shadow-sm transition-all">
                  <h3 className="text-sm font-medium text-[var(--foreground)] line-clamp-1 pr-8">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-[var(--foreground)]/50 mt-1">
                    <span>{article._count?.comments || 0} comments</span>
                    {article.createdAt && (
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="absolute top-2 right-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleEditArticle(article.slug)
                  }}
                  className="w-5 h-5 bg-[var(--accent)] text-white rounded hover:bg-[var(--primary)] transition-colors flex items-center justify-center"
                  title="Edit"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDeleteArticle?.(article.id)
                  }}
                  className="w-5 h-5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center justify-center"
                  title="Delete"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <FileText className="w-10 h-10 text-[var(--foreground)]/20 mx-auto mb-2" />
            <p className="text-sm font-medium text-[var(--foreground)]/50">No articles yet</p>
            <Link href="/articles/write">
              <button className="mt-3 px-4 py-2 bg-[var(--accent)] text-white rounded-lg text-xs font-medium hover:bg-[var(--primary)] transition-colors">
                Write One
              </button>
            </Link>
          </div>
        )}
      </div>
    </WidgetWrapper>
  )
}
