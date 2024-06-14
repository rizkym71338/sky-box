'use server'

import { db } from '@/libs'

interface UploadFileProps {
  clerkId: string
  name: string
  url: string
}

export const uploadFile = async (data: UploadFileProps) => {
  try {
    await db.file.create({ data })
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}
