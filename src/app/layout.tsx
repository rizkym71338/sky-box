import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { cn } from '@/libs/utils'
import '@/styles/globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Sky Box',
  description: 'Sky Box is a file storage and sharing platform.',
}

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn('min-h-screen bg-gray-50 font-sans antialiased', fontSans.variable)}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
