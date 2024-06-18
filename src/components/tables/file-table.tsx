'use client'

import { ColumnDef } from '@tanstack/react-table'
import { File } from '@prisma/client'

import { Checkbox, DataTable } from '@/components'

interface FileTableProps {
  files: File[]
}

export const FileTable = ({ files }: FileTableProps) => {
  const columns: ColumnDef<File>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />,
      enableSorting: false,
      enableHiding: false,
    },
    { accessorKey: 'name', header: 'Name' },
  ]

  return <DataTable columns={columns} data={files} />
}
