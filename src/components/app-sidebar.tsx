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
    title: "Pricing",
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
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-900 to-brand-700">
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
                  <SidebarMenuButton asChild className="flex items-center p-4 font-medium hover:bg-gray-200 transition-colors">
                    <a href={item.url} className="flex items-center gap-0 py-6">
                      <item.icon className="font-bold size-15 text-black" />
                      <span className="text-[1rem]">{item.title}</span>
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