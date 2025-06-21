'use client'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <> 
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <QueryClientProvider client={queryClient}>
              {children}
              </QueryClientProvider>
          </SidebarInset>
      </SidebarProvider>
      
    </>
     
  );
}
