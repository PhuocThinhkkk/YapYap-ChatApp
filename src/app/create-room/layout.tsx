'use client'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <> 
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        <Toaster />
    </>
     
  );
}