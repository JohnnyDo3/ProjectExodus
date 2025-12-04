'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Play, Clock, Eye, Search, Filter, ChevronRight,
  Leaf, Droplet, Sun, Recycle, Utensils, Shirt, Bookmark,
  ThumbsUp, Share2, ExternalLink
} from 'lucide-react'
import Link from 'next/link'

type VideoCategory = 'all' | 'climate' | 'water' | 'energy' | 'waste' | 'food' | 'fashion'

interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: number
  category: VideoCategory
  youtubeId: string
  featured?: boolean
  source: string
  sourceUrl: string
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Climate Change Explained in 6 Minutes',
    description: 'A clear, concise explanation of climate change, its causes, and its effects on our planet. Perfect for beginners wanting to understand the basics.',
    thumbnail: '/images/videos/climate-explained.jpg',
    duration: '6:12',
    views: 2340000,
    category: 'climate',
    youtubeId: 'oJAbATJCugs',
    featured: true,
    source: 'National Geographic',
    sourceUrl: 'https://www.youtube.com/watch?v=oJAbATJCugs'
  },
  {
    id: '2',
    title: 'How Your Carbon Footprint Is Calculated',
    description: 'Learn how scientists and calculators measure your personal carbon footprint and what factors contribute most to your emissions.',
    thumbnail: '/images/videos/carbon-footprint.jpg',
    duration: '8:45',
    views: 890000,
    category: 'climate',
    youtubeId: 'JvGy_JkErZE',
    source: 'TED-Ed',
    sourceUrl: 'https://www.youtube.com/watch?v=JvGy_JkErZE'
  },
  {
    id: '3',
    title: 'The Water Crisis Explained',
    description: 'Explore the global water crisis: why billions lack access to clean water and what solutions are being implemented around the world.',
    thumbnail: '/images/videos/water-crisis.jpg',
    duration: '10:22',
    views: 1560000,
    category: 'water',
    youtubeId: 'C65iqOSCZOY',
    featured: true,
    source: 'Kurzgesagt',
    sourceUrl: 'https://www.youtube.com/watch?v=C65iqOSCZOY'
  },
  {
    id: '4',
    title: 'Home Water Conservation Tips',
    description: 'Practical tips for reducing water usage at home. Learn simple changes that can save thousands of gallons per year.',
    thumbnail: '/images/videos/home-water.jpg',
    duration: '5:30',
    views: 456000,
    category: 'water',
    youtubeId: 'SqYmTnFMOzA',
    source: 'EPA WaterSense',
    sourceUrl: 'https://www.youtube.com/watch?v=SqYmTnFMOzA'
  },
  {
    id: '5',
    title: 'Solar Energy: How It Works',
    description: 'Discover how solar panels convert sunlight into electricity and why solar is becoming the world\'s fastest-growing energy source.',
    thumbnail: '/images/videos/solar-how.jpg',
    duration: '7:18',
    views: 2100000,
    category: 'energy',
    youtubeId: 'xKxrkht7CpY',
    featured: true,
    source: 'TED-Ed',
    sourceUrl: 'https://www.youtube.com/watch?v=xKxrkht7CpY'
  },
  {
    id: '6',
    title: 'Is Solar Right for Your Home?',
    description: 'A comprehensive guide to evaluating if solar panels make sense for your home, including cost analysis and common misconceptions.',
    thumbnail: '/images/videos/solar-home.jpg',
    duration: '12:45',
    views: 780000,
    category: 'energy',
    youtubeId: 'xrh6J9jlhJk',
    source: 'EnergySage',
    sourceUrl: 'https://www.youtube.com/watch?v=xrh6J9jlhJk'
  },
  {
    id: '7',
    title: 'Composting 101: Getting Started',
    description: 'Everything you need to know to start composting at home. From bin selection to troubleshooting common problems.',
    thumbnail: '/images/videos/composting-101.jpg',
    duration: '9:33',
    views: 1230000,
    category: 'waste',
    youtubeId: 'egyNJ7xPyoQ',
    featured: true,
    source: 'Epic Gardening',
    sourceUrl: 'https://www.youtube.com/watch?v=egyNJ7xPyoQ'
  },
  {
    id: '8',
    title: 'Zero Waste Living for Beginners',
    description: 'Start your zero waste journey with these practical, achievable tips. No need for perfection - every small change helps.',
    thumbnail: '/images/videos/zero-waste.jpg',
    duration: '11:20',
    views: 2890000,
    category: 'waste',
    youtubeId: 'sYKIOkVBQ8c',
    source: 'Sustainable Duo',
    sourceUrl: 'https://www.youtube.com/watch?v=sYKIOkVBQ8c'
  },
  {
    id: '9',
    title: 'The True Cost of Fast Fashion',
    description: 'Eye-opening documentary exploring the environmental and human impact of the fast fashion industry.',
    thumbnail: '/images/videos/fast-fashion.jpg',
    duration: '15:40',
    views: 4560000,
    category: 'fashion',
    youtubeId: 'tLfNUD0-8ts',
    featured: true,
    source: 'Fashion Revolution',
    sourceUrl: 'https://www.youtube.com/watch?v=tLfNUD0-8ts'
  },
  {
    id: '10',
    title: 'Building a Capsule Wardrobe',
    description: 'Step-by-step guide to creating a minimalist, sustainable wardrobe that works for your lifestyle.',
    thumbnail: '/images/videos/capsule-wardrobe.jpg',
    duration: '8:15',
    views: 1120000,
    category: 'fashion',
    youtubeId: 'V0f6YNKqr0E',
    source: 'The Anna Edit',
    sourceUrl: 'https://www.youtube.com/watch?v=V0f6YNKqr0E'
  },
  {
    id: '11',
    title: 'What is Regenerative Agriculture?',
    description: 'Learn how regenerative farming practices can restore soil health, sequester carbon, and produce healthier food.',
    thumbnail: '/images/videos/regen-ag.jpg',
    duration: '13:22',
    views: 890000,
    category: 'food',
    youtubeId: 'fSEtiixgRJI',
    source: 'Rodale Institute',
    sourceUrl: 'https://www.youtube.com/watch?v=fSEtiixgRJI'
  },
  {
    id: '12',
    title: 'How to Eat Sustainably',
    description: 'Practical tips for reducing the environmental impact of your food choices, from shopping to cooking to reducing waste.',
    thumbnail: '/images/videos/sustainable-eating.jpg',
    duration: '7:55',
    views: 1670000,
    category: 'food',
    youtubeId: 'nUnJQWO4YJY',
    source: 'Vox',
    sourceUrl: 'https://www.youtube.com/watch?v=nUnJQWO4YJY'
  }
]

const categories = [
  { id: 'all', label: 'All Videos', icon: Play, color: 'moss' },
  { id: 'climate', label: 'Climate', icon: Leaf, color: 'moss' },
  { id: 'water', label: 'Water', icon: Droplet, color: 'ocean' },
  { id: 'energy', label: 'Energy', icon: Sun, color: 'terra' },
  { id: 'waste', label: 'Zero Waste', icon: Recycle, color: 'moss' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'terra' },
  { id: 'fashion', label: 'Fashion', icon: Shirt, color: 'ocean' }
]

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K`
  }
  return views.toString()
}

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.source.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredVideos = videos.filter(v => v.featured)

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-earth-900">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-terra-500 via-moss-500 to-ocean-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Play className="w-6 h-6" />
              <span className="font-bold">VIDEO LIBRARY</span>
            </div>
            <h1 className="text-5xl font-black mb-4">LEARN THROUGH VIDEO</h1>
            <p className="text-xl font-medium opacity-90 mb-8">
              Curated educational videos from trusted sources to deepen your sustainability knowledge
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-earth-800 text-earth-900 dark:text-sand-100 font-medium border-0 shadow-lg focus:ring-4 focus:ring-white/30"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Videos */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-earth-900 dark:text-sand-100">Featured Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <a
                key={video.id}
                href={video.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="border-4 border-moss-300 dark:border-moss-700 hover:border-moss-500 dark:hover:border-moss-500 transition-all hover:shadow-xl overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-earth-200 dark:bg-earth-700">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-moss-600 to-ocean-600">
                      <Play className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-moss-600 dark:text-moss-400">{video.source}</span>
                      <ExternalLink className="w-3 h-3 text-moss-600 dark:text-moss-400" />
                    </div>
                    <h3 className="font-black text-earth-900 dark:text-sand-100 mb-2 line-clamp-2 group-hover:text-moss-600 dark:group-hover:text-moss-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-earth-600 dark:text-sand-400 line-clamp-2 mb-3">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-earth-500 dark:text-sand-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {formatViews(video.views)} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as VideoCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-moss-500 text-white shadow-lg'
                  : 'bg-white dark:bg-earth-800 text-earth-600 dark:text-sand-400 hover:bg-sand-100 dark:hover:bg-earth-700'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* All Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <a
              key={video.id}
              href={video.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border-2 border-sand-200 dark:border-earth-700 hover:border-moss-400 dark:hover:border-moss-600 transition-all overflow-hidden h-full">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-earth-200 dark:bg-earth-700">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-earth-600 to-earth-800">
                    <Play className="w-12 h-12 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-earth-500 dark:text-sand-500 uppercase">
                      {video.category}
                    </span>
                    <span className="text-xs text-earth-400">•</span>
                    <span className="text-xs font-medium text-earth-400 dark:text-sand-600">{video.source}</span>
                  </div>
                  <h3 className="font-bold text-earth-900 dark:text-sand-100 mb-2 line-clamp-2 group-hover:text-moss-600 dark:group-hover:text-moss-400 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-earth-500 dark:text-sand-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {formatViews(video.views)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl font-bold text-earth-600 dark:text-sand-400">No videos found matching your criteria</p>
            <Button onClick={() => { setSelectedCategory('all'); setSearchQuery('') }} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Curated Content Notice */}
        <div className="mt-16 text-center">
          <Card className="inline-block bg-moss-50 dark:bg-earth-800 border-2 border-moss-200 dark:border-moss-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-black text-earth-900 dark:text-sand-100 mb-2">
                Curated Educational Content
              </h3>
              <p className="text-earth-600 dark:text-sand-400 max-w-xl">
                All videos are carefully selected from reputable sources including National Geographic,
                TED-Ed, Kurzgesagt, and leading sustainability organizations. We link directly to the
                original creators to support their work.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
