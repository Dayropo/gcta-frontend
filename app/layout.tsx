import type { Metadata } from "next"
import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import ToastifyProvider from "@/providers/ToastifyProvider"
import TanstackProvider from "@/providers/TanstackProvider"
import { poppins } from "./fonts"

export const metadata: Metadata = {
  title: "Simple Blog",
  description: "A simple blog site",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TooltipProvider>
          <TanstackProvider>
            <ToastifyProvider>{children}</ToastifyProvider>
          </TanstackProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}
