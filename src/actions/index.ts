'use server'

import { revalidatePath } from 'next/cache'

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

export const deleteFile = async (id: string) => {
  try {
    await db.file.update({ where: { id }, data: { inTrash: true } })
    revalidatePath('')
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export const deleteAllFile = async (clerkId: string) => {
  try {
    await db.file.deleteMany({ where: { clerkId, inTrash: true } })
    revalidatePath('')
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export const restoreFile = async (id: string) => {
  try {
    await db.file.update({ where: { id }, data: { inTrash: false } })
    revalidatePath('')
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export const renameFile = async (id: string, newName: string) => {
  try {
    await db.file.update({ where: { id }, data: { name: newName } })
    revalidatePath('')
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}

export const starFile = async (id: string, clerkId: string) => {
  try {
    const file = await db.file.findUnique({ where: { id } })

    if (!file) return { error: true }

    if (file.starreds?.includes(clerkId)) {
      await db.file.update({ where: { id }, data: { starreds: file.starreds?.filter((starred) => starred !== clerkId) } })
    } else {
      await db.file.update({ where: { id }, data: { starreds: [...(file?.starreds || []), clerkId] } })
    }

    revalidatePath('')
    return { error: false }
  } catch (error) {
    return { error: true }
  }
}
