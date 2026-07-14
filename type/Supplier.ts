import {
  CommonApiResponse,
  CommonOwnerProps,
  PaginationResponse,
} from '@/type/Common'
import { z } from 'zod'
import { supplierFormValidationSchema } from '@/validations/SupplierValidation'

export interface SupplierProps {
  id: string
  name: string
  address: string
  phone_number: string
  location: {
    province_id: string
    province_name: string
    regency_id: string
    regency_name: string
    district_id: string
    district_name: string
    village_id: string
    village_name: string
    latitude: number
    longitude: number
  }
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface SupplierListResponse {
  suppliers: SupplierProps[]
  pagination: PaginationResponse
}

export interface SupplierDetailsRequest {
  supplier_id: string
}

export interface SupplierDetailsResponse extends CommonApiResponse {
  data: SupplierProps
}

export type SupplierFormInputs = z.infer<typeof supplierFormValidationSchema>

export interface DeleteSupplierRequest {
  id: number
}
