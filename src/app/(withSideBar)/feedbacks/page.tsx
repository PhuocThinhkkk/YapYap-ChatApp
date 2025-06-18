
import { SidebarTrigger, } from "@/components/ui/sidebar"
import UserIconWithSuspense from "@/components/UserIconWithSuspense"
import { MessageSquareHeart, Users, TrendingUp } from "lucide-react"
import {  FeedbackDb } from "@/type"
import TabFeedBack from "@/components/TabFeedBack"
import { getAllFeedbacks } from "@/lib/db/feedback"


export const revalidate = 3600 // revalidate at most every hour


export default async function FeedbackPage() {

  const initialFeedbacks : FeedbackDb[] = await getAllFeedbacks()

  const numberFeedbacks = initialFeedbacks.length;
  let totalRating = 0;
  let fiveStarRating = 0;

  for (let index = 0; index < initialFeedbacks.length; index++) {
    const element = initialFeedbacks[index];
    if (element.rating == 5) {
      fiveStarRating++
    }
    if (element.rating) {
      totalRating += element.rating;
    }
    
  }
  let averageRattingNumber = 0

  if (numberFeedbacks) {
    const averageRating = totalRating / numberFeedbacks
    averageRattingNumber = parseFloat(averageRating.toFixed(2))
  }
  
  return (
    <> 
    {/* Header with trigger for mobile */}
      <header className="flex h-20 items-center border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 font-semibold text-2xl">Feekback Center</h1>
        <div className="absolute right-8">
            <UserIconWithSuspense/>
          </div>
      </header>
      
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <MessageSquareHeart className="w-8 h-8" />
            </div>

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
                <p className="text-2xl font-bold text-gray-900">{numberFeedbacks}</p>
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
                <p className="text-2xl font-bold text-gray-900">{averageRattingNumber.toString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">{fiveStarRating}</p>
                <p className="text-gray-600">Five Star</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <TabFeedBack feedbacks={initialFeedbacks} /> 
        </div>
      </div>
    </div>
    </>
  )
}
