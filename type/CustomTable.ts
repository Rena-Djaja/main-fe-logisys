export interface CustomTableProps {
  headers: TableHeaderProps[]
  data: { [key: string]: any }[] | []
  onChange: (val: number) => void
  isLoading?: boolean
  page: number
  perPage: number
  totalData: number
}

export interface TableHeaderProps {
  key: string
  title: string
}
