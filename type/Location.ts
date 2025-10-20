import { PaginationResponse } from '@/type/Common'

export interface LocationProps {
  id: number
  name: string
}

export interface LocationListResponse {
  data: LocationProps[]
  pagination: PaginationResponse
}
