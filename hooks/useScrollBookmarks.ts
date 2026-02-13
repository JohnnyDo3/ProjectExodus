'use client'

import { useState, useEffect, useCallback } from 'react'

export interface ScrollBookmark {
  id: string
  topicId: string
  chapterIndex: number
  lessonIndex: number
  pageIndex: number
  title: string
  note?: string
  color: 'yellow' | 'green' | 'blue' | 'pink'
  createdAt: number
}

const STORAGE_KEY = 'scroll-bookmarks'

export function useScrollBookmarks(topicId: string) {
  const [bookmarks, setBookmarks] = useState<ScrollBookmark[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const allBookmarks: ScrollBookmark[] = JSON.parse(saved)
        // Filter to current topic
        setBookmarks(allBookmarks.filter(b => b.topicId === topicId))
      } catch {
        setBookmarks([])
      }
    }
    setIsLoaded(true)
  }, [topicId])

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((updated: ScrollBookmark[]) => {
    const saved = localStorage.getItem(STORAGE_KEY)
    let allBookmarks: ScrollBookmark[] = []
    if (saved) {
      try {
        allBookmarks = JSON.parse(saved)
      } catch {
        // Ignore parse errors
      }
    }
    // Remove current topic bookmarks and add updated ones
    const otherBookmarks = allBookmarks.filter(b => b.topicId !== topicId)
    const newAll = [...otherBookmarks, ...updated]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAll))
  }, [topicId])

  // Add a bookmark
  const addBookmark = useCallback((bookmark: Omit<ScrollBookmark, 'id' | 'createdAt'>) => {
    const newBookmark: ScrollBookmark = {
      ...bookmark,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    }
    setBookmarks(prev => {
      const updated = [...prev, newBookmark]
      saveBookmarks(updated)
      return updated
    })
    return newBookmark
  }, [saveBookmarks])

  // Remove a bookmark
  const removeBookmark = useCallback((id: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id)
      saveBookmarks(updated)
      return updated
    })
  }, [saveBookmarks])

  // Update a bookmark's note
  const updateBookmarkNote = useCallback((id: string, note: string) => {
    setBookmarks(prev => {
      const updated = prev.map(b =>
        b.id === id ? { ...b, note } : b
      )
      saveBookmarks(updated)
      return updated
    })
  }, [saveBookmarks])

  // Update a bookmark's color
  const updateBookmarkColor = useCallback((id: string, color: ScrollBookmark['color']) => {
    setBookmarks(prev => {
      const updated = prev.map(b =>
        b.id === id ? { ...b, color } : b
      )
      saveBookmarks(updated)
      return updated
    })
  }, [saveBookmarks])

  // Check if a page is bookmarked
  const isPageBookmarked = useCallback((chapterIndex: number, lessonIndex: number) => {
    return bookmarks.some(b =>
      b.chapterIndex === chapterIndex && b.lessonIndex === lessonIndex
    )
  }, [bookmarks])

  // Get bookmark for a page
  const getPageBookmark = useCallback((chapterIndex: number, lessonIndex: number) => {
    return bookmarks.find(b =>
      b.chapterIndex === chapterIndex && b.lessonIndex === lessonIndex
    )
  }, [bookmarks])

  // Toggle bookmark for a page
  const toggleBookmark = useCallback((
    chapterIndex: number,
    lessonIndex: number,
    pageIndex: number,
    title: string
  ) => {
    const existing = getPageBookmark(chapterIndex, lessonIndex)
    if (existing) {
      removeBookmark(existing.id)
      return null
    } else {
      return addBookmark({
        topicId,
        chapterIndex,
        lessonIndex,
        pageIndex,
        title,
        color: 'yellow',
      })
    }
  }, [topicId, getPageBookmark, removeBookmark, addBookmark])

  return {
    bookmarks,
    isLoaded,
    addBookmark,
    removeBookmark,
    updateBookmarkNote,
    updateBookmarkColor,
    isPageBookmarked,
    getPageBookmark,
    toggleBookmark,
  }
}
