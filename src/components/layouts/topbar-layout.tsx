import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export const TopbarLayout = () => {
  return (
    <section className="fixed top-0 w-screen border-b bg-white py-3 sm:pl-60">
      <nav className="container flex items-center justify-between gap-3">
        <Link href="/" className="text-xl font-extrabold text-green-600 sm:invisible">
          Sky box
        </Link>
        <div className="h-7 w-7 rounded-full bg-gray-100">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </section>
  )
}
