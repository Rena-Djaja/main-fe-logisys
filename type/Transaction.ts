import { z } from 'zod'
import { inOutValidationSchema } from '@/validations/InOutValidation'
import { CommonApiResponse } from '@/type/Common'

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

export interface PostInOutResponse extends CommonApiResponse {
  data: {
    transaction_id: string
  }
}
