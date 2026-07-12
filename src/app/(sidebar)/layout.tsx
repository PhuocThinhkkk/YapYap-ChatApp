import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import ReactQueryWrapper from "./react-query-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <> 
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <ReactQueryWrapper>
              {children}

            </ReactQueryWrapper>
           
          </SidebarInset>
      </SidebarProvider>
      
    </>
     
  );
}
