'use client'

import { useState } from 'react'
import Image from 'next/image'
import { File } from '@prisma/client'
import { FileIcon, MoreVerticalIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

import { DeleteFileDialog, Popover, PopoverContent, PopoverTrigger, RenameFileDialog } from '@/components'
import { starFile } from '@/actions'
import { useToast } from '@/hooks'

interface FileCardProps {
  file: File
}

export const FileCard = ({ file }: FileCardProps) => {
  const [open, setOpen] = useState(false)

  const { user } = useUser()
  const { toast } = useToast()

  const handleDownloadFile = () => {
    fetch(file.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.download = file.name
        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }

  const handleStarFile = async () => {
    const { error } = await starFile(file.id, user?.id!)

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' })
      return
    }

    toast({ title: 'Success', description: `File ${file.starreds.includes(user?.id!) ? 'unstarred' : 'starred'} successfully` })
  }

  return (
    <div className='rounded border bg-white'>
      <div className='flex gap-3 p-3'>
        <h2 className='w-full text-sm font-medium'>{file.name}</h2>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <MoreVerticalIcon className='h-4 w-4' />
          </PopoverTrigger>
          <PopoverContent align='end' className='flex w-fit flex-col p-1 shadow-none'>
            <RenameFileDialog file={file}>
              <button className='w-full rounded p-3 py-1 text-xs font-medium hover:bg-gray-50'>Rename</button>
            </RenameFileDialog>
            <button onClick={handleStarFile} className='w-full rounded p-3 py-1 text-xs font-medium hover:bg-gray-50'>
              {file.starreds.includes(user?.id!) ? 'Unstar' : 'Star'}
            </button>
            <button onClick={handleDownloadFile} className='w-full rounded p-3 py-1 text-xs font-medium hover:bg-gray-50'>
              Download
            </button>
            <DeleteFileDialog file={file}>
              <button className='w-full rounded p-3 py-1 text-xs font-medium hover:bg-gray-50'>{file.inTrash ? 'Restore' : 'Delete'}</button>
            </DeleteFileDialog>
          </PopoverContent>
        </Popover>
      </div>
      {['png', 'jpg', 'jpeg'].includes(file.url.split('.').pop() || '') ? (
        <Image src={file.url} alt={file.name} width={200} height={200} className='aspect-video w-full border-y object-cover' />
      ) : (
        <div className='flex aspect-video w-full flex-col items-center justify-center border-y p-3'>
          <FileIcon className='h-14 w-14 text-green-600' />
        </div>
      )}
    </div>
  )
}
