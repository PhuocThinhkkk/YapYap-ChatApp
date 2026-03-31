"use client"

import type React from "react"
import { useState } from "react"
import { Search, X, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-900 via-brand-700 to-brand-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
          <div className="relative flex items-center">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Search by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-32 py-6 text-sm md:text-base bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-gray-400 text-gray-700 font-medium h-14"
              disabled={isLoading}
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="absolute right-[110px] top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-lg text-gray-400"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="hover:cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 px-6 h-10 bg-brand-900 hover:bg-brand-900/90 text-white rounded-xl shadow-md transition-all duration-200 font-medium text-sm"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Searching
                </div>
              ) : (
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Search
                </div>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
