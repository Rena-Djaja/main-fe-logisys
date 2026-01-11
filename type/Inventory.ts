import { PaginationProps } from '@/type/Pagination'

export interface WarehouseProps {
  id: number
  name: string
  location: string
  created_at: string
  updated_at: string
}

export interface TruckProps {
  id: number
  salesman_id: number
  salesman_name: string
  plate_number: string
  created_at: string
  updated_at: string
}

export interface WarehouseListResponse {
  data: WarehouseProps[]
  pagination: PaginationProps
}

export interface TruckListResponse {
  data: TruckProps[]
  pagination: PaginationProps
}
