'use client'

import { TableHeaderProps } from '@/type/CustomTable'
import { formattedDate } from '@/lib/utils'
import { SupplierProps } from '@/type/Supplier'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'

export const supplierListHeaders: TableHeaderProps[] = [
  {
    key: 'name',
    title: 'Nama Supplier',
  },
  {
    key: 'address',
    title: 'Alamat',
  },
  {
    key: 'phone_number',
    title: 'No. Telp',
  },
  {
    key: 'created_at',
    title: 'Tanggal Dibuat',
    customComponent: ({ data }: { data: SupplierProps }) => (
      <span>{formattedDate(data.created_at, true)}</span>
    ),
  },
  {
    key: 'updated_at',
    title: 'Terakhir Diperbaharui',
    customComponent: ({ data }: { data: SupplierProps }) => (
      <span>{formattedDate(data.updated_at, true)}</span>
    ),
  },
  {
    key: 'is_deleted',
    title: 'Status',
    customComponent: ({ data }: { data: SupplierProps }) => (
      <StatusBadge isActive={!data.deleted_at} />
    ),
  },
]
