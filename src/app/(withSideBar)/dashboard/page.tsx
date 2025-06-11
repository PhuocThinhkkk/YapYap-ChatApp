import { Area_Chart } from "@/components/area-chart"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Component } from "@/components/pie-chart"
import { BigAssChart } from "@/components/big-area-chart"
import UserIconWithSuspense from "@/components/UserIconWithSuspense"

const page = () => {
  return (
    <>
        {/* Header with trigger for mobile */}
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
          <div className="absolute right-8">
            <UserIconWithSuspense/>
          </div>
        </header>
        
        {/* Main content */}
        <div className="p-4 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
            <div className="col-span-2">
              <Area_Chart />
            </div>
            
            <Component />
          </div>
          <div>
            <BigAssChart/>
          </div>
         
        </div>
      
    </>
  )
}
export default page