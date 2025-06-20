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
    <div className="max-w-3xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
          <div className="relative">
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-6 w-6" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, email, or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-16 pr-32 py-8 text-lg bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-gray-400 text-gray-700 font-medium"
              disabled={isLoading}
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="absolute right-24 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-xl"
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Searching...
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
