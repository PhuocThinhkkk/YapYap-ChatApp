import { SidebarTrigger } from "@/components/ui/sidebar"
import ButtonCreateRoom from "@/components/ButtonCreateRoom"
import SearchRoom from "@/components/SearchRoom";
import AllRooms from "@/components/AllRooms";
import { Suspense } from "react";
import { RoomsLoadingSkeleton }from "@/components/RoomsLoadingSkeleton";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {  Plus } from "lucide-react";
import UserIconWithSuspense from "@/components/UserIconWithSuspense";

const Page = () => {
  return (
    <>
    {/* Header with trigger for mobile */}
    <header className="relative flex h-18 items-center border-b px-4">
      <SidebarTrigger className="md:hidden" />
      <h1 className="ml-2 text-lg font-semibold">Rooms</h1>
      <div className="absolute right-8">
        <UserIconWithSuspense/>
      </div>
    </header>


    <div className="mb-8 flex items-center justify-between">
      <Card className="w-full mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-slate-50">
        <CardContent className=" pb-4 px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Quick Join</h2>
            <p className="text-slate-600">Enter a room name or browse available rooms below</p>
          </div>
          <SearchRoom/>
        {/* Create Room Section */}
        <div className="text-center">
          <div className="md:w-2xl w-xl inline-flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
            <div className="hidden md:visible flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Start Your Own Room</h3>
              <p className="text-sm text-slate-600">Create a space for your community</p>
            </div>
           <ButtonCreateRoom/>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
    
    

    <div className="space-y-8">
      
      <Suspense fallback={<RoomsLoadingSkeleton/>}>
        <AllRooms/>
      </Suspense>
    
    </div>
    </>
    
  )
}

export default Page