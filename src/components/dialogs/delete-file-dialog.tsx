'use client'

import { ReactNode, useState } from 'react'
import { File } from '@prisma/client'

import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components'
import { deleteFile, restoreFile } from '@/actions'
import { useToast } from '@/hooks'

interface DeleteFileDialogProps {
  children: ReactNode
  file: File
}

export const DeleteFileDialog = ({ children, file }: DeleteFileDialogProps) => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const handleDeleteFile = async () => {
    const { error } = await deleteFile(file.id)

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' })
      return
    }

    toast({ title: 'Success', description: 'File deleted successfully' })
  }

  const handleRestoreFile = async () => {
    const { error } = await restoreFile(file.id)

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' })
      return
    }

    toast({ title: 'Success', description: 'File restored successfully' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{file.inTrash ? 'Restore' : 'Delete'} File</DialogTitle>
          <DialogDescription>Are you sure you want to {file.inTrash ? 'restore' : 'delete'} this file? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className='flex gap-3'>
          <Button variant='outline' onClick={() => setOpen(false)} className='w-full'>
            Cancel
          </Button>
          <Button variant={file.inTrash ? 'default' : 'destructive'} onClick={file.inTrash ? handleRestoreFile : handleDeleteFile} className='w-full'>
            {file.inTrash ? 'Restore' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
