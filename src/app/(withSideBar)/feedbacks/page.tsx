

import { MessageSquareHeart, Users, TrendingUp } from "lucide-react"
import { Feedback } from "@/type"
import TabFeedBack from "@/components/TabFeedBack"

export const revalidate = 3600 // revalidate at most every hour


export default function FeedbackPage() {

    const initialFeedbacks: Feedback[] = [
        {
            _id: "1",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            title: "Great user experience!",
            message:
            "I love how intuitive the interface is. The design is clean and everything works smoothly. Keep up the excellent work!",
            rating: 5,
            category: "UI/UX",
            createdAt: "2024-01-15",

        },
        {
            _id: "2",
            name: "Mike Chen",
            email: "mike@example.com",
            title: "Loading times could be improved",
            message:
            "The app is fantastic overall, but I've noticed some pages take a while to load, especially on mobile devices.",
            rating: 3,
            category: "Performance",
            createdAt: "2024-01-14",

        },
        {
            _id: "3",
            name: "Emily Rodriguez",
            title: "Missing dark mode",
            message:
            "Would love to see a dark mode option. It would be great for late-night usage and would look really modern.",
            rating: 4,
            category: "Feature Request",
            createdAt: "2024-01-13",

        },
        {
            _id: "4",
            name: "David Kim",
            email: "david@example.com",
            title: "Excellent customer support",
            message:
            "Had an issue and the support team resolved it within hours. Very impressed with the quick response and professionalism.",
            rating: 5,
            category: "Support",
            createdAt: "2024-01-12",
        
        },
    ]

    

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <MessageSquareHeart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Feedback Center
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Your voice matters. Share your thoughts and help us create amazing experiences together.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">totalFeedbacks</p>
                <p className="text-gray-600">Total Feedback</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">averageRating</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <MessageSquareHeart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">resolvedCount</p>
                <p className="text-gray-600">Resolved Issues</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <TabFeedBack feedbacks={initialFeedbacks} /> 
        </div>
      </div>
    </div>
  )
}
