import { Metadata } from 'next'

export const siteConfig = {
  name: 'Project Exodus',
  description: 'Building the world\'s most accessible sustainability hub. Discover eco-friendly products, learn sustainable practices, and join a community making real impact.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://projectexodus.com',
  ogImage: '/og-image.png',
  creator: '@projectexodus',
  keywords: [
    'sustainability',
    'eco-friendly products',
    'renewable energy',
    'water systems',
    'sustainable living',
    'environmental impact',
    'carbon footprint',
    'green technology',
    'sustainable materials',
    'community projects',
  ],
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  type = 'website',
  publishedTime,
  authors,
  keywords,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: string[]
  keywords?: string[]
}): Metadata {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name

  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaKeywords = keywords || siteConfig.keywords

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: authors ? authors.map(name => ({ name })) : [{ name: 'Project Exodus Team' }],
    creator: siteConfig.creator,
    openGraph: {
      type,
      locale: 'en_US',
      url: siteConfig.url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.creator,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(noIndex ? { metadataBase: null } : { metadataBase: new URL(siteConfig.url) }),
  }
}
