import {
  CommonApiResponse,
  CommonDetailsRequest,
  PaginationResponse,
} from '@/type/Common'
import { z } from 'zod'
import {
  truckValidationSchema,
  warehouseValidationSchema,
} from '@/validations/InventoryValidation'
import { itemDialogValidationSchema } from '@/validations/ItemDialogValidation'
import { UseFormReturn } from 'react-hook-form'

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

export interface TruckDetailsResponse extends CommonApiResponse {
  data: TruckProps
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

export interface ProductStockRequest extends CommonDetailsRequest {
  category?: 'selling_item' | 'complimentary'
  product_id?: number
}

export interface ProductStockProps {
  product_id: number
  product_name: string
  sku: string
  category: string
  unit: string
  product_variant_id: number
  product_variant_name: string
  quantity: number
}

export interface InventoryLocationProps {
  id: number
  location_type: LocationType
  warehouse_name: string | null
  salesman_name: string | null
}

export interface InventoryLocationListResponse {
  data: InventoryLocationProps[]
  pagination: PaginationResponse
}

export enum LocationType {
  WAREHOUSE = 'warehouse',
  TRUCK = 'truck',
}

export type ItemDialogFormInputs = z.infer<typeof itemDialogValidationSchema>

export interface ItemDialogProps {
  baseForm: UseFormReturn<any>
  isOpen: boolean
  handleDialog: () => void
  fields: ItemRowProps[]
  handleAdd: (data: ItemRowProps) => void
}

export interface ItemRowProps {
  product_id: string
  variant_id: string
  quantity: string
  unit: string
}
