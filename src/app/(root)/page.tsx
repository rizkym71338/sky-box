import { db } from '@/libs'
import { auth } from '@clerk/nextjs/server'
import { FileIcon, MoreVerticalIcon } from 'lucide-react'
import Image from 'next/image'

export default async function RootPage() {
  const files = await db.file.findMany({ where: { clerkId: auth().userId! }, orderBy: { createdAt: 'desc' } })

  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {files.map((file) => (
        <div key={file.id} className="rounded border bg-white">
          <div className="flex gap-3 p-3">
            <h2 className="w-full text-sm font-medium">{file.name}</h2>
            <MoreVerticalIcon className="h-4 w-4" />
          </div>
          {['png', 'jpg', 'jpeg'].includes(file.url.split('.').pop() || '') ? (
            <Image src={file.url} alt={file.name} width={200} height={200} className="aspect-video w-full border-y object-cover" />
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center border-y p-3">
              <FileIcon className="h-14 w-14 text-green-600" />
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
