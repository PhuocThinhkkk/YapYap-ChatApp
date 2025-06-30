export const dynamic = 'force-dynamic'
import { Area_Chart } from "@/components/area-chart"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Component } from "@/components/pie-chart"
import { BigAssChart } from "@/components/big-area-chart"
import UserInformation from "@/components/UserInformation"

const page = () => {
  return (
    <>
        {/* Header with trigger for mobile */}
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
          <div className="absolute right-8">
            <UserInformation/>
          </div>
        </header>
        
        {/* Main content */}
        <div className="p-4 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 ">
            <div className="col-span-3">
              <Area_Chart />
            </div>
            <div className="col-span-2">
               <Component />
            </div>
           
          </div>
          <div>
            <BigAssChart/>
          </div>
         
        </div>
      
    </>
  )
}
export default page