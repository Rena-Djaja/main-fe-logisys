'use client'

import { TableHeaderProps } from '@/type/CustomTable'
import { formattedDate } from '@/lib/utils'
import { Badge } from '@/components/shared/ui/badge'
import { SavedLocationProps } from '@/type/SavedLocation'
import { handleFetchLocationType } from '@/lib/locations'

export const savedLocationListHeaders: TableHeaderProps[] = [
  {
    key: 'name',
    title: 'Nama Lokasi',
  },
  {
    key: 'address',
    title: 'Alamat',
  },
  {
    key: 'address_type',
    title: 'Jenis Lokasi',
    customComponent: ({ data }: { data: SavedLocationProps }) => (
      <Badge className="capitalize">
        {handleFetchLocationType(data.address_type)}
      </Badge>
    ),
  },
  {
    key: 'created_at',
    title: 'Tanggal Dibuat',
    customComponent: ({ data }: { data: SavedLocationProps }) => (
      <span>{formattedDate(data.created_at, true)}</span>
    ),
  },
  {
    key: 'updated_at',
    title: 'Terakhir Diperbaharui',
    customComponent: ({ data }: { data: SavedLocationProps }) => (
      <span>{formattedDate(data.updated_at, true)}</span>
    ),
  },
]
