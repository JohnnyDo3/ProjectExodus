'use client'

import { useState } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { Input } from './Input'
import { Button } from './Button'

interface SearchProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export function Search({ placeholder = 'Search...', onSearch, className = '' }: SearchProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <SearchIcon
          className="absolute left-4 top-1/2 -translate-y-1/2 text-moss-600 pointer-events-none"
          size={24}
        />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-14 pr-24 py-4 text-lg font-semibold border-4 border-moss-300 focus:border-moss-500 rounded-2xl"
          style={{ color: '#000' }}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 top-1/2 -translate-y-1/2 text-earth-500 hover:text-earth-700 transition-colors"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 font-black px-6 shadow-lg"
        >
          GO
        </Button>
      </div>
    </form>
  )
}
