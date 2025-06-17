"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, Search, Calendar, User, Mail, MessageSquare, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Feedback } from "@/type"

type FeedbackListProps = {
  feedbacks: Feedback[]
}

export default function FeedbackList({ feedbacks }: FeedbackListProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterRating, setFilterRating] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [showFilters, setShowFilters] = useState(false)

    const filteredFeedbacks = feedbacks.filter((feedback) => {
        const matchesSearch =
        feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = filterCategory === "all" || feedback.category === filterCategory
        const matchesRating = filterRating === "all" || feedback.rating.toString() === filterRating
     
        return matchesSearch && matchesCategory && matchesRating 
    })

  

    const getCategoryEmoji = (category: string) => {
        const emojis: { [key: string]: string } = {
        "UI/UX": "🎨",
        Performance: "⚡",
        "Feature Request": "💡",
        "Bug Report": "🐛",
        Support: "🤝",
        General: "💬",
        }
        return emojis[category] || "📝"
    }

    const renderStars = (rating: number) => {
        return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                className={`w-4 h-4 transition-colors ${
                star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
            />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-700">({rating})</span>
        </div>
        )
    }

    const clearFilters = () => {
        setFilterCategory("all")
        setFilterRating("all")
        setFilterStatus("all")
        setSearchTerm("")
    }

    const hasActiveFilters =
        filterCategory !== "all" || filterRating !== "all" || filterStatus !== "all" || searchTerm !== ""

    return (
        <div className="space-y-8">
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
                className="h-12 px-6 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                    <Badge className="ml-2 bg-blue-500 text-white text-xs px-2 py-1">
                    {
                        [
                        filterCategory !== "all",
                        filterRating !== "all",
                        filterStatus !== "all",
                        searchTerm !== "",
                        ].filter(Boolean).length
                    }
                    </Badge>
                )}
                </Button>
            </div>
            </div>

            {/* Filters */}
            {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-3 items-center">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48 h-10 rounded-xl border-gray-200">
                    <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="UI/UX">🎨 UI/UX Design</SelectItem>
                    <SelectItem value="Performance">⚡ Performance</SelectItem>
                    <SelectItem value="Feature Request">💡 Feature Request</SelectItem>
                    <SelectItem value="Bug Report">🐛 Bug Report</SelectItem>
                    <SelectItem value="Support">🤝 Customer Support</SelectItem>
                    <SelectItem value="General">💬 General Feedback</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-40 h-10 rounded-xl border-gray-200">
                    <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ 5 Stars</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ 4 Stars</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ 3 Stars</SelectItem>
                    <SelectItem value="2">⭐⭐ 2 Stars</SelectItem>
                    <SelectItem value="1">⭐ 1 Star</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 h-10 rounded-xl border-gray-200">
                    <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">🟡 Pending</SelectItem>
                    <SelectItem value="reviewed">🔵 Reviewed</SelectItem>
                    <SelectItem value="resolved">🟢 Resolved</SelectItem>
                    </SelectContent>
                </Select>

                {hasActiveFilters && (
                    <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="h-10 px-4 rounded-xl text-gray-600 hover:text-gray-900"
                    >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                    </Button>
                )}
                </div>
            </div>
            )}
        </div>

        {/* Feedback Grid */}
        <div className="grid gap-6">
            {filteredFeedbacks.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2">No feedback found</p>
                <p className="text-gray-500 text-center max-w-md">
                    {hasActiveFilters
                    ? "Try adjusting your filters to see more results."
                    : "Be the first to share your feedback with us!"}
                </p>
                </CardContent>
            </Card>
            ) : (
            filteredFeedbacks.map((feedback, index) => (
                <Card
                key={feedback._id}
                className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                        <div className="flex items-start gap-3">
                        <div className="text-2xl">{getCategoryEmoji(feedback.category)}</div>
                        <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                            {feedback.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-medium">{feedback.name}</span>
                            </div>
                            {feedback.email && (
                                <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span>{feedback.email}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>
                                {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                                </span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:items-end gap-3">
                        {renderStars(feedback.rating)}
                        <div className="flex gap-2">
                        <Badge variant="outline" className="rounded-full px-3 py-1 font-medium">
                            {feedback.category}
                        </Badge>
                        </div>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
                    </div>
                </CardContent>
                </Card>
            ))
            )}
        </div>
        </div>
    )
}
