
import { SidebarTrigger, } from "@/components/ui/sidebar"
import UserInformation from "@/components/UserInformation"
import { MessageSquareHeart, } from "lucide-react"
import { FeedbackDb } from "@/type"
import { getAllFeedbacks } from "@/lib/db/feedback"
import TabFeedBack from "@/components/TabFeedBack"



export const revalidate = 3600 // revalidate at most every hour


export default async function FeedbackPage() {
  "use cache"

  const feedbacks: FeedbackDb[] = await getAllFeedbacks()

  const numberFeedbacks = feedbacks.length
  let totalRating = 0
  let fiveStarRating = 0

  for (let i = 0; i < feedbacks.length; i++) {
    const el = feedbacks[i]
    if (el.rating === 5) fiveStarRating++
    if (el.rating) totalRating += el.rating
  }

  let averageRatingNumber = 0
  if (numberFeedbacks) {
    averageRatingNumber = parseFloat(
      (totalRating / numberFeedbacks).toFixed(2)
    )
  }



  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with trigger for mobile */}
      <header className="flex h-20 items-center border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 font-semibold text-2xl">Feekback Center</h1>
        <div className="absolute right-8">
          <UserInformation />
        </div>
      </header>

      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}

        <div className="bg-white/80">
          <div className="relative overflow-hidden border-b border-gray-100">
            <div className="absolute inset-0 bg-black/[0.02]" />

            <div className="relative container mx-auto px-6 py-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">

                {/* LEFT */}
                <div className="text-primary">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-red-400 rounded-xl">
                      <MessageSquareHeart className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold">
                      Feedback Hub
                    </h1>
                  </div>

                  <p className="text-sm text-brand-100 leading-relaxed max-w-md">
                    Your voice matters. Share your thoughts and help us create better experiences together.
                  </p>
                </div>

                {/* RIGHT — REDESIGNED STATS */}
                <div className="hidden md:flex justify-end">
                  <div className="flex items-center gap-6">

                    {/* STAT ITEM */}
                    <div className="flex flex-col items-end">
                      <p className="text-2xl font-bold text-primary leading-none">
                        {numberFeedbacks}
                      </p>
                      <p className="text-xs text-gray-500">
                        Feedbacks
                      </p>
                    </div>

                    {/* divider */}
                    <div className="h-8 w-px bg-gray-200" />

                    <div className="flex flex-col items-end">
                      <p className="text-2xl font-bold text-primary leading-none">
                        {averageRatingNumber}
                      </p>
                      <p className="text-xs text-gray-500">
                        Avg Rating
                      </p>
                    </div>

                    <div className="h-8 w-px bg-gray-200" />

                    <div className="flex flex-col items-end">
                      <p className="text-2xl font-bold text-primary leading-none">
                        {fiveStarRating}
                      </p>
                      <p className="text-xs text-gray-500">
                        5★ Reviews
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <TabFeedBack feedbacks={feedbacks} />
      </div>

    </main>
  )
}
