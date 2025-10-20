import {
  CommonApiResponse,
  CommonOwnerProps,
  PaginationResponse,
} from '@/type/Common'
import { z } from 'zod'
import { supplierFormValidationSchema } from '@/validations/SupplierValidation'

export interface SupplierProps {
  id: number
  name: string
  location: string
  phone_number: string | null
  created_at: string
  created_by: CommonOwnerProps
  updated_at: string
  updated_by: CommonOwnerProps
}

export interface SupplierListResponse {
  data: SupplierProps[]
  pagination: PaginationResponse
}

export interface SupplierDetailsRequest {
  id: number
}

export interface SupplierDetailsResponse extends CommonApiResponse {
  data: SupplierProps
}

export type SupplierFormInputs = z.infer<typeof supplierFormValidationSchema>

export interface DeleteSupplierRequest {
  id: number
}
