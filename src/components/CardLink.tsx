"use client"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BananaLoading from "@/components/BananaLoading";
import {
  MessageCircle,
  Search,
  User,
  Star,
  UserPlus,
  LucideIcon,
  LayoutDashboard,
} from "lucide-react"

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
      badge: "New",
    },
  ]

  const profileActions = {
    title: "Profile",
    description: "Manage your account and preferences",
    icon: User,
    color: "bg-pink-500",
  }





export default function AllCardFeature (
    {
        userId
    } : {
        userId : string | null
    }
){
    const [isRedirect, setIsRedirect] = useState(false)
    


  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {
        userId ? 
            <CardFeature
            setIsRedirect={setIsRedirect}
            href={`/users/${userId}`}
            title={profileActions.title}
            description={profileActions.description}
            icon={profileActions.icon } 
            color={profileActions.color}
            />
        :
        <CardFeature
            setIsRedirect={setIsRedirect}
            title={profileActions.title}
            description={profileActions.description}
            icon={profileActions.icon } 
            color={profileActions.color}
            />
        }


        {quickActions.map((action, index) => (
        <div key={index} >
            <CardFeature
            setIsRedirect={setIsRedirect}
            href={action.href}
            title={action.title}
            description={action.description}
            icon={action.icon } 
            badge={action.badge}
            color={action.color}
            />
        </div>
        ))}
    </div>
    {isRedirect && <BananaLoading isRedirect={isRedirect}/>}</>
  )
}




type CardFeatureProps = {
    setIsRedirect: (boolean : boolean) => void,
    href? : string
    color: string;
    badge?: string;
    title: string;
    description: string;
    icon: LucideIcon; // <- component, not JSX element
};


export function CardFeature (
  {
    setIsRedirect,
    href,
    color,
    badge,
    title,
    description,
    icon : Icon,
  } : CardFeatureProps
){
    const route = useRouter()
    function handleOnclick(){
        if (href) {
            setIsRedirect(true)
            route.push(href) 
            return
        }
        toast.info("Sign in to view.")
        return
    }
    return(
    <Card onClick={handleOnclick} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800">
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