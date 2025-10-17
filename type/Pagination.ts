export interface PaginationProps {
  onChange: (value: number) => void
  totalData: number
  page: number
  perPage: number
}

export type NavigationType = 'next' | 'previous' | 'index' | 'first' | 'last'

export interface PaginationResProps {
  page: number
  page_size: number
  total_rows: number
}
