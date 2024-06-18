'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menus } from '@/constants'
import { cn } from '@/libs'

export const BottombarLayout = () => {
  const pathname = usePathname()

  return (
    <section className='fixed bottom-0 flex w-screen items-center border-t bg-white sm:hidden'>
      {menus.map(({ href, label, Icon }, index) => (
        <Link
          key={index}
          href={href}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium transition-all',
            pathname === href && 'text-green-600',
          )}
        >
          <Icon className='h-4 w-4' /> {label}
        </Link>
      ))}
    </section>
  )
}
