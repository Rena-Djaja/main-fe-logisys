import { FC } from 'react'

export interface CustomTableProps {
  headers: TableHeaderProps[]
  data: { [key: string]: any }[] | []
  onChange: (val: number) => void
  isLoading?: boolean
  allowDetails?: boolean
  allowEdit?: boolean
  allowDelete?: boolean
  page: number
  perPage: number
  totalData: number
  onRowClick: (id: any) => void
  onUpdate: (id: any) => void
  onDelete: (id: any) => void
  customActions?: CustomActionProps[]
  customActionParam?: any
  allowedCustomAction?: (id: any) => void
}

export interface TableHeaderProps {
  key: string
  title: string
  customComponent?: FC<any>
}

export interface CustomActionProps {
  title: string
  link?: string
  onClick?: () => void
}
