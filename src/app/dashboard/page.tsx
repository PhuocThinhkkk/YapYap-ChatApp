import { Area_Chart } from "@/components/area-chart"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Component } from "@/components/pie-chart"
import { BigAssChart } from "@/components/big-area-chart"

const page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header with trigger for mobile */}
        <header className="flex h-14 items-center border-b px-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
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
            <BigAssChart></BigAssChart>
          </div>
         
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
export default page