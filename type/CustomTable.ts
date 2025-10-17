import { FC } from 'react'

export interface CustomTableProps {
  headers: TableHeaderProps[]
  data: { [key: string]: any }[] | []
  onChange: (val: number) => void
  isLoading?: boolean
  page: number
  perPage: number
  totalData: number
  onRowClick: (id: any) => void
  onUpdate: (id: any) => void
  onDelete: (id: any) => void
}

export interface TableHeaderProps {
  key: string
  title: string
  customComponent?: FC<any>
}
