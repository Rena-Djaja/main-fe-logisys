export interface CommonApiResponse {
  status: number
  success: boolean
  message: string
  error?: string
}

export interface CommonFilterRequest {
  page: number
  per_page: number
  search: string
}

export interface PaginationResponse {
  page: number
  limit: number
  total_data: number
}
