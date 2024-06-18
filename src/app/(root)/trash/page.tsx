import { Fragment } from 'react'
import { auth } from '@clerk/nextjs/server'

import { DeleteAllFileButton, FileCard } from '@/components'
import { db } from '@/libs'

export default async function TrashPage() {
  const files = await db.file.findMany({ where: { clerkId: auth().userId!, inTrash: true }, orderBy: { createdAt: 'desc' } })

  const FileList = () => files.map((file) => <FileCard key={file.id} file={file} />)

  if (files.length === 0) {
    return (
      <section className='flex h-full flex-col items-center justify-center gap-3'>
        <h1 className='text-center font-semibold'>You don&apos;t have any files in trash</h1>
      </section>
    )
  }

  return (
    <Fragment>
      <section className='mb-3 flex items-center gap-3'>
        <p className='w-full text-sm font-semibold'>Trash</p>
        <DeleteAllFileButton />
      </section>
      <section className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <FileList />
      </section>
    </Fragment>
  )
}
