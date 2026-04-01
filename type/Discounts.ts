import { BulkProductDetailsProps } from '@/type/Product'
import { z } from 'zod'
import {
  discountValidationSchema,
  productValidationSchema,
  variantItemValidationSchema,
  variantsParentValidationSchema,
} from '@/validations/DiscountValidation'
import { UseFormReturn } from 'react-hook-form'
import { CommonApiResponse, PaginationResponse } from '@/type/Common'

export interface DiscountRuleProps {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  valid_thru_days: number
  is_active: true
  is_combinable: false
  created_at: string
  created_by_id: number
  created_by_name: string
  updated_at: string
  updated_by_id: number
  updated_by_name: string
}

export interface DiscountRuleDetailsResponse extends CommonApiResponse {
  data: DiscountRuleProps
}

export interface DiscountRuleListResponse {
  data: DiscountRuleProps[]
  pagination: PaginationResponse
}

export interface ProductSchemaProps {
  open: boolean
  onClose: () => void
  onAdd: (data: BulkProductDetailsProps[]) => void
  products: DiscountProductFormInputs[]
}
export type DiscountFormInputs = z.infer<typeof discountValidationSchema>
export type DiscountProductFormInputs = z.infer<typeof productValidationSchema>
export type DiscountVariantParentFormInputs = z.infer<
  typeof variantsParentValidationSchema
>
export type DiscountVariantItemFormInputs = z.infer<
  typeof variantItemValidationSchema
>

export interface ItemVariantProps {
  productIdx: number
  variantIdx: number
  paymentType: 'cash' | 'credit'
  form: UseFormReturn<DiscountFormInputs>
}

export interface PostDiscountRequest {
  id?: number
  name: string
  description: string
  start_date: string
  end_date: string | null
  valid_thru_days: number
  is_combinable: boolean
  discount_items: VariantRequestProps[]
}

export interface VariantRequestProps {
  id?: number
  product_variant_id: number
  payment_type: 'cash' | 'credit'
  min_quantity: number
  max_quantity?: number
  discount_type: 'percentage' | 'price'
  discount_amount: number
  is_active: boolean
  limit?: number
}
