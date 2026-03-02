import { z } from 'zod'
import {
  inOutValidationSchema,
  updateStatusValidationSchema,
} from '@/validations/InOutValidation'
import { CommonApiResponse, PaginationResponse } from '@/type/Common'

export type InOutFormInputs = z.infer<typeof inOutValidationSchema>

export interface PostInOutRequest {
  transaction_date: string
  location_id: number
  movement_type: string
  description: string
  is_draft: number
  items: {
    product_id: number
    variant_id: number
    quantity: number
  }[]
}

export interface InOutProps {
  id: string
  transaction_id: string
  transaction_date: string
  location_id: number
  warehouse_name: string
  plate_number: null
  movement_type: MovementTransactionType
  description: string
  status: number
}

export interface InOutListResponse {
  data: InOutProps[]
  pagination: PaginationResponse
}

export interface TransactionItemProps {
  id: number
  product_id: number
  product_name: string
  variant_id: number
  variant_name: string
  quantity: number
  unit: string
}

export enum MovementTransactionType {
  IN = 'IN',
  OUT = 'OUT',
}

export enum TransactionStatus {
  DELETED = 0,
  DRAFT = 1,
  CREATED = 2,
  UPDATED = 3,
  APPROVED = 4,
  TO_BE_REVISED = 5,
}

export interface PostInOutResponse extends CommonApiResponse {
  data: {
    transaction_id: string
  }
}

export type UpdateStatusFormInputs = z.infer<
  typeof updateStatusValidationSchema
>

export interface UpdateStatusRequest {
  id: string
  status: TransactionStatus
  notes: string
}

export interface InOutNotesProps {
  id: string
  open: boolean
  handleOpen: () => void
  mutate: () => void
}
