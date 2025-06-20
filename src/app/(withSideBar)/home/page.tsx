export const dynamic = 'force-dynamic'
import { SidebarTrigger } from "@/components/ui/sidebar"
import UserIconWithSuspense from "@/components/UserIconWithSuspense";
import { Button } from "@/components/ui/button"
import { Card, CardContent,} from "@/components/ui/card"
import {
  CreditCard,
} from "lucide-react"
import { getUserIdInSession } from "@/lib/session";
import Link from "next/link";
import AllCardFeature from "./CardLink";


export default async function Home() {
  
  const userId = await getUserIdInSession()
  

  return (
    <> 
    {/* Header with trigger for mobile */}
      <header className="flex h-14 items-center border-b px-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="ml-2 text-lg font-semibold">Home</h1>
        <div className="absolute right-8">
            <UserIconWithSuspense/>
          </div>
      </header>
      
      {/* Main content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Welcome back 👋</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Ready to connect and chat? Choose what youd like to do today.
          </p>
        </div>

        {/* Quick Actions Grid */}
       <AllCardFeature userId={userId}/>

        {/* Premium Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-blue-100 mb-4">Unlock unlimited rooms, advanced search, and exclusive features</p>
                <Link href="/role">
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                    <CreditCard className="h-4 w-4 mr-2" />
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="text-6xl opacity-20">⭐</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
      </main>
      </div>
    </>

       

  
  );
}