import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatDate } from '@/lib/utils/format'
import { Clock, User } from 'lucide-react'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    readTime: number | null
    publishedAt: Date | null
    featured: boolean
    author: {
      name: string | null
      image: string | null
    }
    category: {
      name: string
      slug: string
    }
    _count?: {
      comments: number
    }
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="hover-lift h-full cursor-pointer border-4 border-ocean-200 hover:border-ocean-400 transition-all transform hover:scale-105 bg-white shadow-lg">
        <CardHeader className="pb-4">
          {article.featured && (
            <div className="mb-3">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-ocean-500 to-terra-500 inline-flex shadow-md">
                <span className="text-xs font-black text-white uppercase tracking-wide">Featured Article</span>
              </div>
            </div>
          )}
          <CardTitle className="text-2xl font-black line-clamp-2 mb-3" style={{ color: '#000' }}>
            {article.title}
          </CardTitle>
          <CardDescription className="text-sm font-bold" style={{ color: '#666' }}>
            {article.category.name.toUpperCase()}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {article.excerpt && (
            <p className="text-base font-medium line-clamp-3" style={{ color: '#444' }}>
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold" style={{ color: '#666' }}>
            {article.author.name && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-ocean-600" />
                <span className="text-ocean-700">{article.author.name}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-moss-600" />
                <span>{article.readTime} MIN READ</span>
              </div>
            )}
            {article.publishedAt && (
              <div className="text-xs uppercase tracking-wide">
                {formatDate(article.publishedAt)}
              </div>
            )}
          </div>

          {article._count && article._count.comments > 0 && (
            <div className="pt-2 border-t-2 border-sand-200">
              <span className="text-sm font-bold" style={{ color: '#666' }}>
                {article._count.comments} {article._count.comments === 1 ? 'COMMENT' : 'COMMENTS'}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
