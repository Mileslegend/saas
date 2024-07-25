import React from 'react'
import { ThemeProvider } from "@/components/theme-provider"

import { ClerkLoaded } from '@clerk/nextjs';
import Header from '@/components/Header';



function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <ClerkLoaded>
         <html lang="en" suppressHydrationWarning>
        <body className={`min-h-screen h-screen overflow-hidden flex-1 flex flex-col `}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header component */}
            <Header />
            <main className='flex-1 overflow-y-auto'>
              {children}
            </main>
        
      </ThemeProvider>
      </body>
    </html>
    </ClerkLoaded>
   
  )
}

export default DashboardLayout