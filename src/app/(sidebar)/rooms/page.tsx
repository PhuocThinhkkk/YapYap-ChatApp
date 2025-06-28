export const dynamic = 'force-dynamic'
import { SidebarTrigger } from "@/components/ui/sidebar"
import ButtonCreateRoom from "@/components/ButtonCreateRoom"
import SearchRoom from "@/components/SearchRoom"
import AllRooms from "@/components/AllRooms"
import { Suspense } from "react"
import { RoomsLoadingSkeleton } from "@/components/RoomsLoadingSkeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import UserIconWithSuspense from "@/components/UserIconWithSuspense"
import { Users } from "lucide-react"
import FriendsList from "@/components/FriendsList"

const Page = () => {
  return (
    <>
      {/* Header with trigger for mobile */}
      <header className="relative flex h-14 sm:h-16 items-center border-b px-3 sm:px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 text-base sm:text-lg font-semibold">Rooms</h1>
        <div className="absolute right-3 sm:right-8">
          <UserIconWithSuspense />
        </div>
      </header>

      <div className="px-3 sm:px-6 py-4 sm:py-6">
        <Card className="w-full mb-6 sm:mb-8 border-0 shadow-lg sm:shadow-xl bg-gradient-to-r from-white to-slate-50">
          <CardContent className="p-4 sm:pb-4 sm:px-8">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1 sm:mb-2">Quick Join</h2>
              <p className="text-sm sm:text-base text-slate-600">Enter a room name or browse available rooms below</p>
            </div>
            <SearchRoom />
            {/* Create Room Section */}
            <div className=" text-center mt-4 sm:mt-6">
              <div className="max-w-2xl w-full inline-flex flex-wrap sm:flex-nowrap justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="hidden sm:flex flex-shrink-0 mr-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-grow mb-2 sm:mb-0">
                  <h3 className="font-semibold text-slate-900">Start Your Own Room</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Create a space for your community</p>
                </div>
                <div className="w-full sm:w-auto">
                  <ButtonCreateRoom />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full mb-6 sm:mb-8 border-0 shadow-lg sm:shadow-xl bg-gradient-to-r from-white to-slate-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Friends</h2>
                  <p className="text-xs sm:text-sm text-slate-600">Connect with your friends</p>
                </div>
              </div>
            </div>
   
            <FriendsList />

          </CardContent>
        </Card>

        <div className="space-y-6 sm:space-y-8">
          <Suspense fallback={<RoomsLoadingSkeleton />}>
            <AllRooms />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Page
