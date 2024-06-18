'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { FileIcon, ImageIcon } from 'lucide-react'

interface UploadWidgetProps {
  name: string
  defaultValue?: string
}

export const UploadWidget = ({ name, defaultValue }: UploadWidgetProps) => {
  const [filePreview, setFilePreview] = useState(defaultValue || '')

  const Preview = () => {
    if (!filePreview) {
      return (
        <div className='flex w-full flex-col items-center justify-center p-4 text-sm'>
          <ImageIcon className='h-28 w-28 text-green-600' />
          Click to upload
        </div>
      )
    }

    if (['png', 'jpeg', 'jpg'].includes(filePreview.split('.').pop() || '')) {
      return <Image src={filePreview} alt='preview' width={200} height={200} className='aspect-video w-full object-cover' />
    }

    return (
      <div className='flex w-full flex-col items-center justify-center p-4'>
        <FileIcon className='h-28 w-28 text-green-600' />
      </div>
    )
  }

  return (
    <CldUploadWidget uploadPreset='sky-box' onSuccess={(result: any) => setFilePreview(result.info.secure_url || '')}>
      {({ open }) => (
        <div onClick={() => open()} className='flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-md bg-white'>
          <Preview />
          <input id={name} name={name} value={filePreview} type='text' className='hidden' readOnly />
        </div>
      )}
    </CldUploadWidget>
  )
}
