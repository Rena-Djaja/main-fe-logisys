import { PaginationResponse } from '@/type/Common'

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
  pagination: PaginationResponse
}

export interface TruckListResponse {
  data: TruckProps[]
  pagination: PaginationResponse
}
