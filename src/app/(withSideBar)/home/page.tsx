export const dynamic = 'force-dynamic'
import { SidebarTrigger } from "@/components/ui/sidebar"
import UserIconWithSuspense from "@/components/UserIconWithSuspense";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Search,
  User,
  CreditCard,
  Star,
  UserPlus,
  LayoutDashboard,
  LucideIcon
} from "lucide-react"
import Link from "next/link"
import { getUserIdInSession } from "@/lib/session";

const quickActions = [
    {
      title: "Dashboard",
      description: "View your activity and recent conversations",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "bg-blue-500",
     
    },
    {
      title: "Chat Rooms",
      description: "Join public rooms or create your own",
      icon: MessageCircle,
      href: "/rooms",
      color: "bg-green-500",
     
    },
    {
      title: "Find Friends",
      description: "Discover and connect with new people",
      icon: UserPlus,
      href: "/search-friends",
      color: "bg-purple-500",
      badge: "I havent programmed it yet",
    },
    {
      title: "Search",
      description: "Find messages, users, and conversations",
      icon: Search,
      href: "/search",
      color: "bg-orange-500",
      badge: "I havent programmed it yet",
    },
    {
      title: "Feedbacks",
      description: "Share your thoughts and suggestions",
      icon: Star,
      href: "/feedbacks",
      color: "bg-yellow-500",
      badge: "I havent programmed it yet",
    },
  ]

  const profileActions = {
    title: "Profile",
    description: "Manage your account and preferences",
    icon: User,
    color: "bg-pink-500",
    badge: "New",
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

          {
            userId ? 
            <Link href={`/users/${userId}`}>
              <CardFeature
              title={profileActions.title}
              description={profileActions.description}
              icon={profileActions.icon } 
              badge={profileActions.badge}
              color={profileActions.color}
              />
            </Link> :
            <CardFeature
              title={profileActions.title}
              description={profileActions.description}
              icon={profileActions.icon } 
              badge={profileActions.badge}
              color={profileActions.color}
              />
          }


          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <CardFeature
              title={action.title}
              description={action.description}
              icon={action.icon } 
              badge={action.badge}
              color={action.color}
              />
            </Link>
          ))}
        </div>

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
type CardFeatureProps = {
  color: string;
  badge?: string;
  title: string;
  description: string;
  icon: LucideIcon; // <- component, not JSX element
};


function CardFeature (
  {
    color,
    badge,
    title,
    description,
    icon : Icon,
  } : CardFeatureProps
){
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${color} text-white`}>
            <Icon className="h-6 w-6" > 
            </Icon>
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}