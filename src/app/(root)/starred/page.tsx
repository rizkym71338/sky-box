import { Fragment } from 'react'
import { auth } from '@clerk/nextjs/server'

import { FileCard } from '@/components'
import { db } from '@/libs'

export default async function StarredPage() {
  const files = await db.file.findMany({ where: { inTrash: false, starreds: { has: auth().userId } }, orderBy: { createdAt: 'desc' } })

  const FileList = () => files.map((file) => <FileCard key={file.id} file={file} />)

  if (files.length === 0) {
    return (
      <section className='flex h-full flex-col items-center justify-center gap-3'>
        <h1 className='text-center font-semibold'>You don&apos;t have any files in starred</h1>
      </section>
    )
  }

  return (
    <Fragment>
      <section className='mb-3 flex items-center gap-3'>
        <p className='w-full text-sm font-semibold'>Starred</p>
      </section>
      <section className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <FileList />
      </section>
    </Fragment>
  )
}
