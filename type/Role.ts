import { CommonOwnerProps, PaginationResponse } from '@/type/Common'

export interface RoleProps {
  id: 1
  name: 'Owner'
  is_active: true
  created_at: '2025-10-14T16:45:59.569913+07:00'
  created_by: CommonOwnerProps
  updated_at: '2025-10-14T16:45:59.569913+07:00'
  updated_by: CommonOwnerProps
}

export interface RoleListResponse {
  data: RoleProps[]
  pagination: PaginationResponse
}
