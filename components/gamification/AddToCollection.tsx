'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { FolderPlus, Check, Plus, X, Globe, Lock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  isPublic: boolean
  articleCount: number
  followerCount: number
  isOwner: boolean
}

interface AddToCollectionProps {
  articleId: string
  className?: string
}

export function AddToCollection({ articleId, className }: AddToCollectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [inCollections, setInCollections] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [newCollectionPublic, setNewCollectionPublic] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Fetch user's collections
  useEffect(() => {
    if (!isOpen) return

    async function fetchCollections() {
      setIsLoading(true)
      try {
        const res = await fetch('/api/collections?type=mine')
        const data = await res.json()
        if (data.success) {
          setCollections(data.data.collections)
          // Check which collections contain this article
          const containing = new Set<string>()
          for (const collection of data.data.collections) {
            const checkRes = await fetch(`/api/collections/${collection.id}`)
            const checkData = await checkRes.json()
            if (checkData.success) {
              const hasArticle = checkData.data.articles?.some((a: any) => a.id === articleId)
              if (hasArticle) containing.add(collection.id)
            }
          }
          setInCollections(containing)
        }
      } catch (error) {
        console.error('Error fetching collections:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCollections()
  }, [isOpen, articleId])

  // Add article to collection
  const addToCollection = async (collectionId: string) => {
    try {
      const res = await fetch(`/api/collections/${collectionId}/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId })
      })
      const data = await res.json()
      if (data.success) {
        setInCollections((prev) => new Set(prev).add(collectionId))
      }
    } catch (error) {
      console.error('Error adding to collection:', error)
    }
  }

  // Remove article from collection
  const removeFromCollection = async (collectionId: string) => {
    try {
      const res = await fetch(`/api/collections/${collectionId}/articles?articleId=${articleId}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setInCollections((prev) => {
          const newSet = new Set(prev)
          newSet.delete(collectionId)
          return newSet
        })
      }
    } catch (error) {
      console.error('Error removing from collection:', error)
    }
  }

  // Create new collection
  const createCollection = async () => {
    if (!newCollectionName.trim()) return
    setIsCreating(true)
    try {
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newCollectionName.trim(),
          isPublic: newCollectionPublic
        })
      })
      const data = await res.json()
      if (data.success) {
        setCollections((prev) => [...prev, data.data])
        // Add article to new collection
        await addToCollection(data.data.id)
        setShowCreateForm(false)
        setNewCollectionName('')
        setNewCollectionPublic(false)
      }
    } catch (error) {
      console.error('Error creating collection:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className={cn('gap-2', className)}
      >
        <FolderPlus className="w-4 h-4" />
        Save
        {inCollections.size > 0 && (
          <span className="ml-1 px-1.5 py-0.5 bg-[var(--primary)] text-white text-xs rounded-full">
            {inCollections.size}
          </span>
        )}
      </Button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-[var(--primary)]" />
                  <h3 className="font-bold text-[var(--foreground)]">Save to Collection</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-[var(--muted)]"
                >
                  <X className="w-5 h-5 text-[var(--muted-foreground)]" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="text-center py-8 text-[var(--muted-foreground)]">
                    Loading collections...
                  </div>
                ) : (
                  <>
                    {/* Create New Collection */}
                    {showCreateForm ? (
                      <div className="mb-4 p-4 bg-[var(--muted)]/50 rounded-xl space-y-3">
                        <input
                          type="text"
                          placeholder="Collection name"
                          value={newCollectionName}
                          onChange={(e) => setNewCollectionName(e.target.value)}
                          className="w-full px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                          autoFocus
                        />
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={newCollectionPublic}
                            onChange={(e) => setNewCollectionPublic(e.target.checked)}
                            className="rounded border-[var(--border)]"
                          />
                          Make this collection public
                        </label>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={createCollection}
                            disabled={!newCollectionName.trim() || isCreating}
                            className="flex-1"
                          >
                            {isCreating ? 'Creating...' : 'Create & Add'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setShowCreateForm(false)
                              setNewCollectionName('')
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowCreateForm(true)}
                        className="w-full flex items-center gap-3 p-3 mb-4 rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--muted)]/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
                          <Plus className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <span className="font-medium text-[var(--foreground)]">Create New Collection</span>
                      </button>
                    )}

                    {/* Collections List */}
                    {collections.length === 0 ? (
                      <div className="text-center py-8 text-[var(--muted-foreground)]">
                        <FolderPlus className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No collections yet</p>
                        <p className="text-xs">Create your first collection above</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {collections.map((collection) => {
                          const isInCollection = inCollections.has(collection.id)

                          return (
                            <button
                              key={collection.id}
                              onClick={() => {
                                if (isInCollection) {
                                  removeFromCollection(collection.id)
                                } else {
                                  addToCollection(collection.id)
                                }
                              }}
                              className={cn(
                                'w-full flex items-center gap-3 p-3 rounded-xl transition-colors',
                                isInCollection
                                  ? 'bg-[var(--primary)]/10 border border-[var(--primary)]'
                                  : 'bg-[var(--muted)]/50 hover:bg-[var(--muted)]'
                              )}
                            >
                              <div className={cn(
                                'w-10 h-10 rounded-lg flex items-center justify-center',
                                isInCollection ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'
                              )}>
                                {isInCollection ? (
                                  <Check className="w-5 h-5 text-white" />
                                ) : (
                                  <FolderPlus className="w-5 h-5 text-[var(--muted-foreground)]" />
                                )}
                              </div>
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-[var(--foreground)]">
                                    {collection.name}
                                  </span>
                                  {collection.isPublic ? (
                                    <Globe className="w-3 h-3 text-[var(--muted-foreground)]" />
                                  ) : (
                                    <Lock className="w-3 h-3 text-[var(--muted-foreground)]" />
                                  )}
                                </div>
                                <div className="text-xs text-[var(--muted-foreground)]">
                                  {collection.articleCount} articles
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)]" />
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
