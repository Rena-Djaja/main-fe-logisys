'use client'

import { CustomActionProps, TableHeaderProps } from '@/type/CustomTable'
import { UserProps } from '@/type/User'
import { formattedDate } from '@/lib/utils'
import { Badge } from '@/components/shared/ui/badge'
import StatusBadge from '@/components/shared/StatusBadge/StatusBadge'

export const userListHeaders: TableHeaderProps[] = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'email',
    title: 'Email',
  },
  {
    key: 'role_name',
    title: 'User Role',
    customComponent: ({ data }: { data: UserProps }) => (
      <Badge>{data.role_name}</Badge>
    ),
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
  {
    key: 'is_deleted',
    title: 'Status',
    customComponent: ({ data }: { data: UserProps }) => (
      <StatusBadge isActive={!data.is_deleted} />
    ),
  },
]

export const userCustomActions: CustomActionProps[] = [
  {
    title: 'Assign Area',
    link: '/users/assign-area',
  },
]
