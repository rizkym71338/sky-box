'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UploadCloudIcon } from 'lucide-react'

import { menus } from '@/constants'
import { cn } from '@/libs'

export const SidebarLayout = () => {
  const pathname = usePathname()

  return (
    <section className="fixed h-screen w-60 border-r bg-white p-3 max-sm:hidden">
      <Link href="/">
        <button className="mb-3 w-full border-b pb-3 text-xl font-extrabold text-green-600">Sky Box</button>
      </Link>

      <Link href="/upload" className="mb-6 flex items-center gap-3 rounded bg-green-600 p-3 text-sm font-medium text-white">
        <UploadCloudIcon /> Upload a file
      </Link>

      <div className="flex flex-col gap-1">
        {menus
          .filter(({ href }) => href !== '/upload')
          .map(({ href, label, Icon }, index) => (
            <Link
              key={index}
              href={href}
              className={cn(
                'flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100',
                pathname === href && 'bg-green-100 text-green-600',
              )}
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
      </div>
    </section>
  )
}
