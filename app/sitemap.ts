import { MetadataRoute } from 'next'
import prisma from '@/lib/db/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://projectexodus.com'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/community/forum`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community/projects`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vendors`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  try {
    // Dynamic product pages
    const products = await prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    })

    const productPages = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Dynamic article pages
    const articles = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    })

    const articlePages = articles.map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Dynamic vendor pages
    const vendors = await prisma.vendor.findMany({
      select: { slug: true, updatedAt: true },
    })

    const vendorPages = vendors.map((vendor: any) => ({
      url: `${baseUrl}/vendors/${vendor.slug}`,
      lastModified: vendor.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...productPages, ...articlePages, ...vendorPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
