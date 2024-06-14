import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

import { TopbarLayout, SidebarLayout, BottombarLayout, Toaster } from '@/components'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  if (!auth().userId) redirect('/sign-in')

  return (
    <main className="overflow-x-hidden">
      <TopbarLayout />
      <SidebarLayout />
      <section className="container mt-[53px] py-3 max-sm:mb-[52px] sm:pl-[252px]">{children}</section>
      <BottombarLayout />
      <Toaster />
    </main>
  )
}
