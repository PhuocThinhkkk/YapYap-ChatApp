export const dynamic = 'force-dynamic'
import { SidebarTrigger } from "@/components/ui/sidebar"
import UserInformation from "@/components/UserInformation";
import SearchPageContent from "@/components/SearchPageContent";


export default async function Home() {
  

  return (
    <> 
    {/* Header with trigger for mobile */}
      <header className="flex h-14 items-center border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 text-lg font-semibold">Home</h1>
        <div className="absolute right-8">
            <UserInformation/>
          </div>
      </header>
      
      {/* Main content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <SearchPageContent/>
      </div>
    </>

       

  
  );
}