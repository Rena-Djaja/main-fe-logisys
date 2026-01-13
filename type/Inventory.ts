import { CommonApiResponse, PaginationResponse } from '@/type/Common'
import { z } from 'zod'
import {
  truckValidationSchema,
  warehouseValidationSchema,
} from '@/validations/InventoryValidation'

export interface InventoryPageProps {
  tab: string
}

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

export interface WarehouseDetailsResponse extends CommonApiResponse {
  data: WarehouseProps
}

export type WarehouseFormInputs = z.infer<typeof warehouseValidationSchema>

export type TruckFormInputs = z.infer<typeof truckValidationSchema>

export interface PostWarehouseRequest extends WarehouseFormInputs {
  id?: number
}

export interface PostTruckRequest {
  id?: number
  plate_number: string
  salesman_id: number
}
