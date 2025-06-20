import { Users, Sparkles } from "lucide-react"

interface SearchResultsProps {
  query: string
  resultCount: number
  totalCount: number
}

export function SearchResults({ query, resultCount, totalCount }: SearchResultsProps) {
  if (!query) {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20">
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-3 text-indigo-500" />
            <span className="font-medium">
              Showing all <span className="font-bold text-indigo-600">{totalCount}</span> amazing people
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-indigo-200/50 shadow-lg">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 mr-3 text-indigo-500" />
          <span className="text-gray-700 font-medium">
            Found <span className="font-bold text-indigo-600 text-lg">{resultCount}</span> user
            {resultCount !== 1 ? "s" : ""} matching
            <span className="font-semibold text-purple-600 ml-1">{query}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
