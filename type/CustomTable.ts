import { FC } from 'react'

export interface CustomTableProps {
  headers: TableHeaderProps[]
  data: { [key: string]: any }[] | []
  onChange: (val: number) => void
  isLoading?: boolean
  page: number
  perPage: number
  totalData: number
  onUpdate: (id: string | number) => void
  onDelete: (id: string | number) => void
}

export interface TableHeaderProps {
  key: string
  title: string
  customComponent?: FC<any>
}
