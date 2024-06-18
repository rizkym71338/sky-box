import Link from 'next/link'
import { Fragment } from 'react'
import { auth } from '@clerk/nextjs/server'
import { UploadCloudIcon } from 'lucide-react'

import { FileCard } from '@/components'
import { db } from '@/libs'

export default async function RootPage() {
  const files = await db.file.findMany({ where: { clerkId: auth().userId!, inTrash: false }, orderBy: { createdAt: 'desc' } })

  const FileList = () => files.map((file) => <FileCard key={file.id} file={file} />)

  if (files.length === 0) {
    return (
      <section className='flex h-full flex-col items-center justify-center gap-3'>
        <h1 className='text-center font-semibold'>You don&apos;t have any files yet. Let&apos;s upload one</h1>
        <Link href='/upload' className='flex w-36 items-center justify-center gap-2 rounded bg-green-600 p-3 font-medium text-white'>
          <UploadCloudIcon className='h-5 w-5' /> Upload
        </Link>
      </section>
    )
  }

  return (
    <Fragment>
      <section className='mb-3 flex items-center gap-3'>
        <p className='w-full text-sm font-semibold'>Overview Storage</p>
        <Link href='/upload' className='flex items-center gap-2 rounded bg-green-600 p-3 text-xs font-medium text-white'>
          <UploadCloudIcon className='h-4 w-4' /> Upload
        </Link>
      </section>
      <section className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <FileList />
      </section>
    </Fragment>
  )
}
