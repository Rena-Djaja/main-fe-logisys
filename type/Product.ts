import { CommonApiResponse, PaginationResponse } from '@/type/Common'

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
  type: string
  quantity: number
  amount: number
  payment_type: string
  start_date: string
  end_date: string | null
}

export interface ComplimentaryProps {
  rule_id: number
  quantity: number
  payment_type: string
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
