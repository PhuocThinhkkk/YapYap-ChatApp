export const dynamic = 'force-dynamic'
import { SidebarTrigger } from "@/components/ui/sidebar"
import ButtonCreateRoom from "@/components/ButtonCreateRoom"
import SearchRoom from "@/components/SearchRoom"
import AllRooms from "@/components/AllRooms"
import { Suspense } from "react"
import { RoomsLoadingSkeleton } from "@/components/RoomsLoadingSkeleton"
import { Card, CardContent } from "@/components/ui/card"
import UserInformation from "@/components/UserInformation"
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
          <UserInformation />
        </div>
      </header>

      <div className="px-3 sm:px-6 py-4 sm:py-6">
        {/* Toolbar Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 p-1 rounded-2xl ">
          <div className="w-full flex-1">
            <SearchRoom />
          </div>

          <div className="hidden lg:block w-px h-10 bg-slate-200"></div>

          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-4">
            <div className="text-left lg:text-right">
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">Start Your Own Room</h3>
              <p className="text-xs text-center text-slate-500 hidden sm:block">Create a space for your community</p>
            </div>
            <div className="flex-shrink-0">
              <ButtonCreateRoom />
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-3">
        {/* Friends - first on mobile, right on desktop */}
        <div className="order-1 lg:order-2">
          <Card className="border-none shadow-none ">
            <CardContent className="p-4 sm:p-6 lg:p-2">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-brand-700 to-brand-400 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
                      Friends
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Connect with your friends
                    </p>
                  </div>
                </div>
              </div>

              <FriendsList />
            </CardContent>
          </Card>
        </div>

        {/* Rooms - second on mobile, left on desktop */}
        <div className="order-2 lg:order-1 lg:col-span-3">
          <div className="space-y-6 sm:space-y-8">
            <Suspense fallback={<RoomsLoadingSkeleton />}>
              <AllRooms />
            </Suspense>
          </div>
        </div>
      </div>
     
      </div>
    </>
  )
}

export default Page
