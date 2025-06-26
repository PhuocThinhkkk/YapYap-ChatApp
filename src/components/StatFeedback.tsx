import { MessageSquareHeart, Users, TrendingUp } from "lucide-react"
import {  FeedbackDb } from "@/type"
import { getAllFeedbacks } from "@/lib/db/feedback"
import TabFeedBack from "@/components/TabFeedBack"

const StatFeedback = async () => {
    "use cache"
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
    let averageRatingNumber = 0

    if (numberFeedbacks) {
        const averageRating = totalRating / numberFeedbacks
        averageRatingNumber = parseFloat(averageRating.toFixed(2))
    }
  return (
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
                <p className="text-2xl font-bold text-gray-900">{averageRatingNumber.toString()}</p>
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
  )
}

export default StatFeedback