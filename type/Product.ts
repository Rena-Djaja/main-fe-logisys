import {
  CommonApiResponse,
  CommonFilterRequest,
  PaginationResponse,
} from '@/type/Common'
import { z } from 'zod'
import {
  productDetailsSchema,
  productFormValidationSchema,
} from '@/validations/ProductValidation'
import { UseFormReturn } from 'react-hook-form'

export interface ProductListFilterProps extends CommonFilterRequest {
  product_type?: 'selling_item' | 'complimentary'
}

export interface ProductProps {
  id: number
  supplier_id: number
  supplier_name: string
  name: string
  sku: string
  category: string
  unit: string
  base_price: number
  selling_price: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ProductVariantProps {
  id: number
  product_id: number
  name: string
  extra_base_price: number
  extra_selling_price: number
  is_active: boolean
  discount: DiscountProps[]
  complimentary: ComplimentaryProps[]
}

export interface DiscountProps {
  id: number
  product_variant_id: number
  name: string
  description: string | null
  type: string
  quantity: number
  amount: number
  payment_type: string
  start_date: string
  end_date: string | null
  is_stacked: boolean
}

export interface ComplimentaryProps {
  rule_id: number
  quantity: number
  payment_type: string
  name: string
  description: string
  start_date: string
  end_date: string | null
  is_stacked: boolean
  items: ComplimentaryItemProps[]
}

export interface ComplimentaryItemProps {
  complimentary_variant_id: number
  product_name: string
  variant_name: string
  amount: number
  unit: string
}

export interface ProductListResponse {
  data: ProductProps[]
  pagination: PaginationResponse
}

export interface ProductDetailsRequest {
  id: number
}

export interface ProductDetailsResponse extends CommonApiResponse {
  data: ProductProps
}

export interface ProductVariantsRequest {
  product_id: number
}

export interface ProductVariantsResponse extends CommonApiResponse {
  data: ProductVariantProps[]
}

export interface FormStepProps {
  form: UseFormReturn<ProductFormInputs, any, ProductFormInputs>
}

export type ProductFormInputs = z.infer<typeof productFormValidationSchema>

export interface ComplimentaryItemData {
  product_id: string
  variants: {
    complimentary_variant_id: string
    amount: string
  }[]
}

export interface ComplimentaryItemRequest {
  complimentary_variant_id: number
  amount: number
}

export interface InsertProductRequest {
  product_name: string
  sku: string
  supplier_id: number
  category: string
  unit: string
  base_price: number
  selling_price: number
  variants: {
    name: string
    extra_base_price: number
    extra_selling_price: number
    discount: {
      is_stacked: boolean
      name: string
      description: string | null
      type: string
      quantity: number
      amount: number
      payment_type: string
      start_date: string
      end_date: string | null
    }[]
    complimentary: {
      quantity: number
      payment_type: string
      name: string
      description: string | null
      start_date: string
      end_date: string | null
      is_stacked: boolean
      items: ComplimentaryItemRequest[]
    }[]
  }[]
}

export type ProductDetailsFormInputs = z.infer<typeof productDetailsSchema>

export interface UpdateProductDetailRequest {
  id: number
  product_name: string
  sku: string
  supplier_id: number
  category: string
  unit: string
  base_price: number
  selling_price: number
}
