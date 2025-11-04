import { PaginationResponse } from '@/type/Common'

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

export interface ProductListResponse {
  data: ProductProps[]
  pagination: PaginationResponse
}
