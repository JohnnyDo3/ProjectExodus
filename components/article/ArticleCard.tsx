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
      <Card className="card-gradient hover-lift h-full cursor-pointer">
        <CardHeader>
          {article.featured && (
            <div className="text-xs text-ocean-600 font-medium mb-2">
              Featured Article
            </div>
          )}
          <CardTitle className="text-xl line-clamp-2">
            {article.title}
          </CardTitle>
          <CardDescription className="text-xs">
            {article.category.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {article.excerpt && (
            <p className="text-sm text-earth-700 line-clamp-3">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {article.author.name && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {article.author.name}
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} min read
              </div>
            )}
            {article.publishedAt && (
              <div>
                {formatDate(article.publishedAt)}
              </div>
            )}
          </div>

          {article._count && article._count.comments > 0 && (
            <div className="text-xs text-muted-foreground">
              {article._count.comments} {article._count.comments === 1 ? 'comment' : 'comments'}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
