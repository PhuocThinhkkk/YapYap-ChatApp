"use client"

import { 
  useState,
 } from "react"
import { 
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { 
  Star, 
  Search, 
  MessageSquare, 
  Filter, 
  X, 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FeedbackDb } from "@/type"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import BananaLoading from "./BananaLoading"

type FeedbackListProps = {
  feedbacks: FeedbackDb[]
}

export default function FeedbackList({ feedbacks }: FeedbackListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterRating, setFilterRating] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isRedirect, setIsRedirect] = useState(false)

  const route = useRouter()

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.user.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || feedback.category === filterCategory
    const matchesRating = filterRating === "all" || feedback.rating?.toString() === filterRating


    return matchesSearch && matchesCategory && matchesRating 
  })


  const clearFilters = () => {
    setFilterCategory("all")
    setFilterRating("all")
    setSearchTerm("")
  }

  const hasActiveFilters =
    filterCategory !== "all" || filterRating !== "all" || searchTerm !== ""

  async function redirectToProfile(userId : string){

    setIsRedirect(true) 
    route.push(`/users/${userId}`)
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-700 relative">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Community Feedback
            </h2>
            <p className="text-gray-600">
              {filteredFeedbacks.length} {filteredFeedbacks.length === 1 ? "feedback" : "feedbacks"} found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full sm:w-80 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-6 rounded-xl border-gray-200 hover:bg-gray-50 transition-all duration-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-blue-500 text-white text-xs px-2 py-1">
                  {
                    [
                      filterCategory !== "all",
                      filterRating !== "all",
                      searchTerm !== "",
                    ].filter(Boolean).length
                  }
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showFilters ? "max-h-40 opacity-100 mt-6 pt-6 border-t border-gray-200" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-3 items-center">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 h-10 rounded-xl border-gray-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="UI/UX">UI/UX Design</SelectItem>
                <SelectItem value="Performance">Performance</SelectItem>
                <SelectItem value="Feature Request">Feature Request</SelectItem>
                <SelectItem value="Bug Report">Bug Report</SelectItem>
                <SelectItem value="Support">Customer Support</SelectItem>
                <SelectItem value="General">General Feedback</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-40 h-10 rounded-xl border-gray-200">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="h-10 px-4 rounded-xl text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFeedbacks.length === 0 ? (
          <div className="col-span-full">
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2">No feedback found</p>
                <p className="text-gray-500 text-center max-w-md">
                  {hasActiveFilters
                    ? "Try adjusting your filters to see more results."
                    : "Be the first to share your feedback with us!"}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredFeedbacks.map((feedback, index) => ( 
            <Card
              onClick={ ()=> {
                redirectToProfile(feedback.user._id)
              }}
              key={feedback._id}
              className="hover:cursor-pointer bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-in fade-in-50 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                {/* Star Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* Feedback Message */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">{feedback.message}</p>

                {/* Category and Status Badges */}
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {feedback.category}
                  </Badge>
                  
                </div>

                {/* User Info */}
               
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={feedback.user.avatarUrl}
                      alt={feedback.user.name}
                    />
                    <AvatarFallback className="bg-slate-50 text-zinc-800">
                      {feedback.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{feedback.user.name}</p>
                    <p className="text-sm text-gray-600">
                      {feedback.title} • {(new Date(feedback.createdAt)).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
        )}


        <BananaLoading isRedirect={isRedirect}/>
      </div>
      
    </div>
  )
}
