'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

import { uploadFile } from '@/actions'
import { Button, Input, UploadWidget } from '@/components'
import { useToast } from '@/hooks'

export default function UploadPage() {
  const [isPending, startTransition] = useTransition()

  const { user } = useUser()

  const { toast } = useToast()

  const { push } = useRouter()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const { error } = await uploadFile({
        name: formData.get('name') as string,
        url: formData.get('file') as string,
        clerkId: user?.id as string,
      })

      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong' })
      } else {
        toast({ title: 'Success', description: 'File uploaded successfully' })
        push('/')
      }
    })
  }

  return (
    <section>
      <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-3">
        <Input name="name" placeholder="File Name" />
        <UploadWidget name="file" />
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit
        </Button>
      </form>
    </section>
  )
}
