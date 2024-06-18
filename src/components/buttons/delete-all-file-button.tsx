'use client'

import { useUser } from '@clerk/nextjs'

import { deleteAllFile } from '@/actions'
import { Button } from '@/components'
import { useToast } from '@/hooks'

export const DeleteAllFileButton = () => {
  const { user } = useUser()

  const { toast } = useToast()

  const handleDeleteAllFile = async () => {
    const { error } = await deleteAllFile(user?.id!)

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' })
      return
    }

    toast({ title: 'Success', description: 'All files deleted successfully' })
  }

  return (
    <Button variant='destructive' onClick={handleDeleteAllFile}>
      Delete all
    </Button>
  )
}
