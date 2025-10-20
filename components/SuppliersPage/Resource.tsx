'use client'

import { TableHeaderProps } from '@/type/CustomTable'
import { UserProps } from '@/type/User'
import { formattedDate } from '@/lib/utils'

export const supplierListHeaders: TableHeaderProps[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'location',
    title: 'Location',
  },
  {
    key: 'phone_number',
    title: 'Phone Number',
  },
  {
    key: 'created_at',
    title: 'Date added',
    customComponent: ({ data }: { data: UserProps }) => (
      <span>{formattedDate(data.created_at, true)}</span>
    ),
  },
  {
    key: 'updated_at',
    title: 'Last Updated',
    customComponent: ({ data }: { data: UserProps }) => (
      <span>{formattedDate(data.updated_at, true)}</span>
    ),
  },
]
