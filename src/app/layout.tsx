import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YapYap",
  description: "For those who just cant stop yapping",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en"  className="h-full w-full p-0 m-0 box-border">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased box-border m-0 p-0`}
      >
          {children}
       <Toaster richColors/>
      </body>
    </html>
  );
}
