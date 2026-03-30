import { Star, Home, LayoutDashboardIcon, MessageCircle, Search, MessageSquare } from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/rooms",
    icon: MessageCircle,
  },
  {
    title: "Pricing & Roles",
    url: "/role",
    icon: Star,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Feedbacks",
    url: "/feedbacks",
    icon: MessageSquare,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
]
 
export function AppSidebar() {
  return (
    <Sidebar className="border-r border-brand-100/50 bg-brand-100/10">
      <SidebarHeader className="h-16 flex flex-row items-center gap-2 border-b border-brand-100/30 px-6">
        <MessageCircle className="size-6 text-brand-900" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-900 to-brand-700">
          YapYap
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-brand-900/70 font-medium">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-brand-100/30 hover:text-brand-900 transition-colors">
                    <a href={item.url} className="flex items-center gap-3 py-2">
                      <item.icon className="size-5 text-brand-700" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}