"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { UserGrid } from "@/components/grid-profile-card"
import { SearchResults } from "@/components/search-result"
import { useQuery,} from "@tanstack/react-query"
import { UserDB } from "@/type"
import { toast } from "sonner"
import { UIError } from "./ui-error"

export default function SearchPageContent() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResults, setSearchResults] = useState<UserDB[] >([])
  const [isSearching, setIsSearching] = useState(false)
  const initialFetch = useQuery({
        queryKey: ['Search'],
        queryFn: async () => {
        const response = await fetch(`/api/users`)
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Network response was not ok')
            }
            setSearchResults(data)
            setIsSearching(false)
            return data;
        },
        staleTime: 0, 
  }
  )

  if (initialFetch.isLoading && !isSearching) {
    setIsSearching(true)
  }

  const handleSearch = async (query: string) => {
    try{
        if (query.trim() === "") {
        return
        } 
        setIsSearching(true)
        setSearchQuery(query)

        // Simulate API call delay
        const res = await fetch(`/api/search?userName=${query}`)
        if(!res.ok){
            throw new Error(`${(await res.json()).message}`)
        }
        const data = await res.json() as UserDB[]
        const filtered = data.filter(
        (user) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user?.location?.toLowerCase().includes(query.toLowerCase()),
        )
        setSearchResults(filtered)
        setIsSearching(false)
    }catch(e){
        console.error(e);
        toast.error(`${e}`)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Discover People
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with amazing people from around the world. Find your next collaborator, friend, or mentor.
          </p>
        </div>
       
            <SearchBar onSearch={handleSearch} isLoading={isSearching} />

            <SearchResults query={searchQuery} resultCount={searchResults.length} totalCount={searchResults.length} />
        {
            initialFetch.error ? <UIError className="w-full" title={`${initialFetch.error}`}/> : <UserGrid users={searchResults} isLoading={isSearching} />
        }
      </div>
    </div>
  )
}
