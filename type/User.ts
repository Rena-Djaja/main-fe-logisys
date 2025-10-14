import { CommonApiResponse, PaginationResponse } from '@/type/Common'

export interface UserProps {
  id: number
  name: string
  email: string
  role_id: number
  role_name: string
  created_at: string
  updated_at: string
  deleted_at: string
  is_deleted: boolean
}

export interface UserListResponse {
  data: UserProps[]
  pagination: PaginationResponse
}

export interface UserDetailsRequest {
  id: number
}

export interface UserDetailsResponse extends CommonApiResponse {
  data: UserProps
}
