'use client'
import { SocketProvider } from "@/components/socketProvider";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SidebarOpenIcon } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LeftSideBar from "@/components/LeftSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = new QueryClient()
  return (
    <SocketProvider>
     `<div className="flex h-[calc(100vh-1rem)] w-screen border-4 ">
        <div className="fixed top-8 left-4 z-30 lg:hidden border rounded-sm">
          <Button className="bg-white hover:bg-slate-100 hover:cursor-pointer text-black text-sm" onClick={()=> setIsOpen(!isOpen)}>
            <SidebarOpenIcon/>
          </Button>
        </div>
        <QueryClientProvider client={queryClient}>  
          <LeftSideBar isOpen={isOpen}/>
          {children}
        </QueryClientProvider>
      </div>
    </SocketProvider>
  );
}
