'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Download, FileText, BookOpen, Calculator, Video,
  Search, Filter, ChevronRight, ExternalLink, Leaf,
  Droplet, Sun, Recycle, Home, Utensils, CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

type ResourceCategory = 'all' | 'guides' | 'checklists' | 'worksheets' | 'calculators' | 'videos'

interface Resource {
  id: string
  title: string
  description: string
  category: ResourceCategory
  format: string
  size?: string
  topic: string
  topicIcon: any
  topicColor: string
  downloadCount: number
  featured?: boolean
  url?: string
  isExternal?: boolean
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Carbon Footprint Reduction Guide',
    description: 'A comprehensive 20-page guide with actionable steps to reduce your carbon footprint by up to 50%.',
    category: 'guides',
    format: 'PDF',
    size: '2.4 MB',
    topic: 'Carbon',
    topicIcon: Leaf,
    topicColor: 'moss',
    downloadCount: 3420,
    featured: true
  },
  {
    id: '2',
    title: 'Home Energy Audit Checklist',
    description: 'Walk through your home room-by-room and identify opportunities to save energy and money.',
    category: 'checklists',
    format: 'PDF',
    size: '450 KB',
    topic: 'Energy',
    topicIcon: Sun,
    topicColor: 'terra',
    downloadCount: 2180
  },
  {
    id: '3',
    title: 'Water Conservation Tracker',
    description: 'Track your daily water usage and monitor your progress toward conservation goals.',
    category: 'worksheets',
    format: 'PDF',
    size: '380 KB',
    topic: 'Water',
    topicIcon: Droplet,
    topicColor: 'ocean',
    downloadCount: 1560
  },
  {
    id: '4',
    title: 'Carbon Footprint Calculator',
    description: 'Interactive tool to calculate your annual carbon footprint with personalized recommendations.',
    category: 'calculators',
    format: 'Interactive',
    topic: 'Carbon',
    topicIcon: Leaf,
    topicColor: 'moss',
    downloadCount: 8750,
    featured: true,
    url: '/tools/carbon-calculator',
    isExternal: false
  },
  {
    id: '5',
    title: 'Water Footprint Calculator',
    description: 'Discover your total water usage including virtual water hidden in food and products.',
    category: 'calculators',
    format: 'Interactive',
    topic: 'Water',
    topicIcon: Droplet,
    topicColor: 'ocean',
    downloadCount: 5230,
    url: '/tools/water-calculator',
    isExternal: false
  },
  {
    id: '6',
    title: 'Zero Waste Kitchen Guide',
    description: 'Transform your kitchen with tips for reducing food waste, plastic-free storage, and composting.',
    category: 'guides',
    format: 'PDF',
    size: '3.1 MB',
    topic: 'Zero Waste',
    topicIcon: Recycle,
    topicColor: 'moss',
    downloadCount: 2890
  },
  {
    id: '7',
    title: 'Sustainable Shopping Checklist',
    description: 'Questions to ask before every purchase to ensure you\'re making eco-friendly choices.',
    category: 'checklists',
    format: 'PDF',
    size: '290 KB',
    topic: 'Shopping',
    topicIcon: Home,
    topicColor: 'ocean',
    downloadCount: 1890
  },
  {
    id: '8',
    title: 'Seasonal Eating Calendar',
    description: 'Month-by-month guide to eating locally and seasonally in your region.',
    category: 'worksheets',
    format: 'PDF',
    size: '1.2 MB',
    topic: 'Food',
    topicIcon: Utensils,
    topicColor: 'terra',
    downloadCount: 2340
  },
  {
    id: '9',
    title: 'DIY Natural Cleaning Recipes',
    description: '15 easy recipes for non-toxic cleaning products using common household ingredients.',
    category: 'guides',
    format: 'PDF',
    size: '890 KB',
    topic: 'Home',
    topicIcon: Home,
    topicColor: 'ocean',
    downloadCount: 4120
  },
  {
    id: '10',
    title: 'Solar Panel Assessment Worksheet',
    description: 'Evaluate if solar is right for your home with this comprehensive assessment tool.',
    category: 'worksheets',
    format: 'PDF',
    size: '520 KB',
    topic: 'Energy',
    topicIcon: Sun,
    topicColor: 'terra',
    downloadCount: 1670
  },
  {
    id: '11',
    title: 'Composting Quick Start Guide',
    description: 'Everything you need to know to start composting in 10 minutes or less.',
    category: 'guides',
    format: 'PDF',
    size: '1.5 MB',
    topic: 'Zero Waste',
    topicIcon: Recycle,
    topicColor: 'moss',
    downloadCount: 3560,
    featured: true
  },
  {
    id: '12',
    title: 'Sustainable Wardrobe Audit',
    description: 'Assess your closet and create a plan for building a more sustainable wardrobe.',
    category: 'checklists',
    format: 'PDF',
    size: '410 KB',
    topic: 'Fashion',
    topicIcon: Home,
    topicColor: 'terra',
    downloadCount: 2010
  }
]

const categories = [
  { id: 'all', label: 'All Resources', icon: FileText },
  { id: 'guides', label: 'Guides', icon: BookOpen },
  { id: 'checklists', label: 'Checklists', icon: CheckCircle2 },
  { id: 'worksheets', label: 'Worksheets', icon: FileText },
  { id: 'calculators', label: 'Calculators', icon: Calculator },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.topic.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredResources = resources.filter(r => r.featured)

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-earth-900">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-moss-500 via-ocean-500 to-terra-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Download className="w-6 h-6" />
              <span className="font-bold">FREE RESOURCES</span>
            </div>
            <h1 className="text-5xl font-black mb-4">RESOURCE LIBRARY</h1>
            <p className="text-xl font-medium opacity-90 mb-8">
              Guides, checklists, worksheets, and tools to support your sustainability journey
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-earth-800 text-earth-900 dark:text-sand-100 font-medium border-0 shadow-lg focus:ring-4 focus:ring-white/30"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-black mb-6 text-earth-900 dark:text-sand-100">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => {
              const TopicIcon = resource.topicIcon
              return (
                <Card key={resource.id} className={`border-4 border-${resource.topicColor}-300 dark:border-${resource.topicColor}-700 hover:shadow-xl transition-all`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-${resource.topicColor}-100 dark:bg-${resource.topicColor}-900 flex items-center justify-center`}>
                        <TopicIcon className={`w-7 h-7 text-${resource.topicColor}-600 dark:text-${resource.topicColor}-400`} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${resource.topicColor}-100 dark:bg-${resource.topicColor}-900 text-${resource.topicColor}-700 dark:text-${resource.topicColor}-400`}>
                        {resource.format}
                      </span>
                    </div>
                    <h3 className="text-lg font-black mb-2 text-earth-900 dark:text-sand-100">{resource.title}</h3>
                    <p className="text-sm text-earth-600 dark:text-sand-400 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-earth-500 dark:text-sand-500">
                        {resource.downloadCount.toLocaleString()} downloads
                      </span>
                      {resource.url ? (
                        <Link href={resource.url}>
                          <Button size="sm" className="font-bold">
                            {resource.isExternal ? 'View' : 'Open'} <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      ) : (
                        <Button size="sm" className="font-bold">
                          Download <Download className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ResourceCategory)}
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

        {/* All Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TopicIcon = resource.topicIcon
            return (
              <Card key={resource.id} className="border-2 border-sand-200 dark:border-earth-700 hover:border-moss-400 dark:hover:border-moss-600 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${resource.topicColor}-100 dark:bg-${resource.topicColor}-900 flex items-center justify-center flex-shrink-0`}>
                      <TopicIcon className={`w-6 h-6 text-${resource.topicColor}-600 dark:text-${resource.topicColor}-400`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-earth-500 dark:text-sand-500 uppercase">{resource.topic}</span>
                        <span className="text-xs text-earth-400">•</span>
                        <span className="text-xs font-medium text-earth-400 dark:text-sand-600">{resource.format}</span>
                        {resource.size && (
                          <>
                            <span className="text-xs text-earth-400">•</span>
                            <span className="text-xs text-earth-400 dark:text-sand-600">{resource.size}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-black text-earth-900 dark:text-sand-100">{resource.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-earth-600 dark:text-sand-400 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-earth-500 dark:text-sand-500">
                      {resource.downloadCount.toLocaleString()} downloads
                    </span>
                    {resource.url ? (
                      <Link href={resource.url}>
                        <Button size="sm" variant="outline" className="font-bold">
                          Open <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    ) : (
                      <Button size="sm" variant="outline" className="font-bold">
                        Download <Download className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl font-bold text-earth-600 dark:text-sand-400">No resources found matching your criteria</p>
            <Button onClick={() => { setSelectedCategory('all'); setSearchQuery('') }} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
