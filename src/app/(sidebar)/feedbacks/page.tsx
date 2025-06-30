
import { SidebarTrigger, } from "@/components/ui/sidebar"
import UserInformation from "@/components/UserInformation"
import { MessageSquareHeart, } from "lucide-react"
import StatFeedback from "@/components/StatFeedback"



export const revalidate = 3600 // revalidate at most every hour


export default async function FeedbackPage() {

  
  
  return (
    <> 
    {/* Header with trigger for mobile */}
      <header className="flex h-20 items-center border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 font-semibold text-2xl">Feekback Center</h1>
        <div className="absolute right-8">
            <UserInformation/>
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
      <StatFeedback/>

    </div>
    </>
  )
}
