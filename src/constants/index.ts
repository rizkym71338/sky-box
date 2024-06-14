import { FileIcon, StarIcon, TrashIcon, UploadCloudIcon } from 'lucide-react'

export const menus = [
  { label: 'My Files', href: '/', Icon: FileIcon },
  { href: '/upload', label: 'Upload File', Icon: UploadCloudIcon },
  { label: 'Starred Files', href: '/starred', Icon: StarIcon },
  { label: 'Trash', href: '/trash', Icon: TrashIcon },
]
