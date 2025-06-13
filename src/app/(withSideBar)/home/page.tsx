
import { SidebarTrigger } from "@/components/ui/sidebar"

 

export default async function Home() {
  

  return (
    <> 
    {/* Header with trigger for mobile */}
      <header className="flex h-14 items-center border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 text-lg font-semibold">Wellcome..</h1>
      </header>
      
      {/* Main content */}
      <div className="p-4 grid grid-cols-1 gap-4">
        
      </div>
    </>

       

  
  );
}
