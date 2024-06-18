'use client'

import { ReactNode, useState } from 'react'
import { File } from '@prisma/client'

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input } from '@/components'
import { renameFile } from '@/actions'
import { useToast } from '@/hooks'

interface RenameFileDialogProps {
  children: ReactNode
  file: File
}

export const RenameFileDialog = ({ children, file }: RenameFileDialogProps) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(file.name)

  const { toast } = useToast()

  const handleRenameFile = async () => {
    if (name == '' || name.length <= 5) {
      toast({ variant: 'destructive', title: 'Error', description: 'File name must be longer than 5 characters' })
      return
    }

    if (name == file.name) {
      toast({ variant: 'destructive', title: 'Error', description: 'File name must be different from current name' })
      return
    }

    const { error } = await renameFile(file.id, name)

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' })
      return
    }

    toast({ title: 'Success', description: 'File renamed successfully' })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <Input value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && handleRenameFile()} />
        <Button onClick={handleRenameFile}>Rename</Button>
      </DialogContent>
    </Dialog>
  )
}
